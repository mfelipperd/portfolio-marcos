import { NextRequest, NextResponse } from "next/server";
import { encryptPDF } from "@pdfsmaller/pdf-encrypt-lite";

export async function POST(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const type = searchParams.get("type"); // "pdf"

    if (!type || type !== "pdf") {
      return NextResponse.json(
        { error: "Invalid type. Only 'pdf' is supported at this moment." },
        { status: 400 }
      );
    }

    const password = process.env.RESUME_PASSWORD || "marcos123";

    const contentType = req.headers.get("content-type") || "";
    let data: any;

    if (contentType.includes("application/x-www-form-urlencoded") || contentType.includes("multipart/form-data")) {
      const formData = await req.formData();
      const jsonData = formData.get("data") as string;
      data = JSON.parse(jsonData);
    } else {
      data = await req.json();
    }

    if (!data) {
      return NextResponse.json(
        { error: "No resume data provided." },
        { status: 400 }
      );
    }

    // Render PDF using @react-pdf/renderer
    const { renderToBuffer } = await import("@react-pdf/renderer");
    const { PdfTemplate } = await import("@/components/SubPages/ResumeBuilder/PdfTemplate");
    const React = await import("react");

    const pdfBuffer = await renderToBuffer(
      React.createElement(PdfTemplate, { data }) as any
    );

    const token = searchParams.get("token");
    const adminPassword = process.env.ADMIN_PASSWORD;
    const shouldEncrypt = !adminPassword || token !== adminPassword;

    let responseBuffer = pdfBuffer;

    if (shouldEncrypt) {
      // Encrypt PDF using pdf-encrypt-lite
      const encryptedBytes = await encryptPDF(pdfBuffer, password);
      responseBuffer = Buffer.from(encryptedBytes);
    }
    
    return new NextResponse(responseBuffer as any, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": "attachment; filename=curriculo.pdf",
      },
    });
  } catch (error: any) {
    console.error("Encryption error:", error);
    return NextResponse.json(
      { error: "Failed to encrypt file.", details: error.message },
      { status: 500 }
    );
  }
}
