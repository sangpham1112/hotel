"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

const FormRegister = () => {
  const router = useRouter();
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPass] = useState("");
  const [phone, setPhone] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      return alert("confirm password not correct !");
    }
    fetch("http://localhost:3000/api/auth/register", {
      method: "POST",
      body: JSON.stringify({
        email,
        username,
        password,
        phone,
      }),
      next: { tags: ["users"] },
    })
      .then(alert("Đăng ký thành công"))
      .then(router.push("/login"))
      .catch((err) => console.log(err));
  };

  return (
    <form className="space-y-6 " onSubmit={onSubmit}>
      <div className="form-control">
        <label className="font-semibold">User Name</label>
        <input
          type="text"
          placeholder="Type here"
          onChange={(e) => setUserName(e.target.value)}
          className="input mt-1 input-bordered w-full "
        />
      </div>
      <div className="form-control">
        <label className="font-semibold">Phone</label>
        <input
          type="text"
          placeholder="Type here"
          onChange={(e) => setPhone(e.target.value)}
          className="input mt-1 input-bordered w-full "
        />
      </div>
      <div className="form-control">
        <label className="font-semibold">Email</label>
        <input
          type="email"
          placeholder="Type here"
          onChange={(e) => setEmail(e.target.value)}
          className="input mt-1 input-bordered w-full "
        />
      </div>
      <div className="form-control">
        <label className="font-semibold">Password</label>
        <input
          type="password"
          placeholder="Type here"
          onChange={(e) => setPassword(e.target.value)}
          className="input mt-1 input-bordered w-full"
        />
      </div>
      <div className="form-control">
        <label className="font-semibold">Confirm Password</label>
        <input
          type="password"
          placeholder="Type here"
          onChange={(e) => setConfirmPass(e.target.value)}
          className="input mt-1 input-bordered w-full"
        />
      </div>
      <button className="btn btn-primary text-white w-full" type="submit">
        Register
      </button>
    </form>
  );
};

export default FormRegister;
