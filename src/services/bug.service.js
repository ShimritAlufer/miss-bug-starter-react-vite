
import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'

import Axios from 'axios'

var axios = Axios.create({
    withCredentials: true,
})

const BASE_URL = '//localhost:3030/api/bug'

export const bugService = {
    query,
    getById,
    save,
    remove,
}


async function query() {
    var res = await axios.get(BASE_URL)
    var bugs = res.data

    return bugs
}

async function getById(bugId) {
    var res = await axios.get(BASE_URL + '/' + bugId)
    return res.data
}

async function remove(bugId) {
    return await axios.get(BASE_URL + '/' + bugId + '/remove')
}

async function save(bug) {
    var queryStr = `/save?title=${bug.title}&severity=${bug.severity}`    
	if (bug._id) queryStr += `&_id=${bug._id}`

    const res = await axios.get(BASE_URL + queryStr)
    return res.data
}