import type React from "react"
import { useIntl } from "react-intl"

/**
 * This is just a casual demo
 * @returns 
 */
export default function(){    
    const intl = useIntl();
    return(
        <div>
            <h1>{intl.formatMessage({id:"pages.welcome.title"},{name:"Anker"})}</h1>            
            <p>{intl.formatMessage({id:"pages.welcome.content"})}</p>
        </div>
    )
}