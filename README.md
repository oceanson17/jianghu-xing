# 江湖行 · 像素 Q 版

手機 Safari／Chrome 可玩的原創武俠沙盤 RPG（致敬群俠傳玩法，原創人物門派）。

## 視覺
- 等距像素大地圖 `assets/worldmap.jpg`
- 場景橫幅：城門／亭居
- Q 版立繪 `chibi-cast.jpg`（NPC 頭像／對話／戰鬥）
- 木石金暖色 UI、粗邊框像素感

## 玩法
- 地圖／門派／戰鬥／裝備／主支線／命運分支
- 自由輸入說話／行動 + 意圖快捷 chip
- **真實感互動**：暗算／偷襲按身法×武功判定；失敗則護體／避開；NPC 按性格擒拿／反殺／逃跑
- **關押系統**：可裝傷、偷鎖匙、撬鎖、求饒、賄賂、突圍逃走
- **羈絆承諾**：拜師／結義／定情等寫入命運並解鎖專屬功能
- **同行伴侶**：邀請羈絆 NPC 同行，戰鬥助攻／開場減傷（日換 1 次）
- **江湖榜／扎營日結／絆技／結局預兆**
- DeepSeek 驅動 NPC（可選）+ 長期記憶 `npcMem`
- localStorage 存檔 **v7**（自動遷移舊檔）
- **九大門派**／汗血寶馬全圖／紫禁城隨機事件（撞破私情・帝心寵幸）

## 主線
1. 霧起青城  
2. 盟約殘印  
3. **天命分途**（三證據 → 俠義／霸途／隱逸 → 夜王餘使）

## 結局（六）
名揚天下／血洗江湖／紅塵倦旅／方外仙緣／商隱巨賈／獨行劍冢

## 開啟方式
### A. 單檔（推薦手機）
打開 `jianghu-safari.html`（已內嵌 CSS／JS／圖片）。

### B. 多檔資料夾
```
npx serve .
# 或 python3 -m http.server 8080
```
開 `index.html`。

## 離線演示（第三章起點）
1. 讀檔或用除錯將 `main`/`main2` 標為完成，或正常通關前兩章  
2. 京畿／青城選「【主線三】聽天命傳聞」  
3. 邊關／紅蓮／夜王墓收集三證據 → 選分途 → 無音谷決戰  

## 離線演示（童謠支線＋同行）
1. 青城鎮「聽童小六童謠」→ 買糖交付 → 永久廉價情報  
2. 對已結羈絆 NPC「邀請同行」→ 地圖顯示同行 → 戰鬥可助攻

## 宮廷仕途 v1（2026-10-18）
- 設計：`docs/palace-career-v1.md`
- 代碼：`game.js` 內 V9 PALACE CAREER；模組底稿 `scripts/v9_palace_career.js`
- 文／武九品十八階、太監／宮女階、朝廷威望、乾清任務樞紐、好處交易、服侍權貴、三品議政
- Pages：https://oceanson17.github.io/jianghu-xing/

## 青梧宮廷仕途（近期）
- 文／武／太監／宮女品級與朝廷任務；三品議政、服侍權貴、好處交易
- **身份反應**：NPC 按品級輕蔑／巴結（DeepSeek `courtActions` 會改存檔：送禮、好感、威望、任務）
- 設計：`docs/palace-career-v1.md`、`docs/palace-identity-reactions-v1.md`


## 出身深化＋複雜度 v12（2026-10-18）
- 首世僅平民；投胎解鎖皇裔／內廷等
- 時辰／人情帳／節令／傳聞板v2／技藝潛修
- 設計：`docs/birth-complexity-v12.md`
- Pages：https://oceanson17.github.io/jianghu-xing/

## AI 劇情自由度 v13（2026-10-18）
- 設定：Key／Pro·Flash／思考模式／劇情自由度（穩健·高·沙盤）／測試連線
- AI `worldActions` 可開支線、場景事件、挪 NPC、改旗標／好感／任務（寫回存檔）
- 場景自由輸入走世界導演；戀人＋羈絆可主動來信
- 無 Key 離線導演仍可用
- 設計：`docs/ai-plot-agency-v13.md`
- 自測：`node scripts/autorun_v13_headless.js`
- Pages：https://oceanson17.github.io/jianghu-xing/

## 2026-10-18 · AI 劇情板／主線導演 v14
- 修好【劇情板】按鈕無反應（`fn`／`run`）
- AI 可推主線（`advance_main`）與 NPC 行程／委託／開口
- Pages：https://oceanson17.github.io/jianghu-xing/


## 寫意上限・淨身／東廠官服／身體狀態 v15（2026-10-18）
- 女角不可淨身／太監籍；男須淨身＋廠公驗身（寫意）後方可以太監籍入東廠
- 廠差只改善惡／熱度／好感；拒絕→誤闖受罰（數值＋身體標籤）
- 身體狀態影響戰鬥／差事／取悅（寫意・非成人）；東廠官服改 NPC 態度
- **不做** 18禁／殘忍細描／情色 AI
- 設計：`docs/tasteful-eunuch-dc-v15.md` · 自測：`node scripts/autorun_v15_headless.js`
- Pages：https://oceanson17.github.io/jianghu-xing/

## 事件自由輸入＋設定作弊台 v16（2026-10-18）
- 當差／AI 場景／朝廷差遣可自擬言行，AI 或離線裁決並真改存檔
- 更多 → **設定・作弊台**：自然指令（如「皇帝升玩家為大太監」）白名單突變
- 設計：`docs/freeinput-cheat-v16.md` · 自測：`node scripts/autorun_v16_headless.js`
- Pages：https://oceanson17.github.io/jianghu-xing/

## 更新 v17（戰鬥處置＋設定入口）
- 戰敗／戰勝 AI 處置（寫意）；`更多` 頂部【設定・作弊台】
- Pages：https://oceanson17.github.io/jianghu-xing/

## V19（東廠常開・女扮男裝入籍）
- 東廠衙署地圖常開可直往
- 女角男裝可「騙過／入籍」廠衛（紙面太監途・不經淨身）；寫意
- Pages：https://oceanson17.github.io/jianghu-xing/

## 任務系統 v20（2026-10-19）
- 任務簿：主線／支線／朝廷／民間／AI；進度條、提示、前往、交付、獎勵預覽
- 朝廷差約 7 日過期扣威望；一鍵修復卡任務
- AI 生支線接劇情板；地圖／情緣／更多入口
- 設計：`docs/quest-system-v20.md` · 自測：`node scripts/autorun_v20_headless.js`
- 致敬群俠傳任務簿手感（Homage）· Pages：https://oceanson17.github.io/jianghu-xing/

