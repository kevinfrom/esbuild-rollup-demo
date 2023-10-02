import {App} from './app'

document.addEventListener('DOMContentLoaded', async () => {
    const app = new App()
    await app.run()
})
