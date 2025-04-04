import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "MediAI - Healthcare AI Platform",
  description: "AI-powered healthcare platform for disease prediction and medical fact verification",
  generator: 'v0.dev'
}

import ClientLayout from "./client-layout"

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return <ClientLayout>{children}</ClientLayout>
}



import './globals.css'