import ListCard from "./ListCard";

const FilterItems = ({ hotels }) => {
  return (
    <ul className="menu bg-inherit rounded-box space-y-2">
      {hotels.map((hotel) => {
        return (
          <li key={hotel.id}>
            <ListCard hotel={hotel} />
          </li>
        );
      })}
    </ul>
  );
};

export default FilterItems;
