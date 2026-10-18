# AI 劇情自由度 v13（2026-10-18）

## 目標
接入 DeepSeek 後，劇情由 AI **真推演**並寫回存檔；無 Key 時離線導演仍可用。

## 設定 UX
- 路徑：標題／角色頁「DeepSeek 設定」
- 欄位：API Key、Base URL、模型（Pro／Flash）、思考模式（自動／開／關）、劇情自由度（穩健／高／沙盤）、羈絆主動來信
- 「測試連線」：發短 ping；失敗可繼續離線
- Key 只存本機 `localStorage`（`jianghu_walk_settings_v1`）

## 自由度與狀態突變
AI 可輸出 `worldActions`／`courtActions`（白名單），本地套用：
- `open_branch`／`side_hook`／`spawn_event`（含選肢）
- `move_npc`／`summon_here`／`recall_npc`
- `set_flag`（僅 `ALLOWED_FLAGS`）／`unlock_map`
- `favor_delta`／`gift`／`gold`／`renown`／`alter_quest`／升官等（沿用宫廷 `applyCourtAiAction`）

場景無人時：自由輸入走 **世界導演**（AI 或離線關鍵字）。
地圖可開【劇情板】AI 支線。

## 主動聯繫
戀人線沿用；另加深羈絆（結義／師徒等）來信，高自由度可召喚到場。

## 自測
`node scripts/autorun_v13_headless.js` → `window.__JH_AUTORUN_V13()`

## 致敬
景安／青梧原創名；禁真實清帝號與金庸原名。
