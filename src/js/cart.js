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