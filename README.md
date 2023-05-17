<p>
  <a href="https://github.com/dragos-cojocari/ms-teams-notification/actions"><img alt="ms-teams-notification status" src="https://github.com/dragos-cojocari/ms-teams-notification/workflows/Build%20&%20Test/badge.svg"></a> <img alt="vulnerabilities" src="https://snyk.io/test/github/dragos-cojocari/ms-teams-notification/badge.svg"></a>
</p>

Continues https://github.com/marketplace/actions/microsoft-teams-notification

Usage:
```yaml
- name: Microsoft Teams Notifications DC
  uses: dragos-cojocari/ms-teams-notification@v1.0.2
  with:
    github-token: ${{ github.token }} # this will use the runner's token.
    ms-teams-webhook-uri: ${{ secrets.MS_TEAMS_WEBHOOK_URI }}
    notification-summary: Your custom notification message 
    notification-color: 17a2b8
    timezone: Europe/Bucharest
```

For more details on syntax and parameteres see https://github.com/jdcargile/ms-teams-notification
