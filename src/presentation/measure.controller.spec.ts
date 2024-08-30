import { Test, TestingModule } from '@nestjs/testing';
import { MeasureController } from '../presentation/measure.controller';
import { MeasureService } from '../application/services/measure.service';
import { AbstractMeasureService } from '../domain/services/abstract.measure.service';
import { AbstractMeasureRepository } from '../domain/repositories/abstract.measure.repository';
import { MeasureRepository } from '../infrastructure/repositories/measure.repository';
import { PrismaService } from '../infrastructure/database/prisma.service';
import { AbstractGeminiApiProvider } from '../domain/providers/abstract.gemini.api.provider';
import { GeminiApiProvider } from '../infrastructure/providers/gemini.api.provider';

describe('MeasureController', () => {
  let controller: MeasureController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MeasureController],
      providers: [
        {
          provide: AbstractMeasureService,
          useClass: MeasureService,
        },
        {
          provide: AbstractMeasureRepository,
          useClass: MeasureRepository,
        },
        {
          provide: AbstractGeminiApiProvider,
          useClass: GeminiApiProvider,
        },
        PrismaService,
      ],
    }).compile();

    controller = module.get<MeasureController>(MeasureController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
