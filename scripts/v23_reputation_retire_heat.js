// ========== V23: 退役宮熱 → 名聲／NPC好感／朝廷威望（AI 驅動） ==========
  // Homage only. Retire palaceHeat; migrate old saves; AI mutates renown / favor / courtPrestige.

  const V23_PALACE_LOCS = /huanggong|wumen|xingxing|yongxing|tianlao|dongchang|neiting|hougong|qianqing|yangxin|jingshen|neiwufu|wenyuan|tahe|taihe|shenwu|yuhe|gongnv|eunuch|changchun|yuhuayuan|xingbu/;

  function ensureReputationV23() {
    if (typeof S.renown !== "number") S.renown = 0;
    if (typeof S.courtPrestige !== "number") S.courtPrestige = 0;
    if (typeof S.karma !== "number") S.karma = 0;
    if (!S.npcFavor || typeof S.npcFavor !== "object") S.npcFavor = {};
    if (!S.datingAff || typeof S.datingAff !== "object") S.datingAff = {};
    if (!S.flags) S.flags = {};
    // One-time migrate: palaceHeat → 扣名聲（高熱＝物議差），並清零宮熱
    if (!S.flags.v23_heat_migrated) {
      const oldHeat = typeof S.palaceHeat === "number" ? S.palaceHeat : 0;
      if (oldHeat > 0) {
        const renownHit = Math.min(40, Math.floor(oldHeat / 3) + (oldHeat >= 40 ? 4 : 0));
        S.renown = Math.max(0, (S.renown || 0) - renownHit);
        if (oldHeat >= 50 && (S.courtTrack && S.courtTrack !== "none")) {
          const prestHit = Math.min(25, Math.floor(oldHeat / 5));
          S.courtPrestige = Math.max(0, (S.courtPrestige || 0) - prestHit);
        }
        if (!S.v23MigrateNote) {
          S.v23MigrateNote = "舊宮熱 " + oldHeat + " 已折算：名聲－" + renownHit +
            (oldHeat >= 50 ? "，朝廷威望亦略扣" : "") + "。";
        }
      }
      S.palaceHeat = 0;
      S.flags.v23_heat_migrated = true;
    } else {
      // Keep retired field inert
      S.palaceHeat = 0;
    }
  }

  function bumpRenown(n, why) {
    ensureReputationV23();
    const d = Math.max(-40, Math.min(40, Number(n) || 0));
    if (!d) return S.renown || 0;
    S.renown = Math.max(0, Math.min(200, (S.renown || 0) + d));
    if (Math.abs(d) >= 1) {
      try {
        toast("名聲" + (d > 0 ? "＋" : "－") + Math.abs(d) + (why ? "（" + why + "）" : ""), true);
      } catch (e) {}
    }
    return S.renown;
  }

  function v23IsPalaceDutyContext() {
    const loc = String(S.loc || "");
    if (V23_PALACE_LOCS.test(loc)) return true;
    if (S.courtTrack && S.courtTrack !== "none") return true;
    if (S.palaceRole) return true;
    if (flag("eunuch") || flag("palace_entry") || flag("palace_access")) return true;
    return false;
  }

  /** Retired: former「宮熱」now maps to 名聲／朝廷威望／（可選）NPC 好感. */
  bumpPalaceHeat = function(d, whyOrOpts) {
    ensureReputationV23();
    let delta = Number(d) || 0;
    if (!delta) return 0;
    const opts = (whyOrOpts && typeof whyOrOpts === "object") ? whyOrOpts : {};
    const why = typeof whyOrOpts === "string" ? whyOrOpts : (opts.why || "物議");
    // Keep former court identity scaling (avoid calling courtPowerScore here — recursion-safe)
    if (delta > 0) {
      try {
        if ((S.courtTrack === "eunuch" && (S.courtGrade || 0) <= 1) || v23TroubleScore() >= 50) delta = Math.ceil(delta * 1.15);
        if (S.serveTargetId === "jingandi" || (S.emperorFavor || 0) >= 60 || (S.courtPrestige || 0) >= 120) {
          delta = Math.max(1, Math.floor(delta * 0.75));
        }
      } catch (eScale) {}
      if (!delta || !Number.isFinite(delta)) return 0;
    }
    // Positive heat historically meant more scrutiny / bad buzz → 扣名聲
    // Negative heat meant cooling → 微加名聲
    if (delta > 0) {
      const renownHit = -Math.max(1, Math.min(12, Math.ceil(delta / 2)));
      bumpRenown(renownHit, why);
      if (v23IsPalaceDutyContext() && delta >= 4) {
        const prestHit = -Math.max(1, Math.min(8, Math.floor(delta / 3)));
        if (typeof bumpCourtPrestige === "function") bumpCourtPrestige(prestHit, why);
        else S.courtPrestige = Math.max(0, (S.courtPrestige || 0) + prestHit);
      }
      // Optional: harm a specific NPC's favor (witness / offended party)
      const nid = opts.npcId || opts.target || opts.hurtNpc;
      if (nid) {
        const favHit = -Math.max(1, Math.min(12, opts.favor != null ? Math.abs(Number(opts.favor)) : Math.min(8, Math.ceil(delta / 2))));
        if (typeof bumpNpcFavor === "function") bumpNpcFavor(nid, favHit, why);
        else {
          if (!S.datingAff) S.datingAff = {};
          S.datingAff[nid] = (S.datingAff[nid] || 0) + favHit;
          if (S.npcFavor) S.npcFavor[nid] = Math.max(0, Math.min(100, (S.npcFavor[nid] || 40) + favHit));
        }
      }
    } else {
      bumpRenown(Math.max(1, Math.min(6, Math.ceil(Math.abs(delta) / 3))), why || "清譽回升");
    }
    S.palaceHeat = 0;
    return 0;
  }

  // Effective "trouble" score for punishment severity (replaces raw palaceHeat)
  function v23TroubleScore(opts) {
    opts = opts || {};
    ensureReputationV23();
    const renown = S.renown || 0;
    const karma = S.karma || 0;
    const fav = S.emperorFavor || 0;
    // Low renown / bad karma / low emperor favor → higher trouble
    let t = 0;
    if (renown <= 5) t += 35;
    else if (renown <= 15) t += 22;
    else if (renown <= 30) t += 12;
    else if (renown >= 60) t -= 10;
    if (karma <= -40) t += 25;
    else if (karma <= -15) t += 12;
    else if (karma >= 20) t -= 8;
    if (fav <= -40) t += 30;
    else if (fav <= -15) t += 15;
    else if (fav >= 40) t -= 12;
    if (opts.heatBonus) t += Number(opts.heatBonus) || 0;
    if (S.dcHeat) t += Math.min(20, Math.floor((S.dcHeat || 0) / 5));
    return Math.max(0, Math.min(100, t));
  }

  // Wrap ensurePalaceState
  if (typeof ensurePalaceState === "function") {
    const _ensurePalaceState_v23 = ensurePalaceState;
    ensurePalaceState = function() {
      _ensurePalaceState_v23();
      ensureReputationV23();
    };
  }

  // Override pickPunishmentByHeat to use trouble score
  if (typeof pickPunishmentByHeat === "function") {
    pickPunishmentByHeat = function(opts) {
      opts = opts || {};
      const heat = v23TroubleScore(opts);
      const fav = S.emperorFavor || 0;
      if (opts.forceKind && typeof PUNISH_KINDS !== "undefined" && PUNISH_KINDS[opts.forceKind]) return opts.forceKind;
      if (opts.prefer === "gongxing" && typeof isMale === "function" && isMale() && !flag("eunuch")) return "gongxing";
      if (heat >= 70 || fav <= -40) {
        const lethal = ["zhanshou", "lingchi", "chelie", "chentang", "xingxing"];
        return lethal[Math.floor(Math.random() * lethal.length)];
      }
      if (heat >= 45 || fav <= -20) {
        if (typeof isMale === "function" && isMale() && !flag("eunuch") && Math.random() < 0.35) return "gongxing";
        return Math.random() < 0.5 ? "yongxing" : "prison";
      }
      if (heat >= 25 || fav <= -8) {
        const mid = ["tingzhang", "gunsha", "dingzhi", "exile", "demote"];
        return mid[Math.floor(Math.random() * mid.length)];
      }
      return Math.random() < 0.5 ? "fine" : "tingzhang";
    };
  }

  // Patch palaceIdentityLabel
  if (typeof palaceIdentityLabel === "function") {
    const _palaceIdentityLabel_v23 = palaceIdentityLabel;
    palaceIdentityLabel = function() {
      ensureReputationV23();
      const bits = [];
      if (S.palaceRole && typeof palaceRoleLabel === "function") bits.push(palaceRoleLabel());
      if (flag("eunuch")) bits.push("太監籍");
      if (S.fates && (S.fates.jingandi === "married" || S.fates.jingandi === "muse")) bits.push("聖眷");
      if ((S.emperorFavor || 0) >= 40) bits.push("帝寵");
      if ((S.renown || 0) <= 8 && (S.karma || 0) < 0) bits.push("清譽有損");
      else if ((S.renown || 0) >= 50) bits.push("名動江湖");
      if ((S.courtPrestige || 0) >= 80) bits.push("朝望");
      if (flag("donggong_slave")) bits.push(flag("donggong_truth_known") ? "廠奴・玄梧" : "廠奴・督公");
      return bits.length ? bits.join("／") : "閒人入禁";
    };
  }

  // Patch courtPowerScore: use low renown instead of high heat
  if (typeof courtPowerScore === "function") {
    const _courtPowerScore_v23 = courtPowerScore;
    courtPowerScore = function() {
      ensureReputationV23();
      // Temporarily zero heat so old formula's heat penalties don't double-count;
      // apply renown-based adjustment after.
      const bak = S.palaceHeat;
      S.palaceHeat = 0;
      let p = 0;
      try { p = _courtPowerScore_v23(); } finally { S.palaceHeat = 0; }
      const renown = S.renown || 0;
      if (renown <= 5) p -= 12;
      else if (renown <= 15) p -= 6;
      else if (renown >= 50) p += 4;
      if ((S.courtPrestige || 0) >= 60) p += 3;
      return Math.max(0, Math.min(100, p));
    };
  }

  // Patch courtIdentityBlob
  if (typeof courtIdentityBlob === "function") {
    const _courtIdentityBlob_v23 = courtIdentityBlob;
    courtIdentityBlob = function() {
      ensureReputationV23();
      const o = _courtIdentityBlob_v23();
      o.palaceHeat = 0; // retired
      o.renown = S.renown || 0;
      o.courtPrestige = S.courtPrestige || 0;
      o.trouble = v23TroubleScore();
      return o;
    };
  }

  // Patch applyCourtAiAction: demote_heat → renown / prestige / favor
  if (typeof applyCourtAiAction === "function") {
    const _applyCourtAiAction_v23 = applyCourtAiAction;
    applyCourtAiAction = function(npcId, action) {
      if (!action || typeof action !== "object") return _applyCourtAiAction_v23(npcId, action);
      ensureReputationV23();
      const t = String(action.type || action.action || "").toLowerCase();
      if (t === "demote_heat" || t === "heat" || t === "palace_heat" || t === "notoriety") {
        const h = Math.max(1, Math.min(20, Number(action.heat || action.amount || action.n) || 4));
        bumpPalaceHeat(h, { why: action.why || "朝野物議", npcId: action.npcId || action.hurtNpc || npcId, favor: action.favor });
        if (action.prestige) {
          const pr = -Math.abs(Number(action.prestige) || 3);
          if (typeof bumpCourtPrestige === "function") bumpCourtPrestige(pr, action.why || "物議傷望");
        }
        return "（名聲受損" + (action.prestige ? "／朝廷威望" : "") + "）";
      }
      if (t === "renown" || t === "fame" || t === "mingsheng") {
        const n = Math.max(-20, Math.min(20, Number(action.amount != null ? action.amount : action.n) || 2));
        bumpRenown(n, action.why || "人物裁奪");
        return "（名聲" + (n >= 0 ? "＋" : "") + n + "）";
      }
      if (t === "prestige" || t === "court_prestige") {
        const n = Math.max(-30, Math.min(40, Number(action.amount != null ? action.amount : action.n) || 5));
        if (typeof bumpCourtPrestige === "function") bumpCourtPrestige(n, action.why || "人物裁奪");
        else S.courtPrestige = Math.max(0, (S.courtPrestige || 0) + n);
        return "（朝廷威望" + (n >= 0 ? "＋" : "") + n + "）";
      }
      if (t === "favor_delta" || t === "favor" || t === "npc_favor") {
        const d = Math.max(-20, Math.min(20, Number(action.amount != null ? action.amount : action.n) || 2));
        const target = action.npcId || action.target || npcId;
        if (target === "jingandi" || action.emperor) {
          if (typeof bumpEmperorFavor === "function") bumpEmperorFavor(d, action.why || "人物裁奪");
        } else if (target) {
          if (typeof bumpNpcFavor === "function") bumpNpcFavor(target, d, action.why || "人物裁奪");
          else {
            if (!S.datingAff) S.datingAff = {};
            S.datingAff[target] = (S.datingAff[target] || 0) + d;
          }
        }
        return "（好感" + (d >= 0 ? "＋" : "") + d + "）";
      }
      if (t === "scorn") {
        const note = _applyCourtAiAction_v23(npcId, action);
        // scorn used to bump heat — now also hit renown lightly
        if (action.heat) bumpPalaceHeat(Number(action.heat) || 2, { why: "被輕蔑外傳", npcId: npcId });
        else bumpRenown(-1, "被輕蔑外傳");
        return note || "（被輕蔑）";
      }
      return _applyCourtAiAction_v23(npcId, action);
    };
  }

  // Patch applyWorldAiAction for renown / prestige / heat remap
  if (typeof applyWorldAiAction === "function") {
    const _applyWorldAiAction_v23 = applyWorldAiAction;
    applyWorldAiAction = function(npcId, action) {
      if (!action || typeof action !== "object") return _applyWorldAiAction_v23(npcId, action);
      ensureReputationV23();
      const t = String(action.type || action.action || "").toLowerCase();
      if (t === "renown" || t === "fame" || t === "mingsheng") {
        const n = Math.max(-15, Math.min(15, Number(action.amount != null ? action.amount : action.n) || 1));
        bumpRenown(n, action.why || "江湖傳聞");
        return "（名聲" + (n >= 0 ? "＋" : "") + n + "）";
      }
      if (t === "heat" || t === "demote_heat" || t === "palace_heat" || t === "notoriety") {
        return applyCourtAiAction(npcId, action);
      }
      if (t === "prestige" || t === "court_prestige") {
        const n = Math.max(-25, Math.min(30, Number(action.amount != null ? action.amount : action.n) || 5));
        if (typeof bumpCourtPrestige === "function") bumpCourtPrestige(n, action.why || "朝務");
        else S.courtPrestige = Math.max(0, (S.courtPrestige || 0) + n);
        return "（朝廷威望" + (n >= 0 ? "＋" : "") + n + "）";
      }
      return _applyWorldAiAction_v23(npcId, action);
    };
  }

  // Patch applyCheatAction heat → renown
  if (typeof applyCheatAction === "function") {
    const _applyCheatAction_v23 = applyCheatAction;
    applyCheatAction = function(action, srcNote) {
      if (!action || typeof action !== "object") return _applyCheatAction_v23(action, srcNote);
      ensureReputationV23();
      const t = String(action.type || action.action || "").toLowerCase();
      if (t === "heat" || t === "palace_heat" || t === "demote_heat") {
        const h = Math.max(-30, Math.min(40, Number(action.amount != null ? action.amount : action.n != null ? action.n : action.heat) || 0));
        if (h > 0) bumpPalaceHeat(h, { why: "設定", npcId: action.npcId });
        else if (h < 0) bumpRenown(Math.abs(h), "設定・清譽");
        return "（已改為名聲／威望，不再使用宮熱）";
      }
      if (t === "renown" || t === "fame" || t === "mingsheng") {
        const n = Math.max(-50, Math.min(80, Number(action.amount != null ? action.amount : action.n) || 5));
        bumpRenown(n, "設定");
        return "（名聲" + (n >= 0 ? "＋" : "") + n + "）";
      }
      return _applyCheatAction_v23(action, srcNote);
    };
  }

  // Offline cheat: 「名聲」「朝廷威望」keywords; ignore 宮熱 as setter (map to 名聲)
  if (typeof offlineCheatInterpret === "function") {
    const _offlineCheatInterpret_v23 = offlineCheatInterpret;
    offlineCheatInterpret = function(text) {
      const pack = _offlineCheatInterpret_v23(text) || { say: "", actions: [] };
      const t = String(text || "");
      const acts = Array.isArray(pack.actions) ? pack.actions.slice() : [];
      if (/名聲|聲望|名揚|清譽/.test(t) && !acts.some(function(a){ return /renown|fame|mingsheng/.test(String(a.type||"")); })) {
        const m = t.match(/(?:名聲|聲望)\s*[＋+加升]?\s*(-?\d+)/) || t.match(/[＋+加]\s*(\d+)/);
        const m2 = t.match(/[－\-扣減]\s*(\d+)/);
        let n = 5;
        if (m) n = Number(m[1]);
        else if (m2) n = -Number(m2[1]);
        else if (/扣|減|損|臭|惡名/.test(t)) n = -5;
        acts.push({ type: "renown", amount: n });
        pack.say = (pack.say || "") + "（名聲變動）";
      }
      if (/朝廷威望|宮廷威望|朝望/.test(t) && !acts.some(function(a){ return /prestige|court_prestige/.test(String(a.type||"")); })) {
        const m = t.match(/(?:朝廷威望|宮廷威望|威望)\s*[＋+加升]?\s*(-?\d+)/);
        const m2 = t.match(/[－\-扣減]\s*(\d+)/);
        let n = 20;
        if (m) n = Number(m[1]);
        else if (m2) n = -Number(m2[1]);
        else if (/扣|減|削/.test(t)) n = -15;
        acts.push({ type: "prestige", amount: n });
        pack.say = (pack.say || "") + "（朝廷威望變動）";
      }
      if (/宮熱/.test(t)) {
        // Redirect old cheat wording
        acts.push({ type: "renown", amount: /降|減|清|消|零/.test(t) ? 5 : -5 });
        pack.say = (pack.say || "宮熱已退役。") + "改動名聲。";
      }
      // favor hurt: 「XXX 好感－N」
      const favM = t.match(/([\u4e00-\u9fff]{2,6}).{0,4}好感\s*[－\-扣減]\s*(\d+)/);
      if (favM && typeof NPCS !== "undefined") {
        const name = favM[1];
        let nid = null;
        Object.keys(NPCS).forEach(function(id) {
          if (NPCS[id] && NPCS[id].name && NPCS[id].name.indexOf(name) >= 0) nid = id;
        });
        if (nid) acts.push({ type: "favor_delta", npcId: nid, amount: -Math.abs(Number(favM[2]) || 5) });
      }
      pack.actions = acts;
      return pack;
    };
  }

  // AI prompts: teach renown / prestige / favor; retire heat
  if (typeof courtNpcSystemPromptExtra === "function") {
    const _courtNpcSystemPromptExtra_v23 = courtNpcSystemPromptExtra;
    courtNpcSystemPromptExtra = function() {
      return _courtNpcSystemPromptExtra_v23() +
        " 【名聲體系】已取消「宮熱」。公開形象用 renown（名聲，做好事＋、敗壞清譽－）；宮中當差用 prestige／court_prestige（朝廷威望）；得罪某人用 favor_delta{npcId,amount}。" +
        " 舊 demote_heat／heat 仍可輸出，本地會折算成扣名聲（宮內兼扣威望）。勿再提宮熱。";
    };
  } else if (typeof buildCourtNpcSystemPrompt === "function") {
    const _buildCourtNpcSystemPrompt_v23 = buildCourtNpcSystemPrompt;
    buildCourtNpcSystemPrompt = function() {
      return _buildCourtNpcSystemPrompt_v23.apply(this, arguments) +
        " 【名聲】renown＋／－；【朝廷威望】prestige；【NPC好感】favor_delta。無宮熱。";
    };
  }

  // Patch identity prompt strings that mention 宮熱
  if (typeof courtIdentityPromptLine === "function") {
    const _courtIdentityPromptLine_v23 = courtIdentityPromptLine;
    courtIdentityPromptLine = function() {
      ensureReputationV23();
      let s = "";
      try { s = _courtIdentityPromptLine_v23.apply(this, arguments) || ""; } catch (e) { s = ""; }
      s = String(s).replace(/宮熱=\d+/g, "名聲=" + (S.renown || 0) + " 朝廷威望=" + (S.courtPrestige || 0));
      s = s.replace(/宮熱/g, "名聲");
      return s;
    };
  }

  // Wrap free-input / director prompts if present
  function v23PatchPromptFn(name) {
    try {
      const fn = eval(name);
      if (typeof fn !== "function") return;
      const orig = fn;
      // can't easily reassign by name string in strict; skip
    } catch (e) {}
  }

  if (typeof worldDirectorSystemPrompt === "function") {
    const _worldDirectorSystemPrompt_v23 = worldDirectorSystemPrompt;
    worldDirectorSystemPrompt = function() {
      return _worldDirectorSystemPrompt_v23.apply(this, arguments) +
        " 狀態突變：做好事／俠名→renown＋；敗壞清譽／惡名外傳→renown－；宮中當差得失→prestige；得罪／討好某人→favor_delta{npcId,amount}。無宮熱。";
    };
  }

  if (typeof cheatSystemPrompt === "function") {
    const _cheatSystemPrompt_v23 = cheatSystemPrompt;
    cheatSystemPrompt = function() {
      return _cheatSystemPrompt_v23() +
        " 宮熱已退役。用 renown／fame（名聲）、prestige（朝廷威望）、favor_delta（NPC好感）。若玩家仍寫「宮熱」，改輸出 renown。";
    };
  }

  // UI: character page — replace 宮熱 with 名聲
  if (typeof renderChar === "function") {
    const _renderChar_v23 = renderChar;
    renderChar = function() {
      ensureReputationV23();
      let html = _renderChar_v23.apply(this, arguments);
      html = String(html).replace(/·\s*宮熱\s*\d+/g, "· 名聲 " + (S.renown || 0));
      html = String(html).replace(/宮熱\s*\d+/g, "名聲 " + (S.renown || 0));
      // Ensure 朝廷威望 visible
      if (html.indexOf("朝廷威望") < 0 && html.indexOf("威望") >= 0) {
        /* already has prestige via older label */
      }
      if (html.indexOf("名聲") < 0) {
        html = html.replace(
          /(朝廷威望\s*\d+)/,
          "$1 · 名聲 " + (S.renown || 0)
        );
      }
      return html;
    };
  }

  // Location / map chips often include heat via template — patch renderHUD if any
  if (typeof renderTopBar === "function") {
    const _renderTopBar_v23 = renderTopBar;
    renderTopBar = function() {
      ensureReputationV23();
      let html = _renderTopBar_v23.apply(this, arguments);
      return String(html).replace(/宮熱\s*\d+/g, "名聲" + (S.renown || 0));
    };
  }

  // applyPalacePunishment paths still call bumpPalaceHeat — our override handles it.
  // Fatal thresholds that checked palaceHeat >= 85/80 — patch applyPalacePunishment fatal check via wrap
  if (typeof applyPalacePunishment === "function") {
    const _applyPalacePunishment_v23 = applyPalacePunishment;
    applyPalacePunishment = function(kind, opts) {
      opts = opts || {};
      ensureReputationV23();
      // Provide synthetic heat for any legacy reads inside via temporary? Better: patch callers.
      // Temporarily set a derived heat for nested logic that still reads S.palaceHeat mid-function
      const derived = v23TroubleScore(opts);
      const bak = S.palaceHeat;
      S.palaceHeat = derived;
      let out;
      try {
        out = _applyPalacePunishment_v23(kind, opts);
      } finally {
        S.palaceHeat = 0;
      }
      return out;
    };
  }

  // endCombat / death paths reading palaceHeat
  if (typeof endCombat === "function") {
    const _endCombat_v23 = endCombat;
    endCombat = function() {
      const bak = S.palaceHeat;
      S.palaceHeat = v23TroubleScore();
      let out;
      try { out = _endCombat_v23.apply(this, arguments); }
      finally { S.palaceHeat = 0; }
      return out;
    };
  }

  // Event effect applicator with fx.heat — already calls bumpPalaceHeat; override covers it.

  // Birth effect.heat — covered by bumpPalaceHeat if they call it; raw S.palaceHeat += still exists.
  // Patch a generic after-load migrate on migrateSave / load
  if (typeof migrateSave === "function") {
    const _migrateSave_v23 = migrateSave;
    migrateSave = function(raw) {
      const data = _migrateSave_v23(raw);
      try {
        if (data && !data.flags) data.flags = {};
        if (data && !data.flags.v23_heat_migrated) {
          const oldHeat = typeof data.palaceHeat === "number" ? data.palaceHeat : 0;
          if (oldHeat > 0) {
            const renownHit = Math.min(40, Math.floor(oldHeat / 3) + (oldHeat >= 40 ? 4 : 0));
            data.renown = Math.max(0, (data.renown || 0) - renownHit);
            if (oldHeat >= 50 && data.courtTrack && data.courtTrack !== "none") {
              data.courtPrestige = Math.max(0, (data.courtPrestige || 0) - Math.min(25, Math.floor(oldHeat / 5)));
            }
          }
          data.palaceHeat = 0;
          data.flags.v23_heat_migrated = true;
        } else if (data) {
          data.palaceHeat = 0;
        }
      } catch (e) {}
      return data;
    };
  }

  // Story / modal helper texts mentioning 宮熱
  function v23RewriteHeatCopy(s) {
    return String(s || "")
      .replace(/善惡、好感與宮熱/g, "善惡、好感、名聲與朝廷威望")
      .replace(/威望、好感、善惡與宮熱/g, "威望、好感、善惡與名聲")
      .replace(/善惡／宮熱/g, "善惡／名聲")
      .replace(/廠熱\/宮熱/g, "名聲／朝廷威望")
      .replace(/宮熱微升/g, "名聲微損")
      .replace(/宮熱上升/g, "名聲受損")
      .replace(/宮熱驟升/g, "清譽大損")
      .replace(/宮熱暫緩/g, "物議暫息")
      .replace(/宮熱與惡名/g, "惡名與清譽損")
      .replace(/· 宮熱 /g, "· 名聲 ")
      .replace(/宮熱 /g, "名聲 ")
      .replace(/宮熱/g, "名聲");
  }

  if (typeof showStory === "function") {
    const _showStory_v23 = showStory;
    showStory = function(text, scene) {
      return _showStory_v23(v23RewriteHeatCopy(text), scene);
    };
  }

  // Patch mountEventFreeUi / festival copy if it injects heat hint
  if (typeof mountEventFreeUi === "function") {
    const _mountEventFreeUi_v23rep = mountEventFreeUi;
    mountEventFreeUi = function(parentHtmlExtras, ctx) {
      if (typeof parentHtmlExtras === "string") parentHtmlExtras = v23RewriteHeatCopy(parentHtmlExtras);
      return _mountEventFreeUi_v23rep(parentHtmlExtras, ctx);
    };
  }

  // Offline stance acts that push heat — remap in identity offline if possible
  if (typeof offlineCourtActionsForStance === "function") {
    const _offlineCourtActionsForStance_v23 = offlineCourtActionsForStance;
    offlineCourtActionsForStance = function() {
      const acts = _offlineCourtActionsForStance_v23.apply(this, arguments) || [];
      return acts.map(function(a) {
        if (!a) return a;
        if (a.type === "demote_heat" || a.heat) {
          return Object.assign({}, a, {
            type: a.type === "demote_heat" ? "renown" : a.type,
            amount: a.type === "demote_heat" ? -Math.max(1, Math.ceil((a.heat || 3) / 2)) : a.amount,
            heat: undefined
          });
        }
        return a;
      });
    };
  }

  // On boot / render ensure migrate
  try {
    if (typeof S !== "undefined" && S && S.name) ensureReputationV23();
  } catch (e0) {}

  // Hook render to keep heat zeroed and migrate
  if (typeof render === "function") {
    const _render_v23 = render;
    render = function() {
      try { if (S && S.name) ensureReputationV23(); } catch (e) {}
      return _render_v23.apply(this, arguments);
    };
  }

  // AI free-input judgment: when player does something, encourage renown/prestige/favor
  if (typeof freeInputSystemPrompt === "function") {
    const _freeInputSystemPrompt_v23 = freeInputSystemPrompt;
    freeInputSystemPrompt = function() {
      return _freeInputSystemPrompt_v23.apply(this, arguments) +
        " 裁決時：有助公眾形象→worldActions renown＋；敗壞清譽→renown－；宮中差務得失→prestige；得罪在場／相關NPC→favor_delta。勿用宮熱。";
    };
  }


  // Drain any leftover direct S.palaceHeat += ... writes into 名聲
  function drainStrayPalaceHeat(why) {
    ensureReputationV23();
    const h = Number(S.palaceHeat) || 0;
    if (h > 0) {
      S.palaceHeat = 0;
      bumpPalaceHeat(h, { why: why || "物議折算" });
    } else {
      S.palaceHeat = 0;
    }
  }

  const _ensureReputationV23_core = ensureReputationV23;
  ensureReputationV23 = function() {
    _ensureReputationV23_core();
    // After migration, any new direct writes get drained
    if (S.flags && S.flags.v23_heat_migrated) {
      const h = Number(S.palaceHeat) || 0;
      if (h > 0) {
        S.palaceHeat = 0;
        const renownHit = -Math.max(1, Math.min(12, Math.ceil(h / 2)));
        S.renown = Math.max(0, (S.renown || 0) + renownHit);
        try { toast("名聲" + (renownHit > 0 ? "＋" : "－") + Math.abs(renownHit) + "（物議折算）", true); } catch (e) {}
      }
    }
  };

  if (typeof courtIdentityPromptBlock === "function") {
    const _courtIdentityPromptBlock_v23 = courtIdentityPromptBlock;
    courtIdentityPromptBlock = function(npcId) {
      ensureReputationV23();
      drainStrayPalaceHeat();
      let s = _courtIdentityPromptBlock_v23(npcId);
      s = String(s)
        .replace(/宮熱=\d+/g, "名聲=" + (S.renown || 0) + " 朝廷威望=" + (S.courtPrestige || 0) + " 物議=" + v23TroubleScore())
        .replace(/demote_heat/g, "renown(扣名聲)|prestige|favor_delta")
        .replace(/升宮熱/g, "扣名聲／傷好感");
      if (s.indexOf("名聲體系") < 0) {
        s += " 【名聲體系】無宮熱。公開形象 renown；宮差 prestige；得罪人 favor_delta{npcId,amount}。舊 heat／demote_heat 會折算扣名聲。";
      }
      return s;
    };
  }

  if (typeof worldDirectorPrompt === "function") {
    const _worldDirectorPrompt_v23 = worldDirectorPrompt;
    worldDirectorPrompt = function() {
      ensureReputationV23();
      let s = _worldDirectorPrompt_v23.apply(this, arguments);
      return String(s).replace(/宮熱/g, "名聲") +
        " 突變優先：renown（名聲＋好事／－敗譽）、prestige（朝廷威望・宮差）、favor_delta（特定NPC）。勿用宮熱。";
    };
  }

  if (typeof eventFreePrompt === "function") {
    const _eventFreePrompt_v23 = eventFreePrompt;
    eventFreePrompt = function(ctx) {
      ensureReputationV23();
      let s = _eventFreePrompt_v23(ctx);
      return String(s).replace(/宮熱/g, "名聲") +
        " 依言行輸出 worldActions：renown／prestige／favor_delta／karma_delta。";
    };
  }

  if (typeof statusDeltaForPrompt === "function") {
    const _statusDeltaForPrompt_v23 = statusDeltaForPrompt;
    statusDeltaForPrompt = function(npcId) {
      let s = _statusDeltaForPrompt_v23(npcId);
      return String(s).replace(/升宮熱/g, "扣名聲或傷好感").replace(/宮熱/g, "名聲");
    };
  }

  if (typeof loseDispositionSystemPrompt === "function") {
    const _loseDispositionSystemPrompt_v23 = loseDispositionSystemPrompt;
    loseDispositionSystemPrompt = function() {
      ensureReputationV23();
      let s = _loseDispositionSystemPrompt_v23.apply(this, arguments);
      return String(s)
        .replace(/廠熱\/宮熱=\d+/g, "名聲=" + (S.renown || 0) + " 朝廷威望=" + (S.courtPrestige || 0))
        .replace(/宮熱/g, "名聲") +
        " 處置可改 renown／prestige／favor_delta／karma；無宮熱。";
    };
  }

  if (typeof winDispositionSystemPrompt === "function") {
    const _winDispositionSystemPrompt_v23 = winDispositionSystemPrompt;
    winDispositionSystemPrompt = function() {
      ensureReputationV23();
      let s = _winDispositionSystemPrompt_v23.apply(this, arguments);
      return String(s)
        .replace(/廠熱\/宮熱=\d+/g, "名聲=" + (S.renown || 0) + " 朝廷威望=" + (S.courtPrestige || 0))
        .replace(/宮熱/g, "名聲");
    };
  }

  // Patch render() drain
  if (typeof render === "function") {
    const _render_v23b = render;
    render = function() {
      try { if (S && S.name) { ensureReputationV23(); drainStrayPalaceHeat(); } } catch (e) {}
      let out = _render_v23b.apply(this, arguments);
      // Post-process DOM text if render returns void — also patch common HTML builders via string if any
      return out;
    };
  }

  // Slave command intel button copy
  if (typeof donggongSlaveCommand === "function") {
    const _donggongSlaveCommand_v23 = donggongSlaveCommand;
    donggongSlaveCommand = function() {
      const ret = _donggongSlaveCommand_v23.apply(this, arguments);
      try {
        const body = document.getElementById("modal-body");
        if (body && body.innerHTML) {
          body.innerHTML = v23RewriteHeatCopy(body.innerHTML)
            .replace(/情報・名聲／帝心/g, "情報・名聲／帝心")
            .replace(/情報・宮熱／帝心/g, "情報・名聲／帝心");
          // rebind is hard; leave if already opened — next open uses showStory rewrite
        }
      } catch (e) {}
      return ret;
    };
  }


  window.__JH_V23_SELFTEST = function() {
    ensureReputationV23();
    const bak = {
      renown: S.renown,
      prestige: S.courtPrestige,
      heat: S.palaceHeat,
      flags: Object.assign({}, S.flags || {}),
      datingAff: Object.assign({}, S.datingAff || {}),
      npcFavor: Object.assign({}, S.npcFavor || {})
    };
    // simulate old heat migration path
    S.flags.v23_heat_migrated = false;
    S.palaceHeat = 60;
    S.renown = 20;
    S.courtTrack = "civil";
    S.courtPrestige = 40;
    ensureReputationV23();
    const migrated = S.palaceHeat === 0 && S.flags.v23_heat_migrated && S.renown < 20;

    S.renown = 30;
    S.courtTrack = "none";
    S.serveTargetId = null;
    S.emperorFavor = 0;
    bumpPalaceHeat(8, { why: "test", npcId: "tongxiaoliu" });
    const afterHeat = S.renown < 30 && S.palaceHeat === 0;

    const r0 = S.renown;
    bumpRenown(5, "test");
    const renownOk = S.renown === r0 + 5;

    let aiNote = "";
    if (typeof applyCourtAiAction === "function") {
      aiNote = applyCourtAiAction("tongxiaoliu", { type: "demote_heat", heat: 6, prestige: 2 });
    }
    const trouble = v23TroubleScore();

    // restore
    S.renown = bak.renown;
    S.courtPrestige = bak.prestige;
    S.palaceHeat = 0;
    S.flags = bak.flags;
    S.datingAff = bak.datingAff;
    S.npcFavor = bak.npcFavor;

    return {
      ok: !!(migrated && afterHeat && renownOk),
      migrated: migrated,
      afterHeat: afterHeat,
      renownOk: renownOk,
      aiNote: aiNote,
      trouble: trouble,
      hasBumpRenown: typeof bumpRenown === "function"
    };
  };

  window.__JH_V23 = {
    ensureReputationV23: ensureReputationV23,
    bumpRenown: bumpRenown,
    bumpPalaceHeat: bumpPalaceHeat,
    v23TroubleScore: v23TroubleScore
  };

  try { ensureReputationV23(); } catch (e) {}

  // ========== END V23 ==========
