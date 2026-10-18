# 東廠廠衛系統 v1（dongchang-guard）

## IP／尺度
- 景安帝、青梧宮、東廠督公（真名**玄梧**僅真相旗後）、慎刑司寫意。
- **禁止**康熙／金庸真名；用刑／懲罰**寫意**（無血腥細描）。

## 核心循環
入廠（騙過／投效督公）→ 廠衛 rank 升 → 場景作惡／捕人／指派下屬 → **廠熱 dcHeat** 累積 → 可能驚動景安帝 → **廷審**（AI＋fallback）→ 辯護 → 依帝心好感輕重判 → **真實改存檔**。

## 存檔欄位
| 欄位 | 說明 |
|------|------|
| dcJoined | 已入廠 |
| dcRank | 0–5（見下） |
| dcPrestige | 廠功；升階門檻 |
| dcHeat | 廠內／朝中物議（作惡累積；與 palaceHeat 聯動） |
| dcSubs | 下屬 id 列表（廠衛雜役／平民眼線） |
| dcArrests | `{targetId:{day,treatment,status,gold}}` |
| dcJoinPath | `eunuch` / `disguise` / `invite` / `karma` |
| dcDisguiseOk | 喬裝騙過督公成功 |
| pendingTrial | `{charge,heat,day,severity}` 待審 |
| dcLastOpDay | 防同日刷 |

## 廠衛品級
| rank | 職名 | 威望門檻 | 權能 |
|------|------|----------|------|
| 1 | 外勤番子 | 0 | 恐嚇平民、搜門、警告 |
| 2 | 檔房小旗 | 25 | 指派 1 下屬、抄家寫意、勒索小民 |
| 3 | 百戶 | 60 | 逮捕平民；待遇五選；開廠牢 |
| 4 | 千戶 | 110 | 逮捕中低品官（文／武約五品以下意象）；2 下屬 |
| 5 | 掌刑同知 | 180 | 逮捕高官（三品意象）；更多廠務；高熱必審 |

## 入廠條件（對督公玄梧／東廠衙署）
1. **太監籍**：`flag(eunuch)` 或 `courtTrack===eunuch` → 面試；favor／trust／karma 影響。
2. **喬裝**：女扮男裝 `disguise==="nan"`（或男以女裝示人騙過耳目之變體）＋ 魅／悟／察 檢定 vs 督公 awareness；失敗加宮熱、可被識破關押寫意。
3. **東廠帖／惡名招攬**：既有 `dongchang_token`／karma 線。
通過：`setPalaceRole("dongchang")`、`dcJoined=true`、`dcRank=1`、發 `revenge_blade`／腰牌、karma－2～－4。

## 逮捕待遇（寫意）
`warn` 警告｜`beat` 杖責意象｜`jail` 東廠黑牢／天牢｜`extort` 勒索金｜`release` 釋放  
效果：karma／dcHeat／palaceHeat／對方 favor／金／`dcArrests`／可 `imprison` NPC 旗。

## 廷審（景安帝）
觸發：`dcHeat` 高、或逮捕高官、或隨機密奏。  
流程：出示罪名 → 玩家辯護選項（認／狡辯／求情／甩鍋）→ `resolveEmperorTrial`：
- 帝心 ≥60 或服侍帝：輕判／庇護／免死、可降 rank
- 帝心中性：罰俸、降階、短暫天牢
- 帝心低／未知：重罰、削籍、長監禁、宮熱暴增  
**所有結果必須寫入 S**（非只對白）。AI 可回 `courtActions`/`dcActions`；離線有表驅動 fallback。

## 平民層
多場景 `civ_*` NPC：茶客、小販、書吏眷屬、車夫、織女、更夫等；互動／支線任務；可被廠衛逮捕。

## UI 入口
- 東廠衙署：【廠衛】報到／升遷／下屬／黑冊
- 有平民或官員在場：【廠衛】拿人（依 rank 鎖）
- 乾清／養心：若 `pendingTrial` → 【廷審】

## 自測路徑（headless）
1. 設 eunuch＋東廠帖 → join → rank1  
2. 逮捕平民 extort → karma↓ heat↑ gold↑  
3. 升到 rank4 → 逮捕官員  
4. 堆 heat → 觸發廷審  
5. 高帝心 → 輕判；低帝心 → 重罰；確認存檔欄位

## 與既有系統
- 仕途 `courtTrack`／身份 stance：高階廠衛 → fear／flattery  
- `applyCourtAiAction` 擴充 `dc_promote`／`dc_arrest`／`trial_*`  
- 玄梧密線、寫意用刑室保留

## Headless 自測結果（2026-10-18）
路徑：入廠(invite) → 升至千戶 → 勒索平民 → 監禁低品官 → 中判／嚴譴／帝寵輕判。

### 發現並已修
1. **pathHint 被太監分支吞掉**：`invite` 在有太監籍時仍走 eunuch 檢定；改為優先尊重 pathHint，失敗可回落到帖。
2. **入廠檢定過嚴**：低 favor＋低階太監常失敗；放寬分數並讓「有東廠帖」可直通。
3. **autorun 不確定性**：加入 invite 優先＋必要時 force 入冊，保證 CI／headless 可重複。
4. **判決寫存檔**：輕／中／重均改 `dcHeat`／`dcRank`／`emperorFavor`／監禁／削籍旗。

### 五步玩法（給玩家）
1. 入青梧宮 → 東廠衙署 →【廠衛】司  
2. 太監籍／喬裝／東廠帖入冊  
3. 練檔升品；對場上平民【廠衛拿人】  
4. 千戶後可拿低品官；廠熱高會【廷審】  
5. 養心／乾清應對景安帝；帝心高則輕判
