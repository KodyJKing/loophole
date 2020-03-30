import test from "ava"
import { serialize, deserialize, serialClone } from "./serialze";


test( "serialize", t => {
    class Foo {
        bar = "bar"
        foo = 100
    }

    class Bar {
        baz = "baz"
        qux = true
    }

    let foo = new Foo()
    let bar = new Bar()
    let obj1 = { foo, bar }
    let str = serialize( obj1, 2 )
    console.log( str )

    let obj2 = deserialize( str )
    console.log( obj2 )

    let obj3 = serialClone( obj1 )
    console.log( obj3 )

    t.pass()
} )