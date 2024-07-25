import Link from "next/link";
import Container from "../Container";
import SiginButton from "../SiginButton/SiginButton";
import Search from "../ui/Search/Search";
import Cart from "./components/Cart";

function Header() {
  const handleSearch = () => {
    console.log("first");
  };
  return (
    <nav className="bg-black">
      <Container>
        <ul className="flex flex-row justify-between items-center">
          <li>
            <Link href="/" className="text-white text-4xl font-semibold">
              OnlineShop
            </Link>
          </li>
          <Search />
          <div className="flex gap-x-5 items-center">
            <Cart />
            <SiginButton />
          </div>
        </ul>
      </Container>
    </nav>
  );
}

export default Header;
