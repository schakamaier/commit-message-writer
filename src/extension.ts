import * as vscode from "vscode";
import {
    getCompleteGitDiff
} from "./git"
import { QwenProvider } from "./QwenProvider";
const provider = new QwenProvider();

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
                const diff = await getCompleteGitDiff(workspacepath);
                const response = await provider.generateResponse(diff)
                console.log(response)
                vscode.window.showInformationMessage("Successfully retrieved diff")
            } catch (error) {
                console.log("Failed to retrieve git diff:\n" + error)
                vscode.window.showErrorMessage("Failed to retrieve Git Diff!")
            }
        }
    );
    const setAPIKeyCommand = vscode.commands.registerCommand(
        "commit-message-writer.setApiKey",
        async () => {
            const apiKey = await vscode.window.showInputBox({
                prompt: "Enter your API Key",
                password: true
            }) 
            if (!apiKey) {
                return;
            }
            await context.secrets.store("openrouter-api-key", apiKey)
            vscode.window.showInformationMessage("API-Key successfully saved")
        }
    );
    context.subscriptions.push(setAPIKeyCommand)
    context.subscriptions.push(testcommand)
}

export function deactivate() {}