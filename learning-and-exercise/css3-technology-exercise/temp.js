/**
 * Created by nancy on 15-1-4.
 */
require.config({baseUrl: "/js/site", paths: {u: "../utils", c: "."}}), require(["c/auth_dialog", "c/widgets"], function () {
    $(function () {
        var e = $("#bigsearchForm"), t = $("#BSSCity"), n = $("#BSSFloor"), r = $("input[name=cityCode]", e);
        t.autocomplete({serviceUrl: CONTEXTPATH + "/autocomplete/city.json", paramName: "query", dataType: "json", transformResult: function (e) {
            return{suggestions: $.map(e.suggestions, function (e) {
                return{value: e.value, data: e.data}
            })}
        }, onSelect: function (e) {
            r.val(e.data)
        }, onSearchStart: function () {
            r.val("")
        }, onInvalidateSelection: function () {
            r.val("")
        }, onSearchComplete: function (e, t) {
            if (t.length === 0) {
                r.val("");
                return
            }
            t.length === 1 && r.val(t[0].data)
        }, autoSelectFirst: !0}), t.on("focus", function () {
            r.val("")
        }), n.autocomplete({serviceUrl: CONTEXTPATH + "/autocomplete/searchkey.json", paramName: "query", params: function (e) {
            return{query: e, type: $("#BSSQType").val()}
        }, dataType: "json", transformResult: function (e) {
            return{suggestions: $.map(e.suggestions, function (e) {
                return{value: e.value, type: e.type}
            })}
        }, customHTML: function (e, t, n, r) {
            var i = [], s = [], o = [], u;
            $.each(e || [], function (e, i) {
                e === 0 && (u = i.type), i.type == "1" ? s.push('<div class="' + t + '" data-index="' + e + '">' + n(i, r) + "</div>") : o.push('<div class="' + t + '" data-index="' + e + '">' + n(i, r) + "</div>")
            });
            if (o.length) {
                var a = u == 0 ? "unshift" : "push";
                a == "unshift" ? (i[a]("<dt>鑱屼綅</dt><dd>" + o.join("") + "</dd>"), s.length && i.push('<dt class="bd">鍏徃</dt><dd class="bd">' + s.join("") + "</dd>")) : (i[a]('<dt class="bd">鑱屼綅</dt><dd class="bd">' + o.join("") + "</dd>"), s.length && i.unshift("<dt>鍏徃</dt><dd>" + s.join("") + "</dd>"))
            } else if (s.length)return i = [], i.push(s.join("")), i.join("");
            return i.length === 1 ? "" : "<dl>" + i.join("") + "</dl>"
        }, onSelect: function (t) {
            $("#BSSSType").val(t.type), e.submit()
        }}), $("input:text", e).placeholder(), e.on("submit", function (e) {
            return r.val() === "" && $.trim(t.val()) !== "" ? (t.val(""), !1) : !0
        });
        var i = ["鎵惧伐浣滐紝鐪嬪噯浜嗕綘鍐嶈烦", "濂藉叕鍙革紝浣犺浜嗙畻", "鏌ュ伐璧勶紝鐪嬬湅浣犲€煎灏戦挶", "鑱婇潰璇曪紝甯綘杩囧叧鏇磋交鏉�"], s = [
            ["鑱屼綅/鍏徃鍚嶇О", "鎼滅储鏃ュ潎瓒呰繃2,000,000涓儹闂ㄨ亴浣嶆嫑鑱樹俊鎭�"],
            ["鍏徃鍚嶇О", "鏌ョ湅瓒呰繃1,000,000瀹跺叕鍙哥殑鍛樺伐鍖垮悕鐐硅瘎銆佸伐璧勫拰闈㈣瘯缁忛獙"],
            ["鑱屼綅/鍏徃鍚嶇О", "姣旇緝涓嶅悓鍏徃銆佷笉鍚岃亴浣嶅唴閮ㄥ憳宸ュ尶鍚嶅彂甯冪殑宸ヨ祫淇℃伅"],
            ["鑱屼綅/鍏徃鍚嶇О", "浜嗚В涓嶅悓鍏徃鐨勯潰璇曢棶棰樺拰闈㈣瘯缁嗚妭"]
        ];
        $("dl.banner_dl").tabs({tabSelector: "dt>a", current: "current", panelCancel: !0, callback: function (t, n) {
            $("#BSSQType").val(parseInt(t) + 1), e.attr("action", $(this).attr("href")), $("#bigsearchForm input[name=q]").attr("placeholder", s[t][0]).trigger("blur"), $("section.banner p").html(s[t][1]), $("section.banner h1").html(i[t]).removeClass().addClass("flipInX animated").one("webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend", function () {
                $(this).removeClass()
            })
        }}), $("#index_tabs").tabs({tabSelector: "nav a", current: "current", tabPanel: "div.panel", callback: function (e, t) {
            $.support.css3Property("transition") ? this.parent().css({"background-position": 102 * e + "px 0"}) : this.parent().animate({"background-position-x": 102 * e}, 200)
        }, animate: "fadeIn"}), $("div.links").on("click", "a.sprech", function () {
            $(this).parent("div.links").find("ul").toggleClass("js-links"), $(this).parent("div.links").find("ul").height() > 24 ? $(this).html('鏀惰捣<i class="up"></i>') : $(this).html('灞曞紑<i class="pull_down"></i>')
        })
    })
});