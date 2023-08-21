import axios from 'axios';

export class axiosCard {
  BASE_URL = 'https://tasty-treats-backend.p.goit.global/api/recipes/';

  page = 1;
  ingredients = null;
  category = '';
  area = null;
  time = null;
  tags = null;
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
          tags: this.tags,
          limit:this.limit,
        },
      });

      return response.data;
    } catch (err) {
      console.log(err);
    }
  }
}