    import   React from 'react'
    import { Switch, Route } from 'react-router-dom';
//  import 'bootstrap/dist/css/bootstrap.min.css';
//  import './App.css';

    import Home            from './home.component';

    import Login           from './login.component';
    import Register        from './register.component';
    import Profile         from './profile.component';

//  import BoardUser       from './board-user.component';                  //#.(01123.01.1)
//  import BoardUser       from './content-table-checkboxes.component.js'  // .(01201.02.1 )
//  import BoardUser       from './MDBDataTableV5_w-Checkboxs_Example.js'  // .(01204.08.1 )
    import BoardUser       from './content-user.component';                // .(01123.01.1 RAM First AdminLTE Table)

    import BoardModerator  from './board-moderator.component';
    import BoardAdmin      from './board-admin.component';

    import Tutorial        from './tutorial.component';
    import TutorialAdd     from './tutorial-add.component';
    import TutorialList    from './tutorial-list.component';

    import Member          from './member.component';
    import MemberAdd       from './member-add.component';
    import MemberList      from './member-list.component';

    import User            from './user.component';
    import UserAdd         from './user-add.component';
    import UserList        from './user-list.component';

    import Role            from './role.component';
    import RoleAdd         from './role-add.component';
    import RoleList        from './role-list.component';

    import Configuration     from './configuration.component';             // .(01124.02.1 RAM)
    import ConfigurationAdd  from './configuration-add.component';         // .(01124.02.2 RAM)
//  import ConfigurationList  from './configuration-list.component';         // .(01124.02.3 RAM)
    import ConfigurationList  from './configuration1-list.component';        // .(01124.02.3 RAM)
    import Configuration2List from './configuration2-list.component';        // .(01208.01.2 RAM)

    import Lookup           from './lookup.component';
    import LookupAdd        from './lookup-add.component';
    import LookupList       from './lookup-list.component';

    import Table            from './table.component';
    import TableAdd         from './table-add.component';
    import TableList        from './table-list.component';

    import Roles_tables     from './roles_tables.component';
    import Roles_tablesAdd  from './roles_tables-add.component';
    import Roles_tablesList from './roles_tables-list.component';

    import Project          from './project.component';
    import ProjectAdd       from './project-add.component';
    import ProjectList      from './project-list.component';


    export default function Content( ) {

      return (

        <div className="content-wrapper">

          <div className="container mt-3">
            <Switch>
              <Route exact path={["/", "/home"]}           component={Home}              />

              <Route exact path="/login"                   component={Login}             />
              <Route exact path="/register"                component={Register}          />
              <Route exact path="/profile"                 component={Profile}           />

              <Route       path="/user"                    component={BoardUser}         />
              <Route       path="/mod"                     component={BoardModerator}    />
              <Route       path="/admin"                   component={BoardAdmin}        />

              <Route       path="/tutorials/:id"           component={Tutorial}          />
              <Route exact path="/addtutorial"             component={TutorialAdd}       />
              <Route exact path={["/", "/tutorials"]}      component={TutorialList}      />

              <Route       path="/members/:id"             component={Member}            />
              <Route exact path="/addmember"               component={MemberAdd}         />
              <Route exact path={["/", "/members"]}        component={MemberList}        />

              <Route       path="/users/:id"               component={User}              />
              <Route exact path="/adduser"                 component={UserAdd}           />
              <Route exact path={["/", "/users"]}          component={UserList}          />

              <Route       path="/roles/:id"               component={Role}              />
              <Route exact path="/addrole"                 component={RoleAdd}           />
              <Route exact path={["/", "/roles"]}          component={RoleList}          />

              <Route       path="/configurations/:id"      component={Configuration}     />
              <Route       path="/configurations/view/:id" component={ Configuration}     />      {/* .(01211.01.1 RAM)  */}
              <Route       path="/configurations/edit/:id" component={ Configuration}     />      {/* .(01211.01.2)  */}
              <Route       path="/configurations/approve/:id" component={Configuration}   />      {/* .(01211.01.3)  */}
              <Route exact path="/addconfiguration"        component={ConfigurationAdd}  />
              <Route exact path={["/", "/configurations"]} component={ConfigurationList} />
              <Route exact path={[    "/configurations2"]} component={ Configuration2List} />     {/* .(01208.01.2 RAM)  */}

              <Route       path="/lookups/:id"             component={Lookup}            />
              <Route exact path="/addlookup"               component={LookupAdd}         />
              <Route exact path={["/", "/lookups"]}        component={LookupList}        />

              <Route       path="/tables/:id"              component={Table}             />
              <Route exact path="/addtable"                component={TableAdd}          />
              <Route exact path={["/", "/tables"]}         component={TableList}         />

              <Route       path="/roles_tables/:id"        component={Roles_tables}      />
              <Route exact path="/addroles_tables"         component={Roles_tablesAdd}   />
              <Route exact path={["/", "/roles_tables"]}   component={Roles_tablesList}  />

              <Route       path="/projects/:id"            component={Project}           />
              <Route exact path="/addproject"              component={ProjectAdd}        />
              <Route exact path={["/", "/projects"]}       component={ProjectList}       />

            </Switch>
          </div>

        </div>

      ) }

