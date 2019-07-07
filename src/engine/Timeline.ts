function clone(object: any) {
    return JSON.parse(JSON.stringify(object))
}

function isValueType(object: any) {
    return typeof object != "object" || object === null
}

function cloneDirty(cur: any, prev: any) {
    if (isValueType(cur))
        return cur

    if (cur.$dirty === false)
        return prev

    let result = {}
    for (let key in cur) {
        let curVal = cur[key]
        let prevVal = prev[key]
        result[key] = cloneDirty(curVal, prevVal)
    }
    return result
}

function deepEqual(a: any, b: any) {
    JSON.stringify(a) == JSON.stringify(b)
}

export class Timeline {
    time = 0
    snapshotInterval = 100
    state: any
    snapshots: any[]
    update: (any) => void = () => {}

    constructor(state = {}) {
        state = state
        this.snapshots = [clone(state)]
    }

    step() {
        this.time++
        this.update(this.state)
        if (this.time % this.snapshotInterval == 0)
            this.snapshot()
    }

    getState(time = 0) {
        let snapshotIndex = Math.floor(time / this.snapshotInterval)
        let remainingTime = time - snapshotIndex * this.snapshotInterval
        let snapshot = this.snapshots[snapshotIndex]
        for (let i = 0; i < remainingTime; i++)
            this.update(snapshot)
    }

    snapshot() {
        let prev = this.snapshots[this.snapshots.length - 1]
        this.snapshots.push(cloneDirty(this.state, prev))
    }
}