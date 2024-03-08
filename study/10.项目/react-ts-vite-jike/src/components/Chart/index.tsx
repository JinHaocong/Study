import {CSSProperties, FC, useCallback, useEffect, useRef, useState} from 'react'
import {echarts} from "@/util";
import {ECOption} from "@/util/echarts.ts";

interface Props {
    loading?: boolean
    option: ECOption
    style: CSSProperties
}

const Chart: FC<Props> = ({option, style, loading = false}) => {
    const chartRef = useRef(null)
    const [chart, setChart] = useState<echarts.ECharts>()

    const resize = useCallback(() => {
        const resizeOption = {
            animation: {duration: 300}
        }
        chart?.resize(resizeOption)
    }, [chart])

    const initChart = useCallback(() => {
        if (chart) return
        const myChart = echarts.init(chartRef.current)
        setChart(myChart)

        myChart.setOption(option)

        if (loading) myChart.showLoading();
        else myChart.hideLoading();

    }, [chart, loading, option])


    useEffect(() => {
        initChart()
        window.addEventListener('resize', resize);

        return () => {
            window.removeEventListener('resize', resize);
        }
    }, [chart, initChart, loading, resize])

    return (
        <div ref={chartRef} style={style}/>
    )
}

export default Chart
