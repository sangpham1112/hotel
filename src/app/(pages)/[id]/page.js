import ReserveModal from "@/app/(pages)/components/ReserveModal";
import Image from "next/image";

const getSingleHotel = async (id) => {
  try {
    const res = await fetch(`http://localhost:3000/api/hotels/${id}`, {
      method: "GET",
      cache: "no-cache",
      next: { tags: ["hotels"] },
    });
    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

const SingleHotel = async ({ params }) => {
  const { id } = params;
  const { hotel, rooms } = await getSingleHotel(id);

  return (
    <main className="min-h-screen px-2 md:px-24 mt-5 max-w-[1280px]">
      <div className="flex justify-between mt-3 items-center">
        <div className="space-y-2 max-w-[550px]">
          <h4 className="font-bold text-2xl">{hotel.name}</h4>
          <p className="text-sm text-gray-400 flex items-start space-x-1">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              className="w-[20px] h-[20px] fill-current"
              xmlns="http://www.w3.org/2000/svg">
              <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
              <g
                id="SVGRepo_tracerCarrier"
                strokeLinecap="round"
                strokeLinejoin="round"></g>
              <g id="SVGRepo_iconCarrier">
                <path
                  d="M12 21C15.5 17.4 19 14.1764 19 10.2C19 6.22355 15.866 3 12 3C8.13401 3 5 6.22355 5 10.2C5 14.1764 8.5 17.4 12 21Z"
                  stroke="#000000"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M12 12C13.1046 12 14 11.1046 14 10C14 8.89543 13.1046 8 12 8C10.8954 8 10 8.89543 10 10C10 11.1046 10.8954 12 12 12Z"
                  stroke="#000000"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </g>
            </svg>
            <span> {hotel.address}</span>
          </p>
          <p className="text-md text-blue-400 flex items-center">
            Location {hotel.distance} Km
          </p>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-1 mt-3">
        {hotel.photos.map((image) => {
          return (
            <div className="col-span-3 md:col-span-1">
              <Image
                src={image}
                width={150}
                height={100}
                className="w-full h-[200px] rounded-sm"
              />
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-4 mt-3 gap-2">
        <div className="md:col-span-3 col-span-4">
          <p className=" text-gray-600">{hotel.desc}</p>
        </div>
        {rooms.length > 0 && (
          <div className="md:col-span-1 col-span-4 bg-blue-200 rounded-sm">
            <ReserveModal
              title={hotel.title}
              name={hotel.name}
              price={hotel.cheapestPrice}
              rooms={rooms}
            />
          </div>
        )}
      </div>
    </main>
  );
};

export default SingleHotel;
