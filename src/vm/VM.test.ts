import test from "ava"
import VM, { ArgType } from "./VM";
import assemble from "./assemble";

test( "Assembler", t => {
    let source = `
        MOV 5 R0
        loop:
        OUT 0 R0
        SUB R0 1 R0
        EQ R0 0 R1
        JF R1 loop
    `
    let program = assemble( source )
    let vm = VM.create( program, 1024, 8 )
    vm.listen( 0, x => console.log( x ) )
    vm.run()
    t.pass()
} )