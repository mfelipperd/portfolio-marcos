'use client';

import { memo } from 'react';
import { 
  SiJavascript, 
  SiTypescript, 
  SiReact, 
  SiNodedotjs, 
  SiHtml5, 
  SiCss3, 
  SiGit, 
  SiDocker, 
  SiAmazon, 
  SiMongodb, 
  SiPostgresql,
  SiN8N
} from 'react-icons/si';

const TechnologyCard = memo(({ name, icon, delay }: {
  name: string;
  icon: React.ReactNode;
  delay: string;
}) => (
  <div className={`group bg-black/20 backdrop-blur-sm border border-purple-500/20 rounded-xl p-6 text-center hover:border-purple-400/40 transition-all duration-300 transform hover:scale-105 ${delay}`}>
    <div className="text-3xl md:text-4xl mb-3 group-hover:scale-110 transition-transform duration-300">
      {icon}
    </div>
    <h4 className="text-purple-100 font-semibold text-sm md:text-base">{name}</h4>
  </div>
));

TechnologyCard.displayName = 'TechnologyCard';

const TechnologiesGrid = memo(() => {
  const technologies = [
    { name: 'JavaScript', icon: <SiJavascript className="text-yellow-400" />, delay: 'delay-0' },
    { name: 'TypeScript', icon: <SiTypescript className="text-blue-400" />, delay: 'delay-100' },
    { name: 'React', icon: <SiReact className="text-cyan-400" />, delay: 'delay-200' },
    { name: 'Node.js', icon: <SiNodedotjs className="text-green-400" />, delay: 'delay-300' },
    { name: 'HTML5', icon: <SiHtml5 className="text-orange-400" />, delay: 'delay-[400ms]' },
    { name: 'CSS3', icon: <SiCss3 className="text-blue-400" />, delay: 'delay-500' },
    { name: 'Git', icon: <SiGit className="text-red-400" />, delay: 'delay-[600ms]' },
    { name: 'Docker', icon: <SiDocker className="text-blue-400" />, delay: 'delay-[700ms]' },
    { name: 'AWS', icon: <SiAmazon className="text-orange-400" />, delay: 'delay-[800ms]' },
    { name: 'MongoDB', icon: <SiMongodb className="text-green-400" />, delay: 'delay-[900ms]' },
    { name: 'PostgreSQL', icon: <SiPostgresql className="text-blue-400" />, delay: 'delay-[1000ms]' },
    { name: 'N8N', icon: <SiN8N className="text-orange-400" />, delay: 'delay-[1100ms]' },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-10 relative z-10">
      {technologies.map((tech) => (
        <TechnologyCard
          key={tech.name}
          name={tech.name}
          icon={tech.icon}
          delay={tech.delay}
        />
      ))}
    </div>
  );
});

TechnologiesGrid.displayName = 'TechnologiesGrid';

export default TechnologiesGrid;
