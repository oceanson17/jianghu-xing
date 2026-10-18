# 身份禮數／態勢系統 v1（Status Etiquette）

## 與 palace-identity-reactions-v1 關係
本檔補強：**DeepSeek 必收 statusDelta**、高位 NPC 對低階**拒／罰**一致性、帝后問候（賜坐／免禮／冷眼）。

## statusDelta
`statusDeltaForPrompt(npcId)` 組成字串，注入：
- `courtIdentityPromptBlock`（system）
- `aiNpcInteract` 的 `userObj.statusDelta`

含：權勢分、stance、出身、投胎世數、前世業殘響；高位對低階時加【上對下】指令。

## 帝后／貴人問候
`isImperialSuperiorNpc`（throne／harem）：開場用 **冷眼／免禮／賜坐**，禁止「見過女官」式反拜。

## 高位拒罰（離線＋建議 AI）
`stanceDerivedActions`：
- scorn + 高位 + 玩家權勢&lt;40 → `deny_quest`、`demote_heat`，機率 `punish`（廷杖／罰銀）或 `imprison`
- snub + 高位低權 → 更常 `deny_quest`

`applyCourtAiAction` 新增 **`punish`** → `applyPalacePunishment`。

## AI 協議補充
courtActions 可含：`punish` | `deny_quest` | `imprison` | `demote_heat` | `scorn`…  
高位對低階：**禁止無故巴結**；應可拒差、嘲諷、罰跪／軟刑、關押。

## 自測
1. 白身／低階宮女見沈貴妃 → 冷眼／免禮（非見過女官）
2. scorn 離線互動 → courtActions 含 deny／heat／punish
3. DeepSeek user 物件含 `statusDelta` 與 `courtIdentity.birthLabel`
