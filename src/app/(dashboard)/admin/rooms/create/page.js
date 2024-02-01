import RoomCreateForm from "@/app/(dashboard)/RoomCreateForm";
import HeaderTitle from "@/app/(pages)/components/HeaderTitle";

const AdminRoomCreate = () => {
  return (
    <main className="px-4 w-[500px] mx-auto shadow-lg mt-3">
      <HeaderTitle>Room Create</HeaderTitle>
      <RoomCreateForm />
    </main>
  );
};

export default AdminRoomCreate;
