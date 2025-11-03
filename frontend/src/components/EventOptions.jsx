import { Popover } from "@headlessui/react";
import { useState } from "react";
import EditEventModal from "./EditEventModal.jsx";
import DeleteEventModal from "./DeleteEventModal.jsx";
import EventDetailsModal from "./EventDetailsModal.jsx"; // ← Adicione esta importação
import { useUser } from "../contexts/UserContext.jsx";

export default function EventOptions({
  event,
  onEventUpdated,
  onEventDeleted,
}) {
  const { user } = useUser();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false); // ← Adicione esta linha

  // Verifica se o usuário é o criador do evento ou admin
  const isOwner = user?.id === event.createdBy;

  return (
    <>
      <Popover className="relative">
        <Popover.Button
          className="flex items-center justify-center p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors cursor-pointer"
          onClick={(e) => e.stopPropagation()}
        >
          <span className="material-symbols-outlined text-gray-600 dark:text-gray-400">
            more_vert
          </span>
        </Popover.Button>

        <Popover.Panel className="absolute z-20 right-0 mt-2 w-48 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg">
          <div className="p-2 space-y-1">
            <button
              onClick={() => setIsDetailsModalOpen(true)}
              className="cursor-pointer w-full flex items-center gap-2 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition-colors"
            >
              <span className="material-symbols-outlined text-lg">info</span>
              Ver detalhes
            </button>

            {isOwner && (
              <div>
                <button
                  onClick={() => setIsEditModalOpen(true)}
                  className="cursor-pointer w-full flex items-center gap-2 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition-colors"
                >
                  <span className="material-symbols-outlined text-lg">
                    edit
                  </span>
                  Editar evento
                </button>

                <button
                  onClick={() => setIsDeleteModalOpen(true)}
                  className="cursor-pointer w-full flex items-center gap-2 px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition-colors"
                >
                  <span className="material-symbols-outlined text-lg">
                    delete
                  </span>
                  Excluir evento
                </button>
              </div>
            )}
          </div>
        </Popover.Panel>
      </Popover>

      {/* Modal de Detalhes */}
      <EventDetailsModal
        isOpen={isDetailsModalOpen}
        onClose={() => setIsDetailsModalOpen(false)}
        event={event}
      />

      {/* Modal de Edição */}
      <EditEventModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        event={event}
        onEventUpdated={onEventUpdated}
      />

      {/* Modal de Exclusão */}
      <DeleteEventModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        event={event}
        onEventDeleted={onEventDeleted}
      />
    </>
  );
}
