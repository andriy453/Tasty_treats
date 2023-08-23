import axios from 'axios';

export class axiosCard {
  BASE_URL = 'https://tasty-treats-backend.p.goit.global/api/recipes/';

  page = 1;
  ingredients = '';
  category = '';
  area = '';
  time = '';
  tags = '';


  limit = 6;

  async getCardData() {
    try {
      const response = await axios.get(`${this.BASE_URL}`, {
        params: {
          category: this.category,
          page: this.page,
          time: this.time,
          area: this.area,
          ingredient: this.ingredients,
          title: this.title,
          limit: this.limit,
        },
      });

      return response.data;
    } catch (err) {
      console.log(err);
    }
  }
}
