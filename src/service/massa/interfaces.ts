export interface MassaResponse {
  jsonrpc: string;
    result: [
    {
      address: 'A1h4xfurT2YZY85433CU9hiDn1Q5K2uBiVdL1YXgc7W5ryCAHTi';
      final_balance: '401.882352928';
      final_roll_count: 1;
      cycle_infos: CycleInfos[]
    }
  ];
  id: number
}

export interface MassaInfoParams {
  address: string;
}

interface CycleInfos {
  active_rolls: number;
  cycle: number;
  is_final: boolean;
  nok_count: number;
  ok_count: number
}
