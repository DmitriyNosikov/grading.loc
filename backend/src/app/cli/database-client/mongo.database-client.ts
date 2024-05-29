import { Logger } from '@nestjs/common';
import * as Mongoose from 'mongoose';
import { setTimeout } from 'node:timers/promises';
import { DatabaseClient } from './database-client.interface.js';

const Connection = {
  COUNT: 5,
  TIMEOUT: 1000
} as const;

const MessageText = {
  DB_INIT: 'Initializing MongoDB connection ...',
  DB_URI: 'Connection URI: ',
  DB_ATTEMPT: 'Trying to connect to database. Attempt: ',
  DB_CONNECTED: 'MongoDB successfully connected.',
  DB_DISCONNECTED: 'MongoDB successfully disconnected.'
} as const;

const ErrorText = {
  DB_INIT: 'Can`t connect to MongoDB.',
  DB_CONNECTED: 'MongoDB has already connected.',
  DB_CANT_CONNECT: 'Unable to establish database connection after attempts count: ',
} as const;

export class MongoDatabaseClient implements DatabaseClient {
  private mongooseConnection: typeof Mongoose | null = null;
  private isConnected: boolean;

  constructor(){ this.isConnected = false; }

  private isDatabaseConnected() {
    return this.isConnected;
  }

  public async connect(uri: string) {
    if(this.isDatabaseConnected()) {
      throw new Error(ErrorText.DB_CONNECTED);
    }

    Logger.log(MessageText.DB_INIT);
    Logger.log(`${MessageText.DB_URI}: ${uri}`);

    let attempt = 0;
    while(attempt < Connection.COUNT) {
      try {
        Logger.log(`${MessageText.DB_ATTEMPT}${attempt}`);

        this.mongooseConnection = await Mongoose.connect(uri);
        this.isConnected = true;

        Logger.log(MessageText.DB_CONNECTED);
        return;
      } catch(err) {
        attempt++;

        Logger.error(ErrorText.DB_INIT, err);

        await setTimeout(Connection.TIMEOUT);
      }
    }

    throw new Error(ErrorText.DB_CANT_CONNECT);
  }

  public async disconnect() {
    await this.mongooseConnection?.disconnect?.();
    this.isConnected = false;
    Logger.log(MessageText.DB_DISCONNECTED);
  }
}
