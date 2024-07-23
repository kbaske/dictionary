const { Octokit } = require("@octokit/core");

module.exports = async (req, res) => {
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
    const repoOwner = 'your-username';
    const repoName = 'your-repository';

    // Fetch current dictionary
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

    // Update the dictionary content
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
};
