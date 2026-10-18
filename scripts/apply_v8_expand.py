#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Expand factions/skills/gear, hanxue horse, homage NPCs/quests, deep palace. SAVE stays v7."""
from pathlib import Path
import re

ROOT = Path("/workspace/wuxia-heroes")
PATH = ROOT / "game.js"
src = PATH.read_text(encoding="utf-8")
orig_len = len(src)

def must_replace(old, new, label):
    global src
    if old not in src:
        raise SystemExit(f"MISSING for {label}:\n{old[:180]!r}")
    src = src.replace(old, new, 1)
    print("OK", label)

def insert_after(anchor, addition, label):
    global src
    if addition.strip()[:40] in src and label.startswith("inject"):
        # soft skip if core marker present
        marker = addition.strip().split("\n", 1)[0][:60]
        if marker in src:
            print("SKIP", label)
            return
    if anchor not in src:
        raise SystemExit(f"MISSING anchor for {label}")
    src = src.replace(anchor, anchor + addition, 1)
    print("OK", label)

# ---- FACTIONS ----
must_replace(
'''  const FACTIONS = {
    cangyun_sect: {
      id: "cangyun_sect", name: "蒼雲寺",
      desc: "以護生戒殺為本，拳掌剛柔並濟。",
      skills: ["cloud_palm", "zen_breath", "mercy_seal"],
      joinLoc: "cangyun", req: { renown: 5 },
      skillGates: { mercy_seal: 25 }
    },
    heishui_band: {
      id: "heishui_band", name: "黑水寨",
      desc: "寨規簡單：夠狠、夠義氣。",
      skills: ["shadow_slash", "blood_roar", "night_net"],
      joinLoc: "heishui", req: { force: 8 },
      skillGates: { night_net: 25 }
    },
    baixue_manor: {
      id: "baixue_manor", name: "白雪莊",
      desc: "莊中劍法清冷，重禮亦重情。",
      skills: ["snow_sword", "frost_step", "white_plume"],
      joinLoc: "baixue", req: { renown: 10, flag: "invite_baixue" },
      skillGates: { white_plume: 30 }
    },
    honglian_cult: {
      id: "honglian_cult", name: "紅蓮教",
      desc: "旁門小派，火毒奇詭，收徒極挑。",
      skills: ["lotus_flame", "ash_veil"],
      joinLoc: "honglian", req: { renown: 15, flag: "honglian_invite", honorMax: 40 },
      skillGates: {}
    }
  };''',
'''  const FACTIONS = {
    cangyun_sect: {
      id: "cangyun_sect", name: "蒼雲寺",
      desc: "以護生戒殺為本，拳掌剛柔並濟。",
      skills: ["cloud_palm", "zen_breath", "mercy_seal"],
      joinLoc: "cangyun", req: { renown: 5 },
      skillGates: { mercy_seal: 25 }
    },
    heishui_band: {
      id: "heishui_band", name: "黑水寨",
      desc: "寨規簡單：夠狠、夠義氣。",
      skills: ["shadow_slash", "blood_roar", "night_net"],
      joinLoc: "heishui", req: { force: 8 },
      skillGates: { night_net: 25 }
    },
    baixue_manor: {
      id: "baixue_manor", name: "白雪莊",
      desc: "莊中劍法清冷，重禮亦重情。",
      skills: ["snow_sword", "frost_step", "white_plume"],
      joinLoc: "baixue", req: { renown: 10, flag: "invite_baixue" },
      skillGates: { white_plume: 30 }
    },
    honglian_cult: {
      id: "honglian_cult", name: "紅蓮教",
      desc: "旁門小派，火毒奇詭，收徒極挑。",
      skills: ["lotus_flame", "ash_veil"],
      joinLoc: "honglian", req: { renown: 15, flag: "honglian_invite", honorMax: 40 },
      skillGates: {}
    },
    powan_bang: {
      id: "powan_bang", name: "破碗幫",
      desc: "以碗為號，遊走市井，義字當先。",
      skills: ["jiaohua_quan", "dogstick_form", "beggar_drift"],
      joinLoc: "qingcheng", req: { renown: 6 },
      skillGates: { dogstick_form: 20, beggar_drift: 28 }
    },
    cangfeng_jian: {
      id: "cangfeng_jian", name: "蒼峰劍派",
      desc: "崖上論劍，劍意清峭，重正氣亦重勝負。",
      skills: ["cangfeng_sword", "cloud_slash", "peak_intent"],
      joinLoc: "chixia", req: { renown: 8, force: 7 },
      skillGates: { peak_intent: 28 }
    },
    youmu_line: {
      id: "youmu_line", name: "幽墓一脈",
      desc: "墓中傳承，柔掌輕功，遠避紅塵喧囂。",
      skills: ["soft_yin_palm", "tomb_drift", "void_finger"],
      joinLoc: "yewang", req: { renown: 10, flag: "tomb_ally" },
      skillGates: { void_finger: 30 }
    },
    luoying_dao: {
      id: "luoying_dao", name: "落英島",
      desc: "海島奇門，落英陣法，亦正亦奇。",
      skills: ["petal_rain", "odd_formation", "sea_breeze"],
      joinLoc: "yanhui", req: { renown: 10, flag: "sea_pass" },
      skillGates: { odd_formation: 26 }
    },
    huangsha_dao: {
      id: "huangsha_dao", name: "黃沙刀盟",
      desc: "沙洲刀客結盟，刀勢如風沙蔽日。",
      skills: ["desert_blade_adv", "iron_sand_palm", "sand_veil_cut"],
      joinLoc: "shamo", req: { force: 9 },
      skillGates: { iron_sand_palm: 24 }
    }
  };''',
"factions")

