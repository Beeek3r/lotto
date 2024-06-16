import { useMutation, UseMutationResult } from '@tanstack/react-query';
import axios from 'axios';

interface LottoRequestPayload {
  CompanyId: string;
  MaxDrawCountPerProduct: number;
  OptionalProductFilter?: string[];
}

export interface Draw {
  ProductId: string;
  DrawNumber: number;
  DrawDate: string; /** DateISOString **/
  DrawDisplayName: string;
  DrawLogoUrl: string;
  PrimaryNumbers: number[]
  SecondaryNumbers: number[]
  [key: string]: unknown; /** There are other props - not very relevant for the task **/
}

/** Somewhat accurate typing from messing around with the endpoint **/
interface LottoResponse {
  DrawResults: Draw[];
  ErrorInfo: null | unknown
  Success: boolean
}

const fetchLottoResults = async (payload: LottoRequestPayload): Promise<LottoResponse> => {
  const response = await axios.post<LottoResponse>('https://data.api.thelott.com/sales/vmax/web/data/lotto/latestresults', payload);

  return response.data;
};

const useLottos = (): UseMutationResult<LottoResponse, unknown, LottoRequestPayload> => {
  return useMutation({
    mutationFn: fetchLottoResults,
  });
};

export {useLottos}
