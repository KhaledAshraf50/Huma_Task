const Table = ({ columns, data, striped = false }) => {
  return (
    <table
      style={{ width: "100%", borderCollapse: "collapse", marginTop: "20px" }}
    >
      <thead>
        <tr style={{ backgroundColor: "#f2f2f2" }}>
          {columns.map((col, index) => (
            <th
              key={index}
              style={{
                border: "1px solid #ddd",
                padding: "8px",
                textAlign: "left",
              }}
            >
              {col}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, rowIndex) => (
          <tr
            key={rowIndex}
            style={{
              backgroundColor:
                striped && rowIndex % 2 === 1 ? "#f9f9f9" : "#fff",
            }}
          >
            {Object.values(row).map((val, cellIndex) => (
              <td
                key={cellIndex}
                style={{ border: "1px solid #ddd", padding: "8px" }}
              >
                {val}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
