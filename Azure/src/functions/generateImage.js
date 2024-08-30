const { app } = require("@azure/functions");
const openai = require("../../lib/openai");
const axios = require("axios");
const generateSASToken = require("../../lib/generateSASToken");

const { BlobServiceClient } = require("@azure/storage-blob");

const accountName = process.env.AccountName;
const containerName = "images";

app.http('generateImage', {
    methods: ['POST'],
    authLevel: "anonymous",
    handler: async (request) => {
        const { prompt } = await request.json();
        console.log(`Prompt is ${prompt}`);

        const response = await openai.images.generate({
            model: "dall-e-2",
            prompt: prompt,
            n: 1,
            size: "1024x1024",
        });
        image_url = response.data[0].url;
        console.log("Generated Image URL:", image_url);

        console.log(image_url);

        //download the image and return it as a arraybuffer
        const res = await axios.get(image_url, { responseType: 'arraybuffer' });
        const arraybuffer = res.data;

        const sasToken = await generateSASToken();

        const blobServiceClient = new BlobServiceClient(
            `https://${accountName}.blob.core.windows.net?${sasToken}`
        );

        const containerClient = blobServiceClient.getContainerClient(containerName);

        //generate current timestamp
        const timestamp = new Date().getTime();
        const file_name = `${prompt}_${timestamp}.png`;

        const blockBlobClient = containerClient.getBlockBlobClient(file_name);

        await blockBlobClient.uploadData(arraybuffer);
        console.log("File uploaded successfully to Azure Blob Storage!");

        return {
            status: 200,
            body: "File uploaded successfully!"
        };
    },
});

