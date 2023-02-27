SELECT     
DB_NAME() AS [Database Name],   
OBJECT_SCHEMA_NAME(TBL.[object_id],DB_ID()) AS [Schema],      
TBL.[name] AS [Table name],    
AC.[name] AS [Column name],      
UPPER(TY.[name]) AS DataType,    
AC.[max_length] AS [Length],     
AC.[precision],    
AC.[scale],    
AC.[is_nullable] AS IsNullable,   
ISNULL(SI.is_primary_key,0) AS IsPrimaryKey,   
SKC.name as [Primary Key Constarint],   
(CASE WHEN SIC.index_column_id > 0 
THEN 1 ELSE 0 END) AS IsIndexed,   
ISNULL(is_included_column, 0) AS IsIncludedIndex,   
SI.name AS [Index Name],   
OBJECT_NAME(SFC.constraint_object_id) as [Foreign Key Constraint],   
OBJECT_NAME(SFC.referenced_object_id) as [Parent Table],   
SDC.name AS [Default Constraint],   
SEP.value AS Comments 
FROM sys.tables AS TBL
INNER JOIN sys.all_columns AC 
ON TBL.[object_id] = AC.[object_id]  
INNER JOIN sys.types TY 
ON AC.[system_type_id] = TY.[system_type_id] AND AC.[user_type_id] = TY.[user_type_id]   
LEFT JOIN sys.index_columns SIC 
on sic.object_id = TBL.object_id AND AC.column_id = SIC.column_id
LEFT JOIN sys.indexes SI 
on SI.object_id = TBL.object_id AND SIC.index_id = SI.index_id
LEFT JOIN sys.foreign_key_columns SFC 
on SFC.parent_object_id = TBL.object_id AND SFC.parent_column_id = AC.column_id
LEFT JOIN sys.key_constraints SKC 
on skc.parent_object_id = TBL.object_id AND SIC.index_column_id = SKC.unique_index_id
LEFT JOIN sys.default_constraints SDC 
on SDC.parent_column_id = AC.column_id
LEFT JOIN sys.extended_properties SEP 
on SEP.major_id = TBL.object_id AND SEP.minor_id = AC.column_id 
ORDER BY TBL.[name], AC.[column_id]