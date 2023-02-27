@echo off

if not exist ".\home"        mkdir ".\home"
if not exist ".\home\_0"     mkdir ".\home\_0"
if not exist ".\home\_0\bin" mkdir ".\home\_0\bin"
if not exist ".\etc"         mkdir ".\etc"
if not exist ".\etc\ssh"     mkdir ".\etc\ssh"
if not exist ".\root"        mkdir ".\root"

if     exist ".\home\_0\bin\setup-nodejs-server-on-linux.sh" goto L1
if not exist             ".\setup-nodejs-server-on-linux.sh" echo ** Could not copy script, "setup-nodejs-server-on-linux.sh"
if     exist             ".\setup-nodejs-server-on-linux.sh" move ".\setup-nodejs-server-on-linux.sh" ".\home\_0\bin" >nul

:L1
if     exist ".\home\_0\bin\setup-script-path-on-linux.sh"   goto END
if not exist             ".\setup-script-path-on-linux.sh"   echo ** Could not copy script, "setup-script-path-on-linux.sh"
if     exist             ".\setup-script-path-on-linux.sh"   move ".\setup-script-path-on-linux.sh" ".\home\_0\bin" >nul

:END
                      rm ".\setup-local-vps-folder.cmd"