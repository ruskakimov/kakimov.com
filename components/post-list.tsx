import Link from "next/link";
import type Post from "../interfaces/post";
import DateLabel from "./date-label";

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
      <h3 className="text-2xl font-bold my-2 leading-snug">
        <Link
          as={`/posts/${slug}`}
          href="/posts/[slug]"
          className="underline decoration-stone-300 hover:decoration-red-500"
        >
          {title}
        </Link>
      </h3>
      <p className="text-xl text-stone-800">{excerpt}</p>
    </div>
  );
};

export default PostList;
