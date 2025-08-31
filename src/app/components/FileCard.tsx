"use client";

import React from "react";

interface FileProps {
  id: number;
  fileName: string;
  fileType: string;
  storedFilePath: string;
}

interface FileCardProps {
  file: FileProps;
  onDeleted: () => void;
}

export default function FileCard({ file, onDeleted }: FileCardProps) {
  const handleView = () => {
    window.open(`http://localhost:7267/api/Files/view/${file.id}`, "_blank");
  };

  const handleDelete = async () => {
    const confirmed = confirm("Delete this file?");
    if (!confirmed) return;

    try {
      const res = await fetch(`http://localhost:7267/api/Files/${file.id}`, {
        method: "DELETE",
        credentials: "include",
      });

      if (res.ok) onDeleted();
      else console.error("Failed to delete file");
    } catch (err) {
      console.error("Error deleting file:", err);
    }
  };

  return (
    <div className="flex flex-col items-center rounded-xl border border-gray-300 bg-white p-4 shadow-sm">
      <div className="grid h-32 w-full place-items-center rounded-md border border-gray-300 bg-gray-100">
        <span className="text-sm text-gray-700">{file.fileName}</span>
      </div>

      <p className="mt-2 text-sm text-gray-500">{file.fileType}</p>

      <button
        onClick={handleView}
        className="mt-4 w-full rounded-md bg-yellow-400 py-2 font-semibold text-blue-900 hover:bg-yellow-500"
      >
        View
      </button>
      <button
        onClick={handleDelete}
        className="mt-3 w-full rounded-md bg-blue-800 py-2 font-semibold text-white hover:bg-blue-900"
      >
        Delete
      </button>
    </div>
  );
}
