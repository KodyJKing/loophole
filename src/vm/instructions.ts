import VM from "./VM"

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
    MOV( vm: VM ) { vm.setArg( vm.getArg() ) },
    JT( vm: VM ) { conditionalJump( vm, 1 ) },
    JF( vm: VM ) { conditionalJump( vm, 0 ) },
    NOT( vm: VM ) { unary( vm, x => x == 0 ? 1 : 0 ) },
    COMP( vm: VM ) { unary( vm, x => ~x ) },
    EQ( vm: VM ) { binary( vm, ( x, y ) => ( x == y ) ? 1 : 0 ) },
    GT( vm: VM ) { binary( vm, ( x, y ) => ( x > y ) ? 1 : 0 ) },
    LT( vm: VM ) { binary( vm, ( x, y ) => ( x < y ) ? 1 : 0 ) },
    GTE( vm: VM ) { binary( vm, ( x, y ) => ( x >= y ) ? 1 : 0 ) },
    LTE( vm: VM ) { binary( vm, ( x, y ) => ( x <= y ) ? 1 : 0 ) },
    ADD( vm: VM ) { binary( vm, ( x, y ) => x + y ) },
    SUB( vm: VM ) { binary( vm, ( x, y ) => x - y ) },
    MUL( vm: VM ) { binary( vm, ( x, y ) => x * y ) },
    DIV( vm: VM ) { binary( vm, ( x, y ) => x / y ) },
    AND( vm: VM ) { binary( vm, ( x, y ) => x & y ) },
    OR( vm: VM ) { binary( vm, ( x, y ) => x | y ) },
    PRINT( vm: VM ) { console.log( vm.getArg() ) },
    OUT( vm: VM ) {
        let port = vm.getArg()
        let message = vm.getArg()
        if ( vm.io )
            vm.io.on( port, message )
    },
    IN( vm: VM ) {
        let port = vm.getArg()
        let result = 0
        if ( vm.io )
            result = vm.io.in( port )
        vm.setArg( result )
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