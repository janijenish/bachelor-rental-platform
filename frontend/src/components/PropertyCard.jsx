import { useNavigate } from "react-router-dom";
const PropertyCard = ({ property }) => {

  return (

    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition">

      <img
        src={property.image || "https://via.placeholder.com/400"}
        alt={property.title}
        className="w-full h-48 object-cover"
      />

      <div className="p-4">

        <h2 className="text-lg font-semibold">
          {property.title}
        </h2>

        <p className="text-gray-500 text-sm">
          📍 {property.location}
        </p>

        <p className="text-green-600 font-bold mt-2 text-lg">
          ₹ {property.price}
        </p>

        <div className="flex justify-between items-center mt-3">

          {property.bachelorAllowed && (
            <span className="bg-green-100 text-green-700 px-2 py-1 rounded text-xs">
              Bachelor Friendly
            </span>
          )}

         <button
  onClick={() => navigate(`/property/${property._id}`)}
  className="bg-blue-500 text-white px-3 py-1 rounded text-sm hover:bg-blue-600"
>
  View
</button>

        </div>

      </div>

    </div>

  );

};

export default PropertyCard;