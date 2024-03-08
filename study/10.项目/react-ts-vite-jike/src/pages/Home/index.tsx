import Chart from "@/components/Chart";
import {ECOption} from "@/util/echarts.ts";

const Home = () => {

    const options: ECOption = {
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

    return (
        <Chart option={options} style={{width: '100%', height: '100%'}}/>
    )
}

export default Home
