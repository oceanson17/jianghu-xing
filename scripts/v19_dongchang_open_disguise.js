// ========== V19: 東廠常開 + 女扮男裝騙過入籍（寫意） ==========
  // 1) 東廠衙署地圖永遠可前往（不再灰「未解鎖」）
  // 2) 生物女 + 男裝（S.disguise=nan／perceivedGender 男）可走「騙過／入籍」廠衛途
  //    —— 不設真淨身／太監籍身體標；紙面入冊＋廠衛編制。禁血腥／成人細描。

  function v19EnsureDongchangAlwaysOpen() {
    try {
      if (typeof LOCATIONS !== "undefined" && Array.isArray(LOCATIONS)) {
        for (let i = 0; i < LOCATIONS.length; i++) {
          if (LOCATIONS[i] && LOCATIONS[i].id === "dongchang") {
            LOCATIONS[i].unlock = true;
            if ("needFlag" in LOCATIONS[i]) delete LOCATIONS[i].needFlag;
            LOCATIONS[i].desc = LOCATIONS[i].desc || "檔案與刑具的氣味並存。";
          }
        }
      }
    } catch (e0) {}
  }
  v19EnsureDongchangAlwaysOpen();

  const __locUnlockedV19 = typeof locUnlocked === "function" ? locUnlocked : null;
  if (__locUnlockedV19) {
    locUnlocked = function(loc) {
      if (loc && loc.id === "dongchang") return true;
      return __locUnlockedV19(loc);
    };
  }

  function v19IsNanDisguiseFemale() {
    return !!(typeof isFemale === "function" && isFemale() && S.disguise === "nan");
  }
  function v19PerceivedMaleOk() {
    if (typeof perceivedMale === "function") return !!perceivedMale();
    if (typeof perceivedGender === "function") return perceivedGender() === "男";
    return v19IsNanDisguiseFemale() || (typeof isMale === "function" && isMale());
  }
  /** 可走「騙過入籍」紙面太監／廠衛途：真男太監籍，或女＋男裝未揭穿 */
  function canDongchangEunuchPathV19() {
    if (typeof canEnterEunuchTrack === "function" && canEnterEunuchTrack()) return true;
    if (v19IsNanDisguiseFemale() && v19PerceivedMaleOk() && !flag("identity_exposed")) return true;
    return false;
  }
  function v19RunDisguiseEunuchInspect() {
    // 寫意：男裝騙過督公「驗籍」，無身體細節
    const st = typeof effectiveStats === "function" ? effectiveStats() : { wit: S.wit || 5, charm: S.charm || 5, perception: S.perception || 5 };
    const favorDg = (S.datingAff && S.datingAff.dongchang_gong) || 0;
    const roll = Math.floor(Math.random() * 20) + 1;
    const check = (st.charm || 0) + (st.wit || 0) + Math.floor((st.perception || 0) * 0.4) + roll + Math.floor(favorDg / 8);
    const dcAware = (typeof npcProfile === "function" ? ((npcProfile("dongchang_gong") || {}).awareness || 88) : 88);
    const pass = check + 12 >= dcAware - 18 || favorDg >= 45 || flag("donggong_slave");
    S.dcInspectPassed = !!pass;
    if (pass) {
      setFlag("dc_fake_eunuch");
      setFlag("eunuch_paper");
      return { ok: true, say: "督公打量你男裝片刻，翻開籍冊淡淡道：「過了。」（寫意：男裝騙過入籍——女身不經淨身，紙面入廠衛太監途。）" };
    }
    if (typeof bumpDcHeat === "function") bumpDcHeat(8);
    if (typeof bumpPalaceHeat === "function") bumpPalaceHeat(10);
    if (typeof adjustKarma === "function") adjustKarma(-1, "騙籍敗露");
    return { ok: false, say: "督公抬眼：「裝得不像。」（寫意：識破，未入冊。宮熱上升。）" };
  }

  // Wrap attemptDongchangJoin: eunuch path for nan-disguise female
  const __attemptDongchangJoinV19 = typeof attemptDongchangJoin === "function" ? attemptDongchangJoin : null;
  if (__attemptDongchangJoinV19) {
    attemptDongchangJoin = function(pathHint) {
      if (typeof ensureDongchangState === "function") ensureDongchangState();
      if (typeof ensureDcUniformState === "function") ensureDcUniformState();
      // Female without nan: keep old blocks for real eunuch / jingshen
      if (pathHint === "eunuch" || pathHint === "disguise_eunuch") {
        if (v19IsNanDisguiseFemale()) {
          if (S.dcJoined && S.dcRank >= 1 && flag("dc_join_locked")) {
            return showStory("你已在廠衛編制：" + (typeof dcRankLabel === "function" ? dcRankLabel() : ("rank" + S.dcRank)));
          }
          const insp = v19RunDisguiseEunuchInspect();
          if (!insp.ok) {
            showStory(insp.say);
            if (typeof saveGameSilent === "function") saveGameSilent();
            return;
          }
          const path = "disguise_eunuch";
          if (typeof completeDongchangJoinCore === "function") {
            completeDongchangJoinCore(path, insp.say);
          } else {
            S.dcJoined = true;
            S.dcRank = Math.max(1, S.dcRank || 1);
            S.dcJoinPath = path;
            setFlag("dongchang_invite");
            setFlag("palace_access");
            setFlag("map_huanggong");
            setFlag("map_dongchang");
            if (typeof setPalaceRole === "function") setPalaceRole("dongchang");
          }
          // 不設 flag(eunuch)／castrated，避免女身淨身；紙面旗已設
          if (typeof openDcGrimDutyChoices === "function") {
            openDcGrimDutyChoices(insp.say);
          } else {
            if (typeof grantDcUniformForRank === "function") grantDcUniformForRank(S.dcRank || 1);
            setFlag("dc_join_locked");
            showStory(insp.say + "\n\n廠衛編制已定・官服入手。");
            if (typeof render === "function") render();
          }
          return;
        }
        // Biological female without nan: redirect
        if (typeof isFemale === "function" && isFemale() && S.disguise !== "nan") {
          return showStory("督公：「女身休來獻醜。先易男裝，再來騙過我——或走喬裝番子途。」");
        }
      }
      // Auto-prefer disguise_eunuch when female already in nan and no hint
      if (!pathHint && v19IsNanDisguiseFemale() && !(S.dcJoined && flag("dc_join_locked"))) {
        // fall through to original, but original may pick disguise; OK
      }
      return __attemptDongchangJoinV19(pathHint);
    };
  }

  // Desk UI: show 騙過入籍 for nan female
  const __openDongchangDeskV19 = typeof openDongchangDesk === "function" ? openDongchangDesk : null;
  if (__openDongchangDeskV19) {
    openDongchangDesk = function() {
      __openDongchangDeskV19();
      try {
        if (S.dcJoined && flag("dc_join_locked")) return;
        const row = document.querySelector("#modal-body .btn-row") || document.querySelector(".modal .btn-row");
        if (!row) return;
        // Remove misleading "以太監籍" for bio female without nan if any slipped
        if (typeof isFemale === "function" && isFemale() && S.disguise !== "nan") {
          const je = document.getElementById("dc-join-e");
          if (je && je.parentNode) je.parentNode.removeChild(je);
        }
        if (v19IsNanDisguiseFemale()) {
          // Prefer dedicated button
          if (!document.getElementById("dc-join-de")) {
            const btn = document.createElement("button");
            btn.className = "btn primary";
            btn.id = "dc-join-de";
            btn.textContent = "男裝騙過・以『太監籍』報到（寫意入籍）";
            btn.onclick = function(){ closeModal(); attemptDongchangJoin("disguise_eunuch"); };
            // insert before 喬裝 or at start
            const jd = document.getElementById("dc-join-d");
            if (jd && jd.parentNode) jd.parentNode.insertBefore(btn, jd);
            else row.insertBefore(btn, row.firstChild);
          }
          // Hide bio-eunuch button if present (female can't real eunuch)
          const je2 = document.getElementById("dc-join-e");
          if (je2 && je2.parentNode) je2.parentNode.removeChild(je2);
        }
        // Soften desk blurb
        const box = document.querySelector("#modal-body .story-box") || document.querySelector(".modal .story-box");
        if (box && v19IsNanDisguiseFemale()) {
          box.innerHTML = String(box.innerHTML || "").replace(/女僅可喬裝[^<]*/g, "女扮男裝可騙過入籍（紙面太監途・不經淨身）或喬裝番子");
        }
      } catch (e1) {}
    };
  }

  // travelTo: ensure toast never blocks dongchang
  const __travelToV19 = typeof travelTo === "function" ? travelTo : null;
  if (__travelToV19) {
    travelTo = function(id) {
      if (id === "dongchang") {
        v19EnsureDongchangAlwaysOpen();
        setFlag("map_dongchang");
      }
      return __travelToV19(id);
    };
  }

  // sanitize: keep paper eunuch flags for disguised female; never leave castrated on female
  const __sanitizeAbsurdFemaleEunuchV19 = typeof sanitizeAbsurdFemaleEunuch === "function" ? sanitizeAbsurdFemaleEunuch : null;
  if (__sanitizeAbsurdFemaleEunuchV19) {
    sanitizeAbsurdFemaleEunuch = function() {
      const changed = __sanitizeAbsurdFemaleEunuchV19();
      if (typeof isFemale === "function" && isFemale()) {
        // restore paper flags if she is/was dc disguise eunuch
        if (S.dcJoinPath === "disguise_eunuch" || flag("dc_fake_eunuch")) {
          setFlag("dc_fake_eunuch");
          setFlag("eunuch_paper");
        }
      }
      return changed;
    };
  }

  // Headless self-test
  window.__JH_V19_SELFTEST = function() {
    v19EnsureDongchangAlwaysOpen();
    const unlockedFn = typeof locUnlocked === "function" ? !!locUnlocked({ id: "dongchang", unlock: false, needFlag: "dongchang_invite" }) : false;
    let loc = null;
    try {
      if (typeof LOCATIONS !== "undefined" && Array.isArray(LOCATIONS)) {
        for (let i = 0; i < LOCATIONS.length; i++) { if (LOCATIONS[i] && LOCATIONS[i].id === "dongchang") { loc = LOCS[i]; break; } }
      }
    } catch (eL) {}
    const unlockFlag = !!(unlockedFn && (!loc || loc.unlock === true || !loc.needFlag));
    const g0 = S.gender, d0 = S.disguise, dc0 = S.dcJoined, rank0 = S.dcRank, path0 = S.dcJoinPath;
    const flags0 = { eunuch: flag("eunuch"), locked: flag("dc_join_locked"), fake: flag("dc_fake_eunuch") };
    // female + nan can take disguise_eunuch
    S.gender = "女"; S.disguise = "nan";
    S.dcJoined = false; S.dcRank = 0; S.dcJoinPath = null;
    if (S.flags) { S.flags.dc_join_locked = false; S.flags.eunuch = false; S.flags.dc_fake_eunuch = false; S.flags.identity_exposed = false; }
    S.datingAff = S.datingAff || {}; S.datingAff.dongchang_gong = 60; // force pass
    let joinedOk = false;
    try {
      attemptDongchangJoin("disguise_eunuch");
      joinedOk = !!(S.dcJoined && S.dcJoinPath === "disguise_eunuch" && flag("dc_fake_eunuch") && !flag("eunuch"));
    } catch (e) { joinedOk = false; }
    // without nan: blocked message path
    S.dcJoined = false; S.dcRank = 0; if (S.flags) S.flags.dc_join_locked = false;
    S.disguise = null;
    let blockedNoNan = false;
    try {
      attemptDongchangJoin("eunuch");
      blockedNoNan = !S.dcJoined;
    } catch (e2) { blockedNoNan = true; }
    // restore
    S.gender = g0; S.disguise = d0; S.dcJoined = dc0; S.dcRank = rank0; S.dcJoinPath = path0;
    if (S.flags) {
      S.flags.eunuch = flags0.eunuch;
      S.flags.dc_join_locked = flags0.locked;
      S.flags.dc_fake_eunuch = flags0.fake;
    }
    return {
      ok: unlockFlag && unlockedFn && joinedOk && blockedNoNan,
      unlockFlag: unlockFlag,
      unlockedFn: unlockedFn,
      joinedOk: joinedOk,
      blockedNoNan: blockedNoNan,
      canPath: canDongchangEunuchPathV19
    };
  };

  if (window.__JH_DEBUG) {
    Object.assign(window.__JH_DEBUG, {
      v19EnsureDongchangAlwaysOpen: v19EnsureDongchangAlwaysOpen,
      canDongchangEunuchPathV19: canDongchangEunuchPathV19,
      v19RunDisguiseEunuchInspect: v19RunDisguiseEunuchInspect,
      v19self: window.__JH_V19_SELFTEST
    });
  }

  try { v19EnsureDongchangAlwaysOpen(); } catch (e3) {}

  // ========== END V19 ==========
