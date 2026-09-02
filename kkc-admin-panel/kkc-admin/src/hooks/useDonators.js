// src/hooks/useDonators.js
import { useQuery } from "@tanstack/react-query";
import { getDonators } from "../api/donators";
import { queryKeys } from "../lib/queryKeys";

export function useDonators() {
  return useQuery({
    queryKey: queryKeys.donators,
    queryFn: getDonators,
  });
}
