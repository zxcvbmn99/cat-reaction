export default {
    time: undefined,

    totalTime: undefined,

    startTimer() {
        this.time = 0
        this.time = Date.now()
    },

    endTimer(times) {
        this.time = Date.now() - this.time
        if (times === undefined) {
            this.totalTime = this.time
        } else {
            this.totalTime = times + this.time 
        }
        return {
            totalTime: this.totalTime,
            resultTime: this.time
        };
    },

    resetTotal() {
        this.totalTime = 0
    }
}