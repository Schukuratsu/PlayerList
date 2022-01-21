import axios from 'axios';

export async function isValidCityId(cityId: number) {
  return axios
    .get<any[]>(`https://servicodados.ibge.gov.br/api/v1/localidades/municipios/${cityId}`)
    .then(({ data }) => {
      if (data.length === 0) {
        return false;
      }
      return true;
    })
    .catch((error) => {
      console.error(error);
      return false;
    });
}
