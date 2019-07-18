{
	const Registers = require("./VM").Registers

	const registerNames = Object.keys( Registers ).filter( key => Number.isNaN( parseInt( key, 10 ) ) )

	function isValidRegister(name) {
		return Registers[name] !== undefined
	}
}

Lines
	= __ head: Line tail:  ( EOL v: Line { return v } )* __ { return [head].concat(tail) }

Line
	= LabelLine / InstructionLine / DefenitionLine

		LabelLine
			= _ name: Identifier ":" _ { return { type: "LabelLine", name } }

		InstructionLine
			= _ instruction: Identifier _ args: Arguments _ { return { type: "InstructionLine",  instruction, arguments: args }  }

		DefenitionLine
			= _ "#def" _ name: Identifier _ value: Primitive _ { return { type: "DefenitionLine", name, value } }

Arguments
	= head: Argument? tail: ( _ v: Argument { return v } )* { return head ? [head].concat(tail) : [] }
    
		Argument
			= RegisterRef / MemRef / Primitive / DefenitionRef / LineRef
    
				MemRef
					= "[" _ address: (DynamicAddress / FixedAddress) _ "]" { return { type: "MemRef", address } }

						FixedAddress
							= offset: PositiveInteger { return { type: "FixedAddress", offset } }

						DynamicAddress
							= register: RegisterRef _ offset: Offset? 
								{ return { type: "DynamicAddress", register, offset } }
					
				RegisterRef
					= id: (NumberedRegisterRef / NamedRegisterRef) { return { type: "RegisterRef", id } }

						NumberedRegisterRef
							= "R" id: Integer { return id }

						NamedRegisterRef
							= name: Identifier & { return isValidRegister(name) } { return Registers[name] }

				Primitive
					= value: Number { return { type: "Primitive", value } } 

				DefenitionRef
					= name: Identifier { return { type: "DefenitionRef", name } }

				 LineRef 
					= "$" offset: Offset? { return { type: "LineRef", offset } }


Offset
	= op: ( "+" / "-" ) v: PositiveInteger { return op == "+" ? v : -v }


Identifier
	= text:$([a-zA-Z] [a-zA-Z0-9]*) ![a-zA-Z0-9] { return text } 
    
// Identifier
// 	= text:$([A-Z] [A-Z0-9]*) ![a-zA-Z0-9] { return text }

    
Number
	= Float / Integer
    
		Float
			= text: $(Integer "." PositiveInteger ("E" ("+" / "-") Integer)?) { return parseFloat(text) }
			
		Integer
			= digits: $("-"? [0-9])+ { return parseInt(digits) }

		PositiveInteger
			= digits: $([0-9]+) { return parseInt(digits) }


Newline
	= "\n" / "\r\n" / "\r"

WhiteSpace
	= "\t" / " "
    
Comment
	=  "//" (!Newline .)*

__
	= (WhiteSpace /  Newline / Comment)*

_
	= WhiteSpace*

EOL
	= Comment? Newline __