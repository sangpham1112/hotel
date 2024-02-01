const CardCountry = ({ count, index, image }) => {
  let city = index === 0 ? "Hồ Chí Minh" : index === 1 ? "Hà nội" : "Huế";

  return (
    <div className="relative z-0">
      <img src={image} alt={city} className="max-h-[200px] w-full" />
      <div className="absolute bottom-5 left-4 max-w-[200px] text-white">
        <h2 className="">{city}</h2>
        <p>{count} properties</p>
      </div>
    </div>
  );
};

export default CardCountry;
