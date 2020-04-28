# Import Sync 

[![Build](https://github.com/atactions/import-sync/workflows/Build%20and%20publish%20result/badge.svg)](https://github.com/atactions/import-sync/actions?workflow=Build%20and%20publish%20result)
![Version](https://img.shields.io/github/v/release/atactions/import-sync?style=flat-square)


Github action to sync your Forks.
This action uses octokit and the GitHub API to automatically sync imported repo.

# Example Workflow

```yml
name: Import Sync 

on:
  schedule:
    - cron: '*/30 * * * *'

jobs:
  sync:

    runs-on: ubuntu-latest

    steps:
      - uses: atactions/import-sync@v1
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          url: #original url of imported repo
          repository: owner/name #imported repo
          cmds: #cmdlines to exec,parameters github_token,url,repository are used
         
```

# Parameters

|  name           |   Optional  |   Default              |   description                                       |
|---              |---          |---                     |---                                                  |
|   url           | ❌          |                        |   original url of imported repo                    |
|   github_token  | ❌          |                        |   Token  to access the Github API                    |
|   repository    | ❌          |                 |   repository with format of owner/name                                      |
|   cmds          | ✅          | default to use git,see details in ![action.yml](https://github.com/atactions/import-sync/blob/master/action.yml)   |   cmdlines to exec                                        |

