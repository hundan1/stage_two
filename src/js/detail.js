// 尺码标签选中状态
let isSelect = false
// 购物车列表
let cart = JSON.parse(localStorage.getItem('cart')) || []

//给数组添加个属性 totalnum 表示购物车里面的商品总数
if(!cart.totalnum){
    //初始化为0
    cart.totalnum = 0
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
            isSelect = true
            $(this)
            .addClass('active')
            .siblings()
            .removeClass('active')
        })
    }
})

//设置数量加减按钮
$('section .p_num .reduce')
.click(function(){
    if($('section .p_num input').val()>1){
        $('section .p_num input').val($('section .p_num input').val()-1)
    }
})

$('section .p_num .add')
.click(function(){
    if($('section .p_num input').val()<10){
        $('section .p_num input').val(parseInt($('section .p_num input').val())+1)
    }
})

//添加购物车按钮点击事件
$('.cartBtn').click(function(){
    if(isSelect){
        //cart结构[{},{},{}]
        let i = -1,j = -1
        cart.forEach((item,index)=>{
            if(item.id===info.id){
                i = index
                return
            }
        })
        if(i===-1){
            //没买过这种商品
            let obj={
                id : info.id,
                name : info.name,
                price : info.okprice,
                sale_tag : info["sale-tag"],
                tag_text : info["tag-text"],
                img : info.imgA,
                list : [{
                    size : $('.p_size .active').text(),
                    num : parseInt($('.p_num input').val())
                }]
            }
            cart.push(obj)

            cart.totalnum  += parseInt($('.p_num input').val())
            $('header .cartBox b').text(`(${cart.totalnum})`)
            addSuccess()
        }else{
            cart[i].list.forEach((item , index)=>{
                if(item.size==$('.p_size .active').text()){
                    j = index
                }
            })
            if(j===-1){
                //没买过这种尺码的产品
                let obj = {
                    size : $('.p_size .active').text(),
                    num : parseInt($('.p_num input').val()) 
                }
                cart[i].list.push(obj)
                cart.totalnum  += parseInt($('.p_num input').val())
                $('header .cartBox b').text(`(${cart.totalnum})`)
                addSuccess()
            }else{
                let t = cart[i].list[j].num + parseInt($('.p_num input').val())
                if(t < 10){
                    cart[i].list[j].num = t
                    //header里的cartBox的b值
                    cart.totalnum  += parseInt($('.p_num input').val())
                    $('header .cartBox b').text(`(${cart.totalnum})`)
                    //添加购物车按钮图片事件
                    addSuccess()
                }else{

                    cart.totalnum  += (9 - cart[i].list[j].num)

                    cart[i].list[j].num = 9
                    
                    $('header .cartBox b').text(`(${cart.totalnum})`)

                    $('.cartBtn .txt2')
                    .stop()
                    .animate({
                        opacity:1
                    },300,'linear',function(){
                        clearInterval($(this)[0].timer)
                        $(this)[0].timer = setTimeout(function(){
                            $('.cartBtn .txt2')
                            .stop()
                            .animate({
                                opacity:0
                            },300,'linear',function(){
                            
                            })
                        },600)
                    
                    })



                }
            }
        }

    }else{
        $('.cartBtn .txt1')
        .stop()
        .animate({
            opacity:1
        },300,'linear',function(){
            clearInterval($(this)[0].timer)
            $(this)[0].timer = setTimeout(function(){
                $('.cartBtn .txt1')
                .stop()
                .animate({
                    opacity:0
                },300,'linear',function(){
                   
                })
            },600)
           
        })
    }
})

function addSuccess(){
    $('.cartBtn input').css('visiblity','hidden')
    $('.cartBtn .txt3').css('display','inline-block')
    $('.cartBtn .txt3')
        .stop()
        .animate({
            opacity:1
        },300,'linear',function(){
            clearInterval($(this)[0].timer)
            $(this)[0].timer = setTimeout(function(){
                $('.cartBtn .txt3')
                .stop()
                .animate({
                    opacity:0
                },300,'linear',function(){
                    $('.cartBtn input').css('visiblity','visible')
                    $('.cartBtn .txt3').css('display','none')
                })
            },800)
        
        })   
}

