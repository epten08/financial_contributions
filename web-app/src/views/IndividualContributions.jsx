import React, { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import {useNavigate, useParams} from "react-router-dom";
import {useStateContext} from "../contexts/ContextProvider.jsx";
import axiosClient from "../axios-client.js";
export default function  IndividualContributions(){

  const navigate = useNavigate();
  let {id} = useParams();
  const [contributions,setContributions] = useState({})
  const [errors, setErrors] = useState(null)
  const [loading, setLoading] = useState(false)
  const {setNotification} = useStateContext()


  useEffect(() => {
    getContributions(id)
  }, [id]);
  const getContributions = (userId) => {
    setLoading(true);
    axiosClient.get(`/user-contributions/${userId}`)
      .then(({ data }) => {
        setLoading(false);
        setContributions(data.data);
      })
      .catch(() => {
        setLoading(false);
      });
  };


  return (
    <>
      <h1>Contributions For: {contributions.length > 0 && contributions[0].user.name}</h1>
      <div className="card animated fadeInDown">
        {loading && (
          <div className="text-center">
            Loading...
          </div>
        )}
        <DataTable value={contributions} showGridlines tableStyle={{minWidth: '50rem'}}>
          <Column field="id" header="ID"></Column>
          <Column field="period" header="Period"></Column>
          <Column field="type" header="Type"></Column>
          <Column field="period" header="Amount"></Column>
        </DataTable>
      </div>
    </>
  )
}
