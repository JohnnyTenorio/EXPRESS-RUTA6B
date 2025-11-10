    const tabla = document.getElementById('tablaCriptos');
    const API_URL = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=15&page=1&sparkline=false';

    async function cargarCriptos() {
      try {
        const res = await fetch(API_URL);
        const data = await res.json();

        tabla.innerHTML = '';

        data.forEach((cripto, i) => {
          const cambio = cripto.price_change_percentage_24h?.toFixed(2) ?? 0;
          const colorCambio = cambio >= 0 ? 'text-success' : 'text-danger';

          const fila = `
            <tr>
              <td>${i + 1}</td>
              <td><img src="${cripto.image}" width="30" alt="${cripto.name}"></td>
              <td>${cripto.name}</td>
              <td>${cripto.symbol.toUpperCase()}</td>
              <td>$${cripto.current_price.toLocaleString()}</td>
              <td class="${colorCambio}">${cambio}%</td>
              <td>$${cripto.market_cap.toLocaleString()}</td>
            </tr>
          `;
          tabla.innerHTML += fila;
        });
      } catch (error) {
        tabla.innerHTML = `<tr><td colspan="7" class="text-danger">Error al cargar los datos.</td></tr>`;
      }
    }

    cargarCriptos();