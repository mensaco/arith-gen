

export default function GetTriangle(Alpine) {

    return {

        SHOW: {
            NONE: 0,
            INNER: 1,
            OUTER: 2,
            ALL: 3
        },

        arguments_min: Alpine.$persist(0),
        arguments_max: Alpine.$persist(20),
        arguments_count: Alpine.$persist(12),

        tdata: Alpine.$persist([])
        ,

        show: Alpine.$persist(1),
        showLast: Alpine.$persist(1),
        showNext() {

            switch (this.show) {
                case this.SHOW.INNER:
                    this.show = this.SHOW.OUTER
                    break;
                case this.SHOW.OUTER:
                    this.show = this.SHOW.ALL
                    break;
                case this.SHOW.ALL:
                    this.show = this.SHOW.INNER
                    break;

                default:
                    this.show = this.SHOW.INNER
                    break;
            }
            // hide show inputs if showing all
            if (this.show == this.SHOW.ALL) {
                this.showLast = this.showInputs
                this.showInputs = false
            }
            else {
                this.showInputs = this.showLast
            }
        },
        showInputs: Alpine.$persist(false),
        compare: true,
        get showInputsLabel() {
            return this.showInputs ? 'showing inputs' : 'not showing inputs'
        },
        get showOuterLabel() {
            return this.show == this.SHOW.OUTER ? 'showing outer'
                : this.show == this.SHOW.INNER ? 'showing inner'
                    : this.show == this.SHOW.ALL ? 'showing all' : ''
        },

        isSomething(n) {
            const s = (n.input_x || '') + (n.input_y || '') + (n.input_z || '')
            return s != ''
        },

        get showCompareButton() {
            return this.tdata.find(n => this.isSomething(n))
        },

        get compareLabel() {
            return this.compare ? 'comparing' : 'not comparing'
        },

        get randomArgument() {
            const amin = 1 * this.arguments_min
            const amax = 1 * this.arguments_max
            const r = Math.floor(Math.random() * (amax - amin) + amin + 0.5)
            return r
        },

        calculateValues(o1, o2) {

            let repeat = true
            let [i1, i2, i3] = [0, 0, 0]
            let o3 = 0

            while (repeat) {



                [i1, i2, i3] = [0, 0, 0]

                const og = Math.max(o1, o2)
                const os = Math.min(o1, o2)

                const s = og + os
                const d = og - os

                o3 = Math.floor(Math.random() * 2 * os + d)

                let a = (o3 + d) >> 1
                let b = (o3 - d) >> 1;

                [i1, i2] = (o1 > o2) ? [b, a] : [a, b]

                i3 = o1 - i2

                o3 = i1 + i2

                const m = Math.max(o1, o2, o3)

                repeat = m > this.arguments_max

                if (repeat) {
                    console.log('repeating')
                    if (o1 > o2) {
                        o1 = Math.floor(o1 / m * this.arguments_max)
                    }
                    else if (o2 > o1) {
                        o2 = Math.floor(o2 / m * this.arguments_max)
                    }
                }

            }

            // quick test
            const testOk = i2 + i3 == o1 &&
                i1 + i3 == o2 &&
                i1 + i2 == o3

            if (!testOk) {
                console.log('test not passed')
            }


            return {
                o1,
                o2,
                o3,
                i3,
                i2,
                i1,
            }
        },

        refresh() {
            const d = []

            for (let i = 0; i < this.arguments_count; i++) {

                const o1 = this.randomArgument
                const o2 = this.randomArgument
                const o3 = this.randomArgument

                const n = this.calculateValues(o1, o2, o3)

                d.push(n)
            }
            this.tdata = d
        },

        docompare(a, b) {
            if (this.compare) {
                if (a != undefined) {
                    return a == b ? 'font-semibold text-green-500' : 'font-semibold text-red-600'
                }
            }
            return ''
        }
        ,
        init() {
            Alpine.effect(() => {
                if(this.arguments_count > 100) {
                    this.arguments_count = 100
                }

                
                if (Array.isArray(this.tdata) && this.tdata.length == 0) {
                    this.refresh()
                }
            })

        }


    }
}