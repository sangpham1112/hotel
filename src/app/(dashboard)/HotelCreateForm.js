"use client";
import { useRouter } from "next/navigation";
import { useState, useRef } from "react";
import { UploadButton } from "@/utils/uploadthing";
import Image from "next/image";
import useAutosizeTextArea from "@/utils/useTextAreaResize";

const HotelCreateForm = ({ rooms }) => {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [name, setName] = useState("");
  const [type, setType] = useState("hotel");
  const [address, setAddress] = useState("");
  const [distance, setDistance] = useState("");
  const [city, setCity] = useState("Hue");
  const [desc, setDesc] = useState("");
  const [featured, setFeatured] = useState(true);
  const [cheapestPrice, setCheapestPrice] = useState(0);
  const [photos, setPhotos] = useState([]);
  const [roomsHotel, setRoomsHotel] = useState([]);

  const textAreaRef = useRef();
  useAutosizeTextArea(textAreaRef.current, desc);

  console.log(roomsHotel);
  const onSubmit = async (e) => {
    e.preventDefault();
    // Kiểm tra xem các trường có null hoặc rỗng không
    if (
      !title ||
      !name ||
      !type ||
      !address ||
      !distance ||
      !city ||
      !desc ||
      !photos ||
      cheapestPrice === 0
    ) {
      alert("Vui lòng điền đầy đủ thông tin trước khi gửi.");
      return;
    }

    try {
      await fetch("http://localhost:3000/api/hotels", {
        method: "POST",
        body: JSON.stringify({
          title,
          name,
          type,
          address,
          distance,
          city,
          desc,
          featured,
          cheapestPrice,
          photos,
        }),
        next: { tags: ["hotels"] },
      });
      router.push("/admin/hotels");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <form className="space-y-6 my-6" onSubmit={onSubmit}>
      <div className="form-control">
        <label className="font-semibold">Name</label>
        <input
          type="text"
          placeholder="Type here"
          onChange={(e) => setName(e.target.value)}
          className="input input-bordered mt-1 w-full "
        />
      </div>
      <div className="form-control">
        <label className="font-semibold">Title</label>
        <input
          type="text"
          placeholder="Type here"
          onChange={(e) => setTitle(e.target.value)}
          className="input input-bordered mt-1 w-full "
        />
      </div>
      <div className="form-control">
        <label className="font-semibold">Type</label>
        <select
          placeholder="Type here"
          defaultValue={type}
          onChange={(e) => setType(e.target.value)}
          className="select select-bordered mt-1 w-full">
          <option value="hotel">Hotel</option>
          <option value="villa">Vila</option>
          <option value="cabin">Cabin</option>
          <option value="apartment">Apartment</option>
          <option value="resort">Resort</option>
        </select>
      </div>
      <div className="form-control">
        <label className="font-semibold">City</label>
        <select
          placeholder="Type here"
          defaultValue={city}
          onChange={(e) => setCity(e.target.value)}
          className="select select-bordered mt-1 w-full">
          <option value="Ha noi">Hà nội</option>
          <option value="Hue">Huế</option>
          <option value="HCM">Hồ Chí Minh</option>
        </select>
      </div>
      <div className="form-control">
        <label className="font-semibold">Address</label>
        <input
          type="text"
          placeholder="Type here"
          onChange={(e) => setAddress(e.target.value)}
          className="input input-bordered mt-1 w-full"
        />
      </div>
      <div className="form-control">
        <label className="font-semibold">Distance</label>
        <input
          type="number"
          placeholder="Type here"
          onChange={(e) => setDistance(e.target.value)}
          className="input input-bordered mt-1 w-full"
        />
      </div>

      <div className="form-control">
        <label className="font-semibold">Description</label>
        <textarea
          className="textarea textarea-bordered mt-1 w-full"
          onChange={(e) => {
            const value = e.target?.value;
            setDesc(value);
          }}
          placeholder="Description"></textarea>
      </div>

      <div className="form-control">
        <label className="font-semibold">CheapestPrice</label>
        <input
          type="number"
          placeholder="Type here"
          onChange={(e) => setCheapestPrice(+e.target.value)}
          className="input input-bordered mt-1 w-full"
        />
      </div>

      <div className="form-control">
        <label className="font-semibold">Featured</label>
        <select
          defaultValue={featured}
          onChange={(e) => setFeatured(e.target.value === "true")}
          className="select select-bordered">
          <option value={true}>Yes</option>
          <option value={false}>No</option>
        </select>
      </div>

      <div className="form-control">
        <label className="font-semibold">Rooms</label>
        <select
          multiple
          onChange={(e) => {
            const options = e.target.options;
            const selectedValues = Array.from(options)
              .filter((option) => option.selected)
              .map((option) => option.value);
            setRoomsHotel(selectedValues);
          }}
          className="select select-bordered">
          {rooms.map((room) => {
            return (
              <option value={room.id} key={room.id}>
                {room.title}
              </option>
            );
          })}
        </select>
      </div>

      <div className="form-control">
        <label className="font-semibold">Photos</label>
        {photos && (
          <div className="grid grid-cols-3 gap-2 mb-2">
            {photos.map((photo, index) => {
              return (
                <div className="md:col-span-1 col-span-3" key={index}>
                  <Image
                    src={photo}
                    width={200}
                    height={200}
                    className="w-full h-[200px]"
                  />
                </div>
              );
            })}
          </div>
        )}
        <UploadButton
          endpoint="imageUploader"
          onClientUploadComplete={(res) => {
            // console.log("Files: ", res);
            if (res) {
              const photos = res.map((image) => image.url);
              setPhotos(photos);
            }
            alert("Upload Completed");
          }}
          onUploadError={(error) => {
            alert(`ERROR! ${error.message}`);
          }}
        />
      </div>

      <button className="btn btn-primary text-white w-full">Create</button>
    </form>
  );
};

export default HotelCreateForm;
