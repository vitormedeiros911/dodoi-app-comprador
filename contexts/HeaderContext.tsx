import React, { createContext, ReactNode, useState } from "react";

type HeaderContextType = {
  headerContent: ReactNode;
  setHeaderContent: (content: ReactNode) => void;
  backIndicator: boolean;
  setBackIndicator: (backIndicator: boolean) => void;
  isVisible: boolean;
  setIsVisible: (isVisible: boolean) => void;
};

export const HeaderContext = createContext<HeaderContextType>({
  isVisible: true,
} as HeaderContextType);

export const HeaderProvider = ({ children }: { children: ReactNode }) => {
  const [headerContent, setHeaderContent] = useState<ReactNode>(null);
  const [backIndicator, setBackIndicator] = useState<boolean>(false);
  const [isVisible, setIsVisible] = useState<boolean>(true);

  return (
    <HeaderContext.Provider
      value={{
        headerContent,
        setHeaderContent,
        backIndicator,
        setBackIndicator,
        isVisible,
        setIsVisible,
      }}
    >
      {children}
    </HeaderContext.Provider>
  );
};
