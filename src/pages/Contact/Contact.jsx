import { useState } from "react";
import { MapPin, Phone, Mail, ArrowUpRight, Check } from "lucide-react";
import PageIntro from "../../components/PageIntro/PageIntro";
import Reveal from "../../components/Reveal/Reveal";
import Button from "../../components/Button/Button";
import { company } from "../../data/nav";

const fieldClasses =
  "w-full border-0 border-b border-[color:var(--color-line)] bg-transparent py-3 text-[1.0625rem] text-[color:var(--color-ink)] placeholder:text-[color:var(--color-mist)] focus:border-[color:var(--color-ink)] focus:outline-none transition-colors";

const initialForm = { name: "", email: "", phone: "", subject: "", message: "" };

export default function Contact() {
  const [form, setForm] = useState(initialForm);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const update = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      setError("Please fill in your name, email and message.");
      return;
    }
    setError("");
    // No backend is wired up yet — this structures and validates the
    // enquiry client-side, ready to connect to an email/CRM endpoint.
    setSubmitted(true);
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
                  <a key={p} href={`tel:${p.replace(/[^\d+]/g, "")}`} className="link-underline block text-[color:var(--color-ink)]">
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
                <a href={company.social.url} target="_blank" rel="noreferrer" className="link-underline text-[color:var(--color-ink)]">
                  {company.social.label}
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
                <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
                  <div>
                    <label htmlFor="name" className="eyebrow mb-2 block">
                      Name
                    </label>
                    <input id="name" type="text" required value={form.name} onChange={update("name")} className={fieldClasses} placeholder="Your name" />
                  </div>
                  <div>
                    <label htmlFor="email" className="eyebrow mb-2 block">
                      Email
                    </label>
                    <input id="email" type="email" required value={form.email} onChange={update("email")} className={fieldClasses} placeholder="you@email.com" />
                  </div>
                  <div>
                    <label htmlFor="phone" className="eyebrow mb-2 block">
                      Phone
                    </label>
                    <input id="phone" type="tel" value={form.phone} onChange={update("phone")} className={fieldClasses} placeholder="+92 300 0000000" />
                  </div>
                  <div>
                    <label htmlFor="subject" className="eyebrow mb-2 block">
                      Project Type
                    </label>
                    <input id="subject" type="text" value={form.subject} onChange={update("subject")} className={fieldClasses} placeholder="Residential, commercial..." />
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
                    placeholder="Tell us about your project"
                  />
                </div>

                {error && <p className="text-sm text-red-700">{error}</p>}

                <Button type="submit" variant="primary">
                  Send Enquiry
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
            src="https://www.google.com/maps?q=Phase+8+DHA+Karachi&output=embed"
            className="h-full w-full grayscale"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </section>
    </>
  );
}
