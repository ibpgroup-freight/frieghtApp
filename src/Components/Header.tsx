import { Link } from "react-router-dom";

function Header() {
  return (
    <header className="w-full flex bg-blue-700 justify-evenly text-white p-4">
      <div className="text-2xl ">Logo</div>
      <ul className="flex  justify-start space-x-5">
        <li>
          <Link to={"/home"}>Home</Link>
        </li>
        <li>
          <Link to={"/home"}>Quotation</Link>
        </li>
        <li>
          <Link to={"/dashboard"}>Dashboard</Link>
        </li>
      </ul>
    </header>
  );
}

export default Header;
