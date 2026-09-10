"use client";

import { useState } from "react";
import { MapPin, Mail, Globe, CheckCircle2, ArrowRight } from "lucide-react";
import { useSendMessage } from "@/lib/useSendMessage";

export default function Contact() {
  const { submitMessage } = useSendMessage();
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const result = await submitMessage(formData.name, formData.email, formData.message);
      if (result.success) {
        setSubmitSuccess(true);
        setFormData({ name: "", email: "", message: "" });
        setTimeout(() => setSubmitSuccess(false), 5000);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="section-py border-t border-[hsl(var(--border))]">
      <div className="container-rivet">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-5">
            <span className="eyebrow">Get in touch</span>
            <h2 className="section-title mt-4">Let&apos;s close the loop together.</h2>
            <p className="lead mt-5">
              Talk to us about EPR compliance, municipal pilots, or investment. We
              read every message.
            </p>

            <div className="mt-8 space-y-5">
              <div className="flex gap-3">
                <MapPin className="w-5 h-5 text-neutral-400 flex-shrink-0 mt-0.5" />
                <div>
                  <div className="text-xs font-medium uppercase tracking-[0.12em] text-neutral-500">Headquarters</div>
                  <p className="text-sm text-neutral-700 mt-1 leading-relaxed">
                    House No. 293, Second Floor, Western Marg, Saidulajab, New Delhi – 110030, India
                  </p>
                </div>
              </div>
              <div className="flex gap-3">
                <Mail className="w-5 h-5 text-neutral-400 flex-shrink-0 mt-0.5" />
                <div>
                  <div className="text-xs font-medium uppercase tracking-[0.12em] text-neutral-500">Email</div>
                  <a href="mailto:falkonfuturex@gmail.com" className="link-underline text-sm mt-1 inline-block">
                    falkonfuturex@gmail.com
                  </a>
                </div>
              </div>
              <div className="flex gap-3">
                <Globe className="w-5 h-5 text-neutral-400 flex-shrink-0 mt-0.5" />
                <div>
                  <div className="text-xs font-medium uppercase tracking-[0.12em] text-neutral-500">Web</div>
                  <a href="https://www.falkonfuturex.com" target="_blank" rel="noopener noreferrer" className="link-underline text-sm mt-1 inline-block">
                    www.falkonfuturex.com
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="panel p-6 md:p-8">
              {submitSuccess && (
                <div className="mb-6 flex items-center gap-2 rounded-lg border border-[hsl(var(--accent))]/30 bg-[hsl(var(--accent))]/5 px-4 py-3 text-sm text-[hsl(var(--accent))]">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Thanks — your message has been sent. We&apos;ll be in touch shortly.</span>
                </div>
              )}

              <form className="space-y-5" onSubmit={handleSubmit}>
                <div>
                  <label htmlFor="name" className="field-label">Name</label>
                  <input
                    id="name"
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Your name"
                    className="field"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="email" className="field-label">Email</label>
                  <input
                    id="email"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="you@company.com"
                    className="field"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="message" className="field-label">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Tell us what you're working on."
                    rows={5}
                    className="field h-auto py-3"
                    required
                  />
                </div>
                <button type="submit" className="btn-primary w-full" disabled={isSubmitting}>
                  {isSubmitting ? "Sending…" : "Send message"}
                  {!isSubmitting && <ArrowRight className="w-4 h-4" />}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
