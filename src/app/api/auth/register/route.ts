import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { supabase } from "@/lib/supabase";

export async function POST(
  request: Request
) {
  try {
    const body =
      await request.json();

    const {
      name,
      email,
      password,
      role,
      bio,
      story,
      imageUrl,
    } = body;

    if (
      !name ||
      !email ||
      !password ||
      !role
    ) {
      return NextResponse.json(
        {
          error:
            "All fields are required",
        },
        { status: 400 }
      );
    }

    if (
      role !== "customer" &&
      role !== "seller"
    ) {
      return NextResponse.json(
        {
          error: "Invalid role",
        },
        { status: 400 }
      );
    }

    if (
      role === "seller" &&
      (!bio || !story)
    ) {
      return NextResponse.json(
        {
          error:
            "Bio and story are required for sellers",
        },
        { status: 400 }
      );
    }

    const {
      data: existingUser,
    } = await supabase
      .from("users")
      .select("id")
      .eq("email", email)
      .single();

    if (existingUser) {
      return NextResponse.json(
        {
          error:
            "Email already registered",
        },
        { status: 409 }
      );
    }

    const hashedPassword =
      await bcrypt.hash(
        password,
        10
      );

    const {
      data: newUser,
      error,
    } = await supabase
      .from("users")
      .insert({
        name,
        email,
        password:
          hashedPassword,
        role,
      })
      .select()
      .single();

    if (error) {
      throw error;
    }

    if (role === "seller") {
      const {
        error: sellerError,
      } = await supabase
        .from(
          "seller_profiles"
        )
        .insert({
          user_id: newUser.id,
          bio,
          story,
          image_url:
            imageUrl || null,
        });

      if (sellerError) {
        throw sellerError;
      }
    }

    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error:
          "Failed to register user",
      },
      { status: 500 }
    );
  }
}