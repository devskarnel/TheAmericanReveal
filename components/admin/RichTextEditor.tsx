'use client'

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Placeholder from '@tiptap/extension-placeholder'
import Link from '@tiptap/extension-link'
import Image from '@tiptap/extension-image'
import { TextStyle } from '@tiptap/extension-text-style'
import { Color } from '@tiptap/extension-color'
import { useRef, useState, useEffect } from 'react'
import {
  Bold, Italic, Strikethrough, Code, List, ListOrdered,
  Quote, Undo, Redo, Heading2, Heading3, FileText, Loader2, ImageIcon, Check, X,
} from 'lucide-react'
import { cn } from '@/lib/utils'

interface RichTextEditorProps {
  content: string
  onChange: (html: string) => void
}

const PRESET_COLORS = [
  { label: 'White',      value: '#FFFFFF' },
  { label: 'Light Gray', value: '#C8C5BC' },
  { label: 'Red',        value: '#EF4444' },
  { label: 'Orange',     value: '#FB923C' },
  { label: 'Gold',       value: '#FACC15' },
  { label: 'Green',      value: '#4ADE80' },
  { label: 'Sky Blue',   value: '#38BDF8' },
  { label: 'Pink',       value: '#F472B6' },
]

function stripPastedColors(html: string): string {
  try {
    const parser = new DOMParser()
    const doc = parser.parseFromString(html, 'text/html')
    const STRIP_PROPS = ['color', 'background-color', 'background', 'font-family', 'font-size', 'font-weight']
    doc.querySelectorAll('[style]').forEach((el) => {
      const cleaned = (el.getAttribute('style') ?? '')
        .split(';')
        .filter((s) => {
          const prop = s.split(':')[0].trim().toLowerCase()
          return !STRIP_PROPS.includes(prop)
        })
        .filter((s) => s.trim())
        .join('; ')
      if (cleaned) {
        el.setAttribute('style', cleaned)
      } else {
        el.removeAttribute('style')
      }
    })
    doc.querySelectorAll('font, [color]').forEach((el) => {
      el.removeAttribute('color')
      if (el.tagName.toLowerCase() === 'font') {
        el.replaceWith(...Array.from(el.childNodes))
      }
    })
    return doc.body.innerHTML
  } catch {
    return html
  }
}

