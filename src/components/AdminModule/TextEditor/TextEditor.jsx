/* eslint-disable react/prop-types */
import {
    Editor,
    EditorContent
} from '@tiptap/react';
  
  import { BiBold, BiItalic, BiListOl, BiListUl, BiStrikethrough } from 'react-icons/bi';
  
  
  const TextEditor = ({editor}) => {
      if(!(editor instanceof Editor)) throw Error('prop deve ser uma instância de Editor')
  
      return (
          <>
              {/* Menu bar */}
              <div className='flex items-center bg-white border rounded-t-lg overflow-hidden border-b-2 p-1 font-bold text-black ' >
                  <div className='flex gap-1 pr-1 leading-6'>
                      <button
              type='button'
                          onClick={() =>
                              editor.chain().focus().setHeading({ level: 1 }).run()
                          }
                          className={`hover:opacity-50 p-2 px-3 h-full border border-transparent ${
                              editor.isActive('heading', { level: 1 })
                                  ? 'border-zinc-500 rounded-md bg-slate-100'
                                  : 'bg-white'
                          }`}
                      >
                          H1
                      </button>
                      <button
              type='button'
                          onClick={() =>
                              editor.chain().focus().setHeading({ level: 2 }).run()
                          }
                          className={`hover:opacity-50 p-2 px-3 h-full border border-transparent ${
                              editor.isActive('heading', { level: 2 })
                                  ? 'border-zinc-500 rounded-md bg-slate-100'
                                  : 'bg-white'
                          }`}
                      >
                          H2
                      </button>
                      <button
              type='button'
                          onClick={() =>
                              editor.chain().focus().setHeading({ level: 3 }).run()
                          }
                          className={`hover:opacity-50 p-2 px-3 h-full border border-transparent ${
                              editor.isActive('heading', { level: 3 })
                                  ? 'border-zinc-500 rounded-md bg-slate-100'
                                  : 'bg-white'
                          }`}
                      >
                          H3
                      </button>
                      <button
              type='button'
                          onClick={() => editor.chain().focus().setParagraph().run()}
                          className={`hover:opacity-50 p-2 px-3 h-full border border-transparent ${
                              editor.isActive('paragraph') ? 'border-zinc-500 rounded-md bg-slate-100' : 'bg-white'
                          }`}
                      >
                          Parágrafo
                      </button>
                  </div>
          {/* {aqui temos bold, italic, linethrough} */}
                  <div className='border-l-2 px-1 flex gap-1'>
                      <button
              type='button'
                          onClick={() => editor.chain().focus().toggleBold().run()}
                          disabled={!editor.can().chain().focus().toggleBold().run()}
                          className={`hover:opacity-50 p-2 h-full border border-transparent ${
                              editor.isActive('bold') ? 'border-zinc-500 rounded-md bg-slate-100' : 'bg-white'
                          }`}
                      >
                          <BiBold size={24} />
                      </button>
                      <button
              type='button'
                          onClick={() => editor.chain().focus().toggleItalic().run()}
                          disabled={!editor.can().chain().focus().toggleItalic().run()}
                          className={`hover:opacity-50 p-2 h-full border border-transparent ${
                              editor.isActive('italic') ? 'border-zinc-500 rounded-md bg-slate-100' : 'bg-white'
                          }`}
                      >
                          <BiItalic size={24} />
                      </button>
                      <button
              type='button'
                          onClick={() => editor.chain().focus().toggleStrike().run()}
                          disabled={!editor.can().chain().focus().toggleStrike().run()}
                          className={`hover:opacity-50 p-2 h-full border border-transparent ${
                              editor.isActive('strike') ? 'border-zinc-500 rounded-md bg-slate-100' : 'bg-white'
                          }`}
                      >
                          <BiStrikethrough size={24} />
                      </button>
                  </div>
          {/* {aqui temos os tipos de lista} */}
                  <div className='border-l-2 pl-1 flex gap-1'>
                      <button
              type='button'
                          onClick={() => editor.chain().focus().toggleBulletList().run()}
                          className={`hover:opacity-50 p-2 h-full border border-transparent ${
                              editor.isActive('bulletList') ? 'border-zinc-500 rounded-md bg-slate-100' : 'bg-white'
                          }`}
                      >
                          <BiListUl size={24} />
                      </button>
                      <button
              type='button'
                          onClick={() => editor.chain().focus().toggleOrderedList().run()}
                          className={`hover:opacity-50 p-2 h-full border border-transparent ${
                              editor.isActive('orderedList') ? 'border-zinc-500 rounded-md bg-slate-100' : 'bg-white'
                          }`}
                      >
                          <BiListOl size={24} />
                      </button>
                  </div>
              </div>
  
              {/* Editor content */}
              <div className='w-full border rounded-b-lg'>
                  <EditorContent editor={editor} />
              </div>
          </>
      );
  };
  
  export default TextEditor;