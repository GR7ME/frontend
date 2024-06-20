import React, { createContext, useState, ReactNode } from "react";

interface UserContextType {
  user: {
    username: string;
    email: string;
  };
  setUser: React.Dispatch<
    React.SetStateAction<{
      username: string;
      email: string;
    }>
  >;
}

interface userType {
  username: string;
  email: string;
}

export const UserContext = createContext<UserContextType | undefined>(
  undefined,
);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<userType>({
    username: "",
    email: "",
  });

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
