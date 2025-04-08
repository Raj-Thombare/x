"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export default function QueryProvider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const query = new QueryClient();

  return <QueryClientProvider client={query}>{children}</QueryClientProvider>;
}
