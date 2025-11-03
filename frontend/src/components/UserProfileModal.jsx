import { Dialog } from "@headlessui/react";
import { useState } from "react";
import { useUser } from "../contexts/UserContext.jsx";
import { update, remove } from "../services/user-services.js";
import { useNavigate } from "react-router-dom";

export default function UserProfileModal({ isOpen, onClose }) {
  const { user, updateUser } = useUser();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
  });
  const navigate = useNavigate();

  const handleEditToggle = () => {
    if (isEditing) {
      setFormData({
        name: user?.name || "",
        email: user?.email || "",
      });
    }
    setIsEditing(!isEditing);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    try {
      const response = await update(user.id, formData);

      updateUser(response);

      setIsEditing(false);
      onClose();
    } catch (error) {
      console.error("Erro ao atualizar perfil:", error);
    }
  };

  const handleDeleteAccount = async () => {
    try {
      await remove(user.id);
      navigate("/");
    } catch (error) {
      console.error("Erro ao excluir conta:", error);
      alert("Erro ao excluir conta");
    }
  };

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />

      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="mx-auto max-w-md w-full rounded-lg bg-white dark:bg-gray-800 p-6 shadow-xl">
          {/* Header */}
          <div className="flex justify-between items-start mb-6">
            <Dialog.Title className="text-xl font-bold text-gray-900 dark:text-white">
              Meu Perfil
            </Dialog.Title>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 cursor-pointer"
            >
              <span className="material-symbols-outlined">close</span>
            </button>
          </div>

          {/* Informações do Usuário */}
          <div className="space-y-4">
            {/* Nome */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Nome
              </label>
              {isEditing ? (
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                  placeholder="Seu nome"
                />
              ) : (
                <p className="px-3 py-2 text-gray-900 dark:text-white bg-gray-50 dark:bg-gray-700 rounded-md">
                  {user?.name}
                </p>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Email
              </label>
              {isEditing ? (
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                  placeholder="seu@email.com"
                />
              ) : (
                <p className="px-3 py-2 text-gray-900 dark:text-white bg-gray-50 dark:bg-gray-700 rounded-md">
                  {user?.email}
                </p>
              )}
            </div>

            {/* ID (somente leitura) */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                ID do Usuário
              </label>
              <p className="px-3 py-2 text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-700 rounded-md">
                {user?.id}
              </p>
            </div>
          </div>

          {/* Botões */}
          <div className="flex flex-col gap-3 mt-6 pt-4 border-t">
            {isEditing ? (
              <div className="flex gap-2">
                <button
                  onClick={handleSave}
                  className="flex-1 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50 cursor-pointer"
                >
                  Salvar
                </button>
                <button
                  onClick={handleEditToggle}
                  className="cursor-pointer px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 rounded-md hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                >
                  Cancelar
                </button>
              </div>
            ) : (
              <button
                onClick={handleEditToggle}
                className="w-full px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 rounded-md hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors cursor-pointer"
              >
                Editar Perfil
              </button>
            )}

            {/* Botão Excluir Conta */}
            <button
              onClick={handleDeleteAccount}
              className="w-full px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700 transition-colors cursor-pointer"
            >
              Excluir Minha Conta
            </button>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}
