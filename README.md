# Lightweight - LWC Util
A lightweight Lightning Web Component Utility library for common javascript functions and generating ```lightning-datatable``` data structures with both data and columns.

## Package Info
| Info | Value |
|---|---|
|Name|Lightweight - LWC Util|
|Version|0.1.0-1|
|Managed Installation URL | */packaging/installPackage.apexp?p0=* |
|Unlocked Installation URL| */packaging/installPackage.apexp?p0=* |

## Lightning Data Table
The ```utl.Ldt``` class has the purpose of representing a full lightning data table object. It's goal is create both the data and the columns in Apex instead of half in Apex half in Javascript.
We can argue where where this action belongs... In my opinion if you generate dynamic tables and need to send the header and type information from Apex to be stiched together in Javascript, you should do it fully in Apex.
If you have a static table, you should probably manage the headers in Javascript. I personally prefer to do both in Apex and send the whole data structure at once for init. So before you implement this, make sure you are doing the right thing for your code.
The class is simply a class version of the data table as described here: https://developer.salesforce.com/docs/component-library/bundle/lightning-datatable/documentation

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
|``` toJSON())```                                           | *String* | Use this method to export the Data Table to a structure that can be read by the LWC controlling Javscript. Don't serialize your self if you use custom "classes"|

## Lightning Datatable Column (utl.Ldt.Col) Constructors
|Method|Description|
|--------|-------------|
|```Col(String label, String fieldName)```              | Constructor to create a new column with a label and a field name, this defaults the column type to "text" |
|```Col(String label, String fieldName, String type)``` | Constructor to create a new column with a label, field name and column type (text, number, URL etc. See documentation) |

## Lightning Datatable Column (utl.Ldt.Col) Methods
|Method|Data Type|Description|
|--------|-------------|---|
|```setColumnKey(String columnKey)```                     | utl.Ldt.Col | 
|```setType(String type)```                               | utl.Ldt.Col |             |
|```setInitialWidth(Integer initialWidth)```              | utl.Ldt.Col | 
|```setFixedWidth(Integer fixedWidth)```                  | utl.Ldt.Col | 
|```setTypeAttributes(TypeAttributes typeAttributes)```   | utl.Ldt.Col | 
|```setCellAttributes(CellAttributes cellAttributes)```   | utl.Ldt.Col | 


## Lightning Datatable CellAttributes (utl.Ldt.CellAttributes) Methods

## Lightning Datatable TypeAttributes (utl.Ldt.TypeAttributes) Methods