#!/usr/bin/env python3
"""Apply karma + palace line to game.js (save v7). Preserves existing v6 ch3/sides/companion."""
from pathlib import Path
import re

PATH = Path("/workspace/wuxia-heroes/game.js")
src = PATH.read_text(encoding="utf-8")
orig = src

def must_replace(old, new, label):
    global src
    if old not in src:
        raise SystemExit(f"MISSING block for {label}:\n{old[:120]!r}")
    src = src.replace(old, new, 1)
    print("OK", label)

def insert_after(anchor, addition, label):
    global src
    if anchor not in src:
        raise SystemExit(f"MISSING anchor for {label}")
    if addition.strip() in src:
        print("SKIP already", label)
        return
    src = src.replace(anchor, anchor + addition, 1)
    print("OK", label)

# ---- SAVE KEYS ----
must_replace(
'''  const SAVE_KEY = "jianghu_walk_save_v6";
  const SAVE_KEY_OLD = "jianghu_walk_save_v5";
  const SAVE_KEY_OLDER = "jianghu_walk_save_v4";
  const SAVE_KEY_OLDEST = "jianghu_walk_save_v3";
  const SAVE_KEY_V1 = "jianghu_walk_save_v2";
  const SAVE_KEY_V1B = "jianghu_walk_save_v1";''',
'''  const SAVE_KEY = "jianghu_walk_save_v7";
  const SAVE_KEY_OLD = "jianghu_walk_save_v6";
  const SAVE_KEY_OLDER = "jianghu_walk_save_v5";
  const SAVE_KEY_OLDEST = "jianghu_walk_save_v4";
  const SAVE_KEY_V1 = "jianghu_walk_save_v3";
  const SAVE_KEY_V1B = "jianghu_walk_save_v2";
  const SAVE_KEY_V1C = "jianghu_walk_save_v1";''',
"save keys")

# ---- CHIBI ----
must_replace(
'''    wuyinqinmo:  { r: 2, c: 2 },
    // fallbacks
    default:     { r: 0, c: 2 }
  };''',
'''    wuyinqinmo:  { r: 2, c: 2 },
    // palace cast (remap closest)
    jingandi:        { r: 0, c: 2 },
    dongchang_gong:  { r: 3, c: 2 },
    yulin_tongling:  { r: 3, c: 0 },
    renyazi:         { r: 3, c: 1 },
    gongnv_head:     { r: 1, c: 0 },
    // fallbacks
    default:     { r: 0, c: 2 }
  };''',
"chibi")

# ---- TOWN / PAVILION ----
must_replace(
'''  const TOWN_LOCS = new Set([
    "qingcheng", "jingji", "hub", "shamo", "longmen", "yanhui", "gulan",
    "heishui", "bianguan", "luohe", "leifeng", "chixia"
  ]);
  const PAVILION_LOCS = new Set([
    "cangyun", "yaogu", "baixue", "meihua", "tiantai", "shuiyun",
    "yewang", "jianzhong", "mishi", "wuyin", "zhulin", "honglian"
  ]);''',
'''  const TOWN_LOCS = new Set([
    "qingcheng", "jingji", "hub", "shamo", "longmen", "yanhui", "gulan",
    "heishui", "bianguan", "luohe", "leifeng", "chixia",
    "huanggong", "dongchang", "yulin", "renyazi_alley"
  ]);
  const PAVILION_LOCS = new Set([
    "cangyun", "yaogu", "baixue", "meihua", "tiantai", "shuiyun",
    "yewang", "jianzhong", "mishi", "wuyin", "zhulin", "honglian",
    "neiting", "hougong"
  ]);''',
"town/pavilion")

# ---- LOCATIONS ----
must_replace(
'''    { id: "shuiyun", name: "水雲居", desc: "湖心小築，隱士居焉。", unlock: false, needFlag: "lake_invite", region: "江南" }
  ];''',
'''    { id: "shuiyun", name: "水雲居", desc: "湖心小築，隱士居焉。", unlock: false, needFlag: "lake_invite", region: "江南" },
    // v7 京畿皇城・青梧宮線
    { id: "huanggong", name: "青梧宮外廷", desc: "宮牆硃紅，儀仗森嚴。無憑不得入。", unlock: false, needFlag: "palace_access", region: "京畿皇城" },
    { id: "neiting", name: "內廷花廊", desc: "花影重重，近侍往來。", unlock: false, needFlag: "palace_role", region: "京畿皇城" },
    { id: "dongchang", name: "東廠衙署", desc: "檔案味刺鼻，燈火常徹夜。", unlock: false, needFlag: "dongchang_invite", region: "京畿皇城" },
    { id: "yulin", name: "羽林侍衛營", desc: "刀槍如林，號令如雷。", unlock: false, needFlag: "yulin_ok", region: "京畿皇城" },
    { id: "hougong", name: "後宮璇璣殿", desc: "簾外絃歌，簾內天家。", unlock: false, needFlag: "hougong_access", region: "京畿皇城" },
    { id: "renyazi_alley", name: "人牙子暗巷", desc: "京畿後巷，人牙子出沒——勿久留。", unlock: false, needFlag: "heard_renyazi", region: "京畿皇城" }
  ];''',
"locations")

