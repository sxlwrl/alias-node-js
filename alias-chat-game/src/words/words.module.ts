import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { WordsService } from './words.service';
import { WordsController } from './words.controller';
import { Word, WordSchema } from './entities/word.entity';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Word.name, schema: WordSchema }]),
  ],
  controllers: [WordsController],
  providers: [WordsService],
})
export class WordsModule {}