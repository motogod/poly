/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, ReactNode, useCallback } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setIpState, AppDispatch } from '@/store';

type Props = {
	children: ReactNode;
};

function IpContext({ children }: Props) {
	const dispatch = useDispatch<AppDispatch>();

	const getGeoInfo = useCallback(() => {
		axios
			.get('https://ipapi.co/json/')
			.then(response => {
				let data = response.data;

				dispatch(
					setIpState({
						ip: data.ip,
						countryName: data.country_name,
						countryCode: data.country_calling_code,
						city: data.city,
						timezone: data.timezone,
						continentCode: data.continent_code,
						languages: data.languages,
					})
				);
			})
			.catch(error => {
				console.log(error);
			});
	}, []);

	useEffect(() => {
		getGeoInfo();
	}, []);

	return <>{children}</>;
}

export default IpContext;
