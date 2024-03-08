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

    const initChart = useCallback(() => {
        if (chart) return
        const myChart = echarts.init(chartRef.current)
        setChart(myChart)

        myChart.setOption(option)
    }, [chart, option])

    const resize = useCallback(() => {
        const resizeOption = {
            animation: {duration: 300}
        }
        chart?.resize(resizeOption)
    }, [chart])


    useEffect(() => {
        initChart()
        window.addEventListener('resize', resize);
        
        if (loading) chart?.showLoading();
        else chart?.hideLoading();

        return () => {
            window.removeEventListener('resize', resize);
        }
    }, [chart, initChart, loading, resize])

    return (
        <div ref={chartRef} style={style}/>
    )
}

export default Chart
