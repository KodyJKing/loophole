Lines
	= WSN head: Line tail: ("\n" WSN v: Line { return v } )* WSN { return [head].concat(tail) }

Line
	= InstructionLine / LabelLine / DefenitionLine

		InstructionLine
			= WS instruction: UpperIdentifier WS args: Arguments WS { return { type: "InstructionLine",  instruction, arguments: args }  }

		LabelLine
			= WS name: Identifier ":" WS { return { type: "LabelLine", name } }

		DefenitionLine
			= WS "%DEF" WS name: Identifier WS value: Primitive WS { return { type: "DefenitionLine", name, value } }
    
Arguments
	= head: Argument tail: (WS v: Argument { return v } )* { return [head].concat(tail) }
    
		Argument
			= RegisterRef / MemRef / Primitive / DefenitionRef / LineRef
    
				MemRef
					= "[" WS address: (DynamicAddress / FixedAddress) WS "]" { return { type: "MemRef", address } }

						FixedAddress
							= offset: PositiveInteger { return { type: "FixedAddress", offset } }

						DynamicAddress
							= register: RegisterRef WS offset: Offset? 
								{ return { type: "DynamicAddress", register, offset } }
					
				RegisterRef
					= "R" id: Integer { return { type: "RegisterRef", id } }

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
    
UpperIdentifier
	= text:$([A-Z] [A-Z0-9]*) ![a-zA-Z0-9] { return text }
    
Number
	= Float / Integer
    
Float
	= text: $(Integer "." PositiveInteger ("E" ("+" / "-") Integer)?) { return parseFloat(text) }
    
Integer
	= digits: $("-"? [0-9])+ { return parseInt(digits) }

PositiveInteger
	= digits: $([0-9]+) { return parseInt(digits) }

WSChar
	= " " / "	"
    
WSNLChar
	= WSChar / "\n"
    
WSN
	= WSNLChar*

WS
	= WSChar*
    
NWS
	= WSChar+