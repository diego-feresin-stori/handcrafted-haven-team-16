"use client";

import Link from "next/link";
import { useAuth } from "@/context/AuthContext";

export default function AuthButton() {
  const {
    user,
    loading,
    logout,
  } = useAuth();

  if (loading) {
    return null;
  }

  if (!user) {
    return (
      <Link
        href="/login"
        className="buttonSecondary"
      >
        Login
      </Link>
    );
  }

  return (
    <button
      className="buttonSecondary"
      onClick={logout}
    >
      Logout
    </button>
  );
}