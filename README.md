# Churn Prediction CLI

[![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)](https://github.com/your-org/churn-prediction-cli)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)
[![Node.js](https://img.shields.io/badge/node.js-%3E%3D12.0.0-brightgreen.svg)](https://nodejs.org/)

A professional command-line tool for customer churn prediction using machine learning. Analyze your customer data to identify high-risk customers and take proactive retention measures.

## 🚀 Features

- **Flexible Input**: Process single or multiple CSV files
- **Smart Column Mapping**: Automatically detects relevant columns in your data
- **Machine Learning Pipeline**: Uses logistic regression for churn prediction
- **Professional UX**: Beautiful progress indicators, colored output, and helpful error messages
- **Multiple Output Formats**: CSV, JSON, and HTML report generation
- **Interactive & Non-Interactive Modes**: Use via command line or interactive prompts
- **Comprehensive Help System**: Built-in help and usage examples

## 📦 Installation

### Prerequisites

- Node.js (>= 12.0.0)
- Python 3.x
- Required Python packages (see [requirements.txt](requirements.txt))

### Install Python Dependencies

```bash
pip install -r requirements.txt
```

### Install CLI Tool

#### Global Installation (Recommended)
```bash
npm install -g .
```

#### Local Installation
```bash
npm install
```

## 🎯 Quick Start

### Interactive Mode
```bash
npm start
# Follow the prompts to add your CSV files
```

### Command Line Mode
```bash
# Single file
npm start data.csv

# Multiple files
npm start data1.csv data2.csv data3.csv

# Custom output
npm start -o results.csv data.csv

# Verbose output
npm start --verbose data.csv
```

## 📊 Required Data Format

Your CSV files should contain the following types of columns:

| Column Type | Examples | Description |
|-------------|----------|-------------|
| **Customer ID** | `customer_id`, `id`, `customer-id` | Unique identifier for each customer |
| **Login Data** | `sessions`, `logins`, `sessions_last_30_days` | User activity/engagement metrics |
| **Support Tickets** | `tickets`, `support`, `support_tickets` | Customer support interactions |
| **Activity Data** | `last_active`, `activity`, `last_activity` | Recent customer activity |
| **Financial Data** | `total_spent`, `ltv`, `monthly_charges` | Customer value metrics |
| **Contract Info** | `plan_type`, `contract`, `term` | Subscription/plan information |

### Sample Data Structure

```csv
customer_id,sessions_last_30_days,support_tickets,last_active,total_spent,plan_type
C001,45,2,5,1500,Premium
C002,12,8,25,800,Basic
C003,67,1,2,2200,Premium
```

## 🛠️ Usage

### Command Line Options

```bash
npm start [options] [files...]
```

| Option | Description |
|--------|-------------|
| `-h, --help` | Show help message |
| `-v, --version` | Show version information |
| `-o, --output FILE` | Specify output file (default: `churn_prediction_results.csv`) |
| `-f, --format FORMAT` | Output format: `csv`, `json`, `html` (default: `csv`) |
| `--verbose` | Show detailed debug information |
| `--config FILE` | Use configuration file |

### Examples

```bash
# Basic usage
npm start customer_data.csv

# Multiple files with custom output
npm start -o high_risk_customers.csv data1.csv data2.csv

# JSON output for API integration
npm start -f json data.csv

# Verbose mode for debugging
npm start --verbose data.csv

# Interactive mode
npm start
```

## 📈 Output

The tool generates a CSV file with the following columns:

- **Customer_ID**: Customer identifier
- **Churn_Probability**: Probability score (0-1) indicating churn risk
- **Churn_Risk_Status**: Risk classification (`RED LIGHT` for high-risk customers)

### Sample Output

```csv
Customer_ID,Churn_Probability,Churn_Risk_Status
C002,0.994,RED LIGHT
C003,0.899,RED LIGHT
C006,0.969,RED LIGHT
```

## 🔧 Configuration

### Configuration File

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

Use with: `npm start --config config.json data.csv`

## 🧪 Testing

```bash
# Test help system
npm test

# Run demo with sample data
npm run demo

# Test with your own data
npm start your_data.csv --verbose
```

## 📁 Project Structure

```
churn-prediction-cli/
├── cli.js                 # Main CLI application
├── mapper.py              # Column mapping logic
├── pipeline.py            # ML pipeline
├── package.json           # Node.js configuration
├── requirements.txt       # Python dependencies
├── README.md             # This file
├── LICENSE               # MIT License
├── .gitignore            # Git ignore rules
├── examples/             # Sample data files
│   ├── sample_data.csv
│   └── multi_file_example/
└── docs/                 # Additional documentation
    ├── API.md
    └── TROUBLESHOOTING.md
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

- **Documentation**: Check the [docs/](docs/) folder
- **Issues**: [GitHub Issues](https://github.com/your-org/churn-prediction-cli/issues)
- **Discussions**: [GitHub Discussions](https://github.com/your-org/churn-prediction-cli/discussions)

## 🙏 Acknowledgments

- Built with Node.js and Python
- Uses scikit-learn for machine learning
- Inspired by modern CLI design principles

---

**Made with ❤️ for data-driven customer retention**
