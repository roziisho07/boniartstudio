"use client";

import { type TypedObject } from "sanity";

type DownloadCVButtonProps = {
  cv?: TypedObject[];
  cvData?: {
    headline?: string;
    personalDetails?: {
      dateOfBirth?: string;
      nationality?: string;
      languages?: string[];
    };
    contactDetails?: {
      email?: string;
      mobile?: string;
      addressLines?: string[];
    };
    socialProfiles?: Array<{
      platform?: string;
      url?: string;
      handle?: string;
    }>;
    profile?: string;
    exhibitions?: Array<{
      year?: number;
      title?: string;
      type?: string;
      venue?: string;
      cityCountry?: string;
    }>;
    workExperience?: Array<{
      year?: string;
      role?: string;
      organization?: string;
      description?: string;
    }>;
    education?: Array<{
      period?: string;
      degree?: string;
      specialization?: string;
      institution?: string;
      notes?: string;
    }>;
  };
  className?: string;
};

type PortableTextSpan = {
  _type?: string;
  text?: string;
};

type PortableTextBlock = {
  _type?: string;
  style?: string;
  listItem?: string;
  children?: PortableTextSpan[];
};

type PDFLine = {
  text: string;
  kind: "title" | "heading" | "body";
};

function blockToText(block: PortableTextBlock): string {
  if (block._type !== "block" || !block.children) {
    return "";
  }

  return block.children
    .filter((child) => child._type === "span")
    .map((child) => child.text ?? "")
    .join("")
    .trim();
}

function blocksToPdfLines(blocks: TypedObject[]): PDFLine[] {
  const lines: PDFLine[] = [{ text: "Curriculum Vitae", kind: "title" }];

  blocks.forEach((raw) => {
    const block = raw as PortableTextBlock;
    const text = blockToText(block);

    if (!text) return;

    if (block.style === "h2" || block.style === "h3") {
      lines.push({ text, kind: "heading" });
      return;
    }

    if (block.listItem === "bullet") {
      lines.push({ text: `• ${text}`, kind: "body" });
      return;
    }

    lines.push({ text, kind: "body" });
  });

  return lines;
}

