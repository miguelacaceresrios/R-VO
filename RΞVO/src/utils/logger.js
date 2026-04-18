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

function timestamp() {
    return new Date().toISOString().slice(0, 19).replace('T', ' ');
}

module.exports = {
    info: (msg) => console.log(`${colors.green}[INFO]${colors.reset} ${timestamp()} - ${msg}`),
    error: (msg) => console.error(`${colors.red}[ERROR]${colors.reset} ${timestamp()} - ${msg}`),
    warn: (msg) => console.warn(`${colors.yellow}[WARN]${colors.reset} ${timestamp()} - ${msg}`),
    debug: (msg) => console.debug(`${colors.cyan}[DEBUG]${colors.reset} ${timestamp()} - ${msg}`)
};