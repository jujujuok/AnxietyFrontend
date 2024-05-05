import axios from 'axios';

class DashboardInfoService {
    async getDashboardInfos() {
        return axios.get('http://212.132.100.147:8000/dashboard')
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
            const response = await axios.get(`http://212.132.100.147:8000/dashboard/${id}`);
            console.log(`Card details for id ${id}:`, response.data);
            return response.data;
        } catch (error) {
            console.error('Failed to fetch card details:', error);
        }
    };

    async getUpdates() {
        const endpoint = 'http://212.132.100.147:8000/dashboard/update';
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
