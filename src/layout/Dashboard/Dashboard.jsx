import Header from "../../components/Header/Header";
import { Outlet } from "react-router-dom";

const Dashboard = () => {
  return (
    <div
      style={{
        backgroundImage:
          "url(https://img.freepik.com/free-vector/abstract-white-tone-memphis-social-background_53876-113860.jpg)",
        backgroundSize: "cover",
      }}
      className="   min-h-screen"
    >
      <Header />
      <Outlet />
    </div>
  );
};

export default Dashboard;
