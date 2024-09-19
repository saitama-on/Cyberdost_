import * as vscode from 'vscode';
import axios from 'axios';
const { GoogleGenerativeAI } = require("@google/generative-ai");

const apiKey = process.env.API_KEY; // PUT your api key here
const genAI = new GoogleGenerativeAI(apiKey);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });


export function activate(context: vscode.ExtensionContext) {
  console.log("Extension 'cyberdost1' is now active!");

  let disposable = vscode.commands.registerCommand('cyberdost1.runSecurityAnalysis', async () => {
    await testGeminiApi();
  });

  context.subscriptions.push(disposable);
  
}

export function deactivate() {}



async function testGeminiApi() {
		vscode.window.showInformationMessage('Running security analysis with Gemini Pro...');
	  
		const editor = vscode.window.activeTextEditor;
		if (!editor) {
		  vscode.window.showWarningMessage('No active editor found.');
		  return;
		}
	  
		const document = editor.document;
		const code = document.getText().toString();
		const prompt = `Tell me if there are any vulnerabilities in the following code and suggest improvements in a single line:\n\n${code}`;
	  
		try {
		  const result = await model.generateContent(prompt);
		  const analysis = result.response.text();
	  
		  // Create a comment with the analysis resultcd
		  const comment = `/*\nSecurity Analysis:\n${analysis}\n*/`;
	  
		  // Insert the comment at the end of the file
		  const edit = new vscode.WorkspaceEdit();
		  const endPosition = new vscode.Position(document.lineCount, 0);
		  edit.insert(document.uri, endPosition, `\n${comment}\n`);
		  
		  await vscode.workspace.applyEdit(edit);
		  vscode.window.showInformationMessage('Security analysis comment added to the file.');
	  
		} catch (err: any) {
		  vscode.window.showErrorMessage(`Error running Gemini Pro analysis: ${err.message}`);
		}
	  }

	


