
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
    boatman: { personality:"timid", label:"老實船家", martial:15, awareness:30, desc:"遇險求饒。", onDetect:"flee", onOpenAttack:"flee", onSteal:"flee", prisonPlace:null, prisonName:null, paroleDays:0 }
  };
  function npcProfile(id) {
    return NPC_PROFILES[id] || { personality:"lawful", label:"江湖人", martial:40, awareness:45, desc:"", onDetect:"attack", onOpenAttack:"attack", onSteal:"rebuke", prisonPlace:null, prisonName:null, paroleDays:0 };
  }
