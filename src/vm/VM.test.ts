import test from "ava"
import VM from "./VM"
import assemble from "./assemble"

test( "Assembler", t => {
    let source = `
        %DEF foo 5
        MOV foo R0
        PRINT R0
        SUB R0 1 R0
        EQ R0 0 R1
        JF R1 $-3
    `
    let program = assemble( source )
    let vm = VM.create( program, 1024, 8 )
    vm.run()
    t.pass()
} )