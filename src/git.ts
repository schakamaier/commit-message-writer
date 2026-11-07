import { execFile } from "node:child_process";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

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
                    resolve(stdout)
                }
            }
        )
    });
}

export function getUntrackedFiles(cwd: string): Promise<string[]> {
    return new Promise<string[]>((resolve, reject) => {
        execFile(
            "git",
            ["ls-files", "--others", "--exclude-standard"],
            {cwd: cwd},
            (error, stdout, stderr) => {
                if (error) {
                    reject(error);
                } else {
                    const files = stdout.split("\n")
                    const filterdFiles = files.filter(file => file.trim() !== "");
                    resolve(filterdFiles)
                }
            }
        )
    })
};

export async function getUntrackedFileContents(cwd: string, files: string[]): Promise<string[]> {

    const contents = await Promise.all(
        files.map(file => readFile(join(cwd, file), "utf8"))
    );
    const formatedFiles = files.map((file, index) => {
        return `file: ${file}
        ${contents[index]}`;
    })

    return formatedFiles
}
export async function getCompleteGitDiff(cwd: string): Promise<string> {
    const gitDiff = await getGitDiff(cwd)
    const untrackedFiles = await getUntrackedFiles(cwd)
    const untrackedFileContents = await getUntrackedFileContents(cwd, untrackedFiles)

    const completeDiff = `Tracked changes:
${gitDiff.length > 0 ?gitDiff :`None`}

New Files:
${untrackedFiles.length > 0 ?untrackedFileContents.join("\n\n") :`None`}`;

    return completeDiff
}