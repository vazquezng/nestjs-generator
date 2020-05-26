/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require('fs');
const rimraf = require('rimraf')
const Generator = require('yeoman-generator')
const { tail, head, toLower, toUpper, lowerFirst } = require('lodash')

module.exports = class extends Generator {
  async prompting() {
    const answers = await this.prompt([
      {
        type: 'input',
        name: 'name',
        message: 'Microservice title* (ex.: Accounts Manager)',
      },
      {
        type: 'input',
        name: 'description',
        message: 'Microservice description',
      },
      {
        type: 'input',
        name: 'apiBase',
        message: 'Api URL base* (ex.: /accounts)',
      },
    ])

    const { name, apiBase } = answers

    if (!name) {
      throw new Error('Microservice name is required')
    }

    if (!apiBase) {
      throw new Error('apiBase is required')
    }

    if (apiBase.includes(' ')) {
      throw new Error('apiBase cant have spaces')
    }

    if (!apiBase.includes('/')) {
      throw new Error('apiBase needs to start with /')
    }

    this.answers = answers
  }

  writing() {
    const { name, apiBase, description } = this.answers

    const apiName = apiBase.replace('/', '')

    fs.unlinkSync('./package.json')
    fs.unlinkSync('./README.md')

    this.fs.copyTpl('./templates/package', `./package.json`, {
      name: apiName,
      description,
    })

    // Install dependencies
    this.yarnInstall()

    this.fs.copyTpl('./templates/config', './src/config/index.ts', {
      serviceName: toLower(name)
        .split(' ')
        .join('-'),
    })

    this.fs.copyTpl('./templates/main', './src/main.ts', {
      swaggerName: name,
    })

    const classPrefix = `${toUpper(head(apiName)[0])}${toLower(tail(apiName).join(''))}`

    const controllerClass = `${classPrefix}Controller`
    const serviceClass = `${classPrefix}Service`
    const moduleClass = `${classPrefix}Module`

    this.fs.copyTpl('./templates/app.module', './src/app.module.ts', {
      moduleClass,
      apiModulePath: `./api/${apiName}/${apiName}.module`,
    })

    this.fs.copyTpl('./templates/api.module', `./src/api/${apiName}/${apiName}.module.ts`, {
      controllerClass,
      serviceClass,
      moduleClass,
      controllerPath: `./${apiName}.controller`,
      servicePath: `./${apiName}.service`,
    })

    this.fs.copyTpl('./templates/api.controller', `./src/api/${apiName}/${apiName}.controller.ts`, {
      serviceClass,
      controllerClass,
      serviceInstance: `${lowerFirst(serviceClass)}`,
      servicePath: `./${apiName}.service`,
      projectTitle: name,
      apiBase,
      loggerContext: `${apiName}-controller`,
    })

    this.fs.copyTpl('./templates/api.service', `./src/api/${apiName}/${apiName}.service.ts`, {
      serviceClass,
      loggerContext: `${apiName}-controller`,
    })

    this.fs.copyTpl('./templates/README', `./README.md`, {
      name,
    })

    this.log('Removing .git...')
    rimraf.sync('./.git')
    this.log('Initializing git')
    this.spawnCommandSync('git', ['init'])
    this.log('Done! You can set your own origin now')

    this.log('Removing templates and generator...')
    rimraf.sync('./templates')
    this.log('Done!')

    this.log('If you need a MongoDB database follow this steps: https://docs.nestjs.com/techniques/mongodb')
    this.log('If you need a relational database follow this steps: https://docs.nestjs.com/techniques/database')

    setTimeout(() => {
      rimraf.sync('./generators')
    }, 250)
  }
}
