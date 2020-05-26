import { Controller, Get, Res } from '@nestjs/common'
import { Response } from 'express'
import { AppService } from './app.service'
import { SPECS_URL } from './config'

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/health')
  getHealth(): Record<string, string> {
    return this.appService.checkHealth()
  }

  @Get(SPECS_URL)
  getSpecs(@Res() res: Response): void {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Methods', 'GET')
    res.header('Access-Control-Allow-Headers', 'Content-Type, Accept')

    const specs = this.appService.getSpecs()

    res.send(specs)
  }
}
