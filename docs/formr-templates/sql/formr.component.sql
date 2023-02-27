--formrs.component.js

/*//        this.onChange<<COLNAME>>     = this.onChange<<COLNAME>>.bind(this);

SELECT '        this.onChange'+c.Name+'     = this.onChange'+c.Name+'.bind(this);'
FROM sys.columns c 
     INNER JOIN sys.objects o ON o.object_id = c.object_id
     LEFT JOIN  sys.types t on t.user_type_id  = c.user_type_id   
WHERE o.type = 'U' and o.Name = 'formrs'
*/

/*//        <<COLNAME>>    : "",
SELECT '        '+c.Name+'    : "",'
FROM sys.columns c 
     INNER JOIN sys.objects o ON o.object_id = c.object_id
     LEFT JOIN  sys.types t on t.user_type_id  = c.user_type_id   
WHERE o.type = 'U' and o.Name = 'formrs'
 */

 /*//  onChange<<COLNAME>>(e)     { const <<COLNAME>>    = e.target.value || ''; this.setState(function(prevState) { return { currentFormr: { ...prevState.currentFormr, <<COLNAME>>    : <<COLNAME>>    } }; }); }
SELECT '  onChange'+c.Name+'(e)     { const '+c.Name+'    = e.target.value || ''; this.setState(function(prevState) { return { currentFormr: { ...prevState.currentFormr,'+c.Name+'    : '+c.Name+'    } }; }); }'
FROM sys.columns c 
     INNER JOIN sys.objects o ON o.object_id = c.object_id
     LEFT JOIN  sys.types t on t.user_type_id  = c.user_type_id   
WHERE o.type = 'U' and o.Name = 'formrs'
 */

 /*//              <div className="form-group"><label htmlFor="<<COLNAME>>"    ><<COLNAME>></label><input     type="text" className="form-control" id="<<COLNAME>>"    value={currentFormr.<<COLNAME>>}    onChange={this.onChange<<COLNAME>>}    /> </div>
SELECT '              <div className="form-group"><label htmlFor="'+c.Name+'"    >'+c.Name+'</label><input     type="text" className="form-control" id="'+c.Name+'"    value={currentFormr.'+c.Name+'}    onChange={this.onChange'+c.Name+'}    /> </div>'
FROM sys.columns c 
     INNER JOIN sys.objects o ON o.object_id = c.object_id
     LEFT JOIN  sys.types t on t.user_type_id  = c.user_type_id   
WHERE o.type = 'U' and o.Name = 'formrs'
 */
