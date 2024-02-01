import HeaderTitle from "@/app/(pages)/components/HeaderTitle";
import RoomList from "../../RoomList";

const getRooms = async () => {
  try {
    const res = await fetch("http://localhost:3000/api/rooms", {
      method: "GET",
      next: { tags: ["rooms"] },
      cache: "no-store",
    });
    return res.json();
  } catch (error) {
    console.log(error);
  }
};

const AdminRooms = async () => {
  const rooms = await getRooms();
  console.log(rooms);
  return (
    <main className="px-6 mt-2">
      <HeaderTitle>Rooms</HeaderTitle>
      <RoomList rooms={rooms} />
    </main>
  );
};

export default AdminRooms;
