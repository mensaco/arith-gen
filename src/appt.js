import '/src/styles.css'
import Alpine from 'alpinejs'
import persist from '@alpinejs/persist'
import GetTriangle from './triangle'

window.Alpine = Alpine

Alpine.plugin(persist)

Alpine.data("triangle", () => GetTriangle(Alpine))

Alpine.start()
