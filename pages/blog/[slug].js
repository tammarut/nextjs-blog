import Head from "next/head";
import { serialize } from "next-mdx-remote/serialize";
import { MDXRemote } from "next-mdx-remote";
import { format, parseISO } from "date-fns";
import { getAllPosts } from "../../lib/data";

export default function TestPage({ source, frontMatter }) {
  return (
    <div>
      <Head>
        <title>{frontMatter.title}</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <div className="border-b-2 border-gray-200 mb-4">
          <h1 className="text-2xl font-bold">{frontMatter.title}</h1>
          <div className="text-gray-400 text-sm">
            {format(parseISO(frontMatter.date), "MMMM do, uuu")}
          </div>
        </div>
        <div className="prose">
          <MDXRemote className="prose" {...source} />
        </div>
      </main>
    </div>
  );
}

export async function getStaticProps(context) {
  const { params } = context;
  const allPosts = getAllPosts();
  const { data, content } = allPosts.find((blog) => blog.slug === params.slug);
  const mdxSource = await serialize(content);

  return {
    props: {
      source: mdxSource,
      frontMatter: data,
    },
  };
}

export async function getStaticPaths() {
  const allPosts = getAllPosts();

  const res = {
    paths: allPosts.map((blog) => ({
      params: { slug: blog.slug },
    })),
    fallback: false,
  };

  return res;
}
