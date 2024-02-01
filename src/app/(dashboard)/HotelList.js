"use client";
import { formatPrice } from "@/utils/priceFormat";
import { useRouter } from "next/navigation";
import { useState, useRef } from "react";
import Image from "next/image";
import { UploadButton } from "@/utils/uploadthing";

const HotelList = ({ hotels }) => {
  const router = useRouter();
  const ModalRef = useRef();
  const [currentHotel, setCurrentHotel] = useState([]);
  const [currentId, setCurrentId] = useState("");

  const handleDelete = async (id) => {
    try {
      await fetch("http://localhost:3000/api/hotels/" + id, {
        method: "DELETE",
        next: { tags: ["hotels"], revalidate: 5 },
      });
      alert("Xoá thành công");
      router.refresh();
    } catch (error) {
      console.log(error);
    }
  };
  const openPreview = (id) => {
    ModalRef.current.showModal();
    const current = hotels.find((hotel) => hotel.id === id);
    setCurrentId(id);
    setCurrentHotel(current);
  };

  const handleUpdateHotel = async () => {
    if (currentHotel !== null) {
      for (let key in currentHotel) {
        if (currentHotel[key] === "") {
          alert("missing fields");
          return;
        }
      }
    }
    try {
      await fetch("http://localhost:3000/api/hotels/" + currentId, {
        method: "PUT",
        body: JSON.stringify({ ...currentHotel }),
        next: { tags: ["hotels"], revalidate: 5 },
      });
      alert("Updated Hotel");
      router.refresh();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="table table-md">
        <thead>
          <tr>
            <th></th>
            <th>Name</th>
            <th>Type</th>
            <th>City</th>
            <th>Address</th>
            {/* <th>Title</th> */}
            <th>Price</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {hotels.map((hotel, index) => {
            return (
              <tr key={hotel.id}>
                <th>{++index}</th>
                <td>{hotel.name}</td>
                <td>{hotel.type}</td>
                <td>{hotel.city}</td>
                <td>{hotel.address}</td>
                {/* <td>{hotel.title}</td> */}
                <td>{formatPrice(hotel.cheapestPrice)}</td>
                <td className="space-x-1 flex text-white">
                  <button
                    className="p-1 bg-green-500 round-md"
                    onClick={() => openPreview(hotel.id)}>
                    Preview
                  </button>
                  <button
                    className="p-1 bg-red-500 round-md"
                    onClick={() => handleDelete(hotel.id)}>
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <dialog className="modal px-3" ref={ModalRef}>
        <div className="modal-box space-y-2 w-8/12 max-w-5xl">
          <h3 className="font-bold text-lg">Update Hotel</h3>
          <div className="form-control">
            <label className="label">Name</label>
            <input
              type="text"
              defaultValue={currentHotel.name}
              onChange={(e) =>
                setCurrentHotel((prev) => {
                  return { ...prev, name: e.target.value };
                })
              }
              className="input input-bordered"
            />
          </div>

          <div className="form-control">
            <label className="label">Type</label>
            <select
              className="select select-bordered"
              onChange={(e) =>
                setCurrentHotel((prev) => {
                  return { ...prev, type: e.target.value };
                })
              }
              value={currentHotel.type}>
              <option value="cabin">Cabin</option>
              <option value="hotel">Hotel</option>
              <option value="apartment">Apartment</option>
              <option value="villa">Villa</option>
              <option value="resort">Resort</option>
            </select>
          </div>

          <div className="form-control">
            <label className="label">City</label>
            <select
              className="select select-bordered"
              onChange={(e) =>
                setCurrentHotel((prev) => {
                  return { ...prev, city: e.target.value };
                })
              }
              value={currentHotel.city}>
              <option value="Ha noi">Hà Nội</option>
              <option value="HCM">Hồ Chí Minh</option>
              <option value="Hue">Huế</option>
            </select>
          </div>

          <div className="form-control">
            <label className="label">Address</label>
            <input
              type="text"
              onChange={(e) =>
                setCurrentHotel((prev) => {
                  return { ...prev, address: e.target.value };
                })
              }
              defaultValue={currentHotel.address}
              className="input input-bordered"
            />
          </div>

          <div className="form-control">
            <label className="label">Title</label>
            <input
              type="text"
              onChange={(e) =>
                setCurrentHotel((prev) => {
                  return { ...prev, title: e.target.value };
                })
              }
              defaultValue={currentHotel.title}
              className="input input-bordered"
            />
          </div>

          <div className="form-control">
            <label className="label">Price</label>
            <input
              type="number"
              onChange={(e) =>
                setCurrentHotel((prev) => {
                  return { ...prev, cheapestPrice: Number(e.target.value) };
                })
              }
              defaultValue={currentHotel.cheapestPrice}
              className="input input-bordered"
            />
          </div>

          <div className="form-control">
            <label className="label">Description</label>
            <textarea
              onChange={(e) =>
                setCurrentHotel((prev) => {
                  return { ...prev, desc: e.target.value };
                })
              }
              defaultValue={currentHotel.desc}
              className="textarea textarea-bordered"
            />
          </div>

          <div className="form-control">
            <label className="label">Images</label>
            <div className="grid grid-cols-3 gap-3">
              {currentHotel.photos?.map((image, index) => {
                return (
                  <div className="col-span-1" key={index}>
                    <Image
                      width={200}
                      height={200}
                      src={image}
                      className="w-full h-full max-h-[200px]"
                    />
                  </div>
                );
              })}
            </div>
            <UploadButton
              endpoint="imageUploader"
              className="mt-2"
              onClientUploadComplete={(res) => {
                // console.log("Files: ", res);
                if (res) {
                  const photos = res.flatMap((image) => image.url);
                  setCurrentHotel((prev) => {
                    return { ...prev, photos: [...prev.photos, ...photos] };
                  });
                }
                alert("Upload Completed");
              }}
              onUploadError={(error) => {
                alert(`ERROR! ${error.message}`);
              }}
            />
          </div>

          <div className="modal-action">
            <button className="btn btn-primary" onClick={handleUpdateHotel}>
              Update
            </button>
            <form method="dialog">
              <button className="btn btn-secondary">Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default HotelList;
