import { useParams } from 'react-router-dom';

// src/Tiptap.tsx
import {
	useEditor,
	EditorContent,
	FloatingMenu,
	BubbleMenu,
} from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';

// define your extension array
const extensions = [StarterKit];

const content = '<p>Hello World!</p>';

const Tiptap = () => {
	const editor = useEditor({
		extensions,
		content,
	});


  const buttonStyle = 'p-2'
	return (
		<>
			<EditorContent editor={editor} />
			<FloatingMenu editor={editor}>This is the floating menu</FloatingMenu>
			<BubbleMenu editor={editor}>
				<button className={buttonStyle} onClick={() => console.log(JSON.stringify(editor.getJSON()))}>
					show OUtput
				</button>
				<button
					onClick={() => editor.chain().focus().toggleBold().run()}
					disabled={!editor.can().chain().focus().toggleBold().run()}
					className={buttonStyle}
				>
					Bold
				</button>
				<button
					onClick={() => editor.chain().focus().toggleItalic().run()}
					disabled={!editor.can().chain().focus().toggleItalic().run()}
					className={buttonStyle}
				>
					Italic
				</button>
				<button
					onClick={() => editor.chain().focus().toggleStrike().run()}
					disabled={!editor.can().chain().focus().toggleStrike().run()}
					className={buttonStyle}
				>
					Strike
				</button>
			</BubbleMenu>
		</>
	);
};

const AdminEdicaoEvento = () => {
	const { event_id } = useParams();

	return (
		<>
			<Tiptap />
			<h1>esse é o id do evento {event_id}</h1>
		</>
	);
};

export default AdminEdicaoEvento;
