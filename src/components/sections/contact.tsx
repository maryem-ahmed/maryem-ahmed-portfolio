"use client";

import { useState } from "react";
import { Send } from "lucide-react";
import { FadeIn } from "@/components/effects/fade-in";
import { CrochetCard } from "@/components/ui/crochet";
import { SectionHeading } from "@/components/ui/section-heading";
import { personal } from "@/data/portfolio";

export function Contact() {
  const [formState, setFormState] = useState<"idle" | "sending" | "sent">("idle");
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormState("sending");
    const subject = encodeURIComponent(`Portfolio Contact from ${form.name}`);
    const body = encodeURIComponent(`Name: ${form.name}\nEmail: ${form.email}\n\n${form.message}`);
    window.location.href = `mailto:${personal.email}?subject=${subject}&body=${body}`;
    setTimeout(() => {
      setFormState("sent");
      setForm({ name: "", email: "", message: "" });
    }, 800);
  };

  return (
    <section id="connect" className="scroll-mt-8 py-2">
      <SectionHeading id="connect-heading" title="Connect" />

      <FadeIn>
        <CrochetCard className="mx-auto max-w-lg p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="mb-1.5 block text-xs text-muted-foreground">
                Name
              </label>
              <input
                id="name"
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="glass-input w-full px-4 py-2.5 text-sm outline-none focus:border-accent"
                placeholder="Your name"
              />
            </div>
            <div>
              <label htmlFor="email" className="mb-1.5 block text-xs text-muted-foreground">
                Email
              </label>
              <input
                id="email"
                type="email"
                required
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="glass-input w-full px-4 py-2.5 text-sm outline-none focus:border-accent"
                placeholder="you@email.com"
              />
            </div>
            <div>
              <label htmlFor="message" className="mb-1.5 block text-xs text-muted-foreground">
                Message
              </label>
              <textarea
                id="message"
                required
                rows={4}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className="glass-input w-full resize-none px-4 py-2.5 text-sm outline-none focus:border-accent"
                placeholder="Tell me about your project..."
              />
            </div>
            <button
              type="submit"
              disabled={formState === "sending"}
              className="flex w-full items-center justify-center gap-2 rounded-full bg-foreground py-3 text-sm font-medium text-background transition-opacity hover:opacity-90 disabled:opacity-60"
            >
              <Send className="h-4 w-4" />
              {formState === "sent" ? "Opening email..." : formState === "sending" ? "Sending..." : "Send Message"}
            </button>
          </form>
        </CrochetCard>
      </FadeIn>
    </section>
  );
}
