var BDBridge = window.BDBridge || (function(){

    var self;
    var CONFIG = {
        BD_BRIDGE_OPEN : 1,
        BD_BRIDGE_ROOT : "http://qiao.baidu.com/v3/"
    };

    document.cookie = 'VERSION=2,0,0,0';
    
    if ((CONFIG.BD_BRIDGE_OPEN == 1) && (typeof window["BD_BRIDGE_LOADED"] == "undefined")) {
        window["BD_BRIDGE_LOADED"] = 1;
        var script = document.createElement("script");
        script.type="text/javascript";
        script.charset = "UTF-8";
        script.src = CONFIG.BD_BRIDGE_ROOT + "asset/js/bw.js?v=20140731";
        document.getElementsByTagName("head")[0].appendChild(script);
    }
    
    
    return self = {
    
        BD_BRIDGE_OPEN : CONFIG.BD_BRIDGE_OPEN,
        BD_BRIDGE_ROOT : CONFIG.BD_BRIDGE_ROOT,
        BD_BRIDGE_RCV_ROOT : "http://r.qiao.baidu.com/",
        BD_BRIDGE_DATA : {mainid : "120346393", SITE_ID : "c64c3fae8bee0db7167e50b03190f8af", siteid : "1387671", userName: '木鱼网络mywl'},
        OPEN_MODULAR : 11111,
                BD_BRIDGE_SPECIAL :  [] ,
        
                BD_BRIDGE_STYLE_ITEM : 
        [        {
            pageid : "0",
            
           
                        BD_BRIDGE_GROUP:  [ '0' - 0 ] ,
            
            BD_BRIDGE_ICON_CONFIG : {
                iconlvtype : "1" - 0,
                background : {
                    color : "",
                    url   : "http://qiao.baidu.com/style/393/120346393/1/iconbg.jpg",
                    bgcolor : "#2990be"
                },
                head : {
                    url    : "",
                    width  : "147" - 0,
                    height : "120" - 0
                },
                button : {
                    color : "#f7bd84",
                    url   : "",
                    text  : "#bd4b13"
                },
                flow     : "0" - 0,
                position : "5" - 0,
                special : "0"
            },
            BD_BRIDGE_INVITE_CONFIG : {
                on : "0" - 0,
                show : {
                    pos : "0" - 0,
                    width : "320" - 0,
                    height : "150" - 0,
                    font : "宋体",
                    fontsize : "12",
                    fontcolor : "#000000",
                    type : "1" - 0
                },
                background : {
                    color : "",
                    url   : "http://qiao.baidu.com/v3/res/invitebg/09.jpg"
                },
                head : {
                    show : "0" - 0,
                    size : "1" - 0,
                    url  : "http://qiao.baidu.com/v3/res/invitehead/13_big.jpg"
                },
                text   : "欢迎您，有什么可以帮助您的么？",
                button : "#206cd3",
                mode   : "0" - 0,
                special : "16" - 0
            },
            BD_BRIDGE_INVITE : {
                inviteauto : "0" - 0,
                invitemanual : "1" - 0,
                invitetype   : "0" - 0,
                inviterepeat : "1" - 0,
                invitetime   : "10" - 0,
                invitedisaptype : "1" - 0,
                invitedisaptime : "3" - 0
            },
            BD_BRIDGE_WEBIM : {
                webimopentype : "0" - 0,
                webimbgcolor  : "#d5d5d5",
                floatposition : "0" - 0,
                floatChatName : "2" - 0,
                floatCustomname : ""
            },
                        BD_BRIDGE_PIGEON_SOUL : {
                disableMess     : "1" - 0,
                messType        : 1,
                messFloatType   : "0" - 0,
                language        : "0" - 0,
                position        : "0" - 0,
                backgroundColor : "#000000",
                backgroundUrl       : "http://qiao.baidu.com/v3/res/messbg/03.png", 
                messItemName    : "2",
                messItemPhone   : "2",
                messItemAddress : "2",
                messItemEmail   : "2",
                extraMessItems  :  [] 
            }
        }        ]
        
    }
   


})();
