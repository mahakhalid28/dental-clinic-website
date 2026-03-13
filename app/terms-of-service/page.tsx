export default function TermsOfService() {
  return (
    <>
      {/* Hero Section */}
      <section
        className="relative py-28 text-center"
        style={{
          background:
            "linear-gradient(135deg, #0A2342 0%, #0D2B4D 50%, #0A2342 100%)",
        }}
      >
        <div className="mx-auto max-w-4xl px-6">
          <span
            className="inline-block px-5 py-2 rounded-full text-xs font-bold uppercase tracking-[0.25em] mb-6"
            style={{
              background: "rgba(191,163,124,0.15)",
              color: "#BFA37C",
              border: "1px solid rgba(191,163,124,0.3)",
            }}
          >
            Legal
          </span>

          <h1
            className="text-4xl md:text-5xl font-bold mb-6"
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              color: "#FFFFFF",
            }}
          >
            Terms of <span style={{ color: "#BFA37C" }}>Service</span>
          </h1>

          <p
            className="text-lg max-w-2xl mx-auto"
            style={{ color: "rgba(255,255,255,0.7)" }}
          >
            These terms govern your use of the Dental Ease website and our
            services. Please read them carefully before using our platform.
          </p>
        </div>
      </section>

      {/* Content Section */}
      <section
        className="py-24 px-6"
        style={{
          background:
            "linear-gradient(180deg, #FDFCFA 0%, #F8F6F3 50%, #F5F3EF 100%)",
        }}
      >
        <div className="max-w-4xl mx-auto space-y-8">

          {[
            {
              title: "Acceptance of Terms",
              text: "By accessing or using the Dental Ease website, you agree to comply with these Terms of Service. If you do not agree with any part of these terms, please discontinue use of the website.",
            },
            {
              title: "Medical Disclaimer",
              text: "Information provided on this website is intended for general informational purposes only and should not replace professional dental advice, diagnosis, or treatment. Always consult a qualified dentist regarding any dental concerns.",
            },
            {
              title: "Appointment Bookings",
              text: "Appointments requested through our website are subject to confirmation by Dental Ease staff. We reserve the right to modify or cancel bookings due to scheduling conflicts or unforeseen circumstances.",
            },
            {
              title: "User Responsibilities",
              text: "Users must provide accurate and truthful information when booking appointments or submitting inquiries. Any misuse of the website or submission of false information may result in restricted access to our services.",
            },
            {
              title: "Pricing & Payments",
              text: "All treatment prices listed on the website are estimates. Final costs may vary depending on the complexity of the procedure and additional treatments required.",
            },
            {
              title: "Changes to Terms",
              text: "Dental Ease reserves the right to update or modify these Terms of Service at any time. Continued use of the website following updates indicates acceptance of the revised terms.",
            },
          ].map((item) => (
            <div
              key={item.title}
              className="p-8 rounded-2xl"
              style={{
                background: "#FFFFFF",
                boxShadow: "0 10px 40px -15px rgba(10,35,66,0.15)",
                border: "1px solid rgba(191,163,124,0.15)",
              }}
            >
              <h2
                className="text-xl font-bold mb-3"
                style={{
                  fontFamily: "'Playfair Display', Georgia, serif",
                  color: "#0A2342",
                }}
              >
                {item.title}
              </h2>

              <p
                className="leading-relaxed"
                style={{ color: "#5A6573" }}
              >
                {item.text}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section
        className="py-20 text-center"
        style={{
          background: "linear-gradient(135deg, #0A2342 0%, #0D2B4D 100%)",
        }}
      >
        <div className="max-w-3xl mx-auto px-6">
          <h2
            className="text-3xl font-bold mb-6"
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              color: "#FFFFFF",
            }}
          >
            Questions About Our Terms?
          </h2>

          <p
            className="mb-8"
            style={{ color: "rgba(255,255,255,0.7)" }}
          >
            If you have any questions regarding our Terms of Service, feel free
            to contact our Dental Ease support team.
          </p>

          <a
            href="/#contact"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-semibold transition-all duration-300"
            style={{
              background:
                "linear-gradient(135deg, #BFA37C 0%, #D4B896 100%)",
              color: "#0A2342",
            }}
          >
            Contact Us
          </a>
        </div>
      </section>
    </>
  );
}