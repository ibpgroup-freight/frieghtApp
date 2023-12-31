import { Link } from "react-router-dom";
import useUser from "../store/User";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
function Header() {
  const { AuthStateLogOut } = useUser();
  return (
    <header className="w-full flex bg-blue-700 justify-evenly text-white p-4">
      <div className="text-2xl ">Logo</div>
      <ul className="flex  justify-start space-x-5">
        {/* <li>
          <Link to={"/home"}>Home</Link>
        </li>
        <li>
          <Link to={"/home"}>Quotation</Link>
        </li> */}
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
