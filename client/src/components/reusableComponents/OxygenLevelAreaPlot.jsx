import { Area } from '@ant-design/plots';
import React from 'react';

function OxygenLevelAreaPlot({
  data = [],
}) {
  const [readingData, setReadingData] = React.useState(data);

  const config = {
    data: readingData,
    xField: 'created_at',
    yField: 'oxygen_level',
    xAxis: {
      range: [0, 1],
    },
    smooth: true,
    slider: {
      start: 0.5,
      end: 1,
      isArea: true,
    },
  };
  return (
    <Area {...config} />
  );
}

export default OxygenLevelAreaPlot;
