
## Setup Instructions for VM with NodeJS on Linux

### 1. References
  Video: https://www.youtube.com/watch?v=FanoTGjkxhQ&t=1135s
  
  Blog: https://jasonwatmore.com/post/2019/11/18/react-nodejs-on-aws-how-to-deploy-a-mern-stack-app-to-amazon-ec2


### 2. Login to Linux Server
 1. Open Bitvise and Bitvise Profile for Server
 2. Login
    An SFTP window will open for editing and moving files to and from the remote Linux server.  An SSH window will also open for executing commands in the Linux console.

 2. In the Windows File Explorer, copy three batch scripts from the `.\FormR\Master\docs\scripts`
    folder into the local SFTP VM folder created above. The three scripts are
    ```
    setup-local-vps-folder.cmd
    setup-nodejs-server-on-linux.sh
    setup-script-path-on-linux.sh
    ```
 3. Execute the Windows command script, `setup-local-vps-folder.cmd`, by double-clicking on it. 
    This will create three local folders that are the same as three of the linux top level folders.
    It will also copy the two linux shell scripts into the local folder, `.\home\_0\bin`.  
      
### 2. Login to Linux Server
 1. Open Bitvise and the Bitvise Profile for the remote linux server
 2. Under the SFTP tab, set the local `Initial directory` to the full path of the Local 
    SFTP VM folder created above. 
 3. Save the profile.
 4. Click on the `Log in` button. This will open a remote SSH windows and a SFTP window.
 
    [![Login with Bitvise](../images/et0302-01_SSH-into-FormR-Server.png#img2)](../images/et0302-01_SSH-into-FormR-Server.mp4 "Setup Bitvise")

    Ctreate a local folder for the VM e.g. FormR0-Vultr and set it as the local initial directory under the SFTP tab. This folder should contain the top level folders on the remote server that you will be working with.

### 3. Prepare Scripts directory
 1. In the Windows File Explorer, copy two linux shell scripts from the `.\FormR\Master\docs` folder into the local SFTP folder, `..\VMs\et217\home\_0\bin`. The two scripts are
    ```
    $ chmod 777 setup*
    $ ./setup-script-path-on-linux.sh
    ```
 7. One final step is necessary to prepare the scripts directory.  
    Back in the Bitvise profile window, Log out of the remote server, and log in again.  
    Then back in the SSH window, you should be able to run the test script, `hello.sh`, 
    ```
    $ hello.sh
    ```
    ![Run First Setup Script](../images/et0302-03_Run-first-setup-script.png#img1 "Run First Setup Script")

### 4. Run the script to install NodeJS, NGinx and PM2

 1. Execute the script initially written by Jason Watmor.  We have edited out the installation of the MongoDB server program.
    ```
    $ setup-nodejs-server-on-linux.sh
    ```
<!-- [![Install NodeJS](../images/et0302-04_Install-NodeJS.png#img1)](../images/et0302-04_Install-NodeJS.mp4 "Install NodeJS") -->
<!-- <iframe width="auto" height="200" src="https://www.youtube-nocookie.com/embed/rY0WxgSXdEE" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe> -->
     <video loop muted autoplay playsinline controls class="vid1" >
       <source src="images/et0302-04_Install-NodeJS.mp4" />
       Please use a modern browser like Firefox or Chrome to see this helpful video.
     </video>


