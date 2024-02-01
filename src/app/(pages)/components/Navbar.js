"use client";
import { AuthContext } from "@/context/AuthContext";
import Link from "next/link";
import { useContext } from "react";

const Navbar = () => {
  const { user, dispatch } = useContext(AuthContext);
  const handleLogout = async () => {
    dispatch({ type: "LOGOUT" });
    const res = await fetch("http://localhost:3000/api/auth/logout", {
      method: "POST",
    });
    const data = await res.json();
    alert(data);
  };

  return (
    <div className="bg-blue-500 px-2 md:px-20 border-b-[1px] border-gray-400 shadow-sm  text-white">
      <div className="flex justify-between py-2 items-center">
        <Link href="/" className="btn btn-ghost text-3xl">
          Hotel
        </Link>
        {/* Mobile */}
        <div className="block md:hidden">
          <div className="drawer drawer-end">
            <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content">
              <label
                htmlFor="my-drawer-4"
                className="drawer-button cursor-pointer">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-6 h-6">
                  <path
                    fillRule="evenodd"
                    d="M3 6.75A.75.75 0 0 1 3.75 6h16.5a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 6.75ZM3 12a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 12Zm0 5.25a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75a.75.75 0 0 1-.75-.75Z"
                    clipRule="evenodd"
                  />
                </svg>
              </label>
            </div>
            <div className="drawer-side" style={{ zIndex: "1000" }}>
              <label
                htmlFor="my-drawer-4"
                aria-label="close sidebar"
                className="drawer-overlay"></label>
              <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content text-lg space-y-3">
                {user ? (
                  <>
                    <div className="dropdown">
                      <div className="avatar" tabIndex={0}>
                        <div className="w-8 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                          <img
                            src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
                            className=" cursor-pointer"
                          />
                        </div>
                      </div>
                      <ul
                        tabIndex={0}
                        className="dropdown-content z-[1] menu p-2 shadow bg-white text-gray-500 rounded-box w-auto min-w-[100px] mr-1">
                        {user?.isAdmin && (
                          <li>
                            <Link href="/admin">Dashboard</Link>
                          </li>
                        )}
                        <li>
                          <span onClick={handleLogout}>Logout</span>
                        </li>
                      </ul>
                    </div>
                  </>
                ) : (
                  <>
                    <Link
                      className="bg-white py-1 px-2 text-blue-400  rounded-sm"
                      href="/register">
                      Register
                    </Link>
                    <Link
                      href="/login"
                      className="bg-white py-1 px-2  text-blue-400 rounded-sm">
                      Login
                    </Link>
                  </>
                )}
              </ul>
            </div>
          </div>
        </div>
        {/* End Mobile */}
        <div className="hidden md:flex space-x-2">
          {user ? (
            <div className="dropdown">
              <div className="avatar" tabIndex={0}>
                <div className="w-8 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                  <img
                    src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
                    className=" cursor-pointer"
                  />
                </div>
              </div>
              <ul
                tabIndex={0}
                className="dropdown-content z-[1] menu p-2 shadow bg-white text-gray-500 rounded-box w-auto min-w-[100px] mr-1">
                {user.isAdmin && (
                  <li>
                    <Link href="/admin">Dashboard</Link>
                  </li>
                )}
                <li>
                  <span onClick={handleLogout}>Logout</span>
                </li>
              </ul>
            </div>
          ) : (
            <div className="space-x-2">
              <Link
                className="bg-white py-1 px-2 text-blue-400  rounded-sm"
                href="/register">
                Register
              </Link>
              <Link
                href="/login"
                className="bg-white py-1 px-2  text-blue-400 rounded-sm">
                Login
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* <div className="flex-none md:block hidden">
        <ul className="menu menu-horizontal px-1 space-x-3 text-[1rem]">
          <li>
            <a>Stays</a>
          </li>
          <li>
            <a>Flights</a>
          </li>
          <li>
            <a>Car rentals</a>
          </li>
          <li>
            <a>Attractions</a>
          </li>
          <li>
            <a>Airport taxis</a>
          </li>
        </ul>
      </div> */}
    </div>
  );
};

export default Navbar;
