# 名聲／朝廷威望體系 v23（退役宮熱）

## 變更
- **退役「宮熱」`palaceHeat`**：不再顯示、不再累積；舊存檔自動遷移。
- **名聲 `renown`**：公開形象。做好事／俠名 ↑；敗壞清譽／惡名外傳 ↓。由 AI `renown`／`fame` 突變，或舊 `heat`／`demote_heat` 折算。
- **NPC 好感**：部分行為會傷特定人好感（`favor_delta`／`bumpNpcFavor`）。
- **朝廷威望 `courtPrestige`**：宮中當差得失；AI `prestige`／`court_prestige`。
- **物議指數**（內部 `v23TroubleScore`）：由低名聲、惡業、低帝心推算，取代舊宮熱刑罰門檻。

## 遷移
舊 `palaceHeat` → 扣名聲（高熱另扣朝廷威望），然後清零；旗標 `v23_heat_migrated`。

## AI
`courtActions`／`worldActions`：`renown`、`prestige`、`favor_delta`；舊 `demote_heat`／`heat` 仍相容（折算扣名聲，宮內兼扣威望）。

## 自測
`node scripts/autorun_v23_headless.js`

## Pages
https://oceanson17.github.io/jianghu-xing/
