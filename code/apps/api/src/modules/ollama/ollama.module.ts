import { Module } from '@nestjs/common';
import { OllamaController } from './controller/ollama.controller';
import { OllamaService } from './service/ollama.service';

@Module({
	controllers: [OllamaController],
	providers: [OllamaService],
})
export class OllamaModule {}
