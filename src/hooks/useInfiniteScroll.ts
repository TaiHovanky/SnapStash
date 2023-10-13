import { findImages } from '@/app/actions';
import { ImageMetadata } from '@/types/image.type';
import { ServerActionResult } from '@/types/server-action-result.type';
import debounce from 'lodash.debounce';
import { useState, useMemo, useRef, useEffect, Dispatch, SetStateAction } from 'react'

export const useInfiniteScroll = (
  search: string,
  images: ImageMetadata[],
  setImages: Dispatch<SetStateAction<ImageMetadata[]>>
) => {
  let currentScrollPosition: number = 0;
  const [currentPage, setCurrentPage] = useState<number>(0);

  // Put handleScroll into a ref so that it doesn't change on every render
  const handleScrollRef = useRef<() => void>(handleScroll); 

  async function handleScroll() {
    // When the user scrolls to the bottom of the page, load more images
    if ((window.innerHeight + Math.round(window.scrollY)) >= document.body.offsetHeight && window.scrollY > currentScrollPosition) {
      const newPage: number = currentPage + 1;
      const newImages: ImageMetadata[] | ServerActionResult = await findImages(search || '', newPage);
      if (Array.isArray(newImages)) {
        setImages([...images, ...newImages]);
      }
      setCurrentPage(newPage);
    }
    currentScrollPosition = window.scrollY;
  };

  const debouncedScrollHandler = useMemo(() => {
    // cb will be only created on mount
    const cb = () => {
      // Ref is a reference to the latest handleScroll
      handleScrollRef.current?.();
    };
    // Debounce the latest version of handleScroll
    return debounce(cb, 1000);
  }, []);

  useEffect(() => {
    // Update the ref to the latest handleScroll everytime that images changes
    handleScrollRef.current = handleScroll;
  }, [images, currentPage]);

  return {
    debouncedScrollHandler
  }
}
