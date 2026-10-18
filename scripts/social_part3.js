
  const INTENT_PATTERNS = [
    { id:"sneak_attack", re:/暗算|偷襲|暗殺|背後|背後捅|刺一刀|捅一刀|趁.{0,6}(唔覺|不備|不注意|睡著|閉眼)|偷偷刺|潛行殺|無聲/ },
    { id:"open_attack", re:/動手|攻擊|砍|斬|打佢|打他|拔刀|對打|單挑|挑戰|毆|揍/ },
    { id:"steal_key", re:/偷鎖匙|偷鑰匙|摸鎖匙|摸鑰匙|搶鎖匙|搶鑰匙/ },
    { id:"fake_injury", re:/裝傷|裝病|裝暈|假裝受傷|扮傷|偽稱受傷|我受傷|我痛|內傷發作/ },
    { id:"pick_lock", re:/撬鎖|開鎖|撬門|破鎖|用鐵絲|工具開/ },
    { id:"escape_cell", re:/逃走|越獄|逃出|逃脫|溜走|翻牆|破門而出|衝出/ },
    { id:"bribe", re:/賄賂|收買|買通|塞錢|給錢放|金銀打點/ },
    { id:"apologize", re:/求饒|道歉|悔改|對不起|我錯|改過|請原諒|饒命|懺悔/ },
    { id:"steal", re:/偷|扒|摸走|盜|順走|竊/ },
    { id:"threaten", re:/威脅|恐嚇|再不|否則|要命|人質/ },
    { id:"gift", re:/送你|贈|給你|奉上|獻上|禮物/ },
    { id:"persuade", re:/勸|說服|請求|求你|拜託|懇請/ },
    { id:"flee", re:/逃跑|跑路|撤|閃人|先走/ }
  ];
  function classifyIntent(mode, playerText) {
    const t = String(playerText || "");
    const prefer = isImprisoned()
      ? ["fake_injury","pick_lock","escape_cell","bribe","apologize","steal_key","persuade","threaten","open_attack","sneak_attack"]
      : null;
    for (const p of INTENT_PATTERNS) {
      if (prefer && prefer.indexOf(p.id) < 0) continue;
      if (prefer && p.re.test(t)) return p.id;
    }
    for (const p of INTENT_PATTERNS) { if (p.re.test(t)) return p.id; }
    return mode === "action" ? "generic_action" : "talk";
  }
  function mapReaction(reaction) {
    if (reaction === "capture") return "capture";
    if (reaction === "attack") return "attack";
    if (reaction === "duel") return "duel";
    if (reaction === "flee") return "flee";
    if (reaction === "trap") return "trap";
    if (reaction === "rebuke") return "rebuke";
    return "hostile";
  }
