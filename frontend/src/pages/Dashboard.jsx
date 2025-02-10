import React, { useEffect, useState } from "react";
import Box from "../components/Box";
import { toast } from "react-hot-toast";
import { axiosInstance } from "../utils/axios";
const Dashboard = () => {
  const [agents, setAgents] = useState([]);
  const [hotels, setHotels] = useState([]);
  const [services, setServices] = useState([]);
  const getAgents = async () => {
    try {
      const response = await axiosInstance.get("/company/fetch-agents");
      setAgents(response.data.agents);
    } catch (error) {
      toast("Could not fetch agents");
    }
  };
  const getHotels = async () => {
    try {
      const response = await axiosInstance.get("/hotel/");
      setHotels(response.data.hotels);
    } catch (error) {
      toast("Could not fetch hotels");
    }
  };
  const getServices = async () => {
    try {
      const response = await axiosInstance.get("/service");
      setServices(response.data);
      console.log(response.data);
    } catch (error) {
      toast("Could not fetch hotels");
    }
  };

  useEffect(() => {
    getAgents();
    getHotels();
    getServices();
  }, []);
  return (
    <>
      <h1 className="text-4xl text-purple-950 text-center mt-4 font-extrabold uppercase">
        Dashboard
      </h1>
      <div className="min-h-[300px] max-w-[90vw] gap-6 mb-10 mx-auto flex flex-col mt-20 md:mt-0 ">
        <h1 className="text-2xl text-purple-950   font-extrabold uppercase">
          Agents Summary
        </h1>

        <div className="flex gap-4 flex-wrap mt-3">
          <Box title="Total Agents" number={agents.length} />
          <Box
            title="Available Agents"
            number={agents.filter((agent) => agent.isActive === true).length}
          />
          <Box
            title="UnAvailable Agents"
            number={agents.filter((agent) => agent.isActive === false).length}
          />
        </div>

        <h1 className="text-2xl text-purple-950   font-extrabold uppercase">
          Hotels Summary
        </h1>
        <div className="flex gap-4 flex-wrap mt-3">
          <Box title="Total Hotels" number={hotels.length} />
          <Box
            title="Available Hotels"
            number={hotels.filter((hotel) => hotel.isActive === true).length}
          />
          <Box
            title="UnAvailable Hotels"
            number={hotels.filter((hotel) => hotel.isActive === false).length}
          />
        </div>

        <h1 className="text-2xl text-purple-950   font-extrabold uppercase">
          Services Summary
        </h1>
        <div className="flex gap-4 flex-wrap mt-3">
          <Box title="Total Services" number={services.length} />
          <Box
            title="Available Services"
            number={
              services.filter((service) => service.isEnabled === true).length
            }
          />
          <Box
            title="UnAvailable Services"
            number={
              services.filter((service) => service.isEnabled === false).length
            }
          />
        </div>
      </div>
    </>
  );
};

export default Dashboard;
