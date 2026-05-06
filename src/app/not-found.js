'use client'
import { Button } from "@/components/ui/button";
import Link from "next/link";
export default function NotFound() {

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="text-center">
        <h1 className="text-4xl font-bold">404</h1>
        <p className="text-gray-500 mt-2">Page not found</p>
        <Link href="/dashboard">
        <Button className="mt-2">Back to page</Button>
        </Link>
      </div>
    </div>
  );
}
