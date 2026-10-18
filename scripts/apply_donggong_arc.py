#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Apply 東廠督公 / 玄梧 story arc to game.js"""
from pathlib import Path
import re

ROOT = Path("/workspace/wuxia-heroes")
path = ROOT / "game.js"
src = path.read_text(encoding="utf-8")
orig = src

def must_replace(old, new, label, count=1):
    global src
    n = src.count(old)
    if n == 0:
        raise SystemExit(f"MISSING [{label}]: not found")
    if count is not None and n != count and count != -1:
        # allow multiple if count=-1
        if count == 1 and n > 1:
            src = src.replace(old, new, 1)
            print(f"OK [{label}] replaced first of {n}")
            return
        raise SystemExit(f"COUNT [{label}]: expected {count}, got {n}")
    src = src.replace(old, new) if count == -1 else src.replace(old, new, count if count else 1)
    print(f"OK [{label}]")

# ---- 1. NPC destinies ----
old_npc = '''    dongchang_gong: { id: "dongchang_gong", name: "東廠督公", title: "東廠掌印", loc: "dongchang", major: true,
      intro: "黑衣無紋，聲音像翻檔案。",
      destinies: { ally: "廠裡罩你。", dead: "印落人亡。", enemy: "廠衛追殺。", promoted: "你取其位。", default: "坐鎮東廠。" } },'''

new_npc = '''    dongchang_gong: { id: "dongchang_gong", name: "東廠督公", title: "東廠掌印", loc: "dongchang", major: true,
      intro: "黑衣無紋，聲音像翻檔案。沒人知他姓甚名誰——只稱督公。",
      destinies: {
        ally: "廠裡罩你，檔案為你留白。",
        enemy: "廠衛追殺，黑冊硃批。",
        dead: "印落人亡，真名隨骨灰散。",
        vanished: "連影子一併從宮牆消失。",
        muse: "冷血為你裂縫——夜晤不再只談刀。",
        partner: "以廠奴之身，只聽你一人。",
        slave: "墨契已成，他甘為你心腹奴。",
        redeemed: "放下弒兄之刃，與景安帝相認。",
        promoted: "你取其位，舊督公不知所終。",
        default: "坐鎮東廠，無人識其真顏。"
      } },'''
must_replace(old_npc, new_npc, "NPCS.dongchang_gong")

# ---- 2. Items ----
old_items_end = '''    dragon_saddle: { id: "dragon_saddle", name: "血龍鞍", type: "accessory", rarity: "legendary", agi: 3, luck: 2, desc: "配汗血寶馬，行路如飛。", price: 0 }
  };'''
new_items_end = '''    dragon_saddle: { id: "dragon_saddle", name: "血龍鞍", type: "accessory", rarity: "legendary", agi: 3, luck: 2, desc: "配汗血寶馬，行路如飛。", price: 0 },
    huangzu_jade: { id: "huangzu_jade", name: "皇族殘玉", type: "key", rarity: "epic", desc: "玉牒碎片，隱約刻着「靖」字——指向失散皇族。", price: 0 },
    blood_brother_token: { id: "blood_brother_token", name: "雙龍隱符", type: "key", rarity: "epic", desc: "一對龍紋半符，合則成兄弟之證。", price: 0 },
    enemy_lie_scroll: { id: "enemy_lie_scroll", name: "仇敵偽詔", type: "key", rarity: "epic", desc: "敵人偽造的血書，謊稱「你的仇人是當今天子」。", price: 0 }
  };'''
must_replace(old_items_end, new_items_end, "ITEMS keys")

# ---- 3. ROLE / UNLOCK labels ----
must_replace(
    '    sword_disciple: "崖上劍徒", dao_student: "觀星門生"\n  };',
    '    sword_disciple: "崖上劍徒", dao_student: "觀星門生",\n    slave: "心腹廠奴"\n  };',
    "ROLE_LABELS.slave"
)
must_replace(
    '    bond_skill_ready: "絆技可用"\n  };',
    '    bond_skill_ready: "絆技可用",\n    dongchang_slave: "廠衛聽令（情報／開牢／免罰／助戰）"\n  };',
    "UNLOCK_LABELS.dongchang_slave"
)

# ---- 4. NPC_OFFERS expand dongchang_gong ----
old_offer = '''    dongchang_gong: [{
      id: "fanzi_oath", role: "partner", fate: "ally",
      intents: ["ask_partner", "ask_join_cult"],
      keywords: /入東廠|番子|廠衛|投效|情報|黑冊/,
      needTrust: 4, needHonor: -99,
      softTrust: 1, softKindLogs: 0,
      rejectSay: "東廠督公：「你還不夠黑。」",
      acceptSay: "「檔案開一頁給你。從今夜起，你是番子。」",
      grants: {
        flags: ["dongchang_invite", "palace_entry", "map_huanggong"],
        items: [{ id: "dongchang_token", n: 1 }],
        attrs: { perception: 1 },
        unlocks: [],
        renown: 3, trustBonus: 3
      }
    }],'''

new_offer = '''    dongchang_gong: [{
      id: "fanzi_oath", role: "partner", fate: "ally",
      intents: ["ask_partner", "ask_join_cult"],
      keywords: /入東廠|番子|廠衛|投效|情報|黑冊/,
      needTrust: 4, needHonor: -99,
      softTrust: 1, softKindLogs: 0,
      rejectSay: "東廠督公：「你還不夠黑。」",
      acceptSay: "「檔案開一頁給你。從今夜起，你是番子。」",
      grants: {
        flags: ["dongchang_invite", "palace_entry", "map_huanggong", "donggong_interest"],
        items: [{ id: "dongchang_token", n: 1 }],
        attrs: { perception: 1 },
        unlocks: [],
        renown: 3, trustBonus: 3
      }
    }, {
      id: "donggong_muse", role: "muse", fate: "muse",
      intents: ["ask_marry", "ask_partner", "ask_teach"],
      keywords: /傾慕|愛上|喜歡你|知己|動心|夜晤|陪你|表白| quant心/.source ? /傾慕|愛上|喜歡你|知己|動心|夜晤|陪你|表白|談心|撫平|疤痕/ : /傾慕|愛上|喜歡你|知己|動心|夜晤|陪你|表白|談心|撫平|疤痕/,
      needTrust: 14, needHonor: -99, needCharm: 12,
      softTrust: 8, softKindLogs: 3,
      needFlags: [],
      rejectSay: "東廠督公冷冷道：「檔案裡不寫情字。滾。」",
      acceptSay: "他沉默良久，聲音第一次不像翻紙：「……今夜，留下。只許你。」",
      grants: {
        flags: ["donggong_love", "donggong_thaw", "donggong_interest"],
        attrs: { charm: 1, perception: 1 },
        unlocks: [],
        renown: 4, trustBonus: 10
      }
    }, {
      id: "donggong_slave_rite", role: "slave", fate: "slave",
      intents: ["ask_partner", "ask_marry"],
      keywords: /廠奴|墨契|奴契|做我的奴|心腹奴|效忠我|只聽我/,
      needTrust: 18, needHonor: -99,
      softTrust: 12, softKindLogs: 4,
      needFateIn: ["muse", "partner", "ally"],
      needFlags: ["donggong_love"],
      rejectSay: "督公：「奴契不是玩笑。你尚未配。」",
      acceptSay: "他割指血於黑冊，低聲道：「墨契成。從今夜起——我是你的廠奴。」",
      grants: {
        flags: ["donggong_slave", "donggong_thaw"],
        unlocks: ["dongchang_slave"],
        attrs: { perception: 1 },
        renown: 5, trustBonus: 12
      }
    }],'''

