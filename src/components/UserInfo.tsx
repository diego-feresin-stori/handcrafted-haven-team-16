"use client";

import { useAuth } from "@/context/AuthContext";

export default function UserInfo() {
  const { user } = useAuth();

  return (
    <div>
      <h2>User Info</h2>

      {user ? (
        <>
          <p>Welcome, {user.name}</p>
        </>
      ) : (
        <p>No user logged in</p>
      )}
    </div>
  );
}