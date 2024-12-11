document.getElementById('btn').addEventListener('click', async () => {
    let ip = document.getElementById('inputIP').value.trim();
    let resultLabel = document.getElementById('resultLabel');
    let result = document.getElementById('result');
    let based_url = 'http://127.0.0.1:7000';

    if (!ip || !Number(ip)) {
        result.innerHTML = !ip ? 'IP is required !' : 'IP is invalid !';
        return;
    }

    try {
        let res = await fetch(based_url + `/feeds?ip=${ip}`);
        let data = await res.json();

        if (res.ok && data?.data) {
            let resStats = await fetch(based_url + `/stats?ip=${ip}&event=impression`);
            resultLabel.innerHTML = resStats.ok ? 'Selected configuration' : null;
            result.innerHTML = resStats.ok ? JSON.stringify(data.data) : resStats.json().message;
        } else {
            await fetch(based_url + `/stats?ip=${ip}&event=no_impression`);
            resultLabel.innerHTML = null;
            result.innerHTML = data.message;
        }
    } catch (error) {
        resultLabel.innerHTML = null;
        result.innerHTML = 'Something went wrong. Please try again.';
    }
});

document.getElementById('inputIP').addEventListener('input', () => {
    document.getElementById('resultLabel').textContent = '';
    document.getElementById('result').textContent = '';
});
