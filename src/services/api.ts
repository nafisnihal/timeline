// src/services/api.ts
import axios from "axios";
import { Comment, Post, User } from "./types";

const API_BASE = "https://jsonplaceholder.typicode.com";

export const fetchPosts = async (): Promise<Post[]> => {
  const { data } = await axios.get<Post[]>(`${API_BASE}/posts`);
  return data;
};

export const fetchUsers = async (): Promise<User[]> => {
  const { data } = await axios.get<User[]>(`${API_BASE}/users`);
  return data;
};

export const fetchComments = async (postId: number): Promise<Comment[]> => {
  const { data } = await axios.get<Comment[]>(`${API_BASE}/comments`, {
    params: { postId },
  });
  return data;
};
