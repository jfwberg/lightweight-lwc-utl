# Lightweight - LWC Util
A lightweight Lightning Web Component Utility library for common javascript functions and generating ```lightning-datatable``` data structures with both data and columns.

## Blog (Datatable)
https://medium.com/@justusvandenberg/create-lightning-web-component-datatable-columns-using-apex-4f305ca8d9bb

## Package Info
| Info | Value |
|---|---|
|Name|Lightweight - LWC Util|
|Version|0.4.0-2|
|Managed Installation URL | */packaging/installPackage.apexp?p0=04tP3000000SkG1IAK* |
|Unlocked Installation URL| */packaging/installPackage.apexp?p0=04tP3000000SkHdIAK* |

# Javascript Functions
## Utility functions
```javascript
// Import the custom Utils, only import what you require in your code
import {handleError, copyTextToClipboard, handleDownload, selectText, removePreAndPostFix} from 'utl/util';

// Outputs a lightning alert with a javascript or Apex error message
handleError(error);

// Copies text to the clipboard
copyTextToClipboard(content);

// Create a file download when you click on a certain link
handleDownload(template, fileName, fileExtension, mimeType, content, addTimestamp);

// Selects text inside an element for easy copy and paste
selectText(element)

// Remove the field pre-and postfix i.e. utl__Field_Name__c will become Field_Name
removePreAndPostFix(str)
```
## Modal functions
The utility also has a number of modals for outputting data. You can use one of the below examples
 
```javascript
// Modals
import ldtModal         from "utl/ldtModal";
import multiLdtModal    from "utl/multiLdtModal";
import textModal        from "utl/textModal";
import textareaModal    from "utl/textareaModal";
import colorPickerModal from "utl/colorPickerModal";

// The color modal returns the color code (#CCCCCC) on close for you handle
async handleOpenColorPickerModal(color) {
    const colorCode = await colorPickerModal.open({
        color: color,
        size: 'small'
    });
    
    // If all went well, udate the color
    if(colorCode !== undefined){
        this.youMethod(colorCode);
    }
}

// The Lightning Datatable Modal does not require any callback by default as it is for outputting a table
handleOpenLdtModal(header, ldt){
    ldtModal.open({
        header : header,
        ldt: ldt
    });
}

// The Text Modal does not require any callback by default as it is for outputting lightning formatted text
handleOpenTextModal(header, content){
    textModal.open({
        header : header,
        content: content
    });
}

// The 
handleOpenTextareaModal(){
    textareaModal.open({
        
        // Modal info / content and if the textarea is disabled
        size             : 'small',
        label            : 'Modal label',
        content          : this.textareaContent,
        disabled         : false,
        
        // Download info
        fileName         : 'DataGraph',
        fileExtension    : '.json',
        fileMimeType     : 'application/json; charset=utf-8;',
        includeTimestamp : true,
        
        // Button visibillity for all types of buttones
        copyButton       : true,
        downloadButton   : true,
        prettifyButton   : true,    // Only works for JSON
        closeButton      : true
    });
}catch(error){
    handleError(error);
}

// Method to open a Modal with multiple data tables, see Apex below
handleOpenMultiLdtModal(){
        try{
            multiLdtModal.open({
                header    : "Detailed Data Graph Metadata",
                tableList : this.dataTables,
                size      : 'medium'
            });
        }catch(error){
            handleError(error);
        }
    }
    
```

```java
/**
 * Example of multiple data tables and their (optional) header that are going to
 * be displayed using the multiLdtModal
 */
List<Map<String, Object>> dataTables = new List<Map<String, Object>>{
    new Map<String, Object>{
        'key'    => '1',
        'header' => 'Table 01',
        'ldt'    => new utl.Ldt()
    },
    new Map<String, Object>{
        'key'    => '2', 
        'header' => 'Table 02',
        'ldt'    => new utl.Ldt()
    }
}
```

# Codemirror Methods
In version 4.0 the code editor plugin "Codemirror" version 5.65.16 last updated at 20-11-2023 has been added as a lightweight implementation for LWC.
I have no idea if it is implemented correctly, but it seems to work pretty well. I ported this when LWC just was released and never really updated it since besides the version. It's pretty cool though and works well, but don't judge the code too much.

