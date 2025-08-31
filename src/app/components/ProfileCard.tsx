"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";

interface ProfileData {
  fullName: string;
  email: string;
  phoneNumber: string;
  gender: string;
  profileImagePath: string;
}

export default function ProfileCard() {
  const [formData, setFormData] = useState<ProfileData>({
    fullName: "",
    email: "",
    phoneNumber: "",
    gender: "Male",
    profileImagePath: "",
  });
  const [file, setFile] = useState<File | null>(null);

  const API_BASE = "https://localhost:7267/api/Profile";

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const res = await fetch(API_BASE, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        if (!res.ok) throw new Error("Failed to load profile");

        const data: ProfileData = await res.json();
        setFormData(data);
      } catch (err) {
        console.error("Error fetching profile:", err);
      }
    };

    loadProfile();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleGenderChange = (gender: string) => {
    setFormData(prev => ({ ...prev, gender }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) setFile(e.target.files[0]);
  };

  const handleSubmit = async () => {
    const body = new FormData();
    body.append("FullName", formData.fullName);
    body.append("PhoneNumber", formData.phoneNumber);
    body.append("Gender", formData.gender);
    if (file) body.append("ProfileImage", file);

    try {
      const res = await fetch(API_BASE, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body,
      });

      if (!res.ok) throw new Error("Update failed");

      alert("Profile updated successfully!");
    } catch (err) {
      console.error("Error updating profile:", err);
      alert("Error updating profile");
    }
  };

  return (
    <section className="relative rounded-xl border border-gray-200 bg-white p-6 shadow-md">
      <div className="absolute -top-3 right-4 rounded-md bg-gray-100 px-3 py-1 text-xs font-semibold text-gray-700 shadow">
        User Profile
      </div>

      <div className="flex items-start gap-4">
        <div className="flex flex-col items-center">
          <Image
            src={
              file
                ? URL.createObjectURL(file)
                : formData.profileImagePath || "/profile.png"
            }
            alt="Profile"
            width={96}
            height={96}
            className="h-24 w-24 rounded-full border object-cover"
          />
          <input
            type="file"
            onChange={handleFileChange}
            className="hidden"
            id="fileInput"
          />
          <label
            htmlFor="fileInput"
            className="mt-2 cursor-pointer text-sm text-blue-700 hover:underline"
          >
            Change
          </label>
        </div>

        <div className="flex-1">
          <h2 className="text-2xl font-extrabold text-blue-900">
            {formData.fullName}
          </h2>

          <form className="mt-4 space-y-3">
            <label className="block">
              <span className="text-sm font-medium">Email :</span>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                disabled
                className="mt-1 w-full cursor-not-allowed rounded-md border border-gray-300 bg-gray-100 px-3 py-2"
              />
            </label>

            <label className="block">
              <span className="text-sm font-medium">Phone :</span>
              <input
                type="text"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
              />
            </label>

            <div>
              <span className="text-sm font-medium">Gender :</span>
              <div className="mt-1 flex items-center gap-6 text-sm">
                {["Male", "Female"].map(option => (
                  <label key={option} className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="gender"
                      checked={formData.gender === option}
                      onChange={() => handleGenderChange(option)}
                      className="accent-blue-700"
                    />
                    {option}
                  </label>
                ))}
              </div>
            </div>
          </form>
        </div>
      </div>

      <div className="flex justify-center">
        <button
          type="button"
          onClick={handleSubmit}
          className="mt-5 rounded-md bg-yellow-400 px-8 py-2 font-semibold text-blue-900 hover:bg-yellow-500"
        >
          Save
        </button>
      </div>
    </section>
  );
}
