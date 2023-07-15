import Link from "next/link";
import type Post from "../interfaces/post";
import DateFormatter from "./date-formatter";

type Props = {
  posts: Post[];
};

const PostList = ({ posts }: Props) => {
  return (
    <section>
      <div className="flex flex-col gap-y-16">
        {posts.map((post) => (
          <PostPreview key={post.slug} {...post} />
        ))}
      </div>
    </section>
  );
};

const PostPreview = ({ title, date, excerpt, slug }: Post) => {
  return (
    <div>
      <div className="text-sm text-gray-400">
        <DateFormatter dateString={date} />
      </div>
      <h3 className="text-xl font-bold my-2 leading-snug">
        <Link as={`/posts/${slug}`} href="/posts/[slug]" className="underline">
          {title}
        </Link>
      </h3>
      <p className="text-lg text-gray-800">{excerpt}</p>
    </div>
  );
};

export default PostList;
