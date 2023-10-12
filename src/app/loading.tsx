import { Skeleton } from "@/components/ui/skeleton";

const Loading = () => {
  return (
    <main className='mx-8 pb-8 min-h-screen'>
      <div className='flex flex-col sm:flex-row justify-between my-8 gap-4'>
        <Skeleton className="h-[40px] w-[212px]" />
        <Skeleton className="h-[40px] w-[420px]" />
      </div>
      <div className="w-full grid grid-cols-1 gap-x-8 gap-y-8 sm:grid-cols-2 2xl:grid-cols-3 3xl:grid-cols-4 rounded-lg">
        <Skeleton className="w-full max-h-[550px]" />
        <Skeleton className="w-full max-h-[550px]" />
        <Skeleton className="w-full max-h-[550px]" />
        <Skeleton className="w-full max-h-[550px]" />
      </div>
    </main>
  );
}

export default Loading;