import axios from "axios";

const axiosPublic = axios.create({
  baseURL: "https://click-task-server.vercel.app",
});

const useAxiosPublic = () => {
  return axiosPublic;
};

export default useAxiosPublic;
