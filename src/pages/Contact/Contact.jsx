import { useState } from "react";
import { MapPin, Phone, Mail, ArrowUpRight, Check } from "lucide-react";
import PageIntro from "../../components/PageIntro/PageIntro";
import Reveal from "../../components/Reveal/Reveal";
import Button from "../../components/Button/Button";
import { company, telHref } from "../../data/nav";
import { useDocumentTitle } from "../../lib/useDocumentTitle";
import { FacebookIcon, InstagramIcon } from "../../components/SocialIcons/SocialIcons";

const fieldClasses =
  "w-full border-0 border-b border-[color:var(--color-line)] bg-transparent py-3 text-[1.0625rem] text-[color:var(--color-ink)] focus:border-[color:var(--color-ink)] focus:outline-none transition-colors";

const initialForm = { name: "", email: "", phone: "", subject: "", message: "" };

// Enquiries are delivered by Web3Forms to the inbox this key was created for
// (info@mbd-pk.com). The key is public by design — it can only send to that
// inbox — so it is safe to ship in the site's code.
const WEB3FORMS_KEY = "aa32f1c9-40f1-4d02-9c20-218e9187418c";

const isEmail = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

export default function Contact() {
  useDocumentTitle("Contact Us");
  const [form, setForm] = useState(initialForm);
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");
  // Honeypot: hidden from people, but spam bots fill it in. Web3Forms drops
  // any submission where it is set.
  const [botcheck, setBotcheck] = useState(false);

  const update = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (sending) return;
    const name = form.name.trim();
    const email = form.email.trim();
    const message = form.message.trim();
    if (!name || !email || !message) {
      setError("Please fill in your name, email and message.");
      return;
    }
    if (!isEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }
    setError("");
    setSending(true);
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: WEB3FORMS_KEY,
          subject: `New website enquiry from ${name}`,
          from_name: "MAHUM Builders Website",
          name,
          email, // Web3Forms sets this as the reply-to address
          phone: form.phone.trim() || "Not provided",
          project_type: form.subject.trim() || "Not provided",
          message,
          botcheck,
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data.success) throw new Error(data.message || `HTTP ${res.status}`);
      setSubmitted(true);
      setForm(initialForm);
    } catch {
      setError(
        `Sorry, your enquiry couldn't be sent. Please try again, or email us at ${company.email} or call ${company.phones[0]}.`
      );
    } finally {
      setSending(false);
    }
  };

  return (
    <>
      <PageIntro
        eyebrow="Let's Build Together"
        title="Contact Us"
        description="Tell us about your development or construction project — our team will be in touch."
      />

      <section className="py-10 sm:py-14 lg:py-16">
        <div className="container-edit grid grid-cols-1 gap-16 lg:grid-cols-[0.9fr_1.3fr] lg:gap-20">
          <Reveal className="space-y-10">
            <div className="flex items-start gap-4">
              <MapPin size={20} strokeWidth={1.4} className="mt-0.5 shrink-0 text-[color:var(--color-brass)]" />
              <div>
                <p className="eyebrow mb-1.5">Address</p>
                <p className="text-[color:var(--color-ink)]">{company.address}</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <Phone size={20} strokeWidth={1.4} className="mt-0.5 shrink-0 text-[color:var(--color-brass)]" />
              <div>
                <p className="eyebrow mb-1.5">Phone</p>
                {company.phones.map((p) => (
                  <a key={p} href={telHref(p)} className="link-underline block text-[color:var(--color-ink)]">
                    {p}
                  </a>
                ))}
              </div>
            </div>
            <div className="flex items-start gap-4">
              <Mail size={20} strokeWidth={1.4} className="mt-0.5 shrink-0 text-[color:var(--color-brass)]" />
              <div>
                <p className="eyebrow mb-1.5">Email</p>
                <a href={`mailto:${company.email}`} className="link-underline text-[color:var(--color-ink)]">
                  {company.email}
                </a>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <ArrowUpRight size={20} strokeWidth={1.4} className="mt-0.5 shrink-0 text-[color:var(--color-brass)]" />
              <div>
                <p className="eyebrow mb-1.5">Social</p>
                <a
                  href={company.social.url}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`Facebook ${company.social.label} (opens in a new tab)`}
                  className="flex items-center gap-2 text-[color:var(--color-ink)]"
                >
                  <FacebookIcon size={17} />
                  <span className="link-underline">{company.social.label}</span>
                </a>
                <a
                  href={company.instagram.url}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`Instagram ${company.instagram.label} (opens in a new tab)`}
                  className="mt-1.5 flex items-center gap-2 text-[color:var(--color-ink)]"
                >
                  <InstagramIcon size={17} />
                  <span className="link-underline">{company.instagram.label}</span>
                </a>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            {submitted ? (
              <div className="flex min-h-[380px] flex-col items-center justify-center border border-[color:var(--color-line)] px-8 py-16 text-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[color:var(--color-ink)] text-[color:var(--color-paper)]">
                  <Check size={20} strokeWidth={1.75} />
                </div>
                <h3 className="font-display mt-6 text-2xl font-medium text-[color:var(--color-ink)]">
                  Thank You
                </h3>
                <p className="mt-3 max-w-xs text-[color:var(--color-mist)]">
                  Your enquiry has been received. Our team will be in touch shortly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="space-y-8">
                <input
                  type="checkbox"
                  name="botcheck"
                  checked={botcheck}
                  onChange={(e) => setBotcheck(e.target.checked)}
                  className="hidden"
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                />
                <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
                  <div>
                    <label htmlFor="name" className="eyebrow mb-2 block">
                      Name
                    </label>
                    <input id="name" type="text" required value={form.name} onChange={update("name")} className={fieldClasses} />
                  </div>
                  <div>
                    <label htmlFor="email" className="eyebrow mb-2 block">
                      Email
                    </label>
                    <input id="email" type="email" required value={form.email} onChange={update("email")} className={fieldClasses} />
                  </div>
                  <div>
                    <label htmlFor="phone" className="eyebrow mb-2 block">
                      Phone
                    </label>
                    <input id="phone" type="tel" value={form.phone} onChange={update("phone")} className={fieldClasses} />
                  </div>
                  <div>
                    <label htmlFor="subject" className="eyebrow mb-2 block">
                      Project Type
                    </label>
                    <input id="subject" type="text" value={form.subject} onChange={update("subject")} className={fieldClasses} />
                  </div>
                </div>
                <div>
                  <label htmlFor="message" className="eyebrow mb-2 block">
                    Message
                  </label>
                  <textarea
                    id="message"
                    required
                    rows={4}
                    value={form.message}
                    onChange={update("message")}
                    className={fieldClasses}
                  />
                </div>

                {error && (
                  <p role="alert" className="text-sm text-red-700">
                    {error}
                  </p>
                )}

                <Button type="submit" variant="primary" disabled={sending} aria-busy={sending} className={sending ? "opacity-60" : undefined}>
                  {sending ? "Sending…" : "Send Enquiry"}
                </Button>
              </form>
            )}
          </Reveal>
        </div>
      </section>

      <section className="border-t border-[color:var(--color-line)]">
        <div className="aspect-[21/9] w-full bg-[color:var(--color-stone)]">
          <iframe
            title="MAHUM Builders location"
            src={`https://www.google.com/maps?q=${encodeURIComponent(company.mapQuery)}&output=embed`}
            className="h-full w-full grayscale"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </section>
    </>
  );
}
