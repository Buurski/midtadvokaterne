"use client";

import Image from "next/image";

export interface TeamCardProps {
  name: string;
  title: string;
  practiceAreas: string[];
  contact?: string;
  contactType?: "phone" | "email";
  imageSrc?: string;
  isPartner?: boolean;
  notice?: string;
  reversed?: boolean;
}

export function TeamCard({
  name,
  title,
  practiceAreas,
  contact,
  contactType,
  imageSrc,
  isPartner,
  notice,
  reversed,
}: TeamCardProps) {
  const initials = name
    .split(" ")
    .filter((_, i, arr) => i === 0 || i === arr.length - 1)
    .map((w) => w[0])
    .join("");

  if (isPartner) {
    return (
      <div className="group text-center">
        <div className="relative w-36 h-28 mx-auto mb-5 overflow-hidden">
          {imageSrc ? (
            <Image
              src={`/images/team/${imageSrc}`}
              alt={name}
              fill
              className="object-cover object-top grayscale group-hover:grayscale-0 transition-[filter] duration-300"
            />
          ) : (
            <div className="absolute inset-0 bg-navy/10 flex items-center justify-center">
              <span className="font-heading text-2xl text-navy/30">{initials}</span>
            </div>
          )}
          {notice && (
            <div className="absolute top-2 left-2 bg-amber text-navy text-[10px] font-body font-semibold px-1.5 py-0.5 uppercase tracking-wide">
              {notice}
            </div>
          )}
        </div>

        <div className="w-8 h-px bg-amber mx-auto mb-3" />

        <h3 className="font-heading text-xl text-navy leading-tight mb-1">{name}</h3>
        <p className="font-body text-xs text-text/50 uppercase tracking-wider mb-3">{title}</p>

        {practiceAreas.length > 0 && (
          <div className="flex flex-wrap justify-center gap-1 mb-3">
            {practiceAreas.map((area) => (
              <span
                key={area}
                className="text-[10px] font-body text-navy/60 border border-navy/15 px-2 py-0.5"
              >
                {area}
              </span>
            ))}
          </div>
        )}

        {contact && (
          <a
            href={contactType === "phone" ? `tel:${contact.replace(/\s/g, "")}` : `mailto:${contact}`}
            className="font-body text-sm text-navy/50 hover:text-navy transition-colors"
          >
            {contact}
          </a>
        )}
      </div>
    );
  }

  // Staff: compact horizontal card — fixed width so grid stays symmetric
  return (
    <div className={`group flex items-start gap-4 w-[260px] ${reversed ? "flex-row-reverse" : ""}`}>
      <div className="relative w-16 h-16 flex-shrink-0 overflow-hidden">
        {imageSrc ? (
          <Image
            src={`/images/team/${imageSrc}`}
            alt={name}
            fill
            className="object-cover object-top grayscale group-hover:grayscale-0 transition-[filter] duration-300"
          />
        ) : (
          <div className="absolute inset-0 bg-navy/8 flex items-center justify-center">
            <span className="font-heading text-lg text-navy/25">{initials}</span>
          </div>
        )}
        {notice && (
          <div className="absolute inset-x-0 bottom-0 bg-white/80 text-text/70 text-[9px] font-body font-semibold text-center py-0.5 uppercase tracking-wide">
            {notice}
          </div>
        )}
      </div>

      <div className={reversed ? "text-right" : ""}>
        <p className="font-heading text-sm text-navy leading-tight">{name}</p>
        <p className="font-body text-xs text-text/45 mt-0.5">{title}</p>
        {contact && (
          <a
            href={contactType === "phone" ? `tel:${contact.replace(/\s/g, "")}` : `mailto:${contact}`}
            className="font-body text-[11px] text-navy/50 hover:text-navy transition-colors mt-0.5 block"
          >
            {contact}
          </a>
        )}
      </div>
    </div>
  );
}
