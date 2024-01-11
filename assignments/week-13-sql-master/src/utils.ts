import { Client } from 'pg';

export async function getClient() {
    const client = new Client("postgres://mdfengjz:h5uMPKgxENr2hSPHyA0Js4xeyjOpHF2h@rain.db.elephantsql.com/mdfengjz");
    await client.connect();
    return client;
}