export default function RichTextEditor({ content, onChange }: RichTextEditorProps) {
  const fileInputRef    = useRef<HTMLInputElement>(null)
  const colorPickerRef  = useRef<HTMLDivElement>(null)
  const imagePopoverRef = useRef<HTMLDivElement>(null)

  const [pdfLoading,    setPdfLoading]    = useState(false)
  const [showColors,    setShowColors]    = useState(false)
  const [showImgInput,  setShowImgInput]  = useState(false)
  const [imgUrl,        setImgUrl]        = useState('')

  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({ placeholder: 'Start writing your article…' }),
      Link.configure({ openOnClick: false }),
      Image.configure({ inline: false, allowBase64: true }),
      TextStyle,
      Color,
    ],
    content,
    onUpdate: ({ editor }) => onChange(editor.getHTML()),
    editorProps: {
      attributes: { class: 'ProseMirror focus:outline-none min-h-96 p-6' },
      transformPastedHTML: stripPastedColors,
    },
  })

  // Close color picker on outside click
  useEffect(() => {
    if (!showColors) return
    const handler = (e: MouseEvent) => {
      if (colorPickerRef.current && !colorPickerRef.current.contains(e.target as Node)) {
        setShowColors(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [showColors])

  // Close image popover on outside click
  useEffect(() => {
    if (!showImgInput) return
    const handler = (e: MouseEvent) => {
      if (imagePopoverRef.current && !imagePopoverRef.current.contains(e.target as Node)) {
        setShowImgInput(false)
        setImgUrl('')
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [showImgInput])

  const insertImage = () => {
    const url = imgUrl.trim()
    if (!url || !editor) return
    editor.chain().focus().setImage({ src: url }).run()
    setImgUrl('')
    setShowImgInput(false)
  }

  const handlePDFUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file || !editor) return
    setPdfLoading(true)
    try {
      const pdfjs = await import('pdfjs-dist')
      pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`

      const data = await file.arrayBuffer()
      const pdf  = await pdfjs.getDocument({ data }).promise

      const paragraphs: string[] = []
      for (let i = 1; i <= pdf.numPages; i++) {
        const page        = await pdf.getPage(i)
        const textContent = await page.getTextContent()
        const pageText    = textContent.items
          .map((item) => ('str' in item ? item.str : ''))
          .join(' ')
          .trim()
        if (pageText) paragraphs.push(pageText)
      }

      if (paragraphs.length === 0) return

      editor.chain().focus().insertContentAt(editor.state.doc.content.size, [
        { type: 'paragraph', content: [{ type: 'text', text: `— Imported from: ${file.name} —` }] },
        ...paragraphs.map((text) => ({ type: 'paragraph', content: [{ type: 'text', text }] })),
      ]).run()
    } catch (err) {
      console.error('PDF import failed:', err)
    } finally {
      setPdfLoading(false)
      if (fileInputRef.current) fileInputRef.current.value = ''
    }
  }

  if (!editor) return null

  const currentColor = (editor.getAttributes('textStyle').color as string | undefined) ?? '#FFFFFF'

  const sep = <div className="w-px h-5 bg-white/10 mx-1 shrink-0" />

  const btn = (
    icon: React.ElementType,
    action: () => void,
    title: string,
    active: boolean,
    disabled = false,
  ) => {
    const Icon = icon
    return (
      <button
        key={title}
        type="button"
        onClick={action}
        disabled={disabled}
        title={title}
        className={cn(
          'p-1.5 rounded-lg transition-all',
          active   ? 'bg-cyan-500/20 text-cyan-400' : 'text-slate-500 hover:text-slate-300 hover:bg-white/5',
          disabled && 'opacity-30 cursor-not-allowed',
        )}
      >
        <Icon className="w-4 h-4" />
      </button>
    )
  }

  return (
    <div className="flex flex-col">
      {/* ── Toolbar ── */}
      <div className="flex items-center gap-0.5 px-4 py-2 border-b border-white/10 flex-wrap">

        {/* History */}
        {btn(Undo, () => editor.chain().focus().undo().run(), 'Undo', false, !editor.can().undo())}
        {btn(Redo, () => editor.chain().focus().redo().run(), 'Redo', false, !editor.can().redo())}

        {sep}

        {/* Inline format */}
        {btn(Bold,          () => editor.chain().focus().toggleBold().run(),   'Bold',   editor.isActive('bold'))}
        {btn(Italic,        () => editor.chain().focus().toggleItalic().run(), 'Italic', editor.isActive('italic'))}
        {btn(Strikethrough, () => editor.chain().focus().toggleStrike().run(), 'Strike', editor.isActive('strike'))}
        {btn(Code,          () => editor.chain().focus().toggleCode().run(),   'Code',   editor.isActive('code'))}

        {sep}

        {/* Headings */}
        {btn(Heading2, () => editor.chain().focus().toggleHeading({ level: 2 }).run(), 'H2', editor.isActive('heading', { level: 2 }))}
        {btn(Heading3, () => editor.chain().focus().toggleHeading({ level: 3 }).run(), 'H3', editor.isActive('heading', { level: 3 }))}

        {sep}

        {/* Color picker */}
        <div className="relative" ref={colorPickerRef}>
          <button
            type="button"
            title="Text Color"
            onClick={() => setShowColors((v) => !v)}
            className={cn(
              'flex items-center gap-1 px-1.5 py-1.5 rounded-lg transition-all',
              showColors ? 'bg-white/10 text-white' : 'text-slate-500 hover:text-slate-300 hover:bg-white/5',
            )}
          >
            <span className="relative inline-flex flex-col items-center leading-none select-none">
              <span className="font-bold text-[13px]">A</span>
              <span className="h-[3px] w-full rounded-sm mt-[1px]" style={{ backgroundColor: currentColor }} />
            </span>
            <svg className="w-2 h-2 opacity-40 shrink-0" viewBox="0 0 8 5" fill="currentColor">
              <path d="M0 0l4 5 4-5z" />
            </svg>
          </button>

          {showColors && (
            <div className="absolute top-full left-0 mt-1 z-50 bg-surface-700 border border-white/10 rounded-xl p-3 shadow-2xl w-44">
              <p className="text-[10px] text-slate-500 uppercase tracking-wider mb-2">Text Color</p>
              <div className="grid grid-cols-4 gap-1.5 mb-2.5">
                {PRESET_COLORS.map(({ label, value }) => (
                  <button
                    key={value}
                    type="button"
                    title={label}
                    onClick={() => { editor.chain().focus().setColor(value).run(); setShowColors(false) }}
                    className={cn(
                      'w-8 h-8 rounded-lg border-2 transition-transform hover:scale-110',
                      currentColor === value ? 'border-white/70' : 'border-transparent',
                    )}
                    style={{ backgroundColor: value }}
                  />
                ))}
              </div>
              <button
                type="button"
                onClick={() => { editor.chain().focus().unsetColor().run(); setShowColors(false) }}
                className="w-full text-xs text-slate-400 hover:text-white bg-white/5 hover:bg-white/10 rounded-lg px-2 py-1.5 transition-colors"
              >
                Reset to white
              </button>
            </div>
          )}
        </div>

        {sep}

        {/* Lists */}
        {btn(List,        () => editor.chain().focus().toggleBulletList().run(),  'Bullet List',  editor.isActive('bulletList'))}
        {btn(ListOrdered, () => editor.chain().focus().toggleOrderedList().run(), 'Ordered List', editor.isActive('orderedList'))}
        {btn(Quote,       () => editor.chain().focus().toggleBlockquote().run(),  'Blockquote',   editor.isActive('blockquote'))}

        {sep}

        {/* Insert image */}
        <div className="relative" ref={imagePopoverRef}>
          <button
            type="button"
            title="Insert Image"
            onClick={() => { setShowImgInput((v) => !v); setImgUrl('') }}
            className={cn(
              'p-1.5 rounded-lg transition-all',
              showImgInput ? 'bg-cyan-500/20 text-cyan-400' : 'text-slate-500 hover:text-slate-300 hover:bg-white/5',
            )}
          >
            <ImageIcon className="w-4 h-4" />
          </button>

          {showImgInput && (
            <div className="absolute top-full left-0 mt-1 z-50 bg-surface-700 border border-white/10 rounded-xl p-3 shadow-2xl w-72">
              <p className="text-[10px] text-slate-500 uppercase tracking-wider mb-2">Insert Image by URL</p>
              <div className="flex gap-2">
                <input
                  type="url"
                  value={imgUrl}
                  onChange={(e) => setImgUrl(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && insertImage()}
                  placeholder="https://example.com/photo.jpg"
                  autoFocus
                  className="flex-1 bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-accent/40"
                />
                <button
                  type="button"
                  onClick={insertImage}
                  className="p-1.5 rounded-lg bg-brand-red/80 hover:bg-brand-red text-white transition-colors"
                >
                  <Check className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => { setShowImgInput(false); setImgUrl('') }}
                  className="p-1.5 rounded-lg text-slate-500 hover:text-white hover:bg-white/5 transition-colors"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}
        </div>

        {sep}

        {/* PDF Import */}
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          disabled={pdfLoading}
          title="Import text from PDF"
          className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs text-slate-400 hover:text-slate-200 hover:bg-white/5 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {pdfLoading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <FileText className="w-3.5 h-3.5" />}
          {pdfLoading ? 'Importing…' : 'Import PDF'}
        </button>
        <input
          ref={fileInputRef}
          type="file"
          accept=".pdf,application/pdf"
          className="hidden"
          onChange={handlePDFUpload}
        />
      </div>

      {/* Editor body */}
      <EditorContent editor={editor} />
    </div>
  )
}
