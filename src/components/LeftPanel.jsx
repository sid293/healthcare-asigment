import { useState, useEffect } from 'react';
import outputData from '../data/output.json';

const LeftPanel = () => {
  const [tableData, setTableData] = useState(outputData.table_data);

  return (
    <div className="left-panel">
      <div className="cell-stats">
        <h2>Blood Cell Statistics</h2>
        
        <div className="stat-section">
          <h3>RBC Analysis</h3>
          <table>
            <tbody>
              {Object.entries(tableData.rbc).map(([key, value]) => (
                <tr key={key}>
                  <td>{key.replace(/([A-Z])/g, ' $1').trim()}</td>
                  <td>{value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="stat-section">
          <h3>WBC Analysis</h3>
          <table>
            <tbody>
              {Object.entries(tableData.wbc).map(([key, value]) => (
                <tr key={key}>
                  <td>{key}</td>
                  <td>{value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="stat-section">
          <h3>Platelet Analysis</h3>
          <table>
            <tbody>
              {Object.entries(tableData.platelet).map(([key, value]) => (
                <tr key={key}>
                  <td>{key}</td>
                  <td>{value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default LeftPanel;