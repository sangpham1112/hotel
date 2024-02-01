import HotelCreateForm from "@/app/(dashboard)/HotelCreateForm";
import HeaderTitle from "@/app/(pages)/components/HeaderTitle";

const getRooms = async () => {
  try {
    const res = await fetch("http://localhost:3000/api/rooms", {
      method: "GET",
      cache: "no-store",
      next: { tags: ["rooms"] },
    });
    const data = res.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

const AdminHotelCreate = async () => {
  const rooms = await getRooms();
  console.log(rooms);
  return (
    <main className="px-4 w-[700px] mx-auto shadow-lg mt-3">
      <HeaderTitle>Hotel Create</HeaderTitle>
      <HotelCreateForm rooms={rooms} />
    </main>
  );
};

export default AdminHotelCreate;
