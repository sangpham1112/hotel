import { NextResponse } from "next/server";
import prisma from "../../../../../lib/prisma";

export async function GET(request, { params }) {
  const { id } = params;
  try {
    // console.log(params);
    const hotel = await prisma.hotel.findUnique({
      where: {
        id: id,
      },
    });

    const roomPromises = hotel.rooms.map((roomId) =>
      prisma.room.findUnique({
        where: { id: roomId },
        include: {
          roomNumbers: true,
        },
      })
    );
    const rooms = await Promise.all(roomPromises);

    return NextResponse.json({ hotel, rooms });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      error: "An error occurred while fetching hotels",
    });
  }
}

export async function PUT(request, { params }) {
  const { id } = params;
  const data = await request.json();
  const { id: currentId, ...other } = data;
  try {
    const hotel = await prisma.hotel.update({
      where: {
        id: id,
      },
      data: {
        ...other,
      },
    });
    return NextResponse.json(hotel);
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      error: "An error occurred while fetching hotels",
    });
  }
}

export async function DELETE(request, { params }) {
  const { id } = params;
  try {
    // console.log(params);
    const hotel = await prisma.hotel.delete({
      where: {
        id: id,
      },
    });
    return NextResponse.json(hotel);
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      error: "An error occurred while fetching hotels",
    });
  }
}
