@IsTest
private with sharing class LdtTest {

    /**
     * @description This is a data structure only, so this is purely for coverage only
     */
    @IsTest
    private static void testLightningDataTable(){

        // Create a lightning data table with matching columns for the output
        Ldt ldt = new Ldt()
            .setKeyField('Name')
            .setupKeyValue()
            .setHideCheckboxColumn(false)
            .setShowRowNumberColumn(true)
            .addColumn(
                new Ldt.Col(null, null)
                    .setColumnKey('col1')
                    .setInitialWidth(50)
                    .setType('userIcon')
                    .setTypeAttributes(
                        new Ldt.TypeAttributes()
                            .setColor('Field_Api_Name')
                    )
            )
            .addColumn(
                new Ldt.Col('Field_Label', 'Field_Api_Name_01')
                    .setColumnKey('col2')
                    .setType('url')
                    .setFixedWidth(120)
                    .setTypeAttributes(
                        new Ldt.TypeAttributes()
                            .setLabel('Name')
                            .setTarget('_self')
                            .setTooltip('Field_Api_Name_01')
                    )
            )
            .addColumn(
                new Ldt.Col('Field_Label', 'Field_Api_Name_02')
                    .setType('boolean')
                    .setInitialWidth(100)
            )
            .addColumn(
                new Ldt.Col('Actions', null)
                    .setType('action')
                    .setTypeAttributes(
                        new Ldt.TypeAttributes()
                            .setMenuAlignment('auto')
                            .addRowAction(new Ldt.RowAction('Set Password', 'set_password'  ))
                            .addRowAction(new Ldt.RowAction('Set Color',    'set_color', 'utility:color_swatch'))
                    )
                    .setInitialWidth(80)
            )
            .addKeyValuePair('key','value')
            .addRow(new Map<String,Object>())
            .setData(new List<Map<String,Object>>())
        ;
    }
}