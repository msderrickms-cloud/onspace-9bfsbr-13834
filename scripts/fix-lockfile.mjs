import { execSync } from 'child_process';

console.log('Removing node_modules and package-lock.json...');
try { execSync('rm -rf node_modules package-lock.json', { cwd: '/vercel/share/v0-project', stdio: 'inherit' }); } catch(e) {}

console.log('Running npm install to regenerate lock file...');
execSync('npm install --legacy-peer-deps', { cwd: '/vercel/share/v0-project', stdio: 'inherit' });

console.log('Done! Lock file regenerated.');
