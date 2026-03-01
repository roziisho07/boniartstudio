'use client'

import { PortableText } from '@portabletext/react'
import { type TypedObject } from 'sanity'

type CVSectionProps = {
  cv: TypedObject[]
}

export default function CVSection({ cv }: CVSectionProps) {
  return (
    <section className="mt-16 border-t border-gray-200 pt-10">
      <div className="mb-6">
        <h2 className="text-2xl font-light text-gray-900">Curriculum Vitae</h2>
        <p className="text-sm text-gray-500 mt-1">Selected experience, education, and exhibitions.</p>
      </div>

      <div className="rounded-lg border border-gray-200 bg-white p-6 md:p-8">
        <div className="prose prose-sm max-w-none">
          <PortableText value={cv} />
        </div>
      </div>
    </section>
  )
}
