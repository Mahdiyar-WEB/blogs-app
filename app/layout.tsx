import "styles/globals.css";
import vazirFont from "constants/localFont";
import UserProvider from "context/UserContext";
import ReactQueryProvider from "providers/ReactQueryProvider";
import DemoResetChecker from "components/DemoResetChecker";
import ToastProvider from "./ToastProvider";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { ReactNode } from "react";

export const metadata = {
  title: {
    template: "%s | بلاگیتو",
    default: "بلاگیتو", // a default is required when creating a template
  },
  description: "وب اپلیکیشن بلاگیتو",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="fa" dir="rtl" data-scroll-behavior="smooth">
      <body
        className={`${vazirFont.variable} font-sans min-h-screen bg-transparent`}
      >
        <SpeedInsights />
        <ToastProvider />
        <ReactQueryProvider>
          <UserProvider>
            <DemoResetChecker />
            {children}
          </UserProvider>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
