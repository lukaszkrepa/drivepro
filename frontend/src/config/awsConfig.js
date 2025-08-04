export const awsConfig = {
    region: "eu-central-1",
    credentials: {
        accessKeyId: import.meta.env.VITE_ACCESS_KEY_ID || "",
        secretAccessKey: import.meta.env.VITE_SECRET_ACCESS_KEY_ID || "",
    },
};