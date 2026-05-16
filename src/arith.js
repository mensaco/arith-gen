const COUNT_KEY = 'count_key'
const OP_KEY = 'op_key'
const MIN_KEY = 'min_key'
const MAX_KEY = 'max_key'

export default function GetArith() {
    return {
        arguments_min: 0,
        arguments_max: 20,
        arguments_count: 7 * 13,

        safeOperation: true,

        operations: {
            addition: '+',
            subtraction: '-',
            multiplication: 'x',
            division: ':',
        },


        get ops() {
            return Object.keys(this.operations)
        },

        currentOperation: "",
        setCurrentOperation(op) {
            this.currentOperation = op
        },

        get currentSign() {
            return this.operations[this.currentOperation]
        },

        get randomArgument() {
            const amin = 1 * this.arguments_min
            const amax = 1 * this.arguments_max

            const r = Math.floor(Math.random() * (amax - amin) + amin + 0.5)
            console.log(amax, amin, r)
            return r
        },

        get lines() {
            const vl = []
            for (let i = 0; i < this.arguments_count; i++) {
                let a = this.randomArgument
                let b = this.randomArgument
                if (this.safeOperation && a < b) {
                    [a, b] = [b, a]
                }
                if (this.safeOperation && this.currentOperation == 'addition') {
                    const c = Math.max(a, b)
                    const s = a + b
                    if (s > c) {
                        if (a > b) {
                            const d = s - c
                            a = a - d
                        }
                    }
                }

                const line = {
                    a: a,
                    op: this.currentSign,
                    b: b
                }
                vl.push(line)
            }
            return vl
        },
        save() {

            localStorage.setItem(OP_KEY, this.currentOperation)
            localStorage.setItem(COUNT_KEY, this.arguments_count)
            localStorage.setItem(MIN_KEY, this.arguments_min)
            localStorage.setItem(MAX_KEY, this.arguments_max)

        },
        init() {
            Alpine.effect(() => {
                this.setCurrentOperation(localStorage.getItem(OP_KEY) || 'addition')
                this.arguments_count = localStorage.getItem(COUNT_KEY) || 50
                this.arguments_min = localStorage.getItem(MIN_KEY) || 0
                this.arguments_max = localStorage.getItem(MAX_KEY) || 10
            })

        }

    }
}