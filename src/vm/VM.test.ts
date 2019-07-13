import test from "ava"
import VM, { Instruction, RefType } from "./VM";

const {
    MOV, CMP, JE,
    ADD, SUB, MUL,
    DIV, PRINT
} = Instruction

const {
    ABSOLUTE,
    RELATIVE,
    REGISTER,
    PRIMITIVE
} = RefType

test( "VM", t => {
    let program = [
        MOV, PRIMITIVE, 100, ABSOLUTE, 0,
        PRINT, ABSOLUTE, 0,
        MOV, PRIMITIVE, Math.PI, ABSOLUTE, 1,
        PRINT, ABSOLUTE, 1,
        SUB, ABSOLUTE, 0, ABSOLUTE, 1, REGISTER, 0,
        PRINT, REGISTER, 0
    ]
    let vm = VM.create( program, 1024, 8 )
    while ( vm.step() ) { }
    t.pass()
} )