# ---- SKILLS (append before closing) ----
must_replace(
'''    silent_song: { id: "silent_song", name: "無音曲", power: 12, neiliCost: 10, stun: 1, desc: "無弦之音，擾敵心神。" }
  };''',
'''    silent_song: { id: "silent_song", name: "無音曲", power: 12, neiliCost: 10, stun: 1, desc: "無弦之音，擾敵心神。" },
    // v8 homage factions
    jiaohua_quan: { id: "jiaohua_quan", name: "叫花拳", power: 16, neiliCost: 5, desc: "市井拳路，虛實難測。" },
    dogstick_form: { id: "dogstick_form", name: "伏犬棒法", power: 22, neiliCost: 9, stun: 1, desc: "棒勢壓身，可定敵一瞬。" },
    beggar_drift: { id: "beggar_drift", name: "碗底步", power: 10, neiliCost: 6, buffAgi: 5, desc: "破碗一轉，身法大增。" },
    cangfeng_sword: { id: "cangfeng_sword", name: "蒼峰劍", power: 23, neiliCost: 9, desc: "劍出如峰，正氣凜然。" },
    cloud_slash: { id: "cloud_slash", name: "雲切", power: 20, neiliCost: 8, desc: "一劍剖雲，專破防。" },
    peak_intent: { id: "peak_intent", name: "峰意三叠", power: 30, neiliCost: 15, desc: "論劍壓軸，三叠劍意。" },
    soft_yin_palm: { id: "soft_yin_palm", name: "素心柔掌", power: 18, neiliCost: 10, desc: "陰柔掌勁，傷人於無形。" },
    tomb_drift: { id: "tomb_drift", name: "墓影飄", power: 8, neiliCost: 5, buffAgi: 6, desc: "墓道輕功，來去無聲。" },
    void_finger: { id: "void_finger", name: "空指點穴", power: 14, neiliCost: 11, stun: 1, desc: "隔空點穴，定身一回。" },
    petal_rain: { id: "petal_rain", name: "落英雨", power: 19, neiliCost: 9, desc: "花瓣如刃，紛飛掩殺。" },
    odd_formation: { id: "odd_formation", name: "奇門換位", power: 12, neiliCost: 10, buffDef: 4, buffAgi: 2, desc: "陣法挪移，攻防互換。" },
    sea_breeze: { id: "sea_breeze", name: "海風腿", power: 17, neiliCost: 7, desc: "腿影如潮，連綿不絕。" },
    desert_blade_adv: { id: "desert_blade_adv", name: "狂沙刀", power: 24, neiliCost: 10, desc: "刀勢捲沙，開闢前路。" },
    iron_sand_palm: { id: "iron_sand_palm", name: "鐵砂掌", power: 26, neiliCost: 12, desc: "掌風沉猛，裂石可聞。" },
    sand_veil_cut: { id: "sand_veil_cut", name: "沙幕斬", power: 15, neiliCost: 8, buffDef: 3, desc: "沙幕護體，趁勢一斬。" },
    xiake_strike: { id: "xiake_strike", name: "俠客一式", power: 21, neiliCost: 8, desc: "殘頁所載，豪氣一擊。" }
  };''',
"skills")

