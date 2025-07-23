import { Flex } from "../Layout/Flex"
import Text from "../Ui/Text/Text"

export function LoaderSkeleton({ children, isLoaded }: { children: React.ReactNode, isLoaded: boolean }) {

	function Loader() {
		return (
			<Flex color='transparent' $width='100%' $height='100%' $justify='center' $align='center'>
				<Text>Loading...</Text>
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