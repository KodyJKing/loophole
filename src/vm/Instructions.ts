import VM, { Registers, inputHandler, outputHandler } from "./VM"

type Instruction = ( ( vm: VM, input?: inputHandler, output?: outputHandler ) => void ) & { code: number }

function unary( vm: VM, ev ) {
    vm.setOperand( ev( vm.getOperand() ) )
}

function binary( vm: VM, ev ) {
    vm.setOperand( ev( vm.getOperand(), vm.getOperand() ) )
}

function conditionalJump( vm: VM, expected: number ) {
    let condition = vm.getOperand()
    let address = vm.getOperand()
    if ( condition == expected )
        vm.counter = address
}

const Instructions = {
    nop( vm: VM ) { },
    mov( vm: VM ) { vm.setOperand( vm.getOperand() ) },
    jmp( vm: VM ) { vm.counter = vm.getOperand() },
    jt( vm: VM ) { conditionalJump( vm, 1 ) },
    jf( vm: VM ) { conditionalJump( vm, 0 ) },
    loop( vm: VM ) {
        let arg0Address = vm.counter
        let value = vm.getOperand() - 1
        vm.counter = arg0Address
        vm.setOperand( value )
        let jumpAddress = vm.getOperand()
        if ( value != 0 )
            vm.counter = jumpAddress
    },
    push( vm: VM ) { vm.push( vm.getOperand() ) },
    pop( vm: VM ) { vm.setOperand( vm.pop() ) },
    call( vm: VM ) {
        let jumpAddress = vm.getOperand()
        vm.push( vm.counter )
        vm.push( vm.registers[ Registers.stb ] )
        vm.registers[ Registers.stb ] = vm.registers[ Registers.stp ] - 3
        vm.counter = jumpAddress
    },
    end( vm: VM ) {
        vm.registers[ Registers.stb ] = vm.pop()
        vm.counter = vm.pop()
    },
    ret( vm: VM ) {
        vm.registers[ Registers.stb ] = vm.pop()
        let cleanup = vm.getOperand()
        vm.counter = vm.pop()
        for ( let i = 0; i < cleanup; i++ )
            vm.pop()
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
    out( vm: VM, input?: inputHandler, output?: outputHandler ) {
        let port = vm.getOperand()
        let message = vm.getOperand()
        if ( output )
            output( port, message )
    },
    in( vm: VM, input?: inputHandler, output?: outputHandler ) {
        let port = vm.getOperand()
        let result = 0
        if ( input )
            result = input( port )
        vm.setOperand( result )
    },
    print( vm: VM ) { console.log( vm.getOperand() ) },
    printc( vm: VM ) { console.log( String.fromCharCode( vm.getOperand() ) ) },
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