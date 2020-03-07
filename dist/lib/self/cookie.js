function setCookie(key,value,expires){
	//expires 过期时间单位 秒
	if(expires){
		var time = new Date()
		time.setTime(time.getTime()-1000*60*60*8+1000*expires)
		document.cookie = key + '=' + value +';expires ='+time
	}else{
		document.cookie = key + '=' + value
	}
}

function getCookie(key){
	var tmp = document.cookie.split('; ')
	
	for(let i = 0 ; i < tmp.length ; i++){
		if(tmp[i].split('=')[0]===key){
			return tmp[i].split('=')[1]
		}
	}
	return 
}