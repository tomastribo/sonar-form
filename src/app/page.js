"use client";

import { useState } from "react";
import { useDropzone } from "react-dropzone";

export default function Home() {
  const [formData, setFormData] = useState({ name: "", email: "", answer: "" });
  const [files, setFiles] = useState([]);

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "audio/*": [],
      "video/*": [],
      "application/pdf": [],
      "text/plain": [],
    },
    onDrop: (acceptedFiles) => setFiles(acceptedFiles),
  });

  const handleChange = (e) =>
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("name", formData.name);
    data.append("email", formData.email);
    data.append("answer", formData.answer);
    files.forEach((file) => data.append("files", file));

    const res = await fetch("/api/upload", {
      method: "POST",
      body: data,
    });

    if (res.ok) {
      alert("Enviat correctament!");
      setFormData({ name: "", email: "", answer: "" });
      setFiles([]);
    } else {
      alert("Error en l'enviament.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 space-y-4 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Formulari per al Sónar</h1>

      <input
        type="text"
        name="name"
        placeholder="Nom"
        value={formData.name}
        onChange={handleChange}
        required
        className="border p-2 w-full"
      />

      <input
        type="email"
        name="email"
        placeholder="Correu electrònic"
        value={formData.email}
        onChange={handleChange}
        required
        className="border p-2 w-full"
      />

      <textarea
        name="answer"
        placeholder="Resposta a la pregunta"
        value={formData.answer}
        onChange={handleChange}
        required
        className="border p-2 w-full"
      />

      <div
        {...getRootProps()}
        className="border-dashed border-2 border-gray-400 p-6 text-center cursor-pointer"
      >
        <input {...getInputProps()} />
        <p>Arrossega aquí els teus fitxers (àudio, vídeo, PDF, TXT)</p>
        <ul className="mt-2 text-left">
          {files.map((file) => (
            <li key={file.name}>{file.name}</li>
          ))}
        </ul>
      </div>

      <button type="submit" className="bg-black text-white px-4 py-2 rounded">
        Enviar
      </button>
    </form>
  );
}
