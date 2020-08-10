import test from "ava"
import Interpreter from "loophole-lang/lib/interpreter/Interpreter"
import clone from "../common/clone"

test( "main", t => {

    // let source = 'for (i = 0; i < 10; i = i + 1) print(i + " bottles of beer on the wall")'
    // let itp = new Interpreter( source )
    // itp.setNatives( { print: x => console.log( x ) } )
    // itp.run( 150 )
    // console.log( "!!! Replacing runtime with clone !!!" )
    // itp = clone( itp )
    // itp.setNatives( { print: x => console.log( x + "!" ) } )
    // itp.run( 150 )

    t.pass()
} )