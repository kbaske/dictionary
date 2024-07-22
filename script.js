document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('searchInput');
    const resultsDiv = document.getElementById('results');
    let dictionary = { "santali_to_english": {}, "english_to_santali": {} };

    // Load dictionary data
    fetch('sat_en_dictionary.json')
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

        // Display results based on available sections
        let resultsHTML = '';
        if (santaliToEnglishResults.length > 0) {
            resultsHTML += `
                <h2>Santali to English</h2>
                ${santaliToEnglishResults.join('')}
            `;
        }

        if (englishToSantaliResults.length > 0) {
            resultsHTML += `
                <h2>English to Santali</h2>
                ${englishToSantaliResults.join('')}
            `;
        }

        // If no results are found, display a message
        if (resultsHTML === '') {
            resultsHTML = '<p>No results found.</p>';
        }

        resultsDiv.innerHTML = resultsHTML;
    });
});
