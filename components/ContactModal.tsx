"use client";

import { useEffect, useState } from "react";
import type { Contact, Relationship } from "@/types/contact";

type Mode = "add" | "view";

interface ContactModalProps {
  isOpen: boolean;
  mode: Mode;
  onClose: () => void;
  onAdd?: (contact: Omit<Contact, "id">) => void;
  contactToView?: Contact | null;
}

const relationshipOptions: Relationship[] = ["Partner", "Customer"];

export default function ContactModal({
  isOpen,
  mode,
  onClose,
  onAdd,
  contactToView,
}: ContactModalProps) {
  const isView = mode === "view";

  const [company, setCompany] = useState("");
  const [contact, setContact] = useState("");
  const [email, setEmail] = useState("");
  const [relationship, setRelationship] = useState<Relationship>("Partner");
  const [primary, setPrimary] = useState(false);

  // Pre-fill when opening in view mode
  useEffect(() => {
    if (isOpen && isView && contactToView) {
      setCompany(contactToView.company);
      setContact(contactToView.contact);
      setEmail(contactToView.email);
      setRelationship(contactToView.relationship);
      setPrimary(contactToView.primary);
    }
    if (isOpen && !isView) {
      // clear form for add mode
      setCompany("");
      setContact("");
      setEmail("");
      setRelationship("Partner");
      setPrimary(false);
    }
  }, [isOpen, isView, contactToView]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isView || !onAdd) return;

    onAdd({
      company,
      contact,
      email,
      relationship,
      primary,
    });

    onClose();
  };

  const inputBase =
    "w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="w-full max-w-lg rounded-lg bg-white p-6 shadow-lg">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-800">
            Contact Details
          </h2>
          <button
            onClick={onClose}
            className="text-2xl leading-none text-gray-400 hover:text-gray-600"
            aria-label="Close"
          >
            &times;
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-4 items-center gap-3">
            <label className="col-span-1 text-sm font-medium text-gray-700">
              Company
            </label>
            <div className="col-span-3">
              <input
                className={inputBase}
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                disabled={isView}
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-4 items-center gap-3">
            <label className="col-span-1 text-sm font-medium text-gray-700">
              Contact
            </label>
            <div className="col-span-3">
              <input
                className={inputBase}
                value={contact}
                onChange={(e) => setContact(e.target.value)}
                disabled={isView}
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-4 items-center gap-3">
            <label className="col-span-1 text-sm font-medium text-gray-700">
              Email
            </label>
            <div className="col-span-3">
              <input
                type="email"
                className={inputBase}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isView}
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-4 items-center gap-3">
            <label className="col-span-1 text-sm font-medium text-gray-700">
              Relationship
            </label>
            <div className="col-span-3">
              <select
                className={inputBase}
                value={relationship}
                onChange={(e) =>
                  setRelationship(e.target.value as Relationship)
                }
                disabled={isView}
              >
                {relationshipOptions.map((rel) => (
                  <option key={rel} value={rel}>
                    {rel}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-4 items-center gap-3">
            <label className="col-span-1 text-sm font-medium text-gray-700">
              Primary
            </label>
            <div className="col-span-3">
              <label className="inline-flex items-center gap-2 text-sm text-gray-700">
                <input
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  checked={primary}
                  onChange={(e) => setPrimary(e.target.checked)}
                  disabled={isView}
                />
                Primary contact?
              </label>
            </div>
          </div>

          {/* Add button only in add mode */}
          {!isView && (
            <div className="mt-4 flex justify-end">
              <button
                type="submit"
                className="rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-700"
              >
                Add
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
