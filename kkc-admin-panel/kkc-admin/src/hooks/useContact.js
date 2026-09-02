// src/hooks/useContact.js
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getContactInfo, updateContactInfo } from "../api/contact";
import { queryKeys } from "../lib/queryKeys";

export function useContactInfo() {
  return useQuery({
    queryKey: queryKeys.contact,
    queryFn: getContactInfo,
  });
}

export function useUpdateContactInfo() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateContactInfo,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: queryKeys.contact }),
  });
}
