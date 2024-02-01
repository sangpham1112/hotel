import { NextResponse } from "next/server";
import prisma from "../../../../../lib/prisma";

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const city = searchParams.get("city");
    const maxPrice = Number(searchParams.get("pricemax"));
    const minPrice = Number(searchParams.get("pricemin"));
    let hotels;

    if (city || maxPrice || minPrice) {
      hotels = await prisma.hotel.findMany({
        where: {
          city: city,
          cheapestPrice: {
            gte: minPrice || undefined,
            lte: maxPrice || undefined,
          },
        },
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
