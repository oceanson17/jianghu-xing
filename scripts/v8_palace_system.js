  // ========== V8: DEEP PALACE + HORSE + FACTION HOOKS ==========
  function ensurePalaceState() {
    if (typeof S.emperorFavor !== "number") S.emperorFavor = 0;
    if (typeof S.palaceHeat !== "number") S.palaceHeat = 0;
    if (!S.palaceMood) S.palaceMood = "平靜";
    if (!Array.isArray(S.palaceDayEvents)) S.palaceDayEvents = [];
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
      bumpEmperorFavor(8, "告密");
      adjustKarma(hi ? -1 : 2, "奏聞");
      setFlag("palace_affair_reported");
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
    if (typeof imprisonPlayer === "function") {
      try { imprisonPlayer("jingandi", "撞破私情"); } catch (e) {}
    } else {
      S.prison = { by: "jingandi", place: "huanggong", name: "慎刑司", paroleDays: 0, day: S.day };
      S.loc = "huanggong";
    }
    showStory("【殺機】大將軍刀落——你閃避不及，血濺宮磚。若非禁軍喝止，今夜已無你。\n你被拖入慎刑司。帝心大怒。（判定失敗 " + dodgeScore + " / " + need + "）");
    render();
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
        S.hp = Math.max(1, S.hp - 8);
        adjustKarma(1, "拒寵");
        setFlag("palace_resist_punished");
        recordPalaceEvent("palace_emperor_favor");
        showStory("【寵幸機緣】帝顏不悅。你被罰跪花廊至五更，膝青一塊——總算沒入慎刑司。");
      } else {
        bumpEmperorFavor(-15, "大怒");
        bumpPalaceHeat(12);
        adjustKarma(1, "拒寵");
        setFlag("palace_resist_dungeon");
        recordPalaceEvent("palace_emperor_favor");
        S.prison = { by: "jingandi", place: "huanggong", name: "慎刑司", paroleDays: 1, day: S.day };
        S.loc = "huanggong";
        showStory("【寵幸機緣】龍顏大怒：「趕出去——不，關起來！」你被拖入慎刑司。");
        render();
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
    const palaceLocs = { huanggong:1, neiting:1, hougong:1, yulin:1, dongchang:1 };
    if (!palaceLocs[S.loc]) return false;
    if (typeof isImprisoned === "function" && isImprisoned()) return false;
    const st = effectiveStats();
    const roleBoost = S.palaceRole ? 0.12 : 0.04;
    const heatBoost = Math.min(0.2, (S.palaceHeat || 0) * 0.002);
    const chance = Math.min(0.55, 0.10 + roleBoost + heatBoost + (st.perception || 0) * 0.008 + (st.luck || 0) * 0.006);
    if (!forceType && Math.random() > chance) return false;

    const canAffair = !palaceIncidentCooldown("palace_catch_affair", 2) && (S.loc === "hougong" || S.loc === "neiting" || forceType === "affair");
    const canFavor = !palaceIncidentCooldown("palace_emperor_favor", 3) &&
      (S.loc === "hougong" || S.loc === "neiting") &&
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
    // palace deliberate actions
    if (locId === "huanggong" || locId === "neiting" || locId === "hougong") {
      acts.push({ label: "夜巡宮牆", fn: function(){
        S.exp += 2;
        if (!maybePalaceIncident()) showStory("宮牆風急，燈籠搖晃。今夜無大事。");
      }});
      acts.push({ label: "聽殿角私語", fn: function(){
        if ((effectiveStats().perception || 0) + Math.random() * 10 > 12) maybePalaceIncident("affair");
        else showStory("私語被風吹散，只餘環佩輕響。");
      }});
    }
    if (locId === "hougong" || locId === "neiting") {
      acts.push({ label: "奉召覲見", fn: function(){
        talkNpc("jingandi");
        setTimeout(function(){ try { maybePalaceIncident("favor"); } catch(e){} }, 300);
      }});
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
