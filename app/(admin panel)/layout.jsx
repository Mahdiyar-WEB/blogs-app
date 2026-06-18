import "styles/globals.css";
import vazirFont from "constants/localFont";
import { Toaster } from "react-hot-toast";
import Drawer from "./Drawer";
import Header from "./Header";
import UserProvider from "context/UserContext";

export const metadata = {
  title: {
    template: "%s | پنل ادمین",
    default: "بلاگیتو", // a default is required when creating a template
  },
  description: "پنل ادمین",
};

export default function RootLayout({ children }) {
  return (
    <html lang="fa" dir="rtl" data-scroll-behavior="smooth">
      <body
        className={`${vazirFont.variable} font-sans min-h-screen relative flex`}
      >
        <Toaster />
        <UserProvider>
          <Drawer />
          <div className="border flex flex-col flex-1">
            <Header />
            {children}
          </div>
        </UserProvider>
      </body>
    </html>
  );
}