# Fix the botched ternary in keywords - rewrite cleanly
new_offer = '''    dongchang_gong: [{
      id: "fanzi_oath", role: "partner", fate: "ally",
      intents: ["ask_partner", "ask_join_cult"],
      keywords: /入東廠|番子|廠衛|投效|情報|黑冊/,
      needTrust: 4, needHonor: -99,
      softTrust: 1, softKindLogs: 0,
      rejectSay: "東廠督公：「你還不夠黑。」",
      acceptSay: "「檔案開一頁給你。從今夜起，你是番子。」",
      grants: {
        flags: ["dongchang_invite", "palace_entry", "map_huanggong", "donggong_interest"],
        items: [{ id: "dongchang_token", n: 1 }],
        attrs: { perception: 1 },
        unlocks: [],
        renown: 3, trustBonus: 3
      }
    }, {
      id: "donggong_muse", role: "muse", fate: "muse",
      intents: ["ask_marry", "ask_partner", "ask_teach"],
      keywords: /傾慕|愛上|喜歡你|知己|動心|夜晤|陪你|表白|談心|撫平|疤痕|寵愛/,
      needTrust: 14, needHonor: -99, needCharm: 12,
      softTrust: 8, softKindLogs: 3,
      rejectSay: "東廠督公冷冷道：「檔案裡不寫情字。滾。」",
      acceptSay: "他沉默良久，聲音第一次不像翻紙：「……今夜，留下。只許你。」",
      grants: {
        flags: ["donggong_love", "donggong_thaw", "donggong_interest"],
        attrs: { charm: 1, perception: 1 },
        unlocks: [],
        renown: 4, trustBonus: 10
      }
    }, {
      id: "donggong_slave_rite", role: "slave", fate: "slave",
      intents: ["ask_partner", "ask_marry"],
      keywords: /廠奴|墨契|奴契|做我的奴|心腹奴|效忠我|只聽我/,
      needTrust: 18, needHonor: -99,
      softTrust: 12, softKindLogs: 4,
      needFateIn: ["muse", "partner", "ally"],
      needFlags: ["donggong_love"],
      rejectSay: "督公：「奴契不是玩笑。你尚未配。」",
      acceptSay: "他割指血於黑冊，低聲道：「墨契成。從今夜起——我是你的廠奴。」",
      grants: {
        flags: ["donggong_slave", "donggong_thaw"],
        unlocks: ["dongchang_slave"],
        attrs: { perception: 1 },
        renown: 5, trustBonus: 12
      }
    }],'''
must_replace(old_offer, new_offer, "NPC_OFFERS.dongchang_gong")

# ---- 5. evaluateOfferGates: needCharm ----
must_replace(
    '    if (offer.needForce && (st.force || 0) < offer.needForce) reasons.push("武力不足");\n    if (offer.needGold && S.gold < offer.needGold) reasons.push("金錢不足");',
    '    if (offer.needForce && (st.force || 0) < offer.needForce) reasons.push("武力不足");\n    if (offer.needCharm && (st.charm || S.charm || 0) < offer.needCharm) reasons.push("魅力不足");\n    if (offer.needGold && S.gold < offer.needGold) reasons.push("金錢不足");',
    "evaluateOfferGates.needCharm"
)

# ---- 6. availableOfferChips for slave ----
must_replace(
    '''      } else if (o.role === "muse" || o.role === "mad_muse") {
        label = "求為知音"; ctext = "願為知音，請授一曲";
      } else if (o.role === "apprentice" || o.role === "follower") {''',
    '''      } else if (o.role === "muse" || o.role === "mad_muse") {
        label = "求為知音"; ctext = "願為知音，請授一曲";
      } else if (o.role === "slave" || /slave_rite|墨契|廠奴/.test(o.id)) {
        label = "立廠奴墨契"; ctext = "立下墨契，做我的心腹廠奴";
      } else if (o.id === "donggong_muse") {
        label = "夜晤動心"; ctext = "我想留下陪你，傾慕已久";
      } else if (o.role === "apprentice" || o.role === "follower") {''',
    "offer chips slave/muse"
)

# ---- 7. applyOfferGrants hooks ----
must_replace(
    '''    if (offer.id === "fanzi_oath" && typeof setPalaceRole === "function") { setPalaceRole("dongchang"); if (typeof adjustKarma==="function") adjustKarma(-2,"入東廠"); }
try { saveGameSilent(); } catch (e) {}''',
    '''    if (offer.id === "fanzi_oath" && typeof setPalaceRole === "function") { setPalaceRole("dongchang"); if (typeof adjustKarma==="function") adjustKarma(-2,"入東廠"); }
    if (npcId === "dongchang_gong" && (offer.id === "donggong_muse" || offer.id === "donggong_slave_rite")) {
      if (typeof bumpDonggongTrust === "function") bumpDonggongTrust(offer.id === "donggong_slave_rite" ? 25 : 15, "墨契／動心");
      ensureQuests();
      if (S.quests.side_donggong_shadow) {
        if (offer.id === "donggong_muse") S.quests.side_donggong_shadow.step = Math.max(S.quests.side_donggong_shadow.step || 0, 2);
        if (offer.id === "donggong_slave_rite") S.quests.side_donggong_shadow.step = Math.max(S.quests.side_donggong_shadow.step || 0, 3);
      }
    }
try { saveGameSilent(); } catch (e) {}''',
    "applyOfferGrants donggong hooks"
)

# ---- 8. defaultState donggongTrust ----
must_replace(
    '      palaceDayEvents: [],\n      saveVer: 7\n    };',
    '      palaceDayEvents: [],\n      donggongTrust: 0,\n      saveVer: 7\n    };',
    "defaultState.donggongTrust"
)

# ---- 9. migrateSave ----
must_replace(
    '    data.palaceDayEvents = Array.isArray(raw.palaceDayEvents) ? raw.palaceDayEvents : [];\n    data.sceneOverride = raw.sceneOverride || null;',
    '    data.palaceDayEvents = Array.isArray(raw.palaceDayEvents) ? raw.palaceDayEvents : [];\n    data.donggongTrust = typeof raw.donggongTrust === "number" ? raw.donggongTrust : 0;\n    data.sceneOverride = raw.sceneOverride || null;',
    "migrateSave.donggongTrust"
)

# ---- 10. ALLOWED_FATES / FLAGS ----
must_replace(
    'const ALLOWED_FATES = ["ally","dead","enemy","vanished","redeemed","married","retired","hero","muse","master","smuggler","convert","hermit","freed","teacher","partner","apprentice","promoted","rival","host","immortal","mad","default"];',
    'const ALLOWED_FATES = ["ally","dead","enemy","vanished","redeemed","married","retired","hero","muse","master","smuggler","convert","hermit","freed","teacher","partner","apprentice","promoted","rival","host","immortal","mad","slave","default"];',
    "ALLOWED_FATES.slave"
)

must_replace(
    '    "dongchang_ambition_fail"\n  ];',
    '''    "dongchang_ambition_fail",
    "donggong_interest","donggong_love","donggong_slave","donggong_thaw",
    "donggong_truth_known","donggong_confessed","donggong_regicide_plan",
    "donggong_reconciled","donggong_sold_out","donggong_evidence_burned",
    "donggong_abandon_revenge","side_donggong","donggong_saved_once",
    "donggong_night_talk","donggong_name_hint","donggong_search_done"
  ];''',
    "ALLOWED_FLAGS donggong"
)

# ---- 11. ensureQuests ----
must_replace(
    '      side_hanxue: { id: "side_hanxue", title: "支線・汗血尋蹤", step: 0, done: false }\n',
    '      side_hanxue: { id: "side_hanxue", title: "支線・汗血尋蹤", step: 0, done: false },\n      side_donggong_shadow: { id: "side_donggong_shadow", title: "支線・督公影事", step: 0, done: false }\n',
    "ensureQuests.side_donggong"
)

