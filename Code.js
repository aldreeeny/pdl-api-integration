/**
 * People Data Labs (PDL) API Connection Class
 * 
 * This class handles the connection to the PDL API.
 * Replace 'YOUR_PDL_API_KEY_HERE' with your actual API key.
 */
class PDL {
  constructor(apiKey){
    this.apiKey_ = apiKey;
  }
  get apiKey () {
    return this.apiKey_;
  }
}

let pdlConnection;

/**
 * Creates a connection to the PDL API
 * @param {string} apiKey - Your PDL API key
 */
function createConnection (apiKey) {
  pdlConnection = new PDL(apiKey);
}
