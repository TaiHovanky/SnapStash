import ImageGrid from '@/components/image-grid';
import UploadForm from '@/components/upload-form';
import SearchForm from '@/components/search-form';

type HomeProps = {
  searchParams: {
    search?: string
  }
}

const Home = ({ searchParams }: HomeProps) => {
  return (
    <main className='mx-8 pb-8 min-h-screen'>
      <div className='flex flex-col sm:flex-row justify-between my-8 gap-4'>
        <SearchForm search={searchParams?.search} />
        <UploadForm />
      </div>
      <ImageGrid search={searchParams?.search} />
    </main>
  );
}

export default Home;