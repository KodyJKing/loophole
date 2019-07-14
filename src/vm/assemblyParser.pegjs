Start = 
	Lines

Lines
	= WSN head: Line tail: ("\n" WSN v: Line { return v })* WSN { return [head].concat(tail) }

Line
	= InstructionLine / LabelLine

InstructionLine
	= WS instruction: UpperIdentifier WS args: Arguments WS { return { type: "InstructionLine",  instruction, arguments: args }  }

LabelLine
	= WS name: Identifier ":" WS { return { type: "LabelLine", name } }
    
Arguments
	= head: Argument tail: (WS v: Argument { return v })* { return [head].concat(tail) }
    
Argument
	= MemRef / RegisterRef / LabelRef / Primitive
    
MemRef
	= "[" WS address: (DynamicAddress / FixedAddress) WS "]" { return { type: "MemRef", address } }

FixedAddress
	= offset: PositiveInteger { return { type: "FixedAddress", offset } }

DynamicAddress
	= register: RegisterRef WS offset: (op: ("+"/"-") v: PositiveInteger { return op == "+" ? v : -	v })? { return { type: "DynamicAddress", register, offset } }
    
LabelRef
	= name: Identifier { return { type: "LabelRef", name } }
    
Primitive
	= value: Number { return { type: "Primitive", value } } 
    
RegisterRef
	= "R" id: Integer { return { type: "RegisterRef", id } }
   
Identifier
	= text:$([a-zA-Z]+) ![a-zA-Z] { return text } 
    
UpperIdentifier
	= text:$([A-Z]+) ![a-zA-Z] { return text }
    
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