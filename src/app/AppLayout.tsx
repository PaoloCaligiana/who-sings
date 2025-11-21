import Navbar from "../components/Navbar";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    /* min-h-screen flex flex-col -> Garantisce un layout a colonna solido su tutti i device.*/
    <div className="min-h-screen flex flex-col text-white bg-hero-radial">
      <Navbar />

      {/* Contenuto sotto la navbar 
          pt-16 compensa l'altezza del Navbar (16 = 64px) */}

      {/* Content container */}
      <main className="flex-1 pt-16 md:pt-20 lg:pt-24 px-4 sm:px-6 md:px-8 lg:px-12 max-w-5xl lg:max-w-6xl xl:max-w-7xl w-full mx-auto">
        {children}
      </main>
    </div>
  );
}
