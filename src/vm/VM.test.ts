import test from "ava"
import VM from "./VM"

function line() {
    console.log( "\n============" )
}

test( "assembler", t => {
    let source = `
        call func
        print res

        #def foo 5
        mov foo ax
            print ax
            sub ax 1 ax
            eq ax 0 bx
        jf bx $-3

        jmp exit

        func:
            push ax
            push bx
            mov -5 ax
            print ax
            add ax 1 ax
            eq ax 0 bx
            jf bx $-3
            pop bx
            pop ax
            ret 3.14159
        exit:
    `

    line()

    let vm = VM.create( source, 1024 )
    for ( let i = 0; i < 100; i++ )
        vm.step()

    t.pass()
} )

test( "call, push, pop, end, instructions", t => {
    let source = `
        jmp start

        countDown:
            pop cx

            pop ax
                print ax
                sub ax 1 ax
                eq ax 0 bx
                jf bx $-3
                
            push cx
        end

        start:
            push 5
            call countDown
    `

    line()

    let vm = VM.create( source, 1024 )
    vm.run()

    t.pass()
} )