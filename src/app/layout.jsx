import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import NavigationBar from "./components/NavigationBar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "User management",
  description: "User management pioneering project",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="light">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased  `}
      >
        <div  className="w-full h-full flex items-center justify-center">
          <div className="w-[1600px] min-h-[900px] h-full flex flex-col justify-between space-y-8">
            <NavigationBar/>
            <div className="w-full flex justify-center mb-10">
              {children}
            </div>
            <div className="h-20 flex items-center justify-center text-slate-500">
              <span className="text-sm">© 2025 User Manager | Developed by John Davila</span>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
