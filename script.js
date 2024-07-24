document.getElementById('searchButton').addEventListener('click', searchWord);

async function searchWord() {
    const query = document.getElementById('search').value;
    const response = await fetch('https://raw.githubusercontent.com/kbaske/sat-en-dictionary/main/dictionary.json');
    const dictionary = await response.json();
    
    const resultsContainer = document.getElementById('results');
    resultsContainer.innerHTML = '';

    for (const entry of dictionary.entries) {
        if (entry.santali.includes(query) || entry.english.includes(query)) {
            const entryDiv = document.createElement('div');
            entryDiv.classList.add('entry');

            const santaliWord = document.createElement('h3');
            santaliWord.textContent = entry.santali;
            entryDiv.appendChild(santaliWord);

            const englishWord = document.createElement('p');
            englishWord.textContent = entry.english;
            entryDiv.appendChild(englishWord);

            resultsContainer.appendChild(entryDiv);
        }
    }
}
