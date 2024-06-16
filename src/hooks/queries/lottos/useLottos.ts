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

/** Probably better to seperate the call and hook in different files / dirs **/
const fetchLottoResults = async (payload: LottoRequestPayload): Promise<LottoResponse> => {
  const response = await axios.post<LottoResponse>('https://data.api.thelott.com/sales/vmax/web/data/lotto/latestresults', payload);

  return response.data;
};

/** Technically its a mutation, but given that we're using a POST request to effectively make a GET doesn't follow HTTP standards, we're going to mimic a query **/
const useLottos = (): UseMutationResult<LottoResponse, unknown, LottoRequestPayload> => {
  return useMutation({
    mutationFn: fetchLottoResults,
  });
};

export {useLottos}
