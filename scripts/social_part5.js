
  function resolveEscapeAttempt(npcId, intent, playerText) {
    if (isImprisoned()) npcId = S.prison.by;
    const npc = NPCS[npcId], p = npcProfile(npcId), m = ensureNpcMem(npcId);
    const st = effectiveStats();
    S.prison.escapesTried = S.prison.escapesTried || [];
    S.prison.escapesTried.push({ day:S.day, intent:intent });

    if (intent === "apologize" || intent === "persuade") {
      const score = st.honor + st.wit + m.trust + (p.personality==="merciful"?15:0) + (p.personality==="lawful"?8:0) + (p.personality==="ruthless"?-20:0);
      if (score >= 18) {
        const msg = releasePrison(npc.name + "聽你懺悔，沉默良久：「既知悔，去罷。再犯難容。」");
        m.trust += 3; m.mood = "審視";
        return sanitizeAiResult({ say:msg, behavior:"release", memoryNote:"求饒獲釋", intent }, npcId);
      }
      if (score >= 5 && p.paroleDays > 0) {
        S.prison.parole = Math.max(1, (S.prison.parole || p.paroleDays) - 1);
        return sanitizeAiResult({ say:npc.name+"：「口說無憑。再關一日看你是否真心。」（假釋倒數縮短）", behavior:"lecture", memoryNote:"求饒未即放", intent }, npcId);
      }
      return sanitizeAiResult({ say:npc.name+"冷冷道：「此時悔？晚了。」", behavior:"rebuke", memoryNote:"求饒被拒", intent }, npcId);
    }

    if (intent === "fake_injury") {
      const bluff = st.wit * 2 + st.luck + (Math.random()*20|0);
      const read = p.awareness + (m.alert*5) + (p.personality==="cunning"?15:0);
      if (bluff > read + 5) {
        S.prison.guardAlert = Math.max(0, (S.prison.guardAlert||0) - 1);
        if (!S.prison.hasKey && Math.random() < 0.45) {
          S.prison.hasKey = true; addItem("cell_key", 1);
          return sanitizeAiResult({ say:"你捂胸假稱內傷。" + npc.name + "近前探視——你趁隙摸走鎖匙！\n（已獲牢房鎖匙，可再試開鎖／逃走）", behavior:"trap", memoryNote:"裝傷偷得鎖匙", intent }, npcId);
        }
        const msg = releasePrison("你裝得逼真。" + npc.name + "招人來抬，半途你掙脫逃入夜色。");
        return sanitizeAiResult({ say:msg+"\n（裝傷脫逃成功）", behavior:"release", memoryNote:"裝傷逃走", intent }, npcId);
      }
      S.prison.guardAlert = (S.prison.guardAlert||0) + 1;
      return sanitizeAiResult({ say:npc.name+"一眼看穿：「裝傷？江湖把戲。」門鎖又加一道。", behavior:"rebuke", memoryNote:"裝傷被識破", intent }, npcId);
    }

    if (intent === "steal_key") {
      const sneak = playerStealthScore() - (S.prison.guardAlert||0)*10;
      const aware = npcAwarenessScore(npcId);
      if (sneak >= aware - 8) {
        S.prison.hasKey = true; addItem("cell_key", 1);
        return sanitizeAiResult({ say:"你屏息靠近，摸走鎖匙一枚。\n（已獲牢房鎖匙——可輸入「開鎖逃走」）", behavior:"trap", memoryNote:"偷得鎖匙", intent }, npcId);
      }
      S.prison.guardAlert = (S.prison.guardAlert||0) + 2;
      return sanitizeAiResult({ say:npc.name+"驀然回首：「鬼祟作甚！」你未能得手。", behavior:"rebuke", memoryNote:"偷鎖匙失敗", intent }, npcId);
    }

    if (intent === "pick_lock" || (intent === "escape_cell" && (S.prison.hasKey || hasItem("cell_key")))) {
      if (S.prison.hasKey || hasItem("cell_key")) {
        if (hasItem("cell_key")) removeItem("cell_key", 1);
        S.prison.hasKey = false;
        releasePrison();
        return sanitizeAiResult({ say:"鎖匙入孔，門軸輕響。你屏息溜出，重獲自由。\n（" + npc.name + "稍後必發現）", behavior:"release", fateHint:"enemy", memoryNote:"用鎖匙逃走", intent }, npcId);
      }
      const skill = st.agi + st.wit + (S.equip.weapon==="night_dagger"?8:0);
      const difficulty = 28 + (S.prison.guardAlert||0)*6;
      if (skill + (Math.random()*15|0) >= difficulty) {
        releasePrison();
        return sanitizeAiResult({ say:"你撬弄鎖芯，咔嗒一聲——成功逃出禁室！", behavior:"release", fateHint:"enemy", memoryNote:"撬鎖逃走", intent }, npcId);
      }
      S.prison.guardAlert = (S.prison.guardAlert||0) + 1;
      return sanitizeAiResult({ say:"鎖芯不動，反弄出聲響。外面脚步近了……", behavior:"rebuke", memoryNote:"撬鎖失敗", intent }, npcId);
    }

    if (intent === "bribe") {
      const need = p.personality==="merciful" ? 30 : (p.personality==="ruthless" ? 120 : 60);
      if (S.gold < need) return sanitizeAiResult({ say:npc.name+"瞥一眼：「就這點？」（需約 "+need+" 金）", behavior:"rebuke", memoryNote:"賄賂不足", intent }, npcId);
      if (p.personality === "lawful" || (p.personality==="merciful" && p.martial > 70)) {
        return sanitizeAiResult({ say:npc.name+"拂袖：「金錢買不動我。」", behavior:"rebuke", memoryNote:"賄賂被拒", intent }, npcId);
      }
      S.gold -= need; releasePrison();
      return sanitizeAiResult({ say:"你塞上 "+need+" 金。有人假裝打瞌睡——你溜走了。", behavior:"release", memoryNote:"賄賂逃走", intent }, npcId);
    }

    if (intent === "open_attack" || intent === "sneak_attack" || intent === "escape_cell") {
      const gap = p.martial - playerMartialScore();
      if (gap > 30) {
        S.hp = Math.max(1, S.hp - 20);
        S.prison.guardAlert = (S.prison.guardAlert||0) + 2;
        return sanitizeAiResult({ say:"你拚死突圍，被"+npc.name+"一掌震回。氣血大損，鎖更緊了。", behavior:"capture", memoryNote:"強行突圍失敗", intent }, npcId);
      }
      return sanitizeAiResult({ say:"你扯斷束繩，奪門而戰！", behavior:"attack", fateHint:"enemy", memoryNote:"強行突圍開戰", intent, resolution:{ escapeFight:true } }, npcId);
    }

    return sanitizeAiResult({ say:npc.name+"隔門道：「安分些。」（可試：裝傷／偷鎖匙／撬鎖／求饒／賄賂／逃走）", behavior:"ignore", memoryNote:"獄中試探", intent }, npcId);
  }

  function resolveSteal(npcId) {
    const p = npcProfile(npcId);
    const sneak = playerStealthScore(), aware = npcAwarenessScore(npcId);
    if (sneak >= aware) {
      S.gold += 15; ensureNpcMem(npcId).trust -= 2;
      return sanitizeAiResult({ say:"你手脚乾淨，摸走散銀（+15金）。"+NPCS[npcId].name+"似乎未覺。", behavior:"ignore", memoryNote:"偷竊得逞", intent:"steal" }, npcId);
    }
    const behavior = mapReaction(p.onSteal || "rebuke");
    let say = NPCS[npcId].name + "一把抓住你手腕：「做賊？」\n";
    if (behavior === "capture") {
      imprisonPlayer(npcId, "偷竊");
      say += "片刻後你被關入「"+(p.prisonName||"禁室")+"」。";
      return sanitizeAiResult({ say, behavior:"capture", fateHint:"enemy", memoryNote:"偷竊被關", intent:"steal" }, npcId);
    }
    if (behavior === "attack") say += "接着便是刀光！";
    else if (behavior === "flee") { say += "對方喊人求救！"; setFlag("called_help"); }
    else if (behavior === "trap") say += "對方冷笑，早有防範。";
    else say += "臭骂一顿，赶你走。";
    return sanitizeAiResult({ say, behavior, fateHint: behavior==="flee"?null:"enemy", memoryNote:"偷竊被發現", intent:"steal" }, npcId);
  }

  function offlineResolveIntent(npcId, mode, playerText) {
    const intent = classifyIntent(mode, playerText);
    if (isImprisoned()) return resolveEscapeAttempt(S.prison.by, intent, playerText);
    if (intent === "sneak_attack") return resolveSneakAttack(npcId, playerText);
    if (intent === "open_attack") return resolveOpenAttack(npcId);
    if (intent === "steal" || intent === "steal_key") return resolveSteal(npcId);
    if (intent === "threaten") {
      const p = npcProfile(npcId);
      const bh = (p.personality==="timid"||p.personality==="healer") ? "flee" : (p.personality==="ruthless" ? "attack" : "rebuke");
      return sanitizeAiResult({ say:NPCS[npcId].name+(bh==="flee"?"被嚇退：「別過來！」":bh==="attack"?"眼露杀气：「好胆！」":"沉声：「口不择言。」"), behavior:bh, memoryNote:"威脅", intent:"threaten" }, npcId);
    }
    if (intent === "apologize") {
      ensureNpcMem(npcId).trust += 2;
      return sanitizeAiResult({ say:NPCS[npcId].name+"：「知错能改……看你往後。」", behavior:"lecture", memoryNote:"道歉", intent:"apologize" }, npcId);
    }
    if (intent === "gift") {
      return sanitizeAiResult({ say:NPCS[npcId].name+"略感意外：「厚了。」", behavior:"gift", memoryNote:"送禮意圖", intent:"gift" }, npcId);
    }
    return null;
  }
