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

let info = JSON.parse(localStorage.getItem('itemInfo'))

if(!info){
    window.alert('当前页面数据为空！')
    window.location.href = '../pages/list.html'
}

$("#exzoom").exzoom();

//thumb图片缩略图导航
$('.zoom .thumbBox span').mouseenter(function(){
    // console.log(this)
    $(this)
    .addClass('active')
    .children('i')
    .addClass('select')
    .parent()
    .siblings()
    .removeClass('active')
    .children('i')
    .removeClass('select')

    $('.zoom .exzoom_img_box .exzoom_preview img').attr('src',$(this).children('img').attr('src'))
    $('.zoom .exzoom_img_box ul li img').attr('src',$(this).children('img').attr('src'))
})


$('.zoom .exzoom_img_ul img').attr('src',info.imgA)
$('.zoom .thumbBox img').first().attr('src',info.imgA)
$('.zoom .thumbBox img').last().attr('src',info.imgB)
$('section .p_color img').attr('src',info.imgA)

$('section .right .name').html(info.name)
$('section .right .priceArea .okprice i').html(info.okprice)
$('section .right .priceArea .market_price').html('￥'+info["market-price"])
if(info.dis=='-1'){
    $('section .right .priceArea .dis').css({
        'display':'block',
        visiblity:'hidden',
        width:'0px',
        height:0
    })
}else{
    $('section .right .priceArea .dis').html(info.dis+'折')
}

//获取尺码标签
$.ajax({
    url:'/datail_test',
    type:'GET',
    dataType:'json',
    success:function(res){
        // console.log(res)
        var str = ''
        res.sizes.size.forEach((item,index)=>{
            if(res.sizes.flag[index]){
                str+=`<span>${item}<i></i></span>`
            }else{
                str+=`<span class="disable">${item}<i></i></span>`
            }
        })

        $('section .right .p_size .p_right>p').html(str)

        $('section .right .p_size .p_right>p span').click(function(){
            $(this)
            .addClass('active')
            .siblings()
            .removeClass('active')
        })
    }
})