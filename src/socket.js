import io from 'socket.io-client'
const socket = io.connect('http://localhost:10998')
export default socket