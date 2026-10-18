
  // ========== V9: PALACE CAREER SYSTEM（朝廷仕途） ==========
  // Data-driven ranks / quests / loc features. Homage names only (景安／青梧).

  const COURT_PIN_THRESH = [
    // index 0 = 未入流需要, then 從九→正九→…→正一 (18 steps). Cumulative prestige to REACH that rank index.
    0, 8, 18, 32, 50, 75, 105, 145, 195, 260, 340, 440, 560, 720, 920, 1180, 1500, 1900, 2400
  ];
  const CIVIL_TITLES = [
    "未入流",
    "從九品・登仕佐郎","正九品・登仕郎",
    "從八品・修職佐郎","正八品・修職郎",
    "從七品・徵仕郎","正七品・文林郎",
    "從六品・儒林郎","正六品・承德郎",
    "從五品・奉直大夫","正五品・奉政大夫",
    "從四品・朝議大夫","正四品・中憲大夫",
    "從三品・中議大夫","正三品・通議大夫",
    "從二品・通奉大夫","正二品・資政大夫",
    "從一品・榮祿大夫","正一品・光祿大夫"
  ];
  const MILITARY_TITLES = [
    "未入流",
    "從九品・修武佐校尉","正九品・修武校尉",
    "從八品・奮武佐校尉","正八品・奮武校尉",
    "從七品・武信佐騎尉","正七品・武信騎尉",
    "從六品・武略佐騎尉","正六品・武略騎尉",
    "從五品・武德佐騎尉","正五品・武德騎尉",
    "從四品・宣武都尉","正四品・昭武都尉",
    "從三品・武翼都尉","正三品・武義都尉",
    "從二品・武功將軍","正二品・武顯將軍",
    "從一品・振威將軍","正一品・建威將軍"
  ];
  const EUNUCH_GRADES = [
    { g:0, name:"無籍", prestige:0 },
    { g:1, name:"無品太監", prestige:0 },
    { g:2, name:"八品・侍監", prestige:20 },
    { g:3, name:"七品・執守侍", prestige:55 },
    { g:4, name:"六品・宮殿監副侍", prestige:110 },
    { g:5, name:"四五品・宮殿監正侍／領侍", prestige:200 }
  ];
  const MAID_GRADES = [
    { g:0, name:"無籍", prestige:0 },
    { g:1, name:"宮女", prestige:0 },
    { g:2, name:"女史", prestige:15 },
    { g:3, name:"女官", prestige:45 },
    { g:4, name:"婉侍", prestige:100 },
    { g:5, name:"淑儀", prestige:180 }
  ];
  const EUNUCH_HALLS = [
    { id:"yushan", name:"御膳房" },
    { id:"neiwufu", name:"內務府庫房" },
    { id:"yangxin", name:"養心殿" },
    { id:"qianqing", name:"乾清宮" },
    { id:"yuhuayuan", name:"御花園" },
    { id:"taiyiyuan", name:"太醫院" },
    { id:"wenyuan", name:"文淵閣" }
  ];
  const SERVE_TARGETS = [
    { id:"jingandi", name:"景安帝", needFavor:40, needPinMax:4, needGradeMin:4, favorKey:"emperorFavor" },
    { id:"shen_guifei", name:"沈貴妃", needFavor:35, needPinMax:5, needGradeMin:3, favorKey:"datingAff" },
    { id:"mao_dongzhu_x", name:"慈寧假太后・毛東珠影", needFavor:40, needPinMax:4, needGradeMin:4, favorKey:"datingAff" },
    { id:"jianning_jun", name:"建寧郡主", needFavor:30, needPinMax:6, needGradeMin:3, favorKey:"datingAff" },
    { id:"gongnv_head", name:"掌事姑姑", needFavor:25, needPinMax:9, needGradeMin:2, favorKey:"datingAff" }
  ];

  const PALACE_LOC_FEATURES = {
    wumen: { tags:["門禁","點卯"], npc:"午門校尉", blurb:"禁軍列戟，入宮第一關。" },
    taihedian: { tags:["大典","議政"], npc:"鴻臚寺序班", blurb:"金鑾朝會；三品可上殿議政。" },
    qianqing: { tags:["票擬","仕途樞紐"], npc:"奏事處太監", blurb:"御前奏事；領取朝廷任務。" },
    yangxin: { tags:["密諭","帝側"], npc:"近侍小安", blurb:"聖眷密諭之所。" },
    wenyuan: { tags:["校書","詞臣"], npc:"翰林編修", blurb:"翰墨滿架，文官差遣。" },
    yushan: { tags:["膳差","太監當值"], npc:"尚膳監小太監", blurb:"膳香油煙，太監常駐。" },
    neiwufu: { tags:["庫冊","內務"], npc:"庫房筆帖式", blurb:"奇珍入冊。" },
    yuhuayuan: { tags:["遊賞","宮女"], npc:"花廊宮女", blurb:"石橋花影。" },
    dianshi: { tags:["科舉","入仕"], npc:"讀卷官", blurb:"硃卷定身；可由此入文官途。" },
    wuying: { tags:["演武","武官"], npc:"羽林教習", blurb:"甲仗成列；可由此入武官途。" },
    tianlao: { tags:["提審","廠衛"], npc:"獄卒頭目", blurb:"欽犯所繫。" },
    xingbu_prison: { tags:["問案","刑名"], npc:"刑部司獄", blurb:"供狀與刑具。" },
    xingbu_gate: { tags:["法衙","傳票"], npc:"皂衣門吏", blurb:"東廠與刑部交界。" },
    bingzhang: { tags:["武備","甲仗"], npc:"兵仗局匠頭", blurb:"刀槍入架。" },
    siku: { tags:["校勘","文差"], npc:"校對書吏", blurb:"卷帙如山。" },
    taipusi: { tags:["馬政","驛傳"], npc:"太僕寺馬官", blurb:"御馬嘶鳴。" },
    taiyiyuan: { tags:["診脈","藥局"], npc:"太醫楚青", blurb:"藥香候診。" },
    jingshen: { tags:["淨身","太監籍"], npc:"淨身房老役", blurb:"寫意入籍之所——不可兒戲。" },
    yuhe_wharf: { tags:["密道","出宮"], npc:"御河舟子", blurb:"可悄然出宮。" },
    shenwu: { tags:["後門","換防"], npc:"神武門戍卒", blurb:"後門出宮。" },
    xingxing_tai: { tags:["監刑","寫意"], npc:"監刑校尉", blurb:"廠衛用刑之所。" },
    yongxing_shi: { tags:["提審","寫意"], npc:"慎刑司番子", blurb:"鎖鏈與炭火。" },
    huanggong: { tags:["外廷","擇業"], npc:"外廷通事", blurb:"擇業／仕途面板入口。" },
    hougong: { tags:["後宮","請安"], npc:"璇璣殿女官", blurb:"聖眷所居。" },
    neiting: { tags:["花廊","宮規"], npc:"掌事姑姑", blurb:"內廷灑掃。" },
    yulin: { tags:["侍衛","操練"], npc:"羽林統領", blurb:"衛宮護駕。" },
    dongchang: { tags:["廠衛","檔案"], npc:"東廠督公", blurb:"檔案與刑具。" }
  };

  const COURT_QUESTS = [
    { id:"cq_yushan_meal", title:"膳房當差", loc:"yushan", tracks:["eunuch","maid","civil","none"], prestige:8, gold:5, exp:4, text:"你幫尚膳監傳膳、洗灶。膳香入袖。", karma:0 },
    { id:"cq_wenyuan_copy", title:"文淵閣謄錄", loc:"wenyuan", tracks:["civil","eunuch","none"], prestige:10, gold:8, exp:6, text:"你謄錄舊檔數頁，編修點頭。", wit:1 },
    { id:"cq_siku_check", title:"四庫校訛", loc:"siku", tracks:["civil","none"], prestige:12, gold:6, exp:5, text:"校出一處訛字，書吏記你一功。", focus:1 },
    { id:"cq_wuying_drill", title:"武英演陣", loc:"wuying", tracks:["military","guard","none"], prestige:10, gold:5, exp:6, text:"你跟著扎完半趟槍架，教習頷首。", force:1 },
    { id:"cq_bingzhang_oil", title:"兵仗上油", loc:"bingzhang", tracks:["military","eunuch","none"], prestige:8, gold:4, exp:4, text:"刀槍入油，甲胄生光。", def:1 },
    { id:"cq_taiyiyuan_herb", title:"太醫院搗藥", loc:"taiyiyuan", tracks:["eunuch","maid","civil","none"], prestige:9, gold:6, exp:4, text:"藥香刺鼻。太醫許你旁觀診脈。", medicine:1 },
    { id:"cq_neiwufu_count", title:"內務盤庫", loc:"neiwufu", tracks:["eunuch","civil","maid","none"], prestige:11, gold:10, exp:4, text:"你眼尖多記一筆私貨流向——權當沒看見。", perception:1 },
    { id:"cq_yuhuayuan_sweep", title:"花廊灑掃", loc:"yuhuayuan", tracks:["maid","eunuch","none"], prestige:7, gold:3, exp:3, text:"石橋掃淨，掌事姑姑略鬆眉。", charm:1 },
    { id:"cq_tianlao_escort", title:"天牢解囚", loc:"tianlao", tracks:["military","eunuch","dongchang","none"], prestige:12, gold:8, exp:5, text:"你押解一名輕犯過廊。獄卒冷眼。", karma:-1 },
    { id:"cq_xingbu_record", title:"刑部錄供", loc:"xingbu_prison", tracks:["civil","dongchang","none"], prestige:11, gold:7, exp:5, text:"供狀入冊。你多問了一句——或許救得一人。", honor:1 },
    { id:"cq_taipusi_stable", title:"太僕刷馬", loc:"taipusi", tracks:["military","eunuch","none"], prestige:8, gold:5, exp:4, text:"御馬長嘶。馬官教你記口齒。", luck:1 },
    { id:"cq_dianshi_invigilate", title:"殿試監場", loc:"dianshi", tracks:["civil","official","none"], prestige:14, gold:10, exp:6, text:"你巡廊防夾帶，讀卷官記名嘉獎。", renown:1 },
    { id:"cq_wumen_watch", title:"午門點卯", loc:"wumen", tracks:["military","guard","eunuch","none"], prestige:7, gold:4, exp:3, text:"戟影如林。你記下今日口令。", },
    { id:"cq_yangxin_wait", title:"養心候旨", loc:"yangxin", tracks:["eunuch","maid","civil","military","none"], prestige:10, gold:6, exp:4, text:"簾影深沉。近侍吩咐你傳了一道口諭。", emperorFavor:1 },
    { id:"cq_qianqing_memo", title:"乾清票擬", loc:"qianqing", tracks:["civil","official","none"], prestige:15, gold:12, exp:6, text:"你代草票擬一角，奏事處太監收下。", wit:1 },
    { id:"cq_shenwu_shift", title:"神武換防", loc:"shenwu", tracks:["military","guard","none"], prestige:7, gold:4, exp:3, text:"後門戍卒換班，口令改半字。" },
    { id:"cq_hougong_greet", title:"璇璣請安", loc:"hougong", tracks:["maid","consort","eunuch","none"], prestige:12, gold:8, exp:4, text:"你隨班請安。沈貴妃目光在你臉上停了一瞬。", charm:1, favorNpc:"shen_guifei", favorAmt:3 },
    { id:"cq_neiting_rule", title:"宮規抄錄", loc:"neiting", tracks:["maid","eunuch","none"], prestige:8, gold:4, exp:3, text:"掌事姑姑令你默寫宮規十條。", honor:1 },
    { id:"cq_dirty_ledger", title:"改冊銷帳", loc:"neiwufu", tracks:["civil","eunuch","official","none"], prestige:18, gold:40, exp:5, text:"有人塞你銀錠，要你改庫冊一行。", dirty:true, karma:-6, heat:8 },
    { id:"cq_dirty_silence", title:"堵口封信", loc:"xingbu_gate", tracks:["dongchang","eunuch","military","none"], prestige:16, gold:35, exp:5, text:"廠衛要你截一封出宮密信。", dirty:true, karma:-5, heat:10 }
  ];

  const COURT_DEALS = [
    { id:"deal_gold_silent", offer:"八十金與一瓶續命丹", gold:80, item:"pill", demand:"替人銷一份邊關軍報抄件", karma:-5, heat:6, prestige:5 },
    { id:"deal_pass_favor", offer:"內廷夜通行牌一日", flag:"neiting_access", demand:"替貴人傳一句口信給東廠", karma:-3, heat:5, prestige:4, favorNpc:"shen_guifei", favorAmt:4 },
    { id:"deal_rank_hint", offer:"吏部司官「關照」一紙", prestigeBonus:20, demand:"彈劾一名無辜的御史", karma:-8, heat:12, prestige:8 },
    { id:"deal_refuse_safe", offer:"薄禮二十金", gold:20, demand:"只是打聽你口風——可拒", karma:0, heat:0, prestige:0, soft:true }
  ];

  function ensureCourtCareer() {
    // do NOT call ensurePalaceState here (wrapped ensurePalaceState calls us)
    if (typeof S.emperorFavor !== "number") S.emperorFavor = 0;
    if (typeof S.palaceHeat !== "number") S.palaceHeat = 0;
    if (!S.palaceMood) S.palaceMood = "平靜";
    if (!Array.isArray(S.palaceDayEvents)) S.palaceDayEvents = [];
    if (!S.courtTrack) S.courtTrack = "none";
    if (typeof S.courtPin !== "number") S.courtPin = 0; // 0=未入流, 1..18 = 十八階 index
    if (typeof S.courtGrade !== "number") S.courtGrade = 0;
    if (typeof S.courtPrestige !== "number") S.courtPrestige = 0;
    if (typeof S.courtZheng !== "boolean") S.courtZheng = false;
    if (!S.eunuchAssignedHall) S.eunuchAssignedHall = null;
    if (!S.serveTargetId) S.serveTargetId = null;
    if (!S.pendingDeal) S.pendingDeal = null;
    if (!S.courtQuests || typeof S.courtQuests !== "object") S.courtQuests = {};
    if (typeof S.courtLastQuestDay !== "number") S.courtLastQuestDay = 0;
    if (typeof S.courtFavorPromoDay !== "number") S.courtFavorPromoDay = 0;
    if (typeof S.courtDealDay !== "number") S.courtDealDay = 0;
    if (!Array.isArray(S.courtDoneQuests)) S.courtDoneQuests = [];
    // migrate old palaceRole into track if empty
    if (S.courtTrack === "none" && S.palaceRole) {
      if (S.palaceRole === "official") { S.courtTrack = "civil"; S.courtPin = Math.max(S.courtPin, 2); }
      else if (S.palaceRole === "guard") { S.courtTrack = "military"; S.courtPin = Math.max(S.courtPin, 2); }
      else if (S.palaceRole === "eunuch" || flag("eunuch")) { S.courtTrack = "eunuch"; S.courtGrade = Math.max(S.courtGrade, 1); }
      else if (S.palaceRole === "maid" || S.palaceRole === "lady") { S.courtTrack = "maid"; S.courtGrade = S.palaceRole === "lady" ? 3 : 1; }
      else if (S.palaceRole === "consort") { S.courtTrack = "maid"; S.courtGrade = 5; }
      else if (S.palaceRole === "dongchang") { S.courtTrack = flag("eunuch") ? "eunuch" : "military"; if (flag("eunuch")) S.courtGrade = Math.max(S.courtGrade, 2); else S.courtPin = Math.max(S.courtPin, 4); }
    }
  }

  function courtTrackLabel() {
    ensureCourtCareer();
    return ({ none:"未入仕", civil:"文官", military:"武官", eunuch:"太監", maid:"宮女／女官" })[S.courtTrack] || "未入仕";
  }
  function courtRankLabel() {
    ensureCourtCareer();
    if (S.courtTrack === "civil") return CIVIL_TITLES[Math.min(18, Math.max(0, S.courtPin))] || "未入流";
    if (S.courtTrack === "military") return MILITARY_TITLES[Math.min(18, Math.max(0, S.courtPin))] || "未入流";
    if (S.courtTrack === "eunuch") return (EUNUCH_GRADES[Math.min(5, Math.max(0, S.courtGrade))] || EUNUCH_GRADES[0]).name;
    if (S.courtTrack === "maid") return (MAID_GRADES[Math.min(5, Math.max(0, S.courtGrade))] || MAID_GRADES[0]).name;
    return "白身";
  }
  function courtPinNumber() {
    // approximate 品 for powers: pin index 14+ = 正三品及以上 (index 14=正三)
    ensureCourtCareer();
    if (S.courtTrack === "civil" || S.courtTrack === "military") {
      const idx = S.courtPin || 0;
      if (idx <= 0) return 99;
      // idx 1-2 →9品, 3-4→8 ... 17-18→1
      return Math.ceil((19 - idx) / 2);
    }
    if (S.courtTrack === "eunuch") return ({1:9,2:8,3:7,4:6,5:4})[S.courtGrade] || 99;
    if (S.courtTrack === "maid") return ({1:9,2:8,3:6,4:4,5:3})[S.courtGrade] || 99;
    return 99;
  }
  function canShangdianYizheng() {
    return courtPinNumber() <= 3 && (S.courtTrack === "civil" || S.courtTrack === "military");
  }
  function bumpCourtPrestige(n, why) {
    ensureCourtCareer();
    n = n || 0;
    S.courtPrestige = Math.max(0, (S.courtPrestige || 0) + n);
    if (n !== 0) toast("朝廷威望" + (n > 0 ? "＋" : "－") + Math.abs(n) + (why ? "（" + why + "）" : ""), true);
    tryAutoCourtPromote();
  }
  function nextCourtThreshold() {
    ensureCourtCareer();
    if (S.courtTrack === "civil" || S.courtTrack === "military") {
      const next = Math.min(18, (S.courtPin || 0) + 1);
      return COURT_PIN_THRESH[next] || 99999;
    }
    if (S.courtTrack === "eunuch") {
      const g = Math.min(5, (S.courtGrade || 0) + 1);
      return (EUNUCH_GRADES[g] || {}).prestige || 99999;
    }
    if (S.courtTrack === "maid") {
      const g = Math.min(5, (S.courtGrade || 0) + 1);
      return (MAID_GRADES[g] || {}).prestige || 99999;
    }
    return 8;
  }
  function tryAutoCourtPromote() {
    ensureCourtCareer();
    let promoted = false;
    if (S.courtTrack === "civil" || S.courtTrack === "military") {
      while (S.courtPin < 18 && S.courtPrestige >= COURT_PIN_THRESH[S.courtPin + 1]) {
        S.courtPin += 1;
        promoted = true;
        onCourtPromote();
      }
    } else if (S.courtTrack === "eunuch") {
      while (S.courtGrade < 5 && S.courtPrestige >= (EUNUCH_GRADES[S.courtGrade + 1] || {}).prestige) {
        S.courtGrade += 1;
        promoted = true;
        onCourtPromote();
      }
    } else if (S.courtTrack === "maid") {
      while (S.courtGrade < 5 && S.courtPrestige >= (MAID_GRADES[S.courtGrade + 1] || {}).prestige) {
        S.courtGrade += 1;
        promoted = true;
        onCourtPromote();
      }
    }
    if (promoted) {
      toast("升遷・" + courtRankLabel(), true);
      if (S.courtTrack === "maid" && S.courtGrade >= 3) setPalaceRole("lady");
      if (S.courtTrack === "maid" && S.courtGrade >= 5) { setFlag("hougong_access"); }
      if ((S.courtTrack === "civil" || S.courtTrack === "military") && S.courtPin >= 2 && !S.palaceRole) {
        setPalaceRole(S.courtTrack === "civil" ? "official" : "guard");
      }
    }
    return promoted;
  }
  function onCourtPromote() {
    S.renown = (S.renown || 0) + 2;
    S.gold = (S.gold || 0) + 10 + (courtPinNumber() <= 5 ? 20 : 0);
    if (!hasItem("palace_badge")) addItem("palace_badge", 1);
    setFlag("palace_access"); setFlag("neiting_access");
    if (canShangdianYizheng()) setFlag("shangdian_yizheng");
  }

  function startCourtTrack(track, opts) {
    opts = opts || {};
    ensureCourtCareer();
    S.courtTrack = track;
    if (track === "civil") {
      S.courtPin = Math.max(S.courtPin, 1);
      setPalaceRole("official");
      S.wit = (S.wit || 5) + 1;
      showStory("吏部掛號。你入文官籍，自「" + courtRankLabel() + "」起。朝廷威望：" + S.courtPrestige + "。\n（乾清宮可領朝廷任務；太和殿三品可議政。）");
    } else if (track === "military") {
      S.courtPin = Math.max(S.courtPin, 1);
      setPalaceRole("guard");
      S.force = (S.force || 5) + 1;
      showStory("兵部／羽林掛號。你入武官籍，自「" + courtRankLabel() + "」起。\n（武英殿、兵仗局有差遣。）");
    } else if (track === "eunuch") {
      if (!flag("eunuch")) applyEunuchFate();
      S.courtTrack = "eunuch";
      S.courtGrade = Math.max(S.courtGrade, 1);
      assignEunuchHall(opts.hall);
      showStory("太監籍已定。你被分派至【" + eunuchHallName() + "】當差。\n品階：" + courtRankLabel() + "。（寫意：氣力身法已損；可以差遣升品。）");
    } else if (track === "maid") {
      S.courtGrade = Math.max(S.courtGrade, 1);
      setPalaceRole("maid");
      setFate("gongnv_head", "ally");
      showStory("掌事姑姑點頭：「先從灑掃做起。」你入宮女籍・" + courtRankLabel() + "。\n（御花園／後宮請安可積威望；高階可請服侍權貴。）");
    }
    bumpCourtPrestige(opts.bonusPrestige || 0);
    render();
  }
  function assignEunuchHall(forced) {
    ensureCourtCareer();
    if (forced) {
      S.eunuchAssignedHall = forced;
    } else {
      const h = EUNUCH_HALLS[Math.floor(Math.random() * EUNUCH_HALLS.length)];
      S.eunuchAssignedHall = h.id;
    }
    setFlag("map_" + S.eunuchAssignedHall);
    setFlag("neiting_access");
  }
  function eunuchHallName() {
    const id = S.eunuchAssignedHall;
    const h = EUNUCH_HALLS.find(function(x){ return x.id === id; });
    return h ? h.name : "各殿輪值";
  }

  function convertCivilMilitary() {
    ensureCourtCareer();
    if (S.courtTrack !== "civil" && S.courtTrack !== "military") return toast("僅文／武官能互轉", true);
    if (courtPinNumber() > 5) return toast("需五品以上方可請轉文武", true);
    if (S.courtPrestige < 30) return toast("需朝廷威望 30", true);
    openModal("<h3>請轉文武</h3><div class=\"story-box\">耗威望 30，品階大致保留。現為：" + courtRankLabel() + "</div>" +
      "<div class=\"btn-row\"><button class=\"btn primary\" id=\"cv-go\">確認轉換</button><button class=\"btn ghost\" onclick=\"closeModal()\">取消</button></div>");
    document.getElementById("cv-go").onclick = function(){
      closeModal();
      bumpCourtPrestige(-30, "轉文武");
      S.courtTrack = S.courtTrack === "civil" ? "military" : "civil";
      setPalaceRole(S.courtTrack === "civil" ? "official" : "guard");
      showStory("吏兵兩部會簽。你改註「" + courtTrackLabel() + "」・" + courtRankLabel() + "。");
      render();
    };
  }

  function favorOfServeTarget(t) {
    if (!t) return 0;
    if (t.favorKey === "emperorFavor") return S.emperorFavor || 0;
    if (t.id === "jingandi") return S.emperorFavor || 0;
    const aff = (S.datingAff && S.datingAff[t.id]) || 0;
    const bond = (S.bonds && S.bonds[t.id] && (S.bonds[t.id].trust || S.bonds[t.id].aff)) || 0;
    const fateBonus = (S.fates && (S.fates[t.id] === "ally" || S.fates[t.id] === "muse" || S.fates[t.id] === "married")) ? 30 : 0;
    return aff + bond + fateBonus;
  }
  function canServeTarget(t) {
    ensureCourtCareer();
    if (!t) return false;
    const pinOk = (S.courtTrack === "civil" || S.courtTrack === "military") ? courtPinNumber() <= (t.needPinMax || 4) : true;
    const gradeOk = (S.courtTrack === "eunuch" || S.courtTrack === "maid") ? (S.courtGrade || 0) >= (t.needGradeMin || 4) : true;
    const pathOk = pinOk || gradeOk || (S.courtTrack === "none" && false);
    // allow if either official path high enough OR servant grade high enough
    let rankOk = false;
    if (S.courtTrack === "civil" || S.courtTrack === "military") rankOk = courtPinNumber() <= (t.needPinMax || 4);
    else if (S.courtTrack === "eunuch" || S.courtTrack === "maid") rankOk = (S.courtGrade || 0) >= (t.needGradeMin || 4);
    return rankOk && favorOfServeTarget(t) >= (t.needFavor || 30);
  }
  function openServePicker() {
    ensureCourtCareer();
    let html = "<h3>請旨服侍</h3><div class=\"story-box small\">高品／高階可自請服侍權貴。好感足夠可破格升遷。</div>";
    SERVE_TARGETS.forEach(function(t){
      const fav = favorOfServeTarget(t);
      const ok = canServeTarget(t);
      const cur = S.serveTargetId === t.id ? " ★當值" : "";
      html += "<div class=\"list-item\"><div><strong>" + t.name + cur + "</strong><div class=\"small\">好感約 " + fav + "／需 " + t.needFavor + (ok ? " · 可請" : " · 未達") + "</div></div>" +
        (ok ? "<button class=\"btn\" data-serve=\"" + t.id + "\">服侍</button>" : "") + "</div>";
    });
    if (S.serveTargetId) html += "<div class=\"btn-row\"><button class=\"btn danger\" id=\"serve-clear\">卸任服侍</button></div>";
    html += "<div class=\"btn-row\"><button class=\"btn ghost\" onclick=\"closeModal()\">關閉</button></div>";
    openModal(html);
    Array.prototype.forEach.call(document.querySelectorAll("[data-serve]"), function(btn){
      btn.onclick = function(){
        S.serveTargetId = btn.getAttribute("data-serve");
        closeModal();
        const t = SERVE_TARGETS.find(function(x){ return x.id === S.serveTargetId; });
        bumpCourtPrestige(5, "入侍");
        if (t && t.id === "jingandi") bumpEmperorFavor(3, "近侍");
        showStory("你自請服侍【" + (t ? t.name : S.serveTargetId) + "】。從此差遣多了一條線——也多了一座靠山。");
        render();
      };
    });
    const clr = document.getElementById("serve-clear");
    if (clr) clr.onclick = function(){ S.serveTargetId = null; closeModal(); toast("已卸任服侍", true); render(); };
  }
  function tryFavorBackdoorPromote() {
    ensureCourtCareer();
    if (!S.serveTargetId) return toast("尚未服侍權貴", true);
    if ((S.day || 0) - (S.courtFavorPromoDay || 0) < 7) return toast("破格升遷冷卻中（約七日）", true);
    const t = SERVE_TARGETS.find(function(x){ return x.id === S.serveTargetId; });
    if (!t) return;
    const fav = favorOfServeTarget(t);
    if (fav < 60) return toast("權貴好感不足 60，難以破格", true);
    S.courtFavorPromoDay = S.day;
    if (S.courtTrack === "civil" || S.courtTrack === "military") {
      if (S.courtPin >= 18) return toast("已至極品", true);
      S.courtPin += 1;
      onCourtPromote();
    } else if (S.courtTrack === "eunuch" || S.courtTrack === "maid") {
      if (S.courtGrade >= 5) return toast("已至本途極階", true);
      S.courtGrade += 1;
      onCourtPromote();
    } else return toast("需先入仕途", true);
    showStory(t.name + "一語，吏部／敬事房便鬆了口。你破格升為「" + courtRankLabel() + "」。\n（朝廷威望未足亦可——靠山比政績快，也更險。）");
    toast("破格升遷", true);
    render();
  }

  function activeCourtQuest() {
    ensureCourtCareer();
    const id = Object.keys(S.courtQuests || {}).find(function(qid){
      const q = S.courtQuests[qid];
      return q && q.active && !q.done;
    });
    return id ? COURT_QUESTS.find(function(q){ return q.id === id; }) : null;
  }
  function openCourtQuestHub() {
    ensureCourtCareer();
    if (S.courtTrack === "none") {
      return openModal("<h3>朝廷仕途</h3><div class=\"story-box\">你尚未入仕。請先於外廷／殿試場／武英殿／淨身房／後宮擇一路。</div><div class=\"btn-row\"><button class=\"btn primary\" onclick=\"closeModal();openCourtCareerPanel()\">打開仕途面板</button><button class=\"btn ghost\" onclick=\"closeModal()\">關閉</button></div>");
    }
    const cur = activeCourtQuest();
    let html = "<h3>朝廷任務</h3><div class=\"story-box small\">威望 " + S.courtPrestige + " · " + courtTrackLabel() + " · " + courtRankLabel() +
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
        return (q.tracks.indexOf(track) >= 0 || q.tracks.indexOf("none") >= 0) &&
          !(S.courtDoneQuests || []).includes(q.id + ":" + S.day);
      });
      const shuffled = pool.slice().sort(function(){ return Math.random() - 0.5; }).slice(0, 4);
      if (!shuffled.length) html += "<p class=\"small\">暫無合適差遣。</p>";
      shuffled.forEach(function(q){
        const dirty = q.dirty ? " · 污" : "";
        html += "<div class=\"list-item\"><div><strong>" + q.title + dirty + "</strong><div class=\"small\">" +
          ((LOCATIONS.find(function(l){return l.id===q.loc;})||{}).name || q.loc) + " · 威望＋" + q.prestige + "</div></div>" +
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
  }
  function completeCourtQuestAt(locId) {
    ensureCourtCareer();
    const q = activeCourtQuest();
    if (!q || q.loc !== locId) return false;
    const st = S.courtQuests[q.id];
    if (!st || st.done) return false;
    st.done = true; st.active = false;
    S.courtDoneQuests.push(q.id + ":" + S.day);
    if (S.courtDoneQuests.length > 80) S.courtDoneQuests = S.courtDoneQuests.slice(-60);
    bumpCourtPrestige(q.prestige || 5, q.title);
    if (q.gold) S.gold += q.gold;
    if (q.exp) S.exp += q.exp;
    if (q.wit) S.wit = (S.wit || 5) + q.wit;
    if (q.force) S.force = (S.force || 5) + q.force;
    if (q.def) S.def = (S.def || 5) + (q.def || 0);
    if (q.focus) S.focus = Math.min(30, (S.focus || 5) + q.focus);
    if (q.medicine) S.medicine = Math.min(25, (S.medicine || 3) + q.medicine);
    if (q.perception) S.perception = Math.min(25, (S.perception || 5) + q.perception);
    if (q.charm) S.charm = Math.min(30, (S.charm || 5) + q.charm);
    if (q.luck) S.luck = Math.min(30, (S.luck || 5) + q.luck);
    if (q.honor) S.honor = (S.honor || 0) + q.honor;
    if (q.renown) S.renown = (S.renown || 0) + q.renown;
    if (q.karma) adjustKarma(q.karma, q.title);
    if (q.heat) bumpPalaceHeat(q.heat);
    if (q.emperorFavor) bumpEmperorFavor(q.emperorFavor, "差遣");
    if (q.favorNpc && q.favorAmt) {
      if (!S.datingAff) S.datingAff = {};
      S.datingAff[q.favorNpc] = (S.datingAff[q.favorNpc] || 0) + q.favorAmt;
    }
    // serve bonus
    if (S.serveTargetId && Math.random() < 0.4) bumpCourtPrestige(2, "主子賞識");
    showStory("【差遣完成】" + q.title + "\n" + (q.text || "") + "\n朝廷威望 " + S.courtPrestige + " · 品階 " + courtRankLabel());
    maybeOfferCourtDeal();
    return true;
  }

  function maybeOfferCourtDeal() {
    ensureCourtCareer();
    if (!(S.courtTrack === "civil" || S.courtTrack === "military" || S.courtTrack === "eunuch")) return;
    if (S.pendingDeal) return;
    if ((S.day || 0) - (S.courtDealDay || 0) < 3) return;
    if (Math.random() > 0.28) return;
    const d = COURT_DEALS[Math.floor(Math.random() * COURT_DEALS.length)];
    S.pendingDeal = Object.assign({ day: S.day }, d);
    S.courtDealDay = S.day;
    toast("有人塞來好處……", true);
  }
  function openPendingDeal() {
    ensureCourtCareer();
    const d = S.pendingDeal;
    if (!d) return toast("暫無交易", true);
    openModal("<h3>好處與代價</h3><div class=\"story-box\">有人低聲道：「給你【" + d.offer + "】——只需你【" + d.demand + "】。」" +
      (d.soft ? "<br>（此單可輕拒，無傷。）" : "<br>拒也無妨，但對方或記恨。") + "</div>" +
      "<div class=\"btn-row\"><button class=\"btn primary\" id=\"deal-yes\">接受</button>" +
      "<button class=\"btn\" id=\"deal-no\">拒絕</button>" +
      "<button class=\"btn ghost\" onclick=\"closeModal()\">稍後</button></div>");
    document.getElementById("deal-yes").onclick = function(){
      closeModal();
      if (d.gold) S.gold += d.gold;
      if (d.item) addItem(d.item, 1);
      if (d.flag) setFlag(d.flag);
      if (d.prestigeBonus) bumpCourtPrestige(d.prestigeBonus, "關照");
      if (d.prestige) bumpCourtPrestige(d.prestige, "辦事");
      if (d.karma) adjustKarma(d.karma, "收好處");
      if (d.heat) bumpPalaceHeat(d.heat);
      if (d.favorNpc && d.favorAmt) {
        if (!S.datingAff) S.datingAff = {};
        S.datingAff[d.favorNpc] = (S.datingAff[d.favorNpc] || 0) + d.favorAmt;
      }
      S.pendingDeal = null;
      showStory("你點頭收下。【" + d.offer + "】入手，也欠下一筆人情。\n（善惡／宮熱已變。）");
      render();
    };
    document.getElementById("deal-no").onclick = function(){
      closeModal();
      if (!d.soft) { bumpPalaceHeat(2); adjustKarma(1, "拒賄"); }
      S.pendingDeal = null;
      showStory(d.soft ? "你笑着推開：「無功不受祿。」對方也不再糾纏。" : "你沉聲拒絕。對方袖子一甩離去——廊下多了一道視線。");
      render();
    };
  }

  function doShangdianYizheng() {
    if (!canShangdianYizheng()) return toast("需文／武官三品以上", true);
    ensureCourtCareer();
    const roll = Math.random();
    let msg = "";
    if (roll < 0.4) {
      bumpCourtPrestige(12, "議政得體");
      bumpEmperorFavor(2, "奏對");
      msg = "你於墀上陳言邊糧。景安帝頷首，記你一功。";
    } else if (roll < 0.7) {
      bumpCourtPrestige(6, "議政平平");
      S.exp += 6;
      msg = "朝議嘈雜。你未出醜，亦未出彩。";
    } else {
      bumpCourtPrestige(-4, "議政失言");
      bumpPalaceHeat(4);
      bumpEmperorFavor(-1, "失儀");
      msg = "你一句不慎，惹得御史側目。帝心微慍。";
    }
    showStory("【上殿議政】太和殿金磚映日。\n" + msg + "\n威望 " + S.courtPrestige + " · " + courtRankLabel());
  }

  function openCourtCareerPanel() {
    ensureCourtCareer();
    let html = "<h3>朝廷仕途</h3><div class=\"story-box\">" +
      "途：" + courtTrackLabel() + "<br>階：" + courtRankLabel() +
      "<br>朝廷威望：" + S.courtPrestige + "（下一階 " + nextCourtThreshold() + "）" +
      "<br>宮職：" + palaceRoleLabel() +
      (S.eunuchAssignedHall ? "<br>分殿：" + eunuchHallName() : "") +
      (S.serveTargetId ? "<br>服侍：" + ((SERVE_TARGETS.find(function(t){return t.id===S.serveTargetId;})||{}).name || S.serveTargetId) : "") +
      (canShangdianYizheng() ? "<br><b>已解鎖・上殿議政</b>" : "") +
      "</div>";
    html += "<div class=\"btn-row\" style=\"flex-wrap:wrap;gap:6px\">";
    if (S.courtTrack === "none") {
      if (!flag("eunuch")) {
        html += "<button class=\"btn\" id=\"cc-civil\">入文官途</button>";
        html += "<button class=\"btn\" id=\"cc-mil\">入武官途</button>";
      }
      if (isFemale() || (typeof perceivedGender === "function" && perceivedGender() === "女")) {
        html += "<button class=\"btn\" id=\"cc-maid\">入宮女途</button>";
      }
      if (isMale() && !flag("eunuch")) {
        html += "<button class=\"btn danger\" id=\"cc-eunuch\">往淨身房・太監途（寫意）</button>";
      }
      if (flag("eunuch")) html += "<button class=\"btn\" id=\"cc-eunuch2\">確認太監仕途</button>";
    } else {
      html += "<button class=\"btn primary\" id=\"cc-quest\">朝廷任務</button>";
      if (S.courtTrack === "civil" || S.courtTrack === "military") {
        html += "<button class=\"btn\" id=\"cc-convert\">轉換文武</button>";
        if (canShangdianYizheng()) html += "<button class=\"btn\" id=\"cc-yizheng\">上殿議政</button>";
      }
      if (S.courtTrack === "eunuch" && S.courtGrade >= 3) {
        html += "<button class=\"btn\" id=\"cc-rehall\">自請調殿</button>";
      }
      html += "<button class=\"btn\" id=\"cc-serve\">服侍權貴</button>";
      html += "<button class=\"btn\" id=\"cc-favorpromo\">好感破格升</button>";
      if (S.pendingDeal) html += "<button class=\"btn danger\" id=\"cc-deal\">處理好處交易</button>";
    }
    html += "<button class=\"btn ghost\" onclick=\"closeModal()\">關閉</button></div>";
    openModal(html);
    const bind = function(id, fn){ const el = document.getElementById(id); if (el) el.onclick = fn; };
    bind("cc-civil", function(){ closeModal(); if ((S.renown||0) < 12 && (S.wit||0) < 10) return toast("聲望≥12 或 悟性≥10", true); startCourtTrack("civil"); });
    bind("cc-mil", function(){ closeModal(); if ((S.renown||0) < 10 && !hasItem("yulin_pass") && (S.force||0) < 10) return toast("聲望≥10／羽林通行證／武力≥10", true); startCourtTrack("military"); });
    bind("cc-maid", function(){ closeModal(); startCourtTrack("maid"); });
    bind("cc-eunuch", function(){ closeModal(); S.loc = "jingshen"; setFlag("eunuch_path"); setFlag("map_jingshen"); toast("往淨身房", true); render(); });
    bind("cc-eunuch2", function(){ closeModal(); startCourtTrack("eunuch"); });
    bind("cc-quest", function(){ closeModal(); openCourtQuestHub(); });
    bind("cc-convert", function(){ convertCivilMilitary(); });
    bind("cc-yizheng", function(){ closeModal(); doShangdianYizheng(); });
    bind("cc-serve", function(){ closeModal(); openServePicker(); });
    bind("cc-favorpromo", function(){ closeModal(); tryFavorBackdoorPromote(); });
    bind("cc-deal", function(){ closeModal(); openPendingDeal(); });
    bind("cc-rehall", function(){
      closeModal();
      let h = "<h3>自請調殿</h3><div class=\"btn-row\" style=\"flex-wrap:wrap\">";
      EUNUCH_HALLS.forEach(function(x){
        h += "<button class=\"btn\" data-hall=\"" + x.id + "\">" + x.name + "</button>";
      });
      h += "<button class=\"btn ghost\" onclick=\"closeModal()\">取消</button></div>";
      openModal(h);
      Array.prototype.forEach.call(document.querySelectorAll("[data-hall]"), function(btn){
        btn.onclick = function(){
          assignEunuchHall(btn.getAttribute("data-hall"));
          bumpCourtPrestige(-5, "調殿");
          closeModal();
          showStory("敬事房准你調至【" + eunuchHallName() + "】。");
          render();
        };
      });
    });
  }

  function voluntaryJingshenEunuch() {
    if (flag("eunuch")) {
      ensureCourtCareer();
      if (S.courtTrack !== "eunuch") startCourtTrack("eunuch");
      else showStory("你已在太監籍。當值殿：" + eunuchHallName() + " · " + courtRankLabel());
      return;
    }
    if (!isMale() || (typeof isFemale === "function" && isFemale())) {
      return toast("淨身入籍僅限男身（女扮男裝不可妄入）", true);
    }
    openModal("<h3>淨身房・寫意</h3><div class=\"story-box\">燈影森冷。老役啞聲道：「踏入此門，便入太監籍——氣力身法大損，再無回頭。你可想清楚？」<br>（無血腥細描；僅後果與仕途。）</div>" +
      "<div class=\"btn-row\"><button class=\"btn danger\" id=\"js-yes\">咬牙入籍</button><button class=\"btn ghost\" onclick=\"closeModal()\">後退</button></div>");
    document.getElementById("js-yes").onclick = function(){
      closeModal();
      startCourtTrack("eunuch");
    };
  }

  function appendCourtCareerActions(acts, locId) {
    ensureCourtCareer();
    const feat = PALACE_LOC_FEATURES[locId];
    // hub entries
    if (locId === "huanggong" || locId === "qianqing" || locId === "gongmen_yi") {
      acts.push({ label: "【仕途】朝廷仕途面板", fn: function(){ openCourtCareerPanel(); } });
      acts.push({ label: "【仕途】領取／查看朝廷任務", fn: function(){ openCourtQuestHub(); } });
      if (S.pendingDeal) acts.push({ label: "【仕途】有人塞來好處…", fn: function(){ openPendingDeal(); } });
    }
    if (locId === "taihedian" && canShangdianYizheng()) {
      acts.push({ label: "【三品】上殿議政", fn: function(){ doShangdianYizheng(); } });
    }
    if (locId === "dianshi" && S.courtTrack === "none" && !flag("eunuch")) {
      acts.push({ label: "【入仕】以文路掛號（文官）", fn: function(){
        if ((S.renown||0) < 12 && (S.wit||0) < 10) return toast("聲望≥12 或 悟性≥10", true);
        startCourtTrack("civil", { bonusPrestige: 5 });
      }});
    }
    if (locId === "wuying" && S.courtTrack === "none" && !flag("eunuch")) {
      acts.push({ label: "【入仕】以武路掛號（武官）", fn: function(){
        if ((S.renown||0) < 10 && !hasItem("yulin_pass") && (S.force||0) < 10) return toast("條件不足", true);
        startCourtTrack("military", { bonusPrestige: 5 });
      }});
    }
    if (locId === "jingshen") {
      acts.push({ label: "【太監途】叩淨身房・寫意入籍", fn: function(){ voluntaryJingshenEunuch(); } });
      if (flag("eunuch")) {
        acts.push({ label: "確認分殿當值", fn: function(){
          if (!S.eunuchAssignedHall) assignEunuchHall();
          showStory("籍冊上寫着：當值【" + eunuchHallName() + "】・" + courtRankLabel() + "。");
        }});
      }
    }
    if (locId === "hougong" || locId === "neiting" || locId === "yuhuayuan") {
      if (S.courtTrack === "none" && (isFemale() || (typeof perceivedGender === "function" && perceivedGender() === "女"))) {
        acts.push({ label: "【入仕】自薦宮女途", fn: function(){ startCourtTrack("maid"); } });
      }
      if (S.courtTrack === "maid" || S.palaceRole === "maid" || S.palaceRole === "lady" || S.palaceRole === "consort") {
        acts.push({ label: "【宮女】請安／積威望", fn: function(){
          bumpCourtPrestige(3, "請安");
          S.exp += 2;
          if (Math.random() < 0.3) S.charm = Math.min(30, (S.charm||5)+1);
          showStory("你按宮規請安、灑掃半日。威望微升・" + courtRankLabel());
          maybeOfferCourtDeal();
        }});
      }
    }
    // deliver quest
    const aq = activeCourtQuest();
    if (aq && aq.loc === locId) {
      acts.push({ label: "【仕途】交付朝廷差遣・" + aq.title, fn: function(){ completeCourtQuestAt(locId); render(); } });
    }
    // assigned hall daily
    if (flag("eunuch") && S.eunuchAssignedHall === locId) {
      acts.push({ label: "【太監】本殿當差", fn: function(){
        bumpCourtPrestige(4, "當差");
        S.exp += 3; S.gold += 2;
        showStory("你在" + eunuchHallName() + "當差半日。威望＋4・" + courtRankLabel());
        maybeOfferCourtDeal();
      }});
    }
    // feature flavor + talk to loc npc name
    if (feat && locId !== "huanggong") {
      // already have sub actions; add one feature beat if not redundant
      if (locId === "qianqing") {
        acts.push({ label: "向奏事處打聽仕途", fn: function(){ openCourtQuestHub(); } });
      }
    }
    if (S.serveTargetId && (locId === "yangxin" || locId === "hougong" || locId === "neiting")) {
      const t = SERVE_TARGETS.find(function(x){ return x.id === S.serveTargetId; });
      if (t) {
        acts.push({ label: "【服侍】伺候・" + t.name, fn: function(){
          bumpCourtPrestige(3, "服侍");
          if (t.id === "jingandi") bumpEmperorFavor(2, "近侍");
          else {
            if (!S.datingAff) S.datingAff = {};
            S.datingAff[t.id] = (S.datingAff[t.id] || 0) + 2;
          }
          showStory("你小心承應【" + t.name + "】半日。主子神色略霽。");
        }});
      }
    }
  }

  // Enhance forbidden city map with feature tags
  const _openFCMapOrig = typeof openForbiddenCityMap === "function" ? openForbiddenCityMap : null;
  function openForbiddenCityMapTagged() {
    if (!hasPalaceAccess()) return toast("尚無入宮之權", true);
    ensureCourtCareer();
    const entries = [
      ["wumen","午門"],["taihedian","太和殿"],["qianqing","乾清宮"],
      ["yangxin","養心殿"],["wenyuan","文淵閣"],["yushan","御膳房"],
      ["neiwufu","內務府庫房"],["yuhuayuan","御花園"],["dianshi","殿試場"],
      ["wuying","武英殿"],["tianlao","天牢"],["xingbu_prison","刑部大牢"],
      ["xingbu_gate","刑部門"],["bingzhang","兵仗局"],["siku","四庫全書館"],
      ["taipusi","太僕寺"],["taiyiyuan","太醫院"],["jingshen","淨身房"],
      ["yuhe_wharf","御河碼頭"],["shenwu","神武門"],
      ["xingxing_tai","行刑枱"],["yongxing_shi","用刑室"]
    ];
    let html = "<h3>紫禁城內圖</h3><div class=\"story-box small\">仕途：" + courtRankLabel() + " · 威望 " + S.courtPrestige +
      "<br>標籤＝場景職能。乾清宮＝任務樞紐。</div><div class=\"btn-row\" style=\"flex-wrap:wrap;gap:6px\">";
    let n = 0;
    entries.forEach(function(e){
      const id = e[0], name = e[1];
      const loc = LOCATIONS.find(function(l){ return l.id === id; });
      if (!loc || !locUnlocked(loc)) return;
      n++;
      const feat = PALACE_LOC_FEATURES[id];
      const tags = feat && feat.tags ? "·" + feat.tags[0] : "";
      html += "<button class=\"btn\" data-fc=\"" + id + "\">" + name + tags + "</button>";
    });
    if (!n) html += "<span class=\"small\">暫無可入子地。</span>";
    html += "<button class=\"btn primary\" id=\"fc-career\">仕途面板</button>";
    html += "<button class=\"btn ghost\" onclick=\"closeModal()\">關閉</button></div>";
    openModal(html);
    Array.prototype.forEach.call(document.querySelectorAll("[data-fc]"), function(btn){
      btn.onclick = function(){
        const id = btn.getAttribute("data-fc");
        closeModal();
        S.loc = id;
        setFlag("palace_inner_map");
        setFlag("map_" + id);
        toast("入・" + ((LOCATIONS.find(function(l){return l.id===id;})||{}).name || id), true);
        if (typeof maybePalaceIncident === "function") { try { maybePalaceIncident(); } catch (err) {} }
        render();
      };
    });
    const fc = document.getElementById("fc-career");
    if (fc) fc.onclick = function(){ closeModal(); openCourtCareerPanel(); };
  }
  openForbiddenCityMap = openForbiddenCityMapTagged;

  // Wrap ensurePalaceState
  const _ensurePalaceStateOrig = ensurePalaceState;
  ensurePalaceState = function() {
    _ensurePalaceStateOrig();
    ensureCourtCareer();
  };

  // Hook subloc actions
  const _appendPalaceSubLocActionsOrig = appendPalaceSubLocActions;
  appendPalaceSubLocActions = function(acts, locId) {
    _appendPalaceSubLocActionsOrig(acts, locId);
    try { appendCourtCareerActions(acts, locId); } catch (e) { console.warn("court career", e); }
  };
  const _appendPalaceAndCh3Orig = appendPalaceAndCh3Actions;
  appendPalaceAndCh3Actions = function(acts, locId) {
    _appendPalaceAndCh3Orig(acts, locId);
    try {
      if (locId === "huanggong" || locId === "neiting" || locId === "hougong" || locId === "yulin" || locId === "dongchang" || locId === "gongmen_yi") {
        appendCourtCareerActions(acts, locId);
      }
    } catch (e) { console.warn("court career hub", e); }
  };

  // Enhance palaceRoleLabel
  const _palaceRoleLabelOrig = palaceRoleLabel;
  palaceRoleLabel = function() {
    ensureCourtCareer();
    const base = _palaceRoleLabelOrig();
    if (S.courtTrack && S.courtTrack !== "none") {
      return base + "／" + courtRankLabel();
    }
    return base;
  };

  // Expose debug
  if (window.__JH_DEBUG) {
    Object.assign(window.__JH_DEBUG, {
      ensureCourtCareer, bumpCourtPrestige, startCourtTrack, openCourtCareerPanel,
      openCourtQuestHub, completeCourtQuestAt, courtRankLabel, courtPinNumber,
      canShangdianYizheng, tryFavorBackdoorPromote, openPendingDeal, voluntaryJingshenEunuch,
      COURT_QUESTS, CIVIL_TITLES, MILITARY_TITLES, EUNUCH_GRADES, MAID_GRADES, PALACE_LOC_FEATURES,
      SERVE_TARGETS, COURT_PIN_THRESH
    });
  }
