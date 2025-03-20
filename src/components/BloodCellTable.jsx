// import { useState } from 'react';
import '../styles/BloodCellTable.css';

const BloodCellTable = ({ data }) => {
  const defaultData = {
    RBC: {
      "Mature Cells": { count: 50, percentage: "80%" },
      "Borderline Dysplastic": { count: 10, percentage: "20%" },
      "Fragmented Cells": { count: 2, percentage: "0.12%" },
      "Rounded RBC": { count: 0, percentage: "0%" }
    },
    WBC: {
      "Neutrophil": { count: 22, percentage: "61%" },
      "Eosinophil": { count: 10, percentage: "28%" },
      "Lymphocyte": { count: 3, percentage: "8.3%" },
      "Monocyte": { count: 1, percentage: "2.7%" }
    },
    Platelets: {
      count: 222,
      percentage: 222
    }
  };

  const tableData = data || defaultData;

  return (
    <div className="blood-cell-table">
      <div className="table-section">
        <h3>RBC</h3>
        <table>
          <thead>
            <tr>
              <th>RBC</th>
              <th>Count</th>
              <th>Percentage</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(tableData.RBC).map(([cellType, values]) => (
              <tr key={cellType}>
                <td>{cellType}</td>
                <td>{values.count}</td>
                <td>{values.percentage}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="table-section">
        <h3>WBC</h3>
        <table>
          <thead>
            <tr>
              <th>WBC</th>
              <th>Count</th>
              <th>Percentage</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(tableData.WBC).map(([cellType, values]) => (
              <tr key={cellType}>
                <td>{cellType}</td>
                <td>{values.count}</td>
                <td>{values.percentage}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="table-section">
        <h3>Platelets</h3>
        <table>
          <thead>
            <tr>
              <th>Count</th>
              <th>Percentage</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{tableData.Platelets.count}</td>
              <td>{tableData.Platelets.percentage}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BloodCellTable;