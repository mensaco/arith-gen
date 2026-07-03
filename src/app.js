import '/src/styles.css'
import Alpine from 'alpinejs'
import persist from '@alpinejs/persist'
import GetArith from './arith'

window.Alpine = Alpine

Alpine.plugin(persist)

Alpine.data("arith", () => GetArith(Alpine))

Alpine.start()
