import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { champions, featuredArticles } from "../../../content/site";

export async function GET() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return NextResponse.json({ champions, articles: featuredArticles, source: "local" });
  const supabase = createClient(url, key);
  const [{ data: dbChampions, error: championError }, { data: dbArticles, error: articleError }] = await Promise.all([
    supabase.from("champions").select("slug,name,en,role,tag,color").order("name"),
    supabase.from("articles").select("slug,category,title,published_at,tone,visual").eq("is_published", true).order("published_at", { ascending: false }).limit(3)
  ]);
  if (championError || articleError || !dbChampions?.length || !dbArticles?.length) return NextResponse.json({ champions, articles: featuredArticles, source: "local" });
  return NextResponse.json({ champions: dbChampions, articles: dbArticles.map((article) => ({ ...article, date: article.published_at.replaceAll("-", ".") })), source: "supabase" });
}
