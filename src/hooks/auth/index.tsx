import useSWR from 'swr'
import React, { createContext, useContext } from 'react'

import type { AuthContextData } from './types'
import { DEFAULT_OPTIONS } from '../../config/swr'

const AuthContext = createContext<AuthContextData>({} as AuthContextData)

const AuthProvider = ({ children }: React.PropsWithChildren) => {
	const { data, isValidating, mutate } = useSWR('/profile', {
		...DEFAULT_OPTIONS
	})

	return (
		<AuthContext.Provider
			value={{
				user: data,
				mutate,
				isValidating
			}}
		>
			{children}
		</AuthContext.Provider>
	)
}

function useAuth(): AuthContextData {
	const context = useContext(AuthContext)

	if (!context) {
		throw new Error('useAuth must be used within a AuthProvider')
	}

	return context
}

export { AuthProvider, useAuth }
