import Image from "next/image";
import Link from "next/link";

const CardGuestLove = ({ hotel }) => {
  return (
    <Link href={`/${hotel.id}`}>
      <figure>
        <Image
          src={hotel.photos[0]}
          alt="Shoes"
          width={200}
          height={200}
          className="h-[190px] max-h-full w-full"
        />
      </figure>
      <div className="space-y-1 p-1">
        <h2 className="card-title">{hotel.name}</h2>
        <span className="text-sm text-gray-500">{hotel.city}</span>
        <p className="text-sm font-semibold">{hotel.title}</p>
        <div className="card-actions justify-start items-center">
          <div className="bg-blue-500 px-1 text-sm text-white font-semibold">
            8,9
          </div>
          <div className="badge badge-outline">Excellent</div>
        </div>
      </div>
    </Link>
  );
};

export default CardGuestLove;
