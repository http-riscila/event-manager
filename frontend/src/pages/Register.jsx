import { Link } from "react-router-dom";
import { useState } from "react";
import { register } from "../services/user-services";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  function handleChange(event) {
    const { id, value } = event.target;
    setNewUser((prevUser) => ({
      ...prevUser,
      [id]: value,
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      const createdUser = await register(newUser);
      navigate("/");
      console.log(createdUser);
    } catch (error) {
      console.error("Erro ao registrar usuário:", error);
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
            htmlFor="name"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Nome
          </label>
          <input
            type="name"
            id="name"
            value={newUser.name}
            onChange={handleChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required
          />
        </div>
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
            value={newUser.email}
            onChange={handleChange}
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
            value={newUser.password}
            onChange={handleChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required
          />
        </div>
        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 cursor-pointer focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Criar conta
        </button>
        <Link
          to="/"
          className="text-sm font-medium text-gray-900 dark:text-white mt-5 text-center hover:underline"
        >
          Já possui uma conta?
        </Link>
      </form>
    </div>
  );
}
