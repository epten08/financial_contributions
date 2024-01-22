import {useEffect, useState} from "react";
import {useStateContext} from "../contexts/ContextProvider.jsx";
import axiosClient from "../axios-client.js";
//datatable imports
import { classNames } from 'primereact/utils';
import { FilterMatchMode, FilterOperator } from 'primereact/api';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { MultiSelect } from 'primereact/multiselect';
import { Tag } from 'primereact/tag';
import { TriStateCheckbox } from 'primereact/tristatecheckbox';
import { Button } from 'primereact/button';
import {Link} from "react-router-dom";

export default function Contributions(){
  const [contributions,setContributions] = useState([]);
  const [loading,setLoading] = useState(false)
  const {setNotification} = useStateContext()

  //datatable variables
  const [filters, setFilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    'user.name': { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    type: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    period: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
  });
  const [globalFilterValue, setGlobalFilterValue] = useState('');

  useEffect(() => {
    getContributions()
  }, []);

  const getContributions = () => {
    setLoading(true)
    axiosClient.get('/contributions')
      .then(({data}) => {
        setLoading(false)
        setContributions(data.data)
      }).catch(() => {
        setLoading(false)
    })
  }
  const onGlobalFilterChange = (e) => {
    const value = e.target.value;
    let _filters = { ...filters };

    _filters['global'].value = value;

    setFilters(_filters);
    setGlobalFilterValue(value);
  }

  const renderHeader = () => {
    return (
      <div className="flex justify-content-end">
                <span className="p-input-icon-left">
                    <i className="pi pi-search" />
                    <InputText value={globalFilterValue} onChange={onGlobalFilterChange} placeholder="Keyword Search" />
                </span>
      </div>
    );
  }

  const header = renderHeader();

  return (

  <div>
    <div style={{display: 'flex', justifyContent: "space-between", alignItems: "center"}}>
      <h1>Members</h1>
      <Link className="btn-add" to="/contributions/new">Add Contribution</Link>
    </div>
    <div className="card animated fadeInDown">
      <DataTable value={contributions} dataKey="id" filterDisplay="row" filters={filters} globalFilterFields={['name', 'email']}
                 header={header} loading={loading} emptyMessage="No contributions found.">
        <Column field="user.name" header="Member" filter filterPlaceholder="Search by member"
                style={{minWidth: '12rem'}}/>
        <Column field="period" header="Period" filter filterPlaceholder="Search by name" style={{minWidth: '12rem'}}/>
        <Column field="type" header="Type" filter filterPlaceholder="Search by email" style={{minWidth: '12rem'}}/>
        <Column field="amount" header="Amount"
                style={{minWidth: '12rem'}}/>

      </DataTable>
    </div>
  </div>
  )
}
