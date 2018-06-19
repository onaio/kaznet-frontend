import _ from 'lodash';
import * as constants from '../constants';

class ClientService {

    async getClientList() {
        const url = `${constants.KAZNET_ENDPOINT}/clients/?format=vnd.api%2Bjson`;
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                Accept: 'application/vnd.api+json'
            }
        });

        if (!response.ok) {
            throw new Error(`ClientService getClientList failed, HTTP status ${response.status}`);  
        }

        const apiResponse = await response.json();
        const data = _.get(apiResponse, 'data');

        if (!data) {
            throw new Error(`ClientService getClientList failed, data not returned`);
        }

        return _.map(data, (client) => {
            return client;
        });
    }
}

export default new ClientService();