# ---- 12. ENDING_DEFS ----
must_replace(
    '''    eunuch_revenge: {
      id: "eunuch_revenge", title: "淨身復仇",
      epi: "牙巷血債已清。宮籍上的名字仍在，但你已不是被販來的貨色——東廠與宮牆成了你的刃與盾。",
      need: (s) => flag("eunuch") && (flag("palace_revenge_done") || (s.quests && s.quests.side_palace_revenge && s.quests.side_palace_revenge.done) || (s.quests && s.quests.side_eunuch_revenge && s.quests.side_eunuch_revenge.done))
    }
  };''',
    '''    eunuch_revenge: {
      id: "eunuch_revenge", title: "淨身復仇",
      epi: "牙巷血債已清。宮籍上的名字仍在，但你已不是被販來的貨色——東廠與宮牆成了你的刃與盾。",
      need: (s) => flag("eunuch") && (flag("palace_revenge_done") || (s.quests && s.quests.side_palace_revenge && s.quests.side_palace_revenge.done) || (s.quests && s.quests.side_eunuch_revenge && s.quests.side_eunuch_revenge.done))
    },
    donggong_regicide: {
      id: "donggong_regicide", title: "影弒青梧",
      epi: "你與廠奴玄梧共謀弒君。璇璣殿燈滅那夜，青梧朝換了血色——江湖再無安枕。",
      need: (s) => flag("donggong_regicide_plan") && (flag("donggong_truth_known") || flag("donggong_confessed"))
    },
    donggong_reconcile: {
      id: "donggong_reconcile", title: "雙龍相認",
      epi: "偽詔焚盡，殘玉合璧。景安帝與失散幼弟玄梧相認——廠印仍在，殺意已熄。你成全一段皇族血緣。",
      need: (s) => flag("donggong_reconciled")
    },
    donggong_slave_end: {
      id: "donggong_slave_end", title: "廠奴心腹",
      epi: "墨契深於君臣。玄梧棄弒兄之刃，只作你一人的刀與盾——宮牆內外，皆聽你號令。",
      need: (s) => flag("donggong_slave") && flag("donggong_abandon_revenge") && (s.fates && (s.fates.dongchang_gong === "slave" || s.fates.dongchang_gong === "partner" || s.fates.dongchang_gong === "muse"))
    }
  };''',
    "ENDING_DEFS donggong"
)

must_replace(
    '    scores.dongchang_end = (s.palaceRole === "dongchang_boss" ? 50 : 0) + (flag("palace_revenge_done") ? 40 : 0) + (flag("eunuch") ? 20 : 0);',
    '''    scores.dongchang_end = (s.palaceRole === "dongchang_boss" ? 50 : 0) + (flag("palace_revenge_done") ? 40 : 0) + (flag("eunuch") ? 20 : 0);
    scores.donggong_regicide = (flag("donggong_regicide_plan") ? 90 : 0) + (flag("donggong_truth_known") ? 20 : 0);
    scores.donggong_reconcile = (flag("donggong_reconciled") ? 95 : 0);
    scores.donggong_slave_end = (flag("donggong_slave") && flag("donggong_abandon_revenge") ? 88 : 0) + (flag("donggong_love") ? 10 : 0);''',
    "ending weights"
)

must_replace(
    'const order = ["eunuch_revenge", "palace_consort", "consort", "dongchang_lord", "dongchang_end", "romance", "redemption", "demon", "blood", "dao", "merchant", "fame", "lone"];',
    'const order = ["donggong_regicide", "donggong_reconcile", "donggong_slave_end", "eunuch_revenge", "palace_consort", "consort", "dongchang_lord", "dongchang_end", "romance", "redemption", "demon", "blood", "dao", "merchant", "fame", "lone"];',
    "ending order"
)

# ---- 13. Soften ambition ----
old_amb = '''      if (S.palaceRole === "dongchang" && (S.karma||0) <= -35 && S.renown >= 20) {
        acts.push({ label: "【野心】取而代之・督公之位", fn: function(){
          startCombat("elite_bandit", function(){
            setPalaceRole("dongchang_boss"); setFate("dongchang_gong", "dead");
            S.renown += 10; adjustKarma(-5, "奪督公");
            showStory("舊督公倒下。廠印入手——你成了新的東廠督公。");
          }, function(){
            setFlag("dongchang_ambition_fail");
            bumpPalaceHeat(20);
            bumpEmperorFavor(-10, "廠變");
            const pk = pickPunishmentByHeat({ heatBonus: 25, forceKind: Math.random() < 0.4 ? "zhanshou" : null });
            applyPalacePunishment(pk || "xingxing", { why: "東廠奪印失敗", by: "dongchang_gong", hard: true });
          });
        }});
      }'''

new_amb = '''      if (S.palaceRole === "dongchang" && (S.karma||0) <= -35 && S.renown >= 20) {
        acts.push({ label: "【野心】取而代之・督公之位", fn: function(){
          if (flag("donggong_love") || flag("donggong_slave") || S.fates.dongchang_gong === "muse" || S.fates.dongchang_gong === "slave") {
            openModal("<h3>奪印？</h3><div class=\\"story-box\\">他已是你的知己／廠奴。強奪督公之位，等於親手斬斷墨契——也可改走「以奴代印」（保留他為心腹，你掌實權）。</div>" +
              "<div class=\\"btn-row\\"><button class=\\"btn\\" id=\\"amb-force\\">仍要奪印（殺／逐）</button>" +
              "<button class=\\"btn primary\\" id=\\"amb-keep\\">以奴代印・共掌東廠</button>" +
              "<button class=\\"btn ghost\\" onclick=\\"closeModal()\\">作罷</button></div>");
            document.getElementById("amb-force").onclick = function(){
              closeModal();
              startCombat("elite_bandit", function(){
                setPalaceRole("dongchang_boss"); setFate("dongchang_gong", "dead");
                S.renown += 10; adjustKarma(-8, "殺奴奪印"); bumpDonggongTrust(-100, "背叛");
                showStory("墨契碎於血泊。廠印入手——你成了新督公，卻再無那個肯為你裂縫的人。");
              }, function(){
                setFlag("dongchang_ambition_fail");
                bumpPalaceHeat(25); bumpEmperorFavor(-12, "廠變");
                const pk = pickPunishmentByHeat({ heatBonus: 30, forceKind: Math.random() < 0.5 ? "zhanshou" : null });
                applyPalacePunishment(pk || "xingxing", { why: "東廠奪印失敗", by: "dongchang_gong", hard: true });
              });
            };
            document.getElementById("amb-keep").onclick = function(){
              closeModal();
              setPalaceRole("dongchang_boss");
              setFlag("donggong_slave"); setFlag("donggong_abandon_revenge");
              if (S.fates.dongchang_gong !== "slave") setFate("dongchang_gong", "slave");
              bumpDonggongTrust(10, "以奴代印");
              ensureBonds();
              const b = S.bonds.dongchang_gong || { roles: [], unlocked: [], sinceDay: S.day };
              if (b.roles.indexOf("slave") < 0) b.roles.push("slave");
              if (b.unlocked.indexOf("dongchang_slave") < 0) b.unlocked.push("dongchang_slave");
              S.bonds.dongchang_gong = b;
              S.renown += 8; adjustKarma(-2, "掌廠");
              showStory("你按下他的手：「印歸我，命歸你。」他跪下——廠衛聽令於你，弒君之刃收入鞘中。");
            };
            return;
          }
          startCombat("elite_bandit", function(){
            setPalaceRole("dongchang_boss"); setFate("dongchang_gong", "dead");
            S.renown += 10; adjustKarma(-5, "奪督公");
            showStory("舊督公倒下。廠印入手——你成了新的東廠督公。");
          }, function(){
            setFlag("dongchang_ambition_fail");
            bumpPalaceHeat(20);
            bumpEmperorFavor(-10, "廠變");
            const pk = pickPunishmentByHeat({ heatBonus: 25, forceKind: Math.random() < 0.4 ? "zhanshou" : null });
            applyPalacePunishment(pk || "xingxing", { why: "東廠奪印失敗", by: "dongchang_gong", hard: true });
          });
        }});
      }'''
must_replace(old_amb, new_amb, "soften ambition")

# ---- 14. offline talk lines ----
must_replace(
    '      dongchang_gong: { default: "東廠督公：「名字，寫進檔案了嗎？」", ally: "「廠裡的刀，借你一用。」", enemy: "「黑牢有空位。」", promoted: "他已不在其位。" },',
    '''      dongchang_gong: {
        default: "東廠督公：「名字，寫進檔案了嗎？」",
        ally: "「廠裡的刀，借你一用。」",
        enemy: "「黑牢有空位。」",
        muse: flag("donggong_truth_known") ? "玄梧低聲：「……別叫督公。今夜只叫我名字。」" : "他罕見地移開視線：「……你再靠近一步。」",
        partner: "「墨契未成，也當自己人。」",
        slave: flag("donggong_truth_known") ? "廠奴玄梧跪下：「主人有何吩咐？」" : "廠奴・督公跪下：「主人有何吩咐？」",
        redeemed: "「兄長……我不再舉刀。」",
        promoted: "他已不在其位。",
        dead: "印落，人亡。",
        vanished: "廠署空椅。"
      },''',
    "offlineTalk destinies"
)

