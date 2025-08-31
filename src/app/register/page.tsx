"use client";

import { useEffect, useState } from "react";
import FileCard from "../components/FileCard";
import Header from "../components/Header";
import ProfileCard from "../components/ProfileCard";
import UploadForm from "../components/UploadForm";

export default function Home() {
  const [files, setFiles] = useState<any[]>([]);

  const loadFiles = async () => {
    const res = await fetch("http://localhost:7267/api/Files", {
      credentials: "include",
    });
    if (res.ok) {
      setFiles(await res.json());
    }
  };

  useEffect(() => {
    loadFiles();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="mx-auto grid max-w-6xl grid-cols-1 gap-6 px-4 py-7 md:grid-cols-2 md:px-6">
        <ProfileCard />
        <UploadForm onUploaded={loadFiles} />
      </main>

      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <hr className="border-t border-gray-300" />
      </div>

      <section className="mx-auto max-w-6xl px-4 py-6 md:px-6">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {files.length > 0 ? (
            files.map((f) => (
              <FileCard key={f.id} file={f} onDeleted={loadFiles} />
            ))
          ) : (
            <div className="md:col-span-3 flex items-center justify-center px-4 text-center leading-7 text-gray-600">
              <p>
                By default, this space will be empty. It should only appear when
                I add files. I can add one file at a time, but multiple times.
                For example: first file - lab reports, second file - medical
                prescription. These should be displayed here in a responsive
                manner.
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
