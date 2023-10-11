import { createContext, useState } from "react";

interface TitleInterface {
  title: string | undefined;
  setTitle: (title: string) => void;
  handleTitle: (title: string) => void;
}

const defaultTitleContext: TitleInterface = {
  title: "",
  setTitle: () => { },
  handleTitle: () => void {},
};

export const TitleContext = createContext<TitleInterface>(defaultTitleContext);

export function TitleProvider({ children }: { children: React.ReactNode }) {
  const [title, setTitle] = useState<string>("");

  const handleTitle = (title: string) => {
    setTitle(title);
  }

  return (
    <TitleContext.Provider value={{
      title,
      setTitle,
      handleTitle
    }}>
      {children}
    </TitleContext.Provider>
  )
}