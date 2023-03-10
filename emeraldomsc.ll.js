//LiteLoaderScript Dev Helper
/// <reference path="C:\Users\pc\.vscode\dts\HelperLib-master\src/dts/HelperLib-master/src/index.d.ts"/> 


ll.registerPlugin(
    /* name */ "omsc綠寶石伺服器插件",
    /* introduction */ "OMSC插件",
    /* version */ [0,0,1],
    /* otherInformation */ {}
); 


//reload本插件
mc.regPlayerCmd('resc', "§l§e重新加載OMSC綠寶石插件",(pl) => {
    if (pl.isOP()) {
        pl.tell('§l§e正在重新加載插件...')
        setTimeout('§l§e插件已重新加載',5000)
        mc.runcmd('ll reload emeraldomsc.ll.js')
    } else {
        pl.tell('§l§c你不是管理員，無法使用該指令')
    }
})

//計分板
mc.listen('onServerStarted',() => {
    mc.regConsoleCmd('score','score', () => {
    mc.newScoreObjective('money', '閃幣')
    mc.newScoreObjective('level', '等級')
    mc.newScoreObjective('exp','經驗值')
    mc.newScoreObjective('times','挖掘次數')
    mc.newScoreObjective('sec','秒')
    mc.newScoreObjective('min','分')
    mc.newScoreObjective('hours','小時')
    mc.newScoreObjective('day','天')
    mc.newScoreObjective('point','點數')
    mc.newScoreObjective('ownercoins','服主幣')
    })
})

//玩家首次進入
mc.listen('onJoin',(pl) => {
    if (pl.hasTag('first') == false) {
        pl.giveItem(mc.newItem(NBT.parseSNBT('{"Count":1b,"Damage":0s,"Name":"minecraft:writable_book","WasPickedUp":0b,"tag":{"pages":[{"photoname":"","text":"§l§b歡迎你加入OMSC伺服器！\n§l§6我是本服的新手教學書\n§l§d閲讀這本書 來學習怎麽玩\n§l§d本服吧\n§l§9新玩家你好，我是本服服主，§9§l杯子小\n§l§a伺服器類型-綠寶石商店\n§c本服有著完美的插件體系\n§l§b所本服有地方都能用選單/指令前往"},{"photoname":"","text":""},{"photoname":"","text":"§l§9伺服器常用指令\n/mine - 前往最原本的礦場\n/vipmine - 前往VIP礦場\n/vippmine - 前往VIP+礦場\n/vipppmine - 前往VIP++礦場\n§l§9/mvpmine - 前往MVP礦場\n§l§9/mvppmine - 前往MVP+礦場\n§l§9/mvpppmine-前往MVP++礦場\n/rank - 購買Rank"},{"photoname":"","text":""},{"photoname":"","text":""}]}}')))
        pl.giveItem(mc.newItem(NBT.parseSNBT('{"CanDestroy":["minecraft:emerald_block","minecraft:emerald_ore"],"Count":1b,"Damage":0s,"Name":"minecraft:iron_pickaxe","WasPickedUp":0b,"tag":{"Damage":0}}')))
        pl.addScore('money',500)
        pl.setScore('level', 1)
        pl.setScore('exp', 0)
        pl.addTag('first')
        mc.runcmd(`give \"${pl.realName}\" compass`)
        mc.broadcast('§l§e歡迎新玩家' + pl.realName + '加入伺服器')
        log(pl.realName + '首次加入伺服器')

        var fm = mc.newSimpleForm()
        fm.setTitle('§l§c本§6伺§e服§a器§2條§b款')
        fm.setContent('§l§b歡迎你加入OMSC伺服器\n§e我是本服的服主，杯子小以下是一些有關本伺服器的條款，請仔細閲讀！§d\n1.伺服器會在你每次進入伺服器時記錄下你的IP、使用設備和你的Xuid\n2.伺服器的所有系統基本上都是由插件製作，如果有發現任何Bug，但是不回報，玩家將會處以重罰\n3.任何色情言論/粗俗語言，玩家都會被封禁1天-永久天，根據次數決定\n4.非因爲伺服器的原因而導致物品消失，本服將不予賠償(本服有記錄)\n5伺服器禁止使用外挂，違規者將會被永久封禁\n5如玩家遭到管理員的惡意判罰，例如無理由封禁，玩家需要在一天内到Discord開"回報工單"否則不予處理\n\n\n§6伺服器條款到這裏，如果玩家接受本服的條款請按"同意伺服器退款"，不同意請按"不同意伺服器條款"\n\n\n\n伺服器Discord:https://discord.gg/VMN3cgeUBd')
        fm.addButton('§l§a同意伺服器條款')
        fm.addButton('§l§c不同意伺服器條款')
        pl.sendForm(fm,(pl,id) => {
            if (id == 0) {
                pl.tell('§l§b感謝你同意本服條款！')
                log(pl.realName + '同意伺服器條款')
                var confirm = {}
                confirm = data.parseJson(file.readFrom('plugins/主插件/terms.json'))
                confirm[pl.realName] = '在' + system.getTimeStr() + '同意伺服器條款'
                file.writeTo('plugins/主插件/terms.json', JSON.stringify(confirm,null,'\t'))
            } else if (id == 1) {
                mc.runcmd(`clear \"${pl.realName}\"`)
                pl.kick('§l§c你未能夠同意伺服器條款！')
                pl.removeTag('first')
                log(pl.realName + '不同意伺服器條款')
            } else if (id = 'Null') {
                mc.runcmd(`clear \"${pl.realName}\"`)
                pl.kick('§l§c你未能夠同意伺服器條款！')
                pl.removeTag('first')
                log(pl.realName + '不同意伺服器條款')
            }
        })
    }
})

//聊天訊息
mc.listen('onChat',(pl,msg)=> {
    if (pl.hasTag('team')) {
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
        } else if (pl.hasTag('mute')) {
           pl.tell('§l§c>>>你已被禁言§e有任何問題請去Discord群組反應§a(請保持禮貌)')
        } else {
            mc.broadcast('§f[Player]' + pl.realName + '>>' + msg)
        }
    }
    return false
})

//加入訊息
mc.listen('onJoin', (pl) => {
    if (pl.hasTag('vip')) {
        mc.broadcast('§a歡迎VIP玩家' + pl.realName + '加入伺服器')
    } else if (pl.hasTag('vipp')) {
        mc.broadcast('§a歡迎VIP§6+§a玩家' + pl.realName + '加入伺服器')
    } else if (pl.hasTag('vippp')) {
        mc.broadcast('§a歡迎VIP§6++§a玩家' + pl.realName + '加入伺服器')
    } else if (pl.hasTag('mvp')) {
        mc.broadcast('§6歡迎MVP§6玩家' + pl.realName + '加入伺服器')
    } else if (pl.hasTag('mvpp')) {
        mc.broadcast('§6歡迎MVP§c+§6玩家' + pl.realName + '加入伺服器')
    } else if (pl.hasTag('mvppp')) {
        mc.broadcast('§6歡迎MVP§c++§6玩家' + pl.realName + '加入伺服器')
    } else if (pl.hasTag('yt')) {
        mc.broadcast('§c歡迎YouTube玩家' + pl.realName + '加入伺服器')
    } else if (pl.hasTag('team')) { 
        mc.broadcast('§b歡迎伺服器團隊成員' + pl.realName + '加入伺服器')
    } else{
        mc.broadcast('§f歡迎玩家' + pl.realName + '加入伺服器')
    }
})

//簽到系統
let scoretest = mc.getScoreObjective("lastsignday")

if (scoretest == null) {

    mc.newScoreObjective("lastsignday", "§c上次簽到日");
    log("已經創建初始記分板")
}
let scoretest2 = mc.getScoreObjective("keepsignday")
if (scoretest == null) {
    mc.newScoreObjective("keepsignday", "§c總連續簽到次");
    log("已經創建初始記分板-2")
}
let scoretest3 = mc.getScoreObjective("totalsignday")
if (scoretest == null) {
    mc.newScoreObjective("totalsignday", "§c總簽到次");
    log("已經創建初始記分板-3")
}

mc.listen("onServerStarted", () => {
    const cmd = mc.newCommand("sign", "§e簽到", PermType.GameMasters);
    cmd.setAlias("daily");
    cmd.overload([]);
    cmd.setCallback((cmd, ori, out, res) => {
        let time = new Date
        let alltime = time.getTime()
        let nowtimeinday = Math.trunc(alltime / 86400000) //抓取現在時間 -> 10001day
        let pl = ori.player;
        let score = pl.getScore('lastsignday') //抓取簽到 -> 10000day
        log("now:" + nowtimeinday)
        log("pl:" + score)
        if (score < nowtimeinday) {
            if ((nowtimeinday - score) >= 2) {
                pl.tell('§e[§g簽到系統§e] §7>> §a成功簽到! 本日為簽到第§d1§a日!')
                pl.setScore('keepsignday', 0)
                pl.setScore('lastsignday', nowtimeinday) // 10000day
                pl.tell(`§e[§g簽到系統§e] §7>> §e已發放第一日獎勵 §7- §e$1000`)
                            pl.addScore('money', 1000)
                            pl.addScore('totalsignday', 1)
            } else {
                pl.addScore('keepsignday', 1)
                pl.setScore('lastsignday', nowtimeinday)
                let sckeepsignday = (pl.getScore('keepsignday') + 1)
                pl.tell(`§e[§g簽到系統§e] §7>> §a成功簽到! 本日為連續簽到的第§d${sckeepsignday}§a日!`)
                let scorechanged = Math.trunc(sckeepsignday / 10); // 10000 - 10001 -> 0
                if (scorechanged >= 1) {
                    let scorenow = Math.trunc(sckeepsignday - (scorechanged * 10));
                    log("scorenow" + scorenow)
                    switch (scorenow) {
                        case 1:
                            pl.tell(`§e[§g簽到系統§e] §7>> §e已發放第一日獎勵 §7- §e$1000`)
                            pl.addScore('money', 1000)
                            pl.addScore('totalsignday', 1)
                            break;
                        case 2:
                            pl.tell(`§e[§g簽到系統§e] §7>> §e已發放第二日獎勵 §7- §e$1500`)
                            pl.addScore('money', 1500)
                            pl.addScore('totalsignday', 1)
                            break;
                        case 3:
                            pl.tell(`§e[§g簽到系統§e] §7>> §e已發放第三日獎勵 §7- §e$2000`)
                            pl.addScore('money', 2000)
                            pl.addScore('totalsignday', 1)
                            break;
                        case 4:
                            pl.tell(`§e[§g簽到系統§e] §7>> §e已發放第四日獎勵 §7- §e$2500`)
                            pl.addScore('money', 2500)
                            pl.addScore('totalsignday', 1)
                            break;
                        case 5:
                            pl.tell(`§e[§g簽到系統§e] §7>> §e已發放第五日獎勵 §7- §ax10`)
                            pl.addScore('hope', 10)
                            pl.addScore('totalsignday', 1)
                            break;
                        case 6:
                            pl.tell(`§e[§g簽到系統§e] §7>> §e已發放第六日獎勵 §7- §e$3000`)
                            pl.addScore('money', 3000)
                            pl.addScore('totalsignday', 1)
                            break;
                        case 7:
                            pl.tell(`§e[§g簽到系統§e] §7>> §e已發放第七日獎勵 §7- §e$3500`)
                            pl.addScore('money', 3500)
                            pl.addScore('totalsignday', 1)
                            break;
                        case 8:
                            pl.tell(`§e[§g簽到系統§e] §7>> §e已發放第八日獎勵 §7- §e$4000`)
                            pl.addScore('money', 4000)
                            pl.addScore('totalsignday', 1)
                            break;
                        case 9:
                            pl.tell(`§e[§g簽到系統§e] §7>> §e已發放第九日獎勵 §7- §e$4500`)
                            pl.addScore('money', 4500)
                            pl.addScore('totalsignday', 1)
                            break;
                        case 10:
                            pl.tell(`§e[§g簽到系統§e] §7>> §e已發放第十日獎勵 §7- §cx5`)
                            pl.addScore('raingold', 5)
                            pl.addScore('totalsignday', 1)
                            break;
                        case 0:
                            pl.tell(`§e[§g簽到系統§e] §7>> §e已發放第十日獎勵 §7- §cx5`)
                            pl.addScore('raingold', 5)
                            pl.addScore('totalsignday', 1)
                            break;
                        default:
                            pl.tell(`§c錯誤:${scorenow}`)
                    }
                } else {
                    let scorenow = Math.trunc(sckeepsignday);
                    log("scorenow" + scorenow)
                    switch (scorenow) {
                        case 1:
                            pl.tell(`§e[§g簽到系統§e] §7>> §e已發放第一日獎勵 §7- §e$1000`)
                            pl.addScore('money', 1000)
                            pl.addScore('totalsignday', 1)
                            break;
                        case 2:
                            pl.tell(`§e[§g簽到系統§e] §7>> §e已發放第二日獎勵 §7- §e$1500`)
                            pl.addScore('money', 1500)
                            pl.addScore('totalsignday', 1)
                            break;
                        case 3:
                            pl.tell(`§e[§g簽到系統§e] §7>> §e已發放第三日獎勵 §7- §e$2000`)
                            pl.addScore('money', 2000)
                            pl.addScore('totalsignday', 1)
                            break;
                        case 4:
                            pl.tell(`§e[§g簽到系統§e] §7>> §e已發放第四日獎勵 §7- §e$2500`)
                            pl.addScore('money', 2500)
                            pl.addScore('totalsignday', 1)
                            break;
                        case 5:
                            pl.tell(`§e[§g簽到系統§e] §7>> §e已發放第五日獎勵 §7- §ax10`)
                            pl.addScore('hope', 10)
                            pl.addScore('totalsignday', 1)
                            break;
                        case 6:
                            pl.tell(`§e[§g簽到系統§e] §7>> §e已發放第六日獎勵 §7- §e$3000`)
                            pl.addScore('money', 3000)
                            pl.addScore('totalsignday', 1)
                            break;
                        case 7:
                            pl.tell(`§e[§g簽到系統§e] §7>> §e已發放第七日獎勵 §7- §e$3500`)
                            pl.addScore('money', 3500)
                            pl.addScore('totalsignday', 1)
                            break;
                        case 8:
                            pl.tell(`§e[§g簽到系統§e] §7>> §e已發放第八日獎勵 §7- §e$4000`)
                            pl.addScore('money', 4000)
                            pl.addScore('totalsignday', 1)
                            break;
                        case 9:
                            pl.tell(`§e[§g簽到系統§e] §7>> §e已發放第九日獎勵 §7- §e$4500`)
                            pl.addScore('money', 4500)
                            pl.addScore('totalsignday', 1)
                            break;
                        case 10:
                            pl.tell(`§e[§g簽到系統§e] §7>> §e已發放第十日獎勵 §7- §cx5`)
                            pl.addScore('raingold', 5)
                            pl.addScore('totalsignday', 1)
                            break;
                        case 0:
                            pl.tell(`§e[§g簽到系統§e] §7>> §e已發放第十日獎勵 §7- §cx5`)
                            pl.addScore('raingold', 5)
                            pl.addScore('totalsignday', 1)
                            break;
                        default:
                            pl.tell(`§c錯誤:${scorenow}`)
                    }
                }
            }
        } else {
            pl.tell('§e[§g簽到系統§e] §7>> §c本日已經簽到過了!請等待到午夜12點後再次簽到。')
        }
    });
    cmd.setup();
});

