/**
 * @author         Justus van den Berg (jfwberg@gmail.com)
 * @date           October 2023
 * @copyright      (c) 2023 Justus van den Berg
 * @license        MIT (See LICENSE file in the project root)
 * @description    LWC JS Class
 */
// Lightning stuff
import   LightningAlert     from 'lightning/alert';

/** **************************************************************************************************** **
 **                                           SUPPORT METHODS                                            **
 ** **************************************************************************************************** **/
export function handleError(error){
    LightningAlert.open({
        message : (error.body) ? error.body.message : error.message,
        label   : 'Error',
        theme   : 'error'
    });
}


/**
 * Copied from github user gonzalezjesus and slightly modified for export
 * https://github.com/gonzalezjesus/sf-clips/blob/main/force-app/main/default/lwc/copyTextToClipboard/copyTextToClipboard.js
 * 
 * Import and invoke the copyTextToClipboard method passing the content you want to put in the clipboard as param. 
 * You can use "\n" to add line breaks to the text. You can also see an example this in the component "copyToClipboardBtn".
 */
export function copyTextToClipboard(content){
	
    // Create an input field with the minimum size and place in a not visible part of the screen
	let tempTextAreaField = document.createElement('textarea');
	tempTextAreaField.style = 'position:fixed;top:-5rem;height:1px;width:10px;';

	// Assign the content we want to copy to the clipboard to the temporary text area field
	tempTextAreaField.value = content;

	// Append it to the body of the page
	document.body.appendChild(tempTextAreaField);

	// Select the content of the temporary markup field
	tempTextAreaField.select();

	// Run the copy function to put the content to the clipboard
	document.execCommand('copy');

	// Remove the temporary element from the DOM as it is no longer needed
	tempTextAreaField.remove();
}


/**
 * Method to download a specific file
 */
export function handleDownload(template, fileName, fileExtension, mimeType, content, addTimestamp){

    // Setup download link
    let a = document.createElement('a');
    a.style.display = 'none';  
    a.setAttribute('download', fileName + ((addTimestamp) ? ('_' + new Date().toISOString().replace(/(\.\d{3})|[^\d]/g,''))  : '') + fileExtension);
    a.setAttribute('href', 'data:' + mimeType + ',' + encodeURIComponent(content));
    
    // Add, execute and remove from DOM
    template.appendChild(a);
    a.click();
    template.removeChild(a);
}


/**
 * Method that selects the a text on click for easy copying
 */
export function selectText(element){
	if (document.body.createTextRange){ 
		var range = document.body.createTextRange();
		range.moveToElementText(element);
		range.select();
	}else if (window.getSelection){
		var selection = window.getSelection();
		var range = document.createRange();
		range.selectNodeContents(element);
		selection.removeAllRanges();
		selection.addRange(range);
	}
}


/**
 * Method to remove the namespace prefix and the __c or any type of the fields
 * YAMLs do not support __ in the name or the YAML will be rejected
 */
export function removePreAndPostFix(str){

    const myArray = str.split("__");
    
    switch (myArray.length) {
        case 2:{
            return myArray[0];
        }
        case 3:{
            return myArray[1];
        }
        default:{
            return str;
        }
    }
}