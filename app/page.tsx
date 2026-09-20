"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { champions as fallbackChampions, featuredArticles as fallbackArticles, tierGroups } from "../content/site";

type Champion = { slug: string; name: string; en: string; role: string; color: string; tag: string };
type FeaturedArticle = { slug: string; category: string; title: string; date: string; tone: string; visual: string };

const roles = [
  ["TOP", "孤立レーンで勝つ。タンク・ファイターの基礎。", "#d0a85d"],
  ["JG", "試合を動かす。ルートとガンクの判断。", "#73a58a"],
  ["MID", "中央から主導権を握る。ロームの基本。", "#aa7abd"],
  ["ADC", "集団戦の火力源。安全な立ち位置。", "#d97b70"],
  ["SUP", "味方を支える。視界とエンゲージ。", "#689bb2"]
];

function Icon({ children }: { children: React.ReactNode }) { return <span aria-hidden="true" className="icon">{children}</span>; }

export default function Home() {
  const [query, setQuery] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const [champions, setChampions] = useState<Champion[]>([...fallbackChampions]);
  const [featuredArticles, setFeaturedArticles] = useState<FeaturedArticle[]>([...fallbackArticles]);
  useEffect(() => { fetch("/api/content").then((response) => response.ok ? response.json() : null).then((content) => { if (content?.champions) setChampions(content.champions); if (content?.articles) setFeaturedArticles(content.articles); }).catch(() => undefined); }, []);
  const results = useMemo(() => champions.filter((c) => `${c.name}${c.en}${c.role}`.toLowerCase().includes(query.toLowerCase())), [champions, query]);
  const structuredData = { "@context": "https://schema.org", "@type": "WebSite", name: "RIFT NOTE", url: "https://rift-note.jp", potentialAction: { "@type": "SearchAction", target: "https://rift-note.jp/search?q={search_term_string}", "query-input": "required name=search_term_string" } };
  return <>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
    <header className="site-header">
        <Link className="brand" href="/"><span>RIFT</span> NOTE<small>LEAGUE OF LEGENDS GUIDE</small></Link>
      <nav className={menuOpen ? "open" : ""} aria-label="メインナビゲーション">
        <Link href="/champions">チャンピオン</Link><Link href="/roles">ロール別攻略</Link><Link href="/articles">攻略記事</Link><Link href="/beginner">初心者ガイド</Link><Link href="/tier-list">ティアリスト</Link>
      </nav>
      <button className="menu-button" onClick={() => setMenuOpen(!menuOpen)} aria-label="メニューを開く">☰</button>
      <button className="search-button" aria-label="サイト内検索"><Icon>⌕</Icon></button>
    </header>
    <main id="top">
      <section className="hero">
        <div className="hero-grid" />
        <div className="hero-copy">
          <p className="eyebrow">LEAGUE OF LEGENDS 攻略</p>
          <h1>LoL攻略を、<br /><em>わかりやすく。</em></h1>
          <p className="hero-text">チャンピオンの選び方、ロールごとの基本、初心者向けの攻略を<br className="desktop" />必要な順番でまとめています。</p>
          <div className="hero-links"><a className="primary-button" href="#beginner">初心者ガイド <span>→</span></a><a href="#champions">チャンピオンを探す</a></div>
        </div>
      </section>

      <section className="section latest" id="articles">
        <div className="section-heading"><div><p className="eyebrow">WHAT'S NEW</p><h2>最新の攻略記事</h2></div><Link href="/articles" className="more">すべて見る <span>→</span></Link></div>
        <div className="article-grid">
          {featuredArticles.map((article) => <Link className="article-card" href={`/articles/${article.slug}`} key={article.title}><div className={`article-visual ${article.tone}`}><span>{article.visual}</span></div><div className="article-info"><p>{article.category}</p><h3>{article.title}</h3><time>{article.date}</time></div></Link>)}
        </div>
      </section>

      <section className="champion-section" id="champions"><div className="section champion-inner">
        <div className="section-heading"><div><p className="eyebrow">CHAMPION FINDER</p><h2>チャンピオンを探す</h2></div><Link href="/champions" className="more">一覧を見る <span>→</span></Link></div>
        <div className="finder"><label htmlFor="champion-search">⌕</label><input id="champion-search" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="チャンピオン名・ロールで検索" /><kbd>⌘ K</kbd></div>
        <div className="champion-list">{results.length ? results.map((c) => <Link className="champion" href={`/champions/${c.slug}`} key={c.en}><div className="portrait" style={{ background: `linear-gradient(135deg, ${c.color}, #151b27)` }}><b>{c.en.slice(0, 1)}</b></div><strong>{c.name}</strong><span>{c.role}</span></Link>) : <p className="empty">該当するチャンピオンが見つかりません。</p>}</div>
      </div></section>

      <section className="section" id="roles"><div className="section-heading"><div><p className="eyebrow">BY ROLE</p><h2>ロール別攻略</h2></div><Link href="/roles" className="more">ロール一覧 <span>→</span></Link></div><div className="role-grid">{roles.map(([role, description, color]) => <Link href={`/roles/${role === "TOP" ? "top" : role === "JG" ? "jungle" : role.toLowerCase()}`} className="role-card" key={role} style={{ "--role": color } as React.CSSProperties}><span className="role-line" /><h3>{role}</h3><p>{description}</p><b>攻略を見る →</b></Link>)}</div></section>

      <section className="beginner" id="beginner"><div><p className="eyebrow">FOR BEGINNERS</p><h2>はじめての<br /><em>League of Legends</em></h2><p>「何から始めればいい？」に答える、LoL入門ガイドです。</p><Link className="outline-button" href="/beginner">ガイドをはじめる <span>→</span></Link></div><ol className="beginner-steps"><li><span>01</span>ゲームの目的を知る</li><li><span>02</span>好きなロールを選ぶ</li><li><span>03</span>最初のチャンピオンを決める</li></ol></section>

      <section className="section tier" id="tier"><div className="tier-copy"><p className="eyebrow">CHAMPION GUIDE</p><h2>おすすめチャンピオン</h2><p>ロール・難易度・プレイスタイルから、自分に合う一体を探せます。</p><Link className="more" href="/tier-list">一覧を見る <span>→</span></Link></div><div className="tier-list">{tierGroups.map((group) => <div key={group.tier}><b>{group.tier}</b><span>{group.champions}</span></div>)}</div></section>
    </main>
    <footer><Link className="brand" href="/"><span>RIFT</span> NOTE</Link><p>League of Legends 攻略情報サイト</p><div><Link href="/about">運営者情報</Link><Link href="/privacy">プライバシーポリシー</Link><Link href="/contact">お問い合わせ</Link></div><small>© 2026 RIFT NOTE. League of Legends and Riot Games are trademarks of Riot Games, Inc.</small></footer>
  </>;
}
