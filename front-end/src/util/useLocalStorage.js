import React from 'react'
import { useState, useEffect } from 'react'

const useLocalStorage = (defaultValue, key) => {
    
    const [value, setValue] = useState(() => {

        const storedValue = window.localStorage.getItem(key);

        return storedValue !== null ? JSON.parse(storedValue) : defaultValue
    });

    useEffect(() => {

        window.localStorage.setItem(key, JSON.stringify(value))

    }, [key, value])


    return [value, setValue]

}

export {useLocalStorage}
