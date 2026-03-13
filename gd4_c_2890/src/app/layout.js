import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Memory Card Game",
  description: "Latihan React Dasar - Memory Card Game",
};


const STARS = Array.from({ length: 30 }, (_, i) => ({
  id: i,
  left:     `${(i * 37 + 11) % 100}%`,        // posisi horizontal tersebar merata
  duration: `${2 + (i * 0.3) % 4}s`,           // durasi jatuh: 2–6 detik
  delay:    `${(i * 0.7) % 5}s`,               // delay mulai: 0–5 detik
  width:    `${1 + (i % 2)}px`,                // lebar: 1–2px
  height:   `${60 + (i % 3) * 20}px`,          // panjang: 60–100px
}));

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>

        <div className="stars-container">
          {STARS.map((star) => (
            <div
              key={star.id}
              className="star"
              style={{
                left:            star.left,
                animationDuration: star.duration,
                animationDelay:  star.delay,
                width:           star.width,
                height:          star.height,
              }}
            />
          ))}
        </div>

        <div className="relative z-10">
          {children}
        </div>

      </body>
    </html>
  );
}