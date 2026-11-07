import { execFile } from "node:child_process";

export function getGitDiff(cwd: string): Promise<string> {
    return new Promise<string>((resolve, reject) => {

        execFile(
            "git",
            ["diff", "HEAD"],
            { cwd: cwd},
            (error, stdout, stderr) => {
                if (error) {
                    reject("Failed to get Diff" + error)
                } else {
                    resolve("diff: " + stdout)
                }
            }
        )
    });
}
