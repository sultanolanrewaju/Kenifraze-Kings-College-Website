// src/hooks/useEvents.js
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getEvents, createEvent, updateEvent, deleteEvent } from "../api/events";
import { queryKeys } from "../lib/queryKeys";

export function useEvents() {
  return useQuery({
    queryKey: queryKeys.events,
    queryFn: getEvents,
  });
}

export function useCreateEvent() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createEvent,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: queryKeys.events }),
  });
}

export function useUpdateEvent() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }) => updateEvent(id, data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: queryKeys.events }),
  });
}

export function useDeleteEvent() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteEvent,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: queryKeys.events }),
  });
}
