import Chat from "@/components/Chat";

export default function Home() {
  return (
      <main className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <h1 className="text-2xl font-bold mb-4">Live Chat</h1>
        <Chat />
      </main>
  );
}
