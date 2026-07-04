import '/src/styles.css'
import Alpine from 'alpinejs'
import persist from '@alpinejs/persist'
import focus from '@alpinejs/focus'
import GetTriangle from './triangle'

window.Alpine = Alpine

Alpine.plugin(persist)
Alpine.plugin(focus)

Alpine.data("triangle", () => GetTriangle(Alpine))

Alpine.start()
