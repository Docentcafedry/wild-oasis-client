import Logo from "./_components/Logo";
import Navigation from "./_components/Navigation";
import Header from "./_components/Header";
import "./_styles/globals.css";
import { Josefin_Sans } from "next/font/google";
import { ReservationProvider } from "@/app/contexts/ReservationContext";
import "react-day-picker/style.css";

const font = Josefin_Sans({
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  title: {
    template: "%s | The Wild Oasis",
    default: "The Wild Oasis",
  },
  description:
    "The Wild Oasis Project with cousy wooden cabins for your family",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${font.className} bg-primary-950 text-primary-100 flex flex-col min-h-screen relative`}
      >
        <ReservationProvider>
          <Header />
          <div
            className="flex-1 px-7 py-11 grid
        "
          >
            <main className="max-w-7xl mx-auto w-full">{children}</main>
          </div>
        </ReservationProvider>
      </body>
    </html>
  );
}
