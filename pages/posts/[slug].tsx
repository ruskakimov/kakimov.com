import { useRouter } from "next/router";
import ErrorPage from "next/error";
import { getPostBySlug, getAllPosts } from "../../lib/api";
import Head from "next/head";
import { MAIN_SITE_TITLE } from "../../lib/constants";
import markdownToHtml from "../../lib/markdownToHtml";
import type Post from "../../interfaces/post";
import DateLabel from "../../components/atomic/date-label";
import classNames from "classnames";

type Props = {
  post: Post;
};

export default function PostPage({ post }: Props) {
  const router = useRouter();
  const title = `${post.title} | ${MAIN_SITE_TITLE}`;
  if (!router.isFallback && !post?.slug) {
    return <ErrorPage statusCode={404} />;
  }
  if (router.isFallback) {
    return <h1>Hold on...</h1>;
  }
  return (
    <article
      className={classNames(
        "prose sm:prose-xl prose-stone",
        "prose-p:leading-relaxed",
        "prose-a:decoration-stone-300 hover:prose-a:decoration-red-500",
        "prose-pre:bg-white prose-pre:shadow prose-pre:text-stone-900 prose-pre:text-sm"
      )}
    >
      <Head>
        <title>{title}</title>
        <meta property="og:image" content={post.ogImage.url} />
      </Head>
      <DateLabel dateString={post.date} />
      <h1>{post.title}</h1>
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
