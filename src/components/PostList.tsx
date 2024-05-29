// src/components/PostList.tsx
import { useQuery } from "@tanstack/react-query";
import { fetchPosts, fetchUsers } from "../services/api";
import { Post as PostType, User as UserType } from "../types";
import Post from "./Post";

const PostList = () => {
  const { data: posts, isLoading: postsLoading } = useQuery<PostType[]>({
    queryKey: ["posts"],
    queryFn: fetchPosts,
  });

  const { data: users, isLoading: usersLoading } = useQuery<UserType[]>({
    queryKey: ["users"],
    queryFn: fetchUsers,
  });

  if (postsLoading || usersLoading) return <div>Loading...</div>;

  const usersMap = users!.reduce(
    (acc: { [key: number]: UserType }, user: UserType) => {
      acc[user.id] = user;
      return acc;
    },
    {}
  );

  return (
    <div className="space-y-4">
      {posts!
        .sort((a: PostType, b: PostType) => b.id - a.id)
        .map((post: PostType) => (
          <Post key={post.id} post={post} user={usersMap[post.userId]} />
        ))}
    </div>
  );
};

export default PostList;