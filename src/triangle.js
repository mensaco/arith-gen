

export default function GetTriangle(Alpine) {
    return {

        arguments_min: Alpine.$persist(0),
        arguments_max: Alpine.$persist(20),
        arguments_count: Alpine.$persist(12),

        tdata: Alpine.$persist([])
        ,

        showResults: false,
        compare: false,
        get showResultsLabel() {
            return this.showResults ? 'hide results' : 'show results'
        },

        isSomething(n) {
            const s = (n.input_x || '') + (n.input_y || '') + (n.input_z || '')
            console.log(s)
            return s != ''
        },

        get showCompareButton() {

            return this.tdata.find(n => this.isSomething(n))
        },

        get compareLabel() {
            return this.compare ? 'do not compare' : 'compare'
        },

        get randomArgument() {
            const amin = 1 * this.arguments_min
            const amax = 1 * this.arguments_max

            const r = Math.floor(Math.random() * (amax - amin) + amin + 0.5)
            //console.log(amax, amin, r)
            return r
        },

        refresh() {
            const d = []

            for (let i = 0; i < this.arguments_count; i++) {

                const a = this.randomArgument
                const b = this.randomArgument
                const x = Math.floor(Math.random() * Math.min(a, b))

                const y = a - x
                const z = b - x
                const c = y + z

                const m = Math.max(a, b, c)

                const f = Math.random() * this.arguments_max / m

                const xx = Math.floor(x * f)
                const yy = Math.floor(y * f)
                const zz = Math.floor(z * f)

                const aa = xx + yy
                const bb = xx + zz
                const cc = zz + yy

                const n = {
                    a: aa,
                    b: bb,
                    c: cc,
                    x: xx,
                    y: yy,
                    z: zz,
                }

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
                if (Array.isArray(this.tdata) && this.tdata.length == 0) {
                    this.refresh()
                }
            })

        }


    }
}