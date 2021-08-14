export class FieldElement {
    public readonly num:number
    public readonly prime:number
    constructor(num:number,prime:number) {
        if(num >= prime || num < 0) {
            throw `Num ${num} not in filed range 0 to ${prime-1}`
        }

        this.num = num
        this.prime = prime
    }

    public eq(other:FieldElement):boolean {
        if(this.isFieldElement(this)) {
            return this.num === other.num && this.prime === other.prime
        }
    
        return false
    }

    public ne(other:FieldElement):boolean {
        if(this.isFieldElement(other)) {
            return this !== other
        }

        return false
    }
    public add(other:FieldElement):FieldElement {
        if(this.prime !== other.prime) {
            throw `Cannot add two numbers in different Fields`
        }
    
        const num = (this.num + other.num) % this.prime
        return new FieldElement(num,this.prime);
    }

    public sub(other:FieldElement):FieldElement {
        if(this.prime !== other.prime) {
            throw `Cannot add two numbers in different Fields`
        }

        const result = this.num - other.num
        if(Math.sign(result) === -1) {
            return new FieldElement(result+this.prime,this.prime)
        }
        return new FieldElement(result%this.prime,this.prime)
    }


    public mul(other:FieldElement):FieldElement {
        if(this.prime !== other.prime) {
            throw `Cannot add two numbers in different Fields`
        }

        const num = (this.num * other.num) % this.prime

        return new FieldElement(num,this.prime);
    }

    public div(other:FieldElement):FieldElement {
        if(this.prime !== other.prime) {
            throw `Cannot add two numbers in different Fields`
        }

        const num = this.num * Math.pow(other.num,this.prime-2) % this.prime
        return new FieldElement(num,this.prime)
    }

    public pow(x:number):FieldElement {
        let n = x %(this.prime - 1)
        n = Math.sign(n) === -1 ? n+(this.prime-1) : n
        const num = Math.pow(this.num,n) % this.prime
        return new FieldElement(num,this.prime)
    }

    private isFieldElement(f:any):f is FieldElement {
        return f.num !== undefined
    }

    public show():string {
        return `FieldElement_${this.prime}(${this.num})`
    }
}

export class Point {
    public readonly a:number
    public readonly b:number
    public readonly x:number
    public readonly y:number

    constructor(x:number,y:number,a:number,b:number) {
        this.a = a
        this.b = b
        this.x = x
        this.y = y

        if (this.y**2 !== this.x**3 + a * x + b) {
            throw `(${x},${y}) is not on the curve`
        }
    }

    public eq(other:Point) {
        return this.x === other.x && 
        this.y === other.y &&
        this.a === other.a &&
        this.b === other.b 
    }

    public ne(other:Point) {
        return this !== other
    }

}