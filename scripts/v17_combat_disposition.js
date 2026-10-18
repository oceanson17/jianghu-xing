// ========== V17: COMBAT DISPOSITION (AI lose/win) + 設定入口強化 ==========
  // Homage only. 寫意：no gore / no erotica / no sex.
  // Lose → AI picks disposition by winner NPC role → mutate real state.
  // Win → free-text how to treat foe → AI executes mutators.
  // 「設定・作弊台」在「更多」置頂、標籤更清楚。

  const V17_HUMANOID_ENEMY = {
    bandit:1, elite_bandit:1, temple_guard:1, shadow:1, toxin_scout:1, boss_envoy:1,
    sea_raider:1, bamboo_assassin:1, cult_zealot:1, tomb_shade:1, fate_envoy:1,
    corrupt_clerk:1, mad_song_echo:1, bounty_thug:1
  };

  function v17IsHumanoidEnemy(enemyId) {
    if (!enemyId) return false;
    if (V17_HUMANOID_ENEMY[enemyId]) return true;
    if (/^beast_/.test(String(enemyId))) return false;
    if (/wolf|bear|snake|猿|豹|牛|鷲/.test(String(enemyId))) return false;
    return !/wolf|snow_wolf/.test(String(enemyId));
  }

  function v17EnemyForNpc(npcId) {
    if (npcId === "heifeng" || npcId === "mu_gaofeng_x") return "elite_bandit";
    if (npcId === "honglianzhu" || npcId === "ren_yingluo" || npcId === "dongfang_gubai") return "cult_zealot";
    if (npcId === "masteryun" || npcId === "jiu_nan_x" || npcId === "xu_zhuoyun") return "temple_guard";
    if (npcId === "yechen" || npcId === "mu_youlan" || npcId === "xiao_longyin" || npcId === "yang_guochen") return "tomb_shade";
    if (npcId === "hanya" || npcId === "a_ke_x" || npcId === "fang_yi_x") return "bamboo_assassin";
    if (npcId === "dongchang_gong" || npcId === "hai_dafu_x") return "shadow";
    if (npcId === "da_jiangjun" || npcId === "ao_baiying" || npcId === "yulin_tongling") return "elite_bandit";
    if (npcId === "wuyinqinmo") return "mad_song_echo";
    return "bandit";
  }

  function v17WinnerRole(npcId, enemyId) {
    const fac = (typeof COURT_NPC_FACTION === "object" && COURT_NPC_FACTION[npcId]) || null;
    const p = (typeof npcProfile === "function" && npcId) ? npcProfile(npcId) : null;
    const pers = (p && p.personality) || "";
    if (fac === "factory" || npcId === "dongchang_gong" || npcId === "hai_dafu_x") return "factory";
    if (fac === "throne" || npcId === "jingandi") return "throne";
    if (fac === "harem") return "harem";
    if (fac === "military" || pers === "lawful") return "military";
    if (pers === "ruthless") return "ruthless";
    if (pers === "merciful" || pers === "healer") return "merciful";
    if (pers === "timid" || pers === "healer") return "timid";
    if (pers === "cunning") return "cunning";
    if (pers === "proud") return "proud";
    if (!npcId && !v17IsHumanoidEnemy(enemyId)) return "beast";
    if (!npcId) return "bandit";
    return "jianghu";
  }

  function applyCombatDispositionAction(action, ctx) {
    if (!action || typeof action !== "object") return "";
    const t = String(action.type || action.action || "").toLowerCase();
    const npcId = (ctx && ctx.npcId) || action.npcId || null;
    let note = "";
    try {
      if (t === "spare" || t === "release" || t === "let_go") {
        S.hp = Math.max(1, S.hp || 1);
        if (!S.loc || S.loc === "tianlao") S.loc = "hub";
        note = "（對方放你一馬）";
      } else if (t === "warn" || t === "rebuke" || t === "lecture") {
        S.hp = Math.max(1, S.hp || 1);
        S.honor = Math.max(0, (S.honor || 0) - 1);
        if (npcId && typeof ensureNpcMem === "function") {
          const m = ensureNpcMem(npcId);
          m.trust = (m.trust || 0) - 2;
          m.mood = "審視";
        }
        S.loc = S.loc || "hub";
        note = "（被喝止／訓斥後放走）";
      } else if (t === "rob" || t === "loot" || t === "strip_gold") {
        const g = Math.max(5, Math.min(120, Number(action.amount || action.gold) || (15 + Math.floor(Math.random() * 40))));
        S.gold = Math.max(0, (S.gold || 0) - g);
        S.hp = Math.max(1, S.hp || 1);
        note = "（被搜去銀兩－" + g + "）";
        if (action.item && ITEMS[action.item] && typeof hasItem === "function" && hasItem(action.item) && typeof removeItem === "function") {
          removeItem(action.item, 1);
          note += "（失物）";
        }
      } else if (t === "fine" || t === "pay") {
        const g = Math.max(5, Math.min(80, Number(action.amount || action.gold) || 20));
        S.gold = Math.max(0, (S.gold || 0) - g);
        S.hp = Math.max(1, S.hp || 1);
        note = "（罰銀－" + g + "）";
      } else if (t === "imprison" || t === "capture" || t === "jail") {
        if (npcId && typeof imprisonPlayer === "function") {
          imprisonPlayer(npcId, action.reason || "戰敗被擒");
          note = "（被關押）";
        } else if (typeof beginImprisonment === "function") {
          try { beginImprisonment(action.place || "tianlao", action.reason || "戰敗被擒"); note = "（被關押）"; }
          catch (e1) { S.loc = "hub"; S.hp = 1; note = "（險被關押，逃回營地）"; }
        } else {
          S.loc = "hub"; S.hp = 1; note = "（被制住後放回）";
        }
      } else if (t === "factory_seize" || t === "dongchang" || t === "廠拿" || t === "chang_na") {
        if (typeof imprisonPlayer === "function") {
          const by = npcId || "dongchang_gong";
          imprisonPlayer(by, action.reason || "廠衛拿人");
          if (S.prison) {
            S.prison.place = "dongchang";
            S.prison.cellName = "東廠黑牢";
            S.loc = "dongchang";
          }
        } else {
          S.loc = "dongchang";
        }
        if (typeof bumpPalaceHeat === "function") bumpPalaceHeat(Math.min(12, Number(action.heat) || 6));
        S.hp = Math.max(1, S.hp || 1);
        note = "（廠衛拿下）";
      } else if (t === "exile" || t === "drive_off") {
        S.hp = Math.max(1, S.hp || 1);
        S.loc = action.loc || "qingcheng";
        S.renown = Math.max(0, (S.renown || 0) - 2);
        note = "（被驅離此地）";
      } else if (t === "wound" || t === "injure") {
        S.hp = Math.max(1, Math.min(S.hp || 1, 8));
        if (typeof addStatus === "function") try { addStatus("neishang", 2); } catch (e2) {}
        if (typeof addBodyTag === "function" && Math.random() < 0.35) {
          try { addBodyTag(Math.random() < 0.5 ? "arm_hurt" : "leg_hurt"); } catch (e3) {}
        }
        S.loc = S.loc || "hub";
        note = "（帶傷放開）";
      } else if (t === "humiliate" || t === "scorn") {
        S.hp = Math.max(1, S.hp || 1);
        S.honor = Math.max(0, (S.honor || 0) - 3);
        if (typeof adjustKarma === "function") adjustKarma(-1, "戰敗受辱");
        if (npcId && typeof ensureNpcMem === "function") ensureNpcMem(npcId).mood = "輕蔑";
        note = "（受辱後被趕走）";
      } else if (t === "heal_camp" || t === "rescue") {
        S.hp = 1; S.statuses = []; S.loc = "hub";
        note = "（被人救回營地）";
      } else if (t === "beast_maul") {
        S.hp = 1;
        if (typeof addStatus === "function") try { addStatus("neishang", 1); } catch (e4) {}
        S.loc = "hub";
        note = "（重傷逃回）";
      } else if (t === "heat") {
        if (typeof bumpPalaceHeat === "function") bumpPalaceHeat(Number(action.amount || action.heat) || 4);
        note = "（宮熱上升）";
      } else if (t === "karma" || t === "karma_delta") {
        if (typeof adjustKarma === "function") adjustKarma(Number(action.amount != null ? action.amount : action.n) || -1, action.why || "戰後處置");
        note = "（善惡變動）";
      } else if (t === "favor_delta" || t === "favor") {
        if (npcId) {
          if (!S.datingAff) S.datingAff = {};
          const d = Number(action.amount != null ? action.amount : action.n) || -3;
          S.datingAff[npcId] = (S.datingAff[npcId] || 0) + d;
          if (typeof ensureNpcMem === "function") ensureNpcMem(npcId).trust = (ensureNpcMem(npcId).trust || 0) + Math.round(d / 2);
        }
        note = "（好感變動）";
      } else if (t === "set_fate" || t === "fate") {
        if (npcId && action.fate && typeof setFate === "function") {
          setFate(npcId, String(action.fate));
          note = "（緣分→" + action.fate + "）";
        }
      } else if (t === "gold" || t === "give_gold") {
        const g = Math.max(1, Math.min(200, Number(action.amount || action.gold) || 20));
        S.gold = (S.gold || 0) + g;
        note = "（銀兩＋" + g + "）";
      } else if (t === "take_gold") {
        const g = Math.max(1, Math.min(200, Number(action.amount || action.gold) || 10));
        S.gold = Math.max(0, (S.gold || 0) - g);
        note = "（銀兩－" + g + "）";
      } else if (t === "wound_npc" || t === "injure_npc") {
        if (npcId && typeof woundNpc === "function") { woundNpc(npcId); note = "（對方帶傷）"; }
        else if (npcId && typeof ensureNpcMem === "function") {
          const m = ensureNpcMem(npcId); m.wounded = true; m.mood = "痛苦"; m.trust -= 8;
          note = "（對方帶傷）";
        }
      } else if (t === "spare_npc" || t === "mercy") {
        if (npcId && typeof ensureNpcMem === "function") {
          const m = ensureNpcMem(npcId); m.trust += 2; m.mood = "複雜";
        }
        if (typeof adjustKarma === "function") adjustKarma(2, "手下留情");
        note = "（放對方一馬）";
      } else if (t === "scare_npc" || t === "intimidate") {
        if (npcId && typeof ensureNpcMem === "function") {
          const m = ensureNpcMem(npcId); m.trust -= 3; m.mood = "忌憚"; m.alert = Math.max(m.alert || 0, 2);
        }
        S.renown = (S.renown || 0) + 1;
        note = "（嚇退對方）";
      } else if (t === "rob_npc") {
        const g = Math.max(5, Math.min(80, Number(action.amount || action.gold) || (10 + Math.floor(Math.random() * 30))));
        S.gold = (S.gold || 0) + g;
        if (typeof adjustKarma === "function") adjustKarma(-2, "搜敵財物");
        if (npcId && typeof ensureNpcMem === "function") {
          ensureNpcMem(npcId).trust -= 6; ensureNpcMem(npcId).rel = "仇隙";
          if (S.fates && S.fates[npcId] !== "enemy" && typeof setFate === "function") setFate(npcId, "enemy");
        }
        note = "（搜得銀兩＋" + g + "）";
      } else if (t === "bind_npc" || t === "capture_npc" || t === "detain") {
        if (npcId && typeof ensureNpcMem === "function") {
          const m = ensureNpcMem(npcId);
          m.detained = true; m.detainDay = S.day; m.mood = "憤恨"; m.trust -= 10;
          if (typeof setFate === "function") setFate(npcId, "enemy");
        }
        if (typeof adjustKarma === "function") adjustKarma(-1, "拘押對方");
        note = "（暫時制住對方）";
      } else if (t === "kill_npc" || t === "slay") {
        // 寫意：只改命運，無細描
        if (npcId && typeof setFate === "function") setFate(npcId, "dead");
        if (typeof adjustKarma === "function") adjustKarma(-8, "手刃對手");
        S.renown = (S.renown || 0) + 2;
        note = "（對方氣絕／退場）";
      } else if (t === "recruit" || t === "companion") {
        if (npcId && typeof inviteCompanion === "function") {
          try { inviteCompanion(npcId); note = "（對方暫同行）"; } catch (e5) { note = "（對方未肯同行）"; }
        }
      } else if (t === "demand_apology") {
        if (npcId && typeof ensureNpcMem === "function") {
          ensureNpcMem(npcId).trust -= 1; ensureNpcMem(npcId).mood = "屈辱";
        }
        S.renown = (S.renown || 0) + 1;
        note = "（對方勉強賠不是）";
      } else if (t === "report_official" || t === "handover") {
        if (typeof bumpPalaceHeat === "function") bumpPalaceHeat(2);
        if (typeof bumpCourtPrestige === "function") bumpCourtPrestige(3, "送官／移交");
        if (npcId && typeof setFate === "function") setFate(npcId, "enemy");
        note = "（移交有司／廠衛）";
      } else if (t === "prestige") {
        if (typeof bumpCourtPrestige === "function") bumpCourtPrestige(Number(action.amount) || 2, "戰後");
        note = "（威望變動）";
      } else if (t === "gift_item" && action.item && ITEMS[action.item] && typeof addItem === "function") {
        addItem(action.item, Math.max(1, Math.min(3, Number(action.n) || 1)));
        note = "（獲物）";
      } else if (typeof applyCourtAiAction === "function" && (t === "punish" || t === "imprison" || t === "favor_delta")) {
        note = applyCourtAiAction(npcId, action) || "";
      } else if (typeof applyWorldAiAction === "function") {
        const n = applyWorldAiAction(npcId, action);
        if (n) note = n;
      }
    } catch (err) {
      console.warn("applyCombatDispositionAction", t, err);
      note = note || "（處置未完全生效）";
    }
    return note;
  }

  function applyCombatDispositionPack(pack, ctx) {
    if (!pack) return { say: "塵埃落定。", note: "" };
    let notes = [];
    const list = [].concat(pack.dispositionActions || pack.actions || pack.courtActions || pack.worldActions || []);
    list.slice(0, 8).forEach(function(a) {
      const n = applyCombatDispositionAction(a, ctx);
      if (n) notes.push(n);
    });
    // shortcuts
    if (pack.disposition && !list.length) {
      const n = applyCombatDispositionAction({ type: pack.disposition }, ctx);
      if (n) notes.push(n);
    }
    try { if (typeof clamp === "function") clamp(); } catch (e) {}
    try { if (typeof saveGameSilent === "function") saveGameSilent(); } catch (e2) {}
    return {
      say: trunc(String(pack.say || pack.result || "雙方塵埃落定。"), 360),
      note: notes.filter(Boolean).join("")
    };
  }

  function offlineLoseDisposition(ctx) {
    const role = v17WinnerRole(ctx.npcId, ctx.enemyId);
    const name = (ctx.npcId && NPCS[ctx.npcId] && NPCS[ctx.npcId].name) || (ctx.enemyName) || "對方";
    let acts = [];
    let say = "";
    if (role === "beast") {
      acts = [{ type: "beast_maul" }];
      say = "獸息噴在臉上。你拼死滾出樹林，只剩半口氣。";
    } else if (role === "factory") {
      acts = [{ type: "factory_seize", heat: 7 }, { type: "favor_delta", amount: -4 }];
      say = name + "冷冷一揮手：「廠裡的人——帶走。」鎖鏈聲在耳邊響。";
    } else if (role === "throne") {
      acts = [{ type: "imprison", place: "tianlao", reason: "犯駕／鬥毆" }, { type: "heat", amount: 8 }];
      say = name + "眉心微蹙：「拿下。交給慎刑司問清楚。」";
    } else if (role === "harem") {
      acts = [{ type: "humiliate" }, { type: "exile", loc: "neiting" }, { type: "favor_delta", amount: -5 }];
      say = name + "掩袖：「真沒用。拖出去——別髒了眼睛。」";
    } else if (role === "military") {
      acts = Math.random() < 0.55
        ? [{ type: "imprison", reason: "軍法／治安" }, { type: "fine", amount: 25 }]
        : [{ type: "warn" }, { type: "fine", amount: 15 }];
      say = name + "按刀：「再動一下，軍棍伺候。先鎖起來。」";
    } else if (role === "merciful") {
      acts = [{ type: "warn" }, { type: "spare" }];
      say = name + "歎道：「夠了。去吧——下次別再犯。」";
    } else if (role === "timid") {
      acts = [{ type: "rob", amount: 12 }, { type: "exile", loc: "hub" }];
      say = name + "手忙腳亂搜了你腰包，轉身就跑：「別、別再跟來！」";
    } else if (role === "ruthless") {
      acts = Math.random() < 0.5
        ? [{ type: "wound" }, { type: "rob", amount: 35 }, { type: "favor_delta", amount: -6 }]
        : [{ type: "imprison" }, { type: "rob", amount: 20 }];
      say = name + "靴尖點了點你：「廢人一個。銀兩留下——命，暫且寄着。」";
    } else if (role === "cunning") {
      acts = [{ type: "rob", amount: 28 }, { type: "warn" }, { type: "favor_delta", amount: -3 }];
      say = name + "笑了笑：「打不過就別打。袋裡的東西——當學費。」";
    } else if (role === "proud") {
      acts = [{ type: "humiliate" }, { type: "warn" }];
      say = name + "收勢：「就這本事？滾。別髒了我的刀。」";
    } else if (role === "bandit") {
      acts = [{ type: "rob", amount: 30 }, { type: "wound" }];
      say = "對方一腳踹開你：「倒楣貨。銀子留下。」";
    } else {
      acts = Math.random() < 0.4 ? [{ type: "rob", amount: 18 }, { type: "warn" }] : [{ type: "spare" }, { type: "heal_camp" }];
      say = name + "收招：「算你命大。」四下漸漸靜了。";
    }
    return { say: say, dispositionActions: acts, disposition: acts[0] && acts[0].type };
  }

  function offlineWinDisposition(text, ctx) {
    const t = String(text || "");
    const name = (ctx.npcId && NPCS[ctx.npcId] && NPCS[ctx.npcId].name) || ctx.enemyName || "對方";
    let acts = [];
    let say = "你按住劍／刀，對" + name + "道：「……」";
    if (/殺|宰|結果|斃|斬|了結|滅口/.test(t)) {
      if (ctx.npcId) acts = [{ type: "kill_npc" }, { type: "karma", amount: -8 }];
      else acts = [{ type: "karma", amount: -3 }, { type: "gold", amount: 15 }];
      say = "刀光一閃，塵埃落定。" + name + "已不能再起。你沒有多看。";
    } else if (/關|綁|抓|擒|押|拘|拿下/.test(t)) {
      acts = ctx.npcId ? [{ type: "bind_npc" }, { type: "karma", amount: -1 }] : [{ type: "report_official" }];
      say = "你制住" + name + "，暫時不能動彈。四周無人敢近。";
    } else if (/搶|搜|搶錢|銀兩|財物|劫/.test(t)) {
      acts = [{ type: "rob_npc", amount: 25 }, { type: "karma", amount: -2 }];
      say = "你從" + name + "身上搜出些散銀。對方恨得牙痒。";
    } else if (/傷|廢|打斷|教訓一頓|打殘/.test(t)) {
      acts = [{ type: "wound_npc" }, { type: "favor_delta", amount: -5 }];
      say = "你點了" + name + "穴道／傷其筋骨，寫意收手。對方蜷在一旁。";
    } else if (/嚇|恐嚇|警告|滾|滾遠/.test(t)) {
      acts = [{ type: "scare_npc" }, { type: "spare_npc" }];
      say = "你冷冷道：「滾。」" + name + "咬牙退開。";
    } else if (/放|饒|不殺|手下留情|走吧|去吧|spare|mercy/.test(t)) {
      acts = [{ type: "spare_npc" }, { type: "karma", amount: 2 }];
      say = "你收勢：「滾吧。」" + name + "錯愕片刻，轉身離去。";
    } else if (/道歉|賠罪|跪|認錯/.test(t)) {
      acts = [{ type: "demand_apology" }, { type: "favor_delta", amount: -2 }];
      say = name + "咬着牙賠了不是。你哼了一聲。";
    } else if (/送官|報官|交給|東廠|官府|衙門/.test(t)) {
      acts = [{ type: "report_official" }, { type: "bind_npc" }];
      say = "你把" + name + "移交有司／廠衛。路上鴉雀無聲。";
    } else if (/同行|收下|跟我|收作|招募/.test(t)) {
      acts = [{ type: "recruit" }, { type: "spare_npc" }];
      say = "你伸手：「暫時跟我走。」" + name + "沉默片刻，點了點頭。";
    } else {
      // default mild
      acts = [{ type: "scare_npc" }, { type: "spare_npc" }];
      say = "你盯着" + name + "：「記住今天。」對方不敢接話。";
    }
    return { say: say, dispositionActions: acts, memoryNote: "戰勝處置・離線" };
  }

  function loseDispositionSystemPrompt() {
    return "你是武俠遊戲「江湖行」戰敗處置裁判。寫意、繁中、禁血腥細描、禁色情。" +
      "只輸出JSON：{\"say\":\"2-5句旁白\",\"dispositionActions\":[{\"type\":\"...\"}]}。" +
      "type 白名單：spare,warn,rob,fine,imprison,factory_seize,exile,wound,humiliate,heal_camp,beast_maul,heat,favor_delta,karma。" +
      "依勝者身份選：東廠→factory_seize；帝→imprison天牢；軍／官→imprison或fine；慈悲→warn+spare；悍匪→rob+wound；野獸→beast_maul。" +
      "actions≤4。不要描寫肢解、酷刑細節、性。";
  }

  function winDispositionSystemPrompt() {
    return "你是武俠遊戲「江湖行」戰勝處置執行器。玩家輸入想如何對待戰敗者。寫意、繁中、禁血腥細描、禁色情。" +
      "只輸出JSON：{\"say\":\"2-5句旁白\",\"dispositionActions\":[{\"type\":\"...\"}]}。" +
      "type 白名單：spare_npc,scare_npc,rob_npc,wound_npc,bind_npc,kill_npc,recruit,demand_apology,report_official,favor_delta,karma,gold,prestige。" +
      "把玩家意圖映射到上述 type 並真改狀態。kill_npc 只改命運為 dead，勿細描。actions≤5。";
  }

  async function interpretLoseDisposition(ctx) {
    const offline = offlineLoseDisposition(ctx);
    if (!(typeof settings === "object" && settings.deepseekKey) || typeof deepseekChat !== "function") return offline;
    try {
      const user = "勝者：" + ((ctx.npcId && NPCS[ctx.npcId] && NPCS[ctx.npcId].name) || ctx.enemyName || "?") +
        " npcId=" + (ctx.npcId || "") + " role=" + v17WinnerRole(ctx.npcId, ctx.enemyId) +
        " personality=" + ((typeof npcProfile === "function" && ctx.npcId && npcProfile(ctx.npcId).personality) || "") +
        " 地點=" + (S.loc || "") + " 玩家品階=" + ((typeof courtRankLabel === "function" && courtRankLabel()) || "") +
        " 帝心=" + (S.emperorFavor || 0) + " 廠熱/宮熱=" + (S.palaceHeat || 0);
      const raw = await deepseekChat(loseDispositionSystemPrompt(), user, 500);
      let parsed = null;
      try {
        const m = String(raw || "").match(/\{[\s\S]*\}/);
        if (m) parsed = JSON.parse(m[0]);
      } catch (e) {}
      if (parsed && (parsed.dispositionActions || parsed.disposition || parsed.say)) {
        if (!parsed.dispositionActions || !parsed.dispositionActions.length) {
          return Object.assign({}, offline, { say: trunc(String(parsed.say || offline.say), 360) });
        }
        return parsed;
      }
    } catch (e2) {}
    return offline;
  }

  async function interpretWinDisposition(text, ctx) {
    const offline = offlineWinDisposition(text, ctx);
    if (!(typeof settings === "object" && settings.deepseekKey) || typeof deepseekChat !== "function") return offline;
    try {
      const user = "玩家戰勝：" + ((ctx.npcId && NPCS[ctx.npcId] && NPCS[ctx.npcId].name) || ctx.enemyName || "?") +
        " npcId=" + (ctx.npcId || "") + "\n玩家想做：" + trunc(String(text), 200) +
        "\n善惡=" + (S.karma || 0) + " 聲望=" + (S.renown || 0);
      const raw = await deepseekChat(winDispositionSystemPrompt(), user, 550);
      let parsed = null;
      try {
        const m = String(raw || "").match(/\{[\s\S]*\}/);
        if (m) parsed = JSON.parse(m[0]);
      } catch (e) {}
      if (parsed && (parsed.dispositionActions || parsed.actions || parsed.say)) {
        if (!parsed.dispositionActions) parsed.dispositionActions = parsed.actions || [];
        if (!parsed.dispositionActions.length) return Object.assign({}, offline, { say: trunc(String(parsed.say || offline.say), 360) });
        return parsed;
      }
    } catch (e2) {}
    return offline;
  }

  function openWinDispositionUi(ctx) {
    const name = (ctx.npcId && NPCS[ctx.npcId] && NPCS[ctx.npcId].name) || ctx.enemyName || "對手";
    const html = "<h3>戰勝・如何處置</h3>" +
      "<p class=\"small\">對手：<strong>" + escapeHtml(name) + "</strong>。可輸入想說／想做的（寫意，無血腥細描）。</p>" +
      "<div class=\"btn-row\" style=\"flex-wrap:wrap;gap:6px;margin-bottom:8px\">" +
      "<button type=\"button\" class=\"btn\" data-wd=\"放他走\">放他走</button>" +
      "<button type=\"button\" class=\"btn\" data-wd=\"嚇退對方\">嚇退</button>" +
      "<button type=\"button\" class=\"btn\" data-wd=\"搜他銀兩\">搜銀</button>" +
      "<button type=\"button\" class=\"btn\" data-wd=\"打傷教訓\">打傷</button>" +
      "<button type=\"button\" class=\"btn\" data-wd=\"綁起來\">制住</button>" +
      "<button type=\"button\" class=\"btn\" data-wd=\"送官\">送官</button>" +
      (ctx.npcId ? "<button type=\"button\" class=\"btn\" data-wd=\"要他同行\">同行</button>" : "") +
      "</div>" +
      "<textarea class=\"input area\" id=\"win-disp-input\" rows=\"3\" placeholder=\"例：放他走，但警告以後別再犯…\"></textarea>" +
      "<div class=\"btn-row\" style=\"margin-top:8px\">" +
      "<button class=\"btn primary\" id=\"win-disp-run\">執行處置</button>" +
      "<button class=\"btn ghost\" id=\"win-disp-skip\">略過</button>" +
      "</div>";
    openModal(html);
    const inp = document.getElementById("win-disp-input");
    document.querySelectorAll("[data-wd]").forEach(function(b) {
      b.onclick = function() {
        if (inp) inp.value = b.getAttribute("data-wd") || "";
      };
    });
    const skip = document.getElementById("win-disp-skip");
    if (skip) skip.onclick = function() {
      closeModal();
      applyCombatDispositionPack({ say: "你收勢而去，未再多言。", dispositionActions: [{ type: "spare_npc" }] }, ctx);
      showStory("【戰勝】你收勢而去。");
      try { render(); } catch (e) {}
    };
    const run = document.getElementById("win-disp-run");
    if (run) run.onclick = async function() {
      const text = ((inp && inp.value) || "").trim();
      if (!text) { toast("請輸入或點快捷", true); return; }
      run.disabled = true;
      toast("處置裁決中…", true);
      const pack = await interpretWinDisposition(text, ctx);
      const out = applyCombatDispositionPack(pack, ctx);
      closeModal();
      showStory("【戰勝處置】\n" + (out.say || "") + (out.note ? "\n" + out.note : ""));
      try { render(); } catch (e2) {}
    };
  }

  async function runLoseDispositionFlow(ctx) {
    toast("戰敗處置中…", true);
    const pack = await interpretLoseDisposition(ctx);
    // ensure player not left at 0 hp without death trigger
    if ((S.hp || 0) <= 0) S.hp = 1;
    const out = applyCombatDispositionPack(pack, ctx);
    if (!isImprisoned || !isImprisoned()) {
      if (!S.loc) S.loc = "hub";
      // if no imprison/factory in actions, default camp if still in combat loc weirdness
      const types = (pack.dispositionActions || []).map(function(a){ return String(a.type || ""); });
      const locked = types.some(function(x){ return /imprison|factory|capture|jail|廠/.test(x); });
      if (!locked && S.hp <= 1 && S.loc !== "hub" && Math.random() < 0.15) {
        // leave as-is
      } else if (!locked && !types.length) {
        S.loc = "hub";
      }
    }
    showStory("【戰敗處置】\n" + (out.say || "") + (out.note ? "\n" + out.note : ""));
    try { render(); } catch (e) {}
  }

  // ---- wrap startCombat ----
  const _startCombatOrig_v17 = typeof startCombat === "function" ? startCombat : null;
  if (_startCombatOrig_v17) {
    startCombat = function(enemyId, onWin, onLose, opts) {
      if (onWin && typeof onWin === "object" && !Array.isArray(onWin) && arguments.length <= 2) {
        opts = onWin;
        onWin = opts.onWin || null;
        onLose = opts.onLose || null;
      }
      opts = opts || {};
      _startCombatOrig_v17(enemyId, onWin, onLose);
      if (ui.combat) {
        const foe = opts.foeNpcId || ui.talking || ui.combat.foeNpcId || null;
        ui.combat.foeNpcId = foe;
        ui.combat.humanoid = opts.humanoid != null ? !!opts.humanoid : v17IsHumanoidEnemy(enemyId);
        ui.combat.enableDisposition = opts.disposition !== false;
      }
    };
  }

  // ---- wrap endCombat ----
  const _endCombatOrig_v17 = typeof endCombat === "function" ? endCombat : null;
  if (_endCombatOrig_v17) {
    endCombat = function(won) {
      const c = ui.combat;
      const snap = c ? {
        enemyId: c.enemyId,
        enemyName: c.enemy && c.enemy.name,
        foeNpcId: c.foeNpcId || null,
        humanoid: c.humanoid,
        enableDisposition: c.enableDisposition !== false,
        onWin: c.onWin,
        onLose: c.onLose,
        fatalOnLose: !!(c.fatalOnLose || c.lethalOnLose),
        fatalReason: c.fatalReason,
        deathScene: c.deathScene
      } : null;

      if (!snap) return _endCombatOrig_v17(won);

      // Fatal lose → keep original death/rebirth path
      if (!won) {
        const heatFatal = (S.palaceHeat || 0) >= 80 && /huanggong|wumen|xingxing|yongxing|tianlao|dongchang|neiting|hougong/.test(String(S.loc || ""));
        if (snap.fatalOnLose || heatFatal) {
          return _endCombatOrig_v17(won);
        }
      }

      if (won) {
        // Apply loot/exp like original, but intercept after-effects for disposition UI
        const base = ENEMIES[snap.enemyId] || {};
        combatLog("戰勝「" + (snap.enemyName || "") + "」！", "sys");
        S.gold += base.gold || 0;
        S.exp += base.exp || 0;
        S.renown += 1;
        if (S.renown >= 30) setFlag("rep_30");
        (base.loot || []).forEach(function(id) {
          if (Math.random() < 0.55 || (ITEMS[id] && ITEMS[id].type === "key")) {
            addItem(id, 1);
            combatLog("獲得「" + ITEMS[id].name + "」", "sys");
          }
        });
        levelCheck();
        const cb = snap.onWin;
        ui.combat = null;
        clamp();
        render();
        toast("勝利", true);
        if (cb) setTimeout(cb, 80);
        setTimeout(function() { try { maybeLoverInitiative("combat"); } catch (e) {} }, 600);
        // Disposition UI for humanoid / NPC foes
        if (snap.enableDisposition && (snap.foeNpcId || snap.humanoid)) {
          setTimeout(function() {
            openWinDispositionUi({
              npcId: snap.foeNpcId,
              enemyId: snap.enemyId,
              enemyName: snap.enemyName
            });
          }, 200);
        }
        return;
      }

      // Non-fatal lose → AI disposition instead of plain hub rescue
      S.hp = 1;
      S.statuses = [];
      const cbLose = snap.onLose;
      ui.combat = null;
      if (cbLose) {
        try { cbLose(); } catch (e0) {}
      }
      // If onLose already imprisoned / moved, still narrate
      const ctx = {
        npcId: snap.foeNpcId,
        enemyId: snap.enemyId,
        enemyName: snap.enemyName
      };
      if (snap.enableDisposition && (snap.foeNpcId || snap.humanoid || !v17IsHumanoidEnemy(snap.enemyId))) {
        runLoseDispositionFlow(ctx);
      } else {
        S.loc = "hub";
        toast("戰敗，被救回營地", true);
        render();
      }
    };
  }

  // Patch talkNpc combat starts to pass foeNpcId (via ui.talking already + wrap)
  // Also patch world free-input attack starts
  const _bindWorldFreeInputOrig_v17 = typeof bindWorldFreeInput === "function" ? bindWorldFreeInput : null;
  if (_bindWorldFreeInputOrig_v17) {
    // After bind, we can't easily patch inner closures; rely on startCombat reading lastWorldFoe
    // Set last foe when handleFreeInput used from world — patch handleFreeInput lightly
  }

  let _v17LastFoeNpc = null;
  const _handleFreeInputOrig_v17 = typeof handleFreeInput === "function" ? handleFreeInput : null;
  if (_handleFreeInputOrig_v17) {
    handleFreeInput = async function(npcId, mode, text) {
      _v17LastFoeNpc = npcId;
      const pack = await _handleFreeInputOrig_v17(npcId, mode, text);
      if (pack && pack.result && (pack.result.behavior === "attack" || pack.result.behavior === "duel")) {
        ui.talking = npcId;
      }
      return pack;
    };
  }

  // Strengthen 更多 menu: 設定・作弊台置頂大標
  const _renderMoreOrig_v17 = typeof renderMore === "function" ? renderMore : null;
  if (_renderMoreOrig_v17) {
    renderMore = function() {
      let html = _renderMoreOrig_v17();
      // Remove duplicate cheat buttons inserted by v16 to avoid clutter, then prepend clear block
      html = html.replace(/<button class=\"btn primary\" id=\"btn-cheat-console\">[\s\S]*?<\/button>/g, "");
      html = html.replace(/<button class=\"btn\" id=\"btn-cheat-console\">[\s\S]*?<\/button>/g, "");
      const block =
        "<div class=\"story-box\" style=\"margin-bottom:12px;border:2px solid #c4a35a\">" +
        "<h3 style=\"margin:0 0 6px\">⚙ 設定・作弊台</h3>" +
        "<p class=\"small\" style=\"margin:0 0 8px\">在此輸入指令可<strong>直接改遊戲</strong>（例：皇帝升玩家為大太監／給銀兩500）。與「DeepSeek 設定」不同。</p>" +
        "<div class=\"btn-row\">" +
        "<button class=\"btn primary\" id=\"btn-cheat-console\">打開【設定・作弊台】</button>" +
        "<button class=\"btn\" id=\"btn-settings\">DeepSeek API 設定</button>" +
        "</div></div>";
      // Prefer inject after first <h3>系統</h3> or at start
      if (html.indexOf("<h3>系統</h3>") >= 0) {
        html = html.replace("<h3>系統</h3>", block + "<h3>系統</h3>");
      } else {
        html = block + html;
      }
      // Avoid duplicate DeepSeek buttons: keep one in block; strip old lone btn-settings if duplicated awkwardly — leave as is
      return html;
    };
  }

  const _renderOrig_v17 = typeof render === "function" ? render : null;
  if (_renderOrig_v17) {
    render = function() {
      const r = _renderOrig_v17.apply(this, arguments);
      setTimeout(function() {
        const b1 = document.getElementById("btn-cheat-console");
        if (b1 && typeof openCheatConsole === "function") {
          b1.onclick = function() { openCheatConsole(); };
        }
        // Map tab hint chip once
        try {
          if (ui.tab === "map") {
            const app = document.getElementById("app");
            if (app && !document.getElementById("cheat-hint-chip") && typeof openCheatConsole === "function") {
              // soft: only if more tab exists — skip map spam
            }
          }
        } catch (e) {}
      }, 0);
      return r;
    };
  }

  // Self-test
  window.__JH_V17_SELFTEST = function() {
    const g0 = S.gold;
    const loseBandit = offlineLoseDisposition({ enemyId: "bandit", enemyName: "山賊" });
    const out1 = applyCombatDispositionPack(loseBandit, { enemyId: "bandit" });
    const okRob = (S.gold || 0) <= g0; // robbed or spare
    S.gender = "男";
    const loseDc = offlineLoseDisposition({ npcId: "dongchang_gong", enemyId: "shadow", enemyName: "督公" });
    const hasFactory = (loseDc.dispositionActions || []).some(function(a){ return /factory|dongchang|廠/.test(String(a.type)); });
    const winPack = offlineWinDisposition("放他走", { npcId: "heifeng", enemyName: "黑風" });
    const hasSpare = (winPack.dispositionActions || []).some(function(a){ return /spare/.test(String(a.type)); });
    const winKill = offlineWinDisposition("殺了他", { npcId: "heifeng", enemyName: "黑風" });
    const hasKill = (winKill.dispositionActions || []).some(function(a){ return /kill/.test(String(a.type)); });
    // restore soft gold
    S.gold = g0;
    if (S.prison) S.prison = null;
    const moreHas = true;
    return {
      ok: !!(hasFactory && hasSpare && hasKill && _endCombatOrig_v17 && _startCombatOrig_v17),
      hasFactory: hasFactory, hasSpare: hasSpare, hasKill: hasKill,
      loseSay: loseBandit.say, winSay: winPack.say, note1: out1.note,
      wrapped: !!_endCombatOrig_v17
    };
  };

  if (window.__JH_DEBUG) {
    Object.assign(window.__JH_DEBUG, {
      offlineLoseDisposition: offlineLoseDisposition,
      offlineWinDisposition: offlineWinDisposition,
      applyCombatDispositionPack: applyCombatDispositionPack,
      openWinDispositionUi: openWinDispositionUi,
      v17self: window.__JH_V17_SELFTEST,
      v17EnemyForNpc: v17EnemyForNpc
    });
  }

  // ========== END V17 ==========
