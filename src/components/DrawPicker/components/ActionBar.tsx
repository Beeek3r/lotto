import {Box, Stack, Tooltip} from '@mui/material';
import { FlashOnSharp, DeleteForever } from '@mui/icons-material';
import styled from 'styled-components';
import {Style} from '../../../theme.ts';


const BaseActionButton = styled.button<{backgroundColour: string}>`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 32px;
    border-radius: 50%;
    padding: 0;
    background: ${props => props.backgroundColour};
    color: #FFFFFF;
    font-size: 22px;

    &:hover {
        opacity: 0.8;
    }

    &:active {
        opacity: 0.8; /* Even darker white on click */
        transform: scale(0.95); /* Scale down slightly on click */
    }
`;

interface ActionBarProps {
  handleClearNumbers: () => void;
  handlePrefillLatestResults: () => void;
}

const ActionBar = ({handleClearNumbers, handlePrefillLatestResults}: ActionBarProps) => {
  return (
    <Box>
      <Stack direction='row'  spacing={1}>
        <Tooltip title="Prefill the latest result">
          <BaseActionButton backgroundColour={Style.Palette.Primary} onClick={handlePrefillLatestResults} data-testid='action-bar-prefill-latest-results-button'>
            <FlashOnSharp fontSize='inherit'/>
          </BaseActionButton>
        </Tooltip>
        <Tooltip title="Reset selected numbers">
          <BaseActionButton backgroundColour='#808080' onClick={handleClearNumbers} data-testid='action-bar-clear-draw-numbers-button'>
            <DeleteForever fontSize='inherit'/>
          </BaseActionButton>
        </Tooltip>
      </Stack>
    </Box>
  )
}

export {ActionBar}