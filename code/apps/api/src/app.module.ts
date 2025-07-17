import { Module } from '@nestjs/common';
import { OllamaModule } from './modules/ollama/ollama.module';

@Module({ imports: [OllamaModule] })
export class AppModule {}
