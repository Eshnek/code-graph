import * as vscode from 'vscode';

import * as frontend from './frontend';

export function activate(context: vscode.ExtensionContext) {
    frontend.activate(context);
}