function structuredCvToPdfLines(
  cvData: NonNullable<DownloadCVButtonProps["cvData"]>,
): PDFLine[] {
  const lines: PDFLine[] = [
    { text: "Curriculum Vitae", kind: "title" },
    { text: "Shahid Hassan Boni", kind: "heading" },
  ];

  if (cvData.headline) {
    lines.push({ text: cvData.headline, kind: "body" });
  }

  if (cvData.profile) {
    lines.push({ text: "", kind: "body" });
    lines.push({ text: "Profile", kind: "heading" });
    lines.push({ text: cvData.profile, kind: "body" });
  }

  const personal = cvData.personalDetails;
  if (personal) {
    lines.push({ text: "", kind: "body" });
    lines.push({ text: "Personal Details", kind: "heading" });
    if (personal.dateOfBirth)
      lines.push({
        text: `Date of Birth: ${personal.dateOfBirth}`,
        kind: "body",
      });
    if (personal.nationality)
      lines.push({
        text: `Nationality: ${personal.nationality}`,
        kind: "body",
      });
    if (personal.languages?.length)
      lines.push({
        text: `Languages: ${personal.languages.join(", ")}`,
        kind: "body",
      });
  }

  const contact = cvData.contactDetails;
  if (contact) {
    lines.push({ text: "", kind: "body" });
    lines.push({ text: "Contact Details", kind: "heading" });
    if (contact.email)
      lines.push({ text: `Email: ${contact.email}`, kind: "body" });
    if (contact.mobile)
      lines.push({ text: `Mobile: ${contact.mobile}`, kind: "body" });
    if (contact.addressLines?.length)
      lines.push({
        text: `Address: ${contact.addressLines.join(", ")}`,
        kind: "body",
      });
  }

  if (cvData.socialProfiles?.length) {
    lines.push({ text: "", kind: "body" });
    lines.push({ text: "Social Profiles", kind: "heading" });
    cvData.socialProfiles.forEach((item) => {
      const label = item.platform || "Profile";
      const value = item.handle || item.url;
      if (value) lines.push({ text: `${label}: ${value}`, kind: "body" });
    });
  }

  if (cvData.exhibitions?.length) {
    lines.push({ text: "", kind: "body" });
    lines.push({ text: "Exhibitions", kind: "heading" });
    cvData.exhibitions.forEach((item) => {
      const main = [item.year, item.title].filter(Boolean).join(" - ");
      const sub = [item.type, item.venue, item.cityCountry]
        .filter(Boolean)
        .join(" | ");
      if (main) lines.push({ text: main, kind: "body" });
      if (sub) lines.push({ text: sub, kind: "body" });
    });
  }

  if (cvData.workExperience?.length) {
    lines.push({ text: "", kind: "body" });
    lines.push({ text: "Work Experience", kind: "heading" });
    cvData.workExperience.forEach((item) => {
      const main = [item.year, item.role, item.organization]
        .filter(Boolean)
        .join(" - ");
      if (main) lines.push({ text: main, kind: "body" });
      if (item.description)
        lines.push({ text: item.description, kind: "body" });
    });
  }

  if (cvData.education?.length) {
    lines.push({ text: "", kind: "body" });
    lines.push({ text: "Education", kind: "heading" });
    cvData.education.forEach((item) => {
      const main = [item.period, item.degree].filter(Boolean).join(" - ");
      const sub = [item.specialization, item.institution]
        .filter(Boolean)
        .join(" | ");
      if (main) lines.push({ text: main, kind: "body" });
      if (sub) lines.push({ text: sub, kind: "body" });
      if (item.notes) lines.push({ text: item.notes, kind: "body" });
    });
  }

  return lines;
}

export default function DownloadCVButton({
  cv,
  cvData,
  className,
}: DownloadCVButtonProps) {
  const handleDownloadCV = async () => {
    const lines = cvData
      ? structuredCvToPdfLines(cvData)
      : blocksToPdfLines(cv ?? []);

    if (lines.length <= 1) {
      return;
    }

    const { jsPDF } = await import("jspdf");
    const pdf = new jsPDF({ unit: "pt", format: "a4" });

    const margin = 48;
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    const contentWidth = pageWidth - margin * 2;

    const ensurePageSpace = (requiredHeight: number, y: number) => {
      if (y + requiredHeight > pageHeight - margin) {
        pdf.addPage();
        return margin;
      }

      return y;
    };

    let y = margin;

    lines.forEach((line) => {
      const isTitle = line.kind === "title";
      const isHeading = line.kind === "heading";

      const fontSize = isTitle ? 20 : isHeading ? 13 : 11;
      const lineHeight = isTitle ? 30 : isHeading ? 22 : 16;
      const fontStyle = isTitle || isHeading ? "bold" : "normal";
      const spacingAfter = isTitle ? 6 : isHeading ? 4 : 3;

      pdf.setFont("helvetica", fontStyle);
      pdf.setFontSize(fontSize);

      const wrapped = pdf.splitTextToSize(line.text, contentWidth) as string[];
      const requiredHeight = wrapped.length * lineHeight + spacingAfter;
      y = ensurePageSpace(requiredHeight, y);

      wrapped.forEach((part) => {
        pdf.text(part, margin, y);
        y += lineHeight;
      });

      y += spacingAfter;
    });

    pdf.save("cv.pdf");
  };

  return (
    <button
      type="button"
      onClick={handleDownloadCV}
      className={
        className ??
        "inline-flex items-center justify-center gap-2 text-sm border border-gray-300 px-4 py-2.5 rounded-md hover:bg-gray-50 transition"
      }
    >
      <span>Download CV</span>
      <span className="text-xs text-gray-500">PDF</span>
    </button>
  );
}
