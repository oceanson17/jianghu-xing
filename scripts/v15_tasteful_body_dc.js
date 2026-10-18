// ========== V15: TASTEFUL EUNUCH/DC + BODY CONDITION (no gore / no erotic) ==========
  // Homage only. 寫意上限：無殘忍細描、無成人行為、無18禁模式。
  // Mutations MUST touch real save.

  const BODY_TAG_DEFS = {
    castrated: { label: "太監籍・身殘（寫意）", force: -2, agi: -1, charm: -2, focus: 1 },
    injured_hands: { label: "手傷未癒", force: -1, charm: -1, dutyPenalty: 25 },
    limp: { label: "足跛不爽", agi: -2, force: -1 },
    bruised: { label: "體有瘀傷", force: -1, charm: -1, hpMax: -8 },
    shaken: { label: "心神不寧", focus: -2, wit: -1 },
    veiled_scar: { label: "舊痕隱痛", charm: -1, focus: 1 }
  };

  const DC_UNIFORM_ITEMS = {
    dc_robe_1: { id: "dc_robe_1", name: "番子灰衣", type: "armor", rarity: "uncommon", def: 3, perception: 1, desc: "外勤番子常服。街巷見之側目。", price: 0, dcRankMin: 1 },
    dc_robe_2: { id: "dc_robe_2", name: "小旗皂袍", type: "armor", rarity: "uncommon", def: 4, perception: 1, wit: 1, desc: "檔房小旗皂色官服。", price: 0, dcRankMin: 2 },
    dc_robe_3: { id: "dc_robe_3", name: "百戶飛魚服（寫意）", type: "armor", rarity: "rare", def: 6, charm: 1, perception: 1, desc: "百戶級廠衛官服。吏民見之色變。", price: 0, dcRankMin: 3 },
    dc_robe_4: { id: "dc_robe_4", name: "千戶繡春刀服", type: "armor", rarity: "rare", def: 8, force: 1, charm: 1, desc: "千戶級。低品官亦忌三分。", price: 0, dcRankMin: 4 },
    dc_robe_5: { id: "dc_robe_5", name: "掌刑同知蟒衣（寫意）", type: "armor", rarity: "epic", def: 10, charm: 2, wit: 1, desc: "掌刑同知服。朝堂側目，街巷噤聲。", price: 0, dcRankMin: 5 }
  };

  // Register items if ITEMS exists
  if (typeof ITEMS === "object" && ITEMS) {
    Object.keys(DC_UNIFORM_ITEMS).forEach(function(k) {
      if (!ITEMS[k]) ITEMS[k] = DC_UNIFORM_ITEMS[k];
    });
  }

  function ensureBodyState() {
    if (!S.bodyTags || typeof S.bodyTags !== "object") S.bodyTags = {};
    if (!S.bodyTagUntil || typeof S.bodyTagUntil !== "object") S.bodyTagUntil = {};
    // expire
    const day = S.day || 1;
    Object.keys(S.bodyTagUntil).forEach(function(t) {
      if (S.bodyTagUntil[t] && day > S.bodyTagUntil[t]) {
        delete S.bodyTags[t];
        delete S.bodyTagUntil[t];
      }
    });
    if (flag("eunuch")) S.bodyTags.castrated = true;
  }

  function hasBodyTag(tag) {
    ensureBodyState();
    return !!S.bodyTags[tag];
  }

  function addBodyTag(tag, days) {
    ensureBodyState();
    if (!BODY_TAG_DEFS[tag] && tag !== "castrated") return;
    S.bodyTags[tag] = true;
    if (typeof days === "number" && days > 0) S.bodyTagUntil[tag] = (S.day || 1) + days;
    else delete S.bodyTagUntil[tag];
  }

  function clearBodyTag(tag) {
    ensureBodyState();
    delete S.bodyTags[tag];
    delete S.bodyTagUntil[tag];
  }

  function bodyTagLabelLine() {
    ensureBodyState();
    const keys = Object.keys(S.bodyTags).filter(function(k){ return S.bodyTags[k]; });
    if (!keys.length) return "";
    return keys.map(function(k){ return (BODY_TAG_DEFS[k] && BODY_TAG_DEFS[k].label) || k; }).join("／");
  }

  function applyBodyModsToStats(st) {
    ensureBodyState();
    const out = Object.assign({}, st);
    Object.keys(S.bodyTags).forEach(function(tag) {
      if (!S.bodyTags[tag]) return;
      const d = BODY_TAG_DEFS[tag];
      if (!d) return;
      ["force","agi","charm","focus","wit"].forEach(function(k) {
        if (typeof d[k] === "number") out[k] = Math.max(0, (out[k] || 0) + d[k]);
      });
      if (typeof d.hpMax === "number") out.hpMax = Math.max(30, (out.hpMax || 100) + d.hpMax);
    });
    return out;
  }

  function bodyDutySuccessChance(base) {
    ensureBodyState();
    let p = base;
    if (hasBodyTag("injured_hands")) p -= 0.25;
    if (hasBodyTag("limp")) p -= 0.1;
    if (hasBodyTag("bruised")) p -= 0.08;
    if (hasBodyTag("shaken")) p -= 0.12;
    return Math.max(0.05, Math.min(0.95, p));
  }

  /** 女身不可淨身／太監籍；僅男身可入。女扮男裝可喬裝入廠，但不經太監籍。 */
  function canEnterEunuchTrack() {
    return typeof isMale === "function" && isMale() && !isFemale();
  }

  function sanitizeAbsurdFemaleEunuch() {
    if (!(typeof isFemale === "function" && isFemale())) return false;
    let changed = false;
    if (flag("eunuch") || flag("sold_as_eunuch")) {
      if (S.flags) {
        S.flags.eunuch = false;
        S.flags.sold_as_eunuch = false;
      }
      changed = true;
    }
    if (S.courtTrack === "eunuch") {
      S.courtTrack = "none";
      S.courtGrade = 0;
      changed = true;
    }
    if (S.palaceRole === "eunuch") {
      S.palaceRole = null;
      changed = true;
    }
    if (S.bodyTags && S.bodyTags.castrated) {
      clearBodyTag("castrated");
      changed = true;
    }
    if (changed) {
      setFlag("absurd_eunuch_cleared");
      toast("女身不可為太監籍——舊檔異常已矯正（寫意）", true);
    }
    return changed;
  }

  // ---- wrap gender-gated eunuch entry ----
  const __applyEunuchFateV15 = typeof applyEunuchFate === "function" ? applyEunuchFate : null;
  applyEunuchFate = function() {
    if (!canEnterEunuchTrack()) {
      toast("女身不可入太監籍／淨身（寫意）", true);
      return;
    }
    if (__applyEunuchFateV15) __applyEunuchFateV15();
    else {
      setFlag("eunuch"); setFlag("sold_as_eunuch"); setFlag("palace_access"); setFlag("palace_entry"); setFlag("map_huanggong");
      S.palaceRole = "eunuch";
      S.force = Math.max(1, (S.force || 10) - 8);
      S.agi = Math.max(1, (S.agi || 8) - 4);
      S.bone = Math.max(1, (S.bone || 5) - 3);
      S.hpMax = Math.max(40, (S.hpMax || 100) - 20);
      S.hp = Math.min(S.hp, S.hpMax);
      if (typeof adjustKarma === "function") adjustKarma(-15, "淨身入宮");
    }
    addBodyTag("castrated");
    addBodyTag("bruised", 5);
    addBodyTag("shaken", 3);
    if (typeof saveGameSilent === "function") saveGameSilent();
  };

  const __startCourtTrackV15 = typeof startCourtTrack === "function" ? startCourtTrack : null;
  if (__startCourtTrackV15) {
    startCourtTrack = function(track, opts) {
      if (track === "eunuch" && !canEnterEunuchTrack()) {
        return toast("女身不可入太監途。請走宮女途，或喬裝後走東廠騙過督公（不經淨身）。", true);
      }
      return __startCourtTrackV15(track, opts || {});
    };
  }

  const __voluntaryJingshenV15 = typeof voluntaryJingshenEunuch === "function" ? voluntaryJingshenEunuch : null;
  voluntaryJingshenEunuch = function() {
    sanitizeAbsurdFemaleEunuch();
    if (!canEnterEunuchTrack()) {
      if (typeof isFemale === "function" && isFemale()) {
        return openModal("<h3>淨身房・拒</h3><div class=\"story-box\">老役打量你片刻，冷笑一聲：「女身妄稱入籍？滾出去。」<br>（女角不可淨身／太監籍。若要入東廠，可女扮男裝於廠衛司「喬裝騙過督公」——仍不經太監籍。）</div><div class=\"btn-row\"><button class=\"btn ghost\" onclick=\"closeModal()\">退下</button></div>");
      }
      return toast("淨身入籍僅限男身（寫意）", true);
    }
    if (flag("eunuch")) {
      if (typeof ensureCourtCareer === "function") ensureCourtCareer();
      if (S.courtTrack !== "eunuch" && typeof startCourtTrack === "function") startCourtTrack("eunuch");
      else if (typeof showStory === "function") showStory("你已在太監籍。" + (typeof eunuchHallName === "function" ? ("當值殿：" + eunuchHallName()) : ""));
      return;
    }
    openModal("<h3>淨身房・寫意</h3><div class=\"story-box\">燈影森冷。老役啞聲道：「踏入此門，便入太監籍——氣力身法大損，再無回頭。你可想清楚？」<br>（無血腥細描；僅後果與仕途。女身不可入。）</div>" +
      "<div class=\"btn-row\"><button class=\"btn danger\" id=\"js-yes-v15\">咬牙入籍</button><button class=\"btn ghost\" onclick=\"closeModal()\">後退</button></div>");
    const btn = document.getElementById("js-yes-v15");
    if (btn) btn.onclick = function() {
      closeModal();
      if (typeof startCourtTrack === "function") startCourtTrack("eunuch");
    };
  };

  // Career panel: only show 淨身 for biological male
  const __openCourtCareerPanelV15 = typeof openCourtCareerPanel === "function" ? openCourtCareerPanel : null;
  if (__openCourtCareerPanelV15) {
    openCourtCareerPanel = function() {
      // temporarily patch isMale perception for button — do full rebuild lightly
      __openCourtCareerPanelV15();
      // After open, if female, remove eunuch button if present
      if (typeof isFemale === "function" && isFemale()) {
        const el = document.getElementById("cc-eunuch");
        if (el && el.parentNode) el.parentNode.removeChild(el);
        const el2 = document.getElementById("cc-eunuch2");
        if (el2 && el2.parentNode && !flag("eunuch")) el2.parentNode.removeChild(el2);
      }
    };
  }

  // sold-as-eunuch: male only
  const __trySoldAsEunuchV15 = typeof trySoldAsEunuchEvent === "function" ? trySoldAsEunuchEvent : null;
  if (__trySoldAsEunuchV15) {
    trySoldAsEunuchEvent = function(reason) {
      if (!canEnterEunuchTrack()) return false;
      return __trySoldAsEunuchV15(reason);
    };
  }

  // effectiveStats body mods
  const __effectiveStatsV15 = effectiveStats;
  effectiveStats = function() {
    let st = __effectiveStatsV15();
    st = applyBodyModsToStats(st);
    // wearing high dc robe slight charm from authority (already on item)
    return st;
  };

  // ---- Dongchang: 驗身 + grim duty (abstract) + refuse punishment ----
  function ensureDcUniformState() {
    if (typeof S.dcUniformRank !== "number") S.dcUniformRank = 0;
    if (typeof S.dcGrimDone === "undefined") S.dcGrimDone = false;
    if (typeof S.dcInspectPassed === "undefined") S.dcInspectPassed = false;
  }

  function grantDcUniformForRank(rank) {
    ensureDcUniformState();
    const r = Math.max(1, Math.min(5, rank || S.dcRank || 1));
    const id = "dc_robe_" + r;
    if (ITEMS[id] && !hasItem(id)) addItem(id, 1);
    // auto-equip if no better armor or previous dc robe
    const cur = S.equip && S.equip.armor;
    if (!cur || String(cur).indexOf("dc_robe_") === 0) {
      S.equip = S.equip || {};
      S.equip.armor = id;
    }
    S.dcUniformRank = r;
    setFlag("dc_uniform_" + r);
  }

  function wearingDcUniform() {
    ensureDcUniformState();
    const arm = S.equip && S.equip.armor;
    if (arm && String(arm).indexOf("dc_robe_") === 0) return parseInt(String(arm).replace("dc_robe_", ""), 10) || 0;
    return S.dcJoined ? (S.dcUniformRank || S.dcRank || 0) : 0;
  }

  /** 廠公驗身：寫意 pass/fail，無細節 */
  function runChanggongInspect() {
    ensureBodyState();
    // Must be male + eunuch flag + castrated tag for eunuch path
    if (!canEnterEunuchTrack()) return { ok: false, say: "督公淡淡一瞥：「女身？滾。」" };
    if (!flag("eunuch") && !hasBodyTag("castrated")) {
      return { ok: false, say: "督公合上籍冊：「未入太監籍，休說入廠。」（請先往淨身房寫意入籍。）" };
    }
    // Abstract check: eunuch + body tag almost always pass; slight fail if identity_exposed weirdness
    const favorDg = (S.datingAff && S.datingAff.dongchang_gong) || 0;
    const pass = hasBodyTag("castrated") || flag("eunuch") || favorDg >= 40;
    S.dcInspectPassed = pass;
    if (pass) {
      return { ok: true, say: "督公令人驗籍／驗身（寫意）——過了。「身子已廢，正好入檔。」" };
    }
    return { ok: false, say: "驗身未過（寫意）。督公揮袖：「假貨。給我打出去。」" };
  }

  function applyDcRefuseDutyPunishment() {
    // 誤闖東廠受罰 — abstract stat hits only
    S.hp = Math.max(1, (S.hp || 50) - 22);
    S.focus = Math.max(1, (S.focus || 5) - 2);
    S.charm = Math.max(0, (S.charm || 5) - 1);
    addBodyTag("bruised", 4);
    addBodyTag("injured_hands", 3);
    addBodyTag("shaken", 2);
    if (typeof bumpPalaceHeat === "function") bumpPalaceHeat(10);
    if (typeof bumpDcHeat === "function") bumpDcHeat(8);
    else S.dcHeat = (S.dcHeat || 0) + 8;
    if (typeof adjustKarma === "function") adjustKarma(-2, "誤闖東廠受罰");
    setFlag("dc_refuse_punished");
    if (typeof saveGameSilent === "function") saveGameSilent();
  }

  function applyDcGrimDutyAbstract(kind) {
    // Abstract outcomes only — NEVER describe cruelty
    ensureDcUniformState();
    let note = "";
    if (kind === "ledger") {
      if (typeof bumpDcPrestige === "function") bumpDcPrestige(6, "抄冊");
      if (typeof adjustKarma === "function") adjustKarma(-6, "廠差・黑冊");
      S.perception = Math.min(28, (S.perception || 5) + 1);
      note = "你抄完一疊黑冊。廠功微升，心裡沉了一截。（寫意）";
    } else if (kind === "watch") {
      if (typeof bumpDcPrestige === "function") bumpDcPrestige(4, "值夜");
      S.exp = (S.exp || 0) + 5;
      note = "值夜盯梢到天明。無功無過，算過了門檻。";
    } else if (kind === "harsh") {
      if (S.dcGrimDone) {
        note = "這類差事你已做過一次。督公另派了雜務。";
        if (typeof bumpDcPrestige === "function") bumpDcPrestige(2, "雜務");
      } else {
        S.dcGrimDone = true;
        // karma -50 max once
        if (typeof adjustKarma === "function") adjustKarma(-50, "廠差・不堪令（寫意）");
        else S.karma = (S.karma || 0) - 50;
        if (typeof bumpDcHeat === "function") bumpDcHeat(10);
        else S.dcHeat = (S.dcHeat || 0) + 10;
        if (typeof bumpPalaceHeat === "function") bumpPalaceHeat(6);
        const aff = S.datingAff = S.datingAff || {};
        aff.dongchang_gong = (aff.dongchang_gong || 0) + 5;
        addBodyTag("shaken", 5);
        addBodyTag("veiled_scar");
        note = "你奉令做完一件不堪差事（細節略）。善惡大跌，督公多看你一眼。";
      }
    } else {
      note = "差事含糊帶過。";
    }
    if (typeof saveGameSilent === "function") saveGameSilent();
    return note;
  }

  function openDcGrimDutyChoices(afterJoinSay) {
    let html = "<h3>督公差遣（寫意）</h3><div class=\"story-box\">" + (afterJoinSay || "驗身已過。") +
      "<br><br>督公丟下一紙令：「先做一件——或滾。」<br>（選項只改數值／旗標；無殘忍細描、無成人內容。）</div><div class=\"btn-row\" style=\"flex-wrap:wrap;gap:6px\">";
    html += "<button class=\"btn\" id=\"dc-duty-ledger\">抄黑冊（善惡微損）</button>";
    html += "<button class=\"btn\" id=\"dc-duty-watch\">值夜盯梢</button>";
    html += "<button class=\"btn danger\" id=\"dc-duty-harsh\">接下不堪差事（善惡−50・一次）</button>";
    html += "<button class=\"btn ghost\" id=\"dc-duty-refuse\">拒絕（視為誤闖・受罰寫意）</button></div>";
    openModal(html);
    const bind = function(id, fn){ const el = document.getElementById(id); if (el) el.onclick = fn; };
    bind("dc-duty-ledger", function(){ closeModal(); const n = applyDcGrimDutyAbstract("ledger"); finishDcJoinAfterDuty(n); });
    bind("dc-duty-watch", function(){ closeModal(); const n = applyDcGrimDutyAbstract("watch"); finishDcJoinAfterDuty(n); });
    bind("dc-duty-harsh", function(){ closeModal(); const n = applyDcGrimDutyAbstract("harsh"); finishDcJoinAfterDuty(n); });
    bind("dc-duty-refuse", function(){
      closeModal();
      applyDcRefuseDutyPunishment();
      // strip provisional join if any
      if (S.dcJoined && !flag("dc_join_locked")) {
        S.dcJoined = false;
        S.dcRank = 0;
        if (S.palaceRole === "dongchang") S.palaceRole = flag("eunuch") ? "eunuch" : null;
      }
      showStory("你不肯接令。督公冷冷道：「既不肯做事，便當誤闖。」\n（寫意受罰：氣血／定力／魅力受損，手傷・瘀傷。）\n未入廠籍。");
      render();
    });
  }

  function finishDcJoinAfterDuty(dutyNote) {
    setFlag("dc_join_locked");
    grantDcUniformForRank(S.dcRank || 1);
    showStory((dutyNote || "") + "\n\n你正式入冊・【" + ((typeof DC_RANK_DEFS !== "undefined" && DC_RANK_DEFS[S.dcRank]) ? DC_RANK_DEFS[S.dcRank].name : "廠衛") + "】。\n東廠官服已入手並穿上——街巷與朝堂之人，眼神會變。");
    if (typeof saveGameSilent === "function") saveGameSilent();
    render();
  }

  function completeDongchangJoinCore(path, say) {
    ensureDongchangState();
    ensureDcUniformState();
    S.dcJoined = true;
    S.dcRank = Math.max(1, S.dcRank || 1);
    S.dcJoinPath = path;
    setFlag("dongchang_invite");
    setFlag("palace_access");
    setFlag("map_huanggong");
    setFlag("map_dongchang");
    if (typeof setPalaceRole === "function") setPalaceRole("dongchang");
    if (typeof setFate === "function") {
      const prev = S.fates && S.fates.dongchang_gong;
      setFate("dongchang_gong", prev === "enemy" ? "ally" : (prev || "ally"));
    }
    if (typeof adjustKarma === "function") adjustKarma(path === "disguise" ? -3 : -2, "入東廠廠衛");
    if (!hasItem("revenge_blade")) addItem("revenge_blade", 1);
    if (!hasItem("dongchang_token")) addItem("dongchang_token", 1);
    if (typeof bumpDcPrestige === "function") bumpDcPrestige(5, "入冊");
    if (typeof saveGameSilent === "function") saveGameSilent();
    return say;
  }

  // Replace attemptDongchangJoin
  attemptDongchangJoin = function(pathHint) {
    ensureDongchangState();
    ensureDcUniformState();
    sanitizeAbsurdFemaleEunuch();
    if (S.dcJoined && S.dcRank >= 1 && flag("dc_join_locked")) {
      return showStory("你已在廠衛編制：" + (typeof dcRankLabel === "function" ? dcRankLabel() : ("rank" + S.dcRank)));
    }
    const eunuchOk = !!(flag("eunuch") || hasBodyTag("castrated")) && canEnterEunuchTrack();
    const inviteOk = !!(flag("dongchang_invite") || hasItem("dongchang_token") || (S.karma || 0) <= -28);
    const disguiseNan = !!(typeof isFemale === "function" && isFemale() && S.disguise === "nan");
    const disguiseNv = !!(S.disguise === "nv");
    const wantDisguise = pathHint === "disguise" || disguiseNan || disguiseNv;

    let path = pathHint || null;
    let pass = false;
    let say = "";
    const favorDg = (S.datingAff && S.datingAff.dongchang_gong) || 0;
    const st = typeof effectiveStats === "function" ? effectiveStats() : { wit: S.wit || 5, charm: S.charm || 5, perception: S.perception || 5 };
    const roll = Math.floor(Math.random() * 20) + 1;

    if (pathHint === "eunuch") {
      if (!canEnterEunuchTrack()) {
        return showStory("督公：「女身休來獻醜。要進廠，先把面孔騙過我——且不走太監籍。」");
      }
      if (!eunuchOk) {
        return showStory("督公合冊：「未淨身入籍，休提廠衛太監途。先去淨身房（寫意）。」");
      }
      const insp = runChanggongInspect();
      if (!insp.ok) {
        if (typeof bumpDcHeat === "function") bumpDcHeat(5);
        if (typeof bumpPalaceHeat === "function") bumpPalaceHeat(6);
        showStory(insp.say);
        if (typeof saveGameSilent === "function") saveGameSilent();
        return;
      }
      path = "eunuch";
      pass = true;
      say = insp.say;
      // provisional join then duty choices
      completeDongchangJoinCore(path, say);
      openDcGrimDutyChoices(say);
      return;
    }

    if (pathHint === "invite" && inviteOk) {
      path = hasItem("dongchang_token") ? "invite" : "karma";
      pass = true;
      say = "督公收了帖：「惡名在冊。刀，給你一把。」";
      // males with eunuch still get optional inspect soft
      if (eunuchOk && !S.dcInspectPassed) {
        const insp2 = runChanggongInspect();
        if (insp2.ok) say += "\n" + insp2.say;
      }
      completeDongchangJoinCore(path, say);
      if (eunuchOk) openDcGrimDutyChoices(say);
      else {
        grantDcUniformForRank(S.dcRank || 1);
        setFlag("dc_join_locked");
        showStory(say + "\n\n你成了廠衛・官服入手。");
        render();
      }
      return;
    }

    if (wantDisguise || pathHint === "disguise") {
      path = "disguise";
      const check = (st.charm || 0) + (st.wit || 0) + Math.floor((st.perception || 0) * 0.5) + roll;
      const dcAware = (typeof npcProfile === "function" ? (npcProfile("dongchang_gong").awareness || 88) : 88);
      pass = check + 10 >= dcAware - 15 || favorDg >= 50;
      S.dcDisguiseOk = pass;
      if (!pass) {
        say = "督公抬眼：「裝得不像。」（寫意：識破，宮熱上升。）";
        if (typeof bumpDcHeat === "function") bumpDcHeat(8);
        if (typeof bumpPalaceHeat === "function") bumpPalaceHeat(12);
        if (typeof adjustKarma === "function") adjustKarma(-1, "喬裝敗露");
        showStory(say);
        if (typeof saveGameSilent === "function") saveGameSilent();
        return;
      }
      say = disguiseNan
        ? "你女扮男裝入衙。督公未拆穿：「黑衣給他。名字，寫進番子冊。」（女身不經淨身／太監籍。）"
        : "你喬裝改容混入。督公：「演得不錯。留下來。」";
      completeDongchangJoinCore(path, say);
      grantDcUniformForRank(S.dcRank || 1);
      setFlag("dc_join_locked");
      showStory(say + "\n\n廠衛編制已定・官服入手。");
      render();
      return;
    }

    if (inviteOk) {
      return attemptDongchangJoin("invite");
    }
    if (eunuchOk) {
      return attemptDongchangJoin("eunuch");
    }
    return showStory("督公：「太監籍（男・已淨身）、東廠帖，或把面孔騙過我。否則滾。」");
  };

  // Enhance openDongchangDesk labels
  const __openDongchangDeskV15 = typeof openDongchangDesk === "function" ? openDongchangDesk : null;
  openDongchangDesk = function() {
    ensureDongchangState();
    ensureDcUniformState();
    sanitizeAbsurdFemaleEunuch();
    if (typeof applyNpcPowerPass === "function") applyNpcPowerPass();
    let html = "<h3>東廠・廠衛司</h3><div class=\"story-box\">" + (typeof dcRankLabel === "function" ? dcRankLabel() : "") +
      "<br>官服階：" + (wearingDcUniform() || 0) + "　身體：" + (bodyTagLabelLine() || "無恙") +
      "<br>下屬：" + ((S.dcSubs && S.dcSubs.length) ? S.dcSubs.map(function(id){ return (NPCS[id]||{}).name || id; }).join("、") : "無") +
      "<br>（男入廠・太監途須淨身＋驗身寫意；女僅可喬裝。差事無殘忍細描。）</div><div class=\"btn-row\" style=\"flex-wrap:wrap;gap:6px\">";
    if (!S.dcJoined || !flag("dc_join_locked")) {
      if (canEnterEunuchTrack()) html += "<button class=\"btn primary\" id=\"dc-join-e\">以太監籍求入廠（驗身）</button>";
      html += "<button class=\"btn\" id=\"dc-join-d\">喬裝騙過督公</button>";
      html += "<button class=\"btn\" id=\"dc-join-i\">憑東廠帖／惡名報到</button>";
    } else {
      html += "<button class=\"btn primary\" id=\"dc-drill\">練檔／巡衙（＋廠功）</button>";
      html += "<button class=\"btn\" id=\"dc-sub\">指派下屬辦事</button>";
      html += "<button class=\"btn\" id=\"dc-book\">翻黑冊</button>";
      html += "<button class=\"btn\" id=\"dc-robe\">換／領廠衛官服</button>";
      if (S.pendingTrial) html += "<button class=\"btn danger\" id=\"dc-trial\">【急】御前廷審</button>";
    }
    html += "<button class=\"btn ghost\" onclick=\"closeModal()\">關閉</button></div>";
    openModal(html);
    const je = document.getElementById("dc-join-e");
    if (je) je.onclick = function(){ closeModal(); attemptDongchangJoin("eunuch"); };
    const jd = document.getElementById("dc-join-d");
    if (jd) jd.onclick = function(){ closeModal(); attemptDongchangJoin("disguise"); };
    const ji = document.getElementById("dc-join-i");
    if (ji) ji.onclick = function(){ closeModal(); attemptDongchangJoin("invite"); };
    const drill = document.getElementById("dc-drill");
    if (drill) drill.onclick = function(){
      closeModal();
      const ok = Math.random() < bodyDutySuccessChance(0.75);
      if (ok) {
        if (typeof bumpDcPrestige === "function") bumpDcPrestige(3, "練檔");
        S.exp = (S.exp || 0) + 4;
        showStory("練檔完畢。廠功微升。");
      } else {
        addBodyTag("injured_hands", 2);
        showStory("抄寫過勞，手傷隱隱作痛。（身體狀態・手傷）");
      }
      render();
    };
    const sub = document.getElementById("dc-sub");
    if (sub) sub.onclick = function(){ closeModal(); if (typeof openDcAssignSub === "function") openDcAssignSub(); };
    const book = document.getElementById("dc-book");
    if (book) book.onclick = function(){
      const keys = Object.keys(S.dcArrests || {});
      let t = keys.length ? keys.map(function(id){
        const a = S.dcArrests[id];
        return (NPCS[id]||{}).name + "・" + ((typeof DC_TREATMENTS !== "undefined" && DC_TREATMENTS[a.treatment]) ? DC_TREATMENTS[a.treatment].label : a.treatment) + "・D" + a.day;
      }).join("<br>") : "黑冊暫空。";
      openModal("<h3>黑冊</h3><div class=\"story-box\">" + t + "</div><div class=\"btn-row\"><button class=\"btn ghost\" onclick=\"closeModal()\">關閉</button></div>");
    };
    const robe = document.getElementById("dc-robe");
    if (robe) robe.onclick = function(){
      closeModal();
      grantDcUniformForRank(S.dcRank || 1);
      showStory("你穿上本階廠衛官服。路人與官員的目光，已不一樣。");
      render();
    };
    const tr = document.getElementById("dc-trial");
    if (tr) tr.onclick = function(){ closeModal(); if (typeof openEmperorTrial === "function") openEmperorTrial(); };
  };

  // On dc rank up, grant better robe
  const __bumpDcPrestigeV15 = typeof bumpDcPrestige === "function" ? bumpDcPrestige : null;
  if (__bumpDcPrestigeV15) {
    bumpDcPrestige = function(n, why) {
      const before = S.dcRank || 0;
      __bumpDcPrestigeV15(n, why);
      if ((S.dcRank || 0) > before) grantDcUniformForRank(S.dcRank);
    };
  }

  // ---- Identity stance: 東廠官服 ----
  const __identityStanceForNpcV15 = typeof identityStanceForNpc === "function" ? identityStanceForNpc : null;
  if (__identityStanceForNpcV15) {
    identityStanceForNpc = function(npcId) {
      let stance = __identityStanceForNpcV15(npcId);
      const uni = wearingDcUniform();
      const fac = (typeof COURT_NPC_FACTION !== "undefined" && COURT_NPC_FACTION[npcId]) || "jianghu";
      if (uni >= 4) {
        if (fac === "civilian" || fac === "jianghu" || fac === "civil" || fac === "military") {
          if (stance === "scorn" || stance === "snub" || stance === "neutral") stance = "fear";
        }
      } else if (uni >= 3) {
        if (fac === "civilian" || fac === "jianghu") {
          if (stance === "scorn" || stance === "snub") stance = "fear";
          else if (stance === "neutral") stance = "flattery";
        } else if (fac === "civil" && stance === "scorn") stance = "snub";
      } else if (uni >= 1 && uni <= 2) {
        // low rank factory: many scorn eunuch-path; robe alone → snub from civil
        if ((flag("eunuch") || S.courtTrack === "eunuch") && (fac === "civil" || fac === "military") && stance === "neutral") stance = "snub";
      }
      // low eunuch without uniform still scorn — unchanged
      return stance;
    };
  }

  // ---- Abstract consort 取悅（無成人內容）----
  function tryConsortAmuseAbstract(npcId) {
    const id = npcId || S.serveTargetId || "shen_guifei";
    const npc = NPCS[id];
    if (!npc) return toast("無人可侍", true);
    ensureBodyState();
    const st = effectiveStats();
    let chance = 0.55 + (st.charm || 0) * 0.03 + ((S.datingAff && S.datingAff[id]) || 0) * 0.005;
    chance = bodyDutySuccessChance(chance);
    if (hasBodyTag("injured_hands")) {
      // fail path emphasized
      if (Math.random() > chance * 0.5) {
        if (typeof bumpPalaceHeat === "function") bumpPalaceHeat(8);
        S.datingAff = S.datingAff || {};
        S.datingAff[id] = (S.datingAff[id] || 0) - 6;
        addBodyTag("bruised", 2);
        showStory((npc.name || "貴人") + "眉心微蹙：「手腳這般笨拙……退下。」\n（取悅失敗・寫意：手傷影響差事；宮熱上升、好感下降。無成人描寫。）");
        if (typeof saveGameSilent === "function") saveGameSilent();
        return false;
      }
    }
    if (Math.random() < chance) {
      S.datingAff = S.datingAff || {};
      S.datingAff[id] = (S.datingAff[id] || 0) + 4;
      if (typeof bumpCourtPrestige === "function") bumpCourtPrestige(2, "侍奉得體");
      showStory("你於殿中侍奉得體（寫意：奉茶整衣、言語合宜）。" + (npc.name || "") + "神色略霽。\n（好感＋・無成人內容）");
      if (typeof saveGameSilent === "function") saveGameSilent();
      return true;
    }
    if (typeof bumpPalaceHeat === "function") bumpPalaceHeat(3);
    showStory("貴人興致缺缺，揮你退下。（取悅未成・寫意）");
    return false;
  }

  // Hook serve / palace actions
  const __appendCourtCareerActionsV15 = typeof appendCourtCareerActions === "function" ? appendCourtCareerActions : null;
  if (__appendCourtCareerActionsV15) {
    appendCourtCareerActions = function(acts, locId) {
      __appendCourtCareerActionsV15(acts, locId);
      if ((locId === "hougong" || locId === "yangxin" || locId === "neiting") && (S.serveTargetId || flag("eunuch") || S.courtTrack === "maid")) {
        acts.push({ label: "【侍奉】取悅貴人（寫意・非成人）", fn: function(){ tryConsortAmuseAbstract(S.serveTargetId); } });
      }
      if (locId === "jingshen") {
        // ensure action still points to wrapped voluntary
        const idx = acts.findIndex(function(a){ return /淨身/.test(a.label || ""); });
        if (idx >= 0) acts[idx].fn = function(){ voluntaryJingshenEunuch(); };
      }
    };
  }

  // migrate + sanitize on load
  const __migrateSaveV15 = typeof migrateSave === "function" ? migrateSave : null;
  if (__migrateSaveV15) {
    // wrap after migrate via ensure on render — use load hook
  }
  const __ensureDongchangStateV15 = typeof ensureDongchangState === "function" ? ensureDongchangState : null;
  if (__ensureDongchangStateV15) {
    ensureDongchangState = function() {
      __ensureDongchangStateV15();
      ensureBodyState();
      ensureDcUniformState();
      sanitizeAbsurdFemaleEunuch();
      if (flag("eunuch") && !hasBodyTag("castrated") && canEnterEunuchTrack()) addBodyTag("castrated");
    };
  }

  // Character sheet hint — wrap render snippet via palaceRoleLabel
  const __palaceRoleLabelV15 = typeof palaceRoleLabel === "function" ? palaceRoleLabel : null;
  if (__palaceRoleLabelV15) {
    palaceRoleLabel = function() {
      let base = __palaceRoleLabelV15();
      const body = bodyTagLabelLine();
      const uni = wearingDcUniform();
      if (uni) base += "／廠服" + uni + "階";
      if (body) base += "／" + body.split("／")[0];
      return base;
    };
  }

  // Explicit: no adult mode flag ever
  if (S && S.flags) {
    S.flags.adult_mode = false;
    S.flags.erotic_ai = false;
  }
  function isAdultModeEnabled() { return false; }

  // Headless self-test
  window.__JH_V15_SELFTEST = function() {
    const snap = {
      gender: S.gender, disguise: S.disguise, eunuch: flag("eunuch"),
      dc: S.dcJoined, rank: S.dcRank, body: Object.assign({}, S.bodyTags || {})
    };
    // female cannot eunuch
    const g0 = S.gender;
    S.gender = "女"; S.disguise = "nan";
    let blocked = false;
    try {
      voluntaryJingshenEunuch();
      blocked = true; // modal opened only if male — if female, modal 拒
    } catch (e) { blocked = true; }
    const femaleBlocked = !canEnterEunuchTrack();
    sanitizeAbsurdFemaleEunuch();
    S.gender = "男"; S.disguise = null;
    if (!flag("eunuch")) {
      applyEunuchFate();
    }
    const maleOk = flag("eunuch") && hasBodyTag("castrated");
    const insp = runChanggongInspect();
    // grim once
    S.dcGrimDone = false;
    const k0 = S.karma || 0;
    applyDcGrimDutyAbstract("harsh");
    const karmaHit = (S.karma || 0) <= k0 - 45;
    applyDcRefuseDutyPunishment();
    const hasHand = hasBodyTag("injured_hands");
    // restore soft
    S.gender = g0;
    grantDcUniformForRank(3);
    const uni = wearingDcUniform() >= 3;
    const adultOff = isAdultModeEnabled() === false;
    return {
      ok: femaleBlocked && maleOk && insp.ok && karmaHit && hasHand && uni && adultOff,
      femaleBlocked: femaleBlocked, maleOk: maleOk, insp: insp.ok,
      karmaHit: karmaHit, hasHand: hasHand, uni: uni, adultOff: adultOff, snap: snap
    };
  };

  if (window.__JH_DEBUG) {
    Object.assign(window.__JH_DEBUG, {
      canEnterEunuchTrack: canEnterEunuchTrack,
      hasBodyTag: hasBodyTag,
      addBodyTag: addBodyTag,
      tryConsortAmuseAbstract: tryConsortAmuseAbstract,
      runChanggongInspect: runChanggongInspect,
      wearingDcUniform: wearingDcUniform,
      grantDcUniformForRank: grantDcUniformForRank,
      v15self: window.__JH_V15_SELFTEST
    });
  }

  // one-shot sanitize present session
  try { sanitizeAbsurdFemaleEunuch(); ensureBodyState(); } catch (e) {}

  // ========== END V15 ==========
