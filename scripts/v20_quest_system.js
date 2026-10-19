// ========== V20: 任務系統大幅優化（追蹤／交付／獎勵／主支線／朝廷／民間／AI） ==========
  // Homage: 群俠傳式任務簿；原創青梧世界。修卡任務、過期、清晰 UI。

  const QUEST_STEP_HINTS = {
    main: {
      0: { tip: "去青城鎮或京畿客棧打聽黑衣人消息。", locs: ["qingcheng", "jingji"], reward: "經驗／聲望／主線推進" },
      1: { tip: "取得劍冢殘圖，調查劍冢。", locs: ["jianzhong"], reward: "殘圖線索" },
      2: { tip: "分支：助蒼雲寺或助黑水寨。", locs: ["cangyun", "heishui"], reward: "門派人情／古鑰" },
      3: { tip: "持青銅古鑰進入密室遺跡。", locs: ["mishi"], reward: "第一章完結獎勵" }
    },
    main2: {
      0: { tip: "四處收集盟約殘印下落（紅蓮／天台／夜王墓）；或先到京畿觸發。", locs: ["jingji", "honglian", "tiantai", "yewang"], reward: "第二章開啟" },
      1: { tip: "已接觸殘印線索，往赤霞崖或雪原關核實。", locs: ["chixia", "xueyuan"], reward: "殘印線索" },
      2: { tip: "分支：聯紅蓮 或 聯天台觀。", locs: ["honglian", "tiantai"], reward: "盟約殘印" },
      3: { tip: "持殘印前往無音谷了結第二章。", locs: ["wuyin"], reward: "第二章完結" }
    },
    main3: {
      0: { tip: "京畿／青城聽「夜王殘印未盡」傳聞。", locs: ["jingji", "qingcheng"], reward: "第三章開啟" },
      1: { tip: "收集三證據（可並行）：邊關毒線、紅蓮內訌、古墓禁制。", locs: ["bianguan", "honglian", "yewang"], reward: "三證據" },
      2: { tip: "大分支三選一：俠義道／霸途／隱逸。", locs: ["cangyun", "tiantai", "heishui", "honglian", "shuiyun", "meihua", "jingji"], reward: "天命分途" },
      3: { tip: "前往最終地點決戰／儀式（夜王餘使）。", locs: ["wuyin", "yewang"], reward: "第三章完結／結局解鎖" }
    },
    side_herb: { 1: { tip: "往藥谷取藥／交託蒼雲或黑水。", locs: ["yaogu", "cangyun", "heishui"] } },
    side_child: {
      1: { tip: "青城找童小六，買糖交付聽童謠。", locs: ["qingcheng"], reward: "永久廉價情報" },
      2: { tip: "已完成童謠支線。", locs: ["qingcheng"] }
    },
    side_cook: {
      1: { tip: "去藥谷取安神草，回京畿交孤燈婆婆。", locs: ["yaogu", "jingji"], reward: "夜宵升級／金" }
    },
    side_lei: {
      1: { tip: "在雷峰哨所查明書吏吞餉案。", locs: ["leifeng"], reward: "哨所人情" }
    },
    side_chixia: {
      1: { tip: "再上赤霞崖一晤，試劍求真傳。", locs: ["chixia"], reward: "劍意解鎖" }
    },
    side_snow: {
      0: { tip: "雪原遇狼嚎／獵事。", locs: ["xueyuan"] },
      1: { tip: "雪原狼事已了結。", locs: ["xueyuan"] }
    },
    side_palace_revenge: {
      1: { tip: "宮牆血債：先探皇宮／牙巷線索。", locs: ["huanggong", "renyazi_alley"] },
      2: { tip: "往人牙子巷了結血債。", locs: ["renyazi_alley"], reward: "復仇了結" }
    },
    side_eunuch_revenge: {
      1: { tip: "淨身血債：皇宮／東廠追查。", locs: ["huanggong", "dongchang"] }
    },
    side_donggong_shadow: {
      1: { tip: "東廠夜晤／試探真名／搜密檔。", locs: ["dongchang", "huanggong"] },
      2: { tip: "可表白求為知音（或太監／廠衛暗線）。", locs: ["dongchang"] },
      3: { tip: "可立廠奴墨契；高信任夜晤。", locs: ["dongchang"] },
      4: { tip: "真相已現——回東廠面對督公真相。", locs: ["dongchang"] },
      5: { tip: "弒君／認兄／出賣／奴契棄仇——抉擇已寫入命運。", locs: ["dongchang", "huanggong"] },
      6: { tip: "影事落幕，可於結局檢視。", locs: ["dongchang"] }
    },
    side_karma_good: {
      1: { tip: "往藥谷或蒼雲寺贖罪／積善。", locs: ["yaogu", "cangyun"] }
    },
    side_karma_evil: {
      1: { tip: "京畿黑市／黑道密約（需黑名單旗）。", locs: ["jingji"] }
    },
    side_hanxue: {
      1: { tip: "太僕／沙漠／邊關尋汗血蹤跡。", locs: ["taipusi", "shamo", "bianguan"], reward: "汗血寶馬機緣" }
    }
  };

  const QUEST_CAT_LABEL = {
    main: "主線",
    side: "支線",
    court: "朝廷",
    folk: "民間",
    ai: "AI",
    dating: "情緣",
    other: "其他"
  };

  function ensureQuestSystemV20() {
    ensureQuests();
    if (!S.questLog || typeof S.questLog !== "object") S.questLog = { filter: "active", lastFixDay: 0 };
    if (!Array.isArray(S.questFailLog)) S.questFailLog = [];
    if (!Array.isArray(S.questRewardLog)) S.questRewardLog = [];
    if (typeof S.courtQuestExpireDays !== "number") S.courtQuestExpireDays = 7;
    // Normalize AI / custom quests
    Object.keys(S.quests || {}).forEach(function(k) {
      const q = S.quests[k];
      if (!q || typeof q !== "object") return;
      if (!q.id) q.id = k;
      if (!q.cat) {
        if (k === "main" || k === "main2" || k === "main3") q.cat = "main";
        else if (k.indexOf("side_") === 0) q.cat = "side";
        else if (k.indexOf("ai_") === 0 || k.indexOf("ai_nq_") === 0) q.cat = "ai";
        else q.cat = "other";
      }
      if (q.hint == null && q.title) {
        const h = detailedQuestHint(q);
        if (h && h.tip) q.hint = h.tip;
      }
    });
    // Sync AI branches into quests list for journal
    if (S.aiBranches && typeof S.aiBranches === "object") {
      Object.keys(S.aiBranches).forEach(function(bid) {
        const b = S.aiBranches[bid];
        if (!b) return;
        const qid = "ai_br_" + bid;
        if (!S.quests[qid]) {
          S.quests[qid] = {
            id: qid, title: "AI・" + (b.title || bid), hint: b.hint || "", step: b.done ? 2 : 1,
            done: !!b.done, cat: "ai", loc: b.loc || null, fromNpc: b.npcId || null, aiBranchId: bid
          };
        } else {
          S.quests[qid].done = !!b.done;
          S.quests[qid].hint = b.hint || S.quests[qid].hint;
          S.quests[qid].cat = "ai";
        }
      });
    }
  }

  function locNameOf(id) {
    if (!id) return "？";
    try {
      const L = (typeof LOCATIONS !== "undefined" && LOCATIONS.find(function(l){ return l.id === id; }));
      return (L && L.name) || id;
    } catch (e) { return id; }
  }

  function detailedQuestHint(q) {
    if (!q) return { tip: "", locs: [], reward: "" };
    if (q.done) return { tip: "已完成", locs: [], reward: "" };
    const id = q.id || "";
    const step = Math.max(0, q.step || 0);
    const pack = QUEST_STEP_HINTS[id];
    if (pack) {
      const row = pack[step] || pack[String(step)];
      if (row) return { tip: row.tip, locs: row.locs || [], reward: row.reward || "" };
      // fallback nearest
      const keys = Object.keys(pack).map(Number).filter(function(n){ return !isNaN(n); }).sort(function(a,b){ return a-b; });
      for (let i = keys.length - 1; i >= 0; i--) {
        if (keys[i] <= step && pack[keys[i]]) return { tip: pack[keys[i]].tip, locs: pack[keys[i]].locs || [], reward: pack[keys[i]].reward || "" };
      }
    }
    if (q.hint) return { tip: q.hint, locs: q.loc ? [q.loc] : [], reward: q.rewardText || "" };
    if (step <= 0) return { tip: "未接／待觸發", locs: [], reward: "" };
    return { tip: "進行中・步驟 " + step + "（可開任務簿查看詳情）", locs: q.loc ? [q.loc] : [], reward: "" };
  }

  function questProgressPct(q) {
    if (!q) return 0;
    if (q.done) return 100;
    const id = q.id || "";
    const maxSteps = ({ main: 3, main2: 3, main3: 3, side_donggong_shadow: 6 })[id] || 3;
    const step = Math.max(0, q.step || 0);
    if (step <= 0) return 0;
    return Math.min(95, Math.round((step / Math.max(1, maxSteps)) * 100));
  }

  function classifyQuestEntry(q, key) {
    const k = key || (q && q.id) || "";
    if (q && q.cat) return q.cat;
    if (k === "main" || k === "main2" || k === "main3") return "main";
    if (k.indexOf("side_") === 0) return "side";
    if (k.indexOf("ai_") === 0) return "ai";
    return "other";
  }

  function listActiveCourtQuestEntries() {
    const out = [];
    try {
      ensureCourtCareer();
      Object.keys(S.courtQuests || {}).forEach(function(qid) {
        const st = S.courtQuests[qid];
        if (!st || !st.active || st.done) return;
        const def = (typeof COURT_QUESTS !== "undefined" && COURT_QUESTS.find(function(q){ return q.id === qid; })) || null;
        const claimed = st.claimedDay || S.day;
        const expireDay = claimed + (S.courtQuestExpireDays || 7);
        const daysLeft = expireDay - (S.day || 0);
        out.push({
          id: qid,
          title: (def && def.title) || qid,
          cat: "court",
          loc: def && def.loc,
          tip: def ? ("前往【" + locNameOf(def.loc) + "】交付差遣") : "定義缺失（可修復）",
          reward: def ? ("威望＋" + (def.prestige || 0) + (def.gold ? " · 金＋" + def.gold : "") + (def.exp ? " · 經驗＋" + def.exp : "") + (def.dirty ? " · 污差" : "")) : "",
          daysLeft: daysLeft,
          expired: daysLeft < 0,
          claimedDay: claimed,
          defMissing: !def,
          dirty: !!(def && def.dirty)
        });
      });
    } catch (e) {}
    return out;
  }

  function listFolkQuestHints() {
    const out = [];
    try {
      if (typeof CIV_QUESTS === "undefined" || !Array.isArray(CIV_QUESTS)) return out;
      const here = S.loc;
      CIV_QUESTS.forEach(function(q) {
        if (!q) return;
        const doneKey = q.id;
        if (S.civQuestDone && S.civQuestDone[doneKey]) return;
        const npcHere = q.npc && (typeof npcAtLocation === "function" ? npcAtLocation(here).indexOf(q.npc) >= 0 : false);
        const locMatch = q.loc === here;
        if (npcHere || locMatch) {
          out.push({
            id: q.id,
            title: q.title,
            cat: "folk",
            tip: (q.text || "").slice(0, 60),
            loc: q.loc,
            npc: q.npc,
            availableHere: true
          });
        }
      });
    } catch (e) {}
    return out;
  }

  function listJournalQuests(filter) {
    ensureQuestSystemV20();
    filter = filter || (S.questLog && S.questLog.filter) || "active";
    const rows = [];
    // Main + side + ai from S.quests
    Object.keys(S.quests || {}).forEach(function(k) {
      const q = S.quests[k];
      if (!q) return;
      const cat = classifyQuestEntry(q, k);
      const active = !q.done && (q.step > 0 || cat === "main");
      const dormant = !q.done && q.step <= 0 && cat !== "main";
      if (filter === "court" || filter === "folk") return; // handled below
      if (filter === "active" && !active) return;
      if (filter === "done" && !q.done) return;
      if (filter === "main" && cat !== "main") return;
      if (filter === "side" && cat !== "side") return;
      if (filter === "ai" && cat !== "ai") return;
      if (filter === "dormant" && !dormant) return;
      // filter === "all" falls through
      const dh = detailedQuestHint(q);
      rows.push({
        id: k,
        title: q.title || k,
        cat: cat,
        done: !!q.done,
        step: q.step || 0,
        tip: dh.tip,
        locs: dh.locs,
        reward: dh.reward || q.rewardText || "",
        pct: questProgressPct(q),
        fromNpc: q.fromNpc || null,
        stuck: detectStuckQuest(q, k)
      });
    });
    if (filter === "active" || filter === "court" || filter === "all") {
      listActiveCourtQuestEntries().forEach(function(c) {
        if (true) {
          rows.push({
            id: c.id,
            title: "朝廷・" + c.title,
            cat: "court",
            done: false,
            step: 1,
            tip: c.tip + (c.expired ? "（已過期）" : (c.daysLeft <= 2 ? "（餘" + c.daysLeft + "日）" : "（餘" + c.daysLeft + "日）")),
            locs: c.loc ? [c.loc] : [],
            reward: c.reward,
            pct: c.expired ? 0 : 40,
            stuck: c.defMissing || c.expired,
            daysLeft: c.daysLeft,
            expired: c.expired
          });
        }
      });
    }
    if (filter === "active" || filter === "folk" || filter === "all") {
      listFolkQuestHints().forEach(function(f) {
        rows.push({
          id: f.id,
          title: "民間・" + f.title,
          cat: "folk",
          done: false,
          step: 0,
          tip: f.tip,
          locs: f.loc ? [f.loc] : [],
          reward: "好感／見機",
          pct: 10,
          stuck: false,
          availableHere: true
        });
      });
    }
    // Lover date
    if (S.loverDateQuest && (filter === "active" || filter === "all")) {
      const ld = S.loverDateQuest;
      rows.push({
        id: "lover_date",
        title: "情緣・赴約",
        cat: "dating",
        done: false,
        step: 1,
        tip: "前往【" + locNameOf(ld.loc) + "】赴約",
        locs: ld.loc ? [ld.loc] : [],
        reward: "親密度",
        pct: 50,
        stuck: false
      });
    }
    // sort: stuck first, then main, court, side, ai, folk
    const order = { main: 0, court: 1, side: 2, dating: 3, ai: 4, folk: 5, other: 6 };
    rows.sort(function(a, b) {
      if (!!a.stuck !== !!b.stuck) return a.stuck ? -1 : 1;
      if (!!a.done !== !!b.done) return a.done ? 1 : -1;
      return (order[a.cat] || 9) - (order[b.cat] || 9);
    });
    return rows;
  }

  function detectStuckQuest(q, key) {
    if (!q || q.done) return false;
    const k = key || q.id;
    // Main chapter locked behind previous
    if (k === "main2" && S.quests.main && !S.quests.main.done && q.step > 0) return true;
    if (k === "main3" && S.quests.main2 && !S.quests.main2.done && q.step > 0) return true;
    // Step high but no hint path and no loc
    if (q.step >= 1 && !q.hint && !QUEST_STEP_HINTS[k] && !q.loc) return true;
    // AI quest older than 20 days untouched
    if ((q.cat === "ai" || (k && k.indexOf("ai_") === 0)) && q.startedDay && (S.day - q.startedDay) > 20 && q.step === 1) return true;
    return false;
  }

  function fixStuckQuests(opts) {
    opts = opts || {};
    ensureQuestSystemV20();
    const notes = [];
    // 1) Orphan court quests (def missing)
    Object.keys(S.courtQuests || {}).forEach(function(qid) {
      const st = S.courtQuests[qid];
      if (!st || !st.active || st.done) return;
      const def = (typeof COURT_QUESTS !== "undefined" && COURT_QUESTS.find(function(q){ return q.id === qid; }));
      if (!def) {
        delete S.courtQuests[qid];
        notes.push("清除無定義朝廷差・" + qid);
      }
    });
    // 2) Multiple active court → keep newest claimedDay
    const actives = Object.keys(S.courtQuests || {}).filter(function(qid) {
      const st = S.courtQuests[qid];
      return st && st.active && !st.done;
    });
    if (actives.length > 1) {
      actives.sort(function(a, b) {
        return (S.courtQuests[b].claimedDay || 0) - (S.courtQuests[a].claimedDay || 0);
      });
      for (let i = 1; i < actives.length; i++) {
        delete S.courtQuests[actives[i]];
        notes.push("合併多餘朝廷差・保留最新，棄 " + actives[i]);
      }
    }
    // 3) Expire overdue court quests
    listActiveCourtQuestEntries().forEach(function(c) {
      if (c.expired && S.courtQuests[c.id]) {
        S.courtQuests[c.id].active = false;
        S.courtQuests[c.id].done = false;
        S.courtQuests[c.id].failed = true;
        S.questFailLog.push({ id: c.id, day: S.day, reason: "過期未交付" });
        if (S.questFailLog.length > 40) S.questFailLog = S.questFailLog.slice(-30);
        if (typeof bumpCourtPrestige === "function") bumpCourtPrestige(-3, "差遣過期");
        notes.push("朝廷差過期・" + c.title + "（威望－3）");
        delete S.courtQuests[c.id];
      }
    });
    // 4) Main chain consistency
    if (S.quests.main && S.quests.main.done && S.quests.main2 && S.quests.main2.step === 0 && !S.quests.main2.done) {
      // leave step 0 but mark unlockable — soft fix: if player already at jingji, bump
      if (S.loc === "jingji" || flag("ch2_started")) {
        S.quests.main2.step = Math.max(1, S.quests.main2.step);
        setFlag("ch2_started");
        notes.push("修復第二章卡在步驟0");
      }
    }
    if (S.quests.main2 && S.quests.main2.done && S.quests.main3 && S.quests.main3.step === 0 && !S.quests.main3.done) {
      if (S.loc === "jingji" || S.loc === "qingcheng" || flag("ch3_started")) {
        S.quests.main3.step = Math.max(1, S.quests.main3.step);
        setFlag("ch3_started");
        notes.push("修復第三章卡在步驟0");
      }
    }
    // 5) main3 evidence stuck at step1 with 3 evidence
    try {
      if (S.quests.main3 && !S.quests.main3.done && S.quests.main3.step === 1 && typeof ch3EvidenceCount === "function" && ch3EvidenceCount() >= 3) {
        S.quests.main3.step = 2;
        notes.push("修復第三章三證據已齊仍卡步驟1");
      }
    } catch (e0) {}
    // 6) Side done flag inconsistency
    Object.keys(S.quests).forEach(function(k) {
      const q = S.quests[k];
      if (!q) return;
      if (q.done && (q.step || 0) <= 0) { q.step = 1; notes.push("修復 " + (q.title || k) + " 完成態步驟"); }
      if (q.cat === "ai" && !q.startedDay && q.step > 0) q.startedDay = S.day;
    });
    // 7) Lover date quest invalid loc
    if (S.loverDateQuest && S.loverDateQuest.loc) {
      const ok = (typeof LOCATIONS !== "undefined" && LOCATIONS.some(function(l){ return l.id === S.loverDateQuest.loc; }));
      if (!ok) {
        S.loverDateQuest = null;
        notes.push("清除無效赴約");
      }
    }
    // 8) AI branches done sync
    Object.keys(S.quests).forEach(function(k) {
      const q = S.quests[k];
      if (q && q.aiBranchId && S.aiBranches && S.aiBranches[q.aiBranchId]) {
        q.done = !!S.aiBranches[q.aiBranchId].done;
      }
    });
    S.questLog.lastFixDay = S.day;
    if (notes.length) {
      try { if (typeof saveGameSilent === "function") saveGameSilent(); } catch (e1) {}
    }
    if (opts.silent) return notes;
    if (notes.length) {
      showStory("【任務修復】" + String.fromCharCode(10) + "・" + notes.join(String.fromCharCode(10) + "・"));
    } else {
      toast("任務狀態正常，無需修復", true);
    }
    return notes;
  }

  function tickQuestExpiryOnNewDay() {
    try {
      const notes = fixStuckQuests({ silent: true });
      const expired = notes.filter(function(n){ return /過期/.test(n); });
      if (expired.length) toast("有朝廷差遣過期", true);
    } catch (e) {}
  }

  function questTrackerLine() {
    ensureQuestSystemV20();
    // Prefer main in progress
    try {
      if (S.quests.main && !S.quests.main.done) return "主線・" + (detailedQuestHint(S.quests.main).tip || storyText());
      if (S.quests.main2 && !S.quests.main2.done && S.quests.main && S.quests.main.done) return "主線・" + (detailedQuestHint(S.quests.main2).tip || storyText());
      if (S.quests.main3 && !S.quests.main3.done && S.quests.main2 && S.quests.main2.done) return "主線・" + (detailedQuestHint(S.quests.main3).tip || storyText());
    } catch (e) {}
    const court = listActiveCourtQuestEntries()[0];
    if (court) return "朝廷・" + court.title + " → " + locNameOf(court.loc);
    const act = listJournalQuests("active").filter(function(r){ return r.cat === "side" || r.cat === "ai"; })[0];
    if (act) return (QUEST_CAT_LABEL[act.cat] || "") + "・" + act.title + "：" + (act.tip || "").slice(0, 28);
    try { return storyText(); } catch (e2) { return "江湖任你行。"; }
  }

  function renderQuestCardHtml(row) {
    const cat = QUEST_CAT_LABEL[row.cat] || row.cat;
    const locs = (row.locs || []).map(locNameOf).join("／") || "—";
    const bar = "<div class=\"q-bar\"><i style=\"width:" + (row.pct || 0) + "%\"></i></div>";
    const stuck = row.stuck ? "<span class=\"q-tag stuck\">卡住</span>" : "";
    const exp = row.expired ? "<span class=\"q-tag fail\">過期</span>" : (typeof row.daysLeft === "number" && row.daysLeft <= 2 ? "<span class=\"q-tag warn\">急</span>" : "");
    const done = row.done ? "<span class=\"q-tag done\">完成</span>" : "";
    const reward = row.reward ? "<div class=\"small q-reward\">獎勵預覽：" + escapeHtml(row.reward) + "</div>" : "";
    const goBtn = (!row.done && row.locs && row.locs[0])
      ? "<button type=\"button\" class=\"btn\" data-qgo=\"" + escapeHtml(row.locs[0]) + "\" style=\"min-height:34px;padding:4px 10px\">前往</button>"
      : "";
    const deliverBtn = (!row.done && row.cat === "court" && row.locs && row.locs[0] === S.loc)
      ? "<button type=\"button\" class=\"btn primary\" data-qdeliver=\"" + escapeHtml(row.id) + "\" style=\"min-height:34px;padding:4px 10px\">交付</button>"
      : "";
    return "<div class=\"q-card cat-" + escapeHtml(row.cat) + (row.stuck ? " is-stuck" : "") + "\">" +
      "<div class=\"q-head\"><span class=\"q-cat\">" + escapeHtml(cat) + "</span> <strong>" + escapeHtml(row.title) + "</strong> " + stuck + exp + done + "</div>" +
      "<div class=\"small\">" + escapeHtml(row.tip || "") + "</div>" +
      bar +
      "<div class=\"small\">進度 " + (row.pct || 0) + "% · 地點 " + escapeHtml(locs) + (row.step ? " · 步驟" + row.step : "") + "</div>" +
      reward +
      "<div class=\"btn-row\" style=\"margin-top:6px\">" + goBtn + deliverBtn + "</div></div>";
  }

  function openQuestJournal(filter) {
    ensureQuestSystemV20();
    if (filter) S.questLog.filter = filter;
    const f = S.questLog.filter || "active";
    let list;
    if (f === "all") {
      const seen = {};
      list = [];
      ["active", "done"].forEach(function(ff) {
        listJournalQuests(ff).forEach(function(r) {
          const key = r.cat + ":" + r.id;
          if (seen[key]) return;
          seen[key] = 1;
          list.push(r);
        });
      });
      // also dormant sides lightly
      listJournalQuests("dormant").slice(0, 15).forEach(function(r) {
        const key = r.cat + ":" + r.id;
        if (seen[key]) return;
        seen[key] = 1;
        list.push(r);
      });
    } else {
      list = listJournalQuests(f);
    }
    const tabs = [
      ["active", "進行中"], ["main", "主線"], ["side", "支線"], ["court", "朝廷"],
      ["folk", "民間"], ["ai", "AI"], ["done", "已結"], ["all", "全部"]
    ].map(function(pair) {
      return "<button type=\"button\" class=\"btn " + (f === pair[0] ? "primary" : "") + "\" data-qfilter=\"" + pair[0] + "\">" + pair[1] + "</button>";
    }).join("");
    const tracker = escapeHtml(questTrackerLine());
    let body = list.length ? list.map(renderQuestCardHtml).join("") : "<p class=\"small\">此分類暫無任務。</p>";
    const failN = (S.questFailLog || []).length;
    openModal(
      "<h3>任務簿</h3>" +
      "<div class=\"story-box small\">追蹤：" + tracker + "</div>" +
      "<div class=\"filter-row q-filters\" id=\"q-filters\">" + tabs + "</div>" +
      "<div class=\"q-list\">" + body + "</div>" +
      "<div class=\"btn-row\" style=\"margin-top:10px\">" +
        "<button type=\"button\" class=\"btn primary\" id=\"qj-ai\">請 AI 生支線</button>" +
        "<button type=\"button\" class=\"btn\" id=\"qj-fix\">修復卡任務</button>" +
        "<button type=\"button\" class=\"btn\" id=\"qj-court\">朝廷差遣</button>" +
        "<button type=\"button\" class=\"btn ghost\" onclick=\"closeModal()\">關閉</button>" +
      "</div>" +
      (failN ? "<p class=\"small\">失敗／過期紀錄 " + failN + " 條</p>" : "") +
      "<p class=\"small\">致敬群俠傳任務簿手感 · 青梧原創</p>"
    );
    Array.prototype.forEach.call(document.querySelectorAll("[data-qfilter]"), function(btn) {
      btn.onclick = function() {
        openQuestJournal(btn.getAttribute("data-qfilter"));
      };
    });
    Array.prototype.forEach.call(document.querySelectorAll("[data-qgo]"), function(btn) {
      btn.onclick = function() {
        const id = btn.getAttribute("data-qgo");
        closeModal();
        if (typeof travelToLocation === "function") travelToLocation(id);
        else if (typeof travelTo === "function") travelTo(id);
      };
    });
    Array.prototype.forEach.call(document.querySelectorAll("[data-qdeliver]"), function(btn) {
      btn.onclick = function() {
        closeModal();
        if (typeof completeCourtQuestAt === "function") {
          const ok = completeCourtQuestAt(S.loc);
          if (!ok) toast("此處無法交付", true);
          else {
            try { S.questRewardLog.push({ day: S.day, id: btn.getAttribute("data-qdeliver") }); } catch (e) {}
          }
          render();
        }
      };
    });
    const ai = document.getElementById("qj-ai");
    if (ai) ai.onclick = function() {
      closeModal();
      try {
        if (typeof openAiPlotBoard === "function") openAiPlotBoard();
        else if (typeof requestAiSideQuest === "function") requestAiSideQuest();
        else toast("請先在地圖開【劇情板】", true);
      } catch (e) { toast("AI 支線暫不可用", true); }
    };
    const fx = document.getElementById("qj-fix");
    if (fx) fx.onclick = function() { fixStuckQuests(); };
    const cq = document.getElementById("qj-court");
    if (cq) cq.onclick = function() {
      closeModal();
      if (typeof openCourtQuestHub === "function") openCourtQuestHub();
      else toast("朝廷系統未載入", true);
    };
  }

  // ---- Wrap questHint / storyText / renderStory / renderMap / bindHub / day tick ----
  const _questHintOrig_v20 = typeof questHint === "function" ? questHint : null;
  questHint = function(q) {
    const dh = detailedQuestHint(q);
    if (q && q.done) return "已完成";
    if (dh && dh.tip) return dh.tip;
    return _questHintOrig_v20 ? _questHintOrig_v20(q) : "";
  };

  const _renderStoryOrig_v20 = typeof renderStory === "function" ? renderStory : null;
  if (_renderStoryOrig_v20) {
    renderStory = function() {
      ensureQuestSystemV20();
      let html = "<div class=\"q-journal-banner\">" +
        "<div class=\"small\">任務追蹤</div>" +
        "<div class=\"q-track\">" + escapeHtml(questTrackerLine()) + "</div>" +
        "<div class=\"btn-row\" style=\"margin-top:6px\">" +
        "<button type=\"button\" class=\"btn primary\" id=\"btn-quest-journal\">打開任務簿</button>" +
        "<button type=\"button\" class=\"btn\" id=\"btn-quest-fix\">修復卡任務</button>" +
        "</div></div>";
      // Compact categorized lists
      html += "<h3>主線</h3>";
      ["main", "main2", "main3"].forEach(function(qid) {
        const q = S.quests[qid];
        if (!q) return;
        const dh = detailedQuestHint(q);
        const unlocked = qid === "main" || (qid === "main2" && S.quests.main && S.quests.main.done) || (qid === "main3" && S.quests.main2 && S.quests.main2.done);
        html += "<div class=\"quest-item q-card cat-main\"><div class=\"title\">" + escapeHtml(q.title) + (q.done ? " ✓" : "") + "</div>" +
          "<div class=\"small\">" + escapeHtml(q.done ? "已完成" : (unlocked ? dh.tip : "尚未開啟")) + "</div>" +
          (!q.done && unlocked ? "<div class=\"q-bar\"><i style=\"width:" + questProgressPct(q) + "%\"></i></div>" : "") +
          (!q.done && unlocked && dh.reward ? "<div class=\"small q-reward\">" + escapeHtml(dh.reward) + "</div>" : "") +
          "</div>";
      });
      try {
        if (typeof endingTendencyLine === "function") html += "<div class=\"ending-preview\">" + escapeHtml(endingTendencyLine()) + "</div>";
      } catch (e) {}
      html += "<div class=\"btn-row\" style=\"margin:8px 0\">" +
        "<button class=\"btn primary\" id=\"btn-ending-view\">檢視江湖結局</button>" +
        "<button class=\"btn\" id=\"btn-ending-preview\">結局預兆</button></div>";

      html += "<h3>進行中・支線</h3>";
      const sides = listJournalQuests("side").filter(function(r){ return !r.done && r.step > 0; });
      if (!sides.length) html += "<p class=\"small\">暫無進行中支線。可開任務簿或劇情板。</p>";
      sides.slice(0, 12).forEach(function(r){ html += renderQuestCardHtml(r); });

      const courts = listActiveCourtQuestEntries();
      html += "<h3>朝廷差遣</h3>";
      if (!courts.length) html += "<p class=\"small\">無進行中朝廷差。乾清宮可領取。</p>";
      else courts.forEach(function(c) {
        html += renderQuestCardHtml({
          id: c.id, title: "朝廷・" + c.title, cat: "court", done: false, step: 1,
          tip: c.tip + (c.expired ? "（過期）" : "（餘" + c.daysLeft + "日）"),
          locs: c.loc ? [c.loc] : [], reward: c.reward, pct: 40, stuck: c.defMissing || c.expired,
          daysLeft: c.daysLeft, expired: c.expired
        });
      });

      const folk = listFolkQuestHints();
      html += "<h3>民間機緣（此地）</h3>";
      if (!folk.length) html += "<p class=\"small\">此地暫無民間來人事件。</p>";
      else folk.forEach(function(f) {
        html += renderQuestCardHtml({
          id: f.id, title: "民間・" + f.title, cat: "folk", done: false, step: 0,
          tip: f.tip, locs: f.loc ? [f.loc] : [], reward: "好感／見機", pct: 10, stuck: false
        });
      });

      const ais = listJournalQuests("ai").filter(function(r){ return !r.done; });
      html += "<h3>AI 支線</h3>";
      if (!ais.length) html += "<p class=\"small\">尚未有 AI 支線。可按「請 AI 生支線」或用地圖劇情板。</p>";
      else ais.slice(0, 8).forEach(function(r){ html += renderQuestCardHtml(r); });

      // Keep bonds / dating / fate from original — append original after a marker by calling and stripping duplicate mains is hard;
      // Instead append relationship sections from original via regex-free slice: call original and take from 羈絆
      try {
        const orig = _renderStoryOrig_v20();
        const idx = orig.indexOf("<h3>♥ 拍拖");
        const idx2 = orig.indexOf("<h3>羈絆");
        const cut = idx >= 0 ? idx : idx2;
        if (cut >= 0) html += orig.slice(cut);
        else {
          // fallback minimal
          html += "<h3>羈絆／承諾</h3><p class=\"small\">詳見原情緣頁邏輯。</p>";
        }
      } catch (e2) {}
      return html;
    };
  }

  const _renderMapOrig_v20 = typeof renderMap === "function" ? renderMap : null;
  if (_renderMapOrig_v20) {
    renderMap = function() {
      let html = _renderMapOrig_v20();
      const strip = "<div class=\"q-map-strip\" id=\"q-map-strip\">" +
        "<div class=\"q-track\">📜 " + escapeHtml(questTrackerLine()).slice(0, 64) + "</div>" +
        "<button type=\"button\" class=\"btn primary\" id=\"btn-quest-journal-map\" style=\"min-height:32px;padding:4px 10px\">任務簿</button>" +
        "</div>";
      // inject after first story-box
      const marker = "<div class=\"story-box\">";
      const i = html.indexOf(marker);
      if (i >= 0) {
        const end = html.indexOf("</div>", i);
        if (end > i) html = html.slice(0, end + 6) + strip + html.slice(end + 6);
        else html = strip + html;
      } else html = strip + html;
      return html;
    };
  }

  const _renderMoreOrig_v20 = typeof renderMore === "function" ? renderMore : null;
  if (_renderMoreOrig_v20) {
    renderMore = function() {
      let html = _renderMoreOrig_v20();
      const block = "<h3>任務</h3><div class=\"btn-row\">" +
        "<button class=\"btn primary\" id=\"btn-quest-journal-more\">任務簿</button>" +
        "<button class=\"btn\" id=\"btn-quest-fix-more\">修復卡任務</button>" +
        "<button class=\"btn\" id=\"btn-quest-ai-more\">AI 生支線</button>" +
        "</div>";
      if (html.indexOf("任務簿") < 0) {
        if (html.indexOf("<h3>系統</h3>") >= 0) html = html.replace("<h3>系統</h3>", block + "<h3>系統</h3>");
        else html = block + html;
      }
      return html;
    };
  }

  const _bindHubOrig_v20 = typeof bindHub === "function" ? bindHub : null;
  if (_bindHubOrig_v20) {
    bindHub = function() {
      _bindHubOrig_v20();
      const bind = function(id, fn) {
        const el = document.getElementById(id);
        if (el) el.onclick = fn;
      };
      bind("btn-quest-journal", function(){ openQuestJournal("active"); });
      bind("btn-quest-journal-map", function(){ openQuestJournal("active"); });
      bind("btn-quest-journal-more", function(){ openQuestJournal("active"); });
      bind("btn-quest-fix", function(){ fixStuckQuests(); });
      bind("btn-quest-fix-more", function(){ fixStuckQuests(); });
      bind("btn-quest-ai-more", function(){
        try {
          if (typeof openAiPlotBoard === "function") openAiPlotBoard();
          else toast("劇情板未就緒", true);
        } catch (e) { toast("AI 暫不可用", true); }
      });
      // re-bind ending buttons if story re-rendered
      const bev = document.getElementById("btn-ending-view");
      if (bev && !bev._v20) {
        bev._v20 = 1;
        // leave original handler from bindHub if any
      }
      // quest cards inside story tab
      Array.prototype.forEach.call(document.querySelectorAll("[data-qgo]"), function(btn) {
        btn.onclick = function() {
          const id = btn.getAttribute("data-qgo");
          if (typeof travelToLocation === "function") travelToLocation(id);
        };
      });
      Array.prototype.forEach.call(document.querySelectorAll("[data-qdeliver]"), function(btn) {
        btn.onclick = function() {
          if (typeof completeCourtQuestAt === "function") {
            completeCourtQuestAt(S.loc);
            render();
          }
        };
      });
    };
  }

  // Enhance court claim UI with reward preview + deadline note
  const _openCourtQuestHubOrig_v20 = typeof openCourtQuestHub === "function" ? openCourtQuestHub : null;
  if (_openCourtQuestHubOrig_v20) {
    openCourtQuestHub = function() {
      _openCourtQuestHubOrig_v20();
      setTimeout(function() {
        try {
          const body = document.getElementById("modal-body");
          if (!body) return;
          if (!document.getElementById("cq-journal-link")) {
            const row = body.querySelector(".btn-row");
            if (row) {
              const b = document.createElement("button");
              b.className = "btn";
              b.id = "cq-journal-link";
              b.textContent = "任務簿";
              b.onclick = function(){ closeModal(); openQuestJournal("court"); };
              row.insertBefore(b, row.firstChild);
            }
          }
          // annotate list items with deadline
          const note = document.createElement("p");
          note.className = "small";
          note.textContent = "差遣時限約 " + (S.courtQuestExpireDays || 7) + " 日；過期扣威望。可於任務簿追蹤／修復。";
          const box = body.querySelector(".story-box");
          if (box && box.parentNode) box.parentNode.insertBefore(note, box.nextSibling);
        } catch (e) {}
      }, 0);
    };
  }

  const _completeCourtQuestAtOrig_v20 = typeof completeCourtQuestAt === "function" ? completeCourtQuestAt : null;
  if (_completeCourtQuestAtOrig_v20) {
    completeCourtQuestAt = function(locId) {
      const q = typeof activeCourtQuest === "function" ? activeCourtQuest() : null;
      const ok = _completeCourtQuestAtOrig_v20(locId);
      if (ok && q) {
        try {
          S.questRewardLog = S.questRewardLog || [];
          S.questRewardLog.push({
            day: S.day, id: q.id, title: q.title,
            prestige: q.prestige, gold: q.gold, exp: q.exp
          });
          if (S.questRewardLog.length > 50) S.questRewardLog = S.questRewardLog.slice(-40);
          toast("差遣交付・已記獎勵", true);
        } catch (e) {}
      }
      return ok;
    };
  }

  // AI npc_quest: stamp startedDay + cat
  const _applyWorldAiActionOrig_v20 = typeof applyWorldAiAction === "function" ? applyWorldAiAction : null;
  if (_applyWorldAiActionOrig_v20) {
    applyWorldAiAction = function(npcId, action) {
      const note = _applyWorldAiActionOrig_v20(npcId, action);
      try {
        const t = action && (action.type || action.t || "");
        if (t === "npc_quest" || t === "give_quest" || t === "side_hook" || t === "open_branch") {
          ensureQuestSystemV20();
          Object.keys(S.quests).forEach(function(k) {
            const q = S.quests[k];
            if (!q) return;
            if ((k.indexOf("ai_") === 0 || q.cat === "ai") && q.step > 0 && !q.startedDay) {
              q.startedDay = S.day;
              q.cat = "ai";
            }
          });
        }
      } catch (e) {}
      return note;
    };
  }

  // Day tick: expiry
  if (typeof onNewDayComplexity === "function") {
    const _onNewDayComplexity_v20 = onNewDayComplexity;
    onNewDayComplexity = function(dayAdd) {
      const r = _onNewDayComplexity_v20.apply(this, arguments);
      try { tickQuestExpiryOnNewDay(); } catch (e) {}
      return r;
    };
  }
  if (typeof campOvernight === "function") {
    const _campOvernight_v20 = campOvernight;
    campOvernight = function() {
      const r = _campOvernight_v20.apply(this, arguments);
      try { tickQuestExpiryOnNewDay(); } catch (e) {}
      return r;
    };
  }

  // locationActions: ensure deliver button always visible when court quest matches
  if (typeof locationActions === "function") {
    const _locationActions_v20 = locationActions;
    locationActions = function(locId) {
      const acts = _locationActions_v20(locId) || [];
      try {
        const aq = typeof activeCourtQuest === "function" ? activeCourtQuest() : null;
        if (aq && aq.loc === locId) {
          const has = acts.some(function(a){ return a && /交付朝廷/.test(a.label || ""); });
          if (!has) {
            acts.unshift({
              label: "【仕途】交付朝廷差遣・" + aq.title,
              fn: function(){ completeCourtQuestAt(locId); render(); }
            });
          }
        }
        // Active side tip action
        const tip = questTrackerLine();
        acts.unshift({
          label: "【任務簿】" + (tip || "查看").slice(0, 18),
          fn: function(){ openQuestJournal("active"); }
        });
      } catch (e) {}
      return acts;
    };
  }

  // Boot repair once per load
  try {
    ensureQuestSystemV20();
    fixStuckQuests({ silent: true });
  } catch (eBoot) {}

  window.__JH_V20_SELFTEST = function() {
    ensureQuestSystemV20();
    const line = questTrackerLine();
    const rows = listJournalQuests("active");
    let uiOk = false;
    try {
      openQuestJournal("active");
      const body = document.getElementById("modal-body");
      uiOk = !!(body && /任務簿/.test(body.innerHTML || "") && document.getElementById("qj-fix"));
      if (typeof closeModal === "function") closeModal();
    } catch (e) { uiOk = false; }
    // stuck fix smoke: orphan court
    if (!S.courtQuests) S.courtQuests = {};
    S.courtQuests["__orphan_test__"] = { active: true, done: false, claimedDay: (S.day || 1) - 20 };
    const notes = fixStuckQuests({ silent: true });
    const fixedOrphan = notes.some(function(n){ return /無定義|過期|orphan|__orphan/.test(n); }) || !S.courtQuests["__orphan_test__"];
    const hintOk = !!(detailedQuestHint(S.quests.main).tip);
    return {
      ok: !!line && rows && uiOk && fixedOrphan && hintOk,
      line: line,
      rowN: rows.length,
      uiOk: uiOk,
      fixedOrphan: fixedOrphan,
      hintOk: hintOk,
      notes: notes.slice(0, 5)
    };
  };

  if (window.__JH_DEBUG) {
    Object.assign(window.__JH_DEBUG, {
      openQuestJournal: openQuestJournal,
      fixStuckQuests: fixStuckQuests,
      listJournalQuests: listJournalQuests,
      questTrackerLine: questTrackerLine,
      v20self: window.__JH_V20_SELFTEST
    });
  }

  // ========== END V20 ==========
