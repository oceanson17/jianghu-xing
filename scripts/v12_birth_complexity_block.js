  // ========== V12: BIRTH DEPTH + COMPLEXITY ==========
  // First life = commoner only. Elite after reincarnationCount>=1.
  // Systems: 時辰日程 / 人情帳 / 節令 / 傳聞板v2 / 技藝潛修

  const BIRTH_BACKGROUNDS = [
    {id: "orphan", name: "江湖孤兒", firstLife: true, tier: "commoner", gender: null, loc: "hub", gold: 20, renown: 0, mods: {force: 2, agi: 2, bone: 1}, flags: ["birth_orphan"], favor: 0, heat: 0, track: "none", grade: 0, pin: 0, role: null, items: ["wood_sword", "herb", "cloth"], blurb: "師父不在了。你只記得刀光與一句「活下去」。", treatTag: "寒門", treatHint: "江湖人視你為無名小輩；丐幫略親、官宦略慢。", relations: [{npcId: "tongxiaoliu", aff: 8, trust: 5}, {npcId: "powan_zhang", aff: 4}], earlyQuest: {id: "bq_orphan_bowl", title: "出身・破碗餘溫", step: 0, done: false, hint: "青城鎮找童小六／破碗張打聽江湖路。"}, openChoices: [{id: "keep", label: "握緊木劍，往青城走", effect: {flag: "orphan_path_sword", text: "你決定以劍謀生。"}}, {id: "beg", label: "先學討口飯", effect: {gold: 3, item: "broken_bowl_staff", flag: "orphan_path_beg", text: "路邊老人丟來破碗棍：「先活着。」"}}, {id: "hide", label: "藏起身世，改名換姓", effect: {wit: 1, flag: "orphan_path_hide", text: "你把舊名埋進土裡。"}}]},
    {id: "beggar", name: "乞丐", firstLife: true, tier: "commoner", gender: null, loc: "qingcheng", gold: 5, renown: 0, mods: {bone: 2, luck: 2, force: -1, charm: -1, perception: 1}, flags: ["birth_beggar"], favor: 0, heat: 0, track: "none", grade: 0, pin: 0, role: null, items: ["broken_bowl_staff", "beggar_robe", "herb"], blurb: "破碗與冷風。有人踢你一腳，有人丟來半塊餅。", treatTag: "賤籍", treatHint: "官紳常斥喝；破碗幫／市井較易搭話；進宮極難。", relations: [{npcId: "powan_zhang", aff: 15, trust: 8, fate: "ally"}, {npcId: "tongxiaoliu", aff: 10}], earlyQuest: {id: "bq_beggar_bowl", title: "出身・百衲入幫", step: 0, done: false, hint: "青城向破碗張報到，或在市井討到十文。"}, openChoices: [{id: "join", label: "認破碗幫碼頭", effect: {flag: "powan_seed", factionRep: {powan_bang: 12}, text: "破碗張哼一聲：「先從掃地學起。」"}}, {id: "pride", label: "不跪，自己掙", effect: {honor: 2, gold: 2, flag: "beggar_pride", text: "你把餅掰開，留給更餓的娃。"}}, {id: "steal", label: "摸走路人錢袋", effect: {gold: 12, karma: -4, flag: "beggar_steal", text: "得手了——也留下了仇。"}}]},
    {id: "merchant", name: "商戶", firstLife: true, tier: "commoner", gender: null, loc: "hub", gold: 150, renown: 2, mods: {luck: 3, wit: 2, charm: 1}, flags: ["trade_pass", "birth_merchant"], favor: 0, heat: 0, track: "none", grade: 0, pin: 0, role: null, items: ["cloth", "wine"], blurb: "算盤與貨箱是你的第一堂課。商路通向江湖。", treatTag: "商賈", treatHint: "客棧掌櫃客氣；門派清高者略輕；古蘭商會易談。", relations: [{npcId: "zhaotie", aff: 6}, {npcId: "guqinghan", aff: 2}], earlyQuest: {id: "bq_merchant_caravan", title: "出身・第一筆貨", step: 0, done: false, hint: "京畿或青城完成一筆買賣／交付酒布。"}, openChoices: [{id: "silk", label: "押一車布匹去青城", effect: {item: "cloth", gold: -20, flag: "merchant_silk", craft: {commerce: 8}, text: "車軸吱呀——賺賠看今朝。"}}, {id: "wine", label: "囤陳年老酒", effect: {item: "wine", flag: "merchant_wine", text: "酒香換人情，比銀子快。"}}, {id: "risk", label: "借高利貸擴張", effect: {gold: 80, karma: -2, flag: "merchant_debt", favorDebtNpc: "zhaotie", text: "銀子到手，債也落袋——人情帳記了一筆。"}}]},
    {id: "farmer", name: "農戶", firstLife: true, tier: "commoner", gender: null, loc: "qingcheng", gold: 18, renown: 0, mods: {bone: 3, force: 1, honor: 1, wit: -1}, flags: ["birth_farmer"], favor: 0, heat: 0, track: "none", grade: 0, pin: 0, role: null, items: ["herb", "cloth", "wood_sword"], blurb: "田埂裂開乾紋。官府催糧，你只能扛起扁擔出門。", treatTag: "耕氓", treatHint: "市井認你老實；衙役常勒索；俠客或願相助。", relations: [{npcId: "suning", aff: 5}, {npcId: "tongxiaoliu", aff: 6}], earlyQuest: {id: "bq_farmer_tax", title: "出身・完糧之路", step: 0, done: false, hint: "湊夠廿金完糧，或求助藥谷／破碗幫。"}, openChoices: [{id: "sell", label: "賣餘糧換盤纏", effect: {gold: 15, flag: "farmer_sold", text: "糧少了，路遠了。"}}, {id: "herb", label: "上山採藥抵稅", effect: {item: "herb", craft: {medicine: 6}, flag: "farmer_herb", text: "你認得幾味草藥。"}}, {id: "flee", label: "連夜逃稅入江湖", effect: {gold: 8, karma: -3, heat: 5, flag: "farmer_flee", text: "背後有人喊你的名字——你沒回頭。"}}]},
    {id: "artisan", name: "工匠學徒", firstLife: true, tier: "commoner", gender: null, loc: "hub", gold: 35, renown: 1, mods: {wit: 2, focus: 2, force: 1, bone: 1}, flags: ["birth_artisan"], favor: 0, heat: 0, track: "none", grade: 0, pin: 0, role: null, items: ["wood_sword", "cloth"], blurb: "爐火映紅半邊臉。師傅說：「手穩，才談江湖。」", treatTag: "百工", treatHint: "鐵匠／商會友善；文人偶輕；邊軍愛你的修械。", relations: [{npcId: "zhaotie", aff: 18, trust: 10, fate: "ally"}], earlyQuest: {id: "bq_artisan_forge", title: "出身・爐邊一課", step: 0, done: false, hint: "與其鐵匠互動或在營地鍛造／交付兵器。"}, openChoices: [{id: "stay", label: "再幫師傅打一把刀", effect: {craft: {martial: 4}, flag: "artisan_blade", item: "wood_sword", text: "刀坯成型，師傅點頭。"}}, {id: "leave", label: "辭行闖江湖", effect: {gold: 10, flag: "artisan_leave", text: "師傅塞你一塊廢鐵：「當護身符。」"}}, {id: "secret", label: "偷看圖譜", effect: {wit: 1, craft: {martial: 8}, karma: -1, flag: "artisan_peek", text: "你記住半頁圖——也欠下一筆心虛。"}}]},
    {id: "scholar_poor", name: "寒門書生", firstLife: true, tier: "commoner", gender: null, loc: "jingji", gold: 28, renown: 1, mods: {wit: 3, charm: 1, focus: 1, force: -1}, flags: ["birth_scholar", "map_wenyuan"], favor: 1, heat: 0, track: "none", grade: 0, pin: 0, role: null, items: ["wine", "herb"], blurb: "舊書卷邊發黃。你赴京——未必能進院試，卻已踏入江湖。", treatTag: "寒士", treatHint: "文官略禮；武夫或嘲酸丁；宮內太監看你可利用。", relations: [{npcId: "masteryun", aff: 4}, {npcId: "linqing", aff: 3}], earlyQuest: {id: "bq_scholar_ink", title: "出身・一紙功名", step: 0, done: false, hint: "京畿聽傳聞或接觸文淵相關；可轉文官線。"}, openChoices: [{id: "exam", label: "咬牙赴考", effect: {craft: {letters: 10}, flag: "scholar_exam", text: "墨香入夢——前途未卜。"}}, {id: "teach", label: "先在客棧代寫書信換銀", effect: {gold: 12, craft: {letters: 4}, flag: "scholar_scribe", text: "人情字，最值錢。"}}, {id: "sword", label: "棄筆從武", effect: {force: 1, item: "wood_sword", flag: "scholar_sword", text: "你把書壓在劍下。"}}]},
    {id: "performer", name: "走江湖藝人", firstLife: true, tier: "commoner", gender: null, loc: "qingcheng", gold: 40, renown: 2, mods: {charm: 3, agi: 2, luck: 1}, flags: ["birth_performer"], favor: 0, heat: 0, track: "none", grade: 0, pin: 0, role: null, items: ["candy", "cloth", "wine"], blurb: "鑼鼓響處，你翻了個跟斗。掌聲與銅板一齊落下。", treatTag: "伶人", treatHint: "市井喜見；貴人當玩物；門派或嫌輕浮。", relations: [{npcId: "linqing", aff: 12, trust: 6}, {npcId: "tongxiaoliu", aff: 8}], earlyQuest: {id: "bq_perform_show", title: "出身・三場鑼鼓", step: 0, done: false, hint: "在青城／京畿表演或贈糖結緣。"}, openChoices: [{id: "show", label: "再演一場賺盤纏", effect: {gold: 15, craft: {commerce: 4}, flag: "perf_show", text: "銅板叮噹——嗓子有點啞。"}}, {id: "spy", label: "邊演邊打聽消息", effect: {craft: {scheming: 6}, flag: "perf_spy", text: "台下誰遞眼色，你都記下。"}}, {id: "quit", label: "收鑼，認真習武", effect: {force: 1, agi: 1, flag: "perf_quit", text: "鑼收入囊，拳先硬。"}}]},
    {id: "bandit", name: "綠林草莽", firstLife: true, tier: "commoner", gender: null, loc: "heishui", gold: 40, renown: 1, mods: {force: 3, agi: 2, honor: -2}, flags: ["birth_bandit"], favor: -2, heat: 0, track: "none", grade: 0, pin: 0, role: null, items: ["wood_sword", "wine"], karmaDelta: -5, blurb: "黑水寨酒氣衝鼻。刀疤臉叫你「新來的」。", treatTag: "匪籍", treatHint: "官軍敵視；黑水／紅蓮易納；正派門派難容。", relations: [{npcId: "heifeng", aff: 14, trust: 6, fate: "ally"}], earlyQuest: {id: "bq_bandit_raid", title: "出身・山寨投名", step: 0, done: false, hint: "黑水寨完成投名或搶劫／義釋抉擇。"}, openChoices: [{id: "blood", label: "歃血認寨", effect: {factionRep: {heishui_band: 15}, flag: "bandit_blood", karma: -3, text: "酒碗砸地——你是黑水人了。"}}, {id: "soft", label: "只搶富不劫貧", effect: {honor: 2, flag: "bandit_robin", text: "刀疤臉嗤笑，卻沒趕你。"}}, {id: "flee", label: "連夜下山洗白", effect: {karma: 2, gold: -10, flag: "bandit_wash", text: "你丟下刀，換一身布衣。"}}]},
    {id: "prince", name: "皇子", firstLife: false, tier: "elite", gender: "男", loc: "qianqing", gold: 120, renown: 8, mods: {charm: 3, wit: 2, honor: 2, force: 1}, flags: ["palace_entry", "map_huanggong", "map_qianqing", "neiting_access", "map_wumen", "birth_prince"], favor: 12, heat: 0, track: "none", grade: 0, pin: 0, role: null, items: ["palace_jade", "candy"], blurb: "你睜眼時已在乾清側殿錦褥上。乳母低聲喚「殿下」。", treatTag: "皇裔", treatHint: "臣工跪拜；暗裡結黨；東廠亦忌你三分。", relations: [{npcId: "jingandi", aff: 10, trust: 5}, {npcId: "wei_xiaozhou", aff: 6}], earlyQuest: {id: "bq_prince_court", title: "出身・側殿晨讀", step: 0, done: false, hint: "乾清宮／太和殿接觸朝政或帝心。"}, openChoices: [{id: "filial", label: "恭謹問安", effect: {favor: 5, flag: "prince_filial", text: "景安帝點頭——帝心微升。"}}, {id: "party", label: "結交內侍", effect: {craft: {scheming: 8}, flag: "prince_party", text: "韋小舟笑得意味深長。"}}, {id: "blade", label: "私練刀槍", effect: {force: 2, flag: "prince_blade", text: "殿下亦有江湖夢。"}}]},
    {id: "princess", name: "公主", firstLife: false, tier: "elite", gender: "女", loc: "hougong", gold: 110, renown: 6, mods: {charm: 4, wit: 1, luck: 1}, flags: ["palace_entry", "map_huanggong", "hougong_access", "map_yuhuayuan", "neiting_access", "birth_princess"], favor: 10, heat: 0, track: "none", grade: 0, pin: 0, role: null, items: ["palace_silk", "bronze_mirror"], blurb: "璇璣殿外風鈴輕響。有人稱你「郡主／公主」。", treatTag: "金枝", treatHint: "后妃表面慈愛；宮女戰戰；外臣遠觀。", relations: [{npcId: "shen_guifei", aff: 8}, {npcId: "gongnv_head", aff: 6}], earlyQuest: {id: "bq_princess_garden", title: "出身・御苑風聞", step: 0, done: false, hint: "後宮／御花園行走，結交或避禍。"}, openChoices: [{id: "gentle", label: "溫言待人", effect: {charm: 1, flag: "princess_kind", text: "宮女鬆了口氣。"}}, {id: "power", label: "要看掌事姑姑名冊", effect: {craft: {scheming: 6}, flag: "princess_power", text: "你看了一眼——名字很多。"}}, {id: "out", label: "想出宮看江湖", effect: {flag: "princess_out", text: "乳母嚇得跪倒。"}}]},
    {id: "official_heir", name: "官員子弟", firstLife: false, tier: "elite", gender: null, loc: "jingji", gold: 80, renown: 4, mods: {wit: 3, honor: 2, charm: 1}, flags: ["map_wenyuan", "birth_official"], favor: 2, heat: 0, track: "civil", grade: 0, pin: 9, role: null, items: ["court_seal_ink", "wine"], blurb: "京畿宅門匾額猶在。家裡要你讀書入仕。", treatTag: "官裔", treatHint: "胥吏讓路；江湖人防你；可走文官線。", relations: [{npcId: "lan_keeper", aff: 8}], earlyQuest: {id: "bq_official_ink", title: "出身・門第功名", step: 0, done: false, hint: "走仕途或拒絕家命入江湖。"}, openChoices: [{id: "study", label: "按家訓讀書", effect: {craft: {letters: 12}, flag: "heir_study", text: "硃批印泥握在手心。"}}, {id: "rebel", label: "拒仕投身江湖", effect: {force: 1, honor: 1, flag: "heir_rebel", text: "匾額後是另一條路。"}}, {id: "bribe", label: "用錢鋪路", effect: {gold: -30, craft: {scheming: 5}, flag: "heir_bribe", text: "門子笑了。"}}]},
    {id: "border_soldier", name: "邊軍", firstLife: false, tier: "elite", gender: "男", loc: "bianguan", gold: 35, renown: 3, mods: {force: 3, bone: 2, agi: 1, honor: 1}, flags: ["rep_30", "north_pass", "birth_border"], favor: 0, heat: 0, track: "military", grade: 0, pin: 8, role: "guard", items: ["tiger_talon", "med_salve"], blurb: "號角撕開沙塵。你醒來時已穿上邊軍號衣。", treatTag: "戎籍", treatHint: "軍中同袍親；京官遠；塞外百姓敬畏。", relations: [{npcId: "yulin_tongling", aff: 10, trust: 6}], earlyQuest: {id: "bq_border_watch", title: "出身・夜巡狼煙", step: 0, done: false, hint: "邊關完成巡哨或軍務。"}, openChoices: [{id: "duty", label: "接下夜巡", effect: {honor: 1, craft: {martial: 6}, flag: "border_duty", text: "風沙打臉，刀出鞘。"}}, {id: "desert", label: "想逃回中原", effect: {karma: -2, flag: "border_desert", text: "同袍瞪你一眼。"}}, {id: "train", label: "苦練刀法", effect: {force: 2, flag: "border_train", text: "虎爪扣緊。"}}]},
    {id: "palace_maid_seed", name: "宮女種子", firstLife: false, tier: "elite", gender: "女", loc: "hougong", gold: 15, renown: 0, mods: {charm: 2, perception: 2, focus: 1}, flags: ["palace_entry", "map_huanggong", "hougong_access", "map_yuhuayuan", "birth_maid"], favor: 0, heat: 2, track: "maid", grade: 1, pin: 0, role: "maid", items: ["palace_silk", "candy"], blurb: "掌事姑姑點名：新來的——從灑掃做起。", treatTag: "宮婢", treatHint: "妃嬪可呼來喝去；同輩競爭；太監或聯手。", relations: [{npcId: "shen_guifei", aff: 3}, {npcId: "gongnv_head", aff: 8}], earlyQuest: {id: "bq_maid_sweep", title: "出身・掃階第一日", step: 0, done: false, hint: "後宮當差／交好宮人。"}, openChoices: [{id: "obey", label: "低頭灑掃", effect: {craft: {scheming: 3}, flag: "maid_obey", text: "姑姑勉勉強強點頭。"}}, {id: "gift", label: "送糖討好貴妃近侍", effect: {item: "candy", flag: "maid_gift", text: "一顆糖，一條線。"}}, {id: "listen", label: "偷聽殿外密談", effect: {perception: 1, heat: 3, flag: "maid_listen", text: "你記下半句——也多了三分險。"}}]},
    {id: "eunuch_seed", name: "內侍種子", firstLife: false, tier: "elite", gender: "男", loc: "jingshen", gold: 18, renown: 0, mods: {perception: 2, wit: 1, charm: 1, force: -1}, flags: ["eunuch", "palace_entry", "map_huanggong", "map_jingshen", "visited_jingshen", "neiting_access", "birth_eunuch"], favor: 0, heat: 4, track: "eunuch", grade: 1, pin: 0, role: "eunuch", items: ["eunuch_gift_box", "herb"], blurb: "淨身房一側燈影。名冊上多了一行小字——你入了太監籍（寫意）。", treatTag: "寺人", treatHint: "低品被嘲；高品人畏；文官表面禮、暗裡忌。", relations: [{npcId: "wei_xiaozhou", aff: 5}, {npcId: "dongchang_gong", aff: 4}], earlyQuest: {id: "bq_eunuch_roll", title: "出身・名冊新墨", step: 0, done: false, hint: "淨身房／東廠／當差起步。"}, openChoices: [{id: "serve", label: "勤快奉茶", effect: {craft: {scheming: 4}, flag: "eunuch_serve", text: "前輩扔來一句口訣。"}}, {id: "dc", label: "打听東廠門路", effect: {flag: "eunuch_dc_hint", text: "有人耳語：衙署要人手。"}}, {id: "hide", label: "少說話多聽話", effect: {heat: -1, flag: "eunuch_hide", text: "你活過第一日。"}}]},
  ];


  function birthById(id) {
    for (let i = 0; i < BIRTH_BACKGROUNDS.length; i++) {
      if (BIRTH_BACKGROUNDS[i].id === id) return BIRTH_BACKGROUNDS[i];
    }
    return BIRTH_BACKGROUNDS.find(function(b){ return b.id === "orphan"; }) || BIRTH_BACKGROUNDS[0];
  }

  function isFirstLife() {
    ensureReincarnationState();
    return (S.reincarnationCount || 0) < 1;
  }

  function availableBirths(opts) {
    opts = opts || {};
    const first = opts.firstLife != null ? !!opts.firstLife : isFirstLife();
    let list;
    if (opts.afterDeath) {
      list = BIRTH_BACKGROUNDS.slice();
    } else if (first) {
      list = BIRTH_BACKGROUNDS.filter(function(b){ return b.firstLife !== false && b.tier !== "elite"; });
    } else {
      list = BIRTH_BACKGROUNDS.slice();
    }
    return list.length ? list : BIRTH_BACKGROUNDS.filter(function(b){ return b.firstLife; });
  }

  function ensureComplexityState() {
    if (!S.timeSlot || ["dawn","noon","dusk","night"].indexOf(S.timeSlot) < 0) S.timeSlot = "dawn";
    if (!Array.isArray(S.favorLedger)) S.favorLedger = [];
    if (!S.craftXP || typeof S.craftXP !== "object") S.craftXP = { martial: 0, commerce: 0, scheming: 0, medicine: 0, letters: 0 };
    if (!Array.isArray(S.activeRumors)) S.activeRumors = [];
    if (!S.festivalState || typeof S.festivalState !== "object") S.festivalState = { lastId: null, lastDay: 0, joined: {} };
    if (!S.birthTreatTag) S.birthTreatTag = null;
    if (!S.birthOpenDone) S.birthOpenDone = false;
    if (typeof S.seasonIndex !== "number") S.seasonIndex = 0;
  }

  function ensureReincarnationState() {
    if (typeof S.reincarnationCount !== "number") S.reincarnationCount = 0;
    if (!S.birthId) S.birthId = null;
    if (!S.birthLabel) S.birthLabel = null;
    if (typeof S.pastKarmaEcho !== "number") S.pastKarmaEcho = 0;
    if (!Array.isArray(S.pastLives)) S.pastLives = [];
    if (!S.pendingRebirth) S.pendingRebirth = null;
    if (typeof S.saveVer !== "number" || S.saveVer < 10) S.saveVer = 10;
    ensureComplexityState();
  }

  const TIME_SLOT_LABEL = { dawn: "清晨", noon: "正午", dusk: "黃昏", night: "深夜" };
  const TIME_SLOT_ORDER = ["dawn", "noon", "dusk", "night"];

  function timeSlotLabel() {
    ensureComplexityState();
    return TIME_SLOT_LABEL[S.timeSlot] || "清晨";
  }

  function advanceTimeSlot(n) {
    ensureComplexityState();
    n = n == null ? 1 : n;
    let idx = TIME_SLOT_ORDER.indexOf(S.timeSlot);
    if (idx < 0) idx = 0;
    let dayAdd = 0;
    for (let i = 0; i < n; i++) {
      idx++;
      if (idx >= TIME_SLOT_ORDER.length) { idx = 0; dayAdd++; }
    }
    S.timeSlot = TIME_SLOT_ORDER[idx];
    if (dayAdd) {
      S.day = (S.day || 1) + dayAdd;
      try { onNewDayComplexity(dayAdd); } catch (e) {}
    }
    return { slot: S.timeSlot, dayAdd: dayAdd };
  }

  function statusDeltaForPrompt(npcId) {
    ensureReincarnationState();
    if (typeof ensureCourtIdentityState === "function") ensureCourtIdentityState();
    ensureComplexityState();
    const power = typeof courtPowerScore === "function" ? courtPowerScore() : 0;
    const stance = typeof identityStanceForNpc === "function" ? identityStanceForNpc(npcId) : "neutral";
    const fac = (typeof COURT_NPC_FACTION !== "undefined" && COURT_NPC_FACTION[npcId]) || "jianghu";
    const highNpc = fac === "throne" || fac === "harem" || fac === "factory" || fac === "military" || fac === "civil";
    const lowPlayer = power < 35 || (S.courtTrack === "none" && !flag("eunuch") && !(S.palaceRole));
    let delta = "權勢" + power + "／態度" + stance + "／時辰" + timeSlotLabel();
    if (S.birthLabel) delta += "／出身" + S.birthLabel + (S.birthTreatTag ? ("・" + S.birthTreatTag) : "");
    if (S.reincarnationCount > 0) delta += "／投胎×" + S.reincarnationCount + "（前世業殘響" + (S.pastKarmaEcho || 0) + "）";
    if (highNpc && lowPlayer) delta += "／【上對下】可拒差、嘲諷、罰跪、升宮熱、關押；勿巴結低階";
    if (highNpc && power >= 70) delta += "／【畏權】宜 defer／flattery";
    const tag = S.birthTreatTag || "";
    if (tag === "賤籍" || tag === "匪籍") delta += "／【賤籍／匪】官紳可辱罵驅趕；市井較親";
    if (tag === "皇裔" || tag === "金枝") delta += "／【皇裔】臣工宜恭敬；暗鬥可用";
    if (tag === "寺人" && (S.courtGrade || 0) <= 2) delta += "／【低品太監】可輕蔑";
    if (tag === "寺人" && (S.courtGrade || 0) >= 5) delta += "／【高品太監】勿得罪，可送禮巴結";
    const owed = favorOwedTo(npcId);
    const theyOwe = favorTheyOwe(npcId);
    if (owed > 0) delta += "／玩家欠此NPC人情" + owed;
    if (theyOwe > 0) delta += "／此NPC欠玩家人情" + theyOwe;
    const fest = currentFestival();
    if (fest) delta += "／節令" + fest.name;
    return delta;
  }

  function snapshotPastLife(cause) {
    ensureReincarnationState();
    return {
      day: S.day, name: S.name, cause: cause || "未知", karma: S.karma || 0, renown: S.renown || 0,
      birthId: S.birthId || null, birthLabel: S.birthLabel || null,
      courtTrack: S.courtTrack || "none", palaceRole: S.palaceRole || null,
      endingHint: (S.ending && S.ending.title) || S.endingId || null,
      craftXP: S.craftXP ? Object.assign({}, S.craftXP) : null
    };
  }

  function applyCraftGain(map) {
    ensureComplexityState();
    if (!map) return;
    Object.keys(map).forEach(function(k) {
      if (typeof S.craftXP[k] === "number") S.craftXP[k] = Math.min(100, S.craftXP[k] + (map[k] || 0));
    });
    try { checkCraftThresholds(); } catch (e) {}
  }

  function checkCraftThresholds() {
    ensureComplexityState();
    const c = S.craftXP;
    if (c.martial >= 25 && !flag("craft_martial_1")) { setFlag("craft_martial_1"); S.force = (S.force || 5) + 1; toast("技藝・武道小成", true); }
    if (c.commerce >= 25 && !flag("craft_commerce_1")) { setFlag("craft_commerce_1"); S.luck = (S.luck || 5) + 1; toast("技藝・商道入門", true); }
    if (c.scheming >= 25 && !flag("craft_scheming_1")) { setFlag("craft_scheming_1"); S.perception = (S.perception || 5) + 1; toast("技藝・權謀初窺", true); }
    if (c.medicine >= 25 && !flag("craft_medicine_1")) { setFlag("craft_medicine_1"); S.medicine = (S.medicine || 0) + 2; toast("技藝・藥理入門", true); }
    if (c.letters >= 25 && !flag("craft_letters_1")) { setFlag("craft_letters_1"); S.wit = (S.wit || 5) + 1; toast("技藝・文墨小成", true); }
    if (c.martial >= 50 && !flag("craft_martial_2")) { setFlag("craft_martial_2"); S.agi = (S.agi || 5) + 1; }
    if (c.scheming >= 50 && !flag("craft_scheming_2")) { setFlag("craft_scheming_2"); S.wit = (S.wit || 5) + 1; }
  }

  function addFavorDebt(npcId, amount, reason, direction) {
    ensureComplexityState();
    if (!npcId || !amount) return;
    S.favorLedger.push({ npcId: npcId, amount: amount, reason: reason || "人情", dir: direction || "owe", day: S.day || 1, settled: false });
    if (S.favorLedger.length > 40) S.favorLedger = S.favorLedger.slice(-40);
  }
  function favorOwedTo(npcId) {
    ensureComplexityState();
    return S.favorLedger.filter(function(e){ return !e.settled && e.npcId === npcId && e.dir === "owe"; })
      .reduce(function(s, e){ return s + (e.amount || 0); }, 0);
  }
  function favorTheyOwe(npcId) {
    ensureComplexityState();
    return S.favorLedger.filter(function(e){ return !e.settled && e.npcId === npcId && e.dir === "credit"; })
      .reduce(function(s, e){ return s + (e.amount || 0); }, 0);
  }

  function applyBirthBackground(bg, opts) {
    opts = opts || {};
    if (!bg) bg = birthById("orphan");
    if (!opts.allowElite && isFirstLife() && (bg.firstLife === false || bg.tier === "elite")) {
      bg = birthById("orphan");
    }
    ensureReincarnationState();
    if (bg.gender === "男" || bg.gender === "女") S.gender = bg.gender;
    else if (opts.gender === "男" || opts.gender === "女") S.gender = opts.gender;
    S.disguise = (S.gender === "女") ? "nan" : null;
    S.birthId = bg.id;
    S.birthLabel = bg.name;
    S.birthTreatTag = bg.treatTag || null;
    S.birthOpenDone = false;
    S.loc = bg.loc || "hub";
    S.gold = Math.max(0, (bg.gold != null ? bg.gold : 30) + Math.floor(Math.random() * 11) - 5);
    S.renown = bg.renown || 0;
    S.hp = S.hpMax; S.neili = S.neiliMax;
    S.statuses = [];
    S.prison = null;
    S.trauma = Math.max(0, Math.floor((S.trauma || 0) * 0.15));
    const mods = bg.mods || {};
    Object.keys(mods).forEach(function(k) {
      if (typeof S[k] === "number") S[k] = Math.max(1, (S[k] || 0) + mods[k]);
    });
    S.flags = S.flags || {};
    (bg.flags || []).forEach(function(f) { S.flags[f] = true; });
    if (bg.track && bg.track !== "none") {
      S.courtTrack = bg.track;
      S.courtGrade = bg.grade || 0;
      S.courtPin = bg.pin || 0;
      S.courtPrestige = Math.max(S.courtPrestige || 0, bg.track === "maid" || bg.track === "eunuch" ? 8 : 15);
    } else {
      S.courtTrack = "none"; S.courtGrade = 0; S.courtPin = 0;
    }
    if (bg.role) S.palaceRole = bg.role;
    else S.palaceRole = null;
    S.emperorFavor = (bg.favor || 0) + Math.floor((S.pastKarmaEcho || 0) / 20);
    S.palaceHeat = bg.heat || 0;
    S.serveTargetId = null;
    S.eunuchAssignedHall = null;
    S.pendingDeal = null;
    S.dcJoined = false; S.dcRank = 0; S.dcPrestige = 0; S.dcHeat = 0;
    S.dcSubs = []; S.dcArrests = {}; S.pendingTrial = null;
    if (bg.items && typeof addItem === "function") {
      bg.items.forEach(function(id) { if (ITEMS[id]) addItem(id, 1); });
    }
    if (typeof bg.karmaDelta === "number") {
      S.karma = Math.max(-100, Math.min(100, (S.karma || 0) + bg.karmaDelta));
    }
    setFlag("map_" + (bg.loc || "hub"));
    (bg.relations || []).forEach(function(r) {
      if (!r || !r.npcId || !NPCS[r.npcId]) return;
      S.datingAff = S.datingAff || {};
      if (r.aff) S.datingAff[r.npcId] = (S.datingAff[r.npcId] || 0) + r.aff;
      if (r.trust) {
        S.npcMem = S.npcMem || {};
        S.npcMem[r.npcId] = S.npcMem[r.npcId] || { trust: 0, logs: [] };
        S.npcMem[r.npcId].trust = (S.npcMem[r.npcId].trust || 0) + r.trust;
      }
      if (r.fate && typeof setFate === "function") {
        try { setFate(r.npcId, r.fate); } catch (e2) {}
      }
    });
    if (bg.earlyQuest && typeof ensureQuests === "function") {
      ensureQuests();
      S.quests[bg.earlyQuest.id] = Object.assign({}, bg.earlyQuest);
    }
    seedBirthRumors(bg);
    S.timeSlot = "dawn";
    return bg;
  }

  function seedBirthRumors(bg) {
    ensureComplexityState();
    const seeds = {
      orphan: { id: "rum_orphan_master", title: "師父的舊債", stages: 3, stage: 0, loc: "qingcheng", text: "有人說你師父曾欠蒼雲一願。" },
      beggar: { id: "rum_beggar_seal", title: "破碗裡的印", stages: 3, stage: 0, loc: "qingcheng", text: "舊碗底有半枚殘印，像官印又像幫令。" },
      merchant: { id: "rum_merchant_route", title: "被劫的商路", stages: 3, stage: 0, loc: "jingji", text: "西商車隊在黑水附近失聯。" },
      farmer: { id: "rum_farmer_corrupt", title: "催糧的衙役", stages: 2, stage: 0, loc: "qingcheng", text: "有人借完糧之名中飽。" },
      artisan: { id: "rum_artisan_blueprint", title: "遺失的圖譜", stages: 3, stage: 0, loc: "hub", text: "龍門附近流傳半頁兵刃圖。" },
      scholar_poor: { id: "rum_scholar_exam", title: "院試關節", stages: 3, stage: 0, loc: "jingji", text: "京畿傳：銀子可買題——也可買禍。" },
      performer: { id: "rum_perf_patron", title: "台下貴人", stages: 2, stage: 0, loc: "qingcheng", text: "有人連看三場，卻不給賞。" },
      bandit: { id: "rum_bandit_wanted", title: "海捕文書", stages: 3, stage: 0, loc: "heishui", text: "你的影子出現在海捕文書邊角。" },
      prince: { id: "rum_prince_faction", title: "東宮風聞", stages: 3, stage: 0, loc: "qianqing", text: "有人在試探殿下站哪邊。" },
      princess: { id: "rum_princess_garden", title: "御苑私約", stages: 2, stage: 0, loc: "yuhuayuan", text: "風鈴響時，常有人影一閃。" },
      official_heir: { id: "rum_heir_case", title: "家門舊案", stages: 3, stage: 0, loc: "jingji", text: "宅門後藏着未結的卷宗。" },
      border_soldier: { id: "rum_border_spy", title: "沙中細作", stages: 3, stage: 0, loc: "bianguan", text: "狼煙方向不對——像有人點錯。" },
      palace_maid_seed: { id: "rum_maid_poison", title: "膳房異味", stages: 2, stage: 0, loc: "hougong", text: "有宮女病倒，膳房不敢說。" },
      eunuch_seed: { id: "rum_eunuch_ledger", title: "名冊缺頁", stages: 3, stage: 0, loc: "jingshen", text: "太監名冊少了一頁，廠公在找。" }
    };
    const rum = seeds[bg.id];
    if (rum && !S.activeRumors.find(function(r){ return r.id === rum.id; })) {
      S.activeRumors.push(Object.assign({}, rum, { birthId: bg.id }));
    }
  }

  function applyBirthChoiceEffect(effect) {
    if (!effect) return;
    if (typeof effect.gold === "number") S.gold = Math.max(0, (S.gold || 0) + effect.gold);
    if (typeof effect.favor === "number") S.emperorFavor = (S.emperorFavor || 0) + effect.favor;
    if (typeof effect.heat === "number") S.palaceHeat = Math.max(0, (S.palaceHeat || 0) + effect.heat);
    if (typeof effect.karma === "number") {
      if (typeof adjustKarma === "function") adjustKarma(effect.karma, "出身抉擇");
      else S.karma = Math.max(-100, Math.min(100, (S.karma || 0) + effect.karma));
    }
    ["force","agi","wit","charm","honor","perception"].forEach(function(k) {
      if (typeof effect[k] === "number") S[k] = Math.max(1, (S[k] || 0) + effect[k]);
    });
    if (effect.item && ITEMS[effect.item]) addItem(effect.item, 1);
    if (effect.flag) setFlag(effect.flag);
    if (effect.craft) applyCraftGain(effect.craft);
    if (effect.factionRep) {
      S.factionRep = S.factionRep || (typeof defaultFactionRep === "function" ? defaultFactionRep() : {});
      Object.keys(effect.factionRep).forEach(function(fid) {
        S.factionRep[fid] = (S.factionRep[fid] || 0) + effect.factionRep[fid];
      });
    }
    if (effect.favorDebtNpc) addFavorDebt(effect.favorDebtNpc, 2, "出身借貸", "owe");
  }

  function runBirthOpening(bg) {
    bg = bg || birthById(S.birthId);
    if (!bg || S.birthOpenDone) return false;
    const choices = bg.openChoices || [];
    if (!choices.length) { S.birthOpenDone = true; return false; }
    let html = "<div class=\"birth-open\"><h3>出身・開場</h3>";
    html += "<div class=\"story-box\">" + escapeHtml(bg.blurb || "") +
      (bg.treatHint ? ("\n\n【待遇】" + bg.treatHint) : "") + "</div>";
    html += "<div class=\"btn-row\" style=\"flex-direction:column;gap:8px\">";
    choices.forEach(function(c, i) {
      html += "<button type=\"button\" class=\"btn\" data-birth-choice=\"" + i + "\">" + escapeHtml(c.label) + "</button>";
    });
    html += "</div></div>";
    openModal(html);
    document.querySelectorAll("[data-birth-choice]").forEach(function(b) {
      b.onclick = function() {
        const idx = parseInt(b.getAttribute("data-birth-choice"), 10);
        const c = choices[idx];
        applyBirthChoiceEffect(c && c.effect);
        S.birthOpenDone = true;
        try { closeModal(); } catch (e) {}
        const line = (c && c.effect && c.effect.text) ? c.effect.text : "你邁出第一步。";
        showStory("【" + (bg.name || "出身") + "】" + line +
          (bg.earlyQuest ? ("\n新標記：" + bg.earlyQuest.title + "——" + (bg.earlyQuest.hint || "")) : ""));
        try { render(); } catch (e2) {}
      };
    });
    return true;
  }

  function wipeForRebirth(past) {
    ensureReincarnationState();
    const keepNameHint = S.name;
    const count = (S.reincarnationCount || 0) + 1;
    const pastLives = (S.pastLives || []).slice(-7);
    pastLives.push(past || snapshotPastLife("投胎"));
    const echo = Math.round((past && typeof past.karma === "number" ? past.karma : (S.karma || 0)) * 0.35);
    const trait = S.trait || "";
    const fresh = defaultState();
    fresh.name = keepNameHint;
    fresh.trait = trait;
    fresh.reincarnationCount = count;
    fresh.pastLives = pastLives;
    fresh.pastKarmaEcho = echo;
    fresh.karma = echo;
    fresh.birthId = null;
    fresh.birthLabel = null;
    fresh.pendingRebirth = null;
    fresh.saveVer = 10;
    fresh.timeSlot = "dawn";
    fresh.favorLedger = [];
    fresh.craftXP = { martial: 0, commerce: 0, scheming: 0, medicine: 0, letters: 0 };
    if (past && past.craftXP) {
      Object.keys(fresh.craftXP).forEach(function(k) {
        fresh.craftXP[k] = Math.floor(((past.craftXP[k] || 0) * 0.15));
      });
    }
    fresh.activeRumors = [];
    fresh.festivalState = { lastId: null, lastDay: 0, joined: {} };
    if (count >= 2) fresh.luck = (fresh.luck || 5) + 1;
    if (count >= 4) fresh.perception = (fresh.perception || 5) + 1;
    S = fresh;
    ensureAllNpcMem();
    if (typeof ensureBonds === "function") ensureBonds();
    if (typeof ensureQuests === "function") ensureQuests();
    if (typeof ensurePalaceState === "function") ensurePalaceState();
    if (typeof ensureCourtCareer === "function") ensureCourtCareer();
    ensureReincarnationState();
  }

  function openRebirthUI(opts) {
    opts = opts || {};
    ensureReincarnationState();
    const cause = (S.pendingRebirth && S.pendingRebirth.cause) || opts.cause || "身死";
    const past = (S.pendingRebirth && S.pendingRebirth.past) || null;
    const mode = opts.mode || (opts.choose ? "choose" : "reveal");
    const pool = availableBirths({ afterDeath: true });
    let html = "<div class=\"rebirth-sheet\"><h3>☯ 投胎轉世</h3>";
    html += "<div class=\"story-box small\">前緣已盡（" + escapeHtml(cause) + "）。中陰彷徨——擇一出身，或聽天由命。<br/>首世僅平民；今已可投皇裔／軍政／內廷。</div>";
    if (past) {
      html += "<p class=\"small\">前世：" + escapeHtml(past.name || "") +
        " · 善惡 " + (past.karma || 0) +
        (past.birthLabel ? " · 曾為" + escapeHtml(past.birthLabel) : "") +
        " · 殘響將帶入今生</p>";
    }
    if ((S.reincarnationCount || 0) > 0) {
      html += "<p class=\"small\">這是你第 " + ((S.reincarnationCount || 0) + (S.birthId ? 0 : 1)) + " 次臨世。</p>";
    }
    html += "<div class=\"btn-row\" style=\"flex-direction:column;gap:8px\">";
    if (mode === "choose") {
      pool.forEach(function(bg) {
        const tag = bg.firstLife ? "平民" : "權貴／特職";
        html += "<button type=\"button\" class=\"btn\" data-birth=\"" + bg.id + "\"><strong>" +
          escapeHtml(bg.name) + "</strong> <span class=\"small\">[" + tag + "]</span><div class=\"small\">" +
          escapeHtml(bg.blurb) + "</div></button>";
      });
    }
    html += "<button type=\"button\" class=\"btn primary\" id=\"btn-rebirth-random\">聽天由命（隨機出身）</button>";
    if (mode !== "choose") {
      html += "<button type=\"button\" class=\"btn\" id=\"btn-rebirth-choose\">我要自選出身</button>";
    }
    html += "</div></div>";
    openModal(html);
    const rnd = document.getElementById("btn-rebirth-random");
    if (rnd) rnd.onclick = function() {
      const bg = pool[Math.floor(Math.random() * pool.length)];
      finalizeRebirth(bg.id, { reveal: true });
    };
    const ch = document.getElementById("btn-rebirth-choose");
    if (ch) ch.onclick = function() { openRebirthUI({ mode: "choose", cause: cause }); };
    document.querySelectorAll("[data-birth]").forEach(function(b) {
      b.onclick = function() { finalizeRebirth(b.getAttribute("data-birth"), { reveal: false }); };
    });
  }

  function finalizeRebirth(birthId, opts) {
    opts = opts || {};
    ensureReincarnationState();
    const pending = S.pendingRebirth;
    const past = pending && pending.past ? pending.past : snapshotPastLife("投胎");
    const keepGender = S.gender;
    wipeForRebirth(past);
    const bg = birthById(birthId);
    if (!bg.gender) S.gender = keepGender || S.gender;
    applyBirthBackground(bg, { allowElite: true });
    S.pendingRebirth = null;
    S.endingId = null;
    S.ending = null;
    try { saveGameSilent(); } catch (e1) { try { saveGame(); } catch (e2) {} }
    try { closeModal(); } catch (eClose) {}
    const echoLine = (S.pastKarmaEcho || 0) !== 0
      ? ("\n前世業力殘響：" + (S.pastKarmaEcho > 0 ? "善念尚存" : "惡業未消") + "（善惡" + (S.pastKarmaEcho > 0 ? "＋" : "") + S.pastKarmaEcho + "）")
      : "";
    const title = opts.reveal ? "命運擲骰——你投生為「" + bg.name + "」。" : "你擇定出身：「" + bg.name + "」。";
    showStory("【投胎】" + title + "\n" + bg.blurb + echoLine +
      "\n\n今生姓名仍喚 " + S.name + "。\n出身：" + bg.name + " · 地點：" +
      (((LOCATIONS.find(function(l){return l.id===S.loc;})||{}).name) || S.loc) + " · 第 " + S.reincarnationCount + " 世。" +
      (bg.treatHint ? ("\n待遇：" + bg.treatHint) : ""));
    try { render(); } catch (e3) {}
    setTimeout(function(){ try { runBirthOpening(bg); } catch (e4) {} }, 350);
  }

  function triggerPlayerDeath(cause, opts) {
    opts = opts || {};
    ensureReincarnationState();
    const past = snapshotPastLife(cause || "身死");
    S.pendingRebirth = { cause: cause || "身死", past: past, scene: opts.scene || null, day: S.day };
    S.hp = 0;
    S.endingId = "pending_rebirth";
    S.ending = { title: "中陰未散", epi: "一縷真靈未散，待投胎轉世。" };
    const scene = opts.scene;
    const text = (opts.text ? opts.text + "\n\n" : "") +
      "【身死】" + (cause || "你的故事在此斷絕") + "。\n燈光與刀影遠去——你聽見輪迴的水聲。\n（可投胎轉世；二世起可選皇裔等）";
    if (scene && typeof ASSETS !== "undefined" && ASSETS[scene]) S.sceneOverride = scene;
    const banner = (scene && typeof asset === "function" && asset(scene))
      ? "<div style=\"margin:0 0 10px;border-radius:8px;overflow:hidden;border:1px solid #3a2a1a\"><img src=\"" + asset(scene) + "\" alt=\"\" style=\"width:100%;max-height:180px;object-fit:cover;display:block\" /></div>"
      : "";
    openModal("<h3>江湖記事・身死</h3>" + banner +
      "<div class=\"story-box\">" + escapeHtml(text) + "</div>" +
      "<div class=\"btn-row\" style=\"flex-direction:column;gap:8px\">" +
      "<button type=\"button\" class=\"btn primary\" id=\"btn-go-rebirth\">☯ 投胎轉世</button>" +
      "<button type=\"button\" class=\"btn ghost\" id=\"btn-death-linger\">……再看一眼</button></div>");
    const go = document.getElementById("btn-go-rebirth");
    if (go) go.onclick = function() { openRebirthUI({ mode: "reveal", cause: cause }); };
    const linger = document.getElementById("btn-death-linger");
    if (linger) linger.onclick = function() { openRebirthUI({ mode: "reveal", cause: cause }); };
    try { saveGameSilent(); } catch (e) {}
    return { ok: false, rebirth: true };
  }

  function birthLabelLine() {
    ensureReincarnationState();
    if (!S.birthLabel) return "";
    let s = "出身 " + S.birthLabel;
    if (S.birthTreatTag) s += "・" + S.birthTreatTag;
    if (S.reincarnationCount > 0) s += " · 第" + S.reincarnationCount + "世";
    else s += " · 第1世";
    if (S.pastKarmaEcho) s += " · 業殘響" + (S.pastKarmaEcho > 0 ? "＋" : "") + S.pastKarmaEcho;
    return s;
  }

  const FESTIVALS = [
    { id: "shangyuan", name: "上元燈會", every: 30, offset: 1, locs: ["qingcheng", "jingji", "hub"], blurb: "花燈如海。有人在燈下換面。" },
    { id: "qingming", name: "清明雨絲", every: 30, offset: 7, locs: ["qingcheng", "cangyun", "hub"], blurb: "細雨掃墓。舊債與新仇並發芽。" },
    { id: "duanwu", name: "端午龍舟", every: 30, offset: 13, locs: ["qingcheng", "yanhui"], blurb: "鼓聲動江。賭局與鏢局同開。" },
    { id: "zhongqiu", name: "中秋月圓", every: 30, offset: 19, locs: ["hub", "jingji", "meiwu"], blurb: "月餅與密信一起傳。" },
    { id: "chongyang", name: "重陽登高", every: 30, offset: 24, locs: ["hub", "cangyun", "bianguan"], blurb: "登高避災——也避仇家。" },
    { id: "dongzhi", name: "冬至圍爐", every: 30, offset: 28, locs: ["hub", "jingji", "huanggong"], blurb: "湯圓熱氣裡，有人談宮變。" }
  ];

  function currentFestival() {
    ensureComplexityState();
    const d = S.day || 1;
    for (let i = 0; i < FESTIVALS.length; i++) {
      const f = FESTIVALS[i];
      if (((d - f.offset) % f.every + f.every) % f.every === 0) return f;
    }
    return null;
  }

  function onNewDayComplexity(dayAdd) {
    ensureComplexityState();
    const fest = currentFestival();
    if (fest && S.festivalState.lastDay !== S.day) {
      S.festivalState.lastId = fest.id;
      S.festivalState.lastDay = S.day;
      toast("節令・" + fest.name, true);
    }
    if (Math.random() < 0.12 && S.favorLedger.some(function(e){ return !e.settled && e.dir === "owe"; })) {
      setFlag("favor_call_pending");
    }
  }

  function openFestivalUI() {
    const fest = currentFestival();
    if (!fest) return showStory("今日無節令。每旬自有上元、清明、端午、中秋、重陽、冬至輪轉。");
    ensureComplexityState();
    let html = "<h3>節令・" + escapeHtml(fest.name) + "</h3>";
    html += "<div class=\"story-box\">" + escapeHtml(fest.blurb) + "</div>";
    html += "<div class=\"btn-row\" style=\"flex-direction:column;gap:8px\">";
    html += "<button type=\"button\" class=\"btn primary\" id=\"fest-join\">參與節令（耗一時辰）</button>";
    html += "<button type=\"button\" class=\"btn\" id=\"fest-scheme\">趁亂行事（權謀／風險）</button>";
    html += "<button type=\"button\" class=\"btn ghost\" onclick=\"closeModal()\">離開</button></div>";
    openModal(html);
    const j = document.getElementById("fest-join");
    if (j) j.onclick = function() {
      closeModal();
      advanceTimeSlot(1);
      S.festivalState.joined = S.festivalState.joined || {};
      S.festivalState.joined[fest.id] = (S.festivalState.joined[fest.id] || 0) + 1;
      S.renown += 1; S.gold += 5 + Math.floor(Math.random() * 10);
      applyCraftGain({ commerce: 2, letters: 1 });
      if (Math.random() < 0.35) {
        const npcIds = Object.keys(NPCS).filter(function(id){ return NPCS[id].loc === S.loc || (fest.locs || []).indexOf(NPCS[id].loc) >= 0; });
        if (npcIds.length) {
          const nid = npcIds[Math.floor(Math.random() * npcIds.length)];
          addFavorDebt(nid, 1, fest.name + "同席", "credit");
          showStory("【" + fest.name + "】你與" + NPCS[nid].name + "同席一敘，對方欠你一分人情。\n獲薄禮與聲望。");
          return;
        }
      }
      showStory("【" + fest.name + "】你湊了回熱鬧，懷裡多了些碎銀與傳聞。");
    };
    const sbtn = document.getElementById("fest-scheme");
    if (sbtn) sbtn.onclick = function() {
      closeModal();
      advanceTimeSlot(1);
      applyCraftGain({ scheming: 5 });
      if (Math.random() < 0.45) {
        S.gold += 25; S.palaceHeat = (S.palaceHeat || 0) + 3;
        if (typeof adjustKarma === "function") adjustKarma(-2, "節令趁亂");
        showStory("【" + fest.name + "・亂】你摸到一筆外財——也留下痕跡。");
      } else {
        S.hp = Math.max(1, S.hp - 8);
        showStory("【" + fest.name + "・亂】你被巡夜撞見，捱了一頓，空手而歸。");
      }
    };
  }

  function openRumorBoardV2() {
    ensureComplexityState();
    const lines = [];
    const fest = currentFestival();
    if (fest) lines.push("【節令】今日「" + fest.name + "」——可於當地參與。");
    lines.push("【時辰】" + timeSlotLabel() + " · 第" + (S.day || 1) + "日");
    if (S.birthTreatTag) lines.push("【身份】" + (S.birthLabel || "") + "・" + S.birthTreatTag + "——市井對你另眼相看。");
    (S.activeRumors || []).forEach(function(r) {
      lines.push("【傳聞" + (r.stage + 1) + "/" + r.stages + "】" + r.title + "：" + r.text +
        (r.loc ? ("（線索地：" + (((LOCATIONS.find(function(l){return l.id===r.loc;})||{}).name) || r.loc) + "）") : ""));
    });
    if (!(S.activeRumors || []).length) lines.push("傳聞稀少——去市井／節令多走走。");
    if (!S.bountyTarget) {
      const opts = ["bounty_thug", "elite_bandit", "sea_raider", "bamboo_assassin"];
      S.bountyTarget = opts[Math.floor(Math.random() * opts.length)];
    }
    const en = ENEMIES[S.bountyTarget];
    lines.push("【懸賞】討伐「" + (en ? en.name : S.bountyTarget) + "」。");
    const sample = Object.keys(NPCS).filter(function(id){ return NPCS[id].major; }).sort(function(){ return Math.random() - 0.5; }).slice(0, 3);
    sample.forEach(function(id) {
      const f = S.fates[id] || "default";
      lines.push(NPCS[id].name + "：" + (NPCS[id].destinies[f] || "行蹤成謎。"));
    });
    openModal("<h3>江湖榜・傳聞</h3><div class=\"story-box rumor-board\">" +
      lines.map(function(l){ return escapeHtml(l); }).join("<br/>") + "</div>" +
      "<div class=\"btn-row\" style=\"flex-direction:column;gap:8px\">" +
      "<button class=\"btn primary\" id=\"rumor-pursue\">追查活躍傳聞（耗一時辰）</button>" +
      "<button class=\"btn\" id=\"rumor-bounty\">前往懸賞開戰</button>" +
      "<button class=\"btn ghost\" onclick=\"closeModal()\">關閉</button></div>");
    const p = document.getElementById("rumor-pursue");
    if (p) p.onclick = function() { closeModal(); pursueActiveRumor(); };
    const b = document.getElementById("rumor-bounty");
    if (b) b.onclick = function() {
      closeModal();
      const tid = S.bountyTarget || "bounty_thug";
      startCombat(tid, function() {
        const gold = 40 + Math.floor(Math.random() * 40) + Math.floor((S.renown || 0) / 5);
        S.gold += gold; S.renown += 2; S.bountyTarget = null;
        applyCraftGain({ martial: 3 });
        showStory("懸賞了結，獲賞金 " + gold + " 兩。");
      });
    };
  }

  function pursueActiveRumor() {
    ensureComplexityState();
    const rum = (S.activeRumors || []).find(function(r){ return r.stage < r.stages; });
    if (!rum) return showStory("沒有可追的傳聞。節令或出身開場會落下新線索。");
    advanceTimeSlot(1);
    if (rum.loc && S.loc !== rum.loc && Math.random() < 0.55) {
      showStory("【追查】線索指向「" + (((LOCATIONS.find(function(l){return l.id===rum.loc;})||{}).name) || rum.loc) + "」，此處無獲。耗去一時辰。");
      return;
    }
    rum.stage++;
    applyCraftGain({ scheming: 3, letters: 1 });
    if (rum.stage >= rum.stages) {
      rum.done = true;
      S.renown += 2; S.gold += 15 + Math.floor(Math.random() * 20);
      let extra = "你拼出故事全貌，得銀與聲望。";
      if (rum.birthId === "beggar" || rum.birthId === "orphan") {
        addItem("herb", 1); extra = "破碗／舊債真相落地——你多了一味藥與一分膽氣。";
        S.force = (S.force || 5) + 1;
      } else if (rum.birthId === "merchant") {
        setFlag("trade_pass"); S.gold += 30; extra = "商路重開，古蘭眼線記你一功。";
        applyCraftGain({ commerce: 8 });
      } else if (rum.birthId === "bandit") {
        if (typeof adjustKarma === "function") adjustKarma(Math.random() < 0.5 ? 3 : -3, "海捕抉擇");
        extra = "海捕文書上的影子淡了——或更深了。";
      } else if (rum.birthId === "prince" || rum.birthId === "princess") {
        S.emperorFavor = (S.emperorFavor || 0) + 3; extra = "宮牆內一子落下，帝心微動。";
      }
      S.activeRumors = S.activeRumors.filter(function(r){ return !r.done; });
      showStory("【傳聞了結】" + rum.title + "\n" + extra);
    } else {
      const mid = ["你問到一個名字——還缺證物。", "线人要你明日黃昏再來。", "半張紙被雨打濕，字跡可辨二三。"];
      rum.text = mid[Math.floor(Math.random() * mid.length)];
      showStory("【傳聞推進】" + rum.title + "（" + rum.stage + "/" + rum.stages + "）\n" + rum.text);
    }
  }

  function openFavorLedgerUI() {
    ensureComplexityState();
    const open = S.favorLedger.filter(function(e){ return !e.settled; });
    let html = "<h3>人情帳</h3><div class=\"story-box small\">欠人／人欠——都會被討回來。AI 與劇本皆會讀這本帳。</div>";
    if (!open.length) html += "<p class=\"small\">帳上清空。助人、同席、借貸會寫入。</p>";
    else {
      html += "<div class=\"list\">";
      open.slice(0, 12).forEach(function(e, i) {
        const nm = NPCS[e.npcId] ? NPCS[e.npcId].name : e.npcId;
        const dir = e.dir === "owe" ? "你欠對方" : "對方欠你";
        html += "<div class=\"list-item\"><div><strong>" + escapeHtml(nm) + "</strong> · " + dir + " ×" + e.amount +
          "<div class=\"small\">" + escapeHtml(e.reason || "") + " · 第" + e.day + "日</div></div>" +
          "<button type=\"button\" class=\"btn\" data-settle=\"" + i + "\">了結</button></div>";
      });
      html += "</div>";
    }
    html += "<div class=\"btn-row\"><button class=\"btn ghost\" onclick=\"closeModal()\">關閉</button></div>";
    openModal(html);
    document.querySelectorAll("[data-settle]").forEach(function(b) {
      b.onclick = function() {
        const idx = parseInt(b.getAttribute("data-settle"), 10);
        const e = open[idx];
        if (!e) return;
        closeModal();
        resolveFavorEntry(e);
      };
    });
  }

  function resolveFavorEntry(e) {
    if (!e || e.settled) return;
    const nm = NPCS[e.npcId] ? NPCS[e.npcId].name : e.npcId;
    if (e.dir === "owe") {
      const need = 10 * (e.amount || 1);
      if (S.gold >= need) {
        S.gold -= need; e.settled = true;
        if (S.datingAff) S.datingAff[e.npcId] = (S.datingAff[e.npcId] || 0) + 3;
        applyCraftGain({ commerce: 2 });
        showStory("你以 " + need + " 金了結對" + nm + "的人情。對方頷首。");
      } else {
        openModal("<h3>了結人情</h3><div class=\"story-box\">銀兩不足（需" + need + "）。可選：</div>" +
          "<div class=\"btn-row\" style=\"flex-direction:column;gap:8px\">" +
          "<button class=\"btn\" id=\"fv-labor\">以勞役／跑腿抵（耗兩時辰）</button>" +
          "<button class=\"btn\" id=\"fv-refuse\">暫時拒絕（對方懷恨）</button>" +
          "<button class=\"btn ghost\" onclick=\"closeModal()\">再議</button></div>");
        const fl = document.getElementById("fv-labor");
        if (fl) fl.onclick = function() {
          closeModal(); advanceTimeSlot(2); e.settled = true;
          applyCraftGain({ martial: 2, commerce: 2 });
          showStory("你替" + nm + "跑斷腿，人情一筆勾销。");
        };
        const fr = document.getElementById("fv-refuse");
        if (fr) fr.onclick = function() {
          closeModal();
          e.amount += 1;
          if (S.datingAff) S.datingAff[e.npcId] = (S.datingAff[e.npcId] || 0) - 5;
          S.palaceHeat = (S.palaceHeat || 0) + 2;
          showStory(nm + "冷笑：「欠債的，記住。」人情加重，關係變差。");
        };
      }
    } else {
      e.settled = true;
      S.gold += 8 * (e.amount || 1);
      if (S.datingAff) S.datingAff[e.npcId] = (S.datingAff[e.npcId] || 0) + 2;
      showStory(nm + "還了你人情，附帶薄禮 " + (8 * (e.amount || 1)) + " 金。");
    }
    try { render(); } catch (err) {}
  }

  function maybeFavorCallIn() {
    if (!flag("favor_call_pending")) return false;
    if (S.flags) delete S.flags.favor_call_pending;
    const e = S.favorLedger.find(function(x){ return !x.settled && x.dir === "owe"; });
    if (!e) return false;
    const nm = NPCS[e.npcId] ? NPCS[e.npcId].name : e.npcId;
    openModal("<h3>討債人到</h3><div class=\"story-box\">" + escapeHtml(nm) + "派人來說：「舊日人情，今日該還。」</div>" +
      "<div class=\"btn-row\" style=\"flex-direction:column;gap:8px\">" +
      "<button class=\"btn primary\" id=\"fc-pay\">現在了結</button>" +
      "<button class=\"btn ghost\" id=\"fc-later\">再拖一拖</button></div>");
    const a = document.getElementById("fc-pay");
    if (a) a.onclick = function(){ closeModal(); resolveFavorEntry(e); };
    const b = document.getElementById("fc-later");
    if (b) b.onclick = function(){ closeModal(); e.amount += 1; toast("人情加重", true); };
    return true;
  }

  function openCraftUI() {
    ensureComplexityState();
    const c = S.craftXP;
    const row = function(name, v) {
      const bar = Math.min(100, v);
      return "<div class=\"list-item\"><div><strong>" + name + "</strong> " + v +
        "<div class=\"small\" style=\"background:#2a1a10;border-radius:4px;height:6px;margin-top:4px\"><div style=\"width:" + bar + "%;height:6px;background:#c4a35a;border-radius:4px\"></div></div></div></div>";
    };
    openModal("<h3>技藝潛修</h3><div class=\"story-box small\">行事累積潛修；滿 25／50 有屬性突破。</div>" +
      row("武道", c.martial) + row("商道", c.commerce) + row("權謀", c.scheming) +
      row("藥理", c.medicine) + row("文墨", c.letters) +
      "<div class=\"btn-row\" style=\"flex-direction:column;gap:8px\">" +
      "<button class=\"btn\" id=\"craft-train\">苦修一時辰（依時辰偏向）</button>" +
      "<button class=\"btn ghost\" onclick=\"closeModal()\">關閉</button></div>");
    const t = document.getElementById("craft-train");
    if (t) t.onclick = function() {
      closeModal();
      const slot = S.timeSlot;
      advanceTimeSlot(1);
      const gain = { martial: 0, commerce: 0, scheming: 0, medicine: 0, letters: 0 };
      if (slot === "dawn") { gain.martial = 4; gain.medicine = 2; }
      else if (slot === "noon") { gain.commerce = 4; gain.letters = 2; }
      else if (slot === "dusk") { gain.scheming = 3; gain.martial = 2; }
      else { gain.scheming = 4; gain.letters = 2; }
      applyCraftGain(gain);
      S.neili = Math.min(S.neiliMax, S.neili + 3);
      showStory("【潛修・" + TIME_SLOT_LABEL[slot] + "】你按時辰修行，技藝有進。");
      try { render(); } catch (e) {}
    };
  }

  function openScheduleUI() {
    ensureComplexityState();
    openModal("<h3>時辰・" + timeSlotLabel() + "</h3>" +
      "<div class=\"story-box\">一日四時：清晨／正午／黃昏／深夜。行動多耗時辰；扎營從夜入翌日清晨。<br/>不同時辰影響市集、節令、潛修與宮門鬆緊。</div>" +
      "<div class=\"btn-row\" style=\"flex-direction:column;gap:8px\">" +
      "<button class=\"btn primary\" id=\"slot-advance\">度過一時辰</button>" +
      "<button class=\"btn\" id=\"slot-rest-day\">直接入夜扎營（日結）</button>" +
      "<button class=\"btn ghost\" onclick=\"closeModal()\">關閉</button></div>");
    const a = document.getElementById("slot-advance");
    if (a) a.onclick = function() {
      closeModal();
      const r = advanceTimeSlot(1);
      toast(timeSlotLabel() + (r.dayAdd ? "・翌日" : ""), true);
      if (!maybeFavorCallIn()) {
        const fest = currentFestival();
        if (fest && Math.random() < 0.25) openFestivalUI();
        else render();
      }
    };
    const r = document.getElementById("slot-rest-day");
    if (r) r.onclick = function() {
      closeModal();
      S.timeSlot = "night";
      if (typeof campOvernight === "function") campOvernight();
      else { advanceTimeSlot(1); render(); }
    };
  }

  // ----- Wrap existing systems -----
  const __campOvernightV12 = campOvernight;
  campOvernight = function() {
    ensureComplexityState();
    const ret = __campOvernightV12.apply(this, arguments);
    S.timeSlot = "dawn";
    try { onNewDayComplexity(1); } catch (e) {}
    setTimeout(function(){ try { maybeFavorCallIn(); } catch (e2) {} }, 600);
    return ret;
  };

  openRumorBoard = openRumorBoardV2;

  const __showCreateOrig = showCreate;
  showCreate = function() {
    __showCreateOrig();
    const bsel = document.getElementById("birth-sel");
    if (bsel) {
      bsel.innerHTML = "";
      const pool = availableBirths({ firstLife: true });
      pool.forEach(function(bg) {
        const o = document.createElement("option");
        o.value = bg.id;
        o.textContent = bg.name + "——" + String(bg.blurb || "").slice(0, 16);
        bsel.appendChild(o);
      });
      bsel.value = pool[0] ? pool[0].id : "orphan";
      const note = document.createElement("p");
      note.className = "small";
      note.style.marginTop = "6px";
      note.textContent = "首世僅平民出身（商戶／乞丐／孤兒／農戶等）。皇子公主內侍等須投胎後解鎖。";
      if (bsel.parentNode) bsel.parentNode.insertBefore(note, bsel.nextSibling);
    }
    const start = document.getElementById("btn-start");
    if (start) {
      const prev = start.onclick;
      start.onclick = function() {
        if (typeof prev === "function") prev();
        setTimeout(function() {
          try {
            if (S.birthId && birthById(S.birthId).tier === "elite" && (S.reincarnationCount || 0) < 1) {
              applyBirthBackground(birthById("orphan"), { gender: S.gender, allowElite: false });
            }
            runBirthOpening(birthById(S.birthId));
          } catch (e) {}
        }, 200);
      };
    }
  };

  const __locationActionsV12 = locationActions;
  locationActions = function(locId) {
    const acts = __locationActionsV12(locId) || [];
    acts.push({ label: "時辰・" + timeSlotLabel(), fn: function(){ openScheduleUI(); } });
    acts.push({ label: "技藝潛修", fn: function(){ openCraftUI(); } });
    acts.push({ label: "人情帳", fn: function(){ openFavorLedgerUI(); } });
    if (currentFestival()) {
      acts.unshift({ label: "節令・" + currentFestival().name, fn: function(){ openFestivalUI(); } });
    }
    if (S.quests) {
      Object.keys(S.quests).forEach(function(qid) {
        const q = S.quests[qid];
        if (q && !q.done && String(qid).indexOf("bq_") === 0 && q.step === 0) {
          acts.push({ label: "【出身】" + (q.title || qid), fn: function(){ progressBirthQuest(qid); } });
        }
      });
    }
    return acts;
  };

  function progressBirthQuest(qid) {
    const q = S.quests[qid];
    if (!q || q.done) return toast("已了結", true);
    advanceTimeSlot(1);
    q.step = (q.step || 0) + 1;
    applyCraftGain({ letters: 1, commerce: 1 });
    if (q.step >= 2) {
      q.done = true;
      S.renown += 2; S.gold += 10; S.exp = (S.exp || 0) + 6;
      const tag = S.birthTreatTag || "";
      if (tag === "賤籍" || tag === "寒門") { S.honor = (S.honor || 0) + 2; addItem("herb", 1); }
      if (tag === "商賈") { applyCraftGain({ commerce: 6 }); S.gold += 20; }
      if (tag === "皇裔" || tag === "金枝") { S.emperorFavor = (S.emperorFavor || 0) + 2; }
      if (tag === "匪籍") {
        S.factionRep = S.factionRep || (typeof defaultFactionRep === "function" ? defaultFactionRep() : {});
        S.factionRep.heishui_band = (S.factionRep.heishui_band || 0) + 8;
      }
      showStory("【出身了結】" + q.title + "\n你在這條出身線上站穩了腳跟。");
    } else {
      showStory("【出身】" + q.title + "\n" + (q.hint || "線索尚在發酵。") + "\n（再推進一次可了結）");
    }
    try { render(); } catch (e) {}
  }

  const __renderMoreV12 = renderMore;
  renderMore = function() {
    let html = __renderMoreV12();
    html += "<h3 style=\"margin-top:14px\">江湖深层</h3><div class=\"btn-row\">" +
      "<button class=\"btn\" id=\"btn-v12-sched\">時辰</button>" +
      "<button class=\"btn\" id=\"btn-v12-craft\">技藝</button>" +
      "<button class=\"btn\" id=\"btn-v12-favor\">人情帳</button>" +
      "<button class=\"btn\" id=\"btn-v12-fest\">節令</button>" +
      "<button class=\"btn\" id=\"btn-v12-rumor\">傳聞板</button></div>" +
      "<p class=\"small\">存檔 v10 · 首世平民 · 時辰 " + timeSlotLabel() + "</p>";
    return html;
  };

  const __bindHubV12 = bindHub;
  bindHub = function() {
    __bindHubV12();
    const map = {
      "btn-v12-sched": openScheduleUI,
      "btn-v12-craft": openCraftUI,
      "btn-v12-favor": openFavorLedgerUI,
      "btn-v12-fest": openFestivalUI,
      "btn-v12-rumor": openRumorBoardV2
    };
    Object.keys(map).forEach(function(id) {
      const el = document.getElementById(id);
      if (el) el.onclick = map[id];
    });
  };

  const __renderHeroV12 = renderHero;
  renderHero = function() {
    let html = __renderHeroV12();
    ensureComplexityState();
    const c = S.craftXP || {};
    html += "<div class=\"panel\" style=\"margin-top:8px\"><h3>出身與潛修</h3>" +
      "<p class=\"small\">" + escapeHtml(birthLabelLine() || "未擇出身") + " · " + timeSlotLabel() + "</p>" +
      (S.birthTreatTag ? "<p class=\"small\">待遇標籤：" + escapeHtml(S.birthTreatTag) + "</p>" : "") +
      "<p class=\"small\">武道" + (c.martial||0) + " · 商道" + (c.commerce||0) + " · 權謀" + (c.scheming||0) +
      " · 藥理" + (c.medicine||0) + " · 文墨" + (c.letters||0) + "</p>" +
      "<p class=\"small\">未了人情 " + (S.favorLedger.filter(function(e){return !e.settled;}).length) +
      " · 活躍傳聞 " + (S.activeRumors||[]).length + "</p></div>";
    return html;
  };

  window.__JH_AUTORUN_REBIRTH = function() {
    ensureReincarnationState();
    S.name = S.name || "試劍人";
    S.gender = "男";
    S.palaceHeat = 90;
    S.karma = -20;
    S.loc = "wumen";
    S.reincarnationCount = 0;
    const firstPool = availableBirths({ firstLife: true });
    const firstOk = firstPool.every(function(b){ return b.firstLife !== false && b.tier !== "elite"; }) &&
      !firstPool.some(function(b){ return b.id === "prince" || b.id === "eunuch_seed"; });
    applyBirthBackground(birthById("orphan"), { allowElite: false });
    const openHad = (birthById("orphan").openChoices || []).length > 0;
    triggerPlayerDeath("午門問斬（自測）", { scene: "punishWumenZhanshou", text: "自測・問斬" });
    if (!S.pendingRebirth) return { ok: false, err: "no pendingRebirth", firstOk: firstOk };
    finalizeRebirth("orphan", { reveal: true });
    const ok = !!(S.birthId === "orphan" && S.reincarnationCount >= 1 && S.pendingRebirth == null && S.hp > 0);
    S.palaceHeat = 99;
    triggerPlayerDeath("刑場（自測2）", { scene: "punishXingxingTai" });
    finalizeRebirth("prince", { reveal: false });
    const ok2 = S.birthId === "prince" && S.reincarnationCount >= 2 && flag("palace_entry") && S.loc === "qianqing";
    ensureComplexityState();
    advanceTimeSlot(1);
    applyCraftGain({ martial: 30 });
    addFavorDebt("zhaotie", 1, "自測", "owe");
    seedBirthRumors(birthById("merchant"));
    const delta = statusDeltaForPrompt("shen_guifei");
    const hasDelta = /出身|投胎|權勢|時辰/.test(delta);
    const eliteBlocked = (function(){
      S.reincarnationCount = 0;
      applyBirthBackground(birthById("prince"), { allowElite: false });
      return S.birthId !== "prince";
    })();
    return {
      ok: ok && ok2 && hasDelta && firstOk && eliteBlocked && openHad,
      firstOk: firstOk, eliteBlocked: eliteBlocked, birth: S.birthId, count: S.reincarnationCount,
      delta: delta, lives: (S.pastLives || []).length, timeSlot: S.timeSlot, craft: S.craftXP,
      favorN: S.favorLedger.length, rumors: (S.activeRumors || []).length
    };
  };

  window.__JH_AUTORUN_V12 = function() {
    const r = window.__JH_AUTORUN_REBIRTH();
    S.day = 1;
    const fest = currentFestival();
    S.loc = "qingcheng";
    ensureComplexityState();
    S.activeRumors = [{ id: "t", title: "測", stages: 2, stage: 0, loc: "qingcheng", text: "x", birthId: "orphan" }];
    pursueActiveRumor();
    const rumOk = S.activeRumors[0] && S.activeRumors[0].stage === 1;
    return Object.assign({}, r, { fest: fest && fest.id, rumOk: rumOk, ok: !!(r && r.ok && fest && rumOk) });
  };

  if (window.__JH_DEBUG) {
    Object.assign(window.__JH_DEBUG, {
      BIRTH_BACKGROUNDS: BIRTH_BACKGROUNDS, availableBirths: availableBirths,
      triggerPlayerDeath: triggerPlayerDeath, openRebirthUI: openRebirthUI,
      finalizeRebirth: finalizeRebirth, applyBirthBackground: applyBirthBackground,
      statusDeltaForPrompt: statusDeltaForPrompt, birthLabelLine: birthLabelLine,
      advanceTimeSlot: advanceTimeSlot, openFavorLedgerUI: openFavorLedgerUI,
      openFestivalUI: openFestivalUI, openCraftUI: openCraftUI, currentFestival: currentFestival
    });
  }

  // ========== END V12 ==========
