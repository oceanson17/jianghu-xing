  // ========== V14: AI MAIN QUEST + NPC DIRECTOR + PLOT BOARD FIX ==========
  // Homage only. AI worldActions MUST mutate real save. Fix 【劇情板】 button (fn vs run).

  const AI_MAIN_FLAGS = [
    "ai_main_nudge", "ai_main_hint", "ai_npc_agenda", "ai_npc_quest",
    "heard_yaogu", "heard_meihua", "open_longmen", "west_road", "map_jianzhong",
    "chixia_path", "ch2_started", "honglian_invite", "dao_invite", "lake_invite",
    "ch3_started", "ch3_rumor", "ch3_ev_border", "ch3_ev_lotus", "ch3_ev_tomb",
    "ch3_path_honor", "ch3_path_force", "ch3_path_wit", "ch3_finale"
  ];
  AI_MAIN_FLAGS.forEach(function(f){
    if (typeof ALLOWED_FLAGS !== "undefined" && ALLOWED_FLAGS.indexOf(f) < 0) ALLOWED_FLAGS.push(f);
  });

  function currentMainQuestId() {
    try { ensureQuests(); } catch (e) {}
    if (!S.quests) return "main";
    if (!S.quests.main || !S.quests.main.done) return "main";
    if (!S.quests.main2 || !S.quests.main2.done) return "main2";
    if (!S.quests.main3 || !S.quests.main3.done) return "main3";
    return null;
  }

  function mainQuestSnapshot() {
    try { ensureQuests(); } catch (e) {}
    const id = currentMainQuestId();
    if (!id || !S.quests[id]) return { id: null, title: "主線已盡", step: 0, done: true, hint: "可自由江湖或宮廷線。" };
    const q = S.quests[id];
    let hint = "";
    try { hint = typeof storyText === "function" ? storyText() : ""; } catch (e2) { hint = questHint(q); }
    return { id: id, title: q.title || id, step: q.step || 0, done: !!q.done, hint: trunc(String(hint), 120) };
  }

  function softMainFlagsForStep(qid, step) {
    if (qid === "main") {
      if (step >= 1) { setFlag("heard_yaogu"); setFlag("heard_meihua"); setFlag("open_longmen"); }
      if (step >= 2) { setFlag("map_jianzhong"); setFlag("chixia_path"); }
    } else if (qid === "main2") {
      if (step >= 1) { setFlag("ch2_started"); setFlag("honglian_invite"); }
      if (step >= 2) { setFlag("dao_invite"); setFlag("lake_invite"); }
    } else if (qid === "main3") {
      if (step >= 1) { setFlag("ch3_started"); setFlag("ch3_rumor"); }
    }
  }

  const _applyWorldAiActionOrig_v14 = applyWorldAiAction;
  applyWorldAiAction = function(npcId, action) {
    if (!action || typeof action !== "object") return "";
    const t = String(action.type || action.action || "").toLowerCase();
    const level = typeof plotAgencyLevel === "function" ? plotAgencyLevel() : 2;
    try {
      if (t === "advance_main" || t === "main_step" || t === "push_main") {
        ensureAiPlotState();
        ensureQuests();
        const qid = action.questId || currentMainQuestId();
        if (!qid || !S.quests[qid] || S.quests[qid].done) return "（主線已盡）";
        const q = S.quests[qid];
        const maxStep = 3;
        const cur = q.step || 0;
        let next = cur;
        if (typeof action.step === "number") {
          next = Math.max(cur, Math.min(maxStep, Math.floor(action.step)));
          // never jump more than +1 unless sandbox+force
          if (next > cur + 1 && !(level >= 3 && action.force)) next = cur + 1;
        } else {
          next = Math.min(maxStep, cur + 1);
        }
        if (next === cur && !action.force) {
          setFlag("ai_main_nudge");
          S.aiMainHint = trunc(String(action.hint || action.text || "主線尚待契機。"), 100);
          return "（主線提示・未推進）";
        }
        q.step = next;
        softMainFlagsForStep(qid, next);
        setFlag("ai_main_nudge");
        if (action.done === true && level >= 3 && action.force) q.done = true;
        const note = "（主線・" + (q.title || qid) + "→步驟" + next + "）";
        logAiPlot(note);
        return note;
      }
      if (t === "main_hint" || t === "quest_hint_main") {
        ensureAiPlotState();
        S.aiMainHint = trunc(String(action.hint || action.text || "有人暗示主線動向。"), 120);
        setFlag("ai_main_hint");
        const note = "（主線提示）";
        logAiPlot(note);
        return note;
      }
      if (t === "close_branch" || t === "finish_branch") {
        ensureAiPlotState();
        const bid = String(action.id || action.branchId || "");
        if (bid && S.aiBranches && S.aiBranches[bid]) {
          S.aiBranches[bid].done = true;
          return "（支線了結・" + (S.aiBranches[bid].title || bid) + "）";
        }
        return "";
      }
      if (t === "npc_quest" || t === "give_quest") {
        ensureAiPlotState();
        ensureQuests();
        const id = action.npcId || npcId;
        const title = trunc(String(action.title || ((NPCS[id] && NPCS[id].name) || "某人") + "之託"), 20);
        const hint = trunc(String(action.hint || "去辦一件事。"), 80);
        const qid = String(action.questId || ("ai_nq_" + (id || "x") + "_" + S.day));
        if (!S.quests[qid]) {
          S.quests[qid] = { id: qid, title: title, hint: hint, step: 1, done: false, fromNpc: id || null, loc: action.loc || S.loc };
        } else {
          S.quests[qid].step = Math.max(1, S.quests[qid].step || 0);
          S.quests[qid].hint = hint;
        }
        setFlag("ai_npc_quest");
        const note = "（NPC任務・" + title + "）";
        logAiPlot(note);
        return note;
      }
      if (t === "npc_speak" || t === "npc_line") {
        ensureAiPlotState();
        const id = action.npcId || npcId;
        const line = trunc(String(action.text || action.say || action.line || ""), 160);
        if (!line) return "";
        S.pendingNpcLine = { npcId: id || null, name: (id && NPCS[id] && NPCS[id].name) || "路人", text: line, day: S.day };
        return "（有人開口）";
      }
      if (t === "npc_agenda" || t === "agenda") {
        ensureAiPlotState();
        if (!S.npcAgenda || typeof S.npcAgenda !== "object") S.npcAgenda = {};
        const id = action.npcId || npcId;
        if (!id || !NPCS[id]) return "";
        S.npcAgenda[id] = {
          day: S.day,
          goal: trunc(String(action.goal || action.text || "在附近活動"), 60),
          loc: action.to || action.loc || NPCS[id].loc,
          mood: trunc(String(action.mood || ""), 20)
        };
        setFlag("ai_npc_agenda");
        if (action.to && locExists(action.to)) {
          if (!S.aiTempNpcLoc[id]) S.aiTempNpcLoc[id] = NPCS[id].loc;
          NPCS[id].loc = action.to;
        }
        return "（" + NPCS[id].name + "行程・" + S.npcAgenda[id].goal + "）";
      }
    } catch (err) {
      console.warn("v14 applyWorldAiAction", t, err);
    }
    return _applyWorldAiActionOrig_v14(npcId, action);
  };

  const _flushPendingAiUiOrig_v14 = flushPendingAiUi;
  flushPendingAiUi = function() {
    ensureAiPlotState();
    if (S.pendingNpcLine) {
      const pl = S.pendingNpcLine;
      S.pendingNpcLine = null;
      const head = pl.name ? ("【" + pl.name + "】") : "【路人】";
      showStory(head + "\n「" + pl.text + "」");
      return true;
    }
    return _flushPendingAiUiOrig_v14();
  };

  function enhanceDirectorPromptMain() {
    const snap = mainQuestSnapshot();
    return " 【主線】" + (snap.title || "") + " 步驟" + snap.step + "：" + (snap.hint || "") +
      " 可輸出 worldActions：advance_main{questId,step?,hint?}（每回合最多+1步）、main_hint{hint}、npc_quest{npcId,title,hint}、npc_speak{npcId,text}、npc_agenda{npcId,goal,to}、move_npc、summon_here、open_branch、spawn_event。" +
      " 你要推動主線與 NPC 行為，但不可一次完結章節（勿設 done，除非沙盤 force）。禁真實清帝名與金庸真名。";
  }

  const _worldDirectorPromptOrig_v14 = worldDirectorPrompt;
  worldDirectorPrompt = function() {
    return _worldDirectorPromptOrig_v14() + enhanceDirectorPromptMain();
  };

  // Enrich free-input director context with main quest
  const _aiWorldDirectorOrig_v14 = aiWorldDirector;
  aiWorldDirector = async function(mode, text) {
    if (!settings.deepseekKey) {
      const off = offlineWorldDirector(mode, text);
      // offline main nudge
      const snap = mainQuestSnapshot();
      if (snap.id && !snap.done && plotAgencyLevel() >= 1) {
        if (/主線|下一步|怎麼辦|線索|黑衣|殘印|夜王|傳聞|打聽/.test(text)) {
          off.worldActions = (off.worldActions || []).concat([
            { type: "main_hint", hint: snap.hint },
            { type: "advance_main", questId: snap.id, hint: "你循傳聞推進了一寸。" }
          ]);
          off.say = (off.say || "") + "\n（主線隱隱有了動靜。）";
        }
      }
      return off;
    }
    // inject main into user blob via wrapper: call original but patch after offline fallback path
    // Re-implement light wrap: call deepseek with enriched prompt already in worldDirectorPrompt
    const pack = await _aiWorldDirectorOrig_v14(mode, text);
    return pack;
  };

  // Offline director: also nudge main + NPC agenda on keywords
  const _offlineWorldDirectorOrig_v14 = offlineWorldDirector;
  offlineWorldDirector = function(mode, text) {
    const pack = _offlineWorldDirectorOrig_v14(mode, text);
    const snap = mainQuestSnapshot();
    const level = plotAgencyLevel();
    const acts = pack.worldActions || [];
    if (snap.id && !snap.done) {
      if (/主線|下一步|殘印|黑衣人|劍冢|密室|夜王|分途/.test(text)) {
        acts.push({ type: "main_hint", hint: snap.hint });
        if (level >= 2) acts.push({ type: "advance_main", questId: snap.id });
        pack.say = (pack.say || "") + "\n你把主線線索又理清了一點：「" + trunc(snap.hint, 40) + "」。";
      }
    }
    if (/任務|委託|差事|幫我|求你/.test(text) && level >= 1) {
      const present = typeof npcAtLocation === "function" ? npcAtLocation(S.loc) : [];
      const nid = present[0] || null;
      acts.push({ type: "npc_quest", npcId: nid, title: "臨時之託", hint: "在" + (S.loc || "此地") + "辦妥一件小事。" });
      pack.say = (pack.say || "") + "\n有人把一樁小事託付給你。";
    }
    if (/行程|去哪|蹤跡|去向/.test(text) && level >= 2) {
      const ids = Object.keys(NPCS || {}).filter(function(id){
        const f = S.fates && S.fates[id];
        return f && /ally|sworn|master|muse|married|teacher/.test(f);
      }).slice(0, 3);
      if (ids.length) {
        const pick = ids[Math.floor(Math.random() * ids.length)];
        acts.push({ type: "npc_agenda", npcId: pick, goal: "尋你而來", to: S.loc });
        pack.say = (pack.say || "") + "\n有人說" + NPCS[pick].name + "近日正在找你。";
      }
    }
    pack.worldActions = acts;
    return pack;
  };

  // NPC talk: ask AI to emit worldActions for proactive behavior
  const _aiNpcInteractOrig_v14 = typeof aiNpcInteract === "function" ? aiNpcInteract : null;
  if (_aiNpcInteractOrig_v14) {
    aiNpcInteract = async function(npcId, mode, playerText) {
      const pack = await _aiNpcInteractOrig_v14(npcId, mode, playerText);
      if (!pack) return pack;
      // Soft offline proactive if no worldActions from AI
      if ((!pack.worldActions || !pack.worldActions.length) && plotAgencyLevel() >= 2) {
        const snap = mainQuestSnapshot();
        const acts = [];
        if (/主線|殘印|黑衣|線索|下一步|傳聞/.test(playerText || "") && snap.id && !snap.done) {
          acts.push({ type: "main_hint", hint: snap.hint });
          if (Math.random() < 0.45) acts.push({ type: "advance_main", questId: snap.id });
          acts.push({ type: "npc_speak", npcId: npcId, text: "關於這條路……你該去查「" + trunc(snap.hint, 28) + "」。" });
        }
        if (/任務|幫|託|委託/.test(playerText || "") && Math.random() < 0.5) {
          acts.push({ type: "npc_quest", npcId: npcId, title: (NPCS[npcId] ? NPCS[npcId].name : "對方") + "之託", hint: "替我辦一件在" + (S.loc || "此地") + "的小事。" });
        }
        if (acts.length) pack.worldActions = acts;
      }
      return pack;
    };
  }

  // Expand NPC system prompt via deepseekChat nudge already exists; also wrap sanitize to keep worldActions from NPC JSON
  // (sanitizeAiResult already wrapped in v13)

  // Trigger proactive NPC tick on day / travel lightly
  async function aiNpcDirectorTick(reason) {
    ensureAiPlotSettings();
    ensureAiPlotState();
    if (!settings.proactiveNpc) return false;
    if (plotAgencyLevel() < 1) return false;
    if (S.npcDirDay === S.day && reason !== "force") return false;
    const chance = reason === "day" ? 0.28 : reason === "travel" ? 0.12 : 0.08;
    if (Math.random() > chance + (settings.deepseekKey ? 0.05 : 0)) return false;
    S.npcDirDay = S.day;
    const snap = mainQuestSnapshot();
    const pool = Object.keys(NPCS || {}).filter(function(id){
      const f = S.fates && S.fates[id];
      if (f === "dead" || f === "vanished") return false;
      return !!f && f !== "default" || Math.random() < 0.15;
    });
    if (!pool.length) return false;
    const pick = pool[Math.floor(Math.random() * Math.min(8, pool.length))];
    const acts = [];
    if (plotAgencyLevel() >= 2 && Math.random() < 0.4) {
      acts.push({ type: "npc_agenda", npcId: pick, goal: "在附近活動，或尋你", to: Math.random() < 0.5 ? S.loc : NPCS[pick].loc });
    }
    if (snap.id && !snap.done && Math.random() < 0.35) {
      acts.push({ type: "main_hint", hint: snap.hint });
      acts.push({ type: "npc_speak", npcId: pick, text: "聽說你在查「" + trunc(snap.hint, 24) + "」——小心點。" });
    } else {
      acts.push({ type: "npc_speak", npcId: pick, text: (NPCS[pick].name || "某人") + "在你耳邊留下一句話：「近況如何？」" });
    }
    if (Math.random() < 0.25) {
      acts.push({ type: "npc_quest", npcId: pick, title: "路途之託", hint: "替" + NPCS[pick].name + "帶個口信或辦件小事。" });
    }
    const note = applyWorldMutation(pick, { worldActions: acts });
    if (note) toast("江湖動向" + note, true);
    try { saveGameSilent(); } catch (e) {}
    setTimeout(function(){ try { flushPendingAiUi(); render(); } catch (e2) {} }, 120);
    return true;
  }

  // Hook day advance / travel if available
  if (typeof advanceDay === "function") {
    const _advanceDayOrig_v14 = advanceDay;
    advanceDay = function() {
      const r = _advanceDayOrig_v14.apply(this, arguments);
      setTimeout(function(){ try { aiNpcDirectorTick("day"); } catch (e) {} }, 500);
      return r;
    };
  }
  if (typeof travelToLocation === "function") {
    const _travelOrig_v14 = travelToLocation;
    travelToLocation = function(id) {
      const r = _travelOrig_v14.apply(this, arguments);
      setTimeout(function(){ try { aiNpcDirectorTick("travel"); } catch (e) {} }, 600);
      return r;
    };
  }

  // Harden location action click: fn || run (core renderer)
  const _renderOrig_forActs = typeof render === "function" ? null : null;
  // Patch at bind time by wrapping locationActions usage — monkeypatch create path via locationActions already uses fn.
  // Also patch the inline renderer once by wrapping the function that builds loc-acts if we can find bindUI.
  (function patchLocActClick() {
    // Re-bind after render by wrapping render
    if (typeof render !== "function") return;
    const _render = render;
    render = function() {
      const out = _render.apply(this, arguments);
      try {
        const acts = document.getElementById("loc-acts");
        if (acts && acts.children && acts.children.length) {
          // Ensure any button without onclick gets repaired from data — skip; we fix at source.
        }
      } catch (e) {}
      return out;
    };
  })();

  // Replace openAiPlotBoard with richer board + safe try/catch + AI push main
  openAiPlotBoard = function() {
    try {
      ensureAiPlotSettings();
      ensureAiPlotState();
      try { ensureQuests(); } catch (e0) {}
      const branches = Object.keys(S.aiBranches || {}).map(function(k){ return S.aiBranches[k]; }).filter(function(x){ return !!x; });
      const snap = mainQuestSnapshot();
      let html = "<h3>劇情板・AI</h3>";
      html += "<p class=\"small\">自由度：" + escapeHtml(settings.plotAgency || "high") +
        " ・ " + (settings.deepseekKey ? "DeepSeek 已接入" : "離線導演") + "</p>";
      html += "<div class=\"story-box\" style=\"margin-top:6px\"><b>主線</b>：" +
        escapeHtml(snap.title || "—") + "（步驟 " + snap.step + "）<br/>" +
        escapeHtml(snap.hint || "") +
        (S.aiMainHint ? ("<br/><span class=\"small\">AI 提示：" + escapeHtml(S.aiMainHint) + "</span>") : "") +
        "</div>";
      if (S.locMood) html += "<p class=\"small\">此地氣氛：" + escapeHtml(S.locMood) + "</p>";
      html += "<h4 style=\"margin-top:8px\">進行中支線</h4>";
      if (!branches.length) html += "<p class=\"small\">暫無 AI 開出的支線。可用下方「請 AI 推演」或自由輸入。</p>";
      else {
        html += "<div class=\"btn-row\">";
        branches.forEach(function(b){
          html += "<button class=\"btn\" data-br=\"" + escapeHtml(b.id) + "\">" +
            escapeHtml(b.title) + (b.done ? "（完）" : "") +
            "<span class=\"sub\">" + escapeHtml(b.hint || "") + "</span></button>";
        });
        html += "</div>";
      }
      html += "<h4 style=\"margin-top:8px\">鉤子</h4>";
      if (!(S.aiSideHooks || []).length) html += "<p class=\"small\">無</p>";
      else {
        html += "<ul class=\"small\">" + S.aiSideHooks.slice(-6).map(function(h){
          return "<li>" + escapeHtml(h.title) + "・" + escapeHtml(h.hint) + "（" + escapeHtml(h.loc || "") + "）</li>";
        }).join("") + "</ul>";
      }
      const ag = S.npcAgenda || {};
      const agKeys = Object.keys(ag).slice(-4);
      if (agKeys.length) {
        html += "<h4 style=\"margin-top:8px\">NPC 行程</h4><ul class=\"small\">";
        agKeys.forEach(function(id){
          const a = ag[id];
          html += "<li>" + escapeHtml((NPCS[id] && NPCS[id].name) || id) + "：" + escapeHtml(a.goal || "") + "</li>";
        });
        html += "</ul>";
      }
      if ((S.aiPlotLog || []).length) {
        html += "<h4 style=\"margin-top:8px\">近況</h4><ul class=\"small\">" +
          S.aiPlotLog.slice(-5).map(function(x){ return "<li>日" + x.day + "・" + escapeHtml(x.note) + "</li>"; }).join("") +
          "</ul>";
      }
      html += "<div class=\"btn-row\" style=\"margin-top:10px\">" +
        "<button class=\"btn primary\" id=\"ai-push-main\">請 AI 推演主線</button>" +
        "<button class=\"btn\" id=\"ai-push-world\">請 AI 生事／挪人</button>" +
        "<button class=\"btn\" id=\"ai-plot-settings\">AI 設定</button>" +
        "<button class=\"btn ghost\" id=\"ai-plot-close\">關閉</button></div>";
      openModal(html);
      document.querySelectorAll("[data-br]").forEach(function(btn){
        btn.onclick = function() {
          const id = btn.getAttribute("data-br");
          const b = S.aiBranches[id];
          if (!b) return;
          closeModal();
          showStory("【" + b.title + "】\n" + b.hint + "\n（日" + b.day + "・" + (b.loc || "") + "）" +
            (b.done ? "\n（已了結）" : "\n可在相關地點自由輸入推進。"));
        };
      });
      const st = document.getElementById("ai-plot-settings");
      if (st) st.onclick = function(){ try { showSettings(); } catch (e) { toast("設定開啟失敗", true); } };
      const cl = document.getElementById("ai-plot-close");
      if (cl) cl.onclick = function(){ closeModal(); };
      const pm = document.getElementById("ai-push-main");
      if (pm) pm.onclick = async function() {
        pm.disabled = true; pm.textContent = "推演中…";
        try {
          const snap2 = mainQuestSnapshot();
          const pack = await aiWorldDirector("say", "請根據目前主線狀態推進劇情，並讓相關 NPC 給出提示或委託。主線：" + (snap2.title || "") + " 步驟" + snap2.step + "。" + (snap2.hint || ""));
          const note = applyWorldMutation(null, pack);
          closeModal();
          showStory((pack.say || "劇情有了新的動向。") + (note ? "\n" + note : ""));
          try { saveGameSilent(); } catch (e1) {}
          setTimeout(function(){ try { flushPendingAiUi(); render(); } catch (e2) {} }, 100);
        } catch (err) {
          console.warn(err);
          toast("推演失敗，已用離線導演", true);
          const off = offlineWorldDirector("say", "主線下一步");
          const note = applyWorldMutation(null, off);
          closeModal();
          showStory((off.say || "") + (note ? "\n" + note : ""));
        }
      };
      const pw = document.getElementById("ai-push-world");
      if (pw) pw.onclick = async function() {
        pw.disabled = true; pw.textContent = "生事中…";
        try {
          const pack = await aiWorldDirector("action", "在此地製造一件可選事件，並挪動一位相關 NPC 現身或給出行程。");
          const note = applyWorldMutation(null, pack);
          closeModal();
          showStory((pack.say || "風雲變幻。") + (note ? "\n" + note : ""));
          try { saveGameSilent(); } catch (e1) {}
          setTimeout(function(){ try { flushPendingAiUi(); render(); } catch (e2) {} }, 100);
        } catch (err) {
          console.warn(err);
          toast("生事失敗", true);
          pw.disabled = false; pw.textContent = "請 AI 生事／挪人";
        }
      };
    } catch (err) {
      console.warn("openAiPlotBoard", err);
      try {
        openModal("<h3>劇情板</h3><p class=\"small\">開啟時出錯：" + escapeHtml(String(err && err.message || err)) +
          "</p><div class=\"btn-row\"><button class=\"btn\" onclick=\"closeModal()\">關閉</button></div>");
      } catch (e2) {
        toast("劇情板開啟失敗", true);
      }
    }
  };

  // Ensure map button uses fn (re-wrap locationActions)
  (function rewrapLocActs() {
    const prev = locationActions;
    locationActions = function(locId) {
      const acts = (typeof prev === "function" ? prev(locId) : []) || [];
      // dedupe ai_plot_board
      const filtered = acts.filter(function(a){ return a && a.id !== "ai_plot_board" && a.label !== "【劇情板】AI 支線"; });
      filtered.push({
        id: "ai_plot_board",
        label: "【劇情板】AI 支線",
        fn: function(){ openAiPlotBoard(); },
        run: function(){ openAiPlotBoard(); }
      });
      return filtered;
    };
  })();

  // Core click safety: wrap render to bind fn||run
  if (typeof render === "function") {
    const __renderV14 = render;
    render = function() {
      const r = __renderV14.apply(this, arguments);
      try {
        const box = document.getElementById("loc-acts");
        if (!box) return r;
        // Rebind from locationActions to guarantee handlers
        const list = locationActions(S.loc) || [];
        if (box.childNodes.length === list.length) {
          for (let i = 0; i < list.length; i++) {
            const btn = box.childNodes[i];
            const a = list[i];
            if (btn && a && (a.fn || a.run)) {
              btn.onclick = a.fn || a.run;
            }
          }
        }
      } catch (e) {}
      return r;
    };
  }

  // Autorun V14
  window.__JH_AUTORUN_V14 = function() {
    ensureAiPlotSettings();
    ensureAiPlotState();
    ensureQuests();
    settings.plotAgency = "sandbox";
    settings.proactiveNpc = true;
    settings.deepseekKey = "";
    saveSettings();

    // Board opens without throw
    let boardOk = false;
    try {
      openAiPlotBoard();
      boardOk = !!(document.getElementById("modal-body") && /劇情板/.test(document.getElementById("modal-body").innerHTML || ""));
      closeModal();
    } catch (e) { boardOk = false; }

    // locationActions has fn
    const acts = locationActions(S.loc || "qingcheng") || [];
    const boardAct = acts.filter(function(a){ return a && (a.id === "ai_plot_board" || /劇情板/.test(a.label || "")); })[0];
    const fnOk = !!(boardAct && typeof (boardAct.fn || boardAct.run) === "function");

    // main advance
    S.quests.main.done = false;
    S.quests.main.step = 0;
    const n1 = applyWorldAiAction(null, { type: "advance_main", questId: "main" });
    const stepOk = S.quests.main.step === 1 && /主線/.test(n1);
    applyWorldAiAction(null, { type: "main_hint", hint: "去青城打聽黑衣人" });
    const hintOk = !!(S.aiMainHint && flag("ai_main_hint"));

    // npc quest / agenda / speak
    const anyNpc = Object.keys(NPCS || {})[0];
    applyWorldAiAction(anyNpc, { type: "npc_quest", npcId: anyNpc, title: "試任務", hint: "測試" });
    applyWorldAiAction(anyNpc, { type: "npc_agenda", npcId: anyNpc, goal: "巡邏", to: S.loc });
    applyWorldAiAction(anyNpc, { type: "npc_speak", npcId: anyNpc, text: "測試開口" });
    const speakOk = !!(S.pendingNpcLine && S.pendingNpcLine.text);
    flushPendingAiUi();

    // offline director main keyword
    const off = offlineWorldDirector("say", "主線下一步該怎麼辦");
    const offNote = applyWorldMutation(null, off);
    const offMainOk = S.quests.main.step >= 1 && (/主線|步驟|提示/.test(offNote + (off.say || "")) || S.aiMainHint);

    const ok = !!(boardOk && fnOk && stepOk && hintOk && speakOk && offMainOk && typeof aiWorldDirector === "function");
    return {
      ok: ok,
      boardOk: boardOk,
      fnOk: fnOk,
      stepOk: stepOk,
      hintOk: hintOk,
      speakOk: speakOk,
      offMainOk: offMainOk,
      mainStep: S.quests.main.step,
      agency: settings.plotAgency
    };
  };

  if (window.__JH_DEBUG) {
    Object.assign(window.__JH_DEBUG, {
      openAiPlotBoard: openAiPlotBoard,
      currentMainQuestId: currentMainQuestId,
      mainQuestSnapshot: mainQuestSnapshot,
      aiNpcDirectorTick: aiNpcDirectorTick,
      applyWorldAiAction: applyWorldAiAction
    });
  }

  // ========== END V14 ==========
