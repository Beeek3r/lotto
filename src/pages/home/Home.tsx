import {Box, Button, Stack} from '@mui/material';
import {Draw, useLottos} from '../../hooks/queries/lottos/useLottos.ts';
import {useEffect, useRef, useState} from 'react';
import DrawPicker from '../../components/DrawPicker';

const Home = () => {
  const fetchLottoResultsRef = useRef<boolean>(false)
  const {mutateAsync, data} = useLottos()
  const [selectedDraw, setSelectedDraw] = useState<Draw | null>(null)

  useEffect(() => {
    if (fetchLottoResultsRef.current) return

    const fetchLottoResults = async () => {
      try {
        await mutateAsync({
          CompanyId: 'GoldenCasket',
          MaxDrawCountPerProduct: 1,
          OptionalProductFilter: ['Powerball']
        });

        /** Uncomment for a larger selection of draws **/
        // await mutateAsync({
        //   CompanyId: 'GoldenCasket',
        //   MaxDrawCountPerProduct: 1,
        // });
      } catch (error) {
        // TODO
      } finally {
        fetchLottoResultsRef.current = true
      }
    };

    fetchLottoResults();
  }, [mutateAsync])

  /** Should do a better job with loading state **/
  if (!data) {
    return <>Loading</>
  }

  return (
    <Box>
      {/* Header */}
      <Box>
        <img src='https://www.thelott.com/content/dam/projects/the-lott/seo/The_Lott_Logo.png' height={120} alt='logo'/>
      </Box>

      {/* Content*/}
      <Box>
        {selectedDraw ? (
          <DrawPicker
            totalPrimaryNumbers={data?.DrawResults[0].PrimaryNumbers.length}
            totalSecondaryNumbers={data?.DrawResults[0].SecondaryNumbers.length}
            latestResults={{
              primary: data?.DrawResults[0].PrimaryNumbers,
              secondary: data?.DrawResults[0].SecondaryNumbers,
            }}
          />
        ): (
          <Box>
            <Stack spacing={1}>
              {data?.DrawResults.map((draw) => (
                <Button variant='contained' color='secondary' onClick={() => setSelectedDraw(draw)}>{draw.ProductId}</Button>
              ))}
            </Stack>
          </Box>
        )}
      </Box>
    </Box>
  )
}

export {Home}

