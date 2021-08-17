export class FieldElement {
    public readonly num: number
    public readonly prime: number
    constructor(num: number, prime: number) {
        if (num >= prime || num < 0) {
            throw `Num ${num} not in filed range 0 to ${prime - 1}`
        }

        this.num = num
        this.prime = prime
    }

    public eq(other: FieldElement): boolean {
        return this.num === other.num && this.prime === other.prime
    }

    public ne(other: FieldElement): boolean {
        return this !== other


    }
    public add(other: FieldElement): FieldElement {
        if (this.prime !== other.prime) {
            throw `Cannot add two numbers in different Fields`
        }

        const num = (this.num + other.num) % this.prime
        return new FieldElement(num, this.prime);
    }

    public sub(other: FieldElement): FieldElement {
        if (this.prime !== other.prime) {
            throw `Cannot add two numbers in different Fields`
        }

        const result = this.num - other.num
        if (Math.sign(result) === -1) {
            return new FieldElement(result + this.prime, this.prime)
        }
        return new FieldElement(result % this.prime, this.prime)
    }


    public mul(other: FieldElement): FieldElement {
        if (this.prime !== other.prime) {
            throw `Cannot add two numbers in different Fields`
        }

        const num = (this.num * other.num) % this.prime

        return new FieldElement(num, this.prime);
    }

    public div(other: FieldElement): FieldElement {
        if (this.prime !== other.prime) {
            throw `Cannot add two numbers in different Fields`
        }

        const num = this.num * Math.pow(other.num, this.prime - 2) % this.prime
        return new FieldElement(num, this.prime)
    }

    public pow(x: number): FieldElement {
        let n = x % (this.prime - 1)
        n = Math.sign(n) === -1 ? n + (this.prime - 1) : n
        const num = Math.pow(this.num, n) % this.prime
        return new FieldElement(num, this.prime)
    }

    public show(): string {
        return `FieldElement_${this.prime}(${this.num})`
    }
}

export class Point {
    public readonly a: number
    public readonly b: number
    public readonly x: number
    public readonly y: number

    constructor(x: number | null, y: number | null, a: number, b: number) {
        this.a = a
        this.b = b
        this.x = x
        this.y = y
        if (this.x === null && this.y === null) return
        if (this.y ** 2 !== this.x ** 3 + a * x + b) {
            throw `(${x},${y}) is not on the curve`
        }
    }

    public eq(other: Point):boolean {
        return this.x === other.x &&
            this.y === other.y &&
            this.a === other.a &&
            this.b === other.b
    }

    public ne(other: Point):boolean {
        return this !== other
    }

    public show():string {
        return `Point(${this.x},${this.y},${this.a},${this.b})`
    }

    public add(other:Point):Point {
        if(this.a !== other.a || this.b !== other.b) {
            throw `Points${this.show()}, ${other.show()} are not on the same curve`
        }
        if (this.x === null) {
            return other
        }

        if(other.x === null) {
            return this
        }
        if(this.x === other.x && this.y !== other.y) {
            return new Point(null,null,this.a,this.b)
        }
        if(this.x !== other.x) {
            const s = (other.y - this.y) / (other.x - this.x)
            const x = s**2 - this.x - other.x
            const y = s * (this.x - x) - this.y
            return new Point(x,y,this.a,this.b)

        }

        if(this.eq(other)) {
            const s = (3 * this.x ** 2 + this.a) / (2*this.y)
            const x = s**2-2*this.x
            const y = s*(this.x-x)-this.y
            return new Point(x,y,this.a,this.b)
        }

    }
}