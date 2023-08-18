
export const  fetchApi = (url)=>{
    fetch(`${url}`)
    .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((res)=> console.log(res))
      .catch(error => {
        console.log('Error:', error);
        throw error;
      });

}

