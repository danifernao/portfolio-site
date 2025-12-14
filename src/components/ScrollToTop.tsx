import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";

interface ScrollToTopProps {
  btnText: string;
}

function ScrollToTop({ btnText }: ScrollToTopProps) {
  const [isVisible, setIsVisible] = useState<boolean>(false);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    const toggleVisibility = () => {
      setIsVisible(window.scrollY > 300);
    };
    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  return (
    <button
      className={`scroll-to-top ${isVisible ? "visible" : ""}`}
      onClick={scrollToTop}
      title={btnText}
      aria-label={btnText}
    >
      <FontAwesomeIcon icon="chevron-up" aria-hidden={true} />
    </button>
  );
}

export default ScrollToTop;
