import * as vscode from 'vscode';

const MAX_FILES = 2048;

class GraphFile {
    public path: vscode.Uri;

    private analysisResultData: Map<string, number>;

    constructor(path: vscode.Uri, map: Map<string, number>) {
        this.path = path;
        this.analysisResultData = map;
    }
};

export async function analyzeAllFiles(context: vscode.ExtensionContext): Promise<GraphFile[]> {
    const files = await vscode.workspace.findFiles('*', null, MAX_FILES);
    const filePromises: Promise<GraphFile>[] = [];
    const result: GraphFile[] = [];

    for (const file of files) {
        filePromises.push(analyzeFile(file));
    }

    try {
        const results = await Promise.all(filePromises);
        return results;
    } catch (error) {
        // TODO: Handle errors here
        throw new Error('Error:' +error);
    }

}

export async function analyzeFile(path: vscode.Uri): Promise<GraphFile> {
    const textBytes = await vscode.workspace.fs.readFile(path);
    const text = textBytes.toString();

    return analyzeText(path, text);
}
function analyzeText(path: vscode.Uri, text: string): GraphFile {
    // TODO: Derive some useful information from the text here.
    const frequencyMap = wordFrequency(text);
    return new GraphFile(path, frequencyMap);
}
// calculates the frequency of each word split by non word characters
function wordFrequency(text: string): Map<string, number> {
    const words = text.toLowerCase().split(/\W+/);
    const frequencyMap = new Map<string, number>();
  
    for (const word of words) {
      if (word) {
        const count = frequencyMap.get(word) || 0;
        frequencyMap.set(word, count + 1);
      }
    }
  
    return frequencyMap;
  }