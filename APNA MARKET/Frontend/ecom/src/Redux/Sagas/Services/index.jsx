export async function createRecord(collection, payload) {
    let response = await fetch(`${process.env.REACT_APP_BACKEND_SERVER}${collection}`, {
        method: "POST",
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify({ ...payload })
    })
    return await response.json()
}

//if payload has files
export async function createMultipartRecord(collection, payload) {
    let response = await fetch(`${process.env.REACT_APP_BACKEND_SERVER}${collection}`, {
        method: "POST",
        headers: {
        },
        body: payload
    })
    return await response.json()
}

export async function getRecord(collection) {
    let response = await fetch(`${process.env.REACT_APP_BACKEND_SERVER}${collection}`, {
        method: "GET",
        headers: {
            "content-type": "application/json"
        }
    })
    return await response.json()
}

export async function updateRecord(collection, payload) {
    let response = await fetch(`${process.env.REACT_APP_BACKEND_SERVER}${collection}/${payload.id}`, {
        method: "PUT",
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify({ ...payload })
    })
    return await response.json()
}


//If record has files
export async function updateMultipartRecord(collection, payload) {
    let response = await fetch(`${process.env.REACT_APP_BACKEND_SERVER}${collection}/${payload.get('id')}`, {
        method: "PUT",
        headers: {
        },
        body: payload
    })
    return await response.json()
}

export async function deleteRecord(collection, payload) {
    let response = await fetch(`${process.env.REACT_APP_BACKEND_SERVER}${collection}/${payload.id}`, {
        method: "DELETE",
        headers: {
            "content-type": "application/json"
        }
    })
    return await response.json()
}