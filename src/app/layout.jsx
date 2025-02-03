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
    <html lang="en" data-theme="corporate">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased  `}
      >
        <div  className="w-full h-full flex items-center justify-center">
          <div className="w-[1600px] h-full flex flex-col justify-center">
            <NavigationBar/>
            <div className="w-full flex justify-center">
              {children}
            </div>
          </div>
        </div>
        
      </body>
    </html>
  );
}
