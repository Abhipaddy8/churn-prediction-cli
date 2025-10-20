const readline = require('readline');
const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

// CLI Configuration
const CONFIG = {
  version: '1.0.0',
  name: 'churn-prediction-cli',
  description: 'A professional CLI tool for customer churn prediction using machine learning',
  defaultOutputFile: 'churn_prediction_results.csv',
  supportedFormats: ['csv', 'json', 'html']
};

// Colors for better output
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m'
};

// Progress indicator
class ProgressIndicator {
  constructor(message) {
    this.message = message;
    this.spinner = ['⠋', '⠙', '⠹', '⠸', '⠼', '⠴', '⠦', '⠧', '⠇', '⠏'];
    this.current = 0;
    this.interval = null;
  }

  start() {
    process.stdout.write(`${colors.cyan}${this.spinner[this.current]} ${this.message}${colors.reset}`);
    this.interval = setInterval(() => {
      process.stdout.write('\r');
      this.current = (this.current + 1) % this.spinner.length;
      process.stdout.write(`${colors.cyan}${this.spinner[this.current]} ${this.message}${colors.reset}`);
    }, 100);
  }

  stop(success = true) {
    if (this.interval) {
      clearInterval(this.interval);
      process.stdout.write('\r');
      const status = success ? `${colors.green}✓${colors.reset}` : `${colors.red}✗${colors.reset}`;
      console.log(`${status} ${this.message}`);
    }
  }
}

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Help system
function showHelp() {
  console.log(`${colors.bright}${colors.blue}${CONFIG.name} v${CONFIG.version}${colors.reset}`);
  console.log(`${colors.bright}${CONFIG.description}${colors.reset}\n`);
  
  console.log(`${colors.bright}USAGE:${colors.reset}`);
  console.log(`  npm start [options] [files...]`);
  console.log(`  node cli.js [options] [files...]\n`);
  
  console.log(`${colors.bright}OPTIONS:${colors.reset}`);
  console.log(`  -h, --help           Show this help message`);
  console.log(`  -v, --version        Show version information`);
  console.log(`  -o, --output FILE    Specify output file (default: ${CONFIG.defaultOutputFile})`);
  console.log(`  -f, --format FORMAT  Output format: csv, json, html (default: csv)`);
  console.log(`  --verbose            Show detailed debug information`);
  console.log(`  --config FILE        Use configuration file\n`);
  
  console.log(`${colors.bright}EXAMPLES:${colors.reset}`);
  console.log(`  ${colors.cyan}npm start${colors.reset}                                    # Interactive mode`);
  console.log(`  ${colors.cyan}npm start data.csv${colors.reset}                          # Single file`);
  console.log(`  ${colors.cyan}npm start data1.csv data2.csv${colors.reset}               # Multiple files`);
  console.log(`  ${colors.cyan}npm start -o results.csv data.csv${colors.reset}           # Custom output`);
  console.log(`  ${colors.cyan}npm start -f json data.csv${colors.reset}                  # JSON output\n`);
  
  console.log(`${colors.bright}REQUIRED CSV COLUMNS:${colors.reset}`);
  console.log(`  • Customer ID column (customer_id, id, etc.)`);
  console.log(`  • Login/session data (sessions, logins, etc.)`);
  console.log(`  • Support tickets (tickets, support, etc.)`);
  console.log(`  • Activity data (last_active, activity, etc.)`);
  console.log(`  • Financial data (total_spent, ltv, etc.)`);
  console.log(`  • Contract info (plan_type, contract, etc.)\n`);
  
  console.log(`${colors.bright}For more information, visit: https://github.com/your-org/churn-prediction-cli${colors.reset}`);
}

function showVersion() {
  console.log(`${CONFIG.name} v${CONFIG.version}`);
}

// Argument parsing
function parseArgs(args) {
  const options = {
    files: [],
    output: CONFIG.defaultOutputFile,
    format: 'csv',
    verbose: false,
    config: null,
    help: false,
    version: false
  };

  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    
    switch (arg) {
      case '-h':
      case '--help':
        options.help = true;
        break;
      case '-v':
      case '--version':
        options.version = true;
        break;
      case '-o':
      case '--output':
        options.output = args[++i];
        break;
      case '-f':
      case '--format':
        const format = args[++i];
        if (!CONFIG.supportedFormats.includes(format)) {
          console.error(`${colors.red}Error: Unsupported format '${format}'. Supported formats: ${CONFIG.supportedFormats.join(', ')}${colors.reset}`);
          process.exit(1);
        }
        options.format = format;
        break;
      case '--verbose':
        options.verbose = true;
        break;
      case '--config':
        options.config = args[++i];
        break;
      default:
        if (!arg.startsWith('-')) {
          options.files.push(arg);
        }
        break;
    }
  }

  return options;
}

// File validation
function validateFile(filePath) {
  if (!fs.existsSync(filePath)) {
    throw new Error(`File not found: ${filePath}`);
  }
  
  if (!filePath.toLowerCase().endsWith('.csv')) {
    throw new Error(`File must be a CSV file: ${filePath}`);
  }
  
  try {
    const stats = fs.statSync(filePath);
    if (stats.size === 0) {
      throw new Error(`File is empty: ${filePath}`);
    }
  } catch (error) {
    throw new Error(`Cannot read file: ${filePath}`);
  }
  
  return true;
}

