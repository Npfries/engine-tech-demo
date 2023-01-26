export class GameLoop {
    private _paused = false;
    private _onTickCallback: Function = null
    private _tickRate: number = 16

    constructor(tickRate: number) {
        this._tickRate = tickRate
    }

    private tick(lastTime: number) {
        const currentTime = Date.now()
        const deltaTime = currentTime - lastTime
        if (!this._paused) this._onTickCallback(deltaTime)
        const callbackDuration = Date.now()
        console.log('GL:LT ', lastTime)
        console.log('GL:CT ', currentTime)
        console.log('GL:DT ', deltaTime)
        setTimeout(() => {
            this.tick(currentTime)
        }, lastTime + this._tickRate - callbackDuration)
    }

    public start() {
        this.tick(Date.now())
    }

    public onTick(cb: Function) {
        this._onTickCallback = cb
    }

    public pause() {
        this._paused = true
    }
    
    public resume() {
        this._paused = false
    }
}