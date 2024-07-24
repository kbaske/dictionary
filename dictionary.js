document.getElementById('searchForm').addEventListener('submit', searchDictionary);

async function searchDictionary(event) {
    event.preventDefault();
    const query = document.getElementById('searchInput').value.toLowerCase();

    try {
        const response = await fetch('https://raw.githubusercontent.com/kbaske/sat-en-dictionary/main/dictionary.json');
        if (!response.ok) throw new Error('Failed to fetch dictionary.json');

        const dictionary = await response.json();

        const results = dictionary.entries.filter(entry => 
            entry.santali.toLowerCase().includes(query) ||
            entry.english.some(meaning => meaning.toLowerCase().includes(query))
        );

        displayResults(results);
    } catch (error) {
        console.error('Error searching dictionary:', error);
        alert('Failed to search dictionary.');
    }
}

function displayResults(results) {
    const resultsContainer = document.getElementById('resultsContainer');
    resultsContainer.innerHTML = '';

    if (results.length === 0) {
        resultsContainer.innerHTML = '<p>No results found.</p>';
        return;
    }

    results.forEach(result => {
        const resultItem = document.createElement('div');
        resultItem.className = 'result-item';

        const santaliWord = document.createElement('h3');
        santaliWord.textContent = result.santali;

        const englishMeanings = document.createElement('p');
        englishMeanings.textContent = `Meanings: ${result.english.join(', ')}`;

        resultItem.appendChild(santaliWord);
        resultItem.appendChild(englishMeanings);

        resultsContainer.appendChild(resultItem);
    });
}
