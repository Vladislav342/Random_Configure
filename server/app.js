const { createClient } = require('redis');
const http = require('http');
const url = require('url');
const port = 7000;
const host = '127.0.0.1';

const client = createClient({
    url: 'redis://127.0.0.1:6379',
});

client.on('connect', () => {
    console.log('Connected to Redis');
});

client.on('error', (err) => {
    console.error('Redis error:', err);
});

(async () => {
    try {
        await client.connect();
        console.log('Redis connected successfully');
    } catch (err) {
        console.error('Failed to connect to Redis:', err);
        process.exit(1);
    }
})();

const configurations = [
    [{ id: 1, url: 'example1.com' }, 1000],
    [{ id: 2, url: 'example2.com' }, 500],
    [{ id: 3, url: 'example3.com' }, 100],
];

function setCorsHeaders(res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
}

function randomConfig(configs) {
    let sumWeights = configs.reduce((sum, [_, w]) => sum + Number(w), 0);
    let randomW = Math.random() * Number(sumWeights);

    for (let [config, w] of configs) {
        if (randomW < w) return config;
        randomW -= w;
    }
}

async function middleware(req, res) {
    const parsedUrl = url.parse(req.url, true);
    let pathname = parsedUrl.pathname;
    let query = parsedUrl.query;

    setCorsHeaders(res);

    res.setHeader('Content-Type', 'application/json');

    if (pathname === '/feeds') {
        let { ip } = query;

        if (!ip) {
            res.statusCode = '400';
            res.end(JSON.stringify({
                success: false,
                message: 'IP is required !'
            }));
        }

        let data = await client.get(`${ip}`);
        let parsedData = data ? JSON.parse(data) : null;
        

        if (parsedData?.impressions >= 3) {
            res.statusCode = 403;
            res.end(JSON.stringify({
                success: false,
                message: 'Limit of impressions reached for this IP'
            }));
            return;
        }

        let randomConfiguration = randomConfig(configurations);

        res.end(JSON.stringify({ success: true, data: randomConfiguration }));
    } else if (pathname === '/stats') {
        let { ip, event } = query;

        if (!ip || event === 'no_impression') {
            res.statusCode = 400;
            res.end(JSON.stringify({ success: false, message: "IP is required or you've reached the limit of IP" }));
            return;
        }

        let data = await client.get(`${ip}`);
        if (data) {
            let parsedImpression = JSON.parse(data);
            parsedImpression.impressions = parsedImpression.impressions + 1;
            await client.set(`${ip}`, JSON.stringify(parsedImpression));
        } else {
            await client.set(`${ip}`, JSON.stringify({ impressions: 1 }));
        }

        res.end(JSON.stringify({
            success: true,
            message: `Event ${event} recorded for IP ${ip}`
        }));
    } else {
        res.statusCode = 404;
        res.end(JSON.stringify({ success: false, message: 'Route not found' }));
    }
} 

process.on('SIGINT', async () => {
    console.log('Shutting down server...');
    await client.quit();
    console.log('Redis connection closed');
    process.exit(0);
});

process.on('SIGTERM', async () => {
    console.log('Terminating server...');
    await client.quit();
    console.log('Redis connection closed');
    process.exit(0);
});

const server = http.createServer(middleware);

server.listen(port, host, () => {
    console.log(`Server listens on http://${host}:${port}`);
});