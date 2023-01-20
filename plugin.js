mc.listen('onServerStarted',() => {
  var cmd = mc.newcommand('chat','§l§e管理聊天',PermType.GameMasters)
  var array = ['CM','AM','ST']
  cmd.setEnum('arg1',array)
  cmd.mandatory('arg1',ParamType.String)
  var Boolean = ['true','false']
  cmd.setEnum('arg2',Boolean)
  cmd.mandatory('arg2',ParamType.Bool)
  cmd.overload(['arg1','arg2'])
  cmd.setCallback((_cmd,ori,out,res) => {
    const {arg1,arg2} = res
    var pl = ori.player
    if (arg1 == 'CM') {
      if (arg2 == 'true') {
        var cm = true
        pl.tell('§l§a已開啟聊天稱號')
      }
      else if (arg2 == 'false') {
        var cm = false
        pl.tell('§l§c已關閉聊天稱號')
      }
    }
    else if (arg1 == 'AM') {
      if (arg2 == 'true') {
        var am = true
        pl.tell('§l§a已開啟自動設定')
      }
      else if (arg2 == 'false') {
        var am = false
        pl.tell('§l§c已關閉自動設定')
      }
    }
    else if (arg1 == 'ST') {
      if (arg2 == 'true') {
        var st = true
        pl.tell('§l§a已開啟自定義設定')
      }
      else if (arg2 == 'false') {
        var st = false
        pl.tell('§l§c已關閉自定義設定')
      }
    }
  })
  cmd.setup()
  mc.listen('onChat',(pl,msg)=> {
      if (cm == null) {
        pl.tell('<'+pl+'> '+msg)
      } else if (cm == true) {
          if (pl.hasTag('manage')) {
            if (pl.hasTag('owner')) {
                mc.broadcast('§8[§cOwner§8]§e' + pl.realName + '§b>>§6' + msg)
            } else if (pl.hasTag('admin')) {
                mc.broadcast('§8[§gAdmin§8]§6' + pl.realName + '§b>>§b' + msg) 
            } else if (pl.hasTag('builder')) {
                mc.broadcast('§8[§aBuilder§8]§e' + pl.realName + '§b>>§e' + msg)
            } else if (pl.hasTag('bugs')) {
                mc.broadcast('§8[§dVulnerability Checker§8]§e' + pl.realName + '§b>>§a' + msg)
            } else if (pl.hasTag('develop')) {
                mc.broadcast('§8[§bPlugins Develop§8]§e' + pl.realName + '§b>>§c' + msg) 
            } else if (pl.hasTag('helpadmin')) {
                mc.broadcast('§8[§9Auxiliary Admin§8]§e' + pl.realName + '§b>>§1' + msg)
            }
        } else if (pl.hasTag('donate')) {
            if (pl.hasTag('mvp')) {
                mc.broadcast('§b[MVP(D)] ' + pl.realName + '§b>>§e' + msg)
            } else if (pl.hasTag('mvpp')){
                mc.broadcast('§b[MVP§c+§b(D)]' + pl.realName + '§b>>§d' + msg)
            } else if (pl.hasTag('mvppp')) {
                mc.broadcast('§6[MVP§c++§6(D)]' + pl.realName + '§b>>§b' + msg)
            } else if ('vip'){
                mc.broadcast('§a[VIP(D)]' + pl.realName + '§b>>§6' + msg)
            } else if ('vipp') {
                mc.broadcast('§a[VIP§6+§a(D)]' + pl.realName + '§b>>§6' + msg)
            } 
        } else {
            if (pl.hasTag('yt')) {
                mc.broadcast('§c[§fYOUTUBE§c]' + pl.realName + '§b>>§f' + msg)
            } else if (pl.hasTag('mvp')) {
                mc.broadcast('§b[MVP] ' + pl.realName + '§b>>§e' + msg)
            } else if (pl.hasTag('mvpp')){
                mc.broadcast('§b[MVP§c+§b]' + pl.realName + '§b>>§d' + msg)
            } else if (pl.hasTag('vip')){
                mc.broadcast('§a[VIP]' + pl.realName + '§b>>§6' + msg)
            } else if (pl.hasTag('vipp')) {
                mc.broadcast('§a[VIP§6+§a]' + pl.realName + '§b>>§6' + msg)
            } else if (pl.hasTag('vipp')) {
                mc.broadcast('§a[VIP§6++§a]' + pl.realName + '§b>>§6' + msg)
            } else {
                mc.broadcast('§f[Player]' + pl.realName + '>>' + msg)
            }
        }
      }
      return false
  })
})
mc.listen('onChat',(pl,msg)=> {
  if (AM == true) {
    if (msg == fuck) {
      pl.tell('§l§c>>>請注意你的言詞')
      log(pl.realName + '說了'+ msg)
    }
    else if (msg == 幹) {
      pl.tell('§l§c>>>請注意你的言詞')
      log(pl.realName + '說了'+ msg)
    }
    else if (msg == 靠) {
      pl.tell('§l§c>>>請注意你的言詞')
      log(pl.realName + '說了'+ msg)
    }
    //其他的自己想啊
  }
  else if (pl.hasTag('mute')) {
    pl.tell('§l§aMUTE Don‘t Talk')
  }
  else if (AM !== true) {
    return false
  }
})
mc.listen('onServerStarted',()=> {
  var cmd = mc.newcommand('CM','§l§e自定義設定',PermType.GameMasters)
  var fm = mc.newSimpleForm()
  fm.setTitle('§l§a聊天選單')
  fm.setContent('§l§b選擇')
  fm.addButton('§l§emute')
  fm.addButton('§l§eunmute')
  fm.addButton('§l§e沒想法')
  cmd.overload()
  cmd.setCallback((_cmd,ori,_out,_res) => {
    var pl = ori.player
    if (ST == true) {
        pl.sendForm(fm,(pl,id)=> {
          if (id == 0) {
            pl.runcmd('mute')
          }
          else if (id == 1) {
            pl.runcmd('unmute')
          }
          else if (id == 2) {
            pl.tell('§l§c錯誤指令')
          }
        })
      }
      else if (ST == false) {
        pl.tell('§l§c>>>並未開啟此設定/chat ST 來做設定')
      }
      else {
        pl.tell('§l§c>>>並未進行設定請使用/chat ST 來做設定')
      }
  })
  cmd.setup()
})
mc.listen('onServerStarted',()=> {
  var cmd = mc.newcommand('mute','§l§e禁言',PermType.GameMasters)
  var mu = mc.newCustomForm()
  mu.setTitle('§l§emute')
  mu.addLabel('§l§b依照指示去進行')
  mu.addInput('§l§a玩家ID'['player_name'])
  mu.addInput('§l§g原因'['reason'])
  cmd.overload()
  cmd.setCallback((_cmd,ori,_out,_res) => {
    var pl = ori.player
    pl.sendForm(mu,(pl,id)=> {
      if (data[0] !== null) {
        if (mc.getOnlinePlayers.includes(data[0]) == true) {
          if (data[1] !== null) {
            mc.runcmd('tag '+data[0]+' add mute')
            pl.tell('§l§e>>>禁言成功§lb玩家名稱§g'+data[0]+'§a因為:'+data[1])
             log('§l§e>>>禁言成功§lb玩家名稱§g'+data[0]+'§a因為:'+data[1])
             log('§l§g由'+pl+'執行')
          }
          else if (data[1] == null) {
            pl.tell('§l§c表單填入不正確')
          }
        }
        else if (mc.getOnlinePlayers.includes(data[0]) == false) {
          pl.tell('§l§c表單填入不正確')
        }
      }
      else if (data[0] == null) {
        pl.tell('§l§c表單填入失敗')
      }
    })
  })
  cmd.setup()
})
mc.listen('onServerStarted',()=> {
  var cmd = mc.newcommand('unmute','§l§e解除禁言',PermType.GameMasters)
  var mu = mc.newCustomForm()
  mu.setTitle('§l§eunmute')
  mu.addLabel('§l§b依照指示去進行')
  mu.addInput('§l§a玩家ID'['player_name'])
  mu.addInput('§l§g原因'['reason'])
  cmd.overload()
  cmd.setCallback((_cmd,ori,_out,_res) => {
    var pl = ori.player
    pl.sendForm(mu,(pl,id)=> {
      if (data[0] !== null) {
        if (mc.getOnlinePlayers.includes(data[0]) == true) {
          if (data[1] !== null) {
            mc.runcmd('tag '+data[0]+' remove mute')
            pl.tell('§l§e>>>解除禁言成功§lb玩家名稱§g'+data[0]+'§a因為:'+data[1])
             log('§l§e>>>解除禁言成功§lb玩家名稱§g'+data[0]+'§a因為:'+data[1])
             log('§l§g由'+pl+'執行解除')
          }
          else if (data[1] == null) {
            pl.tell('§l§c表單填入不正確')
          }
        }
        else if (mc.getOnlinePlayers.includes(data[0]) == false) {
          pl.tell('§l§c表單填入不正確')
        }
      }
      else if (data[0] == null) {
        pl.tell('§l§c表單填入失敗')
      }
    })
  })
  cmd.setup()
})