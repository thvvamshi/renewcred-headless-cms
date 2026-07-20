import "katex/dist/katex.min.css";
import "./globals.css";

export const metadata = {
  title: "RenewCred Standards",
  description: "RenewCred carbon credits standards and registry"
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
