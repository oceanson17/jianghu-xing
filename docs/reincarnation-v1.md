# 投胎轉世系統 v1

## 目標
玩家**身死**（問斬／凌遲等致死刑、宮牆高熱戰敗、`fatalOnLose` 戰鬥等）不硬鎖檔，改走 **中陰 → 投胎**，以新出身重開可玩線。致敬架空（景安／青梧）；禁真實清帝名與金庸真名。

## 觸發
| 來源 | 條件 |
|------|------|
| `applyPalacePunishment` lethal | `opts.fatal` 或 `palaceHeat≥85` 且閃避失敗 → `triggerPlayerDeath` |
| `endCombat(false)` | `combat.fatalOnLose`／`lethalOnLose`，或 `palaceHeat≥80` 且地點在宮／廠／刑場帶 |
| 讀檔 | `S.pendingRebirth` 存在 → `openRebirthUI` |

## 出身（BIRTH_BACKGROUNDS）
**v12**：首世僅 `firstLife` 平民；精英出身見投胎後。詳 `birth-complexity-v12.md`。

皇子、公主、官員子弟、商戶、乞丐、江湖孤兒、邊軍、宮女種子、內侍種子、綠林草莽。  
各含：性別偏向、起始地、金錢、屬性 mods、flags、仕途 track／品級種子、起始物、短敘事。

## 存檔欄位（saveVer≥9）
- `birthId` / `birthLabel`
- `reincarnationCount`
- `pastKarmaEcho`（前世善惡 ×0.35 帶入）
- `pastLives[]`（摘要：名、因、善惡、出身）
- `pendingRebirth`（待選出身）

## UI
1. 身死記事 → **投胎轉世**
2. 聽天由命（隨機）或 **自選出身**
3. 創角畫面亦可選出身（與投胎共用表）
4. 角色頁顯示「出身 · 第N世 · 業殘響」

## 業力殘響
新世 `karma` 初值＝前世 karma×0.35；敘事提示善念／惡業未消。不保留宮職、東廠、羈絆、背包（除出生包）；姓名可保留作殘影。

## 自測
`node scripts/autorun_rebirth_headless.js` → `window.__JH_AUTORUN_REBIRTH()`：問斬→孤兒→再死→皇子。
