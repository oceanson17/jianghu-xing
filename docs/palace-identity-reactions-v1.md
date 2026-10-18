# 青梧宮廷・身份／品級反應系統 v1

## 目標
NPC（含 DeepSeek AI）按玩家**仕途身份、品級、服侍對象、朝廷威望、宮熱／善惡、權貴好感**改變語氣與待遇；離線模式有腳本 fallback。任務池大幅擴充，獎賞按身份區分。

## IP
僅用景安帝／青梧宮等致敬名；禁康熙、金庸真名。太監線寫意、無血腥細描。

## 身份權力分（courtPowerScore 0–100）
| 來源 | 計分 |
|------|------|
| 文／武 pin | 九品≈10 → 一品≈85 |
| 太監 grade | 1→8，2→20，3→40，4→65，5→85 |
| 宮女 grade | 1→10 … 5→75 |
| 服侍權貴 | 景安帝＋18，貴妃／假太后＋12，郡主＋8，姑姑＋4 |
| 帝心／權貴好感≥60 | 各＋8～12（「靠山」） |
| 宮熱≥40 | －10（物議；低階更易被辱） |
| 善惡極惡 | 廠衛／獄吏另眼；清流更惡 |

## 反應檔位（stance）
| stance | 觸發概要 | 表現 |
|--------|----------|------|
| scorn | 低階太監／白身入禁；對清流／武將 | 嘲笑、趕人、拒助 |
| snub | 宮女低階、未入流文／武 | 愛理不理、任務鎖 |
| neutral | 中階或江湖人不知底細 | 平常 |
| deference | 五品以上官／高階女官 | 稱職名、讓路 |
| flattery | 高階太監（≥4）對朝官／侍衛 | 賠笑、送禮、不敢得罪 |
| fear | 領侍級太監／東廠近側／三品議政 | 噤聲、主動示好 |
| protect | 靠山好感高時第三方 | 願作證、擋災、降監禁風險 |
| bribe_offer | 高權＋對方貪婪／有求 | 塞好處換辦事 |

## AI 注入（DeepSeek）
`aiNpcInteract` system prompt 追加區塊：
- track／職名／品級數字／分殿／serveTarget／威望／帝心／宮熱／善惡
- 本 NPC 應採 stance 與「勿用真實清帝名」
- 行為建議：scorn→rebuke／hostile；flattery／fear→gift／help／follow；protect→help／parole

`contextBlob` 增：`courtTrack, courtRank, courtPinApprox, courtPrestige, serveTarget, eunuchHall, courtPower`

## 離線 fallback
`offlineTalk`／`offlineInteract` 經 `identityAwareGreeting`／`applyIdentityOfflineTone` 改寫開場與 behavior（低太監易 rebuke；高太監易 gift）。

## 非對話待遇
| 系統 | 效果 |
|------|------|
| 商店 shopPrice | 宮內店：高階／高太監額外折扣；低太監加價；靠山好感再折 |
| 任務池 | tracks＋`minGrade`／`maxPin`／`needPower` 過濾 |
| 戰鬥協助 | 高權／靠山：NPC 更願 help；scorn 對手更易 hostile |
| 監禁風險 | 低階太監／高宮熱＋10% 被抓；高階／服侍帝 －25%；protect 可 parole 暗示 |

## 任務擴充原則
每 track ≥8 條專屬＋共用雜役；dirty 單給高金／威望但扣俠義加宮熱。
獎賞類型：銀兩、威望、裝備、宮賞（如意／錦袍／腰牌）、職位機會（破格提示）、好感。

## 劇情節拍
1. 無品太監入御膳房 → 被嘲「半個人」
2. 升至宮殿監副侍 → 廊下官員改口「公公」並塞薄禮
3. 三品上殿議政 → 成敗改帝心／威望／御史視線
4. 服侍貴妃且好感高 → 外廷對你 snub→deference
5. 拒／受好處交易 → 記恨或人情鏈

## 自測
1. 入太監籍低階 → 與韋小舟／霍鎮北對話見藐視語氣
2. cheat 升 grade5 → 同 NPC 變巴結／送禮
3. 領專屬任務交付見宮賞道具
4. 無 DeepSeek 仍見腳本身份語氣

## AI → 真實狀態突變（強制）

NPC／DeepSeek 判定**不可只改對白**。回覆 JSON 可帶 `courtActions[]`（或 legacy `actions[]`），經 `applyCourtAiAction`／`applyNpcMutation` 寫入存檔並 `saveGameSilent`＋`render`。

### 允許 action 類型
| type | 效果（呼叫既有 mutator） |
|------|--------------------------|
| promote | `bumpCourtPrestige` 或升 `courtPin`／`courtGrade` 一階（限 AI 建議＋本地校驗） |
| demote_heat | `bumpPalaceHeat`＋可選降威望 |
| gift_item | `addItem(id,n)`（白名單宮賞／常用 consumable） |
| take_gold / give_gold | 改 `S.gold` |
| favor_delta | `datingAff[npc]` 或 `bumpEmperorFavor` |
| karma_delta | `adjustKarma` |
| scorn | favor－、trust－、可 `setFlag` 拒服侍 |
| flattery_gift | favor＋、可 gift_item、記 `courtNpcDiscount` |
| open_quest | 啓用 `courtQuests[id]`（須在 COURT_QUESTS） |
| deny_quest | 標記今日拒給／toast |
| imprison | 走既有關押入口（寫意） |
| assign_hall | `assignEunuchHall` |
| set_serve | 設／清 `serveTargetId`（校驗品級） |
| pending_deal | 塞 `pendingDeal` |
| shop_discount | `S.courtShopDisc` 臨時折扣 |
| prestige | `bumpCourtPrestige` |

### 協議示例
```json
{
  "say": "……公公萬安。",
  "behavior": "gift",
  "courtActions": [
    {"type":"flattery_gift","item":"palace_silk","n":1,"favor":2},
    {"type":"shop_discount","pct":8,"days":3}
  ],
  "memoryNote":"巴結高階太監"
}
```

離線 fallback 同樣走 `applyCourtAiAction`（身份 stance 推導 actions），保證無 API key 亦改狀態。
