import { findImages } from "@/app/actions";
import { ImageMetadata } from "@/types/image.type";
import DeleteButton from "./delete-button";
import Image from "next/image";

const ImageGrid = async ({ searchParams }: { searchParams: { search?: string }  }) => {
  const images: any = await findImages(searchParams?.search || '');

  return (
    <div className='w-full grid grid-cols-1 gap-x-8 gap-y-8 sm:grid-cols-2 2xl:grid-cols-3 3xl:grid-cols-4'>
      {images.map((imgFile: ImageMetadata, index: number) => (
        <div key={`img-${index}`} className="relative aspect-w-16 aspect-h-9 w-full overflow-hidden rounded-lg">
          <Image
            src={`${process.env.NEXT_PUBLIC_AWS_BUCKET_URL}/${imgFile.image_id}`}
            alt={`pic-${index}`}
            width={600}
            height={550}
            className="aspect-w-16 aspect-h-9 sm:w-full max-h-[550px] relative"
          />
          <DeleteButton imgId={imgFile.image_id} />
        </div>
      ))}
    </div>
  );
}

export default ImageGrid;