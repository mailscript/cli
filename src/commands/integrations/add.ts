import { Command, flags } from '@oclif/command'
import cli from 'cli-ux'

const {
  MAILSCRIPT_LOGIN_URL: remoteLoginUrl = 'https://login.mailscript.com',
} = process.env

type FlagsType = {
  gdrive?: boolean

  [key: string]: any
}

export default class IntegrationsAdd extends Command {
  static description = 'add an integration'

  static flags = {
    help: flags.help({ char: 'h' }),
    gdrive: flags.boolean({
      description: 'add google drive integration',
    }),
  }

  static args = []

  async run() {
    const { flags } = this.parse(IntegrationsAdd)

    return this.add(flags)
  }

  async add(flags: FlagsType): Promise<void> {
    if (!flags.gdrive && !flags.zoom) {
      this.log(
        'Please provide an integrations to be setup, one of:\n  --gdrive',
      )

      this.exit(1)
    }

    const integrationType = this._resolveIntegrationType(flags)

    cli.open(`${remoteLoginUrl}/integrations?force=${integrationType}`)
  }

  private _resolveIntegrationType(flags: FlagsType) {
    if (flags.gdrive) {
      return 'google'
    }

    throw new Error('Unknown integration type')
  }
}