# ---- ITEMS ----
must_replace(
'''    sand_pact: { id: "sand_pact", name: "黃沙刀約", type: "key", rarity: "rare", desc: "與沙無痕的十年之約。", price: 0 },
    child_ballad: { id: "child_ballad", name: "青城童謠抄本", type: "key", rarity: "common", desc: "童謠裡藏着廉價情報網。", price: 0 }
  };''',
'''    sand_pact: { id: "sand_pact", name: "黃沙刀約", type: "key", rarity: "rare", desc: "與沙無痕的十年之約。", price: 0 },
    child_ballad: { id: "child_ballad", name: "青城童謠抄本", type: "key", rarity: "common", desc: "童謠裡藏着廉價情報網。", price: 0 },
    // v8 gear / mount / homage keys
    hanxue_horse: { id: "hanxue_horse", name: "汗血寶馬", type: "mount", rarity: "legendary", desc: "得此寶馬，天下關隘皆可一騎而至。", price: 0 },
    broken_bowl_staff: { id: "broken_bowl_staff", name: "破碗棍", type: "weapon", rarity: "common", atk: 7, agi: 1, desc: "幫中常備，其貌不揚。", price: 45 },
    cangfeng_jianqi: { id: "cangfeng_jianqi", name: "蒼峰長劍", type: "weapon", rarity: "rare", atk: 13, honor: 1, desc: "論劍勝者所佩。", price: 0 },
    soft_silk_robe: { id: "soft_silk_robe", name: "素絹衫", type: "armor", rarity: "rare", def: 6, agi: 2, desc: "柔韌護體，利於輕功。", price: 100 },
    tomb_veil: { id: "tomb_veil", name: "墓紗披", type: "armor", rarity: "rare", def: 7, focus: 2, desc: "幽墓一脈夜行披風。", price: 0 },
    coral_fan: { id: "coral_fan", name: "珊瑚扇", type: "weapon", rarity: "rare", atk: 10, wit: 2, desc: "落英島主客手物。", price: 110 },
    desert_scimitar: { id: "desert_scimitar", name: "沙洲彎刀", type: "weapon", rarity: "rare", atk: 12, force: 1, desc: "黃沙刀盟制式。", price: 105 },
    jade_heart: { id: "jade_heart", name: "心玉墜", type: "accessory", rarity: "epic", charm: 3, luck: 2, desc: "增魅力福緣。", price: 0 },
    beggar_robe: { id: "beggar_robe", name: "百衲衣", type: "armor", rarity: "common", def: 4, luck: 1, desc: "破碗幫禮服，反而增福。", price: 35 },
    iron_bracer: { id: "iron_bracer", name: "鐵砂護腕", type: "accessory", rarity: "rare", force: 2, bone: 1, desc: "練掌時所佩。", price: 70 },
    peak_tassel: { id: "peak_tassel", name: "峰影穗", type: "accessory", rarity: "rare", agi: 2, honor: 1, desc: "蒼峰弟子劍穗。", price: 0 },
    island_pearl: { id: "island_pearl", name: "落英珠", type: "accessory", rarity: "epic", wit: 2, perception: 2, desc: "海島奇珍。", price: 0 },
    xiake_page: { id: "xiake_page", name: "俠客殘頁", type: "key", rarity: "epic", desc: "殘詩藏拳意。", price: 0 },
    xuanyin_scroll: { id: "xuanyin_scroll", name: "玄陰殘卷", type: "key", rarity: "epic", desc: "陰柔心法殘篇，慎習。", price: 0 },
    horse_whistle: { id: "horse_whistle", name: "喚馬哨", type: "key", rarity: "rare", desc: "馬市牙人信物。", price: 20 },
    dragon_saddle: { id: "dragon_saddle", name: "血龍鞍", type: "accessory", rarity: "legendary", agi: 3, luck: 2, desc: "配汗血寶馬，行路如飛。", price: 0 }
  };''',
"items")

# ---- SHOPS ----
must_replace(
'''  const SHOPS = {
    qingcheng: ["herb", "wine", "wood_sword", "cloth", "tiger_talon", "bronze_mirror", "candy"],
    jingji: ["herb", "pill", "wine", "leather", "jade_ring", "detox", "calm_bead", "focus_incense"],
    shamo: ["herb", "bone_soup", "iron_blade", "compass_charm", "poison_amulet", "far_glass"],
    longmen: ["pill", "dragon_hammer", "leather", "bamboo_spear", "insight_tea", "med_salve"],
    yanhui: ["wine", "scale_mail", "night_dagger", "detox", "pill", "eye_drop"],
    gulan: ["big_pill", "jade_ring", "snow_cloak", "poison_amulet", "compass_charm", "med_pouch", "bronze_mirror"]
  };''',
'''  const SHOPS = {
    qingcheng: ["herb", "wine", "wood_sword", "cloth", "tiger_talon", "bronze_mirror", "candy", "broken_bowl_staff", "beggar_robe"],
    jingji: ["herb", "pill", "wine", "leather", "jade_ring", "detox", "calm_bead", "focus_incense", "soft_silk_robe"],
    shamo: ["herb", "bone_soup", "iron_blade", "compass_charm", "poison_amulet", "far_glass", "desert_scimitar", "iron_bracer"],
    longmen: ["pill", "dragon_hammer", "leather", "bamboo_spear", "insight_tea", "med_salve", "horse_whistle"],
    yanhui: ["wine", "scale_mail", "night_dagger", "detox", "pill", "eye_drop", "coral_fan"],
    gulan: ["big_pill", "jade_ring", "snow_cloak", "poison_amulet", "compass_charm", "med_pouch", "bronze_mirror"]
  };''',
"shops")

