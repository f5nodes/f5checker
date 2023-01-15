import { Checker } from '../checker/interface';
import { MassaInfoParams, MassaResponse } from './interfaces';
import { post } from '../../api';
import { verifyResponse } from '../../utils/verifyResponse';
import { NodeInfoPayload } from '../../routes/info/interfaces';
import { validationError } from '../../errors';

class MassaChecker implements Checker {
	async getLogs(): Promise<any> {}

	async getInfo(params: NodeInfoPayload): Promise<any> {
		this.validate(params);
		const { address } = params;
		const massaResponse = await post<MassaResponse>('https://test.massa.net/api/v2', {
			jsonrpc: '2.0',
			id: 1,
			method: 'get_addresses',
			params: [[address]],
		});

		verifyResponse(massaResponse);

		const {
			data: { result },
		} = massaResponse;

		const massaInfo = result[0];

		const response = {
			address: massaInfo.address,
			finalBalance: massaInfo.final_balance,
			finalRollCount: massaInfo.final_roll_count,
			activeRolls: 0,
		};

		response.activeRolls = massaInfo.cycle_infos[massaInfo.cycle_infos.length - 1].active_rolls;

		return response;
	}

	validate(params: NodeInfoPayload): asserts params is MassaInfoParams {
		if (!('address' in params)) {
			throw validationError('Address should be defined for massa node');
		}
	}
}

export default new MassaChecker();
