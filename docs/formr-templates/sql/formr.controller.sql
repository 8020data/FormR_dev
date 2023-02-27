--formr.controller.js

/* --             <<COLNAME>>   : req.body.<<COLNAME>>,  Delete , on last line.
SELECT c.Name+'   : req.body.'+c.Name+','
FROM sys.columns c 
     INNER JOIN sys.objects o ON o.object_id = c.object_id
     LEFT JOIN  sys.types t on t.user_type_id  = c.user_type_id   
WHERE o.type = 'U' and o.Name = 'formrs'
*/

