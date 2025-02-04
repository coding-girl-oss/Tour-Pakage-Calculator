import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { signoutfailure, signoutstart, signoutsuccess } from "../redux/userSlice";
import { axiosInstance } from "../utils/axios";
import { toast } from "react-hot-toast";

const Profile = () => {
  const { userData } = useSelector((state) => state.user);
  console.log("userData:", userData);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // logging out user
  const handleSignout = async () => {
    try {
      dispatch(signoutstart());
      const res = await axiosInstance.get("/auth/signout", {
        headers: { Authorization: `Bearer ${userData?.token}` },
      });
      dispatch(signoutsuccess(res.data));
      toast.success("User Signed out Successfully!");
      navigate("/signin");
    } catch (error) {
      toast.error("Error signing out user!");
      dispatch(signoutfailure(error.message));
      console.log(error.message);
    }
  };

  return (
    <div>
      <h1 className="text-center font-bold text-4xl mt-5">Profile</h1>
      <div className="flex justify-center items-center mt-4">
        <div className="min-h-[400px] flex flex-col gap-2  min-w-[400px] pt-20 items-center bg-purple-950 rounded-md border-[2px] border-white">
          <div className="avatar placeholder">
            <div className="bg-white text-purple-950 w-24 h-24 flex items-center justify-center rounded-full">
              <span className="text-3xl font-bold truncate">
                {userData.userData.username?.slice(0,1).toUpperCase() || "U"}
              </span>
            </div>
          </div>

          <p className=" text-white text-xl">{userData.userData.username}</p>
          <p className=" text-white text-xl">{userData.userData.email}</p>

          <div className="flex">
            <button
              onClick={handleSignout}
              className="font-semibold text-center underline text-white hover:text-red-500 transition"
            >
              Signout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;



