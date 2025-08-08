# People Data Labs (PDL) API Integration

A Google Apps Script solution for integrating with the People Data Labs (PDL) API to enrich person data with professional information, contact details, and social profiles.

## Features

- **Single Person Enrichment**: Enrich individual person records with professional data
- **Bulk Person Enrichment**: Process up to 100 records at once for efficiency
- **Professional Data**: Access to job titles, company information, social profiles
- **Contact Information**: Email addresses, phone numbers, and social media profiles
- **Error Handling**: Comprehensive error checking and validation
- **Easy Integration**: Simple setup with Google Apps Script

## Prerequisites

- Google Apps Script project
- People Data Labs (PDL) API account and key
- Basic knowledge of JavaScript and Google Apps Script

## Setup Instructions

### 1. Google Apps Script Project Setup

1. Create a new Google Apps Script project
2. Copy the code from both files into your project:
   - `Code.js` - PDL connection class and setup
   - `Functions.js` - API functions for data enrichment

### 2. People Data Labs API Setup

1. Sign up for a People Data Labs account at [peopledatalabs.com](https://peopledatalabs.com)
2. Get your API key from the dashboard
3. Initialize the connection in your script:
   ```javascript
   createConnection("YOUR_PDL_API_KEY_HERE");
   ```

### 3. API Key Configuration

Replace the placeholder with your actual PDL API key:
```javascript
// In your main script
createConnection("your_actual_api_key_here");
```

## Usage

### Single Person Enrichment

```javascript
// Initialize connection
createConnection("YOUR_PDL_API_KEY_HERE");

// Enrich a single person
const personData = {
  email: "john.doe@example.com",
  name: "John Doe"
};

const enrichedData = personEnrich(personData);
console.log(enrichedData);
```

### Bulk Person Enrichment

```javascript
// Initialize connection
createConnection("YOUR_PDL_API_KEY_HERE");

// Enrich multiple people (up to 100)
const peopleData = [
  {
    email: "john.doe@example.com",
    name: "John Doe"
  },
  {
    email: "jane.smith@example.com",
    name: "Jane Smith"
  }
];

const enrichedData = bulkPersonEnrich(peopleData);
console.log(enrichedData);
```

## API Parameters

### Input Parameters

The PDL API accepts various parameters for person enrichment:

| Parameter | Type | Description | Required |
|-----------|------|-------------|----------|
| `email` | string | Email address | Yes (if no name) |
| `name` | string | Full name | Yes (if no email) |
| `first_name` | string | First name | No |
| `last_name` | string | Last name | No |
| `company` | string | Company name | No |
| `job_title` | string | Job title | No |
| `phone` | string | Phone number | No |
| `linkedin_url` | string | LinkedIn profile URL | No |

### Response Data

The API returns enriched person data including:

- **Professional Information**: Job title, company, industry
- **Contact Details**: Email addresses, phone numbers
- **Social Profiles**: LinkedIn, Twitter, Facebook profiles
- **Location Data**: City, state, country
- **Education**: Schools, degrees, graduation years
- **Skills**: Professional skills and expertise

## Functions Overview

### Core Functions

- `createConnection(apiKey)`: Establishes connection to PDL API
- `personEnrich(data)`: Enriches a single person's data
- `bulkPersonEnrich(data)`: Enriches multiple people's data (up to 100)

### Error Handling

The functions include comprehensive error handling:
- API key validation
- Connection status checking
- Input data validation
- Bulk processing limits

## Example Use Cases

### 1. Lead Enrichment

```javascript
// Enrich leads from a spreadsheet
function enrichLeads() {
  const sheet = SpreadsheetApp.getActiveSheet();
  const data = sheet.getDataRange().getValues();
  
  createConnection("YOUR_API_KEY");
  
  data.forEach((row, index) => {
    if (row[0]) { // Email column
      const enriched = personEnrich({ email: row[0] });
      // Process enriched data
      console.log(enriched);
    }
  });
}
```

### 2. Contact Database Enhancement

```javascript
// Enhance existing contact database
function enhanceContacts() {
  const contacts = [
    { email: "contact1@example.com" },
    { email: "contact2@example.com" },
    { name: "John Doe", company: "Example Corp" }
  ];
  
  createConnection("YOUR_API_KEY");
  const enriched = bulkPersonEnrich(contacts);
  
  // Save to spreadsheet
  const sheet = SpreadsheetApp.getActiveSheet();
  enriched.data.forEach(person => {
    sheet.appendRow([
      person.email,
      person.name,
      person.job_title,
      person.company_name
    ]);
  });
}
```

### 3. Sales Prospecting

```javascript
// Find prospects with specific criteria
function findProspects() {
  const prospects = [
    { name: "John Doe", company: "Tech Corp" },
    { email: "jane@startup.com" }
  ];
  
  createConnection("YOUR_API_KEY");
  const enriched = bulkPersonEnrich(prospects);
  
  // Filter by criteria
  const qualified = enriched.data.filter(person => 
    person.job_title && 
    person.job_title.toLowerCase().includes("manager")
  );
  
  console.log(qualified);
}
```

## Configuration

### API Limits

- **Single Enrichment**: No limit on individual requests
- **Bulk Enrichment**: Maximum 100 records per request
- **Rate Limits**: Check your PDL plan for specific limits

### Error Codes

Common error responses:
- `401`: Invalid API key
- `400`: Invalid request parameters
- `429`: Rate limit exceeded
- `500`: Server error

## Security Considerations

- **API Keys**: Never commit API keys to version control
- **Data Privacy**: Ensure compliance with data protection regulations
- **Access Control**: Restrict script access to authorized users
- **Data Handling**: Securely process and store enriched data

## Best Practices

### 1. Connection Management

```javascript
// Initialize once at the start
createConnection("YOUR_API_KEY");

// Use throughout your script
const result = personEnrich({ email: "test@example.com" });
```

### 2. Error Handling

```javascript
try {
  const result = personEnrich({ email: "test@example.com" });
  if (result.status === 200) {
    console.log(result.data);
  } else {
    console.error("Enrichment failed:", result.error);
  }
} catch (error) {
  console.error("API Error:", error.message);
}
```

### 3. Bulk Processing

```javascript
// Process in batches for large datasets
function processLargeDataset(emails) {
  const batchSize = 100;
  const results = [];
  
  for (let i = 0; i < emails.length; i += batchSize) {
    const batch = emails.slice(i, i + batchSize);
    const enriched = bulkPersonEnrich(batch);
    results.push(...enriched.data);
    
    // Rate limiting
    Utilities.sleep(1000);
  }
  
  return results;
}
```

## Dependencies

- Google Apps Script runtime V8
- People Data Labs API
- UrlFetchApp service

## License

MIT License

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## Support

For issues and questions:
1. Check the PDL API documentation
2. Verify your API key is correct
3. Review Google Apps Script quotas and limits
4. Test with the PDL API playground

## API Documentation

For detailed API documentation, visit:
- [PDL Person Enrich API](https://docs.peopledatalabs.com/docs/person-enrichment-api)
- [PDL Bulk API](https://docs.peopledatalabs.com/docs/bulk-api) 