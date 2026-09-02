// src/hooks/useDashboard.js
import { useQuery } from "@tanstack/react-query";
import { getDashboardSummary } from "../api/dashboard";
import { queryKeys } from "../lib/queryKeys";

export function useDashboardSummary() {
  return useQuery({
    queryKey: queryKeys.dashboard,
    queryFn: getDashboardSummary,
  });
}
