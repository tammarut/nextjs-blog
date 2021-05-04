import Head from "next/head";
import { format, parseISO, add } from "date-fns";

import { blogPosts } from "../../lib/data";

export default function BlogPage({ title, date, content }) {
   return (
      <div>
         <Head>
            <title>{title}</title>
            <meta name="description" content="Generated by create next app" />
            <link rel="icon" href="/favicon.ico" />
         </Head>

         <main>
            <div className="border-b-2 border-gray-200 mb-4">
               <h1 className="text-2xl font-bold">{title}</h1>
               <div className="text-gray-400 text-sm">
                  {format(parseISO(date), "MMMM do, uuu")}
               </div>
            </div>
            <div>{content}</div>
         </main>
      </div>
   );
}

export async function getStaticProps(context) {
   const { params } = context;
   return {
      props: blogPosts.find((blog) => blog.slug === params.slug),
   };
}

export async function getStaticPaths() {
   const res = {
      paths: blogPosts.map((blog) => ({
         params: { slug: blog.slug },
      })),
      fallback: false,
   };

   return res;
}
