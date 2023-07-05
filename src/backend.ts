import * as vscode from 'vscode';

const MAX_FILES = 2048;

class GraphFile {
    public path: vscode.Uri;

    private analysisResultData: string[];

    constructor(path: vscode.Uri) {
        this.path = path;
    }
};

export async function analyzeAllFiles(context: vscode.ExtensionContext): Promise<GraphFile[]> {
    const files = await vscode.workspace.findFiles('*', null, MAX_FILES);
    const result: GraphFile[] = [];

    // TODO: Spread these async operations out in 100 instances and use Promise.all to wait for them all at once.
    for (const file of files) {
        result.push(await analyzeFile(file));
    }

    return result;
}

export async function analyzeFile(path: vscode.Uri): Promise<GraphFile> {
    const textBytes = await vscode.workspace.fs.readFile(path);
    const text = textBytes.toString();

    return analyzeText(path, text);
}
function analyzeText(path: vscode.Uri, text: string): GraphFile {
    // TODO: Derive some useful information from the text here.

    return new GraphFile(path);
}
