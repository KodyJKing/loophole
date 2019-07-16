import { parse } from "./assemblyParser"
import { ArgType } from "./VM";
import Instructions from "./Instructions";

export default function assemble( source: string ) {
    let lines = parse( source ) as any[]
    let result: any[] = []
    let lineNum = 0
    let declarations: { [ name: string ]: number } = {}

    function addInstruction( line ) {
        let instruction = Instructions[ line.instruction ]
        if ( !instruction )
            throw new Error( `Unknown instruction ${line.instruction} at line ${lineNum}.` )
        result.push( instruction.code )

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
                    result.push( argument.name )
                    break
            }
        }

    }

    function createLabel( line ) {
        declarations[ line.name ] = result.length
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

    for ( let i = 0; i < result.length; i++ ) {
        if ( typeof result[ i ] == "string" )
            result[ i ] = declarations[ result[ i ] ]
    }

    return result as number[]
}