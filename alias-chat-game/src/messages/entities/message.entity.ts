import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
@Schema()
export class Message extends Document {}

export const MessageSchema = SchemaFactory.createForClass(Message);
