import { Client, Account, Databases, Storage } from "appwrite";

// Access environment variables
const Endpoint = import.meta.env.VITE_APPWRITE_ENDPOINT;
const projectID = import.meta.env.VITE_APPWRITE_PROJECT_ID;
const databaseId = import.meta.env.VITE_APPWRITE_DATABASE_ID;

const client = new Client();

client
  .setEndpoint(Endpoint)
  .setProject(projectID);

export const account = new Account(client);
export const databases = new Databases(client);
export const storage = new Storage(client);

export { databaseId, projectID };
