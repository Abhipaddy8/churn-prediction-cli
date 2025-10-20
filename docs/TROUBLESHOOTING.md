# Troubleshooting Guide

## Common Issues and Solutions

### 1. Installation Issues

#### Python Not Found
**Error**: `python3: command not found`

**Solution**:
```bash
# Install Python 3
# macOS
brew install python3

# Ubuntu/Debian
sudo apt update
sudo apt install python3 python3-pip

# Windows
# Download from https://python.org
```

#### Node.js Version Issues
**Error**: `Node.js version must be >= 12.0.0`

**Solution**:
```bash
# Check current version
node --version

# Install/update Node.js
# macOS
brew install node

# Ubuntu/Debian
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Windows
# Download from https://nodejs.org
```

#### Python Dependencies Missing
**Error**: `ModuleNotFoundError: No module named 'pandas'`

**Solution**:
```bash
# Install required packages
pip install -r requirements.txt

# Or install individually
pip install pandas numpy scikit-learn
```

### 2. File Issues

#### File Not Found
**Error**: `File not found: data.csv`

**Solutions**:
- Check file path is correct
- Use absolute path: `/full/path/to/data.csv`
- Check file permissions
- Ensure file exists in current directory

#### Invalid CSV Format
**Error**: `Invalid CSV format` or `Could not read file`

**Solutions**:
- Ensure file is valid CSV (comma-separated)
- Check for proper headers
- Remove special characters from column names
- Ensure file is not empty
- Check file encoding (should be UTF-8)

#### Missing Required Columns
**Error**: `Could not find a column for required key 'feature_logins'`

**Solutions**:
- Ensure CSV has required column types:
  - Customer ID (customer_id, id, etc.)
  - Login data (sessions, logins, etc.)
  - Support tickets (tickets, support, etc.)
  - Activity data (last_active, activity, etc.)
  - Financial data (total_spent, ltv, etc.)
  - Contract info (plan_type, contract, etc.)
- Check column names match expected patterns
- Use `--verbose` to see column mapping details

### 3. Data Issues

#### Insufficient Data
**Error**: `Not enough data for analysis`

**Solutions**:
- Ensure CSV has at least 10 rows
- Check for empty rows
- Verify data quality
- Remove rows with missing critical data

#### All Customers Classified as Same Risk
**Warning**: All customers have same risk level

**Solutions**:
- Check data diversity
- Ensure features have sufficient variation
- Verify data preprocessing
- Consider adjusting model parameters

### 4. Performance Issues

#### Slow Processing
**Issue**: Analysis takes too long

**Solutions**:
- Reduce file size (sample data for testing)
- Use fewer files
- Check system resources
- Consider data preprocessing

#### Memory Issues
**Error**: `MemoryError` or system becomes unresponsive

**Solutions**:
- Process smaller files
- Increase system memory
- Use data sampling
- Close other applications

### 5. Output Issues

#### No Output File Generated
**Issue**: Analysis completes but no output file

**Solutions**:
- Check file permissions in output directory
- Verify output path is writable
- Use `--verbose` to see detailed output
- Check for error messages

#### Empty Output File
**Issue**: Output file is empty or has no high-risk customers

**Solutions**:
- Check input data quality
- Verify feature columns are populated
- Adjust churn threshold in configuration
- Use `--verbose` to debug

### 6. Configuration Issues

#### Invalid Configuration File
**Error**: `Invalid JSON in configuration file`

**Solutions**:
- Validate JSON syntax
- Check configuration file format
- Use example configuration as template
- Remove invalid options

#### Configuration Not Applied
**Issue**: Settings not taking effect

**Solutions**:
- Check configuration file path
- Verify file permissions
- Use `--verbose` to see loaded settings
- Check for typos in option names

## Debug Mode

Use `--verbose` flag to get detailed debugging information:

```bash
npm start --verbose data.csv
```

This will show:
- File validation details
- Column mapping process
- Python script execution
- Detailed error messages
- Processing steps

## Getting Help

### Check System Requirements
```bash
# Check Node.js version
node --version

# Check Python version
python3 --version

# Check installed packages
pip list
```

### Test with Sample Data
```bash
# Use provided sample data
npm start examples/sample_data.csv --verbose
```

### Enable Debug Logging
```bash
# Full debug output
npm start --verbose your_data.csv
```

### Check File Permissions
```bash
# Check if files are readable
ls -la your_data.csv

# Check if output directory is writable
ls -la ./
```

## Performance Optimization

### For Large Files
- Use data sampling for initial testing
- Process files in batches
- Consider data preprocessing
- Monitor system resources

### For Multiple Files
- Start with fewer files
- Check file sizes
- Ensure consistent data format
- Use consistent column naming

## Common Error Patterns

### Pattern 1: File Access Issues
```
Error: File not found: [filename]
```
**Always check**: File path, permissions, existence

### Pattern 2: Data Format Issues
```
Error: Could not find column for required key
```
**Always check**: Column names, data types, file format

### Pattern 3: Python Environment Issues
```
Error: python3: command not found
```
**Always check**: Python installation, PATH, dependencies

### Pattern 4: Memory/Performance Issues
```
Error: Process killed or system unresponsive
```
**Always check**: File size, system resources, data complexity

## Still Need Help?

1. **Check the logs**: Use `--verbose` for detailed output
2. **Test with sample data**: Use `examples/sample_data.csv`
3. **Verify system requirements**: Node.js >= 12, Python 3.x
4. **Check file format**: Valid CSV with required columns
5. **Review documentation**: Check README.md and API.md
6. **Open an issue**: Provide error details and system info

## Reporting Issues

When reporting issues, please include:

1. **Error message**: Full error output
2. **Command used**: Exact command that failed
3. **System info**: OS, Node.js version, Python version
4. **File details**: Size, format, sample data (if possible)
5. **Verbose output**: Use `--verbose` flag
6. **Steps to reproduce**: Clear reproduction steps
