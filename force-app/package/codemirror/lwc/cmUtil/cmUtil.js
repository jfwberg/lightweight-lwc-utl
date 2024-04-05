// Code mirror instance
let cm;


/**
 * Function to check if a CodeMirror instance exists before doing anything else
 * throw an error in case a modal doesnt exist
 */ 
const cmExists = (template,codeMirrorClassName) => {
	// Check the Modal exists based on the class name in the template	
	if(template.querySelector('.' + codeMirrorClassName)){
		cm = template.querySelector('.' + codeMirrorClassName);
		return true;
	}else{
		throw 'No CodeMirror Component with class name "'+codeMirrorClassName+'" found. The class name is case sensitive and does not require the dot at the start.';
	}
}


/**
 * Method to execute CodeMirror commands
 */
const execCmCommand = (template, codeMirrorClassName, command) => {
	if(cmExists(template, codeMirrorClassName)){
		cm.execCommand(command);
	}
}


/**
 * Method to get the CodeMirror selected text
 */
const getCmSelection = (template, codeMirrorClassName) => {
	if(cmExists(template, codeMirrorClassName)){
		return cm.getSelection();
	}
}

const commentCmSelection = (template, codeMirrorClassName) => {
	if(cmExists(template, codeMirrorClassName)){
		cm.commentSelection(false);
	}
}

const unCommentCmSelection = (template, codeMirrorClassName) => {
	if(cmExists(template, codeMirrorClassName)){
		cm.commentSelection(true);
	}
}

const autoFormatCmSelection = (template, codeMirrorClassName) => {
	if(cmExists(template, codeMirrorClassName)){
		cm.autoFormatSelection();
	}
}

const insertCmString = (template, codeMirrorClassName,str) => {
	if(cmExists(template, codeMirrorClassName)){
		cm.insertString(str);
	}
}

/**
 * Method to get a CodeMirror option value
 */
 const getCmOption = (template, codeMirrorClassName, option) => {
	if(cmExists(template, codeMirrorClassName)){
		cm.getOption(option);
	}
}


/**
 * Method to set CodeMirror options
 */
const setCmOption = (template, codeMirrorClassName, option, value) => {
	if(cmExists(template, codeMirrorClassName)){
		cm.setOption(option,value);
	}
}


/**
 * Method to get the CodeMirror theme
 */
const getCmTheme = (template, codeMirrorClassName) => {
	if(cmExists(template, codeMirrorClassName)){
		return cm.getTheme();
	}
}


/**
 * Method to set the CodeMirror theme
 */
const setCmTheme = (template, codeMirrorClassName,themeName) => {
	if(cmExists(template, codeMirrorClassName)){
		cm.setTheme(themeName);
	}
}


/**
 * Method to get the CodeMirror theme
 */
 const getCmMode = (template, codeMirrorClassName) => {
	if(cmExists(template, codeMirrorClassName)){
		return cm.getOption('mode');
	}
}


/**
 * Method to set the CodeMirror mode
 */
const setCmMode = (template, codeMirrorClassName, modeName) => {
	if(cmExists(template, codeMirrorClassName)){
		cm.setOption('mode', modeName);
	}
}


/**
 * Method to set the CodeMirror value
 */
 const getCmValue = (template, codeMirrorClassName) => {
	if(cmExists(template, codeMirrorClassName)){
		return cm.value;
	}
}

/**
 * Method to set the CodeMirror value
 */
const setCmValue = (template, codeMirrorClassName, value) => {
	if(cmExists(template, codeMirrorClassName)){
		cm.setValue(value);
	}
}


export {
	cmExists,
	execCmCommand,
	getCmSelection,
	commentCmSelection,
	unCommentCmSelection,
	autoFormatCmSelection,
	insertCmString,
	getCmOption,
	setCmOption,
	getCmTheme,
	setCmTheme,
	getCmMode,
	setCmMode,
	getCmValue,
	setCmValue
}