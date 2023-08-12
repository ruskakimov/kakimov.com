import Link from "next/link";
import type Post from "../interfaces/post";
import DateLabel from "./atomic/date-label";

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
      <DateLabel dateString={date} />
      <Link
        as={`/blog/${slug}`}
        href="/blog/[slug]"
        className="underline decoration-stone-300 hover:decoration-red-500"
      >
        <h3 className="text-2xl font-bold my-2 leading-snug">{title}</h3>
      </Link>
      <p className="text-lg text-stone-700 leading-relaxed">{excerpt}</p>
    </div>
  );
};

export default PostList;
