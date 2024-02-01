"use client";
import dynamic from "next/dynamic";
import Link from "next/link";
const LogoutBtn = dynamic(() => import("./LogoutBtn"), {
  ssr: false,
});

const NavbarAdmin = () => {
  return (
    <div className="w-full navbar bg-blue-500 text-white">
      <div className="flex-1 lg:hidden">
        <label
          htmlFor="my-drawer-3"
          aria-label="open sidebar"
          className="btn btn-square btn-ghost">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            className="inline-block w-6 h-6 stroke-current">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"></path>
          </svg>
        </label>
      </div>
      <Link href="/admin" className="flex-1 px-2 mx-2">
        Admin Dashboard
      </Link>
      <div className="flex-none hidden lg:block">
        <ul className="menu menu-horizontal">
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <details>
              <summary>Hotels</summary>
              <ul
                className="p-2 text-gray-500 rounded-t-none"
                style={{ zIndex: "1000" }}>
                <li>
                  <Link href="/admin/hotels">List</Link>
                </li>
                <li>
                  <Link href="/admin/hotels/create">Create</Link>
                </li>
              </ul>
            </details>
          </li>
          <li>
            <details>
              <summary>Rooms</summary>
              <ul
                className="p-2 text-gray-500 rounded-t-none"
                style={{ zIndex: "1000" }}>
                <li>
                  <Link href="/admin/rooms">List</Link>
                </li>
                <li>
                  <Link href="/admin/rooms/create">Create</Link>
                </li>
              </ul>
            </details>
          </li>
          <LogoutBtn />
        </ul>
      </div>
    </div>
  );
};

export default NavbarAdmin;
