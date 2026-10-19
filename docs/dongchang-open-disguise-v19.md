# V19 東廠常開 + 女扮男裝騙過入籍

## 地圖
- **東廠衙署** `unlock: true`，`locUnlocked` 永遠回 true → 地圖可直往，不再顯示「未解鎖」。

## 入廠
- **生物男**：原太監籍／淨身／驗身寫意途不變。
- **生物女 + 男裝**（`S.disguise === "nan"` 且 `perceivedGender` 為男、未揭穿）：
  - 廠衛司新增 **「男裝騙過・以『太監籍』報到（寫意入籍）」**
  - 路徑 `disguise_eunuch`：魅力／才智騙過督公，設 `dc_fake_eunuch`／`eunuch_paper`，入廠衛編制與官服
  - **不**設真 `eunuch` 旗、**不**加 `castrated` 身體標（女身不可淨身）
- 女身未男裝：仍拒真太監途，提示先易裝或走喬裝番子。

## 寫意
- 無血腥／成人細描；差事選項沿用 V15 抽象數值。

## 自測
`node scripts/autorun_v19_headless.js` → `__JH_V19_SELFTEST` ok
