import axios from 'axios';

export class axiosRecipes {
  BASE_URL = 'https://tasty-treats-backend.p.goit.global/api/';

  async getFilteredData(filters) {
    return axios
      .get(`${this.BASE_URL}${filters}`)
      .then(response => response.data)
      .catch(error => {
        console.error('Error:', error);
      });
  }
}