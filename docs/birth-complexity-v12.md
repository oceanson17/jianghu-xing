# 出身深化＋江湖複雜度 v12

## 首世規則
- **第一次出世（`reincarnationCount < 1`）只能選平民系**：江湖孤兒、乞丐、商戶、農戶、工匠學徒、寒門書生、走江湖藝人、綠林草莽。
- **皇子／公主／官員子弟／邊軍／宮女種子／內侍種子**僅在投胎後（`reincarnationCount ≥ 1`）可選。
- 創角選單與 `applyBirthBackground(..., { allowElite:false })` 雙重鎖定；非法精英會被壓回孤兒。

## 各出身差異
每項含：`loc` 起始地、金錢／屬性、`items`、`flags`、`treatTag`／`treatHint`（NPC／AI 待遇）、`relations`（好感／信任／命運）、`earlyQuest`（出身任務）、`openChoices`（開場三選一，真改存檔）、專屬傳聞種子。

| 出身 | 待遇標籤 | 起點 |
|------|----------|------|
| 孤兒／乞丐／農戶／工匠／書生／藝人／商戶／草莽 | 寒門～匪籍 | 營地／青城／京畿／黑水 |
| 皇子公主等 | 皇裔／金枝／戎籍／宮婢／寺人 | 宮／邊／淨身 |

## 五套深化系統
1. **時辰日程**：清晨／正午／黃昏／深夜；行動耗時辰；扎營回清晨。地圖「時辰・…」／更多頁。
2. **人情帳**：欠人／人欠寫入 `favorLedger`；可了結／勞役／拒絕；日結概率討債；餵 `statusDeltaForPrompt`。
3. **節令**：上元／清明／端午／中秋／重陽／冬至（每 30 日錯位）；參與或趁亂，真改銀兩／權謀／人情。
4. **傳聞板 v2**：出身種子多段追查；結案依出身給獎；保留懸賞。
5. **技藝潛修**：武道／商道／權謀／藥理／文墨；25／50 閾值加屬性；時辰偏向苦修。

## 存檔
`saveVer ≥ 10`：`timeSlot`、`favorLedger`、`craftXP`、`activeRumors`、`festivalState`、`birthTreatTag`、`birthOpenDone`。舊檔自動補欄。

## 自測
```bash
node scripts/autorun_rebirth_headless.js
node scripts/autorun_v12_headless.js
```
