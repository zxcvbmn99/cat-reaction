export default function(html) {
    for (let key in html) {
        const element = html[key][0]
        const content = html[key][1]
        console.log(`${html[key][0]} どうなんだ！？`)

        element.textContent = content
    }
}
