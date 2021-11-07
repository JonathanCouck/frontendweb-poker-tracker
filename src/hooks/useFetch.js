import axios from 'axios';
import {useState, useEffect} from 'react';

export function useFetch(uri){
	const [data, setData] = useState();
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState();

	useEffect(()=> {
		async function fetchData(){
			try {
				setError();
				setLoading(true)
				const {data}= await axios.get(uri);
				setData(data.data);
			} catch (error) {
				setError(error);
			} finally{
				setLoading(false);
			}
		};
		fetchData();
	}, []);
	return {loading, data, error};
}