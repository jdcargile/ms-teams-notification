import * as core from '@actions/core';
import { wait } from './wait';

async function run(): Promise<void> {
  try {
    const ms: string = core.getInput('milliseconds')
    core.debug(`Waiting ${ms} milliseconds ...`)

	const webhookUri: string = core.getInput("ms-teams-webhook-uri", { required: true });
	const notificationMessage = core.getInput("message") || "GitHub Action";

    core.debug(new Date().toTimeString())
    await wait(parseInt(ms, 10))
    core.debug(new Date().toTimeString())

    core.setOutput('time', new Date().toTimeString())
  } catch (error) {
    core.setFailed(error.message)
  }
}

run()