//加入簽到
mc.listen('onJoin',(pl)=>{
  var sign = mc.newCustomForm()
  sign.setTitle('§l§e簽到系統')
  sign.addLabel('§l§b每天可以簽到一次')
  sign.addLabel('§l§b午夜十二點重製')
  sign.addLabel('§l§b累積簽到越多獎勵越多')
  pl.sendForm(sign,(pl,id) => {
    pl.runcmd('sign')
  })
})

//後臺顯示資料
mc.listen('onJoin', function(player) {
    var ip = {}
    var dv = player.getDevice()
    colorLog("yellow", `玩家${player.name}使用設備${dv.os},玩家IP是:${dv.ip},玩家加入是的延遲是${dv.avgPing}`)
})

//更改Motd
mc.listen("onServerStarted",() => {
    const cmd = mc.newCommand('motd', "設定伺服器motd");
    cmd.mandatory('motd', ParamType.String);
    cmd.overload(['motd']);
    cmd.setCallback((_cmd, _ori, out, res)=>{
        const { motd } = res
        mc.setMotd(`${motd}`);
        out.success("§l§eMotd已更換成§r" + motd)
    });
    cmd.setup()
    colorLog('yellow',`Motd插件成功加載`)
})

//關閉伺服器
mc.listen('onServerStarted',() => {
    mc.regPlayerCmd('stopser', '§l§c關閉伺服器',function(pl){
        if (pl.isOP() == true) {
            mc.broadcast('§l§c伺服器將在5秒後關閉')
            setTimeout(`mc.broadcast('§l§c伺服器將在4秒後關閉')`,1000)
            setTimeout(`mc.broadcast('§l§c伺服器將在3秒後關閉')`,2000)
            setTimeout(`mc.broadcast('§l§c伺服器將在2秒後關閉')`,3000)
            setTimeout(`mc.broadcast('§l§c伺服器將在1秒後關閉')`,4000)
            setTimeout(`mc.broadcast('§l§c伺服器將在0秒後關閉')`,4500)
            setTimeout(`mc.runcmd('stop')`,5000)
        } else {
            pl.tell('§l§c你不是管理員無法使用該指令')
        }
    })
})

//Bossbar
mc.listen('onJoin',(pl) => {
    pl.setBossBar(1,'§l§c歡迎§6你加§e入本§a伺服§2器，§b請你§d記得§c加入§6本服§eDC', 100,8)
})

//Discord
mc.listen('onServerStarted',() => {
    mc.regPlayerCmd('discord','獲取伺服器Discord群組連結', (pl) => {
        pl.tell('§l§6本服Discord代碼:VMN3cgeUBd')
    })
    mc.regPlayerCmd('dc','獲取伺服器Discord群組連結', (pl) => {
        pl.tell('§l§6本服Discord代碼:VMN3cgeUBd')
    })
})

//購買Rank
mc.listen('onServerStarted',() => {
    var fm = mc.newSimpleForm()
    fm.setTitle('§l§e伺服器Rank商店')
    fm.setContent('§d點擊以下Rank便可購買，(D)的意思是Donate(贊助)，需要到Discord贊助，YouTube是要到Discord申請')
    fm.addButton('§aVIP')
    fm.addButton('§aVIP§6+')
    fm.addButton('§aVIP§6++')
    fm.addButton('§bMVP')
    fm.addButton('§bMVP§c+')
    fm.addButton('§aVIP§a(D)')
    fm.addButton('§aVIP§6+§a(D)')
    fm.addButton('§bMVP(D)')
    fm.addButton('§bMVP§c+§b(D)')
    fm.addButton('§6MVP§c++§6(D)')
    fm.addButton('§fYou§cTube')
    var cmd  = mc.newCommand('rank', '伺服器Rank商店', PermType.Any)
    cmd.overload()
    cmd.setCallback((_cmd,ori,_out,_res) => {
        ori.player.sendForm(fm,(player,id) => {
            if (id == 0) {
                if (player.hasTag('vip') == false && player.hasTag('vipp') == false && player.hasTag('vippp') == false && player.hasTag('mvp') == false && player.hasTag('mvpp') == false && player.hasTag('mvppp') == false && player.hasTag('team') == false && player.hasTag('yt') == false) {
                    if (player.getScore('money') >= 5000) {
                        player.addTag('vip')
                        player.reduceScore('money', 5000)
                        player.tell('§l§b成功購買§aVIP')
                        log(pl.realName + '購買了VIP')
                    } else {
                        var need = 5000 - player.getScore('money')
                        player.tell('§l§c你的閃幣不足，需要5000閃幣。你還差' + need)
                    }
                } else {
                    player.tell('§l§c你可能已經擁有更高級的Rank')
                }
            } else if (id == 1) {
                if (player.hasTag('vip') == true && player.hasTag('vipp') == false && player.hasTag('vippp') == false && player.hasTag('mvp') == false && player.hasTag('mvpp') == false && player.hasTag('mvppp') == false && player.hasTag('team') == false && player.hasTag('yt') == false) {
                    if (player.getScore('money') >= 10000) {
                        player.addTag('vipp')
                        player.removeTag('vip')
                        player.reduceScore('money', 10000)
                        player.tell('§l§b成功購買§aVIP§6+')
                        log(pl.realName + '購買了VIP+')
                    } else {
                        var need = 10000 - player.getScore('money')
                        player.tell('§l§c你的閃幣不足，需要10000閃幣。你還差' + need)
                    }
                } else if (player.hasTag('vip') == false && player.hasTag('vipp') == false&&player.hasTag('vippp') == false && player.hasTag('mvp') == false && player.hasTag('mvpp') == false&& player.hasTag('mvppp') == false && player.hasTag('yt') == false && player.hasTag('team') == false){
                    player.tell('§l§c你未擁有§aVIP §cRank，所以無法購買')
                } else {
                    player.tell('§l§c你已經擁有更高級的Rank')
                }
            } else if (id == 2) {
                if (player.hasTag('vip') == false && player.hasTag('vipp') == true && player.hasTag('vippp') == false && player.hasTag('mvp') == false && player.hasTag('mvpp') == false && player.hasTag('mvppp') == false && player.hasTag('team') == false&& player.hasTag('yt') == false) {
                    if (player.getScore('money') >= 25000) {
                        player.addTag('vippp')
                        player.removeTag('vipp')
                        player.reduceScore('money', 25000)
                        player.tell('§l§b成功購買§aVIP++')
                        log(pl.realName + '購買了VIP++')
                    } else {
                        var need = 25000 - player.getScore('money')
                        player.tell('§l§c你的閃幣不足，需要25000閃幣。你還差' + need)
                    }
                } else if (player.hasTag('vipp') == false && player.hasTag('vippp') == false && player.hasTag('mvp') == false && player.hasTag('mvpp') == false&& player.hasTag('mvppp') == false&& player.hasTag('yt') == false) {
                    player.tell('§l§c你未擁有§aVIP§6+ §cRank，所以無法購買')
                } else {
                    player.tell('§l§c你已經擁有更高級的Rank')
                }
            }else if (id == 3) {
                if (player.hasTag('vip') == false && player.hasTag('vipp') == false && player.hasTag('vippp') == true && player.hasTag('mvp') == false && player.hasTag('mvpp') == false && player.hasTag('mvppp') == false && player.hasTag('team') == false&& player.hasTag('yt') == false) {
                    if (player.getScore('money') >= 50000) {
                        player.addTag('mvp')
                        player.removeTag('vippp')
                        player.reduceScore('money', 50000)
                        player.tell('§l§b成功購買§bMVP')
                        log(pl.realName + '購買了MVP')
                    } else {
                        var need = 25000 - player.getScore('money')
                        player.tell('§l§c你的閃幣不足，需要50000閃幣。你還差' + need)
                    }
                } else if (player.hasTag('vippp') == false && player.hasTag('mvp') == false && player.hasTag('mvpp') == false&& player.hasTag('mvppp') == false && player.hasTag('yt') == false){
                    player.tell('§l§c你未擁有§aVIP§6++ §cRank，所以無法購買')
                } else {
                    player.tell('§l§c你已經擁有更高級的Rank')
                }
            } else if (id == 4) {
                if (player.hasTag('vip') == false && player.hasTag('vipp') == false && player.hasTag('vippp') == false && player.hasTag('mvp') == true && player.hasTag('mvpp') == false && player.hasTag('mvppp') == false && player.hasTag('team') == false && player.hasTag('yt') == false) {
                    if (player.getScore('money') >= 100000) {
                        player.addTag('mvpp')
                        player.removeTag('mvp')
                        player.reduceScore('money', 100000)
                        player.tell('§l§b成功購買§bMVP§c+')
                        log(pl.realName + '購買了MVP+')
                    } else {
                        var need = 100000 - player.getScore('money')
                        player.tell('§l§c你的閃幣不足，需要100000閃幣。你還差' + need)
                    }
                } else if (player.hasTag('mvp') == false && player.hasTag('mvpp') == false&& player.hasTag('mvppp') == false && player.hasTag('yt') == false){
                    player.tell('§l§c你未擁有§bMVP §cRank，所以無法購買')
                } else {
                    player.tell('§l§c你已經擁有更高級的Rank')
                }
            } else if (id >= 5 && id < 10) {
                player.tell('§l§c此Rank需要贊助伺服器才可以獲得')
            } else if (id == 10) {
                player.tell('§l§b此Rank需要到Discord申請§fYou§cTube §bRank')
            }
        })
    })
    cmd.setup();
})

//拿NBT Data
mc.listen("onServerStarted",()=>{
    var cmd = mc.newCommand('nbt', 'getnbt')
    cmd.overload()
    cmd.setCallback((_cmd,ori,_out,_res) => {
        var itemnbt = ori.player.getHand()
        var nbt = itemnbt.getNbt().toSNBT()
        log(nbt)
    })
    cmd.setup()
})

//Sidebar
setInterval(() => {
    var pls = mc.getOnlinePlayers()
    for (pl in pls){
        var pl = pls[pl]
        var dv = pl.getDevice()
        var rank = {}
        if (pl.hasTag('vip')) {
            rank = '§aVIP'
        } else if (pl.hasTag('vipp')) {
            rank = '§aVIP§6+'
        } else if (pl.hasTag('vippp')) {
            rank = '§aVIP§6++'
        } else if (pl.hasTag('mvp')) {
            rank = '§bMVP'
        } else if (pl.hasTag('mvpp')) {
            rank = '§bMVP§c+'
        } else if (pl.hasTag('mvppp')) {
            rank = '§bMVP§c++'
        } else if (pl.hasTag('team')) {
            rank = '§6Server Team'
        } else {
            rank = 'Null'
        }

        var str0 = '§l§e|§r §b玩家名稱: $o.name'.replace('$o.name', pl.realName)
        var str1 = '§l§e|§r §b你擁有$o.money閃幣'.replace('$o.money', pl.getScore('money'))
        var str2 = '§l§e|§r §b服主幣$o.ownermoney 點數$o.point'.replace('$o.ownermoney', pl.getScore('ownercoins')).replace('$o.point', pl.getScore('point'))
        var str3 = '§l§e|§r §b你的等級:$o.level($o.exp)'.replace('$o.level', pl.getScore('level')).replace('$o.exp', pl.getScore('exp'))
        var str4 = '§l§e|§r §b你的延遲:$o.pingms'.replace('$o.ping', dv.avgPing)
        var str5 = '§l§e|§r §b你的設備:$o.os'.replace('$o.os', dv.os)
        var str6 = '§l§e|§r §b在綫人數:$o.online/100'.replace('$o.online', mc.getOnlinePlayers().length)
        var str7 = '§l§e|§r §b你的Rank:$o.rank'.replace('$o.rank', rank)
        var str8 = '§l§e|§r §b伺服器IP:omsctop.ddns.net(待定)'
        var str9 = '§l§e|§r §b埠:19132'
        var str10 = '§l§e|§r §b伺服器版本:MCPE$o.version'.replace('$o.version', mc.getBDSVersion())
        var arr = [str0,str1,str2,str3,str4,str5,str6,str7,str8,str9,str10]
        
        bar = '{"'
        for (i in arr) {
            bar = bar + "\§r" + arr[i] + '":' + String(Number(i)+1) + ',"'
        }
        bar = bar.slice(0,-2) + '}'
        pl.removeSidebar()
        pl.setSidebar('§l§cO§6M§eS§aC§2伺§b服§d器', JSON.parse(bar),0)
    }
}, 1000);

//抽獎
mc.listen("onServerStarted",() => {
    var cmd = mc.newCommand('lottery','抽獎',PermType.Any)
    cmd.mandatory('money',ParamType.Int)
    cmd.mandatory('bouns',ParamType.Int)
    cmd.overload(['money','bouns'])
    cmd.setCallback((_cmd,ori,_out,res) => {
        const {money,bouns} = res
        if (ori.player.getScore('money') >= money) {
            ori.player.reduceScore('money', money)
            var numbers = Math.floor(Math.random() * 101)
            if (numbers >= 0 && numbers < 21) {
                ori.player.tell('§l§e你成功抽到Bouns了，你獲得了' + money * bouns)
                ori.player.addScore('money',money * bouns)
            } else if (numbers >= 21 && numbers < 51) {
                ori.player.tell('§l§b你成功抽到了Normal，你獲得了' + money)
                ori.player.addScore('money', money)
            } else if (numbers >= 51 && numbers < 101) {
                ori.player.tell('§l§c哈哈，你運氣真的差，抽到了Null，你的錢都沒了')
            }
        }
    })
    cmd.setup()
})

//玩家資料
mc.listen("onJoin",(pl) => {
    var record = {}
    let dv = pl.getDevice()
    record = data.parseJson(file.readFrom('plugins/主插件/data.json'))
    record[pl.realName] = {}
    record[pl.realName].xuid = pl.xuid
    record[pl.realName].os = dv.os
    record[pl.realName].ip = dv.ip
    file.writeTo('plugins/主插件/data.json', JSON.stringify(record,null,"\t"))
})

