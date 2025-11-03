import { useEffect, useState } from "react";
import { initFlowbite } from "flowbite";
import Header from "../components/Header";
import AddEventButton from "../components/AddEventButton";
import EventCard from "../components/EventCard";
import { getAll } from "../services/event-services.js";

export default function Home() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    async function loadEvents() {
      try {
        const eventsData = await getAll();
        setEvents(eventsData);
      } catch (error) {
        console.error("Erro ao carregar eventos:", error);
      }
    }
    loadEvents();
  }, []);

  // Callback quando um evento é criado
  const handleEventCreated = (newEvent) => {
    console.log("🎉 Novo evento criado:", newEvent);
    setEvents((prevEvents) => [...prevEvents, newEvent]);
  };

  // Callback quando um evento é atualizado
  const handleEventUpdated = (updatedEvent) => {
    console.log("🔄 Evento atualizado:", updatedEvent);
    setEvents((prevEvents) =>
      prevEvents.map((event) => {
        if (event.id === updatedEvent.id) {
          // Garante que mantém o createdByUser se não vier no updated
          return {
            ...updatedEvent,
            createdByUser: updatedEvent.createdByUser || event.createdByUser,
          };
        }
        return event;
      })
    );
  };

  // Callback quando um evento é deletado
  const handleEventDeleted = (deletedEventId) => {
    console.log("🗑️ Evento deletado ID:", deletedEventId);
    setEvents((prevEvents) =>
      prevEvents.filter((event) => event.id !== deletedEventId)
    );
  };

  useEffect(() => {
    if (events.length > 0) {
      initFlowbite();
    }
  }, [events]);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <Header />

      <main className="container mx-auto p-6 flex flex-col gap-6">
        <div className="flex justify-between items-center">
          <h1 className="text-4xl font-semibold text-gray-900 dark:text-white">
            Eventos
          </h1>
          {/* Adicione o callback onEventCreated */}
          <AddEventButton onEventCreated={handleEventCreated} />
        </div>

        {events.length === 0 ? (
          <div className="text-center py-12">
            <span className="material-symbols-outlined text-6xl text-gray-400 dark:text-gray-600 mb-4">
              event
            </span>
            <p className="text-xl text-gray-500 dark:text-gray-400">
              Nenhum evento encontrado
            </p>
            <p className="text-gray-400 dark:text-gray-500 mt-2">
              Crie seu primeiro evento clicando no botão acima!
            </p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">
            {events.map((event) => (
              <EventCard
                key={event.id}
                event={event}
                onEventUpdated={handleEventUpdated}
                onEventDeleted={handleEventDeleted}
              />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
