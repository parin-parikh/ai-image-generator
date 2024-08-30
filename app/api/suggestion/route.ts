// export async function GET(request: Request) {
//     //connect to ms azure function endpoint
//     const response = await fetch('http://localhost:7071/api/getChatGPTSuggestion', {
//         cache: 'no-store'
//     });

//     const textData = await response.text();

//     return new Response(JSON.stringify(textData.trim()), {
//         status: 200,
//     });
// }

export async function GET(request: Request) {
    try {
        const response = await fetch('http://127.0.0.1:7071/api/getChatGPTSuggestion', {
            cache: 'no-store'
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch data: ${response.statusText}`);
        }

        const textData = await response.text();

        return new Response(JSON.stringify(textData.trim()), {
            status: 200,
        });
    } catch (error) {
        console.error("Error fetching from Azure Function:", error);
        return new Response(JSON.stringify({ error: "Failed to fetch suggestion" }), {
            status: 500,
        });
    }
}

