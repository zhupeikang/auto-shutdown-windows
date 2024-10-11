const { exec } = require('child_process');
const http = require('http');
const schedule = require('node-schedule');

function shutdownWindows(delay = 0) {
    exec(`shutdown /s /f /t ${delay}`, (error, stdout, stderr) => {
        if (error) {
            console.error(`Error executing shutdown: ${error.message}`);
            return;
        }
        if (stderr) {
            console.error(`stderr: ${stderr}`);
            return;
        }
        console.log(`stdout: ${stdout}`);
    });
}

// 设置每天凌晨3点定时关机
schedule.scheduleJob('0 3 * * *', () => {
    console.log('Scheduled shutdown at 3:00 AM');
    shutdownWindows(0);
});

const server = http.createServer((req, res) => {
    if (req.url === '/shutdown' && req.method === 'GET') {
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end('Shutting down the system...\n');
        shutdownWindows();
    } else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Not 2\n');
    }
});

const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});
