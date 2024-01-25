import { Link } from "react-router-dom";
import useUser from "../store/User";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import SearchField from "./SearchField";
function Header() {
  const { AuthStateLogOut } = useUser();
  return (
    <header className="w-full flex bg-blue-700 justify-evenly text-white p-1 lg:p-4">
      <div className="text-xl lg:text-2xl ">Logo</div>
      {/* <SearchField /> */}
      <ul className="flex  justify-start space-x-5">
        <li>
          <Link to={"/"}>Dashboard</Link>
        </li>
        <li
          onClick={() => {
            AuthStateLogOut();
            signOut(auth);
          }}
          className="cursor-pointer"
        >
          Logout
        </li>
      </ul>
    </header>
  );
}

export default Header;
