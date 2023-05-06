import { Box, Typography, styled } from "@mui/material";

export const ClickAbleLink = styled(Typography)`
    color: #108AEF;
    font-size: 14px;
`;

export const ADAValueFieldContainer = styled(Box)`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
`;

export const ADAValueLabel = styled(Typography)`
    font-size: 14px;
    color: ${props => props.theme.palette.text.primary};
    display: inline-flex;
    gap: 4px;
    align-items: center;
`;


export const ADAValueSubLabel = styled("span")`
    font-size: 12px;
    color: ${props => props.theme.palette.grey[400]};
    display: inline-flex;
    gap: 4px;
    align-items: center;
`;