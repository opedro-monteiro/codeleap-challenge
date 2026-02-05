import { api } from "@/src/lib/axios";
import type {
  createPostFormData,
  editPostFormData,
  getPostFormData,
} from "../types/post.schema";

const ENDPOINT = "/careers/";

export interface PostsResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: getPostFormData[];
}

export async function createPost(
  data: createPostFormData,
): Promise<getPostFormData> {
  const response = await api.post<getPostFormData>(ENDPOINT, data);
  return response.data;
}

export async function getPosts(): Promise<PostsResponse> {
  const response = await api.get<PostsResponse>(ENDPOINT);
  return response.data;
}

export async function deletePost(id: string | number): Promise<void> {
  await api.delete(`${ENDPOINT}${id}/`);
}

export async function updatePost(
  id: string | number,
  data: editPostFormData,
): Promise<getPostFormData> {
  const response = await api.patch<getPostFormData>(`${ENDPOINT}${id}/`, data);
  return response.data;
}

export async function getPostById(id: string | number): Promise<getPostFormData> {
  const response = await api.get<getPostFormData>(`${ENDPOINT}${id}/`);
  return response.data;
}
