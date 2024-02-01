import bcrypt from "bcryptjs";
import { NextResponse } from "next/server.js";
import prisma from "../../../../../lib/prisma";

export const POST = async (req) => {
  try {
    const data = await req.json();
    const salt = bcrypt.genSaltSync(10);
    // Sử dụng chuỗi mật khẩu thay vì số
    const hash = bcrypt.hashSync(String(data.password), salt);
    await prisma.user.create({
      data: {
        ...data,
        password: hash,
      },
    });
    return NextResponse.json("User has been created.");
  } catch (err) {
    console.log(err);
    // Trả về lỗi cho client nếu có lỗi xảy ra
    return NextResponse.json({
      error: "An error occurred while creating the user",
    });
  }
};
