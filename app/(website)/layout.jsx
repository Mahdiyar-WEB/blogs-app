import "styles/globals.css";
import vazirFont from "constants/localFont";
import Header from "./Header";
import { Toaster } from "react-hot-toast";
import UserProvider from "context/UserContext";
import { Suspense } from "react";

export const metadata = {
  title: {
    template: "%s | بلاگیتو",
    default: "بلاگیتو", // a default is required when creating a template
  },
  description: "وب اپلیکیشن بلاگیتو",
};

export default function RootLayout({ children }) {
  return (
    <html lang="fa" dir="rtl" data-scroll-behavior="smooth">
      <body className={`${vazirFont.variable} font-sans min-h-screen relative`}>
        <Toaster />
        <UserProvider>
          <Suspense>
            <Header />
          </Suspense>
          {children}
        </UserProvider>
      </body>
    </html>
  );
}
