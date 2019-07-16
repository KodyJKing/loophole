import VM from "./VM"

type Instruction = ( ( vm: VM ) => void ) & { code: number }

function unary( vm: VM, ev ) {
    vm.setRef( ev( vm.getRef() ) )
}

function binary( vm: VM, ev ) {
    vm.setRef( ev( vm.getRef(), vm.getRef() ) )
}

function conditionalJump( vm: VM, expected: number ) {
    let condition = vm.getRef()
    let address = vm.getRef()
    if ( condition == expected )
        vm.counter = address
}

const Instructions = {
    MOV( vm: VM ) { vm.setRef( vm.getRef() ) },
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
    PRINT( vm: VM ) { console.log( vm.getRef() ) },
    OUT( vm: VM ) {
        let listener = vm.listeners[ vm.getRef() ]
        if ( listener ) {
            let callback = listener.callback.bind( listener.obj )
            callback( vm.getRef() )
        }
    }
}

let instructions: Instruction[] = []
for ( let name in Instructions ) {
    let func = Instructions[ name ]
    let code = instructions.length
    func.code = code
    instructions[ code ] = func
}

export function getInstruction( code: number ) { return instructions[ code ] as Instruction }
export default ( Instructions as unknown ) as { [ name: string ]: Instruction }