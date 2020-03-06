function timer(obj, starttime, nowtime, endtime) {
    // console.log(obj, starttime, nowtime, endtime)
    clearInterval(obj.timer1)
    clearInterval(obj.timer2)
    var t = 9

    obj.timer1 = setInterval(function() {
        // console.log(this)
        let time1 = new Date()
        let time2 = new Date(endtime)

        // 总倒计时时间
        let cha = time2.getTime() - time1.getTime()
        cha = parseInt(cha / 1000)
        let day = parseInt(cha / 60 / 60 / 24)
        let hour = parseInt(cha / 60 / 60 % 24)
        hour = hour > 9 ? hour : `0${hour}`
        let minute = parseInt(cha / 60 % 60)
        minute = minute > 9 ? minute : `0${minute}`
        let second = cha % 60
        second = second > 9 ? second : ('0' + second)
        $(obj).html(`<i class="day">${day}</i>天<i class="hour">${hour}</i>时<i class="minute">${minute}</i>分<i class="second">${second}</i>秒 <i class="_second">1</i>`)
    }, 1000)
    obj.timer2 = setInterval(function() {
        if (t === -1) {
            t = 9
        }
        $(obj).children('._second').html(t)
        t--
    }, 100)
}