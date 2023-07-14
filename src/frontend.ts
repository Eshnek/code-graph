import * as vscode from 'vscode';

//-//

const WEBVIEW_ID = 'codeGraph';
const WEBVIEW_TITLE = 'Code Graph';
const WEBVIEW_OPTIONS: vscode.WebviewOptions = {
    enableScripts: true,
};


let viewPanel: vscode.WebviewPanel | null = null;

let extensionUri: vscode.Uri | null = null;
let frontendUri: vscode.Uri | null = null;
let frontendCodeUri: vscode.Uri | null = null;

//-//

export function activate(context: vscode.ExtensionContext) {
    viewPanel = vscode.window.createWebviewPanel(
        WEBVIEW_ID,
        WEBVIEW_TITLE,
        vscode.ViewColumn.One,
        WEBVIEW_OPTIONS
    );

    extensionUri = context.extensionUri;
    frontendUri = vscode.Uri.joinPath(extensionUri, 'dist', 'webview.js');
    frontendCodeUri = viewPanel.webview.asWebviewUri(frontendUri);

    viewPanel.webview.html = generateHtml();
}

//-//

function generateHtml(): string {
    return `
        <!DOCTYPE html>
        <html lang="en" id="chartContainer">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>${WEBVIEW_TITLE}</title>
            </head>
            <body>
                <canvas id="mainChart" />
            </body>
        </html>
        <script src="${frontendCodeUri}" />
    `;
}
