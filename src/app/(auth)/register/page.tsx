"use client";

import { useState } from "react";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

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
            setError(
            data.error ||
                "Registration failed"
            );
            return;
        }

        alert(
            "Account created successfully!"
        );

        window.location.href =
            "/login";
        } catch (error) {
        console.error(error);

        setError(
            "Something went wrong. Please try again."
        );
        } finally {
        setLoading(false);
        }
    };

  return (
    <main>
      <h1>Create Account</h1>

      <form onSubmit={handleSubmit}>
        <div>
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

        <div>
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

        <div>
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
          <p>{error}</p>
        )}

        <button
          type="submit"
          disabled={loading}
        >
          {loading
            ? "Creating Account..."
            : "Register"}
        </button>
      </form>
    </main>
  );
}