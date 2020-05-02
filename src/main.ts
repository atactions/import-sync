import * as core from '@actions/core';
import * as exec from '@actions/exec';
const Github = require('@actions/github');
const Octokit = require('@octokit/rest').plugin(require('@octokit/plugin-retry'));
const context = Github.context;
const github_token=core.getInput('github_token', { required: true });
const octokit = new Octokit({auth: github_token});
const url=core.getInput('url', { required: true });
const cmds=core.getInput('cmds', { required: true });
const repository=core.getInput('repository', { required: true });

async function run() {
  try {
  let cmds_=cmds.replace(':url',url)
  .replace(':repository',repository)
  .replace(':github_token',github_token);
  console.log('cmds: ',cmds_);
  let args=cmds_.split('\n');
  for (let c of args){
	c=c.trim();
	if(c){await exec.exec(,[])};
  }  
  } catch (error) {
      console.log(error);
      core.setFailed('Failed to create or merge pull request');
  }
}

run();
