// Lightning stuff
import { api } from 'lwc';
import LightningModal from 'lightning/modal';

// Custom Utils
import {handleError}         from 'c/util';
import {handleDownload}      from 'c/util';
import {copyTextToClipboard} from 'c/util';


// Main class
export default class CmModal extends LightningModal {

    // Loading indicator
    loading = false;

    // Copy button style
    copyVariant     = 'brand';
    downloadVariant = 'brand';
    prettifyVariant = 'brand';

    // Codemirror config values
    codemirrorClass = 'ta';
    codemirrorLoaded= false;

    // Modal header
    @api header;
    
    // Codemirror configuration
    @api mode		= 'text/plain';
    @api theme	    = 'default';
    @api value	    = '';
    @api disabled	= false;

    // Default save function
    @api save = ()=>{};
    
    // Default on loading complete function
    @api loadingComplete = ()=>{
        this.codemirrorLoaded = true;
    };

    // Download info
    @api fileName         = 'Unknown_File_Name';
    @api fileExtension    = '.txt';
    @api fileMimeType     = 'text/plain';
    @api includeTimestamp = false;
    
    // Button visibility
    @api copyButton       = false;
    @api downloadButton   = false;
    @api prettifyButton   = false;
    @api closeButton      = false;

    // Method to get the CodeMirror Textarea Child component
    getCmTa(){
        return this.template.querySelector('c-cm-textarea');
    }
    

    /** **************************************************************************************************** **
     **                                           BUTTON HANDLERS                                            **
     ** **************************************************************************************************** **/
    handleClickClose() {
        this.close();
    }


    handleClickCopy() {
        try{
            this.loading = true;

            copyTextToClipboard(this.getCmTa().value);
            
            // Change color to green
            this.copyVariant = 'success';

        }catch(error){
            // Change color to red
            this.copyVariant = 'destructive';
            handleError(error);
        }finally{
            this.loading = false;
        }
    }


    handleClickDownload() {
        try{
            this.loading = true;

            handleDownload(
                this.template,
                this.fileName,
                this.fileExtension,
                this.fileMimeType,
                this.getCmTa().value,
                true
            );

            // change button color to green
            this.downloadVariant = 'success';

        }catch(error){
            // Change color to red
            this.downloadVariant = 'destructive';
            handleError(error);

        }finally{
            this.loading = false;
        }
    }


    handleClickPrettify(){
        try{
            this.loading = true;

            // change button color to green
            this.prettifyVariant = 'success';
            
            // Make it pretty            
            this.getCmTa().value = JSON.stringify(JSON.parse(this.getCmTa().value),null,4);
            
        }catch(error){
            // Change color to red
            this.prettifyVariant = 'destructive';
            handleError(error);
        }finally{
            this.loading = false;
        }
    }
    
    
    // Close button
    handleClickClose(){
        this.close();
    }
}