//銀行系統
mc.listen('onServerStarted',() => {
    var fm = mc.newSimpleForm()
    fm.setTitle('§l§b銀行系統')
    fm.addButton('§l§b轉賬系統(/pay)')
    fm.addButton('§l§b服主幣兌換')
    fm.addButton('§l§b點數兌換')

    var pay = mc.newCustomForm()
    pay.setTitle('§l§b轉賬系統')
    pay.addLabel('§l§c轉賬將會收取10%手續費')
    pay.addInput('收錢者ID(請確保該玩家在綫，如果不在綫，本服將不會賠償):')
    pay.addInput('給與SC幣數量:')
    pay.addLabel('')

    var owner = mc.newCustomForm()
    owner.setTitle('§l§b服主幣兌換')
    owner.addLabel('§l§e1服主幣:100000SC幣')
    owner.addInput('兌換為SC幣的數量')
    owner.addLabel('')

    var point = mc.newCustomForm()
    point.setTitle('§l§b點數兌換')
    point.addLabel('§l§e1點數:100000SC幣')
    point.addInput('兌換為SC幣的數量')
    point.addLabel('')

    var cmd = mc.newCommand('bank','銀行系統',PermType.Any)
    cmd.overload()
    cmd.setCallback((_cmd,ori,_out,_res)=>{
        ori.player.sendForm(fm,(pl,id) => {
            if (id == 0) {
                pl.sendForm(pay,(pl,data) => {
                    if (data == undefined) {
                        pl.tell('§l§c銀行系統:你已取消操作')
                    } else if (data[2] <= pl.getScore('money')) {
                        var givemoney = data[2] - (data[2]*0.1)
                        mc.runcmd(`scoreboard players add \"${data[1]}\" ${givemoney}"`)
                        pl.reduceScore('money',)
                    } else {
                        pl.tell('§l§c你的SC幣不足')
                    }
                })
            } else if (id == 1) {
                pl.sendForm(owner,(pl,data) => {
                    if (data == undefined) {
                        pl.tell('§l§c銀行系統:你已取消操作')
                    } else if (data[1] <= pl.getScore('ownercoins')) {
                        pl.addScore('money',data[1] * 100000)
                    } else {
                        pl.tell('§l§c你的服主幣不足')
                    }
                })
            } else if (id == 2) {
                pl.sendForm(point,(pl,data) => {
                    if (data == undefined) {
                        pl.tell('§l§c銀行系統:你已取消操作')
                    } else if (data[1] <= pl.getScore('point')) {
                        pl.addScore('money', pl.getScore('money') * 100000) 
                    } else {
                        pl.tell('§l§c你的點數不足')
                    }
                })
            }
        })
    })
    cmd.setup()
})

//menu系統(選單)
mc.listen('onServerStarted',()=>{
    var fm = mc.newSimpleForm()
    fm.addButton('§l§9傳送系統')
    fm.addButton('§l§9銀行系統')
    fm.addButton('§l§9商店系統')
    fm.addButton('§l§9Rank系統')
    fm.addButton('§l§9高級商店')
    fm.addButton('§l§9兌換碼系統')
    fm.addButton('§l§6贊助者系統')
    fm.addButton('§l§c管理員選單')

    var tp = mc.newSimpleForm()
    tp.addButton('§l§9大廳')
    tp.addButton('§l§9普通礦場')
    tp.addButton('§l§aVIP§9礦場')
    tp.addButton('§l§aVIP§6+§9礦場')
    tp.addButton('§l§aVIP§6++§9礦場')
    tp.addButton('§l§6MVP§9礦場')
    tp.addButton('§l§6MVP§c+§9礦場')
    tp.addButton('§l§6MVP§c++§9礦場')

    var cmd = mc.newCommand('menu','§l§e選單系統',PermType.Any)
    cmd.overload()
    cmd.setCallback((_cmd,ori,_out,_res) => {
        ori.player.sendForm(fm,(pl,id) => {
            if (id == 0) {
                pl.sendForm(tp,(pl,id) => {
                    if (id == 0) {
                        pl.teleport()
                    } else if (id == 1) {
                        pl.teleport()
                    } else if (id ==2) {
                        pl.teleport()
                    } else if (id == 3) {
                        pl.teleport()
                    } else if (id == 4) {
                        pl.teleport()
                    } else if (id == 5) {
                        pl.teleport()
                    } else if (id == 6) {
                        pl.teleport()
                    } else if (id == 7) {
                        pl.teleport()
                    }
                })
            } else if (id == 1) {
                pl.runcmd('bank')
            } else if (id == 2) {
                pl.runcmd('shop')
            } else if (id == 3) {
                pl.runcmd('rank')
            } else if (id == 4) {
                pl.runcmd('cdk')
            } else if (id == 5) {
                pl.runcmd('donate')
            } else if (id == 6) {
                pl.runcmd('admin')
            }
        })
    })
    cmd.setup()
})

