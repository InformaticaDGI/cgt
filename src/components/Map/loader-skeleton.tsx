import { CircularProgress, Flex, FlexProps } from "@chakra-ui/react"

export function LoaderSkeleton({ children, isLoaded }: { children: React.ReactNode, isLoaded: boolean }) {

	function Loader() {
		return (
			<Flex bgColor='transparent' width='100%' height='100%' alignItems='center' justifyContent='center'>
				<CircularProgress isIndeterminate color='green.300' />
			</Flex>
		)
	}

	if (!isLoaded) {
		return <Loader />
	}

	return (
		children
	)
}