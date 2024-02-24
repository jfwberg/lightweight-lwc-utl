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

We can argue where where this action belongs... In my opinion if you generate *dynamic* tables and need to send the header and type information from Apex to be stiched together in Javascript, you should do it fully in Apex.

If you have a static table, you should probably manage the headers in Javascript. So before you implement this, make sure you are doing the right thing for your code.

This class is simply a class representing the data structure of the Lightning Datatable as described here: https://developer.salesforce.com/docs/component-library/bundle/lightning-datatable/documentation

All methods wit hthe exception of the toJSON() method return the full class so you can chain all the  methods. This makes it easier to create large tables and make it more readable if done correct.

For data time values see the formatted documentation https://developer.salesforce.com/docs/component-library/bundle/lightning-formatted-date-time/specification


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
|```setColumnKey(String columnKey)```                      | utl.Ldt.Col | 
|```setEditable(Boolean editable)```                       | utl.Ldt.Col | 
|```setFieldName(String fieldName)```                      | utl.Ldt.Col | 
|```setFixedWidth(Integer fixedWidth)```                   | utl.Ldt.Col |
|```setHideDefaultActions(Boolean setHideDefaultActions)```| utl.Ldt.Col | 
|```setHideLabel(Boolean hideLabel)```                     | utl.Ldt.Col | 
|```setIconName(String setIconName)```                     | utl.Ldt.Col | 
|```setInitialWidth(Integer initialWidth)```               | utl.Ldt.Col |
|```setLabel(String label)```                              | utl.Ldt.Col | 
|```setSortable(Boolean sortable)```                       | utl.Ldt.Col | 
|```setType(String type)```                                | utl.Ldt.Col |
|```setTypeAttributes(TypeAttributes typeAttributes)```    | utl.Ldt.Col | Method to add type attributes to a column. See the details on the *utl.Ldt.TypeAttributes* class below


## Lightning Datatable CellAttributes (utl.Ldt.CellAttributes) Methods
|Method|Data Type|Description|
|--------|-------------|---|
|```setAlignment(String alignment)```                       | utl.Ldt.CellAttributes |
|```setClass(String class_x)```                             | utl.Ldt.CellAttributes |
|```setIconName(String iconName)```                         | utl.Ldt.CellAttributes |
|```setIconLabel(String iconLabel)```                       | utl.Ldt.CellAttributes |
|```setIconPosition(String iconPosition)```                 | utl.Ldt.CellAttributes |
|```setIconAlternativeText(String iconAlternativeText)```   | utl.Ldt.CellAttributes |


## Lightning Datatable TypeAttributes (utl.Ldt.TypeAttributes) Methods
|Method|Data Type|Description|
|--------|-------------|---|
|```setColor(String color)```                                       | utl.Ldt.TypeAttributes |
|```setMenuAlignment(String menuAlignment)```                       | utl.Ldt.TypeAttributes |
|```addRowAction(RowAction rowAction```                             | utl.Ldt.TypeAttributes | Method to add a row action to the actions column. See the details on the *utl.Ldt.RowAction* class below
|```setDisabled(Boolean disabled)```                                | utl.Ldt.TypeAttributes |
|```setIconName(String iconName)```                                 | utl.Ldt.TypeAttributes |
|```setIconPosition(String iconPosition)```                         | utl.Ldt.TypeAttributes |
|```setName(String name)```                                         | utl.Ldt.TypeAttributes |
|```setLabel(String label)```                                       | utl.Ldt.TypeAttributes |
|```setTitle(String title)```                                       | utl.Ldt.TypeAttributes |
|```setVariant(String variant)```                                   | utl.Ldt.TypeAttributes |
|```setIconClass(String iconClass)```                               | utl.Ldt.TypeAttributes |
|```setAlternativeText(String alternativeText)```                   | utl.Ldt.TypeAttributes |
|```setClass(String class_x)```                                     | utl.Ldt.TypeAttributes |
|```setCurrencyCode(String currencyCode)```                         | utl.Ldt.TypeAttributes |
|```setMinimumIntegerDigits(Integer minimumIntegerDigits)```        | utl.Ldt.TypeAttributes |
|```setMinimumFractionDigits(Integer minimumFractionDigits)```      | utl.Ldt.TypeAttributes |
|```setMaximumFractionDigits(Integer maximumFractionDigits)```      | utl.Ldt.TypeAttributes |
|```setMinimumSignificantDigits(Integer minimumSignificantDigits)```| utl.Ldt.TypeAttributes |
|```setMaximumSignificantDigits(Integer maximumSignificantDigits)```| utl.Ldt.TypeAttributes |
|```setStep(Decimal step)```                                        | utl.Ldt.TypeAttributes |
|```setDay(String day)```                                           | utl.Ldt.TypeAttributes |
|```setEra(String era)```                                           | utl.Ldt.TypeAttributes |
|```setHour(String hour)```                                         | utl.Ldt.TypeAttributes |
|```setHour12(String hour12)```                                     | utl.Ldt.TypeAttributes |
|```setMinute(String minute)```                                     | utl.Ldt.TypeAttributes |
|```setMonth(String month)```                                       | utl.Ldt.TypeAttributes |
|```setSecond(String second)```                                     | utl.Ldt.TypeAttributes |
|```setTimeZone(String timeZone)```                                 | utl.Ldt.TypeAttributes |
|```setTimeZoneName(String timeZoneName)```                         | utl.Ldt.TypeAttributes |
|```setWeekday(String weekday)```                                   | utl.Ldt.TypeAttributes |
|```setYear(String year)```                                         | utl.Ldt.TypeAttributes |
|```setLatitude(Decimal latitude)```                                | utl.Ldt.TypeAttributes |
|```setLongitude(Decimal longitude))```                             | utl.Ldt.TypeAttributes |
|```setLinkify(Boolean linkify)```                                  | utl.Ldt.TypeAttributes |
|```setTooltip(String fieldName)```                                 | utl.Ldt.TypeAttributes |
|```setTarget(String target)```                                     | utl.Ldt.TypeAttributes |


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
