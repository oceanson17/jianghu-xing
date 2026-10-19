// ========== V22: 關押釋放作弊＋說話／行動欄設定入口 ==========
  // Homage only. Fix: 「設定」放人須完整清除 prison／captivity；對話欄加設定捷徑。

  const V22_HARD_JAIL = { tianlao: 1, yongxing_shi: 1, xingbu_prison: 1 };

  /** Thorough clear of all captivity / prison state. */
  function clearPlayerCaptivity(opts) {
    opts = opts || {};
    const was = S.prison;
    const by = was && was.by;
    const cell = was ? String(was.cellName || was.name || "") : "";
    const prevLoc = S.loc;
    S.prison = null;
    try {
      if (typeof hasItem === "function" && hasItem("cell_key") && typeof removeItem === "function") {
        removeItem("cell_key", (S.inv && S.inv.cell_key) || 1);
      }
    } catch (e0) {}
    try {
      if (S.flags && typeof S.flags === "object") {
        delete S.flags.punished_prison;
      }
    } catch (e1) {}
    S.courtImprisonBias = 0;
    // relocate out of locked jail cells
    let dest = opts.to || opts.loc || null;
    if (dest && typeof LOCATIONS !== "undefined" && LOCATIONS.some(function(l){ return l.id === dest; })) {
      S.loc = dest;
    } else if (V22_HARD_JAIL[S.loc] || /黑牢|天牢|用刑|慎刑|牢房|禁閉/.test(cell)) {
      if (V22_HARD_JAIL[S.loc]) S.loc = "jingji";
      else if (/東廠|廠牢/.test(cell) || prevLoc === "dongchang") S.loc = opts.stayDongchang ? "dongchang" : "jingji";
      else if (V22_HARD_JAIL[prevLoc]) S.loc = "jingji";
    }
    if (by && typeof ensureNpcMem === "function") {
      try {
        const m = ensureNpcMem(by);
        m.mood = opts.mood || "敬畏";
        if (typeof m.trust === "number" && opts.pardon) m.trust = Math.min(40, m.trust + 2);
      } catch (e2) {}
    }
    if (opts.emperor || opts.pardon) {
      try {
        if (typeof bumpEmperorFavor === "function") bumpEmperorFavor(Math.min(10, Number(opts.favor) || 4), "特赦／放人");
        else S.emperorFavor = (S.emperorFavor || 0) + 4;
      } catch (e3) {}
    }
    if (!opts.skipSave) {
      try { if (typeof saveGameSilent === "function") saveGameSilent(); } catch (e4) {}
    }
    return opts.msg || "鎖鏈卸下，你重獲自由。";
  }

  // Strengthen isImprisoned: any prison blob counts
  if (typeof isImprisoned === "function") {
    isImprisoned = function() {
      const p = S.prison;
      if (!p || typeof p !== "object") return false;
      return !!(p.by || p.place || p.cellName || p.name || p.dayLocked != null || p.day != null);
    };
  }

  // Strengthen releasePrison → full clear
  if (typeof releasePrison === "function") {
    const _releasePrison_v22 = releasePrison;
    releasePrison = function(reasonText, opts) {
      opts = opts || {};
      const msg = clearPlayerCaptivity(Object.assign({}, opts, {
        skipSave: true,
        msg: reasonText || "你重獲自由。"
      }));
      if (typeof adjustKarma === "function") {
        try {
          if (opts.mercy) adjustKarma(1, "獲釋悔過");
          else if (opts.villainBribe) adjustKarma(-2, "賄逃");
          else if (opts.breakout) adjustKarma(-1, "越獄");
          else if (opts.escapeKill) adjustKarma(-3, "逃後殺心");
        } catch (ek) {}
      }
      try { if (typeof saveGameSilent === "function") saveGameSilent(); } catch (e5) {}
      return msg || reasonText || "你重獲自由。";
    };
  }

  function v22IsReleaseCmd(text) {
    const t = String(text || "");
    return /放人|釋放|開釋|特赦|出獄|放我|放你|放.*?走|放.*?出|親來.*放|叫.*放|令.*放|赦.*放|不再關|清.*關押|解除關押|釋放玩家|free.?prison|release.?prison|pardon/i.test(t);
  }

  function v22IsEmperorPardon(text) {
    const t = String(text || "");
    return /皇帝|聖旨|景安|特赦|親來|欽差|詔/.test(t);
  }

  // Patch applyCheatAction: release / free / pardon
  if (typeof applyCheatAction === "function") {
    const _applyCheatAction_v22 = applyCheatAction;
    applyCheatAction = function(action, srcNote) {
      if (!action || typeof action !== "object") return _applyCheatAction_v22(action, srcNote);
      const t = String(action.type || action.action || "").toLowerCase();
      if (t === "release_prison" || t === "free_player" || t === "clear_captivity" ||
          t === "release" || t === "pardon" || t === "parole_free" || t === "unjail") {
        const imprisoned = typeof isImprisoned === "function" ? isImprisoned() : !!(S.prison);
        if (!imprisoned && !action.force) {
          return "（你並未被關押）";
        }
        const msg = clearPlayerCaptivity({
          emperor: !!(action.emperor || action.pardon),
          pardon: !!(action.pardon || action.emperor),
          to: action.to || action.loc || null,
          favor: action.favor,
          mood: action.mood,
          stayDongchang: !!action.stayDongchang,
          msg: action.msg
        });
        return "（已釋放・關押旗清除）" + (msg ? "" : "");
      }
      // also treat court-style release
      if (t === "court_release" || t === "imperial_pardon") {
        clearPlayerCaptivity({ emperor: true, pardon: true, to: action.to || "jingji" });
        return "（聖恩開釋）";
      }
      return _applyCheatAction_v22(action, srcNote);
    };
  }

  // Offline keyword: 放人／皇帝親來放人
  if (typeof offlineCheatInterpret === "function") {
    const _offlineCheatInterpret_v22 = offlineCheatInterpret;
    offlineCheatInterpret = function(text) {
      const t = String(text || "").trim();
      const pack = _offlineCheatInterpret_v22(text);
      if (v22IsReleaseCmd(t)) {
        const acts = (pack.cheatActions || []).slice();
        const emperor = v22IsEmperorPardon(t);
        acts.unshift({
          type: "release_prison",
          emperor: emperor,
          pardon: emperor,
          to: /東廠|廠/.test(t) && !/離開|京畿|出/.test(t) ? null : (emperor ? "jingji" : null)
        });
        if (emperor) {
          acts.push({ type: "emperor_favor", amount: 5 });
          pack.say = "聖駕／特旨傳至。看守戰慄下跪，當即開鎖放人。你重獲自由。";
        } else {
          pack.say = (pack.say && pack.cheatActions && pack.cheatActions.length)
            ? (pack.say + " 關押已解除。")
            : "門鎖鬆開，你被釋放。關押狀態已清除。";
        }
        pack.cheatActions = acts;
        pack.behavior = "help";
      }
      return pack;
    };
  }

  // AI prompt: whitelist release types + prison context
  if (typeof cheatSystemPrompt === "function") {
    const _cheatSystemPrompt_v22 = cheatSystemPrompt;
    cheatSystemPrompt = function() {
      return _cheatSystemPrompt_v22() +
        " 另增：release_prison{emperor?,pardon?,to?}／free_player／clear_captivity／pardon — 用於「放人／釋放／皇帝親來放人／開釋」；必須真清 S.prison。" +
        " 玩家若正被關押，放人指令務必帶 release_prison。";
    };
  }

  if (typeof aiCheatInterpret === "function") {
    const _aiCheatInterpret_v22 = aiCheatInterpret;
    aiCheatInterpret = async function(text) {
      // enrich: always merge offline release if command is release-like
      let pack;
      try { pack = await _aiCheatInterpret_v22(text); }
      catch (e) { pack = offlineCheatInterpret(text); }
      if (v22IsReleaseCmd(text)) {
        const off = offlineCheatInterpret(text);
        const acts = [].concat((pack && pack.cheatActions) || [], off.cheatActions || []);
        const hasRel = acts.some(function(a){
          const ty = String((a && (a.type || a.action)) || "").toLowerCase();
          return /release_prison|free_player|clear_captivity|pardon|unjail|court_release|imperial_pardon/.test(ty);
        });
        if (!hasRel) acts.unshift({ type: "release_prison", emperor: v22IsEmperorPardon(text), pardon: v22IsEmperorPardon(text) });
        pack = pack || {};
        pack.cheatActions = acts.slice(0, 10);
        if (!pack.say || /未能|忽略|不理解/.test(String(pack.say))) pack.say = off.say;
      }
      return pack;
    };
  }

  // Safety net: after cheat pack, if release cmd but still imprisoned → force clear
  if (typeof applyCheatPack === "function") {
    const _applyCheatPack_v22 = applyCheatPack;
    applyCheatPack = function(pack, rawCmd) {
      const out = _applyCheatPack_v22(pack, rawCmd);
      if (v22IsReleaseCmd(rawCmd) && typeof isImprisoned === "function" && isImprisoned()) {
        const n = applyCheatAction({ type: "release_prison", emperor: v22IsEmperorPardon(rawCmd), pardon: v22IsEmperorPardon(rawCmd), force: true });
        out.note = (out.note || "") + n;
        if (!out.say || /未能/.test(out.say)) out.say = "關押已強制解除。";
        try { if (typeof saveGameSilent === "function") saveGameSilent(); } catch (e) {}
      }
      return out;
    };
  }

  // Court AI can also release
  if (typeof applyCourtAiAction === "function") {
    const _applyCourtAiAction_v22 = applyCourtAiAction;
    applyCourtAiAction = function(npcId, action) {
      if (action && typeof action === "object") {
        const t = String(action.type || action.action || "").toLowerCase();
        if (t === "release_prison" || t === "free_player" || t === "pardon" || t === "release_player") {
          clearPlayerCaptivity({
            emperor: !!(action.emperor || npcId === "jingandi" || action.pardon),
            pardon: !!action.pardon,
            to: action.to || action.loc || null
          });
          return "（獲釋）";
        }
      }
      return _applyCourtAiAction_v22(npcId, action);
    };
  }

  // Talk sheet: 說話／行動欄加「設定」
  if (typeof talkNpc === "function") {
    const _talkNpc_v22 = talkNpc;
    talkNpc = async function(npcId) {
      const ret = await _talkNpc_v22(npcId);
      setTimeout(function() {
        try {
          if (document.getElementById("btn-talk-cheat")) return;
          const primary = document.querySelector(".composer-primary");
          const actions = document.querySelector(".composer-actions");
          const host = primary || actions;
          if (!host) return;
          const b = document.createElement("button");
          b.type = "button";
          b.className = "btn primary";
          b.id = "btn-talk-cheat";
          b.textContent = "⚙ 設定";
          b.title = "作弊台：輸入指令真改遊戲（含放人）";
          b.onclick = function(ev) {
            try { if (ev && ev.stopPropagation) ev.stopPropagation(); } catch (e0) {}
            if (typeof openCheatConsole === "function") openCheatConsole();
            else if (typeof toast === "function") toast("設定台未就緒", true);
          };
          host.appendChild(b);
          // hint when imprisoned
          if (typeof isImprisoned === "function" && isImprisoned()) {
            const composer = document.querySelector(".composer");
            if (composer && !document.getElementById("prison-cheat-hint")) {
              const p = document.createElement("p");
              p.className = "small";
              p.id = "prison-cheat-hint";
              p.style.cssText = "margin:6px 0 0;color:#c9a227";
              p.textContent = "⛓ 關押中：可按「⚙ 設定」輸入「皇帝親來放人」等指令強制釋放。";
              composer.appendChild(p);
            }
          }
        } catch (e) { console.warn("v22 talk cheat btn", e); }
      }, 0);
      return ret;
    };
  }

  // Event free UI: bake 設定 into mountEventFreeUi html
  if (typeof mountEventFreeUi === "function") {
    const _mountEventFreeUi_v22 = mountEventFreeUi;
    mountEventFreeUi = function(parentHtmlExtras, ctx) {
      const r = _mountEventFreeUi_v22(parentHtmlExtras, ctx);
      if (r && r.html && r.html.indexOf("設定") < 0) {
        r.html = r.html.replace(
          /(<button type=\"button\" class=\"btn primary\" id=\"ev-free-send\">自擬提交<\/button>)(<\/div><\/div>)/,
          "$1<button type=\"button\" class=\"btn\" id=\"ev-free-cheat\">⚙ 設定</button>$2"
        );
        const oldBind = r.bind;
        r.bind = function() {
          if (typeof oldBind === "function") oldBind();
          const c = document.getElementById("ev-free-cheat");
          if (c) c.onclick = function() {
            if (typeof openCheatConsole === "function") openCheatConsole();
          };
        };
      }
      return r;
    };
  }

  // Cheat console examples include 放人
  if (typeof openCheatConsole === "function") {
    const _openCheatConsole_v22 = openCheatConsole;
    openCheatConsole = function() {
      _openCheatConsole_v22();
      setTimeout(function() {
        try {
          const ex = document.getElementById("cheat-examples");
          const inp = document.getElementById("cheat-input");
          if (ex) {
            ex.onclick = function() {
              if (!inp) return;
              if (typeof isImprisoned === "function" && isImprisoned()) inp.value = "皇帝親來叫他放人";
              else inp.value = "皇帝升玩家為大太監";
            };
          }
          if (inp && typeof isImprisoned === "function" && isImprisoned()) {
            inp.placeholder = "例：皇帝親來叫他放人　／　釋放玩家　／　特赦開釋";
          }
          const body = document.getElementById("modal-body");
          if (body && typeof isImprisoned === "function" && isImprisoned() && !document.getElementById("cheat-prison-tip")) {
            const tip = document.createElement("p");
            tip.id = "cheat-prison-tip";
            tip.className = "small";
            tip.style.cssText = "color:#c9a227;margin-top:8px";
            tip.textContent = "偵測到關押中：輸入「皇帝親來叫他放人」或「釋放玩家」可完整清除關押旗。";
            body.appendChild(tip);
          }
        } catch (e) {}
      }, 0);
    };
  }

  window.__JH_V22_SELFTEST = function() {
    if (!S) return { ok: false, err: "no S" };
    const bak = { prison: S.prison, loc: S.loc, favor: S.emperorFavor, flags: S.flags ? Object.assign({}, S.flags) : {} };
    S.prison = { by: "dongchang_gong", place: "dongchang", cellName: "東廠黑牢", dayLocked: S.day || 1, guardAlert: 2 };
    S.loc = "dongchang";
    const pack = offlineCheatInterpret("皇帝親來叫他放人");
    const out = applyCheatPack(pack, "皇帝親來叫他放人");
    const still = typeof isImprisoned === "function" ? isImprisoned() : !!S.prison;
    const ok = !still && S.prison == null;
    // restore
    S.prison = bak.prison;
    S.loc = bak.loc;
    S.emperorFavor = bak.favor;
    return {
      ok: ok,
      stillImprisoned: still,
      note: out && out.note,
      say: out && out.say,
      hasClearFn: typeof clearPlayerCaptivity === "function",
      hasTalkPatch: typeof talkNpc === "function"
    };
  };

  window.__JH_V22 = {
    clearPlayerCaptivity: clearPlayerCaptivity,
    v22IsReleaseCmd: v22IsReleaseCmd
  };

  // ========== END V22 ==========
