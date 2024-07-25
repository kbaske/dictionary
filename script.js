document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('searchInput');
    const dictionaryDiv = document.getElementById('dictionary');
  
    fetch('sat-en.json')  // Update this to the correct path of your JSON file in the GitHub repository
      .then(response => response.json())
      .then(data => {
        const dictionary = data;
        displayDictionary(dictionary);
  
        searchInput.addEventListener('input', () => {
          const query = searchInput.value.toLowerCase();
          const filteredDictionary = dictionary.filter(entry =>
            entry.word.toLowerCase().includes(query)
          );
          displayDictionary(filteredDictionary);
        });
      })
      .catch(error => console.error('Error fetching the dictionary data:', error));
    
    function displayDictionary(dictionary) {
      dictionaryDiv.innerHTML = '';
      dictionary.forEach(entry => {
        const entryDiv = document.createElement('div');
        entryDiv.classList.add('entry');
  
        const wordDiv = document.createElement('div');
        wordDiv.classList.add('word');
        wordDiv.textContent = entry.word;
  
        const definitionDiv = document.createElement('div');
        definitionDiv.classList.add('definition');
        definitionDiv.textContent = entry.definition;
  
        entryDiv.appendChild(wordDiv);
        entryDiv.appendChild(definitionDiv);
  
        dictionaryDiv.appendChild(entryDiv);
      });
    }
  });
  