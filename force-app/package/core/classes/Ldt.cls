/**
 * @author         Justus van den Berg (jfwberg@gmail.com)
 * @date           Feb 2024
 * @copyright      (c) 2024 Justus van den Berg
 * @license        MIT (See LICENSE file in the project root)
 * @description    Class representing a lightning data table.
 *                 Use this when you dynamically get data from Apex that needs to be represented
 *                 as a lightning data table. This leaves apex in control of the data and columns.
 * @note           It's a bit of a big OTT class, but it will the job just fine when serializing it to JSON
 * @note           Use the toJSON() method in order to deal with the class reserved key word.
 */
global with sharing class Ldt {


    /** **************************************************************************************************** **
     **                                           GLOBAL VARIABLES                                           **
     ** **************************************************************************************************** **/
    @AuraEnabled global String  keyField = 'Id';
    @AuraEnabled global Boolean hideCheckboxColumn = true;
    @AuraEnabled global Boolean showRowNumberColumn= false;
    @AuraEnabled global Col[]   columns = new Col[]{};
    @AuraEnabled global List<Map<String,Object>> data = new List<Map<String,Object>>();


    /** **************************************************************************************************** **
     **                                           GLOBAL CONSTANTS                                           **
     ** **************************************************************************************************** **/
    // A mapping between Salesforce metadata field types and the LDT field types
    // use this to auto select the correct field type based on Salesforce metadata
    global static final Map<String,String> SF_FIELD_TYPE_MAPPING = new Map<String,String>{

    };

    // A mapping between Data Cloud metadata field types and the LDT field types
    // use this to auto select the matching field type from the Data Cloud metadata
    global static final Map<String,String> DC_FIELD_TYPE_MAPPING = new Map<String,String>{

    };

    // (Error) messages
    @TestVisible private static final String INVALID_COLUMN_TYPE_MSG = 'Invalid column type';


    /** **************************************************************************************************** **
     **                                    GLOBAL KEY VALUE PAIR METHODS                                     **
     ** **************************************************************************************************** **/
    /**
     * @description Method to setup the table as a key/value pair table with the default
     *              headers (Key / Value) 
     * @return      this;
     */
    global Ldt setupKeyValue(){
        return setupKeyValue(null,null);
    }


    /**
     * @description Method to setup the table as a key/value pair table with custom header labels
     * @return      this; 
     */
    global Ldt setupKeyValue(String keyLabel, String valueLabel){
        this.setKeyField('key');
        this.addColumn(new Col(keyLabel   ?? 'Key',   'key'  ));
        this.addColumn(new Col(valueLabel ?? 'Value', 'value'));
        return this;
    }

    /** **************************************************************************************************** **
     **                                        GLOBAL GETTER METHODS                                         **
     ** **************************************************************************************************** **/
    /**
     * @description Method that serialize the class to a string and removes 
     *              the "_x" from the variables named "class" (reserverd key word)
     */
    global String toJSON(){
        return JSON.serialize(this,true).replaceAll('_x', '');
    }
    
    /** **************************************************************************************************** **
     **                                        GLOBAL SETTER METHODS                                         **
     ** **************************************************************************************************** **/
    global Ldt setKeyField(String keyField){
        this.keyField = keyField;
        return this;
    }

    global Ldt setHideCheckboxColumn(Boolean hideCheckboxColumn){
        this.hideCheckboxColumn = hideCheckboxColumn;
        return this;
    }
    
    global Ldt setShowRowNumberColumn(Boolean showRowNumberColumn){
        this.showRowNumberColumn = showRowNumberColumn;
        return this;
    }

    global Ldt addColumn(Col col){
        this.columns.add(col);
        return this;
    }


    /** **************************************************************************************************** **
     **                                     GLOBAL DATA RELATED METHODS                                      **
     ** **************************************************************************************************** **/
    /**
     * @description Method to set the full data set at once
     */
    global Ldt setData(List<Map<String,Object>> data){
        this.data = data;
        return this;
    }


    /**
     * @description Method to add a single row
     */
    global ldt addRow(Map<String,Object> row){
        this.data.add(row);
        return this;
    }


    /**
     * @description Method to add a key value pair
     */
    global Ldt addKeyValuePair(String key, Object value){
        this.data.add(new Map<String,Object>{
            'key'   => key,
            'value' => value
        });
        return this;
    }

    /** **************************************************************************************************** **
     **                                    GLOBAL DATA STRUCTURE CLASSES                                     **
     ** **************************************************************************************************** **/
    /**
     * @description Class representing a lightning data table column
     */
    global class Col{

        /** **************************************************************************************************** **
         **                                           GLOBAL VARIABLES                                           **
         ** **************************************************************************************************** **/
        @AuraEnabled global CellAttributes cellAttributes;
        @AuraEnabled global String         columnKey;     
        @AuraEnabled global Boolean        editable;      
        @AuraEnabled global String         fieldName;
        @AuraEnabled global Integer        fixedWidth;
        @AuraEnabled global Boolean        hideDefaultActions;
        @AuraEnabled global Boolean        hideLabel;
        @AuraEnabled global String         iconName;       
        @AuraEnabled global Integer        initialWidth;
        @AuraEnabled global String         label;
        @AuraEnabled global Boolean        sortable;        
        @AuraEnabled global String         type;
        @AuraEnabled global TypeAttributes typeAttributes;
        @AuraEnabled global Boolean        wrapText;


        /** **************************************************************************************************** **
         **                                         GLOBAL CONSTRUCTORS                                          **
         ** **************************************************************************************************** **/
        global Col(String label, String fieldName){
            this.label     = label;
            this.fieldName = fieldName;
            this.setType('text');
        }

        global Col(String label, String fieldName, String type){
            this.label     = label;
            this.fieldName = fieldName;
            this.setType(type);
        }


        /** **************************************************************************************************** **
         **                                        GLOBAL SETTER METHODS                                         **
         ** **************************************************************************************************** **/
        global Col setCellAttributes(CellAttributes cellAttributes){
            this.cellAttributes = cellAttributes;
            return this;
        }

        global Col setColumnKey(String columnKey){
            this.columnKey = columnKey;
            return this;
        }

        global Col setEditable(Boolean editable){
            this.editable = editable;
            return this;
        }

        global Col setFieldName(String fieldName){
            this.fieldName = fieldName;
            return this;
        }

        global Col setFixedWidth(Integer fixedWidth){
            this.fixedWidth = fixedWidth;
            return this;
        }

        global Col setHideDefaultActions(Boolean setHideDefaultActions){
            this.hideDefaultActions = hideDefaultActions;
            return this;
        }

        global Col setHideLabel(Boolean hideLabel){
            this.hideLabel = hideLabel;
            return this;
        }

        global Col setIconName(String iconName){
            this.iconName = iconName;
            return this;
        }

        global Col setInitialWidth(Integer initialWidth){
            this.initialWidth = initialWidth;
            return this;
        }

        global Col setLabel(String label){
            this.label = label;
            return this;
        }

        global Col setSortable(Boolean sortable){
            this.sortable = sortable;
            return this;
        }

        global Col setType(String type){
            if(!(new Set<String>{   'action','boolean','button','button-icon','currency','date','date-local',
                                    'email','location','number','percent','phone','text','url',
                                    'salesforceLogoIcon','userIcon'
            }).contains(type)){
                throw new StringException(INVALID_COLUMN_TYPE_MSG);
            }
            this.type = type;
            return this;
        }

        global Col setTypeAttributes(TypeAttributes typeAttributes){
            this.typeAttributes = typeAttributes;
            return this;
        } 
    }


    /**
     * @description Class representing a Cell attributes
     */
    global class CellAttributes{
        
        @AuraEnabled global String alignment;
        @AuraEnabled global String class_x;
        @AuraEnabled global FieldName iconName;
        @AuraEnabled global FieldName iconLabel;    
        @AuraEnabled global String iconPosition;
        @AuraEnabled global String iconAlternativeText;


        global CellAttributes setAlignment(String alignment){
            this.alignment = alignment;
            return this;
        }

        global CellAttributes setClass(String class_x){
            this.class_x = class_x;
            return this;
        }

        global CellAttributes setIconName(String iconName){
            this.iconName = new FieldName(iconName);
            return this;
        }

        global CellAttributes setIconLabel(String iconLabel){
            this.iconLabel = new FieldName(iconLabel);
            return this;
        }

        global CellAttributes setIconPosition(String iconPosition){
            this.iconPosition = iconPosition;
            return this;
        }

        global CellAttributes setIconAlternativeText(String iconAlternativeText){
            this.iconAlternativeText = iconAlternativeText;
            return this;
        } 
    }
    
    
    global class TypeAttributes{

        /** **************************************************************************************************** **
         **                                           GLOBAL VARIABLES                                           **
         ** **************************************************************************************************** **/
        // Type: Extended Data Table (Custom)
        @AuraEnabled global FieldName color;

        // Type: Action
        @AuraEnabled global String menuAlignment;
        @AuraEnabled global RowAction[] rowActions;

        // Type: Button / Icon Button
        @AuraEnabled global Boolean disabled;
        @AuraEnabled global String iconName;
        @AuraEnabled global String iconPosition; 
        @AuraEnabled global FieldName name;
        @AuraEnabled global FieldName label;
        @AuraEnabled global String title; 
        @AuraEnabled global String variant;
        @AuraEnabled global String iconClass;
        @AuraEnabled global String alternativeText;
        @AuraEnabled global String class_x;

        // Type: Currency
        @AuraEnabled global String currencyCode;
        @AuraEnabled global Integer minimumIntegerDigits;
        @AuraEnabled global Integer minimumFractionDigits; 
        @AuraEnabled global Integer maximumFractionDigits;
        @AuraEnabled global Integer minimumSignificantDigits; 
        @AuraEnabled global Integer maximumSignificantDigits;
        @AuraEnabled global Decimal step;

        // Type: Date
        @AuraEnabled global String day; 
        @AuraEnabled global String era; 
        @AuraEnabled global String hour; 
        @AuraEnabled global String hour12; 
        @AuraEnabled global String minute; 
        @AuraEnabled global String month; 
        @AuraEnabled global String second; 
        @AuraEnabled global String timeZone; 
        @AuraEnabled global String timeZoneName; 
        @AuraEnabled global String weekday; 
        @AuraEnabled global String year;

        // Type: Location
        @AuraEnabled global Decimal latitude;
        @AuraEnabled global Decimal longitude;

        // Type: Text
        @AuraEnabled global Boolean linkify;

        // Type: URL
        @AuraEnabled global String target;
        @AuraEnabled global FieldName tooltip;

        /** **************************************************************************************************** **
        **                                        GLOBAL SETTER METHODS                                         **
        ** **************************************************************************************************** **/
        /** *************************** CUSTOM *************************** **/
        global TypeAttributes setColor(String color){
            this.color = new FieldName(color);
            return this;
        }

        /** *************************** ACTIONS *************************** **/
        global TypeAttributes setMenuAlignment(String menuAlignment){
            this.menuAlignment = menuAlignment;
            return this;
        }

        global TypeAttributes addRowAction(RowAction rowAction){
            if(this.rowActions == null){
                this.rowActions =  new RowAction[]{};
            }
            this.rowActions.add(rowAction);
            return this;
        }

        /** *************************** BUTTONS *************************** **/
        global TypeAttributes setDisabled(Boolean disabled){
            this.disabled = disabled;
            return this;
        }

        global TypeAttributes setIconName(String iconName){
            this.iconName = iconName;
            return this;
        }

        global TypeAttributes setIconPosition(String iconPosition){
            this.iconPosition = iconPosition;
            return this;
        }

        global TypeAttributes setName(String name){
            this.name = new FieldName(name);
            return this;
        }

        global TypeAttributes setLabel(String label){
            this.label = new FieldName(label);
            return this;
        }

        global TypeAttributes setTitle(String title){
            this.title = title;
            return this;
        }

        global TypeAttributes setVariant(String variant){
            this.variant = variant;
            return this;
        }

        global TypeAttributes setIconClass(String iconClass){
            this.iconClass = iconClass;
            return this;
        }

        global TypeAttributes setAlternativeText(String alternativeText){
            this.alternativeText = alternativeText;
            return this;
        }

        global TypeAttributes setClass(String class_x){
            this.class_x = class_x;
            return this;
        }

        /** *************************** CURRENCY *************************** **/
        global TypeAttributes setCurrencyCode(String currencyCode){
            this.currencyCode = currencyCode;
            return this;
        }

        global TypeAttributes setMinimumIntegerDigits(Integer minimumIntegerDigits){
            this.minimumIntegerDigits = minimumIntegerDigits;
            return this;
        }

        global TypeAttributes setMinimumFractionDigits(Integer minimumFractionDigits){
            this.minimumFractionDigits = minimumFractionDigits;
            return this;
        }

        global TypeAttributes setMaximumFractionDigits(Integer maximumFractionDigits){
            this.maximumFractionDigits = maximumFractionDigits;
            return this;
        }

        global TypeAttributes setMinimumSignificantDigits(Integer minimumSignificantDigits){
            this.minimumSignificantDigits = minimumSignificantDigits;
            return this;
        }

        global TypeAttributes setMaximumSignificantDigits(Integer maximumSignificantDigits){
            this.maximumSignificantDigits = maximumSignificantDigits;
            return this;
        }

        global TypeAttributes setStep(Decimal step){
            this.step = step;
            return this;
        }

        /** *************************** DATE *************************** **/
        global TypeAttributes setDay(String day){
            this.day = day;
            return this;
        }

        global TypeAttributes setEra(String era){
            this.era = era;
            return this;
        }

        global TypeAttributes setHour(String hour){
            this.hour = hour;
            return this;
        }

        global TypeAttributes setHour12(String hour12){
            this.hour12 = hour12;
            return this;
        }

        global TypeAttributes setMinute(String minute){
            this.minute = minute;
            return this;
        }

        global TypeAttributes setMonth(String month){
            this.month = month;
            return this;
        }

        global TypeAttributes setSecond(String second){
            this.second = second;
            return this;
        }

        global TypeAttributes setTimeZone(String timeZone){
            this.timeZone = timeZone;
            return this;
        }

        global TypeAttributes setTimeZoneName(String timeZoneName){
            this.timeZoneName = timeZoneName;
            return this;
        }

        global TypeAttributes setWeekday(String weekday){
            this.weekday = weekday;
            return this;
        }

        global TypeAttributes setYear(String year){
            this.year = year;
            return this;
        }


        /** *************************** LOCATION *************************** **/
        global TypeAttributes setLatitude(Decimal latitude){
            this.latitude = latitude;
            return this;
        }

        global TypeAttributes setLongitude(Decimal longitude){
            this.longitude = longitude;
            return this;
        }

        /** *************************** TEXT *************************** **/
        global TypeAttributes setLinkify(Boolean linkify){
            this.linkify = linkify;
            return this;
        }

        /** *************************** URL *************************** **/
        global TypeAttributes setTooltip(String fieldName){
            this.tooltip = new FieldName(fieldName);
            return this;
        }

        global TypeAttributes setTarget(String target){
            this.target = target;
            return this;
        }
    }

    
    global class FieldName{
        
        @AuraEnabled global String fieldName;

        global FieldName(String fieldName){
            this.fieldName = fieldName;
        }
    }


    global class RowAction{
        
        @AuraEnabled global String label;
        @AuraEnabled global String name;
        @AuraEnabled global String iconName;

        global RowAction(String label, String name){
            this.label = label;
            this.name  = name;
        }

        global RowAction(String label, String name, String iconName){
            this.label     = label;
            this.name      = name;
            this.iconName  = iconName;
        }
    }
}