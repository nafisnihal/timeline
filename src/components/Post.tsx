// src/components/Post.tsx
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { BsChatSquareQuote, BsChatSquareQuoteFill } from "react-icons/bs";
import { FaHeart, FaRegHeart, FaRegUserCircle } from "react-icons/fa";
import { fetchComments } from "../services/api";
import {
  Comment as CommentType,
  Post as PostType,
  User as UserType,
} from "../services/types";

const Post = ({ post, user }: { post: PostType; user: UserType }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [liked, setLiked] = useState<boolean>(false);

  const { data: comments, isLoading: commentsLoading } = useQuery<
    CommentType[]
  >({
    queryKey: ["comments", post.id],
    queryFn: () => fetchComments(post.id),
    enabled: isExpanded,
  });

  return (
    <div className="border border-zinc-800 p-4 rounded bg-zinc-900 capitalize">
      <h2 className="text-xl font-bold text-slate-200">{post?.title}</h2>
      <div className="flex items-center gap-2 mt-1">
        <FaRegUserCircle className="text-indigo-500" size={14} />
        <p className="text-sm text-slate-400">{user?.name}</p>
      </div>
      <p className="mt-2 text-slate-200">{post?.body}</p>
      <button
        onClick={() => setLiked(!liked)}
        className={`mr-4 ${liked ? "text-red-500" : "text-indigo-500"}`}
      >
        {liked ? (
          <FaHeart className="text-red-500" size={20} />
        ) : (
          <FaRegHeart className="text-red-500" size={20} />
        )}
      </button>
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="mt-4 text-indigo-500 font-mono"
      >
        {isExpanded ? (
          <BsChatSquareQuoteFill size={20} />
        ) : (
          <BsChatSquareQuote size={20} />
        )}
      </button>
      {isExpanded && (
        <div className="mt-4">
          {commentsLoading ? (
            <div className="text-slate-200">Loading comments...</div>
          ) : (
            comments?.map((comment: CommentType) => (
              <div
                key={comment?.id}
                className="border-t border-slate-700 pt-2 pb-1 pl-2 mt-2 "
              >
                <p className="text-sm text-slate-200">{comment?.body}</p>
                <p className="text-xs text-slate-400">- {comment?.email}</p>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default Post;
