export default {
    imgAndSound(imghtml, img, sound ) {
        if (sound === undefined){
            this.makeImg(imghtml, img)
        }
        imghtml.src = img

        const audio = new Audio(sound)
        audio.volume = 0.5;
        audio.play()
    },

    makeImg(imghtml, img) {
        imghtml.src = img
    },

    makeSound(sound) {
        const audio = new Audio(sound)
        audio.volume = 0.5;
        audio.play()
    },
    
    makeRandomImage(images){
        return Math.ceil(Math.random() * (Object.keys(images).length))
    }
}