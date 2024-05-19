import axios from 'axios';
class DashboardInfoService {

    constructor() {
        this.baseUrl = 'https://api.risiko-radar.info';
    }

    async getDashboardInfos() {
        return axios.get(`${this.baseUrl}/dashboard`)
            .then(response => {
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
            return response.data;
        } catch (error) {
            console.error('Failed to fetch card details:', error);
        }
    };

    async fetchMapDetailsById(id) {
        try {
            const response = await axios.get(`${this.baseUrl}/map/${id}`);
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

            return response.data;
        } catch (error) {
            console.error('Error updating dashboard timestamp:', error);
        }
    }
}

export default new DashboardInfoService();
