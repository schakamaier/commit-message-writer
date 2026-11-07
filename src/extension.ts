import * as vscode from "vscode";
import { getGitDiff } from "./git"
export function activate(context: vscode.ExtensionContext) {
    const workspaceFolder = vscode.workspace.workspaceFolders?.[0];
    if (!workspaceFolder) {
        vscode.window.showErrorMessage("no Workspace folder opend")
        return
    }
    const testcommand = vscode.commands.registerCommand(
        "commit-message-writer.generate",
        async () => {
            try {
                const workspacepath: string = workspaceFolder.uri.fsPath;
                const diff = await getGitDiff(workspacepath)
                vscode.window.showInformationMessage("Retrieved Diff succesfully") 
                console.log(diff)
            } catch (error) {
                console.log("Failed to retrieve git diff:\n" + error)
                vscode.window.showErrorMessage("Failed to retrieve Git Diff!")
            }
        }
    );

    context.subscriptions.push(testcommand)
}

export function deactivate() {}