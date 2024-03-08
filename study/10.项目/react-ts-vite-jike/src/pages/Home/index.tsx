import {useCallback, useEffect, useRef, useState} from 'react'
import {echarts} from "@/util";

const Home = () => {
    const chartRef = useRef(null)
    const [chart, setChart] = useState<echarts.ECharts>()

    const initChart = useCallback(() => {
        // 1. 生成实例
        if (chart) return
        const myChart = echarts.init(chartRef.current)
        setChart(myChart)
        // 2. 准备图表参数
        const option = {
            xAxis: {
                type: 'category',
                data: ['Vue', 'React', 'Angular']
            },
            yAxis: {
                type: 'value'
            },
            series: [
                {
                    data: [10, 40, 70],
                    type: 'bar'
                }
            ]
        }
        // 3. 渲染参数
        myChart.setOption(option)
    }, [chart])


    useEffect(() => {
        initChart()
        window.addEventListener('resize', () => chart?.resize());

        return () => {
            window.removeEventListener('resize', () => chart?.resize());
        }
    }, [chart, initChart])

    return (
        <div ref={chartRef} style={{width: '100%', height: '100%'}}/>
    )
}

export default Home
