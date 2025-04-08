import resultCats from "./resultCats.js"
import countTime from "./countTime.js"
import changeHTML from "./changeHTML.js"
import makeMeme from "./makeMeme.js"
import setCookie from "./setCookie.js"
alert("このサイトでは音が出ます。cookieを有効にすると自己ベストが見れます。下のボタンを押して猫の画像が変わったら画面をタップしてください。");




const startButton = document.querySelector('.test-main button')
const testContent = document.querySelector('.test-content')
const result = document.querySelector('.result-text')
const testImg = document.querySelector('.test-content img')
const title = document.querySelector('.title')
const randomCatMeme = {
    1: ['images/cool cat.gif', 'sound effects/cool cat sound.mp3'],
    2: ['images/cry cat.gif', 'sound effects/cry cat sound.mp3'],
    3: ['images/oiiaoiia.gif', 'sound effects/oiiaoiia sound.mp3']
}
const randomOpeningCats = {
    1: 'images/looking cat.gif',
    2: 'images/walk bananacat.gif',
    3: 'images/cattime meme.gif',
    4: 'images/apple cat.gif',
    5: 'images/disco cat.gif',
    6: 'images/eating cat.gif',
    7: 'images/pop cat.gif',
    8: 'images/raccoon dance.gif',
    9: 'images/sanba cat.gif',
    10: 'images/walk bananacat.gif'
}
const jonson = ['images/jonson.gif', 'sound effects/vine boom.mp3']
const happyCat = ['images/happyhappyhappy cat.gif', 'sound effects/happyhappyhappy cat sound.mp3']

let current, gameStage, resultTime

gameStage = 0

makeMeme.makeImg(testImg, randomOpeningCats[makeMeme.makeRandomImage(randomOpeningCats)])



// 現在の状態を表す変数　0 = ゲーム開始前 1 = 押せ！が出る前 2 = 押せ！が出た後 3 = 結果発表中
current = 0
console.log(setCookie.getBestTime())

// 自己ベストを表示
if (setCookie.getBestTime() === undefined) {
    changeHTML({1: [result, '']})
} else {
    changeHTML({1: [result, `自己ベスト：${setCookie.getBestTime()}ms`]})
}

// スタートボタンを押したときの処理
startButton.addEventListener('click', () => {
    if (current == 0) {

        // createMeme用のランダムな数字を作成
        const catSelect = makeMeme.makeRandomImage(randomCatMeme)
        const catResult = randomCatMeme[catSelect]


        // 文字を計測中に変更
        changeHTML({1: [title, `測定中🤓： ${gameStage}/3`], 2: [startButton, `測定中🤓： ${gameStage}/3`]})

        // ランダムな時間を生成
        const randomTime = Math.floor(Math.random() * 4000) + 2000; 
        current = 1
        makeMeme.makeImg(testImg, 'images/loading.gif')
    
        // ↑で作った時間後にこの関数を実行
        setTimeout(() => {
            if (current == 3) {
                // お手付きをしたら処理をやめる
            } else if (current == 0){
                // お手付きしたら処理をやめる
            } else {
                current = 2
                changeHTML({1: [result, '押せ！']})
                countTime.startTimer()
                makeMeme.imgAndSound(testImg, catResult[0], catResult[1])
            }

        }, randomTime)
        
    // 結果発表中に押したときの処理    
    } else if (current == 3) {
        // 初期状態に戻す
        // 自己ベストを表示

        // ゲームステージが３で終了するとき
        if (gameStage === 3) {
            if (setCookie.getBestTime() === undefined) {
                changeHTML({1: [title, '自己ベスト更新！']})
                setCookie.setTime(countTime.totalTime)
                makeMeme.imgAndSound(testImg, happyCat[0], happyCat[1])
            } else if (countTime.totalTime < setCookie.getBestTime()) {
                changeHTML({1: [title, '自己ベスト更新！']})
                makeMeme.imgAndSound(testImg, happyCat[0], happyCat[1])
                setCookie.setTime(countTime.totalTime)
            } else {
                changeHTML({1: [title, '反射神経テスト😻']})
                result.textContent = `自己ベスト：${setCookie.getBestTime()}ms`
                
                makeMeme.makeImg(testImg, randomOpeningCats[makeMeme.makeRandomImage(randomOpeningCats)])
            }
            changeHTML({
                1: [startButton, 'テストを始める'],
                2: [result, `自己ベスト： ${setCookie.getBestTime()}ms`]
            })
            countTime.resetTotal()
            current = 0
            gameStage = 0
        // ゲームステージが４でお手つきしたときの
        } else if (gameStage === 4) {
            if (setCookie.getBestTime() === undefined) {
                result.textContent = ''
            } else {
                result.textContent = `自己ベスト：${setCookie.getBestTime()}ms`
            }
            changeHTML({
                1: [startButton, 'テストを始める'],
                2: [title, '反射神経テスト😻']
            })
            makeMeme.makeImg(testImg, randomOpeningCats[makeMeme.makeRandomImage(randomOpeningCats)])
            countTime.resetTotal()
            current = 0
            gameStage = 0

        // それ以外のゲーム中
        } else {
            current = 0
            console.log(resultTime)
            changeHTML ({
                1: [startButton, `次のテストへ ${gameStage}/3`],
                2: [result, `合計スコア： ${countTime.totalTime}ms`]
            })
            makeMeme.makeImg(testImg, resultCats.catReaction(resultTime, title))
            
        }
        
    } 
})

testContent.addEventListener('click', () => {
    if (current == 2) {
        // 時間を測定する
        resultTime = countTime.endTimer(countTime.totalTime).resultTime

        // ゲームステージを上げる
        gameStage++

        // resultを反映
        current = 3
        changeHTML({
            1: [title, `現在のスコア： ${countTime.totalTime}ms`],
            2: [startButton,'次へ'],
            3: [result, `今回のスコア： ${resultTime}ms`]
        })
        

    // お手付きした場合
    } else if (current == 1) {
        current = 3
        gameStage = 4
        countTime.resetTotal()
        changeHTML({
            1: [startButton, 'ごめんなさい😿'],
            2: [result, 'お手付き！'],
            3: [title, 'おい！']
        })
        makeMeme.imgAndSound(testImg, jonson[0], jonson[1])
    }
})