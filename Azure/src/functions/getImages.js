const { app } = require("@azure/functions");
const { BlobServiceClient, StorageSharedKeyCredential } = require("@azure/storage-blob");
const generateSASToken = require("../../lib/generateSASToken");

const accountName = process.env.AccountName;
const accountKey = process.env.AccountKey;

const containerName = "images";

const sharedKeyCredential = new StorageSharedKeyCredential(accountName, accountKey);

const blobServiceClient = new BlobServiceClient(
    `https://${accountName}.blob.core.windows.net`,
    sharedKeyCredential
);

// Register the HTTP trigger function
app.http('getImages', {
    methods: ['GET'],
    authLevel: 'anonymous',
    handler: async (request, context) => {
        const containerClient = blobServiceClient.getContainerClient(containerName);

        const imageUrls = [];
        const sasToken = await generateSASToken();

        for await (const blob of containerClient.listBlobsFlat()) {
            const imageUrl = `${blob.name}?${sasToken}`;
            const url = `https://${accountName}.blob.core.windows.net/images/${imageUrl}`;
            imageUrls.push({ url, name: blob.name });
        }

        const sortedImageUrls = imageUrls.sort((a, b) => {
            const aName = a.name.split("_").pop().toString().split(".").shift();
            const bName = b.name.split("_").pop().toString().split(".").shift();
            return bName - aName;
        });

        context.log(`Http function processed request for url "${request.url}"`);

        return {
            jsonBody: {
                imageUrls: sortedImageUrls,
            },
        };
    },
});
