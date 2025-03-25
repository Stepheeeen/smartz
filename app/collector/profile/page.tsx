"use client";
import { title } from "@/components/primitives";
import { Card } from "@heroui/card";
import { Input } from "@heroui/input";
import Image from "next/image";
import React, { useState } from "react";
import { FiCamera, FiUser } from "react-icons/fi";

const Profile = () => {
  const [imageUrl, setImageUrl] = useState("https://i.pravatar.cc/300");
  const [username, setUsername] = useState("Smartz");

  return (
    <div className="p-6 w-full">
      <Card className="p-6 shadow-lg rounded-lg max-w-xl mx-auto">
        <div className="flex items-center justify-center py-4">
          <h1 className={title({ size: "sm" })}>Profile</h1>
        </div>
        {/* Profile Image Preview */}
        <div className="flex flex-col items-center gap-6">
          <Image
            src={imageUrl || "/default-avatar.png"} // Default if no input
            alt="Profile Preview"
            className="w-32 h-32 rounded-full border border-gray-200 object-cover mb-5"
          />

          <Input
            label="Username"
            type="text"
            placeholder="Enter Username"
            value={username}
            endContent={<FiUser className="text-gray-500" />}
            //   onChange={(e) => setUsername(e.target.value)}
            disabled
          />

          {/* Image URL Input */}
          <Input
            label="Image Url"
            placeholder="Enter Image URL"
            value={imageUrl}
            //   onChange={(e) => setImageUrl(e.target.value)}
            type="text"
            endContent={<FiCamera className="text-gray-500" />}
            disabled
          />
        </div>
      </Card>
    </div>
  );
};

export default Profile;
