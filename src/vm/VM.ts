export enum Instruction {
    MOV, JT, JF,
    NOT, COMP,
    CMP, GT, LT, GTE, LTE,
    ADD, SUB, MUL, DIV,
    AND, OR,
    PRINT, OUT
}

export enum ArgType {
    MEM_FIXED,
    MEM,
    MEM_OFFSET,
    REGISTER,
    PRIMITIVE
}

function unaryOp( instruction, x ) {
    switch ( instruction ) {
        case Instruction.NOT: return x == 0 ? 1 : 0
        case Instruction.COMP: return ~x
    }
}

function binaryOp( instruction, x, y ) {
    switch ( instruction ) {
        case Instruction.CMP: return x == y ? 1 : 0
        case Instruction.GT: return x > y ? 1 : 0
        case Instruction.LT: return x < y ? 1 : 0
        case Instruction.GTE: return x >= y ? 1 : 0
        case Instruction.LTE: return x <= y ? 1 : 0
        case Instruction.ADD: return x + y
        case Instruction.SUB: return x - y
        case Instruction.MUL: return x * y
        case Instruction.DIV: return x / y
        case Instruction.AND: return x & y
        case Instruction.OR: return x | y
    }
}

export default class VM {
    counter: number = 0
    counters: number[] = []
    program!: number[]
    memory!: number[]
    registers!: number[]
    // callbacks!: (x: number) =>

    static create( program: any[], memory: number, registers: number ) {
        let result = new VM()
        result.program = program
        result.memory = new Array( memory ).fill( 0 )
        result.registers = new Array( registers ).fill( 0 )
        return result
    }

    consume() {
        return this.program[ this.counter++ ]
    }

    getRval() {
        let rvalType = this.consume()
        switch ( rvalType ) {
            case ArgType.MEM_FIXED: {
                let addr = this.consume()
                return this.memory[ addr ]
            }

            case ArgType.MEM_OFFSET: {
                let register = this.consume()
                return this.memory[ this.registers[ register ] ]
            }

            case ArgType.MEM_OFFSET: {
                let register = this.consume()
                let offset = this.consume()
                return this.memory[ this.registers[ register ] + offset ]
            }

            case ArgType.REGISTER: {
                let register = this.consume()
                return this.registers[ register ]
            }

            case ArgType.PRIMITIVE:
                return this.consume()

            default:
                throw new Error( `Unrecognized rval type ${rvalType} at ${this.counter}` )
        }
    }

    setLval( x: number ) {
        let lvalType = this.consume()
        switch ( lvalType ) {
            case ArgType.MEM_FIXED: {
                let addr = this.consume()
                this.memory[ addr ] = x
                break
            }

            case ArgType.MEM: {
                let register = this.consume()
                this.memory[ this.registers[ register ] ] = x
                break
            }

            case ArgType.MEM_OFFSET: {
                let register = this.consume()
                let offset = this.consume()
                this.memory[ this.registers[ register ] + offset ] = x
                break
            }

            case ArgType.REGISTER: {
                let register = this.consume()
                this.registers[ register ] = x
                break
            }

            default:
                throw new Error( `Unrecognized lval type ${lvalType} at ${this.counter}` )
        }
    }

    step(): boolean {
        let instruction = this.consume()
        switch ( instruction ) {
            case Instruction.MOV: {
                this.setLval( this.getRval() )
                break
            }

            case Instruction.JT:
            case Instruction.JF: {
                let condition = this.getRval()
                let addr = this.getRval()
                let expected = instruction == Instruction.JT ? 1 : 0
                if ( condition == expected )
                    this.counter = addr
                break
            }

            case Instruction.NOT:
            case Instruction.COMP: {
                let x = this.getRval()
                this.setLval( unaryOp( instruction, x ) as number )
                break
            }

            case Instruction.CMP:
            case Instruction.GT:
            case Instruction.LT:
            case Instruction.GTE:
            case Instruction.LTE:
            case Instruction.ADD:
            case Instruction.SUB:
            case Instruction.MUL:
            case Instruction.DIV:
            case Instruction.AND:
            case Instruction.OR: {
                let x = this.getRval()
                let y = this.getRval()
                this.setLval( binaryOp( instruction, x, y ) )
                break
            }

            case Instruction.PRINT:
                console.log( this.getRval() )
                break

            // case instruction.OUT:

            default:
                throw new Error( `Unrecognized instruction ${instruction} at ${this.counter}` )
        }

        return this.counter < this.program.length
    }

    run() {
        while ( this.step() ) { }
    }
}