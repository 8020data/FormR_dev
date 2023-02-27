import React   from 'react'
import Header  from './components/header.js'
import SideBar from './components/sidebar.js'
import Content from './components/content.js'
import Footer  from './components/footer.js'

export default function App() {

  return (

    <div>
       <Header/>
       <SideBar/>
       <Content/>
       <Footer/>
    </div>

    )
}
