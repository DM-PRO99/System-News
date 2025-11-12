"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Sun, Moon } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return (
      <motion.div
        className="h-10 w-16 rounded-full bg-muted"
        initial={{ opacity: 0.3 }}
        animate={{ opacity: 0.6 }}
        transition={{ duration: 0.4 }}
      />
    );
  }

  const isDark = theme === "dark";

  const handleToggle = (checked: boolean) => {
    setTheme(checked ? "dark" : "light");
  };

  return (
    <TooltipProvider delayDuration={200}>
      <Tooltip>
        <TooltipTrigger asChild>
          <div className="flex items-center gap-2">
            <Sun className="h-5 w-5 text-yellow-500" />
            <Switch
              checked={isDark}
              onCheckedChange={handleToggle}
              className="data-[state=checked]:bg-primary"
            />
            <Moon className="h-5 w-5 text-indigo-500" />
          </div>
        </TooltipTrigger>
        <TooltipContent side="bottom">
          <p>{isDark ? "Modo oscuro" : "Modo claro"}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

