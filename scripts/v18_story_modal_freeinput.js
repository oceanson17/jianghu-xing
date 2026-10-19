// ========== V18: 節令／故事彈窗 自擬說做 + 設定捷徑 ==========
  // Festival / rumor / favor / craft / schedule modals: keep fixed choices,
  // add free-text 說話／行動 + shortcut to 設定・作弊台.
  // DeepSeek + offline fallback → worldActions / courtActions mutate state.
  // Homage only. 寫意：禁血腥色情細節。

  function v18Trunc(s, n) {
    s = String(s || "");
    return s.length > n ? s.slice(0, n) + "…" : s;
  }

  function v18FestOffline(mode, text, ctx) {
    const sayAct = mode === "action";
    let say = sayAct
      ? ("你在節令人群裡" + v18Trunc(text, 40) + "。")
      : ("你說：「" + v18Trunc(text, 40) + "」。");
    const actsC = [];
    const actsW = [];
    const festName = (ctx && ctx.title) || "節令";
    if (/賞燈|觀燈|湊熱鬧|參與|拜|祭|划船|登高|圍爐|吃|喝|玩/.test(text)) {
      actsW.push({ type: "renown", amount: 1 });
      actsW.push({ type: "gold", amount: 5 });
      actsC.push({ type: "prestige", amount: 1 });
      say += "\n眾人讓過一隙，你這回真湊進了熱鬧。";
      if (typeof advanceTimeSlot === "function") {
        try { advanceTimeSlot(1); } catch (e0) {}
      }
      if (S.festivalState) {
        S.festivalState.joined = S.festivalState.joined || {};
        const fid = (ctx && ctx.festId) || S.festivalState.lastId || "fest";
        S.festivalState.joined[fid] = (S.festivalState.joined[fid] || 0) + 1;
      }
      if (typeof applyCraftGain === "function") {
        try { applyCraftGain({ commerce: 2, letters: 1 }); } catch (e1) {}
      }
    } else if (/偷|搶|摸|趁亂|敲詐|栽贓|陷害/.test(text)) {
      actsC.push({ type: "heat", amount: 3 });
      actsC.push({ type: "karma", amount: -2 });
      actsW.push({ type: "gold", amount: 12 });
      say += "\n你趁亂動手——得了便宜，也留下痕跡。";
      if (typeof applyCraftGain === "function") {
        try { applyCraftGain({ scheming: 4 }); } catch (e2) {}
      }
    } else if (/贈|送|施捨|救|幫|仗義/.test(text)) {
      actsC.push({ type: "karma", amount: 2 });
      actsC.push({ type: "prestige", amount: 2 });
      actsW.push({ type: "side_hook", title: festName + "・善緣", hint: v18Trunc(text, 28) });
      say += "\n有人記住了你的好意。";
    } else if (/打聽|問|查|線索|傳聞/.test(text)) {
      actsW.push({ type: "side_hook", title: festName + "・耳語", hint: v18Trunc(text, 28) });
      actsW.push({ type: "spawn_event", text: "燈影裡有人低語：" + v18Trunc(text, 24) });
      say += "\n你多問了一句，心裡多了一條線。";
    } else if (/跪|請安|賀|陛下|聖上|貴妃|娘娘/.test(text)) {
      actsC.push({ type: "favor_delta", amount: 2, emperor: /陛|聖|皇/.test(text) });
      actsC.push({ type: "prestige", amount: 2 });
      say += "\n禮數周全，旁人點頭。";
    } else if (/罵|嗆|砸|鬧|搗亂/.test(text)) {
      actsC.push({ type: "scorn", favor: 2, heat: 2 });
      actsC.push({ type: "prestige", amount: -2 });
      say += "\n氣氛一僵，巡夜的目光掃過來。";
    } else {
      actsC.push({ type: "prestige", amount: 1 });
      actsW.push({ type: "renown", amount: 1 });
      say += "\n節令如水，你這一舉一動都被人看在眼裡。";
    }
    return {
      say: say,
      behavior: "help",
      courtActions: actsC,
      worldActions: actsW,
      memoryNote: "節令自擬・離線"
    };
  }

  async function interpretStoryFreeText(mode, text, ctx) {
    ctx = ctx || {};
    const kind = ctx.kind || "story";
    if (kind === "festival" && !settings.deepseekKey) {
      return v18FestOffline(mode, text, ctx);
    }
    if (typeof interpretEventFreeText === "function") {
      const pack = await interpretEventFreeText(mode, text, ctx);
      if (kind === "festival" && pack && (!pack.courtActions || !pack.courtActions.length) && (!pack.worldActions || !pack.worldActions.length)) {
        const off = v18FestOffline(mode, text, ctx);
        pack.courtActions = off.courtActions;
        pack.worldActions = off.worldActions;
        if (!pack.say) pack.say = off.say;
      }
      return pack;
    }
    if (kind === "festival") return v18FestOffline(mode, text, ctx);
    if (typeof offlineEventFree === "function") return offlineEventFree(mode, text, ctx);
    return { say: "（未能裁決）", courtActions: [], worldActions: [] };
  }

  /** Shared panel: 說／做 + 自擬提交 + 設定捷徑 */
  function mountStoryFreePanel(ctx, opt) {
    opt = opt || {};
    const pref = opt.prefix || ("sf" + String(Math.floor(Math.random() * 1e6)));
    const modeId = pref + "-mode";
    const inputId = pref + "-input";
    const sendId = pref + "-send";
    const cheatId = pref + "-cheat";
    const ph = opt.placeholder || "輸入你想說的話或想做的行為…";
    const label = opt.label || "或不選上方按鈕，自擬你想說／想做的：";
    const html =
      "<div class=\"panel story-free-panel\" style=\"margin-top:10px\" data-v18-free=\"1\">" +
      "<p class=\"small\">" + (typeof escapeHtml === "function" ? escapeHtml(label) : label) + "</p>" +
      "<div class=\"btn-row\" id=\"" + modeId + "\" style=\"margin-bottom:4px\">" +
      "<button type=\"button\" class=\"btn primary\" data-sfmode=\"say\">說</button>" +
      "<button type=\"button\" class=\"btn\" data-sfmode=\"action\">做</button></div>" +
      "<textarea class=\"input area\" id=\"" + inputId + "\" rows=\"2\" placeholder=\"" +
      (typeof escapeHtml === "function" ? escapeHtml(ph) : ph) + "\"></textarea>" +
      "<div class=\"btn-row\" style=\"margin-top:6px\">" +
      "<button type=\"button\" class=\"btn primary\" id=\"" + sendId + "\">自擬提交</button>" +
      "<button type=\"button\" class=\"btn\" id=\"" + cheatId + "\">⚙ 設定・作弊</button></div>" +
      "<p class=\"small\" style=\"opacity:.75\">有 DeepSeek Key 時由 AI 演繹；否則離線裁決。可真改好感／銀兩／威望／任務等。</p></div>";
    return {
      html: html,
      bind: function() {
        let emode = "say";
        const wrap = document.getElementById(modeId);
        if (wrap) {
          wrap.querySelectorAll("[data-sfmode]").forEach(function(b) {
            b.onclick = function() {
              emode = b.getAttribute("data-sfmode") || "say";
              wrap.querySelectorAll("[data-sfmode]").forEach(function(x) { x.classList.remove("primary"); });
              b.classList.add("primary");
            };
          });
        }
        const cheatBtn = document.getElementById(cheatId);
        if (cheatBtn) {
          cheatBtn.onclick = function() {
            if (typeof openCheatConsole === "function") openCheatConsole();
            else if (typeof toast === "function") toast("設定台未就緒", true);
          };
        }
        const btn = document.getElementById(sendId);
        const inp = document.getElementById(inputId);
        if (!btn || !inp) return;
        btn.onclick = async function() {
          const text = (inp.value || "").trim();
          if (!text) {
            if (typeof toast === "function") toast("請輸入", true);
            return;
          }
          btn.disabled = true;
          btn.textContent = "裁決中…";
          let pack;
          try {
            pack = await interpretStoryFreeText(emode, text, ctx);
          } catch (e) {
            pack = (ctx && ctx.kind === "festival")
              ? v18FestOffline(emode, text, ctx)
              : (typeof offlineEventFree === "function" ? offlineEventFree(emode, text, ctx) : { say: String(e), courtActions: [], worldActions: [] });
          }
          let note = "";
          if (typeof applyEventFreeResult === "function") {
            note = await applyEventFreeResult(pack, ctx);
          } else {
            if (typeof applyNpcMutation === "function") note += applyNpcMutation(ctx && ctx.npcId || null, pack) || "";
            if (typeof applyWorldMutation === "function") note += applyWorldMutation(ctx && ctx.npcId || null, pack) || "";
            try { if (typeof saveGameSilent === "function") saveGameSilent(); } catch (e3) {}
          }
          if (typeof closeModal === "function") closeModal();
          const head = (ctx && ctx.kind === "festival")
            ? ("【節令自擬・" + ((ctx && ctx.title) || "") + "】\n")
            : "【自擬言行】\n";
          if (typeof showStory === "function") {
            showStory(head + (pack.say || "") + (note ? "\n" + note : ""));
          }
          setTimeout(function() {
            try { if (typeof flushPendingAiUi === "function") flushPendingAiUi(); } catch (e4) {}
            try { if (typeof render === "function") render(); } catch (e5) {}
          }, 80);
        };
      }
    };
  }

  // Enhance mountEventFreeUi: add 設定捷徑 without breaking existing binds
  if (typeof mountEventFreeUi === "function") {
    const _mountEventFreeUi_v18 = mountEventFreeUi;
    mountEventFreeUi = function(parentHtmlExtras, ctx) {
      const r = _mountEventFreeUi_v18(parentHtmlExtras, ctx);
      if (r && r.html && r.html.indexOf("設定・作弊") < 0) {
        r.html = r.html.replace(
          /(<button type=\"button\" class=\"btn primary\" id=\"ev-free-send\">自擬提交<\/button>)(<\/div><\/div>)/,
          "$1<button type=\"button\" class=\"btn\" id=\"ev-free-cheat\">⚙ 設定・作弊</button>$2"
        );
        const oldBind = r.bind;
        r.bind = function() {
          if (typeof oldBind === "function") oldBind();
          const c = document.getElementById("ev-free-cheat");
          if (c) {
            c.onclick = function() {
              if (typeof openCheatConsole === "function") openCheatConsole();
            };
          }
        };
      }
      return r;
    };
  }

  function v18InjectIfMissing(body, panel) {
    if (!body || !panel) return;
    if (body.querySelector && body.querySelector("[data-v18-free], #ev-free-input, .story-free-panel")) return;
    const wrap = document.createElement("div");
    wrap.innerHTML = panel.html;
    body.appendChild(wrap);
    panel.bind();
  }

  // ---- Wrap openFestivalUI ----
  const _openFestivalUI_v18 = typeof openFestivalUI === "function" ? openFestivalUI : null;
  if (_openFestivalUI_v18) {
    openFestivalUI = function() {
      const fest = typeof currentFestival === "function" ? currentFestival() : null;
      if (!fest) {
        if (typeof showStory === "function") {
          showStory("今日無節令。每旬自有上元、清明、端午、中秋、重陽、冬至輪轉。");
        }
        return;
      }
      if (typeof ensureComplexityState === "function") ensureComplexityState();
      let html = "<h3>節令・" + escapeHtml(fest.name) + "</h3>";
      html += "<div class=\"story-box\">" + escapeHtml(fest.blurb) + "</div>";
      html += "<p class=\"small\">可選固定行動，或在下方自擬說話／行動；亦可用「設定」強改局勢。</p>";
      html += "<div class=\"btn-row\" style=\"flex-direction:column;gap:8px\">";
      html += "<button type=\"button\" class=\"btn primary\" id=\"fest-join\">參與節令（耗一時辰）</button>";
      html += "<button type=\"button\" class=\"btn\" id=\"fest-scheme\">趁亂行事（權謀／風險）</button>";
      html += "<button type=\"button\" class=\"btn ghost\" onclick=\"closeModal()\">離開</button></div>";
      const free = mountStoryFreePanel(
        { title: fest.name, text: fest.blurb, kind: "festival", festId: fest.id },
        { prefix: "fest", placeholder: "例如：我混入燈市打聽誰在換面……／上前向某官賀節……", label: "自擬節令言行（AI／離線裁決，可真改狀態）：" }
      );
      html += free.html;
      openModal(html);
      const j = document.getElementById("fest-join");
      if (j) {
        j.onclick = function() {
          closeModal();
          if (typeof advanceTimeSlot === "function") advanceTimeSlot(1);
          S.festivalState = S.festivalState || { joined: {} };
          S.festivalState.joined = S.festivalState.joined || {};
          S.festivalState.joined[fest.id] = (S.festivalState.joined[fest.id] || 0) + 1;
          S.renown = (S.renown || 0) + 1;
          S.gold = (S.gold || 0) + 5 + Math.floor(Math.random() * 10);
          if (typeof applyCraftGain === "function") applyCraftGain({ commerce: 2, letters: 1 });
          if (Math.random() < 0.35 && typeof NPCS !== "undefined") {
            const npcIds = Object.keys(NPCS).filter(function(id) {
              return NPCS[id].loc === S.loc || (fest.locs || []).indexOf(NPCS[id].loc) >= 0;
            });
            if (npcIds.length) {
              const nid = npcIds[Math.floor(Math.random() * npcIds.length)];
              if (typeof addFavorDebt === "function") addFavorDebt(nid, 1, fest.name + "同席", "credit");
              showStory("【" + fest.name + "】你與" + NPCS[nid].name + "同席一敘，對方欠你一分人情。\n獲薄禮與聲望。");
              return;
            }
          }
          showStory("【" + fest.name + "】你湊了回熱鬧，懷裡多了些碎銀與傳聞。");
        };
      }
      const sbtn = document.getElementById("fest-scheme");
      if (sbtn) {
        sbtn.onclick = function() {
          closeModal();
          if (typeof advanceTimeSlot === "function") advanceTimeSlot(1);
          if (typeof applyCraftGain === "function") applyCraftGain({ scheming: 5 });
          if (Math.random() < 0.45) {
            S.gold = (S.gold || 0) + 25;
            S.palaceHeat = (S.palaceHeat || 0) + 3;
            if (typeof adjustKarma === "function") adjustKarma(-2, "節令趁亂");
            showStory("【" + fest.name + "・亂】你摸到一筆外財——也留下痕跡。");
          } else {
            S.hp = Math.max(1, (S.hp || 1) - 8);
            showStory("【" + fest.name + "・亂】你被巡夜撞見，捱了一頓，空手而歸。");
          }
        };
      }
      free.bind();
    };
  }

  // ---- Wrap openRumorBoardV2 ----
  const _openRumorBoardV2_v18 = typeof openRumorBoardV2 === "function" ? openRumorBoardV2 : null;
  if (_openRumorBoardV2_v18) {
    openRumorBoardV2 = function() {
      _openRumorBoardV2_v18();
      setTimeout(function() {
        const body = document.getElementById("modal-body");
        if (!body) return;
        const rum = (S.activeRumors && S.activeRumors[0]) || null;
        const fest = typeof currentFestival === "function" ? currentFestival() : null;
        const free = mountStoryFreePanel(
          {
            title: rum ? rum.title : "江湖榜・傳聞",
            text: rum ? rum.text : (fest ? fest.blurb : "市井傳聞"),
            kind: "rumor",
            questId: rum && rum.id
          },
          { prefix: "rum", placeholder: "例如：我追問燈下換面之人……／放出假消息混淆視聽……", label: "對傳聞／懸賞自擬言行：" }
        );
        v18InjectIfMissing(body, free);
      }, 20);
    };
  }

  // ---- Wrap openFavorLedgerUI ----
  const _openFavorLedgerUI_v18 = typeof openFavorLedgerUI === "function" ? openFavorLedgerUI : null;
  if (_openFavorLedgerUI_v18) {
    openFavorLedgerUI = function() {
      _openFavorLedgerUI_v18();
      setTimeout(function() {
        const body = document.getElementById("modal-body");
        if (!body) return;
        const free = mountStoryFreePanel(
          { title: "人情帳", text: "了結或斡旋人情", kind: "favor" },
          { prefix: "fav", placeholder: "例如：我願用一件信物抵債……／請對方寬限十日……", label: "自擬人情處置：" }
        );
        v18InjectIfMissing(body, free);
      }, 20);
    };
  }

  // ---- Wrap openCraftUI / openScheduleUI lightly ----
  const _openCraftUI_v18 = typeof openCraftUI === "function" ? openCraftUI : null;
  if (_openCraftUI_v18) {
    openCraftUI = function() {
      _openCraftUI_v18();
      setTimeout(function() {
        const body = document.getElementById("modal-body");
        if (!body) return;
        const free = mountStoryFreePanel(
          { title: "技藝潛修", text: "按時辰修行或自擬修煉", kind: "craft" },
          { prefix: "crf", placeholder: "例如：我閉關專修權謀……／向書吏請教文墨……", label: "自擬修煉言行：" }
        );
        v18InjectIfMissing(body, free);
      }, 20);
    };
  }

  const _openScheduleUI_v18 = typeof openScheduleUI === "function" ? openScheduleUI : null;
  if (_openScheduleUI_v18) {
    openScheduleUI = function() {
      _openScheduleUI_v18();
      setTimeout(function() {
        const body = document.getElementById("modal-body");
        if (!body) return;
        const free = mountStoryFreePanel(
          { title: "時辰", text: typeof timeSlotLabel === "function" ? timeSlotLabel() : "", kind: "schedule" },
          { prefix: "sch", placeholder: "例如：我趁黃昏溜出宮門……／深夜去茶寮聽壁……", label: "自擬此時要做的事：" }
        );
        v18InjectIfMissing(body, free);
      }, 20);
    };
  }

  // Favor debt / call-in modals: patch resolveFavorEntry's cash-short modal via maybeFavorCallIn wrap
  const _maybeFavorCallIn_v18 = typeof maybeFavorCallIn === "function" ? maybeFavorCallIn : null;
  if (_maybeFavorCallIn_v18) {
    maybeFavorCallIn = function() {
      const hit = _maybeFavorCallIn_v18();
      if (hit) {
        setTimeout(function() {
          const body = document.getElementById("modal-body");
          if (!body) return;
          const free = mountStoryFreePanel(
            { title: "討債人到", text: "舊日人情", kind: "favor_call" },
            { prefix: "fcc", placeholder: "例如：我答應三日內連本帶利奉還……", label: "自擬回應：" }
          );
          v18InjectIfMissing(body, free);
        }, 20);
      }
      return hit;
    };
  }

  // Generic: after showStory for longer narrative (optional soft inject once per open)
  // Skip — 「知道了」記事不必每次都加輸入框，避免打擾。

  window.__JH_V18_SELFTEST = function() {
    const hadKey = !!(settings && settings.deepseekKey);
    if (settings) settings.deepseekKey = "";
    // force a festival day: offset 1 every 30 → day 1
    const day0 = S.day;
    S.day = 1;
    if (typeof ensureComplexityState === "function") ensureComplexityState();
    const fest = typeof currentFestival === "function" ? currentFestival() : null;
    const okFest = !!(fest && fest.id === "shangyuan");
    let pack = v18FestOffline("say", "我要賞燈並打聽換面之人", { title: fest && fest.name, festId: fest && fest.id, kind: "festival" });
    const okActs = !!(pack.worldActions && pack.worldActions.length);
    const gold0 = S.gold || 0;
    if (typeof applyEventFreeResult === "function") {
      // sync apply
    }
    if (typeof applyWorldMutation === "function") {
      applyWorldMutation(null, pack);
    }
    const okMut = (S.gold || 0) >= gold0 || okActs;
    const wrapped = openFestivalUI !== _openFestivalUI_v18;
    const hasPanel = typeof mountStoryFreePanel === "function";
    // UI smoke: open festival and look for free input
    let uiOk = false;
    try {
      if (typeof openFestivalUI === "function") openFestivalUI();
      const inp = document.getElementById("fest-input");
      const cheat = document.getElementById("fest-cheat");
      uiOk = !!(inp && cheat);
      if (typeof closeModal === "function") closeModal();
    } catch (e) {
      uiOk = false;
    }
    S.day = day0;
    if (settings) settings.deepseekKey = hadKey ? settings.deepseekKey : settings.deepseekKey;
    return {
      ok: okFest && okActs && wrapped && hasPanel && uiOk,
      okFest: okFest,
      festName: fest && fest.name,
      okActs: okActs,
      okMut: okMut,
      wrapped: wrapped,
      uiOk: uiOk,
      say: pack.say
    };
  };

  if (window.__JH_DEBUG) {
    Object.assign(window.__JH_DEBUG, {
      mountStoryFreePanel: mountStoryFreePanel,
      interpretStoryFreeText: interpretStoryFreeText,
      v18FestOffline: v18FestOffline,
      v18self: window.__JH_V18_SELFTEST
    });
  }

  // ========== END V18 ==========
