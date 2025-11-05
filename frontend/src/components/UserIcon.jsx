// components/UserIcon.jsx
import { Popover } from "@headlessui/react";
import { useState } from "react";
import UserProfileModal from "./UserProfileModal.jsx";

export default function UserIcon() {
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);

  return (
    <>
      <Popover className="relative">
        <Popover.Button className="flex items-center justify-center cursor-pointer">
          <span
            className="material-symbols-outlined"
            style={{ fontSize: "30px" }}
          >
            account_circle
          </span>
        </Popover.Button>

        <Popover.Panel className="absolute z-10 right-0 mt-2 w-48 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg">
          <div className="p-2">
            <button
              onClick={() => setIsProfileModalOpen(true)}
              className="cursor-pointer w-full flex items-center gap-2 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition-colors"
            >
              <span className="material-symbols-outlined text-lg">person</span>
              Meu Perfil
            </button>
          </div>
        </Popover.Panel>
      </Popover>

      <UserProfileModal
        isOpen={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(false)}
      />
    </>
  );
}
