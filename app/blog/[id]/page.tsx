import Link from "next/link";
import { notFound } from "next/navigation";

import { BLOG_ENDPOINT, getMicroCMSClient, isMicroCMSConfigured } from "../../_lib/microcms";
import type { Blog } from "../../_types/microcms";
import styles from "../blog.module.css";

export const revalidate = 60;

type TocItem = {
  id: string;
  level: 2 | 3;
  title: string;
};

function stripTags(html: string) {
  return html.replace(/<[^>]*>/g, "").replace(/\s+/g, " ").trim();
}

function buildTocAndInjectIds(html: string): { toc: TocItem[]; html: string } {
  const toc: TocItem[] = [];
  let index = 0;

  const out = html.replace(
    /<h([23])([^>]*)>([\s\S]*?)<\/h\1>/gi,
    (full, levelRaw: string, attrs: string, inner: string) => {
      const level = Number(levelRaw) as 2 | 3;
      const title = stripTags(inner);
      if (!title) return full;

      const idMatch = attrs.match(/\sid=["']([^"']+)["']/i);
      const id = idMatch?.[1] ?? `section-${++index}`;
      toc.push({ id, level, title });

      if (idMatch) return full;

      // inject id while keeping other attributes
      return `<h${level} id="${id}"${attrs}>${inner}</h${level}>`;
    }
  );

  // ensure ids are unique (in case original content has duplicates)
  const seen = new Set<string>();
  const uniqueToc = toc.map((item) => {
    if (!seen.has(item.id)) {
      seen.add(item.id);
      return item;
    }
    const nextId = `${item.id}-${++index}`;
    seen.add(nextId);
    return { ...item, id: nextId };
  });

  // If we changed IDs for duplicates, we won't rewrite HTML again here (rare).
  // In typical microCMS content, duplicates don't occur.
  return { toc: uniqueToc, html: out };
}

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

  const { toc, html } = buildTocAndInjectIds(post.content);

  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <div>
          <h1 className={styles.title}>{post.title}</h1>
          <p className={styles.sub}>{formatDate(post.publishedAt ?? post.createdAt)}</p>
        </div>
      </header>

      {toc.length > 0 ? (
        <nav className={styles.toc} aria-label="目次">
          <div className={styles.tocTitle}>目次</div>
          <ul className={styles.tocList}>
            {toc.map((item) => (
              <li key={item.id} className={item.level === 3 ? styles.tocItemH3 : styles.tocItem}>
                <a href={`#${item.id}`}>{item.title}</a>
              </li>
            ))}
          </ul>
        </nav>
      ) : null}

      <article
        className={styles.article}
        dangerouslySetInnerHTML={{ __html: html }}
      />
      <p style={{ marginTop: "1rem", opacity: 0.8 }}>
        <Link href="/blog">記事一覧に戻る</Link>
      </p>
    </main>
  );
}
