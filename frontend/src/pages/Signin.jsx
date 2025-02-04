import {useState} from "react";
import {axiosInstance} from "../utils/axios";

import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Signin = () => {
  const navigate = useNavigate()
    const [form, setForm] = useState({username: '', email: '', password: ''})
    const [submit, isSubmit] = useState(false)
   
    const handleChange = (e)=>{
        setForm({...form, [e.target.name]: e.target.value})
    }

   
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      isSubmit(true);
      await axiosInstance.post(
       '/auth/signin',
        form,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      toast("Account created successfully!");
      setForm({ username: "", email: "", password: "" });
      navigate('/login')
    } catch (error) {
      toast("Error in creating account!");
    } finally {
      isSubmit(false);
    }
  };


  
  return (
    <>
      <div className="flex justify-center items-center mt-10">

        <div className="min-h-[400px] flex flex-col min-w-[400px] bg-purple-950 rounded-md border-[2px] border-white">
        <form onSubmit={handleSubmit}>
          <h1 className="text-center text-white font-bold text-4xl mt-8">SignUp</h1>
          <div className="flex flex-col gap-3 justify-center items-center mt-6">
            <input
            name="username"
            type="text"
            value={form.username}
            onChange={handleChange}
            placeholder="Enter Username:"
            className="h-10 text-white focus:border-[3px] w-80 px-4 placeholder:text-white rounded-md border-[2px] border-white outline-none bg-transparent"
            />
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
            <button disabled={submit} type="submit" className="h-10 w-80 rounded-md border-[2px] border-white text-white text-lg font-semibold hover:scale-95 hover:bg-purple-200 hover:text-black hover:shadow-[#6E6E6D] transition-transform duration-200">
              {submit? 'Submitting...' : 'Submit'}
            </button>
          </div>
        
              </form>
        <div className="flex flex-col justify-center items-center gap-1 mt-2">

          
            <p className="text-white">
              Already have account? <Link to='/login' className="hover:underline font-bold text-white ">Signin</Link>
            </p>
        </div>
        </div>
      </div>
    </>
  )
};

export default Signin;
