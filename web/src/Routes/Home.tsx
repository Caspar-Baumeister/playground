import { Outlet } from "react-router-dom";
import HomeLayout from "../layouts/mainLayout";

export default function Home() {
  return (
    <HomeLayout>
      <Outlet />
    </HomeLayout>
  );
}
