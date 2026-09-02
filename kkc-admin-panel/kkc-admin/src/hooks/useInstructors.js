// src/hooks/useInstructors.js
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getInstructors,
  createInstructor,
  updateInstructor,
  deleteInstructor,
} from "../api/instructors";
import { queryKeys } from "../lib/queryKeys";

export function useInstructors() {
  return useQuery({
    queryKey: queryKeys.instructors,
    queryFn: getInstructors,
  });
}

export function useCreateInstructor() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createInstructor,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.instructors });
      queryClient.invalidateQueries({ queryKey: queryKeys.dashboard });
    },
  });
}

export function useUpdateInstructor() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }) => updateInstructor(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.instructors });
    },
  });
}

export function useDeleteInstructor() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteInstructor,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.instructors });
      queryClient.invalidateQueries({ queryKey: queryKeys.dashboard });
    },
  });
}
