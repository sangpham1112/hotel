import bcrypt from "bcryptjs";
import { NextResponse } from "next/server.js";
import prisma from "../../../../../lib/prisma";
import { SignJWT } from "jose";

export const POST = async (req) => {
  try {
    const data = await req.json();
    const user = await prisma.user.findUnique({
      where: {
        email: data.email,
      },
    });
    if (!user) return NextResponse.json({ error: "User Not Found !" });

    const isPasswordCorrect = await bcrypt.compare(
      data.password,
      user.password
    );
    if (!isPasswordCorrect)
      return NextResponse.json({ error: "Wrong password" });

    // Tạo token JWT
    const secretKey = new TextEncoder().encode(process.env.JWT_SECRET);
    const token = await new SignJWT({ userId: user.id, isAdmin: user.isAdmin })
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
      .setExpirationTime("2h") // Set thời gian hết hạn của token
      .sign(secretKey);

    const { isAdmin, ...otherDetails } = user;
    const response = NextResponse.json({
      details: { ...otherDetails },
      token,
      isAdmin,
    });

    response.cookies.set("token", token, {
      httpOnly: true,
      secure: true,
      path: "/",
      sameSite: "Strict",
    });

    return response;
  } catch (err) {
    console.log(err);
    return NextResponse.json({
      error: "An error occurred while processing your request",
    });
  }
};
