import * as core from '@actions/core'
import axios from 'axios'

async function run(): Promise<void> {
  try {
    const msTeamsWebhookUri: string = core.getInput('ms-teams-webhook-uri', {
      required: true
    })

    axios
      .post(msTeamsWebhookUri, {
        summary: 'test',
        sections: {activityTitle: 'test'}
      })
      .then(function(response) {
        console.log(response)
      })
      .catch(function(error) {
        console.log(error)
        core.debug(error)
      })
  } catch (error) {
    core.setFailed(error.message)
  }
}

run()
