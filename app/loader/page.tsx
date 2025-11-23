"use client";

import { useEffect, useState } from "react";

export default function LoaderPage() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 5000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-gray-300 border-t-transparent" />
          <p className="text-sm text-gray-600">
            Loading contact management workspace...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4 rounded-lg bg-white p-6 shadow-sm">
      <h1 className="text-2xl font-semibold text-gray-800">Loader Page</h1>
      <p className="text-sm text-gray-600">
        This page simulates a slow-loading contact management dashboard. It is
        useful for testing robotic process automation workflows that must wait
        for spinners to disappear before interacting with the page.
      </p>

      <ul className="list-disc space-y-2 pl-5 text-sm text-gray-700">
        <li>Validate that your bot waits for the loader to finish.</li>
        <li>Read labels and buttons related to contacts after the delay.</li>
        <li>
          Confirm that selectors handle elements that appear after page load.
        </li>
      </ul>

      <div className="mt-4 grid gap-3 md:grid-cols-2">
        <div className="rounded-md border border-gray-200 p-4">
          <h2 className="mb-2 text-sm font-semibold text-gray-800">
            Upcoming Tasks
          </h2>
          <p className="text-xs text-gray-600">
            Update partner contact details, verify primary contacts and export
            CSV backups.
          </p>
        </div>
        <div className="rounded-md border border-gray-200 p-4">
          <h2 className="mb-2 text-sm font-semibold text-gray-800">
            Automation Hint
          </h2>
          <p className="text-xs text-gray-600">
            Use the loader as a checkpoint: the bot should only start searching
            for contact rows once this panel becomes visible.
          </p>
        </div>
      </div>
    </div>
  );
}
