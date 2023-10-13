"use client"

import Image from "next/image";
import DeleteButton from "./delete-button";
import EmptyGallery from "./empty-gallery";
import { findImages } from "@/app/actions";
import { ImageMetadata } from "@/types/image.type";
import { ServerActionResult } from "@/types/server-action-result.type";
import { useEffect, useState } from "react";
import { useInfiniteScroll } from "@/hooks/useInfiniteScroll";

type ImageGridProps = {
  search?: string
}

const ImageGrid = ({ search }: ImageGridProps) => {
  const [images, setImages] = useState<ImageMetadata[]>([]);

  const { debouncedScrollHandler } = useInfiniteScroll(search || '', images, setImages);

  useEffect(() => {
    // Get the first page of images
    const getImages = async () => {
      const images: ImageMetadata[] | ServerActionResult = await findImages(search || '', 0);
      if (Array.isArray(images)) {
        setImages(images as ImageMetadata[]);
      }
    }
    getImages();

    // Add the scroll listener
    window.addEventListener('scroll', debouncedScrollHandler);

    // Clean out the listener
    return () => {
      window.removeEventListener('scroll', debouncedScrollHandler);
    }
  }, [search]);

  return (
    <div className='w-full grid grid-cols-1 gap-x-8 gap-y-8 sm:grid-cols-2 2xl:grid-cols-3 3xl:grid-cols-4'>
      {Array.isArray(images) && images.length > 0 ? 
        images.map((imgFile: ImageMetadata, index: number) => (
          <div key={`img-${index}`} className="relative aspect-w-16 aspect-h-9 w-full overflow-hidden rounded-lg">
            <Image
              src={`${process.env.NEXT_PUBLIC_AWS_BUCKET_URL}/${imgFile.image_id}`}
              alt={`pic-${index}`}
              width={600}
              height={550}
              className="aspect-w-16 aspect-h-9 h-auto w-auto sm:w-full relative"
            />
            <DeleteButton imgId={imgFile.image_id} />
          </div>
        )) :
        <EmptyGallery searchParams={search} />
      }
    </div>
  );
}

export default ImageGrid;