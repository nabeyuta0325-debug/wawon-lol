// 運営用の直接入力データです。チャンピオン、記事、ティアリストはここを書き換えて更新します。
// APIキーや外部サービスは不要です。
export const champions = [
  { slug: "ahri", name: "アーリ", en: "Ahri", role: "MID", color: "#b83a61", tag: "メイジ" },
  { slug: "garen", name: "ガレン", en: "Garen", role: "TOP", color: "#687b45", tag: "ファイター" },
  { slug: "lee-sin", name: "リー・シン", en: "Lee Sin", role: "JG", color: "#9a5a3c", tag: "ファイター" },
  { slug: "jinx", name: "ジンクス", en: "Jinx", role: "ADC", color: "#5e5aaa", tag: "マークスマン" },
  { slug: "lulu", name: "ルル", en: "Lulu", role: "SUP", color: "#7a4d9b", tag: "サポート" },
  { slug: "yasuo", name: "ヤスオ", en: "Yasuo", role: "MID", color: "#446f82", tag: "ファイター" }
] as const;

export const featuredArticles = [
  { slug: "lol-basics-10", category: "初心者ガイド", title: "LoLを始めたら最初に覚えたい10のこと", date: "2026.09.18", tone: "gold", visual: "✦" },
  { slug: "choose-your-role", category: "ロール攻略", title: "初心者向け｜自分に合うロールの選び方", date: "2026.09.16", tone: "blue", visual: "ROLE" },
  { slug: "ahri-guide", category: "チャンピオン", title: "アーリの立ち回りとコンボ｜初心者向け完全ガイド", date: "2026.09.15", tone: "pink", visual: "AHRI" }
] as const;

export const articles = [
  { ...featuredArticles[0], author: "RIFT NOTE 編集部", lead: "最初の数試合を楽しむために、ゲームを始める前に知っておきたい基本をまとめました。", sections: [{ heading: "1. 勝利条件を知ろう", text: "相手チームのネクサスを破壊すると勝利です。ミニオンを倒してゴールドを集め、アイテムを購入して強くなります。" }, { heading: "2. 最初は一つのロールに絞る", text: "慣れるまでは、操作がわかりやすいチャンピオンを選び、一つのロールを続けるのがおすすめです。" }, { heading: "3. 負けても学びを一つ残す", text: "試合後は、デスした場面や視界が足りなかった場所を一つだけ振り返りましょう。" }] },
  { ...featuredArticles[1], author: "RIFT NOTE 編集部", lead: "5つのロールにはそれぞれ異なる役割があります。自分の得意な遊び方から選んでみましょう。", sections: [{ heading: "TOPは1対1を楽しみたい人向け", text: "耐久力のあるチャンピオンで、レーンを押し引きする楽しさがあります。" }, { heading: "MIDは試合全体に関わりたい人向け", text: "中央から他レーンへ移動し、試合を動かす役割です。" }, { heading: "SUPは味方を助けたい人向け", text: "視界づくりや集団戦の開始で、チームを支えます。" }] },
  { ...featuredArticles[2], author: "RIFT NOTE 編集部", lead: "アーリを初めて使う人向けに、スキルの使い方と集団戦で意識することをまとめます。", sections: [{ heading: "スキルの基本", text: "Eで相手を魅了してからQを当てると、ダメージを出しやすくなります。" }, { heading: "レーニングで意識すること", text: "無理にキルを狙わず、ミニオンを倒して経験値とゴールドを安定して得ましょう。" }, { heading: "集団戦の立ち位置", text: "前に出すぎず、相手の重要なスキルを確認してから入ると安全です。" }] }
] as const;

export const tierGroups = [
  { tier: "S", champions: "アーリ　ジャックス　ジンクス" },
  { tier: "A", champions: "オリアナ　ヴァイ　レオナ" },
  { tier: "B", champions: "ガレン　エズリアル　ルル" }
] as const;