# ---- CHIBI for new NPCs ----
must_replace(
'''    gongnv_head: { r: 1, c: 1 },''',
'''    gongnv_head: { r: 1, c: 1 },
    gu_xiaoran: { r: 0, c: 2 },
    huang_linger: { r: 1, c: 0 },
    sha_yuyan: { r: 1, c: 1 },
    powan_zhang: { r: 1, c: 3 },
    mu_youlan: { r: 3, c: 0 },
    hai_kuang: { r: 2, c: 3 },
    shen_guifei: { r: 1, c: 1 },
    liu_zhaoyi: { r: 1, c: 0 },
    da_jiangjun: { r: 3, c: 2 },''',
"chibi")

# ---- NPCS: insert before closing of NPCS (gongnv_head block end varies) ----
# Find gongnv_head destinies end - read after palace npcs
# Append new NPCs before `  };` that closes NPCS - use unique gongnv_head ending

npc_anchor = None
# Prefer inserting after gongnv_head entry
m = re.search(r"gongnv_head:\s*\{[^}]+\},\s*\n", src)
if not m:
    # destinies may be multi-line
    pass

# Find the NPCS closing after gongnv - look for pattern used in v7
# After destinies fix section, NPCS already closed. Search for last palace NPC.
marker = 'gongnv_head: { id: "gongnv_head"'
idx = src.find(marker)
if idx < 0:
    raise SystemExit("gongnv_head npc missing")
# find end of this object - next `  };` after destinies for gongnv - actually NPCS continues?
# Read a slice
slice_end = src.find("\n  };", idx)
# There may be destinies assignments AFTER NPCS object. So NPCS closes, then NPCS.xxx.destinies =
# Find `  const NPC_PROFILES` or destinies fix
close_npcs = src.find("\n  };\n", idx)
# Better: find `  NPCS.` destinies assignments start
dest_fix = src.find("\n  NPCS.", idx)
if dest_fix < 0:
    dest_fix = src.find("\n  const NPC_PROFILES", idx)
# The NPCS object ends just before first NPCS.xxx = or NPC_PROFILES
# Walk back to `  };`
chunk = src[idx:dest_fix if dest_fix>0 else idx+2000]
# find last `  };` in approach - actually gongnv is last in object
end_obj = src.rfind("\n  };", idx, dest_fix if dest_fix > 0 else idx + 2500)
if end_obj < 0:
    raise SystemExit("cannot find NPCS close")
new_npcs = ''',
    // v8 homage + palace consorts
    gu_xiaoran: { id: "gu_xiaoran", name: "顧小然", title: "蒼峰棄徒", loc: "chixia", major: true,
      intro: "青衫負劍，眼神倔強如崖松。",
      destinies: { ally: "並肩論劍。", dead: "崖下折劍。", enemy: "劍鋒相對。", rival: "互為宿敵。", default: "仍在蒼峰崖。" } },
    huang_linger: { id: "huang_linger", name: "黃靈兒", title: "機靈孤女", loc: "jingji", major: true,
      intro: "髮間一支木釵，笑裡藏針。",
      destinies: { ally: "為你跑腿打探。", dead: "巷中失蹤。", enemy: "設計坑你。", apprentice: "跟你江湖去。", default: "京畿巷弄玩耍。" } },
    sha_yuyan: { id: "sha_yuyan", name: "沙語嫣", title: "沙洲刀姬", loc: "shamo", major: true,
      intro: "紗巾遮面，刀光比笑意更冷。",
      destinies: { ally: "沙原相護。", dead: "葬於沙丘。", enemy: "刀下不留情。", muse: "為你舞刀。", default: "黃沙驛徘徊。" } },
    powan_zhang: { id: "powan_zhang", name: "破碗長老", title: "破碗幫舵主", loc: "qingcheng", major: true,
      intro: "破碗一敲，市井皆聞。",
      destinies: { ally: "開丐線助你。", dead: "碗碎人亡。", enemy: "全幫封殺。", teacher: "授你棒法。", default: "青城蹲街。" } },
    mu_youlan: { id: "mu_youlan", name: "慕幽蘭", title: "幽墓隱士", loc: "yewang", major: true,
      intro: "白衣如雪，不言喧嘩。",
      destinies: { ally: "授柔掌半式。", dead: "與墓同寂。", enemy: "永拒墓門。", hermit: "更深隱去。", default: "守於墓影。" } },
    hai_kuang: { id: "hai_kuang", name: "海狂生", title: "落英島怪傑", loc: "yanhui", major: true,
      intro: "赤足持扇，語無倫次卻句句玄機。",
      destinies: { ally: "陣法相助。", dead: "葬身怒濤。", enemy: "海上圍殺。", teacher: "傳奇門半卷。", default: "醉臥船頭。" } },
    shen_guifei: { id: "shen_guifei", name: "沈貴妃", title: "璇璣殿貴妃", loc: "hougong", major: true,
      intro: "珠翠滿頭，笑意不達眼底。",
      destinies: { ally: "暗中護你。", dead: "詔獄賜帛。", enemy: "必欲除你。", muse: "引你入局。", default: "後宮周旋。" } },
    liu_zhaoyi: { id: "liu_zhaoyi", name: "柳昭儀", title: "昭儀", loc: "hougong", major: false,
      intro: "柳眉杏眼，聲線柔軟。",
      destinies: { ally: "通風報信。", enemy: "向貴妃獻你。", default: "侍奉左右。" } },
    da_jiangjun: { id: "da_jiangjun", name: "霍鎮北", title: "鎮北大將軍", loc: "yulin", major: true,
      intro: "金甲耀目，殺氣沉於骨。",
      destinies: { ally: "兵符相助。", dead: "陣前殞命。", enemy: "一刀斷頭。", rival: "沙場再見。", default: "坐鎮羽林。" } }
'''
# Insert before the `  };` that closes NPCS
src = src[:end_obj] + new_npcs + src[end_obj:]
print("OK npcs")

