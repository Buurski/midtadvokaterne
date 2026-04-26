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
}

function getInitials(name: string): string {
  const words = name.trim().split(/\s+/);
  if (words.length === 1) return words[0][0].toUpperCase();
  return (words[0][0] + words[words.length - 1][0]).toUpperCase();
}

export function TeamCard({
  name,
  title,
  practiceAreas,
  contact,
  contactType,
  imageSrc,
  isPartner = false,
  notice,
}: TeamCardProps) {
  const initials = getInitials(name);

  return (
    <div className="group relative">
      <div className="overflow-hidden transition-transform duration-300 group-hover:-translate-y-2">
        {/* Photo area */}
        <div
          className={`relative overflow-hidden ${
            isPartner ? "aspect-[3/4]" : "aspect-square"
          }`}
        >
          {imageSrc ? (
            <Image
              src={`/images/team/${imageSrc}`}
              alt={name}
              fill
              className="object-cover object-top grayscale group-hover:grayscale-0 transition-[filter] duration-300"
            />
          ) : (
            <div className="absolute inset-0 bg-navy flex items-center justify-center">
              <span className="font-heading text-4xl text-off-white/30">
                {initials}
              </span>
            </div>
          )}
          {/* Notice badge */}
          {notice && (
            <div className="absolute top-3 left-3 bg-amber text-navy text-xs font-body font-semibold px-2 py-1">
              {notice}
            </div>
          )}
        </div>

        {/* Text content */}
        <div className={`pt-4 ${isPartner ? "pb-6" : "pb-4"}`}>
          <h3
            className={`font-heading text-navy ${
              isPartner ? "text-2xl" : "text-lg"
            } leading-tight`}
          >
            {name}
          </h3>
          <p className="font-body text-sm text-text/60 mt-0.5 mb-3">{title}</p>

          {practiceAreas.length > 0 && (
            <ul className="flex flex-wrap gap-1 mb-3">
              {practiceAreas.map((area) => (
                <li
                  key={area}
                  className="text-xs font-body text-navy/70 bg-navy/8 px-2 py-0.5"
                >
                  {area}
                </li>
              ))}
            </ul>
          )}

          {contact && contactType === "phone" && (
            <a
              href={`tel:${contact.replace(/\s/g, "")}`}
              className="font-body text-sm text-amber hover:underline"
            >
              {contact}
            </a>
          )}
          {contact && contactType === "email" && (
            <a
              href={`mailto:${contact}`}
              className="font-body text-sm text-amber hover:underline"
            >
              {contact}
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
