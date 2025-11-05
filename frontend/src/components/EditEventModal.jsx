import { Dialog } from "@headlessui/react";
import { useState, useEffect } from "react";
import { update } from "../services/event-services";

export default function EditEventModal({
  isOpen,
  onClose,
  event,
  onEventUpdated,
}) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
    location: "",
  });

  useEffect(() => {
    if (event) {
      const eventDate = new Date(event.date);

      setFormData({
        title: event.title || "",
        description: event.description || "",
        date: eventDate.toISOString().split("T")[0],
        location: event.location || "",
      });
    }
  }, [event]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.title.trim() || !formData.location.trim() || !formData.date) {
      alert("Título, local e data são obrigatórios");
      return;
    }

    const selectedDate = new Date(formData.date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (selectedDate <= today) {
      alert("A data do evento deve ser futura");
      return;
    }

    try {
      const eventData = {
        title: formData.title,
        description: formData.description,
        date: new Date(formData.date).toISOString(),
        location: formData.location,
      };

      console.log("📤 Enviando dados para atualização:", eventData);

      const response = await update(event.id, eventData);
      console.log("✅ Resposta da atualização:", response);

      console.log("🔄 Chamando onEventUpdated...");
      console.log("📞 onEventUpdated existe?", !!onEventUpdated);

      if (onEventUpdated) {
        onEventUpdated(response);
        console.log("🎉 onEventUpdated chamado com sucesso!");
      } else {
        console.warn("⚠️ onEventUpdated não foi passado como prop");
      }

      onClose();
      alert("Evento atualizado com sucesso!");
    } catch (error) {
      console.error("Erro ao atualizar evento:", error);
      alert("Erro ao atualizar evento");
    }
  };

  const minDate = new Date();
  minDate.setDate(minDate.getDate() + 1);
  const minDateString = minDate.toISOString().split("T")[0];

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />

      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="mx-auto max-w-md w-full rounded-lg bg-white dark:bg-gray-800 p-6 shadow-xl">
          {/* Header */}
          <div className="flex justify-between items-start mb-6">
            <Dialog.Title className="text-xl font-bold text-gray-900 dark:text-white">
              Editar Evento
            </Dialog.Title>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 cursor-pointer"
            >
              <span className="material-symbols-outlined">close</span>
            </button>
          </div>

          {/* Formulário */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Título */}
            <div>
              <label
                htmlFor="title"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
              >
                Título do Evento *
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                placeholder="Ex: Workshop de React"
                required
              />
            </div>

            {/* Descrição */}
            <div>
              <label
                htmlFor="description"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
              >
                Descrição
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                placeholder="Descreva o evento..."
              />
            </div>

            {/* Data */}
            <div>
              <label
                htmlFor="date"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
              >
                Data *
              </label>
              <input
                type="date"
                id="date"
                name="date"
                value={formData.date}
                onChange={handleInputChange}
                min={minDateString}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                required
              />
            </div>

            {/* Localização */}
            <div>
              <label
                htmlFor="location"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
              >
                Local *
              </label>
              <input
                type="text"
                id="location"
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                placeholder="Ex: São Paulo, SP"
                required
              />
            </div>

            {/* Botões */}
            <div className="flex gap-3 pt-4 border-t">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 rounded-md hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="flex-1 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 dark:bg-blue-800 dark:hover:bg-blue-900 transition-colors disabled:opacity-50 cursor-pointer"
              >
                Salvar Alterações
              </button>
            </div>
          </form>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}
