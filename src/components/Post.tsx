// src/components/Post.tsx
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { fetchComments } from "../services/api";
import {
  Comment as CommentType,
  Post as PostType,
  User as UserType,
} from "../types";

const Post = ({ post, user }: { post: PostType; user: UserType }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const { data: comments, isLoading: commentsLoading } = useQuery<
    CommentType[]
  >({
    queryKey: ["comments", post.id],
    queryFn: () => fetchComments(post.id),
    enabled: isExpanded,
  });

  return (
    <div className="border p-4 rounded">
      <h2 className="text-xl font-bold">{post?.title}</h2>
      <p className="text-sm text-gray-600">by {user?.name}</p>
      <p className="mt-2">{post?.body}</p>
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="mt-4 text-blue-500"
      >
        {isExpanded ? "Hide Comments" : "Show Comments"}
      </button>
      {isExpanded && (
        <div className="mt-4">
          {commentsLoading ? (
            <div>Loading comments...</div>
          ) : (
            comments?.map((comment: CommentType) => (
              <div key={comment?.id} className="border-t pt-2 mt-2">
                <p className="text-sm text-gray-800">{comment?.body}</p>
                <p className="text-xs text-gray-500">- {comment?.email}</p>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default Post;