# Fix offline talk - flag() inside object literal at definition time is wrong!
# The offlineTalk is a function that returns pack[fate] - so we need runtime evaluation.
# Revert to simple strings and handle muse/slave in the return path, OR use getters.
# Simplest: keep static strings without truth leak in default/muse until reveal handled elsewhere.

must_replace(
    '''      dongchang_gong: {
        default: "東廠督公：「名字，寫進檔案了嗎？」",
        ally: "「廠裡的刀，借你一用。」",
        enemy: "「黑牢有空位。」",
        muse: flag("donggong_truth_known") ? "玄梧低聲：「……別叫督公。今夜只叫我名字。」" : "他罕見地移開視線：「……你再靠近一步。」",
        partner: "「墨契未成，也當自己人。」",
        slave: flag("donggong_truth_known") ? "廠奴玄梧跪下：「主人有何吩咐？」" : "廠奴・督公跪下：「主人有何吩咐？」",
        redeemed: "「兄長……我不再舉刀。」",
        promoted: "他已不在其位。",
        dead: "印落，人亡。",
        vanished: "廠署空椅。"
      },''',
    '''      dongchang_gong: {
        default: "東廠督公：「名字，寫進檔案了嗎？」",
        ally: "「廠裡的刀，借你一用。」",
        enemy: "「黑牢有空位。」",
        muse: "他罕見地移開視線：「……你再靠近一步。」",
        partner: "「墨契未成，也當自己人。」",
        slave: "廠奴跪下：「主人有何吩咐？」",
        redeemed: "「兄長……我不再舉刀。」",
        promoted: "他已不在其位。",
        dead: "印落，人亡。",
        vanished: "廠署空椅。"
      },''',
    "offlineTalk fix static"
)

# Patch return of offlineTalk for dynamic muse/slave names
# Find: return pack[fate] || pack.default || (NPCS[npcId].intro);
old_ret = '''    const pack = lines[npcId] || {};
    return pack[fate] || pack.default || (NPCS[npcId].intro);
  }'''
new_ret = '''    const pack = lines[npcId] || {};
    if (npcId === "dongchang_gong" && (fate === "muse" || fate === "slave" || fate === "partner") && flag("donggong_truth_known")) {
      if (fate === "muse") return "玄梧低聲：「……別叫督公。今夜只叫我名字。」";
      if (fate === "slave") return "廠奴玄梧跪下：「主人有何吩咐？」";
      if (fate === "partner") return "玄梧：「雙龍符在——我仍聽你。」";
    }
    return pack[fate] || pack.default || (NPCS[npcId].intro);
  }'''
must_replace(old_ret, new_ret, "offlineTalk runtime truth name")

# ---- 15. HUD chip ----
must_replace(
    '${hasItem("hanxue_horse") ? " · 🐎汗血" : ""}${S.palaceRole ? " · 帝心"+(S.emperorFavor||0) : ""}</span>',
    '${hasItem("hanxue_horse") ? " · 🐎汗血" : ""}${flag("donggong_slave") ? (flag("donggong_truth_known") ? " · 廠奴・玄梧" : " · 廠奴・督公") : ""}${S.palaceRole ? " · 帝心"+(S.emperorFavor||0) : ""}</span>',
    "HUD chip slave"
)

# ---- 16. contextBlob / memory — never leak truth ----
must_replace(
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
    '''  function contextBlob() {
    const safeFlags = Object.assign({}, S.flags || {});
    // Never leak 玄梧／皇幼弟 truth to AI until player knows
    if (!flag("donggong_truth_known") && !flag("donggong_confessed")) {
      delete safeFlags.donggong_truth_known;
      delete safeFlags.donggong_confessed;
      delete safeFlags.donggong_regicide_plan;
      delete safeFlags.donggong_reconciled;
      delete safeFlags.donggong_name_hint;
    }
    const blob = {
      hero: S.name, loc: S.loc, day: S.day, flags: safeFlags, fates: S.fates, bonds: S.bonds || {},
      faction: S.faction, inv: invHighlights(), renown: S.renown, chapter: S.chapter,
      honor: S.honor, luck: S.luck, prison: S.prison || null, unlocks: typeof listUnlocks==="function"?listUnlocks():[],
      gender: S.gender, palaceRole: S.palaceRole || null, emperorFavor: S.emperorFavor || 0,
      palaceHeat: S.palaceHeat || 0, palaceMood: S.palaceMood || "平靜",
      palaceIdentity: typeof palaceIdentityLabel==="function" ? palaceIdentityLabel() : "",
      hasHanxue: hasItem("hanxue_horse"), karma: S.karma || 0,
      donggongTrust: typeof S.donggongTrust === "number" ? S.donggongTrust : 0,
      donggongLove: !!flag("donggong_love"),
      donggongSlave: !!flag("donggong_slave"),
      donggongThaw: !!flag("donggong_thaw")
    };
    if (flag("donggong_truth_known") || flag("donggong_confessed")) {
      blob.donggongTruth = "已知：督公真名玄梧，景安帝失散幼弟靖王，被敵人閹割洗腦欲弒君；";
      blob.donggongTruth += flag("donggong_reconciled") ? "已與帝相認。" : (flag("donggong_regicide_plan") ? "正謀弒君。" : (flag("donggong_abandon_revenge") ? "已棄復仇只效忠玩家。" : "真相未決。"));
    }
    return JSON.stringify(blob);
  }''',
    "contextBlob safe truth"
)

must_replace(
    '''  function memoryPromptPayload(npcId) {
    const m = ensureNpcMem(npcId);
    return {
      summary: m.summary.slice(-8),
      recent: m.log.slice(-MEM_RECENT_N).map(e => ({
        day: e.day, mode: e.mode, player: e.player,
        reply: trunc(e.reply, 80), behavior: e.behavior, note: e.memoryNote || ""
      })),
      trust: m.trust, mood: m.mood, rel: m.rel,
      wounded: !!m.wounded, alert: m.alert || 0,
      personality: (typeof npcProfile==="function"?npcProfile(npcId).personality:""),
      martial: (typeof npcProfile==="function"?npcProfile(npcId).martial:0)
    };
  }''',
    '''  function memoryPromptPayload(npcId) {
    const m = ensureNpcMem(npcId);
    const out = {
      summary: m.summary.slice(-8),
      recent: m.log.slice(-MEM_RECENT_N).map(e => ({
        day: e.day, mode: e.mode, player: e.player,
        reply: trunc(e.reply, 80), behavior: e.behavior, note: e.memoryNote || ""
      })),
      trust: m.trust, mood: m.mood, rel: m.rel,
      wounded: !!m.wounded, alert: m.alert || 0,
      personality: (typeof npcProfile==="function"?npcProfile(npcId).personality:""),
      martial: (typeof npcProfile==="function"?npcProfile(npcId).martial:0)
    };
    if (npcId === "dongchang_gong") {
      out.donggongTrust = typeof S.donggongTrust === "number" ? S.donggongTrust : 0;
      out.love = !!flag("donggong_love");
      out.slave = !!flag("donggong_slave");
      out.thaw = !!flag("donggong_thaw");
      // Never mention 玄梧／靖王／弒君 until truth known
      if (flag("donggong_truth_known") || flag("donggong_confessed")) {
        out.truthKnown = true;
        out.trueName = "玄梧";
        out.childTitle = "靖王／皇幼弟";
      } else {
        out.publicOnly = "東廠督公（真名未知，勿捏造皇族身份）";
      }
    }
    return out;
  }''',
    "memoryPromptPayload donggong"
)

# ---- 17. npcProfile thaw ----
must_replace(
    '''  function npcProfile(id) {
    return NPC_PROFILES[id] || { personality:"lawful", label:"江湖人", martial:40, awareness:45, desc:"", onDetect:"attack", onOpenAttack:"attack", onSteal:"rebuke", prisonPlace:null, prisonName:null, paroleDays:0 };
  }''',
    '''  function npcProfile(id) {
    const base = NPC_PROFILES[id] || { personality:"lawful", label:"江湖人", martial:40, awareness:45, desc:"", onDetect:"attack", onOpenAttack:"attack", onSteal:"rebuke", prisonPlace:null, prisonName:null, paroleDays:0 };
    if (id === "dongchang_gong" && (flag("donggong_thaw") || flag("donggong_love") || flag("donggong_slave"))) {
      return Object.assign({}, base, {
        personality: flag("donggong_slave") ? "cunning" : "proud",
        label: flag("donggong_truth_known") ? "玄梧・裂冰" : "督公・裂冰",
        desc: flag("donggong_love") ? "對你一人軟化。" : base.desc
      });
    }
    return base;
  }''',
    "npcProfile thaw"
)

