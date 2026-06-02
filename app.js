// code is mostly the same as web app, but cleaned up

let unread = 0
let activity = false
let username = localStorage.getItem('username') || userId.slice(0,5)
let audioctx = null

const socket = io('wss://chat.emmameowss.gay', {auth: {session: localStorage.getItem('session')}})
const maxmessages = 25
const maxsize = 10 * 1024 * 1024 // 10MB upload size

// userid generation
let userId = localStorage.getItem('userId')
if (!userId || userId === null) {
    userId = crypto.randomUUID()
    localStorage.setItem('userId', userId)
}

// username setting and general functionality
document.querySelector('#username-input').value = username

document.querySelector('#username-form').addEventListener('submit', (e) => {
    e.preventDefault()
    const input = document.querySelector('#username-input')
    if (input.value.trim()) {
        username = input.value.trim()
        localStorage.setItem('username', username)
        socket.emit('setUsername', username)
    }
})

// name color functionality

function getNameColor(name) {
    if (name.toLowerCase() === 'emma') return 'hotpink'
    let hash = 0
    for (let i = 0; i < name.length; i++) {
        hash = name.charCodeAt(i) + ((hash << 5) - hash)
    }
    return `hsl(${hash % 360}, 70%, 65%)`
}