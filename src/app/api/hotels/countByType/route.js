import { NextResponse } from "next/server";
import prisma from "../../../../../lib/prisma";

export const GET = async () => {
  try {
    const hotelCount = await prisma.hotel.count({
      where: { type: "hotel" },
    });
    const apartmentCount = await prisma.hotel.count({
      where: { type: "apartment" },
    });
    const resortCount = await prisma.hotel.count({
      where: { type: "resort" },
    });
    const villaCount = await prisma.hotel.count({
      where: { type: "villa" },
    });
    const cabinCount = await prisma.hotel.count({
      where: { type: "cabin" },
    });

    return NextResponse.json([
      { type: "hotel", count: hotelCount },
      { type: "apartments", count: apartmentCount },
      { type: "resorts", count: resortCount },
      { type: "villas", count: villaCount },
      { type: "cabins", count: cabinCount },
    ]);
  } catch (err) {
    console.log(err);
  }
};
