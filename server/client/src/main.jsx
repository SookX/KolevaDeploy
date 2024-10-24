import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.less'
import './globalStyling/variables.less'
import './globalStyling/components.less'
import './globalStyling/queries.less'
import Modal from 'react-modal'

Modal.setAppElement('#root')

createRoot(document.getElementById('root')).render(
    <App />,
)
