import { useState } from "react";
import API from "../api/axios";
import { useNavigate } from "react-router-dom";

const Login = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {

      const res = await API.post("/users/login", {
        email,
        password
      });

      // Save token
      localStorage.setItem("token", res.data.token);

      alert("Login successful ✅");

      navigate("/");

    } catch (error) {
      alert(error.response?.data?.message || "Login failed");
    }
  };

  return (

    <div className="max-w-md mx-auto mt-20 p-6 shadow-lg rounded-xl bg-white">

      <h2 className="text-2xl font-bold mb-4 text-center">
        Login
      </h2>

      <form onSubmit={handleLogin} className="flex flex-col gap-4">

        <input
          type="email"
          placeholder="Email"
          className="border p-2 rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="border p-2 rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
          Login
        </button>

      </form>

    </div>

  );

};

export default Login;