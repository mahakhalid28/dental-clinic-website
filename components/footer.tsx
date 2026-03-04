import Link from "next/link";

const footerNav = {
  Company: [
    { label: "About Us", href: "#about" },
    { label: "Our Team", href: "#about" },
    { label: "Testimonials", href: "#testimonials" },
    { label: "Careers", href: "#" },
  ],
  Support: [
    { label: "Book Appointment", href: "#appointment" },
    { label: "Contact Us", href: "#contact" },
    { label: "Insurance Info", href: "#" },
    { label: "Patient Forms", href: "#" },
  ],
};

export function Footer() {
  return (
    <footer style={{ backgroundColor: "#0A2342" }}>
      <div className="mx-auto max-w-7xl px-6 py-20 text-lg">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div className="flex flex-col gap-4">
            <Link href="#home" className="flex items-center gap-4">
              <div
                className="flex h-14 w-14 items-center justify-center rounded-lg"
                style={{ backgroundColor: "#BFA37C" }}
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  className="h-5 w-5"
                  stroke="#0A2342"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 2C8 2 6 5 6 8c0 4 2 6 3 10h6c1-4 3-6 3-10 0-3-2-6-6-6Z" />
                  <path d="M9 18h6" />
                  <path d="M10 22h4" />
                </svg>
              </div>
              <span className="text-3xl font-bold tracking-tight text-white">
                  Dental Ease
              </span>
            </Link>
              <div className="max-w-xs text-lg leading-relaxed" style={{ color: "rgba(255, 255, 255, 0.7)" }}>
                <p className="font-semibold text-xl">Designed for comfort. Delivered with care.</p>
                <p className="mt-2 text-lg">Because your smile deserves the very best.</p>
              </div>
          </div>

          {Object.entries(footerNav).map(([title, links]) => (
            <div key={title} className="flex flex-col gap-4">
              <h3 className="text-lg font-semibold text-white">{title}</h3>
              <nav
                className="flex flex-col gap-3"
                aria-label={`${title} navigation`}
              >
                {links.map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    className="text-lg transition-colors duration-200 hover:text-[#BFA37C]"
                    style={{ color: "rgba(255, 255, 255, 0.7)" }}
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
            </div>
          ))}
        </div>

        <div
          className="mt-12 flex flex-col items-center justify-between gap-4 pt-8 md:flex-row"
          style={{ borderTop: "1px solid rgba(191, 163, 124, 0.3)" }}
        >
          <p className="text-lg" style={{ color: "rgba(255, 255, 255, 0.7)" }}>
            {`© ${new Date().getFullYear()} Dental Ease. All rights reserved.`}
          </p>
          <div className="flex gap-6">
            <Link
              href="#"
              className="text-lg transition-colors duration-200 hover:text-[#BFA37C]"
              style={{ color: "rgba(255, 255, 255, 0.7)" }}
            >
              Privacy Policy
            </Link>
            <Link
              href="#"
              className="text-lg transition-colors duration-200 hover:text-[#BFA37C]"
              style={{ color: "rgba(255, 255, 255, 0.7)" }}
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
