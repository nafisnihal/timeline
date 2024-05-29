// src/components/PostList.tsx
import { useQuery } from "@tanstack/react-query";
import { fetchPosts, fetchUsers } from "../services/api";
import { Post as PostType, User as UserType } from "../services/types";
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

  if (postsLoading || usersLoading)
    return (
      <div className="container mx-auto px-20 ">
        <h1 className="text-slate-200 text-xl">Loading...</h1>
      </div>
    );

  const usersMap = users!.reduce(
    (acc: { [key: number]: UserType }, user: UserType) => {
      acc[user.id] = user;
      return acc;
    },
    {}
  );

  return (
    <div className="container mx-auto">
      <div className="md:border-l border-zinc-800 relative px-10 md:px-20 space-y-4 md:ml-10">
        {posts!
          .sort((a: PostType, b: PostType) => b.id - a.id)
          .map((post: PostType) => (
            <Post key={post.id} post={post} user={usersMap[post.userId]} />
          ))}
      </div>
    </div>
  );
};

export default PostList;
