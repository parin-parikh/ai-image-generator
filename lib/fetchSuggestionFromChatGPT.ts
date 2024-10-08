const fetchSuggestionFromChatGPT = async () => {
    const res = await fetch("/api/suggestion", { cache: 'no-store' });

    if (!res.ok) {
        throw new Error('Failed to fetch suggestion');
    }

    return res.json();
};

export default fetchSuggestionFromChatGPT;
