import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { axiosInstance } from "../utils/axios";
import toast from "react-hot-toast";
import { useSelector, useDispatch } from "react-redux";
import { start, success, failure } from "../redux/userSlice";

const Login = () => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.user);
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(start());
      const res = await axiosInstance.post("/auth/login", form, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      toast("Signed in successfully!");
      dispatch(success(res.data));
      setForm({ email: "", password: "" });
      navigate("/");
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Error signing in. Please try again.";
      toast(errorMessage);
      dispatch(failure(errorMessage));
    }
  };

  return (
    <>
      <div className="flex justify-center items-center mt-10">
        <div className="min-h-[400px] flex flex-col min-w-[400px] bg-purple-950 rounded-md border-[2px] border-white">
          <form onSubmit={handleSubmit}>
            <h1 className="text-center text-white font-bold text-4xl mt-14">
              Signin
            </h1>
            <div className="flex flex-col gap-3 justify-center items-center mt-6">
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Enter Email:"
                className="h-10 w-80 px-4 text-white  focus:border-[3px] placeholder:text-white rounded-md border-[2px] border-white outline-none bg-transparent"
              />
              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="Enter Password:"
                className="h-10 w-80 px-4 text-white  focus:border-[3px] placeholder:text-white rounded-md border-[2px] border-white outline-none bg-transparent"
              />
              <button
                disabled={loading}
                type="submit"
                className="text-white border-white border-[2px] h-10 w-80 rounded-md text-lg font-semibold hover:scale-95 hover:shadow-inner hover:bg-purple-200 hover:text-black transition-transform duration-200"
              >
                {loading ? "Submitting.." : "Submit"}
              </button>
            </div>
          </form>
          <div className="flex flex-col justify-center items-center gap-1 mt-2">
            <p className="text-white">
              Don't have account?{" "}
              <Link
                to="/signin"
                className="hover:underline font-bold text-white "
              >
                Signup
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
