# API Documentation

## CLI Interface

### Command Line Arguments

#### Basic Usage
```bash
npm start [options] [files...]
node cli.js [options] [files...]
```

#### Options

| Option | Type | Description | Default |
|--------|------|-------------|---------|
| `-h, --help` | Flag | Show help message | - |
| `-v, --version` | Flag | Show version information | - |
| `-o, --output FILE` | String | Output file path | `churn_prediction_results.csv` |
| `-f, --format FORMAT` | String | Output format (csv, json, html) | `csv` |
| `--verbose` | Flag | Enable verbose logging | `false` |
| `--config FILE` | String | Configuration file path | - |

#### Examples

```bash
# Basic usage
npm start data.csv

# Multiple files
npm start file1.csv file2.csv file3.csv

# Custom output
npm start -o results.csv data.csv

# JSON format
npm start -f json data.csv

# Verbose mode
npm start --verbose data.csv

# Configuration file
npm start --config config.json data.csv
```

## Python Scripts

### mapper.py

**Purpose**: Automatically maps CSV columns to required features for churn prediction.

**Usage**:
```bash
python3 mapper.py file1.csv [file2.csv ...]
```

**Input**: CSV file paths
**Output**: JSON string containing column mappings

**Example Output**:
```json
{
  "id_column": {"column": "customer_id", "file_index": 0},
  "feature_logins": {"column": "sessions_last_30_days", "file_index": 0},
  "feature_tickets": {"column": "support_tickets", "file_index": 0},
  "feature_activity_days": {"column": "last_active", "file_index": 0},
  "feature_ltv": {"column": "total_spent", "file_index": 0},
  "feature_contract_length": {"column": "plan_type", "file_index": 0}
}
```

### pipeline.py

**Purpose**: Runs the machine learning pipeline to predict customer churn.

**Usage**:
```bash
python3 pipeline.py file1.csv [file2.csv ...] column_map_json
```

**Input**: 
- CSV file paths
- Column mapping JSON (from mapper.py)

**Output**: 
- CSV file with churn predictions
- Console message with count of high-risk customers

## Configuration

### Configuration File Format

Create a `config.json` file to customize behavior:

```json
{
  "output": {
    "defaultFormat": "csv",
    "defaultFile": "churn_results.csv"
  },
  "model": {
    "threshold": 0.75,
    "randomState": 42
  },
  "logging": {
    "verbose": false
  }
}
```

### Configuration Options

| Section | Option | Type | Description | Default |
|---------|--------|------|-------------|---------|
| `output` | `defaultFormat` | String | Default output format | `csv` |
| `output` | `defaultFile` | String | Default output filename | `churn_prediction_results.csv` |
| `model` | `threshold` | Number | Churn risk threshold (0-1) | `0.75` |
| `model` | `randomState` | Number | Random seed for reproducibility | `42` |
| `logging` | `verbose` | Boolean | Enable verbose logging | `false` |

## Output Formats

### CSV Format
```csv
Customer_ID,Churn_Probability,Churn_Risk_Status
C002,0.994,RED LIGHT
C003,0.899,RED LIGHT
C006,0.969,RED LIGHT
```

### JSON Format
```json
{
  "results": [
    {
      "customer_id": "C002",
      "churn_probability": 0.994,
      "churn_risk_status": "RED LIGHT"
    },
    {
      "customer_id": "C003", 
      "churn_probability": 0.899,
      "churn_risk_status": "RED LIGHT"
    }
  ],
  "summary": {
    "total_customers": 30,
    "high_risk_customers": 2,
    "analysis_date": "2024-01-15T10:30:00Z"
  }
}
```

### HTML Format
Generates a complete HTML report with:
- Summary statistics
- Interactive charts
- Customer risk table
- Export options

## Error Handling

### Common Error Codes

| Code | Description | Solution |
|------|-------------|----------|
| `1` | File not found | Check file path and permissions |
| `2` | Invalid CSV format | Ensure file is valid CSV with required columns |
| `3` | Python dependency missing | Install required Python packages |
| `4` | Insufficient data | Ensure CSV has enough rows and required columns |
| `5` | Configuration error | Check configuration file format |

### Error Messages

The CLI provides user-friendly error messages with helpful tips:

```
❌ Error: File not found: data.csv
💡 Tip: Make sure the file path is correct and the file exists.
```

## Exit Codes

| Code | Meaning |
|------|---------|
| `0` | Success |
| `1` | General error |
| `2` | Invalid arguments |
| `3` | File system error |
| `4` | Python script error |
| `5` | Configuration error |
