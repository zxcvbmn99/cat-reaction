export default {

    getBestTime() {
        const cookie = document.cookie.split(';')  
        return cookie[0].split('=')[1]
    },

    // cookieを設定して設定した値を返す
    setTime(time) {
        const cookies = document.cookie = "time=" + time + ";expires=" + new Date(Date.now() + 86400000).toUTCString() + ";path=/";
        const cookie = cookies.split(';')
        console.log(cookie[0].split('='))

        return cookie[0].split('=')[1]
    }
}