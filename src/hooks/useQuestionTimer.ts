import { useState, useEffect, useRef, useCallback } from "react";

interface TimerOptions {
  duration: number; // durata del timer (in secondi)
  active: boolean; // se il timer deve essere attivo
  onExpire?: () => void; // callback da eseguire alla scadenza
}

export function useQuestionTimer({ duration, active, onExpire }: TimerOptions) {
  const [timeLeft, setTimeLeft] = useState(duration);
  const intervalRef = useRef<number | null>(null);
  const callbackRef = useRef(onExpire);
  const durationRef = useRef(duration);

  // Mantiene sempre aggiornato il riferimento alla duration
  useEffect(() => {
    durationRef.current = duration;
  }, [duration]);

  // Mantiene sempre aggiornata la callback senza triggerare effetti inutili
  useEffect(() => {
    callbackRef.current = onExpire;
  }, [onExpire]);

  // Funzione che resetta il timer
  const restart = useCallback(() => {
    setTimeLeft(durationRef.current);
  }, []);

  // Gestione del countdown
  useEffect(() => {
    // Se non è attivo → stoppa tutto
    if (!active) {
      if (intervalRef.current) clearInterval(intervalRef.current);
      intervalRef.current = null;
      setTimeLeft(durationRef.current); // Reset quando si disattiva
      return;
    }

    // Quando si attiva, parte dal tempo corrente
    intervalRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          // Timer scaduto
          if (callbackRef.current) {
            callbackRef.current();
          }
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [active]);

  return { timeLeft, restart };
}
