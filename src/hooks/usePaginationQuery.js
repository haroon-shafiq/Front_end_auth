"use client";

import {
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";
import { useEffect } from "react";

// export const usePaginationQuery = (defaultLimit = 5) => {
//   const router = useRouter();
//   const pathname = usePathname();
//   const searchParams = useSearchParams();

//   const page = Number(searchParams.get("page")) || 1;
//   const limit = Number(searchParams.get("limit")) || defaultLimit;

//   const updatePagination = (newPage, newLimit = limit) => {
//     const params = new URLSearchParams(searchParams);

//     params.set("page", newPage);
//     params.set("limit", newLimit);

//     router.push(
//       `${pathname}?${params.toString()}`
//     );
//   };

//   const checkPageLimit = ( page, limit, totalProjects ) => {
//     const totalPages = Math.ceil( totalProjects / limit );

//     if (totalPages > 0 && page > totalPages) {
//       updatePagination(1, limit);
//     }
//   };

//   return {
//     page,
//     limit,
//     nextPage: () => updatePagination(page + 1),
//     prevPage: () => updatePagination(Math.max(page - 1, 1)),
//     changeLimit: (value) => updatePagination(1, value),
//     updatePagination,
//     checkPageLimit,
//   };
// };
// usePaginationQuery.js

const ALLOWED_LIMITS = [5, 10, 20, 50];

export const usePaginationQuery = (defaultLimit = 5) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const page = Math.max(Number(searchParams.get("page")) || 1, 1); 
  const rawLimit = Number(searchParams.get("limit"));
  const limit = ALLOWED_LIMITS.includes(rawLimit) ? rawLimit : defaultLimit; 

  const updatePagination = (newPage, newLimit = limit) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", newPage);
    params.set("limit", newLimit);
    router.push(`${pathname}?${params.toString()}`);
  };

  const checkPageLimit = (page, limit, totalCount) => {
    const totalPages = Math.ceil(totalCount / limit);

    if (totalPages > 0 && page > totalPages) {
      updatePagination(1, limit);
    }
  };


  useEffect(() => {
    const rawLimit = Number(searchParams.get("limit"));
    const rawPage = Number(searchParams.get("page"));
    if (rawLimit > 50) {
        updatePagination(1, 50);
        return;
      }

    if (!ALLOWED_LIMITS.includes(rawLimit) || rawPage < 1 ) {
      updatePagination(Math.max(rawPage || 1, 1), defaultLimit);
    }
  }, []);

  return {
    page,
    limit,
    nextPage: () => updatePagination(page + 1),
    prevPage: () => updatePagination(Math.max(page - 1, 1)),
    changeLimit: (value) => updatePagination(1, value),
    updatePagination,
    checkPageLimit,
  };
};