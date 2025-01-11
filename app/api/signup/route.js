import bcrypt from "bcryptjs";
import User from "@/app/models/User";
import { NextResponse } from "next/server";

export async function POST(req) {
  const { name, email, mobile_number, password } = await req.json();

  if (!name || !email || !mobile_number || !password) {
    return NextResponse.json(
      { success: false, message: "All fields are required" },
      { status: 400 }
    );
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      name,
      email,
      mobile_number,
      password: hashedPassword,
    });

    return NextResponse.json(
      { success: true, message: "User created successfully", user: newUser },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating user:", error);

    if (error.name === "SequelizeUniqueConstraintError") {
      return NextResponse.json(
        { success: false, message: "Email already exists" },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}
