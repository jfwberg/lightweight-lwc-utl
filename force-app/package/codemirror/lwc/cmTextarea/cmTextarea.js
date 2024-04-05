// Salesforce stuff
import { LightningElement, api } from 'lwc';
import { loadScript, loadStyle } from 'lightning/platformResourceLoader';

// Custom utils
import {handleError}             from 'c/util';

// Code mirror classes
import codemirror                from '@salesforce/resourceUrl/codemirror';

// Main class
export default class CodeMirrorTextArea extends LightningElement {
    
    // CodeMirror instance
    cm;
    
    // Indicator if the loading has completed and the component is added in the DOM
    loaded = false;

    // Default values
    _theme		= 'default';
    _value		= '';
    _mode		= 'application/javascript';
    _disabled	= false;
    _height		= 400;
    _width		= "100%";

    // Returns the classes for the code handler
    // You can modify this for customized resize bars
    get handleClass(){
        return 'awb-code-editor_handle awb-code-editor_handle-default';
    }
    
    
    /**
     * THEME
     */
    @api
    get theme(){
        return this._theme;
    }
    set theme(value){
        this._theme = value;
        this.setTheme(value);
    }

    @api
    setTheme(value){
        if(this.loaded){
            this.cm.setOption('theme',value);
        }
    }


    /**
     * VALUE
     */
    @api 
    get value(){
        return this.cm.getValue();
    }
    set value(value){
        this._value = value;
        this.setValue(value);
    }
    @api
    setValue(value){
        if(this.loaded){
            this.cm.setValue(value);
        }
    }


    /**
     * MODE
     */
    @api 
    get mode(){
        return this._mode;
    }
    set mode(value){
        this._mode = value;
        this.setMode(value);
    }
    @api
    setMode(value){
        if(this.loaded){
            this.cm.setOption('mode',value);
        }
    }


    /**
     * SIZE
     */
    @api 
    setSize(width,height){
        this._width = width;
        this._height = height;
        this.cm.setSize(width,height);
    }
    

    /**
     * DISABLED
     */
    @api 
    get disabled(){
        return this._disabled;
    }
    set disabled(value){
        this._disabled = value;
    }

    @api
    setDisabled(value){
        if(this.loaded){
            this.cm.setOption('readOnly',value);
        }
    }


    /**
     * FORMATTING METHODS
     */
    getSelectedRange() {
         return { 
             from : this.cm.getCursor(true),
             to   : this.cm.getCursor(false)
         };
    }

    @api getSelection(){
        return this.cm.getSelection();
    }

    @api autoFormatSelection() {
        var range = this.getSelectedRange();
        this.cm.autoFormatRange(range.from, range.to);
    }
    
    @api commentSelection(isComment) {
        var range = this.getSelectedRange();
        this.cm.commentRange(isComment, range.from, range.to);
    }

    @api selectAll() {
        this.cm.selectAll();
    }

    @api execCommand(obj) {
        this.cm.execCommand(obj);
    }

    @api insertString(str){
    
        if(this.cm.getSelection().length>0){
            this.cm.replaceSelection(str);
        }else{
            var doc = this.cm.getDoc();
            var cursor = doc.getCursor();
            var pos = {
               line: cursor.line,
               ch: cursor.ch
            }
            doc.replaceRange(str, pos);
        }
    }

    /**
     * Run execute on control + S
     */
    handleKeyDown(event){
        if ((event.key === 83 || event.keyCode === 83) && (event.metaKey || event.ctrlKey)){
          
            // Stop broswer default
            event.preventDefault();
              event.stopImmediatePropagation();
            
            // Dispatch the save event
            this.dispatchEvent(new CustomEvent('save'));
        }
    }


    /**
     * Functions for handling codemirror handle for expanding the codemirror box 
     */
    // Starting coordinates
    start_y;
    start_h;
    
    // Private variables
    _on_drag
    _on_release

    // Calculate the new height
    on_drag(e){
        this.cm.setSize(null, Math.max(0, (this.start_h + e.y - this.start_y)) );
    }

    on_release() {
        window.removeEventListener("mousemove", this._on_drag);
        window.removeEventListener("mouseup", 	this._on_release);
    }


