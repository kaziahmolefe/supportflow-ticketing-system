"use client";

import { useState } from "react";

export default function SettingsPage() {
  const [settings, setSettings] = useState({
    companyName: "Global Software Services",
    supportEmail: "agent@supportflow.com",
    emailNotifications: true,
    soundNotifications: true,
    desktopAlerts: false,
  });

  return (
    <main className="p-8">
      <div className="mb-8">
        <h1 className="text-4xl font-black">Settings</h1>

        <p className="text-gray-500 dark:text-gray-400">
          Manage your SupportFlow preferences.
        </p>
      </div>

      <div className="grid gap-8">

        {/* Company */}

        <section className="rounded-3xl border bg-white p-8 shadow-sm dark:border-slate-700 dark:bg-slate-900">
          <h2 className="mb-6 text-2xl font-bold">
            Company
          </h2>

          <div className="grid gap-4 md:grid-cols-2">

            <input
              className="rounded-xl border p-3 dark:border-slate-700 dark:bg-slate-800"
              placeholder="Company Name"
              value={settings.companyName}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  companyName: e.target.value,
                })
              }
            />

            <input
              className="rounded-xl border p-3 dark:border-slate-700 dark:bg-slate-800"
              placeholder="Support Email"
              value={settings.supportEmail}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  supportEmail: e.target.value,
                })
              }
            />

          </div>
        </section>

        {/* Notifications */}

        <section className="rounded-3xl border bg-white p-8 shadow-sm dark:border-slate-700 dark:bg-slate-900">
          <h2 className="mb-6 text-2xl font-bold">
            Notifications
          </h2>

          <div className="space-y-4">

            <label className="flex items-center justify-between">
              <span>Email Notifications</span>

              <input
                type="checkbox"
                checked={settings.emailNotifications}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    emailNotifications: e.target.checked,
                  })
                }
              />
            </label>

            <label className="flex items-center justify-between">
              <span>Sound Notifications</span>

              <input
                type="checkbox"
                checked={settings.soundNotifications}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    soundNotifications: e.target.checked,
                  })
                }
              />
            </label>

            <label className="flex items-center justify-between">
              <span>Desktop Alerts</span>

              <input
                type="checkbox"
                checked={settings.desktopAlerts}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    desktopAlerts: e.target.checked,
                  })
                }
              />
            </label>

          </div>
        </section>

        {/* Appearance */}

        <section className="rounded-3xl border bg-white p-8 shadow-sm dark:border-slate-700 dark:bg-slate-900">
          <h2 className="mb-6 text-2xl font-bold">
            Appearance
          </h2>

          <p className="mb-4 text-gray-500 dark:text-gray-400">
            Theme can also be changed by selecting the moon icon in the dashboard.
          </p>

          <button
            onClick={async () => {
              const response = await fetch("/api/settings", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(settings),
              });

              if (!response.ok) {
                alert("Failed to save settings.");
                return;
              }

              alert("Settings saved successfully!");
            }}
            className="rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700"
          >
            Save Settings
          </button>

        </section>

      </div>
    </main>
  );
}