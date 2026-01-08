import { NextResponse } from 'next/server';

export const runtime = 'edge';

interface VercelProject {
  id: string;
  name: string;
  accountId: string;
  createdAt: number;
  updatedAt: number;
  framework: string | null;
  link?: {
    type: string;
    repo: string;
    repoId: number;
    org?: string;
    productionBranch?: string;
  };
}

interface VercelDeployment {
  uid: string;
  name: string;
  url: string;
  created: number;
  state: string;
  type: string;
  target: string;
  aliasAssigned: number | null;
  aliasError: unknown;
  meta: {
    githubCommitMessage?: string;
    githubCommitRef?: string;
    githubCommitSha?: string;
    githubOrg?: string;
    githubRepo?: string;
  };
}

interface VercelDomain {
  name: string;
  [key: string]: unknown;
}

export async function GET() {
  const token = process.env.VERCEL_TOKEN;

  if (!token) {
    return NextResponse.json(
      { 
        error: 'Vercel token not configured',
        message: 'Please add VERCEL_TOKEN to your environment variables'
      },
      { status: 500 }
    );
  }

  try {
    // Buscar projetos
    const projectsResponse = await fetch('https://api.vercel.com/v9/projects', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!projectsResponse.ok) {
      throw new Error(`Vercel API error: ${projectsResponse.status}`);
    }

    const projectsData = await projectsResponse.json();
    const projects: VercelProject[] = projectsData.projects || [];

    // Buscar deployments para cada projeto
    const projectsWithDeployments = await Promise.all(
      projects.map(async (project) => {
        try {
          const deploymentsResponse = await fetch(
            `https://api.vercel.com/v6/deployments?projectId=${project.id}&limit=1&state=READY&target=production`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          if (!deploymentsResponse.ok) {
            return {
              ...project,
              latestDeployment: null,
              productionUrl: null,
            };
          }

          const deploymentsData = await deploymentsResponse.json();
          const latestDeployment: VercelDeployment | null = deploymentsData.deployments?.[0] || null;

          // Obter domínios do projeto
          const domainsResponse = await fetch(
            `https://api.vercel.com/v9/projects/${project.id}/domains`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          let productionUrl = null;
          if (domainsResponse.ok) {
            const domainsData = await domainsResponse.json();
            const domains = domainsData.domains || [];
            
            // Priorizar domínio customizado
            const customDomain = domains.find((d: VercelDomain) => !d.name.includes('.vercel.app'));
            const vercelDomain = domains.find((d: VercelDomain) => d.name.includes('.vercel.app'));
            
            const primaryDomain = customDomain || vercelDomain;
            if (primaryDomain) {
              productionUrl = `https://${primaryDomain.name}`;
            }
          }

          // Se não encontrou domínio, usar URL do deployment
          if (!productionUrl && latestDeployment) {
            productionUrl = `https://${latestDeployment.url}`;
          }

          return {
            ...project,
            latestDeployment,
            productionUrl,
            githubUrl: project.link?.repo 
              ? `https://github.com/${project.link.repo}`
              : null,
          };
        } catch (error) {
          console.error(`Error fetching deployment for ${project.name}:`, error);
          return {
            ...project,
            latestDeployment: null,
            productionUrl: null,
          };
        }
      })
    );

    // Filtrar apenas projetos com deployment de produção
    const productionProjects = projectsWithDeployments.filter(
      (project) => project.productionUrl
    );

    return NextResponse.json({
      projects: productionProjects,
      total: productionProjects.length,
    });
  } catch (error) {
    console.error('Error fetching Vercel projects:', error);
    return NextResponse.json(
      { 
        error: 'Failed to fetch projects',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