# ---- NPC_PROFILES ----
must_replace(
'''    gongnv_head: { personality:"lawful", label:"宮規森嚴", martial:25, awareness:70, desc:"規矩第一。", onDetect:"capture", onOpenAttack:"rebuke", onSteal:"rebuke", prisonPlace:"neiting", prisonName:"罰跪廊", paroleDays:1 }
''',
'''    gongnv_head: { personality:"lawful", label:"宮規森嚴", martial:25, awareness:70, desc:"規矩第一。", onDetect:"capture", onOpenAttack:"rebuke", onSteal:"rebuke", prisonPlace:"neiting", prisonName:"罰跪廊", paroleDays:1 },
    gu_xiaoran: { personality:"proud", label:"劍心倔強", martial:68, awareness:65, desc:"論劍必較真。", onDetect:"duel", onOpenAttack:"duel", onSteal:"rebuke", prisonPlace:"chixia", prisonName:"崖下石室", paroleDays:1 },
    huang_linger: { personality:"cunning", label:"機靈狐媚", martial:15, awareness:55, desc:"嚇跑再使壞。", onDetect:"flee", onOpenAttack:"flee", onSteal:"trap", prisonPlace:null, prisonName:null, paroleDays:0 },
    sha_yuyan: { personality:"proud", label:"沙洲傲刀", martial:70, awareness:68, desc:"被辱必拔刀。", onDetect:"duel", onOpenAttack:"duel", onSteal:"rebuke", prisonPlace:"shamo", prisonName:"驛站廂房", paroleDays:1 },
    powan_zhang: { personality:"merciful", label:"丐幫義氣", martial:60, awareness:75, desc:"先禮後兵。", onDetect:"capture", onOpenAttack:"rebuke", onSteal:"rebuke", prisonPlace:"qingcheng", prisonName:"破廟柴房", paroleDays:2 },
    mu_youlan: { personality:"merciful", label:"墓中清冷", martial:76, awareness:88, desc:"點穴封穴。", onDetect:"capture", onOpenAttack:"rebuke", onSteal:"trap", prisonPlace:"yewang", prisonName:"墓道側室", paroleDays:2 },
    hai_kuang: { personality:"cunning", label:"島上奇人", martial:72, awareness:80, desc:"陣法困敵。", onDetect:"trap", onOpenAttack:"attack", onSteal:"trap", prisonPlace:"yanhui", prisonName:"船艙", paroleDays:1 },
    shen_guifei: { personality:"cunning", label:"後宮深心", martial:20, awareness:78, desc:"善借刀殺人。", onDetect:"capture", onOpenAttack:"flee", onSteal:"trap", prisonPlace:"hougong", prisonName:"冷宮", paroleDays:0 },
    liu_zhaoyi: { personality:"timid", label:"柔弱昭儀", martial:10, awareness:40, desc:"遇險即逃。", onDetect:"flee", onOpenAttack:"flee", onSteal:"flee", prisonPlace:null, prisonName:null, paroleDays:0 },
    da_jiangjun: { personality:"ruthless", label:"大將殺伐", martial:92, awareness:82, desc:"動輒斬立決。", onDetect:"attack", onOpenAttack:"attack", onSteal:"attack", prisonPlace:"yulin", prisonName:"軍獄", paroleDays:0 }
''',
"npc_profiles")

# ---- defaultState palace fields ----
must_replace(
'''      palaceRole: null,
      trauma: 0,
      saveVer: 7
    };
  }''',
'''      palaceRole: null,
      trauma: 0,
      emperorFavor: 0,
      palaceHeat: 0,
      palaceMood: "平靜",
      palaceDayEvents: [],
      saveVer: 7
    };
  }''',
"defaultState")

# ---- migrateSave ----
must_replace(
'''    data.trauma = typeof raw.trauma === "number" ? raw.trauma : 0;
    if (data.loc === "slave_market" || data.loc === "renyazi_alley") data.loc = data.loc === "slave_market" ? "renyazi_alley" : data.loc;''',
'''    data.trauma = typeof raw.trauma === "number" ? raw.trauma : 0;
    data.emperorFavor = typeof raw.emperorFavor === "number" ? raw.emperorFavor : 0;
    data.palaceHeat = typeof raw.palaceHeat === "number" ? raw.palaceHeat : 0;
    data.palaceMood = raw.palaceMood || "平靜";
    data.palaceDayEvents = Array.isArray(raw.palaceDayEvents) ? raw.palaceDayEvents : [];
    if (data.loc === "slave_market" || data.loc === "renyazi_alley") data.loc = data.loc === "slave_market" ? "renyazi_alley" : data.loc;''',
"migrateSave")

