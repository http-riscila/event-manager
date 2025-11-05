// components/AddEventButton.jsx
import { useState } from "react";
import AddEventModal from "./AddEventModal.jsx";

export default function AddEventButton({ onEventCreated }) {
  // ← Recebe a prop
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsCreateModalOpen(true)}
        className="bg-transparent text-xl font-semibold border border-blue-950 text-blue-950 dark:border-blue-300 dark:text-blue-300 dark:hover:bg-blue-300 dark:hover:text-gray-800 px-4 py-2 rounded-lg transition-all ease-in-out duration-500 hover:bg-blue-950 hover:text-white cursor-pointer"
      >
        Adicionar Evento
      </button>

      <AddEventModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onEventCreated={onEventCreated} // ← Passa para o modal
      />
    </>
  );
}
