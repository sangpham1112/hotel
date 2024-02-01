import NavbarAdmin from "@/app/(dashboard)/NavbarAdmin";
import SidebarAdmin from "@/app/(dashboard)/SidebarAdmin";

const Layout = ({ children }) => {
  return (
    <div className="drawer">
      <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col">
        <NavbarAdmin />
        {children}
      </div>
      <SidebarAdmin />
    </div>
  );
};

export default Layout;
