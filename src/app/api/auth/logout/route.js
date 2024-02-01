import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export const POST = async () => {
  try {
    const cookiesList = cookies();
    const hasToken = cookiesList.has("token");
    if (hasToken) cookies().delete("token");
    return NextResponse.json("Logout Success !");
  } catch (err) {
    console.log(err);
    return NextResponse.json({
      error: "An error occurred while processing your request",
    });
  }
};
