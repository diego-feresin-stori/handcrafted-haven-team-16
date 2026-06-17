import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { getJwtSecret } from "@/lib/auth";
import { supabase } from "@/lib/supabase";

export async function POST(
  request: Request
) {
  try {
    const body =
      await request.json();

    const {
      email,
      password,
    } = body;

    if (!email || !password) {
      return NextResponse.json(
        {
          error:
            "Email and password are required",
        },
        {
          status: 400,
        }
      );
    }

    const {
      data: user,
      error,
    } = await supabase
      .from("users")
      .select("*")
      .eq("email", email)
      .single();

    if (error || !user) {
      return NextResponse.json(
        {
          error:
            "Invalid email or password",
        },
        {
          status: 401,
        }
      );
    }

    const passwordMatch =
      await bcrypt.compare(
        password,
        user.password
      );

    if (!passwordMatch) {
      return NextResponse.json(
        {
          error:
            "Invalid email or password",
        },
        {
          status: 401,
        }
      );
    }

    const token = jwt.sign(
      {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      getJwtSecret(),
      {
        expiresIn: "7d",
      }
    );

    const response =
      NextResponse.json({
        success: true,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
      });

    response.cookies.set(
      "token",
      token,
      {
        httpOnly: true,
        secure:
          process.env.NODE_ENV ===
          "production",
        sameSite: "strict",
        path: "/",
        maxAge:
          60 * 60 * 24 * 7,
      }
    );

    return response;
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error: "Login failed",
      },
      {
        status: 500,
      }
    );
  }
}