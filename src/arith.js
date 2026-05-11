export default function GetArith() {
    return {
        arguments: {
            min: 0,
            max: 20,
            count: 7 * 13
        },
        operations: {
            addition: '+',
            subtraction: '-',
            multiplication: 'x',
            division: ':',
        },
        currentOperation: "subtraction",
        get currentSign() {
            return this.operations[this.currentOperation]
        },
        get randomArgument() {
            return Math.floor(Math.random() * (this.arguments.max - this.arguments.min) + this.arguments.min)
        },
        get lines() {
            const vl = []
            for (let i = 0; i < this.arguments.count; i++) {
                let a = this.randomArgument
                let b = this.randomArgument
                if (this.currentOperation == 'subtraction' && a < b) {
                    [a, b] = [b, a]
                }

                //const line = `${a} ${this.operations[this.currentOperation]} ${b} = _______`
                const line = {
                    a: a,
                    op: this.currentSign,
                    b: b
                }
                vl.push(line)
            }
            return vl
        }

    }
}