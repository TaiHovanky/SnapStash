import ImageGrid from '@/components/image-grid';
import { SearchForm } from '@/components/search-form';
import { UploadForm } from '@/components/upload-form';

export default function Home({ searchParams }: { searchParams: { search?: string }}) {
  return (
    <main className='mx-8 pb-8 min-h-screen'>
      <div className='flex justify-between my-8'>
        <SearchForm />
        <UploadForm />
      </div>
      <ImageGrid searchParams={searchParams} />
    </main>
  )
}
