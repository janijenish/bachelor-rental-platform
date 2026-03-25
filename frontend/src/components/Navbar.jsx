import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {

  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (

    <div className="bg-white shadow-md px-6 py-3 flex justify-between items-center">

      <Link to="/" className="text-xl font-bold">
        🏠 Rentals
      </Link>

      <div className="flex gap-4">

        {!token ? (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        ) : (
          <>
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-3 py-1 rounded"
            >
              Logout
            </button>
          </>
        )}

      </div>

    </div>

  );

};

export default Navbar;