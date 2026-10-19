# 關押釋放作弊＋說話欄設定 v22（2026-10-19）

## 問題
東廠關押後，用「設定」輸入「皇帝親來叫他放人」仍關著——作弊台缺少 `release_prison` mutator，離線關鍵詞亦無「放人」解析。

## 修復
1. **`clearPlayerCaptivity`**：完整清 `S.prison`、牢房鎖匙、`punished_prison`、關押偏置；硬牢地點（天牢／用刑室等）移出至京畿。
2. **`releasePrison`／`isImprisoned`** 加強，兼容多種 prison 結構。
3. **設定作弊**：`release_prison`／`free_player`／`clear_captivity`／`pardon`；離線認「放人／釋放／特赦／皇帝親來…」；AI 白名單同步；執行後若仍關押則強制清。
4. **UI**：NPC「說話／行動」欄加「⚙ 設定」；關押中有提示；事件自擬欄亦有設定捷徑。

## 自測
`node scripts/autorun_v22_headless.js`

## Pages
https://oceanson17.github.io/jianghu-xing/
