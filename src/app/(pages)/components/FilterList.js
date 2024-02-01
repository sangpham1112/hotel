"use client";
import { useContext, useState, useCallback, useEffect } from "react";
import HeaderTitle from "./HeaderTitle";
import { SearchContext } from "@/context/SearchContext";
import { format } from "date-fns";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const FilterList = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { dispatch } = useContext(SearchContext);
  const router = useRouter();
  const [priceMax, setPriceMax] = useState(0);
  const [priceMin, setPriceMin] = useState(0);
  const {
    city,
    dates: currentDates,
    options: curentOptions,
  } = useContext(SearchContext);
  const [destination, setDestination] = useState(() => {
    if (city) {
      return city;
    }
    return "";
  });
  const [openDate, setOpenDate] = useState(false);
  const [dates, setDates] = useState(() => {
    if (currentDates) {
      return currentDates;
    }
    return [
      {
        startDate: new Date(),
        endDate: new Date(),
        key: "selection",
      },
    ];
  });

  const [options, setOptions] = useState(() => {
    if (curentOptions) {
      return curentOptions;
    }
    return {
      adult: 1,
      children: 0,
      room: 1,
    };
  });

  useEffect(() => {
    setDestination(city);
    setDates(dates);
    setOptions(options);
  }, [city, options, dates]);

  const createQueryString = useCallback(
    (name, value, params) => {
      if (value == null || value == 0) {
        params.delete(name);
      } else {
        params.set(name, value);
      }
      return params.toString();
    },
    [searchParams]
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    if (priceMin !== null && priceMax !== null && priceMin > priceMax) {
      alert("Price Max must be bigger than Price Min");
      return;
    }
    const params = new URLSearchParams(searchParams.toString());
    const filters = [
      { name: "city", value: destination },
      { name: "pricemax", value: priceMax },
      { name: "pricemin", value: priceMin },
    ];
    filters.forEach((filter) => {
      createQueryString(filter.name, filter.value, params);
    });
    dispatch({
      type: "NEW_SEARCH",
      payload: { city: destination, dates, options },
    });
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="bg-yellow-300 p-2 rounded-sm">
      <HeaderTitle>
        <span className="text-white ml-1 text-2xl shadow-sm">Search</span>
      </HeaderTitle>
      <form className="space-y-3" onSubmit={handleSubmit}>
        <div className="form-control">
          <label className="label">Destination</label>
          <input
            className="input"
            type="text"
            placeholder="Ha noi, HCM, Hue"
            defaultValue={destination}
            onChange={(e) => setDestination(e.target.value)}
          />
        </div>
        <div className="form-control">
          <label className="label">Check-in Date</label>
          <div
            onClick={() => setOpenDate(!openDate)}
            className="bg-white cursor-pointer flex justify-between items-center flex-1 md:relative text-center border border-gray-300 p-2 rounded-md md:border-none w-full h-full">
            <span className="">
              {`${format(dates[0].startDate, "MM/dd/yyyy")} to ${format(
                dates[0].endDate,
                "MM/dd/yyyy"
              )}`}
            </span>
            {/* Icon */}
            <svg
              viewBox="0 0 24 24"
              fill="none"
              className="w-[20px] h-[20px]"
              xmlns="http://www.w3.org/2000/svg">
              <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
              <g
                id="SVGRepo_tracerCarrier"
                strokeLinecap="round"
                strokeLinejoin="round"></g>
              <g id="SVGRepo_iconCarrier">
                <path
                  d="M3 9H21M7 3V5M17 3V5M6 12H8M11 12H13M16 12H18M6 15H8M11 15H13M16 15H18M6 18H8M11 18H13M16 18H18M6.2 21H17.8C18.9201 21 19.4802 21 19.908 20.782C20.2843 20.5903 20.5903 20.2843 20.782 19.908C21 19.4802 21 18.9201 21 17.8V8.2C21 7.07989 21 6.51984 20.782 6.09202C20.5903 5.71569 20.2843 5.40973 19.908 5.21799C19.4802 5 18.9201 5 17.8 5H6.2C5.0799 5 4.51984 5 4.09202 5.21799C3.71569 5.40973 3.40973 5.71569 3.21799 6.09202C3 6.51984 3 7.07989 3 8.2V17.8C3 18.9201 3 19.4802 3.21799 19.908C3.40973 20.2843 3.71569 20.5903 4.09202 20.782C4.51984 21 5.07989 21 6.2 21Z"
                  stroke="#000000"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </g>
            </svg>

            {openDate && (
              <DateRange
                editableDateInputs={true}
                onChange={(item) => setDates([item.selection])}
                moveRangeOnFirstSelection={false}
                ranges={dates}
                className="md:absolute md:z-10 top-10"
                style={{ top: 30, left: 50 }}
                minDate={new Date()}
              />
            )}
          </div>
        </div>
        <div className="form-control">
          <label className="label border-gray-300">Options</label>
          <ul className="space-y-3">
            <li className="flex justify-between">
              <span className="label">Min Price</span>
              <input
                className="input"
                type="number"
                min={0}
                onChange={(e) => setPriceMin(Number(e.target.value))}
              />
            </li>
            <li className="flex justify-between">
              <span className="label">Max Price</span>
              <input
                className="input"
                type="number"
                min={0}
                onChange={(e) => setPriceMax(Number(e.target.value))}
              />
            </li>
            <li className="flex justify-between">
              <span className="label">Adult</span>
              <div className="flex justify-between items-center shadow-md round-md">
                <input
                  type="number"
                  min={0}
                  defaultValue={options.adult}
                  className="input input-bordered"
                  placeholder={options.adult}
                />
              </div>
            </li>
            <li className="flex justify-between">
              <span className="label">Children</span>
              <div className="flex justify-between items-center shadow-md round-md">
                <input
                  type="number"
                  min={0}
                  defaultValue={options.children}
                  className="input input-bordered"
                  placeholder={options.children}
                />
              </div>
            </li>
            <li className="flex justify-between">
              <span className="label">Room</span>
              <div className="flex justify-between items-center shadow-md round-md">
                <input
                  type="number"
                  min={1}
                  defaultValue={options.room}
                  className="input input-bordered"
                  placeholder={options.room}
                />
              </div>
            </li>
          </ul>
        </div>
        <button className="btn btn-primary w-full p-1" type="submit">
          Search
        </button>
      </form>
    </div>
  );
};

export default FilterList;
