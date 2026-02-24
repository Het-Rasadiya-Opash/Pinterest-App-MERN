import { Outlet } from "react-router";
import LeftBar from "../../components/leftBar/leftBar";
import TopBar from "../../components/topBar/TopBar";

const MainLayout = () => {
  return (
    <div className="w-full flex gap-4 max-md:gap-2">
      <LeftBar />
      <div className="flex-1 mr-4 max-md:mr-2">
        <TopBar />
        <Outlet/>
      </div>
    </div>
  );
};

export default MainLayout;
