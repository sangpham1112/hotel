import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

export default async function middleware(request) {
  const token = request.cookies.get("token")?.value;
  const url = request.nextUrl.pathname;

  if (!token) {
    return NextResponse.redirect("http://localhost:3000/login");
  }

  try {
    const { payload } = await jwtVerify(
      token,
      new TextEncoder().encode(process.env.JWT_SECRET)
    );
    if (!payload.isAdmin && url.includes("/admin")) {
      // Nếu người dùng không phải là admin, redirect họ về trang chủ
      return NextResponse.redirect("http://localhost:3000/");
    }
  } catch (err) {
    // Nếu có lỗi khi xác thực token, redirect người dùng về trang đăng nhập
    return NextResponse.redirect("http://localhost:3000/login");
  }
  // Nếu người dùng là admin, cho phép tiếp tục yêu cầu
  return NextResponse.next();
}

export const config = {
  matcher: "/admin/:path*",
};
