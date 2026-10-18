  // ========== V9: 拍拖／戀人 AI 系統 ==========
  function ensureDatingState() {
    if (!S.datingLogs || typeof S.datingLogs !== "object") S.datingLogs = {};
    if (!S.datingAff || typeof S.datingAff !== "object") S.datingAff = {};
    if (!S.loverPing || typeof S.loverPing !== "object") S.loverPing = {};
    if (typeof S.loverPingDay !== "number") S.loverPingDay = 0;
    if (typeof S.loverDateQuest !== "object") S.loverDateQuest = null;
  }
  function isDating(npcId) {
    if (!npcId || !NPCS[npcId]) return false;
    const f = S.fates[npcId];
    if (f === "dead" || f === "vanished") return false;
    if (f === "married" || f === "muse" || f === "slave") return true;
    try {
      if (hasBondRole(npcId, "spouse") || hasBondRole(npcId, "muse") ||
          hasBondRole(npcId, "mad_muse") || hasBondRole(npcId, "slave")) return true;
    } catch (e) {}
    if (npcId === "dongchang_gong" && (flag("donggong_love") || flag("donggong_slave"))) return true;
    return false;
  }
  function listDatingPartners() {
    ensureDatingState();
    const ids = Object.keys(NPCS).filter(isDating);
    ids.sort((a, b) => (datingAffOf(b) - datingAffOf(a)) || String(a).localeCompare(String(b)));
    return ids;
  }
  function datingAffOf(npcId) {
    ensureDatingState();
    const v = S.datingAff[npcId];
    return typeof v === "number" ? Math.max(0, Math.min(100, v)) : 35;
  }
  function bumpDatingAff(npcId, delta) {
    ensureDatingState();
    if (!npcId || !delta) return datingAffOf(npcId);
    const next = Math.max(0, Math.min(100, datingAffOf(npcId) + delta));
    S.datingAff[npcId] = next;
    return next;
  }
  function pushDatingLog(npcId, who, text) {
    ensureDatingState();
    if (!S.datingLogs[npcId]) S.datingLogs[npcId] = [];
    const arr = S.datingLogs[npcId];
    arr.push({ who: who === "me" ? "me" : "npc", text: trunc(String(text || ""), 280), day: S.day, ts: Date.now() });
    while (arr.length > 40) arr.shift();
    return arr;
  }
  function datingDisplayName(npcId) {
    if (npcId === "dongchang_gong" && flag("donggong_truth_known")) return "玄梧";
    return NPCS[npcId] ? NPCS[npcId].name : npcId;
  }
  function onDatingStarted(npcId) {
    if (!npcId || !NPCS[npcId] || !isDating(npcId)) return;
    ensureDatingState();
    const hadAff = typeof S.datingAff[npcId] === "number";
    if (!hadAff) S.datingAff[npcId] = 40;
    const firstToast = !flag("dating_toast_" + npcId);
    setFlag("dating_unlocked", true);
    if (firstToast) {
      setFlag("dating_toast_" + npcId, true);
      if (!S.datingLogs[npcId] || !S.datingLogs[npcId].length) {
        pushDatingLog(npcId, "npc", "……從今日起，你我之間，便不只是江湖交情了。");
      }
      toast("你與" + datingDisplayName(npcId) + "的拍拖系統已開啟", true);
    }
    try { saveGameSilent(); } catch (e) {}
  }
  function datingRecentBlob(npcId) {
    ensureDatingState();
    return (S.datingLogs[npcId] || []).slice(-8).map(e =>
      (e.who === "me" ? "我" : datingDisplayName(npcId)) + "：" + e.text
    ).join("\n");
  }
  function datingSystemPrompt(npcId) {
    const npc = NPCS[npcId];
    const prof = npcProfile(npcId);
    const mem = ensureNpcMem(npcId);
    let secret = "";
    if (npcId === "dongchang_gong") {
      if (flag("donggong_truth_known") || flag("donggong_confessed")) {
        secret = "已知身世：真名玄梧，景安帝失散幼弟；可溫柔亦忌諱泄漏給外人。";
      } else {
        secret = "表面仍是東廠督公；未揭身世前絕不可自稱皇弟／玄梧／靖王。對戀人可軟化但仍冷血口音。";
      }
      if (flag("donggong_slave")) secret += " 已立廠奴墨契，可自稱奴／心腹。";
    }
    return [
      "你是「江湖行」戀人 NPC「" + datingDisplayName(npcId) + "」（" + (npc.title || "") + "）。繁體中文。",
      "性格：" + (prof.label || "") + "／" + (prof.personality || "") + "。寫意親密，忌低俗露骨，忌金庸原著人名門派。",
      "親密度=" + datingAffOf(npcId) + "/100；信任=" + mem.trust + "；命運=" + (S.fates[npcId] || "") +
        "；羈絆=" + (typeof bondSummary === "function" ? bondSummary(npcId) : ""),
      "玩家：" + S.name + "（" + (S.gender === "女" || S.gender === "female" ? "女" : "男") +
        "）日=" + S.day + " 地=" + S.loc,
      secret,
      "只輸出 JSON：{\"say\":\"對白\",\"mood\":\"情緒\",\"initiative\":false,\"giftHint\":\"\",\"affectionDelta\":-2到3的整數}。say 1-4句。",
      "記得近期密語與記憶；可吃醋、邀約、送小物暗示；勿破第四牆。"
    ].join("\n");
  }
  function offlineDatingReply(npcId, mode, text) {
    const name = datingDisplayName(npcId);
    const p = (npcProfile(npcId).personality || "proud");
    const t = String(text || "");
    const aff = datingAffOf(npcId);
    const soft = /送花|擁抱|約會|想你|喜歡|愛|牽手|吻|溫柔|鬥嘴|撒嬌|見面/.test(t) || mode === "action";
    let delta = soft ? 1 : 0;
    if (/對不起|道歉|想你/.test(t)) delta = 1;
    if (/騙|背叛|厭|滾|分手/.test(t)) delta = -2;
    let say;
    if (p === "proud") say = soft ? name + "耳尖微紅：「……別在人前這般。今晚月色不錯，可陪你走走。」" : name + "：「有話便說。我聽着。」";
    else if (p === "ruthless") say = soft ? name + "低聲：「對你……我收起刀。別讓旁人看見。」" : name + "：「說。」";
    else if (p === "healer") say = soft ? name + "握着你的脈：「心動得太快。先喝碗安神湯……我在。」" : name + "：「累了就歇。我聽。」";
    else if (p === "merciful") say = soft ? name + "笑：「善緣難得。今晚為你留一盞燈。」" : name + "：「說吧，我聽着。」";
    else if (p === "cunning") say = soft ? name + "眨眨眼：「哦？你這招比刀還狠。我記下了。」" : name + "：「有趣。繼續。」";
    else if (p === "timid") say = soft ? name + "小聲：「真、真的嗎……那我、我也想你。」" : name + "：「我、我在聽……」";
    else if (p === "lawful") say = soft ? name + "正色又軟下來：「公私兩分。此刻……我只是你的人。」" : name + "：「請講。」";
    else say = name + "：「……嗯。」";
    if (aff >= 70 && soft) say += "\n（親密度高漲，目光再也藏不住。）";
    if (/約會|見面|來找/.test(t)) say += "\n「若你來我常在之處，我等你。」";
    try {
      const h = memoryHint(npcId);
      if (h && Math.random() < 0.35) say += "\n「還記得——" + trunc(h, 36) + "」";
    } catch (e) {}
    return { say: say, mood: soft ? "心動" : "平靜", initiative: false, giftHint: "", affectionDelta: delta };
  }
  function parseDatingAi(raw, npcId, mode, text) {
    const j = parseAiJson(raw);
    if (!j) {
      const plain = trunc(String(raw || "").trim(), 420);
      if (plain) return { say: plain, mood: "平靜", initiative: false, giftHint: "", affectionDelta: 0 };
      return offlineDatingReply(npcId, mode, text);
    }
    let delta = parseInt(j.affectionDelta, 10);
    if (isNaN(delta)) delta = 0;
    delta = Math.max(-2, Math.min(3, delta));
    return {
      say: trunc(String(j.say || j.reply || ""), 420) || offlineDatingReply(npcId, mode, text).say,
      mood: trunc(String(j.mood || "平靜"), 24),
      initiative: !!j.initiative,
      giftHint: trunc(String(j.giftHint || ""), 60),
      affectionDelta: delta
    };
  }
  async function datingAiRespond(npcId, mode, text) {
    const mem = ensureNpcMem(npcId);
    const user = JSON.stringify({
      player: S.name,
      mode: mode || "say",
      utterance: text,
      affection: datingAffOf(npcId),
      recentDating: datingRecentBlob(npcId),
      memory: { trust: mem.trust, mood: mem.mood, rel: mem.rel, summary: (mem.summary || []).slice(-4) },
      world: JSON.parse(contextBlob()),
      companion: S.companion === npcId
    });
    if (!settings.deepseekKey) return offlineDatingReply(npcId, mode, text);
    const raw = await deepseekChat(datingSystemPrompt(npcId), user, 420);
    if (!raw) return offlineDatingReply(npcId, mode, text);
    return parseDatingAi(raw, npcId, mode, text);
  }
  function renderDatingThread(npcId) {
    ensureDatingState();
    const logs = S.datingLogs[npcId] || [];
    if (!logs.length) return "<p class='small dating-empty'>尚無密語。說句話開始吧。</p>";
    return logs.map(e => {
      const cls = e.who === "me" ? "dating-bubble me" : "dating-bubble npc";
      const who = e.who === "me" ? "你" : datingDisplayName(npcId);
      return "<div class=\"" + cls + "\"><span class=\"dating-who\">" + escapeHtml(who) +
        " · D" + e.day + "</span><div>" + escapeHtml(e.text) + "</div></div>";
    }).join("");
  }
  function refreshDatingChatUi(npcId) {
    const thread = document.getElementById("dating-thread");
    const affEl = document.getElementById("dating-aff");
    if (thread) {
      thread.innerHTML = renderDatingThread(npcId);
      thread.scrollTop = thread.scrollHeight;
    }
    if (affEl) {
      const a = datingAffOf(npcId);
      affEl.innerHTML = "親密度 <b>" + a + "</b><i style=\"width:" + a + "%\"></i>";
    }
  }
  function openDatingHub() {
    const partners = listDatingPartners();
    if (!partners.length) return toast("尚未與任何人拍拖", true);
    let html = "<div class=\"dating-sheet\"><h3>♥ 戀人</h3><p class=\"small\">可同時維繫多條情線。點選進入密語。</p><div class=\"dating-partner-list\">";
    partners.forEach(id => {
      const a = datingAffOf(id);
      html += "<button type=\"button\" class=\"dating-partner-row\" data-date=\"" + id + "\">" +
        chibiHtml(id, "md") +
        "<div class=\"dating-partner-meta\"><strong>" + escapeHtml(datingDisplayName(id)) +
        "</strong> <span class=\"badge heart-badge\">戀人</span>" +
        "<div class=\"small\">" + escapeHtml(NPCS[id].title || "") + " · 親密度 " + a +
        (S.companion === id ? " · 同行中" : "") + "</div></div></button>";
    });
    html += "</div><div class=\"btn-row\" style=\"margin-top:10px\"><button class=\"btn ghost\" onclick=\"closeModal()\">關閉</button></div></div>";
    openModal(html);
    document.querySelectorAll("[data-date]").forEach(btn => {
      btn.onclick = () => openDatingChat(btn.getAttribute("data-date"));
    });
  }
  function openDatingChat(npcId, opts) {
    opts = opts || {};
    if (!isDating(npcId)) return toast("尚未與對方拍拖", true);
    ensureDatingState();
    onDatingStarted(npcId);
    const npc = NPCS[npcId];
    const aff = datingAffOf(npcId);
    if (opts.prependNpcLine) pushDatingLog(npcId, "npc", opts.prependNpcLine);
    openModal("<div class=\"talk-sheet dating-mode dating-sheet\">" +
      "<div class=\"talk-header\"><div class=\"talk-head-row\">" +
      chibiHtml(npcId, "lg") +
      "<div class=\"talk-head-text\"><h3>" + escapeHtml(datingDisplayName(npcId)) +
      " <span class=\"badge heart-badge\">戀人</span></h3>" +
      "<p class=\"small\">" + escapeHtml(npc.title || "") + " · " + fateLabel(S.fates[npcId]) +
      (bondSummary(npcId) ? " · " + bondSummary(npcId) : "") + "</p>" +
      "<div class=\"dating-aff-meter\" id=\"dating-aff\">親密度 <b>" + aff + "</b><i style=\"width:" + aff + "%\"></i></div>" +
      "</div></div></div>" +
      "<div class=\"talk-scroll dating-thread\" id=\"dating-thread\">" + renderDatingThread(npcId) + "</div>" +
      "<div class=\"composer\">" +
      "<div class=\"seg tabs\" id=\"dating-mode\">" +
      "<button type=\"button\" class=\"btn primary\" data-dmode=\"say\">密語</button>" +
      "<button type=\"button\" class=\"btn\" data-dmode=\"action\">行動</button></div>" +
      "<textarea class=\"input area composer-input\" id=\"dating-input\" rows=\"2\" enterkeyhint=\"send\" placeholder=\"想對戀人說的話…\"></textarea>" +
      "<div class=\"intent-chips\" id=\"dating-chips\"></div>" +
      "<div class=\"composer-primary\">" +
      "<button type=\"button\" class=\"btn primary\" id=\"btn-dating-send\">送出</button>" +
      (canInviteCompanion(npcId) ? "<button type=\"button\" class=\"btn\" id=\"btn-dating-companion\">邀戀人同行</button>" : "") +
      "<button type=\"button\" class=\"btn ghost\" id=\"btn-dating-back\">返回列表</button>" +
      "<button type=\"button\" class=\"btn ghost composer-leave\" id=\"btn-dating-leave\">告辭</button>" +
      "</div>" +
      "<p class=\"ai-tag\" id=\"dating-status\">" + (settings.deepseekKey ? "DeepSeek 戀人模式" : "離線戀人模式") + "</p>" +
      "</div></div>");
    let mode = "say";
    document.querySelectorAll("#dating-mode [data-dmode]").forEach(btn => {
      btn.onclick = () => {
        mode = btn.getAttribute("data-dmode");
        document.querySelectorAll("#dating-mode [data-dmode]").forEach(b => b.classList.toggle("primary", b === btn));
        const inp = document.getElementById("dating-input");
        if (inp) inp.placeholder = mode === "action" ? "想做的親密行動…" : "想對戀人說的話…";
      };
    });
    const chips = [
      ["想你", "say", "這幾日很想你"],
      ["送花", "action", "送上一束野花"],
      ["擁抱", "action", "上前輕輕擁抱對方"],
      ["鬥嘴", "say", "故意嘴硬跟你鬥兩句"],
      ["約會", "say", "今晚可願與我私下見面？"],
      ["安心", "say", "無論江湖如何，我都在"]
    ];
    const wrap = document.getElementById("dating-chips");
    if (wrap) {
      wrap.innerHTML = chips.map(c =>
        "<button type=\"button\" class=\"chip-btn\" data-cmode=\"" + c[1] +
        "\" data-ctext=\"" + c[2].replace(/"/g, "&quot;") + "\">" + c[0] + "</button>"
      ).join("");
      wrap.querySelectorAll(".chip-btn").forEach(btn => {
        btn.onclick = () => {
          mode = btn.getAttribute("data-cmode");
          document.querySelectorAll("#dating-mode [data-dmode]").forEach(b => {
            b.classList.toggle("primary", b.getAttribute("data-dmode") === mode);
          });
          const inp = document.getElementById("dating-input");
          if (inp) { inp.value = btn.getAttribute("data-ctext"); inp.focus(); }
        };
      });
    }
    const freeInp = document.getElementById("dating-input");
    if (freeInp) bindComposerFocus(freeInp);
    const leave = document.getElementById("btn-dating-leave");
    if (leave) leave.onclick = () => closeModal();
    const back = document.getElementById("btn-dating-back");
    if (back) back.onclick = () => openDatingHub();
    const comp = document.getElementById("btn-dating-companion");
    if (comp) comp.onclick = () => { inviteCompanion(npcId); };
    document.getElementById("btn-dating-send").onclick = async () => {
      const inp = document.getElementById("dating-input");
      const st = document.getElementById("dating-status");
      const text = ((inp && inp.value) || "").trim();
      if (!text) return toast("請輸入", true);
      const btn = document.getElementById("btn-dating-send");
      if (btn) btn.disabled = true;
      if (st) st.textContent = "戀人回覆中…";
      pushDatingLog(npcId, "me", text);
      refreshDatingChatUi(npcId);
      if (inp) inp.value = "";
      let pack;
      try { pack = await datingAiRespond(npcId, mode, text); }
      catch (e) { pack = offlineDatingReply(npcId, mode, text); }
      bumpDatingAff(npcId, pack.affectionDelta || 0);
      pushDatingLog(npcId, "npc", pack.say);
      try {
        const m = ensureNpcMem(npcId);
        m.mood = pack.mood || m.mood;
        pushNpcMemory(npcId, {
          day: S.day, mode: mode, player: trunc(text, 80), reply: trunc(pack.say, 100),
          behavior: "help", intent: "dating", memoryNote: "密語・" + trunc(text, 24)
        });
      } catch (e) {}
      if (/約會|見面|見一面|私下/.test(text + pack.say)) {
        S.loverDateQuest = { npcId: npcId, loc: NPCS[npcId].loc || S.loc, day: S.day, done: false };
      }
      refreshDatingChatUi(npcId);
      if (st) st.textContent = "情緒：" + (pack.mood || "—") + " · 親密度 " + datingAffOf(npcId);
      if (btn) btn.disabled = false;
      try { saveGameSilent(); } catch (e) {}
      setTimeout(() => { try { freeInp && freeInp.focus(); } catch (e) {} }, 30);
    };
    setTimeout(() => {
      const thread = document.getElementById("dating-thread");
      if (thread) thread.scrollTop = thread.scrollHeight;
      try { freeInp && freeInp.focus(); } catch (e) {}
    }, 60);
  }
  function offlineLoverPing(npcId) {
    const name = datingDisplayName(npcId);
    const p = (npcProfile(npcId).personality || "proud");
    const aff = datingAffOf(npcId);
    const pool = {
      proud: [
        name + "來信：「今夜月色尚可。若你有空……便來。」",
        name + "托人捎話：「路上小心。別讓我等到煩。」",
        name + "：「我想見你。」"
      ],
      ruthless: [
        name + "忽然現身，刀未出鞘：「……想你了。別嚷。」",
        name + "丟來一包乾糧：「吃。別死在外面。」",
        name + "低語：「有人盯你。跟我走。」"
      ],
      healer: [
        name + "送來一碗湯：「聽說你奔波，先暖暖。」",
        name + "輕聲：「夢裡見你受傷……醒了就想確認你還在。」",
        name + "：「今夜診寮留燈，等你回來。」"
      ],
      merciful: [
        name + "：「善緣亦會思念。今晚可願聽我吹笛？」",
        name + "托童子送茶：「路上風大，喝一口再走。」",
        name + "：「若累了，回我身邊歇。」"
      ],
      cunning: [
        name + "壞笑着信：「猜我在哪？答對有獎。」",
        name + "：「外面有人傳你風流——是真是假，親自來解釋。」",
        name + "塞來半塊蜜餞：「甜的。想我時咬一口。」"
      ],
      timid: [
        name + "紙條字跡發抖：「你、你還記得我嗎……想見面。」",
        name + "躲在轉角：「我、我帶了點心……給你。」",
        name + "：「沒有你的日子好安靜……」"
      ],
      lawful: [
        name + "：「公務已畢。今夜私心——想見你。」",
        name + "：「巡邏路過，專程確認你無恙。」",
        name + "：「若你願，明日同行一程。」"
      ]
    };
    const lines = pool[p] || pool.proud;
    let line = lines[Math.floor(Math.random() * lines.length)];
    if (aff >= 75 && Math.random() < 0.4) line = name + "來訪，目光柔軟：「……就想確認你還在。」";
    if (S.companion === npcId && Math.random() < 0.5) line = name + "（同行）側身：「走了這許多路，今夜說說話？」";
    return line;
  }
  async function loverPingLine(npcId) {
    if (!settings.deepseekKey) return offlineLoverPing(npcId);
    const sys = "你是戀人 NPC「" + datingDisplayName(npcId) + "」。繁體中文。寫意主動聯繫玩家（來信／來訪／吃醋／提醒危險／送吃的／邀約）。只輸出一句短訊，勿 JSON，勿金庸IP。親密度" + datingAffOf(npcId) + "。";
    const user = "玩家=" + S.name + " 日=" + S.day + " 地=" + S.loc + " 近期：" + trunc(datingRecentBlob(npcId), 200);
    const raw = await deepseekChat(sys, user, 120);
    if (!raw) return offlineLoverPing(npcId);
    return trunc(String(raw).replace(/^["「]|["」]$/g, "").trim(), 120) || offlineLoverPing(npcId);
  }
  function tryCompleteLoverDate(locId) {
    ensureDatingState();
    const q = S.loverDateQuest;
    if (!q || q.done || !q.npcId) return false;
    if (q.loc && locId === q.loc && isDating(q.npcId)) {
      q.done = true;
      bumpDatingAff(q.npcId, 3);
      pushDatingLog(q.npcId, "npc", "你依約而來。對方眼底笑意藏不住：「……等很久了。」");
      toast(datingDisplayName(q.npcId) + "赴約成功・親密度＋", true);
      if (Math.random() < 0.45) addItem("herb", 1);
      try { saveGameSilent(); } catch (e) {}
      return true;
    }
    return false;
  }
  async function maybeLoverInitiative(reason) {
    try {
      ensureDatingState();
      const partners = listDatingPartners().filter(id => {
        const f = S.fates[id];
        return f !== "dead" && f !== "vanished";
      });
      if (!partners.length) return false;
      if (S.loverPingDay === S.day) return false;
      const eligible = partners.filter(id => {
        const last = S.loverPing[id] || 0;
        return last === 0 || (S.day - last >= 2);
      });
      if (!eligible.length) return false;
      let chance = 0.18;
      if (reason === "day") chance = 0.28;
      else if (reason === "travel") chance = 0.12;
      else if (reason === "combat") chance = 0.08;
      else if (reason === "idle") chance = 0.05;
      else if (reason === "camp") chance = 0.32;
      chance += Math.min(0.12, (S.luck || 5) * 0.01);
      const maxAff = Math.max.apply(null, eligible.map(datingAffOf));
      chance += Math.min(0.2, maxAff / 400);
      if (eligible.some(id => S.companion === id)) chance += 0.12;
      if (Math.random() > chance) return false;
      let total = 0;
      const weights = eligible.map(id => {
        const w = 10 + datingAffOf(id) + (S.companion === id ? 25 : 0);
        total += w;
        return w;
      });
      let r = Math.random() * total, pick = eligible[0];
      for (let i = 0; i < eligible.length; i++) {
        r -= weights[i];
        if (r <= 0) { pick = eligible[i]; break; }
      }
      S.loverPingDay = S.day;
      S.loverPing[pick] = S.day;
      const line = await loverPingLine(pick);
      pushDatingLog(pick, "npc", line);
      const name = datingDisplayName(pick);
      openModal("<div class=\"dating-sheet lover-initiative\">" +
        "<div class=\"initiative-banner\">♥ " + escapeHtml(name) + "來信／來訪</div>" +
        chibiHtml(pick, "lg") +
        "<div class=\"story-box\" style=\"margin-top:8px\">" + escapeHtml(line) + "</div>" +
        "<div class=\"btn-row\" style=\"margin-top:10px\">" +
        "<button class=\"btn primary\" id=\"lover-reply\">回覆密語</button>" +
        "<button class=\"btn\" id=\"lover-later\">稍後</button>" +
        "</div></div>");
      const rep = document.getElementById("lover-reply");
      if (rep) rep.onclick = () => openDatingChat(pick);
      const later = document.getElementById("lover-later");
      if (later) later.onclick = () => { closeModal(); toast(name + "的訊息已記入密語", true); };
      try { saveGameSilent(); } catch (e) {}
      return true;
    } catch (e) {
      console.warn("lover initiative", e);
      return false;
    }
  }
