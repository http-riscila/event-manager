import { Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../contexts/UserContext.jsx";

export default function Login() {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { login } = useUser();

  function handleChange(event) {
    const { id, value } = event.target;
    setCredentials((prevUser) => ({
      ...prevUser,
      [id]: value,
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setLoading(true);

    try {
      const result = await login(credentials.email, credentials.password);

      if (result.success) {
        navigate("/inicio");
        console.log("Usuário logado:", result.data);
      } else {
        alert(result.error || "Erro ao fazer login");
      }
    } catch (error) {
      console.error("Erro ao fazer login:", error);
      alert("Erro ao fazer login");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
      <form
        onSubmit={handleSubmit}
        className="max-w-sm mx-auto flex flex-col justify-center bg-white p-8 rounded-lg shadow-md dark:bg-gray-800"
      >
        <div className="mb-5">
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            onChange={handleChange}
            value={credentials.email}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="nome@email.com"
            required
          />
        </div>
        <div className="mb-5">
          <label
            htmlFor="password"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Senha
          </label>
          <input
            type="password"
            id="password"
            onChange={handleChange}
            value={credentials.password}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="text-white bg-blue-700 hover:bg-blue-800 cursor-pointer focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "Entrando..." : "Entrar"}
        </button>
        <Link
          to="/criar-conta"
          className="text-sm font-medium text-gray-900 dark:text-white mt-5 text-center hover:underline"
        >
          Não possui uma conta?
        </Link>
      </form>
    </div>
  );
}
