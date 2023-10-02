const App = function () {
    return {
        async run() {
            console.log('App running!')
        }
    }
}

document.addEventListener('DOMContentLoaded', async () => {
    const app = new App()
    await app.run()
})
