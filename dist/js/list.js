"use strict";var currPage=1,flag=!0,type=1,list=null;function getList(t,a){$.ajax({url:"../lib/self/shoe_sort".concat(t,".json"),dataType:"json",type:"GET",success:function(t){if(a)for(var i=0;i<parseInt(t.length/2);i++){var s=t[i];t[i]=t[t.length-i-1],t[t.length-i-1]=s}$(".list .center .all").html(t.length),bindHtml(list=t.slice(40*(currPage-1),40*currPage)),flag&&bindPagi(Math.ceil(t.length/40))}})}function bindHtml(n){var i="";n.forEach(function(t){i+='<li data-id = "'.concat(t.id,'">\n        <a class="img">\n            <img class="imgA" src="').concat(t.imgA,'" alt="">\n            <img class="imgB" src="').concat(t.imgB,'" alt="">\n        </a>\n        <p class="name">\n            <a target="_blank" title="">').concat(t.name,'</a> \n        </p>\n        <p class="price">\n            ￥<span class="okprice">').concat(t.okprice,"</span>"),"-1"!=t.dis&&(i+='<span class="oksale ">(<em class="dis">'.concat(t.dis,"</em>折)</span>")),i+='<span class="market-price">'.concat(t["market-price"],"</span> \n        </p>"),""!==t["sale-tag"]&&(i+='<p class="info"><a target="_blank" style="color:#666"><span class="sale-tag">'.concat(t["sale-tag"],"</span>").concat(t["tag-text"],"</a></p>")),i+="</li>"}),$(".list .itemBox ul").html(i),$(".list .itemBox ul").on("click","li",function(){var s=this,a=null;n.forEach(function(t,i){t.id!=$(s).attr("data-id")||(a=n[i])}),localStorage.setItem("itemInfo",JSON.stringify(a)),window.location.href="../pages/detail.html"})}function bindPagi(t){flag=!1,$(".list .total span").html(t),$(".list .right .allpage").html(t),$(".pagi").pagination({coping:!0,current:1,pageCount:t,showData:40,count:2,homePage:"首页",endPage:"末页",prevContent:"上一页",nextContent:"下一页",callback:function(t){currPage=t.getCurrent(),$(".list .right .cur").html(currPage),getList(type),$(window).scrollTop(625)}}),$(".list .right .prev").click(function(){1!==currPage&&$(".list-bottom .pagi .prev").trigger("click")}),$(".list .right .next").click(function(){currPage!==t&&$(".list-bottom .pagi .next").trigger("click")})}$(".goTop p").click(function(){var t=this;clearInterval(this.timer),this.timer=setInterval(function(){$(window).scrollTop($(window).scrollTop()-50),0===$(window).scrollTop()&&clearInterval(t.timer)},10)}),$(window).scroll(function(){139<$(window).scrollTop()?$("nav").css({position:"sticky",top:"0px",zIndex:999}):$("nav").css("position","static"),$(window).scrollTop()<100?$(".goTop").css("opacity",0):$(".goTop").css("opacity",1),4300<$(window).scrollTop()?$(".goTop").css({position:"absolute",bottom:"326px"}):$(".goTop").css({position:"fixed",bottom:"70px"})}),$(".list .list-top .left a").click(function(){$(this).addClass("active").siblings().removeClass("active");var t=!1;1==$(this).index()?$(this).children("i").hasClass("up")?$(this).children("i").removeClass("up").addClass("down"):($(this).children("i").removeClass("down").addClass("up"),t=!0):$(this).parent().children(":eq(1)").children("i").removeClass("down").removeClass("up"),2==$(this).index()?$(this).children("i").addClass("down"):$(this).parent().children(":eq(2)").children("i").removeClass("down"),getList(type=$(this).index()+1,t)}),getList(type);