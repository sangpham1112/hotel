"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

const RoomCreateForm = () => {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [maxPeople, setMaxPeople] = useState(0);
  const [roomNumbers, setRoomNumbers] = useState([]);
  const [desc, setDesc] = useState("");

  const handleRoomChange = (e) => {
    const value = e.target.value;
    let rooms;
    if (value.includes(",")) {
      rooms = value.split(",").map((item) => {
        return { number: item.trim(), unavailableDates: [] };
      });
    } else {
      rooms = [{ number: value.trim(), unavailableDates: [] }];
    }
    setRoomNumbers(rooms);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!title || !price || maxPeople === 0 || !desc) {
      return alert("Thiếu field");
    }
    try {
      await fetch("http://localhost:3000/api/rooms", {
        method: "POST",
        body: JSON.stringify({
          title,
          price,
          maxPeople,
          desc,
          roomNumbers,
        }),
        next: { tags: ["rooms"] },
      });
      router.push("/admin/rooms");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <form className="space-y-6 my-6" onSubmit={onSubmit}>
      <div className="form-control">
        <label className="font-semibold">Title</label>
        <input
          type="text"
          placeholder="Type here"
          onChange={(e) => setTitle(e.target.value)}
          className="input input-bordered mt-1 w-full "
        />
      </div>

      <div className="form-control">
        <label className="font-semibold">Price</label>
        <input
          type="number"
          placeholder="Type here"
          onChange={(e) => setPrice(Number(e.target.value))}
          className="input input-bordered mt-1 w-full"
        />
      </div>
      <div className="form-control">
        <label className="font-semibold">Max people</label>
        <input
          type="number"
          placeholder="Type here"
          onChange={(e) => setMaxPeople(Number(e.target.value))}
          className="input input-bordered mt-1 w-full"
        />
      </div>
      <div className="form-control">
        <label className="font-semibold">Description</label>
        <input
          type="text"
          placeholder="Type here"
          onChange={(e) => setDesc(e.target.value)}
          className="input input-bordered mt-1 w-full"
        />
      </div>

      <div className="form-control">
        <label className="font-semibold">Room numbers</label>
        <input
          type="text"
          placeholder="101,102,103,104"
          onChange={(e) => handleRoomChange(e)}
          className="input input-bordered mt-1 w-full"
        />
      </div>

      <button className="btn btn-primary text-white w-full">Create</button>
    </form>
  );
};

export default RoomCreateForm;
