
import ThemeRegistry from "@/components/ThemeRegistry";
import { geistSans, geistMono } from "@/utils/theme";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
         <ThemeRegistry>{children}</ThemeRegistry>
      </body>
    </html>
  );
}
