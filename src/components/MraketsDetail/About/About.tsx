import React from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import { Card, CardBody, Heading, Text, SkeletonText } from '@chakra-ui/react';
import styles from './about.module.scss';

function About() {
	const { t } = useTranslation();

	const { isMarketDetailLoading, marketDetailData } = useSelector(
		(state: RootState) => state.homeReducer
	);

	return (
		<Card
			mb={{ lg: '0px', md: '80px', sm: '80px' }}
			shadow="lg"
			border="1px solid #E2E8F0;"
			borderRadius="3xl"
		>
			<CardBody>
				<Heading size={'md'} color={'gray.800'}>
					{t('about')}
				</Heading>
				{isMarketDetailLoading ? (
					<>
						<SkeletonText mt="4" noOfLines={4} spacing="4" skeletonHeight="2" />
					</>
				) : (
					<>
						<Text mt={'20px'} fontSize={'md'} color={'gray.600'}>
							<div
								className={styles.htmlContent}
								dangerouslySetInnerHTML={{ __html: `${marketDetailData?.description}` }}
							/>
						</Text>
					</>
				)}
			</CardBody>
		</Card>
	);
}

export default About;
