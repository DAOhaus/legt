import React from 'react'
function toExport(input){
    return Object.entries(input).map(([key, value]) => 
        <p key={key}>{key}:<strong>{value}</strong></p>)
}
export default toExport 