//shop商店
mc.listen('onServerStarted',()=> {
    var fm = mc.newSimpleForm()
    fm.setTitle('§l§e商店')
    fm.addButton('§l§9工具類')
    fm.addButton('§l§9附魔類')
    fm.addButton('§l§9裝備類')

    var tool = mc.newSimpleForm()
    tool.setTitle('§l§e工具類')
    tool.addButton('§l§9鎬子')
    tool.addButton('§l§9武器')

    var pickaxe = mc.newSimpleForm()
    pickaxe.setTitle('§l§e鎬子')
    pickaxe.addButton('§l§9鐵鎬')
    pickaxe.addButton('§l§9鑽石鎬')
    pickaxe.addButton('§l§9獄髓鎬')

    var iron_pickaxe = mc.newCustomForm()
    iron_pickaxe.setTitle('§l§9鐵鎬')
    iron_pickaxe.addInput('請輸入你要購買的數量，一個$200SC幣:','請輸入你要購買的數量:','1')

    var diamond_pickaxe = mc.newCustomForm()
    diamond_pickaxe.setTitle('§l§9鑽石鎬')
    diamond_pickaxe.addInput('請輸入你要購買的數量，一個$1000SC幣:','請輸入你要購買的數量:','1')

    var nethite_pickaxe = mc.newCustomForm()
    nethite_pickaxe.setTitle('§l§9獄髓鎬')
    nethite_pickaxe.addInput('請輸入你要購買的數量，一個$2000SC幣:','請輸入你要購買的數量:','1')

    var enchant = mc.newSimpleForm()
    enchant.setTitle('§l§9附魔類')
    enchant.addButton('§l§9鎬子類附魔')
    enchant.addButton('§l§9劍類附魔')
    enchant.addButton('§l§9裝備類附魔')
    enchant.addButton('§l§9弓類附魔')
    enchant.addButton('§l§9青金石/經驗')

    var pickaxe_enchant = mc.newSimpleForm()
    pickaxe_enchant.setTitle('§l§9鎬子類附魔')
    pickaxe_enchant.addButton('§l§9效率V')
    pickaxe_enchant.addButton('§l§9幸運III')
    pickaxe_enchant.addButton('§l§9耐久III')
    pickaxe_enchant.addButton('§l§9修補I')

    var pickaxe_efficiency = mc.newCustomForm()
    pickaxe_efficiency.setTitle('§l§9效率V')
    pickaxe_efficiency.addInput('請輸入你要購買的數量，一個$1250SC幣:','請輸入你要購買的數量:','1')

    var pickaxe_lucky = mc.newCustomForm()
    pickaxe_lucky.setTitle('§l§9幸運III')
    pickaxe_lucky.addInput('請輸入你要購買的數量，一個$1750SC幣:','請輸入你要購買的數量:','1')

    var pickaxe_unbreaking = mc.newCustomForm()
    pickaxe_unbreaking.setTitle('§l§9耐久III')
    pickaxe_unbreaking.addInput('請輸入你要購買的數量，一個$1000SC幣:','請輸入你要購買的數量:','1')

    var pickaxe_mending = mc.newCustomForm()
    pickaxe_mending.setTitle('§l§9修補I')
    pickaxe_mending.addInput('請輸入你要購買的數量，一個$2150SC幣:','請輸入你要購買的數量:','1')

    var sword_enchant = mc.newSimpleForm()
    sword_enchant.setTitle('§l§9劍類附魔')
    sword_enchant.addButton('§l§9鋒利V')
    sword_enchant.addButton('§l§9耐久III')
    sword_enchant.addButton('§l§9擊退II')
    sword_enchant.addButton('§l§9奪寶III')
    sword_enchant.addButton('§l§9烈火II')
    sword_enchant.addButton('§l§9修補I')

    var sword_sharpness = mc.newCustomForm()
    sword_sharpness.setTitle('§l§9鋒利V')
    sword_sharpness.addInput('請輸入你要購買的數量，一個$1500SC幣:','請輸入你要購買的數量:','1')

    var sword_knockback = mc.newCustomForm()
    sword_knockback.setTitle('§l§9擊退II')
    sword_knockback.addInput('請輸入你要購買的數量，一個$1000SC幣:','請輸入你要購買的數量:','1')

    var sword_looting = mc.newCustomForm()
    sword_knockback.setTitle('§l§9奪寶III')
    sword_knockback.addInput('請輸入你要購買的數量，一個$1000SC幣:','請輸入你要購買的數量:','1')

    var sword_fire = mc.newCustomForm()
    sword_knockback.setTitle('§l§9烈火II')
    sword_knockback.addInput('請輸入你要購買的數量，一個$1250SC幣:','請輸入你要購買的數量:','1')

    var equipment_enchant = mc.newSimpleForm()
    equipment_enchant.addButton('§l§9保護IV')
    equipment_enchant.addButton('§l§9棘刺III')
    equipment_enchant.addButton('§l§9耐久III')
    equipment_enchant.addButton('§l§9修補I')

    var equipment_project = mc.newCustomForm()
    equipment_project.setTitle('§l§9保護IV')
    equipment_project.addInput('請輸入你要購買的數量，一個$1500SC幣:','請輸入你要購買的數量:','1')

    var equipment_thorns = mc.newCustomForm()
    equipment_thorns.setTitle('§l§9棘刺III')
    equipment_thorns.addInput('請輸入你要購買的數量，一個$1500SC幣:','請輸入你要購買的數量:','1')

    var bow_enchant = mc.newSimpleForm()
    bow_enchant.addButton('§l§9力量V')
    bow_enchant.addButton('§l§9無限I')
    bow_enchant.addButton('§l§9火焰I')
    bow_enchant.addButton('§l§9猛擊II')
    bow_enchant.addButton('§l§9耐久III')
    bow_enchant.addButton('§l§9修補I')

    var bow_power = mc.newCustomForm()
    bow_power.setTitle('§l§9力量V')
    bow_power.addInput('請輸入你要購買的數量，一個$2000SC幣:','請輸入你要購買的數量:','1')

    var bow_unlimited = mc.newCustomForm()
    bow_unlimited.setTitle('§l§9無限I')
    bow_unlimited.addInput('請輸入你要購買的數量，一個$1500SC幣:','請輸入你要購買的數量:','1')

    var bow_fire = mc.newCustomForm()
    bow_fire.setTitle('§l§9火焰I')
    bow_fire.addInput('請輸入你要購買的數量，一個$1250SC幣:','請輸入你要購買的數量:','1')
    
    var bow_slam = mc.newCustomForm()
    bow_slam.setTitle('§l§9猛擊II')
    bow_slam.addInput('請輸入你要購買的數量，一個$1250SC幣:','請輸入你要購買的數量:','1')

    var equipment = mc.newSimpleForm()
    equipment.addButton('§l§9鐵質裝備')
    equipment.addButton('§l§9鑽石裝備')
    equipment.addButton('§l§9獄髓裝備')

    var iron_equipment = mc.newSimpleForm()
    iron_equipment.addButton('§l§9鐵頭盔')
    iron_equipment.addButton('§l§9鐵護甲')
    iron_equipment.addButton('§l§9鐵護腿')
    iron_equipment.addButton('§l§9鐵靴')

    var iron_head = mc.newCustomForm()
    iron_head.setTitle('§l§9鐵頭盔')
    iron_head.addInput('請輸入你要購買的數量，一個$200SC幣:','請輸入你要購買的數量:','1')

    var iron_up = mc.newCustomForm()
    iron_up.setTitle('§l§9鐵護甲')
    iron_up.addInput('請輸入你要購買的數量，一個$200SC幣:','請輸入你要購買的數量:','1')

    var iron_le = mc.newCustomForm()
    iron_le.setTitle('§l§9鐵護腿')
    iron_le.addInput('請輸入你要購買的數量，一個$200SC幣:','請輸入你要購買的數量:','1')

    var iron_boost = mc.newCustomForm()
    iron_boost.setTitle('§l§9鐵靴')
    iron_boost.addInput('請輸入你要購買的數量，一個$200SC幣:','請輸入你要購買的數量:','1')

    var diamond_equipment = mc.newSimpleForm()
    diamond_equipment.addButton('§l§9鑽石頭盔')
    diamond_equipment.addButton('§l§9鑽石護甲')
    diamond_equipment.addButton('§l§9鑽石護腿')
    diamond_equipment.addButton('§l§9鑽石靴')

    var diamond_head = mc.newCustomForm()
    diamond_head.setTitle('§l§9鑽石頭盔')
    diamond_head.addInput('請輸入你要購買的數量，一個$500SC幣:','請輸入你要購買的數量:','1')

    var diamond_up = mc.newCustomForm()
    diamond_up.setTitle('§l§9鑽石護甲')
    diamond_up.addInput('請輸入你要購買的數量，一個$500SC幣:','請輸入你要購買的數量:','1')

    var diamond_le = mc.newCustomForm()
    diamond_le.setTitle('§l§9鑽石護腿')
    diamond_le.addInput('請輸入你要購買的數量，一個$500SC幣:','請輸入你要購買的數量:','1')

    var diamond_boost = mc.newCustomForm()
    diamond_boost.setTitle('§l§9鑽石靴')
    diamond_boost.addInput('請輸入你要購買的數量，一個$500SC幣:','請輸入你要購買的數量:','1')

    var nethite_equipment = mc.newSimpleForm()
    nethite_equipment.addButton('§l§9獄髓頭盔')
    nethite_equipment.addButton('§l§9獄髓護甲')
    nethite_equipment.addButton('§l§9獄髓護腿')
    nethite_equipment.addButton('§l§9獄髓靴')

    var nethite_head = mc.newCustomForm()
    nethite_head.setTitle('§l§9獄髓頭盔')
    nethite_head.addInput('請輸入你要購買的數量，一個$1000SC幣:','請輸入你要購買的數量:','1')

    var nethite_up = mc.newCustomForm()
    nethite_up.setTitle('§l§9獄髓護甲')
    nethite_up.addInput('請輸入你要購買的數量，一個$1000SC幣:','請輸入你要購買的數量:','1')

    var nethite_le = mc.newCustomForm()
    nethite_le.setTitle('§l§9獄髓護腿')
    nethite_le.addInput('請輸入你要購買的數量，一個$100SC幣:','請輸入你要購買的數量:','1')

    var nethite_boost = mc.newCustomForm()
    nethite_boost.setTitle('§l§9獄髓靴')
    nethite_boost.addInput('請輸入你要購買的數量，一個$1000SC幣:','請輸入你要購買的數量:','1')

    var sword_bow = mc.newSimpleForm()
    sword_bow.addButton('§l§9鐵劍')
    sword_bow.addButton('§l§9鑽石劍')
    sword_bow.addButton('§l§9獄髓劍')
    sword_bow.addButton('§l§9弓')

    var iron_sword = mc.newCustomForm()
    iron_sword.setTitle('§l§9鐵劍')
    iron_sword.addInput('請輸入你要購買的數量，一個$500SC幣:','請輸入你要購買的數量:','1')

    var diamond_sword = mc.newCustomForm()
    diamond_sword.setTitle('§l§9鑽石劍')
    diamond_sword.addInput('請輸入你要購買的數量，一個$1000SC幣:','請輸入你要購買的數量:','1')

    var nethite_sword = mc.newCustomForm()
    nethite_sword.setTitle('§l§9獄髓劍')
    nethite_sword.addInput('請輸入你要購買的數量，一個$1000SC幣:','請輸入你要購買的數量:','1')

    var bow = mc.newCustomForm()
    bow.setTitle('§l§9弓')
    bow.addInput('請輸入你要購買的數量，一個$500SC幣:','請輸入你要購買的數量:','1')

    var lapis_exp = mc.newSimpleForm()
    lapis_exp.addButton('§l§9青金石')
    lapis_exp.addButton('§l§9經驗')

    var lapis = mc.newCustomForm()
    lapis.setTitle('§l§9青金石')
    lapis.addInput('請輸入你要購買的數量，一個$5SC幣:','請輸入你要購買的數量:','1')

    var exp = mc.newCustomForm()
    exp.setTitle('§l§9經驗')
    exp.addInput('請輸入你要購買的等級，每一級$10幣')

    var cmd = mc.newCommand('shop','§l§e伺服器商店',PermType.Any)
    cmd.overload()
    cmd.setCallback((_cmd,ori,_out,_res) => {
        ori.player.sendForm(fm,(pl,id) => {
            if (id == 0) {
                pl.sendForm(tool,(pl,id)=> {
                    if (id == 0) {
                        pl.sendForm(pickaxe,(pl,id) => {
                            if (id == 0) {
                                pl.sendForm(iron_pickaxe,(pl,data) => {
                                    if (pl.getScore('money') >= 200 * data[0]) {
                                        mc.runcmd(`give \"${pl.realName}\" iron_pickaxe ${data[0]} 0 {"minecraft:can_destroy":{"blocks":["emerald_ore","emerald_block","bedrock","air]}}`)
                                        pl.reduceScore('money', data[0] * 200)
                                        pl.tell('§l§a你已成功購買鐵鎬x' + data[0])
                                    } else if(pl.getScore('money') < data[0] * 200){
                                        pl.tell('§l§c你的錢不足')
                                    } else if (data[0] == undefined) {
                                        pl.tell('§l§c你已取消購買')
                                    }
                                })
                            }else if (id == 1) {
                                pl.sendForm(diamond_pickaxe,(pl,data) => {
                                    if (pl.getScore('money') >= 1000 * data[0]) {
                                        mc.runcmd(`give \"${pl.realName}\" diamond_pickaxe ${data[0]} 0 {"minecraft:can_destroy":{"blocks":["emerald_ore","emerald_block","bedrock","air]}}`)
                                        pl.reduceScore('money', data[0] * 1000)
                                        pl.tell('§l§a你已成功購買鑽石鎬x' + data[0])
                                    }  else if (pl.getScore('money') < data[0] * 1000){
                                        pl.tell('§l§c你的錢不足')
                                    } else if (data[0] == undefined) {
                                        pl.tell('§l§c你已取消購買')
                                    }
                                })
                            }else if(id == 2) {
                                pl.sendForm(nethite_pickaxe,(pl,data) => {
                                    if (pl.getScore('money') >= 2000 * data[0]) {
                                        mc.runcmd(`give \"${pl.realName}\" netherite_pickaxe ${data[0]} 0 {"minecraft:can_destroy":{"blocks":["emerald_ore","emerald_block","bedrock","air]}}`)
                                        pl.reduceScore('money', data[0] * 2000)
                                        pl.tell('§l§a你已成功購買獄髓鎬x' + data[0])
                                    } else if(pl.getScore('money') < data[0] * 2000) {
                                        pl.tell('§l§c你的錢不足')
                                    } else if (data[0] == undefined) {
                                        pl.tell('§l§c你已取消購買')
                                    } 
                                })
                            }
                        })
                    } else if (id == 1) {
                        pl.sendForm(sword_bow,(pl,id) => {
                            if (id == 0) {
                                pl.sendForm(iron_sword,(pl,data) => {
                                    if (pl.getScore('money') >= data[0] * 500) {
                                        mc.runcmd(`give \"${pl.realName}\" iron_sword ${data[0]}`)
                                        pl.reduceScore('money', data[0] * 500)
                                        pl.tell('§l§a你已成功購買鐵劍x' + data[0])
                                    } else if (pl.getScore('money') < data[0] * 500) {
                                        pl.tell('§l§c你的錢不足')
                                    } else if (data[0] == undefined) {
                                        pl.tell('§l§c你已取消購買')
                                    }
                                })
                            } else if (id == 1){
                                pl.sendForm(diamond_sword,(pl,data)=> {
                                    if (pl.getScore('money') >= data[0] * 1000) {
                                        mc.runcmd(`give \"${pl.realName}\" diamond_sword ${data[0]}`)
                                        pl.reduceScore('money', data[0] * 1000)
                                        pl.tell('§l§a你已成功購買鑽石劍x' + data[0])
                                    } else if (pl.getScore('money') < data[0] * 1000){
                                        pl.tell('§l§c你的錢不足')
                                    } else if (data[0] == undefined) {
                                        pl.tell('§l§c你已取消購買')
                                    }
                               })
                            } else if (id == 2){
                                pl.sendForm(nethite_sword,(pl,data)=>{
                                    if (pl.getScore('money') >= data[0] * 1500) {
                                        mc.runcmd(`give \"${pl.realName}\" netherite_sword ${data[0]}`)
                                        pl.reduceScore('money', data[0] * 1500)
                                        pl.tell('§l§a你已成功購買獄髓劍x' + data[0])
                                    } else if (pl.getScore('money') < data[0] * 1500){
                                        pl.tell('§l§c你的錢不足')
                                    }else if (data[0] == undefined) {
                                        pl.tell('§l§c你已取消購買')
                                    }
                                })
                            } else if (id == 3){
                                pl.sendForm(bow,(pl,data)=> {
                                    if (pl.getScore('money') >= data[0] * 500) {
                                        mc.runcmd(`give ${pl.realName} bow ${data[0]}`)
                                        pl.reduceScore('money', data[0] * 500)
                                        pl.tell('§l§a你已成功購買弓x' + data[0])
                                    } else if (pl.getScore('money') < data[0] * 500){
                                        pl.tell('§l§c你的錢不足')
                                    } else if (data[0] == undefined) {
                                        pl.tell('§l§c你已取消購買')
                                    }
                                })
                            }    
                        })
                    }
                })
            } else if (id == 1) {
                pl.sendForm(enchant,(pl,id) => {
                    if (id == 0) {
                        pl.sendForm(pickaxe_enchant,(pl,id) => {
                            if (id == 0) {
                                pl.sendForm(pickaxe_efficiency,(pl,data) => {
                                    if (pl.getScore('money') >= data[0] * 1250) {
                                        pl.giveItem(mc.newItem(NBT.parseSNBT('{"Count":'+data[0] +'b,"Damage":0s,"Name":"minecraft:enchanted_book","WasPickedUp":0b,"tag":{"ench":[{"id":15s,"lvl":5s}]}}')))
                                        pl.reduceScore('money', data[0] * 1250)
                                        pl.tell('§l§a你成功購買效率V附魔書x' + data[0])
                                    } else if (pl.getScore('money') < data[0] * 1250){
                                        pl.tell('§l§c你的錢不足')
                                    } else if (data[0] == undefined) {
                                        pl.tell('§l§c你已取消購買')
                                    }
                                })
                            } else if (id == 1) {
                                pl.sendForm(pickaxe_lucky,(pl,data)=> {
                                    if (pl.getScore('money') >= data[0] * 1750) {
                                        pl.giveItem(mc.newItem(NBT.parseSNBT('{"Count":'+data[0] +'b,"Damage":0s,"Name":"minecraft:enchanted_book","WasPickedUp":0b,"tag":{"ench":[{"id":18s,"lvl":3s}]}}')))
                                        pl.reduceScore('money', data[0] * 1750)
                                        pl.tell('§l§a你成功購買幸運III附魔書x' + data[0])
                                    } else if (pl.getScore('money') < data[0] * 1750){
                                        pl.tell('§l§c你的錢不足')
                                    } else if (data[0] == undefined) {
                                        pl.tell('§l§c你已取消購買')
                                    }
                                })
                            } else if (id == 2) {
                                pl.sendForm(pickaxe_unbreaking,(pl,data) => {
                                    if (pl.getScore('money') >= data[0] * 1000) {
                                        pl.giveItem(mc.newItem(NBT.parseSNBT('{"Count":'+data[0] +'b,"Damage":0s,"Name":"minecraft:enchanted_book","WasPickedUp":0b,"tag":{"ench":[{"id":17s,"lvl":3s}]}}')))
                                        pl.reduceScore('money', data[0] * 1000)
                                        pl.tell('§l§a你成功購買耐久III附魔書x' + data[0])
                                    } else if(pl.getScore('money')<data[0]*1000){
                                        pl.tell('§l§c你的錢不足')
                                    } else if (data[0] == undefined) {
                                        pl.tell('§l§c你已取消購買')
                                    }
                                })     
                            } else if (id == 3) {
                                pl.sendForm(pickaxe_mending,(pl,data)=> {
                                    if (pl.getScore('money') >= data[0] * 2150) {
                                        pl.giveItem(mc.newItem(NBT.parseSNBT('{"Count":'+data[0] +'b,"Damage":0s,"Name":"minecraft:enchanted_book","WasPickedUp":0b,"tag":{"ench":[{"id":17s,"lvl":3s}]}}')))
                                        pl.reduceScore('money', data[0] * 2150)
                                        pl.tell('§l§a你成功購買修補I附魔書x' + data[0])
                                    } else if(pl.getScore('money') < data[0] * 2150) {
                                        pl.tell('§l§c你的錢不足')
                                    } else if (data[0] == undefined) {
                                        pl.tell('§l§c你已取消購買')
                                    } 
                                })    
                            }
                        })
                    } else if (id == 1) {
                        pl.sendForm(sword_enchant,(pl,id) => {
                            if (id == 0) {
                                pl.sendForm(sword_sharpness,(pl,data)=>{
                                    if (pl.getScore('money') >= data[0] * 1500) {
                                        pl.giveItem(mc.newItem(NBT.parseSNBT('{"Count":'+data[0] +'b,"Damage":0s,"Name":"minecraft:enchanted_book","WasPickedUp":0b,"tag":{"ench":[{"id":9s,"lvl":5s}]}}')))
                                        pl.reduceScore('money', data[0] * 1500)
                                        pl.tell('§l§a你成功購買鋒利V附魔書x' + data[0])
                                    } else if (pl.getScore('money')<data[0]*1500){
                                        pl.tell('§l§c你的錢不足')
                                    } else if (data[0] == undefined) {
                                        pl.tell('§l§c你已取消購買')
                                    }
                                })
                            } else if (id == 1) {
                                pl.sendForm(pickaxe_unbreaking,(pl,data)=>{
                                    if (pl.getScore('money') >= data[0] * 1000) {
                                        pl.giveItem(mc.newItem(NBT.parseSNBT('{"Count":'+data[0] +'b,"Damage":0s,"Name":"minecraft:enchanted_book","WasPickedUp":0b,"tag":{"ench":[{"id":17s,"lvl":3s}]}}')))
                                        pl.reduceScore('money', data[0] * 1000)
                                        pl.tell('§l§a你成功購買耐久III附魔書x' + data[0])
                                    } else if(pl.getScore('money') < data[0] * 1000) {
                                        pl.tell('§l§c你的錢不足')
                                    } else if (data[0] == undefined) {
                                        pl.tell('§l§c你已取消購買')
                                    }
                                })
                            } else if (id == 2) {
                                pl.sendForm(sword_knockback,(pl,data) => {
                                    if (pl.getScore('money') >= data[0] * 1000) {
                                        pl.giveItem(mc.newItem(NBT.parseSNBT('{"Count":'+data[0] +'b,"Damage":0s,"Name":"minecraft:enchanted_book","WasPickedUp":0b,"tag":{"ench":[{"id":12s,"lvl":2s}]}}')))
                                        pl.reduceScore('money', data[0] * 1000)
                                        pl.tell('§l§a你成功購買耐久擊退II附魔書x' + data[0])
                                    } else if (pl.getScore('money') < data[0] * 1000){
                                        pl.tell('§l§c你的錢不足')
                                    } else if (data[0] == undefined) {
                                        pl.tell('§l§c你已取消購買')
                                    }
                                })
                            } else if (id == 3) {
                                pl.sendForm(sword_looting,(pl,data)=> {
                                    if (pl.getScore('money') >= data[0] * 1000) {
                                        pl.giveItem(mc.newItem(NBT.parseSNBT('{"Count":'+data[0] +'b,"Damage":0s,"Name":"minecraft:enchanted_book","WasPickedUp":0b,"tag":{"ench":[{"id":14s,"lvl":3s}]}}')))
                                        pl.reduceScore('money', data[0] * 1000)
                                        pl.tell('§l§a你成功購買耐久奪寶III附魔書x' + data[0])
                                    } else if (pl.getScore('money') < data[0] * 1000){
                                        pl.tell('§l§c你的錢不足')
                                    }else if (data[0] == undefined) {
                                        pl.tell('§l§c你已取消購買')
                                    }
                                })
                            } else if (id == 4) {
                                pl.sendForm(sword_fire,(pl,data) => {
                                    if (pl.getScore('money') >= data[0] * 1260) {
                                        pl.giveItem(mc.newItem(NBT.parseSNBT('{"Count":'+data[0] +'b,"Damage":0s,"Name":"minecraft:enchanted_book","WasPickedUp":0b,"tag":{"ench":[{"id":13s,"lvl":2s}]}}')))
                                        pl.reduceScore('money', data[0] * 1250)
                                        pl.tell('§l§a你成功購買耐久烈火II附魔書x' + data[0])
                                    } else if(pl.getScore('money')< data[0] * 1250){
                                        pl.tell('§l§c你的錢不足')
                                    } else if (data[0] == undefined) {
                                        pl.tell('§l§c你已取消購買')
                                    }
                                })
                            } else if(id == 5) {
                                pl.sendForm(pickaxe_mending,(pl,data)=> {
                                    if (pl.getScore('money') >= data[0] * 2150) {
                                        pl.giveItem(mc.newItem(NBT.parseSNBT('{"Count":'+data[0] +'b,"Damage":0s,"Name":"minecraft:enchanted_book","WasPickedUp":0b,"tag":{"ench":[{"id":17s,"lvl":3s}]}}')))
                                        pl.reduceScore('money', data[0] * 2150)
                                        pl.tell('§l§a你成功購買修補I附魔書x' + data[0])
                                    } else if (pl.getScore('money') < data[0] * 2150){
                                        pl.tell('§l§c你的錢不足')
                                    } else if (data[0] == undefined) {
                                        pl.tell('§l§c你已取消購買')
                                    }
                                })    
                            }
                        })
                    } else if (id == 2) {
                        pl.sendForm(equipment_enchant,(pl,id) => {
                            if (id == 0) {
                                pl.sendForm(equipment_project,(pl,data)=> {
                                    if (pl.getScore('money') >= data[0] * 1500) {
                                        pl.giveItem(mc.newItem(NBT.parseSNBT('{"Count":'+data[0] +'b,"Damage":0s,"Name":"minecraft:enchanted_book","WasPickedUp":0b,"tag":{"ench":[{"id":0s,"lvl":4s}]}}')))
                                        pl.reduceScore('money', data[0] * 1500)
                                        pl.tell('§l§a你成功購買保護IV附魔書x' + data[0])
                                    } else if (pl.getScore('money') < data[0] * 1500){
                                        pl.tell('§l§c你的錢不足')
                                    }else if (data[0] == undefined) {
                                        pl.tell('§l§c你已取消購買')
                                    }
                                })
                            } else if(id == 1) {
                                pl.sendForm(equipment_thorns,(pl,data) => {
                                    if (pl.getScore('money') >= data[0] * 1500) {
                                        pl.giveItem(mc.newItem(NBT.parseSNBT('{"Count":'+data[0] +'b,"Damage":0s,"Name":"minecraft:enchanted_book","WasPickedUp":0b,"tag":{"ench":[{"id":5s,"lvl":3s}]}}')))
                                        pl.reduceScore('money', data[0] * 1500)
                                        pl.tell('§l§a你成功購買棘刺III附魔書x' + data[0])
                                    } else if (pl.getScore('money') < data[0] * 1500){
                                        pl.tell('§l§c你的錢不足')
                                    }else if (data[0] == undefined) {
                                        pl.tell('§l§c你已取消購買')
                                    }
                                })
                            } else if (id == 2) {
                                pl.sendForm(pickaxe_unbreaking,(pl,data)=> {
                                    if (pl.getScore('money') >= data[0] * 1000) {
                                        pl.giveItem(mc.newItem(NBT.parseSNBT('{"Count":'+data[0] +'b,"Damage":0s,"Name":"minecraft:enchanted_book","WasPickedUp":0b,"tag":{"ench":[{"id":17s,"lvl":3s}]}}')))
                                        pl.reduceScore('money', data[0] * 1000)
                                        pl.tell('§l§a你成功購買耐久III附魔書x' + data[0])
                                    } else if (pl.getScore('money') < data[0] * 1000){
                                        pl.tell('§l§c你的錢不足')
                                    } else if (data[0] == undefined) {
                                        pl.tell('§l§c你已取消購買')
                                    }
                                })
                            }else if (id == 3) {
                                pl.sendForm(pickaxe_mending,(pl,data)=> {
                                    if (pl.getScore('money') >= data[0] * 2150) {
                                        pl.giveItem(mc.newItem(NBT.parseSNBT('{"Count":'+data[0] +'b,"Damage":0s,"Name":"minecraft:enchanted_book","WasPickedUp":0b,"tag":{"ench":[{"id":17s,"lvl":3s}]}}')))
                                        pl.reduceScore('money', data[0] * 2150)
                                        pl.tell('§l§a你成功購買修補I附魔書x' + data[0])
                                    } else if (pl.getScore('money') < data[0] * 2150) {
                                        pl.tell('§l§c你的錢不足')
                                    } else if (data[0] == undefined) {
                                        pl.tell('§l§c你已取消購買')
                                    }
                                })
                            }
                        })
                    } else if (id == 3) {
                        pl.sendForm(bow_enchant,(pl,id) => {
                            if (id == 0) {
                                pl.sendForm(bow_power,(pl,data) => {
                                    if (pl.getScore('money') >= data[0] * 2000) {
                                        pl.giveItem(mc.newItem(NBT.parseSNBT('{"Count":'+data[0] +'b,"Damage":0s,"Name":"minecraft:enchanted_book","WasPickedUp":0b,"tag":{"ench":[{"id":19s,"lvl":5s}]}}')))
                                        pl.reduceScore('money', data[0] * 2000)
                                        pl.tell('§l§a你成功購買力量V附魔書x' + data[0])
                                    } else if (pl.getScore('money') < data[0] * 2000){
                                        pl.tell('§l§c你的錢不足')
                                    } else if (data[0] == undefined) {
                                        pl.tell('§l§c你已取消購買')
                                    }
                                })
                            } else if(id == 1) {
                                pl.sendForm(bow_unlimited,(pl,data) => {
                                    if (pl.getScore('money') >= data[0] * 1500) {
                                        pl.giveItem(mc.newItem(NBT.parseSNBT('{"Count":'+data[0] +'b,"Damage":0s,"Name":"minecraft:enchanted_book","WasPickedUp":0b,"tag":{"ench":[{"id":22s,"lvl":1s}]}}')))
                                        pl.reduceScore('money', data[0] * 1500)
                                        pl.tell('§l§a你成功購買無限I附魔書x' + data[0])
                                    } else if (pl.getScore('money') < data[0] * 1500){
                                        pl.tell('§l§c你的錢不足')
                                    } else if (data[0] == undefined) {
                                        pl.tell('§l§c你已取消購買')
                                    }
                                })
                            } else if(id == 2) {
                                pl.sendForm(bow_unlimited,(pl,data) => {
                                    if (pl.getScore('money') >= data[0] * 1250) {
                                        pl.giveItem(mc.newItem(NBT.parseSNBT('{"Count":'+data[0] +'b,"Damage":0s,"Name":"minecraft:enchanted_book","WasPickedUp":0b,"tag":{"ench":[{"id":21s,"lvl":1s}]}}')))
                                        pl.reduceScore('money', data[0] * 1250)
                                        pl.tell('§l§a你成功購買火焰I附魔書x' + data[0])
                                    } else if(pl.getScore('money') < data[0] * 1250) {
                                        pl.tell('§l§c你的錢不足')
                                    } else if (data[0] == undefined) {
                                        pl.tell('§l§c你已取消購買')
                                    }
                                })
                            } else if(id == 3) {
                                pl.sendForm(bow_unlimited,(pl,data) => {
                                    if (pl.getScore('money') >= data[0] * 1250) {
                                        pl.giveItem(mc.newItem(NBT.parseSNBT('{"Count":'+data[0] +'b,"Damage":0s,"Name":"minecraft:enchanted_book","WasPickedUp":0b,"tag":{"ench":[{"id":20s,"lvl":2s}]}}')))
                                        pl.reduceScore('money', data[0] * 1250)
                                        pl.tell('§l§a你成功購買猛擊II附魔書x' + data[0])
                                    } else if (pl.getScore('money') < data[0] * 1250) {
                                        pl.tell('§l§c你的錢不足')
                                    } else if (data[0] == undefined) {
                                        pl.tell('§l§c你已取消購買')
                                    }
                                })
                            } else if(id == 4) {
                                pl.sendForm(pickaxe_unbreaking,(pl,data)=>{
                                    if (pl.getScore('money') >= data[0] * 1000) {
                                        pl.giveItem(mc.newItem(NBT.parseSNBT('{"Count":'+data[0] +'b,"Damage":0s,"Name":"minecraft:enchanted_book","WasPickedUp":0b,"tag":{"ench":[{"id":17s,"lvl":3s}]}}')))
                                        pl.reduceScore('money', data[0] * 1000)
                                        pl.tell('§l§a你成功購買耐久III附魔書x' + data[0])
                                    } else if (pl.getScore('money') < data[0] * 1000){
                                        pl.tell('§l§c你的錢不足')
                                    }else if (data[0] == undefined) {
                                        pl.tell('§l§c你已取消購買')
                                    }
                                })
                            } else if (id == 5) {
                                pl.sendForm(pickaxe_mending,(pl,data)=> {
                                    if (pl.getScore('money') >= data[0] * 2150) {
                                        pl.giveItem(mc.newItem(NBT.parseSNBT('{"Count":'+data[0] +'b,"Damage":0s,"Name":"minecraft:enchanted_book","WasPickedUp":0b,"tag":{"ench":[{"id":17s,"lvl":3s}]}}')))
                                        pl.reduceScore('money', data[0] * 2150)
                                        pl.tell('§l§a你成功購買修補I附魔書x' + data[0])
                                    } else if (pl.getScore('money') < data[0] * 2150){
                                        pl.tell('§l§c你的錢不足')
                                    } else if (data[0] == undefined) {
                                        pl.tell('§l§c你已取消購買')
                                    }
                                })    
                            }
                        })
                    } else if (id == 4) {
                        pl.sendForm(lapis_exp,(pl,id) => {
                            if (id == 0) {
                                pl.sendForm(lapis,(pl,data)=> {
                                    if (pl.getScore('money') >= data[0] * 5) {
                                        mc.runcmd(`give \"pl.realName\" lapis_lazuli ${data[0]}`)
                                        pl.reduceScore('money',data[0] * 5)
                                        pl.tell('§l§a你成功購買青金石x' + data[0])
                                    } else if (pl.getScore('money') < data[0] * 5) {
                                        pl.tell('§l§c你的錢不足')
                                    } else if (data[0] == undefined) {
                                        pl.tell('§l§c你已取消購買')
                                    }
                                })
                            } else if (id == 1) {
                                pl.sendForm(exp,(pl,data)=> {
                                    if (pl.getScore('money') >= data[0] * 10) {
                                        mc.runcmd(`give ${data[0]}L \"${pl.realName}\"`)
                                        pl.reduceScore('money',data[0] * 10)
                                        pl.tell('§l§a你成功購買經驗x' + data[0] + '級')
                                    } else if (pl.getScore('money') < data[0] * 10) {
                                        pl.tell('§l§c你的錢不足')
                                    } else if (data[0] == undefined) {
                                        pl.tell('§l§c你已取消購買')
                                    }
                                })
                            }
                        })
                    }
                })
            } else if (id == 2) {
                pl.sendForm(equipment,(pl,id) => {
                    if (id == 0) {
                        pl.sendForm(iron_equipment,(pl,id)=> {
                            if (id == 0) {
                                pl.sendForm(iron_head,(pl,data)=> {
                                    if (pl.getScore('money') >= data[0] * 200) {
                                        mc.runcmd(`give \"${pl.realName}\" iron_helmet ${data[0]}`)
                                        pl.reduceScore('money',data[0] * 200)
                                        pl.tell('§l§a你成功購買鐵頭盔x' + data[0])
                                    }else if (pl.getScore('money') < data[0] * 200) {
                                        pl.tell('§l§c你的錢不足')
                                    } else if (data[0] == undefined) {
                                        pl.tell('§l§c你已取消購買')
                                    }
                                })
                            } else if (id == 1) {
                                pl.sendForm(iron_up,(pl,data)=> {
                                    if (pl.getScore('money') >= data[0] * 200) {
                                        mc.runcmd(`give \"${pl.realName}\" iron_chestplate ${data[0]}`)
                                        pl.reduceScore('money',data[0] * 200)
                                        pl.tell('§l§a你成功購買鐵護甲x' + data[0])
                                    }else if (pl.getScore('money') < data[0] * 200) {
                                        pl.tell('§l§c你的錢不足')
                                    } else if (data[0] == undefined) {
                                        pl.tell('§l§c你已取消購買')
                                    }
                                })
                            } else if (id == 2) {
                                pl.sendForm(iron_le,(pl,data)=> {
                                    if (pl.getScore('money') >= data[0] * 200) {
                                        mc.runcmd(`give \"${pl.realName}\" iron_leggings ${data[0]}`)
                                        pl.reduceScore('money',data[0] * 200)
                                        pl.tell('§l§a你成功購買鐵護腿x' + data[0])
                                    }else if (pl.getScore('money') < data[0] * 200) {
                                        pl.tell('§l§c你的錢不足')
                                    } else if (data[0] == undefined) {
                                        pl.tell('§l§c你已取消購買')
                                    }
                                })
                            } else if (id == 3) {
                                pl.sendForm(iron_boost,(pl,data)=> {
                                    if (pl.getScore('money') >= data[0] * 200) {
                                        mc.runcmd(`give \"${pl.realName}\" iron_boots ${data[0]}`)
                                        pl.reduceScore('money',data[0] * 200)
                                        pl.tell('§l§a你成功購買鐵靴x' + data[0])
                                    } else if (pl.getScore('money') < data[0] * 200) {
                                        pl.tell('§l§c你的錢不足')
                                    } else if (data[0] == undefined) {
                                        pl.tell('§l§c你已取消購買')
                                    }
                                })
                            }
                        })
                    } else if (id == 1) {
                        pl.sendForm(diamond_equipment,(pl,id) => {
                            if (id == 0) {
                                pl.sendForm(diamond_head,(pl,data)=> {
                                    if (pl.getScore('money') >= data[0] * 500) {
                                        mc.runcmd(`give \"${pl.realName}\" diamond_helmet ${data[0]}`)
                                        pl.reduceScore('money',data[0] * 500)
                                        pl.tell('§l§a你成功購買鑽石頭盔x' + data[0])
                                    }else if (pl.getScore('money') < data[0] * 500) {
                                        pl.tell('§l§c你的錢不足')
                                    } else if (data[0] ==undefined) {
                                        pl.tell('§l§c你已取消購買')
                                    }
                                })
                            } else if (id == 1) {
                                pl.sendForm(diamond_up,(pl,data)=> {
                                    if (pl.getScore('money') >= data[0] * 500) {
                                        mc.runcmd(`give \"${pl.realName}\" diamond_chestplate ${data[0]}`)
                                        pl.reduceScore('money',data[0] * 500)
                                        pl.tell('§l§a你成功購買鑽石護甲x' + data[0])
                                    }else if (pl.getScore('money') < data[0] * 500) {
                                        pl.tell('§l§c你的錢不足')
                                    } else if (data[0] == undefined) {
                                        pl.tell('§l§c你已取消購買')
                                    }
                                })
                            } else if(id ==2 ) {
                                pl.sendForm(diamond_le,(pl,data)=> {
                                    if (pl.getScore('money') >= data[0] * 500) {
                                        mc.runcmd(`give \"${pl.realName}\" diamond_leggings ${data[0]}`)
                                        pl.reduceScore('money',data[0] * 500)
                                        pl.tell('§l§a你成功購買鑽石護腿x' + data[0])
                                    } else if (pl.getScore('money') < data[0] * 500) {
                                        pl.tell('§l§c你的錢不足')
                                    } else if (data[0] == undefined) {
                                        pl.tell('§l§c你已取消購買')
                                    }
                                })
                            } else if(id == 3) {
                                pl.sendForm(diamond_boost,(pl,data)=> {
                                    if (pl.getScore('money') >= data[0] * 500) {
                                        mc.runcmd(`give \"${pl.realName}\" diamond_boots ${data[0]}`)
                                        pl.reduceScore('money',data[0] * 500)
                                        pl.tell('§l§a你成功購買鑽石靴x' + data[0])
                                    } else if (pl.getScore('money') < data[0] * 500) {
                                        pl.tell('§l§c你的錢不足')
                                    } else if (data[0] == undefined) {
                                        pl.tell('§l§c你已取消購買')
                                    }
                                })
                            }
                        })
                    } else if (id == 2) {
                        pl.sendForm(nethite_equipment,(pl,id) => {
                            if (id == 0) {
                                pl.sendForm(nethite_head,(pl,data) => {
                                    if (pl.getScore('money') >= data[0] * 1000) {
                                        mc.runcmd(`give \"${pl.realName}\" netherite_helmet ${data[0]}`)
                                        pl.reduceScore('money',data[0] * 1000)
                                        pl.tell('§l§a你成功購買獄髓頭盔')
                                    } else if (pl.getScore('money') < data[0] * 1000) {
                                        pl.tell('§l§c你的錢不足')
                                    } else if (data[0] == undefined) {
                                        pl.tell('§l§c你已取消購買')
                                    }
                                })
                            } else if (id == 1) {
                                pl.sendForm(nethite_up,(pl,data) => {
                                    if (pl.getScore('money') >= data[0] * 1000) {
                                        mc.runcmd(`give \"${pl.realName}\" netherite_chestplate ${data[0]}`)
                                        pl.reduceScore('money',data[0] * 1000)
                                        pl.tell('§l§a你成功購買獄髓護甲')
                                    } else if (pl.getScore('money') < data[0] * 1000) {
                                        pl.tell('§l§c你的錢不足')
                                    } else if (data[0] == undefined) {
                                        pl.tell('§l§c你已取消購買')
                                    }
                                })
                            } else if (id == 2) {
                                pl.sendForm(nethite_le,(pl,data) => {
                                    if (pl.getScore('money') >= data[0] * 1000) {
                                        mc.runcmd(`give \"${pl.realName}\" netherite_leggings ${data[0]}`)
                                        pl.reduceScore('money',data[0] * 1000)
                                        pl.tell('§l§a你成功購買獄髓護腿')
                                    } else if (pl.getScore('money') < data[0] * 1000) {
                                        pl.tell('§l§c你的錢不足')
                                    } else if (data[0] == undefined) {
                                        pl.tell('§l§c你已取消購買')
                                    }
                                })
                            } else if(id == 3) {
                                pl.sendForm(nethite_boost,(pl,data) => {
                                    if (pl.getScore('money') >= data[0] * 1000) {
                                        mc.runcmd(`give \"${pl.realName}\" netherite_boots ${data[0]}`)
                                        pl.reduceScore('money',data[0] * 1000)
                                        pl.tell('§l§a你成功購買獄髓靴')
                                    } else if (pl.getScore('money') < data[0] * 1000) {
                                        pl.tell('§l§c你的錢不足')
                                    } else if (data[0] == undefined) {
                                        pl.tell('§l§c你已取消購買')
                                    }
                                })
                            }
                        })
                    }
                })
            }
       })
    })
    cmd.setup()
})


