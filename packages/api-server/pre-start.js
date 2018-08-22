const path = require('path');
const fs = require('fs');

const dotEnvFile = path.join(__dirname, '.env');
if (!fs.existsSync(dotEnvFile)) {
  return;
}

const content = fs.readFileSync(dotEnvFile, 'utf8');
content.split('\n').forEach((line) => {
  const trimmedString = line.replace(/export/, '').trim();
  const parts = trimmedString.split('=');
  const key = parts.shift().trim();
  const value = parts.join('=').replace(/"/g, '').trim();
  if (key && value && !process.env[key]) {
    process.env[key] = value;
  }
});
