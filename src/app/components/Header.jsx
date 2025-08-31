import Image from "next/image";
import React from "react";

export default function Header() {
  return (
    <header className="flex items-center justify-between bg-blue-800 px-6 py-4 text-white">
      <div className="flex flex-col leading-none">
        <span className="text-2xl font-extrabold">hfiles</span>
        <span className="text-[10px] tracking-widest opacity-90">HEALTH FILES</span>
      </div>

      <Image
        src="/user-avatar.png"
        alt="User Avatar"
        width={40}
        height={40}
        className="h-10 w-10 rounded-full border-2 border-white object-cover"
      />
    </header>
  );
}