# ---- locUnlocked horse ----
must_replace(
'''  function locUnlocked(loc) {
    if (loc.id === "huanggong") return flag("palace_access") || flag("palace_entry") || flag("map_huanggong") || !!S.palaceRole || flag("eunuch") || hasItem("yulin_pass") || hasItem("dongchang_token") || hasItem("imperial_token") || hasItem("imperial_edict");''',
'''  function locUnlocked(loc) {
    // 汗血寶馬：未關押時全圖開啟（關押仍以牢獄規則為準）
    if (hasItem("hanxue_horse") && !(typeof isImprisoned === "function" && isImprisoned())) return true;
    if (loc.id === "huanggong") return flag("palace_access") || flag("palace_entry") || flag("map_huanggong") || !!S.palaceRole || flag("eunuch") || hasItem("yulin_pass") || hasItem("dongchang_token") || hasItem("imperial_token") || hasItem("imperial_edict");''',
"locUnlocked_horse")

# ---- ALLOWED_FLAGS ----
must_replace(
'''    "qinmo_resisted","sand_duel_done","ending_preview"
  ];''',
'''    "qinmo_resisted","sand_duel_done","ending_preview",
    "got_hanxue","stole_hanxue","cangfeng_invite","xiake_page_found","xuanyin_hunt",
    "palace_affair_silent","palace_affair_seen","palace_affair_blackmail","palace_affair_reported",
    "palace_affair_join","palace_affair_accomplice","palace_affair_fled","palace_dodged_general",
    "palace_almost_slain","palace_favored","palace_pregnancy_rumor","palace_resist_liked",
    "palace_resist_punished","palace_resist_dungeon","palace_soft_refuse","palace_asked_power",
    "palace_wine_tonight","tomb_ally"
  ];''',
"allowed_flags")

# ---- contextBlob ----
must_replace(
'''  function contextBlob() {
    return JSON.stringify({
      hero: S.name, loc: S.loc, day: S.day, flags: S.flags, fates: S.fates, bonds: S.bonds || {},
      faction: S.faction, inv: invHighlights(), renown: S.renown, chapter: S.chapter,
      honor: S.honor, luck: S.luck, prison: S.prison || null, unlocks: typeof listUnlocks==="function"?listUnlocks():[]
    });
  }''',
'''  function contextBlob() {
    return JSON.stringify({
      hero: S.name, loc: S.loc, day: S.day, flags: S.flags, fates: S.fates, bonds: S.bonds || {},
      faction: S.faction, inv: invHighlights(), renown: S.renown, chapter: S.chapter,
      honor: S.honor, luck: S.luck, prison: S.prison || null, unlocks: typeof listUnlocks==="function"?listUnlocks():[],
      gender: S.gender, palaceRole: S.palaceRole || null, emperorFavor: S.emperorFavor || 0,
      palaceHeat: S.palaceHeat || 0, palaceMood: S.palaceMood || "平靜",
      palaceIdentity: typeof palaceIdentityLabel==="function" ? palaceIdentityLabel() : "",
      hasHanxue: hasItem("hanxue_horse"), karma: S.karma || 0
    });
  }''',
"contextBlob")

# ---- ensureQuests ----
must_replace(
'''      side_palace_revenge: { id: "side_palace_revenge", title: "支線・宮牆血債", step: 0, done: false },
      side_eunuch_revenge: { id: "side_eunuch_revenge", title: "支線・淨身血債", step: 0, done: false }
    };''',
'''      side_palace_revenge: { id: "side_palace_revenge", title: "支線・宮牆血債", step: 0, done: false },
      side_eunuch_revenge: { id: "side_eunuch_revenge", title: "支線・淨身血債", step: 0, done: false },
      side_cangfeng: { id: "side_cangfeng", title: "支線・蒼峰論劍", step: 0, done: false },
      side_xiake: { id: "side_xiake", title: "支線・俠客殘頁", step: 0, done: false },
      side_xuanyin: { id: "side_xuanyin", title: "支線・玄陰殘卷", step: 0, done: false },
      side_hanxue: { id: "side_hanxue", title: "支線・汗血尋蹤", step: 0, done: false }
    };''',
"ensureQuests")

