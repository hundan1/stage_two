//轮播图
var mySwiper = new Swiper('.swiper-container', {
    direction: 'horizontal', // 垂直切换选项
    autoplay: {
        delay: 2000,
    }, //可选选项，自动滑动
    effect: "fade",
    fadeEffect: {
        crossFade: true,
    },
    // 如果需要分页器
    pagination: {
        el: '.swiper-pagination',
        clickable: true
    },

    // 如果需要前进后退按钮
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    }
})

for (var i = 0; i < mySwiper.pagination.bullets.length; i++) {
    mySwiper.pagination.bullets[i].onmouseover = function() {
        this.click()
    }
}

getList()
    //列表商品
function getList() {
    $.ajax({
        type: 'GET',
        url: "/okbuy_index",
        data: {
            cid: 3
        },
        cache: false,
        dataType: 'json',
        success: function(res) {
            if (res.code == 1) {
                const arr = res.res
                    // console.log(arr)
                arr.forEach((item, index) => {
                    // console.log(index)
                    let str = `<li>
                    <a href="${item.link}" target="_blank">
                    <img src="${item.img}" alt="">
                    <span class="tit1">${item.title}</span>
                    <span class="tit2">${item.slogan}</span>
                    <span class="price">${item.discount}</span>
                    <span class="time"">${index}</span>
                    </a>
                    </li>`
                    $('.list ul').append(str)
                        // 给每一个span.time添加定时器
                        // console.log($('.list ul .time')[index])
                    timer($('.list ul .time')[index], item.starttime, item.nowtime, item.endtime)
                })
            }
        }
    })
}

getList2()

function getList2() {
    $.ajax({
        type: 'GET',
        url: "/okbuy_index",
        data: {
            cid: 4
        },
        cache: false,
        dataType: 'json',
        success: function(res) {
            if (res.code == 1) {
                const arr = res.res
                arr.forEach((item, index) => {
                    // console.log(index)
                    let str = `<li>
                    <a href="${item.link}" target="_blank">
                    <img src="${item.img}" alt="">
                    <span class="title">${item.title}<i>${item.discount}</i></span>
                    <span class="time"">${index}</span>
                    </a>
                    </li>`
                    $('.list2 ul').append(str)
                        // 给每一个span.time添加定时器
                        // console.log($('.list ul .time')[index])
                    timer($('.list2 ul .time')[index], item.starttime, item.nowtime, item.endtime)
                })
            }
        }
    })
}

// 一键置顶

$('.goTop p').click(function(){
    // console.log(this)
    clearInterval(this.timer)
    this.timer = setInterval(()=>{
        $(window).scrollTop($(window).scrollTop()-50)
        if($(window).scrollTop()===0){
            clearInterval(this.timer)
        }
    },10)
})

$(window).scroll(function(){
    //导航栏变成黏性定位
    if($(window).scrollTop()>139){
        $('nav').css({
            position:'sticky',
            top:'0px',
            zIndex:999
        })
    }else{
        $('nav').css('position','static')
    }

    //置顶按钮出现
    if($(window).scrollTop()<100){
        $('.goTop').css('opacity',0)
    }else{
        $('.goTop').css('opacity',1)
    }
    //~~top会改变，不能做条件
    //top>body.height-326(绝对定位底326)-91（物体高度）
    if($(window).scrollTop()>4300){
        $('.goTop').css({
            position:'absolute',
            bottom:'326px'
        })
        
    }else{
        $('.goTop').css({
            position:'fixed',
            bottom: '70px'
        })
    }
})

