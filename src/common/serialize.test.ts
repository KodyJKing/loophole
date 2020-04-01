import test from "ava"
import { serialize, deserialize, serializeField, serializeClass } from "./serialize"

test( "serialize", t => {
    @serializeClass
    class Foo {
        @serializeField
        bar = "bar"
        @serializeField
        foo = [ 1, 2, 3 ]
    }

    @serializeClass
    class Bar {
        @serializeField
        baz = "baz"
        qux = true
    }

    let foo = new Foo()
    let bar = new Bar()
    let preObject = { foo, bar }
    let str = serialize( preObject )
    let expected = '{"types":["Object","Foo","Array","Bar"],"objects":[{"foo":{"ref":1},"bar":{"ref":3}},{"bar":"bar","foo":{"ref":2}},[1,2,3],{"baz":"baz"}]}'
    t.deepEqual( str, expected )

    let postObject = deserialize( str )
    t.deepEqual( postObject, preObject )

    // Circularity
    let a: any = {}
    let b: any = {}
    a.b = b
    b.a = a
    t.deepEqual( b, deserialize( serialize( b ) ) )
} )