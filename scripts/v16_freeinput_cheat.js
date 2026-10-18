// ========== V16: EVENT FREE-TEXT + 「設定」CHEAT CONSOLE ==========
  // Homage only. No gore / no erotica.
  // Free-text on duty/AI events → AI/offline → courtActions/worldActions.
  // 「設定」natural commands → whitelist mutators → real save + toast.

  const CHEAT_GIFT_WHITELIST = Object.assign({},
    typeof COURT_AI_GIFT_WHITELIST === "object" ? COURT_AI_GIFT_WHITELIST : {},
    typeof WORLD_GIFT_WHITELIST === "object" ? WORLD_GIFT_WHITELIST : {},
    { herb:1, pill:1, wine:1, detox:1, big_pill:1, candy:1, palace_silk:1, palace_ruyi:1,
      palace_jinpao:1, palace_badge:1, palace_jade:1, yulin_pass:1, soft_silk_robe:1 }
  );

  const CHEAT_TRACKS = { none:1, civil:1, military:1, eunuch:1, maid:1 };
  const CHEAT_ROLES = { none:1, official:1, guard:1, eunuch:1, maid:1, lady:1, consort:1, dongchang:1 };

  function ensureCheatState() {
    if (!S.cheatLog || !Array.isArray(S.cheatLog)) S.cheatLog = [];
    if (!S.cheatTitles || !Array.isArray(S.cheatTitles)) S.cheatTitles = [];
    if (typeof S.cheatUsed !== "number") S.cheatUsed = 0;
  }

  function logCheat(cmd, note) {
    ensureCheatState();
    S.cheatLog.push({ day: S.day || 0, cmd: trunc(String(cmd), 60), note: trunc(String(note || ""), 80) });
    if (S.cheatLog.length > 30) S.cheatLog = S.cheatLog.slice(-30);
    S.cheatUsed = (S.cheatUsed || 0) + 1;
  }

  /** Absolute / force mutators for cheat only (whitelist). */
  function applyCheatAction(action, srcNote) {
    if (!action || typeof action !== "object") return "";
    ensureCheatState();
    if (typeof ensureCourtCareer === "function") ensureCourtCareer();
    const t = String(action.type || action.action || "").toLowerCase();
    let note = "";
    try {
      if (t === "set_track" || t === "court_track") {
        const track = String(action.track || action.id || "").toLowerCase();
        if (!CHEAT_TRACKS[track]) return "（途未知）";
        if (track === "eunuch") {
          if (typeof canEnterEunuchTrack === "function" && !canEnterEunuchTrack()) {
            // cheat can force male path only — still block female absurdity
            if (typeof isFemale === "function" && isFemale() && S.disguise !== "nan") {
              return "（女身不可強入太監籍；請先改性別或男裝後再用設定）";
            }
          }
          if (typeof startCourtTrack === "function") startCourtTrack("eunuch", { hall: action.hall || null });
          else { S.courtTrack = "eunuch"; S.courtGrade = Math.max(S.courtGrade || 0, 1); setFlag("eunuch"); }
        } else if (track === "none") {
          S.courtTrack = "none"; S.courtPin = 0; S.courtGrade = 0;
          if (typeof setPalaceRole === "function") setPalaceRole(null);
        } else if (typeof startCourtTrack === "function") {
          startCourtTrack(track, { bonusPrestige: Number(action.prestige) || 0 });
        } else {
          S.courtTrack = track;
        }
        note = "（仕途→" + (typeof courtTrackLabel === "function" ? courtTrackLabel() : track) + "）";
      } else if (t === "set_grade" || t === "force_grade") {
        let g = Math.max(0, Math.min(5, Number(action.grade != null ? action.grade : action.n) || 1));
        if (S.courtTrack !== "eunuch" && S.courtTrack !== "maid") {
          if (action.asEunuch || action.track === "eunuch") {
            applyCheatAction({ type: "set_track", track: "eunuch" });
          } else if (action.asMaid || action.track === "maid") {
            applyCheatAction({ type: "set_track", track: "maid" });
          }
        }
        if (S.courtTrack === "eunuch" || S.courtTrack === "maid") {
          S.courtGrade = g;
          if (g >= 1 && S.courtTrack === "eunuch") {
            setFlag("eunuch");
            if (typeof setPalaceRole === "function") setPalaceRole("eunuch");
          }
          if (typeof tryAutoCourtPromote === "function") tryAutoCourtPromote();
          note = "（品階→" + (typeof courtRankLabel === "function" ? courtRankLabel() : ("g" + g)) + "）";
        } else note = "（需先入太監／宮女途）";
      } else if (t === "set_pin" || t === "force_pin") {
        let p = Math.max(0, Math.min(18, Number(action.pin != null ? action.pin : action.n) || 1));
        if (S.courtTrack !== "civil" && S.courtTrack !== "military") {
          const tr = action.track === "military" ? "military" : "civil";
          applyCheatAction({ type: "set_track", track: tr });
        }
        if (S.courtTrack === "civil" || S.courtTrack === "military") {
          S.courtPin = p;
          if (typeof tryAutoCourtPromote === "function") tryAutoCourtPromote();
          note = "（品階→" + (typeof courtRankLabel === "function" ? courtRankLabel() : ("pin" + p)) + "）";
        } else note = "（需先入文／武官）";
      } else if (t === "set_title" || t === "title") {
        const title = trunc(String(action.title || action.text || ""), 24);
        if (title) {
          S.cheatTitles = (S.cheatTitles || []).filter(function(x){ return x !== title; }).concat([title]).slice(-8);
          note = "（稱號・" + title + "）";
        }
      } else if (t === "palace_role" || t === "set_role") {
        const role = String(action.role || action.id || "").toLowerCase();
        if (role === "none" || role === "clear") {
          if (typeof setPalaceRole === "function") setPalaceRole(null);
          note = "（卸宮職）";
        } else if (CHEAT_ROLES[role] && typeof setPalaceRole === "function") {
          setPalaceRole(role);
          note = "（宮職→" + role + "）";
        }
      } else if (t === "dc_join" || t === "join_dongchang") {
        S.dcJoined = true;
        setFlag("dongchang_invite");
        if (typeof S.dcRank !== "number" || S.dcRank < 1) S.dcRank = Math.max(1, Math.min(5, Number(action.rank) || 1));
        if (typeof grantDcUniformForRank === "function") grantDcUniformForRank(S.dcRank);
        if (S.courtTrack === "none" && flag("eunuch")) applyCheatAction({ type: "set_track", track: "eunuch" });
        note = "（入東廠・品" + (S.dcRank || 1) + "）";
      } else if (t === "dc_rank" || t === "set_dc_rank") {
        S.dcJoined = true;
        S.dcRank = Math.max(1, Math.min(5, Number(action.rank != null ? action.rank : action.n) || 1));
        if (typeof grantDcUniformForRank === "function") grantDcUniformForRank(S.dcRank);
        note = "（廠衛品→" + S.dcRank + "）";
      } else if (t === "heal" || t === "full_hp") {
        const st = typeof effectiveStats === "function" ? effectiveStats() : { hpMax: S.hpMax || 100, neiliMax: S.neiliMax || 50 };
        S.hp = st.hpMax || S.hpMax || 100;
        S.neili = st.neiliMax || S.neiliMax || 50;
        note = "（氣血／內力回滿）";
      } else if (t === "gold" || t === "set_gold") {
        if (action.set != null) S.gold = Math.max(0, Math.min(99999, Number(action.set) || 0));
        else {
          const g = Math.max(-5000, Math.min(5000, Number(action.amount != null ? action.amount : action.n) || 100));
          S.gold = Math.max(0, (S.gold || 0) + g);
        }
        note = "（銀兩→" + S.gold + "）";
      } else if (t === "renown") {
        const n = Math.max(-50, Math.min(80, Number(action.amount != null ? action.amount : action.n) || 5));
        S.renown = Math.max(0, (S.renown || 0) + n);
        note = "（聲望" + (n >= 0 ? "＋" : "") + n + "）";
      } else if (t === "prestige" || t === "court_prestige") {
        const n = Math.max(-100, Math.min(300, Number(action.amount != null ? action.amount : action.n) || 20));
        if (typeof bumpCourtPrestige === "function") bumpCourtPrestige(n, "設定");
        else S.courtPrestige = Math.max(0, (S.courtPrestige || 0) + n);
        note = "（朝廷威望變動）";
      } else if (t === "emperor_favor" || t === "set_emperor_favor") {
        const d = Math.max(-50, Math.min(50, Number(action.amount != null ? action.amount : action.n) || 5));
        if (typeof bumpEmperorFavor === "function") bumpEmperorFavor(d, "設定");
        else S.emperorFavor = (S.emperorFavor || 0) + d;
        note = "（帝心" + (d >= 0 ? "＋" : "") + d + "）";
      } else if (t === "heat" || t === "palace_heat") {
        const h = Math.max(-30, Math.min(40, Number(action.amount != null ? action.amount : action.n) || 0));
        if (h > 0 && typeof bumpPalaceHeat === "function") bumpPalaceHeat(h);
        else S.palaceHeat = Math.max(0, (S.palaceHeat || 0) + h);
        note = "（宮熱變動）";
      } else if (t === "karma" || t === "karma_delta") {
        const k = Math.max(-50, Math.min(50, Number(action.amount != null ? action.amount : action.n) || 0));
        if (typeof adjustKarma === "function") adjustKarma(k, "設定");
        else S.karma = (S.karma || 0) + k;
        note = "（善惡變動）";
      } else if (t === "favor" || t === "favor_delta") {
        const d = Math.max(-30, Math.min(30, Number(action.amount != null ? action.amount : action.n) || 5));
        const target = action.npcId || action.target || action.id;
        if (target === "jingandi" || action.emperor) {
          if (typeof bumpEmperorFavor === "function") bumpEmperorFavor(d, "設定");
          else S.emperorFavor = (S.emperorFavor || 0) + d;
        } else if (target && NPCS[target]) {
          if (!S.datingAff) S.datingAff = {};
          S.datingAff[target] = (S.datingAff[target] || 0) + d;
        }
        note = "（好感變動）";
      } else if (t === "add_item" || t === "gift_item" || t === "gift") {
        const id = action.item || action.id;
        const n = Math.max(1, Math.min(20, Number(action.n) || 1));
        if (id && CHEAT_GIFT_WHITELIST[id] && ITEMS[id]) {
          addItem(id, n);
          note = "（入手" + ITEMS[id].name + "×" + n + "）";
        } else note = "（物品不在白名單）";
      } else if (t === "set_flag" || t === "flag") {
        const k = String(action.flag || action.id || "");
        if (k && typeof ALLOWED_FLAGS !== "undefined" && ALLOWED_FLAGS.indexOf(k) >= 0) {
          setFlag(k, action.value !== false);
          note = "（旗・" + k + "）";
        } else note = "（旗不在白名單）";
      } else if (t === "clear_flag") {
        const k = String(action.flag || action.id || "");
        if (k && S.flags) { delete S.flags[k]; note = "（清旗・" + k + "）"; }
      } else if (t === "unlock_map" || t === "reveal_loc") {
        const loc = action.loc || action.id;
        if (loc && typeof LOCATIONS !== "undefined" && LOCATIONS.some(function(l){ return l.id === loc; })) {
          setFlag("map_" + loc);
          note = "（地圖開・" + loc + "）";
        }
      } else if (t === "assign_hall") {
        if (typeof assignEunuchHall === "function") {
          assignEunuchHall(action.hall || action.hallId || null);
          note = "（分殿）";
        }
      } else if (t === "set_serve" || t === "serve") {
        if (action.clear) { S.serveTargetId = null; note = "（卸侍）"; }
        else if (action.target || action.id) { S.serveTargetId = action.target || action.id; note = "（服侍→" + S.serveTargetId + "）"; }
      } else if (t === "open_quest") {
        if (typeof applyCourtAiAction === "function") note = applyCourtAiAction(null, action) || "（開任務）";
      } else if (t === "alter_quest" || t === "quest_step" || t === "advance_main" || t === "main_hint" ||
                 t === "summon_here" || t === "move_npc" || t === "open_branch" || t === "side_hook" ||
                 t === "spawn_event" || t === "loc_mood" || t === "npc_speak" || t === "npc_quest") {
        if (typeof applyWorldAiAction === "function") note = applyWorldAiAction(action.npcId || null, action) || "";
        else if (typeof applyWorldMutation === "function") note = applyWorldMutation(null, { worldActions: [action] }) || "";
      } else if (t === "promote" || t === "rank_up" || t === "scorn" || t === "flattery_gift" ||
                 t === "imprison" || t === "punish" || t === "deny_quest" || t === "pending_deal" ||
                 t === "companion" || t === "give_gold" || t === "take_gold" || t === "demote_heat") {
        if (typeof applyCourtAiAction === "function") note = applyCourtAiAction(action.npcId || null, action) || "";
      } else if (t === "story" || t === "toast") {
        const tx = trunc(String(action.text || ""), 200);
        if (t === "toast") toast(tx, true);
        else S.pendingAiStory = tx;
        note = note || "";
      } else if (t === "set_name") {
        const nm = trunc(String(action.name || ""), 12);
        if (nm) { S.name = nm; note = "（改名・" + nm + "）"; }
      } else if (t === "set_gender") {
        const g = action.gender === "女" || action.gender === "female" ? "女" : "男";
        S.gender = g;
        note = "（性別→" + g + "）";
      } else if (t === "stat_boost") {
        const keys = ["force","agi","def","wit","luck","honor","charm","focus","medicine","perception"];
        keys.forEach(function(k){
          if (typeof action[k] === "number") S[k] = Math.min(40, Math.max(1, (S[k] || 5) + Math.max(-10, Math.min(10, action[k]))));
        });
        note = "（屬性微調）";
      } else {
        // fallback through existing mutators
        if (typeof applyCourtAiAction === "function") {
          const n1 = applyCourtAiAction(action.npcId || null, action);
          if (n1) note = n1;
        }
        if (!note && typeof applyWorldAiAction === "function") {
          note = applyWorldAiAction(action.npcId || null, action) || "";
        }
        if (!note) note = "（未識別・已忽略：" + t + "）";
      }
    } catch (err) {
      console.warn("applyCheatAction", t, err);
      note = "（設定失敗・" + t + "）";
    }
    return note;
  }

  function applyCheatPack(pack, rawCmd) {
    ensureCheatState();
    let notes = [];
    const list = [].concat(pack.cheatActions || [], pack.courtActions || [], pack.worldActions || []);
    list.slice(0, 12).forEach(function(a){
      const n = applyCheatAction(a);
      if (n) notes.push(n);
    });
    // shortcuts
    if (pack.setTrack) notes.push(applyCheatAction({ type: "set_track", track: pack.setTrack }));
    if (typeof pack.setGrade === "number") notes.push(applyCheatAction({ type: "set_grade", grade: pack.setGrade, asEunuch: true }));
    if (typeof pack.setPin === "number") notes.push(applyCheatAction({ type: "set_pin", pin: pack.setPin }));
    if (typeof pack.gold === "number") notes.push(applyCheatAction({ type: "gold", amount: pack.gold }));
    const joined = notes.filter(Boolean).join("");
    logCheat(rawCmd || "", joined || (pack.say || ""));
    try { if (typeof saveGameSilent === "function") saveGameSilent(); } catch (e) {}
    return { note: joined, say: trunc(String(pack.say || pack.result || "設定已生效。"), 280) };
  }

  /** Offline keyword → cheatActions for common commands. */
  function offlineCheatInterpret(text) {
    const t = String(text || "").trim();
    const acts = [];
    let say = "【設定】已解析指令。";

    // 大太監 / 領侍 / 正侍
    if (/大太監|領侍|正侍|宮殿監|升.*太監|太監.*升|封.*太監/.test(t)) {
      acts.push({ type: "set_track", track: "eunuch" });
      let g = 5;
      if (/侍監|八品/.test(t)) g = 2;
      else if (/執守|七品/.test(t)) g = 3;
      else if (/副侍|六品/.test(t)) g = 4;
      else if (/無品|小太監/.test(t)) g = 1;
      acts.push({ type: "set_grade", grade: g });
      acts.push({ type: "prestige", amount: 40 });
      if (/皇帝|景安/.test(t)) acts.push({ type: "emperor_favor", amount: 8 });
      acts.push({ type: "set_title", title: g >= 5 ? "大太監" : "太監" });
      say = "聖旨／內廷文書下達：你被擢升太監籍・高品。宮中耳目一新。";
    }
    if (/入.*太監|淨身入籍|太監籍/.test(t) && !acts.length) {
      acts.push({ type: "set_track", track: "eunuch" });
      acts.push({ type: "set_grade", grade: 1 });
      say = "你被記入太監籍。";
    }
    if (/文官|進士|入仕.*文|翰林|尚書|大學士/.test(t)) {
      acts.push({ type: "set_track", track: "civil" });
      let pin = 4;
      if (/一品|大學士|太傅/.test(t)) pin = 18;
      else if (/二品|尚書/.test(t)) pin = 16;
      else if (/三品/.test(t)) pin = 14;
      else if (/四品/.test(t)) pin = 12;
      else if (/五品/.test(t)) pin = 10;
      else if (/六品/.test(t)) pin = 8;
      else if (/七品/.test(t)) pin = 6;
      else if (/八品/.test(t)) pin = 4;
      else if (/九品|未入流|從九/.test(t)) pin = 2;
      acts.push({ type: "set_pin", pin: pin });
      acts.push({ type: "prestige", amount: 30 });
      say = "吏部掛號：文官籍已更。";
    }
    if (/武官|參將|總兵|提督|羽林|入仕.*武|將軍/.test(t) && !/文官/.test(t)) {
      acts.push({ type: "set_track", track: "military" });
      let pin = 4;
      if (/一品|提督/.test(t)) pin = 18;
      else if (/二品|總兵/.test(t)) pin = 16;
      else if (/三品/.test(t)) pin = 14;
      else if (/五品/.test(t)) pin = 10;
      acts.push({ type: "set_pin", pin: pin });
      say = "兵部掛號：武官籍已更。";
    }
    if (/宮女|女官|婉侍|淑儀/.test(t)) {
      acts.push({ type: "set_track", track: "maid" });
      let g = /淑儀/.test(t) ? 5 : (/婉侍/.test(t) ? 4 : (/女官/.test(t) ? 3 : 1));
      acts.push({ type: "set_grade", grade: g });
      say = "內廷點名：宮籍已更。";
    }
    if (/東廠|廠衛|番子|入廠/.test(t)) {
      let r = 1;
      if (/掌刑|同知|五/.test(t)) r = 5;
      else if (/千戶|四/.test(t)) r = 4;
      else if (/百戶|三/.test(t)) r = 3;
      else if (/小旗|二/.test(t)) r = 2;
      acts.push({ type: "dc_join", rank: r });
      acts.push({ type: "dc_rank", rank: r });
      say += " 東廠名冊有你。";
    }
    if (/銀兩|給錢|加錢|發財/.test(t)) {
      const m = t.match(/(\d+)\s*兩?/);
      acts.push({ type: "gold", amount: m ? Math.min(5000, Number(m[1])) : 200 });
    }
    if (/聲望/.test(t)) {
      const m = t.match(/聲望\s*[＋+加]?\s*(\d+)/);
      acts.push({ type: "renown", amount: m ? Number(m[1]) : 10 });
    }
    if (/威望|朝廷威望/.test(t)) {
      const m = t.match(/(?:威望|朝廷威望)\s*[＋+加]?\s*(\d+)/);
      acts.push({ type: "prestige", amount: m ? Number(m[1]) : 25 });
    }
    if (/帝心|皇帝.*好感|好感.*皇帝/.test(t)) {
      const m = t.match(/(\d+)/);
      acts.push({ type: "emperor_favor", amount: m ? Math.min(30, Number(m[1])) : 10 });
      say += " 景安帝對你另眼相看。";
    }
    if (/回血|療傷|回滿|滿血/.test(t)) acts.push({ type: "heal" });
    if (/錦袍/.test(t)) acts.push({ type: "add_item", item: "palace_jinpao", n: 1 });
    if (/如意/.test(t)) acts.push({ type: "add_item", item: "palace_ruyi", n: 1 });
    if (/宮緞|緞/.test(t)) acts.push({ type: "add_item", item: "palace_silk", n: 2 });
    if (/腰牌|通行證/.test(t)) acts.push({ type: "add_item", item: "yulin_pass", n: 1 });
    if (/解毒|金創|大還丹|療傷藥/.test(t)) acts.push({ type: "add_item", item: /大還/.test(t) ? "big_pill" : "pill", n: 3 });

    // favor named NPC by Chinese name match
    if (/好感/.test(t)) {
      const ids = Object.keys(NPCS || {});
      for (let i = 0; i < ids.length; i++) {
        const id = ids[i];
        const nm = NPCS[id] && NPCS[id].name;
        if (nm && t.indexOf(nm) >= 0) {
          const m = t.match(/[＋+\-]?\d+/);
          let d = 10;
          if (m) d = Number(m[0].replace("＋", "+")) || 10;
          if (/降|減|扣|厭惡/.test(t)) d = -Math.abs(d);
          else d = Math.abs(d);
          acts.push({ type: "favor", npcId: id, amount: Math.max(-20, Math.min(20, d)) });
          say += " " + nm + "對你態度有變。";
          break;
        }
      }
    }

    if (/開地圖|解鎖地圖|全圖/.test(t)) {
      (LOCATIONS || []).slice(0, 40).forEach(function(l){
        acts.push({ type: "unlock_map", loc: l.id });
      });
      say += " 地圖廣開。";
    }
    if (/主線.*推進|推進主線|主線\+1|advance.?main/i.test(t)) {
      acts.push({ type: "advance_main", step: 1 });
      say += " 主線微進。";
    }
    if (/改名/.test(t)) {
      const m = t.match(/改名[為为成]?\s*[「"']?([^「」"'\s]{1,8})/);
      if (m) acts.push({ type: "set_name", name: m[1] });
    }

    if (!acts.length) {
      say = "未能離線解析。可試：「皇帝升玩家為大太監」「給銀兩500」「帝心+10」「入東廠百戶」。有 DeepSeek Key 時會交 AI 解讀。";
      return { say: say, cheatActions: [], behavior: "ignore" };
    }
    return { say: say, cheatActions: acts, behavior: "help", memoryNote: "設定・離線" };
  }

  function cheatSystemPrompt() {
    return "你是武俠遊戲「江湖行」的【設定】作弊台解析器。玩家輸入自然指令，你必須輸出 JSON：" +
      "{\"say\":\"1-4句確認旁白（繁中）\",\"cheatActions\":[...]}。" +
      "cheatActions 白名單 type：" +
      "set_track{track:none|civil|military|eunuch|maid}, set_grade{grade:0-5}, set_pin{pin:0-18}," +
      "set_title{title}, palace_role{role}, dc_join{rank:1-5}, dc_rank{rank}," +
      "gold{amount|set}, renown{amount}, prestige{amount}, emperor_favor{amount}, heat{amount}, karma{amount}," +
      "favor{npcId,amount}, add_item{item,n}, set_flag{flag}, clear_flag{flag}, unlock_map{loc}," +
      "assign_hall{hall}, set_serve{target}, open_quest{questId}, alter_quest{questId,step,done}," +
      "advance_main{step?}, summon_here{npcId}, move_npc{npcId,to}, heal{}, set_name{name}, set_gender{gender}," +
      "stat_boost{force?,agi?,…}, promote{}, story{text}。" +
      "「大太監」→ set_track eunuch + set_grade 5；「皇帝升…」可加 emperor_favor。" +
      "禁真實清帝名（用景安帝）、禁金庸真名、禁血腥／色情描述。" +
      "單次 cheatActions ≤8。旗標／物品僅限遊戲已有 id。";
  }

  async function aiCheatInterpret(text) {
    if (!settings.deepseekKey) return offlineCheatInterpret(text);
    const user = JSON.stringify({
      command: text,
      player: S.name,
      gender: S.gender,
      courtTrack: S.courtTrack,
      courtGrade: S.courtGrade,
      courtPin: S.courtPin,
      rankLabel: typeof courtRankLabel === "function" ? courtRankLabel() : "",
      dcJoined: !!S.dcJoined,
      dcRank: S.dcRank || 0,
      gold: S.gold,
      loc: S.loc,
      day: S.day
    });
    const raw = await deepseekChat(cheatSystemPrompt(), user, 700);
    if (!raw) return offlineCheatInterpret(text);
    const parsed = typeof parseAiJson === "function" ? parseAiJson(raw) : null;
    if (parsed && (parsed.cheatActions || parsed.courtActions || parsed.worldActions || parsed.setTrack || parsed.setGrade != null)) {
      return parsed;
    }
    // merge offline if AI only said text
    const off = offlineCheatInterpret(text);
    if (off.cheatActions && off.cheatActions.length) {
      off.say = (parsed && parsed.say) ? trunc(String(parsed.say), 200) : off.say;
      return off;
    }
    return { say: trunc(String((parsed && parsed.say) || raw || "未能理解指令。"), 280), cheatActions: [] };
  }

  async function runCheatCommand(text) {
    const cmd = String(text || "").trim();
    if (!cmd) { toast("請輸入設定指令", true); return null; }
    toast("設定解析中…", true);
    let pack;
    try { pack = await aiCheatInterpret(cmd); }
    catch (e) { pack = offlineCheatInterpret(cmd); }
    const out = applyCheatPack(pack, cmd);
    toast("設定已生效", true);
    setTimeout(function(){
      try { if (typeof flushPendingAiUi === "function") flushPendingAiUi(); } catch (e1) {}
      try { render(); } catch (e2) {}
    }, 80);
    return out;
  }

  function openCheatConsole() {
    ensureCheatState();
    const recent = (S.cheatLog || []).slice(-5).reverse().map(function(x){
      return "<div class=\"small\">D" + x.day + "・" + escapeHtml(x.cmd) + " → " + escapeHtml(x.note || "") + "</div>";
    }).join("") || "<p class=\"small\">尚無紀錄</p>";
    const titles = (S.cheatTitles || []).length ? ("目前稱號：" + S.cheatTitles.join("、")) : "尚無自訂稱號";
    openModal(
      "<h3>設定・作弊台</h3>" +
      "<p class=\"small\">輸入自然指令，遊戲會<strong>真改存檔</strong>（仕途／品階／銀兩／好感／東廠等）。" +
      "有 DeepSeek Key 時由 AI 解讀；無 Key 用關鍵詞。禁血腥色情。</p>" +
      "<p class=\"small\">例：皇帝升玩家為大太監　／　給銀兩500　／　帝心+10　／　入東廠百戶　／　沈貴妃好感+15</p>" +
      "<p class=\"small\">" + escapeHtml(titles) + " · 已用设定 " + (S.cheatUsed || 0) + " 次</p>" +
      "<textarea class=\"input area\" id=\"cheat-input\" rows=\"3\" placeholder=\"輸入設定指令…\"></textarea>" +
      "<div class=\"btn-row\" style=\"margin-top:8px\">" +
      "<button class=\"btn primary\" id=\"cheat-run\">執行設定</button>" +
      "<button class=\"btn\" id=\"cheat-examples\">填入範例</button>" +
      "<button class=\"btn ghost\" onclick=\"closeModal()\">關閉</button></div>" +
      "<h3 style=\"margin-top:12px\">最近設定</h3>" + recent
    );
    const run = document.getElementById("cheat-run");
    const inp = document.getElementById("cheat-input");
    const ex = document.getElementById("cheat-examples");
    if (ex) ex.onclick = function(){ if (inp) inp.value = "皇帝升玩家為大太監"; };
    if (run) run.onclick = async function(){
      const v = (inp && inp.value || "").trim();
      if (!v) return toast("請輸入", true);
      run.disabled = true; run.textContent = "執行中…";
      const out = await runCheatCommand(v);
      closeModal();
      if (out) showStory("【設定】\n" + (out.say || "") + (out.note ? "\n" + out.note : ""));
    };
  }

  // ---- Event free-text (duty / AI scene) ----
  function eventFreePrompt(ctx) {
    return "你是「江湖行」事件裁判。場景事件中玩家自擬言行。繁體中文。禁血腥色情、禁金庸真名、禁真實清帝名（景安帝）。" +
      "輸出 JSON：{\"say\":\"2-6句結果旁白\",\"behavior\":\"ignore|help|quest_hint|gift|hostile|scorn|flattery\"," +
      "\"courtActions\":[...],\"worldActions\":[...],\"memoryNote\":\"一句\"}。" +
      "courtActions／worldActions 用既有白名單（favor_delta,prestige,karma,heat,gold,renown,open_quest,alter_quest," +
      "set_flag,side_hook,open_branch,spawn_event,add_item,promote…）。單次動作≤6。" +
      "上下文：" + trunc(JSON.stringify(ctx || {}), 500);
  }

  function offlineEventFree(mode, text, ctx) {
    const sayAct = mode === "action";
    let say = sayAct
      ? ("你當着眾人" + trunc(text, 40) + "。")
      : ("你說：「" + trunc(text, 40) + "」。");
    const actsC = [];
    const actsW = [];
    if (/恭|跪|請安|遵旨|奴才|叩/.test(text)) {
      actsC.push({ type: "prestige", amount: 3 });
      actsC.push({ type: "favor_delta", amount: 2, emperor: /皇|陛下|聖/.test(text) });
      say += "\n對方神色稍霽。";
    } else if (/頂嘴|頂撞|嗆|罵|不屑|滾/.test(text)) {
      actsC.push({ type: "scorn", favor: 3, heat: 2, denyQuest: true });
      actsC.push({ type: "prestige", amount: -2 });
      say += "\n當場氣氛一冷。";
    } else if (/幫忙|願意|接|允|好|是/.test(text)) {
      actsC.push({ type: "favor_delta", amount: 2 });
      actsC.push({ type: "prestige", amount: 2 });
      say += "\n差事有了着落。";
    } else if (/賄|銀|錢|打點/.test(text)) {
      const cost = Math.min(S.gold || 0, 15);
      if (cost > 0) { S.gold -= cost; actsC.push({ type: "favor_delta", amount: 3 }); say += "\n銀子換來片刻方便。"; }
      else say += "\n你囊中羞澀，對方只哂笑。";
    } else if (/查|問|打聽|線索/.test(text)) {
      actsW.push({ type: "side_hook", title: "事件餘波", hint: trunc(text, 30) });
      say += "\n你多問了一句，心裡記下了線索。";
    } else {
      actsC.push({ type: "prestige", amount: 1 });
      say += "\n事情過去了，留下淡淡影響。";
    }
    if (ctx && ctx.npcId && /好感|討好|稱讚/.test(text)) {
      actsC.push({ type: "favor_delta", npcId: ctx.npcId, amount: 2 });
    }
    return { say: say, behavior: "help", courtActions: actsC, worldActions: actsW, memoryNote: "事件自擬・離線" };
  }

  async function interpretEventFreeText(mode, text, ctx) {
    ctx = ctx || {};
    if (!settings.deepseekKey) return offlineEventFree(mode, text, ctx);
    const user = JSON.stringify({
      mode: mode,
      utterance: text,
      eventTitle: ctx.title || "",
      eventText: ctx.text || "",
      loc: S.loc,
      player: S.name,
      court: typeof courtIdentityBlob === "function" ? courtIdentityBlob() : { track: S.courtTrack, grade: S.courtGrade },
      present: ctx.npcId || null
    });
    const raw = await deepseekChat(eventFreePrompt(ctx), user, 650);
    if (!raw) return offlineEventFree(mode, text, ctx);
    const parsed = typeof parseAiJson === "function" ? parseAiJson(raw) : null;
    if (parsed) {
      const r = typeof sanitizeAiResult === "function" ? sanitizeAiResult(parsed, ctx.npcId || null) : parsed;
      if (parsed.courtActions) r.courtActions = parsed.courtActions;
      if (parsed.worldActions) r.worldActions = parsed.worldActions;
      if (!r.say) r.say = offlineEventFree(mode, text, ctx).say;
      return r;
    }
    return offlineEventFree(mode, text, ctx);
  }

  async function applyEventFreeResult(pack, ctx) {
    let note = "";
    if (typeof applyNpcMutation === "function") note += applyNpcMutation(ctx && ctx.npcId || null, pack) || "";
    if (typeof applyWorldMutation === "function") note += applyWorldMutation(ctx && ctx.npcId || null, pack) || "";
    // also push through applyAiResult path lightly for favor shortcuts
    if (typeof pack.favorDelta === "number" && typeof applyCourtAiAction === "function") {
      note += applyCourtAiAction(ctx && ctx.npcId || null, { type: "favor_delta", amount: pack.favorDelta });
    }
    try { if (typeof saveGameSilent === "function") saveGameSilent(); } catch (e) {}
    return note;
  }

  function mountEventFreeUi(parentHtmlExtras, ctx) {
    // returns HTML snippet + binder helper id prefix
    return {
      html: "<div class=\"panel\" style=\"margin-top:10px\">" +
        "<p class=\"small\">或不選上方按鈕，自擬你想說／想做的：</p>" +
        "<div class=\"btn-row\" id=\"ev-free-mode\" style=\"margin-bottom:4px\">" +
        "<button type=\"button\" class=\"btn primary\" data-emode=\"say\">說</button>" +
        "<button type=\"button\" class=\"btn\" data-emode=\"action\">做</button></div>" +
        "<textarea class=\"input area\" id=\"ev-free-input\" rows=\"2\" placeholder=\"輸入你想說的話或想做的行為…\"></textarea>" +
        "<div class=\"btn-row\" style=\"margin-top:6px\">" +
        "<button type=\"button\" class=\"btn primary\" id=\"ev-free-send\">自擬提交</button></div></div>",
      bind: function() {
        let emode = "say";
        const wrap = document.getElementById("ev-free-mode");
        if (wrap) wrap.querySelectorAll("[data-emode]").forEach(function(b){
          b.onclick = function(){
            emode = b.getAttribute("data-emode") || "say";
            wrap.querySelectorAll("[data-emode]").forEach(function(x){ x.classList.remove("primary"); });
            b.classList.add("primary");
          };
        });
        const btn = document.getElementById("ev-free-send");
        const inp = document.getElementById("ev-free-input");
        if (!btn || !inp) return;
        btn.onclick = async function(){
          const text = (inp.value || "").trim();
          if (!text) return toast("請輸入", true);
          btn.disabled = true; btn.textContent = "裁決中…";
          let pack;
          try { pack = await interpretEventFreeText(emode, text, ctx); }
          catch (e) { pack = offlineEventFree(emode, text, ctx); }
          const note = await applyEventFreeResult(pack, ctx);
          closeModal();
          showStory("【自擬言行】\n" + (pack.say || "") + (note ? "\n" + note : ""));
          setTimeout(function(){
            try { if (typeof flushPendingAiUi === "function") flushPendingAiUi(); } catch (e1) {}
            try { render(); } catch (e2) {}
          }, 100);
        };
      }
    };
  }

  // Wrap palace duty events
  const _runPalaceDutyEventOrig_v16 = typeof runPalaceDutyEvent === "function" ? runPalaceDutyEvent : null;
  if (_runPalaceDutyEventOrig_v16) {
    runPalaceDutyEvent = function(kindLabel) {
      const locId = S.loc;
      const loc = LOCATIONS.find(function(l){ return l.id === locId; });
      const locName = (loc && loc.name) || (typeof eunuchHallName === "function" ? eunuchHallName() : locId);
      const ev = typeof pickDutyEvent === "function" ? pickDutyEvent(locId) : { title: "當差", text: "雜役。", choices: [{ label: "做完", effects: { prestige: 2 }, result: "完事。" }] };
      if (typeof bumpCourtPrestige === "function") bumpCourtPrestige(2, kindLabel || "當差");
      S.exp = (S.exp || 0) + 2;
      S.gold = (S.gold || 0) + 1;
      let html = "<h3>" + escapeHtml(kindLabel || "本殿當差") + "・" + escapeHtml(locName) + "</h3>";
      html += "<div class=\"story-box\"><strong>" + escapeHtml(ev.title) + "</strong><br/>" + escapeHtml(ev.text) + "</div>";
      html += "<p class=\"small\">選擇會影響威望、好感、善惡與宮熱；亦可下方自擬言行。</p>";
      html += "<div class=\"btn-row\" style=\"flex-direction:column;gap:8px\">";
      (ev.choices || []).forEach(function(c, idx){
        html += "<button type=\"button\" class=\"btn" + (idx === 0 ? " primary" : "") + "\" data-duty-c=\"" + idx + "\">" + escapeHtml(c.label) + "</button>";
      });
      html += "</div>";
      const free = mountEventFreeUi("", { title: ev.title, text: ev.text, kind: "duty" });
      html += free.html;
      openModal(html);
      document.querySelectorAll("[data-duty-c]").forEach(function(btn){
        btn.onclick = function(){
          const i = parseInt(btn.getAttribute("data-duty-c"), 10);
          const ch = ev.choices[i];
          closeModal();
          if (typeof applyDutyEffects === "function") applyDutyEffects(ch.effects || {});
          showStory("【" + ev.title + "】\n" + (ch.result || "") + "\n\n當差結算・" + (typeof courtRankLabel === "function" ? courtRankLabel() : ""));
          try { if (typeof maybeOfferCourtDeal === "function") maybeOfferCourtDeal(); } catch (e) {}
          try { saveGameSilent(); } catch (e2) {}
        };
      });
      free.bind();
    };
  }

  // Wrap AI pending event UI to add free-text
  const _flushPendingAiUiOrig_v16 = typeof flushPendingAiUi === "function" ? flushPendingAiUi : null;
  if (_flushPendingAiUiOrig_v16) {
    flushPendingAiUi = function() {
      if (S.pendingAiEvent) {
        const ev = S.pendingAiEvent;
        S.pendingAiEvent = null;
        let html = "<h3>場景生變</h3><div class=\"story-box\">" + escapeHtml(ev.text) + "</div>";
        if (ev.choices && ev.choices.length) {
          html += "<div class=\"btn-row\" style=\"margin-top:8px\">";
          ev.choices.forEach(function(c, i){
            const label = trunc(String(c.label || c.text || ("選項" + (i + 1))), 18);
            html += "<button class=\"btn\" data-ai-ch=\"" + i + "\">" + escapeHtml(label) + "</button>";
          });
          html += "<button class=\"btn ghost\" onclick=\"closeModal()\">離開</button></div>";
        } else {
          html += "<div class=\"btn-row\"><button class=\"btn ghost\" onclick=\"closeModal()\">知道了</button></div>";
        }
        const free = mountEventFreeUi("", { title: "場景生變", text: ev.text, npcId: ev.from, kind: "ai_event" });
        html += free.html;
        openModal(html);
        document.querySelectorAll("[data-ai-ch]").forEach(function(btn){
          btn.onclick = function() {
            const i = Number(btn.getAttribute("data-ai-ch"));
            const c = (ev.choices && ev.choices[i]) || {};
            closeModal();
            let note = "";
            if (c.worldActions && typeof applyWorldMutation === "function") note += applyWorldMutation(ev.from, { worldActions: c.worldActions });
            if (c.courtActions && typeof applyNpcMutation === "function") note += applyNpcMutation(ev.from, { courtActions: c.courtActions });
            if (c.favor && ev.from && typeof applyWorldAiAction === "function") note += applyWorldAiAction(ev.from, { type: "favor_delta", amount: Number(c.favor) || 1 });
            if (c.gold && typeof applyWorldAiAction === "function") note += applyWorldAiAction(ev.from, { type: "gold", amount: Number(c.gold) || 0 });
            showStory((c.result || c.text || "你做出了選擇。") + (note ? "\n" + note : ""));
            try { saveGameSilent(); } catch (e) {}
            try { render(); } catch (e2) {}
          };
        });
        free.bind();
        return true;
      }
      return _flushPendingAiUiOrig_v16();
    };
  }

  // Court quest deliver: add free-text option before auto-complete via location action wrap
  // Patch completeCourtQuestAt to allow optional free roleplay first — add hub button instead
  const _openCourtQuestHubOrig_v16 = typeof openCourtQuestHub === "function" ? openCourtQuestHub : null;
  if (_openCourtQuestHubOrig_v16) {
    openCourtQuestHub = function() {
      _openCourtQuestHubOrig_v16();
      // append free-text for active quest if modal open
      setTimeout(function(){
        const body = document.getElementById("modal-body");
        if (!body) return;
        if (body.querySelector("#cq-free-input")) return;
        const q = typeof activeCourtQuest === "function" ? activeCourtQuest() : null;
        if (!q) return;
        const free = mountEventFreeUi("", { title: q.title, text: q.text || q.title, kind: "court_quest", questId: q.id });
        const wrap = document.createElement("div");
        wrap.innerHTML = free.html.replace("ev-free-input", "cq-free-input").replace("ev-free-send", "cq-free-send").replace("ev-free-mode", "cq-free-mode").replace(/data-emode/g, "data-cqmode").replace(/id=\"ev-free/g, "id=\"cq-free");
        // simpler: inject raw
        const div = document.createElement("div");
        div.innerHTML = "<div class=\"panel\" style=\"margin-top:10px\">" +
          "<p class=\"small\">對進行中差遣自擬言行（AI／離線裁決，可真改好感／進度）：</p>" +
          "<textarea class=\"input area\" id=\"cq-free-input\" rows=\"2\" placeholder=\"例如：我願連夜送這份摺子…\"></textarea>" +
          "<div class=\"btn-row\" style=\"margin-top:6px\"><button type=\"button\" class=\"btn primary\" id=\"cq-free-send\">自擬提交</button></div></div>";
        body.appendChild(div);
        const btn = document.getElementById("cq-free-send");
        const inp = document.getElementById("cq-free-input");
        if (btn && inp) btn.onclick = async function(){
          const text = (inp.value || "").trim();
          if (!text) return toast("請輸入", true);
          btn.disabled = true;
          const ctx = { title: q.title, text: q.text || "", kind: "court_quest", questId: q.id };
          let pack;
          try { pack = await interpretEventFreeText("say", text, ctx); }
          catch (e) { pack = offlineEventFree("say", text, ctx); }
          // slight quest progress hook
          if (!pack.worldActions) pack.worldActions = [];
          if (/完成|交差|交付|辦妥/.test(text)) {
            pack.worldActions.push({ type: "alter_quest", questId: q.id, done: false });
            pack.courtActions = (pack.courtActions || []).concat([{ type: "prestige", amount: 4 }]);
          }
          const note = await applyEventFreeResult(pack, ctx);
          closeModal();
          showStory("【差遣自擬】" + q.title + "\n" + (pack.say || "") + (note ? "\n" + note : "") +
            "\n（若要正式交差，請仍前往目標場景點交付。）");
          try { render(); } catch (e2) {}
        };
      }, 30);
    };
  }

  // UI: 更多 + 角色頁入口
  const _renderMoreOrig_v16 = typeof renderMore === "function" ? renderMore : null;
  if (_renderMoreOrig_v16) {
    renderMore = function() {
      let html = _renderMoreOrig_v16();
      html = html.replace(
        "<button class=\"btn\" id=\"btn-settings\">DeepSeek 設定</button>",
        "<button class=\"btn\" id=\"btn-settings\">DeepSeek 設定</button>" +
        "<button class=\"btn primary\" id=\"btn-cheat-console\">設定・作弊台</button>"
      );
      return html;
    };
  }
  const _bindHubOrig_v16 = typeof bindHub === "function" ? bindHub : null;
  if (_bindHubOrig_v16) {
    bindHub = function() {
      _bindHubOrig_v16();
      const b = document.getElementById("btn-cheat-console");
      if (b) b.onclick = function(){ openCheatConsole(); };
    };
  }

  // Character / title screen quick entry if renderChar or similar exists
  const _renderCharOrig_v16 = typeof renderChar === "function" ? renderChar : (typeof renderHero === "function" ? renderHero : null);
  // try patch renderRole / renderSheet — search common name
  if (typeof renderRole === "function") {
    const _rr = renderRole;
    renderRole = function() {
      let html = _rr.apply(this, arguments);
      if (html && html.indexOf("btn-cheat-console") < 0) {
        html += "<div class=\"btn-row\" style=\"margin-top:8px\"><button class=\"btn\" id=\"btn-cheat-console-char\">設定・作弊台</button></div>";
      }
      return html;
    };
  }

  // Also expose on map「更多」already; add to locationActions a soft entry? skip — more tab enough.
  // Patch bind for char button after render
  const _renderOrig_v16 = typeof render === "function" ? render : null;
  if (_renderOrig_v16) {
    render = function() {
      const r = _renderOrig_v16.apply(this, arguments);
      setTimeout(function(){
        const b1 = document.getElementById("btn-cheat-console");
        if (b1) b1.onclick = function(){ openCheatConsole(); };
        const b2 = document.getElementById("btn-cheat-console-char");
        if (b2) b2.onclick = function(){ openCheatConsole(); };
      }, 0);
      return r;
    };
  }

  // Show cheat titles on hub chip if any
  const _palaceRoleLabelOrig_v16 = typeof palaceRoleLabel === "function" ? palaceRoleLabel : null;
  if (_palaceRoleLabelOrig_v16) {
    palaceRoleLabel = function() {
      let b = _palaceRoleLabelOrig_v16();
      if (S.cheatTitles && S.cheatTitles.length) b += "・" + S.cheatTitles[S.cheatTitles.length - 1];
      return b;
    };
  }

  // Headless self-test
  window.__JH_V16_SELFTEST = function() {
    const snap = {
      track: S.courtTrack, grade: S.courtGrade, pin: S.courtPin, gold: S.gold,
      emp: S.emperorFavor, name: S.name
    };
    // force male for eunuch path
    S.gender = "男";
    const pack = offlineCheatInterpret("皇帝升玩家為大太監");
    const out = applyCheatPack(pack, "皇帝升玩家為大太監");
    const okEunuch = S.courtTrack === "eunuch" && (S.courtGrade || 0) >= 5;
    const g0 = S.gold;
    applyCheatPack(offlineCheatInterpret("給銀兩300"), "給銀兩300");
    const okGold = (S.gold || 0) >= g0 + 200;
    // duty free offline
    const evp = offlineEventFree("say", "奴才遵旨，馬上辦妥。", { title: "試", text: "差" });
    const hasActs = (evp.courtActions && evp.courtActions.length) > 0;
    // UI hooks present
    const hasCheatFn = typeof openCheatConsole === "function";
    const hasDutyWrap = runPalaceDutyEvent !== _runPalaceDutyEventOrig_v16;
    // restore soft
    S.courtTrack = snap.track; S.courtGrade = snap.grade; S.courtPin = snap.pin;
    S.gold = snap.gold; S.emperorFavor = snap.emp;
    return {
      ok: okEunuch && okGold && hasActs && hasCheatFn && hasDutyWrap,
      okEunuch: okEunuch, okGold: okGold, hasActs: hasActs,
      hasCheatFn: hasCheatFn, hasDutyWrap: hasDutyWrap,
      note: out.note, say: out.say, grade: S.courtGrade, track: S.courtTrack
    };
  };

  if (window.__JH_DEBUG) {
    Object.assign(window.__JH_DEBUG, {
      openCheatConsole: openCheatConsole,
      runCheatCommand: runCheatCommand,
      applyCheatAction: applyCheatAction,
      offlineCheatInterpret: offlineCheatInterpret,
      interpretEventFreeText: interpretEventFreeText,
      v16self: window.__JH_V16_SELFTEST
    });
  }

  try { ensureCheatState(); } catch (e) {}

  // ========== END V16 ==========
