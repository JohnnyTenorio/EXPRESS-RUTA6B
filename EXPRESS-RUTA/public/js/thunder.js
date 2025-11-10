const apiForm = document.getElementById('apiForm');
const apiResponse = document.getElementById('apiResponse');

let totalRequests = 0;
let successRequests = 0;
let failedRequests = 0;

const totalRequestsEl = document.getElementById('totalRequests');
const successRequestsEl = document.getElementById('successRequests');
const failedRequestsEl = document.getElementById('failedRequests');

apiForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const url = document.getElementById('url').value;
    const method = document.getElementById('method').value;
    const body = document.getElementById('body').value;

    let options = { method };

    if (method !== 'GET' && body) {
        try {
            options.body = JSON.stringify(JSON.parse(body));
            options.headers = { 'Content-Type': 'application/json' };
        } catch (err) {
            apiResponse.textContent = "Error: Body no es un JSON válido";
            failedRequests++;
            totalRequests++;
            updateCounters();
            return;
        }
    }

    apiResponse.textContent = "Cargando...";
    totalRequests++;

    try {
        const res = await fetch(url, options);
        let data;
        try {
            data = await res.json(); 
        } catch {
            data = await res.text(); 
        }

        apiResponse.textContent = JSON.stringify(data, null, 2);

        if (res.ok) {
            successRequests++;
        } else {
            failedRequests++;
        }

    } catch (err) {
        apiResponse.textContent = "Error al hacer la petición:\nNo se pudo conectar o la URL no existe.";
        failedRequests++;
    }

    updateCounters();
});

function updateCounters() {
    totalRequestsEl.textContent = totalRequests;
    successRequestsEl.textContent = successRequests;
    failedRequestsEl.textContent = failedRequests;
}
