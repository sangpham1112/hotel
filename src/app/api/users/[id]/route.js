import { NextResponse } from "next/server";
import prisma from "../../../../../lib/prisma";

export async function GET(request, { params }) {
  const { id } = params;
  try {
    // console.log(params);
    const user = await prisma.user.findUnique({
      where: {
        id: id,
      },
    });
    return NextResponse.json(user);
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      error: "An error occurred while fetching rooms",
    });
  }
}

export async function UPDATE(request, { params }) {
  const { id } = params;
  const data = request.json();
  try {
    // console.log(params);
    const updatedUser = await prisma.user.update({
      where: {
        id: id,
      },
      data,
    });
    return NextResponse.json(updatedUser);
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      error: "An error occurred while fetching users",
    });
  }
}

export async function DELETE(request, { params }) {
  const { id } = params;
  try {
    // console.log(params);
    const user = await prisma.user.delete({
      where: {
        id: id,
      },
    });
    return NextResponse.json(user);
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      error: "An error occurred while fetching hotels",
    });
  }
}
