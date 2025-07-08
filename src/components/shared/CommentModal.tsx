import { FC, useEffect, useRef, useState } from 'react';
import { IoClose } from 'react-icons/io5';
import  { mutate } from 'swr';
import HttpInterceptor from '../../lib/HttpInterceptor';
import { toast } from 'react-toastify';
import { MdDeleteOutline, MdOutlineEdit } from "react-icons/md";
import catchErr from '../../lib/CatchErr';

interface CommentInterface {
  _id: string;
  user: { _id: string; fullName: string; gender: string; image: string };
  text: string;
  createdAt: string;
}

interface CommentModalProps {
  isOpen: boolean;
  onClose: () => void;
  postId: string
  user: { id: string; name: string; dp: string };
  comments: CommentInterface[]
}

const CommentModal: FC<CommentModalProps> = ({ isOpen, onClose, postId, user, comments }) => {
  const [text, setText] = useState('');
  const [editId, setEditId] = useState<string | null>(null);
  const endRef = useRef<HTMLDivElement>(null);
  

  useEffect(() => {
    if (isOpen) setText('');
  }, [isOpen]);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [comments]);

  if (!isOpen) return null;

  const handleSubmit = async() => {
    try {
      if (!text.trim()) return;
      const {data} = await HttpInterceptor.post('/comment',{post:postId, text})
      toast.success(data.message)
      mutate(`/comment?post=${postId}`)
      
    } 
    catch (error) {
      catchErr(error)
    }
    finally{
      setText('');
    }
  };

  const handleEdit = async(id: string, text:string)=>{
    try {
      if (!text.trim()) return;
      const {data} = await HttpInterceptor.put(`/comment/${id}`,{text})
      toast.success(data.message)
      mutate(`/comment?post=${postId}`)
    } 
    catch (error) {
      catchErr(error)
    }
     finally{
      setEditId(null)
      setText('');
    }
  }

  const handleDelete = async(id: string)=>{
    try {
      const {data} = await HttpInterceptor.delete(`/comment/${id}`)
      toast.success(data.message)
      mutate(`/comment?post=${postId}`)
    } 
    catch (error) {
      catchErr(error)
    }
  }
  

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex justify-center items-center">
      <div className="bg-white dark:bg-gray-800 w-full max-w-md max-h-[90vh] rounded-xl p-6 shadow-lg relative flex flex-col">
        {/* Close */}
        {!editId &&
          <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-600 hover:text-red-500 text-2xl"
        >
          <IoClose />
        </button>
        }
        {/* Header */}
        <h2 className="text-xl font-bold mb-4 text-center text-gray-800 dark:text-white">Comments</h2>

        {/* Comments List */}
        <div className="flex-1 overflow-y-auto pr-1 space-y-3 mb-4">
          {comments && comments.length > 0  ? (
            comments.map((comment: CommentInterface) => (
             <div className="flex justify-between items-start gap-3 group hover:bg-gray-100 dark:hover:bg-gray-700 p-2 rounded-md"
              key={comment._id}>
                {/* Avatar */}
                <img src={comment.user.image} alt="dp" className="w-8 h-8 rounded-full" />

                {/* Comment Content */}
                <div className="flex-1">
                  <p className="font-medium text-sm text-gray-800 dark:text-white capitalize">{comment.user.fullName}</p>
                  <p className="text-sm text-gray-700 dark:text-gray-300">{comment.text}</p>
                </div>

                {/* Action Icons */}
                { (comment.user._id === user.id) &&
                  <div className="flex gap-2 mt-1 text-xl text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300">
                    <button
                      onClick={() => {
                        setEditId(comment._id);
                        setText(comment.text); 
                      }}
                      className="hover:text-blue-500 transition cursor-pointer"
                      title="Edit"
                    >
                      <MdOutlineEdit />
                    </button>
                    <button
                      onClick={() => handleDelete(comment._id)}
                      className="hover:text-red-500 transition cursor-pointer"
                      title="Delete"
                    >
                      <MdDeleteOutline />
                    </button>
                  </div>
                }
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-center">No comments yet. Be the first!</p>
          )}
          <div ref={endRef}></div>
        </div>

        {/* Comment Input */}
        <div className="flex items-start gap-3 border-t border-gray-300 dark:border-gray-600 pt-3">
          <img src={user.dp} alt="dp" className="w-9 h-9 rounded-full" />
          <div className="flex-1">
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Write a comment..."
              rows={2}
              className="w-full resize-none p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white"
            />
          </div>
          {editId ?
          <button
            onClick={()=>handleEdit(editId, text)}
            disabled={!text.trim()}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-1 rounded disabled:opacity-50"
          >
             Save Changes
          </button>
          :
          <button
            onClick={handleSubmit}
            disabled={!text.trim()}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-1 rounded disabled:opacity-50"
          >
            Send
          </button>
          }
        </div>
      </div>
    </div>
  );
};

export default CommentModal;
