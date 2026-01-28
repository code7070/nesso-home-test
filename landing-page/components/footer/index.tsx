import FooterContact from "./contact";
import FooterContent from "./content";

export default function Footer() {
  return (
    <div className="bg-white">
      <section id="contact">
        <div className="max-w-7xl mx-auto px-4">
          <FooterContact />
        </div>
      </section>
      <footer>
        <div className="max-w-7xl mx-auto px-4 mt-14 md:mt-[84px]">
          <FooterContent />
        </div>
      </footer>
    </div>
  );
}
