import { Toaster } from "sonner";

export function Provider({ children }) {
  return (
    <>
      <Toaster
        position="top-right"
        richColors
        theme="light"
        closeButton
        duration={500}
      />
      {children}
    </>
  );
}
