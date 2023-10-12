"use client"

import { useRouter } from "next/navigation"
import { useState } from "react";
import { Input } from "./ui/input";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

export const SearchForm = () => {
  const [fileName, setFileName] = useState('' as string);
  const router: AppRouterInstance = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFileName(e.target.value);
  }

  const handleSubmit = () => {
    router.push(`/?search=${fileName}`);
  }

  return (
    <form onSubmit={handleSubmit}>
      <Input
        type="text"
        placeholder="Search images..."
        onChange={handleChange}
        name="search"
      />
    </form>
  )
}