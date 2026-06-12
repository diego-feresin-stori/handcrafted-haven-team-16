"use client";

import { useAuth } from "@/context/AuthContext";

export default function LogoutButton() {
  const { logout } = useAuth();

  return (
    <button
      className="buttonSecondary"
      onClick={logout}
    >
      Logout
    </button>
  );
}