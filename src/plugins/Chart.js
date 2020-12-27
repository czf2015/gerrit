import * as echarts from 'echarts'

export default class Chart {
    constructor(el, theme, opts) {
        this.instance = echarts.init(el, theme, opts)
    }

    draw({ title, categories, series, axis }) {
        const option = {
            toolbox: {
                show: true,
                feature: {
                    mark: {
                        show: true
                    },
                    dataView: {
                        show: true,
                        readOnly: true
                    },
                    magicType: {
                        // show: false,
                        show: true,
                        type: ["line", "bar", "stack", "tiled"]
                    },
                    restore: {
                        show: true
                    },
                    saveAsImage: {
                        show: true
                    }
                }
            },
            calculable: true,
            tooltip: {
                trigger: 'axis',
                showDelay: 0,
                axisPointer: {
                    type: "cross",
                    lineStyle: {
                        type: "dashed",
                        width: 1
                    }
                }
            },
            title: {
                text: title,
                left: 'auto',
            },
            legend: {
                left: '2%',
                top: '5%',
                data: series.map(item => item.name)
            },
            series,
        }
        if (!!axis) {
            if (typeof axis == 'object') {
                Object.assign(option, axis)
            } else {
                const yAxis = []
                series.forEach(({
                    yAxisIndex = 0,
                    unit
                }) => {
                    if (!yAxis[yAxisIndex]) {
                        yAxis[yAxisIndex] = {
                            type: 'value',
                            name: unit,
                        }
                    }
                })
                Object.assign(option, {
                    xAxis: {
                        type: "category",
                        data: categories,
                        boundaryGap: false,
                        axisLine: {
                            onZero: false
                        },
                    },
                    yAxis
                })
            }
        }
        this.instance.setOption(option)
        return this
    }
}


export class LineChart extends Chart {
    draw({ title, categories, series }) {
        return super.draw({ title, categories, series, axis: true })
    }
}

export class BarChart extends Chart {
    draw({ title, categories, series }) {
        return super.draw({ title, categories, series, axis: true })
    }
}

export class ScatterChart extends Chart {
    draw({ title, series }) {
        return super.draw({
            title, 
            series, 
            axis: {
                xAxis: [
                    {
                        type: "value",
                        power: 1,
                        precision: 2,
                        scale: true
                    }
                ],
                yAxis: [
                    {
                        type: "value",
                        power: 1,
                        precision: 2,
                        scale: true
                    }
                ],
            }
        })
    }
}

export class RadarChart extends Chart {
    draw({ title, series, axis }) {
        return super.draw({ title, series, axis })
    }
}

export class PieChart extends Chart {
    draw({ title, series }) {
        return super.draw({ title, series })
    }
}

// 漏斗图
export class FunnelChart extends Chart {
    draw({ title, series }) {
        return super.draw({ title, series })
    }
}

// 仪表盘
export class GaugeChart extends Chart {
    draw({ title, series }) {
        return super.draw({ title, series })
    }
}