[**Documentation update to follow soon**]




```javascript
// Internal indicator that code mirror has loaded in the child component
codemirrorLoaded	= false;

// CodeMirror textarea Always set some default values
codemirrorClass     = 'ta';
codemirrorTheme		= 'default';
codemirrorMode		= 'text/x-markdown';
codemirrorValue		= '';
codemirrorSize      = {width: "100%", height : 250};
codemirrorDisabled	= false;
codemirrorSave      = () => {};
codemirrorLoadingComplete = () => {this.codemirrorLoaded = true;}


// Textarea methods are used for commonly used Codemirror settings
// Get access to the textarea methods, single textarea
this.template.querySelector('c-cm-textarea').setMode('text/x-java');

// Get access to the text area methods, multiple textareas can be set by class name
this.template.querySelector('.textareaClass').setMode('text/x-java');

// Full access to the CodeMirror instance, this gives you full control
let cm = this.template.querySelector('.textareaClass').cm;
cm.setOption('mode','text/x-java');
```

```html
<!-- Theme picklist -->
<c-cm-theme-picklist 
    value        = {codemirrorTheme}
    onvaluechange= {handleThemeChange}
    variant      = ""
    label        = "Editor Theme"
></c-cm-theme-picklist>

<!-- Mode picklist -->
<c-cm-mode-picklist
    value         = {codemirrorMode}
    onvaluechange = {handleModeChange}
    variant       = ""
    label         = "Editor Mode (Language)"
></c-cm-mode-picklist>

<!-- Example of a CM Textarea in a form component -->
<div class="slds-var-p-around_small">
    <div class="slds-form-element">
        <label class="slds-form-element__label" for="cm-ta">SQL Query</label>
        <div class="slds-form-element__control">
            <div class="slds-box cm-ta" id="cm-ta">
                <c-cm-textarea
                    class             = {codemirrorClass}
                    theme             = {codemirrorTheme}
                    mode              = {codemirrorMode} 
                    size              = {codemirrorSize}
                    value             = {codemirrorValue} 
                    disabled          = {codemirrorDisabled}
                    onsave            = {codemirrorSave}
                    onloadingcomplete = {codemirrorLoadingComplete}
                ></c-cm-textarea>
            </div>
        </div>
    </div>
</div>
```

```css
/* CSS for the CM Textarea
.cm-ta{
    padding     : 0px !important;
    border-color: #747474 !important;
}
```


# Lightning - Datatable Classes
The ```utl.Ldt``` class has the purpose of representing a full lightning data table object. It's goal is create both the data and the columns in Apex instead of half in Apex half in Javascript.

We can argue where where this action belongs... In my opinion if you generate *dynamic* tables and need to send the header and type information from Apex to be stiched together in Javascript, you should do it fully in Apex.

If you have a static table, you should probably manage the headers in Javascript. So before you implement this, make sure you are doing the right thing for your code.

This class is simply a class representing the data structure of the Lightning Datatable as described here: https://developer.salesforce.com/docs/component-library/bundle/lightning-datatable/documentation

All methods wit hthe exception of the toJSON() method return the full class so you can chain all the  methods. This makes it easier to create large tables and make it more readable if done correct.

For data time values see the formatted documentation https://developer.salesforce.com/docs/component-library/bundle/lightning-formatted-date-time/specification

## HTML Implementation
```html
<utl-extended-datatable 
    key-field               = {ldt.keyField} 
    data                    = {ldt.data} 
    columns                 = {ldt.columns}
    hide-checkbox-column    = {ldt.hideCheckboxColumn}
    show-row-number-column  = {ldt.showRowNumberColumn}
    onrowaction             = {handleRowAction}
></utl-extended-datatable>
```

