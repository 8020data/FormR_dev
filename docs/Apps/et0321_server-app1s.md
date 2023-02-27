# Server App1s    (321)  
## 1st FormR API for 12 tables in Server1  
  
<img src="Apps/images/et0321-01_server-app1s_screen1.png" class="img5" ><br><br>
  
## Notes:
This is our go to server app for accessing tables from the client apps.  But it is not simple.
It started with the BezKoder tutorials and then we added all the IODD tables.  I need to create 
a new app01s in server2 that contains

- Only the Users and Roles table that is needed for a login page
- The new db.connect.js process with db.config.json and my.config.json for a local override
- The generated Model code for user.model.js and role.model.js
- The generated Routes and Controller code 

Note the app folder exists in server2, but it is not good to go yet.  FYI, the port numbers
for all the server2 apps will be in the 400 range (for Dev04 apps).  We ran out of the ports numbers
in the 300 range (for Dev03 apps).

### Filelist experiments

[Latest File List](Master/server/app1s/!_1st FormR API for 12 tables in Server1/files.md)  

[Latest File List](file:///C:/WEBs/8020/IODD/FormR/P08/Master/server/app1s/!_1st%20FormR%20API%20for%2012%20tables%20in%20Server1/files.md)   
[Previous File List](file:///C:/WEBs/8020/IODD/FormR/P08/Master/server/app1s/!_1st%20FormR%20API%20for%2012%20tables%20in%20Server1/FormR-Server-app1s_v10209-filelist.txt)

[Latest File List](https://github.com/brucetroutman-gmail/FormR-dev/blob/master/server/app1s/!_1st%20FormR%20API%20for%2012%20tables%20in%20Server1/files.md)

[Latest File List (raw)](https://raw.githubusercontent.com/brucetroutman-gmail/FormR-dev/master/server/app1s/!_1st%20FormR%20API%20for%2012%20tables%20in%20Server1/files.md?token=AAI2ZG4Z6W2Q7EGXMBYK3JTAHUYRU)   
[Latest File List (raw)](https://raw.githubusercontent.com/brucetroutman-gmail/FormR-dev/master/server/app1s/!_1st%20FormR%20API%20for%2012%20tables%20in%20Server1/files_.md?token=AAI2ZG4Z6W2Q7EGXMBYK3JTAHUYRU)

[Latest File List (raw -- not so nice)](https://raw.githubusercontent.com/brucetroutman-gmail/FormR-dev/master/server/app1s/!_1st%20FormR%20API%20for%2012%20tables%20in%20Server1/files_.md?token=AAI2ZG7CWR2XMA27Y4KSNL3AHUZ26)


[Master/README](Master/README.md)  
[app1s/node-js-jwt-auth.README](Master\server\app1s\README_node-js-jwt-auth.md) 
[Latest File List](Apps/et0308_BezKoder-apps.md)
[here](Apps/et0308_BezKoder-apps.md)
