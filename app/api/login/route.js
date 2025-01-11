import User from "@/app/models/User";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import { logger, morganMiddleware } from "@/utils/logger.js";

export async function POST(req) {
  try {
    logger.info("Starting request processing.");

    // Run Morgan middleware for logging
    const runMorgan = new Promise((resolve, reject) => {
      morganMiddleware(req, {}, (err) => {
        if (err) reject(err);
        resolve();
      });
    });

    await runMorgan;
    logger.info("Request successfully logged by Morgan.");

    const body = await req.json();
    logger.info("Request body parsed successfully:", body);

    const { email, password } = body;

    if (!email || !password) {
      logger.info("Email or password missing in the request.");
      return NextResponse.json(
        {
          success: false,
          message: "Email and password are required.",
        },
        { status: 400 }
      );
    }

    logger.info(`Searching for user with email: ${email}`);
    const user = await User.findOne({ where: { email } });

    if (!user) {
      logger.info(`No user found with email: ${email}`);
      return NextResponse.json(
        {
          success: false,
          message: "Invalid email or password.",
        },
        { status: 401 }
      );
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      logger.info("Invalid password provided.");
      return NextResponse.json(
        {
          success: false,
          message: "Invalid email or password.",
        },
        { status: 401 }
      );
    }

    logger.info(`User logged in successfully: ${user.email}`);
    return NextResponse.json({
      success: true,
      message: "Login successful.",
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        mobile_number: user.mobile_number,
      },
    });
  } catch (error) {
    logger.info("Error during login:", error);
    console.error("Error during login:", error);
    return NextResponse.json(
      {
        success: false,
        message: "An error occurred. Please try again.",
      },
      { status: 500 }
    );
  }
}
