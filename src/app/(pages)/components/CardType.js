import Link from "next/link";

const CardType = ({ item, image }) => {
  const type = item.type.includes("s") ? item.type.replace("s", "") : item.type;
  return (
    <Link className="space-y-1 mb-3" href={`/types/${type}`}>
      <figure>
        <img
          src={image}
          alt={item.type}
          className="rounded-sm h-[150px] w-full max-h-auto"
        />
      </figure>
      <div className="space-y-1">
        <h2 className="text-lg font-semibold capitalize">{item.type}</h2>
        <p className="text-sm capitalize">
          {item.type} {item.count}
        </p>
      </div>
    </Link>
  );
};

export default CardType;
