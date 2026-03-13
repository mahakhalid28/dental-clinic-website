export default function PrivacyPolicy() {
  return (
    <>
      {/* Hero Section */}
      <section
        className="py-28 text-center"
        style={{
          background:
            "linear-gradient(135deg, #0A2342 0%, #0D2B4D 50%, #0A2342 100%)",
        }}
      >
        <div className="max-w-4xl mx-auto px-6">
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
            Privacy <span style={{ color: "#BFA37C" }}>Policy</span>
          </h1>

          <p
            className="text-lg max-w-2xl mx-auto"
            style={{ color: "rgba(255,255,255,0.7)" }}
          >
            Your privacy matters to us. Learn how Dental Ease collects, uses,
            and protects your personal information.
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
              title: "Information We Collect",
              text: "When you interact with the Dental Ease website, we may collect personal information such as your name, email address, phone number, and appointment details.",
            },
            {
              title: "How We Use Your Information",
              text: "Your information is used to manage appointment bookings, respond to inquiries, improve our services, and provide a better experience for our patients.",
            },
            {
              title: "Data Protection",
              text: "Dental Ease takes reasonable measures to protect your personal information from unauthorized access, disclosure, or misuse.",
            },
            {
              title: "Third-Party Services",
              text: "We may use trusted third-party services to operate our website or manage bookings. These services are required to keep your information secure.",
            },
            {
              title: "Cookies",
              text: "Our website may use cookies to enhance user experience, analyze traffic, and improve functionality.",
            },
            {
              title: "Changes to This Policy",
              text: "Dental Ease may update this Privacy Policy periodically. Any changes will be posted on this page.",
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
            Questions About Your Privacy?
          </h2>

          <p
            className="mb-8"
            style={{ color: "rgba(255,255,255,0.7)" }}
          >
            If you have any questions regarding how we handle your personal
            information, please contact the Dental Ease team.
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