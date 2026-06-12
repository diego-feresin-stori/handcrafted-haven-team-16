"use client";

import { useAuth } from "@/context/AuthContext";

export default function UserInfo() {
  const { user } = useAuth();

  return (
    <div>
      <h2>User Info</h2>

      {user ? (
        <>
          <p>{user.name}</p>
          <p>{user.email}</p>
          <p>{user.role}</p>
        </>
      ) : (
        <p>No user logged in</p>
      )}
    </div>
  );
}