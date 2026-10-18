
  function resolveSneakAttack(npcId, playerText) {
    const npc = NPCS[npcId], p = npcProfile(npcId);
    const stealth = playerStealthScore(), aware = npcAwarenessScore(npcId);
    const martialP = playerMartialScore(), martialN = p.martial + Math.floor(p.awareness / 5);
    const gap = martialN - martialP;
    const detected = (stealth < aware - 5) || (gap >= 35);
    const canWound = !detected && (martialP + stealth / 2) >= (martialN - 10);
    if (canWound && !detected) {
      woundNpc(npcId);
      return sanitizeAiResult({
        say: "你身形一閃，趁" + npc.name + "不備刺出一刀！\n" + npc.name + "悶哼，衣袍見血——竟被你得手。\n「你……好狠！」" + npc.name + "捂傷怒視。\n（身法／武力足夠，暗算成功）",
        behavior: "wound", fateHint: "enemy", memoryNote: "被玩家暗算受傷", intent: "sneak_attack",
        resolution: { detected:false, wounded:true, stealth, aware, martialP, martialN }
      }, npcId);
    }
    const reaction = p.onDetect || "capture";
    const behavior = mapReaction(reaction);
    let say = npc.name + "內息一震，竟先窺破殺機！\n";
    if (gap >= 40) say += "護體真氣湧現，刀鋒如擊鐵壁，被蕩開。\n";
    else if (gap >= 20) say += npc.name + "側身避過，反手扣住你手腕。\n";
    else say += npc.name + "敏捷退開，目光森然。\n";
    if (behavior === "capture") {
      imprisonPlayer(npcId, "暗算");
      say += npc.name + "（" + p.label + "）：「孽障！且入" + (p.prisonName || "禁室") + "思過。」你被制住關押。";
    } else if (behavior === "attack" || behavior === "duel") {
      say += npc.name + "：「暗箭傷人——今日討教！」";
    } else if (behavior === "flee") {
      say += npc.name + "臉色煞白，撤步遠颺：「來人哪——！」"; setFlag("called_help");
    } else if (behavior === "trap") {
      say += npc.name + "冷笑，機關已動——你反而受制。";
      if (p.prisonPlace) {
        imprisonPlayer(npcId, "暗算反制");
        say += "\n你被關入「" + p.prisonName + "」。";
        ensureNpcMem(npcId).alert = Math.max(ensureNpcMem(npcId).alert, 3);
        if (S.fates[npcId] !== "enemy") setFate(npcId, "enemy");
        return sanitizeAiResult({ say, behavior:"capture", fateHint:"enemy", memoryNote:"暗算被識破反關", intent:"sneak_attack",
          resolution:{ detected:true, stealth, aware, martialP, martialN } }, npcId);
      }
    } else {
      say += npc.name + "厲聲訓斥，未立刻下死手。";
    }
    ensureNpcMem(npcId).alert = Math.max(ensureNpcMem(npcId).alert, 3);
    if (S.fates[npcId] !== "enemy") setFate(npcId, "enemy");
    return sanitizeAiResult({ say, behavior, fateHint:"enemy", memoryNote:"暗算被識破："+behavior, intent:"sneak_attack",
      resolution:{ detected:true, stealth, aware, martialP, martialN, reaction } }, npcId);
  }
  function resolveOpenAttack(npcId) {
    const p = npcProfile(npcId), npc = NPCS[npcId];
    const behavior = mapReaction(p.onOpenAttack || "attack");
    let say = "你公然動手！" + npc.name + "眸光一凜。\n";
    if (behavior === "capture") {
      const gap = (p.martial + 20) - playerMartialScore();
      if (gap > 15) {
        imprisonPlayer(npcId, "公然動手");
        say += "對方武功遠勝，三招內制住你，關入「" + (p.prisonName || "禁室") + "」。";
        return sanitizeAiResult({ say, behavior:"capture", fateHint:"enemy", memoryNote:"動手被擒", intent:"open_attack" }, npcId);
      }
    }
    if (behavior === "flee") {
      say += npc.name + "不願纏鬥，抽身便走。"; setFlag("called_help");
      return sanitizeAiResult({ say, behavior:"flee", fateHint:"enemy", memoryNote:"遇襲逃離", intent:"open_attack" }, npcId);
    }
    say += "兵器相撞，戰意已起！";
    return sanitizeAiResult({ say, behavior: behavior==="duel"?"duel":"attack", fateHint:"enemy", memoryNote:"公然動手", intent:"open_attack" }, npcId);
  }
