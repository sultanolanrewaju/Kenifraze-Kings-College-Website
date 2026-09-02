// src/hooks/useAcademics.js
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getAcademicPosts,
  createAcademicPost,
  updateAcademicPost,
  deleteAcademicPost,
} from "../api/academics";
import { queryKeys } from "../lib/queryKeys";

export function useAcademicPosts() {
  return useQuery({
    queryKey: queryKeys.academics,
    queryFn: getAcademicPosts,
  });
}

export function useCreateAcademicPost() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createAcademicPost,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: queryKeys.academics }),
  });
}

export function useUpdateAcademicPost() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }) => updateAcademicPost(id, data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: queryKeys.academics }),
  });
}

export function useDeleteAcademicPost() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteAcademicPost,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: queryKeys.academics }),
  });
}