//Anti Minecart Crasher
mc.listen('onCmdBlockExecute',(isMinecart,pos) => {
    if (isMinecart == true) {
        log('有玩家使用命令方塊礦車惡意崩服，坐標為' + pos)
    }
    return false
})

//指南針選單
mc.listen('onUseItem',(pl,item) => {
    if (item.name == 'Compass') {
        pl.runcmd('menu')
    }
})

//贊助者選單
mc.listen('onServerStarted',() => {
    var fm = mc.newSimpleForm()
    fm.addButton('§l§9粒子效果')
    fm.addButton('§l§9獲取贊助者之鎬')
    fm.addButton('§l§9贊助者商店')

    var high = mc.newSimpleForm()
    high.setTitle('§l§9購買高級商店')
    high.setContent('§l§b系統檢測到你還沒購買高級商店權限，你是否要進行購買，價錢為50點數')
    high.addButton('§l§9確認購買')
    high.addButton('§l§9不購買')

    var particle = mc.newSimpleForm()
    particle.setTitle('§l§9粒子效果')
    particle.addButton('§l§9心形')
    particle.addButton('§l§9水粒子')
    particle.addButton('§l§9氣泡水')
    particle.addButton('§l§9煙霧')
    particle.addButton('§l§9龍之吐息')
    particle.addButton('§l§9熔岩粒子')
    particle.addButton('§l§9閃電擊中銅磚')
    particle.addButton('§l§9附魔台')
    particle.addButton('§l§9終界箱')

    var cmd = mc.newCommand('donate','贊助者選單',PermType.Any)
    cmd.overload()
    cmd.setCallback((_cmd,ori,_out,_res) => {
        if (ori.player.hasTag('donate') == false) {
            ori.player.tell('§l§c你不是贊助者')
        } else {
            ori.player.sendForm(fm,(pl,id) => {
                if (id == 0) {
                    pl.sendForm(particle,(pl,id)=> {
                        if (id == 0) {
                            if (pl.hasTag('e1')) {
                                pl.removeTag('e1')
                                pl.tell(`§l§a成功關閉該粒子`)
                            } else {
                                pl.addTag('e1')
                                pl.tell(`§l§a成功使用該粒子`)
                            }
                        } else if (id == 1) {
                            if (pl.hasTag('e2')) {
                                pl.removeTag('e2')
                                pl.tell(`§l§a成功關閉該粒子`)
                            } else {
                                pl.addTag('e2')
                                pl.tell(`§l§a成功使用該粒子`)
                            }
                        }else if (id == 2) {
                            if (pl.hasTag('e3')) {
                                pl.removeTag('e3')
                                pl.tell(`§l§a成功關閉該粒子`)
                            } else {
                                pl.addTag('e3')
                                pl.tell(`§l§a成功使用該粒子`)
                            }
                        }else if (id == 3) {
                            if (pl.hasTag('e4')) {
                                pl.removeTag('e4')
                                pl.tell(`§l§a成功關閉該粒子`)
                            } else {
                                pl.addTag('e4')
                                pl.tell(`§l§a成功使用該粒子`)
                            }
                        }else if (id == 4) {
                            if (pl.hasTag('e5')) {
                                pl.removeTag('e5')
                                pl.tell(`§l§a成功關閉該粒子`)
                            } else {
                                pl.addTag('e5')
                                pl.tell(`§l§a成功使用該粒子`)
                            }
                        }else if (id == 5) {
                            if (pl.hasTag('e6')) {
                                pl.removeTag('e6')
                                pl.tell(`§l§a成功關閉該粒子`)
                            } else {
                                pl.addTag('e6')
                                pl.tell(`§l§a成功使用該粒子`)
                            }
                        }else if (id == 6) {
                            if (pl.hasTag('e7')) {
                                pl.removeTag('e7')
                                pl.tell(`§l§a成功關閉該粒子`)
                            } else {
                                pl.addTag('e7')
                                pl.tell(`§l§a成功使用該粒子`)
                            }
                        }else if (id == 7) {
                            if (pl.hasTag('e8')) {
                                pl.removeTag('e8')
                                pl.tell(`§l§a成功關閉該粒子`)
                            } else {
                                pl.addTag('e8')
                                pl.tell(`§l§a成功使用該粒子`)
                            }
                        }else if (id == 8) {
                            if (pl.hasTag('e9')) {
                                pl.removeTag('e9')
                                pl.tell(`§l§a成功關閉該粒子`)
                            } else {
                                pl.addTag('e9')
                                pl.tell(`§l§a成功使用該粒子`)
                            }
                        }else if (id == 9) {
                            if (pl.hasTag('e10')) {
                                pl.removeTag('e10')
                                pl.tell(`§l§a成功關閉該粒子`)
                            } else {
                                pl.addTag('e10')
                                pl.tell(`§l§a成功使用該粒子`)
                            }
                        }
                    })
                } else if (id == 1) {

                } else if (id == 2) {
                    if (pl.hasTag('high')) {
                        pl.runcmd('high')
                    } else if (pl.hasTag('high') == false) {
                        pl.sendForm(high,(pl,id) => {
                            if (id == 0) {
                                pl.addTag('high')
                                pl.reduceScore('point', 50)
                                pl.tell('§l§a你已成功購買高級商店的權限！')
                            } else if (id == 1) {
                                pl.tell('§l§c雖然你沒有購買高級商店權限，但是高級商店有很多的神級鎬和裝備哦！')
                            } else if (id == null) {
                                pl.tell('§l§c你已取消操作')
                            }
                        })
                    }
                }
            })
        }
    })
    cmd.setup()
})

