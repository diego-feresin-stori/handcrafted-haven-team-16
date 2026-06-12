"use client";

import Link from "next/link";
import { useState } from "react";
import styles from "../auth.module.css";

export default function LoginPage() {
  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [error, setError] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    setError("");
    setLoading(true);

    try {
      const response = await fetch(
        "/api/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            email,
            password,
          }),
        }
      );

      const data =
        await response.json();

      if (!response.ok) {
        setError(data.error);
        return;
      }

      window.location.href = "/";
    } catch {
      setError(
        "Something went wrong."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <p className={styles.badge}>
        HANDCRAFTED HAVEN
      </p>

      <h1 className={styles.title}>
        Welcome Back
      </h1>

      <p className={styles.subtitle}>
        Sign in to continue exploring
        handcrafted products.
      </p>

      <form
        onSubmit={handleSubmit}
        className={styles.form}
      >
        <div
          className={
            styles.formGroup
          }
        >
          <label htmlFor="email">
            Email
          </label>

          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) =>
              setEmail(
                e.target.value
              )
            }
            required
          />
        </div>

        <div
          className={
            styles.formGroup
          }
        >
          <label htmlFor="password">
            Password
          </label>

          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) =>
              setPassword(
                e.target.value
              )
            }
            required
          />
        </div>

        {error && (
          <p
            className={
              styles.error
            }
          >
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
          className={`buttonPrimary ${styles.submitButton}`}
        >
          {loading
            ? "Signing In..."
            : "Sign In"}
        </button>
      </form>

      <p className={styles.authLink}>
        Need an account?{" "}
        <Link href="/register">
          Register
        </Link>
      </p>
    </>
  );
}