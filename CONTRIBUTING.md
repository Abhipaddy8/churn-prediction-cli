# Contributing to Churn Prediction CLI

Thank you for your interest in contributing to the Churn Prediction CLI! This document provides guidelines and information for contributors.

## Getting Started

### Prerequisites
- Node.js (>= 12.0.0)
- Python 3.x
- Git

### Development Setup

1. **Fork the repository**
   ```bash
   # Fork on GitHub, then clone your fork
   git clone https://github.com/your-username/churn-prediction-cli.git
   cd churn-prediction-cli
   ```

2. **Install dependencies**
   ```bash
   # Node.js dependencies
   npm install
   
   # Python dependencies
   pip install -r requirements.txt
   ```

3. **Test the setup**
   ```bash
   npm test
   npm run demo
   ```

## Development Workflow

### Branch Naming
- `feature/description` - New features
- `bugfix/description` - Bug fixes
- `docs/description` - Documentation updates
- `refactor/description` - Code refactoring

### Commit Messages
Follow conventional commit format:
```
type(scope): description

[optional body]

[optional footer]
```

Types:
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes
- `refactor`: Code refactoring
- `test`: Adding tests
- `chore`: Maintenance tasks

Examples:
```
feat(cli): add progress indicators
fix(pipeline): handle missing data gracefully
docs(readme): update installation instructions
```

## Code Style

### JavaScript/Node.js
- Use ES6+ features
- Follow existing code patterns
- Add JSDoc comments for functions
- Use meaningful variable names

### Python
- Follow PEP 8 style guide
- Use type hints where appropriate
- Add docstrings for functions
- Keep functions focused and small

## Testing

### Running Tests
```bash
# Run all tests
npm test

# Test with sample data
npm run demo

# Test help system
node cli.js --help

# Test with verbose output
node cli.js examples/sample_data.csv --verbose
```

### Adding Tests
- Test new features thoroughly
- Include edge cases
- Test error conditions
- Verify output formats

## Pull Request Process

1. **Create a feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make your changes**
   - Write clean, well-documented code
   - Add tests for new functionality
   - Update documentation as needed

3. **Test your changes**
   ```bash
   npm test
   npm run demo
   ```

4. **Commit your changes**
   ```bash
   git add .
   git commit -m "feat: add your feature description"
   ```

5. **Push to your fork**
   ```bash
   git push origin feature/your-feature-name
   ```

6. **Create a Pull Request**
   - Use the provided PR template
   - Describe your changes clearly
   - Link any related issues
   - Request review from maintainers

## Code Review Process

### For Contributors
- Respond to feedback promptly
- Make requested changes
- Ask questions if feedback is unclear
- Keep PRs focused and small

### For Reviewers
- Be constructive and helpful
- Test the changes locally
- Check for security issues
- Verify documentation updates

## Issue Guidelines

### Bug Reports
- Use the bug report template
- Include steps to reproduce
- Provide system information
- Include error messages

### Feature Requests
- Use the feature request template
- Describe the use case
- Consider implementation complexity
- Discuss with maintainers first

## Release Process

### Version Numbering
We follow [Semantic Versioning](https://semver.org/):
- `MAJOR`: Breaking changes
- `MINOR`: New features (backward compatible)
- `PATCH`: Bug fixes (backward compatible)

### Release Checklist
- [ ] Update version in `package.json`
- [ ] Update `CHANGELOG.md`
- [ ] Run full test suite
- [ ] Update documentation
- [ ] Create release notes
- [ ] Tag the release

## Community Guidelines

### Code of Conduct
- Be respectful and inclusive
- Help others learn and grow
- Focus on constructive feedback
- Follow the project's mission

### Getting Help
- Check existing documentation
- Search existing issues
- Ask questions in discussions
- Join community channels

## Development Tips

### Local Development
```bash
# Install globally for testing
npm run install-global

# Test with your changes
churn-predict --help
churn-predict examples/sample_data.csv
```

### Debugging
```bash
# Use verbose mode
node cli.js --verbose your_data.csv

# Check Python script output
python3 mapper.py examples/sample_data.csv
python3 pipeline.py examples/sample_data.csv
```

### Performance Testing
- Test with large datasets
- Monitor memory usage
- Check processing time
- Optimize bottlenecks

## Areas for Contribution

### High Priority
- Additional output formats (JSON, HTML)
- Configuration file support
- More ML algorithms
- Performance optimizations

### Medium Priority
- Web interface
- API endpoints
- Docker support
- Additional data sources

### Low Priority
- GUI application
- Mobile app
- Cloud integration
- Advanced analytics

## Recognition

Contributors will be recognized in:
- README.md contributors section
- Release notes
- Project documentation
- Community highlights

Thank you for contributing to the Churn Prediction CLI! 🚀
