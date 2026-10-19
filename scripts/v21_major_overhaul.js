// ========== V21: 物品／好感追求／劇情／群俠地圖／武功加深 ==========
  // Homage: 群俠傳式大地圖＋江湖養成；青梧原創名，禁金庸IP／真實清帝號。

  const V21_ITEM_KIND = {
    consumable: "消耗", weapon: "武器", armor: "防具", accessory: "飾品",
    key: "劇情", mount: "坐騎", material: "材料", gift: "禮品", manual: "秘籍", food: "食飲"
  };

  const V21_NEW_ITEMS = {
    // materials
    iron_scrap: { id:"iron_scrap", name:"廢鐵塊", type:"material", kind:"material", rarity:"common", desc:"可交鐵匠或換銀。", price:8, sources:["龍門鎮打鐵／戰鬥掉落"], uses:["鍛造材料／賣店"] },
    silk_scrap: { id:"silk_scrap", name:"碎錦", type:"material", kind:"material", rarity:"common", desc:"裁衣剩餘。", price:12, sources:["京畿／內務府"], uses:["送禮半成品／換銀"] },
    spirit_herb: { id:"spirit_herb", name:"靈芝芽", type:"material", kind:"material", rarity:"rare", desc:"藥谷特產。", price:35, sources:["藥谷採集"], uses:["煉丹／送禮醫者"] },
    beast_fang: { id:"beast_fang", name:"獸牙", type:"material", kind:"material", rarity:"common", desc:"野獸牙骨。", price:10, sources:["雪原／邊關獵事"], uses:["鍛飾／換銀"] },
    // gifts
    gift_fan: { id:"gift_fan", name:"素絹扇", type:"gift", kind:"gift", rarity:"common", desc:"文雅小禮，可贈人。", price:28, favor:6, sources:["青城／京畿店"], uses:["贈送提升好感"] },
    gift_jade_hair: { id:"gift_jade_hair", name:"碧玉簪", type:"gift", kind:"gift", rarity:"rare", desc:"精緻簪子。", price:70, favor:12, sources:["古蘭商會"], uses:["贈送大幅提升好感"] },
    gift_wine_jar: { id:"gift_wine_jar", name:"陳年酒罈", type:"gift", kind:"gift", rarity:"common", desc:"烈而香。", price:32, favor:7, sources:["京畿客棧"], uses:["贈豪爽之人"] },
    gift_poem: { id:"gift_poem", name:"自抄詩箋", type:"gift", kind:"gift", rarity:"common", desc:"你手寫的詩。", price:5, favor:5, sources:["自行抄寫（設定／行動）"], uses:["贈文人雅士"] },
    gift_brocade: { id:"gift_brocade", name:"蜀錦帕", type:"gift", kind:"gift", rarity:"rare", desc:"軟帕暗香。", price:55, favor:10, sources:["京畿／宮市"], uses:["贈送"] },
    // food
    steamed_bun: { id:"steamed_bun", name:"熱饅頭", type:"consumable", kind:"food", rarity:"common", heal:15, desc:"充飢略補氣血。", price:4, sources:["青城攤販"], uses:["食用"] },
    travel_ration: { id:"travel_ration", name:"乾糧包", type:"consumable", kind:"food", rarity:"common", heal:12, neili:5, desc:"趕路用。", price:9, sources:["邊關／雷峰"], uses:["食用"] },
    lotus_seed_soup: { id:"lotus_seed_soup", name:"蓮子羹", type:"consumable", kind:"food", rarity:"rare", heal:28, neili:12, desc:"清心。", price:30, sources:["梅花塢／水雲"], uses:["食用"] },
    // manuals
    manual_basic_fist: { id:"manual_basic_fist", name:"《入門拳訣》", type:"manual", kind:"manual", rarity:"common", desc:"習後可練基本拳腳熟練。", price:40, skillId:"basic_strike", sources:["破碗幫／青城"], uses:["研讀＋熟練"] },
    manual_cloud_note: { id:"manual_cloud_note", name:"《雲掌殘箋》", type:"manual", kind:"manual", rarity:"rare", desc:"蒼雲一脈殘箋。", price:0, skillId:"cloud_palm", sources:["蒼雲寺機緣"], uses:["研讀習雲嵐掌／熟練"] },
    manual_frost_leaf: { id:"manual_frost_leaf", name:"《霜華葉》", type:"manual", kind:"manual", rarity:"rare", desc:"白雪莊劍意一葉。", price:0, skillId:"snow_sword", sources:["白雪莊"], uses:["研讀"] },
    // more gear
    short_bow: { id:"short_bow", name:"短木弓", type:"weapon", kind:"weapon", rarity:"common", atk:5, agi:2, desc:"輕便遠射形制（戰鬥仍作近攻加成）。", price:48, sources:["邊關軍市"], uses:["裝備"] },
    traveler_boots: { id:"traveler_boots", name:"行路靴", type:"armor", kind:"armor", rarity:"common", def:3, agi:2, desc:"趕路不磨腳。", price:42, sources:["龍門／黃沙"], uses:["裝備"] },
    luck_coin: { id:"luck_coin", name:"壓勝錢", type:"accessory", kind:"accessory", rarity:"common", luck:2, desc:"市井壓勝。", price:25, sources:["青城攤"], uses:["裝備"] },
    medicine_kit: { id:"medicine_kit", name:"行醫箱", type:"accessory", kind:"accessory", rarity:"rare", medicine:4, antitoxin:1, desc:"蘇家式樣。", price:95, sources:["藥谷"], uses:["裝備"] },
    focus_band: { id:"focus_band", name:"束心帶", type:"accessory", kind:"accessory", rarity:"rare", focus:3, desc:"束髮定心。", price:68, sources:["天台觀"], uses:["裝備"] },
    // story keys for new plots
    plot_bowl_token: { id:"plot_bowl_token", name:"破碗信籌", type:"key", kind:"key", rarity:"rare", desc:"破碗幫分舵信物。", price:0, sources:["青城破碗支線"], uses:["開啟幫務"] },
    plot_border_letter: { id:"plot_border_letter", name:"邊關急報", type:"key", kind:"key", rarity:"rare", desc:"沈孤鴻託你轉交。", price:0, sources:["邊關支線"], uses:["交雷峰／京畿"] },
    plot_silent_string: { id:"plot_silent_string", name:"無弦絲", type:"key", kind:"key", rarity:"epic", desc:"無音谷怪絲。", price:0, sources:["無音谷支線"], uses:["劇情"] },
    plot_sea_pearl: { id:"plot_sea_pearl", name:"灰港夜珠", type:"key", kind:"key", rarity:"rare", desc:"走私船上的珠。", price:0, sources:["煙灰港"], uses:["交慕容煙／賣"] },
    plot_peak_challenge: { id:"plot_peak_challenge", name:"蒼峰戰帖", type:"key", kind:"key", rarity:"rare", desc:"論劍邀約。", price:0, sources:["赤霞崖／蒼峰"], uses:["赴約"] }
  };

  const V21_ITEM_SOURCE_FALLBACK = {
    herb: ["藥谷／商店／野地"], pill: ["商店／藥谷"], wine: ["客棧"], candy: ["青城"],
    wood_sword: ["青城店"], iron_blade: ["黑水／黃沙"], cloth: ["商店"],
    ancient_key: ["主線／黑風／雲空"], map_fragment: ["主線"], hanxue_horse: ["太僕／沙漠奇遇"]
  };

  const V21_ROMANCE_POOL = [
    "guqinghan","linqing","suning","chixiaxian","mu_youlan","ren_yingluo","ye_xiaoyu",
    "zhao_minyan","jianning_jun","shen_guifei","duan_muyu","sha_yuyan","huang_rongya",
    "ning_shuying","baizhi","shuang_er_x","a_ke_x","lin_feng","shenguhong","qiao_fengshan"
  ];

  const V21_PURSUE_THRESHOLD = 70;

  const V21_NEW_PLOTS = [
    { id:"side_v21_bowl", title:"支線・破碗夜籌", cat:"side", loc:"qingcheng", npc:"powan_zhang",
      hint:"青城找破碗長老，打聽分舵信籌。", steps:["打聽","取籌","交回幫中"], reward:"破碗信籌／熟練＋幫譽" },
    { id:"side_v21_border", title:"支線・邊關急報", cat:"side", loc:"bianguan", npc:"shenguhong",
      hint:"邊關見沈孤鴻，接下急報送往雷峰或京畿。", steps:["接報","送達","回報"], reward:"聲望／邊關人情" },
    { id:"side_v21_herb2", title:"支線・靈芝芽", cat:"side", loc:"yaogu", npc:"suning",
      hint:"藥谷採靈芝芽，或贈蘇晚晴。", steps:["採藥","交付"], reward:"靈芝芽／醫術緣" },
    { id:"side_v21_silent", title:"支線・無弦絲", cat:"side", loc:"wuyin", npc:"wuyinqinmo",
      hint:"無音谷探無弦之絲（需解鎖無音谷）。", steps:["入谷","試音","取絲"], reward:"無弦絲／琴意" },
    { id:"side_v21_sea", title:"支線・灰港夜珠", cat:"side", loc:"yanhui", npc:"murong",
      hint:"煙灰港幫慕容煙查夜珠。", steps:["打聽","尋珠","交還或私吞"], reward:"海圖人情／善惡分歧" },
    { id:"side_v21_peak", title:"支線・蒼峰戰帖", cat:"side", loc:"chixia", npc:"ye_qingshan",
      hint:"赤霞崖／蒼峰一線取得戰帖並赴論劍。", steps:["得帖","赴約","論劍"], reward:"劍法熟練／蒼峰人情" },
    { id:"side_v21_snow", title:"支線・雪原牙骨", cat:"side", loc:"xueyuan", npc:null,
      hint:"雪原關獵事，取獸牙。", steps:["獵事","帶回"], reward:"獸牙／皮料" },
    { id:"side_v21_mei", title:"支線・塢中夜曲", cat:"side", loc:"meihua", npc:"linqing",
      hint:"梅花塢請林清歌奏一曲，提升好感。", steps:["拜訪","聽琴","回禮"], reward:"好感／蓮子羹" },
    { id:"side_v21_forge", title:"支線・廢鐵重鑄", cat:"side", loc:"longmen", npc:"zhaotie",
      hint:"帶廢鐵塊找趙鐵山重鑄。", steps:["交鐵","等待","取器"], reward:"武器小強化／熟練" },
    { id:"side_v21_dao", title:"支線・觀星一夜", cat:"side", loc:"tiantai", npc:"daoxuan",
      hint:"天台觀看星，定力＋心法。", steps:["入觀","觀星"], reward:"定力／束心帶機緣" }
  ];

  // Extra MAP_PINS for palace / missing
  const V21_EXTRA_PINS = {
    wumen:{x:58,y:27}, taihedian:{x:59,y:25}, qianqing:{x:60,y:24}, yangxin:{x:60,y:23},
    wenyuan:{x:57,y:25}, yushan:{x:58,y:24}, neiwufu:{x:56,y:26}, yuhuayuan:{x:61,y:23},
    dianshi:{x:57,y:27}, wuying:{x:55,y:27}, tianlao:{x:54,y:29}, xingbu_prison:{x:53,y:31},
    xingbu_gate:{x:54,y:32}, bingzhang:{x:55,y:28}, siku:{x:56,y:25}, taipusi:{x:53,y:28},
    taiyiyuan:{x:57,y:29}, jingshen:{x:55,y:29}, yuhe_wharf:{x:62,y:29}, shenwu:{x:58,y:22},
    xingxing_tai:{x:54,y:28}, yongxing_shi:{x:53,y:29}, mishi:{x:38,y:58}
  };

  // Sensible NPC home overrides (homage originals only)
  const V21_NPC_HOME = {
    ye_qingshan:"chixia", lin_feng:"qingcheng", ning_shuying:"chixia", ye_xiaoyu:"longmen",
    lin_chen:"qingcheng", ren_yingluo:"honglian", feng_qingya:"wuyin", qu_yangqin:"meihua",
    qiao_fengshan:"qingcheng", duan_muyu:"luohe", xu_zhuoyun:"cangyun",
    zhang_wujiang:"bianguan", zhao_minyan:"jingji", zhou_zhi_xue:"honglian",
    hong_qigong_x:"qingcheng", huang_yaoshi_x:"yanhui", ouyang_fengdu:"shamo",
    xiao_longyin:"yewang", yang_guochen:"yewang", guo_jingyi:"bianguan", huang_rongya:"jingji",
    dongfang_gubai:"honglian", zuo_lengying:"leifeng", mu_gaofeng_x:"heishui",
    wei_xiaozhou:"huanggong", chen_jinnan_x:"yanhui", jianning_jun:"hougong",
    hai_dafu_x:"dongchang", ao_baiying:"yulin", shuang_er_x:"jingji",
    su_quan_x:"honglian", hong_antong_x:"yanhui", jiu_nan_x:"cangyun", a_ke_x:"neiting",
    mu_jianping_x:"neiting", fang_yi_x:"neiting", mao_dongzhu_x:"hougong",
    duo_long_x:"yulin", suo_etu_x:"qianqing", wu_sangui_x:"bianguan", shi_lang_x:"yanhui",
    mao_shiba_x:"jingji", powan_zhang:"qingcheng", gu_xiaoran:"chixia",
    huang_linger:"jingji", sha_yuyan:"shamo", hai_kuang:"yanhui", mu_youlan:"yewang"
  };

  function ensureV21() {
    if (!S.npcFavor || typeof S.npcFavor !== "object") S.npcFavor = {};
    if (!S.skillMastery || typeof S.skillMastery !== "object") S.skillMastery = {};
    if (!S.v21) S.v21 = { pursueDay: 0, plotsSeeded: false, mapMode: "pins" };
    if (typeof S.saveVer !== "number" || S.saveVer < 11) S.saveVer = 11;
    // merge new items
    Object.keys(V21_NEW_ITEMS).forEach(function(id) {
      if (!ITEMS[id]) ITEMS[id] = V21_NEW_ITEMS[id];
      else {
        const n = V21_NEW_ITEMS[id];
        if (!ITEMS[id].kind) ITEMS[id].kind = n.kind || ITEMS[id].type;
        if (!ITEMS[id].sources) ITEMS[id].sources = n.sources;
        if (!ITEMS[id].uses) ITEMS[id].uses = n.uses;
        if (n.favor && !ITEMS[id].favor) ITEMS[id].favor = n.favor;
        if (n.skillId && !ITEMS[id].skillId) ITEMS[id].skillId = n.skillId;
      }
    });
    // annotate existing items
    Object.keys(ITEMS).forEach(function(id) {
      const it = ITEMS[id];
      if (!it.kind) it.kind = it.type;
      if (!it.sources) it.sources = V21_ITEM_SOURCE_FALLBACK[id] || ["江湖獲取／任務／商店"];
      if (!it.uses) {
        if (it.type === "consumable") it.uses = ["背包使用／戰鬥使用"];
        else if (it.type === "weapon" || it.type === "armor" || it.type === "accessory") it.uses = ["裝備"];
        else if (it.type === "key") it.uses = ["劇情／解鎖"];
        else if (it.type === "mount") it.uses = ["騎乘（全圖通行）"];
        else it.uses = ["持有"];
      }
    });
    // pins
    Object.keys(V21_EXTRA_PINS).forEach(function(id) {
      if (!MAP_PINS[id]) MAP_PINS[id] = V21_EXTRA_PINS[id];
    });
    // NPC homes: always re-apply (NPCS table resets each page load)
    Object.keys(V21_NPC_HOME).forEach(function(id) {
      if (NPCS[id] && V21_NPC_HOME[id]) NPCS[id].loc = V21_NPC_HOME[id];
    });
    setFlag("v21_npc_homes", true);
    // shop expand
    try {
      const addShop = function(loc, ids) {
        if (!SHOPS[loc]) SHOPS[loc] = [];
        ids.forEach(function(id){ if (SHOPS[loc].indexOf(id) < 0) SHOPS[loc].push(id); });
      };
      addShop("qingcheng", ["steamed_bun","gift_fan","luck_coin","manual_basic_fist","iron_scrap"]);
      addShop("jingji", ["gift_wine_jar","gift_brocade","travel_ration","silk_scrap"]);
      addShop("longmen", ["iron_scrap","traveler_boots","beast_fang"]);
      addShop("shamo", ["travel_ration","short_bow","beast_fang"]);
      addShop("gulan", ["gift_jade_hair","silk_scrap"]);
      addShop("yanhui", ["gift_wine_jar","travel_ration"]);
    } catch (e) {}
    seedV21Plots();
    // skill mastery defaults
    (S.skills || []).forEach(function(sid) {
      if (typeof S.skillMastery[sid] !== "number") S.skillMastery[sid] = 1;
    });
  }

  function seedV21Plots() {
    if (!S.quests) return;
    V21_NEW_PLOTS.forEach(function(p) {
      if (!S.quests[p.id]) {
        S.quests[p.id] = {
          id: p.id, title: p.title, hint: p.hint, step: 0, done: false,
          cat: p.cat || "side", loc: p.loc, npc: p.npc || null, v21: true,
          steps: p.steps || [], reward: p.reward || ""
        };
      }
    });
    if (typeof ensureQuestSystemV20 === "function") {
      try { ensureQuestSystemV20(); } catch (e) {}
    }
  }

  function npcFavorOf(npcId) {
    ensureV21();
    if (typeof S.npcFavor[npcId] === "number") return Math.max(0, Math.min(100, S.npcFavor[npcId]));
    // seed from datingAff if any
    if (S.datingAff && typeof S.datingAff[npcId] === "number") return Math.max(0, Math.min(100, S.datingAff[npcId]));
    return 20;
  }

  function bumpNpcFavor(npcId, delta, reason) {
    ensureV21();
    if (!npcId || !delta) return npcFavorOf(npcId);
    const next = Math.max(0, Math.min(100, npcFavorOf(npcId) + delta));
    S.npcFavor[npcId] = next;
    if (S.datingAff && typeof bumpDatingAff === "function" && Math.abs(delta) >= 2) {
      try { bumpDatingAff(npcId, Math.round(delta * 0.5)); } catch (e) {}
    }
    if (Math.abs(delta) >= 3) toast((NPCS[npcId] ? NPCS[npcId].name : npcId) + "好感" + (delta > 0 ? "＋" : "") + delta + (reason ? "（" + reason + "）" : ""), true);
    if (delta > 0 && next >= V21_PURSUE_THRESHOLD) maybeNpcPursue(npcId);
    return next;
  }

  function isRomanceEligible(npcId) {
    if (!npcId || !NPCS[npcId]) return false;
    const f = S.fates[npcId];
    if (f === "dead" || f === "vanished" || f === "enemy") return false;
    if (typeof isDating === "function" && isDating(npcId)) return false;
    return V21_ROMANCE_POOL.indexOf(npcId) >= 0 || !!(NPCS[npcId].major);
  }

  function maybeNpcPursue(npcId) {
    ensureV21();
    if (!isRomanceEligible(npcId)) return;
    if (flag("v21_pursue_done_" + npcId) || flag("v21_pursue_reject_" + npcId)) return;
    if (S.day === S.v21.pursueDay && flag("v21_pursue_today")) return;
    // chance scales with favor
    const fav = npcFavorOf(npcId);
    if (fav < V21_PURSUE_THRESHOLD) return;
    if (Math.random() > 0.35 + (fav - V21_PURSUE_THRESHOLD) * 0.01) return;
    S.v21.pursueDay = S.day;
    setFlag("v21_pursue_today", true);
    openPursueModal(npcId);
  }

  function openPursueModal(npcId) {
    const n = NPCS[npcId];
    if (!n) return;
    const name = n.name;
    const lines = [
      name + "忽然認真看你：「這些日子……我心裡只有你一人。可願與我……」",
      name + "耳根微紅：「若你不嫌，我想……與你雙宿雙飛。」",
      name + "低聲道：「江湖再大，不如你在身旁。你可答我？」"
    ];
    const line = lines[Math.floor(Math.random() * lines.length)];
    openModal("<h3>【追求】</h3><div class=\"story-box\">" + escapeHtml(line) + "</div><div class=\"btn-row\">" +
      "<button type=\"button\" class=\"btn primary\" id=\"v21-p-yes\">答應（定情）</button>" +
      "<button type=\"button\" class=\"btn\" id=\"v21-p-muse\">願先做知音</button>" +
      "<button type=\"button\" class=\"btn ghost\" id=\"v21-p-no\">婉拒</button></div>");
    const yes = document.getElementById("v21-p-yes");
    const muse = document.getElementById("v21-p-muse");
    const no = document.getElementById("v21-p-no");
    if (yes) yes.onclick = function() {
      closeModal();
      setFate(npcId, "married");
      bumpNpcFavor(npcId, 8, "定情");
      setFlag("v21_pursue_done_" + npcId, true);
      if (typeof onDatingStarted === "function") onDatingStarted(npcId);
      showStory(name + "眼中亮起光：「……好。從今起，你我同心。」");
    };
    if (muse) muse.onclick = function() {
      closeModal();
      setFate(npcId, "muse");
      bumpNpcFavor(npcId, 5, "知音");
      setFlag("v21_pursue_done_" + npcId, true);
      if (typeof onDatingStarted === "function") onDatingStarted(npcId);
      showStory(name + "輕笑：「知音也好。來日方長。」");
    };
    if (no) no.onclick = function() {
      closeModal();
      bumpNpcFavor(npcId, -12, "婉拒");
      setFlag("v21_pursue_reject_" + npcId, true);
      showStory(name + "沉默片刻：「……我明白了。江湖路遠，各自珍重。」");
    };
  }

  function listGiftItems() {
    return Object.keys(S.inv || {}).filter(function(id) {
      const it = ITEMS[id];
      return it && (it.type === "gift" || it.kind === "gift" || it.favor);
    });
  }

  function giftToNpc(npcId, itemId) {
    ensureV21();
    const it = ITEMS[itemId];
    if (!it || !hasItem(itemId)) { toast("沒有此物", true); return; }
    if (!(it.type === "gift" || it.kind === "gift" || it.favor)) { toast("此物不宜作禮", true); return; }
    removeItem(itemId, 1);
    let delta = it.favor || 5;
    // personality tweak
    const prof = (typeof npcProfile === "function") ? npcProfile(npcId) : null;
    if (prof && prof.personality === "proud" && itemId.indexOf("poem") >= 0) delta += 2;
    if (prof && prof.personality === "ruthless" && itemId.indexOf("wine") >= 0) delta += 2;
    if (prof && prof.personality === "healer" && (itemId.indexOf("herb") >= 0 || itemId === "spirit_herb")) delta += 3;
    bumpNpcFavor(npcId, delta, "贈" + it.name);
    if (typeof pushNpcMem === "function") {
      try { pushNpcMem(npcId, "收到禮物：" + it.name); } catch (e) {}
    }
    showStory((NPCS[npcId] ? NPCS[npcId].name : "") + "接過「" + it.name + "」，神色柔和了幾分。（好感＋" + delta + "）");
    try { saveGameSilent(); } catch (e) {}
  }

  function openGiftPicker(npcId) {
    const gifts = listGiftItems();
    if (!gifts.length) { toast("背包無合適禮品（商店有素絹扇等）", true); return; }
    let html = "<p>贈予 <strong>" + escapeHtml(NPCS[npcId].name) + "</strong>（當前好感 " + npcFavorOf(npcId) + "）</p><div class=\"btn-row\">";
    gifts.forEach(function(id) {
      const it = ITEMS[id];
      html += "<button type=\"button\" class=\"btn\" data-v21-gift=\"" + id + "\">" + escapeHtml(it.name) + " ×" + S.inv[id] + "（約＋" + (it.favor || 5) + "）</button>";
    });
    html += "<button type=\"button\" class=\"btn ghost\" id=\"v21-gift-cancel\">取消</button></div>";
    const bg = document.getElementById("modal-bg");
    const body = document.getElementById("modal-body");
    if (!bg || !body) return;
    body.innerHTML = "<h3>送禮</h3>" + html;
    bg.classList.add("show");
    body.querySelectorAll("[data-v21-gift]").forEach(function(b) {
      b.onclick = function() {
        bg.classList.remove("show");
        giftToNpc(npcId, b.getAttribute("data-v21-gift"));
      };
    });
    const c = document.getElementById("v21-gift-cancel");
    if (c) c.onclick = function(){ bg.classList.remove("show"); };
  }

  // ---- Martial mastery ----
  function skillMasteryOf(sid) {
    ensureV21();
    const v = S.skillMastery[sid];
    return typeof v === "number" ? Math.max(1, Math.min(10, v)) : 1;
  }

  function bumpSkillMastery(sid, delta, reason) {
    ensureV21();
    if (!sid || !SKILLS[sid]) return;
    if ((S.skills || []).indexOf(sid) < 0) {
      S.skills.push(sid);
      S.skillMastery[sid] = 1;
    }
    const next = Math.max(1, Math.min(10, skillMasteryOf(sid) + (delta || 1)));
    S.skillMastery[sid] = next;
    toast(SKILLS[sid].name + "熟練→" + next + (reason ? "（" + reason + "）" : ""), true);
    return next;
  }

  function masteryPowerBonus(sid) {
    const m = skillMasteryOf(sid);
    return Math.floor((m - 1) * 1.8); // +0..16
  }

  function practiceSkillAtCamp() {
    ensureV21();
    if (!(S.skills && S.skills.length)) { toast("尚未學會武功", true); return; }
    const sid = S.skills[Math.floor(Math.random() * S.skills.length)];
    const cost = 4;
    if (S.neili < cost) { toast("內力不足，先調息", true); return; }
    S.neili -= cost;
    S.dayPart = (S.dayPart || 0) + 1;
    if (S.dayPart > 3) { S.dayPart = 0; S.day = (S.day || 1) + 1; }
    bumpSkillMastery(sid, 1, "苦練");
    // small chance learn linked
    if (Math.random() < 0.08 && S.faction) {
      const f = FACTIONS[S.faction];
      if (f && f.skills) {
        for (let i = 0; i < f.skills.length; i++) {
          if (S.skills.indexOf(f.skills[i]) < 0) {
            S.skills.push(f.skills[i]);
            S.skillMastery[f.skills[i]] = 1;
            toast("苦練中頓悟：" + SKILLS[f.skills[i]].name, true);
            break;
          }
        }
      }
    }
    showStory("你於僻靜處演練「" + SKILLS[sid].name + "」，汗透衣背。熟練度有進。");
    try { saveGameSilent(); } catch (e) {}
    render();
  }

  function useManual(itemId) {
    const it = ITEMS[itemId];
    if (!it || !hasItem(itemId)) return;
    if (it.type !== "manual" && it.kind !== "manual") { toast("非秘籍", true); return; }
    removeItem(itemId, 1);
    const sid = it.skillId || "basic_strike";
    if (!SKILLS[sid]) { toast("殘頁難辨", true); return; }
    if ((S.skills || []).indexOf(sid) < 0) {
      S.skills.push(sid);
      S.skillMastery[sid] = 1;
      showStory("你研讀「" + it.name + "」，學會【" + SKILLS[sid].name + "】！");
    } else {
      bumpSkillMastery(sid, 2, "研讀");
      showStory("舊技翻新，「" + SKILLS[sid].name + "」更上層樓。");
    }
    render();
  }

  // wrap use skill power — patch castSkill if exists
  const _v21_castSkill = typeof castSkill === "function" ? castSkill : null;
  if (_v21_castSkill) {
    // will hook via combat damage path below
  }

  // ---- Map pins (Heroes-style) ----
  function renderWorldMapPinsHtml() {
    ensureV21();
    const questLocs = (typeof activeQuestLocIds === "function") ? activeQuestLocIds() : new Set();
    let pins = "";
    const ids = Object.keys(MAP_PINS || {});
    ids.forEach(function(id) {
      const pin = MAP_PINS[id];
      if (!pin) return;
      const loc = LOCATIONS.find(function(l){ return l.id === id; });
      if (!loc) return;
      // hide deep palace pins until palace access (declutter)
      if (loc.region === "京畿皇城" && id !== "dongchang" && id !== "jingji" && id !== "gongmen_yi" && id !== "huanggong" && id !== "renyazi_alley") {
        if (!(typeof locUnlocked === "function" && locUnlocked(loc))) return;
        // still show only hub palace spots on overview; card list has rest
        if (["wumen","qianqing","yangxin","hougong","yulin","neiting"].indexOf(id) < 0 && id !== "huanggong" && id !== "dongchang") return;
      }
      const unlocked = typeof locUnlocked === "function" ? locUnlocked(loc) : !!loc.unlock;
      const here = S.loc === id;
      const npcs = unlocked ? (typeof npcAtLocation === "function" ? npcAtLocation(id) : []) : [];
      let faces = "";
      if (npcs.length) {
        faces = "<div class=\"map-pin-faces\">";
        npcs.slice(0, 3).forEach(function(nid) {
          faces += "<span class=\"map-pin-face\">" + (typeof chibiHtml === "function" ? chibiHtml(nid, "sm") : "") + "</span>";
        });
        if (npcs.length > 3) faces += "<span class=\"map-pin-more\">+" + (npcs.length - 3) + "</span>";
        faces += "</div>";
      }
      const q = questLocs.has(id) ? "<span class=\"map-pin-quest\">❗</span>" : "";
      pins += "<button type=\"button\" class=\"map-pin" + (here ? " here" : "") + (unlocked ? "" : " locked") + "\" data-go=\"" + id + "\" " + (unlocked ? "" : "disabled") +
        " style=\"left:" + pin.x + "%;top:" + pin.y + "%\" title=\"" + escapeHtml(loc.name) + "\">" +
        q + "<span class=\"map-pin-dot\"></span>" +
        "<span class=\"map-pin-label\">" + escapeHtml(loc.name) + "</span>" + faces +
        "</button>";
    });
    return "<div class=\"world-map-wrap\"><img class=\"world-map-img\" src=\"" + asset("worldmap") + "\" alt=\"江湖地圖\" />" +
      "<div class=\"world-map-pins\">" + pins + "</div></div>" +
      "<p class=\"world-map-hint small\">群俠式地圖：點標記前往 · 頭像＝在場人物（原創致敬名）</p>";
  }

  // ---- Plot location actions ----
  function v21PlotActions(locId) {
    ensureV21();
    const acts = [];
    const q = function(id){ return S.quests && S.quests[id]; };

    if (locId === "hub" || locId === "qingcheng" || locId === "cangyun" || locId === "tiantai" || locId === "baixue") {
      acts.push({ label: "【武功】苦練一式", fn: practiceSkillAtCamp });
    }

    // bowl
    const qb = q("side_v21_bowl");
    if (locId === "qingcheng" && qb && !qb.done) {
      acts.push({ label: "【支線】破碗夜籌", fn: function() {
        if (qb.step === 0) {
          qb.step = 1; qb.hint = "向破碗長老取信籌。";
          bumpNpcFavor("powan_zhang", 4, "打聽幫務");
          showStory("破碗長老敲敲碗沿：「分舵要信籌。你若夠義氣，幫裡記一筆。」");
        } else if (qb.step === 1) {
          addItem("plot_bowl_token", 1); qb.step = 2; qb.hint = "把破碗信籌交回幫中。";
          showStory("碗底暗格一彈——破碗信籌入手。");
        } else {
          if (!hasItem("plot_bowl_token")) { toast("信籌呢？", true); return; }
          removeItem("plot_bowl_token", 1);
          qb.done = true; qb.step = 3;
          S.factionRep = S.factionRep || {};
          S.factionRep.powan_bang = (S.factionRep.powan_bang || 0) + 8;
          bumpSkillMastery("jiaohua_quan", 1, "幫務");
          if ((S.skills || []).indexOf("jiaohua_quan") < 0 && SKILLS.jiaohua_quan) {
            S.skills.push("jiaohua_quan"); S.skillMastery.jiaohua_quan = 1;
          }
          showStory("長老收了籌：「好。叫花拳的門道，慢慢教你。」（破碗幫聲望↑）");
        }
        try { saveGameSilent(); } catch(e){}
      }});
    }

    const qborder = q("side_v21_border");
    if (locId === "bianguan" && qborder && !qborder.done && qborder.step === 0) {
      acts.push({ label: "【支線】接沈孤鴻急報", fn: function() {
        addItem("plot_border_letter", 1);
        qborder.step = 1; qborder.hint = "把邊關急報送到雷峰哨或京畿客棧。";
        bumpNpcFavor("shenguhong", 6, "託付");
        showStory("沈孤鴻把密函塞到你手裡：「快。遲則邊軍缺糧。」");
        try { saveGameSilent(); } catch(e){}
      }});
    }
    if ((locId === "leifeng" || locId === "jingji") && qborder && qborder.step === 1 && hasItem("plot_border_letter")) {
      acts.push({ label: "【支線】交付邊關急報", fn: function() {
        removeItem("plot_border_letter", 1);
        qborder.step = 2; qborder.done = true;
        S.renown = (S.renown || 0) + 5;
        bumpNpcFavor("shenguhong", 5, "送達");
        bumpNpcFavor("leiwanshan", 4, "公文");
        showStory("急報送達。哨上鬆了口氣，你聲名又傳開一截。");
        try { saveGameSilent(); } catch(e){}
      }});
    }

    const qh = q("side_v21_herb2");
    if (locId === "yaogu" && qh && !qh.done) {
      acts.push({ label: "【支線】採靈芝芽", fn: function() {
        if (qh.step === 0) {
          addItem("spirit_herb", 1); qh.step = 1; qh.hint = "可贈蘇晚晴，或自行留用。";
          showStory("谷風一過，靈芝芽落於掌心。");
        } else {
          if (hasItem("spirit_herb")) {
            removeItem("spirit_herb", 1);
            bumpNpcFavor("suning", 10, "靈芝");
            qh.done = true; qh.step = 2;
            S.medicine = (S.medicine || 0) + 1;
            showStory("蘇晚晴接過靈芝芽，眉眼含笑：「有心。」（醫術＋1）");
          } else {
            qh.done = true; showStory("你已自行留下藥材，此事了了。");
          }
        }
        try { saveGameSilent(); } catch(e){}
      }});
    }

    const qs = q("side_v21_silent");
    if (locId === "wuyin" && qs && !qs.done) {
      acts.push({ label: "【支線】探無弦絲", fn: function() {
        if (qs.step === 0) {
          qs.step = 1; showStory("谷中無鳥。琴魔似笑非笑：「絲在淵底。你敢取？」");
        } else {
          addItem("plot_silent_string", 1); qs.done = true; qs.step = 2;
          if ((S.skills||[]).indexOf("silent_song") < 0 && SKILLS.silent_song) {
            S.skills.push("silent_song"); S.skillMastery.silent_song = 1;
          } else bumpSkillMastery("silent_song", 1, "無弦");
          bumpNpcFavor("wuyinqinmo", 6, "取絲");
          showStory("你拈起無弦絲，耳中如有無音。");
        }
        try { saveGameSilent(); } catch(e){}
      }});
    }

    const qsea = q("side_v21_sea");
    if (locId === "yanhui" && qsea && !qsea.done) {
      acts.push({ label: "【支線】查灰港夜珠", fn: function() {
        if (qsea.step === 0) {
          qsea.step = 1; qsea.hint = "在港區搜尋夜珠，交還或私吞。";
          showStory("慕容煙吐煙圈：「夜珠丟了。找回來——價錢好說。」");
        } else if (qsea.step === 1) {
          addItem("plot_sea_pearl", 1); qsea.step = 2;
          showStory("甲板縫裡一顆灰光夜珠。交還，或……");
        } else if (hasItem("plot_sea_pearl")) {
          openModal("<h3>夜珠在手</h3><div class=\"story-box\">交還慕容煙，或私吞變賣？</div><div class=\"btn-row\">" +
            "<button type=\"button\" class=\"btn primary\" id=\"v21-sea-return\">交還</button>" +
            "<button type=\"button\" class=\"btn danger\" id=\"v21-sea-keep\">私吞</button></div>");
          const r = document.getElementById("v21-sea-return");
          const k = document.getElementById("v21-sea-keep");
          if (r) r.onclick = function() {
            closeModal();
            removeItem("plot_sea_pearl", 1); qsea.done = true;
            bumpNpcFavor("murong", 12, "夜珠");
            S.gold += 40; if (typeof adjustKarma==="function") adjustKarma(2,"還珠");
            setFlag("sea_pass", true); showStory("慕容煙甩來一袋銀：「識相。海圖的事好說。」");
          };
          if (k) k.onclick = function() {
            closeModal();
            removeItem("plot_sea_pearl", 1); qsea.done = true;
            S.gold += 90; bumpNpcFavor("murong", -15, "吞珠");
            if (typeof adjustKarma==="function") adjustKarma(-4,"吞珠");
            showStory("你把珠子換成沉甸甸的銀。慕容煙的眼神冷了。");
          };
        }
        try { saveGameSilent(); } catch(e){}
      }});
    }

    const qp = q("side_v21_peak");
    if ((locId === "chixia" || locId === "longmen") && qp && !qp.done) {
      acts.push({ label: "【支線】蒼峰戰帖", fn: function() {
        if (qp.step === 0) {
          addItem("plot_peak_challenge", 1); qp.step = 1; qp.hint = "持戰帖在赤霞崖赴論劍。";
          showStory("一紙戰帖落地：「蒼峰論劍，有膽來。」");
        } else if (locId === "chixia" && hasItem("plot_peak_challenge")) {
          removeItem("plot_peak_challenge", 1); qp.done = true; qp.step = 2;
          bumpSkillMastery("cangfeng_sword", 1, "論劍");
          if ((S.skills||[]).indexOf("cangfeng_sword") < 0 && SKILLS.cangfeng_sword) {
            S.skills.push("cangfeng_sword"); S.skillMastery.cangfeng_sword = 1;
          }
          bumpNpcFavor("ye_qingshan", 3, "赴約");
          bumpNpcFavor("lin_feng", 5, "論劍");
          S.renown = (S.renown||0) + 3;
          showStory("劍光如峰。你勝得狼狽，卻也把蒼峰劍意記下了。");
        } else toast("去赤霞崖赴約", true);
        try { saveGameSilent(); } catch(e){}
      }});
    }

    const qsnow = q("side_v21_snow");
    if (locId === "xueyuan" && qsnow && !qsnow.done) {
      acts.push({ label: "【支線】雪原獵牙", fn: function() {
        addItem("beast_fang", 2); addItem("wolf_pelt", 1);
        qsnow.done = true; qsnow.step = 1;
        S.exp = (S.exp||0) + 12;
        showStory("風雪裡一場追逐，獸牙與狼皮入囊。");
        try { saveGameSilent(); } catch(e){}
      }});
    }

    const qm = q("side_v21_mei");
    if (locId === "meihua" && qm && !qm.done) {
      acts.push({ label: "【支線】塢中夜曲", fn: function() {
        if (qm.step === 0) {
          qm.step = 1; bumpNpcFavor("linqing", 8, "聽琴");
          showStory("林清歌琴聲如水。曲終，她輕聲：「再來時，帶一點蓮子？」");
        } else {
          qm.done = true; addItem("lotus_seed_soup", 1);
          bumpNpcFavor("linqing", 6, "回禮");
          showStory("梅夫人送來蓮子羹：「清歌說，你是個懂聽的人。」");
        }
        try { saveGameSilent(); } catch(e){}
      }});
    }

    const qf = q("side_v21_forge");
    if (locId === "longmen" && qf && !qf.done) {
      acts.push({ label: "【支線】廢鐵重鑄", fn: function() {
        if (!hasItem("iron_scrap")) {
          addItem("iron_scrap", 1);
          showStory("爐邊撿到廢鐵塊。再來找趙鐵山。");
          qf.step = 1; return;
        }
        removeItem("iron_scrap", 1); qf.done = true;
        bumpNpcFavor("zhaotie", 7, "重鑄");
        if (S.equip && S.equip.weapon && ITEMS[S.equip.weapon]) {
          S.forgeBonus = (S.forgeBonus || 0) + 1;
          showStory("趙鐵山錘火花濺：「你這兵器，我給你加了一道刃。");
        } else {
          addItem("bamboo_spear", 1);
          showStory("趙鐵山扔來一桿青竹槍：「先使著。」");
        }
        bumpSkillMastery("basic_strike", 1, "旁觀鍛打");
        try { saveGameSilent(); } catch(e){}
      }});
    }

    const qd = q("side_v21_dao");
    if (locId === "tiantai" && qd && !qd.done) {
      acts.push({ label: "【支線】觀星一夜", fn: function() {
        qd.done = true;
        S.focus = (S.focus || 0) + 1;
        bumpNpcFavor("daoxuan", 6, "觀星");
        if (Math.random() < 0.5) addItem("focus_band", 1);
        if ((S.skills||[]).indexOf("star_breath") < 0 && SKILLS.star_breath) {
          S.skills.push("star_breath"); S.skillMastery.star_breath = 1;
        } else bumpSkillMastery("star_breath", 1, "觀星");
        showStory("星河流轉。道玄真人：「定力，是劍外之物。」（定力＋1）");
        try { saveGameSilent(); } catch(e){}
      }});
    }

    // favor talk shortcut when NPCs present
    const present = typeof npcAtLocation === "function" ? npcAtLocation(locId) : [];
    if (present.length) {
      acts.push({ label: "【好感】與人敘舊／送禮", fn: function() {
        openFavorHub(present);
      }});
    }

    return acts;
  }

  function openFavorHub(npcIds) {
    ensureV21();
    let html = "<p class=\"small\">好感滿 " + V21_PURSUE_THRESHOLD + " 有機會被追求（可接／拒）。</p>";
    npcIds.forEach(function(id) {
      const n = NPCS[id]; if (!n) return;
      const fav = npcFavorOf(id);
      const bar = Math.round(fav);
      html += "<div class=\"list-item\"><div>" + (typeof chibiHtml==="function"?chibiHtml(id,"sm"):"") +
        " <strong>" + escapeHtml(n.name) + "</strong>" +
        "<div class=\"small\">好感 " + bar + "/100 · " + escapeHtml(n.title || "") + "</div>" +
        "<div class=\"v21-favor-bar\"><i style=\"width:" + bar + "%\"></i></div></div><div class=\"btn-row\">" +
        "<button type=\"button\" class=\"btn\" data-v21-chat=\"" + id + "\">敘舊</button>" +
        "<button type=\"button\" class=\"btn primary\" data-v21-gifthub=\"" + id + "\">送禮</button>" +
        "</div></div>";
    });
    const bg = document.getElementById("modal-bg");
    const body = document.getElementById("modal-body");
    if (!bg || !body) return;
    body.innerHTML = "<h3>好感</h3>" + html + "<button type=\"button\" class=\"btn ghost\" id=\"v21-fav-close\">關閉</button>";
    bg.classList.add("show");
    body.querySelectorAll("[data-v21-chat]").forEach(function(b) {
      b.onclick = function() {
        const id = b.getAttribute("data-v21-chat");
        bumpNpcFavor(id, 3 + Math.floor(Math.random() * 3), "敘舊");
        bg.classList.remove("show");
        if (typeof talkNpc === "function") talkNpc(id);
      };
    });
    body.querySelectorAll("[data-v21-gifthub]").forEach(function(b) {
      b.onclick = function() {
        const nid = b.getAttribute("data-v21-gifthub");
        bg.classList.remove("show");
        if (S.v21 && S.v21.pendingGift && hasItem(S.v21.pendingGift)) {
          const gid = S.v21.pendingGift; S.v21.pendingGift = null;
          giftToNpc(nid, gid);
        } else {
          openGiftPicker(nid);
        }
      };
    });
    const cl = document.getElementById("v21-fav-close");
    if (cl) cl.onclick = function(){ bg.classList.remove("show"); };
  }

  // ---- Patch renderMap ----
  const _v21_renderMap = renderMap;
  renderMap = function() {
    ensureV21();
    let html = _v21_renderMap.apply(this, arguments);
    // Replace simple map-hero img block with pins version
    try {
      const pinBlock = renderWorldMapPinsHtml();
      html = html.replace(
        /<div class="map-hero"><img class="map-img"[^>]*>[\s\S]*?<\/div>/,
        "<div class=\"map-hero\">" + pinBlock + "</div>"
      );
    } catch (e) {}
    return html;
  };

  // ---- Patch renderBag ----
  const _v21_renderBag = renderBag;
  renderBag = function() {
    ensureV21();
    const st = effectiveStats();
    const filter = S.bagFilter || "all";
    const filters = [
      ["all","全部"],["weapon","武器"],["armor","防具"],["accessory","飾品"],
      ["consumable","消耗"],["food","食飲"],["gift","禮品"],["material","材料"],
      ["manual","秘籍"],["mount","坐騎"],["key","劇情"]
    ];
    let html = "<h3>裝備</h3>" +
      "<div class=\"equip-slot\">武器：<strong>" + (S.equip.weapon && ITEMS[S.equip.weapon] ? ITEMS[S.equip.weapon].name : "無") + "</strong>" +
      (S.equip.weapon ? " <button class=\"btn\" style=\"min-height:34px;display:inline-block;margin-left:6px;padding:5px 10px\" data-unequip=\"weapon\">卸</button>" : "") + "</div>" +
      "<div class=\"equip-slot\">防具：<strong>" + (S.equip.armor && ITEMS[S.equip.armor] ? ITEMS[S.equip.armor].name : "無") + "</strong>" +
      (S.equip.armor ? " <button class=\"btn\" style=\"min-height:34px;display:inline-block;margin-left:6px;padding:5px 10px\" data-unequip=\"armor\">卸</button>" : "") + "</div>" +
      "<div class=\"equip-slot\">飾品：<strong>" + (S.equip.accessory && ITEMS[S.equip.accessory] ? ITEMS[S.equip.accessory].name : "無") + "</strong>" +
      (S.equip.accessory ? " <button class=\"btn\" style=\"min-height:34px;display:inline-block;margin-left:6px;padding:5px 10px\" data-unequip=\"accessory\">卸</button>" : "") +
      "<div class=\"small\">有效武力 " + st.force + "／防禦 " + st.def + "／身法 " + st.agi +
      (S.forgeBonus ? " · 淬煉+" + S.forgeBonus : "") + "</div>" +
      (hasItem("hanxue_horse") ? "<div class=\"small\" style=\"color:var(--gold2)\">🐎 汗血寶馬：天下關隘皆可一騎而至</div>" : "") +
      "</div><h3>物品</h3><div class=\"filter-row\" id=\"bag-filters\">";
    filters.forEach(function(pair) {
      html += "<button class=\"btn " + (filter===pair[0]?"primary":"") + "\" data-filter=\"" + pair[0] + "\">" + pair[1] + "</button>";
    });
    html += "</div>";
    const keys = Object.keys(S.inv || {});
    if (!keys.length) html += "<p class='small'>背包空空</p>";
    keys.forEach(function(id) {
      const it = ITEMS[id]; if (!it) return;
      const kind = it.kind || it.type;
      if (filter !== "all" && kind !== filter && it.type !== filter) return;
      const eq = S.equip.weapon === id || S.equip.armor === id || S.equip.accessory === id;
      const src = (it.sources && it.sources[0]) ? it.sources[0] : "";
      const use = (it.uses && it.uses[0]) ? it.uses[0] : "";
      html += "<div class=\"list-item\"><div>" +
        "<span class=\"badge " + (it.type||"") + " " + (it.rarity||"common") + (eq?" equipped":"") + "\">" +
        (V21_ITEM_KIND[kind] || kind) + " · " + (it.rarity||"common") + "</span> " +
        "<strong>" + escapeHtml(it.name) + "</strong> ×" + S.inv[id] +
        "<div class=\"small\">" + escapeHtml(it.desc || "") + "</div>" +
        "<div class=\"small v21-item-meta\">來源：" + escapeHtml(src) + " · 用途：" + escapeHtml(use) + "</div></div><div>";
      if (it.type === "consumable" || kind === "food") html += "<button class=\"btn safe\" style=\"min-height:40px;padding:8px 10px\" data-use=\"" + id + "\">用</button>";
      if (it.type === "manual" || kind === "manual") html += "<button class=\"btn primary\" style=\"min-height:40px;padding:8px 10px\" data-v21-manual=\"" + id + "\">研讀</button>";
      if (it.type === "gift" || kind === "gift" || it.favor) html += "<button class=\"btn\" style=\"min-height:40px;padding:8px 10px\" data-v21-bag-gift=\"" + id + "\">贈</button>";
      if (it.type === "weapon" || it.type === "armor" || it.type === "accessory")
        html += "<button class=\"btn primary\" style=\"min-height:40px;padding:8px 10px\" data-equip=\"" + id + "\">" + (eq?"已裝":"裝") + "</button>";
      html += "</div></div>";
    });
    return html;
  };

  // ---- Patch renderHero skills section via string? better wrap ----
  const _v21_renderHero = renderHero;
  renderHero = function() {
    ensureV21();
    let html = _v21_renderHero.apply(this, arguments);
    // replace 已學武功 block with mastery version
    try {
      let block = "<h3>已學武功 <span class=\"small\">（熟練1–10）</span></h3>";
      (S.skills || []).forEach(function(sid) {
        const sk = SKILLS[sid]; if (!sk) return;
        const m = skillMasteryOf(sid);
        const bonus = masteryPowerBonus(sid);
        block += "<div class=\"list-item\"><div><strong>" + escapeHtml(sk.name) + "</strong>" +
          "<div class=\"small\">" + escapeHtml(sk.desc) + " · 內力" + sk.neiliCost +
          " · 威力" + ((sk.power||0) + bonus) + (bonus ? "（含熟練＋" + bonus + "）" : "") +
          (sk.heal ? " · 治" + sk.heal : "") +
          " · 熟練 <b>" + m + "</b>/10</div>" +
          "<div class=\"v21-favor-bar\"><i style=\"width:" + (m*10) + "%\"></i></div></div></div>";
      });
      block += "<div class=\"btn-row\" style=\"margin:8px 0\"><button type=\"button\" class=\"btn primary\" id=\"btn-v21-practice\">苦練一式</button></div>";
      html = html.replace(/<h3>已學武功<\/h3>[\s\S]*?(<h3 style="margin-top:10px">門派<\/h3>)/, block + "$1");
    } catch (e) {}
    return html;
  };

  // ---- Patch locationActions ----
  const _v21_locationActions = locationActions;
  locationActions = function(locId) {
    const acts = _v21_locationActions.apply(this, arguments) || [];
    const extra = v21PlotActions(locId);
    return acts.concat(extra);
  };

  // ---- Patch bindHub for new buttons ----
  const _v21_bindHub = bindHub;
  bindHub = function() {
    _v21_bindHub.apply(this, arguments);
    document.querySelectorAll("[data-v21-manual]").forEach(function(b) {
      b.onclick = function(){ useManual(b.getAttribute("data-v21-manual")); };
    });
    document.querySelectorAll("[data-v21-bag-gift]").forEach(function(b) {
      b.onclick = function() {
        const itemId = b.getAttribute("data-v21-bag-gift");
        const present = typeof npcAtLocation === "function" ? npcAtLocation(S.loc) : [];
        if (!present.length) { toast("此地無人可贈", true); return; }
        // pick first or hub
        openFavorHub(present);
        // stash pending gift
        S.v21 = S.v21 || {};
        S.v21.pendingGift = itemId;
      };
    });
    const bp = document.getElementById("btn-v21-practice");
    if (bp) bp.onclick = practiceSkillAtCamp;
  };

  // ---- Patch combat skill damage for mastery ----
  try {
    if (typeof playerAttack === "function") {
      const _playerAttack = playerAttack;
      playerAttack = function(skillId) {
        ensureV21();
        const sk0 = typeof resolveSkill === "function" ? resolveSkill(skillId) : (SKILLS[skillId] || null);
        let patched = false;
        let origPower = null;
        if (sk0 && typeof sk0.power === "number" && SKILLS[skillId]) {
          const bonus = masteryPowerBonus(skillId);
          if (bonus) {
            origPower = SKILLS[skillId].power;
            SKILLS[skillId].power = origPower + bonus;
            patched = true;
          }
        }
        const r = _playerAttack.apply(this, arguments);
        if (patched && origPower != null) SKILLS[skillId].power = origPower;
        if (SKILLS[skillId] && ui && ui.combat && Math.random() < 0.22) {
          try { bumpSkillMastery(skillId, 1, "實戰"); } catch (e2) {}
        }
        return r;
      };
    }
  } catch (e) {}

  // Random pursue check on day change / travel
  const _v21_travel = travelToLocation;
  travelToLocation = function(id) {
    const r = _v21_travel.apply(this, arguments);
    try {
      ensureV21();
      // small chance someone high-favor pursues when arriving
      if (Math.random() < 0.12) {
        const pool = V21_ROMANCE_POOL.filter(function(nid) {
          return npcFavorOf(nid) >= V21_PURSUE_THRESHOLD && isRomanceEligible(nid);
        });
        if (pool.length) maybeNpcPursue(pool[Math.floor(Math.random() * pool.length)]);
      }
    } catch (e) {}
    return r;
  };

  // Init on load
  const _v21_loadGame = typeof loadGame === "function" ? loadGame : null;
  if (_v21_loadGame) {
    loadGame = function() {
      const r = _v21_loadGame.apply(this, arguments);
      try { ensureV21(); } catch (e) {}
      return r;
    };
  }
  const _v21_newGame = typeof startNewGame === "function" ? startNewGame : (typeof newGame === "function" ? newGame : null);
  // also ensure after createDefaultState path — call ensure when render first runs
  const _v21_render = render;
  render = function() {
    try { if (S && S.name) ensureV21(); } catch (e) {}
    return _v21_render.apply(this, arguments);
  };

  // QUEST_STEP_HINTS extend
  try {
    if (typeof QUEST_STEP_HINTS === "object") {
      V21_NEW_PLOTS.forEach(function(p) {
        QUEST_STEP_HINTS[p.id] = { 0: { tip: p.hint, locs: [p.loc], reward: p.reward } };
      });
    }
  } catch (e) {}

  window.__JH_V21_SELFTEST = function() {
    ensureV21();
    const itemN = Object.keys(V21_NEW_ITEMS).length;
    const plots = V21_NEW_PLOTS.length;
    const pins = Object.keys(MAP_PINS).length;
    // smoke: favor + mastery
    const testNpc = "linqing";
    const f0 = npcFavorOf(testNpc);
    bumpNpcFavor(testNpc, 5, "test");
    const f1 = npcFavorOf(testNpc);
    bumpSkillMastery("basic_strike", 1, "test");
    const m = skillMasteryOf("basic_strike");
    const htmlPins = renderWorldMapPinsHtml();
    const ok = itemN >= 20 && plots >= 8 && pins >= 40 && f1 === f0 + 5 && m >= 1 && htmlPins.indexOf("map-pin") >= 0;
    return {
      ok: ok,
      items: itemN,
      plots: plots,
      pins: pins,
      favor: f1,
      mastery: m,
      pinHtmlLen: htmlPins.length,
      saveVer: S.saveVer,
      v21self: window.__JH_V21_SELFTEST
    };
  };

  // expose helpers
  window.__JH_V21 = {
    ensureV21: ensureV21,
    npcFavorOf: npcFavorOf,
    bumpNpcFavor: bumpNpcFavor,
    giftToNpc: giftToNpc,
    practiceSkillAtCamp: practiceSkillAtCamp,
    skillMasteryOf: skillMasteryOf
  };

  try { ensureV21(); } catch (e) {}

  // ========== END V21 ==========
