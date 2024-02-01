"use client";
import { formatPrice } from "@/utils/priceFormat";
import { useRouter } from "next/navigation";
import { useState, useRef } from "react";

const RoomList = ({ rooms }) => {
  const router = useRouter();
  const [currentRoom, setCurrentRoom] = useState([]);
  const [currentId, setCurrentId] = useState("");
  const ModalRoomRef = useRef();
  const handleDelete = async (id) => {
    try {
      await fetch("http://localhost:3000/api/rooms/" + id, {
        method: "DELETE",
        next: { tags: ["rooms"], revalidate: 10 },
      });
      alert("Xoá thành công");
      router.refresh();
    } catch (error) {
      console.log(error);
    }
  };

  const openModalRoom = (id) => {
    ModalRoomRef.current.showModal();
    const currentRoom = rooms.find((room) => room.id === id);
    setCurrentRoom(currentRoom);
    setCurrentId(id);
  };

  const handleUpdate = async () => {
    if (currentRoom !== null) {
      for (let key in currentRoom) {
        if (currentRoom[key] === "") {
          alert("Missing fields");
        }
      }
    }
    // console.log(currentRoom);
    try {
      await fetch("http://localhost:3000/api/rooms/" + currentId, {
        method: "PUT",
        body: JSON.stringify({ ...currentRoom }),
        next: { tags: ["rooms"], revalidate: 5 },
      });
      alert("Updated Success");
      router.refresh();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="table">
        {/* head */}
        <thead>
          <tr>
            <th></th>
            <th>Title</th>
            <th>Price</th>
            <th>Max People</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {rooms.map((room, index) => {
            return (
              <tr key={room.id}>
                <th>{++index}</th>
                <td>{room.title}</td>
                <td>{formatPrice(room.price)}</td>
                <td>{room.maxPeople}</td>
                <td>{room.desc}</td>
                <td className="space-x-2 text-white">
                  <button
                    className="bg-green-500 p-1"
                    onClick={() => openModalRoom(room.id)}>
                    Preview
                  </button>
                  <button
                    className="bg-red-500 p-1"
                    onClick={() => handleDelete(room.id)}>
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <dialog ref={ModalRoomRef} className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Update Room</h3>
          <div className="form-control">
            <label className="label">Title</label>
            <input
              type="text"
              defaultValue={currentRoom.title}
              onChange={(e) =>
                setCurrentRoom((prev) => {
                  return { ...prev, title: e.target.value };
                })
              }
              className="input input-bordered"
            />
          </div>

          <div className="form-control">
            <label className="label">Price</label>
            <input
              type="number"
              defaultValue={currentRoom.price}
              onChange={(e) =>
                setCurrentRoom((prev) => {
                  return { ...prev, price: Number(e.target.value) };
                })
              }
              className="input input-bordered"
            />
          </div>

          <div className="form-control">
            <label className="label">Max People</label>
            <input
              type="number"
              defaultValue={currentRoom.maxPeople}
              onChange={(e) =>
                setCurrentRoom((prev) => {
                  return { ...prev, maxPeople: Number(e.target.value) };
                })
              }
              className="input input-bordered"
            />
          </div>

          <div className="form-control">
            <label className="label">Description</label>
            <textarea
              onChange={(e) =>
                setCurrentRoom((prev) => {
                  return { ...prev, desc: e.target.value };
                })
              }
              defaultValue={currentRoom.desc}
              className="textarea textarea-bordered"
            />
          </div>

          <div className="modal-action">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn btn-secondary">Close</button>
            </form>
            <button className="btn btn-primary" onClick={handleUpdate}>
              Update
            </button>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default RoomList;
