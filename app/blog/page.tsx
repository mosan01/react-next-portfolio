import Link from "next/link";

import { BLOG_ENDPOINT, getMicroCMSClient, isMicroCMSConfigured } from "../_lib/microcms";
import type { Blog } from "../_types/microcms";
import styles from "./blog.module.css";

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

export default async function BlogIndexPage() {
  if (!isMicroCMSConfigured()) {
    return (
      <main className={styles.page}>
        <header className={styles.header}>
          <div>
            <h1 className={styles.title}>Blog</h1>
            <p className={styles.sub}>microCMSを接続すると記事が表示されます。</p>
          </div>
        </header>

        <div className={styles.notice}>
          <p>
            環境変数が未設定です。プロジェクト直下に <span className={styles.code}>.env.local</span> を作成して
            次を設定してください。
          </p>
          <p className={styles.code}>MICROCMS_SERVICE_DOMAIN=xxxx</p>
          <p className={styles.code}>MICROCMS_API_KEY=xxxxxxxx</p>
          <p style={{ marginTop: "0.75rem", opacity: 0.8 }}>
            ※ エンドポイント名は <span className={styles.code}>{BLOG_ENDPOINT}</span> を想定しています。
          </p>
        </div>
      </main>
    );
  }

  const client = getMicroCMSClient();
  if (!client) {
    return null;
  }

  const data = await client.getList<Blog>({
    endpoint: BLOG_ENDPOINT,
    queries: {
      fields: ["id", "title", "description", "publishedAt", "createdAt"],
      orders: "-publishedAt",
      limit: 20,
    },
  });

  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <div>
          <h1 className={styles.title}>Blog</h1>
          <p className={styles.sub}>制作メモ・学び・記録。</p>
        </div>
      </header>

      <div className={styles.list}>
        {data.contents.map((post) => (
          <Link key={post.id} href={`/blog/${post.id}`} className={styles.card}>
            <div className={styles.meta}>{formatDate(post.publishedAt ?? post.createdAt)}</div>
            <div className={styles.cardTitle}>{post.title}</div>
            {post.description ? <div className={styles.desc}>{post.description}</div> : null}
          </Link>
        ))}
      </div>
    </main>
  );
}
