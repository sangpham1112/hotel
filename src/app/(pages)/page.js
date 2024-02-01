import FilterInput from "@/app/(pages)/components/FilterInput";
import CardCountry from "@/app/(pages)/components/CardCountry";
import HeaderTitle from "@/app/(pages)/components/HeaderTitle";
import CardType from "@/app/(pages)/components/CardType";
import CardGuestLove from "@/app/(pages)/components/CardGuestLove";

export default async function Home() {
  const resCountCity = await fetch(
    "http://localhost:3000/api/hotels/countByCity?cities=HCM,Ha noi,Hue",
    {
      method: "GET",
      cache: "no-cache",
      next: { tags: ["hotels"] },
    }
  );
  const CountHotelCity = await resCountCity.json();
  const CountCityImages = [
    "https://cf.bstatic.com/xdata/images/city/max500/957801.webp?k=a969e39bcd40cdcc21786ba92826063e3cb09bf307bcfeac2aa392b838e9b7a5&o=",
    "https://cf.bstatic.com/xdata/images/city/max500/690334.webp?k=b99df435f06a15a1568ddd5f55d239507c0156985577681ab91274f917af6dbb&o=",
    "https://cf.bstatic.com/xdata/images/city/max500/689422.webp?k=2595c93e7e067b9ba95f90713f80ba6e5fa88a66e6e55600bd27a5128808fdf2&o=",
  ];

  const resCountType = await fetch(
    "http://localhost:3000/api/hotels/countByType",
    {
      method: "GET",
      cache: "no-cache",
      next: { tags: ["hotels"] },
    }
  );

  const CountHotelType = await resCountType.json();
  const CountTypeImages = [
    "https://cf.bstatic.com/xdata/images/xphoto/square300/57584488.webp?k=bf724e4e9b9b75480bbe7fc675460a089ba6414fe4693b83ea3fdd8e938832a6&o=",
    "https://cf.bstatic.com/static/img/theme-index/carousel_320x240/card-image-apartments_300/9f60235dc09a3ac3f0a93adbc901c61ecd1ce72e.jpg",
    "https://cf.bstatic.com/static/img/theme-index/carousel_320x240/bg_resorts/6f87c6143fbd51a0bb5d15ca3b9cf84211ab0884.jpg",
    "https://cf.bstatic.com/static/img/theme-index/carousel_320x240/card-image-villas_300/dd0d7f8202676306a661aa4f0cf1ffab31286211.jpg",
    "https://cf.bstatic.com/static/img/theme-index/carousel_320x240/card-image-chalet_300/8ee014fcc493cb3334e25893a1dee8c6d36ed0ba.jpg",
  ];

  const resGuestLove = await fetch(
    "http://localhost:3000/api/hotels?featured=true&limit=4",
    {
      method: "GET",
      cache: "no-cache",
    }
  );
  const hotels = await resGuestLove.json();
  // console.log(hotels);

  return (
    <main className="min-h-screen px-2 md:px-24 mt-5 max-w-[1280px]">
      <FilterInput />
      <div className="grid grid-cols-6 mt-4 gap-3">
        {CountHotelCity.map((count, index) => {
          return (
            <div className="md:col-span-2 col-span-6" key={index}>
              <CardCountry
                count={count}
                index={index}
                image={CountCityImages[index]}
              />
            </div>
          );
        })}
      </div>

      <HeaderTitle>Browse by property type</HeaderTitle>
      <div className="grid grid-cols-10 mt-4 gap-2">
        {CountHotelType.map((item, index) => {
          return (
            <div className="md:col-span-2 col-span-5" key={index}>
              <CardType item={item} image={CountTypeImages[index]} />
            </div>
          );
        })}
      </div>

      <HeaderTitle>Home Guests Love</HeaderTitle>
      <div className="grid grid-cols-4 mt-4 gap-2">
        {hotels.map((hotel) => {
          return (
            <div className="md:col-span-1 col-span-2" key={hotel.id}>
              <CardGuestLove hotel={hotel} />
            </div>
          );
        })}
      </div>
    </main>
  );
}
