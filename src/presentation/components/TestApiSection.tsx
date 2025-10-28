import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.06 }
  },
  exit: { opacity: 0 }
};

const cardVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.98 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.45 } },
  exit: { opacity: 0, y: -20, scale: 0.98, transition: { duration: 0.35 } }
};

// Post card component that animates based on intersection with viewport
const PostCard: React.FC<{ post: Post }> = ({ post }) => {
  const [ref, inView] = useInView({ triggerOnce: false, threshold: 0.15 });

  return (
    <motion.article
      ref={ref as any}
      layout
      variants={cardVariants}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      exit="exit"
      className="backdrop-blur-sm bg-white/10 border border-white/10 rounded-xl p-6 shadow-lg flex flex-col"
      style={{
        WebkitBackdropFilter: 'blur(8px)',
        backdropFilter: 'blur(8px)'
      }}
    >
      <h3 className="mb-2 text-lg font-semibold text-gray-900">{post.title}</h3>
      <p className="mb-4 text-sm text-gray-700">{post.body}</p>
      <div className="mt-auto flex items-center justify-between text-sm text-gray-500">
        <span>Post ID: {post.id}</span>
        <span>User: {post.userId}</span>
      </div>
    </motion.article>
  );
};

const TestApiSection: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    const controller = new AbortController();

    const fetchPosts = async () => {
      try {
        setLoading(true);
        const res = await fetch('https://jsonplaceholder.typicode.com/posts', { signal: controller.signal });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data: Post[] = await res.json();
        if (mounted) setPosts(data.slice(0, 24)); // limit to 24 for page
      } catch (err: any) {
        if (mounted) setError(err.message || 'Failed to fetch');
      } finally {
        if (mounted) setLoading(false);
      }
    };

    fetchPosts();

    return () => {
      mounted = false;
      controller.abort();
    };
  }, []);

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-4xl">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center text-red-600">
        Error: {error}
      </div>
    );
  }

  return (
    <section className="min-h-screen py-16 bg-gradient-to-b from-white to-primary-light">
      <div className="container mx-auto px-4">
        <h2 className="mb-8 text-center text-3xl font-bold text-gray-800">Test API - Posts</h2>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          <AnimatePresence>
            {posts.map((p) => (
              <PostCard key={p.id} post={p} />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};

export default TestApiSection;
