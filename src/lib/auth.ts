import jwt from "jsonwebtoken";

export function getJwtSecret(): string {
  const secret = process.env.JWT_SECRET;

  if (!secret) {
    throw new Error("JWT_SECRET environment variable is not set");
  }

  return secret;
}

export function verifyToken(
  token: string
) {
  try {
    return jwt.verify(
      token,
      getJwtSecret()
    );
  } catch {
    return null;
  }
}