## Javscript Implementation Example
```javascript
// Custom Utils
import {handleError} from 'utl/util';

// Apex Classes
import getTable      from '@salesforce/apex/YourClass.getTable';

// Loading indicator
loading = false;

// Lightning data table
ldt = {};

// Method that calls an apex Method that returns a Lightning Data Table Object (utl.Ldt)
handleGetTable(){
    try{
        this.loading = true;

        // Execute apex
        getTable()
        .then(apexResponse => {
            // Set the table to the response
            this.ldt = apexResponse;
        })
        .catch(error => {
            handleError(error);
        })
        .finally(()=>{
            this.loading = false;
        });
    }catch(error){
        handleError(error);
    }finally{
        this.loading = false;
    }
}
```
## Apex ult.Ldt Example
This is an example of what the Apex LWC controller could look like. See full details below.
```java
@AuraEnabled
public static utl.Ldt getTable(){
    try {

        // Create a key value pair table
        utl.Ldt ldt = new utl.Ldt()
            .setupKeyValue()
            .addKeyValuePair('Key 01','Key 01')
            .addKeyValuePair('Key 02','Key 02')
        ;

        // Return the data table
        return ldt;
        
    } catch (Exception e) {
        throw new AuraHandledException(e.getMessage());
    }
}
```

## Lightning Datatable (utl.Ldt) Methods
|Method|Data Type|Description|
|--------|-------------|---|
|``` setupKeyValue()```                                     | utl.Ldt  | Setup the table as a key value table. This creates a table with two columns: "key" and "value". With the header names "Key" and "Value"|
|``` setupKeyValue(String keyLabel, String valueLabel)```   | utl.Ldt  | Setup the table as a key value table. This creates a table with two columns: "key" and "value". The key and value headers are user defined|
|``` setKeyField(String keyField)```                        | utl.Ldt  | Setter for the keyField variable|
|``` setHideCheckboxColumn(Boolean hideCheckboxColumn)```   | utl.Ldt  | Setter for the hideCheckboxColumn variable|
|``` setShowRowNumberColumn(Boolean showRowNumberColumn)``` | utl.Ldt  | Setter for the showRowNumberColumn variable|
|``` addColumn(utl.Ldt.Col col)```                          | utl.Ldt  | Method to add a column object to the table. See the details on the *utl.Ldt.Col* class below |
|``` setData(List<Map<String,Object>> data)```              | utl.Ldt  | Method to set the full data variable at once|
|``` addRow(Map<String,Object> row)```                      | utl.Ldt  | Method to add a single row of data|
|``` addKeyValuePair(String key, Object value))```          | utl.Ldt  | Method to add a key / value pair row|
|``` toJSON()```                                            | *String* | Use this method to export the Data Table to a structure that can be read by the LWC controlling Javscript. Don't serialize your self if you use custom "classes". This also will ommit any null values.|

## Lightning Datatable Column (utl.Ldt.Col) Constructors
|Method|Description|
|--------|-------------|
|```Col(String label, String fieldName)```              | Constructor to create a new column with a label and a field name, this defaults the column type to "text" |
|```Col(String label, String fieldName, String type)``` | Constructor to create a new column with a label, field name and column type (text, number, URL etc. See documentation) |

## Lightning Datatable Column (utl.Ldt.Col) Methods
|Method|Data Type|Description|
|--------|-------------|---|
|```setCellAttributes(CellAttributes cellAttributes)```    | utl.Ldt.Col | Method to add cell attributes to a column. See the details on the *utl.Ldt.CellAttributes* class below
|```setColumnKey(String columnKey)```                      | utl.Ldt.Col | Setter for columnKey variable
|```setEditable(Boolean editable)```                       | utl.Ldt.Col | Setter for editable variable
|```setFieldName(String fieldName)```                      | utl.Ldt.Col | Setter for fieldName variable
|```setFixedWidth(Integer fixedWidth)```                   | utl.Ldt.Col | Setter for fixedWidth variable
|```setHideDefaultActions(Boolean setHideDefaultActions)```| utl.Ldt.Col | Setter for setHideDefaultActions variable
|```setHideLabel(Boolean hideLabel)```                     | utl.Ldt.Col | Setter for hideLabel variable
|```setIconName(String setIconName)```                     | utl.Ldt.Col | Setter for setIconName variable
|```setInitialWidth(Integer initialWidth)```               | utl.Ldt.Col | Setter for initialWidth variable
|```setLabel(String label)```                              | utl.Ldt.Col | Setter for label variable
|```setSortable(Boolean sortable)```                       | utl.Ldt.Col | Setter for sortable variable
|```setType(String type)```                                | utl.Ldt.Col | Setter for type variable
|```setTypeAttributes(TypeAttributes typeAttributes)```    | utl.Ldt.Col | Method to add type attributes to a column. See the details on the *utl.Ldt.TypeAttributes* class below


