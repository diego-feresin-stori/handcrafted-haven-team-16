"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

type User = {
  id: string;
  name: string;
  email: string;
  role: string;
};

type AuthContextType = {
  user: User | null;
  loading: boolean;
  logout: () => Promise<void>;
};

const AuthContext =
  createContext<AuthContextType | null>(
    null
  );

export function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] =
    useState<User | null>(null);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    async function loadUser() {
        try {
        const response =
            await fetch(
            "/api/auth/me"
            );

        const data =
            await response.json();

        setUser(data.user);
        } catch (error) {
        console.error(error);
        } finally {
        setLoading(false);
        }
    }

    loadUser();
    }, []);

  const logout = async () => {
    try {
      await fetch(
        "/api/auth/logout",
        {
          method: "POST",
        }
      );
    } catch (error) {
      console.error(
        "Logout failed:",
        error
      );
    }
    setUser(null);

    window.location.href =
      "/login";
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context =
    useContext(AuthContext);

  if (!context) {
    throw new Error(
      "useAuth must be used inside AuthProvider"
    );
  }

  return context;
}