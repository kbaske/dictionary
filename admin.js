document.getElementById('loginForm').addEventListener('submit', loginAdmin);
document.getElementById('addEntryForm').addEventListener('submit', addEntry);
document.getElementById('editEntryForm').addEventListener('submit', editEntry);

const adminPassword = 'karSun';  // Replace with your secure password

function loginAdmin(event) {
    event.preventDefault();
    const password = document.getElementById('adminPassword').value;
    if (password === adminPassword) {
        document.getElementById('loginForm').style.display = 'none';
        document.getElementById('adminSection').style.display = 'block';
    } else {
        alert('Incorrect password!');
    }
}

async function addEntry(event) {
    event.preventDefault();
    const santali = document.getElementById('santaliWord').value;
    const english = document.getElementById('englishMeanings').value.split(',').map(s => s.trim());

    try {
        const response = await fetch('https://raw.githubusercontent.com/kbaske/sat-en-dictionary/main/dictionary.json');
        const dictionary = await response.json();

        dictionary.entries.push({ santali, english });

        await updateDictionary(dictionary);
        alert('Entry added successfully!');
        document.getElementById('addEntryForm').reset();
    } catch (error) {
        console.error('Error adding entry:', error);
        alert('Failed to add entry.');
    }
}

async function editEntry(event) {
    event.preventDefault();
    const santali = document.getElementById('editSantaliWord').value;
    const english = document.getElementById('editEnglishMeanings').value.split(',').map(s => s.trim());

    try {
        const response = await fetch('https://raw.githubusercontent.com/kbaske/sat-en-dictionary/main/dictionary.json');
        const dictionary = await response.json();

        const entry = dictionary.entries.find(e => e.santali === santali);
        if (entry) {
            entry.english = english;
            await updateDictionary(dictionary);
            alert('Entry updated successfully!');
            document.getElementById('editEntryForm').reset();
        } else {
            alert('Entry not found!');
        }
    } catch (error) {
        console.error('Error editing entry:', error);
        alert('Failed to edit entry.');
    }
}

async function updateDictionary(dictionary) {
    try {
        const response = await fetch('https://api.github.com/repos/kbaske/sat-en-dictionary/contents/dictionary.json', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer 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'  // Replace with your GitHub token
            },
            body: JSON.stringify({
                message: 'Update dictionary',
                content: btoa(unicodeToBase64(JSON.stringify(dictionary, null, 2))),
                sha: await getDictionarySha()
            })
        });
        if (!response.ok) {
            throw new Error('Failed to update dictionary');
        }
    } catch (error) {
        console.error('Error updating dictionary:', error);
        throw error;
    }
}

async function getDictionarySha() {
    try {
        const response = await fetch('https://api.github.com/repos/kbaske/sat-en-dictionary/contents/dictionary.json');
        const data = await response.json();
        return data.sha;
    } catch (error) {
        console.error('Error fetching dictionary SHA:', error);
        throw error;
    }
}

function unicodeToBase64(str) {
    return window.btoa(unescape(encodeURIComponent(str)));
}