## Lightning Datatable CellAttributes (utl.Ldt.CellAttributes) Methods
|Method|Data Type|Description|
|--------|-------------|---|
|```setAlignment(String alignment)```                       | utl.Ldt.CellAttributes | Setter for alignment variable
|```setClass(String class_x)```                             | utl.Ldt.CellAttributes | Setter for class variable
|```setIconName(String iconName)```                         | utl.Ldt.CellAttributes | Setter for iconName variable
|```setIconLabel(String iconLabel)```                       | utl.Ldt.CellAttributes | Setter for iconLabel variable
|```setIconPosition(String iconPosition)```                 | utl.Ldt.CellAttributes | Setter for iconPosition variable
|```setIconAlternativeText(String iconAlternativeText)```   | utl.Ldt.CellAttributes | Setter for iconAlternativeText variable


## Lightning Datatable TypeAttributes (utl.Ldt.TypeAttributes) Methods
|Method|Data Type|Description|
|--------|-------------|---|
|```setColor(String color)```                                       | utl.Ldt.TypeAttributes | Setter for color variable
|```setMenuAlignment(String menuAlignment)```                       | utl.Ldt.TypeAttributes | Setter for menuAlignment variable
|```addRowAction(RowAction rowAction```                             | utl.Ldt.TypeAttributes | Method to add a row action to the actions column. See the details on the *utl.Ldt.RowAction* class below
|```setDisabled(Boolean disabled)```                                | utl.Ldt.TypeAttributes | Setter for disabled variable
|```setIconName(String iconName)```                                 | utl.Ldt.TypeAttributes | Setter for iconName variable
|```setIconPosition(String iconPosition)```                         | utl.Ldt.TypeAttributes | Setter for iconPosition variable
|```setName(String name)```                                         | utl.Ldt.TypeAttributes | Setter for name variable
|```setLabel(String label)```                                       | utl.Ldt.TypeAttributes | Setter for label variable
|```setTitle(String title)```                                       | utl.Ldt.TypeAttributes | Setter for title variable
|```setVariant(String variant)```                                   | utl.Ldt.TypeAttributes | Setter for variant variable
|```setIconClass(String iconClass)```                               | utl.Ldt.TypeAttributes | Setter for iconClass variable
|```setAlternativeText(String alternativeText)```                   | utl.Ldt.TypeAttributes | Setter for alternativeText variable
|```setClass(String class_x)```                                     | utl.Ldt.TypeAttributes | Setter for class_x variable
|```setCurrencyCode(String currencyCode)```                         | utl.Ldt.TypeAttributes | Setter for currencyCode variable
|```setMinimumIntegerDigits(Integer minimumIntegerDigits)```        | utl.Ldt.TypeAttributes | Setter for minimumIntegerDigits variable
|```setMinimumFractionDigits(Integer minimumFractionDigits)```      | utl.Ldt.TypeAttributes | Setter for minimumFractionDigits variable
|```setMaximumFractionDigits(Integer maximumFractionDigits)```      | utl.Ldt.TypeAttributes | Setter for maximumFractionDigits variable
|```setMinimumSignificantDigits(Integer minimumSignificantDigits)```| utl.Ldt.TypeAttributes | Setter for minimumSignificantDigits variable
|```setMaximumSignificantDigits(Integer maximumSignificantDigits)```| utl.Ldt.TypeAttributes | Setter for maximumSignificantDigits variable
|```setStep(Decimal step)```                                        | utl.Ldt.TypeAttributes | Setter for step variable
|```setDay(String day)```                                           | utl.Ldt.TypeAttributes | Setter for day variable
|```setEra(String era)```                                           | utl.Ldt.TypeAttributes | Setter for era variable
|```setHour(String hour)```                                         | utl.Ldt.TypeAttributes | Setter for hour variable
|```setHour12(String hour12)```                                     | utl.Ldt.TypeAttributes | Setter for hour12 variable
|```setMinute(String minute)```                                     | utl.Ldt.TypeAttributes | Setter for minute variable
|```setMonth(String month)```                                       | utl.Ldt.TypeAttributes | Setter for month variable
|```setSecond(String second)```                                     | utl.Ldt.TypeAttributes | Setter for second variable
|```setTimeZone(String timeZone)```                                 | utl.Ldt.TypeAttributes | Setter for timeZone variable
|```setTimeZoneName(String timeZoneName)```                         | utl.Ldt.TypeAttributes | Setter for timeZoneName variable
|```setWeekday(String weekday)```                                   | utl.Ldt.TypeAttributes | Setter for weekday variable
|```setYear(String year)```                                         | utl.Ldt.TypeAttributes | Setter for year variable
|```setLatitude(Decimal latitude)```                                | utl.Ldt.TypeAttributes | Setter for latitude variable
|```setLongitude(Decimal longitude))```                             | utl.Ldt.TypeAttributes | Setter for longitude variable
|```setLinkify(Boolean linkify)```                                  | utl.Ldt.TypeAttributes | Setter for linkify variable
|```setTooltip(String fieldName)```                                 | utl.Ldt.TypeAttributes | Setter for fieldName variable
|```setTarget(String target)```                                     | utl.Ldt.TypeAttributes | Setter for target variable


