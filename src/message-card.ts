export async function createMessageCard(notificationSummary: string, commit: any, repo: any, author: any, runNum: string, runId: string, eventName: string, branchUrl: string, repoName: string, sha: string, repoUrl: string, timestamp: string): Promise<string>{
	return new Promise(resolve => {
	const messageCard	= {
		"@type": "MessageCard",
		"@context": "https://schema.org/extensions",
		summary: "Issue 176715375",
		themeColor: "0078D7",
		title: "Issue opened: \"Push notifications not working\"",
		sections: [
			{
				activityTitle: `**CI #${runNum} (commit ${sha.substr( 0, 7)})** on [${commit.data.r}](${repoUrl})`,
				activityImage: author.avatar_url,
				activitySubtitle: `by ${commit.data.commit.author.name} [(@${author.login})](${author.html_url}) on ${timestamp}`,
				facts: [
					{
						name: "Repository:",
						value: "mgarcia\\test"
					},
					{
						name: "Issue #:",
						value: "176715375"
					}
				],
				text: "There is a problem with Push notifications, they don't seem to be picked up by the connector."
			}
		],
		potentialAction: [
			{
				"@context": "http://schema.org",
				target: [`${repoUrl}/actions/runs/${runId}`],
				"@type": "ViewAction",
				name: "View Workflow"
			},
			{
				"@context": "http://schema.org",
				target: [commit.data.html_url],
				"@type": "ViewAction",
				name: "Review commit diffs"
			}
		],
	}
	return messageCard;
	})
}