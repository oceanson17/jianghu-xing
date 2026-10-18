  // ===== NPC COMMITMENT / GRANTS / UNLOCKS (v5) =====
  const ROLE_LABELS = {
    disciple: "記名弟子", sworn: "結義金蘭", spouse: "定情之人", convert: "教眾",
    partner: "合資夥伴", follower: "隨行", apprentice: "藥童隨行", muse: "知音",
    crew: "船隊客卿", host: "東道貴客", rival: "宿敵論友", student: "散學門生",
    forge_disciple: "鐵匠半徒", tomb_ally: "墓道之交", border_sworn: "邊關結義",
    informant: "情報眼線", cook_friend: "灶下故人", mad_muse: "無音知己",
    sword_disciple: "崖上劍徒", dao_student: "觀星門生"
  };
  const UNLOCK_LABELS = {
    disciple_clinic: "藥谷診治（日1次）", herb_identify: "請教藥性",
    temple_meditate: "寺中打坐回內", forge_upgrade: "淬煉武器",
    qin_overture: "琴音開場增益", crew_passage: "半價／免票渡海",
    cult_rite: "火毒抗性＋紅蓮式", dao_stargaze: "觀星機緣↑",
    tomb_shortcut: "墓道提示", lake_form: "水式身法",
    border_pass: "邊關通行便利", merchant_discount: "商會折扣＋投資",
    night_drill: "夜行暗殺訓練", sentry_aid: "哨所求救",
    sand_blade: "黃沙刀法", meihua_rest: "塢中休憩加成",
    scarlet_sword: "赤霞劍意", silent_song: "無音曲擾敵",
    herb_forage: "採藥加成", cheap_rumors: "廉價傳聞",
    free_meal: "客棧免費一餐（日1）", sworn_supply: "黑水寨補給",
    dual_spar: "雙人論劍訓練", temple_parole_boost: "慈悲假釋更快"
  };

  const NPC_OFFERS = {
    suning: [{
      id: "disciple_med", role: "disciple", fate: "master",
      intents: ["ask_disciple", "learn_medicine", "ask_teach"],
      keywords: /拜師|拜你為師|收我為徒|做你徒弟|想做你徒弟|請教醫術|學醫|收徒|拜妳為師|跟你學醫/,
      needTrust: 6, needHonor: 0, needMedicine: 0,
      softTrust: 2, softKindLogs: 2,
      rejectSay: "蘇晚晴搖頭：「醫術關人命，緣分未到，我不敢輕授。」",
      acceptSay: "蘇晚晴沉吟片刻，取一枚藥印遞來：「……好。從今日起，你便是我記名弟子。醫心先於醫術。」",
      grants: {
        flags: ["disciple_suning", "heard_yaogu"],
        items: [{ id: "herb", n: 3 }, { id: "yaogu_manual", n: 1 }],
        skills: ["heal_basic"],
        attrs: { medicine: 1 },
        unlocks: ["disciple_clinic", "herb_identify"],
        renown: 2, trustBonus: 5
      }
    }],
    masteryun: [{
      id: "disciple_temple", role: "disciple", fate: "master",
      intents: ["ask_disciple", "ask_teach", "learn_dao"],
      keywords: /拜師|收我|弟子|入寺學|請師父收|禪杖|打坐/,
      needTrust: 5, needHonor: 5,
      softTrust: 2, softKindLogs: 1,
      rejectSay: "雲空合十：「心浮氣躁，尚不宜入門。」",
      acceptSay: "雲空點頭：「既有誠心，便收你為記名弟子。寺中可打坐調息。」",
      grants: {
        flags: ["helped_temple", "disciple_yun"],
        items: [{ id: "temple_bead", n: 1 }],
        skills: ["staff_form"],
        attrs: { focus: 1, honor: 2 },
        unlocks: ["temple_meditate", "temple_parole_boost"],
        renown: 3, trustBonus: 4
      }
    }],
    guqinghan: [{
      id: "sworn_or_married", role: "sworn", fate: "ally",
      intents: ["ask_sworn", "ask_marry"],
      keywords: /結義|金蘭|結為兄弟|定情|表明心意|嫁|娶|一生一世/,
      needTrust: 10, needHonor: 8, needRenown: 15,
      softTrust: 6, softKindLogs: 2,
      rejectSay: "顧清寒側過臉：「霜刃未暖，情義亦未到時候。」",
      acceptSay: "顧清寒執劍為盟：「清寒願與你並肩——雪夜不孤。」",
      grants: {
        flags: ["invite_baixue", "bond_guqinghan"],
        items: [{ id: "jade_pendant", n: 1 }],
        skills: [],
        attrs: { honor: 2 },
        unlocks: ["dual_spar"],
        renown: 4, trustBonus: 6
      }
    }, {
      id: "marry_gu", role: "spouse", fate: "married",
      intents: ["ask_marry"],
      keywords: /定情|表明心意|嫁給|娶你|白頭/,
      needTrust: 18, needHonor: 12, needRenown: 25, needFateIn: ["ally", "married"],
      rejectSay: "顧清寒：「再等等……至少，先成盟友。」",
      acceptSay: "風雪裡她低聲應允：「……便定了。」",
      grants: {
        flags: ["married_gu"],
        items: [{ id: "frost_blade", n: 1 }],
        attrs: { luck: 1 },
        unlocks: ["dual_spar"],
        renown: 5, trustBonus: 8
      }
    }],
    heifeng: [{
      id: "sworn_bro", role: "sworn", fate: "ally",
      intents: ["ask_sworn"],
      keywords: /結義|金蘭|兄弟|拜把|認你做/,
      needTrust: 8, needHonor: 0,
      softTrust: 4, softKindLogs: 2,
      rejectSay: "黑風冷哼：「寨裡不缺酒肉兄弟。」",
      acceptSay: "黑風砸碗：「好！今日起你是我黑風的兄弟！」",
      grants: {
        flags: ["helped_band", "sworn_heifeng"],
        items: [{ id: "iron_blade", n: 1 }, { id: "blood_token", n: 1 }],
        skills: [],
        attrs: { force: 1 },
        unlocks: ["sworn_supply"],
        renown: 3, trustBonus: 5
      }
    }],
    zhaotie: [{
      id: "forge_apprentice", role: "forge_disciple", fate: "master",
      intents: ["ask_disciple", "learn_forge", "ask_teach"],
      keywords: /拜師|徒弟|學打鐵|鍛造|淬煉|收我|學鍛/,
      needTrust: 5, needHonor: 0,
      softTrust: 2, softKindLogs: 1,
      rejectSay: "趙鐵山：「爐火未旺，你也未誠。」",
      acceptSay: "趙鐵山扔你一塊襯手布：「半個徒弟——爐前准你看，兵器准你淬。」",
      grants: {
        flags: ["open_longmen", "forge_disciple"],
        items: [{ id: "forge_ore", n: 2 }],
        skills: [],
        attrs: { bone: 1 },
        unlocks: ["forge_upgrade"],
        renown: 2, trustBonus: 4
      }
    }],
    linqing: [{
      id: "muse_bond", role: "muse", fate: "muse",
      intents: ["ask_teach", "ask_sworn"],
      keywords: /知音|譜曲|為我撫琴|結為知音|請教琴/,
      needTrust: 8, needHonor: 3,
      softTrust: 4, softKindLogs: 2,
      rejectSay: "林清歌輕撥：「琴未成曲，緣亦未至。」",
      acceptSay: "她微笑：「既是知音，這首《霜水引》便贈你。」",
      grants: {
        flags: ["heard_meihua", "lake_invite"],
        items: [{ id: "insight_tea", n: 2 }, { id: "lake_letter", n: 1 }],
        skills: ["qin_strike"],
        attrs: { wit: 1 },
        unlocks: ["qin_overture"],
        renown: 3, trustBonus: 5
      }
    }],
    murong: [{
      id: "crew_bond", role: "crew", fate: "smuggler",
      intents: ["ask_partner", "ask_join_cult"],
      keywords: /上船|入伙|船隊|合夥|走私|夜航|收我做|跟你跑船/,
      needTrust: 7, needHonor: 0,
      softTrust: 3, softKindLogs: 1,
      rejectSay: "慕容煙噴煙：「港裡位子，不是誰都能坐。」",
      acceptSay: "她敲敲船舷：「行。夜航准你一票——半價，危時我罩你。」",
      grants: {
        flags: ["sea_pass", "crew_murong"],
        items: [{ id: "sea_chart", n: 1 }],
        skills: [],
        attrs: { luck: 1 },
        unlocks: ["crew_passage"],
        renown: 2, trustBonus: 4
      }
    }],
    honglianzhu: [{
      id: "convert_cult", role: "convert", fate: "convert",
      intents: ["ask_join_cult", "ask_disciple"],
      keywords: /入教|皈依|拜教主|紅蓮|收我入|加入紅蓮/,
      needTrust: 6, needHonor: -99,
      softTrust: 3, softKindLogs: 1,
      rejectSay: "紅蓮聖女：「火未燃透，莫急入壇。」",
      acceptSay: "聖女挑起紅幔：「既願燃心——便入教。火毒，你也要學着扛。」",
      grants: {
        flags: ["honglian_invite", "convert_lotus"],
        items: [{ id: "lotus_invite", n: 1 }, { id: "detox", n: 1 }],
        skills: ["lotus_flame"],
        attrs: { antitoxin: 3, force: 1 },
        unlocks: ["cult_rite"],
        renown: 2, trustBonus: 3
      }
    }],
    daoxuan: [{
      id: "dao_disciple", role: "dao_student", fate: "teacher",
      intents: ["ask_disciple", "learn_dao", "ask_teach"],
      keywords: /拜師|入觀|學道|觀星|收我|請真人授/,
      needTrust: 6, needHonor: 4,
      softTrust: 3, softKindLogs: 1,
      rejectSay: "道玄：「星象未正，機緣未至。」",
      acceptSay: "真人擲下一枚星石：「可。觀中准你觀星，定力自長。」",
      grants: {
        flags: ["dao_invite", "dao_student"],
        items: [{ id: "dao_scroll", n: 1 }],
        skills: ["star_breath"],
        attrs: { focus: 1, wit: 1 },
        unlocks: ["dao_stargaze"],
        renown: 3, trustBonus: 4
      }
    }],
    yechen: [{
      id: "tomb_ally", role: "tomb_ally", fate: "freed",
      intents: ["ask_sworn", "ask_partner"],
      keywords: /结盟|結盟|開墓|助你解咒|做朋友|幫你自由|墓道/,
      needTrust: 8, needHonor: 5,
      softTrust: 4, softKindLogs: 2,
      rejectSay: "夜塵：「墓不輕諾。」",
      acceptSay: "黑紗下聲音輕了：「……好。墓道，可為你開一隙。」",
      grants: {
        flags: ["map_wuyin", "tomb_ally"],
        items: [{ id: "tomb_seal", n: 1 }],
        skills: [],
        attrs: { perception: 1 },
        unlocks: ["tomb_shortcut"],
        renown: 3, trustBonus: 5
      }
    }],
    shuiyunzi: [{
      id: "lake_student", role: "student", fate: "teacher",
      intents: ["ask_disciple", "ask_teach", "learn_sword"],
      keywords: /拜師|散學|請教水式|收我|學身法|湖心/,
      needTrust: 5, needHonor: 2,
      softTrust: 2, softKindLogs: 1,
      rejectSay: "水雲子笑：「潮未至。」",
      acceptSay: "他點點水面：「便授你一招水式。身法，要活。」",
      grants: {
        flags: ["lake_invite", "lake_student"],
        items: [{ id: "insight_tea", n: 1 }],
        skills: ["water_step"],
        attrs: { agi: 1 },
        unlocks: ["lake_form"],
        renown: 2, trustBonus: 4
      }
    }],
    shenguhong: [{
      id: "sworn_border", role: "border_sworn", fate: "ally",
      intents: ["ask_sworn"],
      keywords: /結義|金蘭|邊關|並肩|兄弟/,
      needTrust: 7, needHonor: 8,
      softTrust: 4, softKindLogs: 2,
      rejectSay: "沈孤鴻：「邊關不輕許諾。」",
      acceptSay: "他擲刀為誓：「孤鴻與你，邊關結義！」",
      grants: {
        flags: ["north_pass", "sworn_shengu"],
        items: [{ id: "poison_amulet", n: 1 }],
        skills: [],
        attrs: { honor: 2, antitoxin: 2 },
        unlocks: ["border_pass"],
        renown: 4, trustBonus: 5
      }
    }],
    tiesuanpan: [{
      id: "partner_trade", role: "partner", fate: "partner",
      intents: ["ask_partner"],
      keywords: /合夥|合資|做生意|開鋪|入股|帳房|搭伙/,
      needTrust: 6, needHonor: 0, needGold: 40,
      softTrust: 3, softKindLogs: 1,
      rejectSay: "鐵算盤撥珠：「本錢與信任，你都還不夠。」",
      acceptSay: "算盤一響：「成。古蘭帳上給你綠燈——折扣與分紅，對半分賬。」",
      grants: {
        flags: ["trade_pass", "partner_tie"],
        items: [{ id: "compass_charm", n: 1 }],
        skills: [],
        attrs: { charm: 1 },
        unlocks: ["merchant_discount"],
        renown: 2, trustBonus: 4, goldCost: 40
      }
    }],
    hanya: [{
      id: "rival_or_ally", role: "rival", fate: "ally",
      intents: ["ask_sworn", "ask_train", "learn_sword"],
      keywords: /結盟|暗中護|教我暗殺|夜行|收我|比試暗器/,
      needTrust: 8, needHonor: 0,
      softTrust: 4, softKindLogs: 2,
      rejectSay: "寒鴉：「竹影不認生人。」",
      acceptSay: "他拋來一枚竹釘：「今夜起，你可跟我練夜行。殺令，暫不加你。」",
      grants: {
        flags: ["bamboo_map", "hanya_ally"],
        items: [{ id: "night_dagger", n: 1 }],
        skills: ["night_net"],
        attrs: { agi: 1, perception: 1 },
        unlocks: ["night_drill"],
        renown: 2, trustBonus: 4
      }
    }],
    leiwanshan: [{
      id: "recruit_sentry", role: "follower", fate: "promoted",
      intents: ["ask_partner", "ask_sworn"],
      keywords: /投軍|報效|結交|幫忙放行|收我|哨所/,
      needTrust: 5, needHonor: 6, needRenown: 12,
      softTrust: 3, softKindLogs: 1,
      rejectSay: "雷萬山：「軍令如山，人情不夠。」",
      acceptSay: "他蓋下一印：「算你自己人。危時可來哨所求援。」",
      grants: {
        flags: ["open_longmen", "sentry_friend"],
        items: [{ id: "honor_token", n: 1 }],
        skills: [],
        attrs: { renown: 3, honor: 2 },
        unlocks: ["sentry_aid"],
        renown: 5, trustBonus: 4
      }
    }],
    shawuhen: [{
      id: "duel_bro", role: "rival", fate: "rival",
      intents: ["ask_sworn", "ask_train", "learn_sword"],
      keywords: /論刀|比刀|結交|教我刀法|拜師|宿敵/,
      needTrust: 6, needHonor: 4,
      softTrust: 3, softKindLogs: 1,
      rejectSay: "沙無痕：「刀不快，別來吵。」",
      acceptSay: "他拔刀劃沙：「十年一約——此前，黃沙刀法傳你半式。」",
      grants: {
        flags: ["west_road", "sand_rival"],
        items: [{ id: "iron_blade", n: 1 }],
        skills: ["sand_slash"],
        attrs: { force: 1 },
        unlocks: ["sand_blade"],
        renown: 2, trustBonus: 3
      }
    }],
    meifuren: [{
      id: "host_bond", role: "host", fate: "host",
      intents: ["ask_partner", "ask_sworn"],
      keywords: /借宿|東道|常住|莊主禮|收留|做客|住一晚/,
      needTrust: 5, needHonor: 3,
      softTrust: 2, softKindLogs: 1,
      rejectSay: "梅夫人：「塢門雖開，貴客尚未定。」",
      acceptSay: "她簪上一梅：「便以莊主禮待你。塢中休憩，氣血自養。」",
      grants: {
        flags: ["heard_meihua", "host_mei"],
        items: [{ id: "bone_soup", n: 2 }],
        skills: [],
        attrs: { luck: 1 },
        unlocks: ["meihua_rest"],
        renown: 2, trustBonus: 4
      }
    }],
    chixiaxian: [{
      id: "sword_disciple", role: "sword_disciple", fate: "master",
      intents: ["ask_disciple", "learn_sword", "ask_teach"],
      keywords: /拜師|學劍|赤霞|收我|請教劍|崖上/,
      needTrust: 8, needHonor: 5, needForce: 12,
      softTrust: 4, softKindLogs: 2,
      rejectSay: "赤霞仙子：「劍意未契。」",
      acceptSay: "紅衣一振：「可。赤霞劍意，贈你一式。」",
      grants: {
        flags: ["chixia_path", "sword_chi"],
        items: [{ id: "sword_shard", n: 1 }],
        skills: ["scarlet_arc"],
        attrs: { force: 1, agi: 1 },
        unlocks: ["scarlet_sword"],
        renown: 4, trustBonus: 5
      }
    }],
    wuyinqinmo: [{
      id: "mad_muse", role: "mad_muse", fate: "muse",
      intents: ["ask_teach", "ask_sworn"],
      keywords: /無音|學琴|聽曲|知音|教我|入魔/,
      needTrust: 7, needHonor: 0,
      softTrust: 3, softKindLogs: 2,
      rejectSay: "無音琴魔對着虛空笑：「你聽不見。」",
      acceptSay: "他忽然正色：「無音曲，可擾敵心神——別入魔便是。」",
      grants: {
        flags: ["map_wuyin", "mad_muse"],
        items: [{ id: "nameless_page", n: 1 }],
        skills: ["silent_song"],
        attrs: { wit: 1, focus: 1 },
        unlocks: ["silent_song"],
        renown: 3, trustBonus: 4
      }
    }],
    baizhi: [{
      id: "apprentice_follow", role: "apprentice", fate: "apprentice",
      intents: ["ask_partner", "ask_disciple"],
      keywords: /跟我走|隨行|做我藥童|跟你學|收你|一起走/,
      needTrust: 4, needHonor: 0,
      softTrust: 1, softKindLogs: 1,
      rejectSay: "白芷搖頭：「谷主未允……」",
      acceptSay: "她眼睛一亮：「真的？那我跟你走！採藥我拿手。」",
      grants: {
        flags: ["baizhi_follow"],
        items: [{ id: "herb", n: 5 }],
        skills: [],
        attrs: { medicine: 1 },
        unlocks: ["herb_forage"],
        renown: 1, trustBonus: 3
      }
    }],
    tongxiaoliu: [{
      id: "informant", role: "informant", fate: "ally",
      intents: ["ask_partner", "ask_shop_special"],
      keywords: /通風報信|情報|給糖|做眼線|告訴我消息|打聽/,
      needTrust: 2, needHonor: 0, needGold: 5,
      softTrust: 0, softKindLogs: 0,
      rejectSay: "童小六捂嘴：「不給糖不說！」",
      acceptSay: "他接過幾文錢：「成！青城有風吹草動，小六先告訴你。」",
      grants: {
        flags: ["heard_yaogu", "informant_tong"],
        items: [],
        skills: [],
        attrs: { perception: 1 },
        unlocks: ["cheap_rumors"],
        renown: 1, trustBonus: 2, goldCost: 5
      }
    }],
    gudengpo: [{
      id: "cook_friend", role: "cook_friend", fate: "ally",
      intents: ["ask_partner", "ask_free_heal"],
      keywords: /吃飯|免費|夜宵|結交|灶下|照顧|煲湯/,
      needTrust: 3, needHonor: 0,
      softTrust: 1, softKindLogs: 1,
      rejectSay: "孤燈婆婆：「灶下座位有限。」",
      acceptSay: "她舀一碗湯：「記得你。每日一餐，算我請。」",
      grants: {
        flags: ["cook_friend"],
        items: [{ id: "bone_soup", n: 1 }],
        skills: [],
        attrs: { bone: 1 },
        unlocks: ["free_meal"],
        renown: 1, trustBonus: 3
      }
    }]
  };


  function ensureBonds() {
    if (!S.bonds || typeof S.bonds !== "object") S.bonds = {};
    if (!S.unlockDays || typeof S.unlockDays !== "object") S.unlockDays = {};
    if (typeof S.forgeBonus !== "number") S.forgeBonus = 0;
    if (typeof S.investGold !== "number") S.investGold = 0;
  }
  function hasUnlock(key) {
    ensureBonds();
    return Object.keys(S.bonds).some(nid => {
      const b = S.bonds[nid];
      return b && Array.isArray(b.unlocked) && b.unlocked.indexOf(key) >= 0;
    });
  }
  function hasBondRole(npcId, role) {
    ensureBonds();
    const b = S.bonds[npcId];
    return !!(b && Array.isArray(b.roles) && b.roles.indexOf(role) >= 0);
  }
  function listUnlocks() {
    ensureBonds();
    const set = {};
    Object.keys(S.bonds).forEach(nid => {
      (S.bonds[nid].unlocked || []).forEach(u => { set[u] = true; });
    });
    return Object.keys(set);
  }
  function bondSummary(npcId) {
    ensureBonds();
    const b = S.bonds[npcId];
    if (!b || !(b.roles || []).length) return "";
    return (b.roles || []).map(r => ROLE_LABELS[r] || r).join("、");
  }
  function offerAlreadyOwned(npcId, offer) {
    ensureBonds();
    if (hasBondRole(npcId, offer.role)) return true;
    const unlocks = (offer.grants && offer.grants.unlocks) || [];
    if (unlocks.length && unlocks.every(u => hasUnlock(u))) return true;
    return false;
  }
  function countKindLogs(npcId) {
    const m = ensureNpcMem(npcId);
    return (m.log || []).filter(e => /help|gift|follow|accept|teach|quest_hint|lecture/.test(e.behavior || "")).length;
  }
  function matchOffer(npcId, intent, text) {
    const list = NPC_OFFERS[npcId] || [];
    const t = String(text || "");
    let best = null;
    for (let i = 0; i < list.length; i++) {
      const o = list[i];
      if (offerAlreadyOwned(npcId, o)) continue;
      const byIntent = intent && o.intents && o.intents.indexOf(intent) >= 0;
      const byKw = o.keywords && o.keywords.test(t);
      if (byIntent || byKw) {
        // prefer more specific (marry over sworn if both match)
        if (!best || (o.id.indexOf("marry") >= 0) || (byKw && byIntent)) best = o;
        else if (!best) best = o;
        if (byKw && byIntent) return o;
        if (!best) best = o;
        if (byKw || byIntent) best = o;
      }
    }
    return best;
  }
  function findOfferById(npcId, offerId) {
    return (NPC_OFFERS[npcId] || []).find(o => o.id === offerId) || null;
  }
  function evaluateOfferGates(npcId, offer) {
    const m = ensureNpcMem(npcId);
    const st = effectiveStats();
    const reasons = [];
    if (offerAlreadyOwned(npcId, offer)) return { ok: false, soft: false, reason: "已締結此緣" };
    const trustNeed = offer.needTrust || 0;
    const softTrust = offer.softTrust != null ? offer.softTrust : Math.max(0, trustNeed - 4);
    const kindNeed = offer.softKindLogs || 0;
    const kinds = countKindLogs(npcId);
    if (typeof offer.needHonor === "number" && offer.needHonor > -90 && S.honor < offer.needHonor) reasons.push("俠義不足");
    if (offer.needRenown && S.renown < offer.needRenown) reasons.push("聲望不足");
    if (offer.needMedicine && (st.medicine || 0) < offer.needMedicine) reasons.push("醫術不足");
    if (offer.needForce && (st.force || 0) < offer.needForce) reasons.push("武力不足");
    if (offer.needGold && S.gold < offer.needGold) reasons.push("金錢不足");
    if (offer.needFateIn && offer.needFateIn.indexOf(S.fates[npcId]) < 0) reasons.push("緣分未至（需先成特定關係）");
    if ((offer.needFlags || []).some(f => !flag(f))) reasons.push("條件旗標未達");
    if ((offer.needItems || []).some(id => !hasItem(id))) reasons.push("缺少信物");
    const hardFail = reasons.length > 0;
    const trustOk = m.trust >= trustNeed || (m.trust >= softTrust && kinds >= kindNeed);
    if (!trustOk) reasons.push("信任不足（多示好／幫忙）");
    if (hardFail) return { ok: false, soft: false, reason: reasons[0] };
    if (!trustOk) return { ok: false, soft: true, reason: reasons[0] };
    return { ok: true, soft: false, reason: "" };
  }
  function applyOfferGrants(npcId, offer) {
    ensureBonds();
    const g = offer.grants || {};
    if (g.goldCost && S.gold >= g.goldCost) S.gold -= g.goldCost;
    (g.flags || []).forEach(f => setFlag(f, true));
    (g.items || []).forEach(it => { if (ITEMS[it.id]) addItem(it.id, it.n || 1); });
    (g.skills || []).forEach(sid => {
      if (SKILLS[sid] && S.skills.indexOf(sid) < 0) S.skills.push(sid);
    });
    if (g.attrs) {
      Object.keys(g.attrs).forEach(k => {
        if (k === "renown") S.renown = (S.renown || 0) + g.attrs[k];
        else if (typeof S[k] === "number") S[k] += g.attrs[k];
        else S[k] = (S[k] || 0) + g.attrs[k];
      });
    }
    if (g.renown) S.renown += g.renown;
    const b = S.bonds[npcId] || { roles: [], rank: 1, unlocked: [], sinceDay: S.day, offers: [] };
    if (!Array.isArray(b.roles)) b.roles = [];
    if (!Array.isArray(b.unlocked)) b.unlocked = [];
    if (!Array.isArray(b.offers)) b.offers = [];
    if (offer.role && b.roles.indexOf(offer.role) < 0) b.roles.push(offer.role);
    (g.unlocks || []).forEach(u => { if (b.unlocked.indexOf(u) < 0) b.unlocked.push(u); });
    if (b.offers.indexOf(offer.id) < 0) b.offers.push(offer.id);
    if (!b.sinceDay) b.sinceDay = S.day;
    b.rank = (b.rank || 1) + 1;
    S.bonds[npcId] = b;
    if (offer.fate && offer.fate !== "default") {
      const cur = S.fates[npcId];
      if (cur !== "dead" && cur !== "vanished") setFate(npcId, offer.fate);
    }
    if (g.trustBonus) ensureNpcMem(npcId).trust += g.trustBonus;
    try { saveGameSilent(); } catch (e) {}
    const unlockTxt = (g.unlocks || []).map(u => UNLOCK_LABELS[u] || u).join("、");
    return "（已締結：" + (ROLE_LABELS[offer.role] || offer.role) +
      (unlockTxt ? " · 解鎖" + unlockTxt : "") + "）";
  }
  function resolveCommitment(npcId, mode, text, opts) {
    opts = opts || {};
    const intent = opts.intent || classifyIntent(mode, text);
    let offer = null;
    if (opts.offerId) offer = findOfferById(npcId, opts.offerId);
    if (!offer) offer = matchOffer(npcId, intent, text);
    if (!offer && opts.aiAccept) {
      // AI said accept but no clear offer — try first available soft-match by keywords only
      offer = matchOffer(npcId, intent, text) || (NPC_OFFERS[npcId] || []).find(o => !offerAlreadyOwned(npcId, o) && o.keywords && o.keywords.test(String(text || "")));
    }
    if (!offer) return null;
    const gate = evaluateOfferGates(npcId, offer);
    if (!gate.ok) {
      return sanitizeAiResult({
        say: (offer.rejectSay || (NPCS[npcId].name + "：「緣分未到。」")) + (gate.reason ? "\n（" + gate.reason + "）" : ""),
        behavior: "refuse",
        memoryNote: "拒承諾：" + offer.id + "·" + gate.reason,
        intent: intent,
        offerId: offer.id,
        fateHint: null
      }, npcId);
    }
    const note = applyOfferGrants(npcId, offer);
    return sanitizeAiResult({
      say: (offer.acceptSay || (NPCS[npcId].name + "：「好。」")) + "\n" + note,
      behavior: "accept",
      memoryNote: "承諾：" + offer.id,
      intent: intent,
      offerId: offer.id,
      fateHint: offer.fate || null,
      flagUpdates: {}
    }, npcId);
  }
  function availableOfferChips(npcId) {
    const list = NPC_OFFERS[npcId] || [];
    const chips = [];
    list.forEach(o => {
      if (offerAlreadyOwned(npcId, o)) return;
      const gate = evaluateOfferGates(npcId, o);
      // show if soft-near or ok
      const m = ensureNpcMem(npcId);
      const near = gate.ok || m.trust >= (o.softTrust || 0) || countKindLogs(npcId) >= 1;
      if (!near && !gate.ok) return;
      let label = "求收為徒", ctext = "請收我為徒，願拜您為師", cmode = "say";
      if (/sworn|border|duel|rival/.test(o.id) || o.role === "sworn" || o.role === "border_sworn") {
        label = "結為金蘭"; ctext = "願與你結為金蘭，並肩江湖";
      } else if (o.role === "spouse" || /marry/.test(o.id)) {
        label = "表明心意"; ctext = "我欲表明心意，願與你定情";
      } else if (o.role === "convert") {
        label = "求入教"; ctext = "願入紅蓮教，請教主收留";
      } else if (o.role === "partner" || /partner|crew|invest/.test(o.id)) {
        label = "求合夥"; ctext = "想與你合夥做事，請成全";
      } else if (o.role === "muse" || o.role === "mad_muse") {
        label = "求為知音"; ctext = "願為知音，請授一曲";
      } else if (o.role === "apprentice" || o.role === "follower") {
        label = "邀隨行"; ctext = "跟我一起走江湖吧";
      } else if (o.role === "host" || o.role === "cook_friend" || o.role === "informant") {
        label = "結交請託"; ctext = o.keywords ? "想與你結交，請多關照" : "想與你結交";
      } else if (/forge|learn_forge/.test(o.id) || o.intents && o.intents.indexOf("learn_forge") >= 0) {
        label = "學鍛造"; ctext = "想拜你為師學鍛造淬煉";
      } else if (o.intents && o.intents.indexOf("learn_medicine") >= 0) {
        label = "請教醫術"; ctext = "想拜你為師學醫，請收我為徒";
      } else if (o.intents && (o.intents.indexOf("learn_sword") >= 0 || o.intents.indexOf("ask_teach") >= 0)) {
        label = "請教授藝"; ctext = "請收我為徒，傳授藝業";
      }
      chips.push({ label, ctext, cmode, offerId: o.id, ready: gate.ok });
    });
    return chips.slice(0, 4);
  }
  function unlockUsedToday(key) {
    ensureBonds();
    return S.unlockDays[key] === S.day;
  }
  function markUnlockUsed(key) {
    ensureBonds();
    S.unlockDays[key] = S.day;
  }
