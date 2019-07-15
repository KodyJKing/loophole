import { parse } from "./assemblyParser"
import { ArgType } from "./VM";
import { instructionByName } from "./instructions";

export default function assemble( source: string ) {
    let lines = parse( source ) as any[]
    // console.log( JSON.stringify( lines, null, 2 ) )
    let result: number[] = []
    let lineNum = 0
    let labels: { [ name: string ]: number } = {}

    function addInstruction( line ) {
        let instruction = instructionByName( line.instruction )
        if ( !instruction )
            throw new Error( `Unknown instruction ${line.instruction} at line ${lineNum}.` )
        result.push( ( instruction as any ).code )

        for ( let argument of line.arguments ) {
            switch ( argument.type ) {
                case "MemRef": {
                    let address = argument.address
                    switch ( address.type ) {
                        case "FixedAddress":
                            result.push( ArgType.MEM_FIXED )
                            result.push( address.offset )
                            break

                        case "DynamicAddress":
                            if ( argument.offset == null ) {
                                result.push( ArgType.MEM )
                                result.push( address.register.id )
                            } else {
                                result.push( ArgType.MEM_OFFSET )
                                result.push( address.register.id )
                                result.push( address.offset )
                            }
                    }
                    break
                }

                case "RegisterRef":
                    result.push( ArgType.REGISTER )
                    result.push( argument.id )
                    break

                case "Primitive":
                    result.push( ArgType.PRIMITIVE )
                    result.push( argument.value )
                    break

                case "LabelRef":
                    result.push( ArgType.PRIMITIVE )
                    result.push( labels[ argument.name ] )
                    break
            }
        }

    }

    function createLabel( line ) {
        labels[ line.name ] = result.length
    }

    for ( let line of lines ) {
        switch ( line.type ) {
            case "InstructionLine":
                addInstruction( line )
                break
            case "LabelLine":
                createLabel( line )
                break
        }
        lineNum++
    }

    return result
}