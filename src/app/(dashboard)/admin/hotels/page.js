import HeaderTitle from "@/app/(pages)/components/HeaderTitle";
import HotelList from "../../HotelList";

const getHotels = async () => {
  try {
    const res = await fetch("http://localhost:3000/api/hotels", {
      method: "GET",
      next: { tags: ["hotels"] },
      cache: "no-store",
    });
    return res.json();
  } catch (error) {
    console.log(error);
  }
};

const AdminHotels = async () => {
  const hotels = await getHotels();
  return (
    <main className="px-6 mt-2">
      <HeaderTitle>Hotels</HeaderTitle>
      <HotelList hotels={hotels} />
    </main>
  );
};

export default AdminHotels;
