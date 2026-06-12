"use client";

import Link from "next/link";
import { useState } from "react";
import styles from "../auth.module.css";

export default function RegisterPage() {
  const [name, setName] =
    useState("");

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
        "/api/auth/register",
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            name,
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

      window.location.href =
        "/login";
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
        Create Account
      </h1>

      <p className={styles.subtitle}>
        Join our community of makers
        and mindful shoppers.
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
          <label htmlFor="name">
            Name
          </label>

          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) =>
              setName(
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
            ? "Creating Account..."
            : "Create Account"}
        </button>
      </form>

      <p className={styles.authLink}>
        Already have an account?{" "}
        <Link href="/login">
          Sign In
        </Link>
      </p>
    </>
  );
}