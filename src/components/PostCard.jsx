import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import service from "../appwrite/conf";

function PostCard({ $id, title, featuredImage }) {
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    let isMounted = true;

    const fetchImage = async () => {
      try {
        const url = await service.getFilePreview(featuredImage);
        if (isMounted) setImageUrl(url);
      } catch (err) {
        console.warn("Preview blocked or unavailable, using original file:", err);
        try {
          const originalUrl = await service.getFile(featuredImage);
          if (isMounted) setImageUrl(originalUrl);
        } catch (err2) {
          console.error("Failed to fetch image:", err2);
        }
      }
    };

    fetchImage();

    return () => {
      isMounted = false;
    };
  }, [featuredImage]);

  return (
    <Link to={`/post/${$id}`}>
      <div className="w-full bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 p-4 cursor-pointer">
        <div className="w-full mb-4 overflow-hidden rounded-xl">
          {imageUrl ? (
            <img
              src={imageUrl}
              alt={title}
              className="w-full h-48 object-cover rounded-xl transition-transform duration-300 hover:scale-105"
            />
          ) : (
            <div className="w-full h-48 bg-gray-200 rounded-xl animate-pulse"></div>
          )}
        </div>
        <h2 className="text-lg sm:text-xl font-semibold text-gray-900 truncate">
          {title}
        </h2>
      </div>
    </Link>
  );
}

export default PostCard;
