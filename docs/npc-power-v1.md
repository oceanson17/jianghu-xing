# NPC 實力／武學平衡 v1（npc-power）

## 原則
依**劇情地位**調 `NPC_PROFILES.martial`／`awareness`，並掛 `skills[]`（對應 `SKILLS` id，供對白／論劍／AI 提示）。  
Homage only：景安帝／青梧／東廠督公玄梧；禁真實清帝名與金庸真名。

## 檔位（martial 約略）
| 檔 | 範圍 | 對象例 |
|----|------|--------|
| S 頂 | 94–99 | 督公玄梧、東方孤白、風清崖、九難影、黃藥石 |
| A 高 | 85–93 | 霍鎮北、鰲拜影、海大富影、紅蓮／破碗太上、喬峰山、葉青山 |
| B 強 | 72–84 | 掌門級、劍客、邊關大將、島教、琴魔 |
| C 中 | 45–70 | 少俠、郡主武學、旗手、刀客 |
| D 弱 | 15–40 | 醫女、宮人、帳房、香主韋小舟（權謀高、武低） |
| E 民 | 5–18 | 平民、頑童、船家、小販 |

## 關鍵調整（相對舊值）
| id | 舊→新 martial | skills | 理由 |
|----|---------------|--------|------|
| dongchang_gong | 75→98 | night_net, shadow_slash, soft_yin_palm | 督公＝廠內天花板；真名玄梧後仍頂 |
| hai_dafu_x | 88→94 | soft_yin_palm, night_net | 慎刑權監，化骨意象寫意 |
| jingandi | 70→86 | cloud_slash, peak_intent | 天子自有武底，非純文弱 |
| da_jiangjun | 92→94 | desert_blade_adv, iron_sand_palm | 鎮北大將 |
| ao_baiying | 93→95 | blood_roar, shadow_slash | 權臣悍將 |
| yulin_tongling | 72→80 | cangfeng_sword, cloud_slash | 羽林統領 |
| wei_xiaozhou | 35→28 | — | 小太監香主：武更弱、awareness 維持高 |
| tongxiaoliu | 8→6 | — | 頑童 |
| lan_keeper / boatman / baizhi | 維持低 | — | 民／雜役 |
| feng_qingya | 95→97 | peak_intent, cangfeng_sword, void_finger | 隱師頂峰 |
| dongfang_gubai | 96→98 | lotus_flame, ash_veil, night_net | 篡位隱線頂 |
| jiu_nan_x | 94→96 | zen_breath, mercy_seal, cloud_palm | 神尼 |

## 平民
見 `dongchang-guard-v1.md`：新增大批 `major:false` 平民，martial 5–18，skills 空或 `basic_strike`。

## 實作
`applyNpcPowerPass()` 於載入時 `Object.assign` 進 `NPC_PROFILES`；`npcProfile()` 仍尊重玄梧裂冰覆寫。  
論劍／威脅仍讀 `p.martial`；戰鬥表敵用既有 `ENEMIES`（廠衛戰用 `elite_bandit`／`shadow` 等）。

## 自測
1. Debug：`npcProfile("dongchang_gong").martial >= 95`
2. 平民 `civ_tea_wang` martial ≤ 18
3. AI／離線對白含「武功約XX」與檔位一致
