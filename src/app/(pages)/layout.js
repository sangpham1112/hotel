import Footer from "@/app/(pages)/components/Footer";
// import Navbar from "@/app/(pages)/components/Navbar";
import dynamic from "next/dynamic";

const Navbar = dynamic(() => import("@/app/(pages)/components/Navbar"), {
  ssr: false,
});

const Layout = ({ children }) => {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
};

export default Layout;
