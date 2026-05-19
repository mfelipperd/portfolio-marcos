import { NextResponse } from 'next/server';
import { saveLeadToSheets, LeadData } from '@/lib/googleSheets';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Basic validation
    if (!body.name || !body.contact) {
      return NextResponse.json(
        { error: 'Nome e contato são obrigatórios' },
        { status: 400 }
      );
    }

    const leadData: LeadData = {
      name: body.name,
      contact: body.contact,
      interest: body.interest || 'Não especificado',
      createdAt: new Date().toISOString(),
      source: 'Landing Page Portfolio'
    };

    const result = await saveLeadToSheets(leadData);

    return NextResponse.json({ 
      success: true, 
      message: 'Lead capturado com sucesso!',
      ...result 
    });

  } catch (error) {
    console.error('API [LEADS] Error:', error);
    return NextResponse.json(
      { error: 'Erro interno ao processar lead' },
      { status: 500 }
    );
  }
}
