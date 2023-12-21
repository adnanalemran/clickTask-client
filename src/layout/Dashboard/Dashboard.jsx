import Header from "../../components/Header/Header";
import { Outlet } from "react-router-dom";
 
const Dashboard = () => {
  return (
    <div>
      <Header />
      <Outlet />
       
    </div>
  );
};

export default Dashboard;
