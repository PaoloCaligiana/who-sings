import Navbar from "../components/Navbar";

export default function AppLayout({ children }: { children: React.ReactNode }) {

  return (
    <div className="min-h-screen text-white bg-hero-radial">

      <Navbar />

      {/* Content container */}
      <main className="max-w-[900px] mx-auto px-5 py-8">
        {children}
      </main>
    </div>
  );
}
