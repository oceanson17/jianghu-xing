// ========== V24: 任務自動導航（一鍵前往／下一步／到達自動開 NPC・交付） ==========
  // Homage: 群俠傳式「追任務」；青梧原創。

  const QUEST_NPC_TARGETS = {
    side_child: { npc: null, note: "青城鎮找童小六（地點行動）" },
    side_cook: { npc: null, note: "京畿找孤燈婆婆／藥谷取草" },
    side_lei: { npc: null, note: "雷峰哨所查案" },
    side_chixia: { npc: null, note: "赤霞崖試劍" },
    side_donggong_shadow: { npc: "dongchang_gong", note: "東廠督公" },
    side_eunuch_revenge: { npc: "dongchang_gong", note: "東廠／宮牆追查" },
    side_palace_revenge: { npc: null, note: "皇宮／人牙子巷" },
    side_karma_good: { npc: null, note: "藥谷或蒼雲積善" },
    side_karma_evil: { npc: null, note: "京畿黑市線索" },
    side_hanxue: { npc: null, note: "太僕／沙漠／邊關" },
    lover_date: { npc: null, note: "赴約地點" }
  };

  function ensureQuestNavV24() {
    if (!S.questLog || typeof S.questLog !== "object") S.questLog = { filter: "active", lastFixDay: 0 };
    if (!S.questLog.focusId) S.questLog.focusId = null;
    if (!S.questNavPending || typeof S.questNavPending !== "object") S.questNavPending = null;
    if (typeof S.questNavAuto !== "boolean") S.questNavAuto = true;
  }

  function v24LocName(id) {
    if (!id) return "？";
    try {
      if (typeof locNameOf === "function") return locNameOf(id);
      const L = (typeof LOCATIONS !== "undefined" && LOCATIONS.find(function(l){ return l.id === id; }));
      return (L && L.name) || id;
    } catch (e) { return id; }
  }

  function v24NpcName(id) {
    if (!id) return "";
    try {
      const n = NPCS && NPCS[id];
      return (n && n.name) || id;
    } catch (e) { return id; }
  }

  function v24PickBestLoc(locs) {
    const arr = (locs || []).filter(Boolean);
    if (!arr.length) return null;
    // Prefer unlocked & not current
    let best = null;
    for (let i = 0; i < arr.length; i++) {
      const id = arr[i];
      const loc = (typeof LOCATIONS !== "undefined" && LOCATIONS.find(function(l){ return l.id === id; }));
      if (!loc) continue;
      let unlocked = true;
      try { if (typeof locUnlocked === "function") unlocked = !!locUnlocked(loc); } catch (e) {}
      if (!unlocked) continue;
      if (id === S.loc) { if (!best) best = id; continue; }
      return id;
    }
    return best || arr[0];
  }

  function v24RowFromId(qid) {
    if (!qid) return null;
    try {
      if (typeof listJournalQuests === "function") {
        const all = listJournalQuests("all").concat(listJournalQuests("active"));
        for (let i = 0; i < all.length; i++) {
          if (all[i] && all[i].id === qid) return all[i];
        }
      }
    } catch (e) {}
    // fallback from S.quests / court / folk
    if (S.quests && S.quests[qid]) {
      const q = S.quests[qid];
      const dh = (typeof detailedQuestHint === "function") ? detailedQuestHint(q) : { tip: q.hint || "", locs: q.loc ? [q.loc] : [] };
      return {
        id: qid, title: q.title || qid, cat: q.cat || "other", done: !!q.done, tip: dh.tip,
        locs: dh.locs || (q.loc ? [q.loc] : []), fromNpc: q.fromNpc || null, npc: q.fromNpc || null
      };
    }
    if (qid === "lover_date" && S.loverDateQuest) {
      return { id: "lover_date", title: "情緣・赴約", cat: "dating", tip: "赴約", locs: [S.loverDateQuest.loc], npc: S.loverDateQuest.npc || null };
    }
    try {
      if (typeof listActiveCourtQuestEntries === "function") {
        const c = listActiveCourtQuestEntries().find(function(x){ return x.id === qid; });
        if (c) return { id: c.id, title: "朝廷・" + c.title, cat: "court", tip: c.tip, locs: c.loc ? [c.loc] : [], npc: null };
      }
    } catch (e2) {}
    try {
      if (typeof CIV_QUESTS !== "undefined" && Array.isArray(CIV_QUESTS)) {
        const f = CIV_QUESTS.find(function(x){ return x.id === qid; });
        if (f) return { id: f.id, title: "民間・" + f.title, cat: "folk", tip: f.text, locs: f.loc ? [f.loc] : [], npc: f.npc };
      }
    } catch (e3) {}
    return null;
  }

  function resolveQuestNavTarget(rowOrId) {
    ensureQuestNavV24();
    const row = (typeof rowOrId === "string") ? v24RowFromId(rowOrId) : rowOrId;
    if (!row || row.done) return null;
    const locs = (row.locs && row.locs.length) ? row.locs.slice() : [];
    let npc = row.npc || row.fromNpc || null;
    let kind = "arrive";
    let tip = row.tip || "";

    if (row.cat === "court") {
      kind = "deliver";
      if (!locs.length && row.loc) locs.push(row.loc);
    } else if (row.cat === "folk") {
      kind = "folk";
      if (!npc) {
        try {
          const f = (typeof CIV_QUESTS !== "undefined" && CIV_QUESTS.find(function(x){ return x.id === row.id; }));
          if (f) { npc = f.npc; if (!locs.length && f.loc) locs.push(f.loc); }
        } catch (e) {}
      }
    } else if (row.cat === "dating" || row.id === "lover_date") {
      kind = "dating";
      if (S.loverDateQuest && S.loverDateQuest.npc) npc = S.loverDateQuest.npc;
    } else if (npc) {
      kind = "talk";
    } else if (QUEST_NPC_TARGETS[row.id] && QUEST_NPC_TARGETS[row.id].npc) {
      npc = QUEST_NPC_TARGETS[row.id].npc;
      kind = "talk";
    } else if (row.cat === "ai" && row.fromNpc) {
      npc = row.fromNpc;
      kind = "talk";
    }

    // Prefer current loc if already there among options
    let loc = null;
    if (locs.indexOf(S.loc) >= 0) loc = S.loc;
    else loc = v24PickBestLoc(locs);

    // If npc known and present elsewhere, prefer their location
    if (npc && NPCS && NPCS[npc] && NPCS[npc].loc) {
      const nloc = NPCS[npc].loc;
      if (!loc || (loc !== S.loc && nloc)) {
        // if quest locs empty or npc loc is in list / sole clue
        if (!locs.length || locs.indexOf(nloc) >= 0 || kind === "talk") {
          if (loc !== S.loc) loc = nloc;
        }
      }
    }

    const nextTip = tip || (QUEST_NPC_TARGETS[row.id] && QUEST_NPC_TARGETS[row.id].note) || "前往目標繼續";
    return {
      questId: row.id,
      title: row.title,
      cat: row.cat,
      loc: loc,
      locs: locs,
      npc: npc,
      kind: kind,
      tip: nextTip,
      alreadyHere: !!(loc && loc === S.loc)
    };
  }

  function v24FocusQuest(qid) {
    ensureQuestNavV24();
    S.questLog.focusId = qid || null;
    try { if (typeof saveGameSilent === "function") saveGameSilent(); } catch (e) {}
  }

  function v24TrackedNavTarget() {
    ensureQuestNavV24();
    if (S.questLog.focusId) {
      const t = resolveQuestNavTarget(S.questLog.focusId);
      if (t) return t;
    }
    // Prefer main → court → first active
    try {
      if (S.quests) {
        if (S.quests.main && !S.quests.main.done) return resolveQuestNavTarget("main");
        if (S.quests.main2 && !S.quests.main2.done && S.quests.main && S.quests.main.done) return resolveQuestNavTarget("main2");
        if (S.quests.main3 && !S.quests.main3.done && S.quests.main2 && S.quests.main2.done) return resolveQuestNavTarget("main3");
      }
      const court = (typeof listActiveCourtQuestEntries === "function") && listActiveCourtQuestEntries()[0];
      if (court) return resolveQuestNavTarget(court.id);
      if (typeof listJournalQuests === "function") {
        const act = listJournalQuests("active").filter(function(r){ return !r.done; })[0];
        if (act) return resolveQuestNavTarget(act);
      }
    } catch (e) {}
    return null;
  }

  function flushQuestNavPending() {
    ensureQuestNavV24();
    const p = S.questNavPending;
    if (!p) return false;
    if (p.loc && S.loc !== p.loc) return false; // not arrived yet
    S.questNavPending = null;
    const tip = p.tip || "";
    try { toast("導航・" + (p.title || "任務") + (tip ? "：" + String(tip).slice(0, 28) : ""), true); } catch (e) {}

    setTimeout(function() {
      try {
        if (p.kind === "deliver" && typeof completeCourtQuestAt === "function") {
          const aq = (typeof activeCourtQuest === "function") ? activeCourtQuest() : null;
          if (aq && aq.loc === S.loc) {
            openModal(
              "<h3>朝廷差遣・交付</h3>" +
              "<div class=\"story-box\">已抵達【" + v24LocName(S.loc) + "】。\n差遣：「" + escapeHtml(aq.title || "") + "」\n" +
              escapeHtml((aq.text || "").slice(0, 120)) + "</div>" +
              "<div class=\"btn-row\">" +
              "<button type=\"button\" class=\"btn primary\" id=\"qnav-deliver\">立即交付</button>" +
              "<button type=\"button\" class=\"btn ghost\" onclick=\"closeModal()\">稍後</button></div>"
            );
            const b = document.getElementById("qnav-deliver");
            if (b) b.onclick = function() {
              closeModal();
              completeCourtQuestAt(S.loc);
              try { render(); } catch (e2) {}
            };
            return;
          }
        }
        if (p.kind === "folk" && p.questId && typeof CIV_QUESTS !== "undefined") {
          const fq = CIV_QUESTS.find(function(x){ return x.id === p.questId; });
          if (fq && typeof openCivQuest === "function") {
            openCivQuest(fq);
            return;
          }
        }
        if ((p.kind === "talk" || p.kind === "dating") && p.npc && typeof talkNpc === "function") {
          // only if present or ignore presence for dating/ai
          let present = true;
          try {
            if (typeof npcAtLocation === "function") {
              const here = npcAtLocation(S.loc) || [];
              if (here.indexOf(p.npc) < 0 && NPCS[p.npc] && NPCS[p.npc].loc && NPCS[p.npc].loc !== S.loc) {
                present = false;
              }
            }
          } catch (e3) {}
          if (present || p.kind === "dating" || p.forceTalk) {
            talkNpc(p.npc);
            return;
          }
        }
        if (p.kind === "dating" && typeof tryCompleteLoverDate === "function") {
          tryCompleteLoverDate(S.loc);
        }
        // Default: show next-step story tip
        if (tip) {
          showStory("【任務導航・下一步】\n" + tip + "\n（地點：" + v24LocName(S.loc) + (p.npc ? " · 目標人物：" + v24NpcName(p.npc) : "") + "）");
        }
      } catch (err) {
        try { toast("導航後續動作失敗", true); } catch (e4) {}
      }
    }, 280);
    return true;
  }

  function navigateQuestAuto(rowOrId, opts) {
    opts = opts || {};
    ensureQuestNavV24();
    const target = resolveQuestNavTarget(rowOrId);
    if (!target) {
      toast("此任務暫無可導航目標", true);
      return false;
    }
    v24FocusQuest(target.questId);

    // Multiple locs: let player pick unless already here or forced loc
    if (!opts.loc && target.locs && target.locs.length > 1 && !target.alreadyHere && !opts.skipPick) {
      const unlocked = target.locs.filter(function(id) {
        try {
          const L = LOCATIONS.find(function(l){ return l.id === id; });
          return L && (typeof locUnlocked !== "function" || locUnlocked(L));
        } catch (e) { return true; }
      });
      if (unlocked.length > 1) {
        openModal(
          "<h3>選擇前往地點</h3>" +
          "<div class=\"story-box small\">任務：" + escapeHtml(target.title) + "\n下一步：" + escapeHtml(target.tip || "") + "</div>" +
          "<div class=\"btn-row\" style=\"flex-wrap:wrap;gap:6px\" id=\"qnav-pick-locs\">" +
          unlocked.map(function(id) {
            return "<button type=\"button\" class=\"btn" + (id === S.loc ? " primary" : "") + "\" data-qnav-loc=\"" + escapeHtml(id) + "\">" +
              escapeHtml(v24LocName(id)) + (id === S.loc ? "（此地）" : "") + "</button>";
          }).join("") +
          "</div>" +
          "<div class=\"btn-row\" style=\"margin-top:8px\"><button type=\"button\" class=\"btn ghost\" onclick=\"closeModal()\">取消</button></div>"
        );
        Array.prototype.forEach.call(document.querySelectorAll("[data-qnav-loc]"), function(btn) {
          btn.onclick = function() {
            const lid = btn.getAttribute("data-qnav-loc");
            closeModal();
            navigateQuestAuto(target.questId, { loc: lid, skipPick: true });
          };
        });
        return true;
      }
    }

    const dest = opts.loc || target.loc;
    if (!dest) {
      toast("尚未解鎖目標地，或無明確地點", true);
      if (target.tip) showStory("【下一步】\n" + target.tip);
      return false;
    }

    S.questNavPending = {
      questId: target.questId,
      title: target.title,
      loc: dest,
      npc: target.npc,
      kind: target.kind,
      tip: target.tip,
      forceTalk: !!opts.forceTalk
    };

    try { if (typeof closeModal === "function") closeModal(); } catch (e0) {}

    if (dest === S.loc) {
      flushQuestNavPending();
      try { if (typeof ui !== "undefined") ui.tab = "map"; } catch (e1) {}
      try { render(); } catch (e2) {}
      return true;
    }

    // Travel
    try {
      if (typeof travelToLocation === "function") travelToLocation(dest);
      else if (typeof travelTo === "function") travelTo(dest);
      else {
        toast("無法旅行", true);
        return false;
      }
    } catch (e3) {
      toast("導航旅行失敗", true);
      return false;
    }
    return true;
  }

  function questNextStepLine(rowOrId) {
    const t = resolveQuestNavTarget(rowOrId);
    if (!t) return "";
    const bits = [];
    bits.push(t.tip || "繼續任務");
    if (t.loc) bits.push("→【" + v24LocName(t.loc) + "】");
    if (t.npc) bits.push("見" + v24NpcName(t.npc));
    if (t.kind === "deliver") bits.push("（可交付）");
    if (t.kind === "folk") bits.push("（民間機緣）");
    return bits.join(" ");
  }

  // ---- Enhance quest card UI ----
  const _renderQuestCardHtml_v24 = typeof renderQuestCardHtml === "function" ? renderQuestCardHtml : null;
  if (_renderQuestCardHtml_v24) {
    renderQuestCardHtml = function(row) {
      let html = _renderQuestCardHtml_v24(row);
      if (!row || row.done) return html;
      ensureQuestNavV24();
      const focused = S.questLog.focusId === row.id;
      const next = escapeHtml(questNextStepLine(row));
      const navBtn =
        "<button type=\"button\" class=\"btn primary\" data-qnav=\"" + escapeHtml(row.id) + "\" style=\"min-height:34px;padding:4px 10px\">🧭 導航</button>" +
        "<button type=\"button\" class=\"btn" + (focused ? " primary" : "") + "\" data-qfocus=\"" + escapeHtml(row.id) + "\" style=\"min-height:34px;padding:4px 10px\">" +
        (focused ? "★ 追蹤中" : "追蹤") + "</button>";
      const nextHtml = next ? "<div class=\"small q-next\">下一步：" + next + "</div>" : "";
      // inject before closing of card
      if (html.indexOf("class=\"btn-row\"") >= 0) {
        html = html.replace(
          /(<div class="btn-row"[^>]*>)/,
          nextHtml + "$1" + navBtn
        );
      } else {
        html = html.replace("</div>", nextHtml + "<div class=\"btn-row\" style=\"margin-top:6px\">" + navBtn + "</div></div>");
      }
      return html;
    };
  }

  function v24BindQuestNavButtons(root) {
    const scope = root || document;
    Array.prototype.forEach.call(scope.querySelectorAll("[data-qnav]"), function(btn) {
      if (btn._v24nav) return;
      btn._v24nav = 1;
      btn.onclick = function() {
        const id = btn.getAttribute("data-qnav");
        navigateQuestAuto(id);
      };
    });
    Array.prototype.forEach.call(scope.querySelectorAll("[data-qfocus]"), function(btn) {
      if (btn._v24focus) return;
      btn._v24focus = 1;
      btn.onclick = function() {
        const id = btn.getAttribute("data-qfocus");
        ensureQuestNavV24();
        if (S.questLog.focusId === id) v24FocusQuest(null);
        else v24FocusQuest(id);
        toast(S.questLog.focusId ? "已追蹤此任務（地圖可一鍵導航）" : "已取消追蹤", true);
        try {
          if (typeof openQuestJournal === "function") openQuestJournal(S.questLog.filter || "active");
        } catch (e) {}
      };
    });
    // Upgrade plain 前往 to also set pending tip
    Array.prototype.forEach.call(scope.querySelectorAll("[data-qgo]"), function(btn) {
      if (btn._v24go) return;
      btn._v24go = 1;
      const prev = btn.onclick;
      btn.onclick = function(ev) {
        const loc = btn.getAttribute("data-qgo");
        // find parent card quest id if any
        let qid = null;
        try {
          const card = btn.closest && btn.closest(".q-card");
          const nav = card && card.querySelector("[data-qnav]");
          if (nav) qid = nav.getAttribute("data-qnav");
        } catch (e) {}
        if (qid) {
          navigateQuestAuto(qid, { loc: loc, skipPick: true });
          return;
        }
        if (typeof prev === "function") return prev.call(btn, ev);
        try { if (typeof closeModal === "function") closeModal(); } catch (e2) {}
        if (typeof travelToLocation === "function") travelToLocation(loc);
      };
    });
  }

  const _openQuestJournal_v24 = typeof openQuestJournal === "function" ? openQuestJournal : null;
  if (_openQuestJournal_v24) {
    openQuestJournal = function(filter) {
      _openQuestJournal_v24(filter);
      setTimeout(function() {
        try {
          const body = document.getElementById("modal-body");
          if (!body) return;
          // Add auto-nav banner
          if (!document.getElementById("qnav-banner")) {
            const tracked = v24TrackedNavTarget();
            const ban = document.createElement("div");
            ban.id = "qnav-banner";
            ban.className = "q-nav-banner";
            ban.innerHTML =
              "<div class=\"small\">自動導航</div>" +
              "<div class=\"q-track\">" + escapeHtml(tracked ? (("追蹤・" + tracked.title + "｜") + questNextStepLine(tracked.questId)) : "尚未追蹤任務（點卡片「追蹤」或直接導航）") + "</div>" +
              "<div class=\"btn-row\" style=\"margin-top:6px\">" +
              "<button type=\"button\" class=\"btn primary\" id=\"qj-autonav\">🧭 導航當前任務</button>" +
              "<button type=\"button\" class=\"btn\" id=\"qj-nav-toggle\">自動開啟：" + (S.questNavAuto !== false ? "開" : "關") + "</button>" +
              "</div>";
            const h3 = body.querySelector("h3");
            if (h3 && h3.parentNode) h3.parentNode.insertBefore(ban, h3.nextSibling);
            else body.insertBefore(ban, body.firstChild);
            const an = document.getElementById("qj-autonav");
            if (an) an.onclick = function() {
              const t = v24TrackedNavTarget();
              if (!t) { toast("沒有可導航的進行中任務", true); return; }
              navigateQuestAuto(t.questId);
            };
            const tg = document.getElementById("qj-nav-toggle");
            if (tg) tg.onclick = function() {
              ensureQuestNavV24();
              S.questNavAuto = S.questNavAuto === false;
              tg.textContent = "自動開啟：" + (S.questNavAuto !== false ? "開" : "關");
              toast(S.questNavAuto !== false ? "到達後會自動開 NPC／交付" : "到達後只提示，不自動開啟", true);
            };
          }
          v24BindQuestNavButtons(body);
        } catch (e) {}
      }, 0);
    };
  }

  // Map strip: auto-nav button
  const _renderMap_v24 = typeof renderMap === "function" ? renderMap : null;
  if (_renderMap_v24) {
    renderMap = function() {
      let html = _renderMap_v24();
      const tracked = v24TrackedNavTarget();
      const extra =
        "<button type=\"button\" class=\"btn primary\" id=\"btn-quest-autonav\" style=\"min-height:32px;padding:4px 10px\">🧭 導航</button>";
      if (html.indexOf("id=\"btn-quest-journal-map\"") >= 0) {
        html = html.replace(
          "id=\"btn-quest-journal-map\"",
          "id=\"btn-quest-journal-map\""
        );
        html = html.replace(
          /(<button type="button" class="btn primary" id="btn-quest-journal-map"[^>]*>任務簿<\/button>)/,
          "$1" + extra
        );
      }
      // enrich tracker line with next step
      if (tracked) {
        const line = "📜 " + escapeHtml((tracked.title + "｜" + questNextStepLine(tracked.questId)).slice(0, 72));
        html = html.replace(/<div class="q-track">[\s\S]*?<\/div>/, "<div class=\"q-track\">" + line + "</div>");
      }
      return html;
    };
  }

  const _bindHub_v24 = typeof bindHub === "function" ? bindHub : null;
  if (_bindHub_v24) {
    bindHub = function() {
      _bindHub_v24();
      const an = document.getElementById("btn-quest-autonav");
      if (an) an.onclick = function() {
        const t = v24TrackedNavTarget();
        if (!t) {
          if (typeof openQuestJournal === "function") openQuestJournal("active");
          else toast("請先打開任務簿選擇任務", true);
          return;
        }
        navigateQuestAuto(t.questId);
      };
      try { v24BindQuestNavButtons(document); } catch (e) {}
    };
  }

  // Patch travelToLocation to flush pending nav after arrive
  if (typeof travelToLocation === "function") {
    const _travelToLocation_v24 = travelToLocation;
    travelToLocation = function(id) {
      const before = S.loc;
      const ret = _travelToLocation_v24.apply(this, arguments);
      try {
        ensureQuestNavV24();
        if (S.questNavAuto === false) {
          // still clear pending tip toast only
          if (S.questNavPending && S.questNavPending.loc === S.loc) {
            const tip = S.questNavPending.tip;
            S.questNavPending = null;
            if (tip) toast("抵達目標・" + String(tip).slice(0, 36), true);
          }
          return ret;
        }
        if (S.questNavPending && S.loc === S.questNavPending.loc) {
          flushQuestNavPending();
        } else if (id && id !== before) {
          // Soft assist: if focused quest target is here, offer once
          const t = v24TrackedNavTarget();
          if (t && t.loc === S.loc && (t.kind === "deliver" || t.kind === "folk" || t.npc)) {
            S.questNavPending = {
              questId: t.questId, title: t.title, loc: t.loc, npc: t.npc, kind: t.kind, tip: t.tip
            };
            flushQuestNavPending();
          }
        }
      } catch (e) {}
      return ret;
    };
  }

  // locationActions: quick nav / deliver already here
  if (typeof locationActions === "function") {
    const _locationActions_v24 = locationActions;
    locationActions = function(locId) {
      const acts = _locationActions_v24(locId) || [];
      try {
        const t = v24TrackedNavTarget();
        if (t) {
          if (t.loc && t.loc !== locId) {
            acts.unshift({
              label: "【導航】前往・" + v24LocName(t.loc) + "（" + (t.title || "").slice(0, 10) + "）",
              fn: function(){ navigateQuestAuto(t.questId); }
            });
          } else if (t.loc === locId) {
            acts.unshift({
              label: "【導航】繼續・" + (t.title || "任務").slice(0, 12) + (t.kind === "deliver" ? "・交付" : (t.npc ? "・見人" : "")),
              fn: function(){
                S.questNavPending = { questId: t.questId, title: t.title, loc: locId, npc: t.npc, kind: t.kind, tip: t.tip, forceTalk: true };
                flushQuestNavPending();
              }
            });
          }
        }
      } catch (e) {}
      return acts;
    };
  }

  // Story tab: bind nav on cards after render
  const _renderStory_v24 = typeof renderStory === "function" ? renderStory : null;
  if (_renderStory_v24) {
    renderStory = function() {
      const html = _renderStory_v24();
      setTimeout(function(){ try { v24BindQuestNavButtons(document); } catch (e) {} }, 0);
      return html;
    };
  }

  window.__JH_V24_SELFTEST = function() {
    ensureQuestNavV24();
    S.questNavAuto = true;
    // Seed a court-like / main target
    let okResolve = false;
    let okNavHere = false;
    let okPending = false;
    try {
      if (S.quests && S.quests.main) {
        const t = resolveQuestNavTarget("main");
        okResolve = !!(t && t.tip && (t.loc || (t.locs && t.locs.length)));
      } else {
        okResolve = true;
      }
    } catch (e) { okResolve = false; }
    try {
      const fake = { id: "__v24_test__", title: "測試導航", cat: "side", tip: "測試下一步", locs: [S.loc], fromNpc: null };
      const t2 = resolveQuestNavTarget(fake);
      okResolve = okResolve && !!(t2 && t2.alreadyHere);
      S.questNavPending = { questId: fake.id, title: fake.title, loc: S.loc, npc: null, kind: "arrive", tip: "測試下一步" };
      okPending = flushQuestNavPending() === true;
      okNavHere = !S.questNavPending;
    } catch (e2) { okNavHere = false; }
    let uiOk = false;
    try {
      if (typeof openQuestJournal === "function") {
        openQuestJournal("active");
        const body = document.getElementById("modal-body");
        uiOk = !!(body && (/自動導航|data-qnav|導航當前/.test(body.innerHTML || "")));
        if (typeof closeModal === "function") closeModal();
      }
    } catch (e3) { uiOk = false; }
    const line = (typeof questNextStepLine === "function" && S.quests && S.quests.main) ? questNextStepLine("main") : "x";
    return {
      ok: okResolve && okPending && okNavHere && uiOk && !!line,
      okResolve: okResolve,
      okPending: okPending,
      okNavHere: okNavHere,
      uiOk: uiOk,
      line: line,
      tracked: (function(){ const t = v24TrackedNavTarget(); return t ? t.questId : null; })()
    };
  };

  if (window.__JH_DEBUG) {
    Object.assign(window.__JH_DEBUG, {
      navigateQuestAuto: navigateQuestAuto,
      resolveQuestNavTarget: resolveQuestNavTarget,
      flushQuestNavPending: flushQuestNavPending,
      v24TrackedNavTarget: v24TrackedNavTarget,
      questNextStepLine: questNextStepLine,
      v24self: window.__JH_V24_SELFTEST
    });
  }

  try { ensureQuestNavV24(); } catch (eBoot24) {}

  // ========== END V24 ==========