## Lightning Datatable FieldName (utl.Ldt.FieldName) Constructors
|Method|Description|
|--------|-------------|
|```FieldName(String fieldName)```| Default constructor to generate the value {fieldName : value}

## Lightning Datatable RowAction (utl.Ldt.RowAction) Constructors
|Method|Description|
|--------|-------------|
|```RowAction(String label, String name)```                 | Default constructor to set the label and the action name
|```RowAction(String label, String name, String iconName)```| Constructor that allows you to add an icon to the actions drop down

# Data Examples
Data can be added in a couple of ways. Either the full data set at once or a row at a time.

```java
// Add one row at a time
utl.Ldt ldt = new utl.Ldt()
    .addRow(new Map<String,Object>{
        'FirstName' => 'Action',
        'LastName'  => 'Hank'
    })
    .addRow(new Map<String,Object>{
        'FirstName' => 'Fois',
        'LastName'  => 'Gras'
    })
;
```

```java
// Add a full data set
utl.Ldt ldt = new utl.Ldt()
    .setData(
        new List<Map<String,Object>>{
            new Map<String,Object>{
                'FirstName' => 'Action',
                'LastName'  => 'Hank'
            },
            new Map<String,Object>{
                'FirstName' => 'Fois',
                'LastName'  => 'Gras'
            }
        }
    )
;
```
            
# Column Examples
## Key/Value pair
One of the most common types of tables I use are key value pairs to display some form of JSON data.
I created a specifc set of methods to create this type of table.
|Key|Value|
|----|---|
|Key 01| Value 01
|key 02| Value 02

To create this table you can simply use this code:
```java
utl.Ldt ldt = new utl.Ldt()
    .setupKeyValue()
    .addKeyValuePair('Key 01','Key 01')
    .addKeyValuePair('Key 02','Key 02')
;
```

## Actions column
If you want to create an actions drop down menu you have to create a column of type 'action' and add the row action type attributes.
You can set an initial width as well so the label shows. Optionally you can add a row action with an icon
```java
utl.Ldt ldt = new utl.Ldt()
    .addColumn(
        new utl.Ldt.Col('Actions', null)
            .setType('action')
            .setInitialWidth(80)
            .setTypeAttributes(
                new utl.Ldt.TypeAttributes()
                    .setMenuAlignment('auto')
                    .addRowAction(new Ldt.RowAction('Set Password', 'set_password'  ))
                    .addRowAction(new Ldt.RowAction('Set Color',    'set_color', 'utility:color_swatch'))
            ) 
    )
;
```
## URL
A URL fields points to a field that contains the URL
```java
utl.Ldt ldt = new utl.Ldt()
    .addColumn(
        new Ldt.Col('Field Label', 'Field_Api_Name')
            .setColumnKey('uniqueKey')
            .setType('url')
            .setFixedWidth(120)
            .setTypeAttributes(
                new Ldt.TypeAttributes()
                    .setLabel('Name')
                    .setTarget('_self')
                    .setTooltip('Field_Containing_Tooltip_Text_Api_Name')
            )
    )
;
```

