import React, { createContext, useState, ReactNode } from 'react';

interface TokenContextType {
  token: string;
  setToken: React.Dispatch<React.SetStateAction<string>>;
}

export const TokenContext = createContext<TokenContextType | undefined>(undefined);

export const TokenProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState<string>(()=> {
    return localStorage.getItem("token") ?? ""
  });

  return (
    <TokenContext.Provider value={{ token, setToken }}>
      {children}
    </TokenContext.Provider>
  );
};