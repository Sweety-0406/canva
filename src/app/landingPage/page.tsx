
import Hero from "./components/Hero";
import Features from "./components/Features";
import Stats from "./components/Stats";
import Pricing from "./components/Pricing";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import Navbar from "./components/navbar";

export default function HomePage() {
  return (
    <main className=" overflow-x-hidden">
      <Navbar />
      <Hero />
      <Features />
      <Stats />
      <Pricing />
      <Contact />
      <Footer />
    </main>
  );
}
