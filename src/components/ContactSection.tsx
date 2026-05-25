"use client";

import { Github, Linkedin, Mail, MapPin, Phone, Send } from "lucide-react";
import { useState } from "react";
import type { ContactContent, ProfileContent } from "@/types/portfolio";

export default function ContactSection({
  contact,
  profile,
}: {
  contact: ContactContent;
  profile: ProfileContent;
}) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(formData.subject || "Portfolio inquiry");
    const body = encodeURIComponent(`Name: ${formData.name}\nEmail: ${formData.email}\n\n${formData.message}`);
    window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;
  };

  return (
    <section id="contact" className="section-padding bg-slate-50">
      <div className="mx-auto max-w-7xl">
        <div className="max-w-3xl">
          <p className="section-kicker">{contact.kicker}</p>
          <h2 className="section-title">{contact.headline}</h2>
          <p className="section-copy">{contact.body}</p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-[0.85fr_1.15fr]">
          <div className="space-y-5">
            {[
              { icon: Mail, label: "Email", value: profile.email, href: `mailto:${profile.email}` },
              { icon: Phone, label: "Phone", value: profile.phone, href: `tel:${profile.phone}` },
              { icon: MapPin, label: "Location", value: profile.location, href: "#" },
            ].map(({ icon: Icon, label, value, href }) => (
              <a key={label} href={href} className="panel flex items-center gap-4 p-5 transition-colors hover:border-slate-300">
                <span className="rounded-md border border-slate-200 bg-slate-50 p-3 text-cyan-700">
                  <Icon size={20} />
                </span>
                <span>
                  <span className="block text-sm text-slate-500">{label}</span>
                  <span className="mt-1 block font-medium text-slate-950">{value}</span>
                </span>
              </a>
            ))}

            <div className="panel p-5">
              <h3 className="text-sm font-semibold uppercase tracking-[0.16em] text-slate-500">Profiles</h3>
              <div className="mt-4 flex gap-3">
                {[
                  { icon: Github, href: profile.github, label: "GitHub" },
                  { icon: Linkedin, href: profile.linkedin, label: "LinkedIn" },
                  { icon: Mail, href: `mailto:${profile.email}`, label: "Email" },
                ].map(({ icon: Icon, href, label }) => (
                  <a
                    key={label}
                    href={href}
                    target={href.startsWith("http") ? "_blank" : undefined}
                    rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                    aria-label={label}
                    className="rounded-md border border-slate-200 bg-white p-3 text-slate-600 hover:bg-slate-100 hover:text-slate-950"
                  >
                    <Icon size={18} />
                  </a>
                ))}
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="panel space-y-5 p-6 sm:p-8">
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              <Field label="Name" id="name" value={formData.name} onChange={handleInputChange} placeholder="Your name" />
              <Field label="Email" id="email" type="email" value={formData.email} onChange={handleInputChange} placeholder="you@example.com" />
            </div>

            <Field label="Subject" id="subject" value={formData.subject} onChange={handleInputChange} placeholder="Project inquiry" />

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-slate-700">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                required
                rows={6}
                className="mt-2 w-full rounded-md border border-slate-300 bg-white px-4 py-3 text-slate-950 outline-none transition-colors placeholder:text-slate-400 focus:border-slate-950"
                placeholder="Tell me about the work, timeline, and what success should look like."
              />
            </div>

            <button
              type="submit"
              className="inline-flex w-full items-center justify-center gap-2 rounded-md bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-slate-800 sm:w-auto"
            >
              <Send size={18} />
              Send message
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

function Field({
  label,
  id,
  value,
  onChange,
  placeholder,
  type = "text",
}: {
  label: string;
  id: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  type?: string;
}) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-slate-700">
        {label}
      </label>
      <input
        type={type}
        id={id}
        name={id}
        value={value}
        onChange={onChange}
        required
        className="mt-2 w-full rounded-md border border-slate-300 bg-white px-4 py-3 text-slate-950 outline-none transition-colors placeholder:text-slate-400 focus:border-slate-950"
        placeholder={placeholder}
      />
    </div>
  );
}
