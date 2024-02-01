import { NextResponse } from "next/server";
import prisma from "../../../../../../lib/prisma";

export async function GET(req, { params }) {
  const { type } = params;
  try {
    const hotels = await prisma.hotel.findMany({
      where: {
        type: type,
      },
    });
    return NextResponse.json(hotels);
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      error: "An error occurred while fetching hotels",
    });
  }
}
