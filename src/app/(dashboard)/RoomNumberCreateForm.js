"use client";
import { useState } from "react";

const RoomNumberCreateForm = () => {
  const [number, setNumber] = useState("");
  const [unavailableDates, setUnavailableDates] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <form className="space-y-6 my-6" onSubmit={onSubmit}>
      <div className="form-control">
        <label className="font-semibold">Number</label>
        <input
          type="number"
          placeholder="Type here"
          onChange={(e) => setNumber(e.target.value)}
          className="input input-bordered mt-1 w-full "
        />
      </div>
      <div className="form-control">
        <label className="font-semibold">UnAvailableDates</label>
        <input
          type="date"
          placeholder="Type here"
          onChange={(e) => setUnavailableDates(e.target.value)}
          className="input input-bordered mt-1 w-full"
        />
      </div>

      <button className="btn btn-primary text-white w-full">Create</button>
    </form>
  );
};

export default RoomNumberCreateForm;
