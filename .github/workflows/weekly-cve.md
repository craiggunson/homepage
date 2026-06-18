---
description: |
  This workflow creates a weekly security update PR. 

on:
  schedule: weekly
  workflow_dispatch:

permissions:
  contents: read
  issues: read
  pull-requests: read

network: defaults

tools:
  github:
    # gh aw compile
    # If in a public repo, setting `lockdown: false` allows
    # reading issues, pull requests and comments from 3rd-parties
    # If in a private repo this has no particular effect.
    lockdown: false
    min-integrity: none # This workflow is allowed to examine and comment on any issues

safe-outputs:
  mentions: false
  allowed-github-references: []
  create-issue:
    title-prefix: "[repo-status] "
    labels: [report, daily-status]
    close-older-issues: true
source: githubnext/agentics/workflows/repo-status.md@e15e57b40918dbca11b350c55d02ab61934afa75
---

# Repo Status

Create an upbeat daily status report for the repo as a GitHub issue.

## What to include

- Only high and critical CVEs from the security report.


## Process

1. Gather high and critical CVE report from here https://github.com/craiggunson/homepage/security/dependabot or the API
2. Use pnpm to evaluate which packages can be upgraded
3. Make edits to package.json
4. run pnpm install to re-generate pnpm-lock.yaml
5. Raise a pull-request.

