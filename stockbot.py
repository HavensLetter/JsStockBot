import json

# Load config file
with open('stockbot-config.json', 'r') as f:
    config = json.load(f)

# Load sample data file
with open('stockbot-sampledata.json', 'r') as f:
    sample_data = json.load(f)

# Print bot name from config
print(f"Running bot: {config['botName']}")

# Check if bot is enabled
if not config['enabled']:
    print("Bot is disabled. Exiting...")
    exit()

# Print watch list
print("Watching stocks:", ", ".join(config['watchList']))

# Loop through sample data and print closing prices
for stock, data_points in sample_data.items():
    print(f"\nData for {stock}:")
    for day in data_points:
        print(f"  Date: {day['date']}, Close: {day['close']}")

# Example: Check if any stock closed above a threshold (simplified)
threshold = config['tradeThresholdPercent']
print(f"\nChecking for price changes above {threshold}% threshold:")
for stock, data_points in sample_data.items():
    for i in range(1, len(data_points)):
        prev_close = data_points[i-1]['close']
        curr_close = data_points[i]['close']
        change_percent = ((curr_close - prev_close) / prev_close) * 100
        if abs(change_percent) >= threshold:
            print(f"  Alert: {stock} price changed by {change_percent:.2f}% on {data_points[i]['date']}")