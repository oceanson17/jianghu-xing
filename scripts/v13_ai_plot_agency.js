  // ========== V13: AI PLOT AGENCY + SETTINGS UX ==========
  // Homage only. AI worldActions/courtActions MUST mutate real save when allowed.
  // No key → offline director still works.

  const AI_PLOT_FLAGS = [
    "ai_branch_open", "ai_event_today", "ai_npc_visit", "ai_rumor_seed",
    "ai_side_hook", "ai_loc_mood", "plot_free_high", "ai_bonded_ping"
  ];
  AI_PLOT_FLAGS.forEach(function(f){
    if (typeof ALLOWED_FLAGS !== "undefined" && ALLOWED_FLAGS.indexOf(f) < 0) ALLOWED_FLAGS.push(f);
  });

  const WORLD_GIFT_WHITELIST = Object.assign({}, typeof COURT_AI_GIFT_WHITELIST === "object" ? COURT_AI_GIFT_WHITELIST : {}, {
    herb:1, pill:1, wine:1, detox:1, candy:1, cloth:1, wood_sword:1, med_salve:1,
    focus_incense:1, bronze_mirror:1, jade_ring:1
  });

  function ensureAiPlotSettings() {
    if (!settings || typeof settings !== "object") return;
    if (!settings.thinking) settings.thinking = "auto"; // auto | enabled | disabled
    if (!settings.plotAgency) settings.plotAgency = "high"; // balanced | high | sandbox
    if (typeof settings.proactiveNpc !== "boolean") settings.proactiveNpc = true;
    if (typeof settings.aiMaxActions !== "number") settings.aiMaxActions = 6;
  }
  ensureAiPlotSettings();

  function plotAgencyLevel() {
    ensureAiPlotSettings();
    const v = String(settings.plotAgency || "high");
    if (v === "sandbox") return 3;
    if (v === "balanced") return 1;
    return 2; // high
  }

  function thinkingResolved(model) {
    ensureAiPlotSettings();
    const t = settings.thinking || "auto";
    if (t === "enabled") return true;
    if (t === "disabled") return false;
    const m = String(model || settings.model || "");
    return m.indexOf("pro") >= 0;
  }

  function validateDeepseekKey(k) {
    const s = String(k || "").trim();
    if (!s) return { ok: false, msg: "尚未填入 API Key（可留空繼續離線玩）。" };
    if (s.length < 20) return { ok: false, msg: "Key 似乎太短，請檢查是否完整複製。" };
    if (!/^sk-[A-Za-z0-9_\-]+/.test(s) && s.indexOf("sk-") !== 0) {
      return { ok: false, msg: "格式異常：DeepSeek Key 通常以 sk- 開頭。仍可強制儲存。" };
    }
    return { ok: true, msg: "格式看起來正常。" };
  }

  // ---- Wrap settings persistence ----
  const _saveSettingsOrig_v13 = saveSettings;
  saveSettings = function() {
    ensureAiPlotSettings();
    try {
      localStorage.setItem(SETTINGS_KEY, JSON.stringify({
        deepseekKey: settings.deepseekKey || "",
        deepseekUrl: settings.deepseekUrl || "https://api.deepseek.com",
        model: (typeof normalizeDeepseekModel === "function" ? normalizeDeepseekModel(settings.model) : settings.model) || "deepseek-v4-pro",
        thinking: settings.thinking || "auto",
        plotAgency: settings.plotAgency || "high",
        proactiveNpc: !!settings.proactiveNpc,
        aiMaxActions: Math.max(2, Math.min(10, Number(settings.aiMaxActions) || 6))
      }));
    } catch (e) {
      if (typeof _saveSettingsOrig_v13 === "function") _saveSettingsOrig_v13();
    }
  };

  const _deepseekChatOrig_v13 = deepseekChat;
  deepseekChat = async function(systemPrompt, userPrompt, maxTokens) {
    if (!settings.deepseekKey) return null;
    ensureAiPlotSettings();
    try {
      const model = normalizeDeepseekModel(settings.model || "deepseek-v4-pro");
      settings.model = model;
      const useThink = thinkingResolved(model);
      const isPro = model.indexOf("pro") >= 0;
      const body = {
        model: model,
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt }
        ],
        max_tokens: Math.max(maxTokens || 500, useThink || isPro ? 900 : 550)
      };
      if (useThink) {
        body.thinking = { type: "enabled" };
        body.reasoning_effort = isPro ? "high" : "medium";
      } else {
        body.temperature = 0.8;
        body.thinking = { type: "disabled" };
      }
      // plot freedom nudge in system if agency high
      if (plotAgencyLevel() >= 2 && systemPrompt && systemPrompt.indexOf("【劇情自由度】") < 0) {
        body.messages[0].content = systemPrompt + " 【劇情自由度】可主動開支線／挪動在場NPC／改旗標／生成場景事件；凡要改遊戲狀態必須輸出 worldActions 或 courtActions 陣列。禁真實清帝名與金庸真名。";
      }
      const res = await fetch((settings.deepseekUrl || "https://api.deepseek.com").replace(/\/$/, "") + "/v1/chat/completions", {
        method: "POST",
        headers: { "Content-Type": "application/json", "Authorization": "Bearer " + settings.deepseekKey },
        body: JSON.stringify(body)
      });
      if (!res.ok) throw new Error("HTTP " + res.status);
      const data = await res.json();
      const msg = data.choices && data.choices[0] && data.choices[0].message;
      if (!msg) return null;
      return (msg.content && String(msg.content).trim()) || null;
    } catch (err) {
      console.warn("DeepSeek failed", err);
      toast("AI 失敗，改離線回應", true);
      return null;
    }
  };

  async function testDeepseekConnection() {
    if (!settings.deepseekKey) {
      toast("請先填入並儲存 API Key", true);
      return { ok: false, err: "no_key" };
    }
    toast("測試連線中…", true);
    const reply = await deepseekChat(
      "你是連線測試。只回兩個字：就緒",
      "ping " + Date.now(),
      40
    );
    if (reply) {
      toast("DeepSeek 就緒・" + trunc(reply, 24), true);
      return { ok: true, reply: reply };
    }
    toast("連線失敗（CORS／Key／網絡），可繼續離線玩", true);
    return { ok: false, err: "fail" };
  }

  const _showSettingsOrig_v13 = showSettings;
  showSettings = function() {
    ensureAiPlotSettings();
    const cur = normalizeDeepseekModel(settings.model || "deepseek-v4-pro");
    const think = settings.thinking || "auto";
    const agency = settings.plotAgency || "high";
    const hasKey = !!(settings.deepseekKey && settings.deepseekKey.length > 8);
    openModal(
      "<h3>DeepSeek 設定</h3>" +
      "<p class=\"small\">金鑰<strong>只存本機</strong>（localStorage），唔會上傳到遊戲伺服器。" +
      "接好之後，NPC 對白、情緣、場景自由輸入會由 AI 推動，並可<strong>真改</strong>存檔（升官、送禮、開支線、挪 NPC）。" +
      "無 Key 仍可離線玩完整腳本。</p>" +
      "<div class=\"story-box small\" style=\"margin:8px 0\">" +
      "狀態：" + (hasKey ? "<b style=\"color:#6d4\">已接入</b>・" + escapeHtml(cur) : "<b>離線模式</b>") +
      " ・ 思考=" + escapeHtml(think) + " ・ 劇情自由度=" + escapeHtml(agency) +
      "</div>" +
      "<label class=\"small\">API Key</label>" +
      "<input class=\"input\" id=\"ds-key\" type=\"password\" autocomplete=\"off\" placeholder=\"" +
      (hasKey ? "（已儲存，貼上可更換）" : "sk-… 喺 platform.deepseek.com 建立") + "\" />" +
      "<p class=\"small\" id=\"ds-key-hint\" style=\"margin-top:4px\">" + (hasKey ? "已有金鑰；留空＝保持唔改。" : "建議以 sk- 開頭。") + "</p>" +
      "<label class=\"small\" style=\"margin-top:8px;display:block\">Base URL</label>" +
      "<input class=\"input\" id=\"ds-url\" value=\"" + escapeHtml(settings.deepseekUrl || "https://api.deepseek.com") + "\" />" +
      "<p class=\"small\">一般唔使改。自建代理先改呢度。</p>" +
      "<label class=\"small\" style=\"margin-top:8px;display:block\">模型</label>" +
      "<select class=\"input\" id=\"ds-model\">" +
      "<option value=\"deepseek-v4-pro\"" + (cur === "deepseek-v4-pro" ? " selected" : "") + ">deepseek-v4-pro（更強・適合推劇情）</option>" +
      "<option value=\"deepseek-flash\"" + (cur === "deepseek-flash" ? " selected" : "") + ">deepseek-flash（更快較平）</option>" +
      "</select>" +
      "<label class=\"small\" style=\"margin-top:8px;display:block\">思考模式</label>" +
      "<select class=\"input\" id=\"ds-think\">" +
      "<option value=\"auto\"" + (think === "auto" ? " selected" : "") + ">自動（Pro 開・Flash 關）</option>" +
      "<option value=\"enabled\"" + (think === "enabled" ? " selected" : "") + ">強制開（慢但穩）</option>" +
      "<option value=\"disabled\"" + (think === "disabled" ? " selected" : "") + ">強制關（快）</option>" +
      "</select>" +
      "<label class=\"small\" style=\"margin-top:8px;display:block\">劇情自由度</label>" +
      "<select class=\"input\" id=\"ds-agency\">" +
      "<option value=\"balanced\"" + (agency === "balanced" ? " selected" : "") + ">穩健（少改世界）</option>" +
      "<option value=\"high\"" + (agency === "high" ? " selected" : "") + ">高（開支線／挪人／改旗・推薦）</option>" +
      "<option value=\"sandbox\"" + (agency === "sandbox" ? " selected" : "") + ">沙盤（更敢生成事件）</option>" +
      "</select>" +
      "<label class=\"small\" style=\"margin-top:8px;display:flex;align-items:center;gap:8px\">" +
      "<input type=\"checkbox\" id=\"ds-proactive\" " + (settings.proactiveNpc ? "checked" : "") + "/>" +
      "戀人／羈絆主動來信來訪</label>" +
      "<div class=\"btn-row\" style=\"margin-top:12px\">" +
      "<button class=\"btn primary\" id=\"ds-save\" type=\"button\">儲存</button>" +
      "<button class=\"btn\" id=\"ds-test\" type=\"button\">測試連線</button>" +
      "<button class=\"btn\" id=\"ds-clear\" type=\"button\">清除金鑰</button>" +
      "<button class=\"btn ghost\" type=\"button\" onclick=\"closeModal()\">關閉</button>" +
      "</div>" +
      "<p class=\"small\" style=\"margin-top:8px\">提示：Safari 請用 https 頁面；file:// 可能被 CORS 擋住 AI（離線仍可用）。</p>"
    );
    const keyInp = document.getElementById("ds-key");
    if (keyInp) {
      keyInp.oninput = function() {
        const hint = document.getElementById("ds-key-hint");
        const v = validateDeepseekKey(keyInp.value.trim() || (hasKey ? settings.deepseekKey : ""));
        if (hint) hint.textContent = v.msg;
      };
    }
    document.getElementById("ds-save").onclick = function() {
      const k = (document.getElementById("ds-key").value || "").trim();
      if (k) {
        const v = validateDeepseekKey(k);
        if (!v.ok && k.length < 12) { toast(v.msg, true); return; }
        settings.deepseekKey = k;
      }
      settings.deepseekUrl = (document.getElementById("ds-url").value || "").trim() || "https://api.deepseek.com";
      settings.model = normalizeDeepseekModel((document.getElementById("ds-model").value || "").trim() || "deepseek-v4-pro");
      settings.thinking = document.getElementById("ds-think").value || "auto";
      settings.plotAgency = document.getElementById("ds-agency").value || "high";
      settings.proactiveNpc = !!(document.getElementById("ds-proactive") && document.getElementById("ds-proactive").checked);
      saveSettings();
      toast("已儲存・" + settings.model + "・自由度 " + settings.plotAgency, true);
      closeModal();
      try { if (typeof render === "function") render(); } catch (e) {}
    };
    document.getElementById("ds-clear").onclick = function() {
      settings.deepseekKey = "";
      saveSettings();
      toast("已清除金鑰・離線模式", true);
      closeModal();
    };
    document.getElementById("ds-test").onclick = async function() {
      const k = (document.getElementById("ds-key").value || "").trim();
      if (k) settings.deepseekKey = k;
      settings.deepseekUrl = (document.getElementById("ds-url").value || "").trim() || settings.deepseekUrl;
      settings.model = normalizeDeepseekModel((document.getElementById("ds-model").value || "").trim() || settings.model);
      settings.thinking = document.getElementById("ds-think").value || settings.thinking;
      await testDeepseekConnection();
    };
  };

  // ---- World / plot action application ----
  function ensureAiPlotState() {
    if (!S.aiPlotLog || !Array.isArray(S.aiPlotLog)) S.aiPlotLog = [];
    if (typeof S.aiEventDay !== "number") S.aiEventDay = 0;
    if (!S.aiTempNpcLoc || typeof S.aiTempNpcLoc !== "object") S.aiTempNpcLoc = {};
    if (!S.aiBranches || typeof S.aiBranches !== "object") S.aiBranches = {};
    if (!S.aiSideHooks || !Array.isArray(S.aiSideHooks)) S.aiSideHooks = [];
  }

  function logAiPlot(note) {
    ensureAiPlotState();
    if (!note) return;
    S.aiPlotLog.push({ day: S.day, note: trunc(String(note), 80) });
    if (S.aiPlotLog.length > 40) S.aiPlotLog = S.aiPlotLog.slice(-40);
  }

  function locExists(id) {
    return !!(typeof LOCATIONS !== "undefined" && LOCATIONS.some(function(l){ return l.id === id; }));
  }

  function applyWorldAiAction(npcId, action) {
    if (!action || typeof action !== "object") return "";
    ensureAiPlotState();
    const level = plotAgencyLevel();
    const t = String(action.type || action.action || "").toLowerCase();
    let note = "";
    try {
      if (t === "set_flag" || t === "flag") {
        const k = String(action.flag || action.id || "");
        if (k && ALLOWED_FLAGS.indexOf(k) >= 0) {
          setFlag(k, action.value !== false);
          note = "（旗標・" + k + "）";
        }
      } else if (t === "clear_flag") {
        const k = String(action.flag || action.id || "");
        if (k && S.flags) { delete S.flags[k]; note = "（清旗・" + k + "）"; }
      } else if (t === "unlock_map" || t === "reveal_loc") {
        const loc = action.loc || action.id;
        if (loc && locExists(loc)) {
          setFlag("map_" + loc);
          if (LOCATIONS.find(function(l){ return l.id === loc; })) {
            // soft unlock via flag
          }
          note = "（地圖開・" + loc + "）";
        }
      } else if (t === "move_npc" || t === "npc_move") {
        if (level < 2 && !action.force) return "";
        const id = action.npcId || action.id || npcId;
        const to = action.to || action.loc || S.loc;
        if (id && NPCS[id] && to && locExists(to)) {
          if (!S.aiTempNpcLoc[id]) S.aiTempNpcLoc[id] = NPCS[id].loc;
          NPCS[id].loc = to;
          note = "（" + NPCS[id].name + "現身於" + ((LOCATIONS.find(function(l){return l.id===to;})||{}).name || to) + "）";
        }
      } else if (t === "recall_npc" || t === "npc_home") {
        const id = action.npcId || action.id || npcId;
        if (id && S.aiTempNpcLoc[id] && NPCS[id]) {
          NPCS[id].loc = S.aiTempNpcLoc[id];
          delete S.aiTempNpcLoc[id];
          note = "（" + NPCS[id].name + "返回原處）";
        }
      } else if (t === "summon_here" || t === "visit") {
        const id = action.npcId || action.id || npcId;
        if (id && NPCS[id]) {
          if (!S.aiTempNpcLoc[id]) S.aiTempNpcLoc[id] = NPCS[id].loc;
          NPCS[id].loc = S.loc;
          setFlag("ai_npc_visit");
          note = "（" + NPCS[id].name + "來到你身邊）";
        }
      } else if (t === "open_branch" || t === "branch") {
        if (level < 1) return "";
        const bid = String(action.id || action.branchId || ("br_" + S.day + "_" + Math.floor(Math.random()*999)));
        const title = trunc(String(action.title || "無名支線"), 24);
        const hint = trunc(String(action.hint || action.text || "有新的事端。"), 80);
        S.aiBranches[bid] = { id: bid, title: title, hint: hint, day: S.day, loc: action.loc || S.loc, done: false, npcId: action.npcId || npcId || null };
        setFlag("ai_branch_open");
        note = "（支線開・" + title + "）";
      } else if (t === "spawn_event" || t === "scene_event") {
        if (S.aiEventDay === S.day && level < 3) return "（今日已有隨機事）";
        S.aiEventDay = S.day;
        setFlag("ai_event_today");
        const text = trunc(String(action.text || action.desc || "此地生變。"), 160);
        const choices = Array.isArray(action.choices) ? action.choices.slice(0, 4) : null;
        S.pendingAiEvent = { text: text, choices: choices, day: S.day, loc: S.loc, from: npcId || null };
        note = "（場景事件）";
      } else if (t === "side_hook" || t === "quest_hook") {
        const title = trunc(String(action.title || "傳聞一線"), 20);
        const hint = trunc(String(action.hint || "去打聽。"), 60);
        S.aiSideHooks.push({ title: title, hint: hint, loc: action.loc || S.loc, day: S.day, npcId: action.npcId || npcId || null });
        if (S.aiSideHooks.length > 12) S.aiSideHooks = S.aiSideHooks.slice(-12);
        setFlag("ai_side_hook");
        note = "（鉤子・" + title + "）";
      } else if (t === "alter_quest" || t === "quest_step") {
        ensureQuests();
        const qid = action.questId || action.id;
        if (qid && S.quests && S.quests[qid]) {
          if (typeof action.step === "number") S.quests[qid].step = Math.max(0, Math.min(9, action.step));
          if (action.done) S.quests[qid].done = true;
          note = "（任務進度・" + qid + "）";
        } else if (qid && typeof COURT_QUESTS !== "undefined" && typeof applyCourtAiAction === "function") {
          note = applyCourtAiAction(npcId, { type: "open_quest", questId: qid });
        }
      } else if (t === "favor_delta" || t === "favor" || t === "gift_item" || t === "gift" || t === "give_gold" ||
                 t === "prestige" || t === "promote" || t === "karma" || t === "karma_delta" ||
                 t === "scorn" || t === "flattery_gift" || t === "pending_deal" || t === "companion" ||
                 t === "heat" || t === "demote_heat" || t === "open_quest" || t === "imprison") {
        if (typeof applyCourtAiAction === "function") note = applyCourtAiAction(npcId, action);
      } else if (t === "renown") {
        const n = Math.max(-5, Math.min(8, Number(action.amount != null ? action.amount : action.n) || 1));
        S.renown = Math.max(0, (S.renown || 0) + n);
        note = "（聲望" + (n >= 0 ? "＋" : "") + n + "）";
      } else if (t === "gold") {
        const g = Math.max(-50, Math.min(80, Number(action.amount || action.gold) || 5));
        S.gold = Math.max(0, (S.gold || 0) + g);
        note = "（銀兩" + (g >= 0 ? "＋" : "") + g + "）";
      } else if (t === "add_item") {
        const id = action.item || action.id;
        const n = Math.max(1, Math.min(3, Number(action.n) || 1));
        if (id && WORLD_GIFT_WHITELIST[id] && ITEMS[id]) {
          addItem(id, n);
          note = "（入手" + ITEMS[id].name + "）";
        }
      } else if (t === "fate") {
        const id = action.npcId || npcId;
        const f = String(action.fate || "");
        if (id && f && ALLOWED_FATES.indexOf(f) >= 0) {
          setFate(id, f);
          note = "（命運・" + (NPCS[id] ? NPCS[id].name : id) + "→" + f + "）";
        }
      } else if (t === "loc_mood") {
        S.locMood = trunc(String(action.mood || action.text || "平淡"), 20);
        setFlag("ai_loc_mood");
        note = "（此地氣氛・" + S.locMood + "）";
      } else if (t === "travel" || t === "move_player") {
        if (level < 3 && !action.force) return "";
        const to = action.to || action.loc;
        if (to && locExists(to) && typeof travelToLocation === "function") {
          try { travelToLocation(to); note = "（被引至" + to + "）"; } catch (e1) { S.loc = to; note = "（抵達" + to + "）"; }
        }
      } else if (t === "toast") {
        toast(trunc(String(action.text || ""), 40), true);
      } else if (t === "story") {
        // deferred show via pending
        S.pendingAiStory = trunc(String(action.text || ""), 280);
        note = "";
      }
    } catch (err) {
      console.warn("applyWorldAiAction", t, err);
    }
    if (note) logAiPlot(note);
    return note;
  }

  function applyWorldMutation(npcId, result) {
    if (!result) return "";
    ensureAiPlotState();
    let notes = [];
    const list = [].concat(result.worldActions || [], result.plotActions || []);
    const maxN = Math.max(2, Math.min(10, Number(settings.aiMaxActions) || 6));
    list.slice(0, maxN).forEach(function(a){
      const n = applyWorldAiAction(npcId, a);
      if (n) notes.push(n);
    });
    // also allow nested in courtActions unknown types via world applicator
    if (Array.isArray(result.courtActions)) {
      result.courtActions.forEach(function(a){
        const t = String((a && (a.type || a.action)) || "").toLowerCase();
        if (/^(set_flag|unlock_map|move_npc|summon_here|open_branch|spawn_event|side_hook|alter_quest|renown|add_item|loc_mood|visit|branch)$/.test(t)) {
          const n = applyWorldAiAction(npcId, a);
          if (n) notes.push(n);
        }
      });
    }
    return notes.filter(function(x){ return !!x; }).join("");
  }

  function flushPendingAiUi() {
    ensureAiPlotState();
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
        openModal(html);
        document.querySelectorAll("[data-ai-ch]").forEach(function(btn){
          btn.onclick = function() {
            const i = Number(btn.getAttribute("data-ai-ch"));
            const c = ev.choices[i] || {};
            closeModal();
            let note = "";
            if (c.worldActions) note += applyWorldMutation(ev.from, { worldActions: c.worldActions });
            if (c.courtActions && typeof applyNpcMutation === "function") note += applyNpcMutation(ev.from, { courtActions: c.courtActions });
            if (c.favor && ev.from) note += applyWorldAiAction(ev.from, { type: "favor_delta", amount: Number(c.favor) || 1 });
            if (c.gold) note += applyWorldAiAction(ev.from, { type: "gold", amount: Number(c.gold) || 0 });
            showStory((c.result || c.text || "你做出了選擇。") + (note ? "\n" + note : ""));
            try { saveGameSilent(); } catch (e) {}
            try { render(); } catch (e2) {}
          };
        });
      } else {
        showStory(ev.text);
      }
      return true;
    }
    if (S.pendingAiStory) {
      const t = S.pendingAiStory;
      S.pendingAiStory = null;
      showStory(t);
      return true;
    }
    return false;
  }

  // Hook sanitize / apply
  const _sanitizeAiResultOrig_v13 = sanitizeAiResult;
  sanitizeAiResult = function(raw, npcId) {
    const out = _sanitizeAiResultOrig_v13(raw, npcId);
    if (raw && typeof raw === "object") {
      if (Array.isArray(raw.worldActions)) out.worldActions = raw.worldActions;
      if (Array.isArray(raw.plotActions)) out.plotActions = raw.plotActions;
      if (Array.isArray(raw.courtActions)) out.courtActions = raw.courtActions;
    }
    return out;
  };

  const _applyAiResultOrig_v13 = applyAiResult;
  applyAiResult = function(npcId, result, mode, playerText) {
    let note = _applyAiResultOrig_v13(npcId, result, mode, playerText);
    const w = applyWorldMutation(npcId, result);
    if (w) note = (note || "") + w;
    try { if (typeof saveGameSilent === "function") saveGameSilent(); } catch (e) {}
    setTimeout(function(){ try { flushPendingAiUi(); } catch (e2) {} }, 80);
    return note;
  };

  function worldDirectorPrompt() {
    const loc = LOCATIONS.find(function(l){ return l.id === S.loc; }) || { name: S.loc, desc: "" };
    const lvl = plotAgencyLevel();
    return "你是武俠遊戲「江湖行」場景導演。地點：" + loc.name + "。" + (loc.desc || "") +
      " 繁體中文。禁金庸IP與真實清帝名（用景安帝／青梧宮）。" +
      " 玩家自由說話或行動時，你要回應當下場景，可生成路人、小事件、線索。" +
      " 劇情自由度=" + (lvl >= 3 ? "沙盤" : lvl >= 2 ? "高" : "穩健") + "。" +
      " 若要改遊戲：輸出 JSON：" +
      "{\"say\":\"2-6句旁白或對話\",\"behavior\":\"ignore|help|quest_hint|gift|hostile\",\"worldActions\":[...],\"memoryNote\":\"一句\"}。" +
      " worldActions 可用：open_branch{title,hint,loc}, spawn_event{text,choices:[{label,result,favor,gold,worldActions}]}, side_hook{title,hint}, set_flag{flag}, unlock_map{loc}, move_npc{npcId,to}, summon_here{npcId}, add_item{item,n}, gold{amount}, renown{amount}, favor_delta{amount,npcId}, loc_mood{mood}, alter_quest{questId,step}。" +
      " 旗標僅限白名單。勿一次性大改；單次 worldActions ≤" + (settings.aiMaxActions || 6) + "。";
  }

  function offlineWorldDirector(mode, text) {
    const loc = LOCATIONS.find(function(l){ return l.id === S.loc; }) || { name: "此地", desc: "" };
    const sayAct = mode === "action";
    let say = sayAct
      ? ("你在" + loc.name + "試着" + trunc(text, 36) + "。")
      : ("你在" + loc.name + "說：「" + trunc(text, 36) + "」。");
    const acts = [];
    const level = plotAgencyLevel();
    // keyword offline agency
    if (/懸賞|懸賞令|告示|傳聞|消息/.test(text)) {
      acts.push({ type: "side_hook", title: "牆頭告示", hint: "有人貼了告示，或許可查。" });
      say += "\n牆角確有一張半舊告示，字跡被雨洇開。";
    }
    if (/尋人|找人|請.*來|叫.*來|邀/.test(text) && level >= 2) {
      const partners = (typeof listDatingPartners === "function" ? listDatingPartners() : []).concat(
        Object.keys(S.fates || {}).filter(function(id){ return /ally|sworn|master|muse|married|teacher/.test(S.fates[id]); })
      );
      const uniq = [];
      partners.forEach(function(id){ if (uniq.indexOf(id) < 0 && NPCS[id]) uniq.push(id); });
      if (uniq.length) {
        const pick = uniq[Math.floor(Math.random() * uniq.length)];
        acts.push({ type: "summon_here", npcId: pick });
        say += "\n不多時，" + NPCS[pick].name + "聞訊而至。";
      }
    }
    if (/支線|線索|秘密|陰謀|竊聽/.test(text) && level >= 2) {
      acts.push({ type: "open_branch", title: trunc(loc.name + "暗線", 12), hint: "你嗅到不尋常的氣息。" });
      say += "\n你隱約抓住一絲異常——也許值得追查。";
    }
    if (/採藥|搜刮|尋寶|撿|翻找/.test(text)) {
      if (Math.random() < 0.45) {
        acts.push({ type: "add_item", item: "herb", n: 1 });
        say += "\n意外採得止血草。";
      } else say += "\n四下空空，只剩風聲。";
    }
    if (/施捨|救|幫忙|行俠/.test(text)) {
      acts.push({ type: "renown", amount: 1 });
      if (typeof adjustKarma === "function") adjustKarma(1, "路人善舉");
      say += "\n路人投來感激目光。";
    }
    if (/威脅|搶|恐嚇|砸/.test(text)) {
      acts.push({ type: "renown", amount: -1 });
      if (typeof adjustKarma === "function") adjustKarma(-2, "生事");
      say += "\n四周氣氛驟冷，有人去報官的樣子。";
    }
    if (/氣氛|心情|雨|月色|夜/.test(text)) {
      acts.push({ type: "loc_mood", mood: /雨/.test(text) ? "細雨" : (/月/.test(text) ? "月朗" : "沉鬱") });
    }
    if (level >= 3 && Math.random() < 0.18 && S.aiEventDay !== S.day) {
      acts.push({
        type: "spawn_event",
        text: loc.name + "忽然一陣喧嘩——有人爭執，有人圍觀。",
        choices: [
          { label: "上前調停", result: "你上前調停，雙方散去。", favor: 0, gold: 0, worldActions: [{ type: "renown", amount: 1 }] },
          { label: "冷眼旁觀", result: "你袖手旁觀，喧嘩自息。", worldActions: [] },
          { label: "趁亂摸走錢袋", result: "得手，但心裡發虛。", gold: 8, worldActions: [{ type: "karma_delta", amount: -2 }] }
        ]
      });
    }
    return sanitizeAiResult({
      say: say,
      behavior: acts.some(function(a){ return a.type === "add_item"; }) ? "gift" : "ignore",
      worldActions: acts,
      memoryNote: "場景離線導演"
    }, null);
  }

  async function aiWorldDirector(mode, text) {
    if (!settings.deepseekKey) return offlineWorldDirector(mode, text);
    const user = JSON.stringify({
      player: S.name,
      mode: mode,
      utterance: text,
      loc: S.loc,
      locMood: S.locMood || null,
      presentNpcs: (typeof npcAtLocation === "function" ? npcAtLocation(S.loc) : []).map(function(id){
        return { id: id, name: NPCS[id] && NPCS[id].name };
      }),
      world: JSON.parse(contextBlob()),
      agency: settings.plotAgency,
      openBranches: Object.keys(S.aiBranches || {}).filter(function(k){ return S.aiBranches[k] && !S.aiBranches[k].done; }).slice(0, 5)
    });
    const raw = await deepseekChat(worldDirectorPrompt(), user, 750);
    if (!raw) return offlineWorldDirector(mode, text);
    const parsed = parseAiJson(raw);
    if (parsed) {
      const r = sanitizeAiResult(parsed, null);
      if (!r.worldActions && parsed.worldActions) r.worldActions = parsed.worldActions;
      if (!r.say) r.say = offlineWorldDirector(mode, text).say;
      return r;
    }
    return sanitizeAiResult({ say: trunc(raw, 420), behavior: "ignore", worldActions: [], memoryNote: "導演非JSON" }, null);
  }

  // Richer free-text at location when 0 NPCs, and optional director assist when many
  const _bindWorldFreeInputOrig_v13 = bindWorldFreeInput;
  bindWorldFreeInput = function() {
    _bindWorldFreeInputOrig_v13();
    const btn = document.getElementById("btn-world-free");
    const inp = document.getElementById("world-free-input");
    if (!btn || !inp) return;
    const modeWrap = document.getElementById("world-mode");
    let wmode = "say";
    if (modeWrap) {
      modeWrap.querySelectorAll("[data-wmode]").forEach(function(b){
        const prev = b.onclick;
        b.onclick = function() {
          if (typeof prev === "function") prev();
          wmode = b.getAttribute("data-wmode") || wmode;
        };
      });
    }
    const prevClick = btn.onclick;
    btn.onclick = async function() {
      const text = (inp.value || "").trim();
      if (!text) return toast("請輸入", true);
      const present = typeof npcAtLocation === "function" ? npcAtLocation(S.loc) : [];
      // If no one present → full world director (AI or offline)
      if (!present.length) {
        btn.disabled = true;
        let pack;
        try { pack = await aiWorldDirector(wmode, text); }
        catch (e) { pack = offlineWorldDirector(wmode, text); }
        btn.disabled = false;
        inp.value = "";
        const note = applyWorldMutation(null, pack);
        showStory((pack.say || "") + (note ? "\n" + note : ""));
        try { saveGameSilent(); } catch (e2) {}
        setTimeout(function(){ try { flushPendingAiUi(); render(); } catch (e3) {} }, 100);
        return;
      }
      // If someone present, keep NPC path but allow director spice when agency high & AI on
      if (typeof prevClick === "function") {
        await prevClick();
        if (settings.deepseekKey && plotAgencyLevel() >= 2 && Math.random() < 0.22 && S.aiEventDay !== S.day) {
          // soft ambient hook without blocking
          try {
            const ambi = await aiWorldDirector("action", "（環境餘波，勿搶主對話）玩家剛與在場之人交流：" + trunc(text, 40));
            if (ambi && ambi.worldActions && ambi.worldActions.length) {
              const n = applyWorldMutation(null, { worldActions: ambi.worldActions.filter(function(a){
                const t = String(a.type || "").toLowerCase();
                return /side_hook|loc_mood|open_branch|set_flag|unlock_map/.test(t);
              }).slice(0, 2) });
              if (n) toast("場景餘波" + n, true);
            }
          } catch (e4) {}
        }
      }
    };
  };

  // Proactive bond + dating contact
  function listBondContactIds() {
    const out = [];
    Object.keys(S.fates || {}).forEach(function(id){
      const f = S.fates[id];
      if (!NPCS[id]) return;
      if (f === "dead" || f === "vanished") return;
      if (/ally|sworn|master|muse|married|teacher|partner|apprentice|host|promoted/.test(f)) out.push(id);
    });
    if (typeof listDatingPartners === "function") {
      listDatingPartners().forEach(function(id){ if (out.indexOf(id) < 0) out.push(id); });
    }
    return out;
  }

  async function bondPingLine(npcId) {
    const name = NPCS[npcId] ? NPCS[npcId].name : npcId;
    const fate = S.fates[npcId] || "ally";
    if (!settings.deepseekKey) {
      const pool = [
        name + "托人捎話：「近日可安？有空回趟" + ((LOCATIONS.find(function(l){return l.id===NPCS[npcId].loc;})||{}).name || "原處") + "。」",
        name + "來信：「想起你當日所言，忽然想聽聽近況。」",
        name + "：「江湖不平——若你願，我可助一臂。」"
      ];
      return pool[Math.floor(Math.random() * pool.length)];
    }
    const sys = "你是「" + name + "」（命運:" + fate + "）。繁體中文。寫意主動聯繫玩家（來信／邀約／警告／送物暗示）。只輸出一句，勿JSON，勿金庸IP。";
    const raw = await deepseekChat(sys, "玩家=" + S.name + " 日=" + S.day + " 地=" + S.loc, 100);
    return raw ? trunc(String(raw).replace(/^["「]|["」]$/g, "").trim(), 120) : (name + "來信問候。");
  }

  const _maybeLoverInitiativeOrig_v13 = maybeLoverInitiative;
  maybeLoverInitiative = async function(reason) {
    ensureAiPlotSettings();
    if (!settings.proactiveNpc) return false;
    // First try dating path
    let hit = false;
    try { hit = await _maybeLoverInitiativeOrig_v13(reason); } catch (e) { hit = false; }
    if (hit) return true;
    // Bond contacts when agency allows
    try {
      if (plotAgencyLevel() < 1) return false;
      if (S.bondPingDay === S.day) return false;
      const pool = listBondContactIds().filter(function(id){
        if (typeof isDating === "function" && isDating(id)) return false; // dating handled above
        const last = (S.bondPing && S.bondPing[id]) || 0;
        return last === 0 || (S.day - last >= 3);
      });
      if (!pool.length) return false;
      let chance = 0.1;
      if (reason === "day") chance = 0.2;
      else if (reason === "camp") chance = 0.24;
      else if (reason === "travel") chance = 0.08;
      if (settings.deepseekKey) chance += 0.06;
      if (plotAgencyLevel() >= 3) chance += 0.08;
      if (Math.random() > chance) return false;
      const pick = pool[Math.floor(Math.random() * pool.length)];
      if (!S.bondPing) S.bondPing = {};
      S.bondPingDay = S.day;
      S.bondPing[pick] = S.day;
      setFlag("ai_bonded_ping");
      const line = await bondPingLine(pick);
      const name = NPCS[pick].name;
      // optionally move them here on high agency
      let moved = "";
      if (plotAgencyLevel() >= 2 && Math.random() < 0.35) {
        moved = applyWorldAiAction(pick, { type: "summon_here", npcId: pick });
      }
      openModal(
        "<div class=\"dating-sheet lover-initiative\">" +
        "<div class=\"initiative-banner\">羈絆來信・" + escapeHtml(name) + "</div>" +
        (typeof chibiHtml === "function" ? chibiHtml(pick, "lg") : "") +
        "<div class=\"story-box\" style=\"margin-top:8px\">" + escapeHtml(line) + (moved ? "\n" + moved : "") + "</div>" +
        "<div class=\"btn-row\" style=\"margin-top:10px\">" +
        "<button class=\"btn primary\" id=\"bond-talk\">去對話</button>" +
        "<button class=\"btn ghost\" id=\"bond-later\">稍後</button>" +
        "</div></div>"
      );
      const bt = document.getElementById("bond-talk");
      if (bt) bt.onclick = function() {
        closeModal();
        if (typeof talkNpc === "function") talkNpc(pick);
         
        else showStory(name + "：「" + line + "」");
      };
      const later = document.getElementById("bond-later");
      if (later) later.onclick = function(){ closeModal(); toast(name + "的訊息已記下", true); };
      try { saveGameSilent(); } catch (e2) {}
      return true;
    } catch (err) {
      console.warn("bond initiative", err);
      return false;
    }
  };

  // UI: AI plot panel entry on map "更多"
  function openAiPlotBoard() {
    ensureAiPlotState();
    const branches = Object.keys(S.aiBranches || {}).map(function(k){ return S.aiBranches[k]; }).filter(Boolean);
    let html = "<h3>劇情板・AI</h3>";
    html += "<p class=\"small\">自由度：" + escapeHtml(settings.plotAgency || "high") +
      " ・ " + (settings.deepseekKey ? "DeepSeek 已接入" : "離線導演") + "</p>";
    if (S.locMood) html += "<p class=\"small\">此地氣氛：" + escapeHtml(S.locMood) + "</p>";
    html += "<h4 style=\"margin-top:8px\">進行中支線</h4>";
    if (!branches.length) html += "<p class=\"small\">暫無 AI 開出的支線。自由輸入「打聽傳聞／尋人」可觸發。</p>";
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
    html += "<div class=\"btn-row\" style=\"margin-top:10px\">" +
      "<button class=\"btn\" id=\"ai-plot-settings\">AI 設定</button>" +
      "<button class=\"btn ghost\" onclick=\"closeModal()\">關閉</button></div>";
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
    if (st) st.onclick = function(){ showSettings(); };
  }

  // Inject button into location actions if possible
  const _locationActionsOrig_v13 = typeof locationActions === "function" ? locationActions : null;
  if (_locationActionsOrig_v13) {
    locationActions = function(locId) {
      const acts = _locationActionsOrig_v13(locId) || [];
      acts.push({
        id: "ai_plot_board",
        label: "【劇情板】AI 支線",
        run: function(){ openAiPlotBoard(); }
      });
      return acts;
    };
  }

  // Status line on talk sheet
  function aiStatusLine() {
    ensureAiPlotSettings();
    if (!settings.deepseekKey) return "離線導演（記憶仍會保存）";
    return "DeepSeek・" + (settings.model || "pro") + "・自由度" + (settings.plotAgency || "high");
  }

  // Expand dating AI to emit worldActions lightly
  if (typeof datingAiRespond === "function") {
    const _datingAiRespondOrig = datingAiRespond;
    datingAiRespond = async function(npcId, mode, text) {
      const pack = await _datingAiRespondOrig(npcId, mode, text);
      // If AI returned JSON with worldActions inside say parse — already handled in parseDatingAi usually not
      // Soft: high intimacy + ask visit → summon
      if (pack && /來|見|過來|身邊|同行/.test(text) && plotAgencyLevel() >= 2 && Math.random() < 0.4) {
        const n = applyWorldAiAction(npcId, { type: "summon_here", npcId: npcId });
        if (n) pack.say = (pack.say || "") + "\n" + n;
      }
      return pack;
    };
  }

  // Autorun smoke
  window.__JH_AUTORUN_V13 = function() {
    ensureAiPlotSettings();
    ensureAiPlotState();
    const prevKey = settings.deepseekKey;
    settings.deepseekKey = ""; // force offline path
    settings.plotAgency = "sandbox";
    settings.thinking = "auto";
    settings.proactiveNpc = true;
    saveSettings();
    const loaded = JSON.parse(localStorage.getItem(SETTINGS_KEY) || "{}");
    const persistOk = loaded.plotAgency === "sandbox" && loaded.thinking === "auto" && loaded.proactiveNpc === true;

    S.loc = "qingcheng";
    S.day = Math.max(1, S.day || 1);
    const off = offlineWorldDirector("say", "打聽懸賞告示並尋找線索");
    const note1 = applyWorldMutation(null, off);
    const branchOk = Object.keys(S.aiBranches || {}).length > 0 || /鉤子|支線|告示/.test(note1 + (off.say || ""));

    const off2 = offlineWorldDirector("action", "採藥翻找");
    applyWorldMutation(null, off2);

    // summon path
    if (NPCS.tongxiaoliu) {
      S.fates.tongxiaoliu = "ally";
      const n = applyWorldAiAction("tongxiaoliu", { type: "summon_here", npcId: "tongxiaoliu" });
      var summonOk = NPCS.tongxiaoliu.loc === S.loc && !!n;
    } else var summonOk = true;

    applyWorldAiAction(null, { type: "set_flag", flag: "ai_branch_open" });
    applyWorldAiAction(null, { type: "renown", amount: 1 });
    applyWorldAiAction(null, { type: "gold", amount: 3 });
    applyWorldAiAction(null, { type: "loc_mood", mood: "市井嘈雜" });

    const lvl = plotAgencyLevel();
    const thinkPro = thinkingResolved("deepseek-v4-pro") === true;
    const thinkFlashAuto = (function(){
      const old = settings.thinking; settings.thinking = "auto";
      const r = thinkingResolved("deepseek-flash"); settings.thinking = old; return r === false;
    })();

    const keyCheck = validateDeepseekKey("sk-abcdefghijklmnopqrstuvwxyz123456");
    const keyBad = validateDeepseekKey("short");

    settings.deepseekKey = prevKey;
    saveSettings();

    const ok = !!(persistOk && branchOk && summonOk && lvl === 3 && thinkPro && thinkFlashAuto && keyCheck.ok && !keyBad.ok && typeof showSettings === "function" && typeof aiWorldDirector === "function");
    return {
      ok: ok,
      persistOk: persistOk,
      branchOk: branchOk,
      summonOk: summonOk,
      agency: settings.plotAgency,
      thinkPro: thinkPro,
      thinkFlashAuto: thinkFlashAuto,
      flags: !!(S.flags && S.flags.ai_branch_open),
      mood: S.locMood || null,
      hooks: (S.aiSideHooks || []).length,
      branches: Object.keys(S.aiBranches || {}).length
    };
  };

  if (window.__JH_DEBUG) {
    Object.assign(window.__JH_DEBUG, {
      applyWorldAiAction: applyWorldAiAction,
      applyWorldMutation: applyWorldMutation,
      offlineWorldDirector: offlineWorldDirector,
      aiWorldDirector: aiWorldDirector,
      openAiPlotBoard: openAiPlotBoard,
      testDeepseekConnection: testDeepseekConnection,
      plotAgencyLevel: plotAgencyLevel,
      validateDeepseekKey: validateDeepseekKey,
      aiStatusLine: aiStatusLine
    });
  }

  // ========== END V13 ==========
