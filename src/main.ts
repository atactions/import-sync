import * as core from '@actions/core';
import * as exec from '@actions/exec';
const Github = require('@actions/github');
const Octokit = require('@octokit/rest').plugin(require('@octokit/plugin-retry'));
const context = Github.context;
const octokit = new Octokit({auth: githubToken});
const url=core.getInput('url', { required: true });
const cmds=core.getInput('cmds', { required: true });
const repository=core.getInput('repository', { required: true });
const github_token=core.getInput('github_token', { required: true });

async function run() {
  try {
  let cmds_=cmds.replace(':url',url)
  .replace(':repository',repository)
  .replace(':github_token',github_token);
  console.log('cmds: ',cmds_);
  let args=JSON.parse(cmds_);
  for (let c of args){
	await exec.exec(c,[]);
  }  
  } catch (error) {
      console.log(error);
      core.setFailed('Failed to create or merge pull request');
  }
}

run();
