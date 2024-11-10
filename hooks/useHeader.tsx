import { HeaderContext } from "@/contexts/HeaderContext";
import { useContext } from "react";

export const useHeader = () => {
  const context = useContext(HeaderContext);
  if (!context) {
    throw new Error("useHeader must be used within a HeaderProvider");
  }
  return context;
};