//管理員選單
mc.listen("onServerStarted",()=> {
    function createPlayerNamesList(playerList) {
        let onlinePlayers = []
        for (let i = 0; i<playerList.length; i++) {
            onlinePlayers.push(playerList[i].realName);
        }
        return onlinePlayers;
    }

    var fm = 
    fm.setTitle('§l§c管理員選單')
    fm.addButton('§l§9更換游戲模式')//0
    fm.addButton('§l§9開關隱身模式')//1
    fm.addButton('§l§9封禁玩家')//2
    fm.addButton('§l§9解除封禁玩家')//3
    fm.addButton('§l§9傳送到其他玩家')//4
    fm.addButton('§l§9踢出玩家')//5
    fm.addButton('§l§9banlist')//6
    fm.addButton('§l§9blackbe')//7
    fm.addButton('§l§9查背包')//8
    fm.addButton('§l§9禁言')//9
    fm.addButton('§l§9重啟伺服器§c(請勿胡亂使用！)')//10
    fm.addButton('§l§9關閉伺服器§c(倒數5秒，請勿胡亂使用！)')//11
    fm.addButton('§l§9關閉伺服器§c(倒數15秒，請勿胡亂使用！)')//12

    var gamemode = mc.newCustomForm()
    gamemode.setTitle('§l§9更換游戲模式')
    gamemode.addLabel('1:創造,2:生存,3:冒險,4:旁觀者')
    gamemode.addSlider('請選取你要更換的模式',1,4)

    var unsee = mc.newCustomForm()
    unsee.setTitle('§l§9隱身')
    unsee.addLabel('1:假裝離開伺服器,2:隱身效果')
    unsee.addSlider('請選取隱身等級',1,2)

    var tp = mc.newCustomForm()
    tp.setTitle('§l§9傳送玩家')
    tp.addDropdown('請選取你要傳送的玩家', createPlayerNamesList(mc.getOnlinePlayers()))

    var kick = mc.newCustomForm()
    kick.setTitle('§l§9踢出玩家')
    kick.addDropdown('請選取你要踢出的玩家', createPlayerNamesList(mc.getOnlinePlayers()))
    kick.addInput('請輸入踢出的原因(選填，請加上"")')

    var ban = mc.newCustomForm()
    ban.setTitle('§l§9封禁玩家')
    ban.addInput('請輸入玩家名稱(如玩家名稱有空格請加上""):')
    ban.addInput('請輸入封禁原因(選填，請加上""):')
    ban.addInput('請輸入封禁時間(分鐘，選填(如填寫此處必須填寫封禁原因)):')

    var unban = mc.newCustomForm()
    unban.setTitle('§l§9解除封禁(如玩家名稱有空格請加上"")')
    unban.addInput('請輸入你要解除封禁的玩家')
    
    var cb = mc.newCustomForm()
    cb.setTitle('§l§e查看包包')
    cb.addLabel('§l§b請輸入正確的參數')
    cb.addInput('§l§a玩家id如果有特殊符號請用""'['玩家ID'])
    
    var mute = mc.newSimpleForm()
    mute.setTitle('§l§e禁言')
    mute.addButton('§l§9禁言別人')
    mute.addButton('§l§9解禁言')
    
    var muteother = mc.newCustomForm()
    muteother.setTitle('§l§e禁言別人')
    muteother.addInput('§l§b輸入玩家ID如果有特殊符號就用""')
    muteother.addInput('§l§a理由')
    
    var unmute = mc.newCustomForm()
    runcmd.setTitle('§l§e解禁言')
    unmute.addInput('§l§b輸入玩家ID如果有特殊符號就用""')
    unmute.addInput(`§l§a理由`)
    
    var restart = mc.newSimpleForm()
    restart.setTitle('§l§e重置系統')
    restart.addButton('§l§b重製設定')
    restart.addButton('§l§b開始進行重製§c(不要亂用)')
    
    var stopser = mc.newCustomForm()
    stopser.setTitle('關閉伺服器')
    stopser.addLabel('§l§c請雙重確認')
    stopser.addLabel('§l§c請雙重確認')
    stopser.addLabel('§l§c請雙重確認')
    stopser.addLabel('§l§c確認要關閉伺服器')
    stopser.addLabel('§l§c確認要關閉伺服器')
    stopser.addLabel('§l§e如果確認就按下去')
    
    var wnstop = mc.newCustomForm()
    wnstop.setTitle('關閉伺服器')
    wnstop.addLabel('§l§c請雙重確認')
    wnstop.addLabel('§l§c請雙重確認')
    wnstop.addLabel('§l§c請雙重確認')
    wnstop.addLabel('§l§c確認要關閉伺服器')
    wnstop.addLabel('§l§c確認要關閉伺服器')
    wnstop.addLabel('§l§e如果確認就按下去')
    
    mc.runcmd('effect @e[type=armor_stand] invisibility 225 225 true')
    mc.runcmd('tp @e[type=armor_stand] @r')
    //之後大廳蓋好就傳送到上方不然這樣有一定的風險
    
    var cmd = mc.newCommand('admin','管理員選單',PermType.GameMasters)
    cmd.overload()
    cmd.setCallback((_cmd,ori,_out,_res) => {
        ori.player.sendForm(fm,(pl,id)=>{
            if (id == 0) {
                pl.sendForm(gamemode,(pl,data) => {
                    if (data[1] == 1) {
                        pl.runcmd(`gamemode 1`)
                    } else if (data[1] == 2) {
                        pl.runcmd(`gamemode 0`)
                    } else if (data[1] == 3) {
                        pl.runcmd(`gamemode 2`)
                    } else if (data[1] == 4) {
                        pl.runcmd(`gamemode spectator`)
                    }else if (data[0] == undefined) {
                        pl.tell('§l§c你已取消操作')
                    }
                })
            } else if (id == 1) {
                pl.sendForm(unsee,(pl,data) => {
                    if (data[1] == 1) {
                        mc.broadcast('§e'+pl.realName+'離開了游戲')
                    } else if (data[1] == 2) {
                        pl.runcmd(`effect @s invisibility 99999 255 true`)
                    }else if (data[0] == undefined) {
                        pl.tell('§l§c你已取消操作')
                    }
                })
            } else if (id == 2) {
                pl.sendForm(ban,(pl,data) => {
                    if (data[0] != undefined) {
                        if (data[1] != undefined) {
                            if (data[2] != undefined) {
                                mc.runcmd(`summon armor_stand ${data[0]}`)
                                pl.runcmd(`ban ${data[0]} ${data[1]} ${data[2]}`)
                                pl.tell('§l§a成功封禁玩家' + data[0] + '原因爲' + data[1] + '時間爲' + data[2] + '分鐘')
                            } else if (data[2] == '') {
                                pl.runcmd(`ban ${data[0]} ${data[1]}`)
                                pl.tell('§l§a成功封禁玩家' + data[0] + '原因爲' + data[1])
                            }
                        } else if (data[1] == ''){
                            pl.runcmd(`ban ${data[0]}`)
                            pl.tell('§l§a成功封禁玩家' + data[0])
                        }
                    } else if (data[0] == '') {
                        pl.tell('§l§c請輸入你所封禁的玩家名稱')
                    }
                })
            } else if (id == 3) {
                pl.sendForm(unban,(pl,data) => {
                    if (data[0] != undefined) {
                        pl.runcmd(`unban ${data[0]}`)
                        pl.tell('§l§a成功解除玩家' + data[0] + '的封禁')
                    }else if (data[0] == undefined) {
                        pl.tell('§l§c你已取消操作')
                    }
                })
            } else if (id == 4) {
                pl.sendForm(tp,(pl,data)=>{
                    if (data[0] != undefined) {
                        pl.runcmd(`tp \"${data[0]}\"`)
                        pl.tell(`§l§a你成功傳送到玩家${data[0]}`)
                    } else if (data[0] == undefined) {
                        pl.tell('§l§c你已取消操作')
                    }
                })
            } else if (id == 5) {
                pl.sendForm(kick,(pl,data) => {
                    if (data[0] != undefined) {
                        if (data[1] != undefined) {
                            pl.runcmd(`kick \"${data[0]}\" §l§6玩家${data[0]}你已被伺服器管理員踢出伺服器\n原因爲:${data[1]}\n§l§d如有任何問題請到本服Discord群組詢問\n§bhttps://discord.gg/VMN3cgeUBd`)
                            pl.tell(`§l§a你成功踢出玩家${data[0]}`)
                        } else if (data[0] == '') {
                            pl.runcmd(`kick \"${data[0]}\" §l§6玩家${data[0]}你已被伺服器管理員踢出伺服器\n原因爲:空\n§l§d如有任何問題請到本服Discord群組詢問\n§bhttps://discord.gg/VMN3cgeUBd`)
                            pl.tell(`§l§a你成功踢出玩家${data[0]}`)
                        }
                    } else if (data[0] == '') {
                        pl.tell(`§l§c請正確選取玩家ID`)
                    } else if (data[0] == undefined) {
                        pl.tell('§l§c你已取消操作')
                    }
                })
            } else if (id == 6) {
                pl.runcmd(`tellraw @p {"rawtext":[{"text":"§l§a目前被封禁的人:\n"},{"text":"§r"},{"selector":"@e[type=armor_stand]"}]}`)
            } else if (id == 7) {
               //跟我說說blackbe是什麼意思好嗎
                pl.runcmd(`blackbe`)
            } else if (id == 8) {
                pl.runcmd('cb')
            } else if (id == 9) {
                pl.sendFrom(mute,(pl,id)=>{
                  if (id == 0) {
                    pl.sendFrom(muteother,(pl,id)=> {
                      if (mc.getOnlinePlayers.includes(data[0]) == true) {
                        if (data[1] !== null) {
                          pl.runcmd(`tag ${data[0]} add mute`)
                         pl.tell(`§l§a>>>§e你已成功禁言了§g${data[0]}§e原因§b${data[1]}`)
                         log(`>>>`+pl+'禁言了'+data[0]+'因為'+data[1])
                        } else {
                          pl.tell(`§l§c>>>輸入不確實`)
                        }
                      } else {
                        pl.tell(`§l§c>>>輸入不確實`)
                      }
                    })
                  } else if (id == 1) {
                    pl.sendFrom(unmute,(pl,id)=> {
                      if (mc.getOnlinePlayers.includes(data[0]) == true) {
                        if (data[1] !== null) {
                          pl.runcmd(`tag ${data[0]} remove mute`)
                         pl.tell(`§l§a>>>§e你已成功解禁言了§g${data[0]}§e原因§b${data[1]}`)
                         log(`>>>`+pl+'解禁言了'+data[0]+'因為'+data[1])
                        } else {
                          pl.tell(`§l§c>>>輸入不確實`)
                        }
                      } else {
                        pl.tell(`§l§c>>>輸入不確實`)
                      }
                    })
                  } else if (id == null) {
                    pl.tell('§l§c>>>已關閉選單')
                  }
                })
            } else if (id == 10) {
                pl.sendForm(restart,(pl,id)=>{
                  if (id == 0) {
                    pl.runcmd('RSST')
                  } else if (id == 1) {
                    pl.runcmd('restart')
                  } else if (id == null) {
                    pl.tell('§l§c>>>表單關閉')
                  }
                })
            } else if (id == 11) {
                pl.sendForm(stopser,(pl,id)=> {
                  pl.runcmd('stopser')
                })
            } else if (id == 12) {
                pl.sendForm(wnstop,(pl,id)=> {
                  pl.runcmd('wnstop')
                })
            }
        })
    })
    cmd.setup()
})

