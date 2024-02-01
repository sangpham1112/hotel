import { NextResponse } from "next/server";
import prisma from "../../../../../../lib/prisma";

export const PUT = async (request, { params }) => {
  const data = await request.json();
  try {
    await prisma.roomnumber.update({
      where: {
        roomId: params.id,
      },
      data: {
        unavailableDates: {
          push: data.dates,
        },
      },
    });
    return NextResponse.json("room updated");
  } catch (error) {
    console.log(error);
  }
};
