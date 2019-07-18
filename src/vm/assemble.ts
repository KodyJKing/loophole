import { parse } from "./assemblyParser"
import { ArgType } from "./VM";
import Instructions from "./Instructions";

export default function assemble( source: string ) {
    let lines = parse( source ) as any[]
    let result: any[] = []
    let lineNum = 0
    let declarations: { [ name: string ]: number } = {}

    // console.log( JSON.stringify( lines, null, 2 ) )

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

                case "DefenitionRef":
                    result.push( ArgType.PRIMITIVE )
                    result.push( argument.name )
                    break

                case "LineRef":
                    let offsetLimeNum = argument.offset ? lineNum + argument.offset : lineNum
                    result.push( ArgType.PRIMITIVE )
                    result.push( "%LINE" + offsetLimeNum )
            }
        }

    }

    for ( let line of lines ) {
        declarations[ "%LINE" + lineNum ] = result.length
        switch ( line.type ) {
            case "InstructionLine":
                addInstruction( line )
                break
            case "LabelLine":
                declarations[ line.name ] = result.length
                break
            case "DefenitionLine":
                declarations[ line.name ] = line.value.value
        }
        lineNum++
    }

    // TODO: Overhaul reference replacement.
    // Build a list of references in the first pass.
    // Then go back and replace them.
    for ( let i = 0; i < result.length; i++ ) {
        if ( typeof result[ i ] == "string" )
            result[ i ] = declarations[ result[ i ] ]
    }

    // console.log( declarations )

    return result as number[]
}