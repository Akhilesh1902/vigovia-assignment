import { Link } from "react-router";

export default function Header() {
  return (
    <>
      <div className="flex justify-between items-center px-10 py-4">
        <Link to={"/"}>
          <div className="w-32">
            <img
              src="./logo.png"
              alt="logo_img"
            />
          </div>
        </Link>

        <ul className="flex gap-6">
          <li>
            <Link to={"/"}>Home</Link>
          </li>
          <li>
            <Link to={"/itenaryForm"}>Itenary Form</Link>
          </li>
        </ul>
      </div>
    </>
  );
}
