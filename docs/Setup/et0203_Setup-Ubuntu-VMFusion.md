
## Instructions for creating an Ubuntu Server VM on VMFusion (This will allow your to connect to it from your development environment and test locally.)

### 1. Download Ubuntu .ISO file (We used version 18.04 64-bit)

1.  Visit: https://releases.ubuntu.com/bionic/
2.  Select: ubuntu-18.04.5-live-server-amd64.iso

### 2. Create a new VM in VMFusion

[![VMFusion Create VM](../images/et0203-01_VMFusion-Create-VM.png#img2)](../images/et0202-01_VMFusion-Create-VM.mp4 "VMFusion Create VM")

1. Open VMFusion Virtual Machine Library
2. Click the + icon on the top left, then click New
3. On the Select Install page, drag the Ubuntu ISO file into the "Install from Disk or image box.
4. Click on the ISO and then click the Continue button.
5. Click Easy Install and enter a user information, then click the Continue button. NOTE: This information will be used to login to your Ubuntu server.
6. From the Finish screen, click the Finish button.
7. From Save As popup, enter your machine name, then click the Save button. 
8. Installation begins automatically.
9. When installation is complete, login with your username and password from Step 5.

### 3. Harden Ubuntu Server
    1. Install ssh server
        ```
        sudo apt update
        sudo apt install openssh-server

        sudo systemctl status ssh
        ```

        img status ssh

    2.    step in
    https://www.lifewire.com/harden-ubuntu-server-security-4178243
     

### 4. Setup Networking for connecting to this VM from your development VM








![PuttyGen-Public key](../images/et0202-03_PuttyGen-highlight-for-paste.png#img2 "PuttyGen-Public key")

![Vultr-Add SSH key, Blank](../images/et0202-04_Vultr-add-SSH-key-blank.png#img3 "Blank Key")

![Vultr-Add SSH keyTest](../images/et0202-05_Vultr-add-SSH-key-pasted.png#img3 "Pasted Key")


6. Server Host Name and Label: FormRx-Vultr for both

7. Click Deploy Now


### 3. Open Vultr VM Console

[![Vultr Open Console](../images/et0202-06_Vultr-console.png#img1)](../images/et0202-06_Vultr-console.mp4 "Vultr Open Console")


+ Click on Products
+ then the Server Name i.e. FormRx-Vultr
+ then the View Console icon

1. Click in the console window and then enter login: root and press enter.

2. From the Vultr server window click the copy password icon.

3. Go back to the console window click the Send clipboard button and press enter.

You will see the Welcome screen for Ubuntu and the command prompt:

    root@FormRx-Vultr:~#

### 4. Download and/or open Bitvise SSH / SFTP browser.


[![Setup Bitvise](../images/et0202-02_Bitvise_Setup.png#img1_Bitvise_Setup.png)](../images/et0202-02_Bitvise_Setup.mp4 "Setup Bitvise")


 1. Save file immediately as FormRx-Vultr

 2. Enter Host: 10.1.2.1

 3. Enter Username: administrator

 4. Initial Method: publickey+password

 5. Select Client Key from 2.

 7. Check store encrypted password in profile, then enter root password.

 8. Click the Options tab and On Login check Open Terminal and Open SFTP

 9. Click Save Profile

10. Click the Login Button.
    You will be presented with Console and SFTP windows.