# ---- 18. Insert major arc functions before bindViewportKb ----
ARC = r'''
  // ========== 東廠督公・玄梧影事（side_donggong_shadow）==========
  function bumpDonggongTrust(d, why) {
    if (typeof S.donggongTrust !== "number") S.donggongTrust = 0;
    S.donggongTrust = Math.max(0, Math.min(100, S.donggongTrust + d));
    const m = ensureNpcMem("dongchang_gong");
    m.trust = Math.max(-30, Math.min(40, (m.trust || 0) + Math.round(d / 5)));
    if (Math.abs(d) >= 5) toast("督公信任" + (d > 0 ? "＋" : "") + d + (why ? "（" + why + "）" : ""), true);
  }
  function donggongDisplayName() {
    if (flag("donggong_truth_known") || flag("donggong_confessed")) return "玄梧";
    return "東廠督公";
  }
  function ensureDonggongQuest(step) {
    ensureQuests();
    if (!S.quests.side_donggong_shadow) {
      S.quests.side_donggong_shadow = { id: "side_donggong_shadow", title: "支線・督公影事", step: 0, done: false };
    }
    if (typeof step === "number") {
      S.quests.side_donggong_shadow.step = Math.max(S.quests.side_donggong_shadow.step || 0, step);
    }
    setFlag("side_donggong");
  }
  function tryRevealDonggongTruth(source) {
    if (flag("donggong_truth_known")) return false;
    setFlag("donggong_truth_known");
    if (source === "confess") setFlag("donggong_confessed");
    ensureDonggongQuest(4);
    if (!hasItem("huangzu_jade")) addItem("huangzu_jade", 1);
    if (!hasItem("blood_brother_token")) addItem("blood_brother_token", 1);
    if (!hasItem("enemy_lie_scroll")) addItem("enemy_lie_scroll", 1);
    bumpDonggongTrust(8, "知真名");
    return true;
  }
  function openDonggongTruthChoice() {
    if (!flag("donggong_truth_known") && !flag("donggong_confessed")) {
      return toast("尚未得知督公身世", true);
    }
    const name = donggongDisplayName();
    openModal(
      "<h3>真相之後・抉擇</h3><div class=\"story-box\">" +
      escapeHtml(name) + "曾是青梧朝靖王——景安帝最小的親弟。幼年被敵人劫走，慘遭閹割與冷血訓練；敵人偽詔謊稱「你的仇人是當今天子」。他混入東廠，本為弒君報仇（實為殺兄／反青梧）。" +
      "<br><br>你要如何處置這段血緣與殺意？</div>" +
      "<div class=\"btn-row\" style=\"flex-wrap:wrap\">" +
      "<button class=\"btn\" id=\"dg-regicide\">幫他弒君</button>" +
      "<button class=\"btn primary\" id=\"dg-reconcile\">勸他認兄／相認</button>" +
      "<button class=\"btn\" id=\"dg-sell\">出賣他給皇帝</button>" +
      "<button class=\"btn\" id=\"dg-slave\">以奴契令他棄仇只效忠你</button>" +
      "<button class=\"btn ghost\" id=\"dg-burn\">毀證・裝不知道</button>" +
      "</div>"
    );
    document.getElementById("dg-regicide").onclick = function(){ closeModal(); donggongChoiceRegicide(); };
    document.getElementById("dg-reconcile").onclick = function(){ closeModal(); donggongChoiceReconcile(); };
    document.getElementById("dg-sell").onclick = function(){ closeModal(); donggongChoiceSellOut(); };
    document.getElementById("dg-slave").onclick = function(){ closeModal(); donggongChoiceSlaveLoyalty(); };
    document.getElementById("dg-burn").onclick = function(){ closeModal(); donggongChoiceBurn(); };
  }
  function donggongChoiceRegicide() {
    setFlag("donggong_regicide_plan");
    ensureDonggongQuest(5);
    adjustKarma(-12, "弒君共謀");
    bumpPalaceHeat(15);
    bumpDonggongTrust(20, "同謀");
    openModal(
      "<h3>弒君之約</h3><div class=\"story-box\">" + escapeHtml(donggongDisplayName()) +
      "眼底燃起舊火：「養心殿夜深、或午門獻俘——選一處。我為刀，你為引。」</div>" +
      "<div class=\"btn-row\">" +
      "<button class=\"btn\" id=\"rg-yx\">夜襲養心殿</button>" +
      "<button class=\"btn\" id=\"rg-wm\">午門借刀</button>" +
      "<button class=\"btn ghost\" onclick=\"closeModal()\">稍後再動</button></div>"
    );
    document.getElementById("rg-yx").onclick = function(){ closeModal(); donggongRegicideCombat("yangxin"); };
    document.getElementById("rg-wm").onclick = function(){ closeModal(); donggongRegicideCombat("wumen"); };
  }
  function donggongRegicideCombat(where) {
    S.loc = where;
    setFlag("map_" + (where === "yangxin" ? "yangxin" : "wumen"));
    const help = flag("donggong_slave") || flag("donggong_love");
    showStory((where === "yangxin" ? "養心殿燭火將盡。" : "午門鼓未響。") +
      (help ? "廠奴為你斷後。" : "你二人殺意並肩。") + "景安帝察覺異動——");
    setTimeout(function(){
      startCombat("elite_bandit", function(){
        // victory vs palace resistance / emperor guard proxy
        setFate("jingandi", "dead");
        setFate("dongchang_gong", flag("donggong_slave") ? "slave" : "ally");
        adjustKarma(-20, "弒君成");
        bumpEmperorFavor(-100, "宮變");
        bumpPalaceHeat(80);
        S.renown += 15;
        if (S.quests.side_donggong_shadow) { S.quests.side_donggong_shadow.done = true; S.quests.side_donggong_shadow.step = 6; }
        showStory("龍袍落地。青梧宮牆一夜換血。" + escapeHtml(donggongDisplayName()) +
          "站在你身側，聲音發顫：「……仇？原來殺的是兄長。」\n（結局傾向「影弒青梧」）");
      }, function(){
        bumpPalaceHeat(40);
        bumpEmperorFavor(-25, "謀逆敗露");
        setFate("dongchang_gong", "enemy");
        const pk = pickPunishmentByHeat({ heatBonus: 40, forceKind: "zhanshou" });
        applyPalacePunishment(pk || "xingxing", { why: "謀弒敗露", by: "jingandi", hard: true, fatal: (S.palaceHeat || 0) >= 70 });
      });
    }, 400);
  }
  function donggongChoiceReconcile() {
    setFlag("donggong_reconciled");
    setFlag("donggong_abandon_revenge");
    ensureDonggongQuest(5);
    adjustKarma(10, "勸認兄");
    bumpEmperorFavor(15, "雙龍相認");
    bumpPalaceHeat(5);
    bumpDonggongTrust(15, "相認");
    setFate("dongchang_gong", "redeemed");
    if (S.fates.jingandi === "enemy") setFate("jingandi", "ally");
    else if (S.fates.jingandi === "default") setFate("jingandi", "ally");
    if (S.quests.side_donggong_shadow) { S.quests.side_donggong_shadow.done = true; S.quests.side_donggong_shadow.step = 6; }
    removeItem("enemy_lie_scroll", 1);
    showStory("璇璣殿中，殘玉合璧、偽詔焚於炭盆。景安帝執其弟手，久久無言。\n「靖王……玄梧。」\n廠印可貶可留，殺意已熄。你成全一段皇族血緣。\n（結局傾向「雙龍相認」）");
  }
  function donggongChoiceSellOut() {
    setFlag("donggong_sold_out");
    ensureDonggongQuest(5);
    adjustKarma(-6, "出賣");
    bumpEmperorFavor(25, "告密有功");
    bumpPalaceHeat(20);
    bumpDonggongTrust(-100, "出賣");
    setFate("dongchang_gong", "enemy");
    if (S.quests.side_donggong_shadow) { S.quests.side_donggong_shadow.done = true; S.quests.side_donggong_shadow.step = 6; }
    openModal(
      "<h3>密奏・靖王影</h3><div class=\"story-box\">你把皇族殘玉與偽詔呈上。景安帝臉如寒鐵：「……帶他來。」</div>" +
      "<div class=\"btn-row\"><button class=\"btn primary\" id=\"sell-ok\">看他下獄受刑</button></div>"
    );
    document.getElementById("sell-ok").onclick = function(){
      closeModal();
      setFate("dongchang_gong", Math.random() < 0.45 ? "dead" : "enemy");
      S.loc = "yongxing_shi";
      setFlag("map_yongxing_shi");
      const pk = pickPunishmentByHeat({ heatBonus: 35, forceKind: Math.random() < 0.5 ? "gongxing" : "tingzhang" });
      // punish the sold NPC narratively; player witnesses
      showStory("用刑室鎖鏈響。你曾夜晤的那人，被按在木案上。\n景安帝只說：「廢印。終身廠籍為囚。」\n" +
        (S.fates.dongchang_gong === "dead" ? "後來炭火滅時，人已不在。" : "他抬眼看你，像在把你的名字寫進最後一頁黑冊。") +
        "\n你得帝心，失一人。", "punishYongxingShi");
      bumpPalaceHeat(10);
    };
  }
  function donggongChoiceSlaveLoyalty() {
    if (!flag("donggong_love") && !flag("donggong_slave") && (S.donggongTrust || 0) < 50) {
      showStory("信任未深。他冷笑：「奴契未立，休想收刃。」可先夜晤動心、立墨契。");
      return;
    }
    setFlag("donggong_abandon_revenge");
    setFlag("donggong_slave");
    ensureDonggongQuest(5);
    adjustKarma(-2, "收刃為奴");
    bumpPalaceHeat(8);
    bumpDonggongTrust(20, "棄仇效忠");
    setFate("dongchang_gong", "slave");
    ensureBonds();
    const b = S.bonds.dongchang_gong || { roles: [], unlocked: [], sinceDay: S.day };
    if (b.roles.indexOf("slave") < 0) b.roles.push("slave");
    if (b.unlocked.indexOf("dongchang_slave") < 0) b.unlocked.push("dongchang_slave");
    S.bonds.dongchang_gong = b;
    if (S.quests.side_donggong_shadow) { S.quests.side_donggong_shadow.done = true; S.quests.side_donggong_shadow.step = 6; }
    // jingandi may grow suspicious
    if (Math.random() < 0.4) bumpEmperorFavor(-5, "宮內詭影");
    showStory(escapeHtml(donggongDisplayName()) + "把弒君密圖投入炭盆，膝觸青磚：\n「仇是假的。你是真的。從今夜起，刀只為你出鞘。」\n景安帝或尚未知，或已隱隱起疑——宮熱微升。\n（結局傾向「廠奴心腹」）");
  }
  function donggongChoiceBurn() {
    setFlag("donggong_evidence_burned");
    ensureDonggongQuest(4);
    adjustKarma(1, "毀證");
    bumpPalaceHeat(-5);
    removeItem("enemy_lie_scroll", 1);
    removeItem("huangzu_jade", 1);
    removeItem("blood_brother_token", 1);
    // keep truth_known but soft-reset public pressure
    showStory("你將殘玉、偽詔、雙龍符一併焚毀。「當我什麼都不知道。」\n" +
      escapeHtml(donggongDisplayName()) + "看著火光，久久不語——殺意未熄，卻多了一分對你的忌憚與依賴。");
  }
  function donggongNightTalk() {
    ensureDonggongQuest(1);
    setFlag("donggong_night_talk");
    setFlag("donggong_interest");
    const love = flag("donggong_love");
    const trust = S.donggongTrust || 0;
    const st = effectiveStats();
    bumpDonggongTrust(3 + (love ? 4 : 0), "夜晤");
    // confession path
    if (love && trust >= 55 && !flag("donggong_confessed") && Math.random() < 0.55 + (trust >= 70 ? 0.3 : 0)) {
      tryRevealDonggongTruth("confess");
      openModal(
        "<h3>夜晤・告白</h3><div class=\"story-box\">燭芯爆了一聲。督公解下腰間半塊龍符——聲音第一次碎：\n「我本不叫督公。幼名……玄梧。靖王。景安帝最小的親弟。」\n「敵人閹我、訓我、說天子是仇人。我進宮，是為殺他。」\n他抬眼：「你既令我動心——這刀，還要不要出鞘？」</div>" +
        "<div class=\"btn-row\"><button class=\"btn primary\" id=\"nt-choice\">面對真相</button>" +
        "<button class=\"btn ghost\" id=\"nt-later\">今夜先睡</button></div>"
      );
      document.getElementById("nt-choice").onclick = function(){ closeModal(); openDonggongTruthChoice(); };
      document.getElementById("nt-later").onclick = function(){ closeModal(); showStory("他把真相按回胸臆。窗外廠衛更鼓，像倒數。"); };
      return;
    }
    // soft affection
    const lines = love
      ? ["他對着黑冊發呆：「……你的名字，我不想用硃筆。」", "夜深，他罕見地靠過來半寸：「再坐一刻。」"]
      : ["督公翻檔：「說話。廢話刪掉。」", "炭火跳了一下。他頭也不抬：「明日廠務照舊。」"];
    if ((st.charm || 0) >= 14 && !love) {
      bumpDonggongTrust(5, "魅力");
      setFlag("donggong_thaw");
      showStory(lines[0] + "\n他多看了你一眼——像在檔案縫裡找到不該有的溫度。\n（信任 " + S.donggongTrust + "；可信賴高時可表白／立墨契）");
    } else {
      showStory(lines[Math.floor(Math.random() * lines.length)] + "\n（督公信任 " + S.donggongTrust + "）");
    }
    if (!love && (S.donggongTrust || 0) >= 40 && (st.charm || 0) >= 10) {
      ensureDonggongQuest(2);
    }
  }
  function donggongProbeName() {
    ensureDonggongQuest(1);
    setFlag("donggong_interest");
    if (flag("donggong_truth_known")) {
      return showStory("你已知他真名玄梧——靖王，景安帝失散幼弟。");
    }
    const st = effectiveStats();
    const trust = S.donggongTrust || 0;
    const roll = (st.perception || 0) + (st.luck || 0) * 0.5 + trust * 0.15 + Math.random() * 8;
    bumpDonggongTrust(-1, "試探");
    if (roll > 28 && trust >= 35) {
      setFlag("donggong_name_hint");
      bumpDonggongTrust(2, "隱約");
      showStory("他指尖一頓。袖中似有半塊龍紋玉——不是廠印。\n「再問，黑牢請你。」\n（你隱約感到：他不像普通太監……）");
    } else if (flag("donggong_love") && trust >= 50) {
      showStory("他避開你的視線：「真名……不重要。重要的是，你還肯留下。」");
    } else {
      showStory("督公冷笑：「檔案上寫的是『督公』。夠了。」");
    }
  }
  function donggongSlaveCommand() {
    if (!flag("donggong_slave") && !hasUnlock("dongchang_slave")) {
      return toast("尚未立廠奴墨契", true);
    }
    openModal(
      "<h3>廠奴請令</h3><div class=\"story-box\">" + escapeHtml(donggongDisplayName()) + "候旨。</div>" +
      "<div class=\"btn-row\" style=\"flex-wrap:wrap\">" +
      "<button class=\"btn\" id=\"sc-intel\">情報・宮熱／帝心</button>" +
      "<button class=\"btn\" id=\"sc-free\">開牢・保釋自己一次</button>" +
      "<button class=\"btn\" id=\"sc-shield\">免一次輕罰（日內）</button>" +
      "<button class=\"btn\" id=\"sc-fight\">助戰・臨時同行</button>" +
      "<button class=\"btn ghost\" onclick=\"closeModal()\">罷了</button></div>"
    );
    document.getElementById("sc-intel").onclick = function(){
      closeModal();
      S.perception = Math.min(30, (S.perception || 5) + 1);
      showStory("廠奴低聲：" +
        "帝心 " + (S.emperorFavor || 0) + "，宮熱 " + (S.palaceHeat || 0) +
        "，宮職 " + palaceRoleLabel() + "。沈貴妃近日" + (Math.random() < 0.5 ? "與大將軍過從甚密" : "安分異常") + "。");
    };
    document.getElementById("sc-free").onclick = function(){
      closeModal();
      if (typeof isImprisoned === "function" && isImprisoned()) {
        S.prison = null;
        bumpPalaceHeat(5);
        showStory("鎖鏈自落。廠奴以督公舊印壓過獄卒——你重獲自由，宮熱微升。");
        render();
      } else showStory("你並未在押。廠奴：「要開誰的牢？」");
    };
    document.getElementById("sc-shield").onclick = function(){
      closeModal();
      if (unlockUsedToday("dongchang_slave_shield")) return toast("今日已用過免罰", true);
      markUnlockUsed("dongchang_slave_shield");
      setFlag("donggong_shield_today");
      S.flags.donggong_shield_day = S.day;
      bumpPalaceHeat(-8);
      showStory("廠奴將一份偽檔抽出：「今日輕罪，算我的。」宮熱暫緩。");
    };
    document.getElementById("sc-fight").onclick = function(){
      closeModal();
      inviteCompanion("dongchang_gong");
      bumpDonggongTrust(2, "同行");
      showStory(escapeHtml(donggongDisplayName()) + "收刃入袖：「主人走哪，刀在哪。」");
    };
  }
  function donggongSearchArchives() {
    if (flag("donggong_search_done") && flag("donggong_truth_known")) {
      return showStory("密檔夾層已空。真相你已知曉。");
    }
    ensureDonggongQuest(1);
    const st = effectiveStats();
    const roll = (st.perception || 0) + (st.luck || 0) + Math.random() * 12;
    bumpPalaceHeat(2);
    if (roll < 16) {
      showStory("你只翻到酷刑卷宗與番子名冊。夾層榫頭紋絲不動。");
      return;
    }
    setFlag("donggong_search_done");
    if (!hasItem("huangzu_jade")) addItem("huangzu_jade", 1);
    if (roll >= 22 || flag("donggong_love")) {
      if (!hasItem("enemy_lie_scroll")) addItem("enemy_lie_scroll", 1);
      if (!hasItem("blood_brother_token")) addItem("blood_brother_token", 1);
      tryRevealDonggongTruth("archive");
      openModal(
        "<h3>密檔・夾層</h3><div class=\"story-box\">榫頭後掉出皇族殘玉、雙龍隱符，以及一卷仇敵偽詔——字跡殘忍：\n「告訴那孩子：仇人是當今天子。」\n另有幼時封號殘頁：「靖王・玄梧」。\n東廠督公……竟是景安帝失散的親弟。</div>" +
        "<div class=\"btn-row\"><button class=\"btn primary\" id=\"ar-choice\">決定如何處置</button>" +
        "<button class=\"btn ghost\" id=\"ar-wait\">先藏好</button></div>"
      );
      document.getElementById("ar-choice").onclick = function(){ closeModal(); openDonggongTruthChoice(); };
      document.getElementById("ar-wait").onclick = function(){ closeModal(); showStory("你把證物收入袖中。夜鼓一下下，像逼問。"); };
    } else {
      setFlag("donggong_name_hint");
      bumpDonggongTrust(3, "搜檔");
      showStory("你摸到半塊龍紋玉，刻着模糊的「靖」字。督公若不在，你還能再挖深一層……\n（感知／福緣更高，或已動心後再搜，可得全套真相）");
    }
  }
  function donggongEmperorBrotherHint() {
    if (flag("donggong_truth_known")) return;
    if (!(S.fates.jingandi === "muse" || S.fates.jingandi === "married" || (S.emperorFavor || 0) >= 35)) return;
    if (Math.random() > 0.35 && !flag("palace_wine_tonight")) return;
    setFlag("donggong_name_hint");
    ensureDonggongQuest(1);
    showStory("景安帝酒意微醺，忽然怔怔：「朕少時……還有個幼弟。敵人劫走，再無音訊。若還活着……」\n他搖頭：「醉話。當朕沒說。」\n（你想起東廠那位無名督公——？）");
  }
  function donggongEnemyRemnantHook(locId) {
    if (flag("donggong_truth_known")) return;
    if (locId !== "renyazi_alley" && locId !== "heishui") return;
    if (flag("donggong_enemy_letter")) return;
    if (Math.random() > 0.28 && !hasItem("huangzu_jade")) return;
    setFlag("donggong_enemy_letter");
    ensureDonggongQuest(1);
    if (!hasItem("enemy_lie_scroll")) addItem("enemy_lie_scroll", 1);
    showStory("暗處丟來一卷舊帛——仇敵偽詔殘頁，字跡狠毒：\n「閹了那皇幼弟，告訴他：仇人是當今天子。送他進宮。」\n落款已殘。你隱約感到：宮裡某個「太監」，並不簡單。");
  }
  function donggongHealScarTalk() {
    ensureDonggongQuest(1);
    setFlag("donggong_interest");
    setFlag("donggong_thaw");
    bumpDonggongTrust(6, "療傷／撫疤");
    const m = ensureNpcMem("dongchang_gong");
    m.log.push({ day: S.day, mode: "say", player: "想替你看看舊傷", reply: "……隨便", behavior: "help", memoryNote: "撫疤示好" });
    showStory("你看見他領下舊疤——不像刀劍，像刑具烙出的。他沒甩開你的手。\n「……夠了。」聲音卻軟了半寸。");
    if ((S.donggongTrust || 0) >= 45) ensureDonggongQuest(2);
  }

  // wrap applyPalacePunishment lightly for slave shield
  const _applyPalacePunishmentDonggong = typeof applyPalacePunishment === "function" ? applyPalacePunishment : null;
  if (_applyPalacePunishmentDonggong) {
    // monkey-patch via reassignment below after function exists — done in hook section
  }

'''

