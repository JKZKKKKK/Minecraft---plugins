//管理員選單

mc.listen(('onServerStarted'),()=> {

  var fm = mc.newSimpleForm()
  fm.setTitle('§l§c管理員選單')
  fm.setContent('§l§b發揮你的能力管理玩家')
  fm.addButton('§l§e隱形選單')
  fm.addButton('§l§e傳送玩家')
  fm.addButton('§l§eban玩家')
  fm.addButton('§l§e遊戲模式')
  fm.addButton('§l§e清除隱形')
  var = mc.newCommand('admin','§l§c管理員選單',PermType.GameMasters)
  cmd.overload()
  cmd.setCallback((_cmd,ori,_out,_res)=> {
    var player = ori.player
    player.sendForm(fm,(pl,id)=>{
      if (id == 0){
        player.mc.runcommand('inv')
      }
      else if (id == 1){
        player.mc.runcommand('AdTp')
      }
      else if (id == 2){
        player.mc.runcommand('BM')
      }
      else if (id == 3){
        player.mc.runcommand('GM')
      }
      else if (id == 4){
        player.mc.runcommand('CN')
      }
      else if (id == Null){
        player.tell('§l§f>>>§c關閉表單')
      }
    })
  })
  cmd.setup()
})
mc.listen(('onServerStarted'),()=> {
  var cmd = mc.newCommand('inv','§l§c隱形選單',PermType.GameMasters)
    var inv = mc.newCustomForm()
  inv.setTitle('§l§c隱形選單')
  inv.addLabel('§l§b可以選擇強度')
  inv.addSwitch('發送訊息離開世界','不做任何事'[true])
  inv.addSlider(強度,1,3)
  inv.addStepSlider(低,0)
  inv.addStepSlider(中,1)
  inv.addStepSlider(高,2)
  cmd.overload()
  cmd.setCallback((_cmd,ori,_out,_res) => {
    var player = ori.player
    player.sendForm(inv,(pl,id)=> {
      if (data[1] == true) {
        if (data[2] === 0){
          mc.broadcast('§e'+player+'§e 離開了遊戲')
          mc.runcommand ('effect '+player+' invisibility 9999999 4 true')
        }
        else if (data[2] === 1 ){
          mc.broadcast('§e'+player+'§e 離開了遊戲')
          mc.runcommand ('effect '+player+' invisibility 9999999 4 true')
        }
        else if (data[2] === 2 ){
          mc.broadcast('§e'+player+'§e 離開了遊戲')
          mc.runcommand ('effect '+player+' invisibility 9999999 4 true')
        }
      }
      else if (data[1] == false) {
        if (data[2] === 0){

          mc.broadcast('§e'+player+'§e 離開了遊戲')
          mc.runcommand ('effect '+player+' invisibility 9999999 4 true')

        }
        else if (data[2] === 1 ){
          mc.broadcast('§e'+player+'§e 離開了遊戲')
          mc.runcommand ('effect '+player+' invisibility 9999999 4 true')
        }
        else if (data[2] === 2 ){
          mc.broadcast('§e'+player+'§e 離開了遊戲')
          mc.runcommand ('effect '+player+' invisibility 9999999 4 true')
        }
      }
    })
  })
  cmd.setup()
})
mc.listen(('onServerStarted'),()=> {
  var cmd = mc.newCommand('AdTp','§l§c玩家傳送(admin)',PermType.GameMasters)
  var tp = mc.newCustomForm()
  tp.setTitle('§l§c玩家傳送')
  tp.addLabel('§l§b輸入玩家ID')
  tp.addInput('玩家ID')
  cmd.overload()
  cmd.setCallback((_cmd,ori,_out,_res) => {
    var player = ori.player
    player.sendForm(tp,(pl,id)=> {
      var data[1] = gp
      if (gp !== null){
        mc.runcommand('tp '+player+' '+gp)
      }
      if (gp == null) {
       player.tell('§c為填寫完全') 
      }
  })
  cmd.setup()
})
mc.listen(('onServerStarted'),()=> {
  var cmd = mc.newCommand('BM','§l§eBan選單',PermType.GameMasters)
  var bm = mc.newCustomForm()
  bm.setTitle('§l§cBan')
  bm.addLabel('§l§b想要的')
  bm.addLabel('§l§b輸入玩家ID')
  bm.addInput('玩家ID')
  bm.addLabel('理由')
  bm.addInput('理由')
  cmd.overload()
  cmd.setCallback((_cmd,ori,_out,_res) => {
    var player = ori.player
    player.sendForm(bm,(pl,id)=> {
      if (data[1] !== null) {
        if (data[2] !== null){
          var hj = data[1]
          var re = data[2]
          hj.kick('因為'+re+'被封禁')
        }
        else if (data[2] == null) {
          player.tell('輸入不確實')
        }
      }
      else if (data[1] == null) {
        player.tell('輸入不確實')
        if (data[2] !== null) {
          player.tell('輸入不確實')
        }
        else if (data[2] == null) {
          player.tell('輸入不確實')
        }
      }
    })
  cmd.setup()
})
mc.listen(('onServerStarted'),() => {
  var cmd = mc.newCommand('GM','遊戲模式',PermType.GameMasters)
  var gm = mc.newSimpleForm()
  gm.setTitle('選擇')
  gm.setContent('選擇')
  gm.addButton('創造')
  gm.addButton('生存')
  gm.addButton('冒險')
  cmd.overload()
  cmd.setCallback((_cmd,ori,_out,_res) => {
    var player = ori.player
    player.sendForm(gm,(pl,id)=> {
      if (id == 0) {
        mc.runcommand('gamemode create '+player)
      }
      else if (id == 1) {
        mc.runcommand('gamemode 1 '+player)
      }
      else if (id == 2) {
        mc.runcommand('gamemode 2 '+player)
      }
      else if (id == null) {
        player.tell('關閉選單')
      }
    })
  })
  cmd.setup()
})
mc.listen(('onServerStarted'),()=> {
  var cmd = mc.newCommand('CN','clear效果',PermType.GameMasters)
  cmd.overload()
  cmd.setCallback((_cmd,ori,_out,_res) => {
    var player = ori.player
    mc.runcommand('effect clear '+player)
  })
  cmd.setup()
})