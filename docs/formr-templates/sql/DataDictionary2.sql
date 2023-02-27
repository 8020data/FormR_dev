Set nocount on

DECLARE @TableName nvarchar(35)

DECLARE Tbls CURSOR FOR
Select distinct Table_name
FROM INFORMATION_SCHEMA.COLUMNS
--put any exclusions here
--where table_name not like '%old' 
order by Table_name

OPEN Tbls

PRINT '<HTML><body>'

FETCH NEXT FROM Tbls
INTO @TableName

WHILE @@FETCH_STATUS = 0
BEGIN

   PRINT '<br>'
   PRINT '<table border="1">'
   Print '<B>' + @TableName + '</B>'
   PRINT '<br>'
   --Get the Description of the table
   --Characters 1-250
   Select substring(cast(Value as varchar(1000)),1,250) FROM 
   sys.extended_properties A
   WHERE A.major_id = OBJECT_ID(@TableName)
   and name = 'MS_Description' and minor_id = 0

   --Characters 251-500
   Select substring(cast(Value as varchar(1000)),251, 250) FROM 
   sys.extended_properties A
   WHERE A.major_id = OBJECT_ID(@TableName)
   and name = 'MS_Description' and minor_id = 0

   PRINT '<tr>'
   --Set up the Column Headers for the Table
   PRINT '<td><b>Column Name</b></td>'
   PRINT '<td><b>Description</b></td>'
   PRINT '<td><b>InPrimaryKey</b></td>'
   PRINT '<td><b>IsForeignKey</b></td>'
   PRINT '<td><b>DataType</b></td>'
   PRINT '<td><b>Length</b></td>'
   PRINT '<td><b>Numeric Precision</b></td>'
   PRINT '<td><b>Numeric Scale</b></td>'
   PRINT '<td><b>Nullable</b></td>'
   PRINT '<td><b>Computed</b></td>'
   PRINT '<td><b>Identity</b></td>'
   PRINT '<td><b>Default Value</b></td>'

   --Get the Table Data
   SELECT 
      '</tr>',
      '<tr>',
      '<td>' + CAST(clmns.name AS VARCHAR(35)) + '</td>',
      '<td>' + substring(ISNULL(CAST(exprop.value AS VARCHAR(255)),''),1,250),
      substring(ISNULL(CAST(exprop.value AS VARCHAR(500)),''),251,250) + '</td>',
      '<td>' + CAST(ISNULL(idxcol.index_column_id, 0)AS VARCHAR(20)) + '</td>',
      '<td>' + CAST(ISNULL(
      (SELECT TOP 1 1
       FROM sys.foreign_key_columns AS fkclmn
       WHERE fkclmn.parent_column_id = clmns.column_id
       AND fkclmn.parent_object_id = clmns.object_id
      ), 0) AS VARCHAR(20)) + '</td>',
      '<td>' + CAST(udt.name AS CHAR(15)) + '</td>' ,
      '<td>' + CAST(CAST(CASE WHEN typ.name IN (N'nchar', N'nvarchar') AND clmns.max_length <> -1
      THEN clmns.max_length/2
      ELSE clmns.max_length END AS INT) AS VARCHAR(20)) + '</td>',
      '<td>' + CAST(CAST(clmns.precision AS INT) AS VARCHAR(20)) + '</td>',
      '<td>' + CAST(CAST(clmns.scale AS INT) AS VARCHAR(20)) + '</td>',
      '<td>' + CAST(clmns.is_nullable AS VARCHAR(20)) + '</td>' ,
      '<td>' + CAST(clmns.is_computed AS VARCHAR(20)) + '</td>' ,
      '<td>' + CAST(clmns.is_identity AS VARCHAR(20)) + '</td>' ,
      '<td>' + isnull(CAST(cnstr.definition AS VARCHAR(20)),'') + '</td>'
   FROM sys.tables AS tbl
   INNER JOIN sys.all_columns AS clmns ON clmns.object_id=tbl.object_id
   LEFT OUTER JOIN sys.indexes AS idx ON idx.object_id = clmns.object_id AND 1 =idx.is_primary_key
   LEFT OUTER JOIN sys.index_columns AS idxcol ON idxcol.index_id = idx.index_id AND idxcol.column_id = clmns.column_id AND idxcol.object_id = clmns.object_id AND 0 = idxcol.is_included_column
   LEFT OUTER JOIN sys.types AS udt ON udt.user_type_id = clmns.user_type_id
   LEFT OUTER JOIN sys.types AS typ ON typ.user_type_id = clmns.system_type_id AND typ.user_type_id = typ.system_type_id
   LEFT JOIN sys.default_constraints AS cnstr ON cnstr.object_id=clmns.default_object_id 
   LEFT OUTER JOIN sys.extended_properties exprop ON exprop.major_id = clmns.object_id AND exprop.minor_id = clmns.column_id
   WHERE (tbl.name = @TableName and exprop.class = 1) --I don't wand to include comments on indexes
   ORDER BY clmns.column_id ASC

   PRINT '</tr></table>'

   FETCH NEXT FROM Tbls INTO @TableName
END

PRINT '</body></HTML>'

CLOSE Tbls
DEALLOCATE Tbls