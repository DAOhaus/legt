import React from 'react'
function toExport(input){
    return Object.entries(input).map(([key, value]) => 
        <p key={key}>{`${key}: ${value}`}</p>)
}
export default toExport 