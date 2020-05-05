"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const core = __importStar(require("@actions/core"));
const exec = __importStar(require("@actions/exec"));
const Github = require('@actions/github');
const Octokit = require('@octokit/rest').plugin(require('@octokit/plugin-retry'));
const context = Github.context;
const github_token = core.getInput('github_token', { required: true });
const octokit = new Octokit({ auth: github_token });
const url = core.getInput('url', { required: true });
const cmds = core.getInput('cmds', { required: true });
const repository = core.getInput('repository', { required: true });
function run() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let cmds_ = cmds.replace(':url', url)
                .replace(':repository', repository)
                .replace(':github_token', github_token);
            console.log('cmds: ', cmds_);
            let args = cmds_.split('\n');
            for (let c of args) {
                c = c.trim();
                if (c) {
                    yield exec.exec(c, []);
                }
                ;
            }
        }
        catch (error) {
            console.log(error);
            core.setFailed('Failed to create or merge pull request');
        }
    });
}
run();
