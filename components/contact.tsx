"use client";

import { useState, useEffect } from "react";
import { MapPin, Phone, Mail, Clock, Send } from "lucide-react";
import {
  AnimateOnScroll,
  StaggerContainer,
  StaggerItem,
  fadeInUp,
  scaleIn,
} from "./motion";

interface ContactDetail {
  type: string;
  line_1: string;
  line_2: string | null;
  link: string | null;
  link_text: string | null;
}

interface FormattedDetail {
  icon: typeof MapPin;
  title: string;
  lines: string[];
  link?: string;
  linkText?: string;
}

export function Contact() {
  const [details, setDetails] = useState<FormattedDetail[]>([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState<{type: 'success' | 'error', text: string} | null>(null);

  useEffect(() => {
    fetchContactDetails();
  }, []);

  const fetchContactDetails = async () => {
    try {
      const response = await fetch("/api/contact");
      if (response.ok) {
        const data: ContactDetail[] = await response.json();
        
        // Format the data for display
        const formatted = data.map((detail) => {
          let icon = MapPin;
          if (detail.type.toLowerCase() === "call us") icon = Phone;
          else if (detail.type.toLowerCase() === "email us") icon = Mail;
          else if (detail.type.toLowerCase() === "hours") icon = Clock;

          const lines = [detail.line_1];
          if (detail.line_2) lines.push(detail.line_2);

          return {
            icon,
            title: detail.type,
            lines,
            link: detail.link || undefined,
            linkText: detail.link_text || undefined,
          };
        });

        setDetails(formatted);
      }
    } catch (error) {
      console.error("Failed to fetch contact details:", error);
      // Fallback to default data if API fails
      setDetails([
        {
          icon: MapPin,
          title: "Visit Us",
          lines: ["Nishat Colony, DHA phase 1", "Lahore, 54810"],
          link: "https://maps.app.goo.gl/7wtK4Aq35mufe3257",
          linkText: "Get Directions",
        },
        {
          icon: Phone,
          title: "Call Us",
          lines: ["03088402625"],
        },
        {
          icon: Mail,
          title: "Email Us",
          lines: ["Ahmedqureshi999@gmail.com"],
        },
        {
          icon: Clock,
          title: "Hours",
          lines: ["Mon-Fri: 4:00 AM - 10:00 PM", "Sat: 10:00 AM - 4:00 PM", "Sun: Closed"],
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setSubmitMessage(null);

    try {
      const response = await fetch("/api/contact-message", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitMessage({ type: 'success', text: 'Message sent successfully! We will get back to you soon.' });
        setFormData({ name: "", email: "", subject: "", message: "" });
      } else {
        setSubmitMessage({ type: 'error', text: 'Failed to send message. Please try again.' });
      }
    } catch (error) {
      console.error("Error sending message:", error);
      setSubmitMessage({ type: 'error', text: 'Error sending message. Please try again.' });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section
      id="contact"
      className="py-20 lg:py-28"
      style={{ backgroundColor: "#E8E3D3" }}
    >
      <div className="mx-auto max-w-7xl px-6">
        {/* Section Header */}
        <AnimateOnScroll
          variants={fadeInUp}
          className="mx-auto mb-16 max-w-2xl text-center"
        >
          <p
            className="text-sm font-semibold uppercase tracking-[0.2em]"
            style={{ color: "#BFA37C" }}
          >
            CONTACT US
          </p>
          <h2
            className="mt-4 text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl"
            style={{
              fontFamily: "var(--font-playfair), Georgia, serif",
              color: "#0A2342",
            }}
          >
            Get in touch with us
          </h2>
          <p
            className="mt-4 text-lg leading-relaxed"
            style={{ color: "#5A5A5A" }}
          >
            Have questions or want to learn more? We are always happy to help.
          </p>
        </AnimateOnScroll>

        {/* Contact Info Grid */}
        <StaggerContainer
          className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4 mb-12"
          staggerDelay={0.12}
        >
          {details.map((d) => (
            <StaggerItem key={d.title} variants={scaleIn} className="h-full">
              <div className="group h-full flex flex-col items-center rounded-2xl bg-white p-8 text-center shadow-sm border border-transparent transition-all duration-300 ease-out hover:-translate-y-2 hover:shadow-xl hover:border-[#BFA37C]">
                {/* Gold Icon */}
                <div
                  className="flex h-14 w-14 items-center justify-center rounded-full transition-all duration-300 group-hover:scale-110 mb-4"
                  style={{ backgroundColor: "rgba(191, 163, 124, 0.15)" }}
                >
                  <d.icon
                    className="h-6 w-6 transition-colors duration-300"
                    style={{ color: "#BFA37C" }}
                  />
                </div>

                {/* Navy Bold Label */}
                <h3
                  className="text-sm font-extrabold uppercase tracking-widest mb-4"
                  style={{ color: "#0A2342" }}
                >
                  {d.title}
                </h3>

                {/* Muted Charcoal Details - flex-1 to fill remaining space */}
                <div className="flex flex-col gap-1 flex-1 justify-center">
                  {d.lines.map((line) => (
                    <p
                      key={line}
                      className="text-sm"
                      style={{ color: "#555555" }}
                    >
                      {line}
                    </p>
                  ))}
                </div>

                {/* Link at bottom (if exists) */}
                {d.link && (
                  <a
                    href={d.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 text-sm font-semibold transition-all duration-200 hover:underline"
                    style={{ color: "#0A2342" }}
                  >
                    {d.linkText} →
                  </a>
                )}
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>

        {/* Contact Form */}
        <AnimateOnScroll
          variants={fadeInUp}
          className="mx-auto max-w-2xl"
        >
          <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
            <h3
              className="text-2xl font-bold mb-6"
              style={{
                fontFamily: "var(--font-playfair), Georgia, serif",
                color: "#0A2342",
              }}
            >
              Send us a Message
            </h3>

            {submitMessage && (
              <div
                className={`mb-6 p-4 rounded-lg ${
                  submitMessage.type === 'success'
                    ? 'bg-green-100 text-green-800'
                    : 'bg-red-100 text-red-800'
                }`}
              >
                {submitMessage.text}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium mb-2"
                    style={{ color: "#0A2342" }}
                  >
                    Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    placeholder="Your name"
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-[#BFA37C] focus:ring-2 focus:ring-[#BFA37C] focus:ring-opacity-50 transition-colors"
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium mb-2"
                    style={{ color: "#0A2342" }}
                  >
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    placeholder="your@email.com"
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-[#BFA37C] focus:ring-2 focus:ring-[#BFA37C] focus:ring-opacity-50 transition-colors"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="subject"
                  className="block text-sm font-medium mb-2"
                  style={{ color: "#0A2342" }}
                >
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  placeholder="Message subject"
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-[#BFA37C] focus:ring-2 focus:ring-[#BFA37C] focus:ring-opacity-50 transition-colors"
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium mb-2"
                  style={{ color: "#0A2342" }}
                >
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  placeholder="Your message here..."
                  rows={5}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-[#BFA37C] focus:ring-2 focus:ring-[#BFA37C] focus:ring-opacity-50 transition-colors resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full py-3 rounded-lg font-semibold text-white transition-all duration-300 flex items-center justify-center gap-2 hover:shadow-lg disabled:opacity-70"
                style={{
                  background: submitting ? '#999' : 'linear-gradient(135deg, #BFA37C 0%, #D4B896 100%)',
                  color: "#0A2342",
                }}
              >
                <Send className="h-4 w-4" />
                {submitting ? "Sending..." : "Send Message"}
              </button>
            </form>
          </div>
        </AnimateOnScroll>
      </div>
    </section>
  );
}
