import { NextResponse } from "next/server";
import prisma from "../../../../lib/prisma";

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const featured = searchParams.get("featured");
    const limit = searchParams.get("limit");
    let hotels;

    if (featured || limit) {
      hotels = await prisma.hotel.findMany({
        where: {
          featured: featured === "true",
        },
        take: Number(limit),
      });
    } else {
      hotels = await prisma.hotel.findMany();
    }
    return NextResponse.json(hotels);
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
    const newHotel = await prisma.hotel.create({
      data,
    });

    return NextResponse.json(newHotel);
  } catch (error) {
    console.log(error);
  }
}
