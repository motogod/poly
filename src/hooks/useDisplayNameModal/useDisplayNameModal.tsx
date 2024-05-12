import React, { useEffect, useMemo, useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import { useTranslation } from 'next-i18next';
import {
	useDisclosure,
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalFooter,
	ModalBody,
	Text,
	Button,
	Stack,
	Input,
	FormControl,
	FormLabel,
	Checkbox,
	FormHelperText,
	FormErrorMessage,
} from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { putUserProfile, AppDispatch, RootState, resetPutUserProfileErrMsg } from '@/store';
import { useUtility } from '@/hooks';

function useDisplayNameModal() {
	const [name, setName] = useState('');
	const [checked, setChecked] = useState<boolean>(false);

	const disaptch = useDispatch<AppDispatch>();

	const { t } = useTranslation();

	const { isOpen, onOpen, onClose } = useDisclosure();

	const { checkEngAndNumberName, inputNameErrMsg } = useUtility();

	const { putUsrProfileIsLoading, putUsrProfileErrMsg } = useSelector(
		(state: RootState) => state.authReducer
	);

	useEffect(() => {
		// 創建名字成功 關閉創建名字視窗
		if (putUsrProfileIsLoading === false) {
			onClose();
		}
	}, [putUsrProfileIsLoading, onClose]);

	const isDesktop = useMediaQuery({
		query: '(min-width: 768px)',
	});

	const ModalDom = useMemo(
		() => (
			<Modal size={isDesktop ? 'lg' : 'full'} isOpen={isOpen} onClose={onOpen}>
				<ModalOverlay />
				<ModalContent
					_focus={{ boxShadow: 'md' }}
					borderRadius={20}
					borderBottomRadius={isDesktop ? 20 : 0}
				>
					<ModalHeader alignSelf={'center'}>{t('create_an_account')}</ModalHeader>
					<ModalBody>
						<FormControl isRequired isInvalid={inputNameErrMsg !== ''}>
							<FormLabel fontWeight={'800'}>{t('username')}</FormLabel>
							<Input
								minLength={6}
								maxLength={16}
								defaultValue={name}
								autoCapitalize={'none'}
								onChange={e => {
									checkEngAndNumberName(e.target.value);
									setName(e.target.value.toLowerCase());
									// 輸入資料時清空 API 返回時顯示的 error msg
									disaptch(resetPutUserProfileErrMsg());
								}}
								placeholder={t('please_enter_your_preferred_username')}
								border="2px solid #E2E8F0;"
							/>
							{inputNameErrMsg !== '' && <FormErrorMessage>{inputNameErrMsg}</FormErrorMessage>}
						</FormControl>
						<FormErrorMessage>Email is required.</FormErrorMessage>
						{putUsrProfileErrMsg === '' ? (
							<Text fontWeight={'500'} fontSize={'sm'} mt={'14px'} color={'#7C7C7C'}>
								{t('this_is_policy_visible')}
							</Text>
						) : (
							<Text fontWeight={'500'} fontSize={'sm'} mt={'14px'} color={'red.500'}>
								{putUsrProfileErrMsg}
							</Text>
						)}
						<Checkbox
							isChecked={checked}
							onChange={e => setChecked(e.target.checked)}
							w={'100%'}
							mt={'30px'}
							borderColor={'gray.300'}
						>
							<Stack
								fontSize={{ base: '10px', sm: '12px', md: '16px' }}
								direction={'row'}
								align={'center'}
							>
								<Text>{t('i_agree_the_terms')}</Text>
								{/* <Text onClick={() => alert('Terms of Use')} cursor={'pointer'} color={'blue.500'}>
									Terms of Use
								</Text>
								<Text>and </Text> */}
								<Text onClick={() => alert('Privacy Policy')} cursor={'pointer'} color={'blue.500'}>
									{t('privacy_policy')}
								</Text>
								<Text fontWeight={'500'} fontSize={'md'} color={'red'}>
									*
								</Text>
							</Stack>
						</Checkbox>
					</ModalBody>

					<ModalFooter>
						<Button
							isLoading={putUsrProfileIsLoading !== null && putUsrProfileIsLoading}
							isDisabled={!checked || inputNameErrMsg || !name ? true : false}
							w={'100%'}
							bg={'teal.500'}
							color="#fff"
							onClick={() => {
								disaptch(putUserProfile({ username: name }));
							}}
						>
							{t('continue')}
						</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		),
		[
			disaptch,
			checked,
			name,
			isOpen,
			onOpen,
			isDesktop,
			checkEngAndNumberName,
			inputNameErrMsg,
			putUsrProfileIsLoading,
			putUsrProfileErrMsg,
			t,
		]
	);

	return { ModalDom, isOpen, onOpen, onClose };
}

export default useDisplayNameModal;
