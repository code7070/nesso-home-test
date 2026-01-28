"use client";

import { useRef, useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import Button from "./button";

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type ModalState = "form" | "loading" | "success";

export default function ContactModal({ isOpen, onClose }: ContactModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const previousActiveElement = useRef<HTMLElement | null>(null);
  const t = useTranslations("contactModal");
  const [modalState, setModalState] = useState<ModalState>("form");

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (isOpen) {
      // Store the currently focused element
      previousActiveElement.current = document.activeElement as HTMLElement;
      dialog.showModal();
      // Prevent body scroll
      document.body.style.overflow = "hidden";
    } else {
      dialog.close();
      // Reset state when modal closes
      setModalState("form");
      // Restore body scroll
      document.body.style.overflow = "";
      // Return focus to the element that opened the modal
      if (previousActiveElement.current) {
        previousActiveElement.current.focus();
      }
    }
  }, [isOpen]);

  // Handle Escape key
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && modalState !== "loading") {
        e.preventDefault();
        onClose();
      }
    };

    if (isOpen) {
      dialog.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      dialog.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, modalState, onClose]);

  const handleBackdropClick = (e: React.MouseEvent<HTMLDialogElement>) => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    const rect = dialog.getBoundingClientRect();
    const isInDialog =
      e.clientX >= rect.left &&
      e.clientX <= rect.right &&
      e.clientY >= rect.top &&
      e.clientY <= rect.bottom;

    if (!isInDialog && modalState !== "loading") {
      onClose();
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setModalState("loading");

    // Fake loading for 3 seconds
    setTimeout(() => {
      setModalState("success");
    }, 3000);
  };

  const handleClose = () => {
    if (modalState !== "loading") {
      onClose();
    }
  };

  return (
    <dialog
      ref={dialogRef}
      onClick={handleBackdropClick}
      onClose={handleClose}
      aria-modal="true"
      aria-labelledby="modal-title"
      className="backdrop:bg-black/50 backdrop:backdrop-blur-sm bg-transparent p-0 max-w-lg w-full px-4 rounded-3xl fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
    >
      <div className="bg-white rounded-3xl p-6 md:p-10 relative pop-out-fade">
        {/* Close Button - hidden during loading */}
        {modalState !== "loading" && (
          <button
            type="button"
            onClick={handleClose}
            className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full text-gray-dark hover:bg-gray-lighter transition-all"
            aria-label="Close"
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1 1L13 13M1 13L13 1"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </button>
        )}

        {/* Form State */}
        {modalState === "form" && (
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <h2 id="modal-title" className="text-2xl md:text-3xl text-primary leading-tight tracking-[-0.03em]">
                {t("title")}
              </h2>
              <p className="text-sm md:text-base font-light text-gray-dark/60">
                {t("description")}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="name"
                  className="text-sm font-medium text-gray-dark"
                >
                  {t("nameLabel")}
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  placeholder={t("namePlaceholder")}
                  className="w-full px-4 py-3 rounded-xl border border-gray-light bg-gray-lightest focus:border-primary focus:outline-none transition-all placeholder:text-gray-neutral"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label
                  htmlFor="email"
                  className="text-sm font-medium text-gray-dark"
                >
                  {t("emailLabel")}
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  placeholder={t("emailPlaceholder")}
                  className="w-full px-4 py-3 rounded-xl border border-gray-light bg-gray-lightest focus:border-primary focus:outline-none transition-all placeholder:text-gray-neutral"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label
                  htmlFor="message"
                  className="text-sm font-medium text-gray-dark"
                >
                  {t("messageLabel")}
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={4}
                  placeholder={t("messagePlaceholder")}
                  className="w-full px-4 py-3 rounded-xl border border-gray-light bg-gray-lightest focus:border-primary focus:outline-none transition-all resize-none placeholder:text-gray-neutral"
                />
              </div>

              <div className="mt-2">
                <Button type="submit" className="w-full justify-center">
                  {t("submitButton")}
                </Button>
              </div>
            </form>
          </div>
        )}

        {/* Loading State */}
        {modalState === "loading" && (
          <div className="flex flex-col items-center justify-center py-12 gap-6" role="status" aria-live="polite">
            <div className="relative w-16 h-16">
              <div className="absolute inset-0 rounded-full border-4 border-gray-light"></div>
              <div className="absolute inset-0 rounded-full border-4 border-primary border-t-transparent animate-spin"></div>
            </div>
            <div className="flex flex-col items-center gap-2">
              <p id="modal-title" className="text-lg font-medium text-gray-dark">
                {t("loadingTitle")}
              </p>
              <p className="text-sm font-light text-gray-dark/60">
                {t("loadingDescription")}
              </p>
            </div>
          </div>
        )}

        {/* Success State */}
        {modalState === "success" && (
          <div className="flex flex-col items-center justify-center py-12 gap-6 pop-out-fade" role="status" aria-live="polite">
            <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center">
              <svg
                width="40"
                height="40"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path
                  d="M5 13L9 17L19 7"
                  stroke="#22c55e"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <div className="flex flex-col items-center gap-2 text-center">
              <h2 id="modal-title" className="text-2xl md:text-3xl text-primary leading-tight tracking-[-0.03em]">
                {t("successTitle")}
              </h2>
              <p className="text-sm md:text-base font-light text-gray-dark/60">
                {t("successDescription")}
              </p>
            </div>
            <div className="mt-2">
              <Button onClick={handleClose} className="px-8">
                {t("successButton")}
              </Button>
            </div>
          </div>
        )}
      </div>
    </dialog>
  );
}
