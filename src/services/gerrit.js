import Request from "/@/plugins/Request.js";

const clean = (raw) => raw.replace(/^\)\]\}\'/, '')
const parse = (raw) => JSON.parse(clean(raw))


export const getChanges = async (query = 'status:open') => {
    return await Request({
        method: "get",
        url: "/api/changes/",
        params: {
            O: 81,
            q: query,
            // n: 25,
            // S: 25,
        },
    }).then(parse)
}

export const getProjects = async (type = 'ALL') => {
    return await Request({
        method: "get",
        url: "/api/projects/",
        params: {
            type,
            d: '',
            // m: '',
            // n: 26,
        },
    }).then(parse);
}


export const getGroups = async () => {
    return await Request({
        method: "get",
        url: "/api/accounts/self/groups",
    }).then(parse)
}
