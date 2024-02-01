import { formatPrice } from "@/utils/priceFormat";
import Image from "next/image";
import Link from "next/link";

const ListCard = ({ hotel }) => {
  return (
    <div className="card card-side bg-base-100 shadow-xl">
      <figure>
        <Image
          src={hotel.photos[0]}
          alt="Movie"
          height={200}
          width={200}
          className="h-full w-[200px] hidden lg:block"
        />
      </figure>
      <div className="card-body space-y-1">
        <div className="flex justify-between items-center ">
          <h2 className="card-title">{hotel.name}</h2>
          <div className="text-md">
            Excellent <span className="bg-blue-400 text-white p-1">8,9</span>
          </div>
        </div>
        <span className="badge badge-success text-white">
          Free Ariport Taxi
        </span>
        <p className="font-bold">{hotel.title}</p>
        <div className="flex justify-between">
          <span className="text-3xl font-bold">
            {formatPrice(hotel.cheapestPrice)}
          </span>
        </div>

        <div className="card-actions justify-end items-center">
          <p className="text-green-500">Free cancelation</p>
          <Link href={"/" + hotel.id} className="btn btn-primary">
            See availablity
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ListCard;
