document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('searchInput');
    const dictionaryDiv = document.getElementById('dictionary');
  
    fetch('https://raw.githubusercontent.com/kbaske/dictionary/main/sat-en.json') // Update with your raw JSON URL
      .then(response => response.json())
      .then(data => {
        const dictionary = data;
        displayDictionary(dictionary);
  
        searchInput.addEventListener('input', () => {
          const query = searchInput.value.toLowerCase();
          const filteredDictionary = dictionary.filter(entry =>
            entry.santali.toLowerCase().includes(query) || entry.english.toLowerCase().includes(query)
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
  
        const santaliDiv = document.createElement('div');
        santaliDiv.classList.add('santali');
        santaliDiv.textContent = entry.santali;
  
        const englishDiv = document.createElement('div');
        englishDiv.classList.add('english');
        englishDiv.textContent = entry.english;
  
        entryDiv.appendChild(santaliDiv);
        entryDiv.appendChild(englishDiv);
  
        dictionaryDiv.appendChild(entryDiv);
      });
    }
  });
  