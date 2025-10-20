import pandas as pd
import json
import argparse
import sys

def find_column_and_file(files, headers_list, keywords):
    for i, headers in enumerate(headers_list):
        for header in headers:
            for keyword in keywords:
                if keyword in header.lower():
                    return header, i
    return None, -1

def main():
    parser = argparse.ArgumentParser(description='Heuristically map CSV columns.')
    parser.add_argument('files', nargs='+', help='Path(s) to CSV file(s)')
    args = parser.parse_args()

    files = args.files
    headers_list = []
    for file_path in files:
        if file_path and file_path.strip():  # Only process non-empty file paths
            try:
                headers_list.append(pd.read_csv(file_path, nrows=0).columns.tolist())
            except (FileNotFoundError, pd.errors.EmptyDataError) as e:
                print(f"Warning: Could not read {file_path}. Error: {e}", file=sys.stderr)
                headers_list.append([]) # Append empty list and continue
        else:
            headers_list.append([]) # Append empty list for empty file paths

    schema = {
        'id_column': ['id', 'identifier', 'cust', 'customer'],
        'feature_logins': ['login', 'log-in', 'access', 'session'],
        'feature_tickets': ['ticket', 'support', 'case'],
        'feature_activity_days': ['activity', 'active', 'seen', 'last_active'],
        'feature_is_active': ['is_active'],
        'feature_ltv': ['ltv', 'lifetime', 'total_spent'],
        'feature_monthly_spend': ['monthly', 'spend'],
        'feature_contract_length': ['contract', 'term', 'plan']
    }

    mapping = {}
    for key, keywords in schema.items():
        col_name, file_idx = find_column_and_file(files, headers_list, keywords)
        if col_name:
            mapping[key] = {"column": col_name, "file_index": file_idx}

    # Basic validation
    required_keys = ['id_column', 'feature_logins', 'feature_tickets', 'feature_activity_days']
    for key in required_keys:
        if key not in mapping:
            print(f"Error: Could not find a column for required key '{key}'", file=sys.stderr)
            sys.exit(1)

    print(json.dumps(mapping))

if __name__ == '__main__':
    main()
