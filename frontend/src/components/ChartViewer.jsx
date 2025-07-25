import { useState, useRef } from 'react';
import { Bar, Line, Pie, Scatter } from 'react-chartjs-2';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const ChartViewer = ({ fileData }) => {
  const [xKey, setXKey] = useState('');
  const [yKey, setYKey] = useState('');
  const [chartType, setChartType] = useState('bar');
  const chartRef = useRef();

  const labels = fileData.data.map(row => row[xKey]);
  const values = fileData.data.map(row => row[yKey]);

  const chartData = {
    labels,
    datasets: [{ label: `${yKey} vs ${xKey}`, data: values, backgroundColor: 'rgba(75,192,192,0.6)' }]
  };

  const renderChart = () => {
    switch (chartType) {
      case 'bar': return <Bar ref={chartRef} data={chartData} />;
      case 'line': return <Line ref={chartRef} data={chartData} />;
      case 'pie': return <Pie ref={chartRef} data={chartData} />;
      case 'scatter':
        return (
          <Scatter
            ref={chartRef}
            data={{
              datasets: [{
                label: 'Scatter Plot',
                data: fileData.data.map(row => ({ x: row[xKey], y: row[yKey] })),
                backgroundColor: 'rgba(255,99,132,1)'
              }]
            }}
          />
        );
      default: return null;
    }
  };

  const handleDownload = async (type = 'png') => {
    const chartContainer = document.getElementById('chart-container');
    const canvas = await html2canvas(chartContainer);

    if (type === 'png') {
      const link = document.createElement('a');
      link.href = canvas.toDataURL();
      link.download = 'chart.png';
      link.click();
    } else if (type === 'pdf') {
      const pdf = new jsPDF();
      pdf.addImage(canvas.toDataURL(), 'PNG', 10, 10, 180, 100);
      pdf.save('chart.pdf');
    }
  };

  return (
    <div>
      <div className="flex gap-2 mb-4">
        <select onChange={e => setXKey(e.target.value)} value={xKey}>
          <option value="">Select X Axis</option>
          {fileData.columns.map(col => <option key={col} value={col}>{col}</option>)}
        </select>
        <select onChange={e => setYKey(e.target.value)} value={yKey}>
          <option value="">Select Y Axis</option>
          {fileData.columns.map(col => <option key={col} value={col}>{col}</option>)}
        </select>
        <select onChange={e => setChartType(e.target.value)} value={chartType}>
          <option value="bar">Bar</option>
          <option value="line">Line</option>
          <option value="pie">Pie</option>
          <option value="scatter">Scatter</option>
        </select>
      </div>

      {xKey && yKey && (
        <div>
          <div id="chart-container" className="p-4 bg-white shadow rounded">
            {renderChart()}
          </div>
          <div className="mt-4 flex gap-2">
            <button onClick={() => handleDownload('png')} className="bg-blue-500 text-white px-4 py-2 rounded">Download PNG</button>
            <button onClick={() => handleDownload('pdf')} className="bg-green-500 text-white px-4 py-2 rounded">Download PDF</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChartViewer;