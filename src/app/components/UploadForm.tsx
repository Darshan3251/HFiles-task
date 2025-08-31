"use client";

import React, { useState } from "react";

interface UploadFormProps {
  onUploaded: () => void;
}

export default function UploadForm({ onUploaded }: UploadFormProps) {
  const [fileType, setFileType] = useState("");
  const [fileName, setFileName] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const API_URL = "https://localhost:7267/api/Files/upload";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) {
      alert("Please select a file");
      return;
    }

    const formData = new FormData();
    formData.append("FileType", fileType);
    formData.append("FileName", fileName);
    formData.append("file", file);

    setLoading(true);

    try {
      const res = await fetch(API_URL, {
        method: "POST",
        body: formData,
        credentials: "include",
      });

      if (!res.ok) {
        const errorText = await res.text();
        console.error("Upload error:", res.status, res.statusText, errorText);
        throw new Error("Upload failed");
      }

      const data = await res.json();
      console.log("Upload success:", data);

      alert("File uploaded successfully!");
      onUploaded();

      setFile(null);
      setFileName("");
      setFileType("");
    } catch (err) {
      console.error("Upload failed:", err);
      alert("Upload error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="rounded-xl border border-gray-200 bg-white p-6 shadow-md">
      <h3 className="text-center text-lg font-extrabold text-blue-900">
        Please Add Your Medical Records
      </h3>

      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
        <select
          value={fileType}
          onChange={(e) => setFileType(e.target.value)}
          className="w-full rounded-md border px-3 py-2"
          required
        >
          <option value="" disabled>
            Select file type
          </option>
          {[
            "Lab Report",
            "Prescription",
            "X-Ray",
            "Blood Report",
            "MRI Scan",
            "CT Scan",
          ].map((type) => (
            <option key={type}>{type}</option>
          ))}
        </select>

        <input
          type="text"
          value={fileName}
          onChange={(e) => setFileName(e.target.value)}
          placeholder="Enter Name of File..."
          className="w-full rounded-md border px-3 py-2"
          required
        />

        <input
          type="file"
          accept=".pdf,image/*"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
          className="block"
          required
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-md bg-blue-800 py-2 text-white hover:bg-blue-900"
        >
          {loading ? "Uploading..." : "Submit"}
        </button>
      </form>
    </section>
  );
}
