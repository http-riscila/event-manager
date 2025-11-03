import { Link } from "react-router-dom";
import UserIcon from "./UserIcon";
import { useNavigate } from "react-router-dom";
import { useUser } from "../contexts/UserContext.jsx";

export default function Header() {
  const navigate = useNavigate();
  const { logout } = useUser();

  function handleLogout() {
    logout();
    navigate("/");
  }

  return (
    <header className="bg-blue-950 text-white p-4">
      <nav className="flex flex-row justify-between items-center">
        <Link to="/inicio" className="text-2xl font-bold">
          Gerenciador de Eventos
        </Link>
        <div className="flex gap-4 items-center">
          <UserIcon />
          <button
            onClick={handleLogout}
            className="flex items-center justify-center cursor-pointer"
          >
            <span
              className="material-symbols-outlined"
              style={{ fontSize: "30px" }}
            >
              logout
            </span>
          </button>
        </div>
      </nav>
    </header>
  );
}
