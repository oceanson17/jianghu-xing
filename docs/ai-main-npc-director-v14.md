# AI 主線／NPC 導演 v14（2026-10-18）

## Bugfix
- 【劇情板】AI 支線無反應：地圖按鈕綁定用 `a.fn`，v13 卻註冊 `run` → `onclick` 為 undefined。
- 已改：按鈕同時帶 `fn`／`run`；核心渲染改為 `a.fn || a.run`；劇情板包 try/catch。

## 主線推演
worldActions 新增：
- `advance_main`／`main_step`／`push_main`：推進 `main`／`main2`／`main3`（每回合最多 +1 步，並寫相關旗標）
- `main_hint`：寫入 `S.aiMainHint`（不硬跳關）
- 禁一次 `done`（除非沙盤 + force）

劇情板新增「請 AI 推演主線」「請 AI 生事／挪人」。

## NPC 行為
- `npc_quest`：開真實任務入 `S.quests`
- `npc_speak`：排隊旁白（`pendingNpcLine`）
- `npc_agenda`：行程＋可 `move_npc`
- 日更／旅行機率觸發 `aiNpcDirectorTick`
- 與 NPC 對話提及主線／委託時，可自動出 worldActions

## 自測
`node scripts/autorun_v14_headless.js`

## 致敬
景安／青梧原創名；禁真實清帝號與金庸原名。