//cb的部分
mc.listen("onServerStarted", () => {                                           

    let cmd = mc.newCommand("checkbag", "查詢玩家背包", PermType.GameMasters);  

    cmd.setAlias("cb");                                                        
    cmd.overload();                                                          
    cmd.setCallback((cmd, ori, out, res) => {
        if (ori.player == null) {                                         
            return out.error('輸入不完全');
        }
        else {
            if (ori.player.isOP()) {                       //再次验证，防execute绕过权限组
                CheckBagForm(ori.player);
                return;
            }
            else {
                return out.error(tr("你權限不足"));
            }                                                        
        }
    });
    cmd.setup();                                                            
});

function CheckBagForm(pl) {      
    let fm = mc.newSimpleForm();
    fm.setTitle('查詢玩家背包');
    fm.setContent('選擇查詢模式');
    fm.addButton('查詢在線玩家背包');
    fm.addButton('查詢全部玩家背包');
    fm.addButton('搜索玩家並查詢');
    fm.addButton('恢復上一個查包的包');
    pl.sendForm(fm, (pl, id) => {
        switch (id) {
            case 0:
                CheckOnlinePlayers(pl); 
                break;
            case 1:
                CheckAllPlayers(pl);   
                break;
            case 2:
                SearchForm(pl);
                break;
            case 3:
                ResumeBag(pl, true); 
                break;
            default:
                break;
        }
    });
}

function CheckAllPlayers(pl) { 
    let fm = mc.newSimpleForm();
    let pldata = data.getAllPlayerInfo();
    fm.setTitle('查詢全部玩家背包');
    fm.setContent('請選擇你要查詢的玩家')
    pldata.forEach((player) => {
        fm.addButton(player.name); 
    });
    pl.sendForm(fm, (pl, arg) => {
        if (arg == null) { 
            CheckBagForm(pl);
        }
        else {
            if (pldata[arg].uuid == pl.uuid) {
                pl.tell('§l§e[omsc] §r§c自己查自己好玩嗎？');
                return;
            }
            CheckPlayer(pl, pldata[arg]); 
            return;
        }
    });
}

function CheckOnlinePlayers(pl) {
    let fm = mc.newSimpleForm();
    fm.setTitle('查詢在線玩家背包');
    fm.setContent('請選擇你要查詢的玩家')
    let OnlinePlayers = mc.getOnlinePlayers();
    OnlinePlayers.forEach((player) => {
        fm.addButton(player.realName);
    });
    pl.sendForm(fm, (pl, arg) => {
        if (arg == null) {
            CheckBagForm(pl);
        }
        else {
            if (OnlinePlayers[arg].uuid == pl.uuid) {
                pl.tell('§l§e[omsc] §r§c自己查自己好玩嗎？');
                return;
            }
            if (OnlinePlayers[arg].uuid != undefined) {
                CheckPlayer(pl, SearchData(OnlinePlayers[arg]));
            }
            else {
                pl.tell('§l§e[omsc] §r§c目標玩家已離線，請使用查詢全部玩家來查詢離線玩家背包');
            }
            return;
        }
    });
}

function SearchData(pl) {
    let pldata = data.getAllPlayerInfo();
    for(let i in pldata) {
        if (pl.uuid == pldata[i].uuid) { 
            return pldata[i];
        }
    }
}

function CheckPlayer(pl, pldt) {    
    let fm = mc.newSimpleForm();
    fm.setTitle('查詢玩家背包');
    fm.setContent('已選擇玩家 {1}請選擇你要進行的操作').replace("{1}", pldt.name)
    fm.addButton('將玩家背包複製到自身背包');  
    fm.addButton('用自身背包覆蓋玩家背包'); 
    fm.addButton('刪除玩家全部數據'); 
    pl.sendForm(fm, (pl, arg) => {
        switch (arg) {
            case 0:
                CopyBag(pl, pldt);
                break;
            case 1:
                pl.sendModalForm('用自身背包覆蓋玩家背包'),('你確定要覆蓋玩家 {1} 的背包嗎').replace("{1}", pldt.name),('確認'),('我再想想',(pl,arg) => {
                    if (arg == 1) {
                        WriteBag(pl, pldt); 
                    }
                    else {
                        CheckPlayer(pl, pldt);
                    }
                });
                break;
            case 2:
                pl.sendModalForm('刪除玩家全部數據'),(`你確定要刪除玩家 {1} 的全部數據嗎？`).replace("{1}", pldt.name),('確認'),('我在想想',(pl,arg) => {
                    if (arg == 1) {
                        let plnbt = mc.getPlayerNbt(pldt.uuid);
                        if (plnbt == null) {
                            pl.tell('§l§e[omsc] §r§c目標玩家沒有數據');
                            return;
                        }
                        if (mc.getPlayer(pldt.xuid) == null) {
                            mc.deletePlayerNbt(pldt.uuid);
                            pl.tell('§l§e[omsc] §r§b操作成功');
                        }
                        else {
                            pl.tell('§l§e[omsc] §r§c操作失敗！目標玩家在線，無法刪除數據！');
                            CheckBagForm(pl);
                        }
                    }
                    else {
                        CheckPlayer(pl, pldt);
                    }
                });
                break;
            default:
                CheckBagForm(pl);
                break;
        }
    });
}

function SaveBag(pl) {
    let plsnbt = mc.getPlayerNbt(pl.uuid).toSNBT();
    File.writeTo(`./plugins/主插件/emeraldomsc.ll.js/db/${pl.uuid}`, plsnbt);
}

function CopyBag(pl, pldt) {  
    if (File.exists(`./plugins/主插件/emeraldomsc.ll.js/db/${pl.uuid}`)) {
        ResumeBag(pl, false);
    }
    SaveBag(pl);
    let plnbt = mc.getPlayerNbt(pldt.uuid);
    if (plnbt == null) {
        pl.tell('§l§e[omsc] §r§c目標玩家沒有數據');
        return;
    } 
    mc.setPlayerNbtTags(pl.uuid, plnbt, ["Offhand", "Inventory", "Armor", "EnderChestInventory"]);
    pl.tell('l§e[omsc] §r§b操作成功');
}

function WriteBag(pl, pldt) {
    let plnbt = mc.getPlayerNbt(pl.uuid);
    if (mc.getPlayerNbt(pldt.uuid) == null) {
        pl.tell('§l§e[omsc] §r§c目標玩家沒有數據');
        return;
    } 
    mc.setPlayerNbtTags(pldt.uuid, plnbt, ["Offhand", "Inventory", "Armor", "EnderChestInventory"]);
    pl.tell('l§e[omsc] §r§b操作成功');
}

function ResumeBag(pl, lg) {
    let plsnbt = File.readFrom(`./plugins/主插件/emeraldomsc.ll.js/db/${pl.uuid}`);
    if (plsnbt == undefined && lg == true) {
        pl.tell('§l§e[omsc] §r§c無上次背包數據');
    }
    else {
        let plnbt = NBT.parseSNBT(plsnbt);
        mc.setPlayerNbtTags(pl.uuid, plnbt, ["Offhand", "Inventory", "Armor", "EnderChestInventory"]);
        File.delete(`./plugins/主插件/emeraldomsc.ll.js/db/${pl.uuid}`);
    }
}

