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
    const ascend = (a, b) => a.value - b.value

    return {
        title: status,
        series: [
            { name: 'owner', center: ["15%", 250], type: 'pie', clockwise: false,  radius: [0, 120], data: raw.owner.sort(ascend) },
            { name: 'branch', center: ["42%", 250], type: 'pie', clockwise: false,radius: [100, 120], data: raw.branch.sort(ascend) },
            { name: 'project', center: ["70%", 250], type: 'pie', clockwise: false,roseType: 'area', radius: [40, 120], data: raw.project.sort(ascend) }
        ]
    }
}


