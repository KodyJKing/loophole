export enum Instruction {
    MOV, CMP, JE,
    ADD, SUB, MUL,
    DIV, PRINT
}

export enum RefType {
    ABSOLUTE,
    RELATIVE,
    REGISTER,
    PRIMITIVE
}

function binaryOp( instruction, x, y ) {
    switch ( instruction ) {
        case Instruction.ADD: return x + y
        case Instruction.SUB: return x - y
        case Instruction.MUL: return x * y
        case Instruction.DIV: return x / y
    }
}

export default class VM {
    counter: number = 0
    counters: number[] = []
    program!: number[]
    memory!: number[]
    registers!: number[]

    static create( program: any[], memory: number, registers: number ) {
        let result = new VM()
        result.program = program
        result.memory = new Array( memory )
        result.registers = new Array( registers )
        return result
    }

    consume() {
        return this.program[ this.counter++ ]
    }

    pushCounter() {
        this.counters.push( this.counter )
    }

    popCounter() {
        let popped = this.counters.pop()
        if ( popped )
            this.counter = popped
    }

    getRval() {
        let rvalType = this.consume()
        switch ( rvalType ) {
            case RefType.ABSOLUTE: {
                let addr = this.consume()
                return this.memory[ addr ]
            }

            case RefType.RELATIVE: {
                let register = this.consume()
                let offset = this.consume()
                return this.memory[ this.registers[ register ] + offset ]
            }

            case RefType.REGISTER: {
                let register = this.consume()
                return this.registers[ register ]
            }

            case RefType.PRIMITIVE: {
                return this.consume()
            }

            default:
                throw new Error( `Unrecognized rval type ${rvalType} at ${this.counter}` )
        }
    }

    setLval( x: number ) {
        let lvalType = this.consume()
        switch ( lvalType ) {
            case RefType.ABSOLUTE: {
                let addr = this.consume()
                this.memory[ addr ] = x
                break
            }

            case RefType.RELATIVE: {
                let register = this.consume()
                let offset = this.consume()
                this.memory[ this.registers[ register ] + offset ] = x
                break
            }

            case RefType.REGISTER: {
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

            case Instruction.CMP: { }
            case Instruction.ADD:
            case Instruction.SUB:
            case Instruction.MUL:
            case Instruction.DIV: {
                let lval = this.getRval()
                let rval = this.getRval()
                this.setLval( binaryOp( instruction, lval, rval ) )
                break
            }

            case Instruction.PRINT: {
                console.log( this.getRval() )
                break
            }

            case undefined: {
                console.log( "Program exited normally." )
                return false
            }

            default:
                throw new Error( `Unrecognized instruction ${instruction} at ${this.counter}` )
        }
        return true
    }
}