import * as vscode from "vscode";
import {
    getCompleteGitDiff
} from "./git"
import { OpenrouterProvider } from "./OpenrouterProvider";

export function activate(context: vscode.ExtensionContext) {
    const workspaceFolder = vscode.workspace.workspaceFolders?.[0];
    if (!workspaceFolder) {
        vscode.window.showErrorMessage("no Workspace folder opened")
        return
    }
    const workspacepath: string = workspaceFolder.uri.fsPath;

    const testcommand = vscode.commands.registerCommand(
        "commit-message-writer.generate",
        async () => {
            let diff: string;

            const config = vscode.workspace.getConfiguration("commit-message-writer")
            const model = config.get<string>("model")

            if (!model) {
                vscode.window.showErrorMessage("No AI model configurated")
                return;
            }

            const apiKey = await context.secrets.get("openrouter-api-key")
            if (!apiKey) {
                vscode.window.showErrorMessage("No API key configurated! Please set your openrouter API key first! ")
                return
            }

            const provider = new OpenrouterProvider(apiKey, model);

            try {
                diff = await getCompleteGitDiff(workspacepath);
                vscode.window.showInformationMessage("Successfully retrieved diff")
            } catch (error) {
                console.log("Failed to retrieve git diff:\n" + error)
                vscode.window.showErrorMessage("Failed to retrieve Git Diff!")
                return;
            }
            try {
                const response = await provider.generateResponse(diff)
                console.log(response)
                vscode.window.showInformationMessage("Successfully generated response")
            } catch (error){
                vscode.window.showErrorMessage("Failed to generate response")                
                if (error instanceof Error) {
                    vscode.window.showErrorMessage(error.message)
                } else {
                    vscode.window.showErrorMessage("an unknown error occurred")
                }
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