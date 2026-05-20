'use client'

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Placeholder from '@tiptap/extension-placeholder'
import Link from '@tiptap/extension-link'
import {
  Bold, Italic, Strikethrough, Code, List, ListOrdered,
  Quote, Undo, Redo, Link as LinkIcon, Heading2, Heading3
} from 'lucide-react'
import { cn } from '@/lib/utils'

interface RichTextEditorProps {
  content: string
  onChange: (html: string) => void
}

export default function RichTextEditor({ content, onChange }: RichTextEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({ placeholder: 'Start writing your article...' }),
      Link.configure({ openOnClick: false }),
    ],
    content,
    onUpdate: ({ editor }) => onChange(editor.getHTML()),
    editorProps: {
      attributes: { class: 'ProseMirror article-prose focus:outline-none min-h-96 p-6' },
    },
  })

  if (!editor) return null

  const tools = [
    {
      group: 'history',
      items: [
        { icon: Undo, action: () => editor.chain().focus().undo().run(), title: 'Undo', active: false, disabled: !editor.can().undo() },
        { icon: Redo, action: () => editor.chain().focus().redo().run(), title: 'Redo', active: false, disabled: !editor.can().redo() },
      ],
    },
    {
      group: 'format',
      items: [
        { icon: Bold, action: () => editor.chain().focus().toggleBold().run(), title: 'Bold', active: editor.isActive('bold'), disabled: false },
        { icon: Italic, action: () => editor.chain().focus().toggleItalic().run(), title: 'Italic', active: editor.isActive('italic'), disabled: false },
        { icon: Strikethrough, action: () => editor.chain().focus().toggleStrike().run(), title: 'Strike', active: editor.isActive('strike'), disabled: false },
        { icon: Code, action: () => editor.chain().focus().toggleCode().run(), title: 'Code', active: editor.isActive('code'), disabled: false },
      ],
    },
    {
      group: 'headings',
      items: [
        { icon: Heading2, action: () => editor.chain().focus().toggleHeading({ level: 2 }).run(), title: 'H2', active: editor.isActive('heading', { level: 2 }), disabled: false },
        { icon: Heading3, action: () => editor.chain().focus().toggleHeading({ level: 3 }).run(), title: 'H3', active: editor.isActive('heading', { level: 3 }), disabled: false },
      ],
    },
    {
      group: 'lists',
      items: [
        { icon: List, action: () => editor.chain().focus().toggleBulletList().run(), title: 'Bullet List', active: editor.isActive('bulletList'), disabled: false },
        { icon: ListOrdered, action: () => editor.chain().focus().toggleOrderedList().run(), title: 'Ordered List', active: editor.isActive('orderedList'), disabled: false },
        { icon: Quote, action: () => editor.chain().focus().toggleBlockquote().run(), title: 'Blockquote', active: editor.isActive('blockquote'), disabled: false },
      ],
    },
  ]

  return (
    <div className="flex flex-col">
      {/* Toolbar */}
      <div className="flex items-center gap-1 px-4 py-2 border-b border-white/10 flex-wrap">
        {tools.map((group, gi) => (
          <div key={group.group} className="flex items-center gap-0.5">
            {gi > 0 && <div className="w-px h-5 bg-white/10 mx-1" />}
            {group.items.map(({ icon: Icon, action, title, active, disabled }) => (
              <button
                key={title}
                type="button"
                onClick={action}
                disabled={disabled}
                title={title}
                className={cn(
                  'p-1.5 rounded-lg text-sm transition-all',
                  active
                    ? 'bg-cyan-500/20 text-cyan-400'
                    : 'text-slate-500 hover:text-slate-300 hover:bg-white/5',
                  disabled && 'opacity-30 cursor-not-allowed'
                )}
              >
                <Icon className="w-4 h-4" />
              </button>
            ))}
          </div>
        ))}
      </div>

      {/* Editor */}
      <EditorContent editor={editor} />
    </div>
  )
}
