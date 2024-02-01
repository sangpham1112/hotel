import HeaderTitle from "@/app/(pages)/components/HeaderTitle";
import UsersList from "../UsersList";

const getUsers = async () => {
  try {
    const res = await fetch("http://localhost:3000/api/users", {
      method: "GET",
    });

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Có lỗi xảy ra:", error);
    throw error;
  }
};

const Admin = async () => {
  const users = await getUsers();
  return (
    <main className="px-6 mt-2">
      <HeaderTitle>Users</HeaderTitle>
      <UsersList users={users} />
    </main>
  );
};

export default Admin;
