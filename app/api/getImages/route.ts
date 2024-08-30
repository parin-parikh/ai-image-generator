export async function GET(request: Request) {
    const response = await fetch('https://ai-image-generator-pp.azurewebsites.net/api/getimages', {
        cache: 'no-store'
    });

    if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json(); // Directly parse JSON

    return new Response(JSON.stringify(data), { // Stringify the data before returning it
        status: 200,
    });
}
