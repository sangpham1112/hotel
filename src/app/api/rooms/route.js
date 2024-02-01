import { NextResponse } from "next/server";
import prisma from "../../../../lib/prisma";

export async function GET(req) {
  try {
    const rooms = await prisma.room.findMany();
    return NextResponse.json(rooms);
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      error: "An error occurred while fetching hotels",
    });
  }
}

export async function POST(req) {
  try {
    const data = await req.json();
    const { roomNumbers, ...otherData } = data;
    const newRoom = await prisma.room.create({
      data: {
        ...otherData,
        roomNumbers: {
          create: roomNumbers.map((roomNumber) => ({
            number: parseInt(roomNumber.number),
            unavailableDates: roomNumber.unavailableDates,
          })),
        },
      },
    });

    return NextResponse.json(newRoom);
  } catch (error) {
    console.error("Error creating room:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
