import Link from "next/link";

const SidebarAdmin = () => {
  return (
    <div className="drawer-side">
      <label
        htmlFor="my-drawer-3"
        aria-label="close sidebar"
        className="drawer-overlay"></label>
      <ul className="menu p-4 w-80 min-h-full bg-base-200">
        <li>
          <Link href="/">Home</Link>
        </li>
        <li>
          <details>
            <summary>Hotels</summary>
            <ul className="p-2 bg-base-100 rounded-t-none">
              <li>
                <Link href="/admin/hotels">List</Link>
              </li>
              <li>
                <Link href="/admin/hotels/create">Create</Link>
              </li>
            </ul>
          </details>
        </li>
        <li>
          <details>
            <summary>Rooms</summary>
            <ul className="p-2 bg-base-100 rounded-t-none">
              <li>
                <Link href="/admin/rooms">List</Link>
              </li>
              <li>
                <Link href="/admin/rooms/create">Create</Link>
              </li>
            </ul>
          </details>
        </li>
        <li>
          <Link href="/admin/roomnumber">Room Number</Link>
        </li>
        <li>
          <a>Logout</a>
        </li>
      </ul>
    </div>
  );
};

export default SidebarAdmin;