# ---- tryJoin rewards ----
must_replace(
'''    if (fid === "honglian_cult") { if (S.fates.honglianzhu === "default") setFate("honglianzhu", "convert"); addItem("lotus_cape", 1); }
    showStory("加入「" + f.name + "」！已習得基礎功法。");
  }''',
'''    if (fid === "honglian_cult") { if (S.fates.honglianzhu === "default") setFate("honglianzhu", "convert"); addItem("lotus_cape", 1); }
    if (fid === "powan_bang") { if (S.fates.powan_zhang === "default") setFate("powan_zhang", "ally"); addItem("broken_bowl_staff", 1); addItem("beggar_robe", 1); }
    if (fid === "cangfeng_jian") { if (S.fates.gu_xiaoran === "default") setFate("gu_xiaoran", "ally"); addItem("cangfeng_jianqi", 1); addItem("peak_tassel", 1); }
    if (fid === "youmu_line") { if (S.fates.mu_youlan === "default") setFate("mu_youlan", "ally"); setFlag("tomb_ally"); addItem("tomb_veil", 1); }
    if (fid === "luoying_dao") { if (S.fates.hai_kuang === "default") setFate("hai_kuang", "ally"); addItem("coral_fan", 1); addItem("island_pearl", 1); }
    if (fid === "huangsha_dao") { if (S.fates.sha_yuyan === "default") setFate("sha_yuyan", "ally"); addItem("desert_scimitar", 1); addItem("iron_bracer", 1); }
    showStory("加入「" + f.name + "」！已習得基礎功法。");
  }''',
"tryJoin")

# also relax youmu join if player has tomb_seal / yechen ally
must_replace(
'''    if (f.req.flag && !flag(f.req.flag)) return toast("尚未受邀", true);
    if (f.req.honorMax && S.honor > f.req.honorMax) return toast("俠義過高，紅蓮不收", true);''',
'''    if (f.req.flag && !flag(f.req.flag)) {
      if (fid === "youmu_line" && (hasItem("tomb_seal") || S.fates.yechen === "ally" || S.fates.mu_youlan === "ally")) { /* ok */ }
      else if (fid === "luoying_dao" && (hasItem("sea_chart") || S.fates.murong === "ally" || S.fates.hai_kuang === "ally")) { /* ok */ }
      else return toast("尚未受邀", true);
    }
    if (f.req.honorMax && S.honor > f.req.honorMax) return toast("俠義過高，紅蓮不收", true);''',
"tryJoin_flags")

# ---- wire locationActions ----
must_replace(
'''    try { appendPalaceAndCh3Actions(acts, locId); } catch (e) { console.warn("palace/ch3", e); }

    return acts;
  }''',
'''    try { appendPalaceAndCh3Actions(acts, locId); } catch (e) { console.warn("palace/ch3", e); }
    try { appendV8FactionActions(acts, locId); } catch (e) { console.warn("v8acts", e); }

    return acts;
  }''',
"loc_actions_wire")

# ---- exploreLoc palace hook ----
must_replace(
'''    try { maybeTriggerEnslavement(); } catch (e) {}
  }
  function maybeTravelEvent() {''',
'''    try { maybeTriggerEnslavement(); } catch (e) {}
    try {
      if (/huanggong|neiting|hougong|yulin|dongchang/.test(locId)) maybePalaceIncident();
    } catch (e) {}
  }
  function maybeTravelEvent() {''',
"explore_palace")

# ---- travel horse bonus ----
must_replace(
'''        S.loc = id;
        S.neili = Math.min(effectiveStats().neiliMax, S.neili + 2);
        toast("抵達 " + LOCATIONS.find(l => l.id === id).name, true);
        render();
        setTimeout(() => { try { maybeTravelEvent(); } catch (e) {} }, 120);''',
'''        S.loc = id;
        if (hasItem("hanxue_horse")) {
          S.neili = Math.min(effectiveStats().neiliMax, S.neili + 8);
          toast("汗血一騎・抵達 " + LOCATIONS.find(l => l.id === id).name, true);
        } else {
          S.neili = Math.min(effectiveStats().neiliMax, S.neili + 2);
          toast("抵達 " + LOCATIONS.find(l => l.id === id).name, true);
        }
        render();
        setTimeout(() => {
          try { maybeTravelEvent(); } catch (e) {}
          try {
            if (/huanggong|neiting|hougong/.test(id)) maybePalaceIncident();
          } catch (e) {}
        }, 120);''',
"travel_horse")

# ---- HUD hero line ----
must_replace(
'''    <p class="small">經驗 ${S.exp}/${S.level * 22} · 性別 ${S.gender==="female"?"女":"男"} · 宮職 ${palaceRoleLabel()} · 福緣影響機緣${S.forgeBonus?` · 淬煉+${S.forgeBonus}`:""}${flag("eunuch")?" · 太監籍":""}</p>''',
'''    <p class="small">經驗 ${S.exp}/${S.level * 22} · 性別 ${S.gender==="female"||S.gender==="女"?"女":"男"} · 宮職 ${palaceRoleLabel()} · 帝心 ${typeof S.emperorFavor==="number"?S.emperorFavor:0} · 宮熱 ${typeof S.palaceHeat==="number"?S.palaceHeat:0}${hasItem("hanxue_horse")?" · 汗血寶馬":""} · 福緣影響機緣${S.forgeBonus?` · 淬煉+${S.forgeBonus}`:""}${flag("eunuch")?" · 太監籍":""}</p>''',
"hud_hero")

