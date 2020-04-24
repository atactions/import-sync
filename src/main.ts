import * as core from '@actions/core';
const Github = require('@actions/github');
const Octokit = require('@octokit/rest').plugin(require('@octokit/plugin-retry'));
const githubToken = core.getInput('github_token', { required: true });
const context = Github.context;
const octokit = new Octokit({auth: githubToken});

async function run() {
  const allbranches=core.getInput('allbranches', { required: false }) || false;
  const owner = core.getInput('owner', { required: false }) || context.repo.owner;
  const mergeMethod = core.getInput('merge_method', { required: false });
  const prTitle = core.getInput('pr_title', { required: false });
  const prMessage = core.getInput('pr_message', { required: false });
  if(!allbranches){  
  const base = core.getInput('base', { required: false });
  const head = core.getInput('head', { required: false });
  try {
    let pr = await octokit.pulls.create({ owner: context.repo.owner, repo: context.repo.repo, title: prTitle, head: owner + ':' + head, base: base, body: prMessage, merge_method: mergeMethod, maintainer_can_modify: false });
    await octokit.pulls.merge({ owner: context.repo.owner, repo: context.repo.repo, pull_number: pr.data.number });
  } catch (error) {
    if (!!error.errors && error.errors[0].message == 'No commits between ' + context.repo.owner + ':' + base + ' and ' + owner + ':' + head) {
      console.log('No commits between ' + context.repo.owner + ':' + base + ' and ' + owner + ':' + head);
    } else {
      console.log(error)
      core.setFailed('Failed to create or merge pull request');
    }
  }
} else {
  try{
    let tp=await octokit.repos.get({ owner: context.repo.owner, repo: context.repo.repo});
    let p=await octokit.repos.listBranches({ owner:owner, repo:tp.data.parent.name});
    console.log("All branches:",p.data);
    for(let i of p.data){
      const base = i.name;
      const head = i.name;
       try {
          let pr = await octokit.pulls.create({ owner: context.repo.owner, repo: context.repo.repo, title: prTitle, head: owner + ':' + head, base: base, body: prMessage, merge_method: mergeMethod, maintainer_can_modify: false });
          await octokit.pulls.merge({ owner: context.repo.owner, repo: context.repo.repo, pull_number: pr.data.number });
        } catch (error) {
          if (!!error.errors && error.errors[0].message == 'No commits between ' + context.repo.owner + ':' + base + ' and ' + owner + ':' + head) {
            console.log('No commits between ' + context.repo.owner + ':' + base + ' and ' + owner + ':' + head);
          } else {
            console.log(error)            
          }
        }
    }
  }catch(error){
    console.log(error);
    core.setFailed('Failed to sync all branches.');
  }
}
  
}

run();
