import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer>
      <p>
        &copy;{currentYear} The Gal Abroad&trade;. All rights reserved.
      </p>
    </footer>
  );
}
