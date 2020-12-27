export const defaultPieData = {
    title: '',
    series: [
        {
            name: '',
            type: 'pie',
            radius: [100, 120],
            data: []
        }
    ]
}

export const handle = (list) => {
    const ownerObj = {}
    const branchObj = {}
    const projectObj = {}
    const count = (obj, attr) => {
        if (typeof obj[attr] == 'undefined') {
            obj[attr] = 1
        } else {
            obj[attr] += 1
        }
    }
    list.forEach(({ owner, branch, project }) => {
        count(ownerObj, owner.name)
        count(branchObj, branch)
        count(projectObj, project)
    })

    const convertToArr = (obj) => {
        return Object.keys(obj).map(key => {
            return {
                name: key,
                value: obj[key]
            }
        })
    }
    return {
        branch: convertToArr(branchObj),
        owner: convertToArr(ownerObj),
        project: convertToArr(projectObj),
    }
}

export const convertToPieData = (list, status) => {
    const raw = handle(list)
    return {
        title: status,
        series: [
            { name: 'owner', center: ["15%", 250], type: 'pie', radius: [0, 120], data: raw.owner },
            { name: 'branch', center: ["42%", 250], type: 'pie', radius: [100, 120], data: raw.branch },
            { name: 'project', center: ["70%", 250], type: 'pie', roseType: 'area', radius: [40, 120], data: raw.project }
        ]
    }
}

