import { useState } from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Auth = ({ Component, user, cpAuth }) => {
	const [component, setComponent] = useState(null);

	const navigate = useNavigate();
	useEffect(() => {
		const currentAuth = parseInt(user.authority);
		if (currentAuth >= cpAuth) {
			setComponent(Component(user));
		} else {
			alert('접근 권한이 없습니다.'); // 여유 있으면 접근 금지 컴포넌트 만들기
			navigate('/');
		}
	}, [cpAuth, Component, navigate, user]);

	return component;
};

export default Auth;
