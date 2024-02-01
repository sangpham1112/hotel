import { NextResponse } from "next/server";
import prisma from "../../../../../lib/prisma";

export const GET = async (req) => {
  const { searchParams } = new URL(req.url);
  const cities = searchParams.get("cities").split(",");
  try {
    if (cities) {
      const list = await Promise.all(
        cities.map((city) => {
          return prisma.hotel.count({
            where: {
              city,
            },
          });
        })
      );
      return NextResponse.json(list);
    }
  } catch (err) {
    next(err);
  }
};
