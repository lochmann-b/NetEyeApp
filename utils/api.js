import base64 from 'react-native-base64'
import { __SERVICES } from './_Data'

export function loadServices(settings) {
    console.log("loading services from ", settings)
    if (settings.host === 'dummy') {
        const dummyData = loadDummyServices()
        return dummyData
    }

    return fetch(`${settings.host}/v1/objects/services`, {
        headers: new Headers({
            "Authorization": `Basic ${base64.encode(`${settings.user}:${settings.password}`)}`
        }),

    }).then(response => {
        if (!response.ok) {
            throw new Error(response.statusText)
        }
        return response.json();
    })
}

function loadDummyServices() {
    return new Promise((res, rej) => {
        setTimeout(() => res(JSON.parse(__SERVICES)), 50)
    })
}