import '/src/styles.css'
import Alpine from 'alpinejs'
import persist from '@alpinejs/persist'
import focus from '@alpinejs/focus'
import GetArith from './arith'

window.Alpine = Alpine

Alpine.plugin(persist)
Alpine.plugin(focus)

Alpine.data("arith", () => GetArith(Alpine))

Alpine.start()
