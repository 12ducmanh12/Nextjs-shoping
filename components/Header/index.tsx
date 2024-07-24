import Link from "next/link";
import Container from "../Container";
import SiginButton from "../SiginButton/SiginButton";
// import { useSession } from "next-auth/react";
function Header() {
  // const { data: session } = useSession();
  return (
    <nav className="bg-black">
      <Container>
        <ul className="flex flex-row justify-between items-center">
          <li>
            <Link href="/" className="text-white text-4xl font-semibold">
              OnlineShop
            </Link>
          </li>
          <div className="flex gap-x-5 items-center">
            <SiginButton />
          </div>
        </ul>
      </Container>
    </nav>
  );
}

export default Header;
