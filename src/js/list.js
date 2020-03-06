// 当前为第几页
let currPage = 1

// 只渲染一次分页器
let flag = true

//筛选类型
let type = 1

//渲染的数据列表
let list = null


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

// 筛选条件更改事件
$('.list .list-top .left a').click(function(){
    $(this)
    .addClass('active')
    .siblings()
    .removeClass('active')

    let isSort = false

    //价格筛选来回切换
    if($(this).index()==1){
        if($(this).children('i').hasClass('up')){
            $(this).children('i').removeClass('up').addClass('down')
        }else{
            $(this).children('i').removeClass('down').addClass('up')
            isSort = true
        }  
    }else{
        $(this).parent().children(':eq(1)').children('i').removeClass('down').removeClass('up') 
    }

    if($(this).index()==2){
        $(this).children('i').addClass('down')  
    }else{
        $(this).parent().children(':eq(2)').children('i').removeClass('down') 
    }

    type = $(this).index()+1
    getList(type,isSort)
})

//获取数据

getList(type)
function getList(type,isSort){
    $.ajax({
        url:`../lib/self/shoe_sort${type}.json`,
        dataType:'json',
        type:'GET',
        success:function(res){
            // res.length 一共有多少条数据
            // 一页40条数据
            // 一共res.length/40 页
            // console.log(res)
            if(isSort){
                //是否倒序
                for(var i = 0 ; i < parseInt(res.length/2) ; i++){
                    let t = res[i]
                    res[i] = res[res.length-i-1]
                    res[res.length-i-1] = t
                }
            }

            $('.list .center .all').html(res.length)
            list = res.slice((currPage-1)*40,currPage*40)
          
            bindHtml(list)

            if(flag){
                bindPagi(Math.ceil(res.length/40))
            }
        }
    })
}


function bindHtml(list){
    // console.log(list)
    var str = ''
    list.forEach(function(item){
        str += `<li data-id = "${item.id}">
        <a class="img">
            <img class="imgA" src="${item.imgA}" alt="">
            <img class="imgB" src="${item.imgB}" alt="">
        </a>
        <p class="name">
            <a target="_blank" title="">${item.name}</a> 
        </p>
        <p class="price">
            ￥<span class="okprice">${item.okprice}</span>`
            
            if(item.dis!='-1'){
                str+=`<span class="oksale ">(<em class="dis">${item.dis}</em>折)</span>`
            }
            
            str +=`<span class="market-price">${item["market-price"]}</span> 
        </p>`
        
            if(item["sale-tag"]!==''){
                str+=`<p class="info"><a target="_blank" style="color:#666"><span class="sale-tag">${item["sale-tag"]}</span>${item["tag-text"]}</a></p>`
            }

            str +=`</li>`
    })

    $('.list .itemBox ul').html(str)

    //渲染事件
    $('.list .itemBox ul').on('click','li',function(){
        // console.log($(this).attr('data-id'))
        let data = null
        list.forEach((item,index)=>{
            if(item.id == $(this).attr('data-id')){
                data = list[index]
                return
            }
        })
        // console.log(data)

        localStorage.setItem('itemInfo',JSON.stringify(data))

        window.location.href = '../pages/detail.html'
    })
}


//分页器
function bindPagi(totalPage){
    flag = false

    $('.list .total span').html(totalPage)
    $('.list .right .allpage').html(totalPage)

    $('.pagi').pagination({
        coping: true,
        current:1,
        pageCount: totalPage,//总页数
        showData: 40,//一页多少条数据
        count: 2,//当前选中页码后的页码个数
        homePage: '首页',
        endPage: '末页',
        prevContent: '上一页',
        nextContent: '下一页',
        callback: function(api){
            // console.log(api.getCurrent())
            //设置点击页为当前页
            currPage = api.getCurrent()

            $('.list .right .cur').html(currPage)
            getList(type)

            $(window).scrollTop(625)
        }
    });
    
    
            
    //top的上一页和下一页
    $('.list .right .prev').click(function(){
        if(currPage!==1){
            $('.list-bottom .pagi .prev').trigger('click')
        }
    })

    $('.list .right .next').click(function(){
        if(currPage!==totalPage){
            $('.list-bottom .pagi .next').trigger('click')
        }
    })
}