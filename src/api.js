import axios from 'axios';

const BASE_URL = 'http://localhost:3001/todos';

export function ReadData() {
  return axios.get(`${BASE_URL}`).then((Response) => Response.data);
} // json 서버 쓸때는 이걸 쓰면 작동 함

// export async function ReadDatas() {
//     const response = await api.get('/product');
//     return response.data;
//   } // json 서버 쓸때는 이걸 쓰면 작동 안함


// CREATE
export async function CreateData(myData) {
    const { data } = await axios.post(`${BASE_URL}`, myData);
    return data;
  }
  // DELETE
  export async function DeleteData(myId) {
    const { data } = await axios.delete(`http://localhost:3001/todos/${myId}`);
    return data;
  }
  // UPDATE
  export async function UpdateData({ todoId, editData }) {
    const { data } = await axios.put(`http://localhost:3001/todos/${todoId}`, editData);
    return data;
  }