import { useEffect, useRef, useState } from "react";
import Title from "./SectionTitle";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ContactType } from "../types/types";
import ReactMarkdown from "react-markdown";

interface ContactProps {
  data: ContactType;
}

interface Status {
  type: "error" | "success" | null;
  message: string;
}

declare const grecaptcha: {
  ready: (callback: () => void) => void;
  execute: (siteKey: string, options: { action: string }) => Promise<string>;
};

function Contact({ data }: ContactProps) {
  const [status, setStatus] = useState<Status>({ type: null, message: "" });
  const [isProcessing, setIsProcessing] = useState(false);

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const resize = () => {
    const el = textareaRef.current;

    if (!el) return;

    const computed = window.getComputedStyle(el);
    const paddingTop = parseFloat(computed.paddingTop || "0");
    const paddingBottom = parseFloat(computed.paddingBottom || "0");

    const totalPadding = paddingTop + paddingBottom;

    el.style.height = "auto";
    el.style.height = `${el.scrollHeight - totalPadding}px`;
  };

  const send = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;
    const formData = new FormData(form);

    setIsProcessing(true);

    try {
      await new Promise<void>((resolve, reject) => {
        grecaptcha.ready(async () => {
          try {
            const token = await grecaptcha.execute(
              import.meta.env.VITE_RECAPTCHA_SITE_KEY,
              {
                action: "submit",
              }
            );

            formData.append("g-recaptcha-response", token);

            const response = await fetch(form.action, {
              method: "POST",
              body: formData,
              headers: {
                Accept: "application/json",
              },
            });

            if (response.ok) {
              setStatus({ type: "success", message: "Mensaje enviado." });
              form.reset();
              resize();
            } else {
              setStatus({
                type: "error",
                message:
                  "Hubo un problema al enviar el mensaje. Intenta de nuevo.",
              });
            }
            resolve();
          } catch (error) {
            reject(error);
          }
        });
      });
    } catch (error) {
      setStatus({ type: "error", message: "Error de red. Intenta más tarde." });
      console.error(error);
    } finally {
      setIsProcessing(false);
    }
  };

  useEffect(() => {
    if (status.type) {
      const timer = setTimeout(() => {
        setStatus({ type: null, message: "" });
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [status.type]);

  useEffect(() => {
    const el = textareaRef.current;

    if (!el) return;

    resize();

    el.addEventListener("input", resize);

    return () => el.removeEventListener("input", resize);
  }, []);

  return (
    <div className="contact section">
      {data.title && <Title id={data.id} title={data.title} />}

      {data.description && <p>{data.description}</p>}

      <form
        action={`https://formspree.io/f/${import.meta.env.VITE_FORMSPREE_ID}`}
        method="POST"
        onSubmit={send}
        aria-busy={isProcessing}
      >
        <p aria-live="polite" className="sr-only">
          {isProcessing ? data.loading.form : ""}
        </p>

        <input
          type="text"
          name="name"
          placeholder={data.placeholders.name}
          disabled={isProcessing}
          required
        />

        <input
          type="email"
          name="email"
          placeholder={data.placeholders.email}
          disabled={isProcessing}
          required
        />

        <textarea
          name="message"
          placeholder={data.placeholders.message}
          disabled={isProcessing}
          required
          ref={textareaRef}
        ></textarea>

        <div className="recaptcha-branding">
          <ReactMarkdown
            components={{
              a: ({ node, ...props }) => <a {...props} target="_blank" />,
            }}
            children={data.gBranding}
          />
        </div>

        <div className="footer">
          <p className={`status ${status.type ?? ""}`}>{status.message}</p>
          <button type="submit" disabled={isProcessing}>
            {isProcessing && (
              <FontAwesomeIcon
                icon="circle-notch"
                aria-hidden={true}
                className="spinner"
              />
            )}
            {isProcessing ? data.loading.button : data.button}
          </button>
        </div>
      </form>
    </div>
  );
}

export default Contact;
