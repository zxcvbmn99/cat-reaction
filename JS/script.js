const startButton = document.querySelector('.test-main button')
const testContent = document.querySelector('.test-content')
const result = document.querySelector('.result-text')
const testImg = document.querySelector('.test-content img')
const title = document.querySelector('.title')
const randomCatMeme = {
    1: ['images/cool cat.gif', 'sound effects/cool cat sound.mp3'],
    2: ['images/cry cat.gif', 'sound effects/cry cat sound.mp3'],
    3: ['images/jonson.gif', 'sound effects/vine boom.mp3']
}
const jonson = randomCatMeme[3]
let startTime, endTime, current, cookie, best, coo, catTime

alert("このサイトでは音が出ます。cookieを有効にすると自己ベストが見れます。下のボタンを押して猫の画像が変わったら画面をタップしてください。");

// 画像と音を出す関数
creatMeme = function(img, sound) {
    testImg.src = img

    const audio = new Audio(sound)
    audio.volume = 0.5;
    audio.play()
}

// 結果によって猫を出す
resultCats = function(time) {
    if (time < 200) {
        // めっちゃ早かった時
        title.textContent = "早すぎ🙀"
    } else if (time < 300 && time > 200) {
        // 結構早かった時
        title.textContent = "はやいね🐱"

    } else if (time < 400 && time > 300) {
        // まあまあなとき
        title.textContent = "まあまあやね😹"

    } else if (time > 400) {
        // 遅かった時
        title.textContent = "遅すぎ…😿"
    }
}

// cookie取得
coo = document.cookie
cookie = coo.split(';')
best = cookie[0].split('=')

// 現在の状態を表す変数　0 = ゲーム開始前 1 = 押せ！が出る前 2 = 押せ！が出た後 3 = 結果発表中
current = 0

// 自己ベストを表示
if (coo === '') {
    result.textContent = ''
} else {
    result.textContent = `自己ベスト：${best[1]}ms`
}

// スタートボタンを押したときの処理
startButton.addEventListener('click', () => {
    if (current == 0) {
        // createMeme用のランダムな数字を作成
        const catSelect = Math.ceil(Math.random() * (Object.keys(randomCatMeme).length))
        const catResult = randomCatMeme[catSelect]


        // 文字を計測中に変更
        title.textContent = '計測中🤓'
        startButton.textContent = '計測中🤓'
        // ランダムな時間を生成
        const randomTime = Math.floor(Math.random() * 5000) + 2000; 

        current = 1
    
        // ↑で作った時間後にこの関数を実行
        start = setTimeout(() => {
            if (current == 3) {
                // お手付きをしたら処理をやめる
            } else if (current == 0){
                // お手付きしたら処理をやめる
            } else {
                current = 2
                result.textContent = '押せ！'
                startTime = Date.now()
                creatMeme(catResult[0], catResult[1])
            }

        }, randomTime)
        
    // 結果発表中に押したときの処理    
    } else if (current == 3) {
        // 初期状態に戻す
        // 自己ベストを表示
        if (coo === '') {
            result.textContent = ''
        } else {
            result.textContent = `自己ベスト：${best[1]}ms`
        }
        startButton.textContent = 'テストを始める'
        testImg.src = 'images/looking cat.gif'
        resultCats(catTime)
        current = 0
    } 
})

testContent.addEventListener('click', () => {
    if (current == 2) {
        // 時間を測定する
        endTime = Date.now()
        const resultTime = endTime - startTime
        console.log(resultTime)


        // スコアが自己ベストより高かったらcookieに保存
        if (coo === '') {
            console.log('クッキーが空！')
            coo = document.cookie = "time=" + resultTime + ";expires=" + new Date(Date.now() + 86400000).toUTCString() + ";path=/";
            cookie = coo.split(';')
            best = cookie[0].split('=')

            console.log(best[1])
        } else if (Number(best[1]) > resultTime) {
            console.log('自己ベスト更新！')
            coo = document.cookie = "time=" + resultTime + ";expires=" + new Date(Date.now() + 86400000).toUTCString() + ";path=/";
            cookie = coo.split(';')
            best = cookie[0].split('=')

            console.log(best[1])
        }

        // resultを反映
        current = 3
        result.textContent = `結果：${resultTime}ms`;
        startButton.textContent = '終了'
        catTime = resultTime
        

    // お手付きした場合
    } else if (current == 1) {
        current = 3
        startButton.textContent = 'ごめんなさい😿'
        result.textContent = 'お手付き！'
        title.textContent = 'おい！'
        creatMeme(jonson[0], jonson[1])
    }
})


    



