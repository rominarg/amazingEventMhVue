const { createApp } = Vue

createApp({

data() {
return {
    datos: {},
    dataEvents: [],
    checked: [],
    checkBox: [],
    eventFilter: [],
    textSearch: ""
}
},

created() {
fetch("https://mindhub-xj03.onrender.com/api/amazing")
    .then(response => response.json())
    .then(datos => {
    this.datos = datos
    this.dataEvents = this.datos.events
    this.checkBox = [... new Set(this.dataEvents.map(event => event.category))]
    })
    .catch(error => console.log(error.message))

},
computed: {
filtrarPorCheck: function filtroCheck() {
    let eventCheck = this.checked.length == 0 ? this.dataEvents :
    this.dataEvents.filter(evento =>
        this.checked.includes(evento.category))
    this.eventFilter = this.textSearch == "" ? eventCheck : eventCheck.filter(event => event.name.toLowerCase().search(this.textSearch.toLowerCase().trim()) != -1)
}
}

}).mount('#app')