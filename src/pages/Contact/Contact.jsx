import { useState } from "react";
import { Check } from "lucide-react";
import PageIntro from "../../components/PageIntro/PageIntro";
import Reveal from "../../components/Reveal/Reveal";
import Button from "../../components/Button/Button";
import { company, telHref } from "../../data/nav";
import { usePageMeta } from "../../lib/usePageMeta";
import { PAGES } from "../../data/seo";
import { FacebookIcon, InstagramIcon } from "../../components/SocialIcons/SocialIcons";
import Arrow from "../../components/Arrow/Arrow";
import { trackEvent } from "../../lib/analytics";

const fieldClasses =
  "w-full border-0 border-b border-[color:var(--color-ink)]/20 bg-transparent py-3 text-base text-[color:var(--color-ink)] focus:border-[color:var(--color-ink)] focus:outline-none transition-colors";

const labelClasses = "index-label block text-[color:var(--color-mist)]";

// One block of contact details: a small label over large serif lines.
function Detail({ label, children }) {
  return (
    <div className="border-t border-[color:var(--color-line)] pt-5">
      <p className="index-label text-[color:var(--color-mist)]">{label}</p>
      <div className="mt-3 flex flex-col gap-1 text-[0.9375rem] leading-relaxed text-[color:var(--color-ink)] sm:text-base">
        {children}
      </div>
    </div>
  );
}

const initialForm = { name: "", email: "", phone: "", subject: "", message: "" };

// Inquiries are delivered by Web3Forms to the inbox this key was created for
// (info@mbd-pk.com). The key is public by design — it can only send to that
// inbox — so it is safe to ship in the site's code.
const WEB3FORMS_KEY = "aa32f1c9-40f1-4d02-9c20-218e9187418c";

const isEmail = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

export default function Contact() {
  usePageMeta({ ...PAGES["/contact"], path: "/contact" });
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
          subject: `New website inquiry from ${name}`,
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
      trackEvent("generate_lead", { form: "contact", project_type: form.subject.trim() || "not provided" });
      setForm(initialForm);
    } catch {
      setError(
        `Sorry, your inquiry couldn't be sent. Please try again, or email us at ${company.email} or call ${company.phones[0]}.`
      );
    } finally {
      setSending(false);
    }
  };

  return (
    <>
      <PageIntro
        eyebrow="Contact Us"
        title="Let's talk about your project."
        description="Tell us what you're planning: a home, a commercial building or an interior. Our team will get back to you."
      />

      <section className="pb-14 sm:pb-20">
        <div className="container-edit grid grid-cols-1 gap-16 lg:grid-cols-12 lg:gap-10">
          <Reveal className="space-y-8 lg:col-span-4">
            <Detail label="Phone">
              {company.phones.map((p) => (
                <a key={p} href={telHref(p)} className="link-underline w-fit">
                  {p}
                </a>
              ))}
            </Detail>
            <Detail label="Email">
              <a href={`mailto:${company.email}`} className="link-underline w-fit">
                {company.email}
              </a>
            </Detail>
            <Detail label="Office">
              <span>{company.address}, Karachi</span>
            </Detail>
            <div className="border-t border-[color:var(--color-line)] pt-5">
              <p className="index-label text-[color:var(--color-mist)]">Follow</p>
              <div className="mt-4 flex flex-col gap-2.5 text-[0.9375rem] text-[color:var(--color-ink)]">
                <a
                  href={company.instagram.url}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`Instagram ${company.instagram.label} (opens in a new tab)`}
                  className="flex w-fit items-center gap-2.5"
                >
                  <InstagramIcon size={16} />
                  <span className="link-underline">{company.instagram.label}</span>
                </a>
                <a
                  href={company.social.url}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`Facebook ${company.social.label} (opens in a new tab)`}
                  className="flex w-fit items-center gap-2.5"
                >
                  <FacebookIcon size={16} />
                  <span className="link-underline">{company.social.label}</span>
                </a>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.08} className="lg:col-span-7 lg:col-start-6">
            {submitted ? (
              <div className="flex min-h-[360px] flex-col items-start justify-center border-t border-[color:var(--color-ink)] py-12">
                <div className="flex h-12 w-12 items-center justify-center rounded-full border border-[color:var(--color-ink)] text-[color:var(--color-ink)]">
                  <Check size={20} strokeWidth={1.5} />
                </div>
                <h3 className="mt-6 text-[clamp(1.875rem,3vw,2.5rem)] font-normal leading-tight text-[color:var(--color-ink)]">
                  Thank you.
                </h3>
                <p className="mt-5 max-w-sm text-[0.9375rem] leading-relaxed text-[color:var(--color-mist)]">
                  We have received your inquiry and will get back to you soon.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="space-y-8 border-t border-[color:var(--color-ink)] pt-8">
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
                <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 sm:gap-x-10">
                  <div>
                    <label htmlFor="name" className={labelClasses}>
                      Name
                    </label>
                    <input id="name" type="text" required value={form.name} onChange={update("name")} className={fieldClasses} />
                  </div>
                  <div>
                    <label htmlFor="email" className={labelClasses}>
                      Email
                    </label>
                    <input id="email" type="email" required value={form.email} onChange={update("email")} className={fieldClasses} />
                  </div>
                  <div>
                    <label htmlFor="phone" className={labelClasses}>
                      Phone
                    </label>
                    <input id="phone" type="tel" value={form.phone} onChange={update("phone")} className={fieldClasses} />
                  </div>
                  <div>
                    <label htmlFor="subject" className={labelClasses}>
                      Project Type
                    </label>
                    <input id="subject" type="text" value={form.subject} onChange={update("subject")} className={fieldClasses} />
                  </div>
                </div>
                <div>
                  <label htmlFor="message" className={labelClasses}>
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
                  {sending ? "Sending…" : "Send Inquiry"}
                </Button>
              </form>
            )}
          </Reveal>
        </div>
      </section>

      <section>
        <div className="relative aspect-[4/5] w-full bg-[color:var(--color-stone)] sm:aspect-[21/9]">
          <iframe
            title="MAHUM Builders location"
            src={`https://www.google.com/maps?q=${encodeURIComponent(company.mapQuery)}&z=17&output=embed`}
            className="h-full w-full grayscale"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
          <a
            href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(company.mapQuery)}`}
            target="_blank"
            rel="noreferrer"
            className="group absolute bottom-5 left-5 inline-flex items-center gap-4 bg-[color:var(--color-ink)] px-6 py-4 text-[0.6875rem] font-medium uppercase tracking-[0.2em] text-[color:var(--color-paper)] sm:bottom-8 sm:left-8"
          >
            Open in Google Maps
            <Arrow />
          </a>
        </div>
      </section>
    </>
  );
}
