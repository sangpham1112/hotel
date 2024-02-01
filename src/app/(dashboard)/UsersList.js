"use client";
import { useRouter } from "next/navigation";

const UsersList = ({ users }) => {
  const router = useRouter();
  const handleDeleteUser = async (id) => {
    try {
      await fetch("http://localhost:3000/api/users/" + id.toString(), {
        method: "DELETE",
        next: { revalidate: 5 },
      });
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
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => {
            return (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>
                  <div className="flex items-center gap-3">
                    <div>
                      <div className="font-bold">{user.username}</div>
                      <div className="text-sm opacity-50">{user?.country}</div>
                    </div>
                  </div>
                </td>
                <td>{user.email}</td>
                <td> {user.phone}</td>
                <td>
                  <button
                    className="bg-red-500 text-white p-1 capitalize"
                    onClick={() => handleDeleteUser(user.id)}>
                    delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default UsersList;
