
  function isImprisoned() { return !!(S.prison && S.prison.by); }
  function playerStealthScore() {
    const st = effectiveStats();
    let score = st.agi * 2 + st.luck + Math.floor(st.wit / 2);
    if (S.equip.weapon === "night_dagger") score += 12;
    if ((S.day % 2 === 0) || /yewang|heishui|mishi/.test(S.loc)) score += 8;
    if (hasStatus("dingshen")) score -= 20;
    return score;
  }
  function npcAwarenessScore(npcId) {
    const p = npcProfile(npcId), m = ensureNpcMem(npcId);
    let a = p.awareness + Math.floor(p.martial * 0.35);
    if (m.wounded) a -= 12;
    if (m.alert > 0) a += m.alert * 8;
    if (m.trust <= -10) a += 10;
    return a;
  }
  function playerMartialScore() {
    const st = effectiveStats();
    return st.force * 2 + st.agi + Math.floor(st.bone / 2) + S.level * 2;
  }
  function imprisonPlayer(npcId, reason) {
    const p = npcProfile(npcId);
    const place = p.prisonPlace || S.loc || "hub";
    S.prison = { by:npcId, place:place, cellName:p.prisonName||"禁閉室", dayLocked:S.day, escapesTried:[], parole:p.paroleDays||0, hasKey:false, guardAlert:0, reason:reason||"不軌" };
    S.loc = place;
    if (hasItem("cell_key")) removeItem("cell_key", S.inv.cell_key || 1);
    S.honor = Math.max(0, S.honor - 3);
    S.renown = Math.max(0, S.renown - 1);
    setFlag("prison_escape_known");
    try { saveGameSilent(); } catch (e) {}
  }
  function releasePrison(reasonText) {
    const by = S.prison && S.prison.by;
    S.prison = null;
    if (hasItem("cell_key")) removeItem("cell_key", S.inv.cell_key || 1);
    if (by) ensureNpcMem(by).mood = "審視";
    try { saveGameSilent(); } catch (e) {}
    return reasonText || "你重獲自由。";
  }
  function prisonBannerHtml() {
    if (!isImprisoned()) return "";
    const npc = NPCS[S.prison.by];
    const days = Math.max(0, S.day - (S.prison.dayLocked || S.day));
    return `<div class="prison-banner">⛓ 關押於「${escapeHtml(S.prison.cellName||"禁閉室")}」· 看守：${escapeHtml(npc?npc.name:S.prison.by)} · 第 ${days+1} 日<div class="small">可對看守：裝傷／偷鎖匙／撬鎖／求饒／賄賂／突圍</div></div>`;
  }
  function tryParoleTick() {
    if (!isImprisoned()) return null;
    const p = npcProfile(S.prison.by);
    if (!p.paroleDays) return null;
    const held = S.day - (S.prison.dayLocked || S.day);
    if (held >= p.paroleDays && ensureNpcMem(S.prison.by).trust > -20) {
      const name = NPCS[S.prison.by].name;
      return releasePrison(name + "見你關了 " + (held+1) + " 日，嘆道：「且去，勿再造業。」你被釋放。");
    }
    return null;
  }
  function woundNpc(npcId) {
    const m = ensureNpcMem(npcId);
    m.wounded = true; m.woundDay = S.day; m.alert = Math.max(m.alert, 2);
    m.mood = "痛苦"; m.rel = "仇隙"; m.trust -= 12;
    S.honor = Math.max(0, S.honor - 5);
    if (S.fates[npcId] === "default" || S.fates[npcId] === "ally") setFate(npcId, "enemy");
  }
