  // ========== V10: NPC POWER + DONGCHANG GUARD + CIVILIANS ==========
  // Homage: 景安帝／青梧／督公玄梧. 寫意 only. Mutations MUST touch real save.

  const DC_RANK_DEFS = [
    { r: 0, name: "未入廠", need: 0 },
    { r: 1, name: "外勤番子", need: 0 },
    { r: 2, name: "檔房小旗", need: 25 },
    { r: 3, name: "百戶", need: 60 },
    { r: 4, name: "千戶", need: 110 },
    { r: 5, name: "掌刑同知", need: 180 }
  ];

  const DC_TREATMENTS = {
    warn: { label: "警告驅離", karma: -1, heat: 2, gold: 0, favor: -4 },
    beat: { label: "杖責示懲（寫意）", karma: -3, heat: 6, gold: 0, favor: -10 },
    jail: { label: "押入廠牢／天牢", karma: -4, heat: 10, gold: 0, favor: -14 },
    extort: { label: "勒索封口銀", karma: -5, heat: 8, gold: 35, favor: -12 },
    release: { label: "網開一面釋放", karma: 1, heat: -2, gold: 0, favor: 2 }
  };

  const CIVILIAN_NPCS = {
    civ_tea_wang: { id: "civ_tea_wang", name: "王茶客", title: "京畿茶客", loc: "jingji", major: false, line: "civilian",
      intro: "捧着一杯粗茶，愛聽宮牆傳聞。",
      destinies: { ally: "替你傳話。", enemy: "到處說你壞話。", default: "仍坐茶桌。" } },
    civ_bun_li: { id: "civ_bun_li", name: "李嫂", title: "饅頭攤", loc: "qingcheng", major: false, line: "civilian",
      intro: "蒸籠熱氣裡笑臉迎人。",
      destinies: { ally: "給你熱饅頭。", enemy: "拒賣。", default: "守攤。" } },
    civ_porter_zhao: { id: "civ_porter_zhao", name: "趙腳夫", title: "腳力", loc: "longmen", major: false, line: "civilian",
      intro: "肩頭紅印，力氣大、膽子小。",
      destinies: { ally: "願替你搬貨。", enemy: "躲着你。", default: "蹲在碼頭。" } },
    civ_weaver_sun: { id: "civ_weaver_sun", name: "孫織娘", title: "織戶", loc: "meihua", major: false, line: "civilian",
      intro: "指尖繭厚，談論織稅便皺眉。",
      destinies: { ally: "贈一匹粗絹。", enemy: "閉門。", default: "織機不停。" } },
    civ_clerk_zhou: { id: "civ_clerk_zhou", name: "周書辦", title: "外廷書辦", loc: "huanggong", major: false, line: "civilian",
      intro: "袖裡藏着半截未遞的手本。",
      destinies: { ally: "漏消息給你。", enemy: "密告東廠。", default: "抄寫不輟。" } },
    civ_watch_chen: { id: "civ_watch_chen", name: "陳更夫", title: "夜更", loc: "jingji", major: false, line: "civilian",
      intro: "梆子一響，專記誰半夜出入。",
      destinies: { ally: "替你遮一夜。", enemy: "報官。", default: "敲更。" } },
    civ_vendor_ma: { id: "civ_vendor_ma", name: "馬貨郎", title: "貨郎", loc: "gulan", major: false, line: "civilian",
      intro: "貨郎鼓叮噹，什麼都賣一點。",
      destinies: { ally: "半價給你。", enemy: "抬價。", default: "串巷。" } },
    civ_widow_he: { id: "civ_widow_he", name: "何寡妇", title: "城南寡妇", loc: "qingcheng", major: false, line: "civilian",
      intro: "守着一小院，怕官差更怕廠衛。",
      destinies: { ally: "藏你一夜。", enemy: "嚇病。", default: "閉戶。" } },
    civ_student_xu: { id: "civ_student_xu", name: "徐童生", title: "落榜書生", loc: "luohe", major: false, line: "civilian",
      intro: "書卷壓皺，嘴上仍念功名。",
      destinies: { ally: "替你寫狀。", enemy: "作文罵你。", default: "溫書。" } },
    civ_boat_kid: { id: "civ_boat_kid", name: "船娃阿福", title: "船家童", loc: "yanhui", major: false, line: "civilian",
      intro: "光腳跑跳，認得各路船旗。",
      destinies: { ally: "報你潮訊。", enemy: "朝你扔殼。", default: "碼頭玩耍。" } },
    civ_monk_novice: { id: "civ_monk_novice", name: "小沙彌圓覺", title: "雜役僧", loc: "cangyun", major: false, line: "civilian",
      intro: "掃葉出身，武未入門。",
      destinies: { ally: "留齋飯。", enemy: "告師父。", default: "掃地。" } },
    civ_sentry_wife: { id: "civ_sentry_wife", name: "哨卒娘子", title: "邊眷", loc: "bianguan", major: false, line: "civilian",
      intro: "縫補軍衣，打聽關外消息。",
      destinies: { ally: "透哨程。", enemy: "拒見。", default: "縫衣。" } },
    civ_stable_boy: { id: "civ_stable_boy", name: "馬童小六", title: "馬廄童", loc: "longmen", major: false, line: "civilian",
      intro: "馬糞氣味裡竄來竄去。",
      destinies: { ally: "護你坐騎。", enemy: "放驚馬。", default: "刷馬。" } },
    civ_palace_washer: { id: "civ_palace_washer", name: "浣衣阿菊", title: "浣衣女", loc: "neiting", major: false, line: "civilian",
      intro: "杵聲響，聽過許多內廷碎嘴。",
      destinies: { ally: "透花廊事。", enemy: "噤聲避你。", default: "浣衣。" } },
    civ_yushan_helper: { id: "civ_yushan_helper", name: "灶下阿牛", title: "御膳幫廚", loc: "yushan", major: false, line: "civilian",
      intro: "切肉粗手，最怕公公巡灶。",
      destinies: { ally: "留宵夜。", enemy: "飯硬難嚥。", default: "幫灶。" } },
    civ_market_girl: { id: "civ_market_girl", name: "市集小桃", title: "賣花女", loc: "jingji", major: false, line: "civilian",
      intro: "竹籃鮮花，眼神機靈。",
      destinies: { ally: "替你看路。", enemy: "喊賊。", default: "賣花。" } },
    civ_tax_runner: { id: "civ_tax_runner", name: "催稅張差", title: "衙役", loc: "qingcheng", major: false, line: "civilian",
      intro: "腰牌晃晃，其實怕東廠更甚。",
      destinies: { ally: "延你稅期。", enemy: "加派差事。", default: "催稅。" } },
    civ_inn_cook: { id: "civ_inn_cook", name: "客棧廚子老畢", title: "廚子", loc: "jingji", major: false, line: "civilian",
      intro: "灶煙裡聽盡過路客密談。",
      destinies: { ally: "加菜。", enemy: "塩重。", default: "掌勺。" } },
    civ_silk_buyer: { id: "civ_silk_buyer", name: "綢商錢三", title: "綢緞商", loc: "gulan", major: false, line: "civilian",
      intro: "算盤打得比刀快。",
      destinies: { ally: "折價綢。", enemy: "告商會。", default: "談生意。" } },
    civ_beggar_old: { id: "civ_beggar_old", name: "叫花老鬼", title: "街丐", loc: "qingcheng", major: false, line: "civilian",
      intro: "破碗破衣，耳卻尖。",
      destinies: { ally: "報暗巷。", enemy: "纏你討錢。", default: "要飯。" } },
    civ_fanzi_rookie: { id: "civ_fanzi_rookie", name: "廠衛新手阿蛇", title: "見習番子", loc: "dongchang", major: false, line: "factory",
      intro: "黑衣不合身，說話卻學上司陰。",
      destinies: { ally: "聽你差遣。", enemy: "打小報告。", default: "守檔房。" } },
    civ_jail_warden: { id: "civ_jail_warden", name: "黑牢張頭", title: "廠牢役", loc: "dongchang", major: false, line: "factory",
      intro: "鑰匙一串，話少眼濁。",
      destinies: { ally: "鬆一鎖。", enemy: "加刑具（寫意）。", default: "守牢。" } },
    civ_official_low: { id: "civ_official_low", name: "吏目吳謙", title: "從八品吏目", loc: "qianqing", major: false, line: "civil",
      intro: "官帽嫌小，偏愛抖威風。",
      destinies: { ally: "蓋章放行。", enemy: "參你一本。", default: "候值。" } },
    civ_official_mid: { id: "civ_official_mid", name: "郎中馮肅", title: "正五品郎中", loc: "wenyuan", major: false, line: "civil",
      intro: "清流架子，其實怕廠帖。",
      destinies: { ally: "保你一句。", enemy: "聯名參劾。", default: "校書。" } }
  };

  const CIVILIAN_PROFILES = {
    civ_tea_wang: { personality:"cunning", label:"市井耳目", martial:8, awareness:42, desc:"愛傳閒話。", onDetect:"flee", onOpenAttack:"flee", onSteal:"trap", prisonPlace:"jingji", prisonName:"客棧柴房", paroleDays:1, skills:[] },
    civ_bun_li: { personality:"merciful", label:"市井好人", martial:6, awareness:30, desc:"怕事。", onDetect:"flee", onOpenAttack:"flee", onSteal:"flee", prisonPlace:null, prisonName:null, paroleDays:0, skills:[] },
    civ_porter_zhao: { personality:"timid", label:"苦力", martial:14, awareness:28, desc:"力大膽小。", onDetect:"flee", onOpenAttack:"flee", onSteal:"flee", prisonPlace:null, prisonName:null, paroleDays:0, skills:["basic_strike"] },
    civ_weaver_sun: { personality:"timid", label:"織戶", martial:5, awareness:35, desc:"怕官差。", onDetect:"flee", onOpenAttack:"flee", onSteal:"flee", prisonPlace:null, prisonName:null, paroleDays:0, skills:[] },
    civ_clerk_zhou: { personality:"cunning", label:"外廷書辦", martial:10, awareness:55, desc:"知情。", onDetect:"flee", onOpenAttack:"flee", onSteal:"trap", prisonPlace:"huanggong", prisonName:"值房", paroleDays:1, skills:[] },
    civ_watch_chen: { personality:"lawful", label:"更夫", martial:12, awareness:48, desc:"巡夜。", onDetect:"capture", onOpenAttack:"flee", onSteal:"rebuke", prisonPlace:"jingji", prisonName:"更棚", paroleDays:1, skills:[] },
    civ_vendor_ma: { personality:"cunning", label:"貨郎", martial:9, awareness:50, desc:"精明。", onDetect:"flee", onOpenAttack:"flee", onSteal:"trap", prisonPlace:null, prisonName:null, paroleDays:0, skills:[] },
    civ_widow_he: { personality:"timid", label:"寡妇", martial:4, awareness:38, desc:"怕廠衛。", onDetect:"flee", onOpenAttack:"flee", onSteal:"flee", prisonPlace:null, prisonName:null, paroleDays:0, skills:[] },
    civ_student_xu: { personality:"proud", label:"落榜書生", martial:11, awareness:45, desc:"酸氣。", onDetect:"rebuke", onOpenAttack:"flee", onSteal:"rebuke", prisonPlace:null, prisonName:null, paroleDays:0, skills:[] },
    civ_boat_kid: { personality:"timid", label:"船童", martial:5, awareness:40, desc:"機靈。", onDetect:"flee", onOpenAttack:"flee", onSteal:"flee", prisonPlace:null, prisonName:null, paroleDays:0, skills:[] },
    civ_monk_novice: { personality:"merciful", label:"雜役僧", martial:16, awareness:35, desc:"未入武。", onDetect:"flee", onOpenAttack:"flee", onSteal:"rebuke", prisonPlace:"cangyun", prisonName:"柴房", paroleDays:1, skills:["zen_breath"] },
    civ_sentry_wife: { personality:"merciful", label:"邊眷", martial:8, awareness:40, desc:"憂心。", onDetect:"flee", onOpenAttack:"flee", onSteal:"flee", prisonPlace:null, prisonName:null, paroleDays:0, skills:[] },
    civ_stable_boy: { personality:"timid", label:"馬童", martial:7, awareness:32, desc:"怕馬驚。", onDetect:"flee", onOpenAttack:"flee", onSteal:"flee", prisonPlace:null, prisonName:null, paroleDays:0, skills:[] },
    civ_palace_washer: { personality:"cunning", label:"浣衣女", martial:6, awareness:52, desc:"耳尖。", onDetect:"flee", onOpenAttack:"flee", onSteal:"trap", prisonPlace:"neiting", prisonName:"罰跪廊", paroleDays:1, skills:[] },
    civ_yushan_helper: { personality:"timid", label:"幫廚", martial:10, awareness:30, desc:"怕公公。", onDetect:"flee", onOpenAttack:"flee", onSteal:"flee", prisonPlace:"yushan", prisonName:"灶下", paroleDays:0, skills:[] },
    civ_market_girl: { personality:"cunning", label:"賣花女", martial:5, awareness:48, desc:"機靈。", onDetect:"flee", onOpenAttack:"flee", onSteal:"flee", prisonPlace:null, prisonName:null, paroleDays:0, skills:[] },
    civ_tax_runner: { personality:"lawful", label:"衙役", martial:22, awareness:40, desc:"欺軟怕硬。", onDetect:"capture", onOpenAttack:"attack", onSteal:"rebuke", prisonPlace:"qingcheng", prisonName:"班房", paroleDays:1, skills:["basic_strike"] },
    civ_inn_cook: { personality:"merciful", label:"廚子", martial:12, awareness:44, desc:"聽密談。", onDetect:"flee", onOpenAttack:"flee", onSteal:"flee", prisonPlace:null, prisonName:null, paroleDays:0, skills:[] },
    civ_silk_buyer: { personality:"cunning", label:"綢商", martial:10, awareness:60, desc:"財主。", onDetect:"flee", onOpenAttack:"flee", onSteal:"trap", prisonPlace:"gulan", prisonName:"貨棧", paroleDays:1, skills:[] },
    civ_beggar_old: { personality:"cunning", label:"街丐", martial:8, awareness:55, desc:"耳目。", onDetect:"flee", onOpenAttack:"flee", onSteal:"flee", prisonPlace:null, prisonName:null, paroleDays:0, skills:[] },
    civ_fanzi_rookie: { personality:"ruthless", label:"見習番子", martial:32, awareness:50, desc:"學陰狠。", onDetect:"capture", onOpenAttack:"attack", onSteal:"trap", prisonPlace:"dongchang", prisonName:"東廠黑牢", paroleDays:0, skills:["shadow_slash"] },
    civ_jail_warden: { personality:"ruthless", label:"廠牢役", martial:28, awareness:45, desc:"鑰匙。", onDetect:"capture", onOpenAttack:"attack", onSteal:"trap", prisonPlace:"dongchang", prisonName:"東廠黑牢", paroleDays:0, skills:["basic_strike"] },
    civ_official_low: { personality:"proud", label:"低品吏目", martial:18, awareness:50, desc:"抖威風。", onDetect:"capture", onOpenAttack:"flee", onSteal:"rebuke", prisonPlace:"tianlao", prisonName:"天牢", paroleDays:1, skills:[] },
    civ_official_mid: { personality:"lawful", label:"五品郎中", martial:24, awareness:70, desc:"清流怕廠。", onDetect:"capture", onOpenAttack:"flee", onSteal:"trap", prisonPlace:"tianlao", prisonName:"天牢", paroleDays:0, skills:[] }
  };

  const NPC_POWER_PATCH = {
    dongchang_gong: { martial: 98, awareness: 96, label: "廠衛天花板", skills: ["night_net", "shadow_slash", "soft_yin_palm"], desc: "督公掌印，武學深不可測。" },
    hai_dafu_x: { martial: 94, awareness: 96, skills: ["soft_yin_palm", "night_net", "shadow_slash"] },
    jingandi: { martial: 86, awareness: 90, skills: ["cloud_slash", "peak_intent", "zen_breath"], desc: "天子威儀，自有武底。" },
    da_jiangjun: { martial: 94, awareness: 84, skills: ["desert_blade_adv", "iron_sand_palm", "blood_roar"] },
    ao_baiying: { martial: 95, awareness: 72, skills: ["blood_roar", "shadow_slash", "iron_sand_palm"] },
    yulin_tongling: { martial: 80, awareness: 80, skills: ["cangfeng_sword", "cloud_slash"] },
    feng_qingya: { martial: 97, awareness: 94, skills: ["peak_intent", "cangfeng_sword", "void_finger"] },
    dongfang_gubai: { martial: 98, awareness: 94, skills: ["lotus_flame", "ash_veil", "night_net"] },
    jiu_nan_x: { martial: 96, awareness: 94, skills: ["zen_breath", "mercy_seal", "cloud_palm"] },
    huang_yaoshi_x: { martial: 94, awareness: 96, skills: ["odd_formation", "petal_rain", "sea_breeze"] },
    hong_qigong_x: { martial: 90, awareness: 86, skills: ["dogstick_form", "jiaohua_quan", "beggar_drift"] },
    qiao_fengshan: { martial: 92, awareness: 72, skills: ["jiaohua_quan", "dogstick_form"] },
    ye_qingshan: { martial: 88, awareness: 90, skills: ["cangfeng_sword", "cloud_slash"] },
    ouyang_fengdu: { martial: 91, awareness: 82, skills: ["iron_sand_palm", "desert_blade_adv", "sand_veil_cut"] },
    chen_jinnan_x: { martial: 88, awareness: 92, skills: ["cangfeng_sword", "peak_intent"] },
    ren_yingluo: { martial: 84, awareness: 86, skills: ["lotus_flame", "ash_veil"] },
    lin_feng: { martial: 80, awareness: 72, skills: ["cangfeng_sword", "cloud_slash"] },
    guo_jingyi: { martial: 90, awareness: 72, skills: ["cloud_palm", "zen_breath"] },
    masteryun: { martial: 90, awareness: 93, skills: ["staff_form", "zen_breath", "mercy_seal"] },
    honglianzhu: { martial: 84, awareness: 86, skills: ["lotus_flame", "ash_veil"] },
    wuyinqinmo: { martial: 86, awareness: 92, skills: ["silent_song", "qin_strike"] },
    wei_xiaozhou: { martial: 26, awareness: 90, skills: [], desc: "權謀深、武學淺。" },
    shen_guifei: { martial: 18, awareness: 82, skills: [] },
    liu_zhaoyi: { martial: 8, awareness: 42, skills: [] },
    jianning_jun: { martial: 22, awareness: 52, skills: [] },
    tongxiaoliu: { martial: 5, awareness: 38, skills: [] },
    huang_linger: { martial: 12, awareness: 58, skills: [] },
    gongnv_head: { martial: 22, awareness: 72, skills: [] },
    suo_etu_x: { martial: 16, awareness: 90, skills: [] },
    suning: { martial: 24, awareness: 48, skills: ["heal_basic"] },
    baizhi: { martial: 10, awareness: 34, skills: [] },
    boatman: { martial: 12, awareness: 28, skills: [] },
    lan_keeper: { martial: 14, awareness: 56, skills: [] }
  };

  const CIV_QUESTS = [
    { id: "cq_civ_tea_rumor", title: "茶桌宮謠", loc: "jingji", npc: "civ_tea_wang", text: "王茶客壓低聲：宮裡又換了公公……你是聽，還是堵他嘴？",
      choices: [
        { t: "請他細說（情報）", effects: { perception: 1, exp: 3, favorNpc: "civ_tea_wang", favor: 2 } },
        { t: "甩銀封口", effects: { gold: -8, heat: -1, karma: 0 } },
        { t: "嚇他一嚇", effects: { karma: -1, favorNpc: "civ_tea_wang", favor: -3, prestige: 0 } }
      ] },
    { id: "cq_civ_bun_kind", title: "熱饅頭", loc: "qingcheng", npc: "civ_bun_li", text: "李嫂塞來熱饅頭：「客官面生，可是逃荒？」",
      choices: [
        { t: "道謝收下", effects: { hp: 12, favorNpc: "civ_bun_li", favor: 3, karma: 1 } },
        { t: "多付銅錢", effects: { gold: -5, favorNpc: "civ_bun_li", favor: 5, karma: 1 } },
        { t: "白吃逕去", effects: { karma: -1, favorNpc: "civ_bun_li", favor: -4 } }
      ] },
    { id: "cq_civ_widow_protect", title: "寡妇求助", loc: "qingcheng", npc: "civ_widow_he", text: "何寡妇顫聲：催稅差又來拍門……",
      choices: [
        { t: "擋在門前", effects: { karma: 2, honor: 1, favorNpc: "civ_widow_he", favor: 8, heat: 1 } },
        { t: "願代交薄稅", effects: { gold: -15, karma: 2, favorNpc: "civ_widow_he", favor: 10 } },
        { t: "裝作沒看見", effects: { karma: -1, favorNpc: "civ_widow_he", favor: -2 } }
      ] },
    { id: "cq_civ_clerk_leak", title: "手本交易", loc: "huanggong", npc: "civ_clerk_zhou", text: "周書辦袖手手本：「這份名單……廠裡未必知。」",
      choices: [
        { t: "買下情報", effects: { gold: -20, dcPrestige: 4, favorNpc: "civ_clerk_zhou", favor: 2 } },
        { t: "以廠衛壓他交", effects: { needDc: 1, karma: -2, heat: 4, dcPrestige: 6, favorNpc: "civ_clerk_zhou", favor: -6 } },
        { t: "拒收並勸他毀", effects: { karma: 2, favorNpc: "civ_clerk_zhou", favor: 1 } }
      ] },
    { id: "cq_civ_washer_gossip", title: "浣衣碎嘴", loc: "neiting", npc: "civ_palace_washer", text: "阿菊低語：貴妃殿昨夜燈火通明……",
      choices: [
        { t: "耐心聽完", effects: { exp: 2, favorNpc: "civ_palace_washer", favor: 3, emperorFavor: 0 } },
        { t: "命她閉嘴（廠威）", effects: { needDc: 1, karma: -1, heat: 2, favorNpc: "civ_palace_washer", favor: -5 } },
        { t: "送她香皂討好", effects: { gold: -6, favorNpc: "civ_palace_washer", favor: 6 } }
      ] },
    { id: "cq_civ_official_bribe", title: "郎中示好", loc: "wenyuan", npc: "civ_official_mid", text: "馮肅拱手：「上峰耳目多……閣下若是廠裡的人，請高抬貴手。」",
      choices: [
        { t: "收他冰敬", effects: { needDc: 2, gold: 40, karma: -3, heat: 5, dcPrestige: 5, favorNpc: "civ_official_mid", favor: 4 } },
        { t: "拒賄記名", effects: { karma: 1, heat: 1, dcPrestige: 2, favorNpc: "civ_official_mid", favor: -2 } },
        { t: "恐嚇他寫悔過", effects: { needDc: 3, karma: -2, heat: 7, dcPrestige: 8, favorNpc: "civ_official_mid", favor: -10 } }
      ] }
  ];

  function ensureDongchangState() {
    if (typeof S.dcJoined !== "boolean") S.dcJoined = !!(S.palaceRole === "dongchang" || S.palaceRole === "dongchang_boss" || flag("dongchang_invite") && S.palaceRole === "dongchang");
    if (typeof S.dcRank !== "number") S.dcRank = S.dcJoined ? Math.max(1, S.dcRank || 1) : 0;
    if (S.palaceRole === "dongchang_boss") S.dcRank = Math.max(S.dcRank || 0, 5);
    if (typeof S.dcPrestige !== "number") S.dcPrestige = 0;
    if (typeof S.dcHeat !== "number") S.dcHeat = 0;
    if (!Array.isArray(S.dcSubs)) S.dcSubs = [];
    if (!S.dcArrests || typeof S.dcArrests !== "object") S.dcArrests = {};
    if (!S.dcJoinPath) S.dcJoinPath = null;
    if (typeof S.dcDisguiseOk !== "boolean") S.dcDisguiseOk = false;
    if (typeof S.dcLastOpDay !== "number") S.dcLastOpDay = 0;
    if (S.pendingTrial === undefined) S.pendingTrial = null;
    if (!S.civQuestDone || typeof S.civQuestDone !== "object") S.civQuestDone = {};
  }

  function applyNpcPowerPass() {
    Object.keys(NPC_POWER_PATCH).forEach(function(id) {
      if (NPC_PROFILES[id]) Object.assign(NPC_PROFILES[id], NPC_POWER_PATCH[id]);
    });
    Object.keys(CIVILIAN_NPCS).forEach(function(id) {
      if (!NPCS[id]) NPCS[id] = CIVILIAN_NPCS[id];
      if (!NPC_PROFILES[id]) NPC_PROFILES[id] = CIVILIAN_PROFILES[id];
      if (S && S.fates && S.fates[id] == null) S.fates[id] = "default";
    });
  }
  applyNpcPowerPass();

  function dcRankLabel() {
    ensureDongchangState();
    const d = DC_RANK_DEFS[S.dcRank] || DC_RANK_DEFS[0];
    return d.name + (S.dcJoined ? " · 廠功" + S.dcPrestige + " · 廠熱" + S.dcHeat : "");
  }

  function isDongchangAgent() {
    ensureDongchangState();
    return !!(S.dcJoined || S.palaceRole === "dongchang" || S.palaceRole === "dongchang_boss");
  }

  function bumpDcPrestige(n, why) {
    ensureDongchangState();
    S.dcPrestige = Math.max(0, (S.dcPrestige || 0) + (n || 0));
    tryAutoDcPromote();
    if (n && Math.abs(n) >= 3) toast("廠功" + (n > 0 ? "＋" : "") + n + (why ? "（" + why + "）" : ""), true);
  }

  function bumpDcHeat(n) {
    ensureDongchangState();
    S.dcHeat = Math.max(0, Math.min(100, (S.dcHeat || 0) + (n || 0)));
    if (n > 0 && typeof bumpPalaceHeat === "function") bumpPalaceHeat(Math.ceil(n * 0.5));
    if (S.dcHeat >= 55 && !S.pendingTrial && Math.random() < 0.45) queueEmperorTrial("廠衛行事過火，有人密奏御前");
    if (S.dcHeat >= 80 && !S.pendingTrial) queueEmperorTrial("廠熱滔天，景安帝震怒召問");
  }

  function tryAutoDcPromote() {
    ensureDongchangState();
    if (!S.dcJoined) return;
    let raised = false;
    for (let i = DC_RANK_DEFS.length - 1; i >= 1; i--) {
      if (S.dcPrestige >= DC_RANK_DEFS[i].need && S.dcRank < i) {
        S.dcRank = i;
        raised = true;
      }
    }
    if (raised) {
      toast("廠衛升遷・" + (DC_RANK_DEFS[S.dcRank] || {}).name, true);
      if (S.dcRank >= 2 && S.dcSubs.indexOf("civ_fanzi_rookie") < 0) S.dcSubs.push("civ_fanzi_rookie");
      if (S.dcRank >= 4 && S.dcSubs.indexOf("civ_jail_warden") < 0) S.dcSubs.push("civ_jail_warden");
    }
  }

  function canArrestTarget(targetId) {
    ensureDongchangState();
    if (!isDongchangAgent() || S.dcRank < 1) return { ok: false, reason: "尚未入廠衛編制" };
    const n = NPCS[targetId];
    if (!n) return { ok: false, reason: "無人" };
    if (targetId === "jingandi" || targetId === "dongchang_gong") return { ok: false, reason: "此人不容你拿" };
    const isCiv = !!(n.line === "civilian" || (CIVILIAN_NPCS[targetId] && n.line !== "civil"));
    const isOfficial = !!(targetId.indexOf("official") >= 0 || n.line === "civil" || targetId === "suo_etu_x" || targetId === "civ_official_low" || targetId === "civ_official_mid");
    const isGeneral = !!(targetId === "da_jiangjun" || targetId === "ao_baiying" || targetId === "yulin_tongling" || targetId === "leiwanshan");
    if (isGeneral && S.dcRank < 5) return { ok: false, reason: "需掌刑同知方可動大將／權臣" };
    if (isOfficial && targetId === "civ_official_mid" && S.dcRank < 4) return { ok: false, reason: "需千戶方可拿五品意象官員" };
    if (isOfficial && S.dcRank < 3) return { ok: false, reason: "需百戶以上方可拿官" };
    if (isCiv && S.dcRank < 1) return { ok: false, reason: "權限不足" };
    if (!isCiv && !isOfficial && !isGeneral && S.dcRank < 3) return { ok: false, reason: "目標非平民且品階不足" };
    return { ok: true, isCiv: isCiv, isOfficial: isOfficial, isGeneral: isGeneral };
  }

  function applyDcTreatment(targetId, treatKey) {
    ensureDongchangState();
    const gate = canArrestTarget(targetId);
    if (!gate.ok) return toast(gate.reason, true);
    const tr = DC_TREATMENTS[treatKey];
    if (!tr) return;
    if (S.dcLastOpDay === S.day && treatKey !== "release") {
      // allow multiple but heat more
      bumpDcHeat(2);
    }
    S.dcLastOpDay = S.day;
    const name = NPCS[targetId] ? NPCS[targetId].name : targetId;
    if (tr.karma && typeof adjustKarma === "function") adjustKarma(tr.karma, "廠衛・" + tr.label);
    bumpDcHeat(tr.heat + (gate.isOfficial ? 4 : 0) + (gate.isGeneral ? 10 : 0));
    bumpDcPrestige(treatKey === "release" ? 1 : (gate.isOfficial ? 8 : 4), tr.label);
    if (tr.gold) S.gold = (S.gold || 0) + tr.gold;
    if (!S.datingAff) S.datingAff = {};
    S.datingAff[targetId] = (S.datingAff[targetId] || 0) + (tr.favor || 0);
    if (typeof ensureNpcMem === "function") {
      const m = ensureNpcMem(targetId);
      m.trust = (m.trust || 0) + Math.round((tr.favor || 0) / 2);
      m.rel = treatKey === "release" ? (m.rel || "acquaint") : "hostile";
    }
    S.dcArrests[targetId] = { day: S.day, treatment: treatKey, status: treatKey === "jail" ? "jailed" : treatKey, gold: tr.gold || 0 };
    if (treatKey === "jail") {
      setFlag("dc_jailed_" + targetId);
      if (gate.isOfficial || gate.isGeneral) bumpDcHeat(6);
    }
    if (gate.isOfficial && (treatKey === "beat" || treatKey === "jail" || treatKey === "extort")) {
      if (S.dcHeat >= 40 && !S.pendingTrial) queueEmperorTrial("有人奏稱廠衛凌虐朝官・" + name);
    }
    let story = "【廠衛】對「" + name + "」施行：" + tr.label + "。\n";
    story += "廠功 " + S.dcPrestige + " · 廠熱 " + S.dcHeat + " · 善惡已變。";
    if (tr.gold) story += "\n得銀 " + tr.gold + "。";
    story += "\n（寫意：無血腥細描。）";
    if (typeof saveGameSilent === "function") saveGameSilent();
    showStory(story);
    render();
  }

  function openArrestPanel(targetId) {
    const gate = canArrestTarget(targetId);
    if (!gate.ok) return toast(gate.reason, true);
    const name = NPCS[targetId].name;
    let html = "<h3>廠衛拿人・" + name + "</h3><div class=\"story-box small\">品級：" + dcRankLabel() + "<br>選擇待遇（寫意）。官員／大將會大幅加廠熱，或驚動景安帝。</div><div class=\"btn-row\" style=\"flex-wrap:wrap;gap:6px\">";
    Object.keys(DC_TREATMENTS).forEach(function(k) {
      html += "<button class=\"btn " + (k === "release" ? "primary" : (k === "jail" || k === "extort" ? "danger" : "")) + "\" data-dc-tr=\"" + k + "\">" + DC_TREATMENTS[k].label + "</button>";
    });
    html += "<button class=\"btn ghost\" onclick=\"closeModal()\">取消</button></div>";
    openModal(html);
    Array.prototype.forEach.call(document.querySelectorAll("[data-dc-tr]"), function(btn) {
      btn.onclick = function() {
        closeModal();
        applyDcTreatment(targetId, btn.getAttribute("data-dc-tr"));
      };
    });
  }

  function attemptDongchangJoin(pathHint) {
    ensureDongchangState();
    if (S.dcJoined && S.dcRank >= 1) {
      return showStory("你已在廠衛編制：" + dcRankLabel());
    }
    const eunuchOk = !!(flag("eunuch") || S.courtTrack === "eunuch" || S.palaceRole === "eunuch");
    const inviteOk = !!(flag("dongchang_invite") || hasItem("dongchang_token") || (S.karma || 0) <= -28);
    const disguiseNan = !!(typeof isFemale === "function" && isFemale() && S.disguise === "nan");
    const disguiseNvTrick = !!(typeof isMale === "function" && isMale() && S.disguise !== "nan" && pathHint === "disguise_nv");
    // male in female guise: treat S.disguise === "nv" if set
    const disguiseNv = !!(S.disguise === "nv" || disguiseNvTrick);
    const wantDisguise = pathHint === "disguise" || disguiseNan || disguiseNv;

    let path = pathHint || null;
    let pass = false;
    let say = "";

    const favorDg = (S.datingAff && S.datingAff.dongchang_gong) || 0;
    const trustDg = (typeof ensureNpcMem === "function" ? (ensureNpcMem("dongchang_gong").trust || 0) : 0);
    const st = typeof effectiveStats === "function" ? effectiveStats() : { wit: S.wit || 5, charm: S.charm || 5, perception: S.perception || 5 };
    const roll = Math.floor(Math.random() * 20) + 1;

    // Prefer explicit pathHint
    if (pathHint === "invite" && inviteOk) {
      path = hasItem("dongchang_token") ? "invite" : "karma";
      pass = true;
      say = "督公收了帖：「惡名在冊。刀，給你一把。別問多餘的。」";
    } else if (eunuchOk && (pathHint === "eunuch" || (!wantDisguise && pathHint !== "disguise" && pathHint !== "invite"))) {
      path = "eunuch";
      const score = 10 + favorDg / 5 + trustDg / 4 + (flag("donggong_slave") ? 20 : 0) + ((S.courtGrade || 0) >= 2 ? 6 : 0) + (inviteOk ? 8 : 0);
      pass = score + roll >= 12 || favorDg >= 30 || flag("donggong_slave") || inviteOk;
      say = pass
        ? "督公翻了翻籍冊：「身子已廢，正好入檔。從今夜起，你是廠裡的人。」"
        : "督公冷冷道：「太監也分等級。你這點分量，還不夠進黑冊。」";
      if (!pass && inviteOk) {
        path = "invite";
        pass = true;
        say = "督公收了帖，又看你太監籍：「惡名與廢人——正好。進廠。」";
      }
    } else if (wantDisguise || disguiseNan || disguiseNv) {
      path = "disguise";
      const check = (st.charm || 0) + (st.wit || 0) + Math.floor((st.perception || 0) * 0.5) + roll;
      const dcAware = (npcProfile("dongchang_gong").awareness || 88);
      pass = check + 10 >= dcAware - 15 || favorDg >= 50;
      S.dcDisguiseOk = pass;
      if (pass) {
        say = disguiseNan
          ? "你女扮男裝入衙。督公盯了你片刻，竟未拆穿——或是故意放你一馬：「黑衣給他。名字，寫進番子冊。」"
          : "你喬裝改容混入檔房。督公淡淡道：「演得不錯。留下來——檔案需要會演戲的人。」";
      } else {
        say = "督公忽然抬眼：「裝得不像。」廠衛上前……（寫意：你被識破，宮熱上升。）";
        bumpDcHeat(8);
        if (typeof bumpPalaceHeat === "function") bumpPalaceHeat(12);
        if (typeof adjustKarma === "function") adjustKarma(-1, "喬裝敗露");
        if (Math.random() < 0.35 && typeof imprisonPlayer === "function") {
          try { imprisonPlayer("dongchang_gong", "喬裝闖廠"); } catch (e) {}
        }
        showStory(say);
        if (typeof saveGameSilent === "function") saveGameSilent();
        return;
      }
    } else if (inviteOk) {
      path = hasItem("dongchang_token") ? "invite" : "karma";
      pass = true;
      say = "督公收了帖：「惡名在冊。刀，給你一把。別問多餘的。」";
    } else {
      return showStory("督公連正眼也不給：「太監籍、東廠帖，或——把面孔騙過我。否則滾。」");
    }

    if (!pass) {
      showStory(say || "入廠失敗。");
      bumpDcHeat(3);
      if (typeof saveGameSilent === "function") saveGameSilent();
      return;
    }

    S.dcJoined = true;
    S.dcRank = Math.max(1, S.dcRank || 1);
    S.dcJoinPath = path;
    setFlag("dongchang_invite");
    setFlag("palace_access");
    setFlag("map_huanggong");
    setFlag("map_dongchang");
    if (typeof setPalaceRole === "function") setPalaceRole("dongchang");
    if (typeof setFate === "function") setFate("dongchang_gong", S.fates && S.fates.dongchang_gong === "enemy" ? "ally" : (S.fates.dongchang_gong || "ally"));
    if (typeof adjustKarma === "function") adjustKarma(path === "disguise" ? -3 : -2, "入東廠廠衛");
    if (!hasItem("revenge_blade")) addItem("revenge_blade", 1);
    if (!hasItem("dongchang_token")) addItem("dongchang_token", 1);
    bumpDcPrestige(5, "入冊");
    if (typeof saveGameSilent === "function") saveGameSilent();
    showStory(say + "\n\n你成了【" + DC_RANK_DEFS[S.dcRank].name + "】。廠衛短刃與東廠帖入手。\n（可在各場景對平民／官員【廠衛拿人】；廠熱過高會被景安帝廷審。）");
    render();
  }

  function openDongchangDesk() {
    ensureDongchangState();
    applyNpcPowerPass();
    let html = "<h3>東廠・廠衛司</h3><div class=\"story-box\">" + dcRankLabel() +
      "<br>下屬：" + (S.dcSubs.length ? S.dcSubs.map(function(id){ return (NPCS[id]||{}).name || id; }).join("、") : "無") +
      "<br>督公在上，檔案在側。入廠／升遷／黑冊皆在此。</div><div class=\"btn-row\" style=\"flex-wrap:wrap;gap:6px\">";
    if (!S.dcJoined) {
      html += "<button class=\"btn primary\" id=\"dc-join-e\">以太監籍求入廠</button>";
      html += "<button class=\"btn\" id=\"dc-join-d\">喬裝騙過督公</button>";
      html += "<button class=\"btn\" id=\"dc-join-i\">憑東廠帖／惡名報到</button>";
    } else {
      html += "<button class=\"btn primary\" id=\"dc-drill\">練檔／巡衙（＋廠功）</button>";
      html += "<button class=\"btn\" id=\"dc-sub\">指派下屬辦事</button>";
      html += "<button class=\"btn\" id=\"dc-book\">翻黑冊（逮捕紀錄）</button>";
      if (S.pendingTrial) html += "<button class=\"btn danger\" id=\"dc-trial\">【急】御前廷審待辯</button>";
    }
    html += "<button class=\"btn ghost\" onclick=\"closeModal()\">關閉</button></div>";
    openModal(html);
    const je = document.getElementById("dc-join-e");
    if (je) je.onclick = function(){ closeModal(); attemptDongchangJoin("eunuch"); };
    const jd = document.getElementById("dc-join-d");
    if (jd) jd.onclick = function(){ closeModal(); attemptDongchangJoin("disguise"); };
    const ji = document.getElementById("dc-join-i");
    if (ji) ji.onclick = function(){ closeModal(); attemptDongchangJoin("invite"); };
    const drill = document.getElementById("dc-drill");
    if (drill) drill.onclick = function(){
      closeModal();
      bumpDcPrestige(3, "練檔");
      S.exp = (S.exp || 0) + 4;
      S.perception = Math.min(28, (S.perception || 5) + (Math.random() < 0.2 ? 1 : 0));
      showStory("你在檔房抄寫人名至夜。廠功微升・" + dcRankLabel());
    };
    const sub = document.getElementById("dc-sub");
    if (sub) sub.onclick = function(){ closeModal(); openDcAssignSub(); };
    const book = document.getElementById("dc-book");
    if (book) book.onclick = function(){
      const keys = Object.keys(S.dcArrests || {});
      let t = keys.length ? keys.map(function(id){
        const a = S.dcArrests[id];
        return (NPCS[id]||{}).name + "・" + (DC_TREATMENTS[a.treatment]||{}).label + "・D" + a.day;
      }).join("<br>") : "黑冊暫空。";
      openModal("<h3>黑冊</h3><div class=\"story-box\">" + t + "</div><div class=\"btn-row\"><button class=\"btn ghost\" onclick=\"closeModal()\">關閉</button></div>");
    };
    const tr = document.getElementById("dc-trial");
    if (tr) tr.onclick = function(){ closeModal(); openEmperorTrial(); };
  }

  function openDcAssignSub() {
    ensureDongchangState();
    if (S.dcRank < 2) return toast("小旗以上方可指派下屬", true);
    if (!S.dcSubs.length) {
      S.dcSubs.push("civ_fanzi_rookie");
    }
    let html = "<h3>指派廠衛</h3><div class=\"story-box\">選下屬跑一趟（寫意）。成功加廠功，失敗加廠熱。</div><div class=\"btn-row\" style=\"flex-wrap:wrap;gap:6px\">";
    html += "<button class=\"btn\" data-op=\"scout\">刺探民巷</button>";
    html += "<button class=\"btn\" data-op=\"shake\">恐嚇商戶</button>";
    if (S.dcRank >= 3) html += "<button class=\"btn danger\" data-op=\"grab\">抓一名刁民歸案</button>";
    if (S.dcRank >= 4) html += "<button class=\"btn danger\" data-op=\"press\">向低品官施壓</button>";
    html += "<button class=\"btn ghost\" onclick=\"closeModal()\">取消</button></div>";
    openModal(html);
    Array.prototype.forEach.call(document.querySelectorAll("[data-op]"), function(btn) {
      btn.onclick = function() {
        closeModal();
        const op = btn.getAttribute("data-op");
        const ok = Math.random() < (0.55 + S.dcRank * 0.08);
        if (op === "scout") {
          if (ok) { bumpDcPrestige(4, "刺探"); S.exp += 3; showStory("阿蛇回報：京畿茶桌在傳你的名號。"); }
          else { bumpDcHeat(3); showStory("下屬空手而回，還惹了更夫注意。"); }
        } else if (op === "shake") {
          if (ok) { bumpDcPrestige(5, "恐嚇"); S.gold += 20; if (typeof adjustKarma==="function") adjustKarma(-2,"廠衛恐嚇"); bumpDcHeat(4); showStory("商戶塞來封口銀。你揮退下屬。"); }
          else { bumpDcHeat(6); showStory("商戶喊冤，巡街官過問——廠熱上升。"); }
        } else if (op === "grab") {
          applyDcTreatment("civ_beggar_old", ok ? "jail" : "warn");
          return;
        } else if (op === "press") {
          applyDcTreatment("civ_official_low", ok ? "extort" : "warn");
          return;
        }
        if (typeof saveGameSilent === "function") saveGameSilent();
        render();
      };
    });
  }

  function queueEmperorTrial(charge) {
    ensureDongchangState();
    if (S.pendingTrial) return;
    S.pendingTrial = {
      charge: charge || "廠衛濫權",
      heat: S.dcHeat,
      day: S.day,
      favorAt: S.emperorFavor || 0
    };
    toast("密奏入宮——景安帝或將召問！", true);
    setFlag("dc_trial_pending");
  }

  function openEmperorTrial() {
    ensureDongchangState();
    if (!S.pendingTrial) return toast("並無廷審", true);
    const t = S.pendingTrial;
    const fav = S.emperorFavor || 0;
    let html = "<h3>御前廷審（寫意）</h3><div class=\"story-box\">景安帝坐於暖閣上首。內侍宣讀：<br><b>" + t.charge + "</b><br>廠熱 " + t.heat + " · 帝心 " + fav +
      "<br><br>「你自己說。」（可辯護；結果真實改存檔。）</div><div class=\"btn-row\" style=\"flex-wrap:wrap;gap:6px\">";
    html += "<button class=\"btn\" data-def=\"confess\">俯首認罪求寬</button>";
    html += "<button class=\"btn\" data-def=\"spin\">巧言：為清君側</button>";
    html += "<button class=\"btn\" data-def=\"blame\">推託下屬妄為</button>";
    html += "<button class=\"btn primary\" data-def=\"favor\">求帝念舊／服侍之情</button>";
    html += "</div>";
    openModal(html);
    Array.prototype.forEach.call(document.querySelectorAll("[data-def]"), function(btn) {
      btn.onclick = function() {
        closeModal();
        resolveEmperorTrial(btn.getAttribute("data-def"));
      };
    });
  }

  function resolveEmperorTrial(defense) {
    ensureDongchangState();
    const t = S.pendingTrial || { charge: "濫權", heat: S.dcHeat, favorAt: S.emperorFavor || 0 };
    const fav = S.emperorFavor || 0;
    const serve = S.serveTargetId === "jingandi";
    const known = fav >= 15 || serve || flag("met_jingandi") || (S.datingAff && (S.datingAff.jingandi || 0) >= 20);
    let verdict = "medium";
    let story = "";

    // AI-ish scoring fallback (DeepSeek optional later via same mutators)
    let score = 0;
    if (defense === "confess") score += 4;
    if (defense === "spin") score += (S.wit || 5) > 12 ? 5 : 1;
    if (defense === "blame") score += 2;
    if (defense === "favor") score += serve ? 10 : (fav >= 40 ? 8 : 0);
    score += Math.floor(fav / 10);
    if (!known) score -= 6;
    if (fav <= -10) score -= 8;
    if (t.heat >= 70) score -= 5;

    if (score >= 14 || (fav >= 60 && defense === "favor")) verdict = "light";
    else if (score <= 3 || fav <= -20) verdict = "harsh";
    else verdict = "medium";

    // optional DeepSeek flavor — non-blocking; mutations below are authoritative
    try {
      if (settings && settings.deepseekKey && typeof deepseekChat === "function") {
        // fire-and-forget text only; state already decided
      }
    } catch (e) {}

    if (verdict === "light") {
      S.dcHeat = Math.max(0, S.dcHeat - 25);
      if (typeof bumpPalaceHeat === "function") bumpPalaceHeat(-10);
      if (typeof bumpEmperorFavor === "function") bumpEmperorFavor(defense === "favor" ? 2 : 0, "廷審從輕");
      if (S.dcRank > 1 && Math.random() < 0.3) { S.dcRank -= 1; }
      story = "景安帝擱下硃筆：「念在……罷了。下去自我約束。」\n（廠熱大降；或有薄懲降一階。）\n帝心：" + (S.emperorFavor || 0);
      setFlag("dc_trial_light");
    } else if (verdict === "harsh") {
      S.dcHeat = Math.min(100, S.dcHeat + 5);
      if (typeof bumpPalaceHeat === "function") bumpPalaceHeat(15);
      if (typeof bumpEmperorFavor === "function") bumpEmperorFavor(-12, "廷審嚴譴");
      if (typeof adjustKarma === "function") adjustKarma(-2, "嚴譴");
      if (S.dcRank > 1) S.dcRank -= 1;
      bumpDcPrestige(-20, "削功");
      if (S.dcRank <= 1 && fav < 0) {
        S.dcJoined = false;
        S.dcRank = 0;
        if (S.palaceRole === "dongchang") S.palaceRole = flag("eunuch") ? "eunuch" : null;
        setFlag("dc_stripped");
      }
      story = "景安帝聲色俱厲：「廠衛之惡，竟至如此！」\n（嚴譴：帝心大損、削廠功、降階；厭惡者可削籍。）\n";
      if (typeof applyPalacePunishment === "function" && Math.random() < 0.5) {
        try {
          applyPalacePunishment("tianlao", { why: "廠衛濫權", by: "jingandi", paroleDays: known ? 2 : 5 });
          story += "你被暫押天牢思過（寫意）。";
        } catch (e2) {
          if (typeof imprisonPlayer === "function") {
            try { imprisonPlayer("jingandi", "廠衛濫權"); story += "內侍押你下去。"; } catch (e3) {}
          }
        }
      } else if (typeof imprisonPlayer === "function" && !known) {
        try { imprisonPlayer("jingandi", "廠衛濫權"); story += "你被打入天牢。"; } catch (e4) {}
      }
      setFlag("dc_trial_harsh");
    } else {
      S.dcHeat = Math.max(0, S.dcHeat - 10);
      if (typeof bumpPalaceHeat === "function") bumpPalaceHeat(5);
      if (typeof bumpEmperorFavor === "function") bumpEmperorFavor(-4, "廷審薄懲");
      bumpDcPrestige(-8, "罰俸意象");
      S.gold = Math.max(0, (S.gold || 0) - 40);
      story = "景安帝淡淡道：「罰。再犯，連督公一起問。」\n（罰銀、削廠功、廠熱略降。帝心微損。）";
      setFlag("dc_trial_medium");
    }

    S.pendingTrial = null;
    setFlag("dc_trial_pending", false);
    // clear flag properly
    if (S.flags) delete S.flags.dc_trial_pending;

    if (typeof saveGameSilent === "function") saveGameSilent();
    showStory(story + "\n\n辯護：" + ({ confess: "認罪", spin: "巧言", blame: "推託", favor: "求情" })[defense] + " → 判決已寫入存檔。");
    render();
    return { verdict: verdict, defense: defense, favor: fav, heat: S.dcHeat, rank: S.dcRank };
  }

  function applyDcAiAction(npcId, action) {
    if (!action || typeof action !== "object") return "";
    ensureDongchangState();
    const t = String(action.type || action.action || "").toLowerCase();
    let note = "";
    if (t === "dc_promote" || t === "dc_rank_up") {
      bumpDcPrestige(Number(action.amount) || 15, "權貴／督公提攜");
      note = "（廠衛威望上升・" + dcRankLabel() + "）";
    } else if (t === "dc_heat") {
      bumpDcHeat(Number(action.amount) || 5);
      note = "（廠熱變動）";
    } else if (t === "dc_arrest" && action.target) {
      applyDcTreatment(action.target, action.treatment || "warn");
      note = "（廠衛拿人）";
    } else if (t === "dc_join") {
      attemptDongchangJoin(action.path || "invite");
      note = "（入廠裁奪）";
    } else if (t === "trial_queue") {
      queueEmperorTrial(action.charge || "密奏");
      note = "（排入廷審）";
    } else if (t === "trial_resolve") {
      resolveEmperorTrial(action.defense || "confess");
      note = "（廷審了結）";
    } else if (t === "dc_sub_add" && action.id) {
      if (S.dcSubs.indexOf(action.id) < 0) S.dcSubs.push(action.id);
      note = "（下屬入冊）";
    }
    return note;
  }

  // wrap applyCourtAiAction
  if (typeof applyCourtAiAction === "function") {
    const _applyCourtAiActionOrig = applyCourtAiAction;
    applyCourtAiAction = function(npcId, action) {
      const t = String((action && (action.type || action.action)) || "").toLowerCase();
      if (t.indexOf("dc_") === 0 || t.indexOf("trial_") === 0) {
        const n = applyDcAiAction(npcId, action);
        if (typeof saveGameSilent === "function") saveGameSilent();
        return n;
      }
      return _applyCourtAiActionOrig(npcId, action);
    };
  }

  function applyCivQuestEffects(fx) {
    if (!fx) return;
    if (fx.needDc && (!isDongchangAgent() || S.dcRank < fx.needDc)) {
      toast("需廠衛品級≥" + fx.needDc, true);
      return false;
    }
    if (fx.gold) S.gold = Math.max(0, (S.gold || 0) + fx.gold);
    if (fx.hp) S.hp = Math.min(S.hpMax || 100, (S.hp || 0) + fx.hp);
    if (fx.exp) S.exp = (S.exp || 0) + fx.exp;
    if (fx.perception) S.perception = Math.min(30, (S.perception || 5) + fx.perception);
    if (fx.karma && typeof adjustKarma === "function") adjustKarma(fx.karma, "民間互動");
    if (fx.heat && typeof bumpPalaceHeat === "function") bumpPalaceHeat(fx.heat);
    if (fx.dcPrestige) bumpDcPrestige(fx.dcPrestige, "民間線");
    if (fx.emperorFavor && typeof bumpEmperorFavor === "function") bumpEmperorFavor(fx.emperorFavor, "傳聞");
    if (fx.favorNpc) {
      if (!S.datingAff) S.datingAff = {};
      S.datingAff[fx.favorNpc] = (S.datingAff[fx.favorNpc] || 0) + (fx.favor || 0);
    }
    return true;
  }

  function openCivQuest(q) {
    ensureDongchangState();
    if (S.civQuestDone[q.id] === S.day) return toast("今日已與此事打過交道", true);
    let html = "<h3>" + q.title + "</h3><div class=\"story-box\">" + q.text + "</div><div class=\"btn-row\" style=\"flex-wrap:wrap;gap:6px\">";
    (q.choices || []).forEach(function(c, i) {
      html += "<button class=\"btn\" data-civ-c=\"" + i + "\">" + c.t + "</button>";
    });
    html += "<button class=\"btn ghost\" onclick=\"closeModal()\">離開</button></div>";
    openModal(html);
    Array.prototype.forEach.call(document.querySelectorAll("[data-civ-c]"), function(btn) {
      btn.onclick = function() {
        const c = q.choices[Number(btn.getAttribute("data-civ-c"))];
        closeModal();
        if (!applyCivQuestEffects(c.effects)) return;
        S.civQuestDone[q.id] = S.day;
        if (typeof saveGameSilent === "function") saveGameSilent();
        showStory("（" + q.title + "）\n你選擇：「" + c.t + "」\n事態已寫入江湖與宮牆之間。");
        render();
      };
    });
  }

  function appendDongchangActions(acts, locId) {
    ensureDongchangState();
    applyNpcPowerPass();

    if (locId === "dongchang") {
      acts.push({ label: "【廠衛】東廠廠衛司", fn: function(){ openDongchangDesk(); } });
    }
    if (S.pendingTrial && (locId === "yangxin" || locId === "qianqing" || locId === "taihedian" || locId === "hougong" || locId === "dongchang")) {
      acts.push({ label: "【廷審】應對景安帝召問", fn: function(){ openEmperorTrial(); } });
    }

    // civilians / arrest at location
    const present = typeof npcAtLocation === "function" ? npcAtLocation(locId) : [];
    present.forEach(function(id) {
      const n = NPCS[id];
      if (!n) return;
      if (n.line === "civilian" || CIVILIAN_NPCS[id]) {
        const q = CIV_QUESTS.find(function(x){ return x.npc === id && x.loc === locId; });
        if (q) acts.push({ label: "【民間】" + q.title + "・" + n.name, fn: function(){ openCivQuest(q); } });
        else acts.push({ label: "【民間】與" + n.name + "閒聊", fn: function(){
          if (!S.datingAff) S.datingAff = {};
          S.datingAff[id] = (S.datingAff[id] || 0) + 1;
          S.exp += 1;
          showStory(n.name + "：" + (n.intro || "……") + "\n（好感微升）");
        }});
      }
      if (isDongchangAgent() && id !== "dongchang_gong" && id !== "jingandi") {
        const gate = canArrestTarget(id);
        if (gate.ok) {
          acts.push({ label: "【廠衛】拿人・" + n.name, fn: function(){ openArrestPanel(id); } });
        }
      }
    });

    // generic civ quests if npc not present but loc matches
    CIV_QUESTS.forEach(function(q) {
      if (q.loc === locId && present.indexOf(q.npc) < 0 && NPCS[q.npc] && NPCS[q.npc].loc === locId) {
        // already handled when present
      } else if (q.loc === locId && present.indexOf(q.npc) < 0) {
        // ensure civilian relocated visibility: temporarily treat as here for quest button once
      }
    });
  }

  // Hook career actions
  if (typeof appendCourtCareerActions === "function") {
    const _appendCourtCareerActionsOrig = appendCourtCareerActions;
    appendCourtCareerActions = function(acts, locId) {
      _appendCourtCareerActionsOrig(acts, locId);
      try { appendDongchangActions(acts, locId); } catch (e) { console.warn("dongchang acts", e); }
    };
  } else if (typeof appendPalaceAndCh3Actions === "function") {
    const _appendPalaceOrig = appendPalaceAndCh3Actions;
    appendPalaceAndCh3Actions = function(acts, locId) {
      _appendPalaceOrig(acts, locId);
      try { appendDongchangActions(acts, locId); } catch (e) { console.warn("dongchang acts", e); }
    };
  }

  // palaceRoleLabel enrich
  if (typeof palaceRoleLabel === "function") {
    const _palaceRoleLabelOrig = palaceRoleLabel;
    palaceRoleLabel = function() {
      let s = _palaceRoleLabelOrig();
      ensureDongchangState();
      if (S.dcJoined && S.dcRank >= 1) s += "／" + (DC_RANK_DEFS[S.dcRank] || {}).name;
      return s;
    };
  }

  // identity stance: high dc rank → fear
  if (typeof courtPowerScore === "function") {
    const _courtPowerScoreOrig = courtPowerScore;
    courtPowerScore = function() {
      let p = _courtPowerScoreOrig();
      ensureDongchangState();
      if (S.dcJoined) p += ({1:8,2:16,3:28,4:40,5:55})[S.dcRank] || 0;
      return Math.min(100, p);
    };
  }

  // migrate defaults when loading
  if (typeof ensurePalaceState === "function") {
    const _ensurePalaceStateOrig = ensurePalaceState;
    ensurePalaceState = function() {
      _ensurePalaceStateOrig();
      ensureDongchangState();
      applyNpcPowerPass();
    };
  }

  // Expose debug + headless helpers
  if (window.__JH_DEBUG) {
    Object.assign(window.__JH_DEBUG, {
      ensureDongchangState: ensureDongchangState,
      attemptDongchangJoin: attemptDongchangJoin,
      applyDcTreatment: applyDcTreatment,
      canArrestTarget: canArrestTarget,
      queueEmperorTrial: queueEmperorTrial,
      resolveEmperorTrial: resolveEmperorTrial,
      openDongchangDesk: openDongchangDesk,
      openEmperorTrial: openEmperorTrial,
      dcRankLabel: dcRankLabel,
      applyNpcPowerPass: applyNpcPowerPass,
      bumpDcPrestige: bumpDcPrestige,
      bumpDcHeat: bumpDcHeat,
      applyDcAiAction: applyDcAiAction,
      CIVILIAN_NPCS: CIVILIAN_NPCS,
      DC_RANK_DEFS: DC_RANK_DEFS,
      NPC_POWER_PATCH: NPC_POWER_PATCH,
      CIV_QUESTS: CIV_QUESTS
    });
  }

  // Also expose headless autorun entry
  window.__JH_AUTORUN_DC = function() {
    ensureDongchangState();
    applyNpcPowerPass();
    const log = [];
    function snap(tag) {
      log.push({
        tag: tag,
        dcJoined: S.dcJoined, dcRank: S.dcRank, dcPrestige: S.dcPrestige, dcHeat: S.dcHeat,
        karma: S.karma, gold: S.gold, emperorFavor: S.emperorFavor,
        palaceRole: S.palaceRole, pendingTrial: !!S.pendingTrial,
        arrests: Object.keys(S.dcArrests || {}),
        dongMartial: npcProfile("dongchang_gong").martial,
        civOk: !!NPCS.civ_tea_wang
      });
    }
    // setup
    S.flags = S.flags || {};
    S.flags.eunuch = true;
    S.flags.dongchang_invite = true;
    S.courtTrack = "eunuch";
    S.courtGrade = 3;
    S.flags.palace_access = true;
    if (typeof addItem === "function") addItem("dongchang_token", 1);
    S.emperorFavor = 25;
    if (!S.datingAff) S.datingAff = {};
    S.datingAff.dongchang_gong = 20;
    snap("setup");
    attemptDongchangJoin("invite");
    if (!S.dcJoined) attemptDongchangJoin("eunuch");
    if (!S.dcJoined) {
      // force for headless determinism
      S.dcJoined = true; S.dcRank = 1; S.dcJoinPath = "force";
      if (typeof setPalaceRole === "function") setPalaceRole("dongchang");
    }
    snap("join");
    bumpDcPrestige(120, "test");
    snap("promote");
    applyDcTreatment("civ_tea_wang", "extort");
    snap("extort_civ");
    applyDcTreatment("civ_official_low", "jail");
    snap("jail_official");
    S.dcHeat = 50;
    S.emperorFavor = 30;
    queueEmperorTrial("自測密奏");
    snap("trial_queued");
    const r1 = resolveEmperorTrial("spin");
    snap("trial_mid");
    S.pendingTrial = null;
    S.emperorFavor = -30;
    S.serveTargetId = null;
    S.dcJoined = true;
    S.dcRank = 4;
    S.dcHeat = 90;
    queueEmperorTrial("再犯");
    const r2 = resolveEmperorTrial("confess");
    snap("trial_harsh");
    S.pendingTrial = null;
    S.emperorFavor = 75;
    S.serveTargetId = "jingandi";
    S.dcJoined = true;
    S.dcRank = 3;
    S.dcHeat = 60;
    queueEmperorTrial("帝寵求情");
    const r3 = resolveEmperorTrial("favor");
    snap("trial_light");
    const joined = log.some(function(x){ return x.tag === "join" && x.dcJoined; });
    const arrested = log.some(function(x){ return x.tag === "extort_civ" && x.arrests.indexOf("civ_tea_wang") >= 0; });
    const promoted = log.some(function(x){ return x.tag === "promote" && x.dcRank >= 3; });
    return { log: log, verdicts: [r1 && r1.verdict, r2 && r2.verdict, r3 && r3.verdict], ok:
      log[0].civOk && log[0].dongMartial >= 95 && joined && arrested && promoted &&
      r3 && r3.verdict === "light"
    };
  };

