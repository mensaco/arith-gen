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

        currentOperation: Alpine.$persist('addition').as(OP_KEY) || 'addition',

        calculate(a, b, op) {
            switch (op) {
                case this.operations.addition:
                    return a + b
                    break;
                case this.operations.subtraction:
                    return a - b
                    break;
                case this.operations.multiplication:
                    return a * b
                    break;
                case this.operations.division:
                    return (a / b).toFixed(2) // * 1.0
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
            return this.operations[this.currentOperation] ?? 'addition'
        },

        get randomArgument() {
            const amin = 1 * this.arguments_min
            const amax = 1 * this.arguments_max

            const r = Math.floor(Math.random() * (amax - amin) + amin + 0.5)

            return r
        },

        get lines() {
            const vl = []

            for (let i = 0; i < this.arguments_count; i++) {
                let a = this.randomArgument
                let b = 0
                switch (this.currentOperation) {
                    case 'addition':
                        b = Math.floor((this.arguments_max - a) * Math.random())
                        break;

                    case 'subtraction':
                        b = Math.floor(this.arguments_max * Math.random())

                        if (a < b & this.safeOperation) {
                            [a, b] = [b, a]
                        }
                        break;

                    case 'multiplication':
                        b = this.randomArgument
                        break;

                    case 'division':
                        while (b == 0) { // b can't be 0
                            b = this.randomArgument
                        }
                        if (a < b & this.safeOperation) {
                            [a, b] = [b, a]
                        }
                        break;


                    default:
                        break;
                }




                const line = {
                    a: a,
                    sign: this.currentSign,
                    b: b,
                    result: this.calculate(a, b, this.currentSign)
                }
                vl.push(line)
            }
            return vl
        },

        restrainCount() {
            if (this.arguments_count * 1 > 100) {
                this.arguments_count = 100
            }
        },

        init() {


            // Watch 'arguments_max' for any typed changes
            this.$watch('arguments_max', (value) => {
                // 1. Force the value to be a number (handles typing/strings)
                let num = Number(value);

                // 2. If user clears the input, default to 1 to prevent errors
                if (isNaN(num) || num < Math.max(this.arguments_min, 0)) {
                    this.arguments_max = Math.max(this.arguments_min, 0);
                }
                // 3. Hard cap the input at 100 to protect the browser
                else if (num > 100) {
                    this.arguments_max = 100;
                }
            });
            // Watch 'arguments_min' for any typed changes
            this.$watch('arguments_min', (value) => {
                // 1. Force the value to be a number (handles typing/strings)
                let num = Number(value);

                // 2. If user clears the input, default to 1 to prevent errors
                if (isNaN(num) || num < 1) {
                    this.arguments_min = 1;
                }
                // 3. Hard cap the input at 100 to protect the browser
                else if (num > this.arguments_max) {
                    this.arguments_min = this.arguments_max;
                }
            });
            this.$watch('arguments_count', (value) => {
                // 1. Force the value to be a number (handles typing/strings)
                let num = Number(value);

                // 2. If user clears the input, default to 1 to prevent errors
                if (isNaN(num) || num < 1) {
                    this.arguments_count = 1;
                }
                // 3. Hard cap the input at 100 to protect the browser
                else if (num > 100) {
                    this.arguments_count = 100;
                }
            });
        }

    }
}