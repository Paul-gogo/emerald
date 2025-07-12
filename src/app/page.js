import Navbar from "./components/Navbar/Navbar";
import Hero from "./components/Hero/Hero";
import Featured from "./components/Featured/Featured";
import Discount from "./components/Discount/Discount";
import Footer from "./components/Footer/Footer";

export default function Home() {
  return (
    <div>
      <Navbar/>
      <Hero />
      <Featured />
      <Discount />
      <Footer />
    </div>
  );
}
