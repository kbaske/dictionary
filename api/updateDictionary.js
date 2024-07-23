const { Octokit } = require("@octokit/core");

module.exports = async (req, res) => {
    // Check if the request method is POST
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method Not Allowed' });
    }

    // Extract and validate the request body
    const { language, word, meanings } = req.body;
    if (!language || !word || !meanings || !Array.isArray(meanings)) {
        return res.status(400).json({ message: 'Invalid request' });
    }

    // Initialize Octokit with the GitHub token
    const octokit = new Octokit({ auth: process.env.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 });
    const repoOwner = 'kbaske';
    const repoName = 'sat-en-dictionary';
    const filePath = 'sat_en_dictionary.json';

    try {
        // Fetch the current dictionary from the repository
        const { data: dictionaryContent } = await octokit.request('GET /repos/{owner}/{repo}/contents/{path}', {
            owner: repoOwner,
            repo: repoName,
            path: filePath
        });

        // Decode and parse the dictionary content
        const dictionary = JSON.parse(Buffer.from(dictionaryContent.content, 'base64').toString());

        // Ensure the language and word objects exist in the dictionary
        if (!dictionary[language]) {
            dictionary[language] = {};
        }
        if (!dictionary[language][word]) {
            dictionary[language][word] = [];
        }

        // Add the new meanings to the word
        dictionary[language][word].push(...meanings);

        // Encode the updated dictionary content
        const updatedContent = Buffer.from(JSON.stringify(dictionary, null, 2)).toString('base64');

        // Update the dictionary file in the repository
        await octokit.request('PUT /repos/{owner}/{repo}/contents/{path}', {
            owner: repoOwner,
            repo: repoName,
            path: filePath,
            message: 'Update dictionary',
            content: updatedContent,
            sha: dictionaryContent.sha
        });

        // Respond with success message
        res.status(200).json({ message: 'Dictionary updated successfully' });
    } catch (error) {
        // Log the error and respond with an error message
        console.error('Error updating dictionary:', error);
        res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
};
