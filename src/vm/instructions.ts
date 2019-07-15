import VM from "./VM";

let codeToInstruction: Instruction[] = []
let nameToInstruction = {}
let codeCounter = 0

type Instruction = ( vm: VM ) => void & { code: number }

function register( func ) {
    let code = codeCounter++
    func.code = code
    codeToInstruction[ code ] = func
    nameToInstruction[ func.name ] = func
}

export function instructionByCode( code: number ) { return codeToInstruction[ code ] as Instruction }
export function instructionByName( name: string ) { return nameToInstruction[ name ] as Instruction }

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

/*
    MOV, JT, JF,
    NOT, COMP,
    CMP, GT, LT, GTE, LTE,
    ADD, SUB, MUL, DIV,
    AND, OR,
    PRINT, OUT
*/

const Instructions = {
    MOV( vm: VM ) { vm.setRef( vm.getRef() ) },
    JT( vm: VM ) { conditionalJump( vm, 1 ) },
    JF( vm: VM ) { conditionalJump( vm, 0 ) },
    NOT( vm: VM ) { unary( vm, x => x == 0 ? 1 : 0 ) },
    COMP( vm: VM ) { unary( vm, x => ~x ) },
    SUB( vm: VM ) { binary( vm, ( x, y ) => x - y ) },
    EQ( vm: VM ) { binary( vm, ( x, y ) => ( x == y ) ? 1 : 0 ) },
    PRINT( vm: VM ) { console.log( vm.getRef() ) },
}

for ( let name in Instructions )
    register( Instructions[ name ] )