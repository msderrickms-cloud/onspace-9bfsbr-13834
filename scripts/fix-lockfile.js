const { execSync } = require('child_process');
const { existsSync, unlinkSync } = require('fs');

const cwd = '/vercel/share/v0-project';

// Remove any pnpm lock file
const pnpmLock = cwd + '/pnpm-lock.yaml';
if (existsSync(pnpmLock)) {
  console.log('Removing pnpm-lock.yaml...');
  unlinkSync(pnpmLock);
}

// Remove bun lock file if present
const bunLock = cwd + '/bun.lock';
if (existsSync(bunLock)) {
  console.log('Removing bun.lock...');
  unlinkSync(bunLock);
}

// Remove stale package-lock.json and node_modules
console.log('Removing node_modules and package-lock.json...');
try { execSync('rm -rf node_modules package-lock.json', { cwd, stdio: 'inherit' }); } catch(e) {}

console.log('Running npm install to generate a fresh package-lock.json...');
execSync('npm install --legacy-peer-deps', { cwd, stdio: 'inherit', timeout: 180000 });

console.log('Verifying package-lock.json exists...');
if (existsSync(cwd + '/package-lock.json')) {
  console.log('SUCCESS: package-lock.json has been regenerated.');
} else {
  console.error('ERROR: package-lock.json was not created!');
  process.exit(1);
}
