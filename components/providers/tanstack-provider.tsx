"use client"


import { QueryClientProvider, QueryClient} from "@tanstack/react-query"
import { ReactQueryDevtools } from 'react-query/devtools'
import {useState} from "react"


interface TanstackProviderProps {
    children: React.ReactNode
}

export const TanstackProvider = ({children}: TanstackProviderProps) =>{
    const queryClient = new QueryClient()

    return (
        <QueryClientProvider client={queryClient}>{children}
        
        {/* <ReactQueryDevtools initialIsOpen={false}/> */}
        </QueryClientProvider>
    )
}