$('.right').click(function() {
    $(this)
        .addClass('active')
        .siblings()
        .removeClass('active')

    $('.login_code')
        .addClass('show')
        .siblings('.login_account')
        .removeClass('show')
})

$('.left').click(function() {
    $(this)
        .addClass('active')
        .siblings()
        .removeClass('active')

    $('.login_account')
        .addClass('show')
        .siblings('.login_code')
        .removeClass('show')
})

$(".login_account button").click(function() {
    $('.login_msg').empty()
    $('.username_error').empty()
    $('.password_error').empty()
    if (!$("#username")[0].value) {
        $('.username_error')
            .html(`<i></i><span>请填写邮箱/已验证手机/用户名</span>`)
        return
    }
    if (!$("#password")[0].value) {
        $('.password_error')
            .html(`<i></i><span>请填写密码</span>`)
        return
    }

    postSend('/login', function(res) {
        console.log(res)
        if (JSON.parse(res).code === 1) {
            console.log('登录成功')
        } else {
            $('.login_msg')
                .html(`<i></i><span>用户密码错误</span>`)
        }
    }, `username=${$("#username")[0].value}&password=${$("#password")[0].value}`)
})