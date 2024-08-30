// export async function GET(request: Request) {
//     const response = await fetch('http://127.0.0.1:7071/api/getImages', {
//         cache: 'no-store'
//     })

//     const blob = await response.blob();
//     const textData = await blob.text();

//     const data = JSON.parse(textData);

//     return new Response(JSON.parse(data), {
//         status: 200,
//     });
// }

//option 2
// export async function GET(request: Request) {
//     try {
//         const response = await fetch('http://127.0.0.1:7071/api/getImages', {
//             cache: 'no-store'
//         });

//         const textData = await response.text(); // Read response as text

//         console.log('Response Text:', textData); // Log the raw response text

//         const data = JSON.parse(textData); // Parse the JSON from text

//         return new Response(JSON.stringify(data), { // Stringify the data before returning it
//             status: 200,
//         });
//     } catch (error) {
//         console.error('Error fetching images:', error);
//         return new Response('Internal Server Error', {
//             status: 500,
//         });
//     }
// }
export async function GET(request: Request) {
    const response = await fetch('http://127.0.0.1:7071/api/getImages', {
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
