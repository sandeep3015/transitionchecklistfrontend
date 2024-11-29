import React, { useEffect, useState } from "react";

const App = () =>  {
  const [checklist, setChecklist] = useState([]); 
  const [loading, setLoading] = useState(true);  
  const [error, setError] = useState(null);      

  
  useEffect(() => {
    const fetchChecklist = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/checklist");
        if (!response.ok) {
          throw new Error("Failed to fetch checklist data");
        }
        const data = await response.json(); 
        setChecklist(data); 
      } catch (err) {
        setError(err.message); 
      } finally {
        setLoading(false); 
      }
    }

    fetchChecklist();
  }, []); 

 
  if (loading) return <div>Loading...</div>;

 
  if (error) return <div>Error: {error}</div>;

  
  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1>Checklist Dashboard</h1>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th style={{ border: "1px solid #ccc", padding: "10px" }}>Rule</th>
            <th style={{ border: "1px solid #ccc", padding: "10px" }}>Status</th>
          </tr>
        </thead>
        <tbody>
          {checklist.map((item, index) => (
            <tr key={index}>
              <td style={{ border: "1px solid #ccc", padding: "10px" }}>{item.name}</td>
              <td
                style={{
                  border: "1px solid #ccc",
                  padding: "10px",
                  color: item.passed ? "green" : "red",
                }}
              >
                {item.passed ? "Passed" : "Failed"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
