import { findImages } from "@/app/actions";
import { ImageMetadata } from "@/types/image.type";
import DeleteButton from "./delete-button";

const ImageGrid = async ({ searchParams }: { searchParams: { search?: string }  }) => {
  const images: any = await findImages(searchParams?.search || '');

  return (
    <div className='w-full grid grid-cols-1 gap-x-8 gap-y-8 sm:grid-cols-2'>
      {images.map((imgFile: ImageMetadata, index: number) => (
        <div key={`img-${index}`}>
          <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
            <img src={`${process.env.NEXT_PUBLIC_AWS_BUCKET_URL}/${imgFile.image_id}`} alt={`pic-${index}`} className="h-full w-full object-cover object-center group-hover:opacity-75" />
          </div>
          <DeleteButton imgId={imgFile.image_id} />
        </div>
      ))}
    </div>
  );
}

export default ImageGrid;