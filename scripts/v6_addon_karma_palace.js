
  // ========== V6 ADDON: KARMA + PALACE (injected) ==========
  function adjustKarma(delta, reason) {
    if (!delta) return;
    if (typeof S.karma !== "number") S.karma = 0;
    const prev = S.karma;
    S.karma = Math.max(-150, Math.min(150, S.karma + delta));
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
      openModal("<h3>義丐傳訊</h3><div class=\"story-box\">破衣老丐塞你定風符：「行善之人，丐幫暗線願助。青城、京畿有清風一事。」</div><div class=\"btn-row\"><button class=\"btn primary\" id=\"ke-ok\">收下</button></div>");
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
  function palaceRoleLabel() {
    const r = S.palaceRole || null;
    return ({ maid: "宮女", lady: "女官", guard: "御前侍衛", official: "朝官", eunuch: "太監", fanzi: "東廠番子", dongchang_boss: "東廠督公", consort: "御前紅人" })[r] || "無";
  }
  function hasPalaceAccess() {
    return flag("palace_entry") || flag("map_huanggong") || !!S.palaceRole || flag("eunuch") || hasItem("yulin_pass") || hasItem("dongchang_token") || hasItem("imperial_edict");
  }
  function applyEunuchConsequences() {
    setFlag("eunuch"); setFlag("sold_as_eunuch"); setFlag("palace_entry"); setFlag("map_huanggong");
    S.palaceRole = "eunuch";
    S.force = Math.max(1, (S.force || 10) - 8);
    S.agi = Math.max(1, (S.agi || 8) - 4);
    S.bone = Math.max(1, (S.bone || 5) - 3);
    S.hpMax = Math.max(40, (S.hpMax || 100) - 20);
    S.hp = Math.min(S.hp, S.hpMax);
    adjustKarma(-8, "淨身入宮");
    addStatus("neishang", 4);
    S.trauma = (S.trauma || 0) + 1;
    ensureQuests();
    if (S.quests.side_palace_revenge) S.quests.side_palace_revenge.step = Math.max(S.quests.side_palace_revenge.step, 1);
  }
  function trySoldAsEunuchEvent(reason) {
    if (S.gender !== "male") return false;
    if (flag("eunuch") || flag("sold_as_eunuch") || flag("escaped_enslavement")) return false;
    // struggle check
    openModal("<h3>人牙子暗巷</h3><div class=\"story-box\">夜色裡有人蒙眼縛手——人牙子冷笑：「進宮的貨色。」（" + (reason || "危難") + "）\\n你可拚死反抗，或……畫面一暗。</div>"
      + "<div class=\"btn-row\"><button class=\"btn primary\" id=\"eu-fight\">拚死掙扎</button>"
      + "<button class=\"btn danger\" id=\"eu-fail\">氣力不繼……</button></div>");
    document.getElementById("eu-fight").onclick = function() {
      closeModal();
      const st = effectiveStats();
      const score = st.force + st.agi + st.luck + (Math.random() * 20 | 0);
      if (score >= 28) {
        setFlag("escaped_enslavement"); adjustKarma(2, "掙脫人牙");
        setFate("renyazi", "enemy");
        showStory("你咬斷麻繩衝入巷口。身後咒罵漸遠——人牙子不會善罷甘休，但你保住了自己。");
      } else {
        setFlag("escaped_enslavement"); // partial: captured but not yet
        S.hp = Math.max(1, Math.floor(S.hp * 0.4));
        showStory("掙扎失敗，幾乎被拖走——幸有巡夜喝罵，人牙子暫退。你重傷，記住了那張臉。");
        setFate("renyazi", "enemy");
        // second vulnerability can still trigger full path via button
      }
    };
    document.getElementById("eu-fail").onclick = function() {
      closeModal();
      applyEunuchConsequences();
      showStory("灯火熄灭。再睁眼时，已是青梧宫内一间偏殿侧室。\\n有些路，一旦踏上便无法回头——你被记入太监籍。东厂的影子，开始在廊下晃动。\\n（气力、身法、根骨大损；皇宫线・复仇支线已开）");
      S.loc = "huanggong";
      render();
    };
    return true;
  }
  function maybeTriggerEnslavement() {
    if (S.gender !== "male" || flag("eunuch") || flag("sold_as_eunuch") || flag("escaped_enslavement")) return false;
    const vulnerable = isImprisoned() || S.hp <= Math.max(15, effectiveStats().hpMax * 0.2) || alignmentTier() === "villain" || flag("renyazi_ambush");
    if (!vulnerable) return false;
    if (Math.random() > 0.35 && !flag("renyazi_ambush")) return false;
    return trySoldAsEunuchEvent(isImprisoned() ? "關押虛弱" : "危難／惡名");
  }
  function setPalaceRole(role) {
    S.palaceRole = role;
    setFlag("palace_entry"); setFlag("map_huanggong");
    if (role === "maid" || role === "lady") setFlag("hougong_access");
    if (role === "consort") { setFlag("hougong_access"); setFlag("neiting_access"); }
    if (role === "fanzi" || role === "dongchang_boss") setFlag("dongchang_invite");
    if (role === "guard" || role === "official") setFlag("yulin_ok");
    toast("宮職：" + palaceRoleLabel(), true);
  }


  function appendPalaceAndCh3Actions(acts, locId) {
    ensureQuests();
    // Hub: camp + board
    if (locId === "hub") {
      acts.push({ label: "扎營過夜（過一日）", fn: function(){ campOvernight(); } });
    }
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
        setFlag("heard_slave_market");
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
    if (locId === "slave_market") {
      acts.push({ label: "窺探人牙子", fn: function(){
        setFlag("renyazi_ambush");
        if (S.gender === "male" && !flag("eunuch") && !flag("escaped_enslavement")) {
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
        if (S.gender === "female") {
          acts.push({ label: "自薦入宮為宮女", fn: function(){
            setPalaceRole("maid"); setFate("gongnv_head", "ally");
            showStory("掌事姑姑打量你：「手腳勤快，先從灑掃做起。」");
          }});
        }
        if (S.gender === "male" && !flag("eunuch")) {
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
            setPalaceRole("fanzi"); setFate("dongchang_gong", "ally"); adjustKarma(-3, "入東廠");
            showStory("東廠督公："檔案裡寫你的名字。從今晚起，你替廠裡跑腿。");
          }});
        }
      }
      acts.push({ label: "觀宮牆氣象", fn: function(){
        S.exp += 3; showStory("宮牆高聳，紅燈如血。你的宮職：" + palaceRoleLabel() + "。");
      }});
    }
    if (locId === "neiting" && (flag("neiting_access") || S.palaceRole === "lady" || S.palaceRole === "consort" || S.palaceRole === "guard" || S.palaceRole === "official" || flag("eunuch"))) {
      acts.push({ label: "花廊徘徊", fn: function(){
        if (Math.random() < 0.3) { S.charm = Math.min(30,(S.charm||5)+1); showStory("花香入袖，魅力微增。"); }
        else showStory("內廷花廊靜悄，遠聞樂聲。");
      }});
    }
    if (locId === "dongchang" && (S.palaceRole === "fanzi" || S.palaceRole === "dongchang_boss" || S.palaceRole === "eunuch" || flag("dongchang_invite"))) {
      acts.push({ label: "東廠報到／練檔", fn: function(){
        S.exp += 5; S.perception = Math.min(25, (S.perception||5)+ (Math.random()<0.25?1:0));
        showStory("檔案味刺鼻。你學會多記一筆人名。");
      }});
      if (S.palaceRole === "fanzi" && (S.karma||0) <= -35 && S.renown >= 20) {
        acts.push({ label: "【野心】取而代之・督公之位", fn: function(){
          startCombat("elite_bandit", function(){
            setPalaceRole("dongchang_boss"); setFate("dongchang_gong", "dead");
            S.renown += 10; adjustKarma(-5, "奪督公");
            showStory("舊督公倒下。廠印入手——你成了新的東廠督公。");
          });
        }});
      }
      if (flag("eunuch") && S.quests.side_palace_revenge && !S.quests.side_palace_revenge.done) {
        acts.push({ label: "【復仇】追查人牙子下落", fn: function(){
          S.quests.side_palace_revenge.step = Math.max(S.quests.side_palace_revenge.step, 2);
          setFlag("heard_slave_market");
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
      acts.push({ label: "璇璣殿請安", fn: function(){ talkNpc("jingandi"); } });
    }
    // Revenge confrontation
    if (locId === "slave_market" && flag("eunuch") && S.quests.side_palace_revenge && S.quests.side_palace_revenge.step >= 2 && !S.quests.side_palace_revenge.done) {
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
