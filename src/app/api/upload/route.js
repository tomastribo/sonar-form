import { NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import path from "path";

export async function POST(req) {
  const formData = await req.formData();

  const name = formData.get("name");
  const email = formData.get("email");
  const answer = formData.get("answer");
  const files = formData.getAll("files");

  const uploadDir = path.join(process.cwd(), "public", "uploads");

  await mkdir(uploadDir, { recursive: true });

  for (const file of files) {
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const filePath = path.join(uploadDir, file.name);
    await writeFile(filePath, buffer);
  }

  console.log("Nova resposta:", { name, email, answer });

  return NextResponse.json({ success: true });
}
