
  // ========== V9b: PALACE IDENTITY REACTIONS + AI STATE MUTATIONS ==========
  // Homage only (景安／青梧). AI courtActions MUST mutate real save state.

  const COURT_AI_GIFT_WHITELIST = {
    herb:1, pill:1, wine:1, detox:1, big_pill:1, candy:1, focus_incense:1, med_salve:1,
    palace_badge:1, palace_jade:1, palace_ruyi:1, palace_jinpao:1, palace_silk:1,
    palace_yaopai_adv:1, court_seal_ink:1, eunuch_gift_box:1, soft_silk_robe:1,
    bronze_mirror:1, jade_ring:1, yulin_pass:1
  };

  const COURT_NPC_FACTION = {
    jingandi:"throne", shen_guifei:"harem", liu_zhaoyi:"harem", mao_dongzhu_x:"harem",
    jianning_jun:"harem", gongnv_head:"inner", wei_xiaozhou:"eunuch_peer",
    hai_dafu_x:"eunuch_peer", dongchang_gong:"factory", da_jiangjun:"military",
    duo_long_x:"military", suo_etu_x:"civil", ao_baiying:"civil", leiwanshan:"military",
    lover_eunuch:"eunuch_peer", lover_guard:"military", lover_scholar:"civil",
    lover_official:"civil", lover_tao:"medic"
  };

  function ensureCourtIdentityState() {
    ensureCourtCareer();
    if (typeof S.courtShopDisc !== "number") S.courtShopDisc = 0;
    if (typeof S.courtShopDiscUntil !== "number") S.courtShopDiscUntil = 0;
    if (!S.courtNpcDeny || typeof S.courtNpcDeny !== "object") S.courtNpcDeny = {};
    if (typeof S.courtImprisonBias !== "number") S.courtImprisonBias = 0;
  }

  function courtPowerScore() {
    ensureCourtIdentityState();
    let p = 5;
    const track = S.courtTrack || "none";
    if (track === "civil" || track === "military") {
      const pin = courtPinNumber();
      if (pin <= 1) p = 88; else if (pin <= 3) p = 72; else if (pin <= 5) p = 55;
      else if (pin <= 7) p = 35; else if (pin <= 9) p = 18; else p = 8;
    } else if (track === "eunuch") {
      p = ({1:8,2:22,3:42,4:68,5:86})[S.courtGrade || 0] || 4;
    } else if (track === "maid") {
      p = ({1:10,2:22,3:40,4:58,5:75})[S.courtGrade || 0] || 6;
    }
    if (S.serveTargetId === "jingandi") p += 18;
    else if (S.serveTargetId === "shen_guifei" || S.serveTargetId === "mao_dongzhu_x") p += 12;
    else if (S.serveTargetId === "jianning_jun") p += 8;
    else if (S.serveTargetId === "gongnv_head") p += 4;
    if ((S.emperorFavor || 0) >= 60) p += 12;
    else if ((S.emperorFavor || 0) >= 35) p += 6;
    const aff = S.datingAff || {};
    ["shen_guifei","mao_dongzhu_x","jianning_jun","gongnv_head","wei_xiaozhou","da_jiangjun"].forEach(function(id){
      if ((aff[id] || 0) >= 60) p += 8;
      else if ((aff[id] || 0) >= 40) p += 4;
    });
    if ((S.palaceHeat || 0) >= 40) p -= 10;
    if ((S.palaceHeat || 0) >= 70) p -= 8;
    if ((S.karma || 0) <= -40) p += 5; // factory path fear
    return Math.max(0, Math.min(100, p));
  }

  function courtIdentityBlob() {
    ensureCourtIdentityState();
    return {
      track: S.courtTrack || "none",
      trackLabel: typeof courtTrackLabel === "function" ? courtTrackLabel() : "",
      rank: typeof courtRankLabel === "function" ? courtRankLabel() : "",
      pinApprox: typeof courtPinNumber === "function" ? courtPinNumber() : 99,
      grade: S.courtGrade || 0,
      prestige: S.courtPrestige || 0,
      serveTarget: S.serveTargetId || null,
      eunuchHall: S.eunuchAssignedHall || null,
      power: courtPowerScore(),
      emperorFavor: S.emperorFavor || 0,
      palaceHeat: S.palaceHeat || 0,
      karma: S.karma || 0,
      perceivedGender: typeof perceivedGender === "function" ? perceivedGender() : S.gender,
      eunuchFlag: !!flag("eunuch"),
      canDebate: typeof canShangdianYizheng === "function" && canShangdianYizheng()
    };
  }

  function identityStanceForNpc(npcId) {
    ensureCourtIdentityState();
    const power = courtPowerScore();
    const track = S.courtTrack || "none";
    const fac = COURT_NPC_FACTION[npcId] || "jianghu";
    const aff = (S.datingAff && S.datingAff[npcId]) || 0;
    const fate = (S.fates && S.fates[npcId]) || "default";
    if (fate === "enemy") return "scorn";
    if (fate === "ally" || fate === "married" || fate === "muse" || aff >= 55) {
      return power >= 50 ? "protect" : "deference";
    }
    // powerful patron umbrella
    const patronBoost = (S.serveTargetId && (S.emperorFavor || 0) >= 40) || aff >= 60;
    if (track === "eunuch") {
      const g = S.courtGrade || 0;
      if (g <= 1) {
        if (fac === "military" || fac === "civil" || fac === "throne") return "scorn";
        if (fac === "eunuch_peer") return power < 15 ? "snub" : "neutral";
        if (fac === "harem" || fac === "inner") return "snub";
        return "scorn";
      }
      if (g === 2) {
        if (fac === "military" || fac === "civil") return "snub";
        if (fac === "eunuch_peer") return "neutral";
        return "snub";
      }
      if (g === 3) {
        if (fac === "throne") return "deference";
        if (fac === "military" || fac === "civil") return "neutral";
        return "deference";
      }
      if (g >= 4) {
        if (fac === "throne") return g >= 5 ? "fear" : "flattery";
        if (fac === "military" || fac === "civil" || fac === "inner") return "flattery";
        if (fac === "eunuch_peer") return "fear";
        if (fac === "harem") return "deference";
        return "flattery";
      }
    }
    if (track === "maid") {
      const g = S.courtGrade || 0;
      if (g <= 1) return (fac === "harem" || fac === "inner") ? "snub" : "neutral";
      if (g <= 3) return fac === "harem" ? "deference" : "neutral";
      return fac === "throne" || fac === "harem" ? "deference" : (patronBoost ? "protect" : "flattery");
    }
    if (track === "civil" || track === "military") {
      const pin = courtPinNumber();
      if (pin <= 3) {
        if (fac === "throne") return "deference";
        if (fac === "eunuch_peer") return "fear";
        return "deference";
      }
      if (pin <= 5) return fac === "eunuch_peer" && (S.courtGrade || 0) >= 4 ? "flattery" : "deference";
      if (pin >= 8) return fac === "throne" || fac === "harem" ? "snub" : "neutral";
      return "neutral";
    }
    // white body in palace
    if (typeof hasPalaceAccess === "function" && hasPalaceAccess()) {
      if (fac === "throne" || fac === "military" || fac === "inner") return "snub";
    }
    if (patronBoost) return "protect";
    return "neutral";
  }

  function identityStanceHint(stance) {
    return ({
      scorn: "藐視、譏諷、拒幫忙；behavior 傾向 rebuke／hostile／refuse；可 favor 下降。",
      snub: "愛理不理、簡短；可不給任務。",
      neutral: "平常客套。",
      deference: "稱職名、客氣讓路；可 help。",
      flattery: "賠笑巴結、主動送禮；behavior 用 gift／help；可 courtActions flattery_gift。",
      fear: "不敢得罪、主動示好或塞好處；可用 gift／follow／pending_deal。",
      protect: "願作證／擋災／相助；help／parole；favor 微升。",
      bribe_offer: "試探塞好處換辦事；可 pending_deal。"
    })[stance] || "平常。";
  }

  function courtIdentityPromptBlock(npcId) {
    const id = courtIdentityBlob();
    const stance = identityStanceForNpc(npcId);
    return "【宮廷身份上下文】玩家仕途=" + id.trackLabel + "／" + id.rank +
      "（約" + id.pinApprox + "品）威望=" + id.prestige + " 權勢分=" + id.power +
      " 服侍=" + (id.serveTarget || "無") + " 分殿=" + (id.eunuchHall || "無") +
      " 帝心=" + id.emperorFavor + " 宮熱=" + id.palaceHeat + " 善惡=" + id.karma +
      " 太監籍=" + id.eunuchFlag + "。你對玩家應採態度【" + stance + "】：" + identityStanceHint(stance) +
      " 禁真實清帝名與金庸真名。若判定升官／送禮／輕蔑拒服侍／開任務／關押／改好感／調殿／塞交易——必須在 JSON 加 courtActions 陣列（見協議），本地會寫入存檔。" +
      " courtActions 例：{\"type\":\"gift_item\",\"item\":\"palace_silk\",\"n\":1} | promote | favor_delta | scorn | flattery_gift | open_quest | imprison | assign_hall | pending_deal | prestige | shop_discount";
  }

  function applyCourtAiAction(npcId, action) {
    if (!action || typeof action !== "object") return "";
    ensureCourtIdentityState();
    const t = String(action.type || action.action || "").toLowerCase();
    let note = "";
    try {
      if (t === "promote" || t === "rank_up") {
        const before = courtRankLabel();
        if (action.prestige) bumpCourtPrestige(Math.min(40, Number(action.prestige) || 10), "權貴提攜");
        else bumpCourtPrestige(12, "權貴提攜");
        if (action.forcePin && (S.courtTrack === "civil" || S.courtTrack === "military") && S.courtPin < 18) {
          S.courtPin += 1; tryAutoCourtPromote();
        }
        if (action.forceGrade && (S.courtTrack === "eunuch" || S.courtTrack === "maid") && S.courtGrade < 5) {
          S.courtGrade += 1; tryAutoCourtPromote();
        }
        note = "（品階／威望變動：" + before + "→" + courtRankLabel() + "）";
      } else if (t === "prestige") {
        const n = Math.max(-30, Math.min(40, Number(action.amount != null ? action.amount : action.n) || 5));
        bumpCourtPrestige(n, action.why || "人物裁奪");
        note = "（威望" + (n >= 0 ? "＋" : "") + n + "）";
      } else if (t === "demote_heat" || t === "heat") {
        const h = Math.max(1, Math.min(20, Number(action.heat || action.amount) || 4));
        if (typeof bumpPalaceHeat === "function") bumpPalaceHeat(h);
        if (action.prestige) bumpCourtPrestige(-Math.abs(Number(action.prestige) || 3), "物議");
        note = "（宮熱上升）";
      } else if (t === "gift_item" || t === "gift") {
        const id = action.item || action.id || "palace_silk";
        const n = Math.max(1, Math.min(5, Number(action.n) || 1));
        if (COURT_AI_GIFT_WHITELIST[id] && ITEMS[id]) {
          addItem(id, n);
          note = "（獲贈" + ITEMS[id].name + (n > 1 ? "×" + n : "") + "）";
        } else if (ITEMS.palace_silk) {
          addItem("palace_silk", 1);
          note = "（獲贈宮緞）";
        }
      } else if (t === "give_gold") {
        const g = Math.max(1, Math.min(200, Number(action.amount || action.gold) || 20));
        S.gold = (S.gold || 0) + g;
        note = "（獲銀兩＋" + g + "）";
      } else if (t === "take_gold") {
        const g = Math.max(1, Math.min(200, Number(action.amount || action.gold) || 10));
        S.gold = Math.max(0, (S.gold || 0) - g);
        note = "（破費－" + g + "金）";
      } else if (t === "favor_delta" || t === "favor") {
        const d = Math.max(-15, Math.min(15, Number(action.amount != null ? action.amount : action.n) || 2));
        const target = action.npcId || action.target || npcId;
        if (target === "jingandi" || action.emperor) {
          if (typeof bumpEmperorFavor === "function") bumpEmperorFavor(d, "人物裁奪");
        } else {
          if (!S.datingAff) S.datingAff = {};
          S.datingAff[target] = (S.datingAff[target] || 0) + d;
        }
        if (typeof ensureNpcMem === "function") {
          const m = ensureNpcMem(target);
          m.trust = (m.trust || 0) + Math.max(-5, Math.min(5, Math.round(d / 2)));
        }
        note = "（好感" + (d >= 0 ? "＋" : "") + d + "）";
      } else if (t === "karma_delta" || t === "karma") {
        const k = Math.max(-10, Math.min(10, Number(action.amount != null ? action.amount : action.n) || -1));
        if (typeof adjustKarma === "function") adjustKarma(k, action.why || "宮廷往來");
        note = "（善惡變動）";
      } else if (t === "scorn") {
        if (!S.datingAff) S.datingAff = {};
        S.datingAff[npcId] = (S.datingAff[npcId] || 0) - Math.abs(Number(action.favor) || 3);
        if (typeof ensureNpcMem === "function") {
          const m = ensureNpcMem(npcId);
          m.trust = (m.trust || 0) - 2;
        }
        if (action.denyQuest) S.courtNpcDeny[npcId] = S.day;
        if (action.heat && typeof bumpPalaceHeat === "function") bumpPalaceHeat(Number(action.heat) || 2);
        note = "（被輕蔑，好感下降）";
      } else if (t === "flattery_gift") {
        if (!S.datingAff) S.datingAff = {};
        S.datingAff[npcId] = (S.datingAff[npcId] || 0) + Math.abs(Number(action.favor) || 2);
        const id = action.item || "palace_silk";
        if (COURT_AI_GIFT_WHITELIST[id] && ITEMS[id]) addItem(id, Number(action.n) || 1);
        else if (ITEMS.palace_silk) addItem("palace_silk", 1);
        const pct = Math.max(3, Math.min(15, Number(action.discount) || 8));
        S.courtShopDisc = Math.max(S.courtShopDisc || 0, pct);
        S.courtShopDiscUntil = Math.max(S.courtShopDiscUntil || 0, (S.day || 0) + (Number(action.days) || 3));
        note = "（巴結送禮，好感升，宮市暫有折扣）";
      } else if (t === "shop_discount") {
        const pct = Math.max(3, Math.min(20, Number(action.pct || action.amount) || 8));
        S.courtShopDisc = Math.max(S.courtShopDisc || 0, pct);
        S.courtShopDiscUntil = Math.max(S.courtShopDiscUntil || 0, (S.day || 0) + (Number(action.days) || 3));
        note = "（宮市折扣約" + pct + "%）";
      } else if (t === "open_quest") {
        const qid = action.questId || action.id;
        if (qid && typeof COURT_QUESTS !== "undefined" && COURT_QUESTS.some(function(q){ return q.id === qid; })) {
          if (!S.courtQuests) S.courtQuests = {};
          S.courtQuests[qid] = { active: true, done: false, claimedDay: S.day };
          const q = COURT_QUESTS.find(function(x){ return x.id === qid; });
          if (q && q.loc) setFlag("map_" + q.loc);
          note = "（獲差遣・" + (q ? q.title : qid) + "）";
        }
      } else if (t === "deny_quest") {
        S.courtNpcDeny[npcId] = S.day;
        note = "（對方拒給差事）";
      } else if (t === "imprison" || t === "capture_jail") {
        S.courtImprisonBias = Math.max(S.courtImprisonBias || 0, 1);
        if (typeof beginImprisonment === "function") {
          try { beginImprisonment(action.place || "tianlao", action.reason || "宮規／朝議"); note = "（被拿下關押）"; }
          catch (e1) {
            if (typeof capturePlayer === "function") { try { capturePlayer(npcId); note = "（被擒）"; } catch (e2) { note = "（險些被擒）"; } }
            else note = "（險些被擒）";
          }
        } else if (typeof isImprisoned === "function" && !isImprisoned() && typeof S.prison === "object") {
          note = "（對方欲擒拿）";
        } else note = "（對方欲擒拿）";
      } else if (t === "assign_hall") {
        if (typeof assignEunuchHall === "function") {
          assignEunuchHall(action.hall || action.hallId || null);
          note = "（分殿・" + (typeof eunuchHallName === "function" ? eunuchHallName() : S.eunuchAssignedHall) + "）";
        }
      } else if (t === "set_serve") {
        if (action.clear) { S.serveTargetId = null; note = "（卸任服侍）"; }
        else if (action.target || action.id) {
          S.serveTargetId = action.target || action.id;
          note = "（改服侍・" + S.serveTargetId + "）";
        }
      } else if (t === "pending_deal") {
        if (!S.pendingDeal && typeof COURT_DEALS !== "undefined" && COURT_DEALS.length) {
          const d = action.dealId ? COURT_DEALS.find(function(x){ return x.id === action.dealId; }) : COURT_DEALS[Math.floor(Math.random() * COURT_DEALS.length)];
          if (d) {
            S.pendingDeal = Object.assign({ day: S.day, fromNpc: npcId }, d);
            S.courtDealDay = S.day;
            note = "（有人塞來好處交易）";
          }
        }
      } else if (t === "companion") {
        if (action.clear && typeof dismissCompanion === "function") { dismissCompanion(); note = "（解散同行）"; }
        else if (action.npcId && typeof inviteCompanion === "function") {
          try { inviteCompanion(action.npcId); note = "（邀同行）"; } catch (e3) {}
        }
      }
    } catch (err) {
      console.warn("applyCourtAiAction", t, err);
    }
    return note;
  }

  function applyNpcMutation(npcId, result) {
    if (!result) return "";
    ensureCourtIdentityState();
    let notes = [];
    const list = result.courtActions || result.actions || [];
    if (Array.isArray(list)) {
      list.forEach(function(a){
        const n = applyCourtAiAction(npcId, a);
        if (n) notes.push(n);
      });
    }
    // single-field shortcuts from AI
    if (result.courtPromote) notes.push(applyCourtAiAction(npcId, { type: "promote", prestige: result.courtPromote }));
    if (result.courtGift && typeof result.courtGift === "string") notes.push(applyCourtAiAction(npcId, { type: "gift_item", item: result.courtGift }));
    if (typeof result.favorDelta === "number") notes.push(applyCourtAiAction(npcId, { type: "favor_delta", amount: result.favorDelta }));
    return notes.filter(Boolean).join("");
  }

  function stanceDerivedActions(npcId, stance) {
    const acts = [];
    if (stance === "scorn") acts.push({ type: "scorn", favor: 3, heat: Math.random() < 0.25 ? 2 : 0 });
    else if (stance === "snub") {
      if (Math.random() < 0.35) acts.push({ type: "deny_quest" });
      acts.push({ type: "favor_delta", amount: -1 });
    } else if (stance === "flattery") {
      acts.push({ type: "flattery_gift", item: Math.random() < 0.5 ? "palace_silk" : "eunuch_gift_box", favor: 2, discount: 8, days: 3 });
    } else if (stance === "fear") {
      acts.push({ type: "gift_item", item: "palace_ruyi", n: 1 });
      acts.push({ type: "favor_delta", amount: 3 });
      acts.push({ type: "shop_discount", pct: 10, days: 4 });
      if (Math.random() < 0.3) acts.push({ type: "pending_deal" });
    } else if (stance === "protect") {
      acts.push({ type: "favor_delta", amount: 2 });
      if (Math.random() < 0.4) acts.push({ type: "prestige", amount: 3, why: "靠山照應" });
    } else if (stance === "deference" && Math.random() < 0.2) {
      acts.push({ type: "favor_delta", amount: 1 });
    } else if (stance === "bribe_offer") {
      acts.push({ type: "pending_deal" });
    }
    return acts;
  }

  function identityAwareGreeting(npcId) {
    const npc = NPCS[npcId];
    if (!npc) return "";
    const stance = identityStanceForNpc(npcId);
    const rank = typeof courtRankLabel === "function" ? courtRankLabel() : "";
    const name = npc.name;
    const lines = {
      scorn: [
        name + "瞟你一眼，鼻腔裡哼一聲：「就你這——" + (flag("eunuch") ? "半個身子的貨" : "白身") + "，也配攔路？」",
        name + "袖子一甩：「滾遠點。我還沒閒到跟" + (S.courtTrack === "eunuch" ? "小太監" : "閒人") + "敘舊。」"
      ],
      snub: [
        name + "目光從你肩上掠過，只淡淡道：「哦。知道了。」",
        name + "：「有事？說完就走。別擋差。」"
      ],
      neutral: [
        name + "點頭：「嗯。」",
        name + "：「今日宮裡不太平靜——你自己小心。」"
      ],
      deference: [
        name + "抱拳／斂衽：「見過" + rank + "。」",
        name + "側身讓路：「請。" + rank + "先行。」"
      ],
      flattery: [
        name + "堆笑：「公公／大人萬安——小人備了薄禮，不成敬意。」",
        name + "低聲：「您在敬事房／吏部一句話，比我們跑斷腿強。」"
      ],
      fear: [
        name + "臉色一白，忙低頭：「萬、萬安……小人眼拙，有眼不識泰山。」",
        name + "塞過來一小匣：「不成敬意——千萬別往心裡去。」"
      ],
      protect: [
        name + "隔袖擋了旁人一眼：「這位是我的人。有話找我。」",
        name + "：「近日風聲緊。你若被參，我可作證。」"
      ],
      bribe_offer: [
        name + "環顧左右，壓低聲音：「有樁小事……成了，好處少不了。」"
      ]
    };
    const arr = lines[stance] || lines.neutral;
    return arr[Math.floor(Math.random() * arr.length)];
  }

  // ---- Wrap AI / offline / shop / talk ----
  const _aiNpcInteractOrig_v9b = aiNpcInteract;
  aiNpcInteract = async function(npcId, mode, playerText) {
    const npc = NPCS[npcId];
    const mem = memoryPromptPayload(npcId);
    const p = npcProfile(npcId);
    const intentGuess = classifyIntent(mode, playerText);
    const idBlock = courtIdentityPromptBlock(npcId);
    const sys = "你是武俠遊戲「江湖行」NPC「" + npc.name + "」（" + npc.title + "）。性格：" + p.label + "（" + p.personality + "）。" + p.desc +
      " 武功約" + p.martial + "。繁體中文。禁止金庸原著IP與真實清帝名。必須符合性格。" +
      idBlock +
      "暗算／偷襲按武功警覺判定；弱則受傷，強則護體／避開／擒拿。慈悲型關押悔過；狠角色反殺；醫者膽小型逃跑求援。關押中回應逃獄須合理。" +
      "若玩家求拜師／結義／定情／入教／合夥且你願意：behavior用accept並填offerId；不願則refuse。授予由本地判定。" +
      "只輸出JSON：{\"say\":\"2-5句\",\"behavior\":\"help|hostile|flee|gift|trade|quest_hint|attack|ignore|follow|capture|wound|dodge|guard|rebuke|lecture|parole|release|trap|duel|accept|teach|refuse|train\",\"offerId\":null,\"flagUpdates\":{},\"fateHint\":null,\"grants\":{},\"memoryNote\":\"一句\",\"intent\":\"" + intentGuess + "\",\"courtActions\":[]}" +
      " 命運=" + S.fates[npcId] + " 信任=" + mem.trust + " 羈絆=" + bondSummary(npcId) + " 模式=" + mode + " 關押=" + isImprisoned() +
      " 可選offer=" + JSON.stringify((NPC_OFFERS[npcId]||[]).map(function(o){ return o.id; }));
    const userObj = { player: S.name, mode: mode, utterance: playerText, intentGuess: intentGuess, world: JSON.parse(contextBlob()), memory: mem, location: S.loc, courtIdentity: courtIdentityBlob(), stance: identityStanceForNpc(npcId) };
    const text = await deepseekChat(sys, JSON.stringify(userObj), 700);
    const parsed = parseAiJson(text);
    if (parsed) return sanitizeAiResult(parsed, npcId);
    if (text) return sanitizeAiResult({ say: text, behavior: "ignore", memoryNote: "非JSON回覆", intent: intentGuess }, npcId);
    return null;
  };

  const _sanitizeAiResultOrig_v9b = sanitizeAiResult;
  sanitizeAiResult = function(raw, npcId) {
    const out = _sanitizeAiResultOrig_v9b(raw, npcId);
    if (raw && typeof raw === "object") {
      if (Array.isArray(raw.courtActions)) out.courtActions = raw.courtActions;
      else if (Array.isArray(raw.actions)) out.courtActions = raw.actions;
      if (raw.courtPromote) out.courtPromote = raw.courtPromote;
      if (raw.courtGift) out.courtGift = raw.courtGift;
      if (typeof raw.favorDelta === "number") out.favorDelta = raw.favorDelta;
    }
    return out;
  };

  const _applyAiResultOrig_v9b = applyAiResult;
  applyAiResult = function(npcId, result, mode, playerText) {
    let note = _applyAiResultOrig_v9b(npcId, result, mode, playerText);
    const mut = applyNpcMutation(npcId, result);
    if (mut) note = (note || "") + mut;
    // behavior-linked court defaults when AI forgot courtActions
    if (result && (!result.courtActions || !result.courtActions.length)) {
      const stance = identityStanceForNpc(npcId);
      if (result.behavior === "rebuke" || result.behavior === "hostile") {
        note += applyCourtAiAction(npcId, { type: "scorn", favor: 2 });
      } else if (result.behavior === "gift" && (stance === "flattery" || stance === "fear")) {
        note += applyCourtAiAction(npcId, { type: "flattery_gift", item: "palace_silk", favor: 1, discount: 5, days: 2 });
      } else if (result.behavior === "capture") {
        note += applyCourtAiAction(npcId, { type: "imprison" });
      }
    }
    try { if (typeof saveGameSilent === "function") saveGameSilent(); } catch (e) {}
    return note;
  };

  const _offlineInteractOrig_v9b = offlineInteract;
  offlineInteract = function(npcId, mode, playerText) {
    const stance = identityStanceForNpc(npcId);
    // Only override tone for palace-relevant NPCs or when player has court identity
    const fac = COURT_NPC_FACTION[npcId];
    const inCourt = !!fac || (S.courtTrack && S.courtTrack !== "none") || flag("eunuch");
    if (!inCourt) return _offlineInteractOrig_v9b(npcId, mode, playerText);

    const hard = typeof offlineResolveIntent === "function" ? offlineResolveIntent(npcId, mode, playerText) : null;
    if (hard) return hard;
    const commit = typeof resolveCommitment === "function" ? resolveCommitment(npcId, mode, playerText) : null;
    if (commit) return commit;

    const greet = identityAwareGreeting(npcId);
    let behavior = "ignore";
    let say = greet;
    let memoryNote = "身份態度・" + stance;
    const hostileWord = /殺|打|搶|騙|侮辱|去死|廢物|威脅/.test(playerText || "");
    const kindWord = /謝|幫忙|醫|救|贈|請教|請安|敬仰|結義|朋友|關照/.test(playerText || "");
    const askWord = /任務|差遣|升官|品級|威望|腰牌|賞賜|議政/.test(playerText || "");

    if (stance === "scorn") {
      behavior = hostileWord ? "hostile" : "rebuke";
      say = greet + (hostileWord ? "\n「還敢放肆？」" : "\n「再囉嗦，掌事姑姑／校尉有的是法子。」");
    } else if (stance === "snub") {
      behavior = "ignore";
      say = greet + "\n（對方明顯不想多談。）";
    } else if (stance === "flattery" || stance === "fear") {
      behavior = kindWord || askWord ? "gift" : "help";
      say = greet + (askWord ? "\n「差事？您開口，小人去辦。」" : "\n「您慢走——需要什麼只管吩咐。」");
    } else if (stance === "protect") {
      behavior = "help";
      say = greet + "\n「有我在，誰敢難為你。」";
    } else if (stance === "deference") {
      behavior = kindWord ? "help" : "follow";
      say = greet + (askWord ? "\n「朝廷差遣，按例可去乾清宮領。」" : "");
    } else if (hostileWord) {
      behavior = "hostile"; say = NPCS[npcId].name + "沉臉：「說話小心。」";
    } else if (kindWord) {
      behavior = "help"; say = greet + "\n「你有心。」";
    } else {
      say = greet + "\n（聽著你說：「" + trunc(playerText, 40) + "」）";
    }

    const result = sanitizeAiResult({
      say: say, behavior: behavior, memoryNote: memoryNote,
      intent: classifyIntent(mode, playerText),
      courtActions: stanceDerivedActions(npcId, stance)
    }, npcId);
    return result;
  };

  const _offlineTalkOrig_v9b = offlineTalk;
  offlineTalk = function(npcId) {
    const fac = COURT_NPC_FACTION[npcId];
    if (fac || (S.courtTrack && S.courtTrack !== "none") || flag("eunuch")) {
      try {
        const g = identityAwareGreeting(npcId);
        if (g) return g;
      } catch (e) {}
    }
    return _offlineTalkOrig_v9b(npcId);
  };

  const _shopPriceOrig_v9b = shopPrice;
  shopPrice = function(it) {
    let price = _shopPriceOrig_v9b(it);
    ensureCourtIdentityState();
    if ((S.day || 0) > (S.courtShopDiscUntil || 0)) S.courtShopDisc = 0;
    const loc = S.loc || "";
    const palaceShop = /huanggong|neiting|hougong|yushan|neiwufu|qianqing|jingji|yulin/.test(loc);
    if (!palaceShop) return price;
    let mod = 0;
    const power = courtPowerScore();
    const track = S.courtTrack || "none";
    if (track === "eunuch" && (S.courtGrade || 0) <= 1) mod += 0.12;
    else if (track === "eunuch" && (S.courtGrade || 0) >= 4) mod -= 0.12;
    else if (track === "maid" && (S.courtGrade || 0) <= 1) mod += 0.06;
    else if ((track === "civil" || track === "military") && courtPinNumber() <= 5) mod -= 0.08;
    if (power >= 70) mod -= 0.06;
    if (S.courtShopDisc) mod -= (S.courtShopDisc / 100);
    mod = Math.max(-0.35, Math.min(0.25, mod));
    return Math.max(1, Math.floor(price * (1 + mod)));
  };

  // Expand quest pool (push if not present)
  const COURT_QUESTS_EXTRA = [
    { id:"cq_eun_low_sweep", title:"茅房提燈", loc:"neiting", tracks:["eunuch"], minGrade:1, maxGrade:2, prestige:6, gold:2, exp:3, text:"低階雜役。有人掩鼻而過：「半個人，也會嫌臭？」", karma:0 },
    { id:"cq_eun_low_mock", title:"挨罵端尿盆", loc:"yushan", tracks:["eunuch"], minGrade:1, maxGrade:2, prestige:5, gold:1, exp:2, text:"尚膳監小太監呵斥你。你咬牙做完。", item:"herb", itemN:1 },
    { id:"cq_eun_mid_pass", title:"傳膳腰牌差", loc:"yangxin", tracks:["eunuch"], minGrade:2, maxGrade:3, prestige:14, gold:12, exp:5, text:"你持腰牌傳膳入養心。近侍點頭。", item:"palace_badge", emperorFavor:1 },
    { id:"cq_eun_high_gift", title:"節賞分發", loc:"neiwufu", tracks:["eunuch"], minGrade:4, prestige:22, gold:30, exp:6, text:"你按冊發宮賞。官員賠笑稱公公。", item:"palace_ruyi", charm:1 },
    { id:"cq_eun_high_silence", title:"堵御史口風", loc:"xingbu_gate", tracks:["eunuch"], minGrade:4, prestige:20, gold:45, exp:5, dirty:true, karma:-6, heat:9, text:"高階內侍差你「勸」住一本奏摺。", item:"eunuch_gift_box" },
    { id:"cq_eun_hall_audit", title:"本殿清點", loc:"yushan", tracks:["eunuch"], minGrade:3, prestige:16, gold:15, exp:5, text:"清點膳房炭額。多出的……你當沒看見。" },
    { id:"cq_civ_memo_ext", title:"票擬加簽", loc:"qianqing", tracks:["civil"], maxPin:6, prestige:18, gold:20, exp:6, wit:1, text:"你加簽一角邊糧票擬。", item:"court_seal_ink" },
    { id:"cq_civ_debate_prep", title:"議政備料", loc:"taihedian", tracks:["civil"], maxPin:3, prestige:25, gold:25, exp:8, text:"三品議政備章疏。御史目光如刀。", emperorFavor:1 },
    { id:"cq_civ_dirty_impeach", title:"代草彈章", loc:"wenyuan", tracks:["civil"], prestige:20, gold:50, exp:5, dirty:true, karma:-7, heat:10, text:"有人要你彈無辜同僚。銀錠壓紙。" },
    { id:"cq_civ_exam_guard", title:"科場巡號", loc:"dianshi", tracks:["civil"], prestige:15, gold:14, exp:5, renown:1, text:"防夾帶。貢士們對你點頭稱官。" },
    { id:"cq_mil_drill_ext", title:"羽林加操", loc:"yulin", tracks:["military"], prestige:12, gold:10, exp:6, force:1, text:"加操半日，甲葉生光。" },
    { id:"cq_mil_escort_edict", title:"護旨出宮", loc:"wumen", tracks:["military"], maxPin:5, prestige:18, gold:18, exp:6, text:"护送青梧敕書出午門。", item:"yulin_pass" },
    { id:"cq_mil_prison_watch", title:"天牢值夜", loc:"tianlao", tracks:["military"], prestige:14, gold:12, exp:5, text:"夜涼如水。欽犯咳嗽聲遠。" },
    { id:"cq_mil_dirty_raid", title:"夜拿「奸黨」", loc:"xingbu_prison", tracks:["military"], prestige:18, gold:40, exp:5, dirty:true, karma:-5, heat:8, text:"名單上有無辜姓名。你仍帶隊。" },
    { id:"cq_maid_embroidery", title:"繡履進奉", loc:"hougong", tracks:["maid"], prestige:12, gold:10, exp:4, charm:1, favorNpc:"shen_guifei", favorAmt:4, text:"沈貴妃收下繡履，目光柔了瞬。", item:"palace_silk" },
    { id:"cq_maid_rulebook", title:"抄宮規罰跪免", loc:"neiting", tracks:["maid"], minGrade:1, maxGrade:2, prestige:8, gold:4, exp:3, honor:1, text:"掌事姑姑免你罰跪——因字跡尚可。" },
    { id:"cq_maid_high_tea", title:"侍茶璇璣", loc:"hougong", tracks:["maid"], minGrade:4, prestige:20, gold:22, exp:5, charm:1, favorNpc:"shen_guifei", favorAmt:5, text:"你穩穩執壺。貴妃賜宮緞。", item:"palace_jinpao" },
    { id:"cq_maid_empress_fake", title:"慈寧請安（險）", loc:"hougong", tracks:["maid","eunuch"], minGrade:3, prestige:16, gold:15, exp:4, favorNpc:"mao_dongzhu_x", favorAmt:3, text:"假太后目光陰測。你低頭不敢多看。" },
    { id:"cq_share_garden", title:"御花夜巡", loc:"yuhuayuan", tracks:["eunuch","maid","military","civil"], prestige:10, gold:8, exp:4, text:"石橋影雙人。你假裝沒看見。", perception:1 },
    { id:"cq_share_stable", title:"御馬試蹄", loc:"taipusi", tracks:["military","eunuch"], prestige:11, gold:10, exp:5, luck:1, text:"御馬認主。馬官記你一功。" },
    { id:"cq_share_herb", title:"太醫配散", loc:"taiyiyuan", tracks:["eunuch","maid","civil"], prestige:12, gold:10, exp:4, medicine:1, text:"楚青教你認三味藥。", item:"med_salve" },
    { id:"cq_share_library", title:"文淵夜讀", loc:"wenyuan", tracks:["civil","eunuch"], prestige:13, gold:8, exp:5, wit:1, text:"殘卷記邊事。你抄得手酸。" },
    { id:"cq_share_award", title:"歲末宮賞", loc:"neiwufu", tracks:["civil","military","eunuch","maid"], minGrade:3, maxPin:5, prestige:20, gold:35, exp:6, text:"內務府開匣。錦袍如意入冊。", item:"palace_jinpao" },
    { id:"cq_share_yaopai", title:"換高階腰牌", loc:"qianqing", tracks:["civil","military","eunuch"], maxPin:4, minGrade:4, prestige:15, gold:5, exp:3, text:"奏事處換發通行腰牌。", item:"palace_yaopai_adv" },
    { id:"cq_dirty_bribe_ledger", title:"庫銀過手", loc:"neiwufu", tracks:["civil","eunuch"], prestige:22, gold:60, exp:5, dirty:true, karma:-8, heat:12, text:"銀錠過手熱。冊上少了一行。" },
    { id:"cq_serve_emperor_tea", title:"御前茶湯", loc:"yangxin", tracks:["eunuch","maid","civil"], prestige:14, gold:12, exp:4, emperorFavor:2, text:"景安帝執杯不語。你屏息而退。" },
    { id:"cq_jianning_errand", title:"郡主差遣", loc:"hougong", tracks:["maid","eunuch","none"], prestige:11, gold:15, exp:4, favorNpc:"jianning_jun", favorAmt:4, text:"建寧郡主要你找韋小舟——「昨晚那人」。" },
    { id:"cq_wei_double", title:"雙面口信", loc:"huanggong", tracks:["eunuch","civil","none"], prestige:13, gold:20, exp:4, favorNpc:"wei_xiaozhou", favorAmt:3, text:"韋小舟塞你一紙：「上面與下面，都別說錯。」", karma:-2 }
  ];

  (function mergeCourtQuestsExtra(){
    if (typeof COURT_QUESTS === "undefined") return;
    const have = {};
    COURT_QUESTS.forEach(function(q){ have[q.id] = true; });
    COURT_QUESTS_EXTRA.forEach(function(q){
      if (!have[q.id]) COURT_QUESTS.push(q);
    });
  })();

  const COURT_DEALS_EXTRA = [
    { id:"deal_silk_favor", offer:"宮緞一匹與二十金", gold:20, item:"palace_silk", demand:"替人在御花園「偶遇」沈貴妃說項", karma:-2, heat:4, prestige:4, favorNpc:"shen_guifei", favorAmt:3 },
    { id:"deal_ruyi_silence", offer:"青梧如意", item:"palace_ruyi", demand:"對一道邊關失額裝聾", karma:-4, heat:7, prestige:6 },
    { id:"deal_jinpao_vote", offer:"宮賞錦袍與吏部關照", item:"palace_jinpao", prestigeBonus:15, demand:"議政時附和某尚書", karma:-3, heat:5, prestige:5 },
    { id:"deal_yaopai_spy", offer:"高階腰牌一日", item:"palace_yaopai_adv", demand:"把御膳房口令告訴東廠", karma:-5, heat:8, prestige:5 },
    { id:"deal_soft_tea", offer:"点心一盒", gold:8, demand:"只是套你近況——可拒", karma:0, heat:0, prestige:0, soft:true }
  ];
  (function mergeDeals(){
    if (typeof COURT_DEALS === "undefined") return;
    const have = {};
    COURT_DEALS.forEach(function(d){ have[d.id] = true; });
    COURT_DEALS_EXTRA.forEach(function(d){ if (!have[d.id]) COURT_DEALS.push(d); });
  })();

  // Patch quest hub filter for minGrade/maxGrade/maxPin
  const _openCourtQuestHubOrig = openCourtQuestHub;
  openCourtQuestHub = function() {
    ensureCourtCareer();
    if (S.courtTrack === "none") {
      return openModal("<h3>朝廷仕途</h3><div class=\"story-box\">你尚未入仕。請先於外廷／殿試場／武英殿／淨身房／後宮擇一路。</div><div class=\"btn-row\"><button class=\"btn primary\" onclick=\"closeModal();openCourtCareerPanel()\">打開仕途面板</button><button class=\"btn ghost\" onclick=\"closeModal()\">關閉</button></div>");
    }
    // deny from scorn NPC today — still allow hub, but toast
    const denied = Object.keys(S.courtNpcDeny || {}).some(function(nid){ return S.courtNpcDeny[nid] === S.day; });
    if (denied) toast("今日有人拒給你差事——換個窗口或明日再來", true);
    const cur = activeCourtQuest();
    let html = "<h3>朝廷任務</h3><div class=\"story-box small\">威望 " + S.courtPrestige + " · " + courtTrackLabel() + " · " + courtRankLabel() +
      " · 權勢 " + courtPowerScore() +
      "<br>下一階需威望 " + nextCourtThreshold() + (canShangdianYizheng() ? " · 已可上殿議政" : "") + "</div>";
    if (cur) {
      html += "<div class=\"list-item\"><div><strong>進行中・" + cur.title + "</strong><div class=\"small\">請前往【" + ((LOCATIONS.find(function(l){return l.id===cur.loc;})||{}).name || cur.loc) + "】交付</div></div>" +
        "<button class=\"btn\" id=\"cq-abandon\">放棄</button></div>";
    } else {
      if ((S.day || 0) === (S.courtLastQuestDay || -1)) {
        html += "<p class=\"small\">今日已領過任務，明日再來（或完成舊差後刷新）。</p>";
      }
      const track = S.courtTrack;
      const pool = COURT_QUESTS.filter(function(q){
        if (!(q.tracks.indexOf(track) >= 0 || q.tracks.indexOf("none") >= 0)) return false;
        if ((S.courtDoneQuests || []).includes(q.id + ":" + S.day)) return false;
        if (q.minGrade && (S.courtGrade || 0) < q.minGrade) return false;
        if (q.maxGrade && (S.courtGrade || 0) > q.maxGrade) return false;
        if (q.maxPin && (track === "civil" || track === "military") && courtPinNumber() > q.maxPin) return false;
        if (q.minPower && courtPowerScore() < q.minPower) return false;
        return true;
      });
      const shuffled = pool.slice().sort(function(){ return Math.random() - 0.5; }).slice(0, 5);
      if (!shuffled.length) html += "<p class=\"small\">暫無合適差遣（品級／身份不符）。</p>";
      shuffled.forEach(function(q){
        const dirty = q.dirty ? " · 污" : "";
        const reward = q.item && ITEMS[q.item] ? " · 賞" + ITEMS[q.item].name : "";
        html += "<div class=\"list-item\"><div><strong>" + q.title + dirty + "</strong><div class=\"small\">" +
          ((LOCATIONS.find(function(l){return l.id===q.loc;})||{}).name || q.loc) + " · 威望＋" + q.prestige + reward + "</div></div>" +
          "<button class=\"btn\" data-cq=\"" + q.id + "\">領取</button></div>";
      });
    }
    html += "<div class=\"btn-row\"><button class=\"btn\" id=\"cq-panel\">仕途面板</button><button class=\"btn ghost\" onclick=\"closeModal()\">關閉</button></div>";
    openModal(html);
    Array.prototype.forEach.call(document.querySelectorAll("[data-cq]"), function(btn){
      btn.onclick = function(){
        const id = btn.getAttribute("data-cq");
        S.courtQuests[id] = { active: true, done: false, claimedDay: S.day };
        S.courtLastQuestDay = S.day;
        closeModal();
        const q = COURT_QUESTS.find(function(x){ return x.id === id; });
        setFlag("map_" + (q && q.loc));
        showStory("領旨・" + (q ? q.title : id) + "。\n請前往目標場景，點「交付朝廷差遣」。");
        render();
      };
    });
    const ab = document.getElementById("cq-abandon");
    if (ab) ab.onclick = function(){
      const c = activeCourtQuest();
      if (c) delete S.courtQuests[c.id];
      closeModal(); toast("已放棄差遣", true);
    };
    const pn = document.getElementById("cq-panel");
    if (pn) pn.onclick = function(){ closeModal(); openCourtCareerPanel(); };
  };

  // Enhance completeCourtQuestAt for item rewards
  const _completeCourtQuestAtOrig = completeCourtQuestAt;
  completeCourtQuestAt = function(locId) {
    const q = activeCourtQuest();
    const ok = _completeCourtQuestAtOrig(locId);
    if (ok && q) {
      if (q.item && ITEMS[q.item]) {
        addItem(q.item, q.itemN || 1);
        toast("宮賞・" + ITEMS[q.item].name, true);
      }
      try { if (typeof saveGameSilent === "function") saveGameSilent(); } catch (e) {}
    }
    return ok;
  };

  // contextBlob enrich via wrap if we can patch by reassigning — monkeypatch after definition by wrapping callers; also patch function
  const _contextBlobOrig_v9b = contextBlob;
  contextBlob = function() {
    const s = _contextBlobOrig_v9b();
    try {
      const o = JSON.parse(s);
      const id = courtIdentityBlob();
      o.courtTrack = id.track;
      o.courtRank = id.rank;
      o.courtPinApprox = id.pinApprox;
      o.courtPrestige = id.prestige;
      o.serveTarget = id.serveTarget;
      o.eunuchHall = id.eunuchHall;
      o.courtPower = id.power;
      o.courtIdentityDetail = id;
      return JSON.stringify(o);
    } catch (e) { return s; }
  };

  // Imprisonment bias hook: bump heat risk for low eunuch
  if (typeof bumpPalaceHeat === "function") {
    const _bumpPalaceHeatOrig = bumpPalaceHeat;
    bumpPalaceHeat = function(n) {
      let x = n || 0;
      if ((S.courtTrack === "eunuch" && (S.courtGrade || 0) <= 1) || (S.palaceHeat || 0) >= 50) x = Math.ceil(x * 1.15);
      if (S.serveTargetId === "jingandi" || courtPowerScore() >= 75) x = Math.floor(x * 0.75);
      return _bumpPalaceHeatOrig(x);
    };
  }

  // Expose
  if (window.__JH_DEBUG) {
    Object.assign(window.__JH_DEBUG, {
      courtPowerScore: courtPowerScore,
      identityStanceForNpc: identityStanceForNpc,
      applyCourtAiAction: applyCourtAiAction,
      applyNpcMutation: applyNpcMutation,
      courtIdentityBlob: courtIdentityBlob,
      identityAwareGreeting: identityAwareGreeting,
      COURT_QUESTS_EXTRA: COURT_QUESTS_EXTRA
    });
  }

