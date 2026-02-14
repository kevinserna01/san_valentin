import type { Metadata } from "next";
import { Dancing_Script, Varela_Round } from "next/font/google";
import "./globals.css";

const dancingScript = Dancing_Script({
  subsets: ["latin"],
  weight: ["400", "700"],
});
const varelaRound = Varela_Round({ subsets: ["latin"], weight: ["400"] });

export const metadata: Metadata = {
  title: "Para mi San Valentín ❤️",
  description: "Una sorpresa para ti",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${dancingScript.className} ${varelaRound.className} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
