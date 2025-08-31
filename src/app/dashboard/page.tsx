"use client";

import { useEffect, useState } from "react";
import FileCard from "../components/FileCard";
import Header from "../components/Header";
import ProfileCard from "../components/ProfileCard";
import UploadForm from "../components/UploadForm";

interface FileItem {
  id: number;
  fileName: string;
  fileType: string;
  storedFilePath: string;
}

export default function Home() {
  const [files, setFiles] = useState<FileItem[]>([]);
  const [loading, setLoading] = useState(false);

  const API_URL = "http://localhost:7267/api/Files";

  const loadFiles = async () => {
    try {
      setLoading(true);
      const res = await fetch(API_URL, { credentials: "include" });
      if (!res.ok) throw new Error("Failed to load files");
      setFiles(await res.json());
    } catch (err) {
      console.error("Error loading files:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadFiles();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Top: Profile + Upload */}
      <main className="mx-auto grid max-w-6xl grid-cols-1 gap-6 px-4 py-7 md:grid-cols-2 md:px-6">
        <ProfileCard />
        <UploadForm onUploaded={loadFiles} />
      </main>

      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <hr className="border-t border-gray-300" />
      </div>

      {/* Bottom: File List / Empty State */}
      <section className="mx-auto max-w-6xl px-4 py-6 md:px-6">
        {loading ? (
          <div className="flex items-center justify-center py-10 text-gray-500">
            Loading files...
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {files.length > 0 ? (
              files.map((f) => (
                <FileCard key={f.id} file={f} onDeleted={loadFiles} />
              ))
            ) : (
              <div className="md:col-span-3 flex items-center justify-center px-4 text-center leading-7 text-gray-600">
                <p>
                  No files uploaded yet. Add your first file using the form above
                  — for example, a lab report, prescription, or scan. Each file
                  you upload will appear here in a responsive grid layout.
                </p>
              </div>
            )}
          </div>
        )}
      </section>
    </div>
  );
}
