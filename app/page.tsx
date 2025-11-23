import ContactsTable from "@/components/ContactsTable";

export default function HomePage() {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold text-gray-800">
        Contacts Overview
      </h1>
      <ContactsTable />
    </div>
  );
}
