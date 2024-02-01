import { formatPrice } from "@/utils/priceFormat";
import HeaderTitle from "../../components/HeaderTitle";
import Image from "next/image";
import Link from "next/link";

async function getHotelsType(type) {
  try {
    const res = await fetch("http://localhost:3000/api/hotels/type/" + type, {
      method: "GET",
      cache: "no-store",
      next: { revalidate: 5 },
    });
    return res.json();
  } catch (error) {
    console.log(error);
  }
}

const TypePage = async ({ params }) => {
  const { type } = params;
  const hotels = await getHotelsType(type);
  // console.log(hotels);
  return (
    <main className="min-h-screen px-2 md:px-24 mt-5 max-w-[1280px]">
      <HeaderTitle>Hotels type: {type}</HeaderTitle>
      <div className="grid grid-cols-4 gap-2 mt-3">
        {hotels.map((hotel) => {
          return (
            <Link
              className="col-span-2 relative"
              key={hotel.id}
              href={"/" + hotel.id}>
              <div className="flex shadow-md">
                <Image
                  className="max-w-[180px] h-[170px]"
                  src={hotel.photos[0]}
                  width={200}
                  height={200}
                />
                <div className="flex justify-between px-2 w-full">
                  <div>
                    <h5 className="text-lg font-semibold">{hotel.name}</h5>
                    <p className="font-thin">{hotel.city}</p>
                  </div>
                  <span className="absolute top-0 right-1 bg-blue-500 text-white p-1 rounded-sm">
                    8.9
                  </span>
                  <div className="flex items-center">
                    <h3 className="font-bold text-xl">
                      {formatPrice(hotel.cheapestPrice)}
                    </h3>
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </main>
  );
};

export default TypePage;
