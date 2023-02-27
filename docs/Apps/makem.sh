#!/bin/sh

function makeIt() {
   aFile=$1
   aTitle=$2
   aImg=${aFile:0:6}-01_${aFile:7}; aImg=${aImg/.md/}

#  echo "# ${aTitle}  "                                                     >${aFile}
   echo "# ${aTitle:0:21}  "                                                >${aFile}
   echo "## ${aTitle:24}  "                                                >>${aFile}
   echo "  "                                                               >>${aFile}
   echo "<img src=\"Apps/images/${aImg}_screen1.png\" class=\"img4\"><br>" >>${aFile}
   echo "  "                                                               >>${aFile}
   echo "## Notes:  "                                                      >>${aFile}
   echo "  "                                                               >>${aFile}
   }

  makeIt  et0422_client2-app02c.md   "Client2 App02c  (422) - Blank Login using React, AdminLTE 'n' Formik"

# ---------------------------------------------------------------------------------------------------------------------------

function makEm( ) {

# makeIt  et0301_server-apps.md      "Server Apps     (301) - SQL Server Samples"
  makeIt  et0321_server-app1s.md     "Server App1s    (321) - 1st FormR API for 12 tables in Server1"
  makeIt  et0321_server-app1s.md     "Server App1s    (321) - 1st FormR API for 12 tables in Server1"
  makeIt  et0312_server-app02s.md    "Server App02s   (312) - Sequelize Samples in Server1"
  makeIt  et0313_server-app03s.md    "Server App03s   (313) - Local MySQL Samples in Server1"
  makeIt  et0314_server-app04s.md    "Server App04s   (314) - Remote SQL Samples in Server1"
  makeIt  et0317_server-app7s.md     "Server App7s    (317) - 1st Local MySQL Example in Server1"

# makeIt  et0302_client-apps.md      "Client Apps     (302) - AdminLTE, React & Formik Apps"
  makeIt  et0322_client-app2c.md     "Client App2c    (322) - BezCoder Original in Client"
# makeIt  et0323_client-app3c.md     "Client App3c    (323) - BezCoder & AdminLTE App3c in Client"
  makeIt  et0324_client-app4c.md     "Client App4c    (324) - AdminLTE & MDBootstrap App4c in Client"
  makeIt  et0325_client-app5c.md     "Client App5c    (325) - YouTube Formik Samples in Client"
  makeIt  et0350_client-app5c0.md    "Client App5c0   (350) - Formik Login Example in Client"
  makeIt  et0351_client-app5c1.md    "Client App5c1   (351) - Formik Example No. 1 in Client"
  makeIt  et0352_client-app5c2.md    "Client App5c2   (352) - Formik Example No. 2 in Client"
  makeIt  et0353_client-app5c3.md    "Client App5c3   (353) - Formik Example No. 3 in Client"
  makeIt  et0326_client-app6c.md     "Client App6c    (326) - Final AdminLTE & Formik App6c in Client"
  makeIt  et0360_client-app6c0.md    "Client App6c0   (360) - Blank Reack, AdminLTE 'n' Formik in Client"
  makeIt  et0361_client-app6c1.md    "Client App6c1   (361) - Login using React, AdminLTE 'n' Formik in Client"

# makeIt  et0401_server2-apps.md     "Server2 Apps    (401) - FormR Final Dev1 Server2 Apps"
  makeIt  et0411_server2-app01s.md   "Server2 App01s  (411) - Clean Login using Formik in Server2"

# makeIt  et0402_client2-apps.md     "Client2 Apps    (402) - FormR Final Dev1 Client2 Apps"
  makeIt  et0420_client2-app00c.md   "Client2 App00c  (420) - Blank App Description for client"
  makeIt  et0422_client2-app02c.md   "Client2 App02c  (422) - Blank Login using React, AdminLTE 'n' Formik in Client2"
  makeIt  et0424_client2-app04c.md   "Client2 App04c  (424) - Clean APIs for Login using Formik in Client2"
  makeIt  et0428_client2-app08c.md   "Client2 App08c  (428) - React-Admin Test Apps in Client2"

# makeIt  et0303_server3-apps.md     "Server3 Apps    (303) - RAM's Express & Sequelize Apps"
  makeIt  et0311_server3-app01s.md   "Server3 App01s  (311) - 2nd FormR API for 12 tables in Server3"
  makeIt  et0315_server3-app05s.md   "Server3 App05s  (315) - Simple Express Login Apps in Server3"
  makeIt  et0316_server3-app06s.md   "Server3 App06s  (316) - RAM's Logins using TableRoutes in Server3"
  makeIt  et0318_server3-app08s.md   "Server3 App08s  (318) - Express React-Admin API in Server3"
  makeIt  et0319_server3-app09s.md   "Server3 App09s  (319) - 2nd Local MySQL Example in Server3"
  makeIt  et0391_server3-app21s.md   "Server3 App21s  (391) - RAM's TableRoutes, Roles & Controllers in Server3"

# makeIt  et0305_client3-apps.md     "Client3 Apps    (305) - AdminLTE, Reactv17 & Formik Apps"
  makeIt  et0327_client3-app07c.md   "Client3 App07c  (327) - Simple with Erdkse_adminLTE-3-Reactv17 in Client3"
  makeIt  et0371_client3-app07c1.md  "Client3 App07c1 (371) - Cropped Erdkse_adminLTE-3-Reactv17 in Client3"
  makeIt  et0372_client3-app07c2.md  "Client3 App07c2 (372) - Login with Erdkse_adminLTE-3-Reactv17 in Client3"

# makeIt  et0306_server0-apps.md     "Server0 Apps    (306) - Original Server Samples"
  makeIt  et0331_server0-app01s.md   "Server0 App01s  (331) - BezCoder_node-js-jwt-auth_tutorial"

# makeIt  et0307_client0-apps.md     "Client0 Apps    (307) - Original Client Samples"
  makeIt  et0332_client0-app02c.md   "Client0 App02c  (332) - React-Crud-Web-API"
  makeIt  et0334_client0-app04c.md   "Client0 App04c  (334) - React-JWT-Auth"
  makeIt  et0336_client0-app06c.md   "Client0 App06c  (336) - React-Redux-JWT-Auth"
  }


# makEm

