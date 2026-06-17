"use client";

import Link from "next/link";
import { useState } from "react";
import styles from "../auth.module.css";

export default function RegisterPage() {
  const [name, setName] = useState("");

  const [email, setEmail] =
    useState("");

  const [role, setRole] =
    useState("customer");

  const [bio, setBio] =
    useState("");

  const [story, setStory] =
    useState("");

  const [imageUrl, setImageUrl] =
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
            role,
            bio,
            story,
            imageUrl,
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
        <div className={styles.formGroup}>
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

        <div className={styles.formGroup}>
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

        <div className={styles.formGroup}>
          <label htmlFor="role">
            Join As
          </label>

          <select
            id="role"
            value={role}
            onChange={(e) =>
              setRole(
                e.target.value
              )
            }
          >
            <option value="customer">
              Customer
            </option>

            <option value="seller">
              Seller
            </option>
          </select>
        </div>

        {role === "seller" && (
          <>
            <div
              className={
                styles.formGroup
              }
            >
              <label htmlFor="bio">
                Seller Bio
              </label>

              <input
                id="bio"
                type="text"
                value={bio}
                onChange={(e) =>
                  setBio(
                    e.target.value
                  )
                }
                placeholder="Short description about yourself"
                required
              />
            </div>

            <div
              className={
                styles.formGroup
              }
            >
              <label htmlFor="story">
                Your Story
              </label>

              <textarea
                id="story"
                value={story}
                onChange={(e) =>
                  setStory(
                    e.target.value
                  )
                }
                placeholder="Tell customers about your craft journey"
                required
              />
            </div>

            <div
              className={
                styles.formGroup
              }
            >
              <label htmlFor="imageUrl">
                Profile Image URL
              </label>

              <input
                id="imageUrl"
                type="text"
                value={imageUrl}
                onChange={(e) =>
                  setImageUrl(
                    e.target.value
                  )
                }
                placeholder="/images/profile.jpg"
              />
            </div>
          </>
        )}

        <div className={styles.formGroup}>
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
          <p className={styles.error}>
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