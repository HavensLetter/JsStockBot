const fs = require('fs');

// Load config JSON
const config = JSON.parse(fs.readFileSync('stockbot-config.json', 'utf8'));

// Load sample data JSON
const sampleData = JSON.parse(fs.readFileSync('stockbot-sampledata.json', 'utf8'));

console.log(`Running bot: ${config.botName}`);

if (!config.enabled) {
  console.log('Bot is disabled. Exiting...');
  process.exit(0);
}

console.log('Watching stocks:', config.watchList.join(', '));

for (const stock in sampleData) {
  console.log(`\nData for ${stock}:`);
  sampleData[stock].forEach(day => {
    console.log(`  Date: ${day.date}, Close: ${day.close}`);
  });
}

const threshold = config.tradeThresholdPercent;
console.log(`\nChecking for price changes above ${threshold}% threshold:`);

for (const stock in sampleData) {
  const dataPoints = sampleData[stock];
  for (let i = 1; i < dataPoints.length; i++) {
    const prevClose = dataPoints[i - 1].close;
    const currClose = dataPoints[i].close;
    const changePercent = ((currClose - prevClose) / prevClose) * 100;
    if (Math.abs(changePercent) >= threshold) {
      console.log(`  Alert: ${stock} price changed by ${changePercent.toFixed(2)}% on ${dataPoints[i].date}`);
    }
  }
}