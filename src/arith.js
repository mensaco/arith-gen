const COUNT_KEY = 'count_key'
const OP_KEY = 'op_key'
const MIN_KEY = 'min_key'
const MAX_KEY = 'max_key'

export default function GetArith(Alpine) {
    return {
        arguments_min: Alpine.$persist(0).as(MIN_KEY),
        arguments_max: Alpine.$persist(20).as(MAX_KEY),
        arguments_count: Alpine.$persist(50).as(COUNT_KEY),



        showCompareButton: Alpine.$persist(true),
        compare: true,
        get compareLabel() {
            return this.compare ? 'comparing' : 'not comparing'
        },

        docompare(a, b) {
            if (this.compare) {
                if (a != undefined) {
                    return a == b ? 'font-semibold text-green-500' : 'font-semibold text-red-600'
                }
            }
            return ''
        },

        safeOperation: Alpine.$persist(true),

        operations: {
            addition: '+',
            subtraction: '-',
            multiplication: 'x',
            division: ':',
        },

        SHOW: {
            EMPTY: 0,
            RESULTS: 1,
            INPUTS: 2,
        },

        show: Alpine.$persist(0),

        showNext() {
            switch (this.show) {
                case this.SHOW.EMPTY:
                    this.show = this.SHOW.RESULTS
                    break;
                case this.SHOW.RESULTS:
                    this.show = this.SHOW.INPUTS
                    break;
                case this.SHOW.INPUTS:
                    this.show = this.SHOW.EMPTY
                    break;

                default:
                    this.show = this.SHOW.RESULTS
                    break;
            }
        },

        get showInputsLabel() {
            switch (this.show) {
                case this.SHOW.EMPTY:
                    return 'showing empty'
                    break;
                case this.SHOW.RESULTS:
                    return 'showing results'
                    break;
                case this.SHOW.INPUTS:
                    return 'showing inputs'
                    break;

                default:
                    return 'showing empty'
                    break;
            }
        },

        currentOperation: Alpine.$persist('+').as(OP_KEY),

        calculate(a, b, op) {
            switch (op) {
                case this.operations.addition:
                    return a + b
                    break;
                case this.operations.subtraction:
                    return a - b
                    break;
                case this.operations.division:
                    return a / b
                    break;
                case this.operations.multiplication:
                    return a * b
                    break;

                default:
                    return NaN
                    break;
            }
        },


        get ops() {
            return Object.keys(this.operations)
        },


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
                    let s = Number.MAX_SAFE_INTEGER
                    while (s > this.arguments_max) {
                        a = this.randomArgument
                        b = this.randomArgument
                        s = a + b
                    }
                }

                const line = {
                    a: a,
                    op: this.currentSign,
                    b: b,
                    result: this.calculate(a, b, this.currentSign)
                }
                vl.push(line)
            }
            return vl
        },
        save() {

            // localStorage.setItem(OP_KEY, this.currentOperation)
            // localStorage.setItem(COUNT_KEY, this.arguments_count)
            // localStorage.setItem(MIN_KEY, this.arguments_min)
            // localStorage.setItem(MAX_KEY, this.arguments_max)

        },
        init() {
            Alpine.effect(() => {
                // this.setCurrentOperation(localStorage.getItem(OP_KEY) || 'addition')
                // this.arguments_count = localStorage.getItem(COUNT_KEY) || 50
                // this.arguments_min = localStorage.getItem(MIN_KEY) || 0
                // this.arguments_max = localStorage.getItem(MAX_KEY) || 10
            })

        }

    }
}