import type { SWRConfiguration } from 'swr'

export const DEFAULT_OPTIONS: SWRConfiguration = {
	errorRetryCount: 3,
	refreshWhenHidden: false,
	refreshWhenOffline: false,
	revalidateOnFocus: false,
	revalidateOnReconnect: false,
	shouldRetryOnError: true,

	dedupingInterval: 60 * 1000 // 1 minute
}
