/**
 * 
 *
 * Get Information a on single person's data using the PDL API
 * @param {Object} data - Person Parameters (email, name, etc.)
 * @returns {Object} Person - Enriched person JSON object
 */
function getPersonInformation(data) {
  if (!pdlConnection || !pdlConnection.apiKey) {
    throw new Error("PDL connection not established. Call createConnection() first.");
  }
  
  let url = "https://api.peopledatalabs.com/v5/person/enrich";
  let options = {
    method : 'get',
    headers: {
      "X-API-KEY": pdlConnection.apiKey,
      "Accept": "application/json",
      "content-type": "application/json"
    },
    payload: JSON.stringify(data),
    muteHttpExceptions: true
  };
  let res = UrlFetchApp.fetch(url, options);
  res = res.getContentText();
  let json = JSON.parse(res);
  return json;
}

/**
 * Get Person information in bulk (up to 100 records)
 *
 * Get multiple people's data using the PDL API
 * @param {Array} data - Array of Person Parameters
 * @returns {Array} Person - Array of enriched person JSON objects
 */
function bulkPersonInformation(data) {
  if (!pdlConnection || !pdlConnection.apiKey) {
    throw new Error("PDL connection not established. Call createConnection() first.");
  }
  
  if (!Array.isArray(data) || data.length > 100) {
    throw new Error("Data must be an array with maximum 100 records.");
  }
  
  let url = "https://api.peopledatalabs.com/v5/person/bulk";
  let options = {
    method : 'post',
    headers: {
      "X-API-KEY": pdlConnection.apiKey,
      "Accept": "application/json",
      "content-type": "application/json"
    },
    payload: JSON.stringify(data),
    muteHttpExceptions: true
  };
  let res = UrlFetchApp.fetch(url, options);
  res = res.getContentText();
  let json = JSON.parse(res);
  return json;
}