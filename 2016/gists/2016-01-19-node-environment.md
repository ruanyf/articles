# Node 开发环境搭建

```bash
# Install Node.JS and NPM
sudo apt-get install nodejs npm

# Setup NPM
npm config set prefix '~/.npm-packages'
export PATH="$PATH:$HOME/.npm-packages/bin"

# Install forever and npm-proxy-cache
npm install -g forever

# Start
forever /path/to/your/script
```