# Insert before bindViewportKb
if "東廠督公・玄梧影事" not in src:
    must_replace(
        "  bindViewportKb();\n  ensureAllNpcMem();\n  render();\n})();",
        ARC + "\n  bindViewportKb();\n  ensureAllNpcMem();\n  render();\n})();",
        "insert arc functions"
    )
else:
    print("SKIP arc already present")

# ---- 19. Hook location actions for dongchang (second block around 6598) ----
old_dc2 = '''    if (locId === "dongchang" && (S.palaceRole === "dongchang" || S.palaceRole === "dongchang_boss" || S.palaceRole === "eunuch" || flag("dongchang_invite") || flag("eunuch"))) {
      if (!flag("punish_dossier")) {
        acts.push({ label: "翻閱・十大酷刑卷宗", fn: function(){ openPunishDossier(); } });
      } else {
        acts.push({ label: "重溫・十大酷刑卷宗", fn: function(){ openPunishDossier(); } });
      }
      acts.push({ label: "提審／用刑堂（廠務）", fn: function(){ dongchangPunishNpcDemo(); } });
      acts.push({ label: "往行刑枱", fn: function(){ S.loc = "xingxing_tai"; setFlag("map_xingxing_tai"); toast("往行刑枱", true); render(); } });
      acts.push({ label: "往用刑室", fn: function(){ S.loc = "yongxing_shi"; setFlag("map_yongxing_shi"); toast("往用刑室", true); render(); } });
    }'''

