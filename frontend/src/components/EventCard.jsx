import EventOptions from "./EventOptions.jsx";
import { create, remove, getByUserId } from "../services/sign-up-services.js";
import { useUser } from "../contexts/UserContext.jsx";
import { useState, useEffect } from "react";

export default function EventCard({ event, onEventUpdated, onEventDeleted }) {
  const { user } = useUser();
  const [isSignedUp, setIsSignedUp] = useState(false);
  const [userSignUpType, setUserSignUpType] = useState(null);

  useEffect(() => {
    async function checkSignUp() {
      if (user) {
        try {
          const signUps = await getByUserId(user.id);
          const userSignUp = signUps.find(
            (signUp) => signUp.eventId === event.id
          );

          setIsSignedUp(!!userSignUp);
          setUserSignUpType(userSignUp?.type || null);
        } catch (error) {
          console.error("Erro ao verificar inscrição:", error);
          setIsSignedUp(false);
          setUserSignUpType(null);
        }
      }
    }

    checkSignUp();
  }, [user, event.id]);

  // É admin se o type for "ADMIN"
  const isAdmin = userSignUpType === "ADMIN";

  // Só mostra botão participar se NÃO for admin e NÃO estiver inscrito como PARTICIPANT
  const showParticipateButton = !isAdmin && !isSignedUp;

  async function handleSignUp() {
    try {
      await create({ userId: user.id, eventId: event.id });
      console.log("Inscrição realizada com sucesso!");
      setIsSignedUp(true);
      setUserSignUpType("PARTICIPANT"); // ou o tipo que você usa para participantes normais
    } catch (error) {
      console.error("Erro ao se inscrever no evento:", error);
    }
  }

  async function handleUnsignUp() {
    try {
      const signUps = await getByUserId(user.id);
      const signUpForThisEvent = signUps.find(
        (signUp) => signUp.eventId === event.id
      );

      if (!signUpForThisEvent) {
        console.error("Inscrição não encontrada para este evento");
        return;
      }

      await remove(signUpForThisEvent.id);
      console.log("Inscrição cancelada com sucesso!");
      setIsSignedUp(false);
      setUserSignUpType(null);
    } catch (error) {
      console.error("Erro ao cancelar inscrição:", error);
    }
  }

  return (
    <figure className="relative flex flex-col items-center justify-center p-6 text-center bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <div className="absolute top-4 right-4">
        <EventOptions
          event={event}
          onEventUpdated={onEventUpdated}
          onEventDeleted={onEventDeleted}
        />
      </div>

      <blockquote className="text-gray-500 dark:text-gray-400">
        <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">
          {event.title}
        </h3>
        <div className="flex flex-row gap-4 justify-center items-center">
          <div className="flex flex-row gap-1 items-center">
            <span className="material-symbols-outlined">location_on</span>
            <p className="my-2">{event.location}</p>
          </div>
          <span>|</span>
          <div className="flex flex-row gap-1 items-center">
            <span className="material-symbols-outlined">event</span>
            <p className="my-2">
              {new Date(event.date).toLocaleDateString("pt-BR", {
                timeZone: "UTC",
              })}
            </p>
          </div>
        </div>
      </blockquote>

      {isAdmin && (
        <div className="bg-transparent text-sm font-semibold border border-green-800 text-green-800 my-2 px-4 py-2 rounded-lg">
          Você é administrador deste evento
        </div>
      )}

      {showParticipateButton && (
        <button
          type="button"
          onClick={handleSignUp}
          className="bg-transparent text-sm font-semibold border border-blue-950 text-blue-950 hover:bg-blue-950 hover:text-white my-2 px-4 py-2 rounded-lg transition-all ease-in-out duration-500 cursor-pointer"
        >
          Participar
        </button>
      )}

      {isSignedUp && !isAdmin && (
        <button
          type="button"
          onClick={handleUnsignUp}
          className="bg-transparent text-sm font-semibold border border-red-500 text-red-500 hover:bg-red-500 hover:text-white my-2 px-4 py-2 rounded-lg transition-all ease-in-out duration-500 cursor-pointer"
        >
          Cancelar Inscrição
        </button>
      )}

      <figcaption className="flex items-center justify-center">
        <div className="text-xs text-gray-500 dark:text-gray-400">
          Criado por{" "}
          <span className="font-semibold">{event.createdByUser?.name}</span>
        </div>
      </figcaption>
    </figure>
  );
}
