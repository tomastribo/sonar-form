import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const formData = await req.formData();

    const name = formData.get("name");
    const email = formData.get("email");
    const answer = formData.get("answer");
    const files = formData.getAll("files");

    console.log("📨 Nova resposta:");
    console.log("Nom:", name);
    console.log("Email:", email);
    console.log("Resposta:", answer);
    console.log("Fitxers pujats:", files.map((f) => f.name));

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("❌ Error al processar la resposta:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
