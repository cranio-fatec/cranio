import { useEffect } from 'react'

const useOutsideClick = (
	ref: React.RefObject<HTMLElement>,
	callback: () => void
): void => {
	const handleClick = (e: MouseEvent) => {
		if (ref.current && !ref.current.contains(e.target as any)) {
			callback()
		}
	}

	useEffect(() => {
		document.addEventListener('click', handleClick)

		return () => {
			document.removeEventListener('click', handleClick)
		}
	})
}

export default useOutsideClick
