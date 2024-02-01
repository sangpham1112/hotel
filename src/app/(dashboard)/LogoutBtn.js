"use client";
import { AuthContext } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useContext } from "react";

const LogoutBtn = () => {
  const { dispatch, user } = useContext(AuthContext);
  const router = useRouter();

  const handleLogout = async () => {
    router.push("/");
    dispatch({ type: "LOGOUT" });
    const res = await fetch("http://localhost:3000/api/auth/logout", {
      method: "POST",
    });
    const data = await res.json();
    alert(data);
  };
  return (
    <>
      {user && (
        <li>
          <a onClick={handleLogout}>Logout</a>
        </li>
      )}
    </>
  );
};

export default LogoutBtn;
