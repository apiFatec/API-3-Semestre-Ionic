import { Moon, Sun } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useTheme } from "./theme.provider";
import { Switch } from "./ui/switch";

export function ModeToggle() {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    if (theme == "dark") {
      setTheme("light");
    } else {
      setTheme("dark");
    }
  };

  const isNightMode = theme === "dark";
  const modeText = isNightMode ? "Modo Escuro" : "Modo Claro";
  const moonMargin = isNightMode ? "ml-[-1.5rem]" : "ml-[-0.5rem]";
  const darkModeTextStyles = isNightMode ? "text-white ml-3 text-sm" : "ml-2 text-sm";

  return (
    <div
      onClick={toggleTheme}
      className={`flex items-center justify-between w-[10] absolute bottom-5 dark:text-white ${isNightMode ? 'rotate-left' : ''}`}
    >
      <Switch />
      <Moon className={`absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 ${moonMargin} dark:scale-100 ${isNightMode ? 'rotate-left' : ''}`} />
      <span className={`text-black ${darkModeTextStyles}`}>{modeText}</span>
      <Sun className={`h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 ml-2 text-black`} />
      <span className="sr-only">Toggle theme</span>
    </div>
  );
}
