/* eslint-disable no-tabs */
import styled from 'styled-components';
import { Card } from 'antd';

const StyledContainer = styled.div`
	flex-wrap: wrap;
	display: flex;
	margin: 1.5rem;
`;

const StyledCard = styled(Card)`
	overflow: hidden;
	position: relative;
	text-align: left;
`;

export { StyledContainer, StyledCard };
