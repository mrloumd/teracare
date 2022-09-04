/* eslint-disable no-tabs */
import styled from "styled-components";
import { Card } from "antd";

const StyledContainer = styled.div`
	flex-wrap: wrap;
	justify-content: center;
	display: flex;
`;

const StyledCard = styled(Card)`
	overflow: hidden;
	position: relative;
	text-align: center;
	box-shadow: 0 3px 10px rgb(0 0 0 / 20%);
	width: 70%;

	.ant-card-body {
		padding: 0;
	}

	.tc-vitals--container {
		flex-wrap: wrap;
		justify-content: center;
		display: flex;
	}

	.tc-vitals--card {
		overflow: hidden;
		position: relative;
		float: left;
		padding: 0.5rem;
		border-radius: 1rem;
		margin: 0 0;
	}

	.tc-vitals {
		font-size: 2rem;
		margin-bottom: 0.5rem;
		padding: 0.5rem;
		height: 49%;

		border-radius: 1rem;
		box-shadow: 0 3px 10px rgb(0 0 0 / 20%);
	}

	@media (max-width: 835px) {
		width: 100%;

		.tc-vitals--card {
			width: 100%;
		}
	}
`;

export { StyledContainer, StyledCard };
