import * as core from '@actions/core'
import {Octokit} from '@octokit/rest'
import axios from 'axios'
import moment from 'moment-timezone'
import {createMessageCard} from './message-card'
import { fetch as undiciFetch, ProxyAgent } from 'undici';

const escapeMarkdownTokens = (text: string) =>
  text
    .replace(/\n\ {1,}/g, '\n ')
    .replace(/\_/g, '\\_')
    .replace(/\*/g, '\\*')
    .replace(/\|/g, '\\|')
    .replace(/#/g, '\\#')
    .replace(/-/g, '\\-')
    .replace(/>/g, '\\>')

async function run(): Promise<void> {
  try {
    const githubToken = core.getInput('github-token', {required: true})
    const msTeamsWebhookUri: string = core.getInput('ms-teams-webhook-uri', {
      required: true
    })

    const notificationSummary =
      core.getInput('notification-summary') || 'GitHub Action Notification'
    const notificationColor = core.getInput('notification-color') || '0b93ff'
    const timezone = core.getInput('timezone') || 'UTC'
    const verboseLogging = core.getInput('verbose-logging') == 'true'
    const timestamp = moment()
      .tz(timezone)
      .format('dddd, MMMM Do YYYY, h:mm:ss a z')

    const [owner, repo] = (process.env.GITHUB_REPOSITORY || '').split('/')
    const sha = process.env.GITHUB_SHA || ''
    const runId = process.env.GITHUB_RUN_ID || ''
    const runNum = process.env.GITHUB_RUN_NUMBER || ''
    const proxyURI = process.env.https_proxy || process.env.HTTPS_PROXY || ''
    const myFetch = (url, options) => {
      return undiciFetch(url, {
        ...options,
        dispatcher: new ProxyAgent({uri: proxyURI})
      })
    }
    const params = {owner, repo, ref: sha, request: { fetch: myFetch }}
    const repoName = params.owner + '/' + params.repo
    const repoUrl = `https://github.com/${repoName}`

    const octokit = new Octokit({auth: `token ${githubToken}`})
    const commit = await octokit.repos.getCommit(params)
    const author = commit.data.author

    const messageCard = await createMessageCard(
      notificationSummary,
      notificationColor,
      commit,
      author,
      runNum,
      runId,
      repoName,
      sha,
      repoUrl,
      timestamp
    )

    if (verboseLogging) {
      console.log(messageCard)
    }

    axios
      .post(msTeamsWebhookUri, messageCard)
      .then(function (response) {
        if (verboseLogging) {
          console.log(response)
        }
        core.debug(response.data)
      })
      .catch(function (error) {
        core.debug(error)
      })
  } catch (error: any) {
    console.log(error)
    core.setFailed(error.message)
  }
}

run()