    /**
     * Code to load after the component is loaded, the empty div needs to exist to hatch on to
     * It only works on DIVs not on textareas due to locker service, but this works fine now
     */
    connectedCallback(){		
        
        // Load base code mirror code scripts to generate global CodeMirror variable
        Promise.all([
            loadScript(this, codemirror + '/lib/codemirror.js'),
            loadStyle( this, codemirror + '/lib/codemirror.css'),
        ]).then(() => {
            
            // CodeMirror Class needs to exist first, so load additional scripts afterwards
            Promise.all([
                
                // CODEMIRROR CSS
                loadStyle(this,  codemirror+ '/addon/search/matchesonscrollbar.css'),
                loadStyle(this,  codemirror+ '/addon/fold/foldgutter.css'),
                loadStyle(this,  codemirror+ '/addon/hint/show-hint.css'),
                loadStyle(this,  codemirror+ '/addon/dialog/dialog.css'),
                loadStyle(this,  codemirror+ '/addon/display/fullscreen.css'),

                // CODEMIRROR THEMES
                loadStyle(this,  codemirror+ '/theme/ambiance.css'),
                loadStyle(this,  codemirror+ '/theme/eclipse.css'),
                loadStyle(this,  codemirror+ '/theme/lesser-dark.css'),
                loadStyle(this,  codemirror+ '/theme/material.css'),
                loadStyle(this,  codemirror+ '/theme/monokai.css'),
                
                // LIBS
                loadScript(this, codemirror + '/lib/util/formatting.js'),
                
                // MODES
                loadScript(this, codemirror + '/mode/javascript/javascript.js'),
                loadScript(this, codemirror + '/mode/xml/xml.js'),
                loadScript(this, codemirror + '/mode/css/css.js'),
                loadScript(this, codemirror + '/mode/clike/clike.js'),
                loadScript(this, codemirror + '/mode/vbscript/vbscript.js'),
                loadScript(this, codemirror + '/mode/htmlmixed/htmlmixed.js'),
                loadScript(this, codemirror + '/mode/markdown/markdown.js'),
                loadScript(this, codemirror + '/mode/sql/sql.js'),
                loadScript(this, codemirror + '/mode/csv/csv.js'),

                // ADD-ONS
                loadScript(this, codemirror + '/addon/dialog/dialog.js'),
                loadScript(this, codemirror + '/addon/display/fullscreen.js'),
                loadScript(this, codemirror + '/addon/runmode/runmode.js'),
                loadScript(this, codemirror + '/addon/mode/overlay.js'),
                loadScript(this, codemirror + '/addon/edit/closebrackets.js'),
                loadScript(this, codemirror + '/addon/edit/matchbrackets.js'),
                loadScript(this, codemirror + '/addon/edit/closetag.js'),
                loadScript(this, codemirror + '/addon/search/search.js'),
                loadScript(this, codemirror + '/addon/search/searchcursor.js'),		
                loadScript(this, codemirror + '/addon/search/match-highlighter.js'),
                loadScript(this, codemirror + '/addon/search/matchesonscrollbar.js'),
                loadScript(this, codemirror + '/addon/scroll/annotatescrollbar.js'),
                loadScript(this, codemirror + '/addon/selection/active-line.js'),
                loadScript(this, codemirror + '/addon/selection/selection-pointer.js'),
                loadScript(this, codemirror + '/addon/fold/foldgutter.js'),
                loadScript(this, codemirror + '/addon/fold/foldcode.js'),
                loadScript(this, codemirror + '/addon/fold/comment-fold.js'),
                loadScript(this, codemirror + '/addon/fold/xml-fold.js'),
                loadScript(this, codemirror + '/addon/fold/brace-fold.js'),
                loadScript(this, codemirror + '/addon/fold/markdown-fold.js')
                
            // When all scripts are loaded we can start the setup
            ]).then(() => {
                
                // Create code mirror window on the empty div with class codeMirror
                this.cm = CodeMirror(this.template.querySelector('.codeMirror'), {
                    lineNumbers      : true,
                    lineWrapping     : false,
                    styleActiveLine  : true,
                    tabSize          : 4,
                    indentUnit       : 4,
                    indentWithTabs   : false,
                    matchBrackets    : true,
                    autoCloseBrackets: true,
                    highlightSelectionMatches : {
                        annotateScrollbar: true,
                        minChars:3
                    },
                    mode             : this._mode,
                    autoCloseTags    : true,
                    matchTags        : {bothTags: true},
                    theme            : this._theme,
                    foldGutter       : true,
                    gutters          : ["CodeMirror-linenumbers", "CodeMirror-foldgutter"],
                    continueComments : true,
                    readOnly         : this._disabled,
                    extraKeys        : {
                        "F11": function(cm) {
                            cm.setOption("fullScreen", !cm.getOption("fullScreen"));
                        },
                        "Esc": function(cm) {
                            if (cm.getOption("fullScreen")){cm.setOption("fullScreen", false)};
                        }
                    },
                    value : this._value,
                    size  : { 
                        width: this._width,
                        height: this._height
                    }
                });

                // Set loaded to true
                this.loaded = true;

                // Initially you have to set the default values as the editor does not yet exists, so API value has to be set afer render
                // Note: the loaded variable needs to be set to true to render the editor first
                this.setSize(this._width, this._height);

                // Dispatch event so you can tell the parent the code has loaded completely
                this.dispatchEvent(new CustomEvent('loadingcomplete'));

                // Setup the handle at the bottom of the screen
                let handle = this.template.querySelector('.awb-code-editor_handle');
                
                // Bind the drag and release events
                this._on_drag	= this.on_drag.bind(this);
                this._on_release= this.on_release.bind(this);
                
                // Add the mouse down event
                handle.addEventListener("mousedown", (e) => {
                    
                    this.start_h = this.cm.getWrapperElement().offsetHeight;
                    this.start_y = e.y;
    
                    window.addEventListener("mousemove", this._on_drag);
                    window.addEventListener("mouseup", 	 this._on_release);
                });
            }).catch(error => {
                handleError(error);
            });
        })
        .catch(error => {
            handleError(error);
        });
    }
}