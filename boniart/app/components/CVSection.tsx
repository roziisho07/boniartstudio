"use client";

import { PortableText } from "@portabletext/react";
import { type TypedObject } from "sanity";

type StructuredCV = {
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

type CVSectionProps = {
  cv?: TypedObject[];
  cvData?: StructuredCV;
};

function hasStructuredContent(cvData?: StructuredCV) {
  if (!cvData) return false;

  return Boolean(
    cvData.headline ||
    cvData.profile ||
    cvData.personalDetails?.dateOfBirth ||
    cvData.personalDetails?.nationality ||
    cvData.personalDetails?.languages?.length ||
    cvData.contactDetails?.email ||
    cvData.contactDetails?.mobile ||
    cvData.contactDetails?.addressLines?.length ||
    cvData.socialProfiles?.length ||
    cvData.exhibitions?.length ||
    cvData.workExperience?.length ||
    cvData.education?.length,
  );
}

export default function CVSection({ cv, cvData }: CVSectionProps) {
  const useStructured = hasStructuredContent(cvData);

  if (!useStructured && !cv?.length) {
    return null;
  }

  const groupedExhibitions = (cvData?.exhibitions ?? []).reduce<
    Record<string, NonNullable<StructuredCV["exhibitions"]>>
  >((acc, item) => {
    const key = String(item.year ?? "Other");
    if (!acc[key]) acc[key] = [];
    acc[key].push(item);
    return acc;
  }, {});

  const exhibitionYears = Object.keys(groupedExhibitions).sort(
    (a, b) => Number(b) - Number(a),
  );

  return (
    <section className="mt-16 border-t border-gray-200 pt-10">
      {/* <div className="mb-6">
        <h2 className="text-2xl font-light text-gray-900">Curriculum Vitae</h2>
        <p className="text-sm text-gray-500 mt-1">
          Selected experience, education, and exhibitions.
        </p>
      </div> */}

      {useStructured ? (
        <div className="space-y-6">
          <div className="rounded-xl border border-gray-200 bg-white p-6 md:p-8">
            <h3 className="text-xl font-light text-gray-900">
              Shahid Hassan Boni
            </h3>
            {cvData?.headline && (
              <p className="text-sm text-gray-600 mt-1">{cvData.headline}</p>
            )}
            {cvData?.profile && (
              <p className="text-sm text-gray-700 leading-7 mt-4">
                {cvData.profile}
              </p>
            )}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="rounded-xl border border-gray-200 bg-white p-6">
              <h4 className="text-sm uppercase tracking-wide text-gray-500">
                Personal Details
              </h4>
              <dl className="mt-4 space-y-3 text-sm">
                {cvData?.personalDetails?.dateOfBirth && (
                  <div>
                    <dt className="text-gray-500">Date of Birth</dt>
                    <dd className="text-gray-900">
                      {cvData.personalDetails.dateOfBirth}
                    </dd>
                  </div>
                )}
                {cvData?.personalDetails?.nationality && (
                  <div>
                    <dt className="text-gray-500">Nationality</dt>
                    <dd className="text-gray-900">
                      {cvData.personalDetails.nationality}
                    </dd>
                  </div>
                )}
                {!!cvData?.personalDetails?.languages?.length && (
                  <div>
                    <dt className="text-gray-500">Languages</dt>
                    <dd className="text-gray-900">
                      {cvData.personalDetails.languages.join(", ")}
                    </dd>
                  </div>
                )}
              </dl>
            </div>

            <div className="rounded-xl border border-gray-200 bg-white p-6">
              <h4 className="text-sm uppercase tracking-wide text-gray-500">
                Contact Details
              </h4>
              <div className="mt-4 space-y-3 text-sm">
                {cvData?.contactDetails?.email && (
                  <p className="text-gray-900">
                    <span className="text-gray-500">Email:</span>{" "}
                    <a
                      className="hover:underline"
                      href={`mailto:${cvData.contactDetails.email}`}
                    >
                      {cvData.contactDetails.email}
                    </a>
                  </p>
                )}
                {cvData?.contactDetails?.mobile && (
                  <p className="text-gray-900">
                    <span className="text-gray-500">Mobile:</span>{" "}
                    {cvData.contactDetails.mobile}
                  </p>
                )}
                {!!cvData?.contactDetails?.addressLines?.length && (
                  <div>
                    <p className="text-gray-500">Address</p>
                    <p className="text-gray-900 leading-6">
                      {cvData.contactDetails.addressLines.join(", ")}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {!!cvData?.socialProfiles?.length && (
            <div className="rounded-xl border border-gray-200 bg-white p-6">
              <h4 className="text-sm uppercase tracking-wide text-gray-500">
                Social Profiles
              </h4>
              <ul className="mt-4 space-y-2 text-sm text-gray-900">
                {cvData.socialProfiles.map((profile, index) => (
                  <li
                    key={`${profile.platform || "social"}-${index}`}
                    className="flex flex-wrap items-center gap-2"
                  >
                    <span className="text-gray-500 min-w-28">
                      {profile.platform || "Profile"}:
                    </span>
                    {profile.url ? (
                      <a
                        href={profile.url}
                        target="_blank"
                        rel="noreferrer"
                        className="hover:underline break-all"
                      >
                        {profile.handle || profile.url}
                      </a>
                    ) : (
                      <span>{profile.handle}</span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {!!exhibitionYears.length && (
            <div className="rounded-xl border border-gray-200 bg-white p-6 md:p-8">
              <h4 className="text-sm uppercase tracking-wide text-gray-500">
                Exhibitions
              </h4>
              <div className="mt-6 space-y-6">
                {exhibitionYears.map((year) => (
                  <div key={year}>
                    <h5 className="text-base font-medium text-gray-900 mb-3">
                      {year}
                    </h5>
                    <ul className="space-y-3">
                      {groupedExhibitions[year].map((item, index) => (
                        <li
                          key={`${year}-${item.title || "exhibition"}-${index}`}
                          className="border-l border-gray-200 pl-4"
                        >
                          <p className="text-sm text-gray-900 font-medium">
                            {item.title}
                          </p>
                          <p className="text-sm text-gray-600">
                            {[item.type, item.venue, item.cityCountry]
                              .filter(Boolean)
                              .join(" • ")}
                          </p>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          )}

          {!!cvData?.workExperience?.length && (
            <div className="rounded-xl border border-gray-200 bg-white p-6 md:p-8">
              <h4 className="text-sm uppercase tracking-wide text-gray-500">
                Work Experience
              </h4>
              <ul className="mt-4 space-y-4">
                {cvData.workExperience.map((item, index) => (
                  <li
                    key={`${item.role || "role"}-${index}`}
                    className="border-l border-gray-200 pl-4"
                  >
                    <p className="text-sm text-gray-900 font-medium">
                      {item.role}
                    </p>
                    <p className="text-sm text-gray-600">
                      {[item.year, item.organization]
                        .filter(Boolean)
                        .join(" • ")}
                    </p>
                    {item.description && (
                      <p className="text-sm text-gray-600 mt-1">
                        {item.description}
                      </p>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {!!cvData?.education?.length && (
            <div className="rounded-xl border border-gray-200 bg-white p-6 md:p-8">
              <h4 className="text-sm uppercase tracking-wide text-gray-500">
                Education
              </h4>
              <ul className="mt-4 space-y-4">
                {cvData.education.map((item, index) => (
                  <li
                    key={`${item.degree || "degree"}-${index}`}
                    className="border-l border-gray-200 pl-4"
                  >
                    <p className="text-sm text-gray-900 font-medium">
                      {item.degree}
                    </p>
                    <p className="text-sm text-gray-600">
                      {[item.period, item.specialization]
                        .filter(Boolean)
                        .join(" • ")}
                    </p>
                    <p className="text-sm text-gray-600">{item.institution}</p>
                    {item.notes && (
                      <p className="text-sm text-gray-500 mt-1">{item.notes}</p>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      ) : (
        <div className="rounded-lg border border-gray-200 bg-white p-6 md:p-8">
          <div className="prose prose-sm max-w-none">
            <PortableText value={cv ?? []} />
          </div>
        </div>
      )}
    </section>
  );
}
