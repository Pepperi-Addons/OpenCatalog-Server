import MyService from './my.service'
import { Client, Request } from '@pepperi-addons/debug-server'

// Dynamo Categories table

export async function GetSingleCategory(client: Client, request: Request) {
    const service = new MyService(client);
    return;
};

export async function GetCategories(client: Client, request: Request) {
    const service = new MyService(client);
    return;
};

export async function PostCategory(client: Client, request: Request) {
    const service = new MyService(client);
    return;
};