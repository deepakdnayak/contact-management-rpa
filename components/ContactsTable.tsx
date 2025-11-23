"use client";

import { useMemo, useState } from "react";
import type { Contact } from "@/types/contact";
import ContactModal from "./ContactModal";

const initialContacts: Contact[] = [
  {
    id: 1,
    company: "Burns Industries",
    contact: "Charles Montgomery Burns",
    email: "charles.montgomery@burnsindustries.com",
    relationship: "Partner",
    primary: true,
  },
  {
    id: 2,
    company: "Delos Inc",
    contact: "James Delos",
    email: "james.delos@delosinc.com",
    relationship: "Partner",
    primary: true,
  },
  {
    id: 3,
    company: "Dunder Mifflin, Inc.",
    contact: "Michael Scott",
    email: "mscott@dundermifflininc.com",
    relationship: "Partner",
    primary: true,
  },
  {
    id: 4,
    company: "Dunder Mifflin, Inc.",
    contact: "Dwight Schrute",
    email: "dschrute@dundermifflininc.com",
    relationship: "Partner",
    primary: true,
  },
  {
    id: 5,
    company: "E Corp",
    contact: "Phillip Price",
    email: "phillip.price.belson@e.co",
    relationship: "Customer",
    primary: false,
  },
  {
    id: 6,
    company: "Entertainment 720",
    contact: "Tom Haverford",
    email: "tom@entertainment720.com",
    relationship: "Customer",
    primary: true,
  },
  {
    id: 7,
    company: "Entertainment 720",
    contact: "Jean Ralphio Saperstein",
    email: "jean@entertainment720.com",
    relationship: "Customer",
    primary: true,
  },
  {
    id: 8,
    company: "Globex",
    contact: "Hank Scorpio",
    email: "hankscorpio@globex.com",
    relationship: "Customer",
    primary: false,
  },
  {
    id: 9,
    company: "Hooli",
    contact: "Gavin Belson",
    email: "gavin.belson@hooli.io",
    relationship: "Customer",
    primary: false,
  },
  {
    id: 10,
    company: "InGen",
    contact: "Simon Masrani",
    email: "simon.masrani@ingen.com",
    relationship: "Partner",
    primary: true,
  },
];

type ModalState =
  | { mode: "add"; open: true }
  | { mode: "view"; open: true }
  | { mode: null; open: false };

export default function ContactsTable() {
  const [contacts, setContacts] = useState<Contact[]>(initialContacts);
  const [search, setSearch] = useState("");
  const [modalState, setModalState] = useState<ModalState>({
    mode: null,
    open: false,
  });

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return contacts;
    return contacts.filter((c) =>
      [c.company, c.contact, c.email, c.relationship, c.primary ? "Yes" : "No"]
        .join(" ")
        .toLowerCase()
        .includes(q)
    );
  }, [contacts, search]);

  const openAdd = () => setModalState({ mode: "add", open: true });
  const openView = () => setModalState({ mode: "view", open: true });
  const closeModal = () => setModalState({ mode: null, open: false });

  const handleAddContact = (newContact: Omit<Contact, "id">) => {
    setContacts((prev) => [
      ...prev,
      { ...newContact, id: prev.length ? prev[prev.length - 1].id + 1 : 1 },
    ]);
  };

  const handleDownloadCsv = () => {
    const headers = [
      "Company",
      "Contact",
      "Email",
      "Relationship",
      "Primary Contact?",
    ];

    const rows = filtered.map((c) => [
      c.company,
      c.contact,
      c.email,
      c.relationship,
      c.primary ? "Yes" : "No",
    ]);

    const csv = [headers, ...rows]
      .map((row) =>
        row
          .map((field) => `"${String(field).replace(/"/g, '""')}"`)
          .join(",")
      )
      .join("\n");

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "contacts.csv";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const firstContact = contacts[0] ?? null;

  return (
    <div className="rounded-lg bg-white p-4 shadow-sm">
      {/* Top controls */}
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2 text-sm text-gray-700">
          <span>Show</span>
          <select className="rounded-md border border-gray-300 px-2 py-1 text-sm">
            <option>10</option>
          </select>
          <span>entries</span>
        </div>

        <div className="flex flex-col items-end gap-2">
          <div className="flex gap-2">
            <button
              onClick={openAdd}
              className="rounded-md bg-blue-600 px-3 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-700"
            >
              Add Contact +
            </button>
            <button
              onClick={openView}
              className="rounded-md bg-slate-600 px-3 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-slate-700 disabled:cursor-not-allowed disabled:bg-slate-400"
              disabled={!firstContact}
            >
              View Contact 👁
            </button>
            <button
              onClick={handleDownloadCsv}
              className="rounded-md bg-emerald-600 px-3 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-emerald-700"
            >
              Download ⬇
            </button>
          </div>

          <label className="flex items-center gap-2 text-sm text-gray-700">
            <span>Search:</span>
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="rounded-md border border-gray-300 px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </label>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full text-left text-sm">
          <thead>
            <tr className="border-b bg-gray-50 text-xs font-semibold uppercase text-gray-600">
              <th className="px-4 py-2">Company</th>
              <th className="px-4 py-2">Contact</th>
              <th className="px-4 py-2">Email</th>
              <th className="px-4 py-2">Relationship</th>
              <th className="px-4 py-2">Primary Contact?</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((c) => (
              <tr
                key={c.id}
                className="border-b last:border-b-0 odd:bg-white even:bg-gray-50"
              >
                <td className="px-4 py-2 text-black">{c.company}</td>
                <td className="px-4 py-2 text-black">{c.contact}</td>
                <td className="px-4 py-2 text-blue-600 underline">
                  {c.email}
                </td>
                <td className="px-4 py-2 text-black">{c.relationship}</td>
                <td className="px-4 py-2 text-black">{c.primary ? "Yes" : "No"}</td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td
                  colSpan={5}
                  className="px-4 py-6 text-center text-sm text-gray-500"
                >
                  No contacts match your search.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Footer (simple info like screenshot) */}
      <div className="mt-4 flex items-center justify-between text-xs text-gray-600">
        <span>
          Showing 1 to {filtered.length} of {filtered.length} entries
        </span>
        <div className="inline-flex items-center gap-1">
          <button className="rounded border border-gray-300 px-2 py-1 text-xs text-gray-500">
            Previous
          </button>
          <button className="rounded border border-blue-500 bg-blue-500 px-3 py-1 text-xs font-semibold text-white">
            1
          </button>
          <button className="rounded border border-gray-300 px-2 py-1 text-xs text-gray-500">
            2
          </button>
          <button className="rounded border border-gray-300 px-2 py-1 text-xs text-gray-500">
            Next
          </button>
        </div>
      </div>

      {/* Modal */}
      <ContactModal
        isOpen={modalState.open}
        mode={modalState.mode === "view" ? "view" : "add"}
        onClose={closeModal}
        onAdd={handleAddContact}
        contactToView={firstContact}
      />
    </div>
  );
}
