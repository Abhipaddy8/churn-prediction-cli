# Churn Prediction CLI

[![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)](https://github.com/equipp/churn-prediction-cli)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)
[![Node.js](https://img.shields.io/badge/node.js-%3E%3D12.0.0-brightgreen.svg)](https://nodejs.org/)

A professional command-line tool for customer churn risk assessment using a behavioral risk scoring system. Analyze your customer data to identify high-risk customers and take proactive retention measures.

## 🚀 Features

- **Flexible Input**: Process single or multiple CSV files
- **Smart Column Mapping**: Automatically detects relevant columns in your data
- **Behavioral Risk Scoring**: Scores churn risk using weighted behavioral signals
- **Professional UX**: Beautiful progress indicators, colored output, and helpful error messages
- **Multiple Output Formats**: CSV, JSON, and HTML report generation
- **Interactive & Non-Interactive Modes**: Use via command line or interactive prompts
- **Comprehensive Help System**: Built-in help and usage examples

## 🧠 Methodology (Transparent Overview)

This tool currently implements a rule-based, behavioral risk scoring approach rather than a fully supervised machine learning model trained on historical churn labels.

- **Signals used**: support tickets, logins/sessions, and recent activity
- **Weighted formula**: tickets (0.4), logins (-0.3), activity (-0.2)
- **Synthetic labels for calibration**: The pipeline generates synthetic churn labels from the weighted score and then fits a logistic regression to translate the score into probabilities. This calibration step does not constitute training on real historical churn outcomes.
- **Output**: A probability-like score and a high-risk flag (RED LIGHT) for prioritization

This design delivers an immediately useful prioritization signal when you lack reliable historical churn labels.

## ⚠️ Disclaimer (v1 Status)

- This is a v1, rule-based system that does not train on real historical churn outcomes.
- We are transparent by design: the weights are configurable and visible in code, and the logistic regression is used purely for probability calibration on synthetic labels.
- Results should be treated as an actionable screening tool, not a statistically validated churn predictor.

## 💡 Why It's Still Useful

Even without historical labels, the behavioral score surfaces customers who exhibit patterns commonly associated with churn (e.g., rising ticket volume, falling engagement). This enables:

- **Proactive retention**: Triage accounts for outreach before churn happens
- **CS ops prioritization**: Focus limited resources on likely-at-risk accounts
- **Early signal**: Provide guidance while you gather and label real churn outcomes

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

After global installation, you can use the `churn-predict` command from anywhere.

#### Local Installation
```bash
npm install
```

For local installation, use `node cli.js` instead of `churn-predict`.

## 🎯 Quick Start

### Interactive Mode
```bash
churn-predict
# Follow the prompts to add your CSV files
```

### Command Line Mode
```bash
# Single file
churn-predict data.csv

# Multiple files
churn-predict data1.csv data2.csv data3.csv

# Custom output
churn-predict -o results.csv data.csv

# Verbose output
churn-predict --verbose data.csv
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
churn-predict [options] [files...]
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
churn-predict customer_data.csv

# Multiple files with custom output
churn-predict -o high_risk_customers.csv data1.csv data2.csv

# JSON output for API integration
churn-predict -f json data.csv

# Verbose mode for debugging
churn-predict --verbose data.csv

# Interactive mode
churn-predict
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

## 🗺️ Roadmap to Full ML

We plan to evolve from rule-based scoring to a fully supervised ML pipeline trained on historical churn outcomes:

1. **Data schema + feature store**: Standardize inputs; persist versioned features
2. **Label ingestion**: Integrate ground-truth churn (cancellations, downgrades, inactivity)
3. **Modeling**: Train and compare calibrated models (logistic regression, gradient boosting, XGBoost, calibrated neural nets)
4. **Evaluation**: Offline validation with temporal splits; business-aligned metrics (recall@k, precision@k, uplift)
5. **Thresholding & policies**: Optimize intervention policies under resource constraints
6. **MLOps**: CI for data/feature tests, model registry, monitored batch scoring with drift detection
7. **Explainability**: Shapley-based attribution and human-readable reasons-for-flag

Until then, the v1 behavioral scoring provides immediate value for prioritizing retention efforts.

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

Use with: `churn-predict --config config.json data.csv`

## 🧪 Testing

```bash
# Test help system
churn-predict --help

# Run demo with sample data
churn-predict examples/sample_data.csv --verbose

# Test with your own data
churn-predict your_data.csv --verbose
```

## 📁 Project Structure

```
churn-prediction-cli/
├── cli.js                 # Main CLI application
├── mapper.py              # Column mapping logic (auto-detects columns)
├── pipeline.py            # Behavioral risk scoring + calibration (v1)
├── package.json           # Node.js configuration
├── requirements.txt       # Python dependencies
├── README.md              # This file
├── LICENSE                # MIT License
├── .gitignore             # Git ignore rules
├── examples/              # Sample data files
│   ├── sample_data.csv
│   └── multi_file_example/
└── docs/                  # Additional documentation
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
- **Issues**: [GitHub Issues](https://github.com/equipp/churn-prediction-cli/issues)
- **Discussions**: [GitHub Discussions](https://github.com/equipp/churn-prediction-cli/discussions)

---

**Made with ❤️ for data-driven customer retention**
