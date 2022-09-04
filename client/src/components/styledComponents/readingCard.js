/* eslint-disable no-tabs */
import styled from 'styled-components';

const StyledCard = styled.div`
	margin: 1rem;
	overflow: hidden;
	position: relative;
	text-align: left;
	box-shadow: 0 3px 10px rgb(0 0 0 / 20%);

	.tc-patient--container {
		flex-wrap: wrap;
		justify-content: center;
		display: flex;
	}

	.tc-patient--card {
		padding: 1rem;
		overflow: hidden;
		position: relative;
		text-align: left;
	}
`;

const StyledContainer = styled.div`
	flex-wrap: wrap;
	display: flex;
`;

const StyledCardTitle = styled.div`
	.ant-card-head-title {
		font-size: 1.5rem;
	}
`;

export { StyledCard, StyledCardTitle, StyledContainer };
