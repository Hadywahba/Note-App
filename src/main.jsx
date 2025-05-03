import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import 'flowbite/dist/flowbite.min.js'
import Authcontext from './components/context/Authcontext.jsx'
import Token from './components/context/Token.jsx'





createRoot(document.getElementById('root')).render(

<Token>
<Authcontext>
    
    <App />
</Authcontext>
</Token>
)
