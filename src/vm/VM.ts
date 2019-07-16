import { getInstruction } from "./instructions";

export enum ArgType {
    MEM_FIXED,
    MEM,
    MEM_OFFSET,
    REGISTER,
    PRIMITIVE
}

type Peripheral = { on: ( port: number, message: number ) => void, in: ( port: number ) => number }

export default class VM {
    counter!: number
    program!: number[]
    memory!: number[]
    registers!: number[]
    peripheral!: Peripheral | null

    static create( program: any[], memory: number, registers: number ) {
        let result = new VM()
        result.counter = 0
        result.program = program
        result.memory = new Array( memory ).fill( 0 )
        result.registers = new Array( registers ).fill( 0 )
        result.peripheral = null
        return result
    }

    consume() {
        return this.program[ this.counter++ ]
    }

    getArg() {
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

    setArg( x: number ) {
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

    step() {
        let instructionCode = this.consume()
        let instruction = getInstruction( instructionCode )
        if ( instruction )
            instruction( this )
        else
            throw new Error( `Unknown instruction code ${instructionCode} at ${this.counter - 1}` )
    }

    running(): boolean {
        return this.counter < this.program.length
    }

    run() {
        while ( this.running() ) { this.step() }
    }

    addPeripheral( peripheral: Peripheral ) {
        this.peripheral = peripheral
    }
}