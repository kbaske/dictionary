document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('searchInput');
    const resultsDiv = document.getElementById('results');
    let dictionary = {};

    // Load dictionary data
    fetch('dictionary.json')
        .then(response => response.json())
        .then(data => {
            dictionary = data;
        })
        .catch(error => console.error('Error loading dictionary data:', error));

    // Search functionality
    searchInput.addEventListener('input', () => {
        const query = searchInput.value.toLowerCase();
        if (!query) {
            resultsDiv.innerHTML = '';
            return;
        }

        const santaliToEnglishResults = [];
        const englishToSantaliResults = [];

        // Search in Santali to English dictionary
        for (const [santaliWord, englishMeaning] of Object.entries(dictionary.santali_to_english)) {
            if (santaliWord.toLowerCase().includes(query)) {
                santaliToEnglishResults.push(`<div class="result-item">${santaliWord} - ${englishMeaning}</div>`);
            }
        }

        // Search in English to Santali dictionary
        for (const [englishWord, santaliMeaning] of Object.entries(dictionary.english_to_santali)) {
            if (englishWord.toLowerCase().includes(query)) {
                englishToSantaliResults.push(`<div class="result-item">${englishWord} - ${santaliMeaning}</div>`);
            }
        }

        // Display results
        resultsDiv.innerHTML = `
            <h2>Santali to English</h2>
            ${santaliToEnglishResults.join('')}
            <h2>English to Santali</h2>
            ${englishToSantaliResults.join('')}
        `;
    });
});
