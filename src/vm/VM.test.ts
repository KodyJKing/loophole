import test from "ava"
import VM from "./VM"

function line() {
    console.log( "\n============" )
}

test( "call, push, pop, end, instructions", t => {
    let source = `
        jmp start

        countDown:
            push ix
            mov [stb] ix
                print ix
                loop ix $-1
            pop ix
        ret 1

        start:
            push 5
            call countDown
    `

    line()

    let vm = VM.create( source, 1024 )
    vm.run()

    t.pass()
} )

test( "calculate pi", t => {
    let source = `
        jmp start

        sqrt:
            push ix
            push ax
            push bx

            mov [stb] ax

            mov 10 ix
            mov 1 bx
                add 1 hx hx    // Track total number of newton iterations.
                div ax bx res  // ax / bx
                add res bx res // bx + ( ax / bx )
                div res 2 bx   // bx = ( bx + (ax / bx) ) / 2
            loop ix $-4

            mov bx res

            pop bx
            pop ax
            pop ix
        ret 1

        circleHeight:
            push ax

            mov [stb] ax

            mul ax ax ax
            sub 1 ax ax

            push ax
            call sqrt

            pop ax
        ret 1

        quarterCircleArea:
            push ix
            push ax
            push bx

            mov 0 bx
            mov 100000 ix
                mul ix 0.00001 ax

                push ax
                call circleHeight

                mul res 0.00001 res
                add res bx bx
            loop ix $-5

            mov bx res

            pop bx
            pop ax
            pop ix
        end
        
        start:
            call quarterCircleArea
            mul res 4 res
            print res
            print hx // Print total number of newton iterations.
        exit:
    `

    line()

    let vm = VM.create( source, 1024 )
    vm.run()

    t.pass()
} )