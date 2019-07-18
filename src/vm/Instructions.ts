import VM, { Registers } from "./VM"

type Instruction = ( ( vm: VM ) => void ) & { code: number }

function unary( vm: VM, ev ) {
    vm.setArg( ev( vm.getArg() ) )
}

function binary( vm: VM, ev ) {
    vm.setArg( ev( vm.getArg(), vm.getArg() ) )
}

function conditionalJump( vm: VM, expected: number ) {
    let condition = vm.getArg()
    let address = vm.getArg()
    if ( condition == expected )
        vm.counter = address
}

const Instructions = {
    nop( vm: VM ) { },
    mov( vm: VM ) { vm.setArg( vm.getArg() ) },
    jmp( vm: VM ) { vm.counter = vm.getArg() },
    jt( vm: VM ) { conditionalJump( vm, 1 ) },
    jf( vm: VM ) { conditionalJump( vm, 0 ) },
    push( vm: VM ) { vm.push( vm.getArg() ) },
    pop( vm: VM ) { vm.setArg( vm.pop() ) },
    call( vm: VM ) {
        let jumpAddress = vm.getArg()
        vm.push( vm.counter )
        vm.counter = jumpAddress
    },
    end( vm: VM ) { vm.counter = vm.pop() },
    ret( vm: VM ) {
        let result = vm.getArg()
        vm.counter = vm.pop()
        vm.registers[ Registers.res ] = result
    },
    not( vm: VM ) { unary( vm, x => x == 0 ? 1 : 0 ) },
    comp( vm: VM ) { unary( vm, x => ~x ) },
    eq( vm: VM ) { binary( vm, ( x, y ) => ( x == y ) ? 1 : 0 ) },
    gt( vm: VM ) { binary( vm, ( x, y ) => ( x > y ) ? 1 : 0 ) },
    lt( vm: VM ) { binary( vm, ( x, y ) => ( x < y ) ? 1 : 0 ) },
    gte( vm: VM ) { binary( vm, ( x, y ) => ( x >= y ) ? 1 : 0 ) },
    lte( vm: VM ) { binary( vm, ( x, y ) => ( x <= y ) ? 1 : 0 ) },
    add( vm: VM ) { binary( vm, ( x, y ) => x + y ) },
    sub( vm: VM ) { binary( vm, ( x, y ) => x - y ) },
    mul( vm: VM ) { binary( vm, ( x, y ) => x * y ) },
    div( vm: VM ) { binary( vm, ( x, y ) => x / y ) },
    and( vm: VM ) { binary( vm, ( x, y ) => x & y ) },
    or( vm: VM ) { binary( vm, ( x, y ) => x | y ) },
    out( vm: VM ) {
        let port = vm.getArg()
        let message = vm.getArg()
        if ( vm.io )
            vm.io.on( port, message )
    },
    in( vm: VM ) {
        let port = vm.getArg()
        let result = 0
        if ( vm.io )
            result = vm.io.in( port )
        vm.setArg( result )
    },
    print( vm: VM ) { console.log( vm.getArg() ) },
    debug( vm: VM ) {
        console.log( vm.registers )
        // console.log( vm.memory )
    }
}

let instructions: Instruction[] = []
for ( let name in Instructions ) {
    let func = Instructions[ name ]
    let code = instructions.length
    func.code = code
    instructions[ code ] = func
}

export default ( Instructions as unknown ) as { [ name: string ]: Instruction }
export function getInstruction( code: number ) { return instructions[ code ] }