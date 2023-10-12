type EmptyGalleryProps = {
  searchParams?: string
}

const EmptyGallery = ({ searchParams }: EmptyGalleryProps) => {
  return (
    <div>
      {searchParams ?
        <p>No images were found</p> :
        <p>No images have been uploaded yet</p>
      }
    </div>
  );
}

export default EmptyGallery;