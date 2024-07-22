document.addEventListener('DOMContentLoaded', () => {
    const languageSelect = document.getElementById('languageSelect');
    const wordInput = document.getElementById('wordInput');
    const meaningsInput = document.getElementById('meaningsInput');
    const addEntryButton = document.getElementById('addEntryButton');
    const resultsDiv = document.getElementById('results');
    let dictionary = { "santali_to_english": {}, "english_to_santali": {} };

    // Load dictionary data
    fetch('sat_en_dictionary.json')
        .then(response => response.json())
        .then(data => {
            dictionary = data;
            displayDictionary();
        })
        .catch(error => console.error('Error loading dictionary data:', error));

    // Display dictionary
    function displayDictionary() {
        let resultsHTML = `
            <h2>Santali to English</h2>
            ${Object.entries(dictionary.santali_to_english).map(([word, meanings]) => `<div class="result-item">${word} - ${meanings.join(', ')}</div>`).join('')}
            <h2>English to Santali</h2>
            ${Object.entries(dictionary.english_to_santali).map(([word, meanings]) => `<div class="result-item">${word} - ${meanings.join(', ')}</div>`).join('')}
        `;
        resultsDiv.innerHTML = resultsHTML;
    }

    // Add entry
    addEntryButton.addEventListener('click', () => {
        const language = languageSelect.value;
        const word = wordInput.value.trim();
        const meanings = meaningsInput.value.split(',').map(m => m.trim());

        if (word && meanings.length > 0) {
            if (!dictionary[language][word]) {
                dictionary[language][word] = [];
            }
            dictionary[language][word].push(...meanings);

            // Simulate saving the updated dictionary (For GitHub Pages, this won't persist changes)
            console.log('Updated Dictionary:', dictionary);

            // Refresh displayed dictionary
            displayDictionary();
        } else {
            console.error('Word or meanings are empty.');
        }
    });
});
