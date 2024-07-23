const { Octokit } = require("@octokit/core");

module.exports = async (req, res) => {
    // Set CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    if (req.method !== 'POST') {
        res.status(405).json({ message: 'Method Not Allowed' });
        return;
    }

    const { language, word, meanings } = req.body;

    if (!language || !word || !meanings || !Array.isArray(meanings)) {
        res.status(400).json({ message: 'Invalid request' });
        return;
    }

    const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN });
    const repoOwner = 'kbaske'; // Replace with your GitHub username
    const repoName = 'sat-en-dictionary'; // Replace with your GitHub repository name

    try {
        const { data: dictionaryContent } = await octokit.request('GET /repos/{owner}/{repo}/contents/{path}', {
            owner: repoOwner,
            repo: repoName,
            path: 'sat_en_dictionary.json'
        });

        const dictionary = JSON.parse(Buffer.from(dictionaryContent.content, 'base64').toString());

        if (!dictionary[language][word]) {
            dictionary[language][word] = [];
        }

        dictionary[language][word].push(...meanings);

        const updatedContent = Buffer.from(JSON.stringify(dictionary, null, 2)).toString('base64');

        await octokit.request('PUT /repos/{owner}/{repo}/contents/{path}', {
            owner: repoOwner,
            repo: repoName,
            path: 'sat_en_dictionary.json',
            message: 'Update dictionary',
            content: updatedContent,
            sha: dictionaryContent.sha
        });

        res.status(200).json({ message: 'Dictionary updated successfully' });
    } catch (error) {
        console.error('Error updating dictionary:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};
