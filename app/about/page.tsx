import { AboutPage } from "@/components/about-page";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

export default function About() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <AboutPage />
      </main>
      <Footer />
    </div>
  );
}
