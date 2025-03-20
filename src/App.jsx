import { useState, useEffect } from 'react'
import './App.css'
import ImageViewer from './components/ImageViewer'
import BloodCellTable from './components/BloodCellTable'
import sampleData from './data/output.json'

function App() {
  const [imageUrl, setImageUrl] = useState('/sample-slide.png');
  const [showTable, setShowTable] = useState(false);
  
  const inferenceResults = sampleData.inference_results;
  const detectionResults = inferenceResults.output.detection_results;

  const tableData = {
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

  const toggleTable = () => {
    setShowTable(!showTable);
  };

  return (
    <div className="app-container" style={{ border:"2px solid green", display: 'flex', flexDirection: 'column', height: '90vh', width:'96vw', padding: '20px', overflow: 'hidden' }}>
      <div className="header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', height: '60px' }}>
        <h1 style={{ margin: 0, fontSize: '24px' }}>
          {`${new Date(sampleData.date).toLocaleDateString('en-US', {
            weekday: 'short',
            month: 'short',
            day: '2-digit',
            year: 'numeric'
          })} ${new Date().toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
          })}`}
        </h1>
        <button 
          className="toggle-button" 
          onClick={toggleTable}
          style={{ 
            padding: '8px 16px', 
            backgroundColor: '#007bff', 
            color: 'white', 
            border: 'none', 
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          {showTable ? 'Hide' : 'Report'}
        </button>
      </div>
      
      <div className="content-container" style={{ display: 'flex', flex: 1, gap: '20px', overflow: 'hidden' }}>
        {showTable && (
          <div className="table-container" style={{ 
            width: '40%', 
            minWidth: '350px',
            maxHeight: 'calc(100vh - 100px)',
            overflowY: 'auto',
            backgroundColor: '#000',
            borderRadius: '8px',
            boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
          }}>
            <BloodCellTable data={tableData} />
          </div>
        )}
        
        <div className="image-viewer-container" style={{ 
          flex: 1, 
          height: 'calc(100vh - 100px)',
          border: '1px solid #ddd',
          borderRadius: '8px',
          overflow: 'hidden',
          backgroundColor: '#fff'
        }}>
          <ImageViewer
            imageUrl={imageUrl}
            detectionResults={detectionResults}
          />
        </div>
      </div>
    </div>
  )
}

export default App
