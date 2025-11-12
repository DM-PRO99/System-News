"use client";

import { ThemeProvider } from "next-themes";
import { SessionProvider } from "next-auth/react";
import { Toaster } from "sonner";
import type { ReactNode } from "react";

type ProvidersProps = {
  children: ReactNode;
};

export function Providers({ children }: ProvidersProps) {
  return (
    <SessionProvider refetchInterval={0} refetchOnWindowFocus={false}>
      <ThemeProvider
        attribute="class"
        defaultTheme="light"
        enableSystem={false}
        disableTransitionOnChange
      >
        {children}
        <Toaster position="top-right" richColors />
      </ThemeProvider>
    </SessionProvider>
  );
}