# ---- ITEMS ----
must_replace(
'''    child_ballad: { id: "child_ballad", name: "青城童謠抄本", type: "key", rarity: "common", desc: "童謠裡藏着廉價情報網。", price: 0 }
  };''',
'''    child_ballad: { id: "child_ballad", name: "青城童謠抄本", type: "key", rarity: "common", desc: "童謠裡藏着廉價情報網。", price: 0 },
    // v7 palace / karma
    yulin_pass: { id: "yulin_pass", name: "羽林通行證", type: "key", rarity: "rare", desc: "可至青梧宮外廷／羽林營。", price: 0 },
    dongchang_token: { id: "dongchang_token", name: "東廠帖", type: "key", rarity: "rare", desc: "東廠招攬信物。", price: 0 },
    imperial_token: { id: "imperial_token", name: "景安密令", type: "key", rarity: "epic", desc: "帝賜信物，出入內廷如坦途。", price: 0 },
    palace_badge: { id: "palace_badge", name: "宮籍腰牌", type: "accessory", rarity: "rare", charm: 1, honor: 1, desc: "宮中職事憑證。", price: 0 },
    eunuch_ledger: { id: "eunuch_ledger", name: "太監籍冊殘頁", type: "key", rarity: "rare", desc: "記着你的宮名——與仇。", price: 0 },
    revenge_blade: { id: "revenge_blade", name: "廠衛短刃", type: "weapon", rarity: "rare", atk: 10, agi: 2, desc: "東廠番子常佩。", price: 0 }
  };''',
"items")

# ---- NPCS (before closing of NPCS object - after wuyinqinmo) ----
# Find wuyinqinmo block end - the destinies fix section comes after
must_replace(
'''    wuyinqinmo: { id: "wuyinqinmo", name: "無音琴魔", title: "無音谷琴怪", loc: "wuyin", major: true,
      intro: "無弦而歌，目不視人。",
      destinies: { ally: "以無音曲助你。", dead: "琴碎人亡。", enemy: "無音殺意。", mad: "徹底入魔。", default: "仍居無音谷。" } }
  };''',
'''    wuyinqinmo: { id: "wuyinqinmo", name: "無音琴魔", title: "無音谷琴怪", loc: "wuyin", major: true,
      intro: "無弦而歌，目不視人。",
      destinies: { ally: "以無音曲助你。", dead: "琴碎人亡。", enemy: "無音殺意。", mad: "徹底入魔。", default: "仍居無音谷。" } },
    // v7 palace
    jingandi: { id: "jingandi", name: "景安帝", title: "青梧宮天子", loc: "hougong", major: true,
      intro: "龍袍裁剪得意外輕便，眼神卻深。",
      destinies: { ally: "許你近侍。", married: "伴駕璇璣。", muse: "寵信有加。", enemy: "詔令追討。", dead: "宮變無蹤。", default: "端坐青梧。" } },
    dongchang_gong: { id: "dongchang_gong", name: "東廠督公", title: "東廠主事", loc: "dongchang", major: true,
      intro: "白臉無鬚，笑裡藏檔案。",
      destinies: { ally: "廠務與你共進。", dead: "印綬易主。", enemy: "黑冊除名。", promoted: "退居幕後。", default: "坐鎮東廠。" } },
    yulin_tongling: { id: "yulin_tongling", name: "羽林統領", title: "御前侍衛統領", loc: "yulin", major: true,
      intro: "盔纓如火，聲如金鐵。",
      destinies: { ally: "編入羽林。", dead: "殉於宮門。", enemy: "軍令緝拿。", promoted: "調衛內廷。", default: "嚴守營門。" } },
    renyazi: { id: "renyazi", name: "人牙子", title: "暗巷牙郎", loc: "renyazi_alley", major: true,
      intro: "袖裡藏麻繩，眼裡無慈悲。",
      destinies: { ally: "……他不會與你為友。", dead: "牙巷血債已清。", enemy: "追殺／被你記恨。", default: "仍在暗巷徘徊。" } },
    gongnv_head: { id: "gongnv_head", name: "掌事姑姑", title: "內廷掌事", loc: "neiting", major: false,
      intro: "髮髻一絲不苟，眼神能秤人。",
      destinies: { ally: "幫你入籍宮女。", enemy: "罰你掃廊下。", default: "仍管花廊。" } }
  };''',
"npcs")

print("Partial OK through NPCs; continuing…")
PATH.write_text(src, encoding="utf-8")
print("wrote interim", PATH, "len", len(src))
