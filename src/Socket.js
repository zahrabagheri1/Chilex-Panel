import {
    io
} from 'socket.io-client';

// "undefined" means the URL will be computed from the `window.location` object
// const URL = process.env.NODE_ENV === 'production' ? undefined : 'http://diacostudios.com';

const value = `; ${document.cookie}`;
const parts = value.split(`; ${'accessToken'}=`);
// if (parts.length === 2) return parts.pop().split(';').shift();

// console.log('parts :   ' , parts[1])

export const socket = io('/', {
    autoConnect:false,
    auth: {
        token: parts[1],
        version: "1.1",
    }
});

export function connectSocketWithToken(token){
    socket.auth.token = token
    if(!socket.active){
        socket.connect()
    }
}
