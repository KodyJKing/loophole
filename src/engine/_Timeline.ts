// function clone(object: any) {
//     return JSON.parse(JSON.stringify(object))
// }

// function isReferenceType(object: any) {
//     return typeof object == "object" && object != null
// }

// function apply(patch: any, state) {
//     for (let key in patch) {
//         let patchValue = patch[key]
//         let stateValue = state[key]
//         if (isReferenceType(patchValue) && isReferenceType(stateValue))
//             apply(patchValue, stateValue)
//         else
//             state[key] = patchValue
//     }
// }

// function inversePatch(patch: any, state) {
//     let result = {}
//     for (let key in patch) {
//         let patchValue = patch[key]
//         let stateValue = state[key]
//         if (isReferenceType(patchValue) && isReferenceType(stateValue))
//             result[key] = inversePatch(patchValue, stateValue)
//         else
//             result[key] = state[key]
//     }
//     return result
// }

// export class Timeline {
//     initialState: any
//     state: any
//     patches: any[]
//     inversePatches: any[]

//     constructor(state = {}) {
//         this.initialState = clone(state)
//         this.state = state
//         this.patches = []
//         this.inversePatches = []
//     }

//     apply(patch: any) {
//         this.patches.push(patch)
//         this.inversePatches.push(inversePatch(patch, this.state))
//         apply(patch, this.state)
//     }

//     undo() {
//         this.patches.pop()
//     }
// }