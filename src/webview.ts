import { Chart, ChartConfiguration } from 'chart.js/auto';

//-//

let chart: Chart | null = null;

//-//

const MONTHS = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
];
function months(config: any) {
    const cfg = config || {};
    const count = cfg.count || 12;
    const section = cfg.section;
    const values = [];

    let i;
    let value;

    for (i = 0; i < count; ++i) {
        value = MONTHS[Math.ceil(i) % 12];
        values.push(value.substring(0, section));
    }

    return values;
}

//-//

function mount(): void {
    console.log('success');

    const chartContainer = document.getElementById('chartContainer');

    const chart_ = document.getElementById('mainChart') as HTMLCanvasElement;
    chart_.width = chartContainer!.clientWidth;
    chart_.height = chartContainer!.clientHeight;

    const context = chart_!.getContext('2d');

    const labels = months({ count: 7 });
    const data = {
        labels: labels,
        datasets: [{
            label: 'Detail',
            data: [65, 59, 80, 81, 56, 55, 40],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(255, 159, 64, 0.2)',
                'rgba(255, 205, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(201, 203, 207, 0.2)'
            ],
            borderColor: [
                'rgb(255, 99, 132)',
                'rgb(255, 159, 64)',
                'rgb(255, 205, 86)',
                'rgb(75, 192, 192)',
                'rgb(54, 162, 235)',
                'rgb(153, 102, 255)',
                'rgb(201, 203, 207)'
            ],
            borderWidth: 1
        }]
    };
    const config: ChartConfiguration = {
        type: 'bar',
        data: data,
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        },
    };
    chart = new Chart(context!, config);
}

window.onload = () => {
    mount();
};
