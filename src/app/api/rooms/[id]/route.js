import { NextResponse } from "next/server";
import prisma from "../../../../../lib/prisma";

export async function GET(request, { params }) {
  const { id } = params;
  try {
    // console.log(params);
    const room = await prisma.room.findUnique({
      where: {
        id: id,
      },
    });
    return NextResponse.json(room);
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      error: "An error occurred while fetching rooms",
    });
  }
}

export async function PUT(request, { params }) {
  const { id } = params;
  const data = await request.json();
  const { id: currentId, ...other } = data;
  try {
    const updatedRoom = await prisma.room.update({
      where: {
        id: id,
      },
      data: {
        ...other,
      },
    });
    return NextResponse.json(updatedRoom);
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      error,
    });
  }
}

export async function DELETE(request, { params }) {
  const { id } = params;
  try {
    // console.log(params);
    const hotel = await prisma.room.delete({
      where: {
        id: id,
      },
    });
    return NextResponse.json(room);
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      error: "An error occurred while fetching hotels",
    });
  }
}
