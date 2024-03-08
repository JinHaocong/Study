import Chart from "@/components/Chart";
import {ECOption} from "@/util/echarts.ts";

const Home = () => {

    const options: ECOption = {
        title: {
            text: '三大框架满意度',
        },
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
        <div style={{width: '40%', height: '30%'}}>
            <Chart option={options} style={{width: '100%', height: '100%'}}/>
        </div>

    )
}

export default Home
