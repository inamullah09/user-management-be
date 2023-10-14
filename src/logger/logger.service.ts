import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Log } from 'src/entities/log.entity';
import { Repository } from 'typeorm';

@Injectable()
export class LoggerService {
  constructor(
    @InjectRepository(Log)
    private readonly loggerRepository: Repository<Log>,
  ) {}

  public async logEvent(event: string): Promise<Log> {
    const logEntry = this.loggerRepository.create({ event });
    return this.loggerRepository.save(logEntry);
  }
}
