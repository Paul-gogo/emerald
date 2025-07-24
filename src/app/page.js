import Navbar from "./components/Navbar/Navbar";
import Hero from "./components/Hero/Hero";
import Featured from "./components/Featured/Featured";
import Footer from "./components/Footer/Footer";

export default function Home() {
  return (
    <div>
      <Hero />
      <Featured />
      <Footer />
    </div>
  );
}
