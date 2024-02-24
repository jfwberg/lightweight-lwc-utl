@IsTest
private with sharing class LdtTest {

    /**
     * @description This is a data structure only, so this is mainly for coverage only
     *              there is not really a need to test the JSON parser
     */
    @IsTest
    private static void testLightningDataTable(){

        /** **************************************************************************************************** **
         **                                             LDT METHODS                                              **
         ** **************************************************************************************************** **/
        Ldt myLdt = new Ldt()
            .setKeyField('Name')
            .setupKeyValue()
            .setupKeyValue('Key', 'Value')
            .setKeyField('Id')
            .setHideCheckboxColumn(false)
            .setShowRowNumberColumn(true)
            .addColumn(new Ldt.Col('Label', 'Field_Name'))
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
            .addRow(new Map<String,Object>{
                'FirstName' => 'Action',
                'LastName'  => 'Hank'
            })
            .addRow(new Map<String,Object>{
                'FirstName' => 'Fois',
                'LastName'  => 'Gras'
            })
            .addKeyValuePair('Key 01','Key 01')
        ;

        // Output table to a JSON String
        String json = myLdt.toJSON();


        /** **************************************************************************************************** **
         **                                           LDT.COL METHODS                                            **
         ** **************************************************************************************************** **/
        // Default constructor st type to text
        Ldt.Col col = new Ldt.Col('Label', 'Field_Name')
            .setCellAttributes(new Ldt.CellAttributes())
            .setColumnKey('key')
            .setEditable(false)
            .setFieldName('fieldName')
            .setFixedWidth(150)
            .setHideDefaultActions(false)
            .setHideLabel(false)
            .setIconName('utility:key')
            .setInitialWidth(50)
            .setLabel('Label')
            .setSortable(false)
            .setType('action')
            .setTypeAttributes(new Ldt.TypeAttributes())
        ;
        
        // Test Exception
        try{
            col.setType('Invalid Column Type');
        }catch(Exception e){
            Assert.areEqual(Ldt.INVALID_COLUMN_TYPE_MSG, e.getMessage(), 'Unexpected Exception message');
        }

        // Constructor with custom type
        Ldt.Col colWithType = new Ldt.Col('Label', 'Field_Name', 'number');
        

        /** **************************************************************************************************** **
         **                                       CELL-ATTRIBUTES METHODS                                        **
         ** **************************************************************************************************** **/
        Ldt.CellAttributes cellAttributes = new Ldt.CellAttributes()
            .setAlignment('left')
            .setClass('myClass')
            .setIconName('myIcon')
            .setIconLabel(' My Icon')
            .setIconPosition('left')
            .setIconAlternativeText('Great looking icon of a key')
        ;


        /** **************************************************************************************************** **
         **                                       TYPE-ATTRIBUTES METHODS                                        **
         ** **************************************************************************************************** **/
        Ldt.TypeAttributes typeAttributes = new Ldt.TypeAttributes()
            .setColor('#FFCCFF')
            .setMenuAlignment('left')
            .addRowAction(new Ldt.RowAction('label','fieldName'))
            .addRowAction(new Ldt.RowAction('label','fieldName','iconName'))
            .setDisabled(true)
            .setIconName('utility:key')
            .setIconPosition('left')
            .setName('Name')
            .setLabel('Label')
            .setTitle('itle')
            .setVariant('variant')
            .setIconClass('iconClass')
            .setAlternativeText('alternativeText')
            .setClass('myClass')
            .setCurrencyCode('USD')
            .setMinimumIntegerDigits(16)
            .setMinimumFractionDigits(2)
            .setMaximumFractionDigits(2)
            .setMinimumSignificantDigits(4)
            .setMaximumSignificantDigits(4)
            .setStep(0.005)
            .setDay('numeric')
            .setEra('short')
            .setHour('2-digit')
            .setHour12('true')
            .setMinute('2-digit')
            .setMonth('numeric')
            .setSecond('numeric ')
            .setTimeZone('UTC')
            .setTimeZoneName('short')
            .setWeekday('long')
            .setYear('numeric')
            .setLatitude(21.327094878635382)
            .setLongitude(-157.792137125222)
            .setLinkify(false)
            .setTooltip('Link tooltip')
            .setTarget('_self')
        ;
    }


    /**
     * @description Method to test the attribute name conversion
     */
    @IsTest
    private static void testClassAttributeNameConversion(){
        
        // Create cell attribute
        Ldt classCellAttributeTest = new Ldt()
            .addColumn(
                new Ldt.Col(null,null)
                .setCellAttributes(
                    new Ldt.CellAttributes()
                        .setClass('cellClass')
                )
                .setTypeAttributes(
                    new Ldt.TypeAttributes()
                        .setClass('typeClass')
                )
            )
        ;

        // Get the columns[0].cellAtrributes.class and columns[0].typeAtrributes.class
        Map<String,Object> om     = (Map<String,Object>) JSON.deserializeUntyped(classCellAttributeTest.toJSON());
        Object[]           columns= (Object[]) om.get('columns');
        Map<String,Object> column = (Map<String,Object>) columns[0];
        Map<String,Object> cam    = (Map<String,Object>) column.get('cellAttributes');
        Map<String,Object> tam    = (Map<String,Object>) column.get('typeAttributes');

        // Assert the values
        Assert.areEqual(true,        cam.containsKey('class'), 'Expected the class_x to be changed to class');
        Assert.areEqual(true,        tam.containsKey('class'), 'Expected the class_x to be changed to class');
        Assert.areEqual('cellClass', cam.get('class'), 'Expected the class value to be cellClass');
        Assert.areEqual('typeClass', tam.get('class'), 'Expected the class value to be typeClass');
    }

}