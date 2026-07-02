import type { Metadata } from "next";
import AdminPanel from "./panel";
import AdminSessionProvider from "./session-provider";

export const metadata: Metadata = {
  title: "Admin",
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminPage() {
  return (
    <AdminSessionProvider>
      <AdminPanel />
    </AdminSessionProvider>
  );
}
