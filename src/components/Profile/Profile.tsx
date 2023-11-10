import { Stack, Button, Input, Card, CardBody, Grid, Heading, Text } from '@chakra-ui/react';
import AppContainer from '@/components/common/Container';
import { headerHeight } from '../../utils/screen';
import style from './profile.module.scss';

// background: linear-gradient(90deg, #edf2f7 44%, #d53f8c 30%);
function Profile() {
	return (
		<Stack mt={headerHeight} h={'100vh'}>
			<Stack pt={'60px'} pl={'200px'} h={'150px'} bg={'#0034EB'}></Stack>
			<Stack pl={'16px'} pr={'16px'} mt={-2} className={style.skewRectangle}>
				<Grid display={'flex'} justifyContent={'center'} templateColumns={'repeat(1, 1fr)'}>
					<Card w={'1112px'} h={'259px'} shadow="md" borderRadius="xl">
						<CardBody>
							<Heading
								position={'absolute'}
								top={-20}
								cursor="pointer"
								size="lg"
								color="#FFF"
								mr={5}
							>
								Profile Settings
							</Heading>
							<Text fontWeight={'800'} fontSize={'lg'}>
								Account
							</Text>
							<Text fontWeight={'500'} fontSize={'md'} mt={'32px'}>
								Username
							</Text>
							<Stack mt={'12px'} display={'flex'} direction={'row'} alignItems={'center'}>
								<Input
									w={'600px'}
									placeholder={'Please enter your preferred username'}
									border="2px solid #E2E8F0;"
								/>
								<Button bg="#0034EB" color="#fff">
									Save
								</Button>
							</Stack>
							<Text fontWeight={'500'} fontSize={'sm'} mt={'10px'} color={'#7C7C7C'}>
								This is publicly visible
							</Text>
						</CardBody>
					</Card>
				</Grid>
			</Stack>
		</Stack>
	);
}

export default Profile;
