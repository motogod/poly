import React, { useState } from 'react';
import { Stack, Button, Input, Card, CardBody, Grid, Heading, Text } from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/store';
import AppContainer from '@/components/common/Container';
import { headerHeight } from '../../utils/screen';
import style from './profile.module.scss';

// background: linear-gradient(90deg, #edf2f7 44%, #d53f8c 30%);
function Profile() {
	const [name, setName] = useState('');

	const { user } = useSelector((state: RootState) => state.authReducer);

	console.log('user', user);
	const { username } = user;

	return (
		<Stack mt={headerHeight} h={'100vh'}>
			<Stack pt={'60px'} pl={'200px'} h={'150px'} bg={'#0034EB'}></Stack>
			<Stack
				pl={'16px'}
				pr={'16px'}
				mt={-3}
				className={style.skewRectangle}
				borderColor={'#0034EB'}
			>
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
							<Stack direction={'row'} mt={'32px'}>
								<Text fontWeight={'500'} fontSize={'md'}>
									Username
								</Text>
								<Text fontWeight={'500'} fontSize={'md'} color={'red'}>
									*
								</Text>
							</Stack>
							<Stack mt={'12px'} display={'flex'} direction={'row'} alignItems={'center'}>
								<Input
									defaultValue={username !== null ? username : ''}
									isDisabled={true}
									onChange={e => setName(e.target.value)}
									w={'600px'}
									placeholder={'Please enter your preferred username'}
									border="2px solid #E2E8F0;"
								/>
								{/* <Button isDisabled={!name} bg="#0034EB" color="#fff">
									Save
								</Button> */}
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
