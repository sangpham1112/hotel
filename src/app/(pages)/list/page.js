import dynamic from "next/dynamic";
import FilterItems from "../components/FilterItems";
const FilterList = dynamic(
  () => import("@/app/(pages)/components/FilterList"),
  {
    ssr: false,
  }
);

const getFilterHotels = async (city, pricemax, pricemin) => {
  try {
    const res = await fetch(
      `http://localhost:3000/api/hotels/filter?city=${city}&pricemax=${pricemax}&pricemin=${pricemin}`,
      {
        method: "GET",
        cache: "no-store",
      }
    );
    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};
const List = async ({ searchParams }) => {
  const { city, pricemax, pricemin } = searchParams;
  const hotels = await getFilterHotels(city, pricemax, pricemin);
  return (
    <main className="min-h-screen px-2 md:px-24 mt-5 max-w-[1280px]">
      <div className="grid grid-cols-9 gap-2">
        <div className="md:col-span-3 col-span-9">
          <FilterList />
        </div>
        <div className="md:col-span-6 col-span-9">
          <FilterItems hotels={hotels} />
        </div>
      </div>
    </main>
  );
};

export default List;
