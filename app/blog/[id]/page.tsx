import Link from "next/link";
import { notFound } from "next/navigation";

import { BLOG_ENDPOINT, getMicroCMSClient, isMicroCMSConfigured } from "../../_lib/microcms";
import type { Blog } from "../../_types/microcms";
import styles from "../blog.module.css";

export const revalidate = 60;

function formatDate(iso: string | undefined) {
  if (!iso) return "";
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return "";
  return new Intl.DateTimeFormat("ja-JP", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(date);
}

type PageProps = {
  params: Promise<{ id: string }>;
};

export async function generateStaticParams() {
  const client = getMicroCMSClient();
  if (!client) return [];

  const data = await client.getList<Pick<Blog, "id">>({
    endpoint: BLOG_ENDPOINT,
    queries: {
      fields: ["id"],
      limit: 50,
    },
  });

  return data.contents.map((c) => ({ id: c.id }));
}

export default async function BlogDetailPage({ params }: PageProps) {
  const { id } = await params;

  if (!isMicroCMSConfigured()) {
    return (
      <main className={styles.page}>
        <header className={styles.header}>
          <div>
            <h1 className={styles.title}>Blog</h1>
            <p className={styles.sub}>microCMSを接続すると記事が表示されます。</p>
          </div>
          <Link href="/blog" className={styles.back}>
            ← Blog
          </Link>
        </header>
        <div className={styles.notice}>
          <p>
            環境変数が未設定です。プロジェクト直下に <span className={styles.code}>.env.local</span> を作成して
            次を設定してください。
          </p>
          <p className={styles.code}>MICROCMS_SERVICE_DOMAIN=xxxx</p>
          <p className={styles.code}>MICROCMS_API_KEY=xxxxxxxx</p>
        </div>
      </main>
    );
  }

  const client = getMicroCMSClient();
  if (!client) {
    return null;
  }

  let post: Blog;
  try {
    post = await client.getListDetail<Blog>({
      endpoint: BLOG_ENDPOINT,
      contentId: id,
    });
  } catch {
    notFound();
  }

  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <div>
          <h1 className={styles.title}>{post.title}</h1>
          <p className={styles.sub}>{formatDate(post.publishedAt ?? post.createdAt)}</p>
        </div>
        <Link href="/blog" className={styles.back}>
          ← Blog
        </Link>
      </header>

      <article
        className={styles.article}
        dangerouslySetInnerHTML={{ __html: post.content }}
      />
    </main>
  );
}
