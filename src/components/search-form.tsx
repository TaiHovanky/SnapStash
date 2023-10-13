"use client"

import { useRouter } from "next/navigation";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { useState } from "react";
import { Input } from "./ui/input";

type SearchFormProps = {
  search?: string
}

const SearchForm = ({ search }: SearchFormProps) => {
  const [fileName, setFileName] = useState(search || '' as string);
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
        aria-label="Search images by name"
        placeholder="Search images..."
        onChange={handleChange}
        name="search"
        value={fileName}
      />
    </form>
  )
}

export default SearchForm;