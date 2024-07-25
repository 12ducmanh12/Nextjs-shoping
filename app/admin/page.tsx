import CreateProduct from "./components/CreateProduct";
import ListProduct from "./components/ListProduct";
import Sidenav from "./components/Sidenav/Sidenav";
import DashBoard from "./components/Dashboard";

function Admin() {
  return (
    <div className="flex">
      <Sidenav />
      <CreateProduct />
    </div>
  );
}

export default Admin;
