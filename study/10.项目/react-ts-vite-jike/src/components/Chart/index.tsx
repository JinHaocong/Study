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

    const resize = useCallback((myChart: echarts.ECharts | undefined) => {
        const resizeOption = {
            animation: {duration: 300}
        }
        myChart?.resize(resizeOption)
    }, [])

    const initChart = useCallback(() => {
        if (chart) return
        const myChart = echarts.init(chartRef.current)
        setChart(myChart)

        if (loading) {
            myChart.showLoading()
        } else {
            myChart.hideLoading();
            myChart.setOption(option)
        }


        window.addEventListener('resize', () => resize(myChart));

    }, [chart, loading, option, resize])


    useEffect(() => {
        initChart()

        return () => {
            window.removeEventListener('resize', () => resize(chart));
        }
    }, [chart, initChart, loading, resize])

    return (
        <div ref={chartRef} style={style}/>
    )
}

export default Chart
