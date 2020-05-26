/* eslint class-methods-use-this: 0 */
import { Injectable } from '@nestjs/common'
import { SwaggerDocument } from '@nestjs/swagger'
import { SwaggerHelper } from '@bds/nestjs-common'

@Injectable()
export class AppService {
  checkHealth(): Record<string, string> {
    return {
      status: 'UP',
    }
  }

  getSpecs(): Partial<SwaggerDocument> {
    return SwaggerHelper.getSpecs()
  }
}
