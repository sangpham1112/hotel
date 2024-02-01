"use client";
import HeaderTitle from "./HeaderTitle";
import { formatPrice } from "@/utils/priceFormat";
import { useContext, useState, useEffect, useMemo } from "react";
import { SearchContext } from "@/context/SearchContext";

const ReserveModal = ({ title, name, price, rooms }) => {
  const { dates } = useContext(SearchContext);
  const [days, setDays] = useState(1);
  const [selectedRooms, setSelectedRooms] = useState([]);
  const MILLISECONDS_PER_DAY = 1000 * 60 * 60 * 24;

  function dayDifference(date1, date2) {
    const endDate = new Date(date1);
    const startDate = new Date(date2);
    const timeDiff = Math.abs(startDate.getTime() - endDate.getTime()) + 1;
    const diffDays = Math.ceil(timeDiff / MILLISECONDS_PER_DAY);
    return diffDays;
  }

  useEffect(() => {
    if (dates) {
      const days = dayDifference(dates[0].endDate, dates[0].startDate);
      setDays(days);
    }
  }, [dates]);

  const getDatesInRange = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const date = new Date(start.getTime());
    const dates = [];

    while (date <= end) {
      dates.push(new Date(date).getTime());
      date.setDate(date.getDate() + 1);
    }
    return dates;
  };

  const alldates = useMemo(() => {
    if (dates) getDatesInRange(dates[0].startDate, dates[0].endDate);
  }, [dates]);

  console.log(alldates);

  const isAvailable = (roomNumber) => {
    const isFound = roomNumber.unavailableDates.some((date) =>
      alldates.includes(new Date(date).getTime())
    );

    return !isFound;
  };

  const handleSelect = (e) => {
    const checked = e.target.checked;
    const value = e.target.value;
    setSelectedRooms(
      checked
        ? [...selectedRooms, value]
        : selectedRooms.filter((item) => item !== value)
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await Promise.all(
        selectedRooms.map(async (roomId) => {
          const res = await fetch(
            `http://localhost:3000/api/rooms/availability/${roomId}`,
            {
              method: "PUT",
              body: JSON.stringify({ dates: alldates }),
            }
          );
          if (!res.ok) {
            throw new Error("Network response was not ok");
          }
          return res.json();
        })
      );
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
    }
  };

  return (
    <>
      <div className="space-y-2 p-4">
        <HeaderTitle>{name}</HeaderTitle>
        <p className="text-gray-500 text-sm">{title}</p>
        <h3 className="font-bold text-2xl">
          {formatPrice(days * price)}
          <span className="font-thin">
            ({days} {days > 1 ? "days" : "day"})
          </span>
        </h3>
        <button
          className="btn btn-primary w-full"
          onClick={() =>
            document.getElementById("modal_reservation").showModal()
          }>
          Reserve or Book Now
        </button>
      </div>
      <dialog id="modal_reservation" className="modal">
        <form className="modal-box">
          <h3 className="font-bold text-lg mb-3">Select your room</h3>
          {rooms.map((room) => {
            return (
              <div
                className="flex justify-between shadow-md p-2 mb-2"
                key={room.id}>
                <div className="space-y-2">
                  <h5 className="font-bold">{room.title}</h5>
                  <p>{room.desc}</p>
                  <p className="text-sm">Max people {room.maxPeople}</p>
                  <h4 className="font-bold text-xl">
                    {formatPrice(room.price)}
                  </h4>
                </div>
                <div className="grid grid-cols-3">
                  {room.roomNumbers.map((item) => {
                    return (
                      <div className="col-span-1" key={item.id}>
                        <label className="label cursor-pointer flex flex-col">
                          <span className="text-sm text-gray-500">
                            {item.number}
                          </span>
                          <input
                            type="checkbox"
                            disabled={!isAvailable(item)}
                            value={item.id}
                            onChange={handleSelect}
                            className="checkbox"
                          />
                        </label>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
          <button className="btn btn-primary w-full mt-2" type="submit">
            Reserve Now !
          </button>
        </form>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </>
  );
};

export default ReserveModal;
