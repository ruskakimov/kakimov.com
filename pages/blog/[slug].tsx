import classNames from "classnames";
import ErrorPage from "next/error";
import Head from "next/head";
import { useRouter } from "next/router";
import DateLabel from "../../components/atomic/date-label";
import type Post from "../../interfaces/post";
import { getAllPosts, getPostBySlug } from "../../lib/api";
import { FULL_NAME } from "../../lib/constants";
import markdownToHtml from "../../lib/markdownToHtml";

type Props = {
  post: Post;
};

export default function PostPage({ post }: Props) {
  const router = useRouter();
  const title = `"${post.title}" by ${FULL_NAME}`;
  if (!router.isFallback && !post?.slug) {
    return <ErrorPage statusCode={404} />;
  }
  if (router.isFallback) {
    return <h1>Hold on...</h1>;
  }
  return (
    <article
      className={classNames(
        "prose prose-lg sm:prose-xl prose-stone",
        "prose-h1:tracking-tight",
        "prose-p:leading-relaxed",
        "prose-a:decoration-stone-300 hover:prose-a:decoration-red-500",
        "prose-pre:bg-white prose-pre:shadow prose-pre:text-stone-900 prose-pre:text-base",
        "prose-code:text-sm prose-code:font-normal",
        "prose-blockquote:text-stone-500"
      )}
    >
      <Head>
        <title>{title}</title>
        {post.coverImage && (
          <meta property="og:image" content={post.coverImage} />
        )}
      </Head>
      <DateLabel dateString={post.date} />
      <h1>{post.title}</h1>
      {post.coverImage && <img src={post.coverImage} />}
      <article dangerouslySetInnerHTML={{ __html: post.content }} />
    </article>
  );
}

type Params = {
  params: {
    slug: string;
  };
};

export async function getStaticProps({ params }: Params) {
  const post = getPostBySlug(params.slug, [
    "title",
    "date",
    "slug",
    "author",
    "content",
    "ogImage",
    "coverImage",
  ]);
  const content = await markdownToHtml(post.content || "");

  return {
    props: {
      post: {
        ...post,
        content,
      },
    },
  };
}

export async function getStaticPaths() {
  const posts = getAllPosts(["slug"]);

  return {
    paths: posts.map((post) => {
      return {
        params: {
          slug: post.slug,
        },
      };
    }),
    fallback: false,
  };
}
