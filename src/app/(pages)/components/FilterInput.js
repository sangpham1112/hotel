"use client";
import { SearchContext } from "@/context/SearchContext";
import { format } from "date-fns";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useContext } from "react";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file

const FilterInput = () => {
  const { dispatch } = useContext(SearchContext);
  const router = useRouter();
  const [openDate, setOpenDate] = useState(false);
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams.toString());
  const [destination, setDestination] = useState("");
  const [dates, setDates] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);

  const [openOptions, setOpenOptions] = useState(false);
  const [options, setOptions] = useState({
    adult: 1,
    children: 0,
    room: 1,
  });

  const handleOption = (name, operation) => {
    setOptions((prev) => {
      return {
        ...prev,
        [name]: operation === "i" ? options[name] + 1 : options[name] - 1,
      };
    });
  };

  const handleSearch = () => {
    dispatch({
      type: "NEW_SEARCH",
      payload: { city: destination, dates, options },
    });
    params.set("city", destination);
    router.push(`/list?${params.toString()}`);
  };
  return (
    <div className="flex flex-col items-center space-y-2 md:space-y-0 md:flex-row justify-center md:border md:border-gray-300 flex-shrink-0">
      <input
        type="text"
        onChange={(e) => setDestination(e.target.value)}
        className="p-2 outline-none flex-1 w-full input input-ghost border border-gray-300 md:border-none focus:bg-inherit"
        placeholder="Where are you going ? (HCM, Hue, Ha noi)"
      />
      <div
        onClick={() => setOpenDate(!openDate)}
        className="cursor-pointer flex justify-between items-center flex-1 md:relative text-center border border-gray-300 p-1 rounded-md md:border-none w-full h-full">
        <span className="">{`${format(
          dates[0].startDate,
          "MM/dd/yyyy"
        )} to ${format(dates[0].endDate, "MM/dd/yyyy")}`}</span>
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
      <div
        className="flex-1 w-full md:border-l-[1px] border-gray-300 md:pl-2 md:ml-2 cursor-pointer relative"
        onClick={() => setOpenOptions(!openOptions)}>
        <span className="md:border-none border border-gray-300 p-1">
          {`${options.adult} adult · ${options.children} children · ${options.room} room`}
        </span>
        <ul
          className={
            openOptions
              ? "z-[1] p-2 shadow bg-base-100 rounded-box absolute top-10 space-x-2 space-y-2 w-2/3"
              : "hidden"
          }>
          <li className="flex justify-between items-center">
            <p className="text-blue-600 font-semibold text-lg">Children</p>
            <div className="flex justify-between items-center border border-gray-200 shadow-md round-md">
              <button
                className="btn btn-ghost"
                onClick={() => handleOption("children", "i")}>
                +
              </button>{" "}
              <span>{options.children}</span>
              <button
                className="btn btn-ghost"
                onClick={() => handleOption("children", "d")}
                disabled={options.children <= 0}>
                -
              </button>
            </div>
          </li>
          <li className="flex justify-between items-center">
            <p className="text-blue-600 font-semibold text-lg">Adult</p>
            <div className="flex justify-between items-center border border-gray-200 shadow-md round-md">
              <button
                className="btn btn-ghost"
                onClick={() => handleOption("adult", "i")}>
                +
              </button>{" "}
              <span>{options.adult}</span>
              <button
                className="btn btn-ghost"
                onClick={() => handleOption("adult", "d")}
                disabled={options.adult <= 0}>
                -
              </button>
            </div>
          </li>
          <li className="flex justify-between items-center">
            <p className="text-blue-600 font-semibold text-lg">Room</p>
            <div className="flex justify-between items-center border border-gray-200 shadow-md round-md">
              <button
                className="btn btn-ghost"
                onClick={() => handleOption("room", "i")}>
                +
              </button>{" "}
              <span>{options.room}</span>
              <button
                className="btn btn-ghost"
                onClick={() => handleOption("room", "d")}
                disabled={options.room <= 0}>
                -
              </button>
            </div>
          </li>
        </ul>
      </div>
      <button
        className=" bg-blue-500 font-bold text-white p-2 md:w-[100px] w-full md:mr-1"
        onClick={handleSearch}>
        Search
      </button>
    </div>
  );
};

export default FilterInput;
