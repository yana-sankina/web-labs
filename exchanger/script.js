document.addEventListener('DOMContentLoaded', () => {
    const exchangeRatesContainer = document.getElementById('exchange-rates');

    const fetchExchangeRates = async () => {
        try {
            const response = await fetch('https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json');
            const data = await response.json();
            
            let ratesHtml = '';
            data.forEach(rate => {
                ratesHtml += `<p><strong>${rate.txt}:</strong> ${rate.rate} UAH</p>`;
            });

            exchangeRatesContainer.innerHTML = ratesHtml;
        } catch (error) {
            exchangeRatesContainer.innerHTML = '<p>Не вдалося отримати курси валют. Будь-ласка спробуйте пізніше.</p>';
            console.error('Помилка отримання курсів валют:', error);
        }
    };

    fetchExchangeRates();

    setInterval(fetchExchangeRates, 60000); // Update every 60 seconds
});
