// components/DeleteEventModal.jsx
import { Dialog } from "@headlessui/react";
import { remove } from "../services/event-services";

export default function DeleteEventModal({
  isOpen,
  onClose,
  event,
  onEventDeleted,
}) {
  const handleDelete = async () => {
    try {
      await remove(event.id);

      if (onEventDeleted) {
        onEventDeleted(event.id);
      }

      onClose();
      console.log("Evento excluído com sucesso!");
    } catch (error) {
      console.error("Erro ao excluir evento:", error);
    }
  };

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />

      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="mx-auto max-w-sm rounded-lg bg-white dark:bg-gray-800 p-6 shadow-xl">
          <div className="flex justify-center mb-4">
            <span className="material-symbols-outlined text-red-500 text-4xl">
              warning
            </span>
          </div>

          <Dialog.Title className="text-lg font-medium text-gray-900 dark:text-white text-center mb-2">
            Excluir Evento
          </Dialog.Title>

          <Dialog.Description className="text-sm text-gray-500 dark:text-gray-400 text-center mb-6">
            Tem certeza que deseja excluir o evento{" "}
            <strong>"{event?.title}"</strong>? Esta ação não pode ser desfeita e
            todos os dados serão perdidos.
          </Dialog.Description>

          <div className="flex gap-3 justify-center">
            <button
              onClick={onClose}
              className="cursor-pointer px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 rounded-md hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors disabled:opacity-50"
            >
              Cancelar
            </button>
            <button
              onClick={handleDelete}
              className="cursor-pointer px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700 transition-colors disabled:opacity-50"
            >
              Excluir
            </button>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}
