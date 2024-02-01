"use client";
import { AuthContext } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useState, useContext } from "react";
const FormLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const { loading, error, dispatch } = useContext(AuthContext);

  const onSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGIN_START" });
    try {
      const res = await fetch("http://localhost:3000/api/auth/login", {
        method: "POST",
        body: JSON.stringify({
          email,
          password,
        }),
      });
      const user = await res.json();
      if (user.error) {
        dispatch({ type: "LOGIN_FAILURE", payload: user.error });
        return;
      }
      if (user.isAdmin) {
        dispatch({ type: "LOGIN_SUCCESS", payload: user });
        alert("Đăng nhập thành công ");
        router.push("/admin");
      } else {
        dispatch({ type: "LOGIN_SUCCESS", payload: user });
        alert("Đăng nhập thành công ");
        router.push("/");
      }
    } catch (error) {
      dispatch({ type: "LOGIN_FAILURE", payload: error });
    }
  };

  return (
    <form className="space-y-6 " onSubmit={onSubmit}>
      {error && <span className="text-red-400">{error}</span>}
      <div className="form-control">
        <label className="font-semibold">Email</label>
        <input
          type="email"
          placeholder="Type here"
          onChange={(e) => setEmail(e.target.value)}
          className="input input-bordered mt-1 w-full "
        />
      </div>
      <div className="form-control">
        <label className="font-semibold">Password</label>
        <input
          type="password"
          placeholder="Type here"
          onChange={(e) => setPassword(e.target.value)}
          className="input input-bordered mt-1 w-full"
        />
      </div>
      <button className="btn btn-primary text-white w-full" disabled={loading}>
        {loading ? "Login..." : "Login"}
      </button>
    </form>
  );
};

export default FormLogin;
