import Head from "next/head";
import PostList from "../components/post-list";
import Post from "../interfaces/post";
import { MAIN_SITE_TITLE } from "../lib/constants";
import { getAllPosts } from "../lib/api";

type Props = {
  allPosts: Post[];
};

export default function Index({ allPosts }: Props) {
  return (
    <>
      <Head>
        <title>{MAIN_SITE_TITLE}</title>
      </Head>
      <PostList posts={allPosts} />
    </>
  );
}

export const getStaticProps = async () => {
  const allPosts = getAllPosts([
    "title",
    "date",
    "slug",
    "author",
    "coverImage",
    "excerpt",
  ]);

  return {
    props: { allPosts },
  };
};
