"use client"

import { findImages } from "@/app/actions"
import { useRouter } from "next/navigation"
import { useState } from "react";
// import { experimental_useFormState as useFormState } from 'react-dom';

export const SearchForm = () => {
  // const [state, formAction] = useFormState(findImages, null);
  const [fileName, setFileName] = useState('' as string);
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFileName(e.target.value);
  }

  const handleSubmit = () => {
    router.push(`/?search=${fileName}`);
  }

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" placeholder="Search images" onChange={handleChange} name="search" />
    </form>
  )
}