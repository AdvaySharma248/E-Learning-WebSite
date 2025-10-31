// Utility function to convert JSON data to CSV format
const jsonToCSV = (data, headers) => {
  // Create header row
  const headerRow = headers.map(header => `"${header}"`).join(',');
  
  // Create data rows
  const dataRows = data.map(row => {
    return headers.map(header => {
      const value = row[header];
      // Handle values that might contain commas or quotes
      if (typeof value === 'string') {
        return `"${value.replace(/"/g, '""')}"`;
      }
      return `"${value}"`;
    }).join(',');
  });
  
  // Combine header and data rows
  return [headerRow, ...dataRows].join('\n');
};

module.exports = { jsonToCSV };