'use client'

import { type TypedObject } from 'sanity'

type DownloadCVButtonProps = {
  cv: TypedObject[]
  className?: string
}

type PortableTextSpan = {
  _type?: string
  text?: string
}

type PortableTextBlock = {
  _type?: string
  style?: string
  listItem?: string
  children?: PortableTextSpan[]
}

type PDFLine = {
  text: string
  kind: 'title' | 'heading' | 'body'
}

function blockToText(block: PortableTextBlock): string {
  if (block._type !== 'block' || !block.children) {
    return ''
  }

  return block.children
    .filter((child) => child._type === 'span')
    .map((child) => child.text ?? '')
    .join('')
    .trim()
}

function blocksToPdfLines(blocks: TypedObject[]): PDFLine[] {
  const lines: PDFLine[] = [{ text: 'Curriculum Vitae', kind: 'title' }]

  blocks.forEach((raw) => {
    const block = raw as PortableTextBlock
    const text = blockToText(block)

    if (!text) return

    if (block.style === 'h2' || block.style === 'h3') {
      lines.push({ text, kind: 'heading' })
      return
    }

    if (block.listItem === 'bullet') {
      lines.push({ text: `• ${text}`, kind: 'body' })
      return
    }

    lines.push({ text, kind: 'body' })
  })

  return lines
}

export default function DownloadCVButton({ cv, className }: DownloadCVButtonProps) {
  const handleDownloadCV = async () => {
    const lines = blocksToPdfLines(cv)

    if (lines.length <= 1) {
      return
    }

    const { jsPDF } = await import('jspdf')
    const pdf = new jsPDF({ unit: 'pt', format: 'a4' })

    const margin = 48
    const pageWidth = pdf.internal.pageSize.getWidth()
    const pageHeight = pdf.internal.pageSize.getHeight()
    const contentWidth = pageWidth - margin * 2

    const ensurePageSpace = (requiredHeight: number, y: number) => {
      if (y + requiredHeight > pageHeight - margin) {
        pdf.addPage()
        return margin
      }

      return y
    }

    let y = margin

    lines.forEach((line) => {
      const isTitle = line.kind === 'title'
      const isHeading = line.kind === 'heading'

      const fontSize = isTitle ? 20 : isHeading ? 13 : 11
      const lineHeight = isTitle ? 30 : isHeading ? 22 : 16
      const fontStyle = isTitle || isHeading ? 'bold' : 'normal'
      const spacingAfter = isTitle ? 6 : isHeading ? 4 : 3

      pdf.setFont('helvetica', fontStyle)
      pdf.setFontSize(fontSize)

      const wrapped = pdf.splitTextToSize(line.text, contentWidth) as string[]
      const requiredHeight = wrapped.length * lineHeight + spacingAfter
      y = ensurePageSpace(requiredHeight, y)

      wrapped.forEach((part) => {
        pdf.text(part, margin, y)
        y += lineHeight
      })

      y += spacingAfter
    })

    pdf.save('cv.pdf')
  }

  return (
    <button
      type="button"
      onClick={handleDownloadCV}
      className={className ?? 'inline-flex items-center justify-center gap-2 text-sm border border-gray-300 px-4 py-2.5 rounded-md hover:bg-gray-50 transition'}
    >
      <span>Download CV</span>
      <span className="text-xs text-gray-500">PDF</span>
    </button>
  )
}
