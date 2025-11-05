import { Dialog } from "@headlessui/react";
import { useState, useEffect } from "react";
import {
  getByEventId,
  updateType,
  checkUserIsAdmin,
} from "../services/sign-up-services";
import { useUser } from "../contexts/UserContext";

export default function EventDetailsModal({ isOpen, onClose, event }) {
  const { user } = useUser();
  const [atendees, setAtendees] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentUserIsAdmin, setCurrentUserIsAdmin] = useState(false);

  useEffect(() => {
    async function fetchAtendees() {
      if (!event.id) return;

      setLoading(true);
      try {
        const data = await getByEventId(event.id);
        setAtendees(data || []);

        if (user) {
          const isAdmin = await checkUserIsAdmin(event.id, user.id);
          setCurrentUserIsAdmin(isAdmin);
        }
      } catch (error) {
        console.error("Erro ao buscar participantes:", error);
        setAtendees([]);
      } finally {
        setLoading(false);
      }
    }

    if (isOpen && event.id) {
      fetchAtendees();
    }
  }, [event.id, isOpen, user]);

  async function handleToggleAdmin(participant) {
    if (!currentUserIsAdmin) return;

    const newType = participant.type === "ADMIN" ? "ATTENDEE" : "ADMIN";
    const action = newType === "ADMIN" ? "promover" : "rebaixar";

    try {
      await updateType(participant.id, newType);

      setAtendees((prev) =>
        prev.map((p) => (p.id === participant.id ? { ...p, type: newType } : p))
      );
    } catch (error) {
      console.error(`Erro ao ${action} participante:`, error);
    }
  }

  const isOriginalCreator = (participant) => {
    return event.createdBy === participant.userId;
  };

  if (!event) return null;

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />

      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="mx-auto max-w-2xl w-full max-h-[90vh] overflow-y-auto rounded-lg bg-white dark:bg-gray-800 p-6 shadow-xl">
          <div className="flex justify-between items-start mb-6">
            <Dialog.Title className="text-2xl font-bold text-gray-900 dark:text-white">
              {event.title}
            </Dialog.Title>
            <button
              onClick={onClose}
              className="cursor-pointer text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
            >
              <span className="material-symbols-outlined">close</span>
            </button>
          </div>

          <div className="space-y-4 mb-6">
            <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
              <span className="material-symbols-outlined text-lg">
                description
              </span>
              <p>{event.description}</p>
            </div>

            <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
              <span className="material-symbols-outlined text-lg">
                location_on
              </span>
              <p>{event.location}</p>
            </div>

            <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
              <span className="material-symbols-outlined text-lg">event</span>
              <p>
                {new Date(event.date).toLocaleDateString("pt-BR", {
                  timeZone: "UTC",
                })}
              </p>
            </div>

            <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
              <span className="material-symbols-outlined text-lg">person</span>
              <p>
                Criado por:{" "}
                <span className="font-semibold">
                  {event.createdByUser?.name}
                </span>
              </p>
            </div>
          </div>

          <div className="border-t pt-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Participantes ({loading ? "..." : atendees?.length || 0})
              {currentUserIsAdmin && (
                <span className="text-sm font-normal text-gray-500 ml-2">
                  (Você é administrador)
                </span>
              )}
            </h3>

            {loading ? (
              <p className="text-gray-500 dark:text-gray-400 text-center py-4">
                Carregando participantes...
              </p>
            ) : atendees && atendees.length > 0 ? (
              <div className="space-y-2 max-h-60 overflow-y-auto">
                {atendees.map((participant) => (
                  <div
                    key={participant.id}
                    className="flex items-center justify-between gap-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg"
                  >
                    <div className="flex items-center gap-3">
                      <span className="material-symbols-outlined text-gray-600 dark:text-gray-400">
                        account_circle
                      </span>
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">
                          {participant.user?.name || "Usuário desconhecido"}
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {participant.type === "ADMIN"
                            ? "Organizador"
                            : "Participante"}
                        </p>
                      </div>
                    </div>

                    {currentUserIsAdmin &&
                      participant.userId !== user?.id &&
                      !isOriginalCreator(participant) && (
                        <button
                          onClick={() => handleToggleAdmin(participant)}
                          className={`text-xs font-medium px-3 py-1 rounded border transition-colors cursor-pointer ${
                            participant.type === "ADMIN"
                              ? "bg-red-100 text-red-800 border-red-300 hover:bg-red-200 dark:bg-red-900 dark:text-red-300 dark:border-red-700 dark:hover:bg-red-800"
                              : "bg-blue-100 text-blue-800 border-blue-300 hover:bg-blue-200 dark:bg-blue-900 dark:text-blue-300 dark:border-blue-700 dark:hover:bg-blue-800"
                          }`}
                        >
                          {participant.type === "ADMIN"
                            ? "Rebaixar"
                            : "Promover"}
                        </button>
                      )}
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 dark:text-gray-400 text-center py-4">
                Nenhum participante inscrito ainda.
              </p>
            )}
          </div>

          <div className="flex justify-end gap-3 mt-6 pt-4 border-t">
            <button
              onClick={onClose}
              className="cursor-pointer px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 rounded-md hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
            >
              Fechar
            </button>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}
