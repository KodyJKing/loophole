import test from "ava"
import VM, { Instruction, ArgType } from "./VM";
import assemble from "./assemble";

const {
    MOV, JT, JF,
    CMP, GT, LT, GTE, LTE,
    ADD, SUB, MUL, DIV,
    AND, OR,
    PRINT
} = Instruction

const {
    MEM_FIXED,
    MEM,
    MEM_OFFSET,
    REGISTER,
    PRIMITIVE
} = ArgType

// test( "VM_0", t => {
//     let program = [
//         MOV, PRIMITIVE, 10, REGISTER, 0,
//         PRINT, REGISTER, 0,
//         SUB, REGISTER, 0, PRIMITIVE, 1, REGISTER, 0,
//         CMP, REGISTER, 0, PRIMITIVE, 0, REGISTER, 1,
//         JF, REGISTER, 1, PRIMITIVE, 5
//     ]
//     let vm = VM.create( program, 1024, 8 )
//     console.log()
//     vm.run()
//     t.pass()
// } )

// test( "VM_1", t => {
//     let program = [
//         MOV, PRIMITIVE, 10, REGISTER, 0,
//         MOV, PRIMITIVE, Math.PI, MEM_OFFSET, 0, 1,
//         PRINT, MEM_FIXED, 11
//     ]
//     let vm = VM.create( program, 1024, 8 )
//     console.log()
//     vm.run()
//     t.pass()
// } )

test( "Assembler", t => {
    let source = `
        MOV 5 R0
        loop:
        PRINT R0
        SUB R0 1 R0
        LTE R0 0 R1
        JF R1 loop
    `
    let program = assemble( source )
    let vm = VM.create( program, 1024, 8 )
    console.log()
    vm.run()
    t.pass()
} )