function SearchForm(pl) {
    let fm = mc.newCustomForm();
    fm.setTitle('搜索玩家');
    fm.addLabel('搜索玩家並查詢');
    fm.addInput('你要查詢的玩家的真實名字'),('請輸入內容');
    fm.addDropdown(('請選擇搜索模式'), [('模糊搜索'), ('精準搜索')], 0);
    pl.sendForm(fm, (pl, arg) => {
        if (arg == null) {
            CheckBagForm(pl);
            return;
        }
        switch (arg[2]) {
            case 0:
                let list = GenSearchList(arg[1]);
                if (arg[1] == "") {
                    pl.sendModalForm('請輸入內容'),('你沒有輸入任何內容請重新輸入！'),('重新輸入'),('退出查包',(pl,arg) => {
                        if (arg == 1) {
                            SearchForm(pl);
                        }
                    });
                }
                else if (list.length == 0) {
                    pl.sendModalForm('沒有找到與你輸入結果匹配的玩家'),('你沒有輸入任何內容請重新輸入'),('重新輸入'),('退出查包',(pl,arg) => {
                        if (arg == 1) {
                            SearchForm(pl);
                        }
                    });
                }
                else {
                    SearchListForm(pl, list);
                }
                break;
            case 1:
                if (arg[1] == "") {
                      pl.sendModalForm('請輸入內容'),('你沒有輸入任何內容請重新輸入'),('重新輸入'),('退出查包',(pl,arg) => {
                        if (arg == 1) {
                            SearchForm(pl);
                        }
                    });
                }
                else if (GetDB(arg[1]) == null) {
                    pl.sendModalForm('操作失敗'),('沒有找到與你輸入結果匹配的玩家'),('重新输入'),('退出查包',(pl,arg) => {
                        if (arg == 1) {
                            SearchForm(pl);
                        }
                    });
                }
                else {
                    let pldt = GetDB(arg[1]);
                    CheckPlayer(pl, pldt);
                }
                break;
            default:
                CheckBagForm(pl);
                return;
        }
    });
}

function GetDB(realName) {
    let pldata = data.getAllPlayerInfo();
    for(let i in pldata) {
        if (realName == pldata[i].name) { 
            return pldata[i];
        }
    }
    return null;
}

function GenSearchList(key) {
    let pldata = data.getAllPlayerInfo();
    let res = [];
    for(let i in pldata) {
        if (pldata[i].name.includes(key)) { 
            res.push(pldata[i]);
        }
    }
    return res;
}

function SearchListForm(pl, pldata) {
    let fm = mc.newSimpleForm();
    fm.setTitle('查询全部玩家背包');
    fm.setContent('搜索結果如下請選擇你要查詢的玩家')
    pldata.forEach((player) => {
        fm.addButton(player.name);
    });
    pl.sendForm(fm, (pl, arg) => {
        if (arg == null) {
            CheckBagForm(pl);
        }
        else {
            if (pldata[arg].uuid == pl.uuid) {
                pl.tell('§l§e[omsc] §r§c自己查自己好玩嗎？');
                return;
            }
            CheckPlayer(pl, pldata[arg]);
            return;
        }
    });
}

//restart+RSST+wnstop
mc.listen('onServerStarted',()=> {
  var fm = mc.newCustomForm()
  fm.setTitle('§l§e重置設定')
  fm.addInput('§l§b定時重啟時間,請使用[]來使用'['Ex:[11.30],[22:30]'])
  fm.addInput('§l§g重製倒數時間以秒為單位後面不加s')
  var cmd = mc.newCommand('RSST','§l§e重置設定',PermType.GameMasters)
  cmd.overload()
  cmd.setCallback((_cmd,ori,_out,_res) => {
    var pl = ori.player
    pl.sendForm(fm,(pl,id)=> {
      if (data[0] == null) {
        if (data[1] == null) {
          pl.tell('§l§c表單提交失敗')
        } else if (data[1] !== null) {
          pl.tell(`§l§e>>>已修改倒數計時為${data[1]}s`)
          log(pl+`將倒數計時修改為${data[1]}`)
          var Count = `${data[1]}`
        }
      } else if (data(0) !== null) {
        if (data[1] == null) {
          pl.tell(`§l§a以將重啟時間修改為§g${data[0]}`)
          log(pl+`已將重啟時間修改為${data[0]}`)
          var Timing = `[${data[0]}]`
        } else if (data[1] !== null) {
          pl.tell(`§l§e>>>已修改倒數計時為${data[1]}s`)
          log(pl+`將倒數計時修改為${data[1]}`)
          pl.tell(`§l§a以將重啟時間修改為§g${data[0]}`)
          log(pl+`已將重啟時間修改為${data[0]}`)
          var Timing = `[${data[0]}]`
          var Count = `${data[1]}`
          //定时重启时间：[[时,分],[时,分]]
          //var Timing = [[11,23],[22,30]]
          //重启倒计时时长(单位:秒)
        }
      }
    })
  })
  cmd.setup()
    mc.listen("onServerStarted",function(){
  
  	if (!File.exists("./BDS-Restart.vbs")){
  
  		logger.error("請將 BDS-Restart.vbs 放到BDS根目錄");
  	}
  	setTimeout(function(){
  		var TimeCheckID  =  setInterval(()=>{
  			var date = new Date();
  			for (let i = 0; i < Timing.length; i++){
  				//log(Timing[i][0]+"  "+Timing[i][1]+" | current: "+date.getHours() +"  "+date.getMinutes()+"  "+date.getSeconds())
  				//到点重启
  				if (date.getHours() == Timing[i][0] && date.getMinutes() == Timing[i][1]){
  					ServerRestart();
  					clearInterval(TimeCheckID); //取消时间检查
  				}
  			}
  		},40000);
  	},60000);
  });
  
  
  // 注册命令
  var cmd = mc.newCommand("restart", "重置伺服器", PermType.GameMasters); 
  cmd.overload([]);
  var RestartState = false;
  cmd.setCallback((_cmd, _ori, out, res) => {
  	if (RestartState == true){
  		out.error("重啟進程已啟動, 無法重複執行");
  		return;
  	}
  	RestartState = true;
  	ServerRestart();
  	out.success("重啟進程已啟動");
  });
  cmd.setup();
  
  var scmd = mc.newCommand("wnstop", "關閉伺服器", PermType.GameMasters); 
  scmd.overload([]);
  scmd.setCallback((_cmd, _ori, out, res) => {
    var Count = 15
  	if (RestartState == true){
  		out.error("關閉進程已啟動,無法重複啟動");
  		return;
  	}
  	RestartState = true;
  	ServerRestart(false);
  	out.success("關閉進程已啟動");
  });
  scmd.setup();
  
  
  function ServerRestart(isRestart = true){
  	var str;
  	if (isRestart == false){
  		str = '關閉';
  	}else{
  		str = '重啟';
  	}
  	var tastID_1 = setInterval(()=>{
  		mc.broadcast(`[§eomsc§r]§b服務器 §6${Count} §b秒後${str}`);
  		mc.broadcast(`[§eomsc§r]§b服務器§6${Count} §a秒後${str}`, 5);
  		logger.warn(`伺服器 ${Count} 秒後${str}...`);
  		mc.runcmdEx("execute @a ~~~ playsound step.amethyst_block");
  		Count --;
  		if (Count < 0){
  			Count = 0;
  			logger.warn(`===== 玩家斷開連接 | 五秒後${str} ======`);
  			let pls = mc.getOnlinePlayers();
  			for (let i = 0; i<pls.length; i++){
  				if (isRestart == true){
  					logger.warn(`Disconnect <${pls[i].realName}> : `+pls[i].disconnect("服務器重啟中 | 預計一分鐘"));
  				}else{
  					logger.warn(`Disconnect <${pls[i].realName}> : `+pls[i].disconnect("服務器關閉 | 停服維護"));
  				}
  			}
  			setTimeout(()=>{
  				if (isRestart == true){
  					let cmd = `cscript BDS-Restart.vbs`;
  				    system.cmd(cmd, function(_exitcode, _output){
  				        if (_exitcode == 0){
  				            logger.warn("重啟腳本已退出");
  				        }
  				    });
  				}
  			    mc.runcmd("stop");
  			},5000);
  			clearInterval(tastID_1); // 退出倒计时
  		}
  	},1000);
  }
})

//高級商店
mc.listen('onServerStarted',()=> {
    var fm = mc.newSimpleForm()
    fm.setTitle('§l§9高級商店')
    fm.setContent('§l§c高級商店系統提示你:倒賣高級商店物品屬於違規行爲，玩家將會被取消高級商店使用資格以及封禁(會根據情況判斷)')
    fm.addButton('§l§9高級鎬子')
    fm.addButton('§l§9高級裝備')
    fm.addButton('§l§9高級武器')

    var high_level_pickaxe = mc.newSimpleForm()
    high_level_pickaxe.setTitle('§l§9高級鎬子')
    high_level_pickaxe.setContent('§l§9請選取你要購買的鎬子種類')
    high_level_pickaxe.addButton('§l§9超值鎬子')
    high_level_pickaxe.addButton('§l§9超凡鎬子')
    high_level_pickaxe.addButton('§l§9卓越鎬子')
    high_level_pickaxe.addButton('§l§9大師鎬子')

    var high_level_equipment = mc.newSimpleForm()
    high_level_equipment.setTitle('§l§9高級裝備')
    high_level_equipment.setContent('§l§9請選取你要購買的裝備種類')
    high_level_equipment.addButton('§l§9超值裝備')
    high_level_equipment.addButton('§l§9超凡裝備')
    high_level_equipment.addButton('§l§9卓越裝備')
    high_level_equipment.addButton('§l§9大師裝備')

    var high_level_weapon = mc.newSimpleForm()
    high_level_weapon.setTitle('§l§9高級武器')
    high_level_weapon.setContent('§l§9請選取你要購買的鎬子')
    high_level_weapon.addButton('§l§9超值武器')
    high_level_weapon.addButton('§l§9超凡武器')
    high_level_weapon.addButton('§l§9卓越武器')
    high_level_weapon.addButton('§l§9大師武器')

    var great_value_pickaxe = mc.newSimpleForm()
    great_value_pickaxe.addButton('§l§9低級超值鎬子')
    great_value_pickaxe.addButton('§l§9中級超值鎬子')
    great_value_pickaxe.addButton('§l§9高級超值鎬子')

    var extraordinary_pickaxe = mc.newSimpleForm()
    extraordinary_pickaxe.addButton('§l§9低級超凡鎬子')
    extraordinary_pickaxe.addButton('§l§9中級超凡鎬子')
    extraordinary_pickaxe.addButton('§l§9高級超凡鎬子')

    var excellence_pickaxe = mc.newSimpleForm()
    excellence_pickaxe.addButton('§l§9低級卓越鎬子')
    excellence_pickaxe.addButton('§l§9中級卓越鎬子')
    excellence_pickaxe.addButton('§l§9高級卓越鎬子')

    var Grandmaster_pickaxe = mc.newSimpleForm()
    Grandmaster_pickaxe.addButton('§l§9低級大師鎬子')
    Grandmaster_pickaxe.addButton('§l§9中級大師鎬子')
    Grandmaster_pickaxe.addButton('§l§9高級大師鎬子')

    var low_great_pickaxe = mc.newCustomForm()
    low_great_pickaxe.setTitle('§l§9低級超值鎬子')
    low_great_pickaxe.addLabel('§l§6『低級超值鎬子』一把售價為150000SC幣')

    var second_great_pickaxe = mc.newCustomForm()
    second_great_pickaxe.setTitle('§l§9中級超值鎬子')
    second_great_pickaxe.addLabel('§l§6『中級超值鎬子』一把售價為200000SC幣')

    var high_great_pickaxe = mc.newCustomForm()
    high_great_pickaxe.setTitle('§l§9高級超值鎬子')
    high_great_pickaxe.addLabel('§l§6『高級超值鎬子』一把售價為250000SC幣')

    var cmd = mc.newCommand('highshop','高級商店',PermType.Any)
    cmd.overload()
    cmd.setCallback((_cmd,ori,_out,_res) => {
        if (ori.player.hasTag('high') == false) {
            ori.player.tell('§l§c你不是贊助者/你沒有高級商店的權限')
        } else {
            pl.sendForm(fm,(pl,id) => {
                if (id == 0) {
                    pl.sendForm(high_level_pickaxe,(pl,id) => {
                        if (id == 0) {
                            pl.sendForm(great_value_pickaxe,(pl,id) => {
                                if (id == 0) {
                                    pl.sendForm(low_great_pickaxe,(pl,data) => {
                                        if (data == undefined) {
                                            pl.tell('§l§c你已取消購買')
                                        } else if (data != undefined) {
                                            if (pl.getScore('money') >= 150000) {

                                            }
                                        }
                                    })
                                } else if (id == 1) {
                                    pl.sendForm(second_great_pickaxe,(pl,data) => {
                                        if (data == undefined) {
                                            pl.tell('§l§c你已取消購買')
                                        } else if (data != undefined) {
                                            if (pl.getScore('money') >= 200000) {
                                                
                                            }
                                        }
                                    })
                                } else if (id == 2) {
                                    pl.sendForm(high_great_pickaxe,(pl,data) => {
                                        if (data == undefined) {
                                            pl.tell('§l§c你已取消購買')
                                        } else if (data != undefined) {
                                            if (pl.getScore('money') >= 250000) {

                                            }
                                        }
                                    })
                                }
                            })
                        } else if (id == 1) {
                            pl.sendForm(extraordinary_pickaxe,(pl,id) => {
                                if (id == 0) {

                                } else if (id == 1) {

                                } else if (id == 2) {
                                    
                                }
                            })
                        } else if (id == 2) {
                            pl.sendForm(excellence_pickaxe,(pl,id) => {
                                if (id == 0) {

                                } else if (id == 1) {

                                } else if (id == 2) {
                                    
                                }
                            })
                        } else if (id == 3) {
                            pl.sendForm(Grandmaster_pickaxe,(pl,id) => {
                                if (id == 0) {

                                } else if (id == 1) {

                                } else if (id == 2) {
                                    
                                }
                            })
                        }
                    })
                } else if (id == 1) {
                    pl.sendForm(high_level_equipment,(pl,id) => {

                    })
                } else if (id == 2) {
                    pl.sendForm(high_level_weapon,(pl,id) => {

                    })
                }
            })
        }
    })
    cmd.setup()
})

//粒子效果
setInterval(() => {
    var e1 = mc.runcmdEx(`execute as @a[tag=e2] run particle minecraft:water_wake_particle ~~-1~`)
    var e2 = mc.runcmdEx(`execute as @a[tag=e3] run particle minecraft:bubble_column_up_particle ~~-1~`)
    var e3 = mc.runcmdEx(`execute as @a[tag=e4] run particle minecraft:campfire_smoke_particle ~~-1~`)
    var e4 = mc.runcmdEx(`execute as @a[tag=e5] run particle minecraft:dragon_breath_trail ~~-1~`)
    var e5 = mc.runcmdEx(`execute as @a[tag=e6] run particle minecraft:heart_particle ~~-1~`)
    var e6 = mc.runcmdEx(`execute as @a[tag=e7] run particle minecraft:lava_particle ~~-1~`)
    var e7 = mc.runcmdEx(`execute as @a[tag=e8] run particle minecraft:electric_spark_particle ~~-1~`)
    var e8 = mc.runcmdEx(`execute as @a[tag=e9] run particle minecraft:enchanting_table_particle ~~-1~`)
    var e9 = mc.runcmdEx(`execute as @a[tag=e10] run particle minecraft:end_chest ~~-1~`)
}, 1000);
