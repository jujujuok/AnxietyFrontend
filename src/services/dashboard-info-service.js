import axios from 'axios';
class DashboardInfoService {

    constructor() {
        this.baseUrl = 'http://api.risiko-radar.info';
    }

    async getDashboardInfos() {
        return axios.get(`${this.baseUrl}/dashboard`)
            .then(response => {
                console.log(response);
                return response.data;
            })
            .catch(error => {
                console.error('There was an error!', error);
                return [];
            });
    }

    async fetchCardDetailsById(id) {
        try {
            const response = await axios.get(`${this.baseUrl}/dashboard/${id}`);
            console.log(`Card details for id ${id}:`, response.data);
            return response.data;
        } catch (error) {
            console.error('Failed to fetch card details:', error);
        }
    };

    async fetchMapDetailsById(id) {
        try {
            const response = await axios.get(`${this.baseUrl}/map/${id}`);
            console.log(`Card details for id ${id}:`, response.data);
            return response.data;
        } catch (error) {
            console.error('Failed to fetch card details:', error);
        }
    };

    async getDashboardUpdates() {
        const endpoint = `${this.baseUrl}/dashboard/update`;
        const timestamp = 1714915348;

        try {
            const response = await axios.get(endpoint, {
                params: {
                    'timestamp': timestamp
                }
            });

            console.log('Success:', response.data);
            return response.data;
        } catch (error) {
            console.error('Error updating dashboard timestamp:', error);
        }
    }

    async getMapUpdates() {
        const endpoint = `${this.baseUrl}/map/update`;
        const timestamp = 1714915348;

        try {
            const response = await axios.get(endpoint, {
                params: {
                    'timestamp': timestamp
                }
            });

            console.log('Success:', response.data);
            return response.data;
        } catch (error) {
            console.error('Error updating dashboard timestamp:', error);
        }
    }
}

export default new DashboardInfoService();
