--xxxxxform.js

--initialValues
/*
SELECT c.Name+': "",'
FROM sys.columns c 
     INNER JOIN sys.objects o ON o.object_id = c.object_id
     LEFT JOIN  sys.types t on t.user_type_id  = c.user_type_id   
WHERE o.type = 'U' and o.Name = 'xxxxxs'
 */

 --validationSchema
/*
SELECT c.Name+': Yup.string().required(''Required''),'
FROM sys.columns c 
     INNER JOIN sys.objects o ON o.object_id = c.object_id
     LEFT JOIN  sys.types t on t.user_type_id  = c.user_type_id   
WHERE o.type = 'U' and o.Name = 'xxxxxs'
 */

 --Formik component
-- <FormikControl control='input' type='text' label='Email-INPUT' name='email' />
/*
SELECT '<FormikControl control=''input'' type=''text'' label='''+c.Name+''' name='''+c.Name+''' />'
FROM sys.columns c 
     INNER JOIN sys.objects o ON o.object_id = c.object_id
     LEFT JOIN  sys.types t on t.user_type_id  = c.user_type_id   
WHERE o.type = 'U' and o.Name = 'xxxxxs'
 */

