import Chatbot from '../components/Chatbot';

export default function Home() {
  return (
    <main className="h-screen w-full overflow-hidden flex">
      <div className="w-1/3 bg-gray-100 p-4">
        <h1 className="text-2xl font-bold">Open Claude</h1>
        {/* You can add additional content or navigation here */}
      </div>
      <div className="w-2/3">
        <Chatbot />
      </div>
    </main>
  );
}
