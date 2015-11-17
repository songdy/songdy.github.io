"use strict";window.app=angular.module("againApp",["ngResource","ui.router","monospaced.qrcode"]).config(["$httpProvider","$stateProvider","$urlRouterProvider","$locationProvider",function(a,b,c,d){d.html5Mode(!0),c.otherwise("/"),a.interceptors.push("authInterceptor")}]),app.config(["$stateProvider",function(a){a.state("login",{url:"/login?redirect",controller:["$location","$state","$http","$stateParams","$rootScope","$scope","globalConfig",function(a,b,c,d,e,f,g){if(a.$$search.code)c({method:"POST",url:g.apihost+"/again/weixin/getUserInfo.do?code="+a.$$search.code,headers:{"Content-Type":"application/x-www-form-urlencoded"},cache:!1}).success(function(c){c.accessToken?(localStorage.setItem("accessToken",c.accessToken),localStorage.setItem("userId",c.accessToken.split("|")[0])):localStorage.clear();var d=decodeURIComponent(a.$$search.redirect);d=d.replace(/[\?&]from=singlemessage/i,""),d=d.replace(/[\?&]isappinstalled=\d*/i,""),d?a.path(d):b.go("main")}).error(function(a){});else{var h="https://open.weixin.qq.com/connect/oauth2/authorize",i={appid:g.wxAppid,redirect_uri:encodeURIComponent(a.absUrl()),response_type:"code",scope:"snsapi_userinfo"},j=[];for(var k in i)i[k]&&j.push(k+"="+i[k]);window.location.href=h+"?"+j.join("&")+"#wechat_redirect"}}]}).state("clear",{url:"/clear",controller:function(){localStorage.clear()}})}]),app.config(["$stateProvider",function(a){a.state("main",{url:"/",templateUrl:"../../views/main.html",controller:"mainCtrl"}).state("empty",{url:"/empty",templateUrl:"../../views/empty.html"})}]).controller("mainCtrl",["$rootScope","$scope","$state","$location","$timeout","walletSvc","shareSvc","prompting","loading",function(a,b,c,d,e,f,g,h,i){b.$root.title="我的卡包";var j=1;d.$$search.merchantId||a.merchantId?(a.merchantId=a.merchantId||d.$$search.merchantId,b.respData=f.specTicketList({merchantId:a.merchantId},function(){b.respData.myWallet&&0!==b.respData.myWallet.length||c.go("empty")}),b.hideMoreBtn=!0):b.respData=f.myWallet(function(){b.respData.myWallet&&0!==b.respData.myWallet.length?++j:c.go("empty")}),b.accessToken=localStorage.getItem("accessToken"),b.more=function(){var a=f.myWallet({pageIndex:j},function(){a.myWallet.length>0?(++j,b.respData.myWallet=b.respData.myWallet.concat(a.myWallet)):i.show("没有更多数据了",0,3e3)})},b.expiresNotice=function(){h.show("卡券将过期时，发短信提醒我","输入手机号码",function(a){if(!/^\d{11}$/gi.test(a))return void i.show("请输入有效的手机号码!",0,3e3);var b=g.setOverTime({phone:a},function(){"00000"===b.code?h.hide():i.show("操作失败，请稍候再试！",0,3e3)})},{inputType:"tel"})}}]),app.config(["$stateProvider",function(a){a.state("ticket",{url:"/ticket",templateUrl:"../../views/ticket/index.html"}).state("ticket.1",{url:"/detail/{type:1}/{id}/{accessToken}",templateUrl:"../../views/ticket/ticket1.html",controller:"ticketCtrl"}).state("ticket.2",{url:"/detail/{type:2}/{id}/{accessToken}",templateUrl:"../../views/ticket/ticket2.html",controller:"ticketCtrl"}).state("ticket.3",{url:"/detail/{type:3}/{id}/{accessToken}",templateUrl:"../../views/ticket/ticket3.html",controller:"ticketCtrl"}).state("ticket.4",{url:"/detail/{type:4}/{id}/{accessToken}",templateUrl:"../../views/ticket/ticket4.html",controller:"ticketCtrl"}).state("ticket.5",{url:"/detail/{type:5}/{id}/{accessToken}",templateUrl:"../../views/ticket/ticket5.html",controller:"ticketCtrl"}).state("ticket.6",{url:"/detail/{type:6}/{id}/{accessToken}",templateUrl:"../../views/ticket/ticket6.html",controller:"ticketCtrl"}).state("ticket.7",{url:"/detail/{type:7}/{id}/{accessToken}",templateUrl:"../../views/ticket/ticket7.html",controller:"ticketCtrl"}).state("ticket.gain",{url:"/gain/{type}/{ticketId}/{deviceCode}/{serviceCurrentTime}/{numerical}",controller:"gainTicketCtrl"}).state("ticket.share",{url:"/share/{type}/{id}/{accessToken}",templateUrl:"../../views/ticket/share.html",controller:"shareTicketCtrl"}).state("ticket.friends",{url:"/friends/{type}/{ticketId}/{deviceCode}/{serviceCurrentTime}/{numerical}/{merchant}",templateUrl:"../../views/ticket/friends.html",controller:"friendsCtrl"})}]).controller("ticketCtrl",["$scope","$state","$stateParams","$interval","$timeout","ticketSvc","sharing","loading","globalConfig",function(a,b,c,d,e,f,g,h,i){a.$on("$stateChangeStart",function(a,b,c,d,e){["ticket.gain","ticket.friends"].indexOf(b.name)>-1&&a.preventDefault()}),a.empty=!1;var j=localStorage.getItem("accessToken"),k=!!j&&j.split("|")[0];if(c.accessToken.split("|")[0]!==k)return void b.go("ticket.share",{type:c.type,id:c.id,accessToken:c.accessToken});var l=f.singleTicket({ticketId:c.id},function(){if(!l.merchant||!l.merchant.tickets)return h.show("卡券已核销",0,3e3),void e(function(){window.location.href=i.aboutAgain},3e3);var c=l.merchant.tickets[0];a.$root.title=l.merchant.merchantName;var j=c.maxPrinted,k=c.value;if(2===c.type){for(var m=0,n=[];j>m;m++)m!==j-1?n.push({clsName:k>m?"printed-card2":"printed-card"}):n.push({clsName:k>m?"printed-card-last2":"printed-card-last"});a.maxPrinted=n}if(2!==c.type||k>=j){a.qrcodeData={ticketId:c.id,senderId:localStorage.getItem("userId"),type:c.type,serverCurrentTime:l.serverCurrentTime},a.$on("$destroy",function(a){angular.isDefined(o)&&(d.cancel(o),o=void 0)});var o=d(function(){var g=f.h5UseTicketStatus({ticketId:c.id},function(){1===g.validResult?(d.cancel(o),[3,4,5,6].indexOf(c.type)>-1?(h.show("核销成功！",0,3e3),e(function(){b.go(".",{},{reload:!0})},3500)):a.empty=!0):2===g.validResult&&(a.qrcodeData.serverCurrentTime=g.serverCurrentTime)})},5e3)}a.merchant=l.merchant,a.qrcodeVersion=7,a.shareWith=function(){g.show()}})}]).controller("gainTicketCtrl",["$state","$stateParams","$q","$location","$scope","ticketSvc","loading","globalConfig",function(a,b,c,d,e,f,g,h){var i=f.specTypeTicketList({ticketId:b.ticketId},function(){if(i.merchant&&i.merchant.tickets&&i.merchant.tickets.length>1){if("00000"!==i.code)return void g.show("领卷失败，请稍候再试!",0,3e3);var c=b;c.merchant=i.merchant,a.go("ticket.friends",c)}else var d=f.h5ConfirmTicket({deviceCode:b.deviceCode,ticketId:b.ticketId,serverCurrentTime:b.serviceCurrentTime,numerical:b.numerical},function(){1!==d.validResult&&d.targetTicketId?a.go("ticket."+b.type,{id:d.targetTicketId,type:b.type,accessToken:localStorage.getItem("accessToken")}):window.location.href=h.aboutAgain})})}]).controller("friendsCtrl",["$scope","$state","$stateParams","ticketSvc","loading",function(a,b,c,d,e){a.$on("$stateChangeStart",function(a,b,c,d,e){"ticket.gain"===b.name&&a.preventDefault()}),a.$root.title="选择卡券",a.merchant=c.merchant;var f;a.choose=function(b){for(var c in a.merchant.tickets){var d=a.merchant.tickets[c].id===b;a.merchant.tickets[c].choose=d,d&&(f=a.merchant.tickets[c])}},a.choosed=function(){if(f)var a={deviceCode:c.deviceCode,ticketId:f.id,serverCurrentTime:c.serviceCurrentTime,numerical:c.numerical},g=d.h5ConfirmTicket(a,function(){"00000"!==g.code&&e.show("分享失败，请重新领取",0,5e3),0===g.validResult?b.go("ticket."+f.type,{id:g.targetTicketId,type:f.type,accessToken:localStorage.getItem("accessToken")}):1===status.validResult?e.show("卡券已过时，请重新领取",0,5e3):e.show("领取失败",0,5e3)});else e.show("请选择！",0,3e3)}}]).controller("shareTicketCtrl",["$scope","$state","$stateParams","$http","$location","$timeout","globalConfig","ticketSvc","loading",function(a,b,c,d,e,f,g,h,i){a.$on("$stateChangeStart",function(a,c,d,e,f){/ticket\.[1-7]/.test(c.name)&&(a.preventDefault(),b.go("main"))}),a.$root.title="我的就是你的",d({method:"GET",url:g.apihost+"/again/ticket/weixinSingleTicket.do?ticketId="+c.id,headers:{accessToken:c.accessToken},cache:!1}).success(function(d){return d.merchant&&d.merchant.tickets?(a.merchant=d.merchant,a.type=c.type,void(a.accept=function(){var a=h.shareSingleTicket({ticketId:c.id,senderId:c.accessToken.split("|")[0]},function(){0===a.result?(i.show("领取成功",0,3e3),f(function(){b.go("main")},3500)):2===a.result?(i.show("您已经领过了哦，去Again再来公众号看看我的卡包吧",0,3e3),f(function(){b.go("main")},3500)):5===a.result?(i.show("领自己的券有意思么？",0,3e3),f(function(){b.go("main")},3500)):window.location.href=g.aboutAgain})})):(i.show("卡券已核销",0,3e3),void f(function(){window.location.href=g.aboutAgain},3e3))}).error(function(a){i.show("领取失败",0,3e3),b.go("main")})}]),app.directive("againgoback",function(){var a=navigator.userAgent.toLowerCase().match(/iphone|ipad/i)||[],b=a.length>0?"":'<div class="navbar"><a ui-sref="main" class="goback"></a></div>';return{restrict:"E",template:b,replace:!0}}),app.directive("againimg",["globalConfig",function(a){var b='<img ng-src="'+a.apihost+'/again/{{url}}" />';return{restrict:"E",template:b,replace:!0,scope:{url:"=url"}}}]),app.directive("againticket",function(){return{restrict:"E",templateUrl:"../../templates/againTicket.html",replace:!0,scope:{ticket:"=ticket",accessToken:"@accessToken"}}}),app.factory("authInterceptor",["$q","$rootScope","$injector","loading",function(a,b,c,d){var e={request:function(b){b.url.indexOf("h5UseTicketStatus")<0&&d.show(null,300);var e=c.get("$state"),f=c.get("$location"),g=a.defer();return e.is("login")?g.resolve(b):localStorage.getItem("accessToken")?(b.headers.accessToken||(b.headers.accessToken=localStorage.getItem("accessToken"),b.cache=!1),g.resolve(b)):(g.reject("accessToken is required"),e.go("login",{redirect:f.url()}),d.hide()),g.promise},response:function(a){return d.hide(),a},responseError:function(b){return d.hide(),d.show("网络不可用，请链接网络",500,3e3),a.reject(b)}};return e}]),app.factory("loading",["$timeout",function(a){var b=function(b,d,e){var f=document.getElementById("loading-box");if(!f){b=b?b:"加载中...";var g='<div class="backdrop visible  active"></div><div class="backdrop-container visible active"><div class="loading"><span>'+b+"</span></div></div>",h=document.createElement("div");h.id="loading-box",h.innerHTML=g,d&&d>0&&(h.style.display="none",a(function(){var a=document.getElementById("loading-box");a&&(h.style.display="block")},d)),e&&e>0&&a(function(){c()},e),document.body.appendChild(h)}},c=function(){var a=document.getElementById("loading-box");a&&(a.remove?a.remove():a.parentNode.removeChild(a))};return{show:b,hide:c}}]),app.factory("prompting",function(){var a=function(a,c,d,e){var f={title:"",placeholder:"",inputType:"text",cancelBtn:{text:"取消",onClick:function(){}},okBtn:{text:"确定",onClick:function(a){console.log(a)}}};"object"==typeof a?angular.extend(f,a):"object"==typeof c?(angular.extend(f,c),f.title=a||""):"object"==typeof d?(angular.extend(f,d),f.title=a||"",f.placeholder=c||""):(angular.extend(f,e),f.title=a||"",f.placeholder=c||"",f.okBtn.onClick=d);var g='<div class="backdrop visible active"></div>',h=document.createElement("div");h.id="prompting-box",h.innerHTML=g;var i=document.createElement("div");i.setAttribute("class","backdrop-container visible active");var j=document.createElement("div");j.setAttribute("class","prompting");var k=document.createElement("header");k.innerText=f.title;var l=document.createElement("input");l.setAttribute("type",f.inputType),l.setAttribute("placeholder",f.placeholder);var m=document.createElement("footer"),n=document.createElement("a");n.setAttribute("class","cancel"),n.innerText=f.cancelBtn.text,n.onclick=function(){b(),f.cancelBtn.onClick()};var o=document.createElement("a");o.setAttribute("class","ok"),o.innerText=f.okBtn.text,o.onclick=function(){f.okBtn.onClick(l.value)},m.appendChild(n),m.appendChild(o),j.appendChild(k),j.appendChild(l),j.appendChild(m),i.appendChild(j),h.appendChild(i),document.body.appendChild(h)},b=function(){var a=document.getElementById("prompting-box");a.remove?a.remove():a.parentNode.removeChild(a)};return{show:a,hide:b}}),app.factory("sharing",function(){var a=function(){var a='<div class="backdrop visible active"></div><div class="backdrop-container visible active"><div class="sharing-guide"></div></div>',c=document.createElement("div");c.id="sharing-box",c.innerHTML=a,c.onclick=function(){b()},document.body.appendChild(c)},b=function(){var a=document.getElementById("sharing-box");a.remove?a.remove():a.parentNode.removeChild(a)};return{show:a,hide:b}}),app.filter("urlFilter",["globalConfig",function(a){return function(b){return/^http/gi.test(b)?b:/^\//.test(b)?a.apihost+"/again"+b:b?a.apihost+"/again/"+b:b}}]),app.provider("globalConfig",function(){this.$get=function(){return{apihost:"http://183.63.144.83:33003",clienthost:"http://again.51b.org",wxAppid:"wxde5fec3eb7eefcf7",aboutAgain:"http://app.againvip.com/promote.html"}}}),app.provider("sharePvd",function(){this.$get=["$resource","globalConfig",function(a,b){return a(null,null,{setOverTime:{method:"GET",url:b.apihost+"/again/share/setOverTime.do",isArray:!1}})}]}),app.provider("ticketPvd",function(){this.$get=["$resource","globalConfig",function(a,b){return a(b.apihost+"/again/ticket/weixinSingleTicket.do",{ticketId:"@id"},{query:{method:"GET",isArray:!1},h5ConfirmTicket:{method:"GET",url:b.apihost+"/again/ticket/h5ConfirmTicket.do",isArray:!1},h5UseTicketStatus:{method:"POST",url:b.apihost+"/again/ticket/h5UseTicketStatus.do",isArray:!1},shareSingleTicket:{method:"GET",url:b.apihost+"/again/share/shareSingleTicket.do",isArray:!1},specTypeTicketList:{method:"GET",url:b.apihost+"/again/ticket/specTypeTicketList.do",isArray:!1}})}]}),app.provider("walletPvd",function(){this.$get=["$resource","globalConfig",function(a,b){return a(b.apihost+"/again/wallet/myWallet.do",{},{query:{method:"GET",isArray:!1,params:{longitude:"23.22983202",latitude:"113.23928322"}},specTicketList:{method:"GET",url:b.apihost+"/again/wallet/specTicketList.do",isArray:!1}})}]}),app.service("shareSvc",["sharePvd",function(a){this.setOverTime=a.setOverTime}]),app.service("ticketSvc",["ticketPvd",function(a){this.singleTicket=a.query,this.h5ConfirmTicket=a.h5ConfirmTicket,this.h5UseTicketStatus=a.h5UseTicketStatus,this.shareSingleTicket=a.shareSingleTicket,this.specTypeTicketList=a.specTypeTicketList}]),app.service("walletSvc",["walletPvd",function(a){this.myWallet=a.query,this.specTicketList=a.specTicketList}]);