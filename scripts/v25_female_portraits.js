  // ========== V25: 女角身份肖像 + 景安帝新繪（致敬・非康熙） ==========
  // 貴女漢服／北疆行旅／藥女／乞丐×2 → 出身・身分・易裝外觀

  function resolveFemaleHeroLook() {
    if (!isFemale()) return null;
    if (S.disguise === "nan") return "disguise_nan";
    // 手動覆寫（設定作弊可寫 identityLook）
    if (S.identityLook && typeof S.identityLook === "string") {
      const allowed = { noble:1, traveler:1, herbalist:1, beggar:1, beggar2:1 };
      if (allowed[S.identityLook]) return S.identityLook;
    }
    const bid = S.birthId || "";
    // 出身直映
    if (bid === "beggar") {
      // 穩定變體：名字雜湊奇偶 → beggar / beggar2
      const n = String(S.name || "女俠");
      let h = 0;
      for (let i = 0; i < n.length; i++) h = (h + n.charCodeAt(i) * (i + 3)) % 97;
      return (h % 2 === 0) ? "beggar" : "beggar2";
    }
    if (bid === "traveler_north" || bid === "border_scout_f") return "traveler";
    if (bid === "herbalist" || bid === "yaonu") return "herbalist";
    if (bid === "princess" || bid === "palace_maid_seed" || bid === "noble_hanfu") return "noble";
    if (bid === "official_heir") return "noble";
    // 旗標／道具暗示
    if (flag("identity_traveler") || flag("north_pass") || hasItem("traveler_boots")) return "traveler";
    if (flag("identity_herbalist") || flag("farmer_herb") || flag("craft_medicine_1") || (S.craft && (S.craft.medicine || 0) >= 20)) return "herbalist";
    if (flag("orphan_path_beg") || hasItem("beggar_robe") || hasItem("broken_bowl_staff")) {
      const n2 = String(S.name || "女俠");
      return (n2.length % 2 === 0) ? "beggar" : "beggar2";
    }
    if (flag("birth_princess") || flag("hougong_access") || flag("birth_maid")) return "noble";
    // 預設：江湖遊女用行旅；高魅力／宮線傾向貴女
    if ((S.charm || 0) >= 8 || (S.emperorFavor || 0) >= 8 || (S.palaceRole === "lady" || S.palaceRole === "consort" || S.palaceRole === "maid")) return "noble";
    return "traveler";
  }

  function femaleHeroLookLabel(look) {
    return ({
      noble: "貴女・漢服",
      traveler: "北疆行旅",
      herbalist: "藥女採青",
      beggar: "市井乞丐",
      beggar2: "百衲行乞",
      disguise_nan: "男裝示人"
    })[look] || "本相";
  }

  // 追加出身：北疆行旅女／藥谷藥女（女角可用；男亦可選）
  (function injectV25Births() {
    if (typeof BIRTH_BACKGROUNDS === "undefined" || !Array.isArray(BIRTH_BACKGROUNDS)) return;
    const have = {};
    BIRTH_BACKGROUNDS.forEach(function(b){ have[b.id] = true; });
    const extras = [
      {id: "noble_hanfu", name: "貴家嫡女", firstLife: true, tier: "elite", gender: "女", loc: "jingji", gold: 90, renown: 3, mods: {charm: 3, wit: 2, luck: 1}, flags: ["birth_noble", "map_wenyuan"], favor: 2, heat: 0, track: "none", grade: 0, pin: 0, role: null, items: ["palace_silk", "bronze_mirror", "candy"], blurb: "繡樓窗外是京畿車馬。丫鬟稱你「小姐」。", treatTag: "貴女", treatHint: "官紳禮遇；江湖人遠觀；進宮有門路。", relations: [{npcId: "lan_keeper", aff: 6}, {npcId: "linqing", aff: 5}], earlyQuest: {id: "bq_noble_outing", title: "出身・繡樓初遊", step: 0, done: false, hint: "京畿或青城結交／避禍。"}, openChoices: [{id: "gentle", label: "溫言待下人", effect: {charm: 1, flag: "noble_kind", text: "丫鬟鬆了口氣。"}}, {id: "out", label: "換一身勁裝出門", effect: {flag: "identity_traveler", agi: 1, text: "你把華服壓在箱底。"}}, {id: "learn", label: "偷學醫書／藥譜", effect: {craft: {medicine: 6}, flag: "identity_herbalist", text: "墨香裡夾着草香。"}}]},
      {id: "traveler_north", name: "北疆行旅", firstLife: true, tier: "commoner", gender: null, loc: "bianguan", gold: 45, renown: 2, mods: {agi: 3, bone: 2, force: 1, charm: 1}, flags: ["birth_traveler", "north_pass", "identity_traveler"], favor: 0, heat: 0, track: "none", grade: 0, pin: 0, role: null, items: ["traveler_boots", "herb", "cloth"], blurb: "風沙割臉。你裹着狐毛斗篷，從關外走進關內。", treatTag: "旅人", treatHint: "邊民親切；京官疑外鄉；商隊易談。", relations: [{npcId: "yulin_tongling", aff: 6}, {npcId: "boatman", aff: 4}], earlyQuest: {id: "bq_travel_north", title: "出身・關外塵沙", step: 0, done: false, hint: "邊關／龍門立足，打聽中原路。"}, openChoices: [{id: "south", label: "繼續南下入中原", effect: {flag: "traveler_south", gold: 8, text: "斗篷一抖，沙落成路。"}}, {id: "scout", label: "幫邊軍探一程", effect: {honor: 1, craft: {martial: 4}, flag: "traveler_scout", text: "號角遠響，你點頭。"}}, {id: "herb", label: "沿途認藥草", effect: {craft: {medicine: 5}, flag: "identity_herbalist", text: "背簍裡多了幾味草。"}}]},
      {id: "herbalist", name: "藥谷學徒", firstLife: true, tier: "commoner", gender: null, loc: "yaogu", gold: 30, renown: 1, mods: {wit: 2, focus: 2, luck: 1, bone: 1}, flags: ["birth_herbalist", "identity_herbalist"], favor: 0, heat: 0, track: "none", grade: 0, pin: 0, role: null, items: ["herb", "med_salve", "broken_bowl_staff"], blurb: "竹筐裡是濕葉與根莖。師傅說：「先識毒，再救人。」", treatTag: "藥人", treatHint: "病患求你；官紳或輕；門派傷者易結緣。", relations: [{npcId: "suning", aff: 10, trust: 6}, {npcId: "gudengpo", aff: 8}], earlyQuest: {id: "bq_herb_first", title: "出身・第一背藥", step: 0, done: false, hint: "藥谷採藥或為人醫治。"}, openChoices: [{id: "pick", label: "上山採足一日藥", effect: {item: "herb", craft: {medicine: 8}, flag: "herb_pick", text: "筐滿，手也綠了。"}}, {id: "sell", label: "挑到市集換盤纏", effect: {gold: 18, craft: {commerce: 3}, flag: "herb_sell", text: "草藥換銅板，路上有人盯你背篓。"}}, {id: "wander", label: "揹筐走江湖", effect: {flag: "identity_traveler", agi: 1, text: "竹杖點地——藥香隨風。"}}]}
    ];
    extras.forEach(function(b){
      if (!have[b.id]) BIRTH_BACKGROUNDS.push(b);
    });
  })();

  // 設定作弊：identityLook=noble|traveler|herbalist|beggar|beggar2
  if (typeof applyCheatDirective === "function") {
    const _cheat = applyCheatDirective;
    // no-op wrap placeholder — actual hook in v16 freeinput if present
  }
  (function hookCheatIdentityLook() {
    const prev = window.__JH_APPLY_CHEAT_HOOKS || [];
    prev.push(function(text, ctx) {
      const t = String(text || "");
      const m = t.match(/(?:identityLook|外觀|身分肖像|女角外觀)\s*[=：:]\s*(noble|traveler|herbalist|beggar2|beggar|貴女|行旅|藥女|乞丐2|乞丐)/i);
      if (!m) return null;
      let v = m[1].toLowerCase();
      const zh = { "貴女":"noble", "行旅":"traveler", "藥女":"herbalist", "乞丐2":"beggar2", "乞丐":"beggar" };
      if (zh[m[1]]) v = zh[m[1]];
      S.identityLook = v;
      try { saveGameSilent(); } catch (e) {}
      return { ok: true, msg: "女角外觀已設為「" + femaleHeroLookLabel(v) + "」" };
    });
    window.__JH_APPLY_CHEAT_HOOKS = prev;
  })();

  // 若 v16 作弊台有統一入口，掛上去
  (function bindCheatHooks() {
    if (typeof window.__JH_RUN_CHEAT_TEXT === "function") return;
    window.__JH_RUN_CHEAT_TEXT = function(text) {
      const hooks = window.__JH_APPLY_CHEAT_HOOKS || [];
      for (let i = 0; i < hooks.length; i++) {
        try {
          const r = hooks[i](text, {});
          if (r && r.ok) return r;
        } catch (e) {}
      }
      return null;
    };
  })();

  // 角色頁小字：顯示當前外觀
  const _renderChar_v25 = (typeof renderCharacter === "function") ? renderCharacter : null;
  if (_renderChar_v25) {
    renderCharacter = function() {
      const html = _renderChar_v25();
      if (!isFemale()) return html;
      const look = resolveFemaleHeroLook();
      const lab = femaleHeroLookLabel(look);
      return html.replace(
        /(<\/p>\s*<div class="stat-grid")/,
        '<p class="small">女角外觀：' + lab + '（出身／身分／易裝自動切；設定可寫 identityLook=noble）</p>$1'
      ) || html;
    };
  }

  window.__JH_V25_SELFTEST = function() {
    const atlasOk = !!(asset("homagePortraits"));
    const keys = ["heroFNoble","heroFTraveler","heroFHerbalist","heroFBeggar","heroFBeggar2"];
    const assetsOk = keys.every(function(k){ return !!asset(k); });
    let lookOk = false;
    const bak = { gender: S.gender, birthId: S.birthId, disguise: S.disguise, identityLook: S.identityLook };
    try {
      S.gender = "女"; S.disguise = null; S.identityLook = null;
      S.birthId = "princess"; lookOk = resolveFemaleHeroLook() === "noble";
      S.birthId = "traveler_north"; lookOk = lookOk && resolveFemaleHeroLook() === "traveler";
      S.birthId = "herbalist"; lookOk = lookOk && resolveFemaleHeroLook() === "herbalist";
      S.birthId = "beggar"; const b = resolveFemaleHeroLook(); lookOk = lookOk && (b === "beggar" || b === "beggar2");
      S.identityLook = "herbalist"; lookOk = lookOk && resolveFemaleHeroLook() === "herbalist";
      const url = heroPortraitUrl(true);
      lookOk = lookOk && !!url;
    } finally {
      S.gender = bak.gender; S.birthId = bak.birthId; S.disguise = bak.disguise; S.identityLook = bak.identityLook;
    }
    const births = (typeof BIRTH_BACKGROUNDS !== "undefined") ? BIRTH_BACKGROUNDS.map(function(b){return b.id;}) : [];
    const birthInject = births.indexOf("traveler_north") >= 0 && births.indexOf("herbalist") >= 0 && births.indexOf("noble_hanfu") >= 0;
    return { ok: atlasOk && assetsOk && lookOk && birthInject, atlasOk: atlasOk, assetsOk: assetsOk, lookOk: lookOk, birthInject: birthInject };
  };

  if (window.__JH_DEBUG) {
    Object.assign(window.__JH_DEBUG, {
      resolveFemaleHeroLook: resolveFemaleHeroLook,
      femaleHeroLookLabel: femaleHeroLookLabel,
      v25self: window.__JH_V25_SELFTEST
    });
  }

  // ========== END V25 ==========