new_dc2 = '''    if (locId === "dongchang" && (S.palaceRole === "dongchang" || S.palaceRole === "dongchang_boss" || S.palaceRole === "eunuch" || flag("dongchang_invite") || flag("eunuch") || flag("donggong_love") || flag("donggong_slave") || S.fates.dongchang_gong === "muse" || S.fates.dongchang_gong === "ally")) {
      if (!flag("punish_dossier")) {
        acts.push({ label: "翻閱・十大酷刑卷宗", fn: function(){ openPunishDossier(); } });
      } else {
        acts.push({ label: "重溫・十大酷刑卷宗", fn: function(){ openPunishDossier(); } });
      }
      acts.push({ label: "提審／用刑堂（廠務）", fn: function(){ dongchangPunishNpcDemo(); } });
      acts.push({ label: "夜晤督公", fn: function(){ donggongNightTalk(); } });
      acts.push({ label: "試探真名", fn: function(){ donggongProbeName(); } });
      acts.push({ label: "搜東廠密檔／夾層", fn: function(){ donggongSearchArchives(); } });
      if (flag("donggong_love") || (S.donggongTrust || 0) >= 30) {
        acts.push({ label: "撫平舊疤／示好", fn: function(){ donggongHealScarTalk(); } });
      }
      if (flag("donggong_slave") || hasUnlock("dongchang_slave")) {
        acts.push({ label: "廠奴請令", fn: function(){ donggongSlaveCommand(); } });
      }
      if (flag("donggong_truth_known") || flag("donggong_confessed")) {
        acts.push({ label: "【影事】面對督公真相", fn: function(){ openDonggongTruthChoice(); } });
      }
      acts.push({ label: "往行刑枱", fn: function(){ S.loc = "xingxing_tai"; setFlag("map_xingxing_tai"); toast("往行刑枱", true); render(); } });
      acts.push({ label: "往用刑室", fn: function(){ S.loc = "yongxing_shi"; setFlag("map_yongxing_shi"); toast("往用刑室", true); render(); } });
      if (NPCS.dongchang_gong && S.fates.dongchang_gong !== "dead" && S.fates.dongchang_gong !== "vanished") {
        acts.push({ label: "與督公對話", fn: function(){ talkNpc("dongchang_gong"); } });
      }
    }'''
