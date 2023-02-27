import React   from 'react'
import Header  from './components/Header.js'
import Menu    from './components/Menu.js'
import Content from './components/Content.js'
import Footer  from './components/Footer.js'

export default function App() {
  return (
    <div>
       <Header/>
       <Menu/>
       <Content/>
       <Footer/>
    </div>
  )
}
