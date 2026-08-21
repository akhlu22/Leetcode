import { Module } from '@nestjs/common';
import { MonthCloseController } from './month-close.controller';
import { MonthCloseService } from './month-close.service';

@Module({ controllers: [MonthCloseController], providers: [MonthCloseService] })
export class MonthCloseModule {}
