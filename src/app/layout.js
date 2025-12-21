import "../styles/index.scss";
import Header from "@/components/header";
import Footer from "@/components/footer";

export const metadata = {
  title: "Travel Journal",
  description: "My Personal Travel Adventures",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
