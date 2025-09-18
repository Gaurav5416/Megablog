import { useEffect, useState } from "react";
import service from "../appwrite/conf";
import { Container, PostCard } from "../components";

function Home() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    service.getPosts([]).then((res) => {
      if (res) setPosts(res.documents);
    });
  }, []);

  if (posts.length === 0) {
    return (
      <div className="w-full py-16 bg-gray-50">
        <Container>
          <div className="flex flex-col items-center justify-center">
            <h1 className="text-3xl font-bold text-gray-700 mb-4">
              Login to read posts
            </h1>
            <p className="text-gray-500 text-sm">
              You need an account to access all posts.
            </p>
          </div>
        </Container>
      </div>
    );
  }

  return (
    <div className="w-full py-8 bg-gray-50">
      <Container>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {posts.map((post) => (
            <PostCard key={post.$id} {...post} />
          ))}
        </div>
      </Container>
    </div>
  );
}

export default Home;
