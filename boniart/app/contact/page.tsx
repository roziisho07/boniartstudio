import { getContact } from "../lib/api"
import { PortableText } from "@portabletext/react"


export default async function ContactPage() {
  const contact = await getContact()
  
  return (
    <div className="max-w-2xl mx-auto py-16 px-8">
      <h1 className="text-3xl font-light mb-8">{contact?.title || 'Contact'}</h1>
      <div className="prose prose-sm text-gray-600">
        <PortableText value={contact?.info ?? []} />
      </div>

      <div className="mt-8 space-y-2 text-sm text-gray-600">
        {contact?.email && <p>Email: {contact.email}</p>}
        {contact?.instagram && (
          <p>
            Instagram:{' '}
            <a href={contact.instagram} target="_blank" rel="noreferrer" className="underline">
              {contact.instagram}
            </a>
          </p>
        )}
        {contact?.galleryRepresentation && <p>{contact.galleryRepresentation}</p>}
      </div>
    </div>
  )
}