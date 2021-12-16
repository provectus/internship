import ReactECharts from 'echarts-for-react';
import { Category, Expense } from '../../types';
import { utils } from '../../utils';

interface Props {
  expenses: Expense[];
  categories: Category[];
}

export const ExpensesChart = (props: Props) => {
  const sortedCategories = utils.sortedCategories(props.categories);

  const seriesData = sortedCategories.map((category) =>
    utils.totalExpenses(utils.categoryExpenses(props.expenses, category))
  );

  const xAxisData = sortedCategories.map((category) => category.title);

  const options = {
    xAxis: {
      type: 'category',
      data: xAxisData,
      axisLabel: {
        formatter: (value: string) => value.slice(0, 3),
      },
    },
    yAxis: {
      type: 'value',
      axisLabel: {
        color: 'black',
      },
    },
    tooltip: {
      trigger: 'axis',
      textStyle: {
        fontWeight: 'bold',
        fontSize: 16,
      },
    },
    series: [
      {
        data: seriesData,
        type: 'bar',
      },
    ],
  };

  return <ReactECharts option={options} className='h-100' />;
};
