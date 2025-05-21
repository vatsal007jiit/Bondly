import { FC, useRef, useState } from 'react';
import { IoClose } from 'react-icons/io5';
import { BsImage} from 'react-icons/bs';

interface CreatePostModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPost: (text: string, media?: File) => void;
  user: { name: string; dp: string };
}

const CreatePostModal: FC<CreatePostModalProps> = ({ isOpen, onClose, onPost, user }) => {
  const [text, setText] = useState('');
  const [media, setMedia] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  if (!isOpen) return null;

  const handleMediaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setMedia(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handlePost = () => {
    onPost(text, media || undefined);
    setText('');
    setMedia(null);
    setPreview(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex justify-center items-center">
      <div className="bg-white dark:bg-gray-800 w-full max-w-md rounded-xl p-6 shadow-lg relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-600 hover:text-red-500 text-2xl"
        >
          <IoClose />
        </button>

        {/* Header */}
        <h2 className="text-xl font-bold mb-4 text-center text-gray-800 dark:text-white">Create Post</h2>

        {/* User Info */}
        <div className="flex items-center gap-3 mb-4">
          <img src={user.dp} alt="Profile" className="w-10 h-10 rounded-full" />
          <p className="font-medium text-gray-800 dark:text-white">{user.name}</p>
        </div>

        {/* Text Input */}
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="What's on your mind?"
          className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-white resize-none mb-3"
          rows={4}
        />

        {/* Media Preview */}
        {preview && media && (
            media.type.startsWith("video/") ? (
            <video src={preview} controls className="w-full rounded-lg mb-3 max-h-[300px] object-cover" />
          ) : (
            <img src={preview} alt="Preview" className="w-full rounded-lg mb-3 max-h-[300px] object-cover" />
          )
        )}

        {/* Action Buttons */}
        <div className="flex justify-between items-center">
          <div className="flex gap-3">
            <label className="cursor-pointer text-blue-500 flex items-center gap-1">
              <BsImage className="text-xl" />
              <input
                type="file"
                accept="image/*,video/*"
                onChange={handleMediaChange}
                className="hidden"
                ref={fileInputRef}
              />
              Media
            </label>
          </div>
          <button
            onClick={handlePost}
            disabled={!text.trim() && !media}
            className="bg-indigo-600 hover:bg-indigo-700 cursor-pointer text-white px-4 py-2 rounded-md disabled:opacity-50"
          >
            Post
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreatePostModal;
