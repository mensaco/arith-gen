import '/src/styles.css'
import Alpine from 'alpinejs'
import GetArith from './arith'

window.Alpine = Alpine

Alpine.data("arith", GetArith)

Alpine.start()
