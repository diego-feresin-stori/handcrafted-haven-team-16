"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

type Props = {
  children: React.ReactNode;
  allowedRoles: string[];
};

export default function RoleProtectedRoute({
  children,
  allowedRoles,
}: Props) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      if (!user) {
        router.push("/login");
        return;
      }

      if (
        !allowedRoles.includes(user.role)
      ) {
        router.push("/");
      }
    }
  }, [
    user,
    loading,
    router,
    allowedRoles,
  ]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!user) {
    return null;
  }

  if (
    !allowedRoles.includes(user.role)
  ) {
    return null;
  }

  return <>{children}</>;
}