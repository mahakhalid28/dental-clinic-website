import { Header } from "@/components/header";
import { Hero } from "@/components/hero";
import { Stats } from "@/components/stats";
import { Services } from "@/components/services";
import { About } from "@/components/about";
import { Testimonials } from "@/components/testimonials";
import { AppointmentForm } from "@/components/appointment-form";
import { Contact } from "@/components/contact";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main>
        <Hero />
        <Stats />
        <Services />
        <About />
        <Testimonials />
        <AppointmentForm />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
