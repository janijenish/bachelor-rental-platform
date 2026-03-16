const PropertyCard = ({ property }) => {

  return (
    <div className="bg-white shadow-lg rounded-xl overflow-hidden">

      <img
        src={property.image || "https://via.placeholder.com/400"}
        alt={property.title}
        className="w-full h-48 object-cover"
      />

      <div className="p-4">

        <h2 className="text-xl font-semibold">
          {property.title}
        </h2>

        <p className="text-gray-600">
          {property.location}
        </p>

        <p className="text-green-600 font-bold mt-2">
          ₹ {property.price}
        </p>

      </div>

    </div>
  );
};

export default PropertyCard;