must_replace(old_dc2, new_dc2, "dongchang location actions")

# yongxing_shi search
old_yx = '''    if (locId === "yongxing_shi") {
      acts.push({ label: "環視刑具（寫意）", fn: function(){
        S.exp += 2; bumpPalaceHeat(1);
        showStory("鎖鏈輕響。你沒有靠近——光是站在這裡，已夠人脊背發涼。", "punishYongxingShi");
      }});
      if (S.palaceRole === "dongchang" || S.palaceRole === "dongchang_boss" || flag("eunuch")) {
        acts.push({ label: "廠衛・提審", fn: function(){ dongchangPunishNpcDemo(); } });
      }
      if (typeof isImprisoned === "function" && isImprisoned()) {
        acts.push({ label: "捱過用刑（寫意）", fn: function(){
          applyPalacePunishment("tingzhang", { why: "獄中用刑", by: "dongchang_gong" });
        }});
      }
    }'''

new_yx = '''    if (locId === "yongxing_shi") {
      acts.push({ label: "環視刑具（寫意）", fn: function(){
        S.exp += 2; bumpPalaceHeat(1);
        showStory("鎖鏈輕響。你沒有靠近——光是站在這裡，已夠人脊背發涼。", "punishYongxingShi");
      }});
      if (S.palaceRole === "dongchang" || S.palaceRole === "dongchang_boss" || flag("eunuch") || flag("donggong_slave")) {
        acts.push({ label: "廠衛・提審", fn: function(){ dongchangPunishNpcDemo(); } });
        acts.push({ label: "搜用刑室暗格", fn: function(){ donggongSearchArchives(); } });
      }
      if (flag("donggong_slave") || hasUnlock("dongchang_slave")) {
        acts.push({ label: "廠奴請令", fn: function(){ donggongSlaveCommand(); } });
      }
      if (typeof isImprisoned === "function" && isImprisoned()) {
        acts.push({ label: "捱過用刑（寫意）", fn: function(){
          if (flag("donggong_slave") && S.flags.donggong_shield_day === S.day) {
            showStory("廠奴玄梧／督公以印擋下今日輕刑。獄卒退去。");
            bumpPalaceHeat(-3);
            return;
          }
          applyPalacePunishment("tingzhang", { why: "獄中用刑", by: "dongchang_gong" });
        }});
      }
    }'''
must_replace(old_yx, new_yx, "yongxing_shi search")

# ---- 20. Hook hougong talk / emperor hint & location enter ----
# After locationActions palace sections - find hougong 璇璣殿請安
must_replace(
    '''    if (locId === "hougong" && (flag("hougong_access") || S.palaceRole === "consort" || S.palaceRole === "lady" || (S.fates.jingandi === "married" || S.fates.jingandi === "muse"))) {
      acts.push({ label: "璇璣殿請安", fn: function(){ talkNpc("jingandi"); } });
    }''',
    '''    if (locId === "hougong" && (flag("hougong_access") || S.palaceRole === "consort" || S.palaceRole === "lady" || (S.fates.jingandi === "married" || S.fates.jingandi === "muse"))) {
      acts.push({ label: "璇璣殿請安", fn: function(){
        talkNpc("jingandi");
        setTimeout(function(){ try { donggongEmperorBrotherHint(); } catch (e) {} }, 600);
      }});
      if ((S.emperorFavor || 0) >= 30 || S.fates.jingandi === "muse" || S.fates.jingandi === "married") {
        acts.push({ label: "醉問・失散幼弟", fn: function(){
          setFlag("palace_wine_tonight");
          donggongEmperorBrotherHint();
          if (!flag("donggong_name_hint")) {
            setFlag("donggong_name_hint");
            ensureDonggongQuest(1);
            showStory("景安帝把酒盞一頓：「朕的幼弟……靖王。若還在人間，該與東廠某個影子一般年紀。」");
          }
        }});
      }
    }''',
    "hougong brother hint"
)

# Hook renyazi / heishui enter - find side_palace revenge or add to locationActions start
# Add near renyazi revenge block
must_replace(
    '''    // Revenge confrontation
    if (locId === "renyazi_alley" && flag("eunuch") && S.quests.side_palace_revenge && S.quests.side_palace_revenge.step >= 2 && !S.quests.side_palace_revenge.done) {''',
    '''    // 督公影事・敵人殘信
    if (locId === "renyazi_alley" || locId === "heishui") {
      try { donggongEnemyRemnantHook(locId); } catch (e) {}
    }
    // Revenge confrontation
    if (locId === "renyazi_alley" && flag("eunuch") && S.quests.side_palace_revenge && S.quests.side_palace_revenge.step >= 2 && !S.quests.side_palace_revenge.done) {''',
    "enemy remnant hook"
)

# ALLOWED_FLAGS for shield / enemy letter
must_replace(
    '"donggong_night_talk","donggong_name_hint","donggong_search_done"\n  ];',
    '"donggong_night_talk","donggong_name_hint","donggong_search_done","donggong_enemy_letter","donggong_shield_today"\n  ];',
    "extra flags"

)

# palaceIdentityLabel slave chip
must_replace(
    '''    if ((S.emperorFavor || 0) >= 40) bits.push("帝寵");
    if ((S.palaceHeat || 0) >= 40) bits.push("物議沸騰");
    return bits.length ? bits.join("／") : "閒人入禁";''',
    '''    if ((S.emperorFavor || 0) >= 40) bits.push("帝寵");
    if ((S.palaceHeat || 0) >= 40) bits.push("物議沸騰");
    if (flag("donggong_slave")) bits.push(flag("donggong_truth_known") ? "廠奴・玄梧" : "廠奴・督公");
    return bits.length ? bits.join("／") : "閒人入禁";''',
    "palaceIdentity slave"
)

# countAllyBonds include slave
must_replace(
    'if (["ally","hero","master","teacher","partner","married","muse"].indexOf(S.fates[id]) >= 0) n++;',
    'if (["ally","hero","master","teacher","partner","married","muse","slave","redeemed"].indexOf(S.fates[id]) >= 0) n++;',
    "countAllyBonds slave"
)

# hasAnySpouseOrMuse include donggong muse
# already covered via fates muse

# Export new fns on window debug if present
must_replace(
    '    resolveEnding, estimateEndingId, finishChapter3, inviteCompanion, openRumorBoard,\n    campOvernight, ENDING_DEFS, locationActions, startCombat, finishChapter2\n  };',
    '    resolveEnding, estimateEndingId, finishChapter3, inviteCompanion, openRumorBoard,\n    campOvernight, ENDING_DEFS, locationActions, startCombat, finishChapter2,\n    bumpDonggongTrust, openDonggongTruthChoice, donggongNightTalk, donggongSlaveCommand\n  };',
    "window exports"
)

# Fix inviteCompanion - check if it exists and accepts npc id
if "function inviteCompanion" not in src:
    print("WARN no inviteCompanion")

path.write_text(src, encoding="utf-8")
print("WROTE", path, "delta bytes", len(src) - len(orig))
print("DONE OK" if src != orig else "NO CHANGES?")
