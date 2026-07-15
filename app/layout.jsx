import "styles/globals.css";
import vazirFont from "constants/localFont";
import { Toaster } from "react-hot-toast";
import UserProvider from "context/UserContext";
import ReactQueryProvider from "providers/ReactQueryProvider";
import DemoResetChecker from "components/DemoResetChecker";

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
      <body
        className={`${vazirFont.variable} font-sans min-h-screen bg-transparent`}
      >
        <Toaster />
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
