export default {
    catReaction(catTime, html){
        if (catTime < 200) {
                // めっちゃ早かった時
                html.textContent = "早すぎ🙀"
                return 'images/look cat.gif'
            } else if (catTime < 300 && catTime > 200) {
                // 結構早かった時
                html.textContent = "はやいね🐱"
                return 'images/rhythm cat.gif'
            } else if (catTime < 400 && catTime > 300) {
                // まあまあなとき
                html.textContent = "まあまあやね😹"
                return 'images/funny cat.gif'
            } else if (catTime > 400) {
                // 遅かった時
                html.textContent = "遅すぎ…😿"
                return 'images/bananacat cry.gif'
            }
    },

}
