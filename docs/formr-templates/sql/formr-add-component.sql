--formrs-add.component.js

/* -- this.onChange<<COLNAME>> = this.onChange<<COLNAME>>.bind(this);
SELECT 'this.onChange'+c.Name+' = this.onChange'+c.Name+'.bind(this);'
FROM sys.columns c 
     INNER JOIN sys.objects o ON o.object_id = c.object_id
     LEFT JOIN  sys.types t on t.user_type_id  = c.user_type_id   
WHERE o.type = 'U' and o.Name = 'formrs'
*/

/* -- <<COLNAME>>   : "",
SELECT '  '+c.Name+' : "",'
FROM sys.columns c 
     INNER JOIN sys.objects o ON o.object_id = c.object_id
     LEFT JOIN  sys.types t on t.user_type_id  = c.user_type_id   
WHERE o.type = 'U' and o.Name = 'formrs'
*/

/*-- onChange<<COLNAME>>(e) { this.setState({ <<COLNAME>>: e.target.value }); }
SELECT 'onChange'+c.Name+'(e) { this.setState({ '+c.Name+': e.target.value }); }'
FROM sys.columns c 
     INNER JOIN sys.objects o ON o.object_id = c.object_id
     LEFT JOIN  sys.types t on t.user_type_id  = c.user_type_id   
WHERE o.type = 'U' and o.Name = 'formrs'
*/


/*--      <<COLNAME>>: this.state.<<COLNAME>>,
SELECT '      '+c.Name+': this.state.'+c.Name+','
FROM sys.columns c 
     INNER JOIN sys.objects o ON o.object_id = c.object_id
     LEFT JOIN  sys.types t on t.user_type_id  = c.user_type_id   
WHERE o.type = 'U' and o.Name = 'formrs'
*/

/*--          <<COLNAME>>: response.data.<<COLNAME>>,
SELECT '      '+c.Name+': response.data.'+c.Name+','
FROM sys.columns c 
     INNER JOIN sys.objects o ON o.object_id = c.object_id
     LEFT JOIN  sys.types t on t.user_type_id  = c.user_type_id   
WHERE o.type = 'U' and o.Name = 'formrs'
*/

/* --      <<COLNAME>>: "",
SELECT '      '+c.Name+': "",'
FROM sys.columns c 
     INNER JOIN sys.objects o ON o.object_id = c.object_id
     LEFT JOIN  sys.types t on t.user_type_id  = c.user_type_id   
WHERE o.type = 'U' and o.Name = 'formrs'
*/


/*            <div className="form-group"><label htmlFor="<<COLNAME>>"    ><<COLNAME>></label><input     type="text" className="form-control" id="<<COLNAME>>"     required value={this.state.<<COLNAME>>}    onChange={this.onChange<<COLNAME>>}    name="<<COLNAME>>"     /> </div>

SELECT '            <div className="form-group"><label htmlFor="'+LOWER(c.Name)+'">'+c.Name+ 
'</label><input type="text" className="form-control" id="'+LOWER(c.Name)+
'" required value={this.state.'+LOWER(c.Name)+'} onChange={this.onChange'+c.Name+
'} name="'+c.Name+'" /> </div>'
FROM sys.columns c 
     INNER JOIN sys.objects o ON o.object_id = c.object_id
     LEFT JOIN  sys.types t on t.user_type_id  = c.user_type_id   
WHERE o.type = 'U' and o.Name = 'formrs'

*/



