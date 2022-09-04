import React from 'react';
import { Line } from '@ant-design/plots';

function StackedAreaPlot({
  data = [],
}) {
  // const [data, setData] = useState([]);
  // const asyncFetch = () => {
  //   fetch('https://gw.alipayobjects.com/os/bmw-prod/b21e7336-0b3e-486c-9070-612ede49284e.json')
  //     .then((response) => response.json())
  //     .then((json) => setData(json))
  //     .catch((error) => {
  //       console.log('fetch data failed', error);
  //     });
  // };
  // useEffect(() => {
  //   asyncFetch();
  // }, []);

  const config = {
    data,
    xField: 'created_at',
    yField: 'value',
    seriesField: 'type',
    slider: {
      start: 0.5,
      end: 1,
      isArea: true,
    },
  };

  return <Line {...config} />;
}

export default StackedAreaPlot;
