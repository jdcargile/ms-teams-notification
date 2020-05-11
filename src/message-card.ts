export function createMessageCard(
  notificationSummary: string,
  commit: any,
  author: any,
  runNum: string,
  runId: string,
  repoName: string,
  sha: string,
  repoUrl: string,
  timestamp: string
): any {
  const messageCard = {
    '@type': 'MessageCard',
    '@context': 'https://schema.org/extensions',
    summary: notificationSummary,
    themeColor: '0078D7',
    title: notificationSummary,
    sections: [
      {
        activityTitle: `**CI #${runNum} (commit ${sha.substr(0, 7)})** on [${repoName}](${repoUrl})`,
        activityImage: author.avatar_url,
        activitySubtitle: `by ${commit.data.commit.author.name} [(@${author.login})](${author.html_url}) on ${timestamp}`,
      }
    ],
    potentialAction: [
      {
        '@context': 'http://schema.org',
        target: [`${repoUrl}/actions/runs/${runId}`],
        '@type': 'ViewAction',
        name: 'View Workflow'
      },
      {
        '@context': 'http://schema.org',
        target: [commit.data.html_url],
        '@type': 'ViewAction',
        name: 'Review commit diffs'
      }
    ]
  }
  return messageCard
}
