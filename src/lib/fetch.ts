export const request = async (path: string,method: string,body={}) => {
    return await fetch(path, {
        method,
        body: JSON.stringify(body)
    })
}
