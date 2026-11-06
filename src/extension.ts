import * as vscode from "vscode";
export function activate(context: vscode.ExtensionContext) {
    const command = vscode.commands.registerCommand(
        "commit-message-writer.generate",
        () => {
            vscode.window.showInformationMessage(
                "This is a test message"
            );
        }
    );

    context.subscriptions.push(command)
}

export function deactivate() {}