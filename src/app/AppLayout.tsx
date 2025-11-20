import Navbar from "../components/Navbar";

export default function AppLayout({ children }: { children: React.ReactNode }) {

  return (
    /* min-h-screen flex flex-col -> Garantisce un layout a colonna solido su tutti i device.*/
    <div className="min-h-screen flex flex-col text-white bg-hero-radial">

      <Navbar />

       {/* Contenuto sotto la navbar 
          pt-16 compensa l’altezza del Navbar (16 = 64px) */}

      {/* Content container */}
      <main className="flex-1 pt-16 px-4 sm:px-6 md:px-8 max-w-5xl w-full mx-auto">
        {children}
      </main>
    </div>
  );
}
