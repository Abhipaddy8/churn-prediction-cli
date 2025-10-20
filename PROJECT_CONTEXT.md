# Project Goal: Zero-Config Churn Prediction CLI

This project is a command-line tool that automates the process of training a churn prediction model and identifying high-risk customers. It is designed to be "zero-config" by heuristically mapping the columns from user-provided CSV files to the internal schema required by the machine learning pipeline.

## Required Input Files

The tool requires three separate CSV files:
1.  **Contact Data:** Containing customer identifiers.
2.  **Usage Data:** Containing customer activity metrics.
3.  **Financial Data:** Containing customer financial metrics.

## Architecture Overview

The tool uses a three-stage architecture:
1.  **Node.js CLI (`cli.js`):** The user interacts with this wrapper. It prompts for the file paths and orchestrates the execution of the Python scripts.
2.  **Mapper (`mapper.py`):** This Python script takes the three CSV file paths, reads their headers, and uses heuristics to automatically map the column names to the required internal schema. It outputs a JSON string representing this mapping.
3.  **Pipeline (`pipeline.py`):** This is the core machine learning script. It receives the three file paths and the JSON map from the CLI wrapper. It then dynamically loads the data, trains a logistic regression model, and outputs the prediction files.

## Internal Schema Keys

The `mapper.py` script is responsible for finding and validating the following four essential keys from the input CSVs:
*   `id_column`: The common customer identifier column.
*   `feature_logins`: The column representing customer login counts.
*   `feature_tickets`: The column representing customer support ticket counts.
*   `feature_activity_days`: The column representing the days since the customer's last activity.
