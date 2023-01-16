import React from 'react'
export default function (input){
    return Object.entries(input).map(([key, value]) => 
        <p key={key}>{`${key}: ${value}`}</p>)
}