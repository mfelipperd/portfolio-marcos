/**
 * Google Sheets Integration Helper
 * 
 * This file provides an abstraction for sending lead data to Google Sheets.
 * To activate, you can use a Google Apps Script as a web app or a service like Sheety/Stein.
 */

export interface LeadData {
  name: string;
  contact: string; // Email or WhatsApp
  interest: string;
  source?: string;
  createdAt: string;
}

export async function saveLeadToSheets(data: LeadData) {
  const SPREADSHEET_ID = process.env.GOOGLE_SHEETS_ID;
  const WEBHOOK_URL = process.env.GOOGLE_SHEETS_WEBHOOK_URL;

  if (!WEBHOOK_URL) {
    console.warn("GOOGLE_SHEETS_WEBHOOK_URL not configured. Simulating submission...");
    await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate network lag
    return { success: true, simulated: true };
  }

  try {
    const response = await fetch(WEBHOOK_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error("Failed to save lead to Google Sheets");
    }

    return await response.json();
  } catch (error) {
    console.error("Error saving lead:", error);
    throw error;
  }
}