# ---- chip header if present ----
must_replace(
'''        <span class="chip">${S.faction ? FACTIONS[S.faction].name : "散人"} · D${S.day}${isImprisoned() ? " · ⛓關押" : ""}</span>''',
'''        <span class="chip">${S.faction ? FACTIONS[S.faction].name : "散人"} · D${S.day}${isImprisoned() ? " · ⛓關押" : ""}${hasItem("hanxue_horse") ? " · 🐎汗血" : ""}${S.palaceRole ? " · 帝心"+(S.emperorFavor||0) : ""}</span>''',
"hud_chip")

# ---- EXPLORE_EVENTS: add horse / homage ----
must_replace(
'''    { id:"peace", tier:"common", weight:10, title:"平安無事",
      run(loc){ const locObj=LOCATIONS.find(l=>l.id===loc)||{}; return (locObj.desc||"此處")+" 今日平安，只聞風聲。"; } },''',
'''    { id:"hanxue_rumor", tier:"rare", weight:4, title:"汗血傳聞",
      run(loc){
        ensureQuests();
        if (S.quests.side_hanxue) S.quests.side_hanxue.step = Math.max(S.quests.side_hanxue.step, 1);
        setFlag("open_longmen");
        return "過路馬商竊語：龍門馬市近日有西域汗血蹤跡。重金、福緣，或缺一不可。";
      } },
    { id:"cangfeng_poster", tier:"good", weight:5, title:"蒼峰論劍榜",
      run(loc){
        ensureQuests();
        if (S.quests.side_cangfeng) S.quests.side_cangfeng.step = Math.max(S.quests.side_cangfeng.step, 1);
        setFlag("cangfeng_invite"); setFlag("chixia_path");
        return "樹上釘着蒼峰論劍招貼。赤霞崖／天台方向，隱有劍鳴。";
      } },
    { id:"peace", tier:"common", weight:10, title:"平安無事",
      run(loc){ const locObj=LOCATIONS.find(l=>l.id===loc)||{}; return (locObj.desc||"此處")+" 今日平安，只聞風聲。"; } },''',
"explore_events")

# ---- inject palace system before bindViewportKb / end ----
palace_js = (ROOT / "scripts" / "v8_palace_system.js").read_text(encoding="utf-8")
if "V8: DEEP PALACE" not in src:
    # insert before `  bindViewportKb();`
    anchor = "\n  bindViewportKb();\n"
    if anchor not in src:
        raise SystemExit("bindViewportKb anchor missing")
    src = src.replace(anchor, "\n" + palace_js + "\n" + anchor, 1)
    print("OK inject_palace")
else:
    print("SKIP inject_palace")

# ---- setFlag tomb_ally when befriending yechen via existing paths - light hook in setFate if exists ----
# When joining youmu without flag, we already relaxed tryJoin.

# ---- offline talk / talk lines for new NPCs (optional light) ----
# Find talkLines or similar
if "gu_xiaoran:" not in src.split("const TALK")[0] if False else True:
    pass

# Add simple talk defaults near jingandi talk block if pattern exists
talk_pat = '      jingandi: { default: "景安帝：「說。」"'
if talk_pat in src:
    must_replace(
        talk_pat,
        '''      gu_xiaoran: { default: "顧小然：「劍在人在。」", ally: "「去蒼峰論劍？」", rival: "「拔劍。」", enemy: "「讓開。」" },
      huang_linger: { default: "黃靈兒：「嘻，你誰呀？」", ally: "「要不要我幫你打聽？」", apprentice: "「師父——嘻。」" },
      sha_yuyan: { default: "沙語嫣：「沙裡，只認刀。」", ally: "「跟上，別迷路。」", muse: "「……看夠了？」" },
      powan_zhang: { default: "破碗長老：「碗響，飯來。」", ally: "「幫裡給你留碗粥。」", teacher: "「棒法要醜，才打得巧。」" },
      mu_youlan: { default: "慕幽蘭：「……別吵。」", ally: "「掌心對準，勿催勁。」", hermit: "「去吧。」" },
      hai_kuang: { default: "海狂生：「花落——陣起！」", ally: "「上船！不，下船！」", teacher: "「奇門三句：換、誘、走。」" },
      shen_guifei: { default: "沈貴妃：「誰准你進來的？」", ally: "「進來——低聲。」", enemy: "「來人。」", muse: "「 quant」。replace(" quant","你既看見了……") },
      liu_zhaoyi: { default: "柳昭儀：「貴妃娘娘……」", ally: "「我什麼都沒聽見。」" },
      da_jiangjun: { default: "霍鎮北：「軍令如山。」", ally: "「要兵？看軍功。」", enemy: "「跪下。」" },
      jingandi: { default: "景安帝：「說。」"''',
        "talk_lines")

PATH.write_text(src, encoding="utf-8")
print("WROTE", PATH, "bytes", len(src), "delta", len(src) - orig_len)