function runScript(scriptPath, args, verbose = false) {
    if (verbose) {
        console.log(`${colors.yellow}[DEBUG]${colors.reset} Spawning: python3 ${scriptPath} ${args.join(' ')}`);
    }
    
    return new Promise((resolve, reject) => {
        const process = spawn('python3', [scriptPath, ...args]);
        let result = '';
        let error = '';

        process.stdout.on('data', (data) => {
            result += data.toString();
        });

        process.stderr.on('data', (data) => {
            error += data.toString();
        });

        process.on('close', (code) => {
            if (verbose) {
                console.log(`${colors.yellow}[DEBUG]${colors.reset} Script ${scriptPath} finished with code ${code}`);
            }
            if (code !== 0) {
                return reject(new Error(`Script ${scriptPath} exited with code ${code}:\n${error}`));
            }
            resolve(result.trim());
        });
    });
}

async function runPipeline(paths, options) {
    const progress1 = new ProgressIndicator('Analyzing CSV structure...');
    const progress2 = new ProgressIndicator('Running machine learning pipeline...');
    
    try {
        // Validate all files first
        for (const filePath of paths) {
            validateFile(filePath);
        }
        
        progress1.start();
        const columnMapJson = await runScript('mapper.py', paths, options.verbose);
        progress1.stop(true);
        
        if (options.verbose) {
            console.log(`${colors.blue}Column mapping:${colors.reset} ${columnMapJson}`);
        }

        progress2.start();
        const pipelineResult = await runScript('pipeline.py', [...paths, columnMapJson], options.verbose);
        progress2.stop(true);
        
        // Parse the result to get the count
        const match = pipelineResult.match(/(\d+) high-risk customers identified/);
        const count = match ? match[1] : 'unknown';
        
        console.log(`\n${colors.green}${colors.bright}✅ Analysis Complete!${colors.reset}`);
        console.log(`${colors.green}📊 Found ${count} high-risk customers${colors.reset}`);
        console.log(`${colors.blue}📁 Results saved to: ${options.output}${colors.reset}`);
        
        if (options.verbose) {
            console.log(`\n${colors.yellow}Full output:${colors.reset}\n${pipelineResult}`);
        }

    } catch (error) {
        progress1.stop(false);
        progress2.stop(false);
        console.error(`\n${colors.red}${colors.bright}❌ Error:${colors.reset} ${error.message}`);
        
        // Provide helpful suggestions
        if (error.message.includes('File not found')) {
            console.error(`${colors.yellow}💡 Tip:${colors.reset} Make sure the file path is correct and the file exists.`);
        } else if (error.message.includes('CSV')) {
            console.error(`${colors.yellow}💡 Tip:${colors.reset} Make sure your file is a valid CSV with the required columns.`);
        } else if (error.message.includes('python3')) {
            console.error(`${colors.yellow}💡 Tip:${colors.reset} Make sure Python 3 is installed and accessible.`);
        }
        
        process.exit(1);
    }
}

async function collectFiles() {
    return new Promise((resolve) => {
        const paths = [];
        let fileCount = 1;

        function askForFile() {
            const prompt = fileCount === 1 
                ? `${colors.cyan}Enter the path to the first CSV file:${colors.reset} `
                : `${colors.cyan}Enter the path to CSV file #${fileCount} (or press Enter to finish):${colors.reset} `;
            
            rl.question(prompt, (input) => {
                const path = input.trim();
                
                if (path === '') {
                    // User pressed Enter to finish
                    if (paths.length === 0) {
                        console.log(`${colors.red}❌ No files provided. Please provide at least one CSV file.${colors.reset}`);
                        askForFile();
                        return;
                    }
                    console.log(`${colors.green}✓${colors.reset} Collected ${paths.length} file(s)`);
                    rl.close();
                    resolve(paths);
                    return;
                }
                
                // Validate file as user enters it
                try {
                    validateFile(path);
                    paths.push(path);
                    console.log(`${colors.green}✓${colors.reset} Added: ${path}`);
                    fileCount++;
                } catch (error) {
                    console.log(`${colors.red}✗${colors.reset} ${error.message}`);
                    console.log(`${colors.yellow}Please try again.${colors.reset}`);
                }
                
                askForFile();
            });
        }
        
        askForFile();
    });
}

async function main() {
    const args = process.argv.slice(2);
    const options = parseArgs(args);
    
    // Handle help and version flags
    if (options.help) {
        showHelp();
        return;
    }
    
    if (options.version) {
        showVersion();
        return;
    }
    
    // Show welcome message
    console.log(`${colors.bright}${colors.blue}${CONFIG.name} v${CONFIG.version}${colors.reset}`);
    console.log(`${colors.bright}${CONFIG.description}${colors.reset}\n`);
    
    let paths = [];
    
    if (options.files.length > 0) {
        // Non-interactive mode: use provided files
        paths = options.files;
        console.log(`${colors.blue}📁 Processing ${paths.length} file(s) in non-interactive mode${colors.reset}\n`);
    } else {
        // Interactive mode: collect files dynamically
        console.log(`${colors.blue}📁 Interactive mode - Add CSV files for analysis${colors.reset}`);
        console.log(`${colors.yellow}💡 Tip: Press Enter when you're done adding files${colors.reset}\n`);
        paths = await collectFiles();
    }
    
    if (paths.length === 0) {
        console.error(`${colors.red}❌ No files provided. Use --help for usage information.${colors.reset}`);
        process.exit(1);
    }
    
    console.log(`\n${colors.blue}🚀 Starting churn prediction analysis...${colors.reset}`);
    await runPipeline(paths, options);
}

// Handle uncaught exceptions gracefully
process.on('uncaughtException', (error) => {
    console.error(`\n${colors.red}${colors.bright}❌ Unexpected Error:${colors.reset} ${error.message}`);
    console.error(`${colors.yellow}💡 Tip: Use --verbose for more details or --help for usage information${colors.reset}`);
    process.exit(1);
});

process.on('unhandledRejection', (error) => {
    console.error(`\n${colors.red}${colors.bright}❌ Unexpected Error:${colors.reset} ${error.message}`);
    process.exit(1);
});

main();
