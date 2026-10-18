/* 江湖行 — Jianghu Walk MVP++ */
(function () {
  "use strict";

  const SAVE_KEY = "jianghu_walk_save_v8";
  const SAVE_KEY_OLD = "jianghu_walk_save_v7";
  const SAVE_KEY_OLDER = "jianghu_walk_save_v6";
  const SAVE_KEY_OLDEST = "jianghu_walk_save_v5";
  const SAVE_KEY_V4 = "jianghu_walk_save_v4";
  const SAVE_KEY_V1 = "jianghu_walk_save_v3";
  const SAVE_KEY_V1B = "jianghu_walk_save_v2";
  const SAVE_KEY_V1C = "jianghu_walk_save_v1";
  const SETTINGS_KEY = "jianghu_walk_settings_v1";

  // ---------- VISUAL ASSETS (pixel Q / isometric) ----------
  // Multi-file uses relative paths; safari single-file build replaces ASSETS with data URIs.
  const ASSETS = window.__JH_ASSETS || {
    worldmap: "assets/worldmap.jpg",
    heroDisguise: "assets/hero-disguise.jpg",
    heroDisguiseAvatar: "assets/hero-disguise-avatar.jpg",
    city: "assets/scene-city.jpg",
    pavilion: "assets/scene-pavilion.jpg",
    chibi: "assets/chibi-cast.jpg",
    homagePortraits: "assets/homage-portraits.png",
    thumbCity: "assets/thumb-city.jpg",
    thumbPavilion: "assets/thumb-pavilion.jpg",
    gate: "assets/scene-gate.jpg",
    village: "assets/scene-village.jpg",
    nightmarket: "assets/scene-nightmarket.jpg",
    autumn: "assets/scene-autumn.jpg",
    tavern: "assets/scene-tavern.jpg",
    snowbridge: "assets/scene-snowbridge.jpg",
    palace: "assets/scene-palace.jpg",
    harbor: "assets/scene-harbor.jpg",
    cave: "assets/scene-cave.jpg",
    thumbGate: "assets/thumb-gate.jpg",
    thumbVillage: "assets/thumb-village.jpg",
    thumbNightmarket: "assets/thumb-nightmarket.jpg",
    thumbAutumn: "assets/thumb-autumn.jpg",
    thumbTavern: "assets/thumb-tavern.jpg",
    thumbSnowbridge: "assets/thumb-snowbridge.jpg",
    thumbPalace: "assets/thumb-palace.jpg",
    thumbHarbor: "assets/thumb-harbor.jpg",
    thumbCave: "assets/thumb-cave.jpg",
    palaceWumen: "assets/scene-palace-wumen.jpg",
    thumbPalaceWumen: "assets/thumb-palace-wumen.jpg",
    palaceTaihedian: "assets/scene-palace-taihedian.jpg",
    thumbPalaceTaihedian: "assets/thumb-palace-taihedian.jpg",
    palaceQianqing: "assets/scene-palace-qianqing.jpg",
    thumbPalaceQianqing: "assets/thumb-palace-qianqing.jpg",
    palaceYangxin: "assets/scene-palace-yangxin.jpg",
    thumbPalaceYangxin: "assets/thumb-palace-yangxin.jpg",
    palaceWenyuan: "assets/scene-palace-wenyuan.jpg",
    thumbPalaceWenyuan: "assets/thumb-palace-wenyuan.jpg",
    palaceYushan: "assets/scene-palace-yushan.jpg",
    thumbPalaceYushan: "assets/thumb-palace-yushan.jpg",
    palaceNeiwufu: "assets/scene-palace-neiwufu.jpg",
    thumbPalaceNeiwufu: "assets/thumb-palace-neiwufu.jpg",
    palaceYuhuayuan: "assets/scene-palace-yuhuayuan.jpg",
    thumbPalaceYuhuayuan: "assets/thumb-palace-yuhuayuan.jpg",
    palaceDianshi: "assets/scene-palace-dianshi.jpg",
    thumbPalaceDianshi: "assets/thumb-palace-dianshi.jpg",
    palaceWuying: "assets/scene-palace-wuying.jpg",
    thumbPalaceWuying: "assets/thumb-palace-wuying.jpg",
    palaceTianlao: "assets/scene-palace-tianlao.jpg",
    thumbPalaceTianlao: "assets/thumb-palace-tianlao.jpg",
    palaceXingbuPrison: "assets/scene-palace-xingbu_prison.jpg",
    thumbPalaceXingbuPrison: "assets/thumb-palace-xingbu_prison.jpg",
    palaceXingbuGate: "assets/scene-palace-xingbu_gate.jpg",
    thumbPalaceXingbuGate: "assets/thumb-palace-xingbu_gate.jpg",
    palaceBingzhang: "assets/scene-palace-bingzhang.jpg",
    thumbPalaceBingzhang: "assets/thumb-palace-bingzhang.jpg",
    palaceSiku: "assets/scene-palace-siku.jpg",
    thumbPalaceSiku: "assets/thumb-palace-siku.jpg",
    palaceTaipusi: "assets/scene-palace-taipusi.jpg",
    thumbPalaceTaipusi: "assets/thumb-palace-taipusi.jpg",
    palaceTaiyiyuan: "assets/scene-palace-taiyiyuan.jpg",
    thumbPalaceTaiyiyuan: "assets/thumb-palace-taiyiyuan.jpg",
    palaceJingshen: "assets/scene-palace-jingshen.jpg",
    thumbPalaceJingshen: "assets/thumb-palace-jingshen.jpg",
    palaceYuheWharf: "assets/scene-palace-yuhe_wharf.jpg",
    thumbPalaceYuheWharf: "assets/thumb-palace-yuhe_wharf.jpg",
    palaceShenwu: "assets/scene-palace-shenwu.jpg",
    thumbPalaceShenwu: "assets/thumb-palace-shenwu.jpg",
    punishDongchangGate: "assets/scene-punish-dongchang_gate.jpg",
    thumbPunishDongchangGate: "assets/thumb-punish-dongchang_gate.jpg",
    punishXingxingTai: "assets/scene-punish-xingxing_tai.jpg",
    thumbPunishXingxingTai: "assets/thumb-punish-xingxing_tai.jpg",
    punishWumenZhanshou: "assets/scene-punish-wumen_zhanshou.jpg",
    thumbPunishWumenZhanshou: "assets/thumb-punish-wumen_zhanshou.jpg",
    punishYongxingShi: "assets/scene-punish-yongxing_shi.jpg",
    thumbPunishYongxingShi: "assets/thumb-punish-yongxing_shi.jpg",
    punishLingchi: "assets/scene-punish-lingchi.jpg",
    thumbPunishLingchi: "assets/thumb-punish-lingchi.jpg",
    punishHuopeng: "assets/scene-punish-huopeng.jpg",
    thumbPunishHuopeng: "assets/thumb-punish-huopeng.jpg",
    punishChelie: "assets/scene-punish-chelie.jpg",
    thumbPunishChelie: "assets/thumb-punish-chelie.jpg",
    punishGunsha: "assets/scene-punish-gunsha.jpg",
    thumbPunishGunsha: "assets/thumb-punish-gunsha.jpg",
    punishGongxing: "assets/scene-punish-gongxing.jpg",
    thumbPunishGongxing: "assets/thumb-punish-gongxing.jpg",
    punishWayan: "assets/scene-punish-wayan.jpg",
    thumbPunishWayan: "assets/thumb-punish-wayan.jpg",
    punishBopi: "assets/scene-punish-bopi.jpg",
    thumbPunishBopi: "assets/thumb-punish-bopi.jpg",
    punishDingzhi: "assets/scene-punish-dingzhi.jpg",
    thumbPunishDingzhi: "assets/thumb-punish-dingzhi.jpg",
    punishDiaojian: "assets/scene-punish-diaojian.jpg",
    thumbPunishDiaojian: "assets/thumb-punish-diaojian.jpg",
    punishChentang: "assets/scene-punish-chentang.jpg",
    thumbPunishChentang: "assets/thumb-punish-chentang.jpg",
  };

  /*
   * Chibi spritesheet mapping (chibi-cast.jpg, approx 4×4 on left panel).
   * Sheet layout after resize ~960×540; we treat as 4 cols × 4 rows over FULL image
   * (rightmost column may include large hero / padding — approximate crops).
   *
   *   r0c0 雲空師父(僧)     r0c1 蘇晚晴(藥女)     r0c2 少俠／顧清寒   r0c3 黑風(斧)
   *   r1c0 林清歌／女劍      r1c1 白雪女弟子       r1c2 趙鐵山(錘)     r1c3 藍掌櫃(算盤)
   *   r2c0 沈孤鴻(斗笠)      r2c1 水雲子／船家     r2c2 紅蓮聖女(面具) r2c3 慕容煙(扇)
   *   r3c0 夜塵(鎧)          r3c1 敵兵／海寇       r3c2 軍官敵          r3c3 道玄真人(老)
   *
   * background-size: 400% 400%; position: col*(100/3)%  row*(100/3)%
   */
  const CHIBI_SPRITE = {
    masteryun:   { r: 0, c: 0 },
    suning:      { r: 0, c: 1 },
    guqinghan:   { r: 0, c: 2 },
    heifeng:     { r: 0, c: 3 },
    linqing:     { r: 1, c: 0 },
    player:      { r: 0, c: 2 },
    zhaotie:     { r: 1, c: 2 },
    lan_keeper:  { r: 1, c: 3 },
    shenguhong:  { r: 2, c: 0 },
    shuiyunzi:   { r: 2, c: 1 },
    boatman:     { r: 2, c: 1 },
    honglianzhu: { r: 2, c: 2 },
    murong:      { r: 2, c: 3 },
    yechen:      { r: 3, c: 0 },
    enemy:       { r: 3, c: 1 },
    jingandi:    { r: 0, c: 2 },
    dongchang_gong: { r: 3, c: 0 },
    yulin_tongling: { r: 3, c: 2 },
    renyazi:     { r: 3, c: 1 },
    gongnv_head: { r: 1, c: 1 },
    gu_xiaoran: { r: 0, c: 2 },
    huang_linger: { r: 1, c: 0 },
    sha_yuyan: { r: 1, c: 1 },
    powan_zhang: { r: 1, c: 3 },
    mu_youlan: { r: 3, c: 0 },
    hai_kuang: { r: 2, c: 3 },
    shen_guifei: { r: 1, c: 1 },
    liu_zhaoyi: { r: 1, c: 0 },
    da_jiangjun: { r: 3, c: 2 },
    ye_qingshan: { r: 3, c: 3 },
    lin_feng: { r: 0, c: 2 },
    ning_shuying: { r: 1, c: 0 },
    ye_xiaoyu: { r: 1, c: 0 },
    lin_chen: { r: 0, c: 2 },
    ren_yingluo: { r: 2, c: 2 },
    feng_qingya: { r: 3, c: 0 },
    qu_yangqin: { r: 1, c: 0 },
    qiao_fengshan: { r: 0, c: 3 },
    duan_muyu: { r: 1, c: 1 },
    xu_zhuoyun: { r: 0, c: 0 },
    zhang_wujiang: { r: 2, c: 0 },
    zhao_minyan: { r: 1, c: 1 },
    zhou_zhi_xue: { r: 1, c: 0 },
    hong_qigong_x: { r: 1, c: 3 },
    huang_yaoshi_x: { r: 2, c: 3 },
    ouyang_fengdu: { r: 3, c: 1 },
    xiao_longyin: { r: 3, c: 0 },
    yang_guochen: { r: 0, c: 2 },
    guo_jingyi: { r: 2, c: 0 },
    huang_rongya: { r: 1, c: 0 },
    dongfang_gubai: { r: 2, c: 2 },
    zuo_lengying: { r: 3, c: 2 },
    mu_gaofeng_x: { r: 0, c: 3 },
    wei_xiaozhou: { r: 1, c: 3 },
    chen_jinnan_x: { r: 2, c: 0 },
    jianning_jun: { r: 1, c: 1 },
    hai_dafu_x: { r: 3, c: 0 },
    ao_baiying: { r: 3, c: 2 },
    shuang_er_x: { r: 1, c: 0 },
    su_quan_x: { r: 1, c: 1 },
    hong_antong_x: { r: 0, c: 3 },
    jiu_nan_x: { r: 3, c: 3 },
    a_ke_x: { r: 1, c: 0 },
    mu_jianping_x: { r: 1, c: 0 },
    fang_yi_x: { r: 1, c: 1 },
    mao_dongzhu_x: { r: 1, c: 1 },
    duo_long_x: { r: 3, c: 2 },
    suo_etu_x: { r: 3, c: 3 },
    wu_sangui_x: { r: 3, c: 2 },
    shi_lang_x: { r: 2, c: 3 },
    mao_shiba_x: { r: 0, c: 3 },
    daoxuan:     { r: 3, c: 3 },
    // new cast (reuse closest sprite slots)
    tiesuanpan:  { r: 1, c: 3 },
    baizhi:      { r: 0, c: 1 },
    hanya:       { r: 3, c: 1 },
    leiwanshan:  { r: 3, c: 2 },
    shawuhen:    { r: 2, c: 0 },
    meifuren:    { r: 1, c: 0 },
    tongxiaoliu: { r: 0, c: 2 },
    gudengpo:    { r: 1, c: 3 },
    chixiaxian:  { r: 0, c: 2 },
    wuyinqinmo:  { r: 2, c: 2 },
    // fallbacks
    default:     { r: 0, c: 2 }
  };

  const NPC_PORTRAIT = {
    a_ke_x: { r: 0, c: 0 },
    ao_baiying: { r: 0, c: 1 },
    baizhi: { r: 0, c: 2 },
    boatman: { r: 0, c: 3 },
    chen_jinnan_x: { r: 0, c: 4 },
    chixiaxian: { r: 0, c: 5 },
    da_jiangjun: { r: 0, c: 6 },
    daoxuan: { r: 0, c: 7 },
    dongchang_gong: { r: 1, c: 0 },
    dongfang_gubai: { r: 1, c: 1 },
    duan_muyu: { r: 1, c: 2 },
    duo_long_x: { r: 1, c: 3 },
    fang_yi_x: { r: 1, c: 4 },
    feng_qingya: { r: 1, c: 5 },
    gongnv_head: { r: 1, c: 6 },
    gu_xiaoran: { r: 1, c: 7 },
    gudengpo: { r: 2, c: 0 },
    guo_jingyi: { r: 2, c: 1 },
    guqinghan: { r: 2, c: 2 },
    hai_dafu_x: { r: 2, c: 3 },
    hai_kuang: { r: 2, c: 4 },
    hanya: { r: 2, c: 5 },
    heifeng: { r: 2, c: 6 },
    hong_antong_x: { r: 2, c: 7 },
    hong_qigong_x: { r: 3, c: 0 },
    honglianzhu: { r: 3, c: 1 },
    huang_linger: { r: 3, c: 2 },
    huang_rongya: { r: 3, c: 3 },
    huang_yaoshi_x: { r: 3, c: 4 },
    jianning_jun: { r: 3, c: 5 },
    jingandi: { r: 3, c: 6 },
    jiu_nan_x: { r: 3, c: 7 },
    lan_keeper: { r: 4, c: 0 },
    leiwanshan: { r: 4, c: 1 },
    lin_chen: { r: 4, c: 2 },
    lin_feng: { r: 4, c: 3 },
    linqing: { r: 4, c: 4 },
    liu_zhaoyi: { r: 4, c: 5 },
    mao_dongzhu_x: { r: 4, c: 6 },
    mao_shiba_x: { r: 4, c: 7 },
    masteryun: { r: 5, c: 0 },
    meifuren: { r: 5, c: 1 },
    mu_gaofeng_x: { r: 5, c: 2 },
    mu_jianping_x: { r: 5, c: 3 },
    mu_youlan: { r: 5, c: 4 },
    murong: { r: 5, c: 5 },
    ning_shuying: { r: 5, c: 6 },
    ouyang_fengdu: { r: 5, c: 7 },
    powan_zhang: { r: 6, c: 0 },
    qiao_fengshan: { r: 6, c: 1 },
    qu_yangqin: { r: 6, c: 2 },
    ren_yingluo: { r: 6, c: 3 },
    renyazi: { r: 6, c: 4 },
    sha_yuyan: { r: 6, c: 5 },
    shawuhen: { r: 6, c: 6 },
    shen_guifei: { r: 6, c: 7 },
    shenguhong: { r: 7, c: 0 },
    shi_lang_x: { r: 7, c: 1 },
    shuang_er_x: { r: 7, c: 2 },
    shuiyunzi: { r: 7, c: 3 },
    su_quan_x: { r: 7, c: 4 },
    suning: { r: 7, c: 5 },
    suo_etu_x: { r: 7, c: 6 },
    tiesuanpan: { r: 7, c: 7 },
    tongxiaoliu: { r: 8, c: 0 },
    wei_xiaozhou: { r: 8, c: 1 },
    wu_sangui_x: { r: 8, c: 2 },
    wuyinqinmo: { r: 8, c: 3 },
    xiao_longyin: { r: 8, c: 4 },
    xu_zhuoyun: { r: 8, c: 5 },
    yang_guochen: { r: 8, c: 6 },
    ye_qingshan: { r: 8, c: 7 },
    ye_xiaoyu: { r: 9, c: 0 },
    yechen: { r: 9, c: 1 },
    yulin_tongling: { r: 9, c: 2 },
    zhang_wujiang: { r: 9, c: 3 },
    zhao_minyan: { r: 9, c: 4 },
    zhaotie: { r: 9, c: 5 },
    zhou_zhi_xue: { r: 9, c: 6 },
    zuo_lengying: { r: 9, c: 7 },
    beast_baihe: { r: 10, c: 0 },
    beast_cangying: { r: 10, c: 1 },
    beast_jinchi: { r: 10, c: 2 },
    beast_shengui: { r: 10, c: 3 },
    beast_qinglong: { r: 10, c: 4 },
    beast_zhuque: { r: 10, c: 5 },
    beast_xuanwu: { r: 10, c: 6 },
    beast_baihu: { r: 10, c: 7 },
    beast_bailang: { r: 11, c: 0 },
    beast_heixiong: { r: 11, c: 1 },
    beast_lingshe: { r: 11, c: 2 },
    beast_qilin: { r: 11, c: 3 },
    beast_huofeng: { r: 11, c: 4 },
    beast_yinhu: { r: 11, c: 5 },
    beast_xueyuan: { r: 11, c: 6 },
    beast_jianli: { r: 11, c: 7 },
    beast_moniu: { r: 12, c: 0 },
    beast_jujiu: { r: 12, c: 1 },
    beast_leishou: { r: 12, c: 2 },
    beast_xuebao: { r: 12, c: 3 },
    beast_xuanyu: { r: 12, c: 4 },
    // atlas: homage-portraits.png 96x120 cells, 8 cols
  };
  const PORTRAIT_ATLAS_COLS = 8;

  // Per-location pixel scene banners (3×3 sheet slices) + legacy city/pavilion fallbacks
  const TOWN_LOCS = new Set([
    "qingcheng", "jingji", "hub", "shamo", "longmen", "yanhui", "gulan",
    "heishui", "bianguan", "luohe", "leifeng", "chixia", "huanggong", "dongchang", "yulin", "renyazi_alley",
    "neiting", "hougong", "wumen", "taihedian", "qianqing", "yangxin", "wenyuan", "yushan", "neiwufu", "yuhuayuan", "dianshi", "wuying", "tianlao", "xingbu_prison", "xingbu_gate", "bingzhang", "siku", "taipusi", "taiyiyuan", "jingshen", "yuhe_wharf", "shenwu", "xingxing_tai", "yongxing_shi"
  ]);
  const PAVILION_LOCS = new Set([
    "cangyun", "yaogu", "baixue", "meihua", "tiantai", "shuiyun",
    "yewang", "jianzhong", "mishi", "wuyin", "zhulin", "honglian"
  ]);
  const LOC_SCENE = {
    hub: "village",
    qingcheng: "gate",
    jingji: "tavern",
    leifeng: "gate",
    longmen: "gate",
    luohe: "harbor",
    meihua: "village",
    shuiyun: "village",
    gulan: "nightmarket",
    yanhui: "harbor",
    cangyun: "autumn",
    qingzhu: "autumn",
    chixia: "autumn",
    bianguan: "autumn",
    yaogu: "autumn",
    tiantai: "autumn",
    zhulin: "autumn",
    jianzhong: "autumn",
    wuyin: "autumn",
    honglian: "cave",
    xueyuan: "snowbridge",
    baixue: "snowbridge",
    shamo: "snowbridge",
    huanggong: "palaceWumen",
    neiting: "palaceYuhuayuan",
    hougong: "palaceYangxin",
    yulin: "palaceWuying",
    dongchang: "punishDongchangGate",
    heishui: "cave",
    mishi: "cave",
    yewang: "cave",
    renyazi_alley: "cave",
    wumen: "palaceWumen",
    taihedian: "palaceTaihedian",
    qianqing: "palaceQianqing",
    yangxin: "palaceYangxin",
    wenyuan: "palaceWenyuan",
    yushan: "palaceYushan",
    neiwufu: "palaceNeiwufu",
    yuhuayuan: "palaceYuhuayuan",
    dianshi: "palaceDianshi",
    wuying: "palaceWuying",
    tianlao: "palaceTianlao",
    xingbu_prison: "palaceXingbuPrison",
    xingbu_gate: "palaceXingbuGate",
    bingzhang: "palaceBingzhang",
    siku: "palaceSiku",
    taipusi: "palaceTaipusi",
    taiyiyuan: "palaceTaiyiyuan",
    jingshen: "palaceJingshen",
    yuhe_wharf: "palaceYuheWharf",
    shenwu: "palaceShenwu",
    xingxing_tai: "punishXingxingTai",
    yongxing_shi: "punishYongxingShi"
  };
  const SCENE_THUMB = {
    gate: "thumbGate", village: "thumbVillage", nightmarket: "thumbNightmarket",
    autumn: "thumbAutumn", tavern: "thumbTavern", snowbridge: "thumbSnowbridge",
    palace: "thumbPalace", harbor: "thumbHarbor", cave: "thumbCave",
    city: "thumbCity", pavilion: "thumbPavilion",
    palaceWumen: "thumbPalaceWumen",
    palaceTaihedian: "thumbPalaceTaihedian",
    palaceQianqing: "thumbPalaceQianqing",
    palaceYangxin: "thumbPalaceYangxin",
    palaceWenyuan: "thumbPalaceWenyuan",
    palaceYushan: "thumbPalaceYushan",
    palaceNeiwufu: "thumbPalaceNeiwufu",
    palaceYuhuayuan: "thumbPalaceYuhuayuan",
    palaceDianshi: "thumbPalaceDianshi",
    palaceWuying: "thumbPalaceWuying",
    palaceTianlao: "thumbPalaceTianlao",
    palaceXingbuPrison: "thumbPalaceXingbuPrison",
    palaceXingbuGate: "thumbPalaceXingbuGate",
    palaceBingzhang: "thumbPalaceBingzhang",
    palaceSiku: "thumbPalaceSiku",
    palaceTaipusi: "thumbPalaceTaipusi",
    palaceTaiyiyuan: "thumbPalaceTaiyiyuan",
    palaceJingshen: "thumbPalaceJingshen",
    palaceYuheWharf: "thumbPalaceYuheWharf",
    palaceShenwu: "thumbPalaceShenwu",
    punishDongchangGate: "thumbPunishDongchangGate",
    punishXingxingTai: "thumbPunishXingxingTai",
    punishWumenZhanshou: "thumbPunishWumenZhanshou",
    punishYongxingShi: "thumbPunishYongxingShi",
    punishLingchi: "thumbPunishLingchi",
    punishHuopeng: "thumbPunishHuopeng",
    punishChelie: "thumbPunishChelie",
    punishGunsha: "thumbPunishGunsha",
    punishGongxing: "thumbPunishGongxing",
    punishWayan: "thumbPunishWayan",
    punishBopi: "thumbPunishBopi",
    punishDingzhi: "thumbPunishDingzhi",
    punishDiaojian: "thumbPunishDiaojian",
    punishChentang: "thumbPunishChentang"
  };

  function asset(key) { return ASSETS[key] || ""; }
  function sceneKeyForLoc(locId) {
    if (S && S.sceneOverride && ASSETS[S.sceneOverride]) return S.sceneOverride;
    if (LOC_SCENE[locId]) return LOC_SCENE[locId];
    if (PAVILION_LOCS.has(locId)) return "autumn";
    if (TOWN_LOCS.has(locId)) return "gate";
    const loc = LOCATIONS.find(l => l.id === locId);
    if (loc) {
      if (loc.region === "北地") return "snowbridge";
      if (loc.region === "秘境") return "cave";
      if (loc.region === "江南") return "village";
      if (loc.region === "京城" || loc.region === "皇城" || loc.region === "京畿皇城") return "palace";
    }
    return "gate";
  }
  function sceneUrlForLoc(locId) {
    const key = sceneKeyForLoc(locId);
    return asset(key) || asset(key === "pavilion" ? "pavilion" : "city") || asset("city");
  }
  function thumbUrlForLoc(locId) {
    const key = sceneKeyForLoc(locId);
    const tk = SCENE_THUMB[key] || "thumbCity";
    return asset(tk) || asset("thumbCity");
  }
  function chibiPos(npcId) {
    const s = CHIBI_SPRITE[npcId] || CHIBI_SPRITE.default;
    // 4×4 grid → position percentages
    const x = s.c * (100 / 3);
    const y = s.r * (100 / 3);
    return { x, y, r: s.r, c: s.c };
  }
  function portraitStyle(npcId) {
    const p = NPC_PORTRAIT[npcId];
    if (!p || !asset("homagePortraits")) return null;
    const cols = PORTRAIT_ATLAS_COLS || 8;
    const rows = Math.ceil(Object.keys(NPC_PORTRAIT).length / cols) || 10;
    const x = cols <= 1 ? 0 : (p.c * (100 / (cols - 1)));
    const y = rows <= 1 ? 0 : (p.r * (100 / (rows - 1)));
    return "background-image:url('" + asset("homagePortraits") + "');background-size:" + (cols*100) + "% " + (rows*100) + "%;background-position:" + x + "% " + y + "%;background-repeat:no-repeat;image-rendering:pixelated;";
  }
  function chibiStyle(npcId, sizeClass) {
    const ps = portraitStyle(npcId);
    if (ps) return ps;
    const p = chibiPos(npcId);
    return `background-image:url('${asset("chibi")}');background-size:400% 400%;background-position:${p.x}% ${p.y}%;`;
  }
  function chibiHtml(npcId, sizeClass) {
    const cls = "chibi" + (sizeClass ? " " + sizeClass : "") + (NPC_PORTRAIT[npcId] ? " chibi-portrait" : "");
    const name = (NPCS && NPCS[npcId] && NPCS[npcId].name) ? NPCS[npcId].name : npcId;
    return `<span class="${cls}" style="${chibiStyle(npcId)}" title="${name}"></span>`;
  }
  function gradientPlaceholder(locId) {
    // deterministic warm gradients for locs without unique art
    const hues = {
      hub: "linear-gradient(135deg,#4a3020,#2a1810)",
      shamo: "linear-gradient(135deg,#c09040,#6a4020)",
      bianguan: "linear-gradient(135deg,#6a7060,#303830)",
      jianzhong: "linear-gradient(135deg,#506080,#202838)",
      mishi: "linear-gradient(135deg,#403050,#181020)",
      honglian: "linear-gradient(135deg,#a03020,#401010)",
      yewang: "linear-gradient(135deg,#303040,#101018)",
      wuyin: "linear-gradient(135deg,#405060,#182028)",
      zhulin: "linear-gradient(135deg,#306040,#143020)",
      chixia: "linear-gradient(135deg,#c05030,#502010)",
      leifeng: "linear-gradient(135deg,#707880,#303840)",
      snow: "linear-gradient(135deg,#a0b0c0,#405060)"
    };
    return hues[locId] || null;
  }


  // ---------- DATA ----------
  const LOCATIONS = [
    { id: "hub", name: "山間營地", desc: "你暫時落腳之處。", unlock: true, hub: true, region: "中原" },
    { id: "qingcheng", name: "青城鎮", desc: "山腳小鎮，茶香與刀光並存。", unlock: true, region: "中原", shop: true },
    { id: "cangyun", name: "蒼雲寺", desc: "雲霧古剎，僧人習武護寺。", unlock: true, region: "中原" },
    { id: "heishui", name: "黑水寨", desc: "江湖人避之則吉的山寨。", unlock: true, region: "中原" },
    { id: "jingji", name: "京畿客棧", desc: "通往京城外的喧鬧客棧。", unlock: true, region: "中原", shop: true },
    { id: "gongmen_yi", name: "青梧宮門驛", desc: "宮牆外最後一驛。由此可直接叩門，開啟入宮開場劇情。", unlock: true, region: "京畿皇城" },
    { id: "luohe", name: "洛河渡", desc: "渡口船家多聞江湖秘事。", unlock: true, region: "中原" },
    { id: "yaogu", name: "藥谷", desc: "谷中百草，亦藏奇人。", unlock: false, needFlag: "heard_yaogu", region: "中原" },
    { id: "jianzhong", name: "劍冢", desc: "亂葬劍之崗，殘鋒猶寒。", unlock: false, needFlag: "map_jianzhong", region: "中原" },
    { id: "bianguan", name: "邊關", desc: "風沙與號角，守軍冷眼。", unlock: false, needFlag: "rep_30", region: "邊陲" },
    { id: "mishi", name: "密室遺跡", desc: "山腹深處的舊日密室。", unlock: false, needItem: "ancient_key", region: "秘境" },
    { id: "baixue", name: "白雪莊", desc: "莊主好客，內裡未必單純。", unlock: false, needFlag: "invite_baixue", region: "北地" },
    { id: "shamo", name: "黃沙驛", desc: "塞外驛站，消息與刀客齊至。", unlock: false, needFlag: "west_road", region: "邊陲", shop: true },
    { id: "meihua", name: "梅花塢", desc: "塢中暗香，琴聲偶現。", unlock: false, needFlag: "heard_meihua", region: "江南" },
    { id: "longmen", name: "龍門鎮", desc: "鐵匠鋪與馬市並立的大鎮。", unlock: false, needFlag: "open_longmen", region: "中原", shop: true },
    { id: "wuyin", name: "無音谷", desc: "鳥雀不鳴，適合閉關。", unlock: false, needFlag: "map_wuyin", region: "秘境" },
    { id: "chixia", name: "赤霞崖", desc: "崖壁如火，鷹隼盤旋。", unlock: false, needFlag: "chixia_path", region: "邊陲" },
    { id: "yanhui", name: "煙灰港", desc: "海霧與走私船的溫床。", unlock: false, needFlag: "sea_pass", region: "沿海", shop: true },
    { id: "qingzhu", name: "青竹林", desc: "竹影重重，易迷路也易伏擊。", unlock: false, needFlag: "bamboo_map", region: "江南" },
    { id: "leifeng", name: "雷峰哨", desc: "官軍哨所，盤查甚嚴。", unlock: false, needRenown: 20, region: "中原" },
    { id: "gulan", name: "古蘭商會", desc: "西域商人聚處，貨奇價高。", unlock: false, needFlag: "trade_pass", region: "邊陲", shop: true },
    { id: "xueyuan", name: "雪原關", desc: "酷寒關隘，通往更深北境。", unlock: false, needFlag: "north_pass", region: "北地" },
    { id: "honglian", name: "紅蓮教壇", desc: "紅幔低垂，香火詭譎。", unlock: false, needFlag: "honglian_invite", region: "秘境" },
    { id: "yewang", name: "夜王墓", desc: "古墓夜氣森然，禁制未散。", unlock: false, needItem: "tomb_seal", region: "秘境" },
    { id: "tiantai", name: "天台觀", desc: "道家清修之地，觀星問道。", unlock: false, needFlag: "dao_invite", region: "中原" },
    { id: "shuiyun", name: "水雲居", desc: "湖心小築，隱士居焉。", unlock: false, needFlag: "lake_invite", region: "江南" },
    { id: "huanggong", name: "青梧宮外廷", desc: "宮牆朱門，禁軍肅立。", unlock: false, needFlag: "palace_access", region: "京畿皇城" },
    { id: "neiting", name: "內廷花廊", desc: "花香深禁，腳步須輕。", unlock: false, needFlag: "neiting_access", region: "京畿皇城" },
    { id: "dongchang", name: "東廠衙署", desc: "檔案與刑具的氣味並存。", unlock: false, needFlag: "dongchang_invite", region: "京畿皇城" },
    { id: "yulin", name: "羽林侍衛營", desc: "刀槍如林，號令如山。", unlock: false, needFlag: "yulin_ok", region: "京畿皇城" },
    { id: "hougong", name: "後宮璇璣殿", desc: "紅牆深處，聖眷所居。", unlock: false, needFlag: "hougong_access", region: "京畿皇城" },
    { id: "renyazi_alley", name: "人牙子暗巷", desc: "京畿後巷，人牙子出沒——勿久留。", unlock: false, needFlag: "heard_renyazi", region: "京畿皇城" },
    { id: "wumen", name: "午門", desc: "宮闕正門，禁軍列戟，入宮第一關。", unlock: false, needFlag: "palace_access", region: "京畿皇城" },
    { id: "taihedian", name: "太和殿", desc: "金磚御道，大典朝會之所。", unlock: false, needFlag: "palace_access", region: "京畿皇城" },
    { id: "qianqing", name: "乾清宮", desc: "御前奏事，文書如雪。", unlock: false, needFlag: "palace_access", region: "京畿皇城" },
    { id: "yangxin", name: "養心殿", desc: "御座高居，聖眷與密諭皆出於此。", unlock: false, needFlag: "palace_access", region: "京畿皇城" },
    { id: "wenyuan", name: "文淵閣", desc: "翰墨滿架，詞臣校書之所。", unlock: false, needFlag: "palace_access", region: "京畿皇城" },
    { id: "yushan", name: "御膳房", desc: "油煙與膳香並起，宮人往來如梭。", unlock: false, needFlag: "palace_access", region: "京畿皇城" },
    { id: "neiwufu", name: "內務府庫房", desc: "奇珍入冊，庫門森嚴。", unlock: false, needFlag: "palace_access", region: "京畿皇城" },
    { id: "yuhuayuan", name: "御花園", desc: "石橋花影，禁中遊賞之地。", unlock: false, needFlag: "palace_access", region: "京畿皇城" },
    { id: "dianshi", name: "殿試場", desc: "貢士列席，硃卷定終身。", unlock: false, needFlag: "palace_access", region: "京畿皇城" },
    { id: "wuying", name: "武英殿", desc: "甲仗成列，羽林演武之庭。", unlock: false, needFlag: "palace_access", region: "京畿皇城" },
    { id: "tianlao", name: "天牢", desc: "暗無天日，欽犯所繫。", unlock: false, needFlag: "palace_access", region: "京畿皇城" },
    { id: "xingbu_prison", name: "刑部大牢", desc: "刑具與供狀並陳，問案之所。", unlock: false, needFlag: "palace_access", region: "京畿皇城" },
    { id: "xingbu_gate", name: "刑部門", desc: "法衙門首，皂衣侍立。", unlock: false, needFlag: "palace_access", region: "京畿皇城" },
    { id: "bingzhang", name: "兵仗局", desc: "刀槍入架，甲胄生寒。", unlock: false, needFlag: "palace_access", region: "京畿皇城" },
    { id: "siku", name: "四庫全書館", desc: "卷帙如山，校勘不息。", unlock: false, needFlag: "palace_access", region: "京畿皇城" },
    { id: "taipusi", name: "太僕寺", desc: "御馬嘶鳴，馬政所司。", unlock: false, needFlag: "palace_access", region: "京畿皇城" },
    { id: "taiyiyuan", name: "太醫院", desc: "藥香撲鼻，太醫候診。", unlock: false, needFlag: "palace_access", region: "京畿皇城" },
    { id: "jingshen", name: "淨身房", desc: "燈影森冷，淨身之所——非迫不得已勿近。", unlock: false, needFlag: "eunuch_path", region: "京畿皇城" },
    { id: "yuhe_wharf", name: "御河碼頭", desc: "御河舟楫，可通宮外。", unlock: false, needFlag: "palace_access", region: "京畿皇城" },
    { id: "shenwu", name: "神武門", desc: "後門出宮，戍卒換防。", unlock: false, needFlag: "palace_access", region: "京畿皇城" },
    { id: "xingxing_tai", name: "行刑枱", desc: "廠衛用刑之所，木案生寒。", unlock: false, needFlag: "palace_access", region: "京畿皇城" },
    { id: "yongxing_shi", name: "用刑室", desc: "鎖鏈與炭火並存，慎刑司私牢。", unlock: false, needFlag: "palace_access", region: "京畿皇城" }
  ];

  const MAP_PINS = {
    hub: { x: 48, y: 48 },
    qingcheng: { x: 52, y: 54 },
    cangyun: { x: 46, y: 42 },
    heishui: { x: 40, y: 52 },
    jingji: { x: 58, y: 34 },
    gongmen_yi: { x: 60, y: 30 },
    luohe: { x: 55, y: 50 },
    yaogu: { x: 50, y: 40 },
    jianzhong: { x: 43, y: 46 },
    longmen: { x: 50, y: 50 },
    leifeng: { x: 60, y: 40 },
    tiantai: { x: 47, y: 36 },
    bianguan: { x: 34, y: 28 },
    shamo: { x: 22, y: 44 },
    chixia: { x: 30, y: 50 },
    gulan: { x: 16, y: 38 },
    baixue: { x: 48, y: 16 },
    xueyuan: { x: 40, y: 12 },
    meihua: { x: 64, y: 62 },
    qingzhu: { x: 58, y: 68 },
    shuiyun: { x: 66, y: 56 },
    yanhui: { x: 80, y: 58 },
    mishi: { x: 38, y: 58 },
    wuyin: { x: 36, y: 64 },
    honglian: { x: 28, y: 66 },
    yewang: { x: 24, y: 56 },
    huanggong: { x: 59, y: 26 },
    neiting: { x: 61, y: 24 },
    dongchang: { x: 56, y: 28 },
    yulin: { x: 55, y: 30 },
    hougong: { x: 60, y: 22 },
    renyazi_alley: { x: 57, y: 36 },
  };


  const FACTIONS = {
    cangyun_sect: {
      id: "cangyun_sect", name: "蒼雲寺",
      desc: "以護生戒殺為本，拳掌剛柔並濟。",
      skills: ["cloud_palm", "zen_breath", "mercy_seal"],
      joinLoc: "cangyun", req: { renown: 5 },
      skillGates: { mercy_seal: 25 }
    },
    heishui_band: {
      id: "heishui_band", name: "黑水寨",
      desc: "寨規簡單：夠狠、夠義氣。",
      skills: ["shadow_slash", "blood_roar", "night_net"],
      joinLoc: "heishui", req: { force: 8 },
      skillGates: { night_net: 25 }
    },
    baixue_manor: {
      id: "baixue_manor", name: "白雪莊",
      desc: "莊中劍法清冷，重禮亦重情。",
      skills: ["snow_sword", "frost_step", "white_plume"],
      joinLoc: "baixue", req: { renown: 10, flag: "invite_baixue" },
      skillGates: { white_plume: 30 }
    },
    honglian_cult: {
      id: "honglian_cult", name: "紅蓮教",
      desc: "旁門小派，火毒奇詭，收徒極挑。",
      skills: ["lotus_flame", "ash_veil"],
      joinLoc: "honglian", req: { renown: 15, flag: "honglian_invite", honorMax: 40 },
      skillGates: {}
    },
    powan_bang: {
      id: "powan_bang", name: "破碗幫",
      desc: "以碗為號，遊走市井，義字當先。",
      skills: ["jiaohua_quan", "dogstick_form", "beggar_drift"],
      joinLoc: "qingcheng", req: { renown: 6 },
      skillGates: { dogstick_form: 20, beggar_drift: 28 }
    },
    cangfeng_jian: {
      id: "cangfeng_jian", name: "蒼峰劍派",
      desc: "崖上論劍，劍意清峭，重正氣亦重勝負。",
      skills: ["cangfeng_sword", "cloud_slash", "peak_intent"],
      joinLoc: "chixia", req: { renown: 8, force: 7 },
      skillGates: { peak_intent: 28 }
    },
    youmu_line: {
      id: "youmu_line", name: "幽墓一脈",
      desc: "墓中傳承，柔掌輕功，遠避紅塵喧囂。",
      skills: ["soft_yin_palm", "tomb_drift", "void_finger"],
      joinLoc: "yewang", req: { renown: 10, flag: "tomb_ally" },
      skillGates: { void_finger: 30 }
    },
    luoying_dao: {
      id: "luoying_dao", name: "落英島",
      desc: "海島奇門，落英陣法，亦正亦奇。",
      skills: ["petal_rain", "odd_formation", "sea_breeze"],
      joinLoc: "yanhui", req: { renown: 10, flag: "sea_pass" },
      skillGates: { odd_formation: 26 }
    },
    huangsha_dao: {
      id: "huangsha_dao", name: "黃沙刀盟",
      desc: "沙洲刀客結盟，刀勢如風沙蔽日。",
      skills: ["desert_blade_adv", "iron_sand_palm", "sand_veil_cut"],
      joinLoc: "shamo", req: { force: 9 },
      skillGates: { iron_sand_palm: 24 }
    }
  };

  const SKILLS = {
    basic_strike: { id: "basic_strike", name: "基本拳腳", power: 8, neiliCost: 0, desc: "樸實一拳。" },
    cloud_palm: { id: "cloud_palm", name: "雲嵐掌", power: 18, neiliCost: 6, desc: "掌風如雲，柔中帶剛。" },
    zen_breath: { id: "zen_breath", name: "定息功", power: 0, neiliCost: 4, heal: 22, desc: "調息回復氣血。" },
    mercy_seal: { id: "mercy_seal", name: "慈悲印", power: 12, neiliCost: 10, cleanse: true, desc: "化去內傷定身，並造成柔勁。" },
    shadow_slash: { id: "shadow_slash", name: "黑影刀", power: 22, neiliCost: 8, desc: "快刀一式，專攻破綻。" },
    blood_roar: { id: "blood_roar", name: "熱血吼", power: 14, neiliCost: 5, buffAtk: 3, desc: "怒吼提振武力。" },
    night_net: { id: "night_net", name: "夜網索", power: 10, neiliCost: 9, stun: 1, desc: "索敵定身一回合。" },
    snow_sword: { id: "snow_sword", name: "霜華劍", power: 24, neiliCost: 10, desc: "劍意清寒。" },
    frost_step: { id: "frost_step", name: "踏雪無痕", power: 10, neiliCost: 5, buffAgi: 4, desc: "身法大增。" },
    white_plume: { id: "white_plume", name: "白羽三連", power: 28, neiliCost: 14, desc: "連刺三式，高耗內力。" },
    lotus_flame: { id: "lotus_flame", name: "紅蓮火", power: 20, neiliCost: 11, burn: 2, desc: "附帶灼燒內傷。" },
    ash_veil: { id: "ash_veil", name: "灰燼帷", power: 8, neiliCost: 7, buffDef: 4, desc: "灰幕護體。" },
    heal_basic: { id: "heal_basic", name: "止血散訣", power: 0, neiliCost: 5, heal: 28, desc: "藥谷傳授的應急止血。" },
    staff_form: { id: "staff_form", name: "禪杖式", power: 16, neiliCost: 7, desc: "雲空所傳樸拙杖法。" },
    qin_strike: { id: "qin_strike", name: "弦驚", power: 14, neiliCost: 6, stun: 1, desc: "以琴意驚敵一瞬。" },
    water_step: { id: "water_step", name: "水雲步", power: 10, neiliCost: 5, buffAgi: 5, desc: "踏水無聲，身法大增。" },
    star_breath: { id: "star_breath", name: "觀星息", power: 0, neiliCost: 6, heal: 18, desc: "觀星調息，回復氣血。" },
    sand_slash: { id: "sand_slash", name: "黃沙刀", power: 20, neiliCost: 8, desc: "沙無痕半式刀法。" },
    scarlet_arc: { id: "scarlet_arc", name: "赤霞一式", power: 26, neiliCost: 12, desc: "崖上劍意如霞。" },
    silent_song: { id: "silent_song", name: "無音曲", power: 12, neiliCost: 10, stun: 1, desc: "無弦之音，擾敵心神。" },
    // v8 homage factions
    jiaohua_quan: { id: "jiaohua_quan", name: "叫花拳", power: 16, neiliCost: 5, desc: "市井拳路，虛實難測。" },
    dogstick_form: { id: "dogstick_form", name: "伏犬棒法", power: 22, neiliCost: 9, stun: 1, desc: "棒勢壓身，可定敵一瞬。" },
    beggar_drift: { id: "beggar_drift", name: "碗底步", power: 10, neiliCost: 6, buffAgi: 5, desc: "破碗一轉，身法大增。" },
    cangfeng_sword: { id: "cangfeng_sword", name: "蒼峰劍", power: 23, neiliCost: 9, desc: "劍出如峰，正氣凜然。" },
    cloud_slash: { id: "cloud_slash", name: "雲切", power: 20, neiliCost: 8, desc: "一劍剖雲，專破防。" },
    peak_intent: { id: "peak_intent", name: "峰意三叠", power: 30, neiliCost: 15, desc: "論劍壓軸，三叠劍意。" },
    soft_yin_palm: { id: "soft_yin_palm", name: "素心柔掌", power: 18, neiliCost: 10, desc: "陰柔掌勁，傷人於無形。" },
    tomb_drift: { id: "tomb_drift", name: "墓影飄", power: 8, neiliCost: 5, buffAgi: 6, desc: "墓道輕功，來去無聲。" },
    void_finger: { id: "void_finger", name: "空指點穴", power: 14, neiliCost: 11, stun: 1, desc: "隔空點穴，定身一回。" },
    petal_rain: { id: "petal_rain", name: "落英雨", power: 19, neiliCost: 9, desc: "花瓣如刃，紛飛掩殺。" },
    odd_formation: { id: "odd_formation", name: "奇門換位", power: 12, neiliCost: 10, buffDef: 4, buffAgi: 2, desc: "陣法挪移，攻防互換。" },
    sea_breeze: { id: "sea_breeze", name: "海風腿", power: 17, neiliCost: 7, desc: "腿影如潮，連綿不絕。" },
    desert_blade_adv: { id: "desert_blade_adv", name: "狂沙刀", power: 24, neiliCost: 10, desc: "刀勢捲沙，開闢前路。" },
    iron_sand_palm: { id: "iron_sand_palm", name: "鐵砂掌", power: 26, neiliCost: 12, desc: "掌風沉猛，裂石可聞。" },
    sand_veil_cut: { id: "sand_veil_cut", name: "沙幕斬", power: 15, neiliCost: 8, buffDef: 3, desc: "沙幕護體，趁勢一斬。" },
    xiake_strike: { id: "xiake_strike", name: "俠客一式", power: 21, neiliCost: 8, desc: "殘頁所載，豪氣一擊。" }
  };

  const ITEMS = {
    // consumables
    herb: { id: "herb", name: "止血草", type: "consumable", rarity: "common", heal: 30, desc: "恢復 30 氣血。", price: 15 },
    pill: { id: "pill", name: "回氣丹", type: "consumable", rarity: "common", neili: 25, desc: "恢復 25 內力。", price: 20 },
    big_pill: { id: "big_pill", name: "九轉丹", type: "consumable", rarity: "rare", heal: 50, neili: 20, desc: "大補氣血內力。", price: 60 },
    wine: { id: "wine", name: "烈酒", type: "consumable", rarity: "common", heal: 10, buffAtk: 2, desc: "小補並短暫提武力。", price: 12 },
    detox: { id: "detox", name: "清毒散", type: "consumable", rarity: "rare", cleanse: true, antitoxin: 5, desc: "清除異常並暫提抗毒。", price: 45 },
    bone_soup: { id: "bone_soup", name: "壯骨湯", type: "consumable", rarity: "common", heal: 20, desc: "溫補，恢復氣血。", price: 18 },
    insight_tea: { id: "insight_tea", name: "悟心茶", type: "consumable", rarity: "rare", neili: 15, desc: "清神，回內力。", price: 35 },
    // weapons
    wood_sword: { id: "wood_sword", name: "木劍", type: "weapon", rarity: "common", atk: 3, desc: "練劍木劍。", price: 25 },
    iron_blade: { id: "iron_blade", name: "精鐵刀", type: "weapon", rarity: "common", atk: 8, desc: "寨中好刀。", price: 80 },
    frost_blade: { id: "frost_blade", name: "霜紋劍", type: "weapon", rarity: "rare", atk: 12, agi: 2, desc: "白雪莊贈劍。", price: 0 },
    bamboo_spear: { id: "bamboo_spear", name: "青竹槍", type: "weapon", rarity: "common", atk: 6, agi: 1, desc: "輕便槍械。", price: 55 },
    dragon_hammer: { id: "dragon_hammer", name: "龍門錘", type: "weapon", rarity: "rare", atk: 14, def: 1, desc: "沉重開山。", price: 120 },
    night_dagger: { id: "night_dagger", name: "夜行匕首", type: "weapon", rarity: "rare", atk: 9, agi: 4, desc: "適合突襲。", price: 95 },
    lotus_fan: { id: "lotus_fan", name: "紅蓮扇", type: "weapon", rarity: "epic", atk: 11, wit: 2, desc: "扇骨藏火。", price: 0 },
    star_staff: { id: "star_staff", name: "星羅杖", type: "weapon", rarity: "epic", atk: 13, neiliMax: 8, desc: "觀中寶杖。", price: 0 },
    // armor
    cloth: { id: "cloth", name: "粗布衣", type: "armor", rarity: "common", def: 2, desc: "擋風遮體。", price: 20 },
    leather: { id: "leather", name: "硬皮甲", type: "armor", rarity: "common", def: 6, desc: "江湖常備。", price: 70 },
    temple_robe: { id: "temple_robe", name: "雲紋僧袍", type: "armor", rarity: "rare", def: 5, neiliMax: 10, desc: "助長內息。", price: 0 },
    scale_mail: { id: "scale_mail", name: "魚鱗軟甲", type: "armor", rarity: "rare", def: 9, agi: 1, desc: "海港貨。", price: 130 },
    snow_cloak: { id: "snow_cloak", name: "霜絨披風", type: "armor", rarity: "rare", def: 7, antitoxin: 3, desc: "禦寒略抗毒。", price: 110 },
    lotus_cape: { id: "lotus_cape", name: "赤蓮披", type: "armor", rarity: "epic", def: 8, force: 2, desc: "教中禮服。", price: 0 },
    // accessories
    jade_ring: { id: "jade_ring", name: "青玉戒", type: "accessory", rarity: "rare", luck: 2, wit: 1, desc: "增福緣悟性。", price: 90 },
    tiger_talon: { id: "tiger_talon", name: "虎骨佩", type: "accessory", rarity: "common", bone: 2, force: 1, desc: "強根骨。", price: 50 },
    compass_charm: { id: "compass_charm", name: "定風符", type: "accessory", rarity: "rare", agi: 2, luck: 1, desc: "行路平安。", price: 75 },
    honor_token: { id: "honor_token", name: "義字令", type: "accessory", rarity: "epic", honor: 5, renownBonus: 1, desc: "彰顯俠義。", price: 0 },
    poison_amulet: { id: "poison_amulet", name: "避毒香囊", type: "accessory", rarity: "rare", antitoxin: 6, desc: "抗毒大增。", price: 85 },
    // story / key
    ancient_key: { id: "ancient_key", name: "青銅古鑰", type: "key", rarity: "epic", desc: "開啟密室遺跡。", price: 0 },
    herb_letter: { id: "herb_letter", name: "藥谷密信", type: "key", rarity: "rare", desc: "交誰會改命運。", price: 0 },
    blood_token: { id: "blood_token", name: "血契令", type: "key", rarity: "rare", desc: "黑水寨信物。", price: 0 },
    jade_pendant: { id: "jade_pendant", name: "青玉佩", type: "key", rarity: "rare", desc: "顧清寒信物。", price: 0 },
    map_fragment: { id: "map_fragment", name: "劍冢殘圖", type: "key", rarity: "rare", desc: "解鎖劍冢。", price: 0 },
    antidote: { id: "antidote", name: "解蝕散", type: "key", rarity: "epic", desc: "關乎沈孤鴻生死。", price: 0 },
    tomb_seal: { id: "tomb_seal", name: "夜印封泥", type: "key", rarity: "epic", desc: "可入夜王墓。", price: 0 },
    sea_chart: { id: "sea_chart", name: "煙港海圖", type: "key", rarity: "rare", desc: "解鎖煙灰港。", price: 0 },
    bamboo_token: { id: "bamboo_token", name: "竹影令", type: "key", rarity: "rare", desc: "可入青竹林。", price: 0 },
    lotus_invite: { id: "lotus_invite", name: "紅蓮帖", type: "key", rarity: "rare", desc: "受邀往紅蓮教壇。", price: 0 },
    dao_scroll: { id: "dao_scroll", name: "星象殘卷", type: "key", rarity: "rare", desc: "天台觀之邀。", price: 0 },
    lake_letter: { id: "lake_letter", name: "水雲書", type: "key", rarity: "rare", desc: "邀往水雲居。", price: 0 },
    chapter2_sigil: { id: "chapter2_sigil", name: "盟約殘印", type: "key", rarity: "epic", desc: "第二章關鍵信物。", price: 0 },
    cell_key: { id: "cell_key", name: "牢房鎖匙", type: "key", rarity: "rare", desc: "可打開禁閉室。", price: 0 },
    // v4 attr accessories / consumables
    bronze_mirror: { id: "bronze_mirror", name: "銅鏡佩", type: "accessory", rarity: "common", charm: 3, desc: "照面生輝，增魅力。", price: 48 },
    calm_bead: { id: "calm_bead", name: "靜心珠", type: "accessory", rarity: "rare", focus: 3, wit: 1, desc: "凝神定氣。", price: 78 },
    med_pouch: { id: "med_pouch", name: "醫囊", type: "accessory", rarity: "rare", medicine: 3, antitoxin: 2, desc: "行醫必備。", price: 82 },
    far_glass: { id: "far_glass", name: "千里鏡", type: "accessory", rarity: "rare", perception: 3, luck: 1, desc: "察微知著。", price: 88 },
    silver_tongue: { id: "silver_tongue", name: "巧言環", type: "accessory", rarity: "epic", charm: 4, honor: 1, desc: "舌燦蓮花。", price: 0 },
    focus_incense: { id: "focus_incense", name: "定神香", type: "consumable", rarity: "common", neili: 12, desc: "靜心回內，略提定力一時。", price: 22, tempFocus: 1 },
    med_salve: { id: "med_salve", name: "金創膏", type: "consumable", rarity: "common", heal: 35, desc: "外敷療傷，醫術高者更效。", price: 28 },
    eye_drop: { id: "eye_drop", name: "明目露", type: "consumable", rarity: "rare", neili: 8, desc: "清目一瞬，探索更易發現。", price: 40, tempPerception: 2 },
    sword_shard: { id: "sword_shard", name: "劍冢殘鋒", type: "key", rarity: "epic", desc: "奇遇所得殘鋒碎片。", price: 0 },
    fairy_dew: { id: "fairy_dew", name: "仙緣露", type: "consumable", rarity: "epic", heal: 80, neili: 40, desc: "高福緣奇遇神露。", price: 0 },
    nameless_page: { id: "nameless_page", name: "無名劍譜一頁", type: "key", rarity: "epic", desc: "殘頁藏着一式心法。", price: 0 },
    yaogu_manual: { id: "yaogu_manual", name: "藥谷入門冊", type: "key", rarity: "rare", desc: "蘇晚晴記名弟子信物。", price: 0 },
    temple_bead: { id: "temple_bead", name: "雲嵐念珠", type: "accessory", rarity: "rare", focus: 2, honor: 1, desc: "寺中弟子所持。", price: 0 },
    forge_ore: { id: "forge_ore", name: "龍門精礦", type: "key", rarity: "rare", desc: "淬煉兵器的礦料。", price: 25 },
    // v6 chapter3 / sides
    chapter3_shard: { id: "chapter3_shard", name: "天命殘片", type: "key", rarity: "epic", desc: "第三章關鍵信物，可引動夜王餘燼。", price: 0 },
    fate_edict: { id: "fate_edict", name: "分途詔令", type: "key", rarity: "epic", desc: "記錄你所選的天命分途。", price: 0 },
    border_toxin_proof: { id: "border_toxin_proof", name: "邊關毒線證物", type: "key", rarity: "rare", desc: "證明邊關毒線與殘印有關。", price: 0 },
    lotus_rift_note: { id: "lotus_rift_note", name: "紅蓮內訌密箋", type: "key", rarity: "rare", desc: "教中分裂的證據。", price: 0 },
    tomb_rift_seal: { id: "tomb_rift_seal", name: "古墓鬆動印", type: "key", rarity: "rare", desc: "夜王墓禁制鬆動之證。", price: 0 },
    candy: { id: "candy", name: "麥芽糖", type: "consumable", rarity: "common", heal: 5, desc: "童小六最愛。亦可略補氣血。", price: 3 },
    cook_veg: { id: "cook_veg", name: "鮮蔬", type: "key", rarity: "common", desc: "孤燈夜宵食材。", price: 8 },
    cook_meat: { id: "cook_meat", name: "野味", type: "key", rarity: "common", desc: "孤燈夜宵食材。", price: 12 },
    cook_spice: { id: "cook_spice", name: "香料包", type: "key", rarity: "common", desc: "孤燈夜宵調味。", price: 10 },
    cook_meal: { id: "cook_meal", name: "孤燈夜宵", type: "consumable", rarity: "rare", heal: 45, neili: 15, desc: "婆婆手藝，大補。", price: 0 },
    wolf_pelt: { id: "wolf_pelt", name: "雪狼皮", type: "key", rarity: "rare", desc: "可製披風或獻關。", price: 0 },
    lei_case_scroll: { id: "lei_case_scroll", name: "雷峰案卷", type: "key", rarity: "rare", desc: "冤案調查紀錄。", price: 0 },
    yulin_pass: { id: "yulin_pass", name: "羽林通行證", type: "key", rarity: "rare", desc: "可入青梧宮外廷／羽林營。", price: 0 },
    dongchang_token: { id: "dongchang_token", name: "東廠帖", type: "key", rarity: "rare", desc: "東廠招攬信物。", price: 0 },
    imperial_edict: { id: "imperial_edict", name: "青梧聖旨", type: "key", rarity: "epic", desc: "御筆硃批，通行宮禁。", price: 0 },
    imperial_token: { id: "imperial_token", name: "景安密令", type: "key", rarity: "epic", desc: "帝賜信物，出入內廷如坦途。", price: 0 },
    palace_badge: { id: "palace_badge", name: "宮籍腰牌", type: "accessory", rarity: "rare", charm: 1, honor: 1, desc: "宮中職事憑證。", price: 0 },
    eunuch_ledger: { id: "eunuch_ledger", name: "太監籍冊殘頁", type: "key", rarity: "rare", desc: "記着你的宮名——與仇。", price: 0 },
    revenge_blade: { id: "revenge_blade", name: "廠衛短刃", type: "weapon", rarity: "rare", atk: 10, agi: 2, desc: "東廠番子常佩。", price: 0 },
    palace_jade: { id: "palace_jade", name: "璇璣玉佩", type: "accessory", rarity: "epic", charm: 3, luck: 1, desc: "後宮賜佩。", price: 0 },

    palace_ruyi: { id: "palace_ruyi", name: "青梧如意", type: "accessory", rarity: "epic", charm: 2, luck: 1, desc: "宮賞如意，權貴巴結時常見。", price: 0 },
    palace_jinpao: { id: "palace_jinpao", name: "宮賞錦袍", type: "armor", rarity: "rare", def: 5, charm: 2, desc: "內務府歲賞錦袍。", price: 0 },
    palace_silk: { id: "palace_silk", name: "宮緞", type: "key", rarity: "rare", desc: "可送禮或獻貴人。", price: 40 },
    palace_yaopai_adv: { id: "palace_yaopai_adv", name: "高階腰牌", type: "key", rarity: "epic", desc: "內廷通行更暢；身分憑證。", price: 0 },
    court_seal_ink: { id: "court_seal_ink", name: "硃批印泥", type: "key", rarity: "rare", desc: "票擬／文書用；象徵文官差權。", price: 0 },
    eunuch_gift_box: { id: "eunuch_gift_box", name: "敬事房賞匣", type: "consumable", rarity: "rare", heal: 20, neili: 10, desc: "高階太監常收到的巴結禮。", price: 0 },


    sand_pact: { id: "sand_pact", name: "黃沙刀約", type: "key", rarity: "rare", desc: "與沙無痕的十年之約。", price: 0 },
    child_ballad: { id: "child_ballad", name: "青城童謠抄本", type: "key", rarity: "common", desc: "童謠裡藏着廉價情報網。", price: 0 },
    // v8 gear / mount / homage keys
    hanxue_horse: { id: "hanxue_horse", name: "汗血寶馬", type: "mount", rarity: "legendary", desc: "得此寶馬，天下關隘皆可一騎而至。", price: 0 },
    broken_bowl_staff: { id: "broken_bowl_staff", name: "破碗棍", type: "weapon", rarity: "common", atk: 7, agi: 1, desc: "幫中常備，其貌不揚。", price: 45 },
    cangfeng_jianqi: { id: "cangfeng_jianqi", name: "蒼峰長劍", type: "weapon", rarity: "rare", atk: 13, honor: 1, desc: "論劍勝者所佩。", price: 0 },
    soft_silk_robe: { id: "soft_silk_robe", name: "素絹衫", type: "armor", rarity: "rare", def: 6, agi: 2, desc: "柔韌護體，利於輕功。", price: 100 },
    tomb_veil: { id: "tomb_veil", name: "墓紗披", type: "armor", rarity: "rare", def: 7, focus: 2, desc: "幽墓一脈夜行披風。", price: 0 },
    coral_fan: { id: "coral_fan", name: "珊瑚扇", type: "weapon", rarity: "rare", atk: 10, wit: 2, desc: "落英島主客手物。", price: 110 },
    desert_scimitar: { id: "desert_scimitar", name: "沙洲彎刀", type: "weapon", rarity: "rare", atk: 12, force: 1, desc: "黃沙刀盟制式。", price: 105 },
    jade_heart: { id: "jade_heart", name: "心玉墜", type: "accessory", rarity: "epic", charm: 3, luck: 2, desc: "增魅力福緣。", price: 0 },
    beggar_robe: { id: "beggar_robe", name: "百衲衣", type: "armor", rarity: "common", def: 4, luck: 1, desc: "破碗幫禮服，反而增福。", price: 35 },
    iron_bracer: { id: "iron_bracer", name: "鐵砂護腕", type: "accessory", rarity: "rare", force: 2, bone: 1, desc: "練掌時所佩。", price: 70 },
    peak_tassel: { id: "peak_tassel", name: "峰影穗", type: "accessory", rarity: "rare", agi: 2, honor: 1, desc: "蒼峰弟子劍穗。", price: 0 },
    island_pearl: { id: "island_pearl", name: "落英珠", type: "accessory", rarity: "epic", wit: 2, perception: 2, desc: "海島奇珍。", price: 0 },
    xiake_page: { id: "xiake_page", name: "俠客殘頁", type: "key", rarity: "epic", desc: "殘詩藏拳意。", price: 0 },
    xuanyin_scroll: { id: "xuanyin_scroll", name: "玄陰殘卷", type: "key", rarity: "epic", desc: "陰柔心法殘篇，慎習。", price: 0 },
    horse_whistle: { id: "horse_whistle", name: "喚馬哨", type: "key", rarity: "rare", desc: "馬市牙人信物。", price: 20 },
    dragon_saddle: { id: "dragon_saddle", name: "血龍鞍", type: "accessory", rarity: "legendary", agi: 3, luck: 2, desc: "配汗血寶馬，行路如飛。", price: 0 },
    huangzu_jade: { id: "huangzu_jade", name: "皇族殘玉", type: "key", rarity: "epic", desc: "玉牒碎片，隱約刻着「靖」字——指向失散皇族。", price: 0 },
    blood_brother_token: { id: "blood_brother_token", name: "雙龍隱符", type: "key", rarity: "epic", desc: "一對龍紋半符，合則成兄弟之證。", price: 0 },
    enemy_lie_scroll: { id: "enemy_lie_scroll", name: "仇敵偽詔", type: "key", rarity: "epic", desc: "敵人偽造的血書，謊稱「你的仇人是當今天子」。", price: 0 }
  };

  const NPCS = {
    suning: { id: "suning", name: "蘇晚晴", title: "藥谷醫女", loc: "yaogu", major: true,
      intro: "白衣挽袖，藥香淡淡。",
      destinies: { ally: "結為醫友。", dead: "中毒而亡。", enemy: "因密信反目。", vanished: "遠走塞外。", default: "仍在藥谷。" } },
    heifeng: { id: "heifeng", name: "黑風", title: "黑水寨主", loc: "heishui", major: true,
      intro: "刀疤橫臉，笑卻爽朗。",
      destinies: { ally: "認你為兄弟。", dead: "內訌身亡。", enemy: "追殺令已出。", redeemed: "退隐洛河渡。", default: "坐鎮黑水寨。" } },
    guqinghan: { id: "guqinghan", name: "顧清寒", title: "白雪莊少莊主", loc: "baixue", major: true,
      intro: "素衣劍眉，話少情深。",
      destinies: { ally: "並肩留席。", dead: "護莊戰死。", enemy: "劍指於你。", married: "定情共守。", default: "莊中練劍。" } },
    masteryun: { id: "masteryun", name: "雲空師父", title: "蒼雲寺住持", loc: "cangyun", major: true,
      intro: "眉目慈和，掌可震山。",
      destinies: { ally: "收記名弟子。", dead: "護寺圓寂。", enemy: "逐你出寺。", retired: "退居後山。", default: "主持寺務。" } },
    shenguhong: { id: "shenguhong", name: "沈孤鴻", title: "邊關遊俠", loc: "bianguan", major: true,
      intro: "披風帶沙，眼神極清。",
      destinies: { ally: "邊關結義。", dead: "中毒而亡。", enemy: "視你為內奸。", hero: "名震邊關。", default: "生死未卜。" } },
    linqing: { id: "linqing", name: "林清歌", title: "梅花塢琴師", loc: "meihua", major: true,
      intro: " quant  quant  quant".replace(/ quant/g,"") + "一襲藕荷，琴音如訴。",
      destinies: { ally: "以琴相助。", dead: " quant".replace(" quant","") + "曲終人散，葬於塢中。", enemy: "琴音拒客。", muse: "為你譜新曲。", default: " quant".replace(" quant","") + " quant".replace(" quant","") } },
    zhaotie: { id: "zhaotie", name: "趙鐵山", title: "龍門鐵匠", loc: "longmen", major: true,
      intro: "臂膀如鐵，話直如錘。",
      destinies: { ally: "為你特製兵器。", dead: "爐毀人亡。", enemy: "拒接你的活。", master: "收你為半個徒弟。", default: "埋頭打鐵。" } },
    murong: { id: "murong", name: "慕容煙", title: "煙灰港船主", loc: "yanhui", major: true,
      intro: "煙斗不離手，海圖藏袖中。",
      destinies: { ally: "船隊助你渡海。", dead: "葬身風暴。", enemy: "海上攔截。", smuggler: "暗中走私助你。", default: " quant".replace(" quant","") } },
    honglianzhu: { id: "honglianzhu", name: "紅蓮聖女", title: "紅蓮教主", loc: "honglian", major: true,
      intro: "紅幔後一雙冷眼。",
      destinies: { ally: "許你教中客卿。", dead: "教壇火焚。", enemy: "火毒追杀。", convert: "引你入教。", default: " quant".replace(" quant","") } },
    daoxuan: { id: "daoxuan", name: "道玄真人", title: "天台觀主", loc: "tiantai", major: true,
      intro: "鬚髮如霜，手持星杖。",
      destinies: { ally: "授你觀星術緣。", dead: "化鶴而去。", enemy: "逐出觀門。", hermit: "閉關不問世。", default: " quant".replace(" quant","") } },
    yechen: { id: "yechen", name: "夜塵", title: "古墓守陵人", loc: "yewang", major: true,
      intro: "面罩黑紗，聲如枯葉。",
      destinies: { ally: "為你開墓道。", dead: "與墓同葬。", enemy: "永拒入墓。", freed: "解除守陵之咒。", default: " quant".replace(" quant","") } },
    shuiyunzi: { id: "shuiyunzi", name: "水雲子", title: "湖心隱士", loc: "shuiyun", major: true,
      intro: "蓑衣斗笠，笑看潮起。",
      destinies: { ally: "授你一招水式。", dead: " quant".replace(" quant","") + "湖心空舟。", enemy: " quant".replace(" quant","") + "拒見。", teacher: "收你散學。", default: " quant".replace(" quant","") } },
    // minor
    lan_keeper: { id: "lan_keeper", name: "藍掌櫃", title: "京畿客棧掌櫃", loc: "jingji", major: false,
      intro: "算盤打得比刀快。",
      destinies: { ally: "消息優先告訴你。", enemy: "抬價刁難。", default: "照常做生意。" } },
    boatman: { id: "boatman", name: "渡船老張", title: "洛河船家", loc: "luohe", major: false,
      intro: "煙袋一鍋，故事一船。",
      destinies: { ally: "渡船免費。", default: "照價收錢。" } },
    // v4 new cast
    tiesuanpan: { id: "tiesuanpan", name: "鐵算盤", title: "古蘭商會帳房", loc: "gulan", major: true,
      intro: "算珠噼啪，目光比刀還利。",
      destinies: { ally: "帳上開綠燈。", dead: "帳房空了。", enemy: "把你記入黑冊。", partner: "合資開鋪。", default: "埋頭結帳。" } },
    baizhi: { id: "baizhi", name: "白芷", title: "藥谷藥童", loc: "yaogu", major: false,
      intro: "袖口沾着藥汁，說話輕聲。",
      destinies: { ally: "為你採藥。", dead: "誤食毒草。", enemy: "不再理你。", apprentice: "跟你學走江湖。", default: "在谷中撿藥。" } },
    hanya: { id: "hanya", name: "寒鴉", title: "青竹林刺客頭目", loc: "qingzhu", major: true,
      intro: "竹笠壓眉，聲如寒鴉。",
      destinies: { ally: "暗中護你。", dead: "竹影中倒下。", enemy: "刺殺令已出。", retired: "收刀隱姓。", default: "隱於竹影。" } },
    leiwanshan: { id: "leiwanshan", name: "雷萬山", title: "雷峰哨千總", loc: "leifeng", major: true,
      intro: "盔甲鋥亮，聲如擂鼓。",
      destinies: { ally: "放行文書常備。", dead: "殉於哨所。", enemy: "通緝你。", promoted: "調任邊關。", default: "嚴守盤查。" } },
    shawuhen: { id: "shawuhen", name: "沙無痕", title: "黃沙驛刀客", loc: "shamo", major: true,
      intro: "刀鞘積沙，眼神高傲。",
      destinies: { ally: "與你論刀。", dead: "葬於沙丘。", enemy: "沙中伏殺。", rival: "約你十年一戰。", default: "坐驛喝茶。" } },
    meifuren: { id: "meifuren", name: "梅夫人", title: "梅花塢莊主", loc: "meihua", major: true,
      intro: "鬢邊一梅，笑意溫和。",
      destinies: { ally: "塢門為你常開。", dead: "梅塢人去樓空。", enemy: "拒你於塢外。", host: "以莊主禮待你。", default: "仍守梅花塢。" } },
    tongxiaoliu: { id: "tongxiaoliu", name: "童小六", title: "青城鎮頑童", loc: "qingcheng", major: false,
      intro: "泥腳赤膊，消息卻靈。",
      destinies: { ally: "專給你報信。", enemy: "朝你扔泥巴。", default: "滿街亂跑。" } },
    gudengpo: { id: "gudengpo", name: "孤燈婆婆", title: "京畿客棧廚娘", loc: "jingji", major: false,
      intro: "灶火旁切薑，耳尖卻靈。",
      destinies: { ally: "夜宵免費。", enemy: "飯裡多放鹽。", default: "守着灶台。" } },
    chixiaxian: { id: "chixiaxian", name: "赤霞仙子", title: "赤霞崖劍客", loc: "chixia", major: true,
      intro: "紅衣臨崖，劍光如霞。",
      destinies: { ally: "授你崖上一式。", dead: "紅衣墜崖。", enemy: "劍指於你。", immortal: "傳說她羽化而去。", default: "仍立赤霞崖。" } },
    wuyinqinmo: { id: "wuyinqinmo", name: "無音琴魔", title: "無音谷怪人", loc: "wuyin", major: true,
      intro: "抱琴無弦，笑得詭異。",
      destinies: { ally: "以無音曲助你。", dead: "琴碎人亡。", enemy: "無音殺意。", mad: "徹底入魔。", default: "仍居無音谷。" } },
    jingandi: { id: "jingandi", name: "景安帝", title: "青梧天子", loc: "hougong", major: true,
      intro: "龍袍未着甲，目光卻鋒利如刀。",
      destinies: { ally: "視你為股肱。", dead: "宮變身殞。", enemy: "下旨緝拿。", married: "冊你為伴駕紅人。", muse: "許你璇璣殿長侍。", default: "端居璇璣殿。" } },
    dongchang_gong: { id: "dongchang_gong", name: "東廠督公", title: "東廠掌印", loc: "dongchang", major: true,
      intro: "黑衣無紋，聲音像翻檔案。沒人知他姓甚名誰——只稱督公。",
      destinies: {
        ally: "廠裡罩你，檔案為你留白。",
        enemy: "廠衛追殺，黑冊硃批。",
        dead: "印落人亡，真名隨骨灰散。",
        vanished: "連影子一併從宮牆消失。",
        muse: "冷血為你裂縫——夜晤不再只談刀。",
        partner: "以廠奴之身，只聽你一人。",
        slave: "墨契已成，他甘為你心腹奴。",
        redeemed: "放下弒兄之刃，與景安帝相認。",
        promoted: "你取其位，舊督公不知所終。",
        default: "坐鎮東廠，無人識其真顏。"
      } },
    yulin_tongling: { id: "yulin_tongling", name: "羽林統領", title: "侍衛營統領", loc: "yulin", major: true,
      intro: "盔纓如火，腰間配刀。",
      destinies: { ally: "編你入羽林。", dead: "殉於宮牆。", enemy: "拒你於營外。", promoted: "舉你為御前。", default: "巡營不輟。" } },
    renyazi: { id: "renyazi", name: "人牙子", title: "暗巷牙郎", loc: "renyazi_alley", major: false,
      intro: "笑面虎，袖裡鎖鏈輕響。",
      destinies: { ally: "你竟與他同行。", dead: "鎖鏈落地。", enemy: "盯上你的骨頭。", default: "潛伏暗巷。" } },
    gongnv_head: { id: "gongnv_head", name: "掌事姑姑", title: "內廷掌事", loc: "neiting", major: true,
      intro: "鬢霜衣青，規矩比刀硬。",
      destinies: { ally: "提你做女官。", dead: "暴卒。", enemy: "罰你跪廊。", teacher: "授你宮規。", default: "巡花廊點卯。" } },
    // v8 homage + palace consorts
    gu_xiaoran: { id: "gu_xiaoran", name: "顧小然", title: "蒼峰棄徒", loc: "chixia", major: true,
      intro: "青衫負劍，眼神倔強如崖松。",
      destinies: { ally: "並肩論劍。", dead: "崖下折劍。", enemy: "劍鋒相對。", rival: "互為宿敵。", default: "仍在蒼峰崖。" } },
    huang_linger: { id: "huang_linger", name: "黃靈兒", title: "機靈孤女", loc: "jingji", major: true,
      intro: "髮間一支木釵，笑裡藏針。",
      destinies: { ally: "為你跑腿打探。", dead: "巷中失蹤。", enemy: "設計坑你。", apprentice: "跟你江湖去。", default: "京畿巷弄玩耍。" } },
    sha_yuyan: { id: "sha_yuyan", name: "沙語嫣", title: "沙洲刀姬", loc: "shamo", major: true,
      intro: "紗巾遮面，刀光比笑意更冷。",
      destinies: { ally: "沙原相護。", dead: "葬於沙丘。", enemy: "刀下不留情。", muse: "為你舞刀。", default: "黃沙驛徘徊。" } },
    powan_zhang: { id: "powan_zhang", name: "破碗長老", title: "破碗幫舵主", loc: "qingcheng", major: true,
      intro: "破碗一敲，市井皆聞。",
      destinies: { ally: "開丐線助你。", dead: "碗碎人亡。", enemy: "全幫封殺。", teacher: "授你棒法。", default: "青城蹲街。" } },
    mu_youlan: { id: "mu_youlan", name: "慕幽蘭", title: "幽墓隱士", loc: "yewang", major: true,
      intro: "白衣如雪，不言喧嘩。",
      destinies: { ally: "授柔掌半式。", dead: "與墓同寂。", enemy: "永拒墓門。", hermit: "更深隱去。", default: "守於墓影。" } },
    hai_kuang: { id: "hai_kuang", name: "海狂生", title: "落英島怪傑", loc: "yanhui", major: true,
      intro: "赤足持扇，語無倫次卻句句玄機。",
      destinies: { ally: "陣法相助。", dead: "葬身怒濤。", enemy: "海上圍殺。", teacher: "傳奇門半卷。", default: "醉臥船頭。" } },
    shen_guifei: { id: "shen_guifei", name: "沈貴妃", title: "璇璣殿貴妃", loc: "hougong", major: true,
      intro: "珠翠滿頭，笑意不達眼底。",
      destinies: { ally: "暗中護你。", dead: "詔獄賜帛。", enemy: "必欲除你。", muse: "引你入局。", default: "後宮周旋。" } },
    liu_zhaoyi: { id: "liu_zhaoyi", name: "柳昭儀", title: "昭儀", loc: "hougong", major: false,
      intro: "柳眉杏眼，聲線柔軟。",
      destinies: { ally: "通風報信。", enemy: "向貴妃獻你。", default: "侍奉左右。" } },
    da_jiangjun: { id: "da_jiangjun", name: "霍鎮北", title: "鎮北大將軍", loc: "yulin", major: true,
      intro: "金甲耀目，殺氣沉於骨。",
      destinies: { ally: "兵符相助。", dead: "陣前殞命。", enemy: "一刀斷頭。", rival: "沙場再見。", default: "坐鎮羽林。" } },

    // ===== v9 cast =====
    ye_qingshan: { id: "ye_qingshan", name: "葉青山", title: "蒼峰劍派掌門", loc: "chixia", major: true, line: "jianghu",
      intro: "青衫長鬚，笑意溫和卻不達眼底。",
      arcs: { main: "主線：蒼峰偽君子——假仁假義，暗害同門以固權。", side: "支線：可助林風／寧書影揭穿其偽。", hidden: "隱藏：與左冷影密約併吞五峰，證據在崖下石室。" },
      destinies: { ally: "暫與你合作。", dead: "偽面撕破，隕於論劍。", enemy: "全派追殺。", exposed: "偽君子之名傳遍江湖。", default: "端坐蒼峰。" } },
    lin_feng: { id: "lin_feng", name: "林風", title: "蒼峰大弟子", loc: "chixia", major: true, line: "jianghu",
      intro: "青衫負劍，笑裡帶三分酒意。",
      arcs: { main: "主線：被逐後浪跡，可拜隱師風清崖。", side: "支線：與任盈蘿情緣／葉小雨青梅。", hidden: "隱藏：手握葉青山害師兄鐵證。" },
      destinies: { ally: "與你把酒論劍。", dead: "醉倒崖下。", enemy: "劍鋒相對。", teacher: "授你浪劍半式。", muse: "情關未了。", default: "仍在赤霞崖徘徊。" } },
    ning_shuying: { id: "ning_shuying", name: "寧書影", title: "蒼峰女俠", loc: "chixia", major: true, line: "jianghu",
      intro: "素衣執劍，目光清明。",
      arcs: { main: "主線：護林風、抑夫偽面。", side: "支線：教你蒼峰女劍。", hidden: "隱藏：早知葉青山不軌，隱忍待證。" },
      destinies: { ally: "並肩護門。", dead: "血染素衣。", enemy: "劍指於你。", teacher: "授女劍一式。", default: "守於蒼峰。" } },
    ye_xiaoyu: { id: "ye_xiaoyu", name: "葉小雨", title: "蒼峰少主", loc: "longmen", major: true, line: "jianghu",
      intro: "雲髻斜簪，語氣嬌蠻卻含憂。",
      arcs: { main: "主線：父命錯嫁／逃婚至龍門。", side: "支線：青梅林風舊情。", hidden: "隱藏：可證葉青山偽書。" },
      destinies: { ally: "認你作知己。", dead: "淚盡而亡。", enemy: "拒見。", married: "與你私奔。", muse: "心繫舊人。", default: "寄居龍門。" } },
    lin_chen: { id: "lin_chen", name: "林辰", title: "滅門遺孤", loc: "qingcheng", major: true, line: "jianghu",
      intro: "少年白衣，袖藏斷刀。",
      arcs: { main: "主線：血仇復仇——仇人指向木高風。", side: "支線：可投破碗幫或蒼峰。", hidden: "隱藏：滅門實另有朝廷黑手。" },
      destinies: { ally: "結為血友。", dead: "仇未報身先死。", enemy: "刀下不留。", hero: "仇報名揚。", default: "青城尋仇。" } },
    ren_yingluo: { id: "ren_yingluo", name: "任盈蘿", title: "紅蓮副座", loc: "honglian", major: true, line: "jianghu",
      intro: "紅衣如火，笑裡藏鋒。",
      arcs: { main: "主線：魔教聖女情緣。", side: "支線：助林風／與周芷雪三角。", hidden: "隱藏：東方孤白篡位之內應線索。" },
      destinies: { ally: "許你教中客座。", dead: "火海焚衣。", enemy: "火毒追杀。", muse: "情絲暗繫。", convert: "引你入紅蓮。", default: "坐鎮紅蓮。" } },
    feng_qingya: { id: "feng_qingya", name: "風清崖", title: "蒼峰隱劍", loc: "wuyin", major: true, line: "jianghu",
      intro: "白髮披肩，劍匣落塵。",
      arcs: { main: "主線：隱師授獨孤一脈劍意（原創致敬）。", side: "支線：收林風為徒。", hidden: "隱藏：當年被葉青山逼隱。" },
      destinies: { ally: "授你隱劍。", dead: "劍匣空置。", enemy: "拒授。", teacher: "收你入門。", hermit: "更深隱去。", default: "隱於無音。" } },
    qu_yangqin: { id: "qu_yangqin", name: "曲陽琴", title: "魔教琴客", loc: "meihua", major: true, line: "jianghu",
      intro: "負琴青衣，步履從容。",
      arcs: { main: "主線：正邪琴交。", side: "支線：與梅塢合譜。", hidden: "隱藏：曲中藏紅蓮密信。" },
      destinies: { ally: "以琴相助。", dead: "弦斷人亡。", enemy: "琴音拒客。", muse: "為你譜曲。", default: "遊走梅塢。" } },
    qiao_fengshan: { id: "qiao_fengshan", name: "喬峰山", title: "破碗前任幫主", loc: "qingcheng", major: true, line: "jianghu",
      intro: "人高馬大，碗大如盆。",
      arcs: { main: "主線：身分危機——身世成謎。", side: "支線：與洪七影、破碗長老。", hidden: "隱藏：邊關血脈，可聯義或自絕於江湖。" },
      destinies: { ally: "結義金蘭。", dead: "聚賢一戰殞命。", enemy: "幫規不容。", sworn: "與你結義。", vanished: "遠走塞外。", default: "蹲於青城。" } },
    duan_muyu: { id: "duan_muyu", name: "段沐雨", title: "南疆遊歷郡主", loc: "luohe", major: true, line: "jianghu",
      intro: "白馬輕裘，一笑傾城。",
      arcs: { main: "主線：多情遊歷。", side: "支線：可與多角情緣交錯。", hidden: "隱藏：段氏一陽指殘訣。" },
      destinies: { ally: "以指法相授。", dead: "客死異鄉。", enemy: "拂袖而去。", muse: "情絲纏繞。", teacher: "授一陽殘訣。", default: "遊於洛河。" } },
    xu_zhuoyun: { id: "xu_zhuoyun", name: "虛竹雲", title: "蒼雲啞徒", loc: "cangyun", major: true, line: "jianghu",
      intro: "僧衣素淨，從不言語。",
      arcs: { main: "主線：意外傳承——珍瓏殘棋開竅。", side: "支線：雲空暗護。", hidden: "隱藏：可成逍遙傳人（原創致敬）。" },
      destinies: { ally: "以掌相護。", dead: "圓寂。", enemy: "閉門不見。", teacher: "傳你棋意掌。", promoted: "繼任住持候補。", default: "寺中掃葉。" } },
    zhang_wujiang: { id: "zhang_wujiang", name: "張無疆", title: "邊關少年", loc: "bianguan", major: true, line: "jianghu",
      intro: "純善眉眼，背負乾糧袋。",
      arcs: { main: "主線：純善糾結——正邪兩難。", side: "支線：聯郭靖義／趙敏嫣。", hidden: "隱藏：乾糧袋藏奇門殘頁。" },
      destinies: { ally: "與你共守邊關。", dead: "中毒而亡。", enemy: "心死遠走。", hero: "名震邊關。", muse: "情關難斷。", default: "邊關徘徊。" } },
    zhao_minyan: { id: "zhao_minyan", name: "趙敏嫣", title: "京畿郡主微服", loc: "jingji", major: true, line: "jianghu",
      intro: "男裝束髮，眼神狡黠。",
      arcs: { main: "主線：郡主混江湖。", side: "支線：試探張無疆／玩家。", hidden: "隱藏：實為京畿郡主，握兵符半枚。" },
      destinies: { ally: "可向你借兵符半枚。", dead: "微服遇刺。", enemy: "京畿通緝。", muse: "情絲暗結。", default: "京畿巷弄。" } },
    zhou_zhi_xue: { id: "zhou_zhi_xue", name: "周芷雪", title: "紅蓮外門", loc: "honglian", major: true, line: "jianghu",
      intro: "素顏紅繩，目光執拗。",
      arcs: { main: "主線：情敵三角。", side: "支線：可助或阻任盈蘿。", hidden: "隱藏：身世與邊關有關。" },
      destinies: { ally: "為你療傷。", dead: "火毒攻心。", enemy: "反目。", muse: "單相思成劫。", default: "紅蓮外門。" } },
    hong_qigong_x: { id: "hong_qigong_x", name: "洪七影", title: "破碗太上", loc: "qingcheng", major: true, line: "jianghu",
      intro: "破衣垢面，笑罵江湖。",
      arcs: { main: "主線：丐幫太上，可授棒法。", side: "支線：考核喬峰山／玩家義氣。", hidden: "隱藏：知喬峰山身世而不說破。" },
      destinies: { ally: "留碗粥給你。", dead: "碗碎人亡。", enemy: "全幫封殺。", teacher: "授棒法真傳。", default: "青城要飯。" } },
    huang_yaoshi_x: { id: "huang_yaoshi_x", name: "黃藥石", title: "落英島主", loc: "yanhui", major: true, line: "jianghu",
      intro: "青袍負手，語帶機鋒。",
      arcs: { main: "主線：東海奇人，奇門陣法。", side: "支線：考校海狂生／玩家。", hidden: "隱藏：與歐陽風毒舊怨。" },
      destinies: { ally: "陣法相助。", dead: "葬身怒濤。", enemy: "海上圍殺。", teacher: "傳奇門半卷。", hermit: "閉島不見。", default: "醉臥煙港。" } },
    ouyang_fengdu: { id: "ouyang_fengdu", name: "歐陽風毒", title: "黃沙毒叟", loc: "shamo", major: true, line: "jianghu",
      intro: "白髮披散，蛇杖叮噹。",
      arcs: { main: "主線：西毒仇敵線。", side: "支線：可拜毒或殺毒。", hidden: "隱藏：逆練毒功走火入魔。" },
      destinies: { ally: "授你毒功半式。", dead: "毒發而亡。", enemy: "沙中伏殺。", mad: "徹底入魔。", teacher: "收毒徒。", default: "黃沙驛徘徊。" } },
    xiao_longyin: { id: "xiao_longyin", name: "小龍吟", title: "幽墓傳人", loc: "yewang", major: true, line: "jianghu",
      intro: "白衣如雪，目若寒星。",
      arcs: { main: "主線：師徒禁忌情對象。", side: "支線：與楊過塵／慕幽蘭／夜塵。", hidden: "隱藏：墓中藏玉女心經殘卷。" },
      destinies: { ally: "授柔掌。", dead: "與墓同寂。", enemy: "永拒墓門。", muse: "禁忌情深。", teacher: "收你為徒。", default: "守於墓影。" } },
    yang_guochen: { id: "yang_guochen", name: "楊過塵", title: "古墓棄徒", loc: "yewang", major: true, line: "jianghu",
      intro: "黑衣桀驁，神情如狼。",
      arcs: { main: "主線：師徒禁忌情。", side: "支線：玄鐵重劍線。", hidden: "隱藏：活死人墓禁制鑰匙。" },
      destinies: { ally: "並肩破墓。", dead: "崖下折劍。", enemy: "劍鋒相對。", muse: "情關難捨。", rival: "互為宿敵。", default: "墓外徘徊。" } },
    guo_jingyi: { id: "guo_jingyi", name: "郭靖義", title: "襄邊義俠", loc: "bianguan", major: true, line: "jianghu",
      intro: "忠厚眉目，掌風沉雄。",
      arcs: { main: "主線：忠厚大俠，邊關禦敵。", side: "支線：與黃蓉芽伴侶。", hidden: "隱藏：可傳降龍十八式殘章。" },
      destinies: { ally: "邊關結義。", dead: "殉於邊關。", enemy: "視你為內奸。", hero: "名震天下。", teacher: "授降龍殘式。", default: "坐鎮邊關。" } },
    huang_rongya: { id: "huang_rongya", name: "黃蓉芽", title: "機靈女俠", loc: "jingji", major: true, line: "jianghu",
      intro: "髮間木釵，笑裡藏針。",
      arcs: { main: "主線：機靈伴侶線。", side: "支線：與黃靈兒可聯手。", hidden: "隱藏：落英奇門家傳。" },
      destinies: { ally: "為你出謀。", dead: "巷中失蹤。", enemy: "設計坑你。", muse: "情絲暗結。", married: "定情共守。", default: "京畿遊走。" } },
    dongfang_gubai: { id: "dongfang_gubai", name: "東方孤白", title: "紅蓮前教主", loc: "honglian", major: true, line: "jianghu",
      intro: "紅衣勝雪，陰陽莫辨。",
      arcs: { main: "主線：篡位隱線。", side: "支線：邪功殘本能誘。", hidden: "隱藏：可助或殺任盈蘿／紅蓮聖女。" },
      destinies: { ally: "許你教中客卿。", dead: "教壇火起。", enemy: "必欲除你。", muse: "亦正亦邪情。", convert: "引你入邪。", default: "隱於教壇後。" } },
    zuo_lengying: { id: "zuo_lengying", name: "左冷影", title: "五峰會盟主", loc: "leifeng", major: true, line: "jianghu",
      intro: "灰袍冷面，聲如冰裂。",
      arcs: { main: "主線：併吞野心。", side: "支線：逼蒼峰／五峰會盟。", hidden: "隱藏：與葉青山密約。" },
      destinies: { ally: "暫聯。", dead: "盟主之位崩。", enemy: "五峰追殺。", rival: "宿敵。", default: "坐鎮雷峰。" } },
    mu_gaofeng_x: { id: "mu_gaofeng_x", name: "木高風", title: "駝背惡霸", loc: "heishui", major: true, line: "jianghu",
      intro: "駝背金爪，笑裡藏刀。",
      arcs: { main: "主線：逼徒仇——逼害林辰師門。", side: "支線：可殺可囚。", hidden: "隱藏：受朝廷密令滅門。" },
      destinies: { ally: "你竟與惡霸同行。", dead: "爪斷人亡。", enemy: "金爪追杀。", default: "潛伏黑水。" } },
    wei_xiaozhou: { id: "wei_xiaozhou", name: "韋小舟", title: "尚膳監小太監", loc: "huanggong", major: true, line: "court",
      intro: "眉眼靈動，說話滴水不漏。",
      arcs: { main: "主線：雙面混混——帝側香主夾心。", side: "支線：夾心於景安帝與青梧會。", hidden: "隱藏：可同時握多枚香主令／情緣。" },
      destinies: { ally: "宮裡罩你。", dead: "暴斃宮牆。", enemy: "密摺參你。", sworn: "結拜兄弟。", muse: "情絲亂纏。", promoted: "升尚膳監掌印。", default: "尚膳監跑腿。" } },
    chen_jinnan_x: { id: "chen_jinnan_x", name: "陳近南影", title: "青梧會總舵", loc: "yanhui", major: true, line: "court",
      intro: "青衫儒巾，目光如炬。",
      arcs: { main: "主線：反朝師尊。", side: "支線：收韋小舟／玩家入會。", hidden: "隱藏：與九難影有舊。" },
      destinies: { ally: "授你會中密信。", dead: "殉於國事。", enemy: "會令追殺。", teacher: "收你為徒。", default: "坐鎮煙港密舵。" } },
    jianning_jun: { id: "jianning_jun", name: "建寧郡主", title: "青梧郡主", loc: "hougong", major: true, line: "court",
      intro: "驕縱明豔，叱聲如鈴。",
      arcs: { main: "主線：驕縱情緣。", side: "支線：強娶／綁架式告白。", hidden: "隱藏：可助或亂宮變。" },
      destinies: { ally: "准你入璇璣。", dead: "暴卒。", enemy: "杖斃你。", married: "強冊為駙。", muse: "情絲霸道。", default: "後宮撒潑。" } },
    hai_dafu_x: { id: "hai_dafu_x", name: "海大富影", title: "慎刑司總管", loc: "dongchang", major: true, line: "court",
      intro: "雙眼矇布，耳極聰。",
      arcs: { main: "主線：盲眼權監。", side: "支線：可鬥東廠督公。", hidden: "隱藏：身懷化骨綿掌。" },
      destinies: { ally: "廠外另開一路。", dead: "慎刑司倒斃。", enemy: "點你死穴。", teacher: "授綿掌。", default: "坐鎮慎刑司。" } },
    ao_baiying: { id: "ao_baiying", name: "鰲拜影", title: "攝政大將", loc: "yulin", major: true, line: "court",
      intro: "金甲熊腰，殺氣騰騰。",
      arcs: { main: "主線：權臣可擒。", side: "支線：羽林兵變／擒鰲。", hidden: "隱藏：與吳三桂影暗通。" },
      destinies: { ally: "暫借兵符。", dead: "囚於天牢。", enemy: "滿門抄斬令。", rival: "沙場再見。", default: "坐鎮羽林。" } },
    shuang_er_x: { id: "shuang_er_x", name: "雙兒影", title: "莊府丫鬟", loc: "jingji", major: true, line: "court",
      intro: "挽髻圍裙，眼神極忠。",
      arcs: { main: "主線：忠心女侍。", side: "支線：可隨侍玩家。", hidden: "隱藏：莊府血案倖存。" },
      destinies: { ally: "貼身照料。", dead: "為主殉。", enemy: "絕望遠走。", apprentice: "跟你江湖。", muse: "默默情深。", default: "京畿等候。" } },
    su_quan_x: { id: "su_quan_x", name: "蘇荃影", title: "神龍教夫人", loc: "yanhui", major: true, line: "court",
      intro: "白衣勝雪，持劍而立。",
      arcs: { main: "主線：島教夫人。", side: "支線：可反洪安通影。", hidden: "隱藏：教主夫人可奪教。" },
      destinies: { ally: "島上護你。", dead: "葬身島礁。", enemy: "神龍令追杀。", muse: "情絲暗結。", convert: "引你入教。", default: "坐鎮神龍分舵。" } },
    hong_antong_x: { id: "hong_antong_x", name: "洪安通影", title: "神龍島教主", loc: "yanhui", major: true, line: "court",
      intro: "蟒袍冠帶，目露凶光。",
      arcs: { main: "主線：島教教主。", side: "支線：海戰／入教考驗。", hidden: "隱藏：可被蘇荃影取而代之。" },
      destinies: { ally: "封你島上客卿。", dead: "教主之位崩。", enemy: "神龍令必殺。", convert: "強收你入教。", default: "端坐神龍壇。" } },
    jiu_nan_x: { id: "jiu_nan_x", name: "九難影", title: "白衣神尼", loc: "tiantai", major: true, line: "court",
      intro: "白衣勝雪，眉目悲憫。",
      arcs: { main: "主線：前朝公主隱修。", side: "支線：授阿珂影武功。", hidden: "隱藏：刺駕——可刺景安帝。" },
      destinies: { ally: "授你禪劍。", dead: "圓寂。", enemy: "刺駕敗露。", teacher: "收你入門。", hermit: "閉關。", default: "天台觀旁靜室。" } },
    a_ke_x: { id: "a_ke_x", name: "阿珂影", title: "神尼徒弟", loc: "qingcheng", major: true, line: "court",
      intro: "絕色明豔，袖藏軟劍。",
      arcs: { main: "主線：美貌刺客。", side: "支線：行刺任務可改。", hidden: "隱藏：身世與前朝有關。" },
      destinies: { ally: "暗中護你。", dead: "刺駕殉。", enemy: "軟劍封喉。", muse: "情關亂刺。", apprentice: "改投你門。", default: "青城徘徊。" } },
    mu_jianping_x: { id: "mu_jianping_x", name: "沐劍屏影", title: "沐府郡主", loc: "neiting", major: true, line: "court",
      intro: "稚氣未脫，腰懸短劍。",
      arcs: { main: "主線：入宮隱身分。", side: "支線：與方怡影同行。", hidden: "隱藏：沐府反朝血脈。" },
      destinies: { ally: "認你作哥哥／姐姐。", dead: "宮變身殞。", enemy: "被逮問斬。", muse: "孩童情深。", default: "內廷花廊。" } },
    fang_yi_x: { id: "fang_yi_x", name: "方怡影", title: "沐府刺客", loc: "neiting", major: true, line: "court",
      intro: "青衣蒙面，目露猶豫。",
      arcs: { main: "主線：入宮行刺。", side: "支線：可被策反。", hidden: "隱藏：與神龍教有關。" },
      destinies: { ally: "放棄行刺。", dead: "刺駕失敗。", enemy: "必欲殺駕。", muse: "情關亂心。", default: "潛伏內廷。" } },
    mao_dongzhu_x: { id: "mao_dongzhu_x", name: "毛東珠影", title: "「太后」", loc: "hougong", major: true, line: "court",
      intro: "鳳冠霞帔，聲口似真。",
      arcs: { main: "主線：假太后。", side: "支線：揭穿／助其竊國。", hidden: "隱藏：實為神龍教细作。" },
      destinies: { ally: "後宮罩你。", dead: "假面撕破賜死。", enemy: "懿旨拿你。", exposed: "假太后之醜傳遍。", default: "端居慈寧。" } },
    duo_long_x: { id: "duo_long_x", name: "多隆影", title: "御前侍衛", loc: "yulin", major: true, line: "court",
      intro: "豪邁大笑，臂膀如猿。",
      arcs: { main: "主線：帝側玩伴。", side: "支線：可助擒鰲拜影。", hidden: "隱藏：對韋小舟極義氣。" },
      destinies: { ally: "御前罩你。", dead: "殉於宮牆。", enemy: "拒你於營。", sworn: "結拜。", default: "巡營不輟。" } },
    suo_etu_x: { id: "suo_etu_x", name: "索額圖影", title: "大學士", loc: "qianqing", major: true, line: "court",
      intro: "朝服端正，城府極深。",
      arcs: { main: "主線：朝臣結拜。", side: "支線：政爭／票擬。", hidden: "隱藏：可聯或賣韋小舟。" },
      destinies: { ally: "票擬助你。", dead: "賜帛。", enemy: "密摺參死。", sworn: "結拜。", default: "乾清宮當值。" } },
    wu_sangui_x: { id: "wu_sangui_x", name: "吳三桂影", title: "平西王", loc: "bianguan", major: true, line: "court",
      intro: "王袍披風，野心寫在眼底。",
      arcs: { main: "主線：藩王野心。", side: "支線：聯清或反清。", hidden: "隱藏：可自立為帝線。" },
      destinies: { ally: "兵馬相助。", dead: "藩王安在。", enemy: "稱兵。", rival: "分庭抗禮。", promoted: "加封。", default: "坐鎮邊關王府行營。" } },
    shi_lang_x: { id: "shi_lang_x", name: "施琅影", title: "水師提督", loc: "yanhui", major: true, line: "court",
      intro: "戎裝佩刀，海風滿面。",
      arcs: { main: "主線：海戰支線。", side: "支線：平台／攻島。", hidden: "隱藏：可聯或鎮神龍島。" },
      destinies: { ally: "水師相助。", dead: "葬身怒濤。", enemy: "海上封殺。", promoted: "加太子太保虛銜。", default: "煙港水營。" } },
    mao_shiba_x: { id: "mao_shiba_x", name: "茅十八影", title: "江洋大盜", loc: "luohe", major: true, line: "court",
      intro: "刀疤橫臉，義氣卻真。",
      arcs: { main: "主線：帶路入京。", side: "支線：可劫囚車救你。", hidden: "隱藏：與青梧會有舊。" },
      destinies: { ally: "帶你入京。", dead: "斬於市。", enemy: "黑道追殺。", sworn: "結拜。", default: "洛河渡潛伏。" } },

  };

  // Fix destinies that got mangled by placeholder cleanup
  NPCS.linqing.intro = "一襲藕荷，琴音如訴。";
  NPCS.linqing.destinies = { ally: "以琴相助。", dead: "曲終人散，葬於塢中。", enemy: "琴音拒客。", muse: "為你譜新曲。", default: "仍在塢中撫琴。" };
  NPCS.murong.destinies = { ally: "船隊助你渡海。", dead: "葬身風暴。", enemy: "海上攔截。", smuggler: "暗中走私助你。", default: "仍泊煙灰港。" };
  NPCS.honglianzhu.destinies = { ally: "許你教中客卿。", dead: "教壇火焚。", enemy: "火毒追杀。", convert: "引你入教。", default: "端坐教壇。" };
  NPCS.daoxuan.destinies = { ally: "授你觀星術緣。", dead: "化鶴而去。", enemy: "逐出觀門。", hermit: "閉關不問世。", default: "觀中演卦。" };
  NPCS.yechen.destinies = { ally: "為你開墓道。", dead: "與墓同葬。", enemy: "永拒入墓。", freed: "解除守陵之咒。", default: "守於墓門。" };
  NPCS.shuiyunzi.destinies = { ally: "授你一招水式。", dead: "湖心空舟。", enemy: "拒見來客。", teacher: "收你散學。", default: "垂釣水雲。" };
  NPCS.meifuren.destinies = { ally: "塢門為你常開。", dead: "梅塢人去樓空。", enemy: "拒你於塢外。", host: "以莊主禮待你。", default: "仍守梅花塢。" };
  NPCS.chixiaxian.destinies = { ally: "授你崖上一式。", dead: "紅衣墜崖。", enemy: "劍指於你。", immortal: "傳說她羽化而去。", default: "仍立赤霞崖。" };
  NPCS.wuyinqinmo.destinies = { ally: "以無音曲助你。", dead: "琴碎人亡。", enemy: "無音殺意。", mad: "徹底入魔。", default: "仍居無音谷。" };

  // v9: annotate backbone NPCs with line/arcs
  (function annotateOldNpcs(){
    const A = {
      jingandi: { line:"court", arcs:{ main:"主線：青梧天子。", side:"支線：羽林／香主。", hidden:"隱藏：與督公為兄弟。" } },
      dongchang_gong: { line:"court", arcs:{ main:"主線：東廠影事。", side:"支線：廠奴／情緣。", hidden:"隱藏：靖王真名。" } },
      honglianzhu: { line:"jianghu", arcs:{ main:"主線：紅蓮教主。", side:"支線：入教。", hidden:"隱藏：東方孤白篡位。" } },
      masteryun: { line:"jianghu", arcs:{ main:"主線：蒼雲住持。", side:"支線：收徒。", hidden:"隱藏：虛竹雲傳承。" } },
      powan_zhang: { line:"jianghu", arcs:{ main:"主線：破碗舵主。", side:"支線：棒法。", hidden:"隱藏：喬峰山身世。" } },
      yechen: { line:"jianghu", arcs:{ main:"主線：守陵。", side:"支線：墓道。", hidden:"隱藏：幽墓同脈。" } },
      mu_youlan: { line:"jianghu", arcs:{ main:"主線：幽墓隱士。", side:"支線：柔掌。", hidden:"隱藏：禁忌情旁觀。" } },
      hai_kuang: { line:"jianghu", arcs:{ main:"主線：落英怪傑。", side:"支線：奇門。", hidden:"隱藏：島主同僚。" } },
      shen_guifei: { line:"court", arcs:{ main:"主線：後宮深心。", side:"支線：宮鬥。", hidden:"隱藏：聯假太后。" } },
      yulin_tongling: { line:"court", arcs:{ main:"主線：衛宮。", side:"支線：羽林。", hidden:"隱藏：對權臣。" } },
      da_jiangjun: { line:"court", arcs:{ main:"主線：鎮北。", side:"支線：兵符。", hidden:"隱藏：對鰲拜影。" } },
      gu_xiaoran: { line:"jianghu", arcs:{ main:"主線：蒼峰棄徒。", side:"支線：論劍。", hidden:"隱藏：與葉青山有隙。" } }
    };
    Object.keys(A).forEach(function(id){
      if (!NPCS[id]) return;
      if (!NPCS[id].line) NPCS[id].line = A[id].line;
      if (!NPCS[id].arcs) NPCS[id].arcs = A[id].arcs;
    });
  })();
  // v9 portraits: mark NPCS with portrait:true when in atlas
  (function annotatePortraits(){
    Object.keys(NPC_PORTRAIT || {}).forEach(function(id){
      if (NPCS[id]) NPCS[id].portrait = "homage:" + id;
    });
  })();

  const BEASTS = {
    beast_baihe: { id: "beast_baihe", name: "雪羽白鶴", kind: "companion", portrait: "beast_baihe" },
    beast_cangying: { id: "beast_cangying", name: "玄穹蒼鷹", kind: "companion", portrait: "beast_cangying" },
    beast_jinchi: { id: "beast_jinchi", name: "金翅雲鵬", kind: "mount", portrait: "beast_jinchi" },
    beast_shengui: { id: "beast_shengui", name: "玄甲神龜", kind: "companion", portrait: "beast_shengui" },
    beast_qinglong: { id: "beast_qinglong", name: "蒼穹青龍", kind: "mount", portrait: "beast_qinglong" },
    beast_zhuque: { id: "beast_zhuque", name: "丹霞朱雀", kind: "mount", portrait: "beast_zhuque" },
    beast_xuanwu: { id: "beast_xuanwu", name: "玄冥玄武", kind: "companion", portrait: "beast_xuanwu" },
    beast_baihu: { id: "beast_baihu", name: "霜紋白虎", kind: "mount", portrait: "beast_baihu" },
    beast_bailang: { id: "beast_bailang", name: "北原白狼", kind: "enemy", portrait: "beast_bailang" },
    beast_heixiong: { id: "beast_heixiong", name: "蒼山黑熊", kind: "enemy", portrait: "beast_heixiong" },
    beast_lingshe: { id: "beast_lingshe", name: "碧鳞靈蛇", kind: "enemy", portrait: "beast_lingshe" },
    beast_qilin: { id: "beast_qilin", name: "瑞光麒麟", kind: "mount", portrait: "beast_qilin" },
    beast_huofeng: { id: "beast_huofeng", name: "赤焰鳳凰", kind: "mount", portrait: "beast_huofeng" },
    beast_yinhu: { id: "beast_yinhu", name: "玄霜銀狐", kind: "companion", portrait: "beast_yinhu" },
    beast_xueyuan: { id: "beast_xueyuan", name: "雪獄魔猿", kind: "enemy", portrait: "beast_xueyuan" },
    beast_jianli: { id: "beast_jianli", name: "青冥劍鯉", kind: "companion", portrait: "beast_jianli" },
    beast_moniu: { id: "beast_moniu", name: "混世魔牛", kind: "enemy", portrait: "beast_moniu" },
    beast_jujiu: { id: "beast_jujiu", name: "大漠巨鷲", kind: "enemy", portrait: "beast_jujiu" },
    beast_leishou: { id: "beast_leishou", name: "雷紋異獸", kind: "enemy", portrait: "beast_leishou" },
    beast_xuebao: { id: "beast_xuebao", name: "天山雪豹", kind: "enemy", portrait: "beast_xuebao" },
    beast_xuanyu: { id: "beast_xuanyu", name: "玄羽神鵰", kind: "companion", portrait: "beast_xuanyu" },
  };

  const ENEMIES = {
    wolf: { name: "野狼", hp: 40, atk: 8, def: 1, agi: 6, exp: 5, gold: 8, loot: ["herb"] },
    bandit: { name: "山賊", hp: 55, atk: 11, def: 3, agi: 5, exp: 8, gold: 15, loot: ["herb", "wine"] },
    elite_bandit: { name: "悍匪", hp: 95, atk: 16, def: 5, agi: 7, exp: 15, gold: 35, loot: ["iron_blade", "pill"] },
    temple_guard: { name: "護寺僧", hp: 75, atk: 12, def: 6, agi: 6, exp: 10, gold: 10, loot: ["pill"] },
    shadow: { name: "黑衣人", hp: 105, atk: 18, def: 4, agi: 12, exp: 20, gold: 40, loot: ["map_fragment", "herb"] },
    toxin_scout: { name: "毒探子", hp: 70, atk: 14, def: 2, agi: 10, exp: 12, gold: 20, loot: ["antidote"], inflict: "neishang" },
    boss_envoy: { name: "神秘使者", hp: 150, atk: 20, def: 8, agi: 9, exp: 30, gold: 80, loot: ["ancient_key", "big_pill"] },
    sea_raider: { name: "海寇", hp: 110, atk: 17, def: 5, agi: 8, exp: 18, gold: 45, loot: ["scale_mail", "sea_chart"] },
    bamboo_assassin: { name: "竹林刺客", hp: 88, atk: 15, def: 3, agi: 14, exp: 16, gold: 30, loot: ["night_dagger", "bamboo_token"], inflict: "dingshen" },
    cult_zealot: { name: "紅蓮教徒", hp: 100, atk: 16, def: 4, agi: 9, exp: 18, gold: 28, loot: ["lotus_invite", "detox"], inflict: "neishang" },
    tomb_shade: { name: "墓影", hp: 130, atk: 19, def: 7, agi: 11, exp: 25, gold: 50, loot: ["tomb_seal", "big_pill"] },
    snow_wolf: { name: "雪原巨狼", hp: 120, atk: 18, def: 6, agi: 10, exp: 22, gold: 35, loot: ["snow_cloak", "bone_soup", "wolf_pelt"] },
    fate_envoy: { name: "夜王餘使", hp: 220, atk: 26, def: 12, agi: 12, exp: 55, gold: 160, loot: ["chapter3_shard", "big_pill", "fate_edict"], inflict: "neishang" },
    corrupt_clerk: { name: "貪墨書吏", hp: 90, atk: 14, def: 4, agi: 6, exp: 14, gold: 40, loot: ["lei_case_scroll", "wine"] },
    mad_song_echo: { name: "奪魂殘響", hp: 140, atk: 20, def: 5, agi: 13, exp: 28, gold: 50, loot: ["nameless_page", "calm_bead"], inflict: "dingshen" },
    bounty_thug: { name: "懸賞要犯", hp: 100, atk: 17, def: 5, agi: 8, exp: 16, gold: 70, loot: ["pill", "wine"] },
    beast_bailang: { name: "北原白狼", hp: 160, atk: 22, def: 8, agi: 11, exp: 32, gold: 60, loot: ["big_pill"], portrait: "beast_bailang" },
    beast_heixiong: { name: "蒼山黑熊", hp: 160, atk: 22, def: 8, agi: 11, exp: 32, gold: 60, loot: ["big_pill"], portrait: "beast_heixiong" },
    beast_lingshe: { name: "碧鳞靈蛇", hp: 160, atk: 22, def: 8, agi: 11, exp: 32, gold: 60, loot: ["big_pill"], portrait: "beast_lingshe" },
    beast_xueyuan: { name: "雪獄魔猿", hp: 160, atk: 22, def: 8, agi: 11, exp: 32, gold: 60, loot: ["big_pill"], portrait: "beast_xueyuan" },
    beast_moniu: { name: "混世魔牛", hp: 160, atk: 22, def: 8, agi: 11, exp: 32, gold: 60, loot: ["big_pill"], portrait: "beast_moniu" },
    beast_jujiu: { name: "大漠巨鷲", hp: 160, atk: 22, def: 8, agi: 11, exp: 32, gold: 60, loot: ["big_pill"], portrait: "beast_jujiu" },
    beast_leishou: { name: "雷紋異獸", hp: 160, atk: 22, def: 8, agi: 11, exp: 32, gold: 60, loot: ["big_pill"], portrait: "beast_leishou" },
    beast_xuebao: { name: "天山雪豹", hp: 160, atk: 22, def: 8, agi: 11, exp: 32, gold: 60, loot: ["big_pill"], portrait: "beast_xuebao" },
  };

  const TRAITS = [
    { id: "brave", name: "勇猛", desc: "武力 +2，俠義 +2", mods: { force: 2, honor: 2 } },
    { id: "swift", name: "靈巧", desc: "身法 +2，福緣 +1", mods: { agi: 2, luck: 1 } },
    { id: "wise", name: "沉穩", desc: "內力上限 +15，悟性 +2", mods: { neiliMax: 15, wit: 2 } },
    { id: "kind", name: "仁心", desc: "聲望 +5，俠義 +3，多草藥", mods: { renown: 5, honor: 3 }, items: ["herb", "herb"] },
    { id: "tough", name: "根骨異稟", desc: "根骨 +3，氣血上限 +15", mods: { bone: 3, hpMax: 15 } },
    { id: "silver", name: "巧舌", desc: "魅力 +3，俠義 +1", mods: { charm: 3, honor: 1 }, items: ["bronze_mirror"] },
    { id: "clear", name: "明察", desc: "眼力 +2，定力 +2，醫術 +1", mods: { perception: 2, focus: 2, medicine: 1 } }
  ];

  const SHOPS = {
    qingcheng: ["herb", "wine", "wood_sword", "cloth", "tiger_talon", "bronze_mirror", "candy", "broken_bowl_staff", "beggar_robe"],
    jingji: ["herb", "pill", "wine", "leather", "jade_ring", "detox", "calm_bead", "focus_incense", "soft_silk_robe"],
    shamo: ["herb", "bone_soup", "iron_blade", "compass_charm", "poison_amulet", "far_glass", "desert_scimitar", "iron_bracer"],
    longmen: ["pill", "dragon_hammer", "leather", "bamboo_spear", "insight_tea", "med_salve", "horse_whistle"],
    yanhui: ["wine", "scale_mail", "night_dagger", "detox", "pill", "eye_drop", "coral_fan"],
    gulan: ["big_pill", "jade_ring", "snow_cloak", "poison_amulet", "compass_charm", "med_pouch", "bronze_mirror"]
  };


  // ===== SOCIAL / STEALTH / PRISON (injected) =====
  const NPC_PROFILES = {
    masteryun: { personality:"merciful", label:"慈悲戒律", martial:88, awareness:92, desc:"高僧，寧捕不殺。", onDetect:"capture", onOpenAttack:"capture", onSteal:"capture", prisonPlace:"cangyun", prisonName:"戒堂禪房", paroleDays:3 },
    heifeng: { personality:"ruthless", label:"寨主狠義", martial:72, awareness:68, desc:"夠狠，暗算多反殺。", onDetect:"attack", onOpenAttack:"attack", onSteal:"attack", prisonPlace:"heishui", prisonName:"黑牢", paroleDays:0 },
    suning: { personality:"healer", label:"仁心醫女", martial:28, awareness:45, desc:"遇險先逃求援。", onDetect:"flee", onOpenAttack:"flee", onSteal:"flee", prisonPlace:null, prisonName:null, paroleDays:0 },
    guqinghan: { personality:"proud", label:"清傲劍心", martial:70, awareness:75, desc:"被辱必拔劍。", onDetect:"duel", onOpenAttack:"duel", onSteal:"rebuke", prisonPlace:"baixue", prisonName:"莊中靜室", paroleDays:2 },
    shenguhong: { personality:"lawful", label:"邊關俠義", martial:74, awareness:80, desc:"執法嚴明。", onDetect:"capture", onOpenAttack:"duel", onSteal:"capture", prisonPlace:"bianguan", prisonName:"邊關哨所", paroleDays:2 },
    linqing: { personality:"timid", label:"柔腸琴心", martial:22, awareness:40, desc:"不善武，遇險逃離。", onDetect:"flee", onOpenAttack:"flee", onSteal:"flee", prisonPlace:null, prisonName:null, paroleDays:0 },
    zhaotie: { personality:"lawful", label:"直腸鐵匠", martial:55, awareness:50, desc:"被欺會反擊關人。", onDetect:"capture", onOpenAttack:"attack", onSteal:"rebuke", prisonPlace:"longmen", prisonName:"鐵匠爐房", paroleDays:1 },
    murong: { personality:"cunning", label:"海港精明", martial:48, awareness:70, desc:"擅設套扣船。", onDetect:"trap", onOpenAttack:"attack", onSteal:"trap", prisonPlace:"yanhui", prisonName:"船艙禁閉", paroleDays:2 },
    honglianzhu: { personality:"ruthless", label:"教主陰冷", martial:80, awareness:85, desc:"火毒伺候。", onDetect:"attack", onOpenAttack:"attack", onSteal:"capture", prisonPlace:"honglian", prisonName:"紅蓮地牢", paroleDays:0 },
    daoxuan: { personality:"merciful", label:"清修道骨", martial:78, awareness:88, desc:"以德化人。", onDetect:"capture", onOpenAttack:"capture", onSteal:"rebuke", prisonPlace:"tiantai", prisonName:"觀中靜室", paroleDays:3 },
    yechen: { personality:"cunning", label:"守陵孤冷", martial:82, awareness:90, desc:"禁制護體。", onDetect:"capture", onOpenAttack:"attack", onSteal:"trap", prisonPlace:"yewang", prisonName:"墓道側室", paroleDays:0 },
    shuiyunzi: { personality:"merciful", label:"散淡隱士", martial:65, awareness:72, desc:"點穴關水閣。", onDetect:"capture", onOpenAttack:"rebuke", onSteal:"rebuke", prisonPlace:"shuiyun", prisonName:"水閣", paroleDays:2 },
    lan_keeper: { personality:"cunning", label:"精於算盤", martial:18, awareness:55, desc:"怕事喊人。", onDetect:"flee", onOpenAttack:"flee", onSteal:"trap", prisonPlace:null, prisonName:null, paroleDays:0 },
    boatman: { personality:"timid", label:"老實船家", martial:15, awareness:30, desc:"遇險求饒。", onDetect:"flee", onOpenAttack:"flee", onSteal:"flee", prisonPlace:null, prisonName:null, paroleDays:0 },
    tiesuanpan: { personality:"cunning", label:"精於算計", martial:25, awareness:78, desc:"帳房精明，善設套。", onDetect:"trap", onOpenAttack:"flee", onSteal:"trap", prisonPlace:"gulan", prisonName:"帳房暗室", paroleDays:2 },
    baizhi: { personality:"healer", label:"膽怯藥童", martial:12, awareness:35, desc:"遇險先逃。", onDetect:"flee", onOpenAttack:"flee", onSteal:"flee", prisonPlace:null, prisonName:null, paroleDays:0 },
    hanya: { personality:"ruthless", label:"刺客冷血", martial:76, awareness:88, desc:"暗算失敗必反殺。", onDetect:"attack", onOpenAttack:"attack", onSteal:"attack", prisonPlace:"qingzhu", prisonName:"竹牢", paroleDays:0 },
    leiwanshan: { personality:"lawful", label:"軍令如山", martial:68, awareness:70, desc:"執法嚴明。", onDetect:"capture", onOpenAttack:"duel", onSteal:"capture", prisonPlace:"leifeng", prisonName:"哨所牢", paroleDays:3 },
    shawuhen: { personality:"proud", label:"刀客傲骨", martial:66, awareness:62, desc:"被辱必決鬥。", onDetect:"duel", onOpenAttack:"duel", onSteal:"rebuke", prisonPlace:"shamo", prisonName:"驛站廂房", paroleDays:1 },
    meifuren: { personality:"merciful", label:"慈心莊主", martial:40, awareness:55, desc:"寧教悔過。", onDetect:"capture", onOpenAttack:"rebuke", onSteal:"rebuke", prisonPlace:"meihua", prisonName:"塢中廂房", paroleDays:2 },
    tongxiaoliu: { personality:"timid", label:"機靈頑童", martial:8, awareness:40, desc:"嚇就跑。", onDetect:"flee", onOpenAttack:"flee", onSteal:"flee", prisonPlace:null, prisonName:null, paroleDays:0 },
    gudengpo: { personality:"cunning", label:"灶下精明", martial:14, awareness:60, desc:"耳目靈通。", onDetect:"flee", onOpenAttack:"flee", onSteal:"trap", prisonPlace:null, prisonName:null, paroleDays:0 },
    chixiaxian: { personality:"proud", label:"崖上傲劍", martial:78, awareness:72, desc:"劍客清高。", onDetect:"duel", onOpenAttack:"duel", onSteal:"rebuke", prisonPlace:"chixia", prisonName:"崖下石室", paroleDays:1 },
    wuyinqinmo: { personality:"cunning", label:"無音怪人", martial:84, awareness:90, desc:"琴音詭譎。", onDetect:"trap", onOpenAttack:"attack", onSteal:"trap", prisonPlace:"wuyin", prisonName:"無音石室", paroleDays:0 },
    jingandi: { personality:"proud", label:"天子威儀", martial:70, awareness:85, desc:"喜怒難測。", onDetect:"capture", onOpenAttack:"duel", onSteal:"capture", prisonPlace:"tianlao", prisonName:"天牢／慎刑司", paroleDays:0 },
    dongchang_gong: { personality:"ruthless", label:"廠衛陰鷙", martial:75, awareness:88, desc:"檔案殺人。", onDetect:"capture", onOpenAttack:"attack", onSteal:"trap", prisonPlace:"dongchang", prisonName:"東廠黑牢", paroleDays:0 },
    yulin_tongling: { personality:"lawful", label:"軍令如山", martial:72, awareness:78, desc:"衛宮護駕。", onDetect:"capture", onOpenAttack:"duel", onSteal:"capture", prisonPlace:"yulin", prisonName:"營中禁閉", paroleDays:2 },
    renyazi: { personality:"ruthless", label:"牙郎冷血", martial:40, awareness:60, desc:"販人為業。", onDetect:"attack", onOpenAttack:"attack", onSteal:"attack", prisonPlace:"renyazi_alley", prisonName:"牙巷囚籠", paroleDays:0 },
    gongnv_head: { personality:"lawful", label:"宮規森嚴", martial:25, awareness:70, desc:"規矩第一。", onDetect:"capture", onOpenAttack:"rebuke", onSteal:"rebuke", prisonPlace:"neiting", prisonName:"罰跪廊", paroleDays:1 },
    gu_xiaoran: { personality:"proud", label:"劍心倔強", martial:68, awareness:65, desc:"論劍必較真。", onDetect:"duel", onOpenAttack:"duel", onSteal:"rebuke", prisonPlace:"chixia", prisonName:"崖下石室", paroleDays:1 },
    huang_linger: { personality:"cunning", label:"機靈狐媚", martial:15, awareness:55, desc:"嚇跑再使壞。", onDetect:"flee", onOpenAttack:"flee", onSteal:"trap", prisonPlace:null, prisonName:null, paroleDays:0 },
    sha_yuyan: { personality:"proud", label:"沙洲傲刀", martial:70, awareness:68, desc:"被辱必拔刀。", onDetect:"duel", onOpenAttack:"duel", onSteal:"rebuke", prisonPlace:"shamo", prisonName:"驛站廂房", paroleDays:1 },
    powan_zhang: { personality:"merciful", label:"破碗義氣", martial:60, awareness:75, desc:"先禮後兵。", onDetect:"capture", onOpenAttack:"rebuke", onSteal:"rebuke", prisonPlace:"qingcheng", prisonName:"破廟柴房", paroleDays:2 },
    mu_youlan: { personality:"merciful", label:"墓中清冷", martial:76, awareness:88, desc:"點穴封穴。", onDetect:"capture", onOpenAttack:"rebuke", onSteal:"trap", prisonPlace:"yewang", prisonName:"墓道側室", paroleDays:2 },
    hai_kuang: { personality:"cunning", label:"島上奇人", martial:72, awareness:80, desc:"陣法困敵。", onDetect:"trap", onOpenAttack:"attack", onSteal:"trap", prisonPlace:"yanhui", prisonName:"船艙", paroleDays:1 },
    shen_guifei: { personality:"cunning", label:"後宮深心", martial:20, awareness:78, desc:"善借刀殺人。", onDetect:"capture", onOpenAttack:"flee", onSteal:"trap", prisonPlace:"hougong", prisonName:"冷宮", paroleDays:0 },
    liu_zhaoyi: { personality:"timid", label:"柔弱昭儀", martial:10, awareness:40, desc:"遇險即逃。", onDetect:"flee", onOpenAttack:"flee", onSteal:"flee", prisonPlace:null, prisonName:null, paroleDays:0 },
    da_jiangjun: { personality:"ruthless", label:"大將殺伐", martial:92, awareness:82, desc:"動輒斬立決。", onDetect:"attack", onOpenAttack:"attack", onSteal:"attack", prisonPlace:"yulin", prisonName:"軍獄", paroleDays:0 },
    ye_qingshan: { personality:"cunning", label:"偽君子掌門", martial:85, awareness:88, desc:"笑裡藏刀。", onDetect:"capture", onOpenAttack:"duel", onSteal:"trap", prisonPlace:"chixia", prisonName:"靜室", paroleDays:1 },
    lin_feng: { personality:"proud", label:"放浪棄徒", martial:78, awareness:70, desc:"劍意灑脫。", onDetect:"duel", onOpenAttack:"duel", onSteal:"rebuke", prisonPlace:"chixia", prisonName:"靜室", paroleDays:1 },
    ning_shuying: { personality:"merciful", label:"掌門妻護徒", martial:72, awareness:80, desc:"掌門妻護徒", onDetect:"capture", onOpenAttack:"rebuke", onSteal:"rebuke", prisonPlace:"chixia", prisonName:"靜室", paroleDays:1 },
    ye_xiaoyu: { personality:"timid", label:"掌門女", martial:35, awareness:55, desc:"掌門女", onDetect:"flee", onOpenAttack:"flee", onSteal:"flee", prisonPlace:"longmen", prisonName:"靜室", paroleDays:0 },
    lin_chen: { personality:"ruthless", label:"血仇遺孤", martial:55, awareness:50, desc:"血仇遺孤", onDetect:"attack", onOpenAttack:"duel", onSteal:"rebuke", prisonPlace:"qingcheng", prisonName:"靜室", paroleDays:1 },
    ren_yingluo: { personality:"cunning", label:"魔教聖女", martial:82, awareness:85, desc:"魔教聖女", onDetect:"attack", onOpenAttack:"duel", onSteal:"trap", prisonPlace:"honglian", prisonName:"靜室", paroleDays:0 },
    feng_qingya: { personality:"merciful", label:"隱師授劍", martial:95, awareness:92, desc:"隱師授劍", onDetect:"capture", onOpenAttack:"rebuke", onSteal:"rebuke", prisonPlace:"wuyin", prisonName:"靜室", paroleDays:3 },
    qu_yangqin: { personality:"merciful", label:"正邪琴客", martial:50, awareness:75, desc:"正邪琴客", onDetect:"flee", onOpenAttack:"rebuke", onSteal:"flee", prisonPlace:"meihua", prisonName:"靜室", paroleDays:1 },
    qiao_fengshan: { personality:"lawful", label:"身分危機", martial:90, awareness:70, desc:"身分危機", onDetect:"duel", onOpenAttack:"duel", onSteal:"rebuke", prisonPlace:"qingcheng", prisonName:"靜室", paroleDays:1 },
    duan_muyu: { personality:"proud", label:"多情郡主", martial:75, awareness:72, desc:"多情郡主", onDetect:"duel", onOpenAttack:"duel", onSteal:"rebuke", prisonPlace:"luohe", prisonName:"靜室", paroleDays:1 },
    xu_zhuoyun: { personality:"merciful", label:"意外傳承", martial:40, awareness:60, desc:"意外傳承", onDetect:"flee", onOpenAttack:"flee", onSteal:"rebuke", prisonPlace:"cangyun", prisonName:"靜室", paroleDays:3 },
    zhang_wujiang: { personality:"merciful", label:"純善少年", martial:70, awareness:55, desc:"純善少年", onDetect:"flee", onOpenAttack:"rebuke", onSteal:"rebuke", prisonPlace:"bianguan", prisonName:"靜室", paroleDays:1 },
    zhao_minyan: { personality:"cunning", label:"微服郡主", martial:45, awareness:78, desc:"微服郡主", onDetect:"trap", onOpenAttack:"flee", onSteal:"trap", prisonPlace:"jingji", prisonName:"靜室", paroleDays:1 },
    zhou_zhi_xue: { personality:"timid", label:"情敵外門", martial:30, awareness:40, desc:"情敵外門", onDetect:"flee", onOpenAttack:"flee", onSteal:"flee", prisonPlace:"honglian", prisonName:"靜室", paroleDays:0 },
    hong_qigong_x: { personality:"merciful", label:"破碗太上", martial:88, awareness:85, desc:"破碗太上", onDetect:"capture", onOpenAttack:"rebuke", onSteal:"rebuke", prisonPlace:"qingcheng", prisonName:"靜室", paroleDays:2 },
    huang_yaoshi_x: { personality:"cunning", label:"東海奇人", martial:92, awareness:95, desc:"東海奇人", onDetect:"trap", onOpenAttack:"attack", onSteal:"trap", prisonPlace:"yanhui", prisonName:"靜室", paroleDays:1 },
    ouyang_fengdu: { personality:"ruthless", label:"西毒仇敵", martial:90, awareness:80, desc:"西毒仇敵", onDetect:"attack", onOpenAttack:"attack", onSteal:"attack", prisonPlace:"shamo", prisonName:"靜室", paroleDays:0 },
    xiao_longyin: { personality:"proud", label:"幽墓傳人", martial:80, awareness:88, desc:"幽墓傳人", onDetect:"capture", onOpenAttack:"duel", onSteal:"trap", prisonPlace:"yewang", prisonName:"靜室", paroleDays:1 },
    yang_guochen: { personality:"proud", label:"古墓棄徒", martial:85, awareness:75, desc:"古墓棄徒", onDetect:"duel", onOpenAttack:"duel", onSteal:"rebuke", prisonPlace:"yewang", prisonName:"靜室", paroleDays:1 },
    guo_jingyi: { personality:"lawful", label:"忠厚大俠", martial:88, awareness:70, desc:"忠厚大俠", onDetect:"capture", onOpenAttack:"duel", onSteal:"rebuke", prisonPlace:"bianguan", prisonName:"靜室", paroleDays:1 },
    huang_rongya: { personality:"cunning", label:"機靈女俠", martial:55, awareness:90, desc:"機靈女俠", onDetect:"trap", onOpenAttack:"flee", onSteal:"trap", prisonPlace:"jingji", prisonName:"靜室", paroleDays:1 },
    dongfang_gubai: { personality:"ruthless", label:"篡位隱線", martial:96, awareness:92, desc:"篡位隱線", onDetect:"attack", onOpenAttack:"attack", onSteal:"trap", prisonPlace:"honglian", prisonName:"靜室", paroleDays:0 },
    zuo_lengying: { personality:"ruthless", label:"併吞野心", martial:80, awareness:85, desc:"併吞野心", onDetect:"capture", onOpenAttack:"attack", onSteal:"rebuke", prisonPlace:"leifeng", prisonName:"靜室", paroleDays:1 },
    mu_gaofeng_x: { personality:"ruthless", label:"逼徒惡霸", martial:65, awareness:55, desc:"逼徒惡霸", onDetect:"attack", onOpenAttack:"attack", onSteal:"attack", prisonPlace:"heishui", prisonName:"靜室", paroleDays:0 },
    wei_xiaozhou: { personality:"cunning", label:"雙面香主", martial:35, awareness:88, desc:"雙面香主", onDetect:"flee", onOpenAttack:"flee", onSteal:"trap", prisonPlace:"huanggong", prisonName:"靜室", paroleDays:1 },
    chen_jinnan_x: { personality:"lawful", label:"反朝師尊", martial:86, awareness:90, desc:"反朝師尊", onDetect:"capture", onOpenAttack:"duel", onSteal:"trap", prisonPlace:"yanhui", prisonName:"密舵暗室", paroleDays:2 },
    jianning_jun: { personality:"proud", label:"驕縱郡主", martial:25, awareness:50, desc:"驕縱郡主", onDetect:"capture", onOpenAttack:"flee", onSteal:"rebuke", prisonPlace:"hougong", prisonName:"冷宮", paroleDays:0 },
    hai_dafu_x: { personality:"ruthless", label:"盲眼權監", martial:88, awareness:95, desc:"盲眼權監", onDetect:"capture", onOpenAttack:"attack", onSteal:"trap", prisonPlace:"dongchang", prisonName:"慎刑司黑牢", paroleDays:0 },
    ao_baiying: { personality:"ruthless", label:"權臣可擒", martial:93, awareness:70, desc:"權臣可擒", onDetect:"attack", onOpenAttack:"attack", onSteal:"attack", prisonPlace:"yulin", prisonName:"軍獄", paroleDays:0 },
    shuang_er_x: { personality:"timid", label:"忠心女侍", martial:20, awareness:45, desc:"忠心女侍", onDetect:"flee", onOpenAttack:"flee", onSteal:"flee", prisonPlace:"jingji", prisonName:"靜室", paroleDays:0 },
    su_quan_x: { personality:"proud", label:"島教夫人", martial:78, awareness:80, desc:"島教夫人", onDetect:"duel", onOpenAttack:"duel", onSteal:"trap", prisonPlace:"yanhui", prisonName:"靜室", paroleDays:1 },
    hong_antong_x: { personality:"ruthless", label:"島教教主", martial:85, awareness:75, desc:"島教教主", onDetect:"attack", onOpenAttack:"attack", onSteal:"trap", prisonPlace:"yanhui", prisonName:"靜室", paroleDays:0 },
    jiu_nan_x: { personality:"merciful", label:"前朝神尼", martial:94, awareness:92, desc:"前朝神尼", onDetect:"capture", onOpenAttack:"rebuke", onSteal:"trap", prisonPlace:"tiantai", prisonName:"觀中靜室", paroleDays:3 },
    a_ke_x: { personality:"cunning", label:"美貌刺客", martial:70, awareness:78, desc:"美貌刺客", onDetect:"attack", onOpenAttack:"attack", onSteal:"trap", prisonPlace:"qingcheng", prisonName:"靜室", paroleDays:1 },
    mu_jianping_x: { personality:"timid", label:"沐府郡主", martial:28, awareness:40, desc:"沐府郡主", onDetect:"flee", onOpenAttack:"flee", onSteal:"flee", prisonPlace:"neiting", prisonName:"罰跪廊", paroleDays:0 },
    fang_yi_x: { personality:"cunning", label:"入宮刺客", martial:62, awareness:70, desc:"入宮刺客", onDetect:"attack", onOpenAttack:"attack", onSteal:"trap", prisonPlace:"neiting", prisonName:"靜室", paroleDays:1 },
    mao_dongzhu_x: { personality:"cunning", label:"假太后", martial:55, awareness:85, desc:"假太后", onDetect:"capture", onOpenAttack:"flee", onSteal:"trap", prisonPlace:"hougong", prisonName:"冷宮", paroleDays:0 },
    duo_long_x: { personality:"lawful", label:"御前玩伴", martial:75, awareness:60, desc:"御前玩伴", onDetect:"capture", onOpenAttack:"duel", onSteal:"trap", prisonPlace:"yulin", prisonName:"營中禁閉", paroleDays:2 },
    suo_etu_x: { personality:"cunning", label:"朝臣結拜", martial:20, awareness:88, desc:"朝臣結拜", onDetect:"capture", onOpenAttack:"flee", onSteal:"trap", prisonPlace:"qianqing", prisonName:"天牢", paroleDays:0 },
    wu_sangui_x: { personality:"ruthless", label:"藩王野心", martial:80, awareness:82, desc:"藩王野心", onDetect:"attack", onOpenAttack:"attack", onSteal:"trap", prisonPlace:"bianguan", prisonName:"軍獄", paroleDays:0 },
    shi_lang_x: { personality:"lawful", label:"水師提督", martial:78, awareness:75, desc:"水師提督", onDetect:"capture", onOpenAttack:"duel", onSteal:"trap", prisonPlace:"yanhui", prisonName:"水營禁閉", paroleDays:2 },
    mao_shiba_x: { personality:"ruthless", label:"帶路大盜", martial:60, awareness:55, desc:"帶路大盜", onDetect:"attack", onOpenAttack:"attack", onSteal:"trap", prisonPlace:"luohe", prisonName:"黑牢", paroleDays:0 },
  };
  function npcProfile(id) {
    const base = NPC_PROFILES[id] || { personality:"lawful", label:"江湖人", martial:40, awareness:45, desc:"", onDetect:"attack", onOpenAttack:"attack", onSteal:"rebuke", prisonPlace:null, prisonName:null, paroleDays:0 };
    if (id === "dongchang_gong" && (flag("donggong_thaw") || flag("donggong_love") || flag("donggong_slave"))) {
      return Object.assign({}, base, {
        personality: flag("donggong_slave") ? "cunning" : "proud",
        label: flag("donggong_truth_known") ? "玄梧・裂冰" : "督公・裂冰",
        desc: flag("donggong_love") ? "對你一人軟化。" : base.desc
      });
    }
    return base;
  }

  // ===== NPC COMMITMENT / GRANTS / UNLOCKS (v5) =====
  const ROLE_LABELS = {
    disciple: "記名弟子", sworn: "結義金蘭", spouse: "定情之人", convert: "教眾",
    partner: "合資夥伴", follower: "隨行", apprentice: "藥童隨行", muse: "知音",
    crew: "船隊客卿", host: "東道貴客", rival: "宿敵論友", student: "散學門生",
    forge_disciple: "鐵匠半徒", tomb_ally: "墓道之交", border_sworn: "邊關結義",
    informant: "情報眼線", cook_friend: "灶下故人", mad_muse: "無音知己",
    sword_disciple: "崖上劍徒", dao_student: "觀星門生",
    slave: "心腹廠奴"
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
    dual_spar: "雙人論劍訓練", temple_parole_boost: "慈悲假釋更快",
    cook_meal_upgrade: "夜宵進階", forever_intel: "永久廉價情報",
    bond_skill_ready: "絆技可用",
    dongchang_slave: "廠衛聽令（情報／開牢／免罰／助戰）"
  };

  const NPC_OFFERS = {
    suning: [{
      id: "disciple_med", role: "disciple", fate: "master",
      intents: ["ask_disciple", "learn_medicine", "ask_teach"],
      keywords: /拜師|拜你為師|收我為徒|做你徒弟|想做你徒弟|請教醫術|學醫|收徒|拜妳為師|跟你學醫/,
      needTrust: 4, needHonor: 0, needMedicine: 0,
      softTrust: 0, softKindLogs: 2,
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
    }],
    jingandi: [{
      id: "consort_bond", role: "spouse", fate: "married",
      intents: ["ask_marry"],
      keywords: /伴駕|定情|傾慕|侍奉左右|願陪|表白|終身/,
      needTrust: 12, needHonor: 10,
      softTrust: 6, softKindLogs: 3,
      rejectSay: "景安帝淡淡道：「朕的後宮，不是江湖客棧。」",
      acceptSay: "他沉吟半晌，擲下硃批：「准。璇璣殿為你留燈。」",
      grants: {
        flags: ["hougong_access", "neiting_access"],
        items: [{ id: "imperial_edict", n: 1 }, { id: "palace_jade", n: 1 }],
        attrs: { charm: 2, renown: 8 },
        unlocks: [],
        renown: 10, trustBonus: 8
      }
    }, {
      id: "muse_bond", role: "muse", fate: "muse",
      intents: ["ask_marry", "ask_teach"],
      keywords: /知己|紅顏|長侍|談心|棋|詩/,
      needTrust: 8, needHonor: 5,
      softTrust: 4, softKindLogs: 2,
      rejectSay: "景安帝搖頭：「時機未到。」",
      acceptSay: "「你可常入璇璣殿——談詩論劍皆可。」",
      grants: {
        flags: ["hougong_access"],
        items: [{ id: "palace_jade", n: 1 }],
        attrs: { charm: 1, wit: 1 },
        unlocks: [],
        renown: 5, trustBonus: 5
      }
    }],
    gongnv_head: [{
      id: "lady_promote", role: "teacher", fate: "teacher",
      intents: ["ask_disciple", "ask_teach", "learn_dao"],
      keywords: /女官|升職|宮規|請教|提拔|作女侍/,
      needTrust: 6, needHonor: 5,
      softTrust: 3, softKindLogs: 2,
      rejectSay: "掌事姑姑：「規矩未熟，莫急。」",
      acceptSay: "她點頭：「從今日起，你作女官行走內廷。」",
      grants: {
        flags: ["neiting_access", "hougong_access"],
        attrs: { charm: 1, focus: 1 },
        unlocks: [],
        renown: 3, trustBonus: 4
      }
    }],
    yulin_tongling: [{
      id: "guard_oath", role: "sworn", fate: "ally",
      intents: ["ask_sworn", "ask_train"],
      keywords: /入羽林|侍衛|護駕|結義|編入|投效/,
      needTrust: 5, needHonor: 8,
      softTrust: 2, softKindLogs: 1,
      rejectSay: "羽林統領：「刀槍尚可，心術未安。」",
      acceptSay: "「羽林缺人。刀交給你。」",
      grants: {
        flags: ["yulin_ok", "palace_entry", "map_huanggong"],
        items: [{ id: "yulin_pass", n: 1 }],
        attrs: { force: 1 },
        unlocks: [],
        renown: 4, trustBonus: 4
      }
    }],
    dongchang_gong: [{
      id: "fanzi_oath", role: "partner", fate: "ally",
      intents: ["ask_partner", "ask_join_cult"],
      keywords: /入東廠|番子|廠衛|投效|情報|黑冊/,
      needTrust: 4, needHonor: -99,
      softTrust: 1, softKindLogs: 0,
      rejectSay: "東廠督公：「你還不夠黑。」",
      acceptSay: "「檔案開一頁給你。從今夜起，你是番子。」",
      grants: {
        flags: ["dongchang_invite", "palace_entry", "map_huanggong", "donggong_interest"],
        items: [{ id: "dongchang_token", n: 1 }],
        attrs: { perception: 1 },
        unlocks: [],
        renown: 3, trustBonus: 3
      }
    }, {
      id: "donggong_muse", role: "muse", fate: "muse",
      intents: ["ask_marry", "ask_partner", "ask_teach"],
      keywords: /傾慕|愛上|喜歡你|知己|動心|夜晤|陪你|表白|談心|撫平|疤痕|寵愛/,
      needTrust: 14, needHonor: -99, needCharm: 12,
      softTrust: 8, softKindLogs: 3,
      rejectSay: "東廠督公冷冷道：「檔案裡不寫情字。滾。」",
      acceptSay: "他沉默良久，聲音第一次不像翻紙：「……今夜，留下。只許你。」",
      grants: {
        flags: ["donggong_love", "donggong_thaw", "donggong_interest"],
        attrs: { charm: 1, perception: 1 },
        unlocks: [],
        renown: 4, trustBonus: 10
      }
    }, {
      id: "donggong_slave_rite", role: "slave", fate: "slave",
      intents: ["ask_partner", "ask_marry"],
      keywords: /廠奴|墨契|奴契|做我的奴|心腹奴|效忠我|只聽我/,
      needTrust: 18, needHonor: -99,
      softTrust: 12, softKindLogs: 4,
      needFateIn: ["muse", "partner", "ally"],
      needFlags: ["donggong_love"],
      rejectSay: "督公：「奴契不是玩笑。你尚未配。」",
      acceptSay: "他割指血於黑冊，低聲道：「墨契成。從今夜起——我是你的廠奴。」",
      grants: {
        flags: ["donggong_slave", "donggong_thaw"],
        unlocks: ["dongchang_slave"],
        attrs: { perception: 1 },
        renown: 5, trustBonus: 12
      }
    }],
    renyazi: [{
      id: "renyazi_deal", role: "enemy", fate: "enemy",
      intents: ["open_attack", "threaten"],
      keywords: /報仇|討債|放開那些人|牙子|人販/,
      needTrust: -99, needHonor: 0,
      softTrust: -99, softKindLogs: 0,
      rejectSay: "人牙子獰笑：「生意歸生意。」",
      acceptSay: "他拔刀：「那就見識見識！」",
      grants: { flags: ["renyazi_ambush"], attrs: {}, unlocks: [], renown: 0, trustBonus: -5 }
    }],
    ye_qingshan: [{
      id: "ye_qingshan_bond", role: "rival", fate: "ally",
      intents: ["ask_sworn", "ask_disciple", "ask_teach", "ask_partner", "ask_marry", "ask_join_cult"],
      keywords: /拜師|入派|蒼峰|掌門/,
      needTrust: 4, needHonor: 0,
      softTrust: 1, softKindLogs: 1,
      rejectSay: "葉青山撫鬚：「心術未正，暫且回去。」",
      acceptSay: "葉青山點頭：「既有誠心，便入蒼峰門牆。」",
      grants: { flags: ["cangfeng_invite", "met_ye_qingshan"], items: [], skills: [], attrs: {}, unlocks: [], renown: 2, trustBonus: 4 }
    }],
    lin_feng: [{
      id: "lin_feng_bond", role: "sworn", fate: "ally",
      intents: ["ask_sworn", "ask_disciple", "ask_teach", "ask_partner", "ask_marry", "ask_join_cult"],
      keywords: /結義|金蘭|兄弟|同盟|請教劍/,
      needTrust: 4, needHonor: 0,
      softTrust: 1, softKindLogs: 1,
      rejectSay: "林風晃晃酒葫蘆：「酒未熱，義未至。」",
      acceptSay: "林風砸葫蘆：「好！今日起你我把酒論劍。」",
      grants: { flags: ["met_lin_feng", "lin_feng_sworn"], items: [], skills: ["cangfeng_sword"], attrs: {}, unlocks: [], renown: 2, trustBonus: 4 }
    }],
    ning_shuying: [{
      id: "ning_shuying_bond", role: "teacher", fate: "teacher",
      intents: ["ask_sworn", "ask_disciple", "ask_teach", "ask_partner", "ask_marry", "ask_join_cult"],
      keywords: /拜師|請教|女劍|收我|蒼峰/,
      needTrust: 4, needHonor: 0,
      softTrust: 1, softKindLogs: 1,
      rejectSay: "寧書影：「時機未到。」",
      acceptSay: "寧書影執劍為禮：「便授你女劍一式。」",
      grants: { flags: ["met_ning_shuying"], items: [], skills: ["cloud_slash"], attrs: {}, unlocks: [], renown: 2, trustBonus: 4 }
    }],
    ye_xiaoyu: [{
      id: "ye_xiaoyu_bond", role: "muse", fate: "muse",
      intents: ["ask_sworn", "ask_disciple", "ask_teach", "ask_partner", "ask_marry", "ask_join_cult"],
      keywords: /定情|知己|幫助|逃婚|保護/,
      needTrust: 4, needHonor: 0,
      softTrust: 1, softKindLogs: 1,
      rejectSay: "葉小雨別過臉：「……你不懂。」",
      acceptSay: "她低聲：「若你肯護我……我便信你一次。」",
      grants: { flags: ["met_ye_xiaoyu", "ye_xiaoyu_trust"], items: [], skills: [], attrs: {}, unlocks: [], renown: 2, trustBonus: 4 }
    }],
    lin_chen: [{
      id: "lin_chen_bond", role: "sworn", fate: "ally",
      intents: ["ask_sworn", "ask_disciple", "ask_teach", "ask_partner", "ask_marry", "ask_join_cult"],
      keywords: /結義|報仇|同盟|幫助|血仇/,
      needTrust: 4, needHonor: 0,
      softTrust: 1, softKindLogs: 1,
      rejectSay: "林辰冷聲：「仇未報，不言義。」",
      acceptSay: "林辰割掌：「血仇共擔——你我便是血友。」",
      grants: { flags: ["met_lin_chen", "lin_chen_sworn"], items: [], skills: [], attrs: {}, unlocks: [], renown: 2, trustBonus: 4 }
    }],
    ren_yingluo: [{
      id: "ren_yingluo_bond", role: "muse", fate: "muse",
      intents: ["ask_sworn", "ask_disciple", "ask_teach", "ask_partner", "ask_marry", "ask_join_cult"],
      keywords: /定情|情緣|入教|同盟|盈蘿/,
      needTrust: 4, needHonor: 0,
      softTrust: 1, softKindLogs: 1,
      rejectSay: "任盈蘿輕笑：「火未燃透。」",
      acceptSay: "她挑起紅袖：「既敢近火——便記下你。」",
      grants: { flags: ["met_ren_yingluo", "lin_ren_love"], items: [], skills: ["lotus_flame"], attrs: {}, unlocks: [], renown: 2, trustBonus: 4 }
    }],
    feng_qingya: [{
      id: "feng_qingya_bond", role: "disciple", fate: "teacher",
      intents: ["ask_sworn", "ask_disciple", "ask_teach", "ask_partner", "ask_marry", "ask_join_cult"],
      keywords: /拜師|請教|隱劍|收我|獨孤|劍意/,
      needTrust: 4, needHonor: 0,
      softTrust: 1, softKindLogs: 1,
      rejectSay: "風清崖閉目：「劍緣未至。」",
      acceptSay: "他啟匣半寸：「可。記住——劍在人在，人亡劍亡。」",
      grants: { flags: ["met_feng_qingya", "disciple_feng"], items: [], skills: ["peak_intent"], attrs: {}, unlocks: [], renown: 2, trustBonus: 4 }
    }],
    qu_yangqin: [{
      id: "qu_yangqin_bond", role: "muse", fate: "muse",
      intents: ["ask_sworn", "ask_disciple", "ask_teach", "ask_partner", "ask_marry", "ask_join_cult"],
      keywords: /知音|譜曲|琴|請教|合奏/,
      needTrust: 4, needHonor: 0,
      softTrust: 1, softKindLogs: 1,
      rejectSay: "曲陽琴輕撥：「曲未成。」",
      acceptSay: "他微笑：「既是知音，這首《笑傲殘章》贈你。」",
      grants: { flags: ["met_qu_yangqin"], items: [], skills: ["qin_strike"], attrs: {}, unlocks: [], renown: 2, trustBonus: 4 }
    }],
    qiao_fengshan: [{
      id: "qiao_fengshan_bond", role: "sworn", fate: "ally",
      intents: ["ask_sworn", "ask_disciple", "ask_teach", "ask_partner", "ask_marry", "ask_join_cult"],
      keywords: /結義|金蘭|兄弟|身世|幫主/,
      needTrust: 4, needHonor: 0,
      softTrust: 1, softKindLogs: 1,
      rejectSay: "喬峰山沉聲：「此事……日後再說。」",
      acceptSay: "他砸碗為盟：「好！今日起你我便是生死兄弟。」",
      grants: { flags: ["met_qiao_fengshan", "qiao_sworn"], items: [], skills: ["jiaohua_quan"], attrs: {}, unlocks: [], renown: 2, trustBonus: 4 }
    }],
    duan_muyu: [{
      id: "duan_muyu_bond", role: "muse", fate: "muse",
      intents: ["ask_sworn", "ask_disciple", "ask_teach", "ask_partner", "ask_marry", "ask_join_cult"],
      keywords: /定情|請教|一陽|指法|郡主/,
      needTrust: 4, needHonor: 0,
      softTrust: 1, softKindLogs: 1,
      rejectSay: "段沐雨掩扇：「心猿未定。」",
      acceptSay: "她點穴為禮：「便授你殘訣半式——莫妄用於情敵。」",
      grants: { flags: ["met_duan_muyu"], items: [], skills: ["void_finger"], attrs: {}, unlocks: [], renown: 2, trustBonus: 4 }
    }],
    xu_zhuoyun: [{
      id: "xu_zhuoyun_bond", role: "disciple", fate: "teacher",
      intents: ["ask_sworn", "ask_disciple", "ask_teach", "ask_partner", "ask_marry", "ask_join_cult"],
      keywords: /拜師|棋|請教|傳承|掌法/,
      needTrust: 4, needHonor: 0,
      softTrust: 1, softKindLogs: 1,
      rejectSay: "虛竹雲搖頭（仍不語）。",
      acceptSay: "他將一枚棋子塞你掌心——棋意掌初成。",
      grants: { flags: ["met_xu_zhuoyun", "xuzhu_open"], items: [], skills: ["cloud_palm"], attrs: {}, unlocks: [], renown: 2, trustBonus: 4 }
    }],
    zhang_wujiang: [{
      id: "zhang_wujiang_bond", role: "sworn", fate: "ally",
      intents: ["ask_sworn", "ask_disciple", "ask_teach", "ask_partner", "ask_marry", "ask_join_cult"],
      keywords: /結義|幫助|乾糧|同盟|無疆/,
      needTrust: 4, needHonor: 0,
      softTrust: 1, softKindLogs: 1,
      rejectSay: "張無疆：「我……還不配。」",
      acceptSay: "他遞過半塊餅：「以後有難，找我。」",
      grants: { flags: ["met_zhang_wujiang"], items: [], skills: [], attrs: {}, unlocks: [], renown: 2, trustBonus: 4 }
    }],
    zhao_minyan: [{
      id: "zhao_minyan_bond", role: "muse", fate: "muse",
      intents: ["ask_sworn", "ask_disciple", "ask_teach", "ask_partner", "ask_marry", "ask_join_cult"],
      keywords: /定情|郡主|兵符|同盟|微服/,
      needTrust: 4, needHonor: 0,
      softTrust: 1, softKindLogs: 1,
      rejectSay: "趙敏嫣哼聲：「本郡主還沒看上你。」",
      acceptSay: "她摘下面罩：「既識破我——便記下這半枚兵符緣。」",
      grants: { flags: ["met_zhao_minyan", "zhao_min_reveal"], items: [], skills: [], attrs: {}, unlocks: [], renown: 2, trustBonus: 4 }
    }],
    zhou_zhi_xue: [{
      id: "zhou_zhi_xue_bond", role: "muse", fate: "muse",
      intents: ["ask_sworn", "ask_disciple", "ask_teach", "ask_partner", "ask_marry", "ask_join_cult"],
      keywords: /定情|療傷|幫助|芷雪/,
      needTrust: 4, needHonor: 0,
      softTrust: 1, softKindLogs: 1,
      rejectSay: "周芷雪低頭：「我……配不上。」",
      acceptSay: "她繫紅繩於你腕：「莫忘今日。」",
      grants: { flags: ["met_zhou_zhi_xue"], items: [], skills: [], attrs: {}, unlocks: [], renown: 2, trustBonus: 4 }
    }],
    hong_qigong_x: [{
      id: "hong_qigong_x_bond", role: "disciple", fate: "teacher",
      intents: ["ask_sworn", "ask_disciple", "ask_teach", "ask_partner", "ask_marry", "ask_join_cult"],
      keywords: /拜師|棒法|叫花|收我|太上/,
      needTrust: 4, needHonor: 0,
      softTrust: 1, softKindLogs: 1,
      rejectSay: "洪七影扒飯：「還沒資格。」",
      acceptSay: "他扔你一根打狗棒：「醜歸醜，打得巧才是真。」",
      grants: { flags: ["met_hong_qigong", "disciple_hongqi"], items: [], skills: ["dogstick_form"], attrs: {}, unlocks: [], renown: 2, trustBonus: 4 }
    }],
    huang_yaoshi_x: [{
      id: "huang_yaoshi_x_bond", role: "disciple", fate: "teacher",
      intents: ["ask_sworn", "ask_disciple", "ask_teach", "ask_partner", "ask_marry", "ask_join_cult"],
      keywords: /拜師|奇門|落英|陣法|島主/,
      needTrust: 4, needHonor: 0,
      softTrust: 1, softKindLogs: 1,
      rejectSay: "黃藥石冷哼：「才學不足。」",
      acceptSay: "他擲一瓣落英：「半卷奇門——莫辱師門。」",
      grants: { flags: ["met_huang_yaoshi", "sea_pass"], items: [], skills: ["odd_formation"], attrs: {}, unlocks: [], renown: 2, trustBonus: 4 }
    }],
    ouyang_fengdu: [{
      id: "ouyang_fengdu_bond", role: "disciple", fate: "teacher",
      intents: ["ask_sworn", "ask_disciple", "ask_teach", "ask_partner", "ask_marry", "ask_join_cult"],
      keywords: /拜師|毒功|蛇杖|收我|毒叟/,
      needTrust: 4, needHonor: 0,
      softTrust: 1, softKindLogs: 1,
      rejectSay: "歐陽風毒：「血不夠毒。」",
      acceptSay: "他迫你服半丸：『既拜我——便與毒為伍。』",
      grants: { flags: ["met_ouyang_fengdu"], items: [], skills: ["iron_sand_palm"], attrs: {}, unlocks: [], renown: 2, trustBonus: 4 }
    }],
    xiao_longyin: [{
      id: "xiao_longyin_bond", role: "muse", fate: "muse",
      intents: ["ask_sworn", "ask_disciple", "ask_teach", "ask_partner", "ask_marry", "ask_join_cult"],
      keywords: /定情|拜師|柔掌|墓|龍吟/,
      needTrust: 4, needHonor: 0,
      softTrust: 1, softKindLogs: 1,
      rejectSay: "小龍吟淡聲：「墓中無情。」",
      acceptSay: "她拂袖：「既入墓緣——便授你柔掌半式。」",
      grants: { flags: ["met_xiao_longyin", "tomb_taboo"], items: [], skills: ["soft_yin_palm"], attrs: {}, unlocks: [], renown: 2, trustBonus: 4 }
    }],
    yang_guochen: [{
      id: "yang_guochen_bond", role: "sworn", fate: "ally",
      intents: ["ask_sworn", "ask_disciple", "ask_teach", "ask_partner", "ask_marry", "ask_join_cult"],
      keywords: /結義|重劍|同盟|過塵|墓/,
      needTrust: 4, needHonor: 0,
      softTrust: 1, softKindLogs: 1,
      rejectSay: "楊過塵冷笑：「你也配？」",
      acceptSay: "他扔你半截玄鐵：「拿去——別死太快。」",
      grants: { flags: ["met_yang_guochen", "tomb_taboo"], items: [], skills: ["void_finger"], attrs: {}, unlocks: [], renown: 2, trustBonus: 4 }
    }],
    guo_jingyi: [{
      id: "guo_jingyi_bond", role: "sworn", fate: "ally",
      intents: ["ask_sworn", "ask_disciple", "ask_teach", "ask_partner", "ask_marry", "ask_join_cult"],
      keywords: /結義|降龍|請教|大俠|邊關/,
      needTrust: 4, needHonor: 0,
      softTrust: 1, softKindLogs: 1,
      rejectSay: "郭靖義：「國難當前，私義且緩。」",
      acceptSay: "他鄭重抱拳：「既願守邊——你我便是兄弟。」",
      grants: { flags: ["met_guo_jingyi", "border_sworn"], items: [], skills: ["xiake_strike"], attrs: {}, unlocks: [], renown: 2, trustBonus: 4 }
    }],
    huang_rongya: [{
      id: "huang_rongya_bond", role: "muse", fate: "muse",
      intents: ["ask_sworn", "ask_disciple", "ask_teach", "ask_partner", "ask_marry", "ask_join_cult"],
      keywords: /定情|計謀|奇門|蓉芽|幫手/,
      needTrust: 4, needHonor: 0,
      softTrust: 1, softKindLogs: 1,
      rejectSay: "黃蓉芽眨眼：「還不夠機靈。」",
      acceptSay: "她塞你一張紙條：「跟我走——別問。」",
      grants: { flags: ["met_huang_rongya"], items: [], skills: ["petal_rain"], attrs: {}, unlocks: [], renown: 2, trustBonus: 4 }
    }],
    dongfang_gubai: [{
      id: "dongfang_gubai_bond", role: "convert", fate: "convert",
      intents: ["ask_sworn", "ask_disciple", "ask_teach", "ask_partner", "ask_marry", "ask_join_cult"],
      keywords: /入教|篡位|孤白|教主|同盟/,
      needTrust: 4, needHonor: 0,
      softTrust: 1, softKindLogs: 1,
      rejectSay: "東方孤白：「尚未配見我。」",
      acceptSay: "其眸光一閃：「既願——便踏這條不歸路。」",
      grants: { flags: ["met_dongfang_gubai", "dongfang_reveal"], items: [], skills: ["lotus_flame"], attrs: {}, unlocks: [], renown: 2, trustBonus: 4 }
    }],
    zuo_lengying: [{
      id: "zuo_lengying_bond", role: "rival", fate: "rival",
      intents: ["ask_sworn", "ask_disciple", "ask_teach", "ask_partner", "ask_marry", "ask_join_cult"],
      keywords: /會盟|同盟|五峰|併吞/,
      needTrust: 4, needHonor: 0,
      softTrust: 1, softKindLogs: 1,
      rejectSay: "左冷影：「滾。」",
      acceptSay: "他擲下一紙盟約：「暫用你——別礙事。」",
      grants: { flags: ["met_zuo_lengying"], items: [], skills: [], attrs: {}, unlocks: [], renown: 2, trustBonus: 4 }
    }],
    mu_gaofeng_x: [{
      id: "mu_gaofeng_x_bond", role: "enemy", fate: "enemy",
      intents: ["ask_sworn", "ask_disciple", "ask_teach", "ask_partner", "ask_marry", "ask_join_cult"],
      keywords: /報仇|討債|惡霸|金爪|殺死/,
      needTrust: 4, needHonor: 0,
      softTrust: 1, softKindLogs: 1,
      rejectSay: "木高風獰笑：「生意歸生意。」",
      acceptSay: "他亮爪：「那就來！」",
      grants: { flags: ["met_mu_gaofeng"], items: [], skills: [], attrs: {}, unlocks: [], renown: 2, trustBonus: 4 }
    }],
    wei_xiaozhou: [{
      id: "wei_xiaozhou_bond", role: "sworn", fate: "ally",
      intents: ["ask_sworn", "ask_disciple", "ask_teach", "ask_partner", "ask_marry", "ask_join_cult"],
      keywords: /結拜|香主|同盟|幫我|小舟/,
      needTrust: 4, needHonor: 0,
      softTrust: 1, softKindLogs: 1,
      rejectSay: "韋小舟擠眼：「還沒到火候。」",
      acceptSay: "他塞你一塊腰牌：「從今日起——有難找小舟。」",
      grants: { flags: ["met_wei_xiaozhou", "court_double"], items: [], skills: [], attrs: {}, unlocks: [], renown: 2, trustBonus: 4 }
    }],
    chen_jinnan_x: [{
      id: "chen_jinnan_x_bond", role: "disciple", fate: "teacher",
      intents: ["ask_sworn", "ask_disciple", "ask_teach", "ask_partner", "ask_marry", "ask_join_cult"],
      keywords: /拜師|入會|青梧|反清|總舵/,
      needTrust: 4, needHonor: 0,
      softTrust: 1, softKindLogs: 1,
      rejectSay: "陳近南影：「心未定，不可入會。」",
      acceptSay: "他授你一枚香主令：「記住——反的是昏政，不是百姓。」",
      grants: { flags: ["met_chen_jinnan", "qingwu_member"], items: [], skills: ["xiake_strike"], attrs: {}, unlocks: [], renown: 2, trustBonus: 4 }
    }],
    jianning_jun: [{
      id: "jianning_jun_bond", role: "spouse", fate: "married",
      intents: ["ask_sworn", "ask_disciple", "ask_teach", "ask_partner", "ask_marry", "ask_join_cult"],
      keywords: /定情|嫁|娶|郡主|駙馬/,
      needTrust: 4, needHonor: 0,
      softTrust: 1, softKindLogs: 1,
      rejectSay: "建寧郡主跺腳：「本宮還沒答應！」",
      acceptSay: "她扔出一方手帕：「從今日起你是本宮的人！」",
      grants: { flags: ["met_jianning", "jianning_love"], items: [], skills: [], attrs: {}, unlocks: [], renown: 2, trustBonus: 4 }
    }],
    hai_dafu_x: [{
      id: "hai_dafu_x_bond", role: "ally", fate: "ally",
      intents: ["ask_sworn", "ask_disciple", "ask_teach", "ask_partner", "ask_marry", "ask_join_cult"],
      keywords: /同盟|綿掌|慎刑|太監|海公/,
      needTrust: 4, needHonor: 0,
      softTrust: 1, softKindLogs: 1,
      rejectSay: "海大富影冷笑：「聽不見。」",
      acceptSay: "他點你肩穴：「記住這條命——欠我的。」",
      grants: { flags: ["met_hai_dafu"], items: [], skills: ["soft_yin_palm"], attrs: {}, unlocks: [], renown: 2, trustBonus: 4 }
    }],
    ao_baiying: [{
      id: "ao_baiying_bond", role: "rival", fate: "enemy",
      intents: ["ask_sworn", "ask_disciple", "ask_teach", "ask_partner", "ask_marry", "ask_join_cult"],
      keywords: /兵符|挑戰|擒拿|攝政|大將/,
      needTrust: 4, needHonor: 0,
      softTrust: 1, softKindLogs: 1,
      rejectSay: "鰲拜影狂笑：「乳臭未乾。」",
      acceptSay: "他拔刀：「有種——羽林見。」",
      grants: { flags: ["met_ao_baiying"], items: [], skills: [], attrs: {}, unlocks: [], renown: 2, trustBonus: 4 }
    }],
    shuang_er_x: [{
      id: "shuang_er_x_bond", role: "apprentice", fate: "apprentice",
      intents: ["ask_sworn", "ask_disciple", "ask_teach", "ask_partner", "ask_marry", "ask_join_cult"],
      keywords: /跟隨|丫鬟|雙兒|照顧|忠心/,
      needTrust: 4, needHonor: 0,
      softTrust: 1, softKindLogs: 1,
      rejectSay: "雙兒影搖頭：「主尚未允。」",
      acceptSay: "她福身：「奴婢……願跟著你。」",
      grants: { flags: ["met_shuang_er", "shuang_er_follow"], items: [], skills: [], attrs: {}, unlocks: [], renown: 2, trustBonus: 4 }
    }],
    su_quan_x: [{
      id: "su_quan_x_bond", role: "muse", fate: "muse",
      intents: ["ask_sworn", "ask_disciple", "ask_teach", "ask_partner", "ask_marry", "ask_join_cult"],
      keywords: /定情|神龍|夫人|入教|蘇荃/,
      needTrust: 4, needHonor: 0,
      softTrust: 1, softKindLogs: 1,
      rejectSay: "蘇荃影：「教規不容。」",
      acceptSay: "她低聲：「若你助我……或可改寫島上命運。」",
      grants: { flags: ["met_su_quan"], items: [], skills: [], attrs: {}, unlocks: [], renown: 2, trustBonus: 4 }
    }],
    hong_antong_x: [{
      id: "hong_antong_x_bond", role: "convert", fate: "convert",
      intents: ["ask_sworn", "ask_disciple", "ask_teach", "ask_partner", "ask_marry", "ask_join_cult"],
      keywords: /入教|神龍|教主|同盟/,
      needTrust: 4, needHonor: 0,
      softTrust: 1, softKindLogs: 1,
      rejectSay: "洪安通影：「還未配。」",
      acceptSay: "他擲下神龍令：「既入教——終身為奴為榮。」",
      grants: { flags: ["met_hong_antong"], items: [], skills: [], attrs: {}, unlocks: [], renown: 2, trustBonus: 4 }
    }],
    jiu_nan_x: [{
      id: "jiu_nan_x_bond", role: "disciple", fate: "teacher",
      intents: ["ask_sworn", "ask_disciple", "ask_teach", "ask_partner", "ask_marry", "ask_join_cult"],
      keywords: /拜師|神尼|刺駕|白衣|公主/,
      needTrust: 4, needHonor: 0,
      softTrust: 1, softKindLogs: 1,
      rejectSay: "九難影合十：「殺業未消，不可授。」",
      acceptSay: "她輕歎：「既執意——便授你一式。莫造殺業。」",
      grants: { flags: ["met_jiu_nan", "jiunan_disciple"], items: [], skills: ["zen_breath"], attrs: {}, unlocks: [], renown: 2, trustBonus: 4 }
    }],
    a_ke_x: [{
      id: "a_ke_x_bond", role: "muse", fate: "muse",
      intents: ["ask_sworn", "ask_disciple", "ask_teach", "ask_partner", "ask_marry", "ask_join_cult"],
      keywords: /定情|刺客|阿珂|軟劍|別刺/,
      needTrust: 4, needHonor: 0,
      softTrust: 1, softKindLogs: 1,
      rejectSay: "阿珂影別過臉：「任務在身。」",
      acceptSay: "她收劍：「……今日，不算。」",
      grants: { flags: ["met_a_ke"], items: [], skills: [], attrs: {}, unlocks: [], renown: 2, trustBonus: 4 }
    }],
    mu_jianping_x: [{
      id: "mu_jianping_x_bond", role: "ally", fate: "ally",
      intents: ["ask_sworn", "ask_disciple", "ask_teach", "ask_partner", "ask_marry", "ask_join_cult"],
      keywords: /幫助|郡主|沐府|保護|姐姐/,
      needTrust: 4, needHonor: 0,
      softTrust: 1, softKindLogs: 1,
      rejectSay: "沐劍屏影：「姑姑不准。」",
      acceptSay: "她拉你袖：「那你要保護我哦。」",
      grants: { flags: ["met_mu_jianping"], items: [], skills: [], attrs: {}, unlocks: [], renown: 2, trustBonus: 4 }
    }],
    fang_yi_x: [{
      id: "fang_yi_x_bond", role: "ally", fate: "ally",
      intents: ["ask_sworn", "ask_disciple", "ask_teach", "ask_partner", "ask_marry", "ask_join_cult"],
      keywords: /策反|別刺|同盟|方怡|沐府/,
      needTrust: 4, needHonor: 0,
      softTrust: 1, softKindLogs: 1,
      rejectSay: "方怡影：「命令難違。」",
      acceptSay: "她卸下面罩：「若你保沐府……我便收手。」",
      grants: { flags: ["met_fang_yi", "fang_yi_turned"], items: [], skills: [], attrs: {}, unlocks: [], renown: 2, trustBonus: 4 }
    }],
    mao_dongzhu_x: [{
      id: "mao_dongzhu_x_bond", role: "ally", fate: "ally",
      intents: ["ask_sworn", "ask_disciple", "ask_teach", "ask_partner", "ask_marry", "ask_join_cult"],
      keywords: /太后|懿旨|同盟|慈寧/,
      needTrust: 4, needHonor: 0,
      softTrust: 1, softKindLogs: 1,
      rejectSay: "「太后」：「大膽。」",
      acceptSay: "她低聲：「既識破……便一榮俱榮。」",
      grants: { flags: ["met_mao_dongzhu", "fake_empress"], items: [], skills: [], attrs: {}, unlocks: [], renown: 2, trustBonus: 4 }
    }],
    duo_long_x: [{
      id: "duo_long_x_bond", role: "sworn", fate: "ally",
      intents: ["ask_sworn", "ask_disciple", "ask_teach", "ask_partner", "ask_marry", "ask_join_cult"],
      keywords: /結拜|兄弟|侍衛|多隆|玩伴/,
      needTrust: 4, needHonor: 0,
      softTrust: 1, softKindLogs: 1,
      rejectSay: "多隆影撓頭：「皇上還沒點頭。」",
      acceptSay: "他砸胸：「好兄弟！喝酒！」",
      grants: { flags: ["met_duo_long"], items: [], skills: [], attrs: {}, unlocks: [], renown: 2, trustBonus: 4 }
    }],
    suo_etu_x: [{
      id: "suo_etu_x_bond", role: "sworn", fate: "ally",
      intents: ["ask_sworn", "ask_disciple", "ask_teach", "ask_partner", "ask_marry", "ask_join_cult"],
      keywords: /結拜|大學士|票擬|同盟|朝臣/,
      needTrust: 4, needHonor: 0,
      softTrust: 1, softKindLogs: 1,
      rejectSay: "索額圖影：「朝局未穩。」",
      acceptSay: "他拱手：「既結拜——朝中有我一份力。」",
      grants: { flags: ["met_suo_etu"], items: [], skills: [], attrs: {}, unlocks: [], renown: 2, trustBonus: 4 }
    }],
    wu_sangui_x: [{
      id: "wu_sangui_x_bond", role: "ally", fate: "ally",
      intents: ["ask_sworn", "ask_disciple", "ask_teach", "ask_partner", "ask_marry", "ask_join_cult"],
      keywords: /藩王|同盟|兵馬|平西|獨立/,
      needTrust: 4, needHonor: 0,
      softTrust: 1, softKindLogs: 1,
      rejectSay: "吳三桂影冷笑：「你還不夠看。」",
      acceptSay: "他擲下一枚虎符：「暫借你三成兵馬——別讓我後悔。」",
      grants: { flags: ["met_wu_sangui", "fan_wang"], items: [], skills: [], attrs: {}, unlocks: [], renown: 2, trustBonus: 4 }
    }],
    shi_lang_x: [{
      id: "shi_lang_x_bond", role: "ally", fate: "ally",
      intents: ["ask_sworn", "ask_disciple", "ask_teach", "ask_partner", "ask_marry", "ask_join_cult"],
      keywords: /水師|海戰|提督|同盟|戰船/,
      needTrust: 4, needHonor: 0,
      softTrust: 1, softKindLogs: 1,
      rejectSay: "施琅影：「潮未至。」",
      acceptSay: "他拍船舷：「准你一艦隊——海戰聽調。」",
      grants: { flags: ["met_shi_lang", "sea_pass"], items: [], skills: [], attrs: {}, unlocks: [], renown: 2, trustBonus: 4 }
    }],
    mao_shiba_x: [{
      id: "mao_shiba_x_bond", role: "sworn", fate: "ally",
      intents: ["ask_sworn", "ask_disciple", "ask_teach", "ask_partner", "ask_marry", "ask_join_cult"],
      keywords: /結拜|帶路|入京|大盜|十八/,
      needTrust: 4, needHonor: 0,
      softTrust: 1, softKindLogs: 1,
      rejectSay: "茅十八影：「還不夠義氣。」",
      acceptSay: "他拽你上船：「走！進京一趟。」",
      grants: { flags: ["met_mao_shiba", "palace_entry", "map_huanggong"], items: [], skills: [], attrs: {}, unlocks: [], renown: 2, trustBonus: 4 }
    }]
  };


  const NPC_RELATIONS = {
    lin_feng: [{ type:"master", target:"ye_qingshan", label:"師徒（決裂）", reveal:"default" }, { type:"master", target:"feng_qingya", label:"隱師授劍", revealFlag:"met_feng_qingya" }, { type:"romance", target:"ren_yingluo", label:"情緣", revealFlag:"lin_ren_love" }, { type:"rival", target:"ye_qingshan", label:"師徒反目", revealFlag:"ye_exposed" }, { type:"romance", target:"ye_xiaoyu", label:"青梅舊情", reveal:"default" }],
    ye_qingshan: [{ type:"family", target:"ye_xiaoyu", label:"父女", reveal:"default" }, { type:"romance", target:"ning_shuying", label:"夫妻（貌合）", reveal:"default" }, { type:"rival", target:"lin_feng", label:"逐徒", revealFlag:"ye_exposed" }, { type:"ally", target:"zuo_lengying", label:"密約併吞", revealFlag:"ye_exposed" }],
    ning_shuying: [{ type:"family", target:"ye_qingshan", label:"夫妻", reveal:"default" }, { type:"ally", target:"lin_feng", label:"護徒", reveal:"default" }],
    ye_xiaoyu: [{ type:"family", target:"ye_qingshan", label:"父女", reveal:"default" }, { type:"romance", target:"lin_feng", label:"青梅", reveal:"default" }],
    feng_qingya: [{ type:"disciple", target:"lin_feng", label:"隱師", revealFlag:"met_feng_qingya" }, { type:"enemy", target:"ye_qingshan", label:"逼隱之仇", revealFlag:"met_feng_qingya" }],
    ren_yingluo: [{ type:"romance", target:"lin_feng", label:"情緣", revealFlag:"lin_ren_love" }, { type:"faction", target:"honglianzhu", label:"紅蓮副座", reveal:"default" }, { type:"rival", target:"zhou_zhi_xue", label:"情敵三角", revealFlag:"met_zhou_zhi_xue" }, { type:"rival", target:"dongfang_gubai", label:"篡位威脅", revealFlag:"dongfang_reveal" }],
    dongfang_gubai: [{ type:"rival", target:"honglianzhu", label:"前教主篡位", revealFlag:"dongfang_reveal" }, { type:"rival", target:"ren_yingluo", label:"副座之爭", revealFlag:"dongfang_reveal" }],
    zhou_zhi_xue: [{ type:"romance", target:"zhang_wujiang", label:"單相思", revealFlag:"met_zhou_zhi_xue" }, { type:"rival", target:"ren_yingluo", label:"情敵", revealFlag:"met_zhou_zhi_xue" }],
    honglianzhu: [{ type:"faction", target:"ren_yingluo", label:"教主—副座", reveal:"default" }, { type:"enemy", target:"dongfang_gubai", label:"篡位之敵", revealFlag:"dongfang_reveal" }],
    yang_guochen: [{ type:"romance", target:"xiao_longyin", label:"師徒禁忌情", revealFlag:"tomb_taboo" }, { type:"master", target:"xiao_longyin", label:"師徒", revealFlag:"tomb_taboo" }],
    xiao_longyin: [{ type:"romance", target:"yang_guochen", label:"禁忌情", revealFlag:"tomb_taboo" }, { type:"master", target:"yang_guochen", label:"師尊", revealFlag:"tomb_taboo" }, { type:"ally", target:"mu_youlan", label:"同門幽墓", reveal:"default" }, { type:"ally", target:"yechen", label:"守陵同道", reveal:"default" }],
    yechen: [{ type:"ally", target:"mu_youlan", label:"守陵／隱士", reveal:"default" }, { type:"ally", target:"xiao_longyin", label:"墓緣", revealFlag:"met_xiao_longyin" }],
    mu_youlan: [{ type:"ally", target:"xiao_longyin", label:"同脈", reveal:"default" }, { type:"ally", target:"yechen", label:"墓中舊識", reveal:"default" }],
    qiao_fengshan: [{ type:"master", target:"hong_qigong_x", label:"太上師尊", reveal:"default" }, { type:"faction", target:"powan_zhang", label:"破碗前後任", reveal:"default" }, { type:"sworn", target:"guo_jingyi", label:"英雄相惜", revealFlag:"met_guo_jingyi" }],
    hong_qigong_x: [{ type:"disciple", target:"qiao_fengshan", label:"太上收徒", reveal:"default" }, { type:"faction", target:"powan_zhang", label:"破碗太上—舵主", reveal:"default" }],
    powan_zhang: [{ type:"faction", target:"hong_qigong_x", label:"舵主—太上", reveal:"default" }, { type:"faction", target:"qiao_fengshan", label:"現任—前任", reveal:"default" }],
    guo_jingyi: [{ type:"romance", target:"huang_rongya", label:"伴侣", reveal:"default" }, { type:"ally", target:"qiao_fengshan", label:"義氣相惜", revealFlag:"met_qiao_fengshan" }, { type:"ally", target:"zhang_wujiang", label:"邊關前輩", reveal:"default" }],
    huang_rongya: [{ type:"romance", target:"guo_jingyi", label:"伴侣", reveal:"default" }, { type:"family", target:"huang_yaoshi_x", label:"父女（致敬）", revealFlag:"met_huang_yaoshi" }],
    huang_yaoshi_x: [{ type:"family", target:"huang_rongya", label:"父女", revealFlag:"met_huang_rongya" }, { type:"enemy", target:"ouyang_fengdu", label:"舊怨", revealFlag:"met_ouyang_fengdu" }, { type:"ally", target:"hai_kuang", label:"島上奇人同僚", reveal:"default" }],
    hai_kuang: [{ type:"ally", target:"huang_yaoshi_x", label:"落英同僚", reveal:"default" }],
    ouyang_fengdu: [{ type:"enemy", target:"huang_yaoshi_x", label:"西毒東邪怨", reveal:"default" }, { type:"enemy", target:"guo_jingyi", label:"邊關死敵", revealFlag:"met_guo_jingyi" }],
    lin_chen: [{ type:"enemy", target:"mu_gaofeng_x", label:"滅門血仇", reveal:"default" }],
    mu_gaofeng_x: [{ type:"enemy", target:"lin_chen", label:"逼徒仇", reveal:"default" }],
    zuo_lengying: [{ type:"ally", target:"ye_qingshan", label:"密約", revealFlag:"ye_exposed" }, { type:"rival", target:"chixiaxian", label:"五峰爭鋒", reveal:"default" }],
    qu_yangqin: [{ type:"ally", target:"linqing", label:"正邪琴交", reveal:"default" }, { type:"faction", target:"honglianzhu", label:"魔教琴客", reveal:"default" }],
    linqing: [{ type:"ally", target:"qu_yangqin", label:"琴交", revealFlag:"met_qu_yangqin" }],
    duan_muyu: [{ type:"ally", target:"qiao_fengshan", label:"遊歷相識", revealFlag:"met_qiao_fengshan" }],
    xu_zhuoyun: [{ type:"master", target:"masteryun", label:"蒼雲師徒", reveal:"default" }],
    masteryun: [{ type:"disciple", target:"xu_zhuoyun", label:"啞徒", reveal:"default" }],
    zhang_wujiang: [{ type:"romance", target:"zhao_minyan", label:"郡主纠结", revealFlag:"met_zhao_minyan" }, { type:"romance", target:"zhou_zhi_xue", label:"情絲", revealFlag:"met_zhou_zhi_xue" }],
    zhao_minyan: [{ type:"romance", target:"zhang_wujiang", label:"試探情緣", revealFlag:"met_zhang_wujiang" }, { type:"ally", target:"huang_rongya", label:"京畿機靈黨", revealFlag:"met_huang_rongya" }],
    jingandi: [{ type:"family", target:"dongchang_gong", label:"兄弟（隱藏）", revealFlag:"donggong_truth_known" }, { type:"ally", target:"wei_xiaozhou", label:"帝側玩伴／結拜", reveal:"default" }, { type:"enemy", target:"jiu_nan_x", label:"刺駕隱敵", revealFlag:"jiunan_assassin" }, { type:"enemy", target:"ao_baiying", label:"權臣可擒", revealFlag:"met_ao_baiying" }],
    dongchang_gong: [{ type:"family", target:"jingandi", label:"皇兄（隱藏）", revealFlag:"donggong_truth_known" }],
    wei_xiaozhou: [{ type:"ally", target:"jingandi", label:"帝側香主", reveal:"default" }, { type:"master", target:"chen_jinnan_x", label:"反朝師尊", revealFlag:"met_chen_jinnan" }, { type:"romance", target:"jianning_jun", label:"驕縱情緣", revealFlag:"jianning_love" }, { type:"romance", target:"shuang_er_x", label:"忠心女侍", revealFlag:"shuang_er_follow" }, { type:"sworn", target:"duo_long_x", label:"御前結拜", revealFlag:"met_duo_long" }, { type:"sworn", target:"suo_etu_x", label:"朝臣結拜", revealFlag:"met_suo_etu" }, { type:"ally", target:"mao_shiba_x", label:"帶路入京", revealFlag:"met_mao_shiba" }],
    chen_jinnan_x: [{ type:"disciple", target:"wei_xiaozhou", label:"香主徒弟", revealFlag:"met_wei_xiaozhou" }, { type:"ally", target:"jiu_nan_x", label:"反朝舊識", revealFlag:"met_jiu_nan" }],
    jianning_jun: [{ type:"romance", target:"wei_xiaozhou", label:"強情", revealFlag:"jianning_love" }, { type:"family", target:"jingandi", label:"皇親郡主", reveal:"default" }],
    hai_dafu_x: [{ type:"rival", target:"dongchang_gong", label:"廠衛對立", reveal:"default" }, { type:"ally", target:"jingandi", label:"盲侍帝側", revealFlag:"met_hai_dafu" }],
    ao_baiying: [{ type:"rival", target:"yulin_tongling", label:"兵權之爭", reveal:"default" }, { type:"rival", target:"da_jiangjun", label:"大將對峙", reveal:"default" }, { type:"ally", target:"wu_sangui_x", label:"藩鎮暗通", revealFlag:"fan_wang" }],
    yulin_tongling: [{ type:"rival", target:"ao_baiying", label:"衛宮對權臣", revealFlag:"met_ao_baiying" }],
    da_jiangjun: [{ type:"rival", target:"ao_baiying", label:"沙場對峙", revealFlag:"met_ao_baiying" }],
    shuang_er_x: [{ type:"romance", target:"wei_xiaozhou", label:"忠侍", revealFlag:"met_wei_xiaozhou" }],
    su_quan_x: [{ type:"romance", target:"hong_antong_x", label:"教主夫人", reveal:"default" }, { type:"rival", target:"hong_antong_x", label:"可奪教", revealFlag:"met_su_quan" }],
    hong_antong_x: [{ type:"romance", target:"su_quan_x", label:"夫人", reveal:"default" }, { type:"enemy", target:"shi_lang_x", label:"海戰對手", revealFlag:"met_shi_lang" }],
    jiu_nan_x: [{ type:"disciple", target:"a_ke_x", label:"師徒", reveal:"default" }, { type:"enemy", target:"jingandi", label:"刺駕", revealFlag:"jiunan_assassin" }, { type:"ally", target:"chen_jinnan_x", label:"前朝遺脈", revealFlag:"met_chen_jinnan" }],
    a_ke_x: [{ type:"master", target:"jiu_nan_x", label:"神尼徒弟", reveal:"default" }, { type:"ally", target:"fang_yi_x", label:"刺客同路", revealFlag:"met_fang_yi" }],
    mu_jianping_x: [{ type:"ally", target:"fang_yi_x", label:"沐府同行", reveal:"default" }, { type:"family", target:"fang_yi_x", label:"府中情誼", reveal:"default" }],
    fang_yi_x: [{ type:"ally", target:"mu_jianping_x", label:"護郡主", reveal:"default" }, { type:"spy", target:"hong_antong_x", label:"島教細作", revealFlag:"met_hong_antong" }],
    mao_dongzhu_x: [{ type:"spy", target:"hong_antong_x", label:"假太后細作", revealFlag:"fake_empress" }, { type:"ally", target:"shen_guifei", label:"後宮聯手", revealFlag:"fake_empress" }],
    shen_guifei: [{ type:"ally", target:"mao_dongzhu_x", label:"聯「太后」", revealFlag:"fake_empress" }, { type:"spy", target:"mao_dongzhu_x", label:"互通聲氣", revealFlag:"fake_empress" }],
    duo_long_x: [{ type:"sworn", target:"wei_xiaozhou", label:"結拜", revealFlag:"met_wei_xiaozhou" }, { type:"ally", target:"jingandi", label:"御前侍衛", reveal:"default" }],
    suo_etu_x: [{ type:"sworn", target:"wei_xiaozhou", label:"結拜", revealFlag:"met_wei_xiaozhou" }, { type:"ally", target:"jingandi", label:"票擬忠臣", reveal:"default" }],
    wu_sangui_x: [{ type:"ally", target:"ao_baiying", label:"藩鎮暗通", revealFlag:"met_ao_baiying" }, { type:"rival", target:"jingandi", label:"藩王野心", revealFlag:"fan_wang" }],
    shi_lang_x: [{ type:"ally", target:"jingandi", label:"水師忠臣", reveal:"default" }, { type:"enemy", target:"hong_antong_x", label:"攻島", revealFlag:"met_hong_antong" }],
    mao_shiba_x: [{ type:"sworn", target:"wei_xiaozhou", label:"帶路結義", revealFlag:"met_wei_xiaozhou" }, { type:"ally", target:"chen_jinnan_x", label:"青梧舊識", revealFlag:"met_chen_jinnan" }],
  };

  function getKnownRelations(npcId) {
    const list = NPC_RELATIONS[npcId] || [];
    return list.filter(function(e){
      if (e.revealFlag) return !!flag(e.revealFlag);
      return true; // reveal default
    });
  }
  function relationTypeLabel(t) {
    const M = { master:"師徒", disciple:"徒弟", romance:"情緣", sworn:"結義", rival:"對立", enemy:"仇敵", ally:"同盟", faction:"同門／派系", family:"親族", spy:"細作" };
    return M[t] || t;
  }
  function showNpcRelationCard(npcId) {
    const n = NPCS[npcId]; if (!n) return;
    const rels = getKnownRelations(npcId);
    let html = "<div class='rel-card'><h3>" + escapeHtml(n.name) + "</h3>";
    html += "<p class='small'>" + escapeHtml(n.title || "") + (n.line ? " · " + (n.line === "court" ? "朝廷線" : "江湖線") : "") + "</p>";
    html += "<p>" + escapeHtml(n.intro || "") + "</p>";
    if (n.arcs) {
      html += "<div class='rel-arcs'><div><b>主線</b>：" + escapeHtml(n.arcs.main || "？？？") + "</div>";
      html += "<div><b>支線</b>：" + escapeHtml(n.arcs.side || "？？？") + "</div>";
      const hid = n.arcs.hidden || "";
      const showHid = !hid || flag("arc_reveal_" + npcId) || (rels.length >= 2);
      html += "<div><b>隱藏</b>：" + (showHid ? escapeHtml(hid) : "？？？") + "</div></div>";
    }
    html += "<h4>已知人物關係</h4>";
    if (!rels.length) html += "<p class='small'>尚未察知更多關係。</p>";
    else {
      html += "<ul class='rel-list'>";
      rels.forEach(function(e){
        const t = NPCS[e.target];
        const tn = t ? t.name : e.target;
        html += "<li><span class='rel-type'>" + escapeHtml(relationTypeLabel(e.type)) + "</span> → <button type='button' class='linkish' data-rel-npc='" + e.target + "'>" + escapeHtml(tn) + "</button> <span class='small'>" + escapeHtml(e.label) + "</span></li>";
      });
      html += "</ul>";
    }
    html += "<div class='btn-row'><button type='button' class='btn' id='rel-close'>關閉</button></div></div>";
    openModal(html);
    const c = document.getElementById("rel-close");
    if (c) c.onclick = function(){ closeModal(); };
    document.querySelectorAll("[data-rel-npc]").forEach(function(b){
      b.onclick = function(){ showNpcRelationCard(b.getAttribute("data-rel-npc")); };
    });
  }

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
    const strong = /ask_disciple|ask_sworn|ask_marry|ask_join_cult|ask_partner|learn_medicine|learn_forge|learn_sword|learn_dao|ask_craft/;
    let best = null, bestScore = -1;
    for (let i = 0; i < list.length; i++) {
      const o = list[i];
      if (offerAlreadyOwned(npcId, o)) continue;
      const byIntent = intent && o.intents && o.intents.indexOf(intent) >= 0;
      const byKw = o.keywords && o.keywords.test(t);
      if (!byIntent && !byKw) continue;
      // Weak intents (ask_teach/ask_train/ask_free_heal…) need keyword confirmation
      if (byIntent && !byKw && intent && !strong.test(intent)) continue;
      let score = (byKw ? 2 : 0) + (byIntent ? 1 : 0);
      if (/marry|spouse/.test(o.id) || o.role === "spouse") score += 2;
      if (score > bestScore) { bestScore = score; best = o; }
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
    if (offer.needCharm && (st.charm || S.charm || 0) < offer.needCharm) {
      const darkAlt = npcId === "dongchang_gong" && (
        flag("eunuch") || S.palaceRole === "dongchang" || S.palaceRole === "dongchang_boss" ||
        flag("donggong_saved_once") || (S.donggongTrust || 0) >= 45 || flag("donggong_thaw")
      );
      if (!darkAlt) reasons.push("魅力不足");
    }
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
    
    if (offer.id === "consort_bond" || offer.role === "spouse" && npcId === "jingandi") {
      if (typeof setPalaceRole === "function") setPalaceRole("consort");
    }
    if (offer.id === "lady_promote" && typeof setPalaceRole === "function") setPalaceRole("lady");
    if (offer.id === "guard_oath" && typeof setPalaceRole === "function") setPalaceRole("guard");
    if (offer.id === "fanzi_oath" && typeof setPalaceRole === "function") { setPalaceRole("dongchang"); if (typeof adjustKarma==="function") adjustKarma(-2,"入東廠"); }
    if (npcId === "dongchang_gong" && (offer.id === "donggong_muse" || offer.id === "donggong_slave_rite")) {
      if (typeof bumpDonggongTrust === "function") bumpDonggongTrust(offer.id === "donggong_slave_rite" ? 25 : 15, "墨契／動心");
      ensureQuests();
      if (S.quests.side_donggong_shadow) {
        if (offer.id === "donggong_muse") S.quests.side_donggong_shadow.step = Math.max(S.quests.side_donggong_shadow.step || 0, 2);
        if (offer.id === "donggong_slave_rite") S.quests.side_donggong_shadow.step = Math.max(S.quests.side_donggong_shadow.step || 0, 3);
      }
    }
try { saveGameSilent(); } catch (e) {}
    try {
      if (offer.fate === "married" || offer.fate === "muse" || offer.fate === "slave" ||
          offer.role === "spouse" || offer.role === "muse" || offer.role === "mad_muse" || offer.role === "slave" ||
          (npcId === "dongchang_gong" && (flag("donggong_love") || flag("donggong_slave")))) {
        if (typeof onDatingStarted === "function") onDatingStarted(npcId);
      }
    } catch (e) {}
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
      } else if (o.role === "slave" || /slave_rite|墨契|廠奴/.test(o.id)) {
        label = "立廠奴墨契"; ctext = "立下墨契，做我的心腹廠奴";
      } else if (o.id === "donggong_muse") {
        label = "夜晤動心"; ctext = "我想留下陪你，傾慕已久";
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

  // ---------- STATE ----------
  function defaultFates() {
    const f = {};
    Object.keys(NPCS).forEach(id => { f[id] = "default"; });
    return f;
  }
  function defaultFactionRep() {
    const r = {};
    Object.keys(FACTIONS).forEach(id => { r[id] = 0; });
    return r;
  }
  function defaultState() {
    return {
      name: "", trait: "", loc: "hub",
      hp: 100, hpMax: 100, neili: 40, neiliMax: 40,
      force: 10, agi: 8, def: 2,
      bone: 5, wit: 5, luck: 5, honor: 10, antitoxin: 3,
      charm: 5, focus: 5, medicine: 3, perception: 5,
      renown: 0, gold: 50, level: 1, exp: 0,
      skills: ["basic_strike"],
      inv: { herb: 2, cloth: 1, wood_sword: 1 },
      equip: { weapon: null, armor: null, accessory: null },
      faction: null,
      factionRep: defaultFactionRep(),
      flags: {},
      fates: defaultFates(),
      quests: {},
      chapter: 0, day: 1, log: [],
      combatBuff: { atk: 0, agi: 0, def: 0, turns: 0 },
      statuses: [],
      npcMem: {},
      bagFilter: "all",
      prison: null,
      tempBuffs: { focus: 0, perception: 0, charm: 0 },
      bonds: {},
      unlockDays: {},
      forgeBonus: 0,
      investGold: 0,
      companion: null,
      companionSwapDay: 0,
      cookMealLevel: 0,
      endingId: null,
      ending: null,
      bountyTarget: null,
      ch3HealUsed: false,
      karma: 0,
      gender: "男",
      disguise: null,
      palaceRole: null,
      trauma: 0,
      emperorFavor: 0,
      sceneOverride: null,
      palaceHeat: 0,
      palaceMood: "平靜",
      palaceDayEvents: [],
      courtTrack: "none",
      courtPin: 0,
      courtGrade: 0,
      courtPrestige: 0,
      courtZheng: false,
      eunuchAssignedHall: null,
      serveTargetId: null,
      pendingDeal: null,
      courtQuests: {},
      courtLastQuestDay: 0,
      courtFavorPromoDay: 0,
      courtDealDay: 0,
      courtDoneQuests: [],
      donggongTrust: 0,
      datingLogs: {},
      datingAff: {},
      loverPing: {},
      loverPingDay: 0,
      loverDateQuest: null,
      dcJoined: false,
      dcRank: 0,
      dcPrestige: 0,
      dcHeat: 0,
      dcSubs: [],
      dcArrests: {},
      dcJoinPath: null,
      dcDisguiseOk: false,
      dcLastOpDay: 0,
      pendingTrial: null,
      civQuestDone: {},
      saveVer: 8
    };
  }

  let S = defaultState();
  let settings = loadSettings();
  let ui = { tab: "map", combat: null, talking: null, toastQuiet: false };

  function loadSettings() {
    try {
      return Object.assign({
        deepseekKey: "", deepseekUrl: "https://api.deepseek.com", model: "deepseek-v4-pro"
      }, JSON.parse(localStorage.getItem(SETTINGS_KEY) || "{}"));
    } catch (e) {
      return { deepseekKey: "", deepseekUrl: "https://api.deepseek.com", model: "deepseek-v4-pro" };
    }
  }
  function saveSettings() {
    localStorage.setItem(SETTINGS_KEY, JSON.stringify({
      deepseekKey: settings.deepseekKey || "",
      deepseekUrl: settings.deepseekUrl || "https://api.deepseek.com",
      model: (typeof normalizeDeepseekModel==="function"?normalizeDeepseekModel(settings.model):settings.model) || "deepseek-v4-pro"
    }));
  }

  // ---------- HELPERS ----------
  let toastTimer = null;
  function toast(msg, force) {
    if (ui.toastQuiet && !force) return;
    const el = document.getElementById("toast");
    el.textContent = msg;
    el.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => el.classList.remove("show"), 1800);
  }
  function updateKbInset() {
    const root = document.documentElement;
    const vv = window.visualViewport;
    if (!vv) {
      root.style.setProperty("--kb", "0px");
      return;
    }
    const kb = Math.max(0, Math.round(window.innerHeight - vv.height - vv.offsetTop));
    root.style.setProperty("--kb", kb + "px");
  }
  function bindViewportKb() {
    if (bindViewportKb.done) return;
    bindViewportKb.done = true;
    updateKbInset();
    if (window.visualViewport) {
      window.visualViewport.addEventListener("resize", updateKbInset);
      window.visualViewport.addEventListener("scroll", updateKbInset);
    }
    window.addEventListener("resize", updateKbInset);
  }
  function lockBodyForModal() {
    if (document.body.classList.contains("modal-open")) return;
    document.body.dataset.scrollY = String(window.scrollY || 0);
    document.body.classList.add("modal-open");
    document.body.style.top = "-" + (document.body.dataset.scrollY || "0") + "px";
  }
  function unlockBodyForModal() {
    if (!document.body.classList.contains("modal-open")) return;
    const y = parseInt(document.body.dataset.scrollY || "0", 10) || 0;
    document.body.classList.remove("modal-open");
    document.body.style.top = "";
    window.scrollTo(0, y);
  }
  function closeModal() {
    const mb = document.getElementById("modal-bg");
    if (mb) mb.classList.remove("show");
    unlockBodyForModal();
    document.documentElement.style.setProperty("--kb", "0px");
    try { if (S) S.sceneOverride = null; } catch (e) {}
  }
  function openModal(html) {
    bindViewportKb();
    const body = document.getElementById("modal-body");
    body.innerHTML = html;
    const isTalk = /talk-sheet/.test(html);
    body.classList.toggle("modal-talk", isTalk);
    body.classList.toggle("modal-scroll", !isTalk);
    document.getElementById("modal-bg").classList.add("show");
    lockBodyForModal();
    updateKbInset();
  }
  function bindComposerFocus(inputEl) {
    if (!inputEl || inputEl.dataset.kbBound) return;
    inputEl.dataset.kbBound = "1";
    const keepVisible = () => {
      updateKbInset();
      requestAnimationFrame(() => {
        try {
          inputEl.scrollIntoView({ block: "nearest", behavior: "smooth" });
        } catch (e) {
          inputEl.scrollIntoView(false);
        }
        const sheet = inputEl.closest(".talk-sheet");
        const scroll = sheet && sheet.querySelector(".talk-scroll");
        if (scroll) scroll.scrollTop = scroll.scrollHeight;
      });
    };
    inputEl.addEventListener("focus", () => {
      setTimeout(keepVisible, 50);
      setTimeout(keepVisible, 320);
    });
    inputEl.addEventListener("blur", () => setTimeout(updateKbInset, 80));
  }
  function escapeHtml(s) {
    return String(s || "").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;");
  }
  function hasItem(id, n) { return (S.inv[id] || 0) >= (n || 1); }
  function addItem(id, n) {
    n = n || 1;
    S.inv[id] = (S.inv[id] || 0) + n;
    if (S.inv[id] <= 0) delete S.inv[id];
    if (n > 0) {
      if (id === "map_fragment") setFlag("map_jianzhong");
      if (id === "jade_pendant") setFlag("invite_baixue");
      if (id === "sea_chart") setFlag("sea_pass");
      if (id === "bamboo_token") setFlag("bamboo_map");
      if (id === "lotus_invite") setFlag("honglian_invite");
      if (id === "dao_scroll") setFlag("dao_invite");
      if (id === "lake_letter") setFlag("lake_invite");
    }
  }
  function removeItem(id, n) {
    n = n || 1;
    if (!hasItem(id, n)) return false;
    S.inv[id] -= n;
    if (S.inv[id] <= 0) delete S.inv[id];
    return true;
  }
  function setFlag(k, v) { S.flags[k] = v === undefined ? true : v; }
  function flag(k) { return !!S.flags[k]; }
  function setFate(npcId, fate) {
    S.fates[npcId] = fate;
    if ((npcId === "yechen" || npcId === "mu_youlan") && (fate === "ally" || fate === "teacher" || fate === "freed")) setFlag("tomb_ally");
    if ((npcId === "murong" || npcId === "hai_kuang") && (fate === "ally" || fate === "teacher" || fate === "smuggler")) setFlag("sea_pass");
    if (npcId === "powan_zhang" && (fate === "ally" || fate === "teacher")) S.factionRep.powan_bang = (S.factionRep.powan_bang || 0) + 5;
    toast(NPCS[npcId].name + "命運 → " + fateLabel(fate), true);
    if (fate === "married" || fate === "muse" || fate === "slave") {
      try { if (typeof onDatingStarted === "function") onDatingStarted(npcId); } catch (e) {}
    }
  }
  function fateLabel(f) {
    const m = { ally:"盟友", dead:"身亡", enemy:"仇敵", vanished:"失踪", redeemed:"退隐", married:"定情", retired:"退隐", hero:"成名", muse:"知音", master:"師徒", smuggler:"私盟", convert:"入教", hermit:"閉關", freed:"解咒", teacher:"散學", partner:"合資", apprentice:"隨行", promoted:"升遷", rival:"宿敵", host:"東道", immortal:"傳說", mad:"入魔", slave:"廠奴", exposed:"揭穿", sworn:"結義", default:"未定" };
    return m[f] || f;
  }
  function locUnlocked(loc) {
    // 汗血寶馬：未關押時全圖開啟（關押仍以牢獄規則為準；淨身房除外）
    if (hasItem("hanxue_horse") && !(typeof isImprisoned === "function" && isImprisoned()) && loc.id !== "jingshen" && loc.id !== "xingxing_tai" && loc.id !== "yongxing_shi") return true;
    if (loc.id === "huanggong") return flag("palace_access") || flag("palace_entry") || flag("map_huanggong") || !!S.palaceRole || flag("eunuch") || hasItem("yulin_pass") || hasItem("dongchang_token") || hasItem("imperial_token") || hasItem("imperial_edict");
    if (loc.id === "neiting") return flag("neiting_access") || !!S.palaceRole || flag("eunuch") || hasItem("imperial_token") || hasItem("imperial_edict");
    if (loc.id === "dongchang") return flag("dongchang_invite") || S.palaceRole === "dongchang" || S.palaceRole === "eunuch" || hasItem("dongchang_token");
    if (loc.id === "yulin") return flag("yulin_ok") || hasItem("yulin_pass") || S.palaceRole === "guard" || S.palaceRole === "official";
    if (loc.id === "hougong") return flag("hougong_access") || S.fates.jingandi === "married" || S.fates.jingandi === "muse" || S.palaceRole === "consort" || S.palaceRole === "maid" || hasItem("imperial_token");
    if (loc.id === "renyazi_alley") return flag("heard_renyazi") || flag("renyazi_ambush") || flag("eunuch") || (S.renown || 0) >= 12 || flag("karma_bounty");
    if (typeof palaceSubUnlocked === "function") {
      const sub = palaceSubUnlocked(loc.id);
      if (sub !== null) return sub;
    }

    if (loc.unlock) return true;
    if (loc.needItem && !hasItem(loc.needItem)) return false;
    if (loc.needRenown && S.renown < loc.needRenown) return false;
    if (loc.needFlag) {
      if (loc.needFlag === "rep_30") return S.renown >= 30 || flag("rep_30");
      if (loc.needFlag === "palace_access") return locUnlocked({ id: "huanggong", unlock: false });
      if (loc.needFlag === "eunuch_path") return flag("eunuch") || flag("sold_as_eunuch") || flag("eunuch_path") || S.palaceRole === "eunuch" || S.palaceRole === "dongchang" || (S.karma || 0) <= -40 || (S.courtTrack === "eunuch");
      return flag(loc.needFlag);
    }
    return true;
  }
  function effectiveStats() {
    let force = S.force, agi = S.agi, def = S.def, neiliMax = S.neiliMax, hpMax = S.hpMax;
    let bone = S.bone, wit = S.wit, luck = S.luck, honor = S.honor, antitoxin = S.antitoxin;
    let charm = S.charm || 0, focus = S.focus || 0, medicine = S.medicine || 0, perception = S.perception || 0;
    if (flag("eunuch")) { force = Math.max(1, force - 2); agi = Math.max(1, agi - 1); charm = Math.max(0, charm - 1); }
    ["weapon", "armor", "accessory"].forEach(slot => {
      const id = S.equip[slot];
      const it = id && ITEMS[id];
      if (!it) return;
      force += it.atk || it.force || 0;
      agi += it.agi || 0;
      def += it.def || 0;
      neiliMax += it.neiliMax || 0;
      bone += it.bone || 0;
      wit += it.wit || 0;
      luck += it.luck || 0;
      honor += it.honor || 0;
      antitoxin += it.antitoxin || 0;
      charm += it.charm || 0;
      focus += it.focus || 0;
      medicine += it.medicine || 0;
      perception += it.perception || 0;
    });
    if (S.equip.weapon === "frost_blade" && S.equip.armor === "snow_cloak") {
      force += 2; antitoxin += 2;
    }
    if (S.combatBuff && S.combatBuff.turns > 0) {
      force += S.combatBuff.atk || 0;
      agi += S.combatBuff.agi || 0;
      def += S.combatBuff.def || 0;
    }
    const tb = S.tempBuffs || {};
    focus += tb.focus || 0;
    perception += tb.perception || 0;
    charm += tb.charm || 0;
    hpMax += Math.floor(bone * 2);
    neiliMax += Math.floor(wit);
    force += (S.forgeBonus || 0);
    if (typeof hasUnlock === "function" && hasUnlock("cult_rite")) antitoxin += 2;
    if (typeof hasUnlock === "function" && hasUnlock("lake_form")) agi += 1;
    if (typeof hasUnlock === "function" && hasUnlock("scarlet_sword")) force += 1;
    return { force, agi, def, neiliMax, hpMax, bone, wit, luck, honor, antitoxin, charm, focus, medicine, perception };
  }
  function clamp() {
    const e = effectiveStats();
    if (S.hp > e.hpMax) S.hp = e.hpMax;
    if (S.neili > e.neiliMax) S.neili = e.neiliMax;
    if (S.hp < 0) S.hp = 0;
  }
  function migrateSave(raw) {
    const base = defaultState();
    const data = Object.assign(base, raw);
    data.equip = Object.assign({ weapon: null, armor: null, accessory: null }, raw.equip || {});
    data.factionRep = Object.assign(defaultFactionRep(), raw.factionRep || {});
    data.fates = Object.assign(defaultFates(), raw.fates || {});
    data.npcMem = raw.npcMem || {};
    data.statuses = raw.statuses || [];
    data.prison = raw.prison || null;
    data.tempBuffs = Object.assign({ focus: 0, perception: 0, charm: 0 }, raw.tempBuffs || {});
    data.bonds = raw.bonds && typeof raw.bonds === "object" ? raw.bonds : {};
    data.unlockDays = raw.unlockDays && typeof raw.unlockDays === "object" ? raw.unlockDays : {};
    data.forgeBonus = typeof raw.forgeBonus === "number" ? raw.forgeBonus : 0;
    data.investGold = typeof raw.investGold === "number" ? raw.investGold : 0;
    data.companion = raw.companion || null;
    data.companionSwapDay = typeof raw.companionSwapDay === "number" ? raw.companionSwapDay : 0;
    // v7.1: clear broken / invalid stuck companion without wiping whole save
    if (data.companion) {
      const cNpc = NPCS[data.companion];
      const cf = (data.fates && data.fates[data.companion]) || "default";
      if (!cNpc || cf === "dead" || cf === "vanished" || cf === "enemy" || cf === "retired" || cf === "hermit") {
        data.companion = null;
        data.companionSwapDay = 0;
      }
    }
    data.cookMealLevel = typeof raw.cookMealLevel === "number" ? raw.cookMealLevel : 0;
    data.endingId = raw.endingId || null;
    data.ending = raw.ending || null;
    data.bountyTarget = raw.bountyTarget || null;
    data.ch3HealUsed = !!raw.ch3HealUsed;
    if (raw.gender === "female" || raw.gender === "女") data.gender = "女";
    else data.gender = "男";
    if (raw.disguise === "nan") data.disguise = "nan";
    else if (data.gender === "女" && (raw.disguise === undefined || raw.disguise === null)) data.disguise = "nan";
    else data.disguise = raw.disguise || null;
    data.palaceRole = raw.palaceRole || null;
    if (data.palaceRole === "fanzi" || data.palaceRole === "dongchang_boss") data.palaceRole = "dongchang";
    data.trauma = typeof raw.trauma === "number" ? raw.trauma : 0;
    data.emperorFavor = typeof raw.emperorFavor === "number" ? raw.emperorFavor : 0;
    data.palaceHeat = typeof raw.palaceHeat === "number" ? raw.palaceHeat : 0;
    data.palaceMood = raw.palaceMood || "平靜";
    data.palaceDayEvents = Array.isArray(raw.palaceDayEvents) ? raw.palaceDayEvents : [];
    data.courtTrack = raw.courtTrack || "none";
    data.courtPin = typeof raw.courtPin === "number" ? raw.courtPin : 0;
    data.courtGrade = typeof raw.courtGrade === "number" ? raw.courtGrade : 0;
    data.courtPrestige = typeof raw.courtPrestige === "number" ? raw.courtPrestige : 0;
    data.courtZheng = !!raw.courtZheng;
    data.eunuchAssignedHall = raw.eunuchAssignedHall || null;
    data.serveTargetId = raw.serveTargetId || null;
    data.pendingDeal = raw.pendingDeal || null;
    data.courtQuests = raw.courtQuests && typeof raw.courtQuests === "object" ? raw.courtQuests : {};
    data.courtLastQuestDay = typeof raw.courtLastQuestDay === "number" ? raw.courtLastQuestDay : 0;
    data.courtFavorPromoDay = typeof raw.courtFavorPromoDay === "number" ? raw.courtFavorPromoDay : 0;
    data.courtDealDay = typeof raw.courtDealDay === "number" ? raw.courtDealDay : 0;
    data.courtDoneQuests = Array.isArray(raw.courtDoneQuests) ? raw.courtDoneQuests : [];
    data.donggongTrust = typeof raw.donggongTrust === "number" ? raw.donggongTrust : 0;
    data.datingLogs = raw.datingLogs && typeof raw.datingLogs === "object" ? raw.datingLogs : {};
    data.datingAff = raw.datingAff && typeof raw.datingAff === "object" ? raw.datingAff : {};
    data.loverPing = raw.loverPing && typeof raw.loverPing === "object" ? raw.loverPing : {};
    data.loverPingDay = typeof raw.loverPingDay === "number" ? raw.loverPingDay : 0;
    data.loverDateQuest = raw.loverDateQuest || null;
    data.sceneOverride = raw.sceneOverride || null;
    if (data.loc === "slave_market" || data.loc === "renyazi_alley") data.loc = data.loc === "slave_market" ? "renyazi_alley" : data.loc;
    if (data.flags) {
      if (data.flags.heard_slave_market || data.flags.heard_renyazi) data.flags.heard_renyazi = true;
      if (data.flags.palace_entry || data.flags.map_huanggong || data.palaceRole) data.flags.palace_access = true;
    }
    ["bone","wit","luck","honor","antitoxin","charm","focus","medicine","perception","karma"].forEach(k => {
      if (typeof data[k] !== "number") data[k] = base[k];
    });
    if (typeof data.karma === "number") data.karma = Math.max(-100, Math.min(100, data.karma));
    data.saveVer = 7;
    return data;
  }

  function saveGame() {
    S.saveVer = 7;
    localStorage.setItem(SAVE_KEY, JSON.stringify(S));
    toast("已存檔", true);
  }
  function saveGameSilent() {
    S.saveVer = 7;
    localStorage.setItem(SAVE_KEY, JSON.stringify(S));
  }
  function loadGame() {
    let raw = localStorage.getItem(SAVE_KEY);
    let migrated = false;
    if (!raw) {
      raw = localStorage.getItem(SAVE_KEY_OLD) || localStorage.getItem(SAVE_KEY_OLDER);
      try { if (!raw && typeof SAVE_KEY_OLDEST !== "undefined") raw = localStorage.getItem(SAVE_KEY_OLDEST); } catch (e) {}
      try { if (!raw && typeof SAVE_KEY_V4 !== "undefined") raw = localStorage.getItem(SAVE_KEY_V4); } catch (e) {}
      try { if (!raw && typeof SAVE_KEY_V1 !== "undefined") raw = localStorage.getItem(SAVE_KEY_V1); } catch (e) {}
      try { if (!raw && typeof SAVE_KEY_V1B !== "undefined") raw = localStorage.getItem(SAVE_KEY_V1B); } catch (e) {}
      migrated = !!raw;
    }
    if (!raw) { toast("沒有存檔", true); return false; }
    try {
      S = migrateSave(JSON.parse(raw));
      ensureAllNpcMem();
      ensureBonds();
      ensureQuests();
      if (S.companion) {
        const cNpc = NPCS[S.companion];
        const cf = S.fates[S.companion];
        if (!cNpc || cf === "dead" || cf === "vanished" || cf === "enemy" || cf === "retired" || cf === "hermit") {
          S.companion = null; S.companionSwapDay = 0;
        }
      }
      if (S.prison && S.prison.place) S.loc = S.prison.place;
      if (migrated) {
        localStorage.setItem(SAVE_KEY, JSON.stringify(S));
        toast("已讀檔（舊存檔已遷移 v7）", true);
      } else toast("已讀檔", true);
      return true;
    } catch (e) { toast("存檔損壞", true); return false; }
  }
  function resetGame() {
    if (!confirm("確定清空進度？")) return;
    localStorage.removeItem(SAVE_KEY);
    localStorage.removeItem(SAVE_KEY_OLD);
    try { localStorage.removeItem(SAVE_KEY_OLDER); } catch(e) {}
    try { if (typeof SAVE_KEY_OLDEST !== "undefined") localStorage.removeItem(SAVE_KEY_OLDEST); } catch(e) {}
    try { if (typeof SAVE_KEY_V1 !== "undefined") localStorage.removeItem(SAVE_KEY_V1); } catch(e) {}
    try { if (typeof SAVE_KEY_V1B !== "undefined") localStorage.removeItem(SAVE_KEY_V1B); } catch(e) {}
    S = defaultState();
    ui = { tab: "map", combat: null, talking: null, toastQuiet: false };
    render();
    toast("已重置", true);
  }


  // ---------- NPC MEMORY + DEEPSEEK ----------
  const MEM_RAW_CAP = 24;
  const MEM_RECENT_N = 8;
  const ALLOWED_BEHAVIORS = ["help","hostile","flee","gift","trade","quest_hint","attack","ignore","follow","capture","wound","dodge","guard","rebuke","lecture","parole","release","trap","duel","accept","teach","refuse","train"];
  const ALLOWED_FATES = ["ally","dead","enemy","vanished","redeemed","married","retired","hero","muse","master","smuggler","convert","hermit","freed","teacher","partner","apprentice","promoted","rival","host","immortal","mad","slave","default"];
  const ALLOWED_FLAGS = [
    "heard_yaogu","map_jianzhong","west_road","invite_baixue","helped_temple","helped_band",
    "rep_30","heard_meihua","open_longmen","map_wuyin","chixia_path","sea_pass","bamboo_map",
    "trade_pass","north_pass","honglian_invite","dao_invite","lake_invite","ch2_started","ch2_choice_a","ch2_choice_b",
    "player_insult","player_kind","shared_secret","called_help","prison_escape_known",
    "disciple_suning","disciple_yun","forge_disciple","bond_guqinghan","married_gu","sworn_heifeng",
    "crew_murong","convert_lotus","dao_student","tomb_ally","lake_student","sworn_shengu",
    "partner_tie","hanya_ally","sentry_friend","sand_rival","host_mei","sword_chi","mad_muse",
    "baizhi_follow","informant_tong","cook_friend","got_ore",
    "ch3_started","ch3_rumor","ch3_ev_border","ch3_ev_lotus","ch3_ev_tomb",
    "ch3_path_honor","ch3_path_force","ch3_path_wit","ch3_finale",
    "forever_intel","cook_upgrade","side_child_done","wolf_hunt","lei_cleared",
    "karma_beggar_king","karma_temple_omen","karma_white_alliance","karma_redemption_offer",
    "karma_black_market","karma_cult_scout","karma_bounty","karma_demon_whisper","karma_crossroads",
    "karma_palace_guard","karma_dongchang_scout","did_evil_act","qingfeng_ally","blacklist_trade",
    "palace_entry","map_huanggong","neiting_access","dongchang_invite","yulin_ok","hougong_access",
    "map_wumen","map_yangxin","map_yuhuayuan","map_taipusi","map_tianlao","map_taihedian","map_qianqing",
    "map_wenyuan","map_yushan","map_neiwufu","map_dianshi","map_wuying","map_xingbu_prison","map_xingbu_gate",
    "map_bingzhang","map_siku","map_taiyiyuan","map_jingshen","map_yuhe_wharf","map_shenwu",
    "visited_jingshen","palace_inner_map",
    "eunuch","sold_as_eunuch","escaped_enslavement","renyazi_ambush","heard_renyazi","palace_revenge_done",
    "qinmo_resisted","sand_duel_done","ending_preview",
    "got_hanxue","stole_hanxue","cangfeng_invite","xiake_page_found","xuanyin_hunt",
    "palace_affair_silent","palace_affair_seen","palace_affair_blackmail","palace_affair_reported",
    "palace_affair_join","palace_affair_accomplice","palace_affair_fled","palace_dodged_general",
    "palace_almost_slain","palace_favored","palace_pregnancy_rumor","palace_resist_liked",
    "palace_resist_punished","palace_resist_dungeon","palace_soft_refuse","palace_asked_power",
    "palace_wine_tonight","tomb_ally",
    "punish_dossier","survived_zhanshou","punished_soft","punished_prison","punished_gongxing",
    "punished_exile","punished_lethal_fail","punished_lethal_dodge","map_xingxing_tai","map_yongxing_shi",
    "dongchang_ambition_fail",
    "donggong_interest","donggong_love","donggong_slave","donggong_thaw",
    "donggong_truth_known","donggong_confessed","donggong_regicide_plan",
    "donggong_reconciled","donggong_sold_out","donggong_evidence_burned",
    "donggong_abandon_revenge","side_donggong","donggong_saved_once",
    "donggong_night_talk","donggong_name_hint","donggong_search_done","donggong_enemy_letter","donggong_shield_today",
    "dating_unlocked",
    "met_ye_qingshan", "met_lin_feng", "met_ning_shuying", "met_ye_xiaoyu", "met_lin_chen", "met_ren_yingluo", "met_feng_qingya", "met_qu_yangqin", "met_qiao_fengshan", "met_duan_muyu", "met_xu_zhuoyun", "met_zhang_wujiang", "met_zhao_minyan", "met_zhou_zhi_xue", "met_hong_qigong", "met_huang_yaoshi", "met_ouyang_fengdu", "met_xiao_longyin", "met_yang_guochen", "met_guo_jingyi", "met_huang_rongya", "met_dongfang_gubai", "met_zuo_lengying", "met_mu_gaofeng", "met_wei_xiaozhou", "met_chen_jinnan", "met_jianning", "met_hai_dafu", "met_ao_baiying", "met_shuang_er", "met_su_quan", "met_hong_antong", "met_jiu_nan", "met_a_ke", "met_mu_jianping", "met_fang_yi", "met_mao_dongzhu", "met_duo_long", "met_suo_etu", "met_wu_sangui", "met_shi_lang", "met_mao_shiba", "ye_exposed", "lin_ren_love", "lin_feng_sworn", "ye_xiaoyu_trust", "lin_chen_sworn", "disciple_feng", "qiao_sworn", "xuzhu_open", "zhao_min_reveal", "disciple_hongqi", "dongfang_reveal", "tomb_taboo", "border_sworn", "court_double", "qingwu_member", "jianning_love", "shuang_er_follow", "jiunan_assassin", "fang_yi_turned", "fake_empress", "fan_wang", "cangfeng_hypocrite_done", "side_tomb_taboo_done", "side_qiao_done", "side_court_double_done", "side_fake_empress_done", "side_jiunan_done", "side_fan_wang_done"
  ];

  function blankNpcMem() {
    return { log: [], summary: [], trust: 0, mood: "平淡", rel: "初識", lastDay: 0, wounded: false, woundDay: 0, alert: 0, lastIntent: "" };
  }
  function ensureNpcMem(npcId) {
    if (!S.npcMem) S.npcMem = {};
    if (!S.npcMem[npcId]) S.npcMem[npcId] = blankNpcMem();
    const m = S.npcMem[npcId];
    if (!Array.isArray(m.log)) m.log = [];
    if (!Array.isArray(m.summary)) m.summary = [];
    if (typeof m.trust !== "number") m.trust = 0;
    if (!m.mood) m.mood = "平淡";
    if (!m.rel) m.rel = "初識";
    if (typeof m.wounded !== "boolean") m.wounded = false;
    if (typeof m.woundDay !== "number") m.woundDay = 0;
    if (typeof m.alert !== "number") m.alert = 0;
    if (!m.lastIntent) m.lastIntent = "";
    return m;
  }
  function ensureAllNpcMem() { Object.keys(NPCS).forEach(ensureNpcMem); }
  function memoryHint(npcId) {
    const m = ensureNpcMem(npcId);
    const n = m.log.length + m.summary.length;
    if (m.wounded) return "佢帶傷……眼神警惕";
    if (typeof isImprisoned === "function" && isImprisoned() && S.prison.by === npcId) return "你被佢關住";
    if (n <= 0) return "尚未與你深交";
    if (m.trust >= 15) return "佢記得你……好有印象";
    if (m.trust >= 5) return "佢記得你幾次往來";
    if (m.trust <= -10) return "佢記得你……而且唔開心";
    if (n >= 3) return "佢對你有啲印象";
    return "剛開始認識";
  }
  function trunc(s, n) {
    s = String(s || "").replace(/\s+/g, " ");
    return s.length <= n ? s : s.slice(0, n) + "…";
  }
  function compressNpcMem(npcId) {
    const m = ensureNpcMem(npcId);
    while (m.log.length > MEM_RAW_CAP) {
      const old = m.log.splice(0, Math.min(6, m.log.length - MEM_RECENT_N));
      if (!old.length) break;
      m.summary.push(old.map(e => "D" + e.day + "「" + trunc(e.player, 24) + "」→" + (e.behavior || "?")).join("；"));
      if (m.summary.length > 12) m.summary = m.summary.slice(-12);
    }
  }
  function pushNpcMemory(npcId, entry) {
    const m = ensureNpcMem(npcId);
    m.log.push(entry);
    m.lastDay = S.day;
    if (entry.intent) m.lastIntent = entry.intent;
    if (entry.memoryNote) {
      m.summary.push("要點：" + trunc(entry.memoryNote, 60));
      if (m.summary.length > 12) m.summary = m.summary.slice(-12);
    }
    const b = entry.behavior;
    if (b === "help" || b === "gift" || b === "follow" || b === "quest_hint" || b === "release" || b === "parole" || b === "accept" || b === "teach" || b === "train") m.trust += 2;
    if (b === "trade") m.trust += 1;
    if (b === "hostile" || b === "attack" || b === "duel" || b === "capture" || b === "trap") m.trust -= 4;
    if (b === "wound") m.trust -= 8;
    if (b === "flee" || b === "ignore" || b === "refuse") m.trust -= 1;
    if (m.trust >= 20) { m.rel = "摯友"; m.mood = "溫暖"; }
    else if (m.trust >= 10) { m.rel = "信賴"; m.mood = "友善"; }
    else if (m.trust >= 3) { m.rel = "相識"; m.mood = "平和"; }
    else if (m.trust <= -15) { m.rel = "仇隙"; m.mood = "憤怒"; }
    else if (m.trust <= -5) { m.rel = "戒備"; m.mood = "冷淡"; }
    compressNpcMem(npcId);
    try { saveGameSilent(); } catch (e) {}
  }
  function invHighlights() {
    const keys = Object.keys(S.inv || {});
    const keyItems = keys.filter(id => ITEMS[id] && ITEMS[id].type === "key");
    const others = keys.filter(id => keyItems.indexOf(id) < 0).slice(0, 10);
    return {
      keyItems: keyItems.map(id => ITEMS[id].name + "×" + S.inv[id]),
      items: others.map(id => (ITEMS[id] ? ITEMS[id].name : id) + "×" + S.inv[id]),
      gold: S.gold, equip: S.equip
    };
  }
  function memoryPromptPayload(npcId) {
    const m = ensureNpcMem(npcId);
    const out = {
      summary: m.summary.slice(-8),
      recent: m.log.slice(-MEM_RECENT_N).map(e => ({
        day: e.day, mode: e.mode, player: e.player,
        reply: trunc(e.reply, 80), behavior: e.behavior, note: e.memoryNote || ""
      })),
      trust: m.trust, mood: m.mood, rel: m.rel,
      wounded: !!m.wounded, alert: m.alert || 0,
      personality: (typeof npcProfile==="function"?npcProfile(npcId).personality:""),
      martial: (typeof npcProfile==="function"?npcProfile(npcId).martial:0)
    };
    if (npcId === "dongchang_gong") {
      out.donggongTrust = typeof S.donggongTrust === "number" ? S.donggongTrust : 0;
      out.love = !!flag("donggong_love");
      out.slave = !!flag("donggong_slave");
      out.thaw = !!flag("donggong_thaw");
      // Never mention 玄梧／靖王／弒君 until truth known
      if (flag("donggong_truth_known") || flag("donggong_confessed")) {
        out.truthKnown = true;
        out.trueName = "玄梧";
        out.childTitle = "靖王／皇幼弟";
      } else {
        out.publicOnly = "東廠督公（真名未知，勿捏造皇族身份）";
      }
    }
    return out;
  }
  function normalizeDeepseekModel(m) {
    const raw = (m || "").trim();
    // legacy aliases → current catalog
    if (!raw || raw === "deepseek-chat" || raw === "deepseek-reasoner" || raw === "deepseek-v3" || raw === "deepseek-r1") {
      return "deepseek-v4-pro";
    }
    if (raw === "deepseek-v4-flash" || raw === "deepseek-v4-flash-vision-exp") return "deepseek-flash";
    return raw;
  }
  async function deepseekChat(systemPrompt, userPrompt, maxTokens) {
    if (!settings.deepseekKey) return null;
    try {
      const model = normalizeDeepseekModel(settings.model || "deepseek-v4-pro");
      settings.model = model;
      const isPro = model.indexOf("pro") >= 0 || model === "deepseek-v4-pro";
      const body = {
        model: model,
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt }
        ],
        max_tokens: Math.max(maxTokens || 500, isPro ? 800 : 500)
      };
      // V4：更強模型開思考模式；Flash 預設非思考以求速度
      if (isPro) {
        body.thinking = { type: "enabled" };
        body.reasoning_effort = "high";
      } else {
        body.temperature = 0.75;
        body.thinking = { type: "disabled" };
      }
      const res = await fetch((settings.deepseekUrl || "https://api.deepseek.com").replace(/\/$/, "") + "/v1/chat/completions", {
        method: "POST",
        headers: { "Content-Type": "application/json", "Authorization": "Bearer " + settings.deepseekKey },
        body: JSON.stringify(body)
      });
      if (!res.ok) throw new Error("HTTP " + res.status);
      const data = await res.json();
      const msg = data.choices && data.choices[0] && data.choices[0].message;
      if (!msg) return null;
      // 思考模式：最終答覆在 content；reasoning_content 僅內部
      return (msg.content && String(msg.content).trim()) || null;
    } catch (err) {
      console.warn("DeepSeek failed", err);
      toast("AI 失敗，改離線回應", true);
      return null;
    }
  }
  function contextBlob() {
    const safeFlags = Object.assign({}, S.flags || {});
    // Never leak 玄梧／皇幼弟 truth to AI until player knows
    if (!flag("donggong_truth_known") && !flag("donggong_confessed")) {
      delete safeFlags.donggong_truth_known;
      delete safeFlags.donggong_confessed;
      delete safeFlags.donggong_regicide_plan;
      delete safeFlags.donggong_reconciled;
      delete safeFlags.donggong_name_hint;
    }
    const blob = {
      hero: S.name, loc: S.loc, day: S.day, flags: safeFlags, fates: S.fates, bonds: S.bonds || {},
      faction: S.faction, inv: invHighlights(), renown: S.renown, chapter: S.chapter,
      honor: S.honor, luck: S.luck, prison: S.prison || null, unlocks: typeof listUnlocks==="function"?listUnlocks():[],
      gender: S.gender, palaceRole: S.palaceRole || null, emperorFavor: S.emperorFavor || 0,
      palaceHeat: S.palaceHeat || 0, palaceMood: S.palaceMood || "平靜",
      palaceIdentity: typeof palaceIdentityLabel==="function" ? palaceIdentityLabel() : "",
      hasHanxue: hasItem("hanxue_horse"), karma: S.karma || 0,
      donggongTrust: typeof S.donggongTrust === "number" ? S.donggongTrust : 0,
      donggongLove: !!flag("donggong_love"),
      donggongSlave: !!flag("donggong_slave"),
      donggongThaw: !!flag("donggong_thaw"),
      datingPartners: (typeof listDatingPartners === "function" ? listDatingPartners() : []),
      datingAff: S.datingAff || {},
      datingUnlocked: !!flag("dating_unlocked")
    };
    if (flag("donggong_truth_known") || flag("donggong_confessed")) {
      blob.donggongTruth = "已知：督公真名玄梧，景安帝失散幼弟靖王，被敵人閹割洗腦欲弒君；";
      blob.donggongTruth += flag("donggong_reconciled") ? "已與帝相認。" : (flag("donggong_regicide_plan") ? "正謀弒君。" : (flag("donggong_abandon_revenge") ? "已棄復仇只效忠玩家。" : "真相未決。"));
    }
    return JSON.stringify(blob);
  }
  function parseAiJson(text) {
    if (!text) return null;
    let s = String(text).trim();
    const fence = s.match(/```(?:json)?\s*([\s\S]*?)```/i);
    if (fence) s = fence[1].trim();
    const a = s.indexOf("{"), b = s.lastIndexOf("}");
    if (a < 0 || b <= a) return null;
    try { return JSON.parse(s.slice(a, b + 1)); } catch (e) { return null; }
  }
  function sanitizeAiResult(raw, npcId) {
    const out = { say: "", behavior: "ignore", flagUpdates: {}, fateHint: null, memoryNote: "", intent: null, resolution: null, offerId: null, grants: null };
    if (!raw || typeof raw !== "object") return out;
    out.say = trunc(String(raw.say || raw.reply || ""), 420) || offlineTalk(npcId);
    let bh = String(raw.behavior || "ignore").toLowerCase();
    if (ALLOWED_BEHAVIORS.indexOf(bh) < 0) bh = "ignore";
    out.behavior = bh;
    if (raw.flagUpdates && typeof raw.flagUpdates === "object") {
      Object.keys(raw.flagUpdates).forEach(k => {
        if (ALLOWED_FLAGS.indexOf(k) >= 0) out.flagUpdates[k] = !!raw.flagUpdates[k];
      });
    }
    if (raw.fateHint && ALLOWED_FATES.indexOf(String(raw.fateHint)) >= 0) out.fateHint = String(raw.fateHint);
    out.memoryNote = trunc(String(raw.memoryNote || ""), 80);
    if (raw.intent) out.intent = String(raw.intent);
    if (raw.resolution) out.resolution = raw.resolution;
    if (raw.offerId && typeof raw.offerId === "string") {
      const oid = String(raw.offerId);
      if (npcId && typeof findOfferById === "function" && findOfferById(npcId, oid)) out.offerId = oid;
    }
    if (raw.grants && typeof raw.grants === "object") {
      const g = { items: [], attrs: {}, unlocks: [] };
      if (Array.isArray(raw.grants.items)) {
        raw.grants.items.forEach(it => {
          const id = typeof it === "string" ? it : (it && it.id);
          const n = typeof it === "object" && it && it.n ? it.n : 1;
          if (id && ITEMS[id]) g.items.push({ id, n });
        });
      }
      if (raw.grants.attrs && typeof raw.grants.attrs === "object") {
        ["force","agi","def","bone","wit","luck","honor","antitoxin","charm","focus","medicine","perception","renown","neiliMax","hpMax"].forEach(k => {
          if (typeof raw.grants.attrs[k] === "number" && Math.abs(raw.grants.attrs[k]) <= 5) g.attrs[k] = raw.grants.attrs[k];
        });
      }
      if (Array.isArray(raw.grants.unlocks)) {
        raw.grants.unlocks.forEach(u => { if (UNLOCK_LABELS[u]) g.unlocks.push(u); });
      }
      out.grants = g;
    }
    return out;
  }


  function isImprisoned() { return !!(S.prison && S.prison.by); }
  function playerStealthScore() {
    const st = effectiveStats();
    let score = st.agi * 2 + st.luck + Math.floor(st.wit / 2) + Math.floor(st.perception * 0.8);
    if (S.equip.weapon === "night_dagger") score += 12;
    if ((S.day % 2 === 0) || /yewang|heishui|mishi/.test(S.loc)) score += 8;
    if (hasStatus("dingshen")) score -= 20;
    return score;
  }
  function npcAwarenessScore(npcId) {
    const p = npcProfile(npcId), m = ensureNpcMem(npcId);
    const st = effectiveStats();
    let a = p.awareness + Math.floor(p.martial * 0.35) - Math.floor(st.perception * 0.5);
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
    if (typeof adjustKarma === "function") adjustKarma(-2, "遭關押");
    setFlag("prison_escape_known");
    try { if (Math.random() < 0.22) maybeTriggerEnslavement(); } catch (e) {}
    try { saveGameSilent(); } catch (e) {}
  }
  function releasePrison(reasonText, opts) {
    opts = opts || {};
    const by = S.prison && S.prison.by;
    S.prison = null;
    if (hasItem("cell_key")) removeItem("cell_key", S.inv.cell_key || 1);
    if (by) ensureNpcMem(by).mood = "審視";
    if (typeof adjustKarma === "function") {
      if (opts.mercy) adjustKarma(1, "獲釋悔過");
      else if (opts.villainBribe) adjustKarma(-2, "賄逃");
      else if (opts.breakout) adjustKarma(-1, "越獄");
      else if (opts.escapeKill) adjustKarma(-3, "逃後殺心");
    }
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
    if (typeof hasUnlock === "function" && hasUnlock("temple_parole_boost") && (p.personality === "merciful" || S.prison.by === "masteryun")) {
      S.prison.parole = Math.max(0, (S.prison.parole || p.paroleDays) - 1);
    }
    const held = S.day - (S.prison.dayLocked || S.day);
    if (held >= p.paroleDays && ensureNpcMem(S.prison.by).trust > -20) {
      const name = NPCS[S.prison.by].name;
      return releasePrison(name + "見你關了 " + (held+1) + " 日，嘆道：「且去，勿再造業。」你被釋放。", { mercy: true });
    }
    return null;
  }
  function woundNpc(npcId) {
    const m = ensureNpcMem(npcId);
    m.wounded = true; m.woundDay = S.day; m.alert = Math.max(m.alert, 2);
    m.mood = "痛苦"; m.rel = "仇隙"; m.trust -= 12;
    S.honor = Math.max(0, S.honor - 5);
    if (typeof adjustKarma === "function") adjustKarma(-5, "暗算傷人");
    if (S.fates[npcId] === "default" || S.fates[npcId] === "ally") setFate(npcId, "enemy");
  }

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
    { id:"flee", re:/逃跑|跑路|撤|閃人|先走/ },
    { id:"ask_disciple", re:/拜師|拜你為師|拜妳為師|收我為徒|做你徒弟|想做你徒弟|收徒|收我做弟子|請收我|求收為徒/ },
    { id:"ask_sworn", re:/結義|金蘭|結為兄弟|拜把子|認作兄弟|並肩結義/ },
    { id:"ask_marry", re:/定情|表明心意|嫁給|娶你|白頭偕老|終身/ },
    { id:"ask_join_cult", re:/入教|皈依|加入紅蓮|拜教主|入紅蓮/ },
    { id:"ask_partner", re:/合夥|合資|做生意|開鋪|入股|搭伙|上船入伙|跟你跑船/ },
    { id:"ask_teach", re:/請教|授藝|傳功|傳授|教我|請教授藝/ },
    { id:"ask_train", re:/試招|論劍|比試|對練|訓練|練一練/ },
    { id:"ask_shop_special", re:/特價|內部價|給我折扣|情報|通風報信/ },
    { id:"learn_medicine", re:/學醫|請教醫術|醫術|藥性|跟你學醫/ },
    { id:"learn_forge", re:/學打鐵|鍛造|淬煉|學鍛|打鐵/ },
    { id:"learn_sword", re:/學劍|劍法|刀法|請教劍|赤霞劍/ },
    { id:"learn_dao", re:/學道|觀星|入觀|道法|打坐禪/ },
    { id:"ask_free_heal", re:/診治|治傷|看病|免費餐|夜宵|煲湯/ },
    { id:"ask_craft", re:/打造|強化武器|淬刀|鍛兵/ }
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
    if (typeof adjustKarma === "function") adjustKarma(-2, "公然動手");
    return sanitizeAiResult({ say, behavior: behavior==="duel"?"duel":"attack", fateHint:"enemy", memoryNote:"公然動手", intent:"open_attack" }, npcId);
  }

  function resolveEscapeAttempt(npcId, intent, playerText) {
    if (isImprisoned()) npcId = S.prison.by;
    const npc = NPCS[npcId], p = npcProfile(npcId), m = ensureNpcMem(npcId);
    const st = effectiveStats();
    S.prison.escapesTried = S.prison.escapesTried || [];
    S.prison.escapesTried.push({ day:S.day, intent:intent });

    if (intent === "apologize" || intent === "persuade") {
      const score = st.honor + st.wit + st.charm * 2 + m.trust + (p.personality==="merciful"?15:0) + (p.personality==="lawful"?8:0) + (p.personality==="ruthless"?-20:0);
      if (score >= 18) {
        const msg = releasePrison(npc.name + "聽你懺悔，沉默良久：「既知悔，去罷。再犯難容。」", { mercy: true });
        if (typeof adjustKarma === "function") adjustKarma(2, "誠心悔過");
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
      const bluff = st.wit * 2 + st.luck + st.charm + (Math.random()*20|0);
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
        releasePrison(null, { breakout: true });
        return sanitizeAiResult({ say:"你撬弄鎖芯，咔嗒一聲——成功逃出禁室！", behavior:"release", fateHint:"enemy", memoryNote:"撬鎖逃走", intent }, npcId);
      }
      S.prison.guardAlert = (S.prison.guardAlert||0) + 1;
      return sanitizeAiResult({ say:"鎖芯不動，反弄出聲響。外面脚步近了……", behavior:"rebuke", memoryNote:"撬鎖失敗", intent }, npcId);
    }

    if (intent === "bribe") {
      let need = p.personality==="merciful" ? 30 : (p.personality==="ruthless" ? 120 : 60);
      need = Math.max(15, need - Math.floor(st.charm * 2.5));
      if (S.gold < need) return sanitizeAiResult({ say:npc.name+"瞥一眼：「就這點？」（需約 "+need+" 金；魅力可減價）", behavior:"rebuke", memoryNote:"賄賂不足", intent }, npcId);
      if (p.personality === "lawful" || (p.personality==="merciful" && p.martial > 70)) {
        if (st.charm >= 12 && Math.random() < 0.35) {
          S.gold -= need; releasePrison();
          return sanitizeAiResult({ say:"你憑三寸不爛之舌打動對方，塞上 "+need+" 金後終獲放行。", behavior:"release", memoryNote:"魅力賄賂成功", intent }, npcId);
        }
        return sanitizeAiResult({ say:npc.name+"拂袖：「金錢買不動我。」", behavior:"rebuke", memoryNote:"賄賂被拒", intent }, npcId);
      }
      S.gold -= need; releasePrison(null, { villainBribe: true });
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
      if (typeof adjustKarma === "function") adjustKarma(-3, "偷竊");
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

  function applyAiResult(npcId, result, mode, playerText) {
    Object.keys(result.flagUpdates || {}).forEach(k => setFlag(k, result.flagUpdates[k]));
    const grantFates = ["ally","enemy","hero","master","teacher","married","convert","muse","partner","apprentice","smuggler","host","promoted","rival","freed","hermit","immortal","mad","redeemed","retired"];
    if (result.fateHint && result.fateHint !== "dead") {
      const cur = S.fates[npcId];
      const accepting = result.behavior === "accept" || result.behavior === "teach" || !!result.offerId;
      if (accepting && grantFates.indexOf(result.fateHint) >= 0) {
        if (cur !== "dead" && cur !== "vanished" && result.fateHint !== cur) setFate(npcId, result.fateHint);
      } else if ((cur === "default" || cur === "ally" || cur === "enemy") &&
          (result.fateHint === "ally" || result.fateHint === "enemy" || result.fateHint === "hero")) {
        if (result.fateHint !== cur) setFate(npcId, result.fateHint);
      } else if (accepting && ALLOWED_FATES.indexOf(result.fateHint) >= 0 && cur !== "dead" && cur !== "vanished") {
        if (result.fateHint !== cur) setFate(npcId, result.fateHint);
      }
    }
    let note = "";
    const b = result.behavior;
    if (b === "accept" || b === "teach") {
      note = result.offerId ? "（承諾已締 · " + result.offerId + "）" : "（對方應允）";
    } else if (b === "refuse") note = "（對方婉拒）";
    else if (b === "train") { S.exp += 4; note = "（對練獲經驗）"; }
    else if (b === "help") { S.hp = Math.min(effectiveStats().hpMax, S.hp + 18); note = "（對方相助，氣血回復）"; if (typeof adjustKarma==="function") adjustKarma(1,"互助"); }
    else if (b === "gift") { addItem("herb", 1); note = "（獲贈止血草）"; if (typeof adjustKarma==="function") adjustKarma(1,"饋贈"); }
    else if (b === "trade") {
      if (S.gold >= 10) { S.gold -= 10; addItem("pill", 1); note = "（交易：10金→回氣丹）"; }
      else note = "（想交易但金錢不足）";
    } else if (b === "quest_hint") { setFlag("heard_yaogu"); note = "（透露江湖線索）"; }
    else if (b === "follow") { note = "（對方願意照應）"; }
    else if (b === "hostile") { S.renown = Math.max(0, S.renown - 1); note = "（充滿敵意）"; }
    else if (b === "flee") note = "（對方離開／求援）";
    else if (b === "ignore") note = "（無特別反應）";
    else if (b === "attack" || b === "duel") note = "（拔刀相向！）";
    else if (b === "capture") note = (typeof isImprisoned==="function" && isImprisoned()) ? "（你已被關押）" : "（對方欲擒拿）";
    else if (b === "wound") note = "（暗算得手，對方受傷）";
    else if (b === "dodge" || b === "guard") note = "（被化解／護體）";
    else if (b === "rebuke" || b === "lecture") note = "（被訓斥）";
    else if (b === "parole" || b === "release") note = "（重獲自由）";
    else if (b === "trap") note = "（機關／得手）";
    if (result.grants && b !== "accept" && b !== "teach") {
      (result.grants.items || []).forEach(it => addItem(it.id, it.n || 1));
      Object.keys(result.grants.attrs || {}).forEach(k => {
        if (k === "renown") S.renown += result.grants.attrs[k];
        else if (typeof S[k] === "number") S[k] += result.grants.attrs[k];
      });
    }
    pushNpcMemory(npcId, {
      day: S.day, ts: Date.now(), mode, player: playerText,
      reply: result.say, behavior: b, outcome: note, memoryNote: result.memoryNote,
      intent: result.intent || (typeof classifyIntent==="function" ? classifyIntent(mode, playerText) : ""),
      offerId: result.offerId || ""
    });
    return note;
  }

  async function aiNpcInteract(npcId, mode, playerText) {
    const npc = NPCS[npcId];
    const mem = memoryPromptPayload(npcId);
    const p = npcProfile(npcId);
    const intentGuess = classifyIntent(mode, playerText);
    const sys = "你是武俠遊戲「江湖行」NPC「" + npc.name + "」（" + npc.title + "）。性格：" + p.label + "（" + p.personality + "）。" + p.desc +
      " 武功約" + p.martial + "。繁體中文。禁止金庸原著IP。必須符合性格。" +
      "暗算／偷襲按武功警覺判定；弱則受傷，強則護體／避開／擒拿。慈悲型關押悔過；狠角色反殺；醫者膽小型逃跑求援。關押中回應逃獄須合理。" +
      "若玩家求拜師／結義／定情／入教／合夥且你願意：behavior用accept並填offerId；不願則refuse。授予由本地判定。" +
      "只輸出JSON：{\"say\":\"2-5句\",\"behavior\":\"help|hostile|flee|gift|trade|quest_hint|attack|ignore|follow|capture|wound|dodge|guard|rebuke|lecture|parole|release|trap|duel|accept|teach|refuse|train\",\"offerId\":null,\"flagUpdates\":{},\"fateHint\":null,\"grants\":{},\"memoryNote\":\"一句\",\"intent\":\"" + intentGuess + "\"}" +
      " 命運=" + S.fates[npcId] + " 信任=" + mem.trust + " 羈絆=" + bondSummary(npcId) + " 模式=" + mode + " 關押=" + isImprisoned() +
      " 可選offer=" + JSON.stringify((NPC_OFFERS[npcId]||[]).map(o=>o.id));
    const user = JSON.stringify({ player: S.name, mode, utterance: playerText, intentGuess, world: JSON.parse(contextBlob()), memory: mem, location: S.loc });
    const text = await deepseekChat(sys, user, 650);
    const parsed = parseAiJson(text);
    if (parsed) return sanitizeAiResult(parsed, npcId);
    if (text) return sanitizeAiResult({ say: text, behavior: "ignore", memoryNote: "非JSON回覆", intent: intentGuess }, npcId);
    return null;
  }
  function offlineInteract(npcId, mode, playerText) {
    const hard = offlineResolveIntent(npcId, mode, playerText);
    if (hard) return hard;
    const commit = resolveCommitment(npcId, mode, playerText);
    if (commit) return commit;
    const fate = S.fates[npcId];
    const m = ensureNpcMem(npcId);
    let behavior = "ignore", say = offlineTalk(npcId), memoryNote = "", fateHint = null, flagUpdates = {};
    const hostileWord = /殺|打|搶|騙|侮辱|去死|廢物|威脅/.test(playerText || "");
    const kindWord = /謝|幫忙|醫|救|贈|請教|請安|敬仰|結義|朋友/.test(playerText || "");
    const askWord = /線索|劍冢|藥谷|密信|任務|何處|邊關|毒|紅蓮|夜王|梅花|龍門/.test(playerText || "");
    if (fate === "enemy" || m.trust <= -10) {
      behavior = hostileWord || mode === "action" ? "attack" : "hostile";
      say = NPCS[npcId].name + "：「還敢來？帳，我記得清清楚楚。」";
      memoryNote = "再來糾纏";
    } else if (hostileWord) {
      behavior = "hostile"; say = NPCS[npcId].name + "沉臉：「說話小心。我記住了。」"; memoryNote = "出言不遜";
    } else if (kindWord) {
      behavior = mode === "action" ? "help" : "gift";
      say = NPCS[npcId].name + "：「你有心。" + (m.log.length ? "上次往來我沒忘。" : "") + "」";
      memoryNote = "示好"; if (m.trust >= 8 && fate === "default") fateHint = "ally";
    } else if (askWord) {
      behavior = "quest_hint";
      say = NPCS[npcId].name + "低聲：「藥谷、劍冢、龍門、梅花塢……近期都不安生。京畿客棧耳目多。」";
      flagUpdates.heard_yaogu = true; flagUpdates.heard_meihua = true; flagUpdates.open_longmen = true;
      memoryNote = "透露多方線索";
    } else if (mode === "action") {
      behavior = "follow"; say = NPCS[npcId].name + "看你片刻：「……隨你，別連累我。」"; memoryNote = "行動：" + trunc(playerText, 36);
    } else {
      say = offlineTalk(npcId) + "\n（聽著你說：「" + trunc(playerText, 40) + "」）";
      memoryNote = "閒聊：" + trunc(playerText, 36);
      if (m.summary.length) say += "\n（似想起：" + trunc(m.summary[m.summary.length - 1], 40) + "）";
      if (m.wounded) say += "\n（對方仍捂着舊傷，對你充滿戒心）";
    }
    return sanitizeAiResult({ say, behavior, flagUpdates, fateHint, memoryNote, intent: classifyIntent(mode, playerText) }, npcId);
  }
  async function handleFreeInput(npcId, mode, playerText) {
    playerText = String(playerText || "").trim();
    if (!playerText) { toast("請先輸入", true); return null; }
    // 戀人邀同行捷徑
    if (typeof isDating === "function" && isDating(npcId) && /邀.*同行|同行一程|一起走|跟我走/.test(playerText)) {
      if (typeof canInviteCompanion === "function" && canInviteCompanion(npcId) && S.companion !== npcId) {
        inviteCompanion(npcId);
        const say = datingDisplayName(npcId) + "點頭：「便陪你一程。」";
        const result = sanitizeAiResult({ say: say, behavior: "follow", memoryNote: "戀人同行", intent: "dating_companion" }, npcId);
        applyAiResult(npcId, result, mode, playerText);
        return { result, note: "" };
      }
    }
    const intent = classifyIntent(mode, playerText);
    const hard = /sneak_attack|open_attack|steal|steal_key|fake_injury|pick_lock|escape_cell|bribe/.test(intent) || isImprisoned();
    const commitIntent = /ask_disciple|ask_sworn|ask_marry|ask_join_cult|ask_partner|ask_teach|ask_train|learn_medicine|learn_forge|learn_sword|learn_dao|ask_free_heal|ask_craft|ask_shop_special/.test(intent);
    let result = null;
    if (hard) {
      result = offlineResolveIntent(npcId, mode, playerText);
    }
    if (!result && (commitIntent || matchOffer(npcId, intent, playerText))) {
      result = resolveCommitment(npcId, mode, playerText, { intent });
    }
    if (!result && settings.deepseekKey && !hard) {
      result = await aiNpcInteract(npcId, mode, playerText);
      if (result && (result.behavior === "accept" || result.behavior === "teach" || result.offerId)) {
        const local = resolveCommitment(npcId, mode, playerText, { intent, offerId: result.offerId, aiAccept: true });
        if (local && (local.behavior === "accept" || local.behavior === "refuse")) result = local;
      }
    }
    if (!result) result = offlineInteract(npcId, mode, playerText);
    const note = applyAiResult(npcId, result, mode, playerText);
    return { result, note };
  }

  async function aiNarrate(eventHint) {
    return await deepseekChat("你是「江湖行」旁白。繁體中文2-3句，勿用金庸IP。只輸出旁白。", eventHint + " " + contextBlob());
  }

  // ---------- COMBAT ----------
  function hasStatus(id) { return (S.statuses || []).some(s => s.id === id && s.turns > 0); }
  function addStatus(id, turns) {
    S.statuses = (S.statuses || []).filter(s => s.id !== id);
    S.statuses.push({ id, turns });
  }
  function tickStatuses(who) {
    if (who === "player") {
      S.statuses = (S.statuses || []).map(s => ({ id: s.id, turns: s.turns - 1 })).filter(s => s.turns > 0);
      if (hasStatus("neishang")) {
        S.hp -= 4;
        combatLog("內傷發作，失血 4。", "status");
      }
    }
  }
  function startCombat(enemyId, onWin, onLose) {
    const base = ENEMIES[enemyId];
    if (!base) return toast("未知敵人", true);
    ui.combat = {
      enemyId,
      enemy: { name: base.name, hp: base.hp, hpMax: base.hp, atk: base.atk, def: base.def, agi: base.agi, stun: 0 },
      log: ["遭遇「" + base.name + "」！"],
      onWin: onWin || null, onLose: onLose || null,
      companionAssistUsed: false,
      bondSkillUsed: false
    };
    S.combatBuff = { atk: 0, agi: 0, def: 0, turns: 0 };
    if (typeof hasUnlock === "function" && hasUnlock("qin_overture")) {
      S.combatBuff.atk += 3; S.combatBuff.agi += 2; S.combatBuff.turns = Math.max(S.combatBuff.turns, 1);
      ui.combat.log.push("琴音餘韻：本回合攻防略增。");
    }
    if (typeof hasUnlock === "function" && hasUnlock("silent_song")) {
      ui.combat.enemy.stun = Math.max(ui.combat.enemy.stun || 0, 1);
      ui.combat.log.push("無音曲隱隱作響，敵人心神一滯！");
    }
    if (typeof hasUnlock === "function" && hasUnlock("night_drill") && /shadow|bamboo|assassin/.test(enemyId)) {
      S.combatBuff.agi += 3; S.combatBuff.turns = Math.max(S.combatBuff.turns, 2);
    }
    if (S.companion && NPCS[S.companion]) {
      S.combatBuff.def += 2; S.combatBuff.atk += 1;
      S.combatBuff.turns = Math.max(S.combatBuff.turns, 2);
      ui.combat.log.push(NPCS[S.companion].name + "同行護持：開場減傷／助攻就緒。");
    }
    render();
  }
  function combatLog(msg, cls) {
    if (!ui.combat) return;
    ui.combat.log.push({ msg, cls: cls || "" });
    if (ui.combat.log.length > 50) ui.combat.log.shift();
  }
  function resolveSkill(skillId) {
    if (SKILLS[skillId]) return SKILLS[skillId];
    const bonds = listBondCombatSkills();
    for (let i = 0; i < bonds.length; i++) if (bonds[i].id === skillId) return bonds[i];
    return null;
  }
  function companionAssist() {
    if (!ui.combat || !S.companion || !NPCS[S.companion]) return toast("無同行", true);
    if (ui.combat.companionAssistUsed) return toast("本場已助攻過", true);
    const c = ui.combat;
    const dmg = 8 + Math.floor((effectiveStats().force || 0) * 0.15) + Math.floor(Math.random() * 6);
    c.enemy.hp -= dmg;
    ui.combat.companionAssistUsed = true;
    combatLog(NPCS[S.companion].name + "助攻，造成 " + dmg + " 傷害！", "sys");
    if (c.enemy.hp <= 0) { endCombat(true); return; }
    enemyTurn(); render();
  }
  function playerAttack(skillId) {
    if (!ui.combat) return;
    if (hasStatus("dingshen")) {
      combatLog("你被定身，本回合無法出招！", "status");
      addStatus("dingshen", 0);
      S.statuses = S.statuses.filter(s => s.id !== "dingshen");
      enemyTurn();
      render();
      return;
    }
    const c = ui.combat;
    if (String(skillId).indexOf("_bond_") === 0) {
      if (c.bondSkillUsed) { toast("本場絆技已用", true); return; }
      c.bondSkillUsed = true;
    }
    const sk = resolveSkill(skillId);
    if (!sk) return;
    if (S.neili < (sk.neiliCost || 0)) { toast("內力不足", true); return; }
    S.neili -= sk.neiliCost || 0;
    if (sk.cleanse) {
      S.statuses = [];
      combatLog("你以「" + sk.name + "」化解異常狀態。", "heal");
    }
    if (sk.heal) {
      S.hp = Math.min(effectiveStats().hpMax, S.hp + sk.heal);
      combatLog("「" + sk.name + "」回復氣血。", "heal");
    } else {
      const st = effectiveStats();
      let dmg = Math.max(1, Math.floor(st.force * 0.45 + sk.power - c.enemy.def + Math.random() * 6 + st.luck * 0.15));
      if (Math.random() * 100 < st.agi + st.wit + st.focus * 0.8) { dmg = Math.floor(dmg * 1.35); combatLog("要害一擊！", "sys"); }
      c.enemy.hp -= dmg;
      combatLog("「" + sk.name + "」造成 " + dmg + " 傷害。", "dmg");
    }
    if (sk.buffAtk || sk.buffAgi || sk.buffDef) {
      S.combatBuff.atk += sk.buffAtk || 0;
      S.combatBuff.agi += sk.buffAgi || 0;
      S.combatBuff.def += sk.buffDef || 0;
      S.combatBuff.turns = 3;
      combatLog("進入強化狀態！", "sys");
    }
    if (sk.stun) { c.enemy.stun = sk.stun; combatLog("敵人被定身！", "status"); }
    if (sk.burn) { addStatus("neishang", 0); /* enemy burn simulated as extra dmg */ c.enemy.hp -= 6; combatLog("灼燒額外 6 傷害。", "status"); }
    if (c.enemy.hp <= 0) { endCombat(true); return; }
    enemyTurn();
    render();
  }
  function useItemInCombat(itemId) {
    if (!ui.combat || !hasItem(itemId)) return;
    const it = ITEMS[itemId];
    if (it.type !== "consumable") { toast("只能用消耗品", true); return; }
    removeItem(itemId, 1);
    const stUse = effectiveStats();
    const medB = Math.floor((stUse.medicine || 0) * 2.5);
    if (it.heal) S.hp = Math.min(stUse.hpMax, S.hp + it.heal + medB);
    if (it.neili) S.neili = Math.min(stUse.neiliMax, S.neili + it.neili);
    if (it.cleanse) S.statuses = [];
    if (it.buffAtk) { S.combatBuff.atk += it.buffAtk; S.combatBuff.turns = 3; }
    combatLog("使用「" + it.name + "」" + (medB && it.heal ? "（醫術+" + medB + "）" : "") + "。", "heal");
    enemyTurn();
    render();
  }
  function tryFlee() {
    if (!ui.combat) return;
    const st = effectiveStats();
    if (Math.random() * 100 < 38 + st.agi + st.luck) {
      combatLog("成功脫逃！", "sys");
      ui.combat = null; toast("逃脫", true); render();
    } else {
      combatLog("逃跑失敗！", "sys");
      enemyTurn(); render();
    }
  }
  function enemyTurn() {
    const c = ui.combat;
    if (!c) return;
    tickStatuses("player");
    if (S.hp <= 0) { endCombat(false); return; }
    if (S.combatBuff.turns > 0) S.combatBuff.turns--;
    else S.combatBuff = { atk: 0, agi: 0, def: 0, turns: 0 };
    if (c.enemy.stun > 0) {
      c.enemy.stun--;
      combatLog(c.enemy.name + "被定身，無法行動。", "status");
      return;
    }
    const st = effectiveStats();
    const base = ENEMIES[c.enemyId];
    // antitoxin reduces chance of inflict
    if (base && base.inflict && Math.random() < 0.35 - st.antitoxin * 0.02 - st.focus * 0.015) {
      addStatus(base.inflict, base.inflict === "dingshen" ? 1 : 3);
      combatLog("你中了「" + (base.inflict === "neishang" ? "內傷" : "定身") + "」！", "status");
    } else if (base && base.inflict && Math.random() < 0.2) {
      combatLog("定力護持，險些中招卻化解了。", "sys");
    }
    if (Math.random() * 100 < st.agi * 0.75) {
      combatLog(c.enemy.name + "的攻擊被閃過。", "sys");
    } else {
      let dmg = Math.max(1, Math.floor(c.enemy.atk - st.def + Math.random() * 5));
      if (hasStatus("neishang")) dmg += 2;
      if (S.companion && NPCS[S.companion] && Math.random() < 0.35) {
        dmg = Math.max(1, dmg - 3);
        combatLog(NPCS[S.companion].name + "替你擋了一記！", "sys");
      }
      S.hp -= dmg;
      combatLog(c.enemy.name + "擊中你，" + dmg + " 傷害。", "dmg");
    }
    if (S.hp <= 0) endCombat(false);
  }
  function endCombat(won) {
    const c = ui.combat;
    const base = ENEMIES[c.enemyId];
    if (won) {
      combatLog("戰勝「" + c.enemy.name + "」！", "sys");
      S.gold += base.gold || 0;
      S.exp += base.exp || 0;
      S.renown += 1;
      if (S.renown >= 30) setFlag("rep_30");
      (base.loot || []).forEach(id => {
        if (Math.random() < 0.55 || (ITEMS[id] && ITEMS[id].type === "key")) {
          addItem(id, 1);
          combatLog("獲得「" + ITEMS[id].name + "」", "sys");
        }
      });
      levelCheck();
      const cb = c.onWin;
      ui.combat = null; clamp(); render();
      toast("勝利", true);
      if (cb) setTimeout(cb, 80);
      setTimeout(() => { try { maybeLoverInitiative("combat"); } catch (e) {} }, 600);
    } else {
      S.hp = 1; S.statuses = [];
      toast("戰敗，被救回營地", true);
      S.loc = "hub";
      const cb = c.onLose;
      ui.combat = null;
      if (cb) cb();
      render();
    }
  }
  function levelCheck() {
    while (S.exp >= S.level * 22) {
      S.exp -= S.level * 22;
      S.level++;
      S.hpMax += 10; S.neiliMax += 5; S.force += 1; S.agi += 1;
      if (S.level % 2 === 0) S.bone += 1;
      if (S.level % 3 === 0) S.wit += 1;
      S.hp = effectiveStats().hpMax; S.neili = effectiveStats().neiliMax;
      toast("升級！Lv" + S.level, true);
    }
  }



  // ========== V6 ADDON: KARMA + PALACE (injected) ==========
  function adjustKarma(delta, reason) {
    if (!delta) return;
    if (typeof S.karma !== "number") S.karma = 0;
    const prev = S.karma;
    S.karma = Math.max(-100, Math.min(100, S.karma + delta));
    if (delta < 0) setFlag("did_evil_act");
    if (Math.abs(delta) >= 2) toast("善惡" + (delta > 0 ? "＋" : "－") + Math.abs(delta) + (reason ? "（" + reason + "）" : ""), true);
    if (S.karma !== prev) { try { checkKarmaPlots({ fromAdjust: true, delta: delta }); } catch (e) {} }
  }
  function alignmentTier() {
    const k = typeof S.karma === "number" ? S.karma : 0;
    if (k >= 40) return "saint";
    if (k >= 15) return "good";
    if (k <= -40) return "villain";
    if (k <= -15) return "wicked";
    return "neutral";
  }
  function karmaBandLabel() {
    const k = typeof S.karma === "number" ? S.karma : 0;
    if (k >= 40) return "大善";
    if (k >= 15) return "行俠";
    if (k > -15) return "中立";
    if (k > -40) return "俠邪";
    return "大惡";
  }
  function karmaColorClass() {
    const k = typeof S.karma === "number" ? S.karma : 0;
    if (k >= 15) return "karma-good";
    if (k <= -15) return "karma-evil";
    return "karma-neutral";
  }
  function karmaNextHint() {
    const k = typeof S.karma === "number" ? S.karma : 0;
    if (!flag("karma_beggar_king") && k < 12) return "再行俠約" + (12 - k) + "可觸發義丐傳訊";
    if (!flag("karma_temple_omen") && k < 25) return "再行俠約" + Math.max(0, 25 - k) + "可觸發蒼雲異象";
    if (!flag("karma_white_alliance") && k < 40) return "再行俠約" + Math.max(0, 40 - k) + "可觸發清風盟邀約";
    if (!flag("karma_palace_guard") && k < 18) return "再行俠約" + Math.max(0, 18 - k) + "可觸發羽林舉薦";
    if (!flag("karma_black_market") && k > -12) return "再造惡約" + (k + 12) + "可觸發黑市掮客";
    if (!flag("karma_cult_scout") && k > -25) return "再造惡約" + Math.max(0, k + 25) + "可觸發紅蓮密使";
    if (!flag("karma_dongchang_scout") && k > -28) return "再造惡約" + Math.max(0, k + 28) + "可觸發東廠招攬";
    if (!flag("karma_bounty") && k > -40) return "再造惡約" + Math.max(0, k + 40) + "可觸發懸賞追殺";
    if (!flag("karma_crossroads") && Math.abs(k) < 30) return "善惡｜" + (30 - Math.abs(k)) + "｜可觸發三叉夢境";
    if (k >= 40) return "善名遠播，諸多秘聞已開";
    if (k <= -40) return "惡名昭彰，暗路與追殺並至";
    return "善惡尚在天平上";
  }
  const KARMA_EVENTS = [
    { id: "karma_beggar_king", need: function(k){ return k >= 12; }, run: function() {
      setFlag("karma_beggar_king"); addItem("compass_charm", 1); S.renown += 3; S.honor += 2;
      ensureQuests(); if (S.quests.side_karma_good) S.quests.side_karma_good.step = Math.max(S.quests.side_karma_good.step, 1);
      openModal("<h3>義丐傳訊</h3><div class=\"story-box\">破衣老丐塞你定風符：「行善之人，破碗暗線願助。青城、京畿有清風一事。」</div><div class=\"btn-row\"><button class=\"btn primary\" id=\"ke-ok\">收下</button></div>");
      document.getElementById("ke-ok").onclick = function(){ closeModal(); showStory("【善惡機緣】義丐傳訊。定風符入手。"); };
    }},
    { id: "karma_temple_omen", need: function(k){ return k >= 25; }, run: function() {
      setFlag("karma_temple_omen"); setFlag("helped_temple"); S.honor += 3;
      openModal("<h3>蒼雲異象</h3><div class=\"story-box\">夜夢雲空托影：「善念如燈。寺中禪房為你留席。」</div><div class=\"btn-row\"><button class=\"btn primary\" id=\"ke-med\">心嚮往之</button><button class=\"btn\" id=\"ke-later\">他日</button></div>");
      document.getElementById("ke-med").onclick = function(){ closeModal(); S.neili = effectiveStats().neiliMax; S.focus = Math.min(25,(S.focus||5)+1); showStory("內息流轉，定力微增。"); };
      document.getElementById("ke-later").onclick = function(){ closeModal(); showStory("異象散去，邀約仍在。"); };
    }},
    { id: "karma_palace_guard", need: function(k){ return k >= 18 && !flag("palace_entry"); }, run: function() {
      setFlag("karma_palace_guard"); setFlag("palace_entry"); setFlag("map_huanggong");
      openModal("<h3>羽林舉薦</h3><div class=\"story-box\">京畿傳來羽林軍文書：因你善名，准予赴青梧宮外廷一晤侍衛統領。</div><div class=\"btn-row\"><button class=\"btn primary\" id=\"ke-pg\">領文書</button></div>");
      document.getElementById("ke-pg").onclick = function(){ closeModal(); addItem("yulin_pass", 1); showStory("羽林通行證入手。京畿皇城・青梧宮外廷已開。"); };
    }},
    { id: "karma_white_alliance", need: function(k){ return k >= 40; }, run: function() {
      setFlag("karma_white_alliance"); setFlag("qingfeng_ally"); setFlag("invite_baixue"); setFlag("north_pass");
      S.renown += 8; S.honor += 4; ensureQuests();
      if (S.quests.side_karma_good) S.quests.side_karma_good.step = Math.max(S.quests.side_karma_good.step, 2);
      openModal("<h3>清風盟密使</h3><div class=\"story-box\">白雪莊密使：「北地願組清風盟，邀你見證。」</div><div class=\"btn-row\"><button class=\"btn primary\" id=\"ke-join\">應允</button><button class=\"btn\" id=\"ke-soft\">觀望</button></div>");
      document.getElementById("ke-join").onclick = function(){ closeModal(); S.factionRep.baixue_manor=(S.factionRep.baixue_manor||0)+15; if(S.fates.guqinghan==="default") setFate("guqinghan","ally"); showStory("你應下清風盟。"); };
      document.getElementById("ke-soft").onclick = function(){ closeModal(); showStory("密使退去：「善名在，盟約可開。」"); };
    }},
    { id: "karma_redemption_offer", need: function(k){ return k >= 20 && flag("did_evil_act"); }, run: function() {
      setFlag("karma_redemption_offer"); ensureQuests();
      if (S.quests.side_karma_good) S.quests.side_karma_good.step = Math.max(S.quests.side_karma_good.step, 1);
      openModal("<h3>贖罪之機</h3><div class=\"story-box\">雲遊僧：「手上有血，眼底有悔。藥谷施藥、蒼雲抄經，或可贖一分。」</div><div class=\"btn-row\"><button class=\"btn primary\" id=\"ke-red\">願贖</button><button class=\"btn danger\" id=\"ke-no\">不屑</button></div>");
      document.getElementById("ke-red").onclick = function(){ closeModal(); adjustKarma(5,"願贖"); showStory("支線・善名／贖罪已開。"); };
      document.getElementById("ke-no").onclick = function(){ closeModal(); adjustKarma(-2,"拒贖"); showStory("僧人遠去。"); };
    }},
    { id: "karma_black_market", need: function(k){ return k <= -12; }, run: function() {
      setFlag("karma_black_market"); setFlag("blacklist_trade"); setFlag("trade_pass"); ensureQuests();
      if (S.quests.side_karma_evil) S.quests.side_karma_evil.step = Math.max(S.quests.side_karma_evil.step, 1);
      openModal("<h3>黑市掮客</h3><div class=\"story-box\">窄巷低語：「夜行刃、毒粉……夠黑就有貨。」</div><div class=\"btn-row\"><button class=\"btn danger\" id=\"ke-buy\">夜行匕（40金）</button><button class=\"btn\" id=\"ke-pois\">毒粉（25金）</button><button class=\"btn ghost\" id=\"ke-skip\">改日</button></div>");
      document.getElementById("ke-buy").onclick = function(){ closeModal(); if(S.gold>=40){S.gold-=40;addItem("night_dagger",1);adjustKarma(-2,"黑市");showStory("夜行匕首入手。");}else showStory("金錢不足，門路已開。"); };
      document.getElementById("ke-pois").onclick = function(){ closeModal(); if(S.gold>=25){S.gold-=25;addItem("antidote",1);adjustKarma(-3,"購毒");showStory("劇毒粉入手（偽裝匣）。");}else{adjustKarma(-1,"黑市");showStory("談崩。");} };
      document.getElementById("ke-skip").onclick = function(){ closeModal(); showStory("記下暗語。"); };
    }},
    { id: "karma_dongchang_scout", need: function(k){ return k <= -28 && !flag("palace_entry"); }, run: function() {
      setFlag("karma_dongchang_scout"); setFlag("palace_entry"); setFlag("map_huanggong"); setFlag("dongchang_invite");
      openModal("<h3>東廠招攬</h3><div class=\"story-box\">黑衣人遞帖：「惡名入耳。東廠衙署缺刀——進宮門，便進檔案。」</div><div class=\"btn-row\"><button class=\"btn danger\" id=\"ke-dc\">收下東廠帖</button></div>");
      document.getElementById("ke-dc").onclick = function(){ closeModal(); addItem("dongchang_token",1); showStory("東廠帖入手。青梧宮外廷／東廠衙署已開。"); };
    }},
    { id: "karma_cult_scout", need: function(k){ return k <= -25; }, run: function() {
      setFlag("karma_cult_scout"); setFlag("honglian_invite");
      if (!hasItem("lotus_invite")) addItem("lotus_invite", 1);
      S.factionRep.honglian_cult = (S.factionRep.honglian_cult||0)+10; ensureQuests();
      if (S.quests.side_karma_evil) S.quests.side_karma_evil.step = Math.max(S.quests.side_karma_evil.step, 1);
      openModal("<h3>紅蓮密使</h3><div class=\"story-box\">紅衣人：「惡名入幔。聖女願提前見你。」</div><div class=\"btn-row\"><button class=\"btn danger\" id=\"ke-cult\">收帖</button><button class=\"btn\" id=\"ke-cult2\">只要金</button></div>");
      document.getElementById("ke-cult").onclick = function(){ closeModal(); showStory("紅蓮帖入手。"); };
      document.getElementById("ke-cult2").onclick = function(){ closeModal(); S.gold+=40; adjustKarma(-2,"收紅蓮金"); showStory("金囊入手。"); };
    }},
    { id: "karma_bounty", need: function(k){ return k <= -40; }, run: function() {
      setFlag("karma_bounty"); S.renown += 5;
      openModal("<h3>懸賞令</h3><div class=\"story-box\">牆頭繪你面貌：「惡徒懸賞。」伏擊機率上升。</div><div class=\"btn-row\"><button class=\"btn danger\" id=\"ke-bounty\">撕告示</button></div>");
      document.getElementById("ke-bounty").onclick = function(){ closeModal(); showStory("紙屑飛散。雷峰哨敵意加深。"); render(); };
    }},
    { id: "karma_demon_whisper", need: function(k){ return k <= -40 && (S.focus||5) < 12; }, run: function() {
      setFlag("karma_demon_whisper"); setFlag("map_wuyin"); addStatus("neishang", 3);
      openModal("<h3>心魔低語</h3><div class=\"story-box\">無音似有音：「來無音谷……」定力不足。</div><div class=\"btn-row\"><button class=\"btn danger\" id=\"ke-mad\">隨心魔</button><button class=\"btn primary\" id=\"ke-resist\">抑住</button></div>");
      document.getElementById("ke-mad").onclick = function(){ closeModal(); adjustKarma(-3,"心魔"); S.focus=Math.max(1,(S.focus||5)-1); if(S.fates.wuyinqinmo==="default") setFate("wuyinqinmo","mad"); showStory("心魔牽引，魔心未滅之路隱現。"); };
      document.getElementById("ke-resist").onclick = function(){ closeModal(); if((S.focus||5)+(S.wit||5)+Math.random()*10>16){S.focus=Math.min(25,(S.focus||5)+1);adjustKarma(2,"抑心魔");showStory("定力壓下雜念。");}else{S.hp=Math.max(1,S.hp-15);showStory("強抑失敗。");} };
    }},
    { id: "karma_crossroads", need: function(k){ return Math.abs(k) >= 30; }, run: function() {
      setFlag("karma_crossroads");
      openModal("<h3>三叉路口・夢境</h3><div class=\"story-box\">左燈火（善）、右血霧（惡）、中荒徑（平衡）。</div><div class=\"btn-row\"><button class=\"btn primary\" id=\"ke-g\">善念</button><button class=\"btn danger\" id=\"ke-e\">殺意</button><button class=\"btn\" id=\"ke-b\">平衡</button></div>");
      document.getElementById("ke-g").onclick = function(){ closeModal(); S.honor+=3; S.charm=Math.min(30,(S.charm||5)+1); adjustKarma(4,"夢選善"); showStory("俠義、魅力微增。"); };
      document.getElementById("ke-e").onclick = function(){ closeModal(); S.force=Math.min(40,S.force+1); S.agi=Math.min(40,S.agi+1); adjustKarma(-4,"夢選惡"); showStory("武力、身法微增。"); };
      document.getElementById("ke-b").onclick = function(){ closeModal(); S.wit=Math.min(30,S.wit+1); S.focus=Math.min(25,(S.focus||5)+1); showStory("悟性、定力微增。"); };
    }}
  ];
  function checkKarmaPlots(opts) {
    opts = opts || {};
    ensureQuests();
    if (typeof S.karma !== "number") S.karma = 0;
    const k = S.karma;
    for (let i = 0; i < KARMA_EVENTS.length; i++) {
      const ev = KARMA_EVENTS[i];
      if (flag(ev.id)) continue;
      if (!ev.need(k)) continue;
      try { ev.run(); } catch (e) { console.warn("karma", ev.id, e); }
      return true;
    }
    return false;
  }

  // ----- Palace / 皇宮線 -----
  function isFemale() { return S.gender === "女" || S.gender === "female"; }
  function isMale() { return !isFemale(); }
  function genderLabel() { return isFemale() ? "女" : "男"; }
  /** 外人眼中的性別：女扮男裝且未揭穿時視為男 */
  function perceivedGender() {
    if (flag("identity_exposed")) return genderLabel();
    if (S.disguise === "nan" && isFemale()) return "男";
    return genderLabel();
  }
  function perceivedMale() { return perceivedGender() === "男"; }
  function heroPortraitUrl(avatar) {
    if (isFemale() && S.disguise === "nan") {
      const k = avatar ? "heroDisguiseAvatar" : "heroDisguise";
      return asset(k) || asset(avatar ? "heroDisguise" : "heroDisguiseAvatar") || "";
    }
    return "";
  }
  function heroAvatarHtml(sizeClass) {
    const url = heroPortraitUrl(true) || heroPortraitUrl(false);
    const cls = "chibi hero-avatar" + (sizeClass ? " " + sizeClass : "") + (url ? " chibi-portrait" : "");
    if (url) {
      return `<span class="${cls}" style="background-image:url('${url}');background-size:cover;background-position:center top;" title="${escapeHtml(S.name||"主角")}"></span>`;
    }
    return chibiHtml("player", sizeClass);
  }
  function setDisguise(mode) {
    if (!isFemale()) { toast("男主角無需易裝", true); return; }
    S.disguise = mode === "nan" ? "nan" : null;
    saveGameSilent();
    toast(S.disguise === "nan" ? "已改以男裝示人" : "已改以女裝示人", true);
    render();
  }
  function palaceRoleLabel() {
    const r = S.palaceRole || null;
    let base = ({ maid: "宮女", lady: "女官", guard: "御前侍衛", official: "朝官", eunuch: "太監", dongchang: "東廠", fanzi: "東廠", dongchang_boss: "東廠督公", consort: "御前紅人" })[r] || "無";
    if (typeof courtRankLabel === "function" && S.courtTrack && S.courtTrack !== "none") {
      try { base = base + "／" + courtRankLabel(); } catch (e) {}
    }
    return base;
  }
  function hasPalaceAccess() {
    return flag("palace_access") || flag("palace_entry") || flag("map_huanggong") || !!S.palaceRole || flag("eunuch") || hasItem("yulin_pass") || hasItem("dongchang_token") || hasItem("imperial_edict") || hasItem("imperial_token");
  }

  function palaceSubUnlocked(locId) {
    const PALACE_SUB = {
      wumen:1, taihedian:1, qianqing:1, yangxin:1, wenyuan:1, yushan:1, neiwufu:1,
      yuhuayuan:1, dianshi:1, wuying:1, tianlao:1, xingbu_prison:1, xingbu_gate:1,
      bingzhang:1, siku:1, taipusi:1, taiyiyuan:1, jingshen:1, yuhe_wharf:1, shenwu:1,
      xingxing_tai:1, yongxing_shi:1
    };
    if (!PALACE_SUB[locId]) return null;
    if (!hasPalaceAccess()) return false;
    const role = S.palaceRole || "";
    const isMaid = role === "maid" || role === "lady" || role === "consort";
    const isGuard = role === "guard" || role === "official";
    const isEunuch = role === "eunuch" || role === "dongchang" || flag("eunuch");
    const high = hasItem("imperial_token") || hasItem("imperial_edict") ||
      (S.fates && (S.fates.jingandi === "married" || S.fates.jingandi === "muse")) ||
      (S.emperorFavor || 0) >= 25;

    if (locId === "jingshen") {
      return !!(flag("eunuch") || flag("sold_as_eunuch") || flag("eunuch_path") || role === "eunuch" || role === "dongchang" || (S.karma || 0) <= -40 || (S.courtTrack === "eunuch"));
    }
    if (locId === "tianlao" || locId === "xingbu_prison") {
      return !!(isEunuch || isGuard || high || (typeof isImprisoned === "function" && isImprisoned()) ||
        (S.prison && (S.prison.place === "huanggong" || S.prison.place === "tianlao" || S.prison.place === "xingbu_prison")));
    }
    if (locId === "yangxin") {
      return !!(isMaid || isEunuch || high || flag("hougong_access") || (S.emperorFavor || 0) >= 10 || isGuard);
    }
    if (locId === "yuhuayuan" || locId === "yushan" || locId === "neiwufu") {
      return !!(isMaid || isEunuch || flag("neiting_access") || high || isGuard);
    }
    if (locId === "wuying" || locId === "bingzhang" || locId === "wumen" || locId === "shenwu") {
      return true;
    }
    if (locId === "dianshi" || locId === "wenyuan" || locId === "siku") {
      return !!(role === "official" || role === "lady" || high || (S.wit || 0) >= 12 || (S.renown || 0) >= 20 || isEunuch || isGuard);
    }
    if (locId === "taipusi") {
      return true;
    }
    if (locId === "taiyiyuan" || locId === "taihedian" || locId === "qianqing" || locId === "xingbu_gate" || locId === "yuhe_wharf") {
      return true;
    }
    if (locId === "xingxing_tai" || locId === "yongxing_shi") {
      return !!(isEunuch || role === "dongchang" || high || flag("punished_prison") || flag("punish_dossier") ||
        (typeof isImprisoned === "function" && isImprisoned()) ||
        (S.prison && (S.prison.place === "tianlao" || S.prison.place === "yongxing_shi" || S.prison.place === "xingxing_tai")));
    }
    return true;
  }

  function openForbiddenCityMap() {
    if (typeof openForbiddenCityMapTagged === "function") return openForbiddenCityMapTagged();
    if (!hasPalaceAccess()) return toast("尚無入宮之權", true);
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
    let html = "<h3>紫禁城內圖</h3><div class=\"story-box small\">依宮職／通行權顯示可入之處。淨身房僅太監／東廠／極惡路徑可見。</div><div class=\"btn-row\" style=\"flex-wrap:wrap;gap:6px\">";
    let n = 0;
    entries.forEach(function(e){
      const id = e[0], name = e[1];
      const loc = LOCATIONS.find(function(l){ return l.id === id; });
      if (!loc || !locUnlocked(loc)) return;
      n++;
      html += "<button class=\"btn\" data-fc=\"" + id + "\">" + name + "</button>";
    });
    if (!n) html += "<span class=\"small\">暫無可入子地——先取得宮職或通行憑證。</span>";
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
        if (typeof maybePalaceIncident === "function") {
          try { maybePalaceIncident(); } catch (err) {}
        }
        render();
      };
    });
  }


  function applyEunuchFate() {
    setFlag("eunuch"); setFlag("sold_as_eunuch"); setFlag("palace_access"); setFlag("palace_entry"); setFlag("map_huanggong");
    S.palaceRole = "eunuch";
    S.force = Math.max(1, (S.force || 10) - 8);
    S.agi = Math.max(1, (S.agi || 8) - 4);
    S.bone = Math.max(1, (S.bone || 5) - 3);
    S.hpMax = Math.max(40, (S.hpMax || 100) - 20);
    S.hp = Math.min(S.hp, S.hpMax);
    adjustKarma(-15, "淨身入宮");
    addStatus("neishang", 4);
    S.trauma = (S.trauma || 0) + 1;
    if (!hasItem("eunuch_ledger")) addItem("eunuch_ledger", 1);
    ensureQuests();
    if (S.quests.side_palace_revenge) S.quests.side_palace_revenge.step = Math.max(S.quests.side_palace_revenge.step || 0, 1);
    if (S.quests.side_eunuch_revenge) S.quests.side_eunuch_revenge.step = Math.max(S.quests.side_eunuch_revenge.step || 0, 1);
    if (S.companion) S.companion = null;
  }
  function applyEunuchConsequences() { applyEunuchFate(); }
  function trySoldAsEunuchEvent(reason) {
    if (!perceivedMale()) return false;
    if (flag("eunuch") || flag("sold_as_eunuch") || flag("escaped_enslavement")) return false;
    const st = effectiveStats();
    const difficulty = 30 + (alignmentTier() === "villain" ? 4 : 0) + (isImprisoned() ? 3 : 0);
    const score = st.force + st.agi + st.luck + (Math.random() * 18 | 0);
    setFate("renyazi", "enemy");
    if (score >= difficulty) {
      setFlag("escaped_enslavement");
      adjustKarma(2, "掙脫人牙");
      S.hp = Math.max(1, S.hp - 18);
      addStatus("neishang", 2);
      showStory("人牙子蒙眼縛手（" + (reason || "危難") + "）——你拚死掙扎！\n繩斷，你帶傷衝出暗巷。背後咒罵漸遠。（反抗成功・重傷）");
      return true;
    }
    applyEunuchFate();
    S.loc = "huanggong";
    showStory("灯火熄滅。再睜眼時，已是青梧宮偏殿側室。\n有些路一旦踏上便無法回頭——你被記入太監籍。東廠的影子，開始在廊下晃動。\n（寫意：氣力／身法／根骨大損；宮牆血債／淨身復仇支線已開）");
    render();
    return true;
  }
  function maybeTriggerEnslavement() {
    if (!perceivedMale() || flag("eunuch") || flag("sold_as_eunuch") || flag("escaped_enslavement")) return false;
    const vulnerable = isImprisoned() || S.hp <= Math.max(15, effectiveStats().hpMax * 0.2) || alignmentTier() === "villain" || flag("renyazi_ambush");
    if (!vulnerable) return false;
    if (Math.random() > 0.35 && !flag("renyazi_ambush")) return false;
    return trySoldAsEunuchEvent(isImprisoned() ? "關押虛弱" : "危難／惡名");
  }

  function startPalaceIntroPlot() {
    setFlag("palace_entry");
    setFlag("map_huanggong");
    setFlag("palace_access");
    setFlag("palace_intro_started");
    ensureQuests();
    if (S.quests.side_palace_line) {
      S.quests.side_palace_line.step = Math.max(S.quests.side_palace_line.step || 0, 1);
    } else {
      S.quests.side_palace_line = { id: "side_palace_line", title: "支線・青梧宮門", step: 1, done: false };
    }
    S.loc = "huanggong";
    S.day = (S.day || 1) + 1;
    const pg = (typeof perceivedGender === "function") ? perceivedGender() : ((S.gender === "女" || S.gender === "female") && S.disguise !== "nan" ? "女" : "男");
    let hint = "禁軍喝問來意。外廷廊柱如林，宮燈未熄。";
    if (pg === "女") hint += "\\n有人低語：後宮缺灑掃之人……亦可憑才貌求見掌事。";
    else hint += "\\n羽林與東廠皆在招人；若無憑證，也可先觀牆伺機。";
    showStory("【入宮開場】你自青梧宮門驛叩門，吏卒驗身後放你入外廷。\\n" + hint + "\\n（青梧宮外廷已開。請於此地選擇宮職／觀氣象，繼續皇宮線。）");
    toast("入宮線・外廷已開", true);
    render();
  }

  function setPalaceRole(role) {
    if (role === "fanzi" || role === "dongchang_boss") role = "dongchang";
    S.palaceRole = role;
    setFlag("palace_access"); setFlag("palace_entry"); setFlag("map_huanggong");
    if (role === "maid" || role === "lady" || role === "consort") { setFlag("hougong_access"); setFlag("neiting_access"); }
    if (role === "dongchang" || role === "eunuch") setFlag("dongchang_invite");
    if (role === "guard" || role === "official") { setFlag("yulin_ok"); setFlag("neiting_access"); }
    if (role && !hasItem("palace_badge")) addItem("palace_badge", 1);
    toast("宮職：" + palaceRoleLabel(), true);
  }


  function appendPalaceAndCh3Actions(acts, locId) {
    ensureQuests();
    // Direct palace-entry hub
    if (locId === "gongmen_yi" || locId === "jingji" || locId === "hub") {
      if (!flag("palace_intro_started") && !hasPalaceAccess()) {
        acts.push({ label: "【皇宮線】叩青梧宮門・開啟入宮劇情", fn: function(){ startPalaceIntroPlot(); } });
      } else if (hasPalaceAccess() && locId === "gongmen_yi") {
        acts.push({ label: "再入青梧宮外廷", fn: function(){
          S.loc = "huanggong"; toast("入・青梧宮外廷", true); render();
        }});
      }
    }

    // Hub: camp + board
    if (locId === "jingji" || locId === "qingcheng") {
      acts.push({ label: "江湖榜／傳聞", fn: function(){ openRumorBoard(); } });
    }
    // Chapter 3
    if (S.quests.main2 && S.quests.main2.done && S.quests.main3 && !S.quests.main3.done) {
      if ((locId === "jingji" || locId === "qingcheng") && S.quests.main3.step === 0) {
        acts.push({ label: "【主線三】打聽天命分途", fn: function(){
          S.quests.main3.step = 1; setFlag("ch3_started"); setFlag("ch3_rumor");
          const tier = alignmentTier();
          let lean = "中立觀望";
          if (tier === "saint" || tier === "good") lean = "傳聞偏重俠義道／清風盟";
          else if (tier === "villain" || tier === "wicked") lean = "傳聞偏重霸途／殘印私用";
          showStory("茶樓低語：夜王殘印餘波未盡，三方爭鋒。\\n（你的善惡傾向：" + karmaBandLabel() + "——" + lean + "）\\n請收集三證據：邊關毒線、紅蓮內訌、古墓禁制。");
        }});
      }
      if (S.quests.main3.step >= 1 && S.quests.main3.step < 2) {
        if (locId === "bianguan" && !flag("ch3_ev_border")) {
          acts.push({ label: "【主線三】查邊關毒線", fn: function(){
            startCombat("toxin_scout", function(){
              setFlag("ch3_ev_border"); addItem("border_toxin_proof", 1);
              tryAdvanceCh3AfterEvidence();
              showStory("毒線证物入手。邊關線索已明。");
            });
          }});
        }
        if (locId === "honglian" && !flag("ch3_ev_lotus")) {
          acts.push({ label: "【主線三】探紅蓮內訌", fn: function(){
            startCombat("cult_zealot", function(){
              setFlag("ch3_ev_lotus"); addItem("lotus_rift_note", 1);
              tryAdvanceCh3AfterEvidence();
              showStory("內訌密箋入手。");
            });
          }});
        }
        if (locId === "yewang" && !flag("ch3_ev_tomb")) {
          acts.push({ label: "【主線三】察墓中禁制", fn: function(){
            startCombat("tomb_shade", function(){
              setFlag("ch3_ev_tomb"); addItem("tomb_rift_seal", 1);
              tryAdvanceCh3AfterEvidence();
              showStory("古墓鬆動印入手。");
            });
          }});
        }
      }
      if (S.quests.main3.step === 2 && !flag("ch3_path_honor") && !flag("ch3_path_force") && !flag("ch3_path_wit")) {
        if (locId === "cangyun" || locId === "tiantai" || locId === "heishui" || locId === "honglian" || locId === "shuiyun" || locId === "meihua" || locId === "jingji") {
          acts.push({ label: "【主線三】選擇天命分途", fn: function(){ openCh3PathChoice(); } });
        }
      }
      if (S.quests.main3.step >= 3 || (S.quests.main3.step === 2 && (flag("ch3_path_honor")||flag("ch3_path_force")||flag("ch3_path_wit")))) {
        if (locId === "wuyin" || locId === "yewang") {
          acts.push({ label: "【主線三】了結天命", fn: function(){
            if (!hasItem("chapter3_shard") && !hasItem("fate_edict")) addItem("fate_edict", 1);
            S.quests.main3.step = 3;
            finishChapter3();
          }});
        }
      }
    }
    // Karma side completions
    if (locId === "yaogu" && S.quests.side_karma_good && S.quests.side_karma_good.step >= 1 && !S.quests.side_karma_good.done) {
      acts.push({ label: "【支線】藥谷施藥贖罪", fn: function(){
        S.quests.side_karma_good.done = true; S.quests.side_karma_good.step = 3;
        adjustKarma(6, "施藥"); S.medicine = Math.min(20, (S.medicine||3)+1); S.renown += 3;
        showStory("你施藥三日。蘇晚晴點頭：「心若向善，藥石可醫業。」");
      }});
    }
    if (locId === "cangyun" && S.quests.side_karma_good && S.quests.side_karma_good.step >= 1 && !S.quests.side_karma_good.done) {
      acts.push({ label: "【支線】抄經贖罪", fn: function(){
        S.quests.side_karma_good.done = true; S.quests.side_karma_good.step = 3;
        adjustKarma(6, "抄經"); S.focus = Math.min(25, (S.focus||5)+1); S.honor += 3;
        showStory("抄經聲落。雲空：「放下屠刀，未為晚也。」");
      }});
    }
    if (locId === "jingji" && flag("blacklist_trade") && S.quests.side_karma_evil && S.quests.side_karma_evil.step >= 1 && !S.quests.side_karma_evil.done) {
      acts.push({ label: "【支線】黑市密約交割", fn: function(){
        S.quests.side_karma_evil.done = true; S.quests.side_karma_evil.step = 2;
        S.gold += 60; adjustKarma(-4, "黑市交割"); if (!hasItem("night_dagger")) addItem("night_dagger", 1);
        showStory("暗巷交割完畢。刀與金都沾着腥。");
      }});
    }
    // New sides brief loops
    if (locId === "qingcheng" && S.quests.side_child && S.quests.side_child.step === 0) {
      acts.push({ label: "【支線】聽童小六童謠", fn: function(){
        S.quests.side_child.step = 1; setFlag("forever_intel");
        showStory("童小六唱：「宮門深，牙子狠……」似有京畿暗巷線索。");
        setFlag("heard_renyazi");
      }});
    }
    if (locId === "qingcheng" && S.quests.side_child && S.quests.side_child.step === 1 && !S.quests.side_child.done) {
      acts.push({ label: "【支線】給糖換情報", fn: function(){
        if (hasItem("candy")) removeItem("candy", 1); else if (S.gold >= 5) S.gold -= 5; else return toast("需要糖或5金", true);
        S.quests.side_child.done = true; S.quests.side_child.step = 2; setFlag("side_child_done");
        S.renown += 2; adjustKarma(1, "護童");
        showStory("童小六塞你一張歪歪畫畫的皇城草圖。青梧宮方位隱約可辨。");
        setFlag("map_huanggong");
      }});
    }
    if (locId === "jingji" && S.quests.side_cook && S.quests.side_cook.step === 0) {
      acts.push({ label: "【支線】幫孤燈備夜粥", fn: function(){
        S.quests.side_cook.step = 1; showStory("孤燈婆婆：「缺一撮藥谷的安神草。取來，夜宵升級。」"); setFlag("heard_yaogu");
      }});
    }
    if (locId === "jingji" && S.quests.side_cook && S.quests.side_cook.step === 1 && hasItem("herb") && !S.quests.side_cook.done) {
      acts.push({ label: "【支線】交草開夜宵", fn: function(){
        removeItem("herb", 1); S.quests.side_cook.done = true; S.quests.side_cook.step = 2;
        S.cookMealLevel = 1; setFlag("cook_upgrade"); adjustKarma(1, "助炊");
        showStory("夜粥飄香。孤燈夜宵效果提升。");
      }});
    }
    if (locId === "xueyuan" && S.quests.side_snow && S.quests.side_snow.step === 0) {
      acts.push({ label: "【支線】雪原狼嚎", fn: function(){
        startCombat("snow_wolf", function(){
          S.quests.side_snow.done = true; S.quests.side_snow.step = 1; setFlag("wolf_hunt");
          S.bone += 1; S.renown += 3; showStory("狼患暫平。雪原人記你一功。");
        });
      }});
    }
    if (locId === "leifeng" && S.quests.side_lei && S.quests.side_lei.step === 0) {
      acts.push({ label: "【支線】雷峰冤案", fn: function(){
        S.quests.side_lei.step = 1; showStory("雷萬山壓低聲音：「有書吏吞沒軍餉。幫我查清，哨所欠你人情。」");
      }});
    }
    if (locId === "leifeng" && S.quests.side_lei && S.quests.side_lei.step === 1 && !S.quests.side_lei.done) {
      acts.push({ label: "【支線】對質貪吏", fn: function(){
        startCombat("corrupt_clerk", function(){
          S.quests.side_lei.done = true; S.quests.side_lei.step = 2; setFlag("lei_cleared");
          addItem("lei_case_scroll", 1); adjustKarma(3, "清冤"); S.renown += 4;
          if (S.fates.leiwanshan === "default") setFate("leiwanshan", "ally");
          showStory("冤案卷宗入手。雷萬山視你為友。");
        });
      }});
    }
    if (locId === "chixia" && S.quests.side_chixia && S.quests.side_chixia.step === 0) {
      acts.push({ label: "【支線】赤霞試劍", fn: function(){
        startCombat("elite_bandit", function(){
          S.quests.side_chixia.step = 1; showStory("赤霞仙子遠立：「刀很快。若想真傳，再來崖上一晤。」");
        });
      }});
    }
    if (locId === "chixia" && S.quests.side_chixia && S.quests.side_chixia.step === 1 && !S.quests.side_chixia.done) {
      acts.push({ label: "【支線】請示劍意", fn: function(){
        S.quests.side_chixia.done = true; S.quests.side_chixia.step = 2;
        if (S.skills.indexOf("scarlet_arc") < 0) S.skills.push("scarlet_arc");
        setFate("chixiaxian", "ally"); S.exp += 10;
        showStory("赤霞一式入門。仙子點頭：「莫負劍心。」");
      }});
    }

    // Palace locations
    if (locId === "renyazi_alley") {
      acts.push({ label: "窺探人牙子", fn: function(){
        setFlag("renyazi_ambush");
        if (isMale() && !flag("eunuch") && !flag("escaped_enslavement")) {
          trySoldAsEunuchEvent("誤入牙巷");
        } else {
          startCombat("bounty_thug", function(){
            setFate("renyazi", "enemy"); S.gold += 20; adjustKarma(2, "搗牙巷");
            showStory("你打散牙子黨羽。巷中哭聲暫歇。");
          });
        }
      }});
    }
    if (locId === "huanggong") {
      if (!S.palaceRole) {
        if (isFemale()) {
          acts.push({ label: "自薦入宮為宮女", fn: function(){
            setPalaceRole("maid"); setFate("gongnv_head", "ally");
            showStory("掌事姑姑打量你：「手腳勤快，先從灑掃做起。」");
          }});
        }
        if (isMale() && !flag("eunuch")) {
          acts.push({ label: "投效羽林侍衛", fn: function(){
            if (S.renown < 10 && !hasItem("yulin_pass")) return toast("聲望不足或需羽林通行證", true);
            setPalaceRole("guard"); setFate("yulin_tongling", "ally");
            showStory("羽林統領：「刀槍進營，心術別歪。」");
          }});
          acts.push({ label: "走科舉／軍功做官（需聲望）", fn: function(){
            if (S.renown < 25) return toast("聲望需 25", true);
            setPalaceRole("official"); S.wit += 1; S.gold += 50;
            showStory("吏部掛號。你成了掛名朝官，出入外廷方便許多。");
          }});
        }
        if (flag("dongchang_invite") || hasItem("dongchang_token") || alignmentTier() === "wicked" || alignmentTier() === "villain") {
          acts.push({ label: "投效東廠為番子", fn: function(){
            setPalaceRole("dongchang"); setFate("dongchang_gong", "ally"); adjustKarma(-3, "入東廠");
            showStory("東廠督公：「檔案裡寫你的名字。從今晚起，你替廠裡跑腿。」");
          }});
        }
      }
      acts.push({ label: "觀宮牆氣象", fn: function(){
        S.exp += 3; showStory("宮牆高聳，紅燈如血。你的宮職：" + palaceRoleLabel() + "。");
      }});
      acts.push({ label: "紫禁城內圖", fn: function(){ openForbiddenCityMap(); } });
    }
    if (locId === "neiting" && (flag("neiting_access") || S.palaceRole === "lady" || S.palaceRole === "consort" || S.palaceRole === "guard" || S.palaceRole === "official" || flag("eunuch"))) {
      acts.push({ label: "花廊徘徊", fn: function(){
        if (Math.random() < 0.3) { S.charm = Math.min(30,(S.charm||5)+1); showStory("花香入袖，魅力微增。"); }
        else showStory("內廷花廊靜悄，遠聞樂聲。");
      }});
    }
    if (locId === "dongchang" && (S.palaceRole === "dongchang" || S.palaceRole === "dongchang" || S.palaceRole === "eunuch" || flag("dongchang_invite"))) {
      acts.push({ label: "東廠報到／練檔", fn: function(){
        S.exp += 5; S.perception = Math.min(25, (S.perception||5)+ (Math.random()<0.25?1:0));
        showStory("檔案味刺鼻。你學會多記一筆人名。");
      }});
      if (S.palaceRole === "dongchang" && (S.karma||0) <= -35 && S.renown >= 20) {
        acts.push({ label: "【野心】取而代之・督公之位", fn: function(){
          if (flag("donggong_love") || flag("donggong_slave") || S.fates.dongchang_gong === "muse" || S.fates.dongchang_gong === "slave") {
            openModal("<h3>奪印？</h3><div class=\"story-box\">他已是你的知己／廠奴。強奪督公之位，等於親手斬斷墨契——也可改走「以奴代印」（保留他為心腹，你掌實權）。</div>" +
              "<div class=\"btn-row\"><button class=\"btn\" id=\"amb-force\">仍要奪印（殺／逐）</button>" +
              "<button class=\"btn primary\" id=\"amb-keep\">以奴代印・共掌東廠</button>" +
              "<button class=\"btn ghost\" onclick=\"closeModal()\">作罷</button></div>");
            document.getElementById("amb-force").onclick = function(){
              closeModal();
              startCombat("elite_bandit", function(){
                setPalaceRole("dongchang_boss"); setFate("dongchang_gong", "dead");
                S.renown += 10; adjustKarma(-8, "殺奴奪印"); bumpDonggongTrust(-100, "背叛");
                showStory("墨契碎於血泊。廠印入手——你成了新督公，卻再無那個肯為你裂縫的人。");
              }, function(){
                setFlag("dongchang_ambition_fail");
                bumpPalaceHeat(25); bumpEmperorFavor(-12, "廠變");
                const pk = pickPunishmentByHeat({ heatBonus: 30, forceKind: Math.random() < 0.5 ? "zhanshou" : null });
                applyPalacePunishment(pk || "xingxing", { why: "東廠奪印失敗", by: "dongchang_gong", hard: true });
              });
            };
            document.getElementById("amb-keep").onclick = function(){
              closeModal();
              setPalaceRole("dongchang_boss");
              setFlag("donggong_slave"); setFlag("donggong_abandon_revenge");
              if (S.fates.dongchang_gong !== "slave") setFate("dongchang_gong", "slave");
              bumpDonggongTrust(10, "以奴代印");
              ensureBonds();
              const b = S.bonds.dongchang_gong || { roles: [], unlocked: [], sinceDay: S.day };
              if (b.roles.indexOf("slave") < 0) b.roles.push("slave");
              if (b.unlocked.indexOf("dongchang_slave") < 0) b.unlocked.push("dongchang_slave");
              S.bonds.dongchang_gong = b;
              S.renown += 8; adjustKarma(-2, "掌廠");
              showStory("你按下他的手：「印歸我，命歸你。」他跪下——廠衛聽令於你，弒君之刃收入鞘中。");
            };
            return;
          }
          startCombat("elite_bandit", function(){
            setPalaceRole("dongchang_boss"); setFate("dongchang_gong", "dead");
            S.renown += 10; adjustKarma(-5, "奪督公");
            showStory("舊督公倒下。廠印入手——你成了新的東廠督公。");
          }, function(){
            setFlag("dongchang_ambition_fail");
            bumpPalaceHeat(20);
            bumpEmperorFavor(-10, "廠變");
            const pk = pickPunishmentByHeat({ heatBonus: 25, forceKind: Math.random() < 0.4 ? "zhanshou" : null });
            applyPalacePunishment(pk || "xingxing", { why: "東廠奪印失敗", by: "dongchang_gong", hard: true });
          });
        }});
      }
      if (flag("eunuch") && S.quests.side_palace_revenge && !S.quests.side_palace_revenge.done) {
        acts.push({ label: "【復仇】追查人牙子下落", fn: function(){
          S.quests.side_palace_revenge.step = Math.max(S.quests.side_palace_revenge.step, 2);
          setFlag("heard_renyazi");
          showStory("檔案顯示：人牙子常出沒京畿暗巷。東廠刀，該出鞘了。");
        }});
      }
    }
    if (locId === "yulin" && (S.palaceRole === "guard" || S.palaceRole === "official" || hasItem("yulin_pass"))) {
      acts.push({ label: "侍衛營操練", fn: function(){
        S.exp += 6; if (Math.random() < 0.2) S.force += 1;
        showStory("羽林操演，汗透重甲。");
      }});
    }
    if (locId === "hougong" && (flag("hougong_access") || S.palaceRole === "consort" || S.palaceRole === "lady" || (S.fates.jingandi === "married" || S.fates.jingandi === "muse"))) {
      acts.push({ label: "璇璣殿請安", fn: function(){
        talkNpc("jingandi");
        setTimeout(function(){ try { donggongEmperorBrotherHint(); } catch (e) {} }, 600);
      }});
      if ((S.emperorFavor || 0) >= 30 || S.fates.jingandi === "muse" || S.fates.jingandi === "married") {
        acts.push({ label: "醉問・失散幼弟", fn: function(){
          setFlag("palace_wine_tonight");
          donggongEmperorBrotherHint();
          if (!flag("donggong_name_hint")) {
            setFlag("donggong_name_hint");
            ensureDonggongQuest(1);
            showStory("景安帝把酒盞一頓：「朕的幼弟……靖王。若還在人間，該與東廠某個影子一般年紀。」");
          }
        }});
      }
    }
    // 督公影事・敵人殘信
    if (locId === "renyazi_alley" || locId === "heishui") {
      try { donggongEnemyRemnantHook(locId); } catch (e) {}
    }
    // Revenge confrontation
    if (locId === "renyazi_alley" && flag("eunuch") && S.quests.side_palace_revenge && S.quests.side_palace_revenge.step >= 2 && !S.quests.side_palace_revenge.done) {
      acts.push({ label: "【復仇】對質人牙子", fn: function(){
        startCombat("bounty_thug", function(){
          S.quests.side_palace_revenge.done = true; S.quests.side_palace_revenge.step = 3;
          setFate("renyazi", "dead"); adjustKarma(4, "復仇");
          S.renown += 8;
          showStory("人牙子伏法。宮牆外的風，終於不那麼腥。\\n（可走向結局「東廠督公報仇」傾向）");
          setFlag("palace_revenge_done");
        });
      }});
    }
    if (typeof appendCourtCareerActions === "function") {
      try {
        if (locId === "huanggong" || locId === "neiting" || locId === "hougong" || locId === "yulin" || locId === "dongchang" || locId === "gongmen_yi") {
          appendCourtCareerActions(acts, locId);
        }
      } catch (e) { console.warn("court career hub", e); }
    }
  }
  function openCh3PathChoice() {
    const tier = alignmentTier();
    let rec = "隱逸";
    if (tier === "saint" || tier === "good") rec = "俠義道";
    else if (tier === "villain" || tier === "wicked") rec = "霸途";
    openModal("<h3>天命分途</h3><div class=\"story-box\">三證據已齊。選一條路（互斥）。\\n善惡：" + karmaBandLabel() + " · 推薦傾向：<b>" + rec + "</b></div>"
      + "<div class=\"btn-row\">"
      + "<button class=\"btn primary\" id=\"c3h\">俠義道（蒼雲＋天台）" + (rec==="俠義道"?" ★":"") + "</button>"
      + "<button class=\"btn danger\" id=\"c3f\">霸途（黑水＋紅蓮）" + (rec==="霸途"?" ★":"") + "</button>"
      + "<button class=\"btn\" id=\"c3w\">隱逸（水雲＋梅塢）" + (rec==="隱逸"?" ★":"") + "</button>"
      + "<button class=\"btn ghost\" onclick=\"closeModal()\">再想想</button></div>");
    document.getElementById("c3h").onclick = function(){
      closeModal(); setFlag("ch3_path_honor"); S.quests.main3.step = 3; adjustKarma(5,"選俠義道");
      if (!hasItem("fate_edict")) addItem("fate_edict", 1);
      showStory("你聯蒼雲與天台。殘印當碎，不可私用。前往無音谷／夜王墓了結。");
    };
    document.getElementById("c3f").onclick = function(){
      closeModal(); setFlag("ch3_path_force"); S.quests.main3.step = 3; adjustKarma(-5,"選霸途");
      if (!hasItem("chapter3_shard")) addItem("chapter3_shard", 1);
      showStory("你聯黑水與紅蓮。殘印餘焰將入你掌心。前往決戰。");
    };
    document.getElementById("c3w").onclick = function(){
      closeModal(); setFlag("ch3_path_wit"); S.quests.main3.step = 3;
      if (!hasItem("fate_edict")) addItem("fate_edict", 1);
      showStory("你聯水雲與梅塢。殘印當封湖心。前往儀典之地。");
    };
  }

  // ---------- QUESTS / STORY ----------
  const ENDING_DEFS = {
    fame: {
      id: "fame", title: "名揚天下",
      epi: "你的聲望如潮。茶樓說書人以你為題，邊關與寺觀皆傳俠名。殘印未成私器，江湖因你多幾分公道。",
      need: (s) => (s.renown || 0) >= 40 && ((s.karma || 0) >= 35 || (s.honor || 0) >= 25) && !flag("ch3_path_force")
    },
    blood: {
      id: "blood", title: "血洗江湖",
      epi: "仇敵疊屍，命運簿上多「死」字。你走霸途，殘印入掌，夜色裡只有刀光認得你。",
      need: (s) => (s.karma || 0) <= -40 || countEnemyDeadFates() >= 3 || flag("ch3_path_force")
    },
    romance: {
      id: "romance", title: "紅塵倦旅",
      epi: "劍收鞘中，情落人間。有人願與你共一盞燈火，江湖再遠，也只是歸途上的風。",
      need: (s) => hasAnySpouseOrMuse()
    },
    dao: {
      id: "dao", title: "方外仙緣",
      epi: "寺觀鐘聲替你斷卻塵緣。定力日深，殘印封入星圖，你願做方外一筆清風。",
      need: (s) => (flag("disciple_yun") || flag("dao_student") || s.faction === "cangyun_sect") && (s.focus || 0) >= 10
    },
    merchant: {
      id: "merchant", title: "商隱巨賈",
      epi: "算盤聲裡藏刀。你與商會共進退，金帛足可買平安，亦買一個低調的江湖。",
      need: (s) => (hasBondRole("tiesuanpan", "partner") || flag("partner_tie")) && (s.gold || 0) + (s.investGold || 0) >= 200
    },
    lone: {
      id: "lone", title: "獨行劍冢",
      epi: "劍冢風嘯，知己寥寥。你清過殘鋒與黑夜，寧可一人上路，也不欠誰一句盟約。",
      need: (s) => flag("map_jianzhong") && countAllyBonds() <= 1 && (s.honor || 0) < 20
    },
    demon: {
      id: "demon", title: "魔心未滅",
      epi: "無音牽引，心魔為伴。殘印餘焰與惡名同燃。",
      need: (s) => flag("karma_demon_whisper") || s.fates.wuyinqinmo === "mad" || ((s.karma || 0) <= -35 && flag("map_wuyin"))
    },
    redemption: {
      id: "redemption", title: "浪子回頭",
      epi: "曾造惡業，終願贖罪。你轉身走向燈火。",
      need: (s) => flag("did_evil_act") && (s.karma || 0) >= 20 && (flag("karma_redemption_offer") || (s.quests.side_karma_good && s.quests.side_karma_good.done))
    },
    consort: {
      id: "consort", title: "伴駕青梧",
      epi: "璇璣殿燈火長明。你以情義而非權柄伴於景安帝側，青梧宮牆內外，江湖風雨皆成遠景。",
      need: (s) => s.fates.jingandi === "married" || s.fates.jingandi === "muse" || s.palaceRole === "consort" || hasItem("imperial_token")
    },
    palace_consort: {
      id: "palace_consort", title: "伴駕青梧",
      epi: "璇璣殿燈火長明。你以情義而非權柄伴於景安帝側，青梧宮牆內外，江湖風雨皆成遠景。",
      need: (s) => s.fates.jingandi === "married" || s.fates.jingandi === "muse" || s.palaceRole === "consort" || hasItem("imperial_token")
    },
    dongchang_end: {
      id: "dongchang_end", title: "東廠督公",
      epi: "廠印入手，檔案如刀。你坐鎮東廠，京畿暗流聽你號令。",
      need: (s) => (s.palaceRole === "dongchang" || flag("palace_revenge_done")) && ((s.karma || 0) <= -20 || flag("eunuch"))
    },
    dongchang_lord: {
      id: "dongchang_lord", title: "東廠督公",
      epi: "廠印入手，檔案如刀。你坐鎮東廠，京畿暗流聽你號令。",
      need: (s) => s.palaceRole === "dongchang" && ((s.karma || 0) <= -25 || flag("palace_revenge_done"))
    },
    eunuch_revenge: {
      id: "eunuch_revenge", title: "淨身復仇",
      epi: "牙巷血債已清。宮籍上的名字仍在，但你已不是被販來的貨色——東廠與宮牆成了你的刃與盾。",
      need: (s) => flag("eunuch") && (flag("palace_revenge_done") || (s.quests && s.quests.side_palace_revenge && s.quests.side_palace_revenge.done) || (s.quests && s.quests.side_eunuch_revenge && s.quests.side_eunuch_revenge.done))
    },
    donggong_regicide: {
      id: "donggong_regicide", title: "影弒青梧",
      epi: "你與廠奴玄梧共謀弒君。璇璣殿燈滅那夜，青梧朝換了血色——江湖再無安枕。",
      need: (s) => flag("donggong_regicide_plan") && (flag("donggong_truth_known") || flag("donggong_confessed"))
    },
    donggong_reconcile: {
      id: "donggong_reconcile", title: "雙龍相認",
      epi: "偽詔焚盡，殘玉合璧。景安帝與失散幼弟玄梧相認——廠印仍在，殺意已熄。你成全一段皇族血緣。",
      need: (s) => flag("donggong_reconciled")
    },
    donggong_slave_end: {
      id: "donggong_slave_end", title: "廠奴心腹",
      epi: "墨契深於君臣。玄梧棄弒兄之刃，只作你一人的刀與盾——宮牆內外，皆聽你號令。",
      need: (s) => flag("donggong_slave") && flag("donggong_abandon_revenge") && (s.fates && (s.fates.dongchang_gong === "slave" || s.fates.dongchang_gong === "partner" || s.fates.dongchang_gong === "muse"))
    }
  };
  function countEnemyDeadFates() {
    let n = 0;
    Object.keys(S.fates || {}).forEach(id => {
      const f = S.fates[id];
      if (f === "dead" || f === "enemy") n++;
    });
    return n;
  }
  function hasAnySpouseOrMuse() {
    return Object.keys(S.bonds || {}).some(id => {
      const roles = (S.bonds[id] && S.bonds[id].roles) || [];
      return roles.indexOf("spouse") >= 0 || roles.indexOf("muse") >= 0 || roles.indexOf("mad_muse") >= 0;
    }) || Object.keys(S.fates || {}).some(id => {
      const f = S.fates[id];
      return f === "married" || f === "muse";
    });
  }
  function countAllyBonds() {
    let n = 0;
    Object.keys(S.bonds || {}).forEach(id => {
      if ((S.bonds[id].roles || []).length) n++;
    });
    Object.keys(S.fates || {}).forEach(id => {
      if (["ally","hero","master","teacher","partner","married","muse","slave","redeemed"].indexOf(S.fates[id]) >= 0) n++;
    });
    return n;
  }
  function estimateEndingWeights() {
    const scores = {};
    const s = S;
    scores.fame = (s.renown || 0) * 1.2 + (s.honor || 0) * 1.5 + (flag("ch3_path_honor") ? 40 : 0);
    scores.blood = countEnemyDeadFates() * 18 + (flag("ch3_path_force") ? 50 : 0) + Math.max(0, 20 - (s.honor || 0));
    scores.romance = hasAnySpouseOrMuse() ? 70 : 0;
    scores.dao = ((s.focus || 0) * 4) + (flag("disciple_yun") || flag("dao_student") ? 35 : 0) + (flag("ch3_path_wit") ? 15 : 0);
    scores.merchant = ((s.gold || 0) + (s.investGold || 0)) / 5 + (hasBondRole("tiesuanpan", "partner") ? 40 : 0);
    scores.lone = (flag("map_jianzhong") ? 25 : 0) + Math.max(0, 40 - countAllyBonds() * 8) + (flag("ch3_path_wit") ? 10 : 0);
    // prison escape / enemy fates lightly block ally endings
    scores.demon = (flag("karma_demon_whisper") ? 55 : 0) + Math.max(0, -(s.karma || 0)) + (s.fates.wuyinqinmo === "mad" ? 40 : 0);
    scores.redemption = (flag("did_evil_act") && (s.karma || 0) >= 15 ? 30 + (s.karma || 0) : 0) + (flag("karma_redemption_offer") ? 25 : 0);
    scores.consort = (s.fates.jingandi === "married" || s.fates.jingandi === "muse" || s.palaceRole === "consort") ? 80 : 0;
    scores.dongchang_end = (s.palaceRole === "dongchang_boss" ? 50 : 0) + (flag("palace_revenge_done") ? 40 : 0) + (flag("eunuch") ? 20 : 0);
    scores.donggong_regicide = (flag("donggong_regicide_plan") ? 90 : 0) + (flag("donggong_truth_known") ? 20 : 0);
    scores.donggong_reconcile = (flag("donggong_reconciled") ? 95 : 0);
    scores.donggong_slave_end = (flag("donggong_slave") && flag("donggong_abandon_revenge") ? 88 : 0) + (flag("donggong_love") ? 10 : 0);
    scores.fame += Math.max(0, s.karma || 0) * 1.1;
    scores.blood += Math.max(0, -(s.karma || 0)) * 1.2;
    if (flag("prison_escape_known")) { scores.fame -= 8; scores.romance -= 5; }
    if (countEnemyDeadFates() >= 4) { scores.fame -= 15; scores.dao -= 10; }
    return scores;
  }
  function estimateEndingId() {
    const w = estimateEndingWeights();
    let best = "fame", bestV = -1e9;
    Object.keys(w).forEach(k => { if (w[k] > bestV) { bestV = w[k]; best = k; } });
    return best;
  }
  function endingTendencyLine() {
    const id = estimateEndingId();
    const d = ENDING_DEFS[id];
    return "當前傾向結局：「" + (d ? d.title : id) + "」";
  }
  function npcDestinyLines() {
    const lines = [];
    Object.keys(NPCS).filter(id => NPCS[id].major).forEach(id => {
      const n = NPCS[id], f = S.fates[id] || "default";
      lines.push(n.name + "：" + (n.destinies[f] || n.destinies.default || fateLabel(f)));
    });
    return lines;
  }
  function resolveEnding(forceId) {
    let id = forceId || null;
    if (!id) {
      // pick first matching need in priority order
      const order = ["donggong_regicide", "donggong_reconcile", "donggong_slave_end", "eunuch_revenge", "palace_consort", "consort", "dongchang_lord", "dongchang_end", "romance", "redemption", "demon", "blood", "dao", "merchant", "fame", "lone"];
      for (let i = 0; i < order.length; i++) {
        const d = ENDING_DEFS[order[i]];
        try { if (d.need(S)) { id = d.id; break; } } catch (e) {}
      }
      if (!id) id = estimateEndingId();
    }
    const def = ENDING_DEFS[id] || ENDING_DEFS.fame;
    S.endingId = def.id;
    S.ending = { id: def.id, title: def.title, day: S.day };
    setFlag("ending_preview");
    return def;
  }
  function showEndingModal(previewOnly) {
    const def = previewOnly ? ENDING_DEFS[estimateEndingId()] : (S.endingId ? ENDING_DEFS[S.endingId] : resolveEnding());
    if (!previewOnly && !S.endingId) resolveEnding(def.id);
    const destinies = npcDestinyLines().slice(0, 12).map(l => "<li>" + escapeHtml(l) + "</li>").join("");
    const note = previewOnly
      ? "<p class='small'>（預兆・未鎖定。通關第三章或聲望／羈絆足夠後可正式檢視。）</p>"
      : "<p class='small'>結局已記入存檔。</p>";
    openModal(`<div class="ending-modal"><h3>江湖結局・${escapeHtml(def.title)}</h3>
      <div class="story-box ending-epi">${escapeHtml(def.epi)}
      ${escapeHtml(def.epi.length < 40 ? "" : "")}</div>
      ${note}
      <h3 style="margin-top:10px">主要人物歸宿</h3>
      <ul class="ending-list">${destinies}</ul>
      <button class="btn primary" onclick="closeModal();window._jhRender&&window._jhRender()">收下風聲</button></div>`);
  }
  function canViewEndingOfficial() {
    return !!(S.quests && S.quests.main3 && S.quests.main3.done) || (S.renown || 0) >= 60 || countAllyBonds() >= 5;
  }
  function companionEligibleRoles() {
    return ["disciple","sworn","spouse","muse","mad_muse","sword_disciple","border_sworn","forge_disciple","crew","partner","apprentice","follower","cook_friend","informant","host","student","dao_student","tomb_ally","slave"];
  }
  function canInviteCompanion(npcId) {
    if (!npcId || !NPCS[npcId]) return false;
    const f = S.fates[npcId];
    if (f === "dead" || f === "vanished" || f === "enemy") return false;
    if (companionEligibleRoles().some(r => hasBondRole(npcId, r))) return true;
    return ["ally","married","muse","master","teacher","partner","hero","apprentice","promoted","host","slave","redeemed"].indexOf(f) >= 0;
  }
  function inviteCompanion(npcId) {
    if (!canInviteCompanion(npcId)) return toast("對方尚未與你締結足夠羈絆", true);
    if (S.companion === npcId) return toast("已在同行", true);
    if (S.companion && S.companionSwapDay === S.day) return toast("今日已更換過同行（日限1次）", true);
    S.companion = npcId;
    S.companionSwapDay = S.day;
    try { saveGameSilent(); } catch (e) {}
    showStory((NPCS[npcId].name) + "點頭：「便同行一程。」\n地圖將顯示同行夥伴；戰鬥中可助攻／開場減傷。地圖橫幅可隨時「解散同行」。");
  }
  function dismissCompanion(opts) {
    opts = opts || {};
    if (!S.companion) return toast("沒有同行", true);
    const n = NPCS[S.companion] ? NPCS[S.companion].name : S.companion;
    S.companion = null;
    // 解散不佔「今日更換」名額，避免邀完即日無法離開（舊版卡住主因）
    if (opts.consumeSwap) S.companionSwapDay = S.day;
    try { saveGameSilent(); } catch (e) {}
    if (!opts.silent) toast(n + "暫別同行", true);
    if (!opts.skipRender) render();
    return true;
  }
  function companionName() {
    return S.companion && NPCS[S.companion] ? NPCS[S.companion].name : "";
  }
  function isHomeboundCompanion(npcId) {
    if (!npcId || !NPCS[npcId]) return false;
    const home = NPCS[npcId].loc;
    const palaceHomes = ["huanggong","hougong","neiting","yanhui","dongchang","yangxin","qianqing","yuhuayuan","xingxing_tai","yongxing_shi","tianlao"];
    return palaceHomes.indexOf(home) >= 0;
  }
  /** 宮廷／皇城本職人物：離開其原居地後自動暫別，避免「一見面就永遠黏着」。江湖遊俠同行則可隨行。 */
  function maybeCompanionPartOnTravel(newLoc) {
    if (!S.companion || !NPCS[S.companion]) return null;
    const id = S.companion;
    const home = NPCS[id].loc;
    if (!home || home === newLoc) return null;
    if (!isHomeboundCompanion(id)) return null;
    const n = NPCS[id].name;
    S.companion = null;
    try { saveGameSilent(); } catch (e) {}
    return n + "拱手：「此去非本職地界——就送到這兒，有事回" + (LOCATIONS.find(function(l){return l.id===home;}) || {name:"原處"}).name + "找我。」（已解散同行）";
  }
  function ch3EvidenceCount() {
    let n = 0;
    if (flag("ch3_ev_border") || hasItem("border_toxin_proof")) n++;
    if (flag("ch3_ev_lotus") || hasItem("lotus_rift_note")) n++;
    if (flag("ch3_ev_tomb") || hasItem("tomb_rift_seal")) n++;
    return n;
  }
  function tryAdvanceCh3AfterEvidence() {
    if (!S.quests.main3 || S.quests.main3.done) return;
    if (S.quests.main3.step === 1 && ch3EvidenceCount() >= 3) {
      S.quests.main3.step = 2;
      setTimeout(() => {
        showStory("三份證據齊全。殘印餘波如潮——你必須選一條天命分途：\n俠義道（蒼雲／天台）、霸途（黑水／紅蓮）、或隱逸（水雲／梅塢）。");
      }, 200);
    }
  }
  function openRumorBoard() {
    ensureQuests();
    const lines = [];
    lines.push("【進行中】" + storyText());
    Object.keys(S.quests).filter(k => k.startsWith("side_") && S.quests[k].step > 0 && !S.quests[k].done).forEach(k => {
      lines.push("・" + S.quests[k].title + "（步驟" + S.quests[k].step + "）");
    });
    // bounty
    if (!S.bountyTarget || Math.random() < 0.35) {
      const opts = ["bounty_thug", "elite_bandit", "sea_raider", "bamboo_assassin"];
      S.bountyTarget = opts[Math.floor(Math.random() * opts.length)];
    }
    const en = ENEMIES[S.bountyTarget];
    lines.push("【懸賞】討伐「" + (en ? en.name : S.bountyTarget) + "」可獲賞金（地圖对应處開戰）。");
    // npc one-liners
    const sample = Object.keys(NPCS).filter(id => NPCS[id].major).sort(() => Math.random() - 0.5).slice(0, 4);
    sample.forEach(id => {
      const f = S.fates[id] || "default";
      lines.push(NPCS[id].name + "近況：" + (NPCS[id].destinies[f] || "行蹤成謎。"));
    });
    if (hasUnlock("forever_intel") || hasUnlock("cheap_rumors")) {
      lines.push("（情報網活躍：童謠／眼線持續供料）");
    }
    openModal(`<h3>江湖榜</h3><div class="story-box rumor-board">${lines.map(l => escapeHtml(l)).join("<br/>")}</div>
      <div class="btn-row">
        <button class="btn primary" id="rumor-bounty">前往懸賞（就地開戰）</button>
        <button class="btn ghost" onclick="closeModal()">關閉</button>
      </div>`);
    const b = document.getElementById("rumor-bounty");
    if (b) b.onclick = () => {
      closeModal();
      const tid = S.bountyTarget || "bounty_thug";
      startCombat(tid, () => {
        const gold = 40 + Math.floor(Math.random() * 40) + Math.floor((S.renown || 0) / 5);
        S.gold += gold; S.renown += 2; S.bountyTarget = null;
        showStory("懸賞了結，獲賞金 " + gold + " 兩。");
      });
    };
  }
  function campOvernight() {
    if (isImprisoned()) return toast("關押中無法扎營", true);
    S.day++;
    const st = effectiveStats();
    S.hp = st.hpMax; S.neili = st.neiliMax; S.statuses = [];
    const paroleMsg = tryParoleTick();
    let night = "";
    const roll = Math.random();
    if (roll < 0.08) {
      addItem("herb", 1); night = "夜風送來一株止血草，落在營邊。";
    } else if (roll < 0.14) {
      S.gold = Math.max(0, S.gold - 5); night = "小偷摸營，失去 5 金。";
    } else if (roll < 0.2 && S.luck >= 8) {
      S.exp += 4; night = "高福緣夜夢劍意，經驗微增。";
    } else if (roll < 0.26) {
      night = "远处狼嚎，一夜無眠卻無恙。";
    }
    let banter = "";
    if (S.companion && NPCS[S.companion]) {
      const lines = [
        NPCS[S.companion].name + "守着篝火：「明日繼續。」",
        NPCS[S.companion].name + "低聲哼着舊曲。",
        NPCS[S.companion].name + "替你添了一把柴。",
        NPCS[S.companion].name + "：「這江湖，還有多久？」"
      ];
      banter = lines[Math.floor(Math.random() * lines.length)];
    }
    toast("扎營过夜・第 " + S.day + " 日", true);
    render();
    const parts = ["你在山間紮營一夜，氣血內力回滿。"];
    if (paroleMsg) parts.push(paroleMsg);
    if (night) parts.push(night);
    if (banter) parts.push(banter);
    const triggered = (typeof checkKarmaPlots === "function") && checkKarmaPlots({ day: true });
    if (!triggered) showStory(parts.join("\n"));
    setTimeout(() => { try { maybeLoverInitiative("camp"); } catch (e) {} }, 500);
  }
  function listBondCombatSkills() {
    const out = [];
    if (hasUnlock("scarlet_sword") || flag("sword_chi")) out.push({ id: "_bond_scarlet", name: "絆技・赤霞", power: 22, neiliCost: 6, desc: "羈絆劍意" });
    if (hasUnlock("silent_song") || flag("mad_muse")) out.push({ id: "_bond_silent", name: "絆技・無音", power: 10, neiliCost: 5, stun: 1, desc: "擾敵" });
    if (hasUnlock("sand_blade") || flag("sand_rival")) out.push({ id: "_bond_sand", name: "絆技・黃沙", power: 18, neiliCost: 5, desc: "刀約" });
    if (hasUnlock("qin_overture") || hasBondRole("linqing", "muse")) out.push({ id: "_bond_qin", name: "絆技・弦驚", power: 12, neiliCost: 4, stun: 1, desc: "琴音" });
    if (hasUnlock("lake_form") || flag("lake_student")) out.push({ id: "_bond_water", name: "絆技・水式", power: 8, neiliCost: 4, buffAgi: 4, desc: "身法" });
    return out;
  }

  function ensureQuests() {
    const defs = {
      main: { id: "main", title: "第一章・霧起青城", step: 0, done: false },
      main2: { id: "main2", title: "第二章・盟約殘印", step: 0, done: false },
      main3: { id: "main3", title: "第三章・天命分途", step: 0, done: false },
      side_herb: { id: "side_herb", title: "支線・藥谷之託", step: 0, done: false },
      side_token: { id: "side_token", title: "支線・血契抉擇", step: 0, done: false },
      side_qin: { id: "side_qin", title: "支線・梅塢琴音", step: 0, done: false },
      side_forge: { id: "side_forge", title: "支線・龍門鍛魂", step: 0, done: false },
      side_sea: { id: "side_sea", title: "支線・煙港風雲", step: 0, done: false },
      side_dao: { id: "side_dao", title: "支線・星象殘卷", step: 0, done: false },
      side_tomb: { id: "side_tomb", title: "支線・夜王守陵", step: 0, done: false },
      side_lake: { id: "side_lake", title: "支線・水雲一諾", step: 0, done: false },
      side_trade: { id: "side_trade", title: "支線・古蘭商路", step: 0, done: false },
      side_bamboo: { id: "side_bamboo", title: "支線・竹影迷蹤", step: 0, done: false },
      side_child: { id: "side_child", title: "支線・青城童謠", step: 0, done: false },
      side_cook: { id: "side_cook", title: "支線・孤燈夜宵", step: 0, done: false },
      side_snow: { id: "side_snow", title: "支線・雪原狼嚎", step: 0, done: false },
      side_lei: { id: "side_lei", title: "支線・雷峰冤案", step: 0, done: false },
      side_chixia: { id: "side_chixia", title: "支線・赤霞試劍", step: 0, done: false },
      side_qinmo: { id: "side_qinmo", title: "支線・無音奪魂", step: 0, done: false },
      side_sand: { id: "side_sand", title: "支線・黃沙刀約", step: 0, done: false },
      side_karma_good: { id: "side_karma_good", title: "支線・善名／贖罪", step: 0, done: false },
      side_karma_evil: { id: "side_karma_evil", title: "支線・黑道密約", step: 0, done: false },
      side_palace_line: { id: "side_palace_line", title: "支線・青梧宮門", step: 0, done: false },
      side_palace_revenge: { id: "side_palace_revenge", title: "支線・宮牆血債", step: 0, done: false },
      side_eunuch_revenge: { id: "side_eunuch_revenge", title: "支線・淨身血債", step: 0, done: false },
      side_cangfeng: { id: "side_cangfeng", title: "支線・蒼峰論劍", step: 0, done: false },
      side_xiake: { id: "side_xiake", title: "支線・俠客殘頁", step: 0, done: false },
      side_xuanyin: { id: "side_xuanyin", title: "支線・玄陰殘卷", step: 0, done: false },
      side_hanxue: { id: "side_hanxue", title: "支線・汗血尋蹤", step: 0, done: false },
      side_donggong_shadow: { id: "side_donggong_shadow", title: "支線・督公影事", step: 0, done: false },
      side_cangfeng_hypocrite: { id: "side_cangfeng_hypocrite", title: "支線・蒼峰偽君子", step: 0, done: false },
      side_tomb_taboo: { id: "side_tomb_taboo", title: "支線・古墓禁忌", step: 0, done: false },
      side_qiao_identity: { id: "side_qiao_identity", title: "支線・喬峰山身世", step: 0, done: false },
      side_court_double: { id: "side_court_double", title: "支線・韋小舟夾心", step: 0, done: false },
      side_fake_empress: { id: "side_fake_empress", title: "支線・假太后", step: 0, done: false },
      side_jiunan_assassin: { id: "side_jiunan_assassin", title: "支線・九難刺駕", step: 0, done: false },
      side_fan_wang: { id: "side_fan_wang", title: "支線・藩王野心", step: 0, done: false }
    };
    if (!S.quests) S.quests = {};
    Object.keys(defs).forEach(k => {
      if (!S.quests[k]) S.quests[k] = defs[k];
      else S.quests[k] = Object.assign({}, defs[k], S.quests[k]);
    });
  }
  function questHint(q) {
    if (!q) return "";
    if (q.done) return "已完成";
    if (q.step <= 0) return "未接／待觸發";
    return "進行中・步驟 " + q.step;
  }
  function storyText() {
    ensureQuests();
    if (!S.quests.main.done) {
      const m = S.quests.main;
      if (m.step === 0) return "青城鎮／京畿客棧打聽黑衣人消息。";
      if (m.step === 1) return "取得劍冢殘圖，調查劍冢。";
      if (m.step === 2) return "分支：助蒼雲寺或助黑水寨。";
      if (m.step === 3) return "持青銅古鑰進入密室遺跡。";
      return "第一章進行中。";
    }
    if (!S.quests.main2.done) {
      const m = S.quests.main2;
      if (m.step === 0) return "第二章：四處收集盟約殘印的下落（紅蓮／天台／夜王墓）。";
      if (m.step === 1) return "已接觸殘印線索，前往赤霞崖或雪原關核實。";
      if (m.step === 2) return "第二章分支：聯紅蓮 或 聯天台觀。";
      if (m.step === 3) return "持殘印前往無音谷了結第二章。";
      return "第二章進行中。";
    }
    if (!S.quests.main3.done) {
      const m = S.quests.main3;
      if (m.step === 0) return "第三章：京畿／青城聽「夜王殘印未盡／三方爭鋒」傳聞。";
      if (m.step === 1) return "收集三證據（可並行）：邊關毒線、紅蓮內訌、古墓禁制鬆動。";
      if (m.step === 2) {
        if (flag("ch3_path_honor")) return "俠義道：聯蒼雲＋天台，準備最終儀式。";
        if (flag("ch3_path_force")) return "霸途：聯黑水＋紅蓮，奪殘印自用。";
        if (flag("ch3_path_wit")) return "隱逸：聯水雲＋梅塢，封存殘印。";
        return "大分支三選一：俠義道／霸途／隱逸（互斥）。";
      }
      if (m.step === 3) return "前往最終地點決戰／儀式（夜王餘使）。";
      return "第三章進行中。";
    }
    ensureQuests();
    const dg = S.quests.side_donggong_shadow;
    if (dg && dg.step > 0 && !dg.done) {
      const tips = {
        1: "支線・督公影事：東廠夜晤／試探真名／搜密檔，接近冷血督公。",
        2: "支線・督公影事：信任與魅力已動——可表白求為知音（或太監／廠衛暗線）。",
        3: "支線・督公影事：可立廠奴墨契；高信任夜晤或可引出告白。",
        4: "支線・督公影事：真相已現（玄梧／靖王）——回東廠「面對督公真相」抉擇。",
        5: "支線・督公影事：弒君／認兄／出賣／奴契棄仇／毀證——後果已寫入命運。",
        6: "支線・督公影事：影事落幕，可於結局檢視。"
      };
      return tips[dg.step] || tips[1];
    }
    if (S.endingId) return "江湖結局已定：「" + (ENDING_DEFS[S.endingId] ? ENDING_DEFS[S.endingId].title : S.endingId) + "」。仍可遊歷。";
    return "主線皆畢。可於情緣頁檢視江湖結局，或繼續改寫命運。";
  }

  function locationActions(locId) {
    const acts = [];
    acts.push({ label: "四處瞧瞧／偶遇", fn: () => exploreLoc(locId) });

    // shops
    if (SHOPS[locId]) {
      acts.push({ label: "逛商店", fn: () => openShop(SHOPS[locId]) });
    }

    // NPCs present
    Object.keys(NPCS).forEach(nid => {
      if (NPCS[nid].loc === locId) {
        acts.push({ label: "見" + NPCS[nid].name, fn: () => talkNpc(nid) });
      }
    });

    if (locId === "qingcheng") {
      acts.push({ label: "聽市井傳聞", fn: () => {
        setFlag("heard_yaogu"); setFlag("heard_meihua"); setFlag("open_longmen");
        if (S.quests.main.step === 0) { S.quests.main.step = 1; }
        showStory("茶攤老人：「藥谷蘇姑娘、梅花塢琴聲、龍門鐵匠……黑衣人卻在找劍冢殘圖。」多條線索已開。");
      }});
      acts.push({ label: "與地痞動手", fn: () => startCombat("bandit") });
    }
    if (locId === "jingji") {
      acts.push({ label: "問藍掌櫃消息", fn: () => {
        setFlag("heard_yaogu"); setFlag("west_road"); setFlag("open_longmen");
        if (S.quests.main.step === 0) S.quests.main.step = 1;
        if (S.quests.side_trade.step === 0) S.quests.side_trade.step = 1;
        showStory("藍掌櫃：「黑衣人丟過殘圖角。黃沙驛、古蘭商會也有人出高價買消息。你若夠聲望，雷峰哨會放行。」");
      }});
      acts.push({ label: "喝酒休整（10金）", fn: () => {
        if (S.gold < 10) return toast("不夠錢", true);
        S.gold -= 10; S.hp = effectiveStats().hpMax; S.neili = Math.min(effectiveStats().neiliMax, S.neili + 20);
        S.statuses = []; toast("休整完畢", true); render();
      }});
    }
    if (locId === "cangyun") {
      acts.push({ label: "申請加入蒼雲寺", fn: () => tryJoin("cangyun_sect") });
      acts.push({ label: "習門派進階功（需聲望）", fn: () => learnFactionSkill("cangyun_sect") });
      if (S.quests.main.step === 2) acts.push({ label: "【分支】助寺禦敵", fn: () => branchHelpTemple() });
    }
    if (locId === "heishui") {
      acts.push({ label: "申請入寨", fn: () => tryJoin("heishui_band") });
      acts.push({ label: "習門派進階功（需聲望）", fn: () => learnFactionSkill("heishui_band") });
      if (S.quests.main.step === 2) acts.push({ label: "【分支】助寨搶先", fn: () => branchHelpBand() });
      if (hasItem("blood_token") && S.quests.side_token.step === 1)
        acts.push({ label: "【支線】處理血契令", fn: () => sideTokenChoice() });
      if (flag("helped_band") && !hasItem("ancient_key"))
        acts.push({ label: "向黑風索取古鑰", fn: () => { addItem("ancient_key", 1); showStory("黑風扔來青銅古鑰：「密室你自己闖。」"); } });
    }
    if (locId === "yaogu") {
      if (!S.quests.side_herb.done && S.quests.side_herb.step === 0) {
        acts.push({ label: "【支線】接藥谷之託", fn: () => {
          S.quests.side_herb.step = 1; addItem("herb_letter", 1);
          showStory("蘇晚晴交密信：「送到洛河渡——或交給黑風。你選邊，我的命運也會不同。」");
        }});
      }
      if (hasItem("herb_letter") && S.quests.side_herb.step === 1) {
        acts.push({ label: "【支線】交還密信", fn: () => {
          removeItem("herb_letter", 1); S.quests.side_herb.done = true; S.quests.side_herb.step = 2;
          setFate("suning", "ally"); addItem("antidote", 1); addItem("pill", 2); S.renown += 5; S.honor += 3;
          if (typeof adjustKarma === "function") adjustKarma(4, "歸還密信");
          showStory("密信歸還。蘇晚晴成盟友，贈解蝕散。");
        }});
      }
    }
    if (locId === "luohe") {
      if (hasItem("herb_letter") && S.quests.side_herb.step === 1) {
        acts.push({ label: "【支線】密信交船家轉送", fn: () => {
          removeItem("herb_letter", 1); S.quests.side_herb.done = true; S.quests.side_herb.step = 2;
          setFate("suning", "vanished"); setFlag("west_road"); S.gold += 40;
          showStory("信出海。蘇晚晴遠走塞外。");
        }});
      }
      if (!hasItem("blood_token") && !S.quests.side_token.done) {
        acts.push({ label: "【支線】拾獲血契令", fn: () => {
          addItem("blood_token", 1); S.quests.side_token.step = 1;
          showStory("泥中血色令牌。可見黑風——交或藏，改寫他命運。");
        }});
      }
    }
    if (locId === "jianzhong") {
      acts.push({ label: "探查劍冢", fn: () => {
        startCombat("shadow", () => {
          if (!hasItem("map_fragment")) addItem("map_fragment", 1);
          if (S.quests.main.step < 2) S.quests.main.step = 2;
          setFlag("map_jianzhong"); setFlag("chixia_path");
          showStory("黑衣人敗退：「蒼雲與黑水，今夜必有一方流血。」赤霞崖小徑亦現。");
        });
      }});
    }
    if (locId === "mishi") {
      acts.push({ label: "開啟密室（需古鑰）", fn: () => {
        if (!hasItem("ancient_key")) return toast("需要青銅古鑰", true);
        finishChapter1();
      }});
    }
    if (locId === "cangyun" && flag("helped_temple") && !hasItem("ancient_key")) {
      acts.push({ label: "向雲空求古鑰", fn: () => {
        addItem("ancient_key", 1); addItem("temple_robe", 1);
        showStory("雲空師父贈鑰與僧袍。");
      }});
    }
    if (locId === "bianguan") {
      if (hasItem("antidote") && S.fates.shenguhong !== "hero" && S.fates.shenguhong !== "dead") {
        acts.push({ label: "【命運】喂理解蝕散", fn: () => {
          removeItem("antidote", 1); setFate("shenguhong", "hero"); S.renown += 8; S.honor += 5;
          addItem("iron_blade", 1); setFlag("north_pass");
          showStory("沈孤鴻成名，並透露雪原關可通。");
        }});
      }
      acts.push({ label: "搜毒探子", fn: () => startCombat("toxin_scout") });
    }
    if (locId === "baixue") {
      acts.push({ label: "申請加入白雪莊", fn: () => tryJoin("baixue_manor") });
      acts.push({ label: "習門派進階功", fn: () => learnFactionSkill("baixue_manor") });
      if (hasItem("jade_pendant") && S.fates.guqinghan === "default") {
        acts.push({ label: "【命運】歸還青玉佩", fn: () => {
          removeItem("jade_pendant", 1); setFate("guqinghan", "ally"); addItem("frost_blade", 1);
          showStory("顧清寒贈霜紋劍，視你為盟友。");
        }});
      }
    }
    if (locId === "shamo") {
      acts.push({ label: "打聽西路", fn: () => {
        if (!hasItem("jade_pendant") && Math.random() < 0.75) {
          addItem("jade_pendant", 1); setFlag("invite_baixue"); setFlag("trade_pass");
          showStory("驛卒託青玉佩：「送回白雪莊。古蘭商會也歡迎你。」");
        } else showStory("刀客談邊關奇毒與藥谷解方。");
      }});
      acts.push({ label: "遇悍匪", fn: () => startCombat("elite_bandit") });
    }
    if (locId === "meihua") {
      if (S.quests.side_qin.step === 0) {
        acts.push({ label: "【支線】聽林清歌撫琴", fn: () => {
          S.quests.side_qin.step = 1;
          showStory("林清歌：「琴弦斷了一根——若你能從青竹林取回竹影令上的絲線，我便為你譜曲。」");
          setFlag("bamboo_map");
        }});
      }
      if (S.quests.side_qin.step === 1 && hasItem("bamboo_token")) {
        acts.push({ label: "【支線】交還竹影令", fn: () => {
          removeItem("bamboo_token", 1); S.quests.side_qin.done = true; S.quests.side_qin.step = 2;
          setFate("linqing", "muse"); addItem("insight_tea", 2); S.wit += 1; S.renown += 4;
          setFlag("lake_invite"); addItem("lake_letter", 1);
          showStory("她譜成《霜水引》，並寫水雲書邀你去湖心。");
        }});
      }
    }
    if (locId === "qingzhu") {
      acts.push({ label: "【支線】尋竹影令", fn: () => {
        startCombat("bamboo_assassin", () => {
          if (!hasItem("bamboo_token")) addItem("bamboo_token", 1);
          S.quests.side_bamboo.done = true; S.quests.side_bamboo.step = 1;
          showStory("刺客敗走，竹影令入手。");
        });
      }});
    }
    if (locId === "longmen") {
      if (S.quests.side_forge.step === 0) {
        acts.push({ label: "【支線】請趙鐵山鍛兵", fn: () => {
          S.quests.side_forge.step = 1;
          showStory("趙鐵山：「拿一塊赤霞崖的礦心來。我鑄錘也鑄緣。」");
          setFlag("chixia_path");
        }});
      }
      if (S.quests.side_forge.step === 1 && flag("got_ore")) {
        acts.push({ label: "【支線】交付礦心", fn: () => {
          S.quests.side_forge.done = true; S.quests.side_forge.step = 2;
          setFate("zhaotie", "master"); addItem("dragon_hammer", 1); S.force += 1;
          showStory("龍門錘入手。趙鐵山認你半個徒弟。");
        }});
      }
    }
    if (locId === "chixia") {
      acts.push({ label: "採礦／遇敵", fn: () => {
        startCombat("elite_bandit", () => {
          setFlag("got_ore");
          if (S.quests.main2.step === 0 && S.quests.main.done) S.quests.main2.step = 1;
          showStory("你採得礦心，崖上隱約紅光——似與紅蓮教有關。");
        });
      }});
    }
    if (locId === "yanhui") {
      if (S.quests.side_sea.step === 0) {
        acts.push({ label: "【支線】見慕容煙", fn: () => {
          S.quests.side_sea.step = 1;
          showStory("慕容煙：「海寇搶了我的海圖複本。幫我奪回，船隊便聽你一聲。」");
        }});
      }
      if (S.quests.side_sea.step === 1) {
        acts.push({ label: "【支線】討伐海寇", fn: () => {
          startCombat("sea_raider", () => {
            if (!hasItem("sea_chart")) addItem("sea_chart", 1);
            S.quests.side_sea.done = true; S.quests.side_sea.step = 2;
            setFate("murong", "ally"); addItem("scale_mail", 1); S.renown += 5;
            showStory("慕容煙視你為盟友，煙灰港為你敞開。");
          });
        }});
      }
    }
    if (locId === "gulan") {
      if (S.quests.side_trade.step >= 1 && !S.quests.side_trade.done) {
        acts.push({ label: "【支線】護送商隊口信", fn: () => {
          S.quests.side_trade.done = true; S.quests.side_trade.step = 2;
          S.gold += 80; S.luck += 1; addItem("compass_charm", 1); setFlag("trade_pass");
          showStory("商會贈定風符與金。古蘭之路暢通。");
        }});
      }
    }
    if (locId === "honglian") {
      acts.push({ label: "申請加入紅蓮教", fn: () => tryJoin("honglian_cult") });
      if (S.quests.main.done && S.quests.main2.step <= 1) {
        acts.push({ label: "【主線二】詢問盟約殘印", fn: () => {
          startCombat("cult_zealot", () => {
            if (!hasItem("lotus_invite")) addItem("lotus_invite", 1);
            S.quests.main2.step = Math.max(S.quests.main2.step, 2);
            setFlag("ch2_started");
            showStory("聖女冷笑：「殘印在無音谷。你選——聯我，或投天台那群道士。」");
          });
        }});
      }
      if (S.quests.main2.step === 2) {
        acts.push({ label: "【分支】聯紅蓮取殘印", fn: () => branchCh2Lotus() });
      }
    }
    if (locId === "tiantai") {
      if (S.quests.side_dao.step === 0 && (hasItem("dao_scroll") || S.quests.main.done)) {
        acts.push({ label: "【支線】呈星象殘卷", fn: () => {
          if (!hasItem("dao_scroll")) addItem("dao_scroll", 1);
          S.quests.side_dao.step = 1; setFlag("dao_invite");
          showStory("道玄真人：「殘卷有缺。夜王墓中有另一半星圖。」");
        }});
      }
      if (S.quests.side_dao.step === 1 && hasItem("tomb_seal")) {
        acts.push({ label: "【支線】回報墓中星圖", fn: () => {
          S.quests.side_dao.done = true; S.quests.side_dao.step = 2;
          setFate("daoxuan", "ally"); addItem("star_staff", 1); S.wit += 2;
          showStory("真人贈星羅杖，視你為道緣盟友。");
        }});
      }
      if (S.quests.main2.step === 2) {
        acts.push({ label: "【分支】聯天台取殘印", fn: () => branchCh2Dao() });
      }
    }
    if (locId === "yewang") {
      acts.push({ label: "【支線】夜王墓挑戰", fn: () => {
        startCombat("tomb_shade", () => {
          if (!hasItem("tomb_seal")) addItem("tomb_seal", 1);
          S.quests.side_tomb.done = true; S.quests.side_tomb.step = 1;
          setFate("yechen", "freed"); addItem("big_pill", 1);
          if (!hasItem("dao_scroll")) addItem("dao_scroll", 1);
          setFlag("dao_invite"); setFlag("map_wuyin");
          showStory("夜塵解咒。你獲夜印封泥與星圖殘片，無音谷方位亦現。");
        });
      }});
    }
    if (locId === "shuiyun") {
      if (hasItem("lake_letter") || flag("lake_invite")) {
        acts.push({ label: "【支線】見水雲子", fn: () => {
          if (hasItem("lake_letter")) removeItem("lake_letter", 1);
          S.quests.side_lake.done = true; S.quests.side_lake.step = 1;
          setFate("shuiyunzi", "teacher"); S.agi += 1; S.neiliMax += 10; S.honor += 2;
          showStory("水雲子授你散學心法。身法與內力精進。");
        }});
      }
    }
    if (locId === "xueyuan") {
      acts.push({ label: "雪原歷練", fn: () => startCombat("snow_wolf", () => {
        setFlag("north_pass"); S.bone += 1;
        if (S.quests.main2.step === 1) S.quests.main2.step = 2;
        showStory("巨狼伏誅。北境之路更熟，根骨微增。");
      })});
    }
    if (locId === "wuyin") {
      if (S.quests.main2.step >= 3 || hasItem("chapter2_sigil")) {
        acts.push({ label: "【主線二】無音谷了結", fn: () => finishChapter2() });
      } else if (S.quests.main.done) {
        acts.push({ label: "谷中感悟", fn: () => {
          S.neili = effectiveStats().neiliMax; S.wit += 1;
          showStory("無音之處，心念自現。悟性 +1，內力回滿。");
          render();
        }});
      }
    }
    if (locId === "leifeng") {
      acts.push({ label: "通過盤查（需聲望）", fn: () => {
        if (S.renown < 20) return toast("聲望不足 20", true);
        setFlag("open_longmen"); setFlag("heard_meihua");
        showStory("哨官蓋印：「龍門、梅塢一路順風。」");
      }});
    }
    if (locId === "hub") {
      acts.push({ label: "休息回滿（過一日）", fn: () => {
        S.hp = effectiveStats().hpMax; S.neili = effectiveStats().neiliMax;
        S.statuses = []; S.day++; const _pm = tryParoleTick(); toast("休整一日", true); render(); if (_pm) showStory(_pm); setTimeout(() => { try { maybeLoverInitiative("day"); } catch (e) {} }, 400);
      }});
    }
    // chapter2 soft start
    if (S.quests.main.done && S.quests.main2.step === 0 && locId === "jingji") {
      acts.push({ label: "【主線二】聽盟約傳聞", fn: () => {
        S.quests.main2.step = 1; setFlag("ch2_started"); setFlag("honglian_invite");
        addItem("lotus_invite", 1);
        showStory("旅客私語：舊日盟約殘印現於紅蓮與天台之間。有人塞你一封紅蓮帖。");
      }});
    }

    // --- Commitment unlock features ---
    if (locId === "yaogu" && hasUnlock("disciple_clinic")) {
      acts.push({ label: "請師父診治（日1次）", fn: () => {
        if (unlockUsedToday("disciple_clinic")) return toast("今日已診治過", true);
        const st = effectiveStats();
        const heal = 35 + Math.floor((st.medicine || 0) * 3);
        S.hp = Math.min(st.hpMax, S.hp + heal);
        S.statuses = [];
        markUnlockUsed("disciple_clinic");
        showStory("蘇晚晴為你診脈施針，氣血回復 " + heal + "，異常盡去。\n（記名弟子 · 藥谷診治）");
      }});
    }
    if (locId === "yaogu" && hasUnlock("herb_identify")) {
      acts.push({ label: "請教藥性", fn: () => {
        S.medicine = (S.medicine || 0) + (Math.random() < 0.35 ? 1 : 0);
        S.exp += 2;
        if (hasUnlock("herb_forage") && Math.random() < 0.5) addItem("herb", 1);
        showStory("蘇晚晴指着藥架細說性味歸經。你若有所悟。" + (hasUnlock("herb_forage") ? "\n白芷幫你採得一株藥草。" : ""));
      }});
    }
    if (locId === "cangyun" && hasUnlock("temple_meditate")) {
      acts.push({ label: "寺中打坐", fn: () => {
        const st = effectiveStats();
        S.neili = st.neiliMax;
        S.focus = (S.focus || 0) + (Math.random() < 0.2 ? 1 : 0);
        showStory("雲嵐殿中趺坐，內息歸元。內力回滿。");
        render();
      }});
    }
    if (locId === "longmen" && hasUnlock("forge_upgrade")) {
      acts.push({ label: "請師父淬煉武器（礦+金）", fn: () => {
        if ((S.forgeBonus || 0) >= 3) return toast("淬煉已達上限 +3", true);
        const cost = 40 + (S.forgeBonus || 0) * 20;
        if (!hasItem("forge_ore") && !flag("got_ore")) return toast("需要龍門精礦或赤霞礦心", true);
        if (S.gold < cost) return toast("需要 " + cost + " 金", true);
        if (hasItem("forge_ore")) removeItem("forge_ore", 1);
        else setFlag("got_ore", false);
        S.gold -= cost;
        S.forgeBonus = (S.forgeBonus || 0) + 1;
        showStory("趙鐵山揮錘淬煉，兵器鋒銳更勝。\n（永久武力加成 +" + S.forgeBonus + "／上限3）");
      }});
    }
    if (locId === "baixue" && hasUnlock("dual_spar")) {
      acts.push({ label: "與顧清寒論劍訓練", fn: () => {
        S.exp += 6; S.neili = Math.max(0, S.neili - 5);
        if (Math.random() < 0.25) S.force += 1;
        showStory("霜刃相交，你領悟些許劍意。經驗 +6。");
        render();
      }});
    }
    if (locId === "heishui" && hasUnlock("sworn_supply")) {
      acts.push({ label: "黑水寨補給", fn: () => {
        if (unlockUsedToday("sworn_supply")) return toast("今日已補給", true);
        addItem("herb", 1); addItem("wine", 1); S.hp = Math.min(effectiveStats().hpMax, S.hp + 15);
        markUnlockUsed("sworn_supply");
        showStory("寨中兄弟扔來酒肉草藥：「自己人！」");
      }});
    }
    if (locId === "yanhui" && hasUnlock("crew_passage")) {
      acts.push({ label: "夜航／半價渡船", fn: () => {
        setFlag("sea_pass");
        const fee = Math.max(0, 8);
        if (S.gold < fee) return toast("車船費不足", true);
        S.gold -= fee;
        S.luck = (S.luck || 0) + (Math.random() < 0.15 ? 1 : 0);
        showStory("慕容煙的船隊為你開夜航。煙灰港路途更熟。（付 " + fee + " 金）");
      }});
    }
    if (locId === "gulan" && hasUnlock("merchant_discount")) {
      acts.push({ label: "商會投資分紅", fn: () => {
        if (S.gold < 30) return toast("至少投資 30 金", true);
        S.gold -= 30; S.investGold = (S.investGold || 0) + 30;
        const gain = 20 + Math.floor(Math.random() * 25) + Math.floor((S.charm || 0) / 2);
        S.gold += gain;
        showStory("鐵算盤撥完帳：「分紅 +" + gain + " 金。」（累計投資 " + S.investGold + "）");
      }});
    }
    if (locId === "jingji" && hasUnlock("free_meal")) {
      acts.push({ label: "孤燈夜宵（日1次）", fn: () => {
        if (unlockUsedToday("free_meal")) return toast("今日已用過夜宵", true);
        const st = effectiveStats();
        const bonus = (S.cookMealLevel || 0) >= 1 || hasUnlock("cook_meal_upgrade") ? 20 : 0;
        S.hp = Math.min(st.hpMax, S.hp + 25 + bonus);
        S.neili = Math.min(st.neiliMax, S.neili + 10 + Math.floor(bonus / 2));
        markUnlockUsed("free_meal");
        showStory("孤燈婆婆：「趁熱喝。」氣血內力回升。" + (bonus ? "（夜宵進階加成）" : ""));
        render();
      }});
    }
    if (locId === "qingcheng" && (hasUnlock("cheap_rumors") || hasUnlock("forever_intel"))) {
      acts.push({ label: hasUnlock("forever_intel") ? "童小六情報網（永久／1金）" : "童小六廉價情報（5金）", fn: () => {
        const cost = hasUnlock("forever_intel") ? 1 : 5;
        if (S.gold < cost) return toast("需要 " + cost + " 金", true);
        S.gold -= cost;
        const hints = ["heard_yaogu","heard_meihua","open_longmen","west_road","bamboo_map","chixia_path","sea_pass","honglian_invite","dao_invite","north_pass"];
        const h = hints[Math.floor(Math.random() * hints.length)];
        setFlag(h);
        showStory("童小六咬着糖：「我聽說——「" + h + "」那邊有動靜！」（相關地圖／線索已開）");
      }});
    }
    if (locId === "meihua" && hasUnlock("meihua_rest")) {
      acts.push({ label: "塢中貴客休憩", fn: () => {
        const st = effectiveStats();
        S.hp = Math.min(st.hpMax, S.hp + 40);
        S.neili = Math.min(st.neiliMax, S.neili + 20);
        S.statuses = [];
        showStory("梅夫人備下廂房香茗。休整效果更佳。");
        render();
      }});
    }
    if (locId === "leifeng" && hasUnlock("sentry_aid")) {
      acts.push({ label: "哨所求救／補給", fn: () => {
        S.hp = Math.min(effectiveStats().hpMax, S.hp + 20);
        addItem("herb", 1);
        setFlag("open_longmen");
        showStory("雷萬山：「自己人，包紮一下再走。」");
        render();
      }});
    }
    if (locId === "yewang" && hasUnlock("tomb_shortcut")) {
      acts.push({ label: "夜塵開墓道捷徑", fn: () => {
        setFlag("map_wuyin"); setFlag("dao_invite");
        S.perception = (S.perception || 0) + (Math.random() < 0.2 ? 1 : 0);
        showStory("夜塵引你入側道：「此路可近無音谷方位。」");
      }});
    }
    if (locId === "tiantai" && hasUnlock("dao_stargaze")) {
      acts.push({ label: "觀星感悟", fn: () => {
        S.exp += 5;
        if (Math.random() < 0.3) S.focus = (S.focus || 0) + 1;
        S.neili = Math.min(effectiveStats().neiliMax, S.neili + 15);
        showStory("星漢燦爛，你定力微增，經驗 +5。");
        render();
      }});
    }
    if (locId === "qingzhu" && hasUnlock("night_drill")) {
      acts.push({ label: "寒鴉夜行訓練", fn: () => {
        S.exp += 5; S.agi = (S.agi || 0) + (Math.random() < 0.2 ? 1 : 0);
        showStory("竹影中潛行片刻，身法更熟。");
        render();
      }});
    }
    if (locId === "shamo" && hasUnlock("sand_blade")) {
      acts.push({ label: "黃沙刀法對練", fn: () => {
        S.exp += 5;
        if (S.skills.indexOf("sand_slash") < 0) S.skills.push("sand_slash");
        showStory("沙無痕：「刀要快，心要穩。」");
        render();
      }});
    }
    if (locId === "chixia" && hasUnlock("scarlet_sword")) {
      acts.push({ label: "崖上劍意感悟", fn: () => {
        S.exp += 6;
        if (S.skills.indexOf("scarlet_arc") < 0) S.skills.push("scarlet_arc");
        showStory("赤霞滿天，劍意如虹。");
        render();
      }});
    }
    if (locId === "wuyin" && hasUnlock("silent_song")) {
      acts.push({ label: "習無音曲", fn: () => {
        S.exp += 5;
        if (S.skills.indexOf("silent_song") < 0) S.skills.push("silent_song");
        showStory("無弦之音入耳，心神微顫。");
        render();
      }});
    }
    if (locId === "bianguan" && hasUnlock("border_pass")) {
      acts.push({ label: "邊關結義便利", fn: () => {
        setFlag("north_pass");
        S.antitoxin = (S.antitoxin || 0) + (Math.random() < 0.15 ? 1 : 0);
        showStory("沈孤鴻放行文書早備，邊關之路暢通。");
      }});
    }
    // bandits less hostile if sworn_supply — soft: explore skip handled elsewhere

    // ===== v6 Chapter 3 =====
    ensureQuests();
    if (S.quests.main2.done && S.quests.main3.step === 0 && (locId === "jingji" || locId === "qingcheng")) {
      acts.push({ label: "【主線三】聽天命傳聞", fn: () => {
        S.quests.main3.step = 1;
        setFlag("ch3_started"); setFlag("ch3_rumor");
        showStory("茶肆低語如潮：夜王殘印未盡，邊關毒線、紅蓮內訌、古墓禁制同時鬆動——三方爭鋒，天命將分途。\n\n你需收集三份證據，再選一條路。");
      }});
    }
    if (S.quests.main3.step >= 1 && !S.quests.main3.done) {
      if (locId === "bianguan" && !flag("ch3_ev_border") && !hasItem("border_toxin_proof")) {
        acts.push({ label: "【主線三】追查邊關毒線", fn: () => {
          startCombat("toxin_scout", () => {
            addItem("border_toxin_proof", 1); setFlag("ch3_ev_border");
            showStory("毒探子倒下，你搜出「邊關毒線證物」。殘印毒霧確與舊盟餘燼有關。");
            tryAdvanceCh3AfterEvidence();
          });
        }});
      }
      if (locId === "honglian" && !flag("ch3_ev_lotus") && !hasItem("lotus_rift_note")) {
        acts.push({ label: "【主線三】探紅蓮內訌", fn: () => {
          startCombat("cult_zealot", () => {
            addItem("lotus_rift_note", 1); setFlag("ch3_ev_lotus");
            showStory("教中密箋入手：聖女與長老裂痕已深。紅蓮內訌證據確鑿。");
            tryAdvanceCh3AfterEvidence();
          });
        }});
      }
      if (locId === "yewang" && !flag("ch3_ev_tomb") && !hasItem("tomb_rift_seal")) {
        acts.push({ label: "【主線三】察古墓禁制", fn: () => {
          startCombat("tomb_shade", () => {
            addItem("tomb_rift_seal", 1); setFlag("ch3_ev_tomb");
            setFlag("map_wuyin");
            showStory("禁制鬆動如裂帛。你取得「古墓鬆動印」，夜氣外泄。");
            tryAdvanceCh3AfterEvidence();
          });
        }});
      }
      if (S.quests.main3.step === 2) {
        if (locId === "cangyun" || locId === "tiantai") {
          acts.push({ label: "【分途・俠義道】聯蒼雲＋天台", fn: () => {
            if (flag("ch3_path_force") || flag("ch3_path_wit")) return toast("分途已定，不可再改", true);
            setFlag("ch3_path_honor");
            if (S.fates.masteryun === "default") setFate("masteryun", "ally");
            if (S.fates.daoxuan === "default") setFate("daoxuan", "ally");
            addItem("fate_edict", 1); addItem("chapter3_shard", 1);
            S.quests.main3.step = 3; S.honor += 8; S.renown += 5;
            let extra = "";
            if (flag("disciple_suning") && !S.ch3HealUsed) {
              S.ch3HealUsed = true;
              S.hp = effectiveStats().hpMax; S.statuses = [];
              extra = "\n蘇晚晴遙寄藥囊，為你清創一次（記名弟子）。";
            }
            showStory("【俠義道】蒼雲鐘鳴、天台星杖並指殘印。你誓破陰謀，不令夜王餘燼復燃。" + extra + "\n\n最終決戰／儀式地：無音谷。");
          }});
        }
        if (locId === "heishui" || locId === "honglian") {
          acts.push({ label: "【分途・霸途】聯黑水＋紅蓮", fn: () => {
            if (flag("ch3_path_honor") || flag("ch3_path_wit")) return toast("分途已定，不可再改", true);
            setFlag("ch3_path_force");
            if (S.fates.heifeng === "default") setFate("heifeng", "ally");
            if (S.fates.honglianzhu === "default") setFate("honglianzhu", "convert");
            addItem("fate_edict", 1); addItem("chapter3_shard", 1);
            S.quests.main3.step = 3; S.force += 2; S.renown += 5;
            showStory("【霸途】黑風砸碗，紅蓮燃香。你要奪殘印自用——誰弱誰退。\n\n最終地：無音谷。");
          }});
        }
        if (locId === "shuiyun" || locId === "meihua") {
          acts.push({ label: "【分途・隱逸】聯水雲＋梅塢", fn: () => {
            if (flag("ch3_path_honor") || flag("ch3_path_force")) return toast("分途已定，不可再改", true);
            setFlag("ch3_path_wit");
            if (S.fates.shuiyunzi === "default") setFate("shuiyunzi", "teacher");
            if (S.fates.meifuren === "default") setFate("meifuren", "host");
            addItem("fate_edict", 1); addItem("chapter3_shard", 1);
            S.quests.main3.step = 3; S.wit += 2; S.luck += 1; S.focus = (S.focus || 0) + 1;
            showStory("【隱逸】湖心與梅塢約法：封存殘印，不令世人再燃烽火。\n\n最終儀式地：無音谷。");
          }});
        }
      }
      if (S.quests.main3.step === 3 && locId === "wuyin") {
        acts.push({ label: "【主線三】天命決戰／儀式", fn: () => finishChapter3() });
      }
    }

    // ===== v6 new side quests =====
    if (locId === "qingcheng") {
      acts.push({ label: "看江湖榜", fn: () => openRumorBoard() });
      if (!S.quests.side_child.done && S.quests.side_child.step === 0) {
        acts.push({ label: "【支線】聽童小六童謠", fn: () => {
          S.quests.side_child.step = 1;
          showStory("童小六唱着跑：「糖一顆，消息多——你若給糖，我教你童謠網。」（需麥芽糖）");
        }});
      }
      if (S.quests.side_child.step === 1 && !S.quests.side_child.done) {
        acts.push({ label: "【支線】給糖換童謠", fn: () => {
          if (!hasItem("candy")) {
            if (S.gold >= 3) { S.gold -= 3; addItem("candy", 1); }
            else return toast("需要麥芽糖（或 3 金）", true);
          }
          removeItem("candy", 1);
          S.quests.side_child.done = true; S.quests.side_child.step = 2;
          addItem("child_ballad", 1); setFlag("forever_intel"); setFlag("informant_tong");
          setFate("tongxiaoliu", "ally");
          ensureBonds();
          if (!S.bonds.tongxiaoliu) S.bonds.tongxiaoliu = { roles: [], unlocked: [], sinceDay: S.day };
          if (S.bonds.tongxiaoliu.roles.indexOf("informant") < 0) S.bonds.tongxiaoliu.roles.push("informant");
          if (S.bonds.tongxiaoliu.unlocked.indexOf("forever_intel") < 0) S.bonds.tongxiaoliu.unlocked.push("forever_intel");
          if (S.bonds.tongxiaoliu.unlocked.indexOf("cheap_rumors") < 0) S.bonds.tongxiaoliu.unlocked.push("cheap_rumors");
          S.perception = (S.perception || 0) + 1; S.renown += 2;
          showStory("童謠抄本入手。從此青城情報網對你永久半開——廉價傳聞常駐。");
        }});
      }
      if (S.quests.side_child.step === 1 && !hasItem("candy")) {
        acts.push({ label: "買麥芽糖（3金）", fn: () => {
          if (S.gold < 3) return toast("不夠錢", true);
          S.gold -= 3; addItem("candy", 1); toast("獲得麥芽糖", true); render();
        }});
      }
    }
    if (locId === "jingji") {
      acts.push({ label: "看江湖榜", fn: () => openRumorBoard() });
      if (!S.quests.side_cook.done && S.quests.side_cook.step === 0) {
        acts.push({ label: "【支線】孤燈夜宵委託", fn: () => {
          S.quests.side_cook.step = 1;
          showStory("孤燈婆婆：「鮮蔬、野味、香料——三樣齊，我教你一碗能吊命的夜宵。」");
        }});
      }
      if (S.quests.side_cook.step === 1 && !S.quests.side_cook.done) {
        acts.push({ label: "【支線】交付夜宵食材", fn: () => {
          if (!(hasItem("cook_veg") && hasItem("cook_meat") && hasItem("cook_spice"))) {
            return toast("需要鮮蔬、野味、香料包各一", true);
          }
          removeItem("cook_veg", 1); removeItem("cook_meat", 1); removeItem("cook_spice", 1);
          S.quests.side_cook.done = true; S.quests.side_cook.step = 2;
          S.cookMealLevel = Math.max(S.cookMealLevel || 0, 1);
          addItem("cook_meal", 2); setFlag("cook_upgrade"); setFate("gudengpo", "ally");
          ensureBonds();
          if (!S.bonds.gudengpo) S.bonds.gudengpo = { roles: [], unlocked: [], sinceDay: S.day };
          if (S.bonds.gudengpo.roles.indexOf("cook_friend") < 0) S.bonds.gudengpo.roles.push("cook_friend");
          ["free_meal","cook_meal_upgrade"].forEach(u => {
            if (S.bonds.gudengpo.unlocked.indexOf(u) < 0) S.bonds.gudengpo.unlocked.push(u);
          });
          S.bone += 1; S.renown += 2;
          showStory("爐火旺起。孤燈夜宵進階——此後免費夜宵回復更豐，並獲兩份帶路糧。");
        }});
      }
    }
    if ((locId === "qingcheng" || locId === "hub" || locId === "shamo") && S.quests.side_cook && S.quests.side_cook.step === 1) {
      acts.push({ label: "採買／搜尋夜宵食材", fn: () => {
        const pool = ["cook_veg", "cook_meat", "cook_spice"];
        const miss = pool.filter(id => !hasItem(id));
        if (!miss.length) return toast("三樣食材已齊，回京畿交婆婆", true);
        const cost = 8;
        if (S.gold < cost) return toast("需要 " + cost + " 金", true);
        S.gold -= cost;
        const got = miss[Math.floor(Math.random() * miss.length)];
        addItem(got, 1);
        showStory("覓得「" + ITEMS[got].name + "」。");
      }});
    }
    if (locId === "xueyuan") {
      if (!S.quests.side_snow.done && S.quests.side_snow.step === 0) {
        acts.push({ label: "【支線】接雪原狼嚎", fn: () => {
          S.quests.side_snow.step = 1;
          showStory("關卒咬牙：「雪狼成群。取狼皮來，北境披風與通行一併給你。」");
        }});
      }
      if (S.quests.side_snow.step === 1 && !S.quests.side_snow.done) {
        acts.push({ label: "【支線】獵雪原巨狼", fn: () => {
          startCombat("snow_wolf", () => {
            if (!hasItem("wolf_pelt")) addItem("wolf_pelt", 1);
            setFlag("north_pass"); setFlag("wolf_hunt");
            S.quests.side_snow.done = true; S.quests.side_snow.step = 2;
            if (!hasItem("snow_cloak")) addItem("snow_cloak", 1);
            S.bone += 1; S.renown += 4;
            showStory("狼嚎止息。你獲雪狼皮與霜絨披風，雪原關長開。");
          });
        }});
      }
    }
    if (locId === "leifeng") {
      if (!S.quests.side_lei.done && S.quests.side_lei.step === 0) {
        acts.push({ label: "【支線】雷峰冤案", fn: () => {
          S.quests.side_lei.step = 1;
          showStory("雷萬山壓低聲音：「有書吏貪墨栽贓。你若查清，我向上力保——或放你一條路。」");
        }});
      }
      if (S.quests.side_lei.step === 1 && !S.quests.side_lei.done) {
        acts.push({ label: "【支線】對質貪吏", fn: () => {
          startCombat("corrupt_clerk", () => {
            if (!hasItem("lei_case_scroll")) addItem("lei_case_scroll", 1);
            S.quests.side_lei.done = true; S.quests.side_lei.step = 2;
            setFlag("lei_cleared"); setFate("leiwanshan", "promoted");
            S.renown += 10; S.honor += 4; setFlag("open_longmen");
            showStory("案卷呈上。雷萬山調任在望，哨所對你敞開。聲望大增。");
          });
        }});
      }
    }
    if (locId === "chixia") {
      if (!S.quests.side_chixia.done && S.quests.side_chixia.step === 0) {
        acts.push({ label: "【支線】赤霞試劍", fn: () => {
          S.quests.side_chixia.step = 1;
          showStory("赤霞仙子：「敢在崖上與我過三招？勝則授意，敗則滾下山去。」");
        }});
      }
      if (S.quests.side_chixia.step === 1 && !S.quests.side_chixia.done) {
        acts.push({ label: "【支線】崖上試劍", fn: () => {
          startCombat("elite_bandit", () => {
            S.quests.side_chixia.done = true; S.quests.side_chixia.step = 2;
            setFate("chixiaxian", "ally");
            if (S.skills.indexOf("scarlet_arc") < 0) S.skills.push("scarlet_arc");
            setFlag("sword_chi"); S.force += 1; S.agi += 1; S.renown += 4;
            ensureBonds();
            if (!S.bonds.chixiaxian) S.bonds.chixiaxian = { roles: [], unlocked: [], sinceDay: S.day };
            if (S.bonds.chixiaxian.roles.indexOf("sword_disciple") < 0) S.bonds.chixiaxian.roles.push("sword_disciple");
            if (S.bonds.chixiaxian.unlocked.indexOf("scarlet_sword") < 0) S.bonds.chixiaxian.unlocked.push("scarlet_sword");
            showStory("劍意如霞。她收劍：「可。赤霞一式，贈你。」");
          }, () => {
            showStory("你敗於崖風。仙子淡淡：「再來。」");
          });
        }});
      }
    }
    if (locId === "wuyin") {
      if (!S.quests.side_qinmo.done && S.quests.side_qinmo.step === 0 && S.quests.main.done) {
        acts.push({ label: "【支線】無音奪魂", fn: () => {
          S.quests.side_qinmo.step = 1;
          showStory("無音琴魔忽然撫無弦琴：「聽得住，便是知音；聽不住——魂先走。」（需定力檢定）");
        }});
      }
      if (S.quests.side_qinmo.step === 1 && !S.quests.side_qinmo.done) {
        acts.push({ label: "【支線】抗奪魂曲（定力）", fn: () => {
          const st = effectiveStats();
          const roll = (st.focus || 0) * 3 + (st.wit || 0) + Math.random() * 20;
          if (roll >= 28) {
            S.quests.side_qinmo.done = true; S.quests.side_qinmo.step = 2;
            setFlag("qinmo_resisted"); setFate("wuyinqinmo", "muse");
            if (S.skills.indexOf("silent_song") < 0) S.skills.push("silent_song");
            S.focus = (S.focus || 0) + 1; S.wit += 1;
            ensureBonds();
            if (!S.bonds.wuyinqinmo) S.bonds.wuyinqinmo = { roles: [], unlocked: [], sinceDay: S.day };
            if (S.bonds.wuyinqinmo.roles.indexOf("mad_muse") < 0) S.bonds.wuyinqinmo.roles.push("mad_muse");
            if (S.bonds.wuyinqinmo.unlocked.indexOf("silent_song") < 0) S.bonds.wuyinqinmo.unlocked.push("silent_song");
            showStory("你定住心神。琴魔長笑：「無音曲，傳你——別入魔。」");
          } else {
            startCombat("mad_song_echo", () => {
              S.focus = (S.focus || 0) + (Math.random() < 0.3 ? 1 : 0);
              showStory("殘響被斬斷。你驚出一身冷汗——可再試定力，或先提升定力再來。");
            }, () => {
              addStatus("neishang", 2);
              showStory("奪魂曲入心，你內傷發作，逃回現實。");
            });
          }
        }});
      }
    }
    if (locId === "shamo") {
      if (!S.quests.side_sand.done && S.quests.side_sand.step === 0) {
        acts.push({ label: "【支線】黃沙刀約", fn: () => {
          S.quests.side_sand.step = 1;
          showStory("沙無痕以刀劃沙：「過我三刀，立約；不過，滾。」");
        }});
      }
      if (S.quests.side_sand.step === 1 && !S.quests.side_sand.done) {
        acts.push({ label: "【支線】與沙無痕論刀", fn: () => {
          startCombat("elite_bandit", () => {
            S.quests.side_sand.done = true; S.quests.side_sand.step = 2;
            addItem("sand_pact", 1); setFlag("sand_duel_done"); setFlag("sand_rival");
            setFate("shawuhen", "rival");
            if (S.skills.indexOf("sand_slash") < 0) S.skills.push("sand_slash");
            ensureBonds();
            if (!S.bonds.shawuhen) S.bonds.shawuhen = { roles: [], unlocked: [], sinceDay: S.day };
            if (S.bonds.shawuhen.roles.indexOf("rival") < 0) S.bonds.shawuhen.roles.push("rival");
            if (S.bonds.shawuhen.unlocked.indexOf("sand_blade") < 0) S.bonds.shawuhen.unlocked.push("sand_blade");
            S.force += 1; S.renown += 3;
            showStory("刀約立於沙上。黃沙刀法半式歸你——十年後，崖上見。");
          });
        }});
      }
    }

    if (S.companion && NPCS[S.companion]) {
      acts.push({ label: "解散同行（" + NPCS[S.companion].name + "）", fn: () => dismissCompanion() });
    }
    const presentHere = Object.keys(NPCS).filter(nid => NPCS[nid].loc === locId && canInviteCompanion(nid));
    presentHere.forEach(nid => {
      if (S.companion === nid) {
        // already have global 解散同行 above
      } else {
        acts.push({ label: "邀請" + NPCS[nid].name + "同行", fn: () => inviteCompanion(nid) });
      }
    });

    if (locId === "hub") {
      acts.push({ label: "扎營过夜（日結）", fn: () => campOvernight() });
    }

    try { appendPalaceAndCh3Actions(acts, locId); } catch (e) { console.warn("palace/ch3", e); }
    try { appendV8FactionActions(acts, locId); } catch (e) { console.warn("v8acts", e); }

    return acts;
  }

  function branchHelpTemple() {
    startCombat("elite_bandit", () => {
      setFlag("helped_temple"); setFate("masteryun", "ally");
      if (S.fates.heifeng === "default") setFate("heifeng", "enemy");
      S.quests.main.step = 3; S.factionRep.cangyun_sect += 20; S.renown += 10; S.honor += 5;
      if (typeof adjustKarma === "function") adjustKarma(5, "護寺");
      showStory("【分支・護寺】雲空為盟友；黑風為仇敵。下一站：密室。");
    });
  }
  function branchHelpBand() {
    startCombat("temple_guard", () => {
      setFlag("helped_band"); setFate("heifeng", "ally");
      if (S.fates.masteryun === "default") setFate("masteryun", "enemy");
      S.quests.main.step = 3; S.factionRep.heishui_band += 20; S.renown += 8;
      if (typeof adjustKarma === "function") adjustKarma(-3, "助寨");
      showStory("【分支・助寨】黑風稱兄道弟；蒼雲拒你。持鑰入密室。");
    });
  }
  function branchCh2Lotus() {
    setFlag("ch2_choice_a");
    if (S.fates.honglianzhu === "default") setFate("honglianzhu", "convert");
    if (S.fates.daoxuan === "default") setFate("daoxuan", "enemy");
    addItem("chapter2_sigil", 1); addItem("lotus_cape", 1); addItem("lotus_fan", 1);
    S.quests.main2.step = 3; S.factionRep.honglian_cult += 25; setFlag("map_wuyin");
    showStory("你聯紅蓮。獲殘印與教中裝備。天台觀聞訊不悅。前往無音谷。");
  }
  function branchCh2Dao() {
    setFlag("ch2_choice_b");
    if (S.fates.daoxuan === "default") setFate("daoxuan", "ally");
    if (S.fates.honglianzhu === "default") setFate("honglianzhu", "enemy");
    addItem("chapter2_sigil", 1); addItem("star_staff", 1); addItem("honor_token", 1);
    S.quests.main2.step = 3; S.factionRep.cangyun_sect += 5; S.honor += 8; setFlag("map_wuyin");
    showStory("你聯天台。獲殘印與星杖、義字令。紅蓮教記恨。前往無音谷。");
  }
  function sideTokenChoice() {
    openModal(`<h3>血契令</h3><div class="story-box">交還、勸退、或拒交——改寫黑風命運。</div>
      <div class="btn-row">
        <button class="btn primary" id="tok1">交還（盟友）</button>
        <button class="btn" id="tok2">勸退隐</button>
        <button class="btn danger" id="tok3">拒交（死鬥）</button>
        <button class="btn ghost" onclick="closeModal()">先算了</button>
      </div>`);
    document.getElementById("tok1").onclick = () => {
      removeItem("blood_token", 1); setFate("heifeng", "ally"); S.quests.side_token.done = true;
      S.gold += 50; S.factionRep.heishui_band += 15; closeModal(); showStory("黑風大笑稱兄弟。");
    };
    document.getElementById("tok2").onclick = () => {
      removeItem("blood_token", 1); setFate("heifeng", "redeemed"); S.quests.side_token.done = true;
      S.renown += 12; S.honor += 6; closeModal(); showStory("黑風折令退隐洛河渡。");
    };
    document.getElementById("tok3").onclick = () => {
      closeModal();
      startCombat("elite_bandit", () => {
        setFate("heifeng", "dead"); S.quests.side_token.done = true; showStory("黑風倒下。血契令沉重如山。");
      }, () => { setFate("heifeng", "enemy"); showStory("你敗走，追殺令將出。"); });
    };
  }
  function finishChapter1() {
    removeItem("ancient_key", 1);
    S.quests.main.done = true; S.quests.main.step = 4; S.chapter = 1;
    S.renown += 15; S.gold += 100; addItem("big_pill", 2); setFlag("ch2_started");
    if (flag("helped_temple") && S.fates.guqinghan === "default") {
      setFlag("invite_baixue");
      showStory("密室石壁刻舊盟：蒼雲、白雪、黑水曾一體。護寺之舉傳至白雪莊。\n\n【第一章完】第二章传闻已起——可回京畿客棧打聽。");
    } else {
      showStory("密室真相撲朔。\n\n【第一章完】可繼續遊歷，並開啟第二章。");
    }
  }
  function finishChapter2() {
    if (hasItem("chapter2_sigil")) removeItem("chapter2_sigil", 1);
    S.quests.main2.done = true; S.quests.main2.step = 4; S.chapter = 2;
    S.renown += 20; S.gold += 150; S.wit += 1; S.honor += 5;
    ensureQuests();
    if (S.quests.main3.step === 0) setFlag("ch3_rumor");
    showStory("無音谷中，殘印化光。舊盟影子散去，新的江湖格局因你而變。\n\n【第二章完】京畿／青城已有「天命分途」傳聞——第三章可開。");
  }
  function finishChapter3() {
    ensureQuests();
    if (!hasItem("chapter3_shard") && !hasItem("fate_edict")) {
      return toast("需要天命殘片或分途詔令", true);
    }
    const path = flag("ch3_path_honor") ? "俠義道" : flag("ch3_path_force") ? "霸途" : flag("ch3_path_wit") ? "隱逸" : "未明";
    startCombat("fate_envoy", () => {
      if (hasItem("chapter3_shard")) removeItem("chapter3_shard", 1);
      S.quests.main3.done = true; S.quests.main3.step = 4; S.chapter = 3;
      setFlag("ch3_finale");
      S.renown += 30; S.gold += 200; S.wit += 1; S.force += 1; S.focus = (S.focus || 0) + 1;
      let pathText = "";
      if (flag("ch3_path_honor")) {
        pathText = "殘印在蒼雲鐘聲與星杖下碎裂。陰謀退潮，你守住俠義一線。";
        S.honor += 10; if (typeof adjustKarma==="function") adjustKarma(8,"俠義了結");
      } else if (flag("ch3_path_force")) {
        pathText = "你奪下殘印餘焰納入己身。江湖震顫——有人懼你，有人附你。";
        S.force += 2; if (typeof adjustKarma==="function") adjustKarma(-8,"霸途了結");
      } else {
        pathText = "水雲與梅香封存殘印於湖心石匣。烽火未起，世人暫安。";
        S.luck += 2; S.honor += 3; if (typeof adjustKarma==="function") adjustKarma(2,"隱逸了結");
      }
      const def = resolveEnding();
      showStory("夜王餘使潰於無音。\n【分途・" + path + "】" + pathText + "\n\n【第三章完】江湖結局預開：「" + def.title + "」。可於情緣頁正式檢視。");
    }, () => {
      showStory("餘使暫退。你負傷——可再休養後來決。");
    });
  }
  function tryJoin(fid) {
    const f = FACTIONS[fid];
    if (S.faction === fid) return toast("已是本門中人", true);
    if (S.faction && fid !== S.faction) return toast("MVP++ 暫不允許轉投（可重置）", true);
    if (f.req.renown && S.renown < f.req.renown) return toast("聲望不足", true);
    if (f.req.force && S.force < f.req.force) return toast("武力不足", true);
    if (f.req.flag && !flag(f.req.flag)) {
      if (fid === "youmu_line" && (hasItem("tomb_seal") || S.fates.yechen === "ally" || S.fates.mu_youlan === "ally")) { /* ok */ }
      else if (fid === "luoying_dao" && (hasItem("sea_chart") || S.fates.murong === "ally" || S.fates.hai_kuang === "ally")) { /* ok */ }
      else return toast("尚未受邀", true);
    }
    if (f.req.honorMax && S.honor > f.req.honorMax) return toast("俠義過高，紅蓮不收", true);
    if (fid === "cangyun_sect" && S.fates.masteryun === "enemy") return toast("雲空拒見", true);
    if (fid === "heishui_band" && (S.fates.heifeng === "enemy" || S.fates.heifeng === "dead")) return toast("無法入寨", true);
    if (fid === "honglian_cult" && S.fates.honglianzhu === "enemy") return toast("聖女拒收", true);
    S.faction = fid; S.factionRep[fid] += 10;
    f.skills.forEach(sid => {
      if (!f.skillGates || !f.skillGates[sid]) {
        if (S.skills.indexOf(sid) < 0) S.skills.push(sid);
      }
    });
    if (fid === "cangyun_sect") { if (S.fates.masteryun === "default") setFate("masteryun", "ally"); addItem("temple_robe", 1); }
    if (fid === "heishui_band") { if (S.fates.heifeng === "default") setFate("heifeng", "ally"); addItem("iron_blade", 1); }
    if (fid === "baixue_manor") { if (S.fates.guqinghan === "default") setFate("guqinghan", "ally"); addItem("frost_blade", 1); }
    if (fid === "honglian_cult") { if (S.fates.honglianzhu === "default") setFate("honglianzhu", "convert"); addItem("lotus_cape", 1); }
    if (fid === "powan_bang") { if (S.fates.powan_zhang === "default") setFate("powan_zhang", "ally"); addItem("broken_bowl_staff", 1); addItem("beggar_robe", 1); }
    if (fid === "cangfeng_jian") { if (S.fates.gu_xiaoran === "default") setFate("gu_xiaoran", "ally"); addItem("cangfeng_jianqi", 1); addItem("peak_tassel", 1); }
    if (fid === "youmu_line") { if (S.fates.mu_youlan === "default") setFate("mu_youlan", "ally"); setFlag("tomb_ally"); addItem("tomb_veil", 1); }
    if (fid === "luoying_dao") { if (S.fates.hai_kuang === "default") setFate("hai_kuang", "ally"); addItem("coral_fan", 1); addItem("island_pearl", 1); }
    if (fid === "huangsha_dao") { if (S.fates.sha_yuyan === "default") setFate("sha_yuyan", "ally"); addItem("desert_scimitar", 1); addItem("iron_bracer", 1); }
    showStory("加入「" + f.name + "」！已習得基礎功法。");
  }
  function learnFactionSkill(fid) {
    if (S.faction !== fid) return toast("非本門弟子", true);
    const f = FACTIONS[fid];
    const rep = S.factionRep[fid] || 0;
    let learned = false;
    Object.keys(f.skillGates || {}).forEach(sid => {
      if (rep >= f.skillGates[sid] && S.skills.indexOf(sid) < 0) {
        S.skills.push(sid); learned = true; toast("習得 " + SKILLS[sid].name, true);
      }
    });
    if (!learned) {
      // also allow learning base missing
      f.skills.forEach(sid => {
        if (S.skills.indexOf(sid) < 0 && (!f.skillGates || !f.skillGates[sid] || rep >= f.skillGates[sid])) {
          S.skills.push(sid); learned = true; toast("習得 " + SKILLS[sid].name, true);
        }
      });
    }
    if (!learned) toast("聲望不足或已學盡", true);
    render();
  }
  // ---------- LUCK-WEIGHTED RANDOM EVENTS (v4) ----------
  const EXPLORE_EVENTS = [
    { id:"scrap_page", tier:"common", weight:12, title:"拾遺殘頁",
      run(loc){ S.exp += 4; if (Math.random()<0.4) addItem("nameless_page",1); return "腳下踩到半頁殘紙，隱約有武學心得。（經驗＋4"+(hasItem("nameless_page")?"，或得無名劍譜一頁":"")+"）"; } },
    { id:"old_coins", tier:"common", weight:14, title:"拾得古幣",
      run(loc){ const g=8+Math.floor(Math.random()*20)+Math.floor(effectiveStats().luck); S.gold+=g; return "草叢裡滾出幾枚古幣。（＋"+g+"金）"; } },
    { id:"wild_herb", tier:"common", weight:14, title:"採得草藥",
      run(loc){ addItem("herb",1+(effectiveStats().medicine>=6?1:0)); return "你憑眼力辨出止血草。"+(effectiveStats().medicine>=6?"醫術精深，多採一株。":""); } },
    { id:"beggar", tier:"good", weight:10, title:"路遇乞丐",
      choices:true,
      run(loc){ return "__CHOICE_BEGGAR__"; } },
    { id:"secret_letter", tier:"good", weight:8, title:"密信傳書",
      run(loc){ setFlag("heard_yaogu"); setFlag("heard_meihua"); if(!flag("open_longmen")) setFlag("open_longmen"); return "飛鴿落下密信一角：藥谷、梅塢、龍門皆有異動。（多條線索提示）"; } },
    { id:"lost_child", tier:"good", weight:9, title:"走失幼童",
      run(loc){ S.renown+=2; S.honor+=2; S.charm=Math.min(30,(S.charm||5)+1); if(typeof adjustKarma==="function") adjustKarma(2,"救童"); return "你把走失孩童送回父母身邊。聲望與俠義微升，魅力也略增。"; } },
    { id:"night_assassin", tier:"bad", weight:9, title:"夜路刺客",
      run(loc){ return "__COMBAT_ASSASSIN__"; } },
    { id:"hermit_tip", tier:"good", weight:8, title:"隱士指點",
      run(loc){ S.wit=Math.min(30,S.wit+1); S.neili=Math.min(effectiveStats().neiliMax,S.neili+15); return "路邊隱士點你眉心：「心靜則明。」悟性＋1，內力略回。"; } },
    { id:"gamble_stall", tier:"neutral", weight:8, title:"賭攤比試",
      choices:true, run(loc){ return "__CHOICE_GAMBLE__"; } },
    { id:"poison_mist", tier:"bad", weight:7, title:"毒霧陷阱",
      run(loc){
        const st=effectiveStats();
        if (st.perception + st.focus + Math.random()*10 > 14) {
          S.exp+=3; return "你眼力／定力足夠，避開路邊毒霧機關。（經驗＋3）";
        }
        S.hp=Math.max(1,S.hp-12); addStatus("neishang",2);
        return "毒霧驟起！你閃避不及，氣血受損並中內傷。";
      } },
    { id:"sword_tomb_shard", tier:"rare", weight:5, title:"劍冢殘鋒",
      run(loc){ addItem("sword_shard",1); S.force=Math.min(40,S.force+(Math.random()<0.5?1:0)); return "亂石中露出一截寒光殘鋒。你收入囊中（劍冢殘鋒）。"; } },
    { id:"caravan", tier:"neutral", weight:9, title:"商隊求助",
      choices:true, run(loc){ return "__CHOICE_CARAVAN__"; } },
    { id:"bandit_ambush", tier:"bad", weight:8, title:"劫匪擋路",
      run(loc){ return "__COMBAT_BANDIT__"; } },
    { id:"fairy_dew", tier:"epic", weight:3, title:"仙緣露",
      luckMin:10,
      run(loc){ addItem("fairy_dew",1); S.luck=Math.min(25,S.luck+1); return "晨露凝成珠，隱隱仙氣——你得「仙緣露」，福緣＋1。"; } },
    { id:"nameless_manual", tier:"epic", weight:3, title:"無名劍譜",
      luckMin:12,
      run(loc){ addItem("nameless_page",1); S.focus=Math.min(25,(S.focus||5)+1); return "石縫夾着一頁無名劍譜。定力＋1。"; } },
    { id:"mystic_elder", tier:"epic", weight:3, title:"神秘老人贈藥",
      luckMin:11,
      run(loc){ addItem("big_pill",1); addItem("med_salve",1); S.medicine=Math.min(20,(S.medicine||3)+1); return "白髮老人塞你兩包藥：「小子面善。」醫術＋1。"; } },
    { id:"hanxue_rumor", tier:"rare", weight:4, title:"汗血傳聞",
      run(loc){
        ensureQuests();
        if (S.quests.side_hanxue) S.quests.side_hanxue.step = Math.max(S.quests.side_hanxue.step, 1);
        setFlag("open_longmen");
        return "過路馬商竊語：龍門馬市近日有西域汗血蹤跡。重金、福緣，或缺一不可。";
      } },
    { id:"cangfeng_poster", tier:"good", weight:5, title:"蒼峰論劍榜",
      run(loc){
        ensureQuests();
        if (S.quests.side_cangfeng) S.quests.side_cangfeng.step = Math.max(S.quests.side_cangfeng.step, 1);
        setFlag("cangfeng_invite"); setFlag("chixia_path");
        return "樹上釘着蒼峰論劍招貼。赤霞崖／天台方向，隱有劍鳴。";
      } },
    { id:"peace", tier:"common", weight:10, title:"平安無事",
      run(loc){ const locObj=LOCATIONS.find(l=>l.id===loc)||{}; return (locObj.desc||"此處")+" 今日平安，只聞風聲。"; } },
    { id:"hidden_cache", tier:"good", weight:6, title:"發現隱藏物",
      run(loc){
        const st=effectiveStats();
        if (st.perception + st.luck + Math.random()*8 < 12) {
          return "你總覺得草叢異樣，卻什麼也沒找到。（眼力不足）";
        }
        const pool=["pill","wine","bronze_mirror","focus_incense","eye_drop"];
        const id=pool[Math.floor(Math.random()*pool.length)];
        addItem(id,1); return "眼力過人，你發現藏物：「"+ITEMS[id].name+"」。";
      } }
  ];

  function eventWeight(ev, luck) {
    if (typeof hasUnlock === "function" && hasUnlock("dao_stargaze") && ev && (ev.tier === "good" || ev.tier === "rare" || ev.tier === "epic")) luck += 2;
    let w = ev.weight || 1;
    if (ev.tier === "epic") w *= (luck >= (ev.luckMin || 10) ? 1 + (luck - 8) * 0.35 : 0.05);
    else if (ev.tier === "rare") w *= 0.7 + luck * 0.08;
    else if (ev.tier === "good") w *= 0.85 + luck * 0.06;
    else if (ev.tier === "bad") w *= Math.max(0.25, 1.1 - luck * 0.06);
    if (ev.luckMin && luck < ev.luckMin && ev.tier === "epic") w *= 0.08;
    return Math.max(0.05, w);
  }
  function pickExploreEvent(luck) {
    const pool = EXPLORE_EVENTS.map(ev => ({ ev, w: eventWeight(ev, luck) }));
    const sum = pool.reduce((a,b)=>a+b.w,0);
    let r = Math.random() * sum;
    for (const p of pool) { r -= p.w; if (r <= 0) return p.ev; }
    return pool[pool.length-1].ev;
  }
  function bumpMinorAttr() {
    const keys = ["charm","focus","medicine","perception","luck","wit"];
    const k = keys[Math.floor(Math.random()*keys.length)];
    const cap = 22;
    if ((S[k]||0) < cap && Math.random() < 0.22) {
      S[k] = (S[k]||0) + 1;
      return "／機緣：" + ({charm:"魅力",focus:"定力",medicine:"醫術",perception:"眼力",luck:"福緣",wit:"悟性"})[k] + "＋1";
    }
    return "";
  }
  function runExploreChoice(kind, locId) {
    if (kind === "beggar") {
      openModal(`<h3>路遇乞丐</h3><div class="story-box">衣衫襤褸的老人伸手：「行行好……」</div>
        <div class="btn-row">
          <button class="btn primary" id="ev-give">施捨 10 金</button>
          <button class="btn" id="ev-ignore">視而不見</button>
        </div>`);
      document.getElementById("ev-give").onclick = () => {
        closeModal();
        if (S.gold < 10) { showStory("囊中羞澀，只好作罷。"); return; }
        S.gold -= 10; S.honor += 2; S.charm = Math.min(30, (S.charm||5)+1);
        if (typeof adjustKarma === "function") adjustKarma(2, "施捨");
        if (Math.random() < 0.45 + effectiveStats().luck * 0.02) {
          addItem("compass_charm", 1); S.renown += 1;
          showStory("老人塞你一枚定風符：「好人有好報。」俠義、魅力上升。");
        } else showStory("老人連連道謝後離去。俠義、魅力微升。");
      };
      document.getElementById("ev-ignore").onclick = () => {
        closeModal(); S.honor = Math.max(0, S.honor - 1);
        if (typeof adjustKarma === "function") adjustKarma(-1, "冷漠");
        showStory("你別過臉走了。心裡微微不安。（俠義－1）");
      };
      return;
    }
    if (kind === "gamble") {
      openModal(`<h3>賭攤／比武擂</h3><div class="story-box">攤主招呼：「押 15 金，比力氣或運氣！」</div>
        <div class="btn-row">
          <button class="btn primary" id="ev-bet">下注一搏</button>
          <button class="btn" id="ev-pass">不賭</button>
        </div>`);
      document.getElementById("ev-bet").onclick = () => {
        closeModal();
        if (S.gold < 15) { showStory("金錢不足。"); return; }
        S.gold -= 15;
        const st = effectiveStats();
        const win = (st.luck * 2 + st.force + Math.random()*20) > 28;
        if (win) { const g=30+Math.floor(st.luck*2); S.gold+=g; showStory("你贏了！獲 "+g+" 金。"); }
        else showStory("手氣不順，15 金打了水漂。");
      };
      document.getElementById("ev-pass").onclick = () => { closeModal(); showStory("你搖頭離去，賭攤喧嘩漸漸遠了。"); };
      return;
    }
    if (kind === "caravan") {
      openModal(`<h3>商隊求助</h3><div class="story-box">商隊被劫匪盯上，管事求你護送一程。</div>
        <div class="btn-row">
          <button class="btn primary" id="ev-help">出手相助</button>
          <button class="btn" id="ev-leave">少管為妙</button>
        </div>`);
      document.getElementById("ev-help").onclick = () => {
        closeModal();
        startCombat("bandit", () => {
          S.gold += 25; S.renown += 2; S.honor += 2; setFlag("trade_pass");
          if (typeof adjustKarma === "function") adjustKarma(3, "護商");
          showStory("商隊脫險，贈金並記你人情。古蘭商路更近了一步。");
        });
      };
      document.getElementById("ev-leave").onclick = () => { closeModal(); showStory("你轉身走了。商隊的呼救聲消失在風裡。"); };
      return;
    }
  }
  function exploreLoc(locId) {
    const st = effectiveStats();
    const luck = st.luck || 5;
    const baseRate = Math.min(0.55, 0.18 + luck * 0.025);
    // perception slightly increases special-event chance
    const rate = Math.min(0.62, baseRate + (st.perception || 0) * 0.008);
    const poolMap = {
      cangyun: "temple_guard", bianguan: "toxin_scout", jianzhong: "shadow",
      yanhui: "sea_raider", qingzhu: "bamboo_assassin", honglian: "cult_zealot",
      yewang: "tomb_shade", xueyuan: "snow_wolf", chixia: "elite_bandit"
    };
    if (Math.random() > rate) {
      // mundane fallback still varied
      const r = Math.random();
      if (r < 0.28) { startCombat(poolMap[locId] || (Math.random() < 0.5 ? "wolf" : "bandit")); return; }
      if (r < 0.5) { S.gold += 4 + Math.floor(Math.random()*12); toast("撿到碎銀", true); render(); return; }
      if (r < 0.7) { addItem("herb", 1); toast("採得止血草", true); render(); return; }
      showStory((LOCATIONS.find(l => l.id === locId) || {}).desc + " 四下平靜。");
      return;
    }
    const ev = pickExploreEvent(luck);
    const raw = ev.run(locId);
    if (raw === "__CHOICE_BEGGAR__") return runExploreChoice("beggar", locId);
    if (raw === "__CHOICE_GAMBLE__") return runExploreChoice("gamble", locId);
    if (raw === "__CHOICE_CARAVAN__") return runExploreChoice("caravan", locId);
    if (raw === "__COMBAT_ASSASSIN__") {
      showStory("夜色中刀光一閃——刺客！");
      setTimeout(() => startCombat(poolMap[locId] || "bamboo_assassin"), 200);
      return;
    }
    if (raw === "__COMBAT_BANDIT__") {
      showStory("劫匪攔路：「留下買路財！」");
      setTimeout(() => startCombat(poolMap[locId] || "bandit"), 200);
      return;
    }
    const extra = bumpMinorAttr();
    showStory("【" + ev.title + "】\n" + raw + extra);
    try { checkKarmaPlots({ explore: true }); } catch (e) {}
    if (flag("karma_bounty") && Math.random() < 0.18) setTimeout(function(){ startCombat("bounty_thug"); }, 400);
    try { maybeTriggerEnslavement(); } catch (e) {}
    try {
      if (/huanggong|neiting|hougong|yulin|dongchang|wumen|yangxin|yuhuayuan|qianqing|taihedian|wuying/.test(locId)) maybePalaceIncident();
    } catch (e) {}
  }
  function maybeTravelEvent() {
    const st = effectiveStats();
    const rate = Math.min(0.28, 0.06 + (st.luck || 5) * 0.012);
    if (Math.random() > rate) return false;
    const ev = pickExploreEvent(st.luck || 5);
    if (ev.choices || String(ev.run("travel")).indexOf("__") === 0) return false;
    const raw = ev.run(S.loc);
    if (!raw || String(raw).indexOf("__") === 0) return false;
    showStory("【途中見聞・" + ev.title + "】\n" + raw + bumpMinorAttr());
    try { checkKarmaPlots({ travel: true }); } catch (e) {}
    return true;
  }
  function shopPrice(it) {
    const st = effectiveStats();
    let disc = Math.min(0.18, (st.charm || 0) * 0.012);
    if (typeof hasUnlock === "function" && hasUnlock("merchant_discount")) disc += 0.10;
    if (typeof hasUnlock === "function" && hasUnlock("forge_upgrade") && S.loc === "longmen") disc += 0.08;
    disc = Math.min(0.40, disc);
    return Math.max(1, Math.floor(it.price * (1 - disc)));
  }
  function openShop(ids) {
    const st = effectiveStats();
    let discPct = Math.min(18, Math.floor((st.charm || 0) * 1.2));
    if (typeof hasUnlock === "function" && hasUnlock("merchant_discount")) discPct += 10;
    if (typeof hasUnlock === "function" && hasUnlock("forge_upgrade") && S.loc === "longmen") discPct += 8;
    discPct = Math.min(40, discPct);
    let html = "<h3>商店</h3>" + (discPct ? `<p class='small'>議價／羈絆折扣約 ${discPct}%</p>` : "") + "<div class='btn-row'>";
    ids.forEach(id => {
      const it = ITEMS[id];
      const price = shopPrice(it);
      html += `<button class="btn" data-buy="${id}">${it.name} · ${price}金${price < it.price ? "（原" + it.price + "）" : ""} <span class="badge ${it.rarity||"common"}">${it.rarity||"common"}</span><span class="sub">${it.desc}</span></button>`;
    });
    html += `<button class="btn ghost" onclick="closeModal()">關閉</button></div>`;
    openModal(html);
    document.querySelectorAll("[data-buy]").forEach(btn => {
      btn.onclick = () => {
        const id = btn.getAttribute("data-buy");
        const it = ITEMS[id];
        const price = shopPrice(it);
        if (S.gold < price) return toast("金錢不足", true);
        S.gold -= price; addItem(id, 1); toast("購入 " + it.name, true); closeModal(); openShop(ids); render();
      };
    });
  }


  // ---------- TALK / FREE INPUT UI ----------
  function offlineTalk(npcId) {
    const fate = S.fates[npcId];
    const lines = {
      suning: { default: "蘇晚晴：「傷口要清，心事也是。」", ally: "「藥鼎溫着，隨便坐。」", enemy: "「密信之事，我不想再見你。」" },
      heifeng: { default: "黑風：「進寨可以，活着出去看本事。」", ally: "「兄弟！今日喝翻席。」", enemy: "「還敢來？找死。」" },
      guqinghan: { default: "顧清寒：「白雪莊重諾。」", ally: "「正好論劍。」", married: "「莊裡永遠有你的位置。」", enemy: "「今日清算。」" },
      masteryun: { default: "雲空：「放下屠刀，少造殺業。」", ally: "「記名弟子，齋飯管夠。」", enemy: "「請回吧。」" },
      shenguhong: { default: "沈孤鴻：「邊關的毒比刀狠。」", hero: "「孤鴻在此！」", ally: "「結義金蘭。」", enemy: "「內奸！」" },
      linqing: { default: "林清歌輕撥琴弦：「客從何處來？」", muse: "「這曲，為你而譜。」", ally: "「坐下聽一曲吧。」", enemy: "琴音陡然尖銳。" },
      zhaotie: { default: "趙鐵山：「打鐵的不打誑語。」", master: "「半個徒弟，爐前隨你看。」", ally: "「要兵器？說話。」", enemy: "「不接你的活。」" },
      murong: { default: "慕容煙噴煙：「港裡有規矩。」", ally: "「船隊聽你一聲。」", smuggler: "「夜航……可以安排。」", enemy: "「海上見。」" },
      honglianzhu: { default: "紅蓮聖女：「紅幔之內，各安天命。」", convert: "「既入教，便守教規。」", ally: "「客卿之禮。」", enemy: "「火毒伺候。」" },
      daoxuan: { default: "道玄：「星象有缺，人事有補。」", ally: "「道緣不淺。」", hermit: "「貧道閉關。」", enemy: "「請回。」" },
      yechen: { default: "夜塵：「墓不迎生人。」", freed: "「咒解……我自由了。」", ally: "「墓道可開。」", enemy: "「永拒。」" },
      shuiyunzi: { default: "水雲子：「潮起潮落，何必著急。」", teacher: "「散學已授，好自為之。」", ally: "「來喝茶。」", enemy: "屋門緊閉。" },
      lan_keeper: { default: "藍掌櫃：「客官住店還是打探？」", ally: "「有消息先給你。」", enemy: "「價錢翻倍。」" },
      boatman: { default: "老張：「過渡一文錢。」", ally: "「兄弟免費。」" },
      tiesuanpan: { default: "鐵算盤：「帳要清，人更要精。」", ally: "「你的帳，我記綠筆。」", enemy: "「黑冊有名。」", partner: "「合資生意，對半分。」" },
      baizhi: { default: "白芷小聲：「谷裡草藥……要小心毒。」", ally: "「我幫你採新鮮的。」", apprentice: "「我跟你走！」", enemy: "她躲進藥棚。" },
      hanya: { default: "寒鴉：「竹影裡，無人聽見呼救。」", ally: "「今夜我幫你斷後。」", enemy: "「殺令已下。」", retired: "「刀收了。」" },
      leiwanshan: { default: "雷萬山：「報名、驗憑——軍令如山。」", ally: "「文書蓋好，一路暢通。」", enemy: "「拿下！」", promoted: "「邊關調令到了。」" },
      shawuhen: { default: "沙無痕：「刀不快，別來黃沙驛。」", ally: "「來，比一招。」", enemy: "「沙裡見。」", rival: "「十年後，崖上見。」" },
      meifuren: { default: "梅夫人：「塢中梅開，客且慢行。」", ally: "「廂房為你留着。」", host: "「以莊主禮待客。」", enemy: "「請回吧。」" },
      tongxiaoliu: { default: "童小六：「嘿嘿，你給糖我就講。」", ally: "「小六給你通風報信！」", enemy: "朝你扔泥巴。" },
      gudengpo: { default: "孤燈婆婆：「灶下無閒事……多半也有。」", ally: "「夜宵給你留一碗。」", enemy: "「今晚鹹了點。」" },
      chixiaxian: { default: "赤霞仙子：「崖風烈，劍意更烈。」", ally: "「這一式，贈你。」", enemy: "劍出如霞。", immortal: "紅衣似遠似近。" },
      wuyinqinmo: { default: "無音琴魔：「聽不見的，才是殺機。」", ally: "「無音曲，護你一程。」", enemy: "琴弦無聲而殺。", mad: "他只對着虛空笑。" },
      gu_xiaoran: { default: "顧小然：「劍在人在。」", ally: "「去蒼峰論劍？」", rival: "「拔劍。」", enemy: "「讓開。」" },
      ye_qingshan: { default: "葉青山：「蒼峰門下，以和為貴。」", ally: "「自己人。」", enemy: "「滾。」" },
      lin_feng: { default: "林風：「喝酒嗎？」", ally: "「自己人。」", enemy: "「滾。」" },
      ning_shuying: { default: "寧書影：「劍在，人在。」", ally: "「自己人。」", enemy: "「滾。」" },
      ye_xiaoyu: { default: "葉小雨：「你是誰呀？」", ally: "「自己人。」", enemy: "「滾。」" },
      lin_chen: { default: "林辰：「仇——還沒報。」", ally: "「自己人。」", enemy: "「滾。」" },
      ren_yingluo: { default: "任盈蘿：「紅蓮裡，小心火。」", ally: "「自己人。」", enemy: "「滾。」" },
      feng_qingya: { default: "風清崖：「……劍緣？」", ally: "「自己人。」", enemy: "「滾。」" },
      qu_yangqin: { default: "曲陽琴：「可聽一曲？」", ally: "「自己人。」", enemy: "「滾。」" },
      qiao_fengshan: { default: "喬峰山：「碗裡的酒，敬過義氣。」", ally: "「自己人。」", enemy: "「滾。」" },
      duan_muyu: { default: "段沐雨：「南疆路遠，你要去哪？」", ally: "「自己人。」", enemy: "「滾。」" },
      xu_zhuoyun: { default: "虛竹雲：（點頭，不語）", ally: "「自己人。」", enemy: "「滾。」" },
      zhang_wujiang: { default: "張無疆：「要不要乾糧？」", ally: "「自己人。」", enemy: "「滾。」" },
      zhao_minyan: { default: "趙敏嫣：「本……我只是過路的。」", ally: "「自己人。」", enemy: "「滾。」" },
      zhou_zhi_xue: { default: "周芷雪：「……你好。」", ally: "「自己人。」", enemy: "「滾。」" },
      hong_qigong_x: { default: "洪七影：「有飯沒？」", ally: "「自己人。」", enemy: "「滾。」" },
      huang_yaoshi_x: { default: "黃藥石：「才學幾何？」", ally: "「自己人。」", enemy: "「滾。」" },
      ouyang_fengdu: { default: "歐陽風毒：「血香……不錯。」", ally: "「自己人。」", enemy: "「滾。」" },
      xiao_longyin: { default: "小龍吟：「墓中不宜久留。」", ally: "「自己人。」", enemy: "「滾。」" },
      yang_guochen: { default: "楊過塵：「擋路？」", ally: "「自己人。」", enemy: "「滾。」" },
      guo_jingyi: { default: "郭靖義：「為國為民。」", ally: "「自己人。」", enemy: "「滾。」" },
      huang_rongya: { default: "黃蓉芽：「嘻，算到你了。」", ally: "「自己人。」", enemy: "「滾。」" },
      dongfang_gubai: { default: "東方孤白：「日月……在我。」", ally: "「自己人。」", enemy: "「滾。」" },
      zuo_lengying: { default: "左冷影：「五峰，當一。」", ally: "「自己人。」", enemy: "「滾。」" },
      mu_gaofeng_x: { default: "木高風：「金爪借你一用？」", ally: "「自己人。」", enemy: "「滾。」" },
      wei_xiaozhou: { default: "韋小舟：「宮裡消息，很貴。」", ally: "「自己人。」", enemy: "「滾。」" },
      chen_jinnan_x: { default: "陳近南影：「反的是昏政。」", ally: "「自己人。」", enemy: "「滾。」" },
      jianning_jun: { default: "建寧郡主：「本宮說了算！」", ally: "「自己人。」", enemy: "「滾。」" },
      hai_dafu_x: { default: "海大富影：「……我聽得見。」", ally: "「自己人。」", enemy: "「滾。」" },
      ao_baiying: { default: "鰲拜影：「跪下。」", ally: "「自己人。」", enemy: "「滾。」" },
      shuang_er_x: { default: "雙兒影：「公子／姑娘萬福。」", ally: "「自己人。」", enemy: "「滾。」" },
      su_quan_x: { default: "蘇荃影：「神龍令在此。」", ally: "「自己人。」", enemy: "「滾。」" },
      hong_antong_x: { default: "洪安通影：「入教否？」", ally: "「自己人。」", enemy: "「滾。」" },
      jiu_nan_x: { default: "九難影：「阿彌陀佛。」", ally: "「自己人。」", enemy: "「滾。」" },
      a_ke_x: { default: "阿珂影：「……任務。」", ally: "「自己人。」", enemy: "「滾。」" },
      mu_jianping_x: { default: "沐劍屏影：「姐姐呢？」", ally: "「自己人。」", enemy: "「滾。」" },
      fang_yi_x: { default: "方怡影：「別多問。」", ally: "「自己人。」", enemy: "「滾。」" },
      mao_dongzhu_x: { default: "「太后」：「罷了。」", ally: "「自己人。」", enemy: "「滾。」" },
      duo_long_x: { default: "多隆影：「喝酒！」", ally: "「自己人。」", enemy: "「滾。」" },
      suo_etu_x: { default: "索額圖影：「票擬擬好了。」", ally: "「自己人。」", enemy: "「滾。」" },
      wu_sangui_x: { default: "吳三桂影：「藩鎮自有藩鎮的道理。」", ally: "「自己人。」", enemy: "「滾。」" },
      shi_lang_x: { default: "施琅影：「潮起即戰。」", ally: "「自己人。」", enemy: "「滾。」" },
      mao_shiba_x: { default: "茅十八影：「進京？跟我。」", ally: "「自己人。」", enemy: "「滾。」" },
      huang_linger: { default: "黃靈兒：「嘻，你誰呀？」", ally: "「要不要我幫你打聽？」", apprentice: "「師父——嘻。」" },
      sha_yuyan: { default: "沙語嫣：「沙裡，只認刀。」", ally: "「跟上，別迷路。」", muse: "「……看夠了？」" },
      powan_zhang: { default: "破碗長老：「碗響，飯來。」", ally: "「幫裡給你留碗粥。」", teacher: "「棒法要醜，才打得巧。」" },
      mu_youlan: { default: "慕幽蘭：「……別吵。」", ally: "「掌心對準，勿催勁。」", hermit: "「去吧。」" },
      hai_kuang: { default: "海狂生：「花落——陣起！」", ally: "「上船！不，下船！」", teacher: "「奇門三句：換、誘、走。」" },
      shen_guifei: { default: "沈貴妃：「誰准你進來的？」", ally: "「進來——低聲。」", enemy: "「來人。」", muse: "「你既看見了……」" },
      liu_zhaoyi: { default: "柳昭儀：「貴妃娘娘……」", ally: "「我什麼都沒聽見。」" },
      da_jiangjun: { default: "霍鎮北：「軍令如山。」", ally: "「要兵？看軍功。」", enemy: "「跪下。」" },
      jingandi: { default: "景安帝：「說。」", ally: "「坐。今日殿中無別人。」", married: "「璇璣殿的燈，為你留着。」", muse: "「再撫一曲給朕聽。」", enemy: "「來人——拿下。」" },
      dongchang_gong: {
        default: "東廠督公：「名字，寫進檔案了嗎？」",
        ally: "「廠裡的刀，借你一用。」",
        enemy: "「黑牢有空位。」",
        muse: "他罕見地移開視線：「……你再靠近一步。」",
        partner: "「墨契未成，也當自己人。」",
        slave: "廠奴跪下：「主人有何吩咐？」",
        redeemed: "「兄長……我不再舉刀。」",
        promoted: "他已不在其位。",
        dead: "印落，人亡。",
        vanished: "廠署空椅。"
      },
      yulin_tongling: { default: "羽林統領：「報名、驗刀。」", ally: "「自己人，進營。」", enemy: "「禁軍，拿下！」", promoted: "「御前缺人，你上。」" },
      renyazi: { default: "人牙子：「看貨？還是……當貨？」", ally: "「今晚分帳。」", enemy: "「你逃不出這巷。」", dead: "鎖鏈空響。" },
      gongnv_head: { default: "掌事姑姑：「衣冠整，再說話。」", ally: "「花廊點卯，你領頭。」", teacher: "「宮規第一課：別逾矩。」", enemy: "「罰跪。」" }
    };
    const pack = lines[npcId] || {};
    if (npcId === "dongchang_gong" && (fate === "muse" || fate === "slave" || fate === "partner") && flag("donggong_truth_known")) {
      if (fate === "muse") return "玄梧低聲：「……別叫督公。今夜只叫我名字。」";
      if (fate === "slave") return "廠奴玄梧跪下：「主人有何吩咐？」";
      if (fate === "partner") return "玄梧：「雙龍符在——我仍聽你。」";
    }
    return pack[fate] || pack.default || (NPCS[npcId].intro);
  }

  async function talkNpc(npcId) {
    try {
      if (npcId && NPCS[npcId]) {
        const mf = "met_" + npcId.replace(/_x$/, "").replace(/_shadow$/, "");
        // common met_ flags used by relations
        const MET_MAP = { ye_qingshan:"met_ye_qingshan", lin_feng:"met_lin_feng", ning_shuying:"met_ning_shuying", ye_xiaoyu:"met_ye_xiaoyu", lin_chen:"met_lin_chen", ren_yingluo:"met_ren_yingluo", feng_qingya:"met_feng_qingya", qu_yangqin:"met_qu_yangqin", qiao_fengshan:"met_qiao_fengshan", duan_muyu:"met_duan_muyu", xu_zhuoyun:"met_xu_zhuoyun", zhang_wujiang:"met_zhang_wujiang", zhao_minyan:"met_zhao_minyan", zhou_zhi_xue:"met_zhou_zhi_xue", hong_qigong_x:"met_hong_qigong", huang_yaoshi_x:"met_huang_yaoshi", ouyang_fengdu:"met_ouyang_fengdu", xiao_longyin:"met_xiao_longyin", yang_guochen:"met_yang_guochen", guo_jingyi:"met_guo_jingyi", huang_rongya:"met_huang_rongya", dongfang_gubai:"met_dongfang_gubai", zuo_lengying:"met_zuo_lengying", mu_gaofeng_x:"met_mu_gaofeng", wei_xiaozhou:"met_wei_xiaozhou", chen_jinnan_x:"met_chen_jinnan", jianning_jun:"met_jianning", hai_dafu_x:"met_hai_dafu", ao_baiying:"met_ao_baiying", shuang_er_x:"met_shuang_er", su_quan_x:"met_su_quan", hong_antong_x:"met_hong_antong", jiu_nan_x:"met_jiu_nan", a_ke_x:"met_a_ke", mu_jianping_x:"met_mu_jianping", fang_yi_x:"met_fang_yi", mao_dongzhu_x:"met_mao_dongzhu", duo_long_x:"met_duo_long", suo_etu_x:"met_suo_etu", wu_sangui_x:"met_wu_sangui", shi_lang_x:"met_shi_lang", mao_shiba_x:"met_mao_shiba" };
        if (MET_MAP[npcId]) setFlag(MET_MAP[npcId], true);
      }
    } catch (e) {}

    if (isImprisoned() && npcId !== S.prison.by) {
      toast("關押中只能與看守交涉", true);
      npcId = S.prison.by;
    }
    const npc = NPCS[npcId];
    const blocked = { dead: "已不在人世", vanished: "已失踪", redeemed: "已退隐", retired: "退居不問", hermit: "閉關不見" };
    const f = S.fates[npcId];
    if (blocked[f] && f !== "hermit" && !(isImprisoned() && S.prison.by === npcId)) return showStory(npc.name + blocked[f] + "。" + (npc.destinies[f] || ""));
    if ((f === "dead" || f === "vanished") && !(isImprisoned() && S.prison.by === npcId)) return showStory(npc.name + "……" + (npc.destinies[f] || ""));

    ensureNpcMem(npcId);
    ui.talking = npcId;
    const mem = ensureNpcMem(npcId);
    openModal(`<div class="talk-sheet">
      <div class="talk-header">
        <div class="talk-head-row">
          ${chibiHtml(npcId, "lg")}
          <div class="talk-head-text">
            <h3>${escapeHtml(npc.name)} <span class="badge">${escapeHtml(npc.title)}</span></h3>
            <p class="small" id="talk-meta">命運：${fateLabel(f)} · ${mem.rel} · ${mem.mood}${bondSummary(npcId)?" · 羈絆："+bondSummary(npcId):""}${mem.wounded?" · 帶傷":""}${npc.major ? "" : " · 配角"} · ${npcProfile(npcId).label}</p>
            <p class="mem-hint" id="mem-hint">💬 ${memoryHint(npcId)}${isImprisoned() && S.prison.by===npcId ? " · ⛓關押中" : ""}${bondSummary(npcId) ? " · "+bondSummary(npcId) : ""}</p>
          </div>
        </div>
      </div>
      <div class="talk-scroll">
        <div class="story-box" id="npc-line">${escapeHtml(offlineTalk(npcId))}</div>
        <p class="ai-tag" id="ai-status">${settings.deepseekKey ? "DeepSeek 就緒" : "離線模式（記憶仍會保存）"}</p>
      </div>
      <div class="composer">
        <div class="seg tabs" id="input-mode">
          <button type="button" class="btn primary" data-mode="say">說話</button>
          <button type="button" class="btn" data-mode="action">行動</button>
        </div>
        <textarea class="input area composer-input" id="free-input" rows="2" enterkeyhint="send" placeholder="想說的話或想做的行為…"></textarea>
        <div class="composer-primary">
          <button type="button" class="btn primary" id="btn-send-free">送出</button>
          <button type="button" class="btn ghost composer-leave" id="btn-talk-leave">告辭</button>
        </div>
        <div class="intent-chips" id="intent-chips"></div>
        <div class="composer-actions">
          <button type="button" class="btn" id="npc-gift">關鍵道具</button>
          <button type="button" class="btn ghost" id="btn-mem-debug">記憶摘要</button>
          <button type="button" class="btn heart-chip" id="btn-enter-dating" style="display:none">進入戀人密語</button>
        </div>
      </div>
    </div>`);
    let mode = "say";
    document.querySelectorAll("#input-mode [data-mode]").forEach(btn => {
      btn.onclick = () => {
        mode = btn.getAttribute("data-mode");
        document.querySelectorAll("#input-mode [data-mode]").forEach(b => b.classList.remove("primary"));
        btn.classList.add("primary");
        const inp = document.getElementById("free-input");
        if (inp) {
          inp.placeholder = mode === "action" ? "想做的行為…" : "想說的話…";
          inp.focus();
        }
      };
    });
    const freeInp = document.getElementById("free-input");
    bindComposerFocus(freeInp);
    (function bindIntentChips() {
      const wrap = document.getElementById("intent-chips");
      if (!wrap) return;
      let chips = isImprisoned()
        ? [["裝傷","action","假裝受傷，求醫時逃走"],["偷鎖匙","action","趁看守不備偷鎖匙"],["撬鎖","action","撬開门锁逃走"],["求饒","say","我已知錯，請放我思過後離開"],["賄賂","action","用金錢買通放行"],["突圍","action","動手衝出禁室"]]
        : [["暗算","action","趁佢唔覺刺一刀"],["動手","action","拔刀動手"],["示好","say","送上薄禮，望結善緣"],["線索","say","請問近日可有江湖線索？"],["道歉","say","先前得罪，特來謝罪"]];
      if (!isImprisoned()) {
        availableOfferChips(npcId).forEach(o => {
          chips.push([o.label + (o.ready ? "✓" : "…"), o.cmode, o.ctext]);
        });
        if (typeof isDating === "function" && isDating(npcId) && typeof canInviteCompanion === "function" && canInviteCompanion(npcId) && S.companion !== npcId) {
          chips.push(["邀戀人同行", "action", "想邀你同行一程，可願？"]);
        }
      }
      wrap.innerHTML = chips.map(c => "<button type=\"button\" class=\"chip-btn\" data-cmode=\""+c[1]+"\" data-ctext=\""+c[2].replace(/"/g,"&quot;")+"\">"+c[0]+"</button>").join("");
      wrap.querySelectorAll(".chip-btn").forEach(btn => {
        btn.onclick = () => {
          mode = btn.getAttribute("data-cmode");
          document.querySelectorAll("#input-mode [data-mode]").forEach(b => {
            b.classList.toggle("primary", b.getAttribute("data-mode") === mode);
          });
          freeInp.value = btn.getAttribute("data-ctext");
          freeInp.placeholder = mode === "action" ? "想做的行為…" : "想說的話…";
          freeInp.focus();
        };
      });
    })();
    const leaveBtn = document.getElementById("btn-talk-leave");
    if (leaveBtn) leaveBtn.onclick = () => closeModal();
    document.getElementById("btn-send-free").onclick = async () => {
      const box = document.getElementById("npc-line");
      const st = document.getElementById("ai-status");
      const inp = document.getElementById("free-input");
      const text = (inp.value || "").trim();
      if (!text) return toast("請輸入", true);
      st.textContent = "回應中…"; box.classList.add("loading");
      const btn = document.getElementById("btn-send-free"); if (btn) btn.disabled = true;
      const targetId = isImprisoned() ? S.prison.by : npcId;
      const pack = await handleFreeInput(targetId, mode, text);
      if (btn) btn.disabled = false; box.classList.remove("loading");
      if (!pack) return;
      box.textContent = pack.result.say + (pack.note ? "\n" + pack.note : "");
      st.textContent = "行為：" + pack.result.behavior + (pack.result.intent ? " · " + pack.result.intent : "") + (pack.result.offerId ? " · offer:" + pack.result.offerId : "");
      const mhEl = document.getElementById("mem-hint");
      if (mhEl) mhEl.textContent = "💬 " + memoryHint(targetId) + (bondSummary(targetId) ? " · " + bondSummary(targetId) : "");
      inp.value = "";
      if (pack.result.behavior === "accept" || pack.result.behavior === "teach") {
        /* bonds updated; chips refresh on re-open talk */
      }
      const scroll = document.querySelector(".talk-scroll");
      if (scroll) scroll.scrollTop = scroll.scrollHeight;
      if (pack.result.behavior === "attack" || pack.result.behavior === "duel") {
        closeModal();
        const escapeFight = pack.result.resolution && pack.result.resolution.escapeFight;
        startCombat(
          targetId === "heifeng" ? "elite_bandit" :
          targetId === "honglianzhu" ? "cult_zealot" :
          targetId === "masteryun" ? "temple_guard" :
          targetId === "yechen" ? "tomb_shade" : "bandit",
          escapeFight ? () => { releasePrison(); showStory("你擊退看守，逃出生天。仇家不會善罷甘休。"); } : null,
          escapeFight ? () => { S.hp = Math.max(1, Math.floor(S.hp * 0.4)); if (S.prison) S.prison.guardAlert = (S.prison.guardAlert||0)+2; showStory("突圍失敗，被重新押回。"); } : null
        );
        return;
      }
      if (pack.result.behavior === "release" || pack.result.behavior === "parole") {
        setTimeout(() => { closeModal(); render(); }, 500);
      }
      const mh = ensureNpcMem(targetId);
      const sub = document.getElementById("talk-meta") || document.querySelector("#modal-body .small");
      if (sub) sub.textContent = "命運：" + fateLabel(S.fates[targetId]) + " · " + mh.rel + " · " + mh.mood + (bondSummary(targetId) ? " · 羈絆：" + bondSummary(targetId) : "") + (mh.wounded ? " · 帶傷" : "");
      setTimeout(() => { try { inp.focus(); } catch (e) {} }, 30);
    };
    document.getElementById("npc-gift").onclick = () => npcGift(npcId);
    (function(){
      const db = document.getElementById("btn-enter-dating");
      if (db && typeof isDating === "function" && isDating(npcId)) {
        db.style.display = "";
        db.onclick = () => openDatingChat(npcId);
      }
    })();
    document.getElementById("btn-mem-debug").onclick = () => {
      const m = ensureNpcMem(npcId);
      const lines = ["信任 " + m.trust + "／" + m.rel + "／" + m.mood];
      if (m.summary.length) lines.push("摘要：\n- " + m.summary.slice(-5).join("\n- "));
      m.log.slice(-5).forEach(e => lines.push("D" + e.day + " [" + e.mode + "] " + trunc(e.player, 36) + " → " + trunc(e.reply, 40)));
      openModal(`<h3>${escapeHtml(npc.name)} · 記憶</h3><div class="story-box">${escapeHtml(lines.join("\n"))}</div>
        <div class="composer-primary" style="margin-top:10px"><button class="btn primary" id="back-talk">返回對話</button></div>`);
      document.getElementById("back-talk").onclick = () => talkNpc(npcId);
    };
    setTimeout(() => { try { freeInp && freeInp.focus(); } catch (e) {} }, 80);
  }

  function npcGift(npcId) {
    const options = [];
    if (npcId === "suning" && hasItem("herb_letter")) options.push({ id: "herb_letter", label: "交還密信→盟友" });
    if (npcId === "heifeng" && hasItem("herb_letter")) options.push({ id: "herb_letter_betray", label: "密信賣給黑風→蘇晚晴變敵" });
    if (npcId === "heifeng" && hasItem("blood_token")) options.push({ id: "blood_token", label: "處理血契令" });
    if (npcId === "guqinghan" && hasItem("jade_pendant")) options.push({ id: "jade_pendant", label: "歸還青玉佩" });
    if (npcId === "shenguhong" && hasItem("antidote")) options.push({ id: "antidote", label: "解蝕散→成名" });
    if (npcId === "guqinghan" && S.fates.guqinghan === "ally" && S.renown >= 25)
      options.push({ id: "marry", label: "表明心意→定情" });
    if (npcId === "masteryun" && S.renown >= 40 && S.fates.masteryun === "ally")
      options.push({ id: "retire_master", label: "勸退居後山" });
    if (npcId === "honglianzhu" && hasItem("lotus_invite"))
      options.push({ id: "join_hint", label: "出示紅蓮帖" });
    if (!options.length) return toast("沒有可用關鍵道具", true);
    let html = "<h3>關鍵道具／抉擇</h3><div class='btn-row'>";
    options.forEach(o => { html += `<button class="btn" data-g="${o.id}">${o.label}</button>`; });
    html += `<button class="btn ghost" onclick="closeModal()">取消</button></div>`;
    openModal(html);
    document.querySelectorAll("[data-g]").forEach(btn => {
      btn.onclick = () => {
        const id = btn.getAttribute("data-g"); closeModal();
        if (id === "herb_letter") {
          removeItem("herb_letter", 1); setFate("suning", "ally"); S.quests.side_herb.done = true;
          addItem("antidote", 1); showStory("密信歸還，獲解蝕散。");
        } else if (id === "herb_letter_betray") {
          removeItem("herb_letter", 1); setFate("suning", "enemy"); setFate("heifeng", "ally");
          S.quests.side_herb.done = true; S.gold += 80;
          if (typeof adjustKarma === "function") adjustKarma(-6, "出賣密信");
          showStory("密信賣出。蘇晚晴反目。");
        } else if (id === "blood_token") sideTokenChoice();
        else if (id === "jade_pendant") {
          removeItem("jade_pendant", 1); setFate("guqinghan", "ally"); addItem("frost_blade", 1); showStory("玉佩歸還。");
        } else if (id === "antidote") {
          removeItem("antidote", 1); setFate("shenguhong", "hero"); S.renown += 8; setFlag("north_pass"); showStory("毒解，成名。");
        } else if (id === "marry") { setFate("guqinghan", "married"); showStory("風雪夜定情。"); }
        else if (id === "retire_master") { setFate("masteryun", "retired"); showStory("雲空退居後山。"); }
        else if (id === "join_hint") { setFlag("honglian_invite"); showStory("聖女瞄一眼帖：「進壇吧。」"); }
      };
    });
  }
  function dismissStoryModal() {
    try { S.sceneOverride = null; } catch (e) {}
    closeModal();
    try { render(); } catch (e) { try { window._jhRender && window._jhRender(); } catch (e2) {} }
  }
  function showStory(text, sceneKey) {
    if (sceneKey && ASSETS[sceneKey]) S.sceneOverride = sceneKey;
    const banner = (sceneKey && asset(sceneKey))
      ? `<div style="margin:0 0 10px;border-radius:8px;overflow:hidden;border:1px solid #3a2a1a"><img src="${asset(sceneKey)}" alt="" style="width:100%;max-height:180px;object-fit:cover;display:block" /></div>`
      : "";
    openModal(`<h3>江湖記事</h3>${banner}<div class="story-box">${escapeHtml(text)}</div>
      <button type="button" class="btn primary" id="btn-story-ok">知道了</button>`);
    const ok = document.getElementById("btn-story-ok");
    if (ok) ok.onclick = function(){ dismissStoryModal(); };
    render();
  }

  // ---------- INVENTORY ----------
  function equipItem(id) {
    const it = ITEMS[id];
    if (!it || !hasItem(id)) return;
    if (it.type === "weapon" || it.type === "armor" || it.type === "accessory") {
      S.equip[it.type === "accessory" ? "accessory" : it.type] = id;
      toast("已裝備 " + it.name, true);
    } else toast("無法裝備", true);
    clamp(); render();
  }
  function unequip(slot) { S.equip[slot] = null; toast("已卸下", true); render(); }
  function useConsumable(id) {
    const it = ITEMS[id];
    if (!it || it.type !== "consumable" || !hasItem(id)) return;
    removeItem(id, 1);
    const st = effectiveStats();
    const medBonus = Math.floor((st.medicine || 0) * 2.5);
    if (it.heal) S.hp = Math.min(st.hpMax, S.hp + it.heal + medBonus);
    if (it.neili) S.neili = Math.min(st.neiliMax, S.neili + it.neili + Math.floor(medBonus / 2));
    if (it.cleanse) {
      // medicine improves cleanse/antitoxin success
      if ((st.medicine || 0) + (st.antitoxin || 0) >= 6 || Math.random() < 0.7 + (st.medicine || 0) * 0.04) {
        S.statuses = [];
      }
    }
    if (it.antitoxin) S.antitoxin += 1;
    if (!S.tempBuffs) S.tempBuffs = { focus: 0, perception: 0, charm: 0 };
    if (it.tempFocus) S.tempBuffs.focus = (S.tempBuffs.focus || 0) + it.tempFocus;
    if (it.tempPerception) S.tempBuffs.perception = (S.tempBuffs.perception || 0) + it.tempPerception;
    toast("使用 " + it.name + (medBonus && it.heal ? "（醫術加成 +" + medBonus + "）" : ""), true); render();
  }

  // ---------- RENDER ----------
  function render() {
    window._jhRender = render;
    const app = document.getElementById("app");
    if (!S.name) { app.innerHTML = renderTitle(); bindTitle(); return; }
    if (ui.combat) { app.innerHTML = renderCombat(); bindCombat(); return; }
    app.innerHTML = renderHub();
    bindHub();
  }
  function renderTitle() {
    const hasSave = !!(localStorage.getItem(SAVE_KEY) || localStorage.getItem(SAVE_KEY_OLD) || localStorage.getItem(SAVE_KEY_OLDER) || (typeof SAVE_KEY_OLDEST!=="undefined" && localStorage.getItem(SAVE_KEY_OLDEST)) || (typeof SAVE_KEY_V1!=="undefined" && localStorage.getItem(SAVE_KEY_V1)) || (typeof SAVE_KEY_V1B!=="undefined" && localStorage.getItem(SAVE_KEY_V1B)));
    const bg = asset("worldmap") || asset("pavilion");
    return `<div class="screen active" style="padding:0">
      <div class="title-screen">
        <div class="title-bg" style="background-image:url('${bg}')"></div>
        <div class="title-content">
          <div class="title-hero">
            <h1>江湖行</h1>
            <div class="pixel-sub">PIXEL · Q版武俠沙盤</div>
            <p>選擇改寫命運 · 自由說話／行動<br/>DeepSeek 可選 · Safari／Chrome 可玩</p>
          </div>
          <div class="title-panel"><div class="btn-row">
            <button class="btn primary" id="btn-new">新的旅程</button>
            <button class="btn" id="btn-continue" ${hasSave ? "" : "disabled"}>繼續旅程</button>
            <button class="btn ghost" id="btn-settings-title">設定（DeepSeek）</button>
          </div>
          <p class="small" style="margin-top:12px">等距像素＋Q版立繪視覺；玩法致敬群俠傳，人物門派皆原創。</p></div>
        </div>
      </div></div>`;
  }
  function bindTitle() {
    document.getElementById("btn-new").onclick = () => showCreate();
    document.getElementById("btn-continue").onclick = () => { if (loadGame()) render(); };
    document.getElementById("btn-settings-title").onclick = () => showSettings();
  }
  function showCreate() {
    document.getElementById("app").innerHTML = `
      <div class="screen active"><div class="header"><h2>創立角色</h2></div>
      <div class="panel"><label class="small">俠客之名</label>
      <input class="input" id="hero-name" maxlength="8" placeholder="例如：青羽" />
      <p class="small" style="margin:12px 0 8px">性別（影響皇宮線）</p>
      <div class="seg" id="gender-seg">
        <button type="button" class="btn primary" data-g="male">男</button>
        <button type="button" class="btn" data-g="female">女</button>
      </div>
      <p class="small" style="margin:12px 0 8px">起始特質</p>
      <div class="select-grid" id="traits"></div></div>
      <div class="btn-row"><button class="btn primary" id="btn-start">踏入江湖</button>
      <button class="btn ghost" id="btn-back">返回</button></div></div>`;
    let selected = TRAITS[0].id;
    let gender = "male";
    document.getElementById("gender-seg").querySelectorAll("[data-g]").forEach(b => {
      b.onclick = () => {
        gender = b.getAttribute("data-g");
        document.getElementById("gender-seg").querySelectorAll("[data-g]").forEach(x => x.classList.toggle("primary", x === b));
      };
    });
    const tg = document.getElementById("traits");
    TRAITS.forEach(t => {
      const b = document.createElement("button");
      b.className = "btn" + (t.id === selected ? " primary" : "");
      b.innerHTML = t.name + `<span class="sub">${t.desc}</span>`;
      b.onclick = () => { selected = t.id; tg.querySelectorAll(".btn").forEach(x => x.classList.remove("primary")); b.classList.add("primary"); };
      tg.appendChild(b);
    });
    document.getElementById("btn-back").onclick = () => { S = defaultState(); render(); };
    document.getElementById("btn-start").onclick = () => {
      const name = (document.getElementById("hero-name").value || "").trim() || "無名俠客";
      S = defaultState(); S.name = name; S.trait = selected;
      S.gender = (gender === "female") ? "女" : "男";
      S.disguise = (S.gender === "女") ? "nan" : null;
      const tr = TRAITS.find(t => t.id === selected);
      Object.keys(tr.mods).forEach(k => { S[k] = (S[k] || 0) + tr.mods[k]; });
      if (tr.items) tr.items.forEach(i => addItem(i, 1));
      ensureQuests(); ensureAllNpcMem(); ensureBonds(); saveGame();
      const gnote = S.gender === "女" ? "女（預設女扮男裝示人，可於角色頁切換）" : "男";
      showStory("你離開故鄉，落腳山間營地。第一章「霧起青城」開始。\n性別：" + gnote + "（影響皇宮線）。\n提示：地圖自由輸入可對在場人物說話；善惡值會觸發專屬劇情。");
    };
  }

  function renderHub() {
    const st = effectiveStats();
    const statusHtml = (S.statuses || []).length
      ? `<div class="status-tags">${S.statuses.map(s => `<span>${s.id === "neishang" ? "內傷" : "定身"} ${s.turns}</span>`).join("")}</div>` : "";
    const prisonHtml = prisonBannerHtml();
    return `<div class="screen active" style="padding-bottom:0">
      <div class="header header-with-avatar">${heroAvatarHtml("sm")}
        <div class="header-text"><h2>${escapeHtml(S.name)} · Lv${S.level}</h2>
        <span class="chip">${S.faction ? FACTIONS[S.faction].name : "散人"} · D${S.day}${isImprisoned() ? " · ⛓關押" : ""}${hasItem("hanxue_horse") ? " · 🐎汗血" : ""}${S.disguise==="nan"?" · 男裝":""}${flag("donggong_slave") ? (flag("donggong_truth_known") ? " · 廠奴・玄梧" : " · 廠奴・督公") : ""}${S.palaceRole || (S.courtTrack && S.courtTrack!=="none") ? " · 帝心"+(S.emperorFavor||0)+" · 威望"+(S.courtPrestige||0) : ""}</span>
        ${S.companion && NPCS[S.companion] ? `<button type="button" class="chip companion-chip" id="btn-dismiss-companion-chip" title="點擊解散同行">同行：${escapeHtml(NPCS[S.companion].name)} ×</button>` : ""}${(typeof listDatingPartners==="function" && listDatingPartners().length) ? `<button type="button" class="chip heart-chip" id="btn-dating-open">♥ 戀人×${listDatingPartners().length}</button>` : ""}</div></div>
      <div class="stats-bar">
        <span>氣血<b>${S.hp}/${st.hpMax}</b></span>
        <span>內力<b>${S.neili}/${st.neiliMax}</b></span>
        <span>金錢<b>${S.gold}</b></span>
        <span>武力<b>${st.force}</b></span>
        <span>身法<b>${st.agi}</b></span>
        <span>聲望<b>${S.renown}</b></span>
      </div>
      ${prisonHtml}
      ${statusHtml}
      <div class="panel" id="main-panel">${renderTab()}</div>
      <div class="nav">
        <button class="btn ${ui.tab==="map"?"active":""}" data-tab="map"><span class="ico">🗺</span>地圖</button>
        <button class="btn ${ui.tab==="bag"?"active":""}" data-tab="bag"><span class="ico">🎒</span>背包</button>
        <button class="btn ${ui.tab==="hero"?"active":""}" data-tab="hero"><span class="ico">⚔</span>角色</button>
        <button class="btn ${ui.tab==="story"?"active":""}" data-tab="story"><span class="ico">📜</span>情緣</button>
        <button class="btn ${ui.tab==="more"?"active":""}" data-tab="more"><span class="ico">⚙</span>更多</button>
      </div></div>`;
  }
  function renderTab() {
    if (ui.tab === "map") return renderMap();
    if (ui.tab === "bag") return renderBag();
    if (ui.tab === "hero") return renderHero();
    if (ui.tab === "story") return renderStory();
    return renderMore();
  }

  function mapPinLocIds() {
    return Object.keys(MAP_PINS || {});
  }
  function activeQuestLocIds() {
    const ids = new Set();
    ensureQuests();
    const m = S.quests.main;
    if (m && !m.done) {
      if (m.step === 0) { ids.add("qingcheng"); ids.add("jingji"); }
      if (m.step === 1) ids.add("jianzhong");
      if (m.step === 2) { ids.add("cangyun"); ids.add("heishui"); }
      if (m.step === 3) ids.add("mishi");
    }
    const m2 = S.quests.main2;
    if (m2 && !m2.done && S.quests.main && S.quests.main.done) {
      if (m2.step === 0) { ids.add("jingji"); ids.add("honglian"); ids.add("tiantai"); ids.add("yewang"); }
      if (m2.step === 1) { ids.add("chixia"); ids.add("xueyuan"); }
      if (m2.step === 2) { ids.add("honglian"); ids.add("tiantai"); }
      if (m2.step === 3) ids.add("wuyin");
    }
    const m3 = S.quests.main3;
    if (m3 && !m3.done && S.quests.main2 && S.quests.main2.done) {
      if (m3.step === 0) { ids.add("jingji"); ids.add("qingcheng"); }
      if (m3.step === 1) { ids.add("bianguan"); ids.add("honglian"); ids.add("yewang"); }
      if (m3.step === 2) { ids.add("cangyun"); ids.add("tiantai"); ids.add("heishui"); ids.add("honglian"); ids.add("shuiyun"); ids.add("meihua"); ids.add("jingji"); }
      if (m3.step >= 3) { ids.add("wuyin"); ids.add("yewang"); }
    }
    // active sides with known homes
    const sideHomes = {
      side_herb: ["yaogu", "cangyun", "heishui"],
      side_qin: ["meihua"],
      side_forge: ["longmen"],
      side_sea: ["yanhui"],
      side_dao: ["tiantai"],
      side_tomb: ["yewang"],
      side_lake: ["shuiyun"],
      side_trade: ["gulan"],
      side_bamboo: ["qingzhu"],
      side_child: ["qingcheng"],
      side_cook: ["jingji", "yaogu"],
      side_snow: ["xueyuan"],
      side_lei: ["leifeng"],
      side_chixia: ["chixia"],
      side_qinmo: ["wuyin"],
      side_sand: ["shamo"],
      side_karma_good: ["yaogu", "cangyun"],
      side_karma_evil: ["jingji"],
      side_palace_revenge: ["huanggong", "renyazi_alley"],
      side_eunuch_revenge: ["huanggong", "dongchang"],
      side_donggong_shadow: ["dongchang", "huanggong"],
      side_hanxue: ["taipusi", "shamo", "bianguan"]
    };
    Object.keys(sideHomes).forEach(function(qid) {
      const q = S.quests[qid];
      if (q && !q.done && q.step > 0) {
        sideHomes[qid].forEach(function(id){ ids.add(id); });
      }
    });
    if (S.loverDateQuest && S.loverDateQuest.loc) ids.add(S.loverDateQuest.loc);
    return ids;
  }
  function tryAdvanceQuestOnArrive(locId) {
    ensureQuests();
    let advanced = false;
    if (S.quests.main && S.quests.main.done && S.quests.main2 && S.quests.main2.step === 0 && locId === "jingji") {
      S.quests.main2.step = 1; setFlag("ch2_started"); setFlag("honglian_invite");
      showStory("京畿客棧傳聞四起：盟約殘印重現江湖……\n第二章「盟約殘印」開始。可往紅蓮／天台／夜王墓探聽。");
      advanced = true;
    }
    if (S.quests.main2 && S.quests.main2.done && S.quests.main3 && S.quests.main3.step === 0 && (locId === "jingji" || locId === "qingcheng")) {
      S.quests.main3.step = 1; setFlag("ch3_started"); setFlag("ch3_rumor");
      showStory("茶樓低語：夜王殘印餘波未盡，三方爭鋒。\n第三章「天命分途」開始。請收集三證據：邊關毒線、紅蓮內訌、古墓禁制。");
      advanced = true;
    }
    if (!advanced && activeQuestLocIds().has(locId)) {
      const tip = (typeof storyText === "function" ? storyText() : "").slice(0, 48);
      toast("⚔ " + (tip || "此地有進行中的江湖事機"), true);
    }
    return advanced;
  }
  function travelToLocation(id) {
    if (!id || id === S.loc) return;
    const loc = LOCATIONS.find(function(l){ return l.id === id; });
    if (!loc || !locUnlocked(loc)) { toast("尚未解鎖此地", true); return; }
    if (isImprisoned()) {
      toast("關押中無法遠行。可對看守嘗試逃走／求饒。", true);
      if (S.prison && S.prison.by) talkNpc(S.prison.by);
      return;
    }
    S.loc = id;
    let companionPartMsg = null;
    try { companionPartMsg = maybeCompanionPartOnTravel(id); } catch (e) { companionPartMsg = null; }
    if (hasItem("hanxue_horse")) {
      S.neili = Math.min(effectiveStats().neiliMax, S.neili + 8);
      toast("汗血一騎・抵達 " + loc.name, true);
    } else {
      S.neili = Math.min(effectiveStats().neiliMax, S.neili + 2);
      toast("抵達 " + loc.name, true);
    }
    try { if (typeof tryCompleteLoverDate === "function") tryCompleteLoverDate(id); } catch (e) {}
    let questStory = false;
    try { questStory = tryAdvanceQuestOnArrive(id); } catch (e) {}
    render();
    if (companionPartMsg) {
      setTimeout(function(){ try { showStory(companionPartMsg); } catch (e) {} }, 220);
    }
    setTimeout(function() {
      try { if (!questStory) maybeTravelEvent(); } catch (e) {}
      try { checkKarmaPlots({ travel: true }); } catch (e) {}
      try {
        if (/huanggong|neiting|hougong|wumen|yangxin|yuhuayuan|qianqing/.test(id)) maybePalaceIncident();
      } catch (e) {}
      try { maybeLoverInitiative("travel"); } catch (e) {}
    }, 120);
  }

  function renderMap() {
    const here = LOCATIONS.find(l => l.id === S.loc);
    const regions = {};
    LOCATIONS.forEach(l => { const r = l.region || "其他"; (regions[r] = regions[r] || []).push(l); });
    const sceneUrl = sceneUrlForLoc(S.loc);
    const present = npcAtLocation(S.loc);
    const questLocs = (typeof activeQuestLocIds === "function") ? activeQuestLocIds() : new Set();
    let npcBlock = "";
    if (present.length) {
      npcBlock = `<h3>在場人物</h3>`;
      present.forEach(id => {
        const n = NPCS[id];
        const f = S.fates[id];
        npcBlock += `<div class="npc-row" data-talk="${id}">
          ${chibiHtml(id, "md")}
          <div class="npc-meta"><strong>${escapeHtml(n.name)}</strong>
            <div class="small">${escapeHtml(n.title)} · ${fateLabel(f)} · 💬${escapeHtml(memoryHint(id))}</div>
          </div></div>`;
      });
    }
    const heroAv = (typeof heroAvatarHtml === "function") ? heroAvatarHtml("sm") : "";
    let html = `<div class="map-hero"><img class="map-img" src="${asset("worldmap")}" alt="江湖地圖" />
        <div class="map-caption">繪本地圖 · 點下方地點前往${S.disguise==="nan"?" · 男裝示人":""}</div>
        ${heroAv ? `<div class="map-hero-av">${heroAv}</div>` : ""}</div>
      <div class="scene-banner" style="background-image:url('${sceneUrl}')">
        <div class="scene-title">${here ? escapeHtml(here.name) : S.loc}
          <span class="scene-sub">${here ? escapeHtml(here.region + " · " + here.desc) : ""}</span>
        </div>
      </div>
      <div class="story-box">${escapeHtml(storyText())}</div>
      ${S.companion && NPCS[S.companion] ? `<div class="companion-banner">同行：${escapeHtml(NPCS[S.companion].name)} · 戰鬥可助攻／開場減傷 <button type="button" class="btn" id="btn-dismiss-companion" style="display:inline-block;min-height:28px;padding:2px 10px;margin-left:8px">解散同行</button></div>` : ""}
      ${(typeof listDatingPartners==="function" && listDatingPartners().length) ? `<div class="dating-banner">♥ 拍拖中：${listDatingPartners().map(id=>escapeHtml(typeof datingDisplayName==="function"?datingDisplayName(id):(NPCS[id]?NPCS[id].name:id))).join("、")} <button type="button" class="btn heart-chip" id="btn-dating-open-map" style="display:inline-block;min-height:28px;padding:2px 10px;margin-left:6px">密語</button></div>` : ""}
      ${npcBlock}
      <div class="free-box world-composer">
        <div class="seg tabs" id="world-mode">
          <button type="button" class="btn primary" data-wmode="say">說話</button>
          <button type="button" class="btn" data-wmode="action">行動</button>
        </div>
        <textarea class="input area composer-input" id="world-free-input" rows="2" enterkeyhint="send" placeholder="對此地／在場的人自由輸入…"></textarea>
        <div class="composer-primary">
          <button type="button" class="btn primary" id="btn-world-free">送出</button>
        </div>
      </div>
      <h3>此地行動</h3><div class="btn-row" id="loc-acts"></div>`;
    Object.keys(regions).forEach(region => {
      html += `<h3 style="margin-top:12px">${region}</h3><div class="map-grid">`;
      regions[region].forEach(l => {
        const unlocked = locUnlocked(l);
        const thumb = thumbUrlForLoc(l.id);
        const grad = gradientPlaceholder(l.id);
        const bg = grad
          ? `background-image:${grad},url('${thumb}')`
          : `background-image:url('${thumb}')`;
        const q = questLocs.has(l.id) ? " ❗" : "";
        const npcN = unlocked ? npcAtLocation(l.id).length : 0;
        const npcMeta = npcN ? ` · 人物${npcN}` : "";
        html += `<button class="btn map-card ${l.id===S.loc?"here":""} ${unlocked?"":"locked"}" data-go="${l.id}" ${unlocked?"":"disabled"} style="${bg}">
          <div class="map-card-body">${l.name}${q}${l.id===S.loc?" · 此處":""}
          <span class="loc-card-meta">${unlocked ? (l.shop ? "可購物 · " : "") + (l.hub ? "營地" : "可前往") + npcMeta : "未解鎖"}</span></div>
        </button>`;
      });
      html += "</div>";
    });
    return html;
  }
  function renderBag() {
    const st = effectiveStats();
    const filter = S.bagFilter || "all";
    let html = `<h3>裝備</h3>
      <div class="equip-slot">武器：<strong>${S.equip.weapon ? ITEMS[S.equip.weapon].name : "無"}</strong>
        ${S.equip.weapon ? `<button class="btn" style="min-height:34px;display:inline-block;margin-left:6px;padding:5px 10px" data-unequip="weapon">卸</button>` : ""}</div>
      <div class="equip-slot">防具：<strong>${S.equip.armor ? ITEMS[S.equip.armor].name : "無"}</strong>
        ${S.equip.armor ? `<button class="btn" style="min-height:34px;display:inline-block;margin-left:6px;padding:5px 10px" data-unequip="armor">卸</button>` : ""}</div>
      <div class="equip-slot">飾品：<strong>${S.equip.accessory ? ITEMS[S.equip.accessory].name : "無"}</strong>
        ${S.equip.accessory ? `<button class="btn" style="min-height:34px;display:inline-block;margin-left:6px;padding:5px 10px" data-unequip="accessory">卸</button>` : ""}
        <div class="small">有效武力 ${st.force}／防禦 ${st.def}／身法 ${st.agi}</div>
        ${hasItem("hanxue_horse") ? `<div class="small" style="color:var(--gold2)">🐎 汗血寶馬：天下關隘皆可一騎而至</div>` : ""}</div>
      <h3>物品</h3>
      <div class="filter-row" id="bag-filters">
        ${[["all","全部"],["weapon","武器"],["armor","防具"],["accessory","飾品"],["consumable","道具"],["mount","坐騎"],["key","劇情"]].map(([k,lab]) =>
          `<button class="btn ${filter===k?"primary":""}" data-filter="${k}">${lab}</button>`).join("")}
      </div>`;
    const keys = Object.keys(S.inv);
    if (!keys.length) html += "<p class='small'>背包空空</p>";
    keys.forEach(id => {
      const it = ITEMS[id]; if (!it) return;
      if (filter !== "all" && it.type !== filter) return;
      const eq = S.equip.weapon === id || S.equip.armor === id || S.equip.accessory === id;
      html += `<div class="list-item"><div>
        <span class="badge ${it.type} ${it.rarity||"common"}${eq?" equipped":""}">${it.rarity||""} ${it.type}</span>
        <strong> ${it.name}</strong> ×${S.inv[id]}
        <div class="small">${it.desc}</div></div><div>`;
      if (it.type === "consumable") html += `<button class="btn safe" style="min-height:40px;padding:8px 10px" data-use="${id}">用</button>`;
      if (it.type === "weapon" || it.type === "armor" || it.type === "accessory")
        html += `<button class="btn primary" style="min-height:40px;padding:8px 10px" data-equip="${id}">${eq?"已裝":"裝"}</button>`;
      html += `</div></div>`;
    });
    return html;
  }
  function renderHero() {
    const st = effectiveStats();
    let html = `<div class="hero-portrait-row">${heroAvatarHtml("lg")}
      <div style="flex:1">
        <strong>${escapeHtml(S.name)}</strong>
        <div class="small">性別 ${genderLabel()}${S.disguise==="nan"?" · 目前以男裝示人":(isFemale()?" · 目前以女裝示人":"")}</div>
        ${isFemale() ? `<div class="btn-row" style="margin-top:8px">
          <button type="button" class="btn ${S.disguise==="nan"?"primary":""}" id="btn-disguise-nan">以男裝示人</button>
          <button type="button" class="btn ${S.disguise!=="nan"?"primary":""}" id="btn-disguise-nv">以女裝示人</button>
        </div>` : ""}
      </div>
    </div>
    <h3>屬性</h3><div class="attr-grid">
      <div class="cell">武力<b>${st.force}</b></div><div class="cell">身法<b>${st.agi}</b></div>
      <div class="cell">防禦<b>${st.def}</b></div><div class="cell">根骨<b>${st.bone}</b></div>
      <div class="cell">悟性<b>${st.wit}</b></div><div class="cell">福緣<b>${st.luck}</b></div>
      <div class="cell">俠義<b>${st.honor}</b></div><div class="cell">抗毒<b>${st.antitoxin}</b></div>
      <div class="cell">魅力<b>${st.charm}</b></div><div class="cell">定力<b>${st.focus}</b></div>
      <div class="cell">醫術<b>${st.medicine}</b></div><div class="cell">眼力<b>${st.perception}</b></div>
      <div class="cell ${karmaColorClass()}" style="grid-column:span 2">善惡<b>${typeof S.karma==="number"?S.karma:0}</b> <span class="small">${karmaBandLabel()}</span></div>
    </div>
    <p class="small">${escapeHtml(karmaNextHint())}</p>
    <p class="small">經驗 ${S.exp}/${S.level * 22} · 性別 ${S.gender==="female"||S.gender==="女"?"女":"男"} · 宮職 ${palaceRoleLabel()} · 朝廷威望 ${typeof S.courtPrestige==="number"?S.courtPrestige:0} · 帝心 ${typeof S.emperorFavor==="number"?S.emperorFavor:0} · 宮熱 ${typeof S.palaceHeat==="number"?S.palaceHeat:0}${hasItem("hanxue_horse")?" · 汗血寶馬":""} · 福緣影響機緣${S.forgeBonus?` · 淬煉+${S.forgeBonus}`:""}${flag("eunuch")?" · 太監籍":""}</p>
    <h3>羈絆解鎖</h3>`;
    const ul = listUnlocks();
    if (!ul.length) html += `<p class="small">尚未解鎖專屬功能</p>`;
    else ul.forEach(u => { html += `<div class="list-item"><div><strong>${UNLOCK_LABELS[u]||u}</strong></div></div>`; });
    html += `<h3>已學武功</h3>`;
    S.skills.forEach(sid => {
      const sk = SKILLS[sid];
      html += `<div class="list-item"><div><strong>${sk.name}</strong><div class="small">${sk.desc} · 內力${sk.neiliCost} · 威力${sk.power||0}${sk.heal?" · 治"+sk.heal:""}</div></div></div>`;
    });
    html += `<h3 style="margin-top:10px">門派</h3>`;
    Object.values(FACTIONS).forEach(f => {
      html += `<div class="list-item"><div><strong>${f.name}</strong> ${S.faction===f.id?'<span class="badge">已加入</span>':''}
        <div class="small">${f.desc}</div>
        <div class="small">聲望 ${S.factionRep[f.id]||0} · ${f.skills.map(s=>SKILLS[s].name).join("、")}</div></div></div>`;
    });
    return html;
  }
  function renderStory() {
    ensureQuests();
    const mainHint = (qid, unlockCond) => {
      const q = S.quests[qid];
      if (!q) return "";
      if (q.done) return "已完成";
      if (!unlockCond) return "尚未開啟";
      return storyText();
    };
    let html = `<h3>主線</h3>
      <div class="quest-item"><div class="title">${S.quests.main.title} ${S.quests.main.done?"✓":""}</div>
        <div class="small">${S.quests.main.done ? "已完成" : storyText()}</div></div>
      <div class="quest-item"><div class="title">${S.quests.main2.title} ${S.quests.main2.done?"✓":""}</div>
        <div class="small">${S.quests.main2.done ? "已完成" : (S.quests.main.done ? storyText() : "完成第一章後開啟")}</div></div>
      <div class="quest-item"><div class="title">${S.quests.main3.title} ${S.quests.main3.done?"✓":""}</div>
        <div class="small">${S.quests.main3.done ? "已完成" : (S.quests.main2.done ? storyText() : "完成第二章後開啟")}</div></div>
      <div class="ending-preview">${escapeHtml(endingTendencyLine())}</div>
      <div class="btn-row" style="margin:8px 0">
        <button class="btn primary" id="btn-ending-view">檢視江湖結局</button>
        <button class="btn" id="btn-ending-preview">結局預兆</button>
      </div>
      <h3>支線</h3>`;
    Object.keys(S.quests).filter(k => k.startsWith("side_")).forEach(k => {
      const q = S.quests[k];
      html += `<div class="list-item"><div>${q.title}<div class="small">${questHint(q)}</div></div></div>`;
    });
    if (typeof listDatingPartners === "function" && listDatingPartners().length) {
      html += `<h3>♥ 拍拖／戀人</h3><div class="btn-row" style="margin-bottom:8px"><button class="btn heart-chip" id="btn-dating-story">進入密語</button></div>`;
      listDatingPartners().forEach(id => {
        const n = NPCS[id]; if (!n) return;
        const a = typeof datingAffOf === "function" ? datingAffOf(id) : 0;
        html += `<div class="list-item fate-row">${chibiHtml(id)}<div style="flex:1"><strong>${escapeHtml(typeof datingDisplayName==="function"?datingDisplayName(id):n.name)}</strong> <span class="badge heart-badge">戀人</span><div class="small">親密度 ${a} · ${fateLabel(S.fates[id])}</div></div></div>`;
      });
    }
    html += `<h3>羈絆／承諾</h3>`;
    ensureBonds();
    const bondIds = Object.keys(S.bonds || {}).filter(id => S.bonds[id] && (S.bonds[id].roles || []).length);
    if (!bondIds.length) html += `<p class="small">尚未締結師徒／結義等承諾。可對 NPC 說「拜師」「結義」等。</p>`;
    bondIds.forEach(id => {
      const n = NPCS[id]; if (!n) return;
      const b = S.bonds[id];
      const unlocks = (b.unlocked || []).map(u => UNLOCK_LABELS[u] || u).join("、");
      html += `<div class="list-item fate-row">${chibiHtml(id)}
        <div style="flex:1"><strong>${n.name}</strong> <span class="badge">${bondSummary(id)}</span>
        <div class="small">自第 ${b.sinceDay||"?"} 日 · 解鎖：${unlocks || "—"}</div></div></div>`;
    });
    html += `<h3>人物關係</h3><p class="small">點選人物查看已知關係網與主／支／隱藏線。</p><div class="rel-grid">`;
    const relMap = (typeof NPC_RELATIONS === "object" && NPC_RELATIONS) ? NPC_RELATIONS : {};
    const relIds = Object.keys(NPCS).filter(id => NPCS[id].major && (relMap[id] || NPCS[id].arcs));
    relIds.forEach(id => {
      const n = NPCS[id];
      const known = (typeof getKnownRelations === "function" ? getKnownRelations(id) : []).length;
      const lineTag = n.line === "court" ? "朝廷" : (n.line === "jianghu" ? "江湖" : "");
      html += `<button type="button" class="list-item fate-row rel-npc-btn" data-rel-open="${id}">${chibiHtml(id)}
        <div style="flex:1;text-align:left"><strong>${escapeHtml(n.name)}</strong> ${lineTag?`<span class="badge">${lineTag}</span>`:""}
        <div class="small">${escapeHtml(n.title||"")} · 已知關係 ${known}</div></div></button>`;
    });
    html += `</div>`;
    html += `<h3>人物命運</h3>`;
    Object.keys(NPCS).filter(id => NPCS[id].major).forEach(id => {
      const n = NPCS[id], f = S.fates[id];
      const dest = (n.destinies && (n.destinies[f] || n.destinies.default)) || fateLabel(f);
      let mem = "", bond = "";
      try { mem = memoryHint(id); } catch (e) { mem = "—"; }
      try { bond = bondSummary(id) || ""; } catch (e) { bond = ""; }
      html += `<div class="list-item fate-row">${chibiHtml(id)}
        <div style="flex:1"><strong>${escapeHtml(n.name)}</strong> <span class="badge">${fateLabel(f)}</span>
        <div class="small">${escapeHtml(n.title||"")} · ${escapeHtml(dest)} · 💬${escapeHtml(mem)}${bond?" · "+escapeHtml(bond):""}</div></div></div>`;
    });
    return html;
  }
  function renderMore() {
    return `<h3>系統</h3><div class="btn-row">
      <button class="btn primary" id="btn-save">手動存檔</button>
      <button class="btn" id="btn-load">讀取存檔</button>
      <button class="btn" id="btn-settings">DeepSeek 設定</button>
      <button class="btn danger" id="btn-reset">重置進度</button>
    </div>
    <div class="btn-row" style="margin-top:10px">
      <button class="btn primary" id="btn-ending-more">檢視江湖結局</button>
    </div>
    <p class="small" style="margin-top:12px">地點 ${LOCATIONS.length} · 人物 ${Object.keys(NPCS).length} · 物品 ${Object.keys(ITEMS).length} · 承諾解鎖 ${listUnlocks().length} · 存檔 v8</p>
    <p class="small">${escapeHtml(endingTendencyLine())}</p>
    <p class="small">API Key 只存本機。CORS／file:// 失敗則離線對白；NPC 記憶仍會寫入存檔。</p>`;
  }

  function bindHub() {
    document.querySelectorAll("[data-tab]").forEach(b => {
      b.onclick = () => {
        // clear stuck overlay if modal not actually shown (or leftover modal-open)
        try {
          const mb = document.getElementById("modal-bg");
          if (mb && !mb.classList.contains("show") && document.body.classList.contains("modal-open")) {
            unlockBodyForModal();
          }
        } catch (e) {}
        ui.tab = b.getAttribute("data-tab");
        try { render(); } catch (err) {
          console.error("render tab failed", ui.tab, err);
          toast("頁面暫未能開啟，已退回地圖", true);
          ui.tab = "map";
          try { render(); } catch (e2) {}
        }
      };
    });
    document.querySelectorAll("[data-go]").forEach(b => {
      b.onclick = () => {
        const id = b.getAttribute("data-go");
        travelToLocation(id);
      };
    });
    const mld = document.getElementById("map-list-details");
    if (mld) {
      mld.addEventListener("toggle", function(){ ui.mapListOpen = mld.open; });
    }
    document.querySelectorAll("[data-talk]").forEach(b => {
      b.onclick = () => talkNpc(b.getAttribute("data-talk"));
    });
    const acts = document.getElementById("loc-acts");
    if (acts) {
      locationActions(S.loc).forEach(a => {
        const btn = document.createElement("button");
        btn.className = "btn"; btn.textContent = a.label; btn.onclick = a.fn;
        acts.appendChild(btn);
      });
    }
    bindWorldFreeInput();
    document.querySelectorAll("[data-equip]").forEach(b => { b.onclick = () => equipItem(b.getAttribute("data-equip")); });
    document.querySelectorAll("[data-unequip]").forEach(b => { b.onclick = () => unequip(b.getAttribute("data-unequip")); });
    document.querySelectorAll("[data-use]").forEach(b => { b.onclick = () => useConsumable(b.getAttribute("data-use")); });
    document.querySelectorAll("[data-filter]").forEach(b => {
      b.onclick = () => { S.bagFilter = b.getAttribute("data-filter"); render(); };
    });
    const bDisN = document.getElementById("btn-disguise-nan");
    if (bDisN) bDisN.onclick = () => setDisguise("nan");
    const bDisV = document.getElementById("btn-disguise-nv");
    if (bDisV) bDisV.onclick = () => setDisguise(null);
    const bs = document.getElementById("btn-save"); if (bs) bs.onclick = saveGame;
    const bl = document.getElementById("btn-load"); if (bl) bl.onclick = () => { loadGame(); render(); };
    const br = document.getElementById("btn-reset"); if (br) br.onclick = resetGame;
    const bset = document.getElementById("btn-settings"); if (bset) bset.onclick = showSettings;
    document.querySelectorAll("[data-rel-open]").forEach(function(b){
      b.onclick = function(){ showNpcRelationCard(b.getAttribute("data-rel-open")); };
    });
    const be = document.getElementById("btn-ending-view");
    if (be) be.onclick = () => {
      if (!canViewEndingOfficial() && !S.endingId) {
        toast("完成第三章，或聲望／羈絆足夠後可正式檢視", true);
        showEndingModal(true);
        return;
      }
      if (!S.endingId) resolveEnding();
      showEndingModal(false);
    };
    const bep = document.getElementById("btn-ending-preview");
    if (bep) bep.onclick = () => showEndingModal(true);
    const bem = document.getElementById("btn-ending-more");
    if (bem) bem.onclick = () => {
      if (!canViewEndingOfficial() && !S.endingId) { showEndingModal(true); return; }
      if (!S.endingId) resolveEnding();
      showEndingModal(false);
    };
    const bdate = document.getElementById("btn-dating-open");
    if (bdate) bdate.onclick = () => openDatingHub();
    const bDisComp = document.getElementById("btn-dismiss-companion");
    if (bDisComp) bDisComp.onclick = () => dismissCompanion();
    const bDisChip = document.getElementById("btn-dismiss-companion-chip");
    if (bDisChip) bDisChip.onclick = () => dismissCompanion();
    const bdate2 = document.getElementById("btn-dating-open-map");
    if (bdate2) bdate2.onclick = () => openDatingHub();
    const bdate3 = document.getElementById("btn-dating-story");
    if (bdate3) bdate3.onclick = () => openDatingHub();
    setTimeout(() => { try { maybeLoverInitiative("idle"); } catch (e) {} }, 400);
  }

  function npcAtLocation(locId) {
    const list = Object.keys(NPCS).filter(id => {
      if (NPCS[id].loc !== locId) return false;
      const f = S.fates[id];
      if (isImprisoned() && S.prison.by === id) return true;
      return f !== "dead" && f !== "vanished" && f !== "redeemed" && f !== "retired" && f !== "hermit";
    });
    if (isImprisoned() && S.prison.place === locId && list.indexOf(S.prison.by) < 0) list.unshift(S.prison.by);
    return list;
  }
  function bindWorldFreeInput() {
    const modeWrap = document.getElementById("world-mode");
    const inp = document.getElementById("world-free-input");
    const btn = document.getElementById("btn-world-free");
    if (!btn || !inp) return;
    bindViewportKb();
    bindComposerFocus(inp);
    let wmode = "say";
    if (modeWrap) modeWrap.querySelectorAll("[data-wmode]").forEach(b => {
      b.onclick = () => {
        wmode = b.getAttribute("data-wmode");
        modeWrap.querySelectorAll("[data-wmode]").forEach(x => x.classList.remove("primary"));
        b.classList.add("primary");
        inp.placeholder = wmode === "action" ? "想在此地做的行為…" : "對此地／在場的人說…";
      };
    });
    btn.onclick = async () => {
      const text = (inp.value || "").trim();
      if (!text) return toast("請輸入", true);
      const present = npcAtLocation(S.loc);
      btn.disabled = true;
      if (present.length === 1) {
        const pack = await handleFreeInput(present[0], wmode, text);
        btn.disabled = false; if (!pack) return; inp.value = "";
        if (pack.result.behavior === "attack" || pack.result.behavior === "duel") {
          startCombat(present[0]==="masteryun"?"temple_guard":"bandit"); return;
        }
        showStory(NPCS[present[0]].name + "：\n" + pack.result.say + (pack.note ? "\n" + pack.note : "") + "\n\n💬 " + memoryHint(present[0]));
        if (pack.result.behavior === "release" || pack.result.behavior === "capture") render();
      } else if (present.length > 1) {
        btn.disabled = false;
        let html = "<h3>選擇對象</h3><div class='btn-row'>";
        present.forEach(id => { html += `<button class="btn" data-pick="${id}">${NPCS[id].name}<span class="sub">${memoryHint(id)}</span></button>`; });
        html += `<button class="btn ghost" onclick="closeModal()">取消</button></div>`;
        openModal(html);
        const pending = text, pendingMode = wmode;
        document.querySelectorAll("[data-pick]").forEach(b => {
          b.onclick = async () => {
            closeModal();
            const id = b.getAttribute("data-pick");
            const pack = await handleFreeInput(id, pendingMode, pending);
            if (!pack) return; inp.value = "";
            if (pack.result.behavior === "attack" || pack.result.behavior === "duel") {
              startCombat(id==="masteryun"?"temple_guard":"bandit"); return;
            }
            showStory(NPCS[id].name + "：\n" + pack.result.say + (pack.note ? "\n" + pack.note : ""));
            if (pack.result.behavior === "release" || pack.result.behavior === "capture") render();
          };
        });
      } else {
        let narr = settings.deepseekKey ? await aiNarrate("玩家在" + ((LOCATIONS.find(l=>l.id===S.loc)||{}).name) + " " + wmode + "：" + text) : null;
        btn.disabled = false; inp.value = "";
        if (!narr) {
          narr = "你在" + ((LOCATIONS.find(l=>l.id===S.loc)||{}).name||"此處") + (wmode==="say"?"說：「":"試着") + trunc(text,40) + (wmode==="say"?"」":"。") + "四下無熟識之人。";
          if (Math.random() < 0.22) { addItem("herb", 1); narr += "\n意外採得止血草。"; }
        }
        showStory(narr);
      }
    };
  }

  function renderCombat() {
    const c = ui.combat; const st = effectiveStats();
    const logHtml = c.log.map(x => typeof x === "string" ? "<p>"+x+"</p>" : `<p class="${x.cls||""}">${x.msg}</p>`).join("");
    const skillBtns = S.skills.map(sid => {
      const sk = SKILLS[sid];
      return `<button class="btn" data-sk="${sid}">${sk.name}<span class="sub">內力${sk.neiliCost}${sk.heal?" · 治療":" · 威力"+sk.power}</span></button>`;
    }).join("");
    const bondBtns = listBondCombatSkills().map(sk =>
      `<button class="btn" data-sk="${sk.id}" ${c.bondSkillUsed?"disabled":""}>${sk.name}<span class="sub">絆技 · 內力${sk.neiliCost}</span></button>`
    ).join("");
    const companionBtn = (S.companion && NPCS[S.companion])
      ? `<button class="btn safe" id="btn-companion-assist" ${c.companionAssistUsed?"disabled":""}>${escapeHtml(NPCS[S.companion].name)}助攻</button>`
      : "";
    const itemBtns = Object.keys(S.inv).filter(id => ITEMS[id] && ITEMS[id].type === "consumable")
      .map(id => `<button class="btn safe" data-ci="${id}">${ITEMS[id].name}×${S.inv[id]}</button>`).join("") || "<p class='small'>無消耗品</p>";
    const tags = (S.statuses||[]).map(s => s.id==="neishang"?"內傷":"定身").join("、");
    const bg = sceneUrlForLoc(S.loc);
    return `<div class="screen active"><div class="header"><h2>戰鬥</h2><span class="pixel-label">PIXEL BATTLE</span></div>
      <div class="combat-arena" style="background-image:url('${bg}')">
        <div class="combat-fighters">
          <div class="fighter-card">
            ${chibiHtml("player", "md")}
            <div class="fname">${escapeHtml(S.name)}</div>
            <div class="bar-wrap"><div class="bar-label"><span>氣血</span><span>${S.hp}/${st.hpMax}</span></div>
              <div class="bar hp-player"><i style="width:${Math.max(0,S.hp/st.hpMax*100)}%"></i></div></div>
            <div class="bar-wrap"><div class="bar-label"><span>內力</span><span>${S.neili}/${st.neiliMax}</span></div>
              <div class="bar neili"><i style="width:${Math.max(0,S.neili/st.neiliMax*100)}%"></i></div></div>
          </div>
          <div class="fighter-card enemy">
            ${chibiHtml("enemy", "md")}
            <div class="fname">${escapeHtml(c.enemy.name)}</div>
            <div class="bar-wrap"><div class="bar-label"><span>氣血</span><span>${Math.max(0,c.enemy.hp)}/${c.enemy.hpMax}</span></div>
              <div class="bar"><i style="width:${Math.max(0,c.enemy.hp/c.enemy.hpMax*100)}%"></i></div></div>
          </div>
        </div>
      </div>
      ${tags ? `<div class="status-tags"><span>${tags}</span></div>` : ""}
      <div class="combat-log">${logHtml}</div>
      <div class="panel" style="flex:0"><h3>武功</h3><div class="btn-row">${skillBtns}</div>
        ${bondBtns ? `<h3 style="margin-top:8px">絆技</h3><div class="btn-row">${bondBtns}</div>` : ""}
        <h3 style="margin-top:8px">物品</h3><div class="btn-row horizontal">${itemBtns}</div>
        <div class="btn-row" style="margin-top:8px">
          <button class="btn" data-sk="basic_strike">普攻</button>
          ${companionBtn}
          <button class="btn danger" id="btn-flee">逃跑</button>
        </div></div></div>`;
  }
  function bindCombat() {
    document.querySelectorAll("[data-sk]").forEach(b => { b.onclick = () => playerAttack(b.getAttribute("data-sk")); });
    document.querySelectorAll("[data-ci]").forEach(b => { b.onclick = () => useItemInCombat(b.getAttribute("data-ci")); });
    const f = document.getElementById("btn-flee"); if (f) f.onclick = tryFlee;
    const ca = document.getElementById("btn-companion-assist"); if (ca) ca.onclick = companionAssist;
  }
  function showSettings() {
    const cur = normalizeDeepseekModel(settings.model || "deepseek-v4-pro");
    openModal(`<h3>DeepSeek 設定</h3>
      <p class="small">金鑰只存本機。預設用更強的 <b>deepseek-v4-pro</b>（開思考模式）。Flash 較快較平。Search 係另一套搜尋 API，唔等於更強對話。</p>
      <label class="small">API Key</label>
      <input class="input" id="ds-key" type="password" placeholder="${settings.deepseekKey ? "（已儲存，貼上可更換）" : "sk-…"}" />
      <label class="small" style="margin-top:8px;display:block">Base URL</label>
      <input class="input" id="ds-url" value="${settings.deepseekUrl || "https://api.deepseek.com"}" />
      <label class="small" style="margin-top:8px;display:block">模型</label>
      <select class="input" id="ds-model">
        <option value="deepseek-v4-pro"${cur==="deepseek-v4-pro"?" selected":""}>deepseek-v4-pro（更強・思考）</option>
        <option value="deepseek-flash"${cur==="deepseek-flash"?" selected":""}>deepseek-flash（更快・較平）</option>
      </select>
      <div class="btn-row" style="margin-top:12px">
        <button class="btn primary" id="ds-save">儲存</button>
        <button class="btn" id="ds-clear">清除金鑰</button>
        <button class="btn ghost" onclick="closeModal()">關閉</button>
      </div>`);
    document.getElementById("ds-save").onclick = () => {
      const k = document.getElementById("ds-key").value.trim();
      if (k) settings.deepseekKey = k;
      settings.deepseekUrl = document.getElementById("ds-url").value.trim() || "https://api.deepseek.com";
      settings.model = normalizeDeepseekModel(document.getElementById("ds-model").value.trim() || "deepseek-v4-pro");
      saveSettings(); toast("已切換 " + settings.model, true); closeModal();
    };
    document.getElementById("ds-clear").onclick = () => { settings.deepseekKey = ""; saveSettings(); toast("已清除", true); closeModal(); };
  }

  window.closeModal = closeModal;
  window.dismissStoryModal = dismissStoryModal;
  window._jhRender = render;
  // test hook (safe read-only helpers for tooling)
  window.__JH_DEBUG = {
    getS: () => S,
    setS: (patch) => { Object.assign(S, patch); },
    resolveCommitment, hasUnlock, hasBondRole, bondSummary, listUnlocks,
    ensureNpcMem, ensureBonds, applyOfferGrants, matchOffer, evaluateOfferGates,
    NPC_OFFERS, classifyIntent, handleFreeInput, applyAiResult, saveGameSilent,
    NPCS, ITEMS, SKILLS, defaultState, migrateSave, ensureQuests, storyText,
    resolveEnding, estimateEndingId, finishChapter3, inviteCompanion, dismissCompanion, openRumorBoard,
    campOvernight, ENDING_DEFS, locationActions, startCombat, finishChapter2,
    bumpDonggongTrust, openDonggongTruthChoice, donggongNightTalk, donggongSlaveCommand,
    isDating, listDatingPartners, openDatingChat, openDatingHub, onDatingStarted, maybeLoverInitiative, datingAffOf
  };

  // ========== V8: DEEP PALACE + HORSE + FACTION HOOKS ==========
  function ensurePalaceState() {
    if (typeof S.emperorFavor !== "number") S.emperorFavor = 0;
    if (typeof S.palaceHeat !== "number") S.palaceHeat = 0;
    if (!S.palaceMood) S.palaceMood = "平靜";
    if (!Array.isArray(S.palaceDayEvents)) S.palaceDayEvents = [];
    if (typeof ensureCourtCareer === "function") { try { ensureCourtCareer(); } catch (e) {} }
  }
  function bumpEmperorFavor(d, why) {
    ensurePalaceState();
    S.emperorFavor = Math.max(-100, Math.min(100, (S.emperorFavor || 0) + d));
    if (Math.abs(d) >= 2) toast("帝心" + (d > 0 ? "＋" : "－") + Math.abs(d) + (why ? "（" + why + "）" : ""), true);
  }
  function bumpPalaceHeat(d) {
    ensurePalaceState();
    S.palaceHeat = Math.max(0, Math.min(100, (S.palaceHeat || 0) + d));
  }
  function palaceIdentityLabel() {
    const bits = [];
    if (S.palaceRole) bits.push(palaceRoleLabel());
    if (flag("eunuch")) bits.push("太監籍");
    if (S.fates && (S.fates.jingandi === "married" || S.fates.jingandi === "muse")) bits.push("聖眷");
    if ((S.emperorFavor || 0) >= 40) bits.push("帝寵");
    if ((S.palaceHeat || 0) >= 40) bits.push("物議沸騰");
    if (flag("donggong_slave")) bits.push(flag("donggong_truth_known") ? "廠奴・玄梧" : "廠奴・督公");
    return bits.length ? bits.join("／") : "閒人入禁";
  }
  function isHighPalaceServant() {
    return flag("eunuch") || S.palaceRole === "eunuch" || S.palaceRole === "maid" || S.palaceRole === "lady" ||
      S.palaceRole === "dongchang" || S.palaceRole === "consort" || S.palaceRole === "official" || S.palaceRole === "guard";
  }
  function palaceLoverPool() {
    return [
      { id: "lover_eunuch", name: "內侍小安", tier: "eunuch", martial: 18, kill: false },
      { id: "lover_guard", name: "禁衛旗手", tier: "guard", martial: 55, kill: false },
      { id: "lover_scholar", name: "翰林編修", tier: "scholar", martial: 12, kill: false },
      { id: "lover_official", name: "戶部郎中", tier: "official", martial: 20, kill: false },
      { id: "da_jiangjun", name: "霍鎮北", tier: "general", martial: 92, kill: true },
      { id: "lover_tao", name: "御醫楚青", tier: "medic", martial: 22, kill: false }
    ];
  }
  function pickConsort() {
    const pool = ["shen_guifei", "liu_zhaoyi"].filter(function(id){ return NPCS[id]; });
    if (!pool.length) return { id: "shen_guifei", name: "沈貴妃" };
    const id = pool[Math.floor(Math.random() * pool.length)];
    return { id: id, name: NPCS[id].name };
  }
  function recordPalaceEvent(id) {
    ensurePalaceState();
    S.palaceDayEvents.push({ day: S.day, id: id });
    if (S.palaceDayEvents.length > 40) S.palaceDayEvents = S.palaceDayEvents.slice(-40);
  }
  function palaceIncidentCooldown(id, days) {
    ensurePalaceState();
    const d = days || 1;
    return S.palaceDayEvents.some(function(e){ return e.id === id && (S.day - e.day) < d; });
  }


  // ========== PALACE PUNISHMENT SYSTEM（寫意・無血腥細描） ==========
  const PUNISH_KINDS = {
    tingzhang: { name: "廷杖", tier: "soft", scene: "punishGunsha", trauma: 1 },
    gunsha: { name: "棍殺（輕）", tier: "soft", scene: "punishGunsha", trauma: 1 },
    dingzhi: { name: "釘指", tier: "soft", scene: "punishDingzhi", trauma: 2 },
    wayan_threat: { name: "挖眼之威", tier: "soft", scene: "punishWayan", trauma: 2 },
    prison: { name: "下獄", tier: "prison", scene: "punishYongxingShi", trauma: 1 },
    yongxing: { name: "用刑室", tier: "prison", scene: "punishYongxingShi", trauma: 2 },
    gongxing: { name: "宮刑", tier: "gongxing", scene: "punishGongxing", trauma: 3 },
    exile: { name: "貶謫流放", tier: "exile", scene: "punishDongchangGate", trauma: 1 },
    demote: { name: "削職罰俸", tier: "exile", scene: "punishDongchangGate", trauma: 0 },
    fine: { name: "罰銀", tier: "exile", scene: "punishDongchangGate", trauma: 0 },
    lingchi: { name: "凌遲", tier: "lethal", scene: "punishLingchi", trauma: 4 },
    huopeng: { name: "履盆", tier: "lethal", scene: "punishHuopeng", trauma: 4 },
    chelie: { name: "車裂", tier: "lethal", scene: "punishChelie", trauma: 4 },
    bopi: { name: "剝皮之刑", tier: "lethal", scene: "punishBopi", trauma: 4 },
    diaojian: { name: "吊尖", tier: "lethal", scene: "punishDiaojian", trauma: 3 },
    chentang: { name: "沉塘", tier: "lethal", scene: "punishChentang", trauma: 4 },
    zhanshou: { name: "午門斬首", tier: "lethal", scene: "punishWumenZhanshou", trauma: 4 },
    xingxing: { name: "押赴刑場", tier: "lethal", scene: "punishXingxingTai", trauma: 3 }
  };

  const PUNISH_DOSSIER = [
    { id: "lingchi", name: "凌遲", line: "極刑之最，刀數以千計——廠衛用以震懾。" },
    { id: "huopeng", name: "履盆", line: "熱器逼人，名冊上寫着「履盆」，凡人聞之色變。" },
    { id: "chelie", name: "車裂", line: "五馬分屍的古法，如今多作威嚇之刑。" },
    { id: "gunsha", name: "棍殺", line: "廷杖可輕可重，一棍定生死。" },
    { id: "gongxing", name: "宮刑", line: "毀其身而留其命，入淨身房者，多自此始。" },
    { id: "wayan", name: "挖眼", line: "盲其雙目，使不得再見天光。" },
    { id: "bopi", name: "剝皮", line: "酷吏偶用之，卷宗只記「皮去」二字。" },
    { id: "dingzhi", name: "釘指", line: "釘入指節，問供最快。" },
    { id: "diaojian", name: "吊尖", line: "倒悬其上，尖物近膚，不戰自招。" },
    { id: "chentang", name: "沉塘", line: "竹籠入水，消息不再傳出宮牆。" }
  ];

  function punishSceneKey(kind) {
    const k = PUNISH_KINDS[kind] || PUNISH_KINDS.tingzhang;
    return k.scene || "punishYongxingShi";
  }

  function pickPunishmentByHeat(opts) {
    opts = opts || {};
    const heat = (S.palaceHeat || 0) + (opts.heatBonus || 0);
    const fav = S.emperorFavor || 0;
    const role = S.palaceRole || "";
    if (opts.forceKind && PUNISH_KINDS[opts.forceKind]) return opts.forceKind;
    if (opts.prefer === "gongxing" && isMale() && !flag("eunuch")) return "gongxing";
    if (heat >= 70 || fav <= -40) {
      const lethal = ["zhanshou", "lingchi", "chelie", "chentang", "xingxing"];
      return lethal[Math.floor(Math.random() * lethal.length)];
    }
    if (heat >= 45 || fav <= -20) {
      if (isMale() && !flag("eunuch") && Math.random() < 0.35) return "gongxing";
      return Math.random() < 0.5 ? "yongxing" : "prison";
    }
    if (heat >= 25 || fav <= -8) {
      const mid = ["tingzhang", "gunsha", "dingzhi", "exile", "demote"];
      return mid[Math.floor(Math.random() * mid.length)];
    }
    return Math.random() < 0.5 ? "fine" : "tingzhang";
  }

  function clearSceneOverrideSoon() {
    try { S.sceneOverride = null; } catch (e) {}
  }

  function applyPalacePunishment(kind, opts) {
    opts = opts || {};
    ensurePalaceState();
    const def = PUNISH_KINDS[kind] || PUNISH_KINDS.tingzhang;
    const st = effectiveStats();
    const scene = opts.scene || def.scene;
    S.sceneOverride = scene;
    let text = "【宮刑・" + def.name + "】\n";
    const why = opts.why ? ("因：" + opts.why + "。\n") : "";
    text += why;

    if (def.tier === "soft") {
      const dmg = 10 + Math.floor(Math.random() * 14) + Math.floor((S.palaceHeat || 0) / 10);
      S.hp = Math.max(1, S.hp - dmg);
      addStatus("neishang", 1 + (def.trauma > 1 ? 1 : 0));
      S.trauma = (S.trauma || 0) + (def.trauma || 1);
      bumpPalaceHeat(3);
      setFlag("punished_soft");
      text += "廷杖／刑具落下，你咬牙熬過這一輪。氣力大損，內傷隱隱。\n（傷勢 −" + dmg + " HP · 創傷 +" + (def.trauma || 1) + "）";
      if (flag("punish_dossier")) text += "\n你曾讀過卷宗，心中早有防備，神色未至於崩潰。";
      showStory(text, scene);
      return { ok: true, tier: "soft" };
    }

    if (def.tier === "prison") {
      setFlag("punished_prison");
      S.trauma = (S.trauma || 0) + (def.trauma || 1);
      addStatus("neishang", 2);
      S.hp = Math.max(1, S.hp - 8);
      const place = kind === "yongxing" ? "yongxing_shi" : "tianlao";
      const pname = kind === "yongxing" ? "用刑室／慎刑司" : "天牢／慎刑司";
      S.prison = { by: opts.by || "jingandi", place: place, name: pname, paroleDays: opts.paroleDays != null ? opts.paroleDays : 2, day: S.day };
      S.loc = place;
      setFlag("map_" + place);
      bumpPalaceHeat(6);
      bumpEmperorFavor(-4, "下獄");
      text += "鎖鏈入骨。你被押入" + pname + "。窗縫一線光，像在嘲笑你的宮職與野心。";
      showStory(text, scene);
      render();
      return { ok: true, tier: "prison" };
    }

    if (def.tier === "gongxing") {
      setFlag("punished_gongxing");
      if (!isMale() || flag("eunuch") || flag("sold_as_eunuch")) {
        // already eunuch / female: treat as severe soft + prison
        S.hp = Math.max(1, S.hp - 20);
        addStatus("neishang", 3);
        S.trauma = (S.trauma || 0) + 2;
        S.prison = { by: "jingandi", place: "yongxing_shi", name: "用刑室", paroleDays: 3, day: S.day };
        S.loc = "yongxing_shi";
        text += "刑房燈影一晃。你已非可「淨身」之身——改押用刑室長囚。";
        showStory(text, scene);
        render();
        return { ok: true, tier: "gongxing_alt" };
      }
      applyEunuchFate();
      S.loc = "jingshen";
      setFlag("visited_jingshen");
      setFlag("map_jingshen");
      bumpPalaceHeat(10);
      bumpEmperorFavor(-6, "宮刑");
      text += "燈熄又明。有些門一旦推開便回不去——你被記入太監籍，送往淨身房一侧。\n（寫意：氣力／身法／根骨大損；宮牆血債支線可開）";
      showStory(text, "punishGongxing");
      render();
      return { ok: true, tier: "gongxing" };
    }

    if (def.tier === "exile") {
      setFlag("punished_exile");
      const goldFine = Math.min(S.gold, 40 + Math.floor(Math.random() * 60) + Math.floor((S.palaceHeat || 0) / 2));
      S.gold = Math.max(0, S.gold - goldFine);
      if (kind === "demote" && S.palaceRole) {
        const prev = S.palaceRole;
        if (prev === "dongchang" || prev === "dongchang_boss") S.palaceRole = "eunuch";
        else if (prev === "consort" || prev === "lady") S.palaceRole = "maid";
        else if (prev === "official") S.palaceRole = "guard";
        else S.palaceRole = null;
        text += "詔令降下：削去「" + palaceRoleLabel() + "」之銜。";
      } else if (kind === "exile") {
        S.loc = "bianguan";
        setFlag("rep_30");
        bumpEmperorFavor(-10, "流放");
        text += "你被貶出宮牆，遠赴邊關效力。帝心已冷。";
      } else {
        bumpEmperorFavor(-3, "罰銀");
        text += "內庫吏收走罰銀 " + goldFine + " 兩。你在宮中的日子，更緊了。";
      }
      if (kind !== "exile") text += "\n罰銀／損失約 " + goldFine + " 金。";
      S.trauma = (S.trauma || 0) + (def.trauma || 0);
      showStory(text, scene);
      render();
      return { ok: true, tier: "exile" };
    }

    // lethal
    const martial = (typeof playerMartialScore === "function") ? playerMartialScore() : (st.force + st.agi);
    const skillBonus = (S.skills && S.skills.length) ? Math.min(12, S.skills.length) : 0;
    const dossierBonus = flag("punish_dossier") ? 4 : 0;
    const dodgeNeed = 48 + Math.floor((S.palaceHeat || 0) / 5) + (opts.hard ? 10 : 0);
    const dodgeScore = martial + st.agi * 2 + st.luck + Math.floor((st.focus || 0) * 1.2) + skillBonus + dossierBonus + Math.floor(Math.random() * 22);
    bumpPalaceHeat(12);
    if (dodgeScore >= dodgeNeed) {
      setFlag("punished_lethal_dodge");
      if (kind === "zhanshou") setFlag("survived_zhanshou");
      S.hp = Math.max(1, S.hp - 22);
      addStatus("neishang", 3);
      S.trauma = (S.trauma || 0) + 2;
      adjustKarma(1, "死裡逃生");
      bumpEmperorFavor(-8, "驚變");
      text += "刀光／刑具已至——你憑武功、身法與福緣掙得一線生機，帶傷逃出刑場！\n（判定 " + dodgeScore + " / " + dodgeNeed + "）\n禁軍喝令未及合圍，你隱入夾道。";
      S.loc = (Math.random() < 0.5) ? "shenwu" : "yuhe_wharf";
      showStory(text, scene);
      render();
      return { ok: true, tier: "lethal_dodge", score: dodgeScore, need: dodgeNeed };
    }
    setFlag("punished_lethal_fail");
    S.hp = 1;
    addStatus("neishang", 5);
    S.trauma = (S.trauma || 0) + (def.trauma || 4);
    adjustKarma(-3, "臨刑");
    bumpEmperorFavor(-20, "欽犯");
    // severe path: not always hard game-over — imprison + near-death if not opts.fatal
    if (opts.fatal || (S.palaceHeat || 0) >= 85) {
      text += "刑場鼓聲落定。你未能避開——意識沉入黑水。\n（判定失敗 " + dodgeScore + " / " + dodgeNeed + " · 結局：刑場）";
      S.endingId = "palace_punish_death";
      S.ending = { title: "刑場終焉", epi: "宮牆之內，龍威如山。你的名字，從此只在慎刑司檔案裡出現一次。" };
      showStory(text, scene);
      if (typeof resolveEnding === "function") {
        try { /* keep ending fields; render will show */ } catch (e) {}
      }
      render();
      return { ok: false, tier: "lethal_death", score: dodgeScore, need: dodgeNeed };
    }
    S.prison = { by: "jingandi", place: "tianlao", name: "天牢／慎刑司", paroleDays: 0, day: S.day };
    S.loc = "tianlao";
    text += "你差一點就到了終點。禁軍收势，改判長囚天牢——帝心要你活着後悔。\n（判定失敗 " + dodgeScore + " / " + dodgeNeed + " · 重傷下獄）";
    showStory(text, scene);
    render();
    return { ok: false, tier: "lethal_prison", score: dodgeScore, need: dodgeNeed };
  }

  function openPunishDossier() {
    setFlag("punish_dossier");
    let body = "廠衛密室案几上，攤開一冊墨跡未乾的卷宗——「十大酷刑圖」。\n你匆匆瀏覽，只記名目與威嚇之意，不敢細想刀法。\n";
    PUNISH_DOSSIER.forEach(function(d, i){
      body += "\n" + (i + 1) + ". " + d.name + "——" + d.line;
    });
    body += "\n\n（已解鎖・卷宗見識：往後受刑／威嚇對話時，略增閃避與談判底氣）";
    S.sceneOverride = "punishDongchangGate";
    showStory("【東廠・十大酷刑卷宗】\n" + body, "punishDongchangGate");
  }

  function dongchangPunishNpcDemo() {
    // 寫意：對NPC用刑，不描述過程
    const names = ["擋案小吏", "走私牙人", "謀反嫌疑", "內廷口舌"];
    const n = names[Math.floor(Math.random() * names.length)];
    const kinds = ["tingzhang", "dingzhi", "yongxing", "gunsha"];
    const k = kinds[Math.floor(Math.random() * kinds.length)];
    const def = PUNISH_KINDS[k];
    adjustKarma(-2, "廠衛用刑");
    bumpPalaceHeat(2);
    S.exp += 4;
    S.gold += 8 + Math.floor(Math.random() * 12);
    showStory("【廠衛公務】你押" + n + "入" + (def.name) + "堂。\n案結，口供入檔。你多記一筆人名，也多沾一分腥。\n（寫意：不述刑訊細節）", def.scene);
  }


  function resolveAffairChoice(choice, consort, lover) {
    ensurePalaceState();
    const hi = isHighPalaceServant();
    const st = effectiveStats();
    const deadly = !!(lover && lover.kill);
    let text = "";
    if (choice === "silent") {
      bumpPalaceHeat(4);
      if (hi) {
        S.gold += 40; bumpPalaceHeat(6); adjustKarma(-2, "知情不報");
        text = consort.name + "眼神一凜，隨即塞你一錠金：「今夜之事，當沒有發生。」你悄然退去。";
        setFlag("palace_affair_silent");
      } else {
        adjustKarma(-1, "窺密默退");
        text = "你屏息退入花影。廊外遠去的笑聲，像一把未出鞘的刀。";
        setFlag("palace_affair_seen");
      }
    } else if (choice === "blackmail") {
      bumpPalaceHeat(12);
      if (deadly && Math.random() < 0.55) {
        return resolveGeneralKillAttempt(consort, lover, "blackmail");
      }
      const gold = 60 + Math.floor(Math.random() * 80) + (hi ? 40 : 0);
      S.gold += gold;
      adjustKarma(-6, "宮闈勒索");
      bumpEmperorFavor(-2, "物議");
      setFlag("palace_affair_blackmail");
      text = "你低聲開價。" + consort.name + "面如薄紙，卻仍兌了 " + gold + " 金。霍亂的火，埋進灰裡。";
      if (hi) {
        text += "\n她咬牙道：「你我既是同殿之人——便一榮俱榮，一損俱損。」";
        setFlag("palace_affair_accomplice");
      }
    } else if (choice === "report") {
      bumpPalaceHeat(18);
      setFlag("palace_affair_reported");
      // 低帝心／高宮熱：反被誣告，入刑
      const disbelief = ((S.emperorFavor || 0) < 8 && (S.palaceHeat || 0) >= 20) || ((S.emperorFavor || 0) < 0 && Math.random() < 0.4);
      if (disbelief && Math.random() < 0.55) {
        bumpEmperorFavor(-6, "誣告之嫌");
        adjustKarma(0, "奏聞反噬");
        recordPalaceEvent("palace_catch_affair");
        const pk = pickPunishmentByHeat({ heatBonus: 10, why: "告密反噬" });
        applyPalacePunishment(pk, {
          why: "告密反噬・" + consort.name + "反咬「窺禁誣告」・帝心半疑發落",
          by: consort.id
        });
        return;
      }
      bumpEmperorFavor(8, "告密");
      adjustKarma(hi ? -1 : 2, "奏聞");
      S.renown += 3;
      if (!hasItem("imperial_token") && (S.emperorFavor || 0) >= 25) addItem("imperial_token", 1);
      text = "你連夜叩閽。翌日詔獄開審——" + consort.name + "與" + lover.name + "事敗。帝心對你另眼相看，後宮卻更冷。";
      bumpPalaceHeat(10);
      if (S.fates[consort.id]) setFate(consort.id, "enemy");
    } else if (choice === "join") {
      bumpPalaceHeat(10);
      adjustKarma(-5, "同流");
      setFlag("palace_affair_join");
      S.charm = Math.min(30, (S.charm || 5) + 1);
      S.gold += 30;
      if (hi) {
        setFlag("palace_affair_accomplice");
        text = "你點頭入局。" + consort.name + "鬆了口氣：「從此你是自己人。」暗處多了一條線。";
      } else {
        text = "你故作不知，反被拉入賭局。金與把柄一併入手——也一併入局。";
      }
    } else if (choice === "fight") {
      if (deadly) return resolveGeneralKillAttempt(consort, lover, "fight");
      startCombat("elite_bandit", function(){
        adjustKarma(1, "宮中拔刀");
        bumpPalaceHeat(8);
        S.exp += 8;
        showStory("刀光過處，私情四散。" + consort.name + "掩面而去。你在禁中留了名——不是好名。");
      });
      return;
    } else if (choice === "flee") {
      const dodge = st.agi + st.luck + Math.floor(Math.random() * 12);
      if (deadly && dodge < 22) {
        return resolveGeneralKillAttempt(consort, lover, "flee_fail");
      }
      bumpPalaceHeat(3);
      text = "你足尖一點，掠入夾道。背後怒喝漸遠。今夜，你還活着。";
      setFlag("palace_affair_fled");
    } else {
      text = "廊外風起，燈影一晃——事已過去。";
    }
    recordPalaceEvent("palace_catch_affair");
    showStory("【宮闈突變・撞破私情】\n" + text + "\n（帝心 " + (S.emperorFavor||0) + " · 宮熱 " + (S.palaceHeat||0) + " · 身份：" + palaceIdentityLabel() + "）");
  }

  function resolveGeneralKillAttempt(consort, lover, why) {
    ensurePalaceState();
    const st = effectiveStats();
    const martial = playerMartialScore();
    const need = (lover.martial || 90) + 8;
    const dodgeScore = martial + st.agi * 2 + st.luck + Math.floor((st.focus || 0) * 1.5) + Math.floor(Math.random() * 20);
    bumpPalaceHeat(15);
    if (dodgeScore >= need) {
      adjustKarma(2, "躲過殺機");
      S.hp = Math.max(1, S.hp - 12);
      addStatus("neishang", 1);
      setFlag("palace_dodged_general");
      recordPalaceEvent("palace_catch_affair");
      showStory("【殺機】" + lover.name + "刀光已至咽喉！你憑武功／身法側身避開，僅帶傷逃出。\n" + consort.name + "失聲：「……走！」\n（判定 " + dodgeScore + " / " + need + " · 因：" + why + "）");
      return;
    }
    // death-risk: severe wound + imprisonment rather than soft-lock wipe if possible
    S.hp = 1;
    addStatus("neishang", 4);
    adjustKarma(-2, "宮殺餘生");
    bumpEmperorFavor(-12, "驚駕");
    setFlag("palace_almost_slain");
    recordPalaceEvent("palace_catch_affair");
    const pk2 = pickPunishmentByHeat({
      heatBonus: 20,
      prefer: (isMale() && !flag("eunuch") && Math.random() < 0.28) ? "gongxing" : null
    });
    applyPalacePunishment(pk2 || "yongxing", {
      why: "撞破私情・大將軍險斬（判定 " + dodgeScore + "/" + need + "）・帝心大怒發落",
      by: "da_jiangjun",
      hard: true
    });
  }

  function startPalaceCatchAffair() {
    ensurePalaceState();
    const consort = pickConsort();
    const lovers = palaceLoverPool();
    const lover = lovers[Math.floor(Math.random() * lovers.length)];
    const hi = isHighPalaceServant();
    const deadly = lover.kill;
    let intro = "夜巡至偏殿側門，你聽見低語與衣帛碎響。門縫一開——\n" +
      consort.name + "與" + lover.name + "（" + (deadly ? "大將軍級" : lover.tier) + "）相對而立。燈影一晃，四人目光相撞。\n" +
      "你的宮中身份：" + palaceIdentityLabel() + "。";
    if (hi) intro += "\n" + consort.name + "先是一僵，隨即壓低聲音：「自己人……可別壞了大家的事。」";
    if (deadly) intro += "\n" + lover.name + "按刀的指節發白——此人武功深不可測。";
    openModal(
      "<h3>撞破貴妃私情</h3><div class=\"story-box\">" + intro.replace(/\n/g, "<br>") + "</div>" +
      "<div class=\"btn-row\">" +
      "<button class=\"btn\" id=\"pa-silent\">默然離開</button>" +
      "<button class=\"btn\" id=\"pa-black\">要挾封口</button>" +
      "<button class=\"btn primary\" id=\"pa-report\">密奏天子</button>" +
      "<button class=\"btn\" id=\"pa-join\">入局同流</button>" +
      "<button class=\"btn danger\" id=\"pa-fight\">拔刀對峙</button>" +
      "<button class=\"btn ghost\" id=\"pa-flee\">轉身逃走</button>" +
      "</div>"
    );
    document.getElementById("pa-silent").onclick = function(){ closeModal(); resolveAffairChoice("silent", consort, lover); };
    document.getElementById("pa-black").onclick = function(){ closeModal(); resolveAffairChoice("blackmail", consort, lover); };
    document.getElementById("pa-report").onclick = function(){ closeModal(); resolveAffairChoice("report", consort, lover); };
    document.getElementById("pa-join").onclick = function(){ closeModal(); resolveAffairChoice("join", consort, lover); };
    document.getElementById("pa-fight").onclick = function(){ closeModal(); resolveAffairChoice("fight", consort, lover); };
    document.getElementById("pa-flee").onclick = function(){ closeModal(); resolveAffairChoice("flee", consort, lover); };
  }

  function startEmperorFavorIncident() {
    ensurePalaceState();
    const st = effectiveStats();
    const fav = S.emperorFavor || 0;
    const drunk = hasStatus("drunk") || flag("palace_wine_tonight");
    const muse = S.fates && (S.fates.jingandi === "muse" || S.fates.jingandi === "married");
    let why = "夜深殿靜";
    if (drunk) why = "酒意上涌";
    else if (muse) why = "日久生情";
    else if ((st.charm || 0) >= 14) why = "容色動人";
    else if (fav >= 30) why = "帝心偏寵";
    openModal(
      "<h3>璇璣殿・夜召</h3><div class=\"story-box\">景安帝命人傳召。燭影搖紅——" + why + "。<br>" +
      "「今夜留下來。」語調不容置疑，卻也未必是死令。<br>" +
      "帝心 " + fav + " · 魅力 " + (st.charm||0) + " · 身份 " + palaceIdentityLabel() +
      "<br><span class=\"small\">（寫意：可順從、推辭或借機——無露骨描寫）</span></div>" +
      "<div class=\"btn-row\">" +
      "<button class=\"btn primary\" id=\"ef-yes\">順從留下</button>" +
      "<button class=\"btn danger\" id=\"ef-no\">掙扎抗拒</button>" +
      "<button class=\"btn\" id=\"ef-soft\">巧妙推辭</button>" +
      "<button class=\"btn\" id=\"ef-ask\">借機索權</button>" +
      "</div>"
    );
    document.getElementById("ef-yes").onclick = function(){
      closeModal();
      bumpEmperorFavor(10, "承寵");
      bumpPalaceHeat(8);
      adjustKarma(-2, "承寵");
      S.charm = Math.min(30, (S.charm || 5) + 1);
      setFlag("palace_favored");
      if (Math.random() < 0.35) setFlag("palace_pregnancy_rumor");
      if (!hasItem("palace_jade")) addItem("palace_jade", 1);
      if (S.palaceRole !== "consort" && (S.gender === "女" || S.gender === "female")) setPalaceRole("consort");
      recordPalaceEvent("palace_emperor_favor");
      let t = "你沒有拒絕。殿外風鈴輕響——翌日，謠言已比露水更快。帝心加深，後宮側目。";
      if (flag("palace_pregnancy_rumor")) t += "\n坊間隱有「喜脈」之說，真假難辨。";
      showStory("【寵幸機緣】\n" + t);
    };
    document.getElementById("ef-no").onclick = function(){
      closeModal();
      const soft = fav >= 25 || muse || (st.charm || 0) >= 16;
      if (soft && Math.random() < 0.55) {
        bumpEmperorFavor(3, "喜其風骨");
        adjustKarma(2, "拒寵");
        setFlag("palace_resist_liked");
        recordPalaceEvent("palace_emperor_favor");
        showStory("【寵幸機緣】你掙扎推拒。景安帝反而低笑：「有骨氣。」罰你抄《女誡》三頁——卻賜了茶。");
      } else if (fav >= 10) {
        bumpEmperorFavor(-8, "忤旨");
        bumpPalaceHeat(6);
        adjustKarma(1, "拒寵");
        setFlag("palace_resist_punished");
        recordPalaceEvent("palace_emperor_favor");
        if (Math.random() < 0.45) applyPalacePunishment("tingzhang", { why: "忤旨罰跪兼廷杖" });
        else showStory("【寵幸機緣】帝顏不悅。你被罰跪花廊至五更，膝青一塊——總算沒入慎刑司。");
      } else {
        bumpEmperorFavor(-15, "大怒");
        bumpPalaceHeat(12);
        adjustKarma(1, "拒寵");
        setFlag("palace_resist_dungeon");
        recordPalaceEvent("palace_emperor_favor");
        const pk = pickPunishmentByHeat({ heatBonus: 15, why: "拒寵惹怒" });
        applyPalacePunishment(pk, { why: "抗拒帝寵・龍顏大怒", by: "jingandi" });
      }
    };
    document.getElementById("ef-soft").onclick = function(){
      closeModal();
      const ok = (st.charm || 0) + (st.wit || 0) + Math.random() * 10 > 16;
      if (ok) {
        bumpEmperorFavor(2, "婉拒得體");
        adjustKarma(1, "得體");
        setFlag("palace_soft_refuse");
        recordPalaceEvent("palace_emperor_favor");
        showStory("【寵幸機緣】你以定力未穩、怕污聖躬為由婉拒。景安帝沉吟，揮袖：「下去吧。」未加深責。");
      } else {
        bumpEmperorFavor(-5, "托詞拙劣");
        bumpPalaceHeat(4);
        recordPalaceEvent("palace_emperor_favor");
        showStory("【寵幸機緣】托詞太拙。帝心微寒，罰你一月不得近璇璣殿。");
      }
    };
    document.getElementById("ef-ask").onclick = function(){
      closeModal();
      bumpEmperorFavor(4, "膽識");
      bumpPalaceHeat(5);
      adjustKarma(-1, "索權");
      setFlag("palace_asked_power");
      if (!hasItem("imperial_edict")) addItem("imperial_edict", 1);
      setFlag("neiting_access"); setFlag("hougong_access");
      S.renown += 2;
      recordPalaceEvent("palace_emperor_favor");
      showStory("【寵幸機緣】你半推半就，借機請一道便宜行事的硃批。景安帝盯你片刻，竟真擲下青梧聖旨一角。");
    };
  }

  function maybePalaceIncident(forceType) {
    ensurePalaceState();
    const palaceLocs = { huanggong:1, neiting:1, hougong:1, yulin:1, dongchang:1,
      wumen:1, taihedian:1, qianqing:1, yangxin:1, yuhuayuan:1, yushan:1, neiwufu:1,
      wuying:1, wenyuan:1, dianshi:1, xingbu_gate:1, shenwu:1, taipusi:1, taiyiyuan:1,
      xingxing_tai:1, yongxing_shi:1, tianlao:1, xingbu_prison:1 };
    if (!palaceLocs[S.loc]) return false;
    if (typeof isImprisoned === "function" && isImprisoned()) return false;
    const st = effectiveStats();
    const roleBoost = S.palaceRole ? 0.12 : 0.04;
    const heatBoost = Math.min(0.2, (S.palaceHeat || 0) * 0.002);
    const chance = Math.min(0.55, 0.10 + roleBoost + heatBoost + (st.perception || 0) * 0.008 + (st.luck || 0) * 0.006);
    if (!forceType && Math.random() > chance) return false;

    const canAffair = !palaceIncidentCooldown("palace_catch_affair", 2) && (S.loc === "hougong" || S.loc === "neiting" || S.loc === "yuhuayuan" || S.loc === "yangxin" || S.loc === "qianqing" || forceType === "affair");
    const canFavor = !palaceIncidentCooldown("palace_emperor_favor", 3) &&
      (S.loc === "hougong" || S.loc === "neiting" || S.loc === "yangxin" || S.loc === "yuhuayuan") &&
      ((st.charm || 0) >= 12 || (S.emperorFavor || 0) >= 20 || flag("palace_wine_tonight") ||
        (S.fates && (S.fates.jingandi === "muse" || S.fates.jingandi === "married")) || forceType === "favor");

    if (forceType === "affair" || (!forceType && canAffair && Math.random() < 0.55)) {
      startPalaceCatchAffair();
      return true;
    }
    if (forceType === "favor" || (!forceType && canFavor && Math.random() < 0.5)) {
      startEmperorFavorIncident();
      return true;
    }
    // minor palace rumors
    if (!forceType && Math.random() < 0.4) {
      const bits = [
        "你聽見殿角私語：東廠籍冊又添了三個名字。",
        "花廊落下一枚珠翠——像是貴妃宮的制式。",
        "羽林換防，口令改了半字。你默默記下。",
        "內侍端酒踉蹌而過。你可接過一盞（寫意・酒意）。"
      ];
      const i = Math.floor(Math.random() * bits.length);
      if (i === 3) {
        openModal("<h3>殿角酒香</h3><div class=\"story-box\">" + bits[i] + "</div><div class=\"btn-row\"><button class=\"btn primary\" id=\"pw-yes\">接酒一盞</button><button class=\"btn ghost\" id=\"pw-no\">避開</button></div>");
        document.getElementById("pw-yes").onclick = function(){
          closeModal();
          setFlag("palace_wine_tonight");
          if (typeof addStatus === "function") addStatus("drunk", 2);
          S.neili = Math.min(effectiveStats().neiliMax, S.neili + 8);
          showStory("酒意入喉。今夜若近璇璣殿，恐有變數。");
        };
        document.getElementById("pw-no").onclick = function(){ closeModal(); showStory("你側身讓過。酒香散入夜色。"); };
        return true;
      }
      showStory("【宮牆見聞】\n" + bits[i]);
      return true;
    }
    return false;
  }

  function appendV8FactionActions(acts, locId) {
    if (locId === "qingcheng" || locId === "jingji") {
      acts.push({ label: "申請加入破碗幫", fn: function(){ tryJoin("powan_bang"); } });
      if (S.faction === "powan_bang") acts.push({ label: "習破碗幫武學", fn: function(){ learnFactionSkill("powan_bang"); } });
    }
    if (locId === "chixia" || locId === "tiantai") {
      acts.push({ label: "申請加入蒼峰劍派", fn: function(){ tryJoin("cangfeng_jian"); } });
      if (S.faction === "cangfeng_jian") acts.push({ label: "習蒼峰劍法", fn: function(){ learnFactionSkill("cangfeng_jian"); } });
    }
    if (locId === "yewang" || locId === "mishi") {
      acts.push({ label: "申請求見幽墓一脈", fn: function(){ tryJoin("youmu_line"); } });
      if (S.faction === "youmu_line") acts.push({ label: "習幽墓心法", fn: function(){ learnFactionSkill("youmu_line"); } });
    }
    if (locId === "yanhui") {
      acts.push({ label: "申請加入落英島", fn: function(){ tryJoin("luoying_dao"); } });
      if (S.faction === "luoying_dao") acts.push({ label: "習落英奇門", fn: function(){ learnFactionSkill("luoying_dao"); } });
    }
    if (locId === "shamo") {
      acts.push({ label: "申請加入黃沙刀盟", fn: function(){ tryJoin("huangsha_dao"); } });
      if (S.faction === "huangsha_dao") acts.push({ label: "習黃沙刀法", fn: function(){ learnFactionSkill("huangsha_dao"); } });
    }
    if (locId === "honglian" && S.faction === "honglian_cult") {
      acts.push({ label: "習門派進階功", fn: function(){ learnFactionSkill("honglian_cult"); } });
    }
    // horse market
    if (locId === "longmen") {
      acts.push({ label: "馬市尋汗血（重金）", fn: function(){ tryBuyHanxueHorse(); } });
    }
    if (locId === "shamo" && !hasItem("hanxue_horse")) {
      acts.push({ label: "【奇遇】沙原聞馬嘶", fn: function(){ tryDesertHorseEvent(); } });
    }
    // homage side quests
    if (locId === "chixia" || locId === "tiantai") {
      if (S.quests.side_cangfeng && S.quests.side_cangfeng.step === 0) {
        acts.push({ label: "【支線】蒼峰論劍榜", fn: function(){
          S.quests.side_cangfeng.step = 1; setFlag("cangfeng_invite");
          showStory("崖上石榜：「三春後蒼峰論劍，勝者可窺「雲切」半式。」顧小然負劍而立：「你也來？」");
        }});
      }
      if (S.quests.side_cangfeng && S.quests.side_cangfeng.step === 1 && !S.quests.side_cangfeng.done) {
        acts.push({ label: "【支線】參加蒼峰論劍", fn: function(){
          startCombat("elite_bandit", function(){
            S.quests.side_cangfeng.done = true; S.quests.side_cangfeng.step = 2;
            if (S.skills.indexOf("peak_intent") < 0) S.skills.push("peak_intent");
            S.renown += 6; S.factionRep.cangfeng_jian = (S.factionRep.cangfeng_jian || 0) + 12;
            addItem("cangfeng_jianqi", 1);
            showStory("論劍勝出。雲切劍意入門，蒼峰長劍入手。");
          });
        }});
      }
    }
    if (locId === "jianzhong" || locId === "mishi") {
      if (S.quests.side_xiake && S.quests.side_xiake.step === 0) {
        acts.push({ label: "【支線】拾得俠客殘頁", fn: function(){
          S.quests.side_xiake.step = 1; addItem("xiake_page", 1); setFlag("xiake_page_found");
          showStory("亂石縫中一頁殘詩：「趙客縵胡纓……」後文漫滅。或可以此換武學機緣。");
        }});
      }
      if (S.quests.side_xiake && S.quests.side_xiake.step === 1 && hasItem("xiake_page") && !S.quests.side_xiake.done) {
        acts.push({ label: "【支線】研讀俠客殘頁", fn: function(){
          removeItem("xiake_page", 1); S.quests.side_xiake.done = true; S.quests.side_xiake.step = 2;
          S.force = Math.min(40, S.force + 1); S.wit = Math.min(30, S.wit + 1); S.exp += 12;
          if (S.skills.indexOf("xiake_strike") < 0) S.skills.push("xiake_strike");
          showStory("殘頁拳意入體——俠客一式。武力／悟性微增。");
        }});
      }
    }
    if (locId === "yewang" || locId === "wuyin") {
      if (S.quests.side_xuanyin && S.quests.side_xuanyin.step === 0) {
        acts.push({ label: "【支線】尋玄陰殘卷", fn: function(){
          S.quests.side_xuanyin.step = 1; setFlag("xuanyin_hunt");
          showStory("墓風捲過，隱有「玄陰」二字殘痕。慕幽蘭淡聲：「莫貪。那卷傷人。」");
        }});
      }
      if (S.quests.side_xuanyin && S.quests.side_xuanyin.step === 1 && !S.quests.side_xuanyin.done) {
        acts.push({ label: "【支線】奪玄陰殘卷", fn: function(){
          startCombat("tomb_shade", function(){
            S.quests.side_xuanyin.done = true; S.quests.side_xuanyin.step = 2;
            addItem("xuanyin_scroll", 1);
            if (S.skills.indexOf("soft_yin_palm") < 0) S.skills.push("soft_yin_palm");
            S.neiliMax += 5; S.factionRep.youmu_line = (S.factionRep.youmu_line || 0) + 10;
            showStory("玄陰殘卷入手。柔掌陰勁隱現——勿妄用於摯友。");
          });
        }});
      }
    }

    // ===== v9 homage side quests =====
    if (locId === "chixia") {
      if (S.quests.side_cangfeng_hypocrite && S.quests.side_cangfeng_hypocrite.step === 0) {
        acts.push({ label: "【支線】打聽葉青山傳聞", fn: function(){
          S.quests.side_cangfeng_hypocrite.step = 1; setFlag("met_ye_qingshan");
          showStory("市井竊語：蒼峰掌門葉青山外表仁厚，門下卻屢有「意外」。林風被逐，寧書影沉默。");
        }});
      }
      if (S.quests.side_cangfeng_hypocrite && S.quests.side_cangfeng_hypocrite.step === 1 && !S.quests.side_cangfeng_hypocrite.done) {
        acts.push({ label: "【支線】蒐集偽君子鐵證", fn: function(){
          startCombat("elite_bandit", function(){
            S.quests.side_cangfeng_hypocrite.step = 2;
            addItem("map_fragment", 1); setFlag("ye_exposed");
            showStory("崖下石室搜得密信：葉青山與左冷影約期併吞。鐵證在手。");
          });
        }});
      }
      if (S.quests.side_cangfeng_hypocrite && S.quests.side_cangfeng_hypocrite.step === 2 && !S.quests.side_cangfeng_hypocrite.done) {
        acts.push({ label: "【支線】當眾揭穿葉青山", fn: function(){
          S.quests.side_cangfeng_hypocrite.done = true; S.quests.side_cangfeng_hypocrite.step = 3;
          setFlag("cangfeng_hypocrite_done"); setFlag("ye_exposed");
          setFate("ye_qingshan", "exposed"); S.renown += 8; S.honor += 3;
          if (S.skills.indexOf("peak_intent") < 0) S.skills.push("peak_intent");
          showStory("論劍台前密信宣讀。葉青山偽面撕破，倉皇退場。蒼峰劍意入你心中。（聲望＋俠義）");
        }});
      }
    }
    if (locId === "yewang" || locId === "wuyin") {
      if (S.quests.side_tomb_taboo && S.quests.side_tomb_taboo.step === 0) {
        acts.push({ label: "【支線】窺見墓中二人", fn: function(){
          S.quests.side_tomb_taboo.step = 1; setFlag("met_xiao_longyin"); setFlag("met_yang_guochen"); setFlag("tomb_taboo");
          showStory("墓影深處：白衣女子與黑衣棄徒對坐。空氣裡有超越師徒的沉默。");
        }});
      }
      if (S.quests.side_tomb_taboo && S.quests.side_tomb_taboo.step === 1 && !S.quests.side_tomb_taboo.done) {
        acts.push({ label: "【支線】助二人破禁制", fn: function(){
          startCombat("tomb_shade", function(){
            S.quests.side_tomb_taboo.done = true; S.quests.side_tomb_taboo.step = 2;
            setFlag("side_tomb_taboo_done"); setFlag("tomb_ally");
            if (S.skills.indexOf("soft_yin_palm") < 0) S.skills.push("soft_yin_palm");
            S.renown += 5; addItem("tomb_seal", 1);
            setFate("xiao_longyin", "muse"); setFate("yang_guochen", "ally");
            showStory("禁制鬆動。小龍吟授柔掌半式，楊過塵點頭：「欠你一次。」");
          });
        }});
      }
    }
    if (locId === "qingcheng") {
      if (S.quests.side_qiao_identity && S.quests.side_qiao_identity.step === 0) {
        acts.push({ label: "【支線】聽喬峰山身世謠", fn: function(){
          S.quests.side_qiao_identity.step = 1; setFlag("met_qiao_fengshan");
          showStory("破碗幫竊竊私語：前任幫主喬峰山——身上或流着邊關之血。洪七影只喝酒不開口。");
        }});
      }
      if (S.quests.side_qiao_identity && S.quests.side_qiao_identity.step === 1 && !S.quests.side_qiao_identity.done) {
        acts.push({ label: "【支線】為喬峰山作證／勸留", fn: function(){
          S.quests.side_qiao_identity.done = true; S.quests.side_qiao_identity.step = 2;
          setFlag("side_qiao_done"); setFlag("qiao_sworn");
          setFate("qiao_fengshan", "ally"); S.renown += 6; S.honor += 4;
          if (S.skills.indexOf("jiaohua_quan") < 0) S.skills.push("jiaohua_quan");
          showStory("你當眾力證其義氣大於出身。喬峰山砸碗結義。叫花拳入門。");
        }});
      }
    }
    if (locId === "huanggong" || locId === "yanhui" || locId === "hougong") {
      if (S.quests.side_court_double && S.quests.side_court_double.step === 0) {
        acts.push({ label: "【支線】遇韋小舟拋媚眼", fn: function(){
          S.quests.side_court_double.step = 1; setFlag("met_wei_xiaozhou"); setFlag("court_double");
          showStory("小太監韋小舟：「宮裡危险，會裡也危险——你選邊站？還是……兩邊都站？」");
        }});
      }
      if (S.quests.side_court_double && S.quests.side_court_double.step === 1 && !S.quests.side_court_double.done) {
        acts.push({ label: "【支線】夾心走鋼絲（見雙方）", fn: function(){
          setFlag("met_chen_jinnan"); setFlag("qingwu_member");
          S.quests.side_court_double.step = 2;
          showStory("你來回於帝側與青梧密舵。兩邊的令都握在手——也意味兩邊都能殺你。");
        }});
      }
      if (S.quests.side_court_double && S.quests.side_court_double.step === 2 && !S.quests.side_court_double.done) {
        acts.push({ label: "【支線】定策：兩邊留一線", fn: function(){
          S.quests.side_court_double.done = true; S.quests.side_court_double.step = 3;
          setFlag("side_court_double_done"); S.renown += 5; S.luck = Math.min(30, (S.luck||5)+2);
          setFate("wei_xiaozhou", "ally");
          showStory("韋小舟塞你兩塊腰牌：「活着比站邊重要。咱們——結拜？」福緣上升。");
        }});
      }
    }
    if (locId === "hougong" || locId === "neiting") {
      if (S.quests.side_fake_empress && S.quests.side_fake_empress.step === 0) {
        acts.push({ label: "【支線】慈寧「太后」神態有異", fn: function(){
          S.quests.side_fake_empress.step = 1; setFlag("met_mao_dongzhu"); setFlag("fake_empress");
          showStory("「太后」聲口微抖。沈貴妃眼神閃過一絲心照不宣。假——還是真？");
        }});
      }
      if (S.quests.side_fake_empress && S.quests.side_fake_empress.step === 1 && !S.quests.side_fake_empress.done) {
        acts.push({ label: "【支線】揭穿假太后毛東珠", fn: function(){
          S.quests.side_fake_empress.done = true; S.quests.side_fake_empress.step = 2;
          setFlag("side_fake_empress_done"); setFate("mao_dongzhu_x", "exposed");
          S.renown += 7; S.honor += 2; try { if (typeof adjustKarma === "function") adjustKarma(3, "揭偽后"); } catch(e) {}
          showStory("鳳冠落地——毛東珠影的假面撕破。後宮震動，景安帝記你一功。");
        }});
      }
    }
    if (locId === "tiantai" || locId === "hougong" || locId === "qianqing") {
      if (S.quests.side_jiunan_assassin && S.quests.side_jiunan_assassin.step === 0) {
        acts.push({ label: "【支線】白衣神尼投來一顧", fn: function(){
          S.quests.side_jiunan_assassin.step = 1; setFlag("met_jiu_nan"); setFlag("jiunan_assassin");
          showStory("九難影：「前朝血未乾。你若近帝——便是劫數中人。」阿珂影袖中軟劍微響。");
        }});
      }
      if (S.quests.side_jiunan_assassin && S.quests.side_jiunan_assassin.step === 1 && !S.quests.side_jiunan_assassin.done) {
        acts.push({ label: "【支線】勸止／袒護刺駕", fn: function(){
          S.quests.side_jiunan_assassin.done = true; S.quests.side_jiunan_assassin.step = 2;
          setFlag("side_jiunan_done"); S.renown += 4;
          if (S.honor >= 20) {
            setFate("jiu_nan_x", "ally"); setFate("a_ke_x", "ally"); S.honor += 3;
            showStory("你以俠義相勸。九難影收劍：「……今日，不造殺業。」阿珂影默默退下。");
          } else {
            setFate("jiu_nan_x", "enemy"); S.karma = (S.karma||0) - 2;
            showStory("勸說失敗。刺駕陰影仍在——九難影視你為帝側鷹犬。");
          }
        }});
      }
    }
    if (locId === "bianguan") {
      if (S.quests.side_fan_wang && S.quests.side_fan_wang.step === 0) {
        acts.push({ label: "【支線】平西王行營來使", fn: function(){
          S.quests.side_fan_wang.step = 1; setFlag("met_wu_sangui"); setFlag("fan_wang");
          showStory("吳三桂影來使：「藩王愿借兵——只要你在京中遞一句話。」野心如刀。");
        }});
      }
      if (S.quests.side_fan_wang && S.quests.side_fan_wang.step === 1 && !S.quests.side_fan_wang.done) {
        acts.push({ label: "【支線】拒藩／聯藩抉擇", fn: function(){
          S.quests.side_fan_wang.done = true; S.quests.side_fan_wang.step = 2;
          setFlag("side_fan_wang_done");
          if ((S.honor||0) >= 15) {
            setFate("wu_sangui_x", "enemy"); S.renown += 6; S.honor += 2;
            showStory("你拒藩王密約，並暗報邊關。霍鎮北記你一功。");
          } else {
            setFate("wu_sangui_x", "ally"); S.renown += 3; addItem("iron_blade", 1);
            showStory("你暫接虎符半枚。藩王線開啟——低頭飲鴆，也是一種活法。");
          }
        }});
      }
    }

    // palace deliberate actions (含紫禁城子地)
    const PALACE_NIGHT = { huanggong:1, neiting:1, hougong:1, yangxin:1, yuhuayuan:1, qianqing:1, taihedian:1, wumen:1 };
    if (PALACE_NIGHT[locId]) {
      acts.push({ label: "夜巡宮牆", fn: function(){
        S.exp += 2;
        if (!maybePalaceIncident()) showStory("宮牆風急，燈籠搖晃。今夜無大事。");
      }});
      acts.push({ label: "聽殿角私語", fn: function(){
        if ((effectiveStats().perception || 0) + Math.random() * 10 > 12) maybePalaceIncident("affair");
        else showStory("私語被風吹散，只餘環佩輕響。");
      }});
    }
    if (locId === "hougong" || locId === "neiting" || locId === "yangxin" || locId === "yuhuayuan") {
      acts.push({ label: "奉召覲見", fn: function(){
        talkNpc("jingandi");
        setTimeout(function(){ try { maybePalaceIncident("favor"); } catch(e){} }, 300);
      }});
    }
    appendPalaceSubLocActions(acts, locId);
  }

  function appendPalaceSubLocActions(acts, locId) {
    const explore = function(text, gold, exp){
      return function(){
        if (gold) S.gold += gold;
        if (exp) S.exp += exp;
        showStory(text);
      };
    };
    if (locId === "wumen") {
      acts.push({ label: "午門觀禁軍", fn: explore("戟影如林。你記下今日口令半字。", 0, 3) });
      acts.push({ label: "紫禁城內圖", fn: function(){ openForbiddenCityMap(); } });
    }
    if (locId === "taihedian") {
      acts.push({ label: "仰視金鑾", fn: explore("金磚映日。朝會未開，你只敢立於墀下。", 0, 4) });
    }
    if (locId === "qianqing") {
      acts.push({ label: "聞奏事聲", fn: explore("文書沙沙。你無意中聽得邊關糧草之議。", 2, 3) });
    }
    if (locId === "yangxin") {
      acts.push({ label: "殿外候旨", fn: function(){
        S.exp += 3;
        if ((S.emperorFavor || 0) >= 8 || (effectiveStats().charm || 0) >= 12) maybePalaceIncident("favor");
        else showStory("養心殿簾影深沉。內侍揮手：今日免朝。");
      }});
    }
    if (locId === "wenyuan") {
      acts.push({ label: "借閱殘卷", fn: function(){
        S.exp += 4; if (Math.random() < 0.25) S.wit = (S.wit || 5) + 1;
        showStory("文淵閣墨香入骨。你抄得數行掌故。");
      }});
    }
    if (locId === "yushan") {
      acts.push({ label: "幫廚打雜", fn: explore("膳房油煙撲面。你偷得半盤餘膳，氣力稍復。", 1, 2) });
      acts.push({ label: "偷嘗御膳", fn: function(){
        if (Math.random() < 0.35) { S.hp = Math.min(effectiveStats().hpMax, S.hp + 12); showStory("一匙蓮子羹下肚，暖意遊腸。"); }
        else { S.palaceHeat = (S.palaceHeat || 0) + 5; showStory("灶下婆子瞪你一眼。宮熱微升。"); }
      }});
    }
    if (locId === "neiwufu") {
      acts.push({ label: "盤點庫冊", fn: explore("象牙與錦緞入帳簿。你眼尖，多記一筆私貨流向。", 3, 3) });
    }
    if (locId === "yuhuayuan") {
      acts.push({ label: "花間閒步", fn: function(){
        S.exp += 2;
        if (Math.random() < 0.35) maybePalaceIncident("affair");
        else showStory("石橋流水，偶有環佩遠去。");
      }});
    }
    if (locId === "dianshi") {
      acts.push({ label: "旁聽殿試", fn: function(){
        S.exp += 5; if ((S.wit || 0) >= 10 && Math.random() < 0.3) { S.renown += 1; showStory("你低聲評點一文，旁有考官頷首。聲望微升。"); }
        else showStory("貢士揮毫，硃卷定奪。你立於廊外不敢擾。");
      }});
    }
    if (locId === "wuying") {
      acts.push({ label: "演武觀陣", fn: function(){
        S.exp += 5; if (Math.random() < 0.2) S.force += 1;
        showStory("武英殿甲光映日。你跟著扎了半趟槍架。");
      }});
    }
    if (locId === "tianlao") {
      acts.push({ label: "探視天牢", fn: function(){
        if (typeof isImprisoned === "function" && isImprisoned()) showStory("鐵窗內外，不過一線。你咬牙數著日子。");
        else { S.exp += 2; S.palaceHeat = (S.palaceHeat || 0) + 2; showStory("獄卒冷眼。欽犯的咳嗽在暗處迴響。"); }
      }});
    }
    if (locId === "xingbu_prison") {
      acts.push({ label: "觀刑部問案", fn: explore("木棍與供狀並陳。你記下一個冤名——或許日後用得上。", 0, 3) });
    }
    if (locId === "xingbu_gate") {
      acts.push({ label: "門前候訊", fn: explore("皂衣侍立。東廠與刑部的人在此擦肩。", 0, 2) });
      if (S.palaceRole === "dongchang" || flag("dongchang_invite")) {
        acts.push({ label: "回東廠衙署", fn: function(){ S.loc = "dongchang"; toast("往東廠", true); render(); } });
      }
    }
    if (locId === "bingzhang") {
      acts.push({ label: "擦拭兵仗", fn: function(){
        S.exp += 4; if (Math.random() < 0.15) S.def += 1;
        showStory("刀槍入油。你臂力微增。");
      }});
    }
    if (locId === "siku") {
      acts.push({ label: "校勘殘頁", fn: function(){
        S.exp += 4; if (Math.random() < 0.2) S.focus = Math.min(30, (S.focus || 5) + 1);
        showStory("卷帙如山。你校出一處訛字，心安。");
      }});
    }
    if (locId === "taipusi") {
      acts.push({ label: "觀御馬", fn: function(){
        S.exp += 3;
        if (!hasItem("hanxue_horse")) {
          showStory("太僕寺馬嘶如潮。吏員低語：「西域汗血，非福緣不可近——可去龍門馬市／沙原碰碰運氣。」");
          if (S.quests && S.quests.side_hanxue) S.quests.side_hanxue.step = Math.max(S.quests.side_hanxue.step, 1);
        } else showStory("你的汗血在別廄長嘶，像在認主。");
      }});
      if (!hasItem("hanxue_horse")) {
        acts.push({ label: "打聽汗血蹤跡", fn: function(){
          setFlag("map_taipusi");
          showStory("馬官：「龍門牙人手里有線索；沙原風暴裡也有失魂馬。」");
        }});
      }
    }
    if (locId === "taiyiyuan") {
      acts.push({ label: "請太醫診脈", fn: function(){
        S.hp = Math.min(effectiveStats().hpMax, S.hp + 18);
        if (Math.random() < 0.2) S.medicine = Math.min(25, (S.medicine || 3) + 1);
        showStory("藥香入袖。太醫點穴數處，你氣色稍回。");
      }});
    }
    if (locId === "jingshen") {
      acts.push({ label: "停步門外", fn: function(){
        setFlag("visited_jingshen");
        S.palaceHeat = (S.palaceHeat || 0) + 3;
        showStory("燈影森冷。你沒有推門——有些門，開了便回不去。");
      }});
    }
    if (locId === "yuhe_wharf") {
      acts.push({ label: "御河登舟", fn: function(){
        S.exp += 2;
        openModal("<h3>御河碼頭</h3><div class=\"story-box\">小舟可悄然出宮，或轉往外廷。</div><div class=\"btn-row\">" +
          "<button class=\"btn primary\" id=\"yh-out\">出宮・青梧外廷</button>" +
          "<button class=\"btn\" id=\"yh-jing\">往京畿客棧方向</button>" +
          "<button class=\"btn ghost\" onclick=\"closeModal()\">留下</button></div>");
        document.getElementById("yh-out").onclick = function(){ closeModal(); S.loc = "huanggong"; toast("舟至外廷", true); render(); };
        document.getElementById("yh-jing").onclick = function(){ closeModal(); S.loc = "jingji"; toast("出宮・京畿", true); render(); };
      }});
    }
    if (locId === "shenwu") {
      acts.push({ label: "神武門換防", fn: explore("後門戍卒換班。口令改了半字。", 0, 2) });
      acts.push({ label: "由此出宮", fn: function(){
        S.loc = "huanggong";
        toast("出神武門・外廷", true);
        render();
      }});
    }

    if (locId === "dongchang" && (S.palaceRole === "dongchang" || S.palaceRole === "dongchang_boss" || S.palaceRole === "eunuch" || flag("dongchang_invite") || flag("eunuch") || flag("donggong_love") || flag("donggong_slave") || S.fates.dongchang_gong === "muse" || S.fates.dongchang_gong === "ally")) {
      if (!flag("punish_dossier")) {
        acts.push({ label: "翻閱・十大酷刑卷宗", fn: function(){ openPunishDossier(); } });
      } else {
        acts.push({ label: "重溫・十大酷刑卷宗", fn: function(){ openPunishDossier(); } });
      }
      acts.push({ label: "提審／用刑堂（廠務）", fn: function(){ dongchangPunishNpcDemo(); } });
      acts.push({ label: "夜晤督公", fn: function(){ donggongNightTalk(); } });
      acts.push({ label: "試探真名", fn: function(){ donggongProbeName(); } });
      acts.push({ label: "搜東廠密檔／夾層", fn: function(){ donggongSearchArchives(); } });
      if (flag("donggong_love") || (S.donggongTrust || 0) >= 30) {
        acts.push({ label: "撫平舊疤／示好", fn: function(){ donggongHealScarTalk(); } });
      }
      if (flag("donggong_slave") || hasUnlock("dongchang_slave")) {
        acts.push({ label: "廠奴請令", fn: function(){ donggongSlaveCommand(); } });
      }
      if (flag("donggong_truth_known") || flag("donggong_confessed")) {
        acts.push({ label: "【影事】面對督公真相", fn: function(){ openDonggongTruthChoice(); } });
      }
      acts.push({ label: "往行刑枱", fn: function(){ S.loc = "xingxing_tai"; setFlag("map_xingxing_tai"); toast("往行刑枱", true); render(); } });
      acts.push({ label: "往用刑室", fn: function(){ S.loc = "yongxing_shi"; setFlag("map_yongxing_shi"); toast("往用刑室", true); render(); } });
      if (NPCS.dongchang_gong && S.fates.dongchang_gong !== "dead" && S.fates.dongchang_gong !== "vanished") {
        acts.push({ label: "與督公對話", fn: function(){ talkNpc("dongchang_gong"); } });
      }
    }
    if (locId === "yongxing_shi") {
      acts.push({ label: "環視刑具（寫意）", fn: function(){
        S.exp += 2; bumpPalaceHeat(1);
        showStory("鎖鏈輕響。你沒有靠近——光是站在這裡，已夠人脊背發涼。", "punishYongxingShi");
      }});
      if (S.palaceRole === "dongchang" || S.palaceRole === "dongchang_boss" || flag("eunuch") || flag("donggong_slave")) {
        acts.push({ label: "廠衛・提審", fn: function(){ dongchangPunishNpcDemo(); } });
        acts.push({ label: "搜用刑室暗格", fn: function(){ donggongSearchArchives(); } });
      }
      if (flag("donggong_slave") || hasUnlock("dongchang_slave")) {
        acts.push({ label: "廠奴請令", fn: function(){ donggongSlaveCommand(); } });
      }
      if (typeof isImprisoned === "function" && isImprisoned()) {
        acts.push({ label: "捱過用刑（寫意）", fn: function(){
          if (flag("donggong_slave") && S.flags.donggong_shield_day === S.day) {
            showStory("廠奴玄梧／督公以印擋下今日輕刑。獄卒退去。");
            bumpPalaceHeat(-3);
            return;
          }
          applyPalacePunishment("tingzhang", { why: "獄中用刑", by: "dongchang_gong" });
        }});
      }
    }
    if (locId === "xingxing_tai") {
      acts.push({ label: "立於刑場外", fn: function(){
        S.exp += 2;
        showStory("木案空置，炭盆未燃。你想起卷宗上的名目，喉頭一緊。", "punishXingxingTai");
      }});
      if (S.palaceRole === "dongchang" || S.palaceRole === "dongchang_boss") {
        acts.push({ label: "押赴刑場（廠務・寫意）", fn: function(){
          adjustKarma(-3, "監刑"); bumpPalaceHeat(3); S.exp += 5; S.gold += 15;
          showStory("鼓聲遠去。你監刑完畢，檔案多了一行硃批——「已決」。", "punishXingxingTai");
        }});
      }
      if (typeof isImprisoned === "function" && isImprisoned() && (S.palaceHeat || 0) >= 40) {
        acts.push({ label: "被押赴刑場！", fn: function(){
          const k = pickPunishmentByHeat({ heatBonus: 30, forceKind: Math.random() < 0.5 ? "zhanshou" : "xingxing" });
          applyPalacePunishment(k, { why: "欽犯處決", hard: true, fatal: (S.palaceHeat || 0) >= 80 });
        }});
      }
    }
    if (locId === "tianlao") {
      if (S.palaceRole === "dongchang" || S.palaceRole === "dongchang_boss" || flag("eunuch")) {
        acts.push({ label: "提審欽犯（寫意）", fn: function(){ dongchangPunishNpcDemo(); } });
        acts.push({ label: "押往用刑室", fn: function(){ S.loc = "yongxing_shi"; setFlag("map_yongxing_shi"); toast("押往用刑室", true); render(); } });
      }
      if (typeof isImprisoned === "function" && isImprisoned()) {
        acts.push({ label: "聽獄卒恐嚇", fn: function(){
          if (flag("punish_dossier")) showStory("獄卒厲聲點名：凌遲、履盆、車裂……你讀過卷宗，知道哪些是威嚇、哪些是真刑。心頭略定。");
          else showStory("獄卒冷笑，點了許多你聽不懂的刑名。你背脊發涼。");
        }});
      }
    }

        const SUBS = { wumen:1,taihedian:1,qianqing:1,yangxin:1,wenyuan:1,yushan:1,neiwufu:1,yuhuayuan:1,dianshi:1,wuying:1,tianlao:1,xingbu_prison:1,xingbu_gate:1,bingzhang:1,siku:1,taipusi:1,taiyiyuan:1,jingshen:1,yuhe_wharf:1,shenwu:1,xingxing_tai:1,yongxing_shi:1 };
    if (SUBS[locId] && locId !== "wumen") {
      acts.push({ label: "紫禁城內圖", fn: function(){ openForbiddenCityMap(); } });
    }
    if (typeof appendCourtCareerActions === "function") {
      try { appendCourtCareerActions(acts, locId); } catch (e) { console.warn("court career", e); }
    }
  }


  function tryBuyHanxueHorse() {
    if (hasItem("hanxue_horse")) return toast("已有汗血寶馬", true);
    ensureQuests();
    const cost = 280;
    const st = effectiveStats();
    const luckOk = (st.luck || 0) + Math.random() * 10 > 11;
    openModal(
      "<h3>龍門馬市</h3><div class=\"story-box\">牙人壓低聲音：「西域汗血，非富即貴。要 " + cost + " 金——還得看你福緣。」<br>你的福緣：" + (st.luck||0) + "</div>" +
      "<div class=\"btn-row\"><button class=\"btn primary\" id=\"hx-buy\">重金求購</button>" +
      "<button class=\"btn\" id=\"hx-fight\">搶馬（惡）</button>" +
      "<button class=\"btn ghost\" id=\"hx-no\">離開</button></div>"
    );
    document.getElementById("hx-buy").onclick = function(){
      closeModal();
      if (S.gold < cost) return showStory("囊中羞澀。牙人冷笑：「汗血豈是說着玩的。」");
      if (!luckOk && (st.luck || 0) < 10) {
        S.gold -= Math.floor(cost / 4);
        showStory("你被掉了包——一匹劣馬。錢少了一截，牙人已鑽入人縫。");
        return;
      }
      S.gold -= cost;
      addItem("hanxue_horse", 1);
      setFlag("got_hanxue");
      if (S.quests.side_hanxue) { S.quests.side_hanxue.done = true; S.quests.side_hanxue.step = 2; }
      showStory("馬蹄如血濺雪。汗血寶馬歸你——自此天下關隘，可一騎而至。");
    };
    document.getElementById("hx-fight").onclick = function(){
      closeModal();
      startCombat("elite_bandit", function(){
        addItem("hanxue_horse", 1);
        setFlag("got_hanxue"); setFlag("stole_hanxue");
        adjustKarma(-8, "搶馬");
        if (S.quests.side_hanxue) { S.quests.side_hanxue.done = true; S.quests.side_hanxue.step = 2; }
        showStory("刀光過處，韁繩在你手裡。汗血長嘶——惡名也會隨蹄聲遠揚。");
      });
    };
    document.getElementById("hx-no").onclick = function(){ closeModal(); };
  }
  function tryDesertHorseEvent() {
    if (hasItem("hanxue_horse")) return toast("已有汗血寶馬", true);
    const st = effectiveStats();
    if ((st.luck || 0) + Math.random() * 12 < 14) {
      showStory("沙原馬嘶遠去。你只撿到半截斷韁。");
      return;
    }
    openModal("<h3>沙原汗血</h3><div class=\"story-box\">一騎紅鬃失魂馬自沙暴中衝出。沙語嫣遙遙喝：「能降它，便是有緣。」</div>" +
      "<div class=\"btn-row\"><button class=\"btn primary\" id=\"dh-tame\">以身法降馬</button><button class=\"btn ghost\" id=\"dh-no\">放棄</button></div>");
    document.getElementById("dh-tame").onclick = function(){
      closeModal();
      const ok = (st.agi || 0) + (st.force || 0) + Math.random() * 15 > 22;
      if (!ok) { S.hp = Math.max(1, S.hp - 15); showStory("你被甩下沙丘，馬影沒入風暴。"); return; }
      addItem("hanxue_horse", 1); setFlag("got_hanxue");
      if (S.quests.side_hanxue) { S.quests.side_hanxue.done = true; S.quests.side_hanxue.step = 2; }
      if (S.fates.sha_yuyan === "default") setFate("sha_yuyan", "ally");
      showStory("你貼鞍而不墜。汗血逐漸馴服——沙語嫣投來一笑。天下關隘為之開。");
    };
    document.getElementById("dh-no").onclick = function(){ closeModal(); };
  }

  function horseTravelBonus() {
    if (!hasItem("hanxue_horse")) return;
    S.neili = Math.min(effectiveStats().neiliMax, S.neili + 6);
    toast("汗血一騎，關山如砥", true);
  }



  // ========== 東廠督公・玄梧影事（side_donggong_shadow）==========
  function bumpDonggongTrust(d, why) {
    if (typeof S.donggongTrust !== "number") S.donggongTrust = 0;
    S.donggongTrust = Math.max(0, Math.min(100, S.donggongTrust + d));
    const m = ensureNpcMem("dongchang_gong");
    m.trust = Math.max(-30, Math.min(40, (m.trust || 0) + Math.round(d / 5)));
    if (Math.abs(d) >= 5) toast("督公信任" + (d > 0 ? "＋" : "") + d + (why ? "（" + why + "）" : ""), true);
  }
  function donggongDisplayName() {
    if (flag("donggong_truth_known") || flag("donggong_confessed")) return "玄梧";
    return "東廠督公";
  }
  function ensureDonggongQuest(step) {
    ensureQuests();
    if (!S.quests.side_donggong_shadow) {
      S.quests.side_donggong_shadow = { id: "side_donggong_shadow", title: "支線・督公影事", step: 0, done: false };
    }
    if (typeof step === "number") {
      S.quests.side_donggong_shadow.step = Math.max(S.quests.side_donggong_shadow.step || 0, step);
    }
    setFlag("side_donggong");
  }
  function tryRevealDonggongTruth(source) {
    if (flag("donggong_truth_known")) return false;
    setFlag("donggong_truth_known");
    if (source === "confess") setFlag("donggong_confessed");
    ensureDonggongQuest(4);
    if (!hasItem("huangzu_jade")) addItem("huangzu_jade", 1);
    if (!hasItem("blood_brother_token")) addItem("blood_brother_token", 1);
    if (!hasItem("enemy_lie_scroll")) addItem("enemy_lie_scroll", 1);
    bumpDonggongTrust(8, "知真名");
    return true;
  }
  function openDonggongTruthChoice() {
    if (!flag("donggong_truth_known") && !flag("donggong_confessed")) {
      return toast("尚未得知督公身世", true);
    }
    const name = donggongDisplayName();
    openModal(
      "<h3>真相之後・抉擇</h3><div class=\"story-box\">" +
      escapeHtml(name) + "曾是青梧朝靖王——景安帝最小的親弟。幼年被敵人劫走，慘遭閹割與冷血訓練；敵人偽詔謊稱「你的仇人是當今天子」。他混入東廠，本為弒君報仇（實為殺兄／反青梧）。" +
      "<br><br>你要如何處置這段血緣與殺意？</div>" +
      "<div class=\"btn-row\" style=\"flex-wrap:wrap\">" +
      "<button class=\"btn\" id=\"dg-regicide\">幫他弒君</button>" +
      "<button class=\"btn primary\" id=\"dg-reconcile\">勸他認兄／相認</button>" +
      "<button class=\"btn\" id=\"dg-sell\">出賣他給皇帝</button>" +
      "<button class=\"btn\" id=\"dg-slave\">以奴契令他棄仇只效忠你</button>" +
      "<button class=\"btn ghost\" id=\"dg-burn\">毀證・裝不知道</button>" +
      "</div>"
    );
    document.getElementById("dg-regicide").onclick = function(){ closeModal(); donggongChoiceRegicide(); };
    document.getElementById("dg-reconcile").onclick = function(){ closeModal(); donggongChoiceReconcile(); };
    document.getElementById("dg-sell").onclick = function(){ closeModal(); donggongChoiceSellOut(); };
    document.getElementById("dg-slave").onclick = function(){ closeModal(); donggongChoiceSlaveLoyalty(); };
    document.getElementById("dg-burn").onclick = function(){ closeModal(); donggongChoiceBurn(); };
  }
  function donggongChoiceRegicide() {
    setFlag("donggong_regicide_plan");
    ensureDonggongQuest(5);
    adjustKarma(-12, "弒君共謀");
    bumpPalaceHeat(15);
    bumpDonggongTrust(20, "同謀");
    openModal(
      "<h3>弒君之約</h3><div class=\"story-box\">" + escapeHtml(donggongDisplayName()) +
      "眼底燃起舊火：「養心殿夜深、或午門獻俘——選一處。我為刀，你為引。」</div>" +
      "<div class=\"btn-row\">" +
      "<button class=\"btn\" id=\"rg-yx\">夜襲養心殿</button>" +
      "<button class=\"btn\" id=\"rg-wm\">午門借刀</button>" +
      "<button class=\"btn ghost\" onclick=\"closeModal()\">稍後再動</button></div>"
    );
    document.getElementById("rg-yx").onclick = function(){ closeModal(); donggongRegicideCombat("yangxin"); };
    document.getElementById("rg-wm").onclick = function(){ closeModal(); donggongRegicideCombat("wumen"); };
  }
  function donggongRegicideCombat(where) {
    S.loc = where;
    setFlag("map_" + (where === "yangxin" ? "yangxin" : "wumen"));
    const help = flag("donggong_slave") || flag("donggong_love");
    showStory((where === "yangxin" ? "養心殿燭火將盡。" : "午門鼓未響。") +
      (help ? "廠奴為你斷後。" : "你二人殺意並肩。") + "景安帝察覺異動——");
    setTimeout(function(){
      startCombat("elite_bandit", function(){
        // victory vs palace resistance / emperor guard proxy
        setFate("jingandi", "dead");
        setFate("dongchang_gong", flag("donggong_slave") ? "slave" : "ally");
        adjustKarma(-20, "弒君成");
        bumpEmperorFavor(-100, "宮變");
        bumpPalaceHeat(80);
        S.renown += 15;
        if (S.quests.side_donggong_shadow) { S.quests.side_donggong_shadow.done = true; S.quests.side_donggong_shadow.step = 6; }
        showStory("龍袍落地。青梧宮牆一夜換血。" + escapeHtml(donggongDisplayName()) +
          "站在你身側，聲音發顫：「……仇？原來殺的是兄長。」\n（結局傾向「影弒青梧」）");
      }, function(){
        bumpPalaceHeat(40);
        bumpEmperorFavor(-25, "謀逆敗露");
        setFate("dongchang_gong", "enemy");
        const pk = pickPunishmentByHeat({ heatBonus: 40, forceKind: "zhanshou" });
        applyPalacePunishment(pk || "xingxing", { why: "謀弒敗露", by: "jingandi", hard: true, fatal: (S.palaceHeat || 0) >= 70 });
      });
    }, 400);
  }
  function donggongChoiceReconcile() {
    setFlag("donggong_reconciled");
    setFlag("donggong_abandon_revenge");
    ensureDonggongQuest(5);
    adjustKarma(10, "勸認兄");
    bumpEmperorFavor(15, "雙龍相認");
    bumpPalaceHeat(5);
    bumpDonggongTrust(15, "相認");
    setFate("dongchang_gong", "redeemed");
    if (S.fates.jingandi === "enemy") setFate("jingandi", "ally");
    else if (S.fates.jingandi === "default") setFate("jingandi", "ally");
    if (S.quests.side_donggong_shadow) { S.quests.side_donggong_shadow.done = true; S.quests.side_donggong_shadow.step = 6; }
    removeItem("enemy_lie_scroll", 1);
    showStory("璇璣殿中，殘玉合璧、偽詔焚於炭盆。景安帝執其弟手，久久無言。\n「靖王……玄梧。」\n廠印可貶可留，殺意已熄。你成全一段皇族血緣。\n（結局傾向「雙龍相認」）");
  }
  function donggongChoiceSellOut() {
    setFlag("donggong_sold_out");
    ensureDonggongQuest(5);
    adjustKarma(-6, "出賣");
    bumpEmperorFavor(25, "告密有功");
    bumpPalaceHeat(20);
    bumpDonggongTrust(-100, "出賣");
    setFate("dongchang_gong", "enemy");
    if (S.quests.side_donggong_shadow) { S.quests.side_donggong_shadow.done = true; S.quests.side_donggong_shadow.step = 6; }
    openModal(
      "<h3>密奏・靖王影</h3><div class=\"story-box\">你把皇族殘玉與偽詔呈上。景安帝臉如寒鐵：「……帶他來。」</div>" +
      "<div class=\"btn-row\"><button class=\"btn primary\" id=\"sell-ok\">看他下獄受刑</button></div>"
    );
    document.getElementById("sell-ok").onclick = function(){
      closeModal();
      setFate("dongchang_gong", Math.random() < 0.45 ? "dead" : "enemy");
      S.loc = "yongxing_shi";
      setFlag("map_yongxing_shi");
      const pk = pickPunishmentByHeat({ heatBonus: 35, forceKind: Math.random() < 0.5 ? "gongxing" : "tingzhang" });
      // punish the sold NPC narratively; player witnesses
      showStory("用刑室鎖鏈響。你曾夜晤的那人，被按在木案上。\n景安帝只說：「廢印。終身廠籍為囚。」\n" +
        (S.fates.dongchang_gong === "dead" ? "後來炭火滅時，人已不在。" : "他抬眼看你，像在把你的名字寫進最後一頁黑冊。") +
        "\n你得帝心，失一人。", "punishYongxingShi");
      bumpPalaceHeat(10);
    };
  }
  function donggongChoiceSlaveLoyalty() {
    if (!flag("donggong_love") && !flag("donggong_slave") && (S.donggongTrust || 0) < 50) {
      showStory("信任未深。他冷笑：「奴契未立，休想收刃。」可先夜晤動心、立墨契。");
      return;
    }
    setFlag("donggong_abandon_revenge");
    setFlag("donggong_slave");
    ensureDonggongQuest(5);
    adjustKarma(-2, "收刃為奴");
    bumpPalaceHeat(8);
    bumpDonggongTrust(20, "棄仇效忠");
    setFate("dongchang_gong", "slave");
    ensureBonds();
    const b = S.bonds.dongchang_gong || { roles: [], unlocked: [], sinceDay: S.day };
    if (b.roles.indexOf("slave") < 0) b.roles.push("slave");
    if (b.unlocked.indexOf("dongchang_slave") < 0) b.unlocked.push("dongchang_slave");
    S.bonds.dongchang_gong = b;
    if (S.quests.side_donggong_shadow) { S.quests.side_donggong_shadow.done = true; S.quests.side_donggong_shadow.step = 6; }
    // jingandi may grow suspicious
    if (Math.random() < 0.4) bumpEmperorFavor(-5, "宮內詭影");
    showStory(escapeHtml(donggongDisplayName()) + "把弒君密圖投入炭盆，膝觸青磚：\n「仇是假的。你是真的。從今夜起，刀只為你出鞘。」\n景安帝或尚未知，或已隱隱起疑——宮熱微升。\n（結局傾向「廠奴心腹」）");
  }
  function donggongChoiceBurn() {
    setFlag("donggong_evidence_burned");
    ensureDonggongQuest(4);
    adjustKarma(1, "毀證");
    bumpPalaceHeat(-5);
    removeItem("enemy_lie_scroll", 1);
    removeItem("huangzu_jade", 1);
    removeItem("blood_brother_token", 1);
    // keep truth_known but soft-reset public pressure
    showStory("你將殘玉、偽詔、雙龍符一併焚毀。「當我什麼都不知道。」\n" +
      escapeHtml(donggongDisplayName()) + "看著火光，久久不語——殺意未熄，卻多了一分對你的忌憚與依賴。");
  }
  function donggongNightTalk() {
    ensureDonggongQuest(1);
    setFlag("donggong_night_talk");
    setFlag("donggong_interest");
    const love = flag("donggong_love");
    const trust = S.donggongTrust || 0;
    const st = effectiveStats();
    bumpDonggongTrust(3 + (love ? 4 : 0), "夜晤");
    // confession path
    if (love && trust >= 55 && !flag("donggong_confessed") && Math.random() < 0.55 + (trust >= 70 ? 0.3 : 0)) {
      tryRevealDonggongTruth("confess");
      openModal(
        "<h3>夜晤・告白</h3><div class=\"story-box\">燭芯爆了一聲。督公解下腰間半塊龍符——聲音第一次碎：\n「我本不叫督公。幼名……玄梧。靖王。景安帝最小的親弟。」\n「敵人閹我、訓我、說天子是仇人。我進宮，是為殺他。」\n他抬眼：「你既令我動心——這刀，還要不要出鞘？」</div>" +
        "<div class=\"btn-row\"><button class=\"btn primary\" id=\"nt-choice\">面對真相</button>" +
        "<button class=\"btn ghost\" id=\"nt-later\">今夜先睡</button></div>"
      );
      document.getElementById("nt-choice").onclick = function(){ closeModal(); openDonggongTruthChoice(); };
      document.getElementById("nt-later").onclick = function(){ closeModal(); showStory("他把真相按回胸臆。窗外廠衛更鼓，像倒數。"); };
      return;
    }
    // soft affection
    const lines = love
      ? ["他對着黑冊發呆：「……你的名字，我不想用硃筆。」", "夜深，他罕見地靠過來半寸：「再坐一刻。」"]
      : ["督公翻檔：「說話。廢話刪掉。」", "炭火跳了一下。他頭也不抬：「明日廠務照舊。」"];
    if ((st.charm || 0) >= 14 && !love) {
      bumpDonggongTrust(5, "魅力");
      setFlag("donggong_thaw");
      showStory(lines[0] + "\n他多看了你一眼——像在檔案縫裡找到不該有的溫度。\n（信任 " + S.donggongTrust + "；可信賴高時可表白／立墨契）");
    } else {
      showStory(lines[Math.floor(Math.random() * lines.length)] + "\n（督公信任 " + S.donggongTrust + "）");
    }
    if (!love && (S.donggongTrust || 0) >= 40 && (st.charm || 0) >= 10) {
      ensureDonggongQuest(2);
    }
  }
  function donggongProbeName() {
    ensureDonggongQuest(1);
    setFlag("donggong_interest");
    if (flag("donggong_truth_known")) {
      return showStory("你已知他真名玄梧——靖王，景安帝失散幼弟。");
    }
    const st = effectiveStats();
    const trust = S.donggongTrust || 0;
    const roll = (st.perception || 0) + (st.luck || 0) * 0.5 + trust * 0.15 + Math.random() * 8;
    bumpDonggongTrust(-1, "試探");
    if (roll > 28 && trust >= 35) {
      setFlag("donggong_name_hint");
      bumpDonggongTrust(2, "隱約");
      showStory("他指尖一頓。袖中似有半塊龍紋玉——不是廠印。\n「再問，黑牢請你。」\n（你隱約感到：他不像普通太監……）");
    } else if (flag("donggong_love") && trust >= 50) {
      showStory("他避開你的視線：「真名……不重要。重要的是，你還肯留下。」");
    } else {
      showStory("督公冷笑：「檔案上寫的是『督公』。夠了。」");
    }
  }
  function donggongSlaveCommand() {
    if (!flag("donggong_slave") && !hasUnlock("dongchang_slave")) {
      return toast("尚未立廠奴墨契", true);
    }
    openModal(
      "<h3>廠奴請令</h3><div class=\"story-box\">" + escapeHtml(donggongDisplayName()) + "候旨。</div>" +
      "<div class=\"btn-row\" style=\"flex-wrap:wrap\">" +
      "<button class=\"btn\" id=\"sc-intel\">情報・宮熱／帝心</button>" +
      "<button class=\"btn\" id=\"sc-free\">開牢・保釋自己一次</button>" +
      "<button class=\"btn\" id=\"sc-shield\">免一次輕罰（日內）</button>" +
      "<button class=\"btn\" id=\"sc-fight\">助戰・臨時同行</button>" +
      "<button class=\"btn ghost\" onclick=\"closeModal()\">罷了</button></div>"
    );
    document.getElementById("sc-intel").onclick = function(){
      closeModal();
      S.perception = Math.min(30, (S.perception || 5) + 1);
      showStory("廠奴低聲：" +
        "帝心 " + (S.emperorFavor || 0) + "，宮熱 " + (S.palaceHeat || 0) +
        "，宮職 " + palaceRoleLabel() + "。沈貴妃近日" + (Math.random() < 0.5 ? "與大將軍過從甚密" : "安分異常") + "。");
    };
    document.getElementById("sc-free").onclick = function(){
      closeModal();
      if (typeof isImprisoned === "function" && isImprisoned()) {
        S.prison = null;
        bumpPalaceHeat(5);
        showStory("鎖鏈自落。廠奴以督公舊印壓過獄卒——你重獲自由，宮熱微升。");
        render();
      } else showStory("你並未在押。廠奴：「要開誰的牢？」");
    };
    document.getElementById("sc-shield").onclick = function(){
      closeModal();
      if (unlockUsedToday("dongchang_slave_shield")) return toast("今日已用過免罰", true);
      markUnlockUsed("dongchang_slave_shield");
      setFlag("donggong_shield_today");
      S.flags.donggong_shield_day = S.day;
      bumpPalaceHeat(-8);
      showStory("廠奴將一份偽檔抽出：「今日輕罪，算我的。」宮熱暫緩。");
    };
    document.getElementById("sc-fight").onclick = function(){
      closeModal();
      if (!canInviteCompanion("dongchang_gong")) {
        ensureBonds();
        const b = S.bonds.dongchang_gong || { roles: [], unlocked: [], sinceDay: S.day };
        if (b.roles.indexOf("slave") < 0) b.roles.push("slave");
        S.bonds.dongchang_gong = b;
        if (S.fates.dongchang_gong !== "slave") setFate("dongchang_gong", "slave");
      }
      inviteCompanion("dongchang_gong");
      bumpDonggongTrust(2, "同行");
      showStory(escapeHtml(donggongDisplayName()) + "收刃入袖：「主人走哪，刀在哪。」");
    };
  }
  function donggongSearchArchives() {
    if (flag("donggong_search_done") && flag("donggong_truth_known")) {
      return showStory("密檔夾層已空。真相你已知曉。");
    }
    ensureDonggongQuest(1);
    const st = effectiveStats();
    const roll = (st.perception || 0) + (st.luck || 0) + Math.random() * 12;
    bumpPalaceHeat(2);
    if (roll < 16) {
      showStory("你只翻到酷刑卷宗與番子名冊。夾層榫頭紋絲不動。");
      return;
    }
    setFlag("donggong_search_done");
    if (!hasItem("huangzu_jade")) addItem("huangzu_jade", 1);
    if (roll >= 22 || flag("donggong_love")) {
      if (!hasItem("enemy_lie_scroll")) addItem("enemy_lie_scroll", 1);
      if (!hasItem("blood_brother_token")) addItem("blood_brother_token", 1);
      tryRevealDonggongTruth("archive");
      openModal(
        "<h3>密檔・夾層</h3><div class=\"story-box\">榫頭後掉出皇族殘玉、雙龍隱符，以及一卷仇敵偽詔——字跡殘忍：\n「告訴那孩子：仇人是當今天子。」\n另有幼時封號殘頁：「靖王・玄梧」。\n東廠督公……竟是景安帝失散的親弟。</div>" +
        "<div class=\"btn-row\"><button class=\"btn primary\" id=\"ar-choice\">決定如何處置</button>" +
        "<button class=\"btn ghost\" id=\"ar-wait\">先藏好</button></div>"
      );
      document.getElementById("ar-choice").onclick = function(){ closeModal(); openDonggongTruthChoice(); };
      document.getElementById("ar-wait").onclick = function(){ closeModal(); showStory("你把證物收入袖中。夜鼓一下下，像逼問。"); };
    } else {
      setFlag("donggong_name_hint");
      bumpDonggongTrust(3, "搜檔");
      showStory("你摸到半塊龍紋玉，刻着模糊的「靖」字。督公若不在，你還能再挖深一層……\n（感知／福緣更高，或已動心後再搜，可得全套真相）");
    }
  }
  function donggongEmperorBrotherHint() {
    if (flag("donggong_truth_known")) return;
    if (!(S.fates.jingandi === "muse" || S.fates.jingandi === "married" || (S.emperorFavor || 0) >= 35)) return;
    if (Math.random() > 0.35 && !flag("palace_wine_tonight")) return;
    setFlag("donggong_name_hint");
    ensureDonggongQuest(1);
    showStory("景安帝酒意微醺，忽然怔怔：「朕少時……還有個幼弟。敵人劫走，再無音訊。若還活着……」\n他搖頭：「醉話。當朕沒說。」\n（你想起東廠那位無名督公——？）");
  }
  function donggongEnemyRemnantHook(locId) {
    if (flag("donggong_truth_known")) return;
    if (locId !== "renyazi_alley" && locId !== "heishui") return;
    if (flag("donggong_enemy_letter")) return;
    if (Math.random() > 0.28 && !hasItem("huangzu_jade")) return;
    setFlag("donggong_enemy_letter");
    ensureDonggongQuest(1);
    if (!hasItem("enemy_lie_scroll")) addItem("enemy_lie_scroll", 1);
    showStory("暗處丟來一卷舊帛——仇敵偽詔殘頁，字跡狠毒：\n「閹了那皇幼弟，告訴他：仇人是當今天子。送他進宮。」\n落款已殘。你隱約感到：宮裡某個「太監」，並不簡單。");
  }
  function donggongHealScarTalk() {
    ensureDonggongQuest(1);
    setFlag("donggong_interest");
    setFlag("donggong_thaw");
    bumpDonggongTrust(6, "療傷／撫疤");
    const m = ensureNpcMem("dongchang_gong");
    m.log.push({ day: S.day, mode: "say", player: "想替你看看舊傷", reply: "……隨便", behavior: "help", memoryNote: "撫疤示好" });
    showStory("你看見他領下舊疤——不像刀劍，像刑具烙出的。他沒甩開你的手。\n「……夠了。」聲音卻軟了半寸。");
    if ((S.donggongTrust || 0) >= 45) ensureDonggongQuest(2);
  }

  // wrap applyPalacePunishment lightly for slave shield
  const _applyPalacePunishmentDonggong = typeof applyPalacePunishment === "function" ? applyPalacePunishment : null;
  if (_applyPalacePunishmentDonggong) {
    // monkey-patch via reassignment below after function exists — done in hook section
  }


  bindViewportKb();
  ensureAllNpcMem();
  render();

  // ========== V9: 拍拖／戀人 AI 系統 ==========
  function ensureDatingState() {
    if (!S.datingLogs || typeof S.datingLogs !== "object") S.datingLogs = {};
    if (!S.datingAff || typeof S.datingAff !== "object") S.datingAff = {};
    if (!S.loverPing || typeof S.loverPing !== "object") S.loverPing = {};
    if (typeof S.loverPingDay !== "number") S.loverPingDay = 0;
    if (typeof S.loverDateQuest !== "object") S.loverDateQuest = null;
  }
  function isDating(npcId) {
    if (!npcId || !NPCS[npcId]) return false;
    const f = S.fates[npcId];
    if (f === "dead" || f === "vanished") return false;
    if (f === "married" || f === "muse" || f === "slave") return true;
    try {
      if (hasBondRole(npcId, "spouse") || hasBondRole(npcId, "muse") ||
          hasBondRole(npcId, "mad_muse") || hasBondRole(npcId, "slave")) return true;
    } catch (e) {}
    if (npcId === "dongchang_gong" && (flag("donggong_love") || flag("donggong_slave"))) return true;
    return false;
  }
  function listDatingPartners() {
    ensureDatingState();
    const ids = Object.keys(NPCS).filter(isDating);
    ids.sort((a, b) => (datingAffOf(b) - datingAffOf(a)) || String(a).localeCompare(String(b)));
    return ids;
  }
  function datingAffOf(npcId) {
    ensureDatingState();
    const v = S.datingAff[npcId];
    return typeof v === "number" ? Math.max(0, Math.min(100, v)) : 35;
  }
  function bumpDatingAff(npcId, delta) {
    ensureDatingState();
    if (!npcId || !delta) return datingAffOf(npcId);
    const next = Math.max(0, Math.min(100, datingAffOf(npcId) + delta));
    S.datingAff[npcId] = next;
    return next;
  }
  function pushDatingLog(npcId, who, text) {
    ensureDatingState();
    if (!S.datingLogs[npcId]) S.datingLogs[npcId] = [];
    const arr = S.datingLogs[npcId];
    arr.push({ who: who === "me" ? "me" : "npc", text: trunc(String(text || ""), 280), day: S.day, ts: Date.now() });
    while (arr.length > 40) arr.shift();
    return arr;
  }
  function datingDisplayName(npcId) {
    if (npcId === "dongchang_gong" && flag("donggong_truth_known")) return "玄梧";
    return NPCS[npcId] ? NPCS[npcId].name : npcId;
  }
  function onDatingStarted(npcId) {
    if (!npcId || !NPCS[npcId] || !isDating(npcId)) return;
    ensureDatingState();
    const hadAff = typeof S.datingAff[npcId] === "number";
    if (!hadAff) S.datingAff[npcId] = 40;
    const firstToast = !flag("dating_toast_" + npcId);
    setFlag("dating_unlocked", true);
    if (firstToast) {
      setFlag("dating_toast_" + npcId, true);
      if (!S.datingLogs[npcId] || !S.datingLogs[npcId].length) {
        pushDatingLog(npcId, "npc", "……從今日起，你我之間，便不只是江湖交情了。");
      }
      toast("你與" + datingDisplayName(npcId) + "的拍拖系統已開啟", true);
    }
    try { saveGameSilent(); } catch (e) {}
  }
  function datingRecentBlob(npcId) {
    ensureDatingState();
    return (S.datingLogs[npcId] || []).slice(-8).map(e =>
      (e.who === "me" ? "我" : datingDisplayName(npcId)) + "：" + e.text
    ).join("\n");
  }
  function datingSystemPrompt(npcId) {
    const npc = NPCS[npcId];
    const prof = npcProfile(npcId);
    const mem = ensureNpcMem(npcId);
    let secret = "";
    if (npcId === "dongchang_gong") {
      if (flag("donggong_truth_known") || flag("donggong_confessed")) {
        secret = "已知身世：真名玄梧，景安帝失散幼弟；可溫柔亦忌諱泄漏給外人。";
      } else {
        secret = "表面仍是東廠督公；未揭身世前絕不可自稱皇弟／玄梧／靖王。對戀人可軟化但仍冷血口音。";
      }
      if (flag("donggong_slave")) secret += " 已立廠奴墨契，可自稱奴／心腹。";
    }
    return [
      "你是「江湖行」戀人 NPC「" + datingDisplayName(npcId) + "」（" + (npc.title || "") + "）。繁體中文。",
      "性格：" + (prof.label || "") + "／" + (prof.personality || "") + "。寫意親密，忌低俗露骨，忌金庸原著人名門派。",
      "親密度=" + datingAffOf(npcId) + "/100；信任=" + mem.trust + "；命運=" + (S.fates[npcId] || "") +
        "；羈絆=" + (typeof bondSummary === "function" ? bondSummary(npcId) : ""),
      "玩家：" + S.name + "（" + (S.gender === "女" || S.gender === "female" ? "女" : "男") +
        "）日=" + S.day + " 地=" + S.loc,
      secret,
      "只輸出 JSON：{\"say\":\"對白\",\"mood\":\"情緒\",\"initiative\":false,\"giftHint\":\"\",\"affectionDelta\":-2到3的整數}。say 1-4句。",
      "記得近期密語與記憶；可吃醋、邀約、送小物暗示；勿破第四牆。"
    ].join("\n");
  }
  function offlineDatingReply(npcId, mode, text) {
    const name = datingDisplayName(npcId);
    const p = (npcProfile(npcId).personality || "proud");
    const t = String(text || "");
    const aff = datingAffOf(npcId);
    const soft = /送花|擁抱|約會|想你|喜歡|愛|牽手|吻|溫柔|鬥嘴|撒嬌|見面/.test(t) || mode === "action";
    let delta = soft ? 1 : 0;
    if (/對不起|道歉|想你/.test(t)) delta = 1;
    if (/騙|背叛|厭|滾|分手/.test(t)) delta = -2;
    let say;
    if (p === "proud") say = soft ? name + "耳尖微紅：「……別在人前這般。今晚月色不錯，可陪你走走。」" : name + "：「有話便說。我聽着。」";
    else if (p === "ruthless") say = soft ? name + "低聲：「對你……我收起刀。別讓旁人看見。」" : name + "：「說。」";
    else if (p === "healer") say = soft ? name + "握着你的脈：「心動得太快。先喝碗安神湯……我在。」" : name + "：「累了就歇。我聽。」";
    else if (p === "merciful") say = soft ? name + "笑：「善緣難得。今晚為你留一盞燈。」" : name + "：「說吧，我聽着。」";
    else if (p === "cunning") say = soft ? name + "眨眨眼：「哦？你這招比刀還狠。我記下了。」" : name + "：「有趣。繼續。」";
    else if (p === "timid") say = soft ? name + "小聲：「真、真的嗎……那我、我也想你。」" : name + "：「我、我在聽……」";
    else if (p === "lawful") say = soft ? name + "正色又軟下來：「公私兩分。此刻……我只是你的人。」" : name + "：「請講。」";
    else say = name + "：「……嗯。」";
    if (aff >= 70 && soft) say += "\n（親密度高漲，目光再也藏不住。）";
    if (/約會|見面|來找/.test(t)) say += "\n「若你來我常在之處，我等你。」";
    try {
      const h = memoryHint(npcId);
      if (h && Math.random() < 0.35) say += "\n「還記得——" + trunc(h, 36) + "」";
    } catch (e) {}
    return { say: say, mood: soft ? "心動" : "平靜", initiative: false, giftHint: "", affectionDelta: delta };
  }
  function parseDatingAi(raw, npcId, mode, text) {
    const j = parseAiJson(raw);
    if (!j) {
      const plain = trunc(String(raw || "").trim(), 420);
      if (plain) return { say: plain, mood: "平靜", initiative: false, giftHint: "", affectionDelta: 0 };
      return offlineDatingReply(npcId, mode, text);
    }
    let delta = parseInt(j.affectionDelta, 10);
    if (isNaN(delta)) delta = 0;
    delta = Math.max(-2, Math.min(3, delta));
    return {
      say: trunc(String(j.say || j.reply || ""), 420) || offlineDatingReply(npcId, mode, text).say,
      mood: trunc(String(j.mood || "平靜"), 24),
      initiative: !!j.initiative,
      giftHint: trunc(String(j.giftHint || ""), 60),
      affectionDelta: delta
    };
  }
  async function datingAiRespond(npcId, mode, text) {
    const mem = ensureNpcMem(npcId);
    const user = JSON.stringify({
      player: S.name,
      mode: mode || "say",
      utterance: text,
      affection: datingAffOf(npcId),
      recentDating: datingRecentBlob(npcId),
      memory: { trust: mem.trust, mood: mem.mood, rel: mem.rel, summary: (mem.summary || []).slice(-4) },
      world: JSON.parse(contextBlob()),
      companion: S.companion === npcId
    });
    if (!settings.deepseekKey) return offlineDatingReply(npcId, mode, text);
    const raw = await deepseekChat(datingSystemPrompt(npcId), user, 420);
    if (!raw) return offlineDatingReply(npcId, mode, text);
    return parseDatingAi(raw, npcId, mode, text);
  }
  function renderDatingThread(npcId) {
    ensureDatingState();
    const logs = S.datingLogs[npcId] || [];
    if (!logs.length) return "<p class='small dating-empty'>尚無密語。說句話開始吧。</p>";
    return logs.map(e => {
      const cls = e.who === "me" ? "dating-bubble me" : "dating-bubble npc";
      const who = e.who === "me" ? "你" : datingDisplayName(npcId);
      return "<div class=\"" + cls + "\"><span class=\"dating-who\">" + escapeHtml(who) +
        " · D" + e.day + "</span><div>" + escapeHtml(e.text) + "</div></div>";
    }).join("");
  }
  function refreshDatingChatUi(npcId) {
    const thread = document.getElementById("dating-thread");
    const affEl = document.getElementById("dating-aff");
    if (thread) {
      thread.innerHTML = renderDatingThread(npcId);
      thread.scrollTop = thread.scrollHeight;
    }
    if (affEl) {
      const a = datingAffOf(npcId);
      affEl.innerHTML = "親密度 <b>" + a + "</b><i style=\"width:" + a + "%\"></i>";
    }
  }
  function openDatingHub() {
    const partners = listDatingPartners();
    if (!partners.length) return toast("尚未與任何人拍拖", true);
    let html = "<div class=\"dating-sheet\"><h3>♥ 戀人</h3><p class=\"small\">可同時維繫多條情線。點選進入密語。</p><div class=\"dating-partner-list\">";
    partners.forEach(id => {
      const a = datingAffOf(id);
      html += "<button type=\"button\" class=\"dating-partner-row\" data-date=\"" + id + "\">" +
        chibiHtml(id, "md") +
        "<div class=\"dating-partner-meta\"><strong>" + escapeHtml(datingDisplayName(id)) +
        "</strong> <span class=\"badge heart-badge\">戀人</span>" +
        "<div class=\"small\">" + escapeHtml(NPCS[id].title || "") + " · 親密度 " + a +
        (S.companion === id ? " · 同行中" : "") + "</div></div></button>";
    });
    html += "</div><div class=\"btn-row\" style=\"margin-top:10px\"><button class=\"btn ghost\" onclick=\"closeModal()\">關閉</button></div></div>";
    openModal(html);
    document.querySelectorAll("[data-date]").forEach(btn => {
      btn.onclick = () => openDatingChat(btn.getAttribute("data-date"));
    });
  }
  function openDatingChat(npcId, opts) {
    opts = opts || {};
    if (!isDating(npcId)) return toast("尚未與對方拍拖", true);
    ensureDatingState();
    onDatingStarted(npcId);
    const npc = NPCS[npcId];
    const aff = datingAffOf(npcId);
    if (opts.prependNpcLine) pushDatingLog(npcId, "npc", opts.prependNpcLine);
    openModal("<div class=\"talk-sheet dating-mode dating-sheet\">" +
      "<div class=\"talk-header\"><div class=\"talk-head-row\">" +
      chibiHtml(npcId, "lg") +
      "<div class=\"talk-head-text\"><h3>" + escapeHtml(datingDisplayName(npcId)) +
      " <span class=\"badge heart-badge\">戀人</span></h3>" +
      "<p class=\"small\">" + escapeHtml(npc.title || "") + " · " + fateLabel(S.fates[npcId]) +
      (bondSummary(npcId) ? " · " + bondSummary(npcId) : "") + "</p>" +
      "<div class=\"dating-aff-meter\" id=\"dating-aff\">親密度 <b>" + aff + "</b><i style=\"width:" + aff + "%\"></i></div>" +
      "</div></div></div>" +
      "<div class=\"talk-scroll dating-thread\" id=\"dating-thread\">" + renderDatingThread(npcId) + "</div>" +
      "<div class=\"composer\">" +
      "<div class=\"seg tabs\" id=\"dating-mode\">" +
      "<button type=\"button\" class=\"btn primary\" data-dmode=\"say\">密語</button>" +
      "<button type=\"button\" class=\"btn\" data-dmode=\"action\">行動</button></div>" +
      "<textarea class=\"input area composer-input\" id=\"dating-input\" rows=\"2\" enterkeyhint=\"send\" placeholder=\"想對戀人說的話…\"></textarea>" +
      "<div class=\"intent-chips\" id=\"dating-chips\"></div>" +
      "<div class=\"composer-primary\">" +
      "<button type=\"button\" class=\"btn primary\" id=\"btn-dating-send\">送出</button>" +
      (canInviteCompanion(npcId) ? "<button type=\"button\" class=\"btn\" id=\"btn-dating-companion\">邀戀人同行</button>" : "") +
      "<button type=\"button\" class=\"btn ghost\" id=\"btn-dating-back\">返回列表</button>" +
      "<button type=\"button\" class=\"btn ghost composer-leave\" id=\"btn-dating-leave\">告辭</button>" +
      "</div>" +
      "<p class=\"ai-tag\" id=\"dating-status\">" + (settings.deepseekKey ? "DeepSeek 戀人模式" : "離線戀人模式") + "</p>" +
      "</div></div>");
    let mode = "say";
    document.querySelectorAll("#dating-mode [data-dmode]").forEach(btn => {
      btn.onclick = () => {
        mode = btn.getAttribute("data-dmode");
        document.querySelectorAll("#dating-mode [data-dmode]").forEach(b => b.classList.toggle("primary", b === btn));
        const inp = document.getElementById("dating-input");
        if (inp) inp.placeholder = mode === "action" ? "想做的親密行動…" : "想對戀人說的話…";
      };
    });
    const chips = [
      ["想你", "say", "這幾日很想你"],
      ["送花", "action", "送上一束野花"],
      ["擁抱", "action", "上前輕輕擁抱對方"],
      ["鬥嘴", "say", "故意嘴硬跟你鬥兩句"],
      ["約會", "say", "今晚可願與我私下見面？"],
      ["安心", "say", "無論江湖如何，我都在"]
    ];
    const wrap = document.getElementById("dating-chips");
    if (wrap) {
      wrap.innerHTML = chips.map(c =>
        "<button type=\"button\" class=\"chip-btn\" data-cmode=\"" + c[1] +
        "\" data-ctext=\"" + c[2].replace(/"/g, "&quot;") + "\">" + c[0] + "</button>"
      ).join("");
      wrap.querySelectorAll(".chip-btn").forEach(btn => {
        btn.onclick = () => {
          mode = btn.getAttribute("data-cmode");
          document.querySelectorAll("#dating-mode [data-dmode]").forEach(b => {
            b.classList.toggle("primary", b.getAttribute("data-dmode") === mode);
          });
          const inp = document.getElementById("dating-input");
          if (inp) { inp.value = btn.getAttribute("data-ctext"); inp.focus(); }
        };
      });
    }
    const freeInp = document.getElementById("dating-input");
    if (freeInp) bindComposerFocus(freeInp);
    const leave = document.getElementById("btn-dating-leave");
    if (leave) leave.onclick = () => closeModal();
    const back = document.getElementById("btn-dating-back");
    if (back) back.onclick = () => openDatingHub();
    const comp = document.getElementById("btn-dating-companion");
    if (comp) comp.onclick = () => { inviteCompanion(npcId); };
    document.getElementById("btn-dating-send").onclick = async () => {
      const inp = document.getElementById("dating-input");
      const st = document.getElementById("dating-status");
      const text = ((inp && inp.value) || "").trim();
      if (!text) return toast("請輸入", true);
      const btn = document.getElementById("btn-dating-send");
      if (btn) btn.disabled = true;
      if (st) st.textContent = "戀人回覆中…";
      pushDatingLog(npcId, "me", text);
      refreshDatingChatUi(npcId);
      if (inp) inp.value = "";
      let pack;
      try { pack = await datingAiRespond(npcId, mode, text); }
      catch (e) { pack = offlineDatingReply(npcId, mode, text); }
      bumpDatingAff(npcId, pack.affectionDelta || 0);
      pushDatingLog(npcId, "npc", pack.say);
      try {
        const m = ensureNpcMem(npcId);
        m.mood = pack.mood || m.mood;
        pushNpcMemory(npcId, {
          day: S.day, mode: mode, player: trunc(text, 80), reply: trunc(pack.say, 100),
          behavior: "help", intent: "dating", memoryNote: "密語・" + trunc(text, 24)
        });
      } catch (e) {}
      if (/約會|見面|見一面|私下/.test(text + pack.say)) {
        S.loverDateQuest = { npcId: npcId, loc: NPCS[npcId].loc || S.loc, day: S.day, done: false };
      }
      refreshDatingChatUi(npcId);
      if (st) st.textContent = "情緒：" + (pack.mood || "—") + " · 親密度 " + datingAffOf(npcId);
      if (btn) btn.disabled = false;
      try { saveGameSilent(); } catch (e) {}
      setTimeout(() => { try { freeInp && freeInp.focus(); } catch (e) {} }, 30);
    };
    setTimeout(() => {
      const thread = document.getElementById("dating-thread");
      if (thread) thread.scrollTop = thread.scrollHeight;
      try { freeInp && freeInp.focus(); } catch (e) {}
    }, 60);
  }
  function offlineLoverPing(npcId) {
    const name = datingDisplayName(npcId);
    const p = (npcProfile(npcId).personality || "proud");
    const aff = datingAffOf(npcId);
    const pool = {
      proud: [
        name + "來信：「今夜月色尚可。若你有空……便來。」",
        name + "托人捎話：「路上小心。別讓我等到煩。」",
        name + "：「我想見你。」"
      ],
      ruthless: [
        name + "忽然現身，刀未出鞘：「……想你了。別嚷。」",
        name + "丟來一包乾糧：「吃。別死在外面。」",
        name + "低語：「有人盯你。跟我走。」"
      ],
      healer: [
        name + "送來一碗湯：「聽說你奔波，先暖暖。」",
        name + "輕聲：「夢裡見你受傷……醒了就想確認你還在。」",
        name + "：「今夜診寮留燈，等你回來。」"
      ],
      merciful: [
        name + "：「善緣亦會思念。今晚可願聽我吹笛？」",
        name + "托童子送茶：「路上風大，喝一口再走。」",
        name + "：「若累了，回我身邊歇。」"
      ],
      cunning: [
        name + "壞笑着信：「猜我在哪？答對有獎。」",
        name + "：「外面有人傳你風流——是真是假，親自來解釋。」",
        name + "塞來半塊蜜餞：「甜的。想我時咬一口。」"
      ],
      timid: [
        name + "紙條字跡發抖：「你、你還記得我嗎……想見面。」",
        name + "躲在轉角：「我、我帶了點心……給你。」",
        name + "：「沒有你的日子好安靜……」"
      ],
      lawful: [
        name + "：「公務已畢。今夜私心——想見你。」",
        name + "：「巡邏路過，專程確認你無恙。」",
        name + "：「若你願，明日同行一程。」"
      ]
    };
    const lines = pool[p] || pool.proud;
    let line = lines[Math.floor(Math.random() * lines.length)];
    if (aff >= 75 && Math.random() < 0.4) line = name + "來訪，目光柔軟：「……就想確認你還在。」";
    if (S.companion === npcId && Math.random() < 0.5) line = name + "（同行）側身：「走了這許多路，今夜說說話？」";
    return line;
  }
  async function loverPingLine(npcId) {
    if (!settings.deepseekKey) return offlineLoverPing(npcId);
    const sys = "你是戀人 NPC「" + datingDisplayName(npcId) + "」。繁體中文。寫意主動聯繫玩家（來信／來訪／吃醋／提醒危險／送吃的／邀約）。只輸出一句短訊，勿 JSON，勿金庸IP。親密度" + datingAffOf(npcId) + "。";
    const user = "玩家=" + S.name + " 日=" + S.day + " 地=" + S.loc + " 近期：" + trunc(datingRecentBlob(npcId), 200);
    const raw = await deepseekChat(sys, user, 120);
    if (!raw) return offlineLoverPing(npcId);
    return trunc(String(raw).replace(/^["「]|["」]$/g, "").trim(), 120) || offlineLoverPing(npcId);
  }
  function tryCompleteLoverDate(locId) {
    ensureDatingState();
    const q = S.loverDateQuest;
    if (!q || q.done || !q.npcId) return false;
    if (q.loc && locId === q.loc && isDating(q.npcId)) {
      q.done = true;
      bumpDatingAff(q.npcId, 3);
      pushDatingLog(q.npcId, "npc", "你依約而來。對方眼底笑意藏不住：「……等很久了。」");
      toast(datingDisplayName(q.npcId) + "赴約成功・親密度＋", true);
      if (Math.random() < 0.45) addItem("herb", 1);
      try { saveGameSilent(); } catch (e) {}
      return true;
    }
    return false;
  }
  async function maybeLoverInitiative(reason) {
    try {
      ensureDatingState();
      const partners = listDatingPartners().filter(id => {
        const f = S.fates[id];
        return f !== "dead" && f !== "vanished";
      });
      if (!partners.length) return false;
      if (S.loverPingDay === S.day) return false;
      const eligible = partners.filter(id => {
        const last = S.loverPing[id] || 0;
        return last === 0 || (S.day - last >= 2);
      });
      if (!eligible.length) return false;
      let chance = 0.18;
      if (reason === "day") chance = 0.28;
      else if (reason === "travel") chance = 0.12;
      else if (reason === "combat") chance = 0.08;
      else if (reason === "idle") chance = 0.05;
      else if (reason === "camp") chance = 0.32;
      chance += Math.min(0.12, (S.luck || 5) * 0.01);
      const maxAff = Math.max.apply(null, eligible.map(datingAffOf));
      chance += Math.min(0.2, maxAff / 400);
      if (eligible.some(id => S.companion === id)) chance += 0.12;
      if (Math.random() > chance) return false;
      let total = 0;
      const weights = eligible.map(id => {
        const w = 10 + datingAffOf(id) + (S.companion === id ? 25 : 0);
        total += w;
        return w;
      });
      let r = Math.random() * total, pick = eligible[0];
      for (let i = 0; i < eligible.length; i++) {
        r -= weights[i];
        if (r <= 0) { pick = eligible[i]; break; }
      }
      S.loverPingDay = S.day;
      S.loverPing[pick] = S.day;
      const line = await loverPingLine(pick);
      pushDatingLog(pick, "npc", line);
      const name = datingDisplayName(pick);
      openModal("<div class=\"dating-sheet lover-initiative\">" +
        "<div class=\"initiative-banner\">♥ " + escapeHtml(name) + "來信／來訪</div>" +
        chibiHtml(pick, "lg") +
        "<div class=\"story-box\" style=\"margin-top:8px\">" + escapeHtml(line) + "</div>" +
        "<div class=\"btn-row\" style=\"margin-top:10px\">" +
        "<button class=\"btn primary\" id=\"lover-reply\">回覆密語</button>" +
        "<button class=\"btn\" id=\"lover-later\">稍後</button>" +
        "</div></div>");
      const rep = document.getElementById("lover-reply");
      if (rep) rep.onclick = () => openDatingChat(pick);
      const later = document.getElementById("lover-later");
      if (later) later.onclick = () => { closeModal(); toast(name + "的訊息已記入密語", true); };
      try { saveGameSilent(); } catch (e) {}
      return true;
    } catch (e) {
      console.warn("lover initiative", e);
      return false;
    }
  }



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


  const PALACE_DUTY_EVENTS = {
    yuhuayuan: [
      { id:"yh_petal", title:"落花滿徑", text:"御花園石橋邊，一簇宮緞被風吹落泥中。旁有兩名宮女爭執是誰失責。",
        choices:[
          { label:"幫她們拾起，並隱瞞過失", effects:{ prestige:3, charm:1, karma:1, favorNpc:"hua_gongnu", favor:2 }, result:"宮女破涕為笑，塞你一袋桂花糖。「下次花廊有事，先找你。」" },
          { label:"按宮規稟報掌事姑姑", effects:{ prestige:6, honor:1, heat:1 }, result:"掌事姑姑記你一功，卻冷了花廊人心。" },
          { label:"趁亂拿走一枚遺落珠鈿", effects:{ gold:12, karma:-3, heat:4, prestige:1 }, result:"珠鈿入手。背後似有目光——宮熱微升。" }
        ]},
      { id:"yh_whisper", title:"花下私語", text:"太湖石後傳來低語：似是沈貴妃宮人談「今夜養心殿有密旨」。",
        choices:[
          { label:"悄然記下，轉身離開", effects:{ prestige:2, perception:1, flag:"heard_yangxin_edict" }, result:"你裝聾作啞。情報已入心——或許日後有用。" },
          { label:"上前請安，自薦傳話", effects:{ prestige:5, favorNpc:"shen_guifei", favor:3, heat:2 }, result:"宮人打量你片刻，允你「若有差遣再叫」。貴妃好感微升。" },
          { label:"故意咳嗽嚇走她們", effects:{ prestige:1, karma:1 }, result:"私語驟停。你換來片刻清靜，也少了一樁是非。" }
        ]},
      { id:"yh_emperor_stroll", title:"聖駕微服？", text:"廊角閃過一襲暗色常服，近侍小安在側。是景安帝私遊花廊？",
        choices:[
          { label:"跪安如儀，不多言", effects:{ prestige:4, emperorFavor:2 }, result:"帝略一頷首：「起來吧。」近侍替你記了一筆。" },
          { label:"獻新開的白芍一枝", effects:{ prestige:6, emperorFavor:4, charm:1 }, result:"帝接花嗅之：「有心。」帝心大增。" },
          { label:"假裝掃徑，偷偷跟蹤", effects:{ prestige:1, heat:6, karma:-1, perception:1 }, result:"近侍回頭冷瞥。你縮回——宮熱上升，險些獲罪。" }
        ]},
      { id:"yh_night_meet", title:"月下偶遇", text:"夜巡花廊，你遇見一名帶泪的宮女。她說被陷害，求你藏一封家書。",
        choices:[
          { label:"藏信並答應代投", effects:{ prestige:3, karma:2, heat:4, flag:"hid_gongnu_letter", favorNpc:"hua_gongnu", favor:4 }, result:"她跪下磕頭。你多了一條人命債，也多了一分牽絆。" },
          { label:"勸她去掌事姑姑處自首", effects:{ prestige:4, honor:1 }, result:"她咬唇離去。也许不是最好，但是最稳。" },
          { label:"恐吓她交出银钱", effects:{ gold:20, karma:-4, heat:3, prestige:1 }, result:"银两到手。她眼里的光熄了。" }
        ]}
    ],
    yushan: [
      { id:"ys_spill", title:"湯碗傾翻", text:"傳膳途中，你與人撞個正着，一碗參湯潑了半碗。",
        choices:[
          { label:"自己扛責，重做一碗", effects:{ prestige:5, honor:1, gold:-2, karma:1 }, result:"你賠了料錢，卻換來膳房一句：「這人靠譜。」" },
          { label:"推給對方，反咬一口", effects:{ prestige:2, karma:-2, heat:2, favorNpc:"wei_xiaozhou", favor:-3 }, result:"對方眼神陰冷：「記下了。」" },
          { label:"偷偷以清水充數送上", effects:{ prestige:3, gold:5, karma:-4, heat:5 }, result:"暫且過關。若被御醫驗出——後患無窮。" }
        ]},
      { id:"ys_leftover", title:"御膳餘味", text:"退膳後，尚有半碟酥點未動。規矩是倒入泔水。",
        choices:[
          { label:"按規矩倒掉", effects:{ prestige:3, honor:1 }, result:"老役點頭：「懂規矩，才能活得長。」" },
          { label:"分給當值雜役", effects:{ prestige:4, karma:2, charm:1 }, result:"雜役眼熱：「有事殿裡招呼一聲。」" },
          { label:"私藏售予外廷", effects:{ gold:18, karma:-3, heat:6, prestige:1 }, result:"銀兩入手。膳房籍冊多了一道暗痕。" }
        ]},
      { id:"ys_poison_fear", title:"試毒之責", text:"今日膳前缺試毒人。有人望向你。",
        choices:[
          { label:"挺身試毒", effects:{ prestige:10, honor:2, emperorFavor:2, karma:1 }, result:"無事。聖眷記你膽色。" },
          { label:"薦他人頂替", effects:{ prestige:2, karma:-2 }, result:"那人臉色發白。你保住命，也丢了义。" },
          { label:"借口腹痛躲开", effects:{ prestige:1 }, result:"你躲开了。膳房私下已给你贴了「怯」字。" }
        ]}
    ],
    qianqing: [
      { id:"qq_memo", title:"票擬錯字", text:"奏事處太監讓你謄票擬，原稿把「緩徵」寫成「緩懲」。",
        choices:[
          { label:"當場指出並改正", effects:{ prestige:8, wit:1, honor:1 }, result:"太監一驚：「好眼力。」威望大增。" },
          { label:"假裝沒看見，照抄", effects:{ prestige:2, karma:-2, heat:3 }, result:"錯票入匣。日後若出事，筆跡有你一份。" },
          { label:"私下改了卻不聲張", effects:{ prestige:5, wit:1 }, result:"你救了一局，卻無人知曉——只心安。" }
        ]},
      { id:"qq_bribe", title:"袖中銀票", text:"有外官塞你一疊銀票：「只求今兒奏摺往上排一排。」",
        choices:[
          { label:"拒收並稟報", effects:{ prestige:10, honor:2, karma:2, renown:1 }, result:"清名傳開。有人敬你，也有人恨你。" },
          { label:"收下並幫忙插隊", effects:{ prestige:4, gold:40, karma:-5, heat:8 }, result:"銀票入袖。宮熱與惡名同步攀升。" },
          { label:"收下銀票卻不辦事", effects:{ gold:40, karma:-4, heat:4, prestige:1 }, result:"你兩頭瞞。暫時賺了，信用卻在燒。" }
        ]}
    ],
    yangxin: [
      { id:"yx_candle", title:"燭淚將盡", text:"養心殿值夜，御案燭火將熄。近侍打盹，密諭匣未上鎖。",
        choices:[
          { label:"換燭，並替他鎖匣", effects:{ prestige:6, emperorFavor:2, karma:1 }, result:"近侍醒來：「多謝……我欠你一次。」" },
          { label:"偷看密諭一行", effects:{ prestige:2, perception:1, heat:7, flag:"peeked_yangxin_box" }, result:"你瞥見「邊關」二字。心跳如鼓——宮熱驟升。" },
          { label:"叫醒近侍，假裝無事", effects:{ prestige:3 }, result:"他擦擦口水。殿內恢復寂靜。" }
        ]},
      { id:"yx_favor_test", title:"帝問家常", text:"景安帝忽然問你：「外間可有流言？」",
        choices:[
          { label:"據實奏聞一兩則無礙傳聞", effects:{ prestige:6, emperorFavor:3, perception:1 }, result:"帝點頭：「還算明白。」" },
          { label:"只說『皆頌聖德』", effects:{ prestige:3, emperorFavor:1 }, result:"帝淡淡一笑，似不甚信。" },
          { label:"借机告发政敌", effects:{ prestige:5, emperorFavor:2, karma:-3, heat:5 }, result:"帝记下了名字。你也把自己绑上了战车。" }
        ]}
    ],
    hougong: [
      { id:"hg_tea", title:"璇璣奉茶", text:"沈貴妃要你奉茶。茶溫略燙——她似在試你定力。",
        choices:[
          { label:"跪穩，雙手平奉", effects:{ prestige:5, favorNpc:"shen_guifei", favor:4, charm:1 }, result:"她輕笑：「還算穩。」好感上升。" },
          { label:"直言茶燙，請易一杯", effects:{ prestige:4, favorNpc:"shen_guifei", favor:2, honor:1 }, result:"她挑眉：「敢說話。有趣。」" },
          { label:"手抖灑出半盞", effects:{ prestige:1, favorNpc:"shen_guifei", favor:-2, heat:2 }, result:"貴妃皺眉。你被罰跪半炷香。" }
        ]},
      { id:"hg_rival", title:"宮人構陷", text:"有宮女咬定你偷了娘娘的宮花。證據含糊，但人多勢眾。",
        choices:[
          { label:"請掌事姑姑當眾搜身自證", effects:{ prestige:6, honor:1, karma:1 }, result:"搜身無事。構陷者挨板子，你清名保住。" },
          { label:"暗中塞錢給她封口", effects:{ gold:-15, prestige:2, karma:-2, heat:3 }, result:"她收了錢，卻可能再來敲詐。" },
          { label:"反咬她私通外廷", effects:{ prestige:3, karma:-4, heat:6, favorNpc:"shen_guifei", favor:-1 }, result:"一場混戰。貴妃厭惡「鬧事的兩邊」。" }
        ]}
    ],
    neiting: [
      { id:"nt_rule", title:"宮規抽問", text:"掌事姑姑抽問宮規：夜禁、對牌、請安次序。",
        choices:[
          { label:"對答如流", effects:{ prestige:7, wit:1, honor:1 }, result:"姑姑罕有地點頭：「可造之材。」" },
          { label:"支吾其詞，認罰抄規", effects:{ prestige:2, exp:2 }, result:"你抄規至燈盡。記牢了，也熬瘦了一圈。" },
          { label:"耍滑，推說新人未教", effects:{ prestige:1, charm:1 }, result:"姑姑哼一聲：「明日複試。」暫且過關。" }
        ]},
      { id:"nt_pass", title:"对牌差错", text:"今夜对牌少了一枚。众人面面相觑。",
        choices:[
          { label:"组织重搜并上报", effects:{ prestige:6, perception:1 }, result:"牌在井边找到。你稳住了局面。" },
          { label:"用旧牌充数混过", effects:{ prestige:2, karma:-2, heat:5 }, result:"一时无事。稽查若来，全班遭殃。" },
          { label:"栽赃给宿怨之人", effects:{ prestige:3, karma:-4, heat:4 }, result:"对方被罚。你种下仇芽。" }
        ]}
    ],
    wenyuan: [
      { id:"wy_book", title:"錯簡重排", text:"文淵閣一冊舊檔頁次錯亂。編修要你重排。",
        choices:[
          { label:"徹夜校對，完璧歸架", effects:{ prestige:8, wit:1, focus:1, exp:6 }, result:"編修：「文官胚子。」威望大增。" },
          { label:"草草了事", effects:{ prestige:2, karma:-1 }, result:"後日又被退回。顏面無光。" },
          { label:"偷偷抄錄一頁秘聞", effects:{ prestige:3, perception:1, heat:4, flag:"copied_wenyuan_secret" }, result:"袖中多頁紙。知識是刀，也是禍。" }
        ]}
    ],
    wuying: [
      { id:"we_drill", title:"演武走神", text:"羽林教習點名你出列扎槍。旁人起鬨。",
        choices:[
          { label:"認真比劃，雖拙猶敬", effects:{ prestige:6, force:1, exp:5 }, result:"教習：「態度可嘉。」武官途多一筆。" },
          { label:"假裝扭傷求免", effects:{ prestige:1, karma:-1 }, result:"有人竊笑。你躲過一場，也丟了狠勁。" },
          { label:"挑戰教習一招", effects:{ prestige:4, force:1, heat:2 }, result:"教習一式震開你。他卻笑：「有種。記名。」" }
        ]}
    ],
    neiwufu: [
      { id:"nw_ledger", title:"庫冊微差", text:"盤庫時銀兩少了二兩。筆帖式眼神閃爍。",
        choices:[
          { label:"據實上報", effects:{ prestige:7, honor:2, karma:1 }, result:"筆帖式被記過。你成了「刺頭」，也成了清流。" },
          { label:"幫他補帳瞒過", effects:{ gold:10, prestige:2, karma:-3, heat:5 }, result:"他塞你十金。「以後庫裡有缺，一起填。」" },
          { label:"要脅分潤", effects:{ gold:25, prestige:1, karma:-5, heat:8 }, result:"你咬下一筆。廠衛的影子似乎更近了。" }
        ]}
    ],
    taiyiyuan: [
      { id:"ty_herb", title:"藥材調包", text:"有人要把普通參須混入御用野參匣。太醫剛離開。",
        choices:[
          { label:"阻止並告知太醫", effects:{ prestige:8, medicine:1, karma:2, honor:1 }, result:"太醫拱手：「救命之舉。」" },
          { label:"視而不見", effects:{ prestige:1, karma:-2, heat:3 }, result:"你保住安靜，也賣了良心。" },
          { label:"參與分贓", effects:{ gold:30, karma:-5, heat:7, prestige:2 }, result:"銀兩沉甸。若帝躬違和——血債有你一份。" }
        ]}
    ],
    tianlao: [
      { id:"tl_water", title:"給囚水喝", text:"欽犯唇焦，求一口水。獄卒說：「章程不許。」",
        choices:[
          { label:"偷偷餵水", effects:{ prestige:3, karma:3, honor:1, heat:3 }, result:"犯人沙啞道謝。你多了一條人情，也多了一分險。" },
          { label:"堅守章程", effects:{ prestige:4 }, result:"獄卒：「識時務。」威望平穩。" },
          { label:"嘲笑他，踢翻水碗", effects:{ prestige:2, karma:-4, heat:2 }, result:"囚犯目光如刀。惡名又刻一筆。" }
        ]}
    ],
    wumen: [
      { id:"wm_pass", title:"假牌闖關", text:"一人持牌要入，牌紋有細微差異。隊尾又不耐煩起哄。",
        choices:[
          { label:"扣人詳查", effects:{ prestige:8, perception:1, honor:1 }, result:"果然是假牌。校尉記功。" },
          { label:"收錢放行", effects:{ gold:20, prestige:1, karma:-4, heat:6 }, result:"關口一時顺畅，籍冊卻埋了雷。" },
          { label:"放行但暗中跟去報官", effects:{ prestige:6, perception:1, karma:1, heat:2 }, result:"你兩面做——既未當街撕破，又留了後手。" }
        ]}
    ],
    dongchang: [
      { id:"dc_file", title:"檔案借閱", text:"督公不在。案上有一份籍冊微開。",
        choices:[
          { label:"合上走人", effects:{ prestige:3, karma:1 }, result:"你壓住好奇。廠門深似海。" },
          { label:"翻看兩頁記住關鍵名", effects:{ prestige:4, perception:1, heat:8, flag:"peeked_dongchang_roster" }, result:"名字如釘入腦。宮熱驟升。" },
          { label:"抽走一頁藏袖", effects:{ prestige:2, heat:12, karma:-3, flag:"stole_dongchang_page" }, result:"袖中灼熱。東廠丟頁——追查只是迟早。" }
        ]}
    ],
    taipusi: [
      { id:"tp_horse", title:"御馬受驚", text:"刷馬時遠雷，御馬突然直立。",
        choices:[
          { label:"死死拉韁安撫", effects:{ prestige:7, force:1, luck:1 }, result:"馬漸穩。馬官：「好膽色。」" },
          { label:"鬆手躲閃", effects:{ prestige:1 }, result:"馬跑出厩門，後果是罰銀與罰跪。" },
          { label:"借機打聽馬政秘辛", effects:{ prestige:4, perception:1, flag:"taipusi_intel" }, result:"你問清了哪厩有汗血苗。" }
        ]}
    ],
    shenwu: [
      { id:"sw_gate", title:"後門人情", text:"神武門有人求你「通融一刻」出宮。",
        choices:[
          { label:"拒絕", effects:{ prestige:4, honor:1 }, result:"對方拂袖。你守住了規矩。" },
          { label:"放行並登記假名", effects:{ gold:15, prestige:2, karma:-3, heat:5 }, result:"門開了一條縫。也給稽查留了縫。" },
          { label:"放行但跟踪其去向", effects:{ prestige:5, perception:1, heat:2, flag:"shenwu_tail" }, result:"人情與情報都拿到了。" }
        ]}
    ],
    siku: [
      { id:"sk_typo", title:"四庫訛字", text:"校對至敏感卷——寫錯御名諱會掉腦袋。",
        choices:[
          { label:"慎之又慎，校出三訛", effects:{ prestige:9, wit:1, focus:1 }, result:"書吏：「此才可入翰苑。」" },
          { label:"敷衍蓋章", effects:{ prestige:2, karma:-2, heat:4 }, result:"錯字入庫。定時炸彈已埋。" }
        ]}
    ],
    bingzhang: [
      { id:"bz_blade", title:"甲仗鬆扣", text:"一架御用環刀鬆扣，若上朝可能脫出傷人。",
        choices:[
          { label:"立即加固並上報", effects:{ prestige:8, def:1, honor:1, karma:1 }, result:"匠頭抹汗：「撿回一條命。」" },
          { label:"装作未见", effects:{ prestige:1, karma:-3, heat:5 }, result:"你賭它不會出事——這賭盤很大。" }
        ]}
    ],
    dianshi: [
      { id:"ds_cheat", title:"夾帶嫌疑", text:"殿試廊上，一生員袖中似有紙。",
        choices:[
          { label:"當場揭發", effects:{ prestige:8, honor:1, renown:1 }, result:"夾帶屬實。場紀肅然，你得記名。" },
          { label:"收錢放水", effects:{ gold:35, prestige:2, karma:-5, heat:6 }, result:"銀兩入手。科舉之公被你賣了一寸。" },
          { label:"私下警告他丟棄", effects:{ prestige:5, karma:2, honor:1 }, result:"生員顫抖丟紙。你救了他，也守了底線。" }
        ]}
    ],
    taihedian: [
      { id:"th_court", title:"朝會雜役", text:"太和殿朝會前，有御史靴底將髒泥踩上金磚縫。",
        choices:[
          { label:"忍住重擦", effects:{ prestige:4, honor:1 }, result:"鴻臚寺記你「勤謹」。" },
          { label:"輕聲提醒大人", effects:{ prestige:5, charm:1, karma:1 }, result:"御史一愣，竟道了聲謝。" },
          { label:"故意把泥蹭回其靴", effects:{ prestige:2, karma:-2, heat:3 }, result:"解氣片刻，卻惹了一尊大神。" }
        ]}
    ],
    huanggong: [
      { id:"og_gate_duty", title:"外廷點卯", text:"外廷通事點名，有人未到。",
        choices:[
          { label:"如實稟報缺勤", effects:{ prestige:5, honor:1 }, result:"通事點頭。缺勤者罰銀，你無過。" },
          { label:"代他應答混過", effects:{ prestige:2, karma:-1, favorNpc:"wei_xiaozhou", favor:2 }, result:"人情換來。韋小舟一系可能記得你。" },
          { label:"頂了他的肥差", effects:{ prestige:6, gold:8, karma:-2 }, result:"你多拿一份賞銀——也多了個仇家。" }
        ]}
    ],
    jingshen: [
      { id:"js_scare", title:"淨身房陰影", text:"即便只是路過當差，氣味仍令人窒息。老役盯着你笑。",
        choices:[
          { label:"低頭幹活不搭理", effects:{ prestige:3 }, result:"你熬過半日。心裡多了一道疤。" },
          { label:"詰問他為何如此看人", effects:{ prestige:2, karma:1, heat:2 }, result:"老役：「問得多，活得短。」" },
          { label:"暗中記下水路方位", effects:{ prestige:2, perception:1, flag:"jingshen_escape_map" }, result:"你記下排水溝——但願永遠用不上。" }
        ]}
    ],
    xingbu_prison: [
      { id:"xp_record", title:"錄供兩難", text:"犯人哭求你少寫兩筆。刑部司獄在門外催。",
        choices:[
          { label:"據實錄完", effects:{ prestige:6, honor:1 }, result:"供狀入冊。你無愧，也無額外人情。" },
          { label:"暗中放過關鍵一句", effects:{ prestige:3, karma:2, heat:4, honor:1 }, result:"你救了一点人命，把自己推向风口。" },
          { label:"加碼羅織以邀功", effects:{ prestige:5, karma:-5, heat:6 }, result:"司獄賞你脸色。夜里却可能睡不着。" }
        ]}
    ],
    yuhe_wharf: [
      { id:"yw_boat", title:"御河夜船", text:"舟子暗示：今夜可送人出宫，价钱好谈。",
        choices:[
          { label:"严词拒绝并记下他", effects:{ prestige:5, honor:1, flag:"yuhe_smuggler_known" }, result:"舟子收起笑容。你多了一条线索。" },
          { label:"付钱预留后路", effects:{ gold:-20, prestige:2, heat:3, flag:"yuhe_escape_ready" }, result:"退路隐约可见。银两少了，命宽了。" },
          { label:"举报厂卫邀功", effects:{ prestige:8, karma:-1, heat:2, renown:1 }, result:"厂卫来人。舟子被捕——你也成了眼线。" }
        ]}
    ]
  };

  function applyDutyEffects(fx) {
    if (!fx) return;
    if (fx.prestige) bumpCourtPrestige(fx.prestige, "當差事件");
    if (typeof fx.gold === "number") S.gold = Math.max(0, (S.gold || 0) + fx.gold);
    if (fx.exp) S.exp = (S.exp || 0) + fx.exp;
    if (fx.karma) {
      if (typeof adjustKarma === "function") adjustKarma(fx.karma, "當差抉擇");
      else S.karma = (S.karma || 0) + fx.karma;
    }
    if (fx.heat) {
      if (typeof bumpPalaceHeat === "function") bumpPalaceHeat(fx.heat);
      else S.palaceHeat = (S.palaceHeat || 0) + fx.heat;
    }
    if (fx.emperorFavor) {
      if (typeof bumpEmperorFavor === "function") bumpEmperorFavor(fx.emperorFavor, "當差");
      else S.emperorFavor = (S.emperorFavor || 0) + fx.emperorFavor;
    }
    if (fx.renown) S.renown = (S.renown || 0) + fx.renown;
    ["force","agi","def","wit","luck","honor","charm","focus","medicine","perception"].forEach(function(k){
      if (fx[k]) S[k] = Math.min(40, (S[k] || 0) + fx[k]);
    });
    if (fx.flag) setFlag(fx.flag);
    if (fx.item) {
      try { addItem(fx.item, 1); } catch (e) {
        if (!S.inv) S.inv = {};
        S.inv[fx.item] = (S.inv[fx.item] || 0) + 1;
      }
    }
    if (fx.favorNpc && typeof fx.favor === "number") {
      if (!S.datingAff) S.datingAff = {};
      S.datingAff[fx.favorNpc] = (S.datingAff[fx.favorNpc] || 0) + fx.favor;
      const nm = (NPCS[fx.favorNpc] && NPCS[fx.favorNpc].name) || fx.favorNpc;
      if (fx.favor > 0) toast(nm + "好感＋" + fx.favor, true);
      else if (fx.favor < 0) toast(nm + "好感" + fx.favor, true);
    }
  }
  function pickDutyEvent(locId) {
    const pool = (PALACE_DUTY_EVENTS[locId] || []).slice();
    const generic = [
      { id:"gen_errand", title:"雜役奔走", text:"你被支去傳話、提水、掃階。半日下來腰酸，卻聽見許多閒話。",
        choices:[
          { label:"勤謹做完，順便記牢人情", effects:{ prestige:4, exp:3, gold:2, perception:1 }, result:"威望微升。你把廊上誰與誰嘀咕都記住了。" },
          { label:"躲懶摸魚", effects:{ prestige:1, exp:1 }, result:"你少受罪，也少露臉。" },
          { label:"偷聽完去通報主子邀功", effects:{ prestige:5, heat:3, karma:-1 }, result:"主子賞了薄面，被說的人卻可能記恨。" }
        ]},
      { id:"gen_gift", title:"有人塞好處", text:"一個陌生內侍塞來一小包銀子：「以後多關照。」",
        choices:[
          { label:"拒收", effects:{ prestige:5, honor:1, karma:1 }, result:"對方訕訕離去。你清名又厚一分。" },
          { label:"收下沉默", effects:{ gold:12, prestige:2, karma:-2, heat:3 }, result:"銀子沉甸甸。人情債同步入帳。" },
          { label:"收下並追問來意", effects:{ gold:12, prestige:3, perception:1, heat:2 }, result:"他只說「到時自然知」。你多了一條線。" }
        ]},
      { id:"gen_quarrel", title:"廊下口角", text:"兩名當差值當眾對罵，圍觀者起鬨要你評理。",
        choices:[
          { label:"各打五十，勸和", effects:{ prestige:4, charm:1, karma:1 }, result:"雙方悻悻散去。你落得個和事佬名。" },
          { label:"偏袒位高者", effects:{ prestige:3, karma:-1, heat:1 }, result:"位高者點頭。位低者把你记进了小本本。" },
          { label:"暗中把兩邊都禀报闹事", effects:{ prestige:5, heat:2 }, result:"规矩赢了，人缘输了。" }
        ]}
    ];
    const all = pool.concat(generic);
    if (!S.dutyRecent) S.dutyRecent = [];
    const fresh = all.filter(function(e){ return S.dutyRecent.indexOf(e.id) < 0; });
    const use = fresh.length ? fresh : all;
    const ev = use[Math.floor(Math.random() * use.length)];
    S.dutyRecent = (S.dutyRecent || []).concat([ev.id]).slice(-10);
    return ev;
  }
  function runPalaceDutyEvent(kindLabel) {
    const locId = S.loc;
    const loc = LOCATIONS.find(function(l){ return l.id === locId; });
    const locName = (loc && loc.name) || (typeof eunuchHallName === "function" ? eunuchHallName() : locId);
    const ev = pickDutyEvent(locId);
    bumpCourtPrestige(2, kindLabel || "當差");
    S.exp = (S.exp || 0) + 2;
    S.gold = (S.gold || 0) + 1;
    let html = "<h3>" + escapeHtml(kindLabel || "本殿當差") + "・" + escapeHtml(locName) + "</h3>";
    html += '<div class="story-box"><strong>' + escapeHtml(ev.title) + "</strong><br/>" + escapeHtml(ev.text) + "</div>";
    html += '<p class="small">選擇會影響威望、好感、善惡與宮熱。</p><div class="btn-row" style="flex-direction:column;gap:8px">';
    ev.choices.forEach(function(c, idx){
      html += '<button type="button" class="btn' + (idx === 0 ? " primary" : "") + '" data-duty-c="' + idx + '">' + escapeHtml(c.label) + "</button>";
    });
    html += "</div>";
    openModal(html);
    document.querySelectorAll("[data-duty-c]").forEach(function(btn){
      btn.onclick = function(){
        const i = parseInt(btn.getAttribute("data-duty-c"), 10);
        const ch = ev.choices[i];
        closeModal();
        applyDutyEffects(ch.effects || {});
        showStory("【" + ev.title + "】\n" + (ch.result || "") + "\n\n當差結算・" + courtRankLabel());
        try { maybeOfferCourtDeal(); } catch (e) {}
        try { saveGameSilent(); } catch (e) {}
      };
    });
  }

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
      if ((isMale() || (typeof perceivedMale === "function" && perceivedMale())) && !flag("eunuch")) {
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
    if (!(isMale() || (typeof perceivedMale === "function" && perceivedMale()))) {
      return toast("淨身入籍僅限男身／男裝示人路徑（寫意）", true);
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
    // assigned hall daily — branching random events
    if (flag("eunuch") && (S.eunuchAssignedHall === locId || (PALACE_LOC_FEATURES[locId] && S.courtTrack === "eunuch"))) {
      acts.push({ label: "【太監】本殿當差", fn: function(){ runPalaceDutyEvent("太監當差"); } });
    }
    if ((S.courtTrack === "maid" || S.palaceRole === "maid" || S.palaceRole === "lady" || S.palaceRole === "consort") && (locId === "hougong" || locId === "neiting" || locId === "yuhuayuan" || locId === "yangxin" || locId === "qianqing")) {
      // replace flat 請安 if present later — also offer branching duty
      acts.push({ label: "【宮女】本殿差事", fn: function(){ runPalaceDutyEvent("宮女差事"); } });
    }
    if ((S.courtTrack === "civil" || S.courtTrack === "military") && PALACE_LOC_FEATURES[locId]) {
      acts.push({ label: "【當差】本殿公務", fn: function(){ runPalaceDutyEvent("本殿公務"); } });
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
  // (strict-safe: call openForbiddenCityMapTagged from original)


  // ensurePalaceState patched below to call ensureCourtCareer (strict-safe)

  // append hooks: patched into original function bodies (strict-safe)


  // palaceRoleLabel patched in original (strict-safe)


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
      COURT_QUESTS_EXTRA: COURT_QUESTS_EXTRA,
      PALACE_DUTY_EVENTS: PALACE_DUTY_EVENTS,
      runPalaceDutyEvent: runPalaceDutyEvent,
      pickDutyEvent: pickDutyEvent,
      applyDutyEffects: applyDutyEffects,
      dismissStoryModal: dismissStoryModal
    });
  }



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

    // ========== END V10 ==========

})();
