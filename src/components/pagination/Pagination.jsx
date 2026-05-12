"use client";

import { Field, FieldLabel } from "@/components/ui/field";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function CustomPagination({
  page,
  limit,
  hasMore,
  onNext,
  onPrevious,
  onLimitChange,
}) {
  return (
    <div className="flex items-center justify-center gap-4">
      <Field orientation="horizontal" className="w-fit">
        <FieldLabel htmlFor="select-rows-per-page">Rows per page</FieldLabel>

        <Select
          value={String(limit)}
          onValueChange={(value) => onLimitChange(Number(value))}
        >
          <SelectTrigger className="w-20" id="select-rows-per-page">
            <SelectValue />
          </SelectTrigger>

          <SelectContent align="start">
            <SelectGroup>
              <SelectItem value="5">5</SelectItem>
              <SelectItem value="10">10</SelectItem>
               <SelectItem value="20">20</SelectItem>
                <SelectItem value="50">50</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </Field>

      <Pagination className="mx-0 w-auto">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              href="#"
              onClick={(e) => {
                e.preventDefault();
                onPrevious();
              }}
              className={page === 1 ? "pointer-events-none opacity-50" : ""}
            />
          </PaginationItem>

          <PaginationItem>
            <span className="px-4 text-sm">Page {page}</span>
          </PaginationItem>

          <PaginationItem>
            <PaginationNext
              href="#"
              onClick={(e) => {
                e.preventDefault();

                if (hasMore) {
                  onNext();
                }
              }}
              className={!hasMore ? "pointer-events-none opacity-50" : ""}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
