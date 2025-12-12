import { useState } from "react";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

interface ScreenshotProps {
  pathname: string;
  alt: string;
  title: string;
}

function Screenshot({ pathname = "", alt = "", title = "" }: ScreenshotProps) {
  const [imageSrc, setImageSrc] = useState<string>("");
  const [isPreviewVisible, setIsPreviewVisible] = useState<boolean>(false);

  const toggleLightbox = (
    event: React.MouseEvent<HTMLAnchorElement> | void,
    src: string | null = null
  ) => {
    setImageSrc(src ? `./images/${src}` : "");
    if (event) {
      event.preventDefault();
    }
  };

  return (
    <>
      {pathname && (
        <div className="screenshot">
          <div className="thumbnail">
            <a
              href="#"
              title={title}
              onClick={(e) => toggleLightbox(e, pathname)}
              onMouseEnter={() => setIsPreviewVisible(true)}
              onMouseLeave={() => setIsPreviewVisible(false)}
            >
              <img src={`./images/${pathname}`} alt={alt} />
            </a>
          </div>
          <div
            className={`preview ${isPreviewVisible ? "visible" : ""}`}
            aria-hidden={true}
          >
            <img src={`./images/${pathname}`} />
          </div>
        </div>
      )}

      <Lightbox
        open={!!imageSrc}
        close={toggleLightbox}
        slides={[{ src: imageSrc }]}
        render={{
          buttonPrev: () => null,
          buttonNext: () => null,
        }}
      />
    </>
  );
}

export default Screenshot;
