import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../api/axios";

const PropertyDetails = () => {

const { id } = useParams();

const [property, setProperty] = useState(null);
const [loading, setLoading] = useState(true);

useEffect(() => {

    const fetchProperty = async () => {

    try {

        const res = await API.get(`/properties/${id}`);

        setProperty(res.data);

        setLoading(false);

    } catch (error) {
        console.error(error);
    }

    };

    fetchProperty();
    const handleSave = async () => {
  try {
    await API.post(`/properties/${property._id}/save`);
    alert("Saved successfully ❤️");
  } catch (error) {
    alert("Login required");
  }
};

}, [id]);


if (loading) {
    return <p className="p-6">Loading...</p>;
}

if (!property) {
    return <p className="p-6">Property not found</p>;
}

return (

    <div className="max-w-4xl mx-auto p-6">

<img
        src={property.image || "https://via.placeholder.com/600"}
        alt={property.title}
        className="w-full h-80 object-cover rounded-lg"
/>

<h1 className="text-3xl font-bold mt-4">
        {property.title}
</h1>

<p className="text-gray-600 mt-2">
        📍 {property.location}
</p>

    <p className="text-green-600 text-2xl font-bold mt-2">
        ₹ {property.price}
    </p>

    <p className="mt-4">
        {property.description}
    </p>

    <div className="mt-4 flex gap-3">

        {property.bachelorAllowed && (
        <span className="bg-green-100 text-green-700 px-3 py-1 rounded">
            Bachelor Friendly
        </span>
        )}

        {property.furnishing && (
        <span className="bg-gray-100 px-3 py-1 rounded">
            {property.furnishing}
        </span>
        )}

    </div>

    </div>

);

};

export default PropertyDetails;