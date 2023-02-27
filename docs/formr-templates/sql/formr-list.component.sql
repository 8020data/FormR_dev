--formrs-list.component.js

/*               <div><label><strong><<COLNAME>>:    </strong></label>{" "}{currentFormr.<<COLNAME>>}    </div>
SELECT '              <div><label><strong>'+c.Name+':    </strong></label>{" "}{currentFormr.'+c.Name+'}    </div>'
FROM sys.columns c 
     INNER JOIN sys.objects o ON o.object_id = c.object_id
     LEFT JOIN  sys.types t on t.user_type_id  = c.user_type_id   
WHERE o.type = 'U' and o.Name = 'formrs'

*/



