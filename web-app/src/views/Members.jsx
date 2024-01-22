import {useEffect, useState} from "react";
import axiosClient from "../axios-client.js";
import {Link} from "react-router-dom";
import {useStateContext} from "../contexts/ContextProvider.jsx";
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

export default function Members(){

  const [users,setUsers] = useState([]);
  const [loading,setLoading] = useState(false)
  const {setNotification} = useStateContext()

  //datatable variables
  const [filters, setFilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    name: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    email: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    created_at: { value: null, matchMode: FilterMatchMode.STARTS_WITH }
  });
  const [globalFilterValue, setGlobalFilterValue] = useState('');

  useEffect(() => {
    getUsers()
  }, []);
  const onDeleteClick = user => {
    if (!window.confirm("Are you sure you want to delete this user?")) {
      return
    }
    axiosClient.delete(`/users/${user.id}`)
      .then(() => {
        setNotification('User was successfully deleted')
        getUsers()
      })
  }
  const getUsers = () => {
    setLoading(true)
    axiosClient.get('/users')
      .then(({ data }) => {
        setLoading(false)
        setUsers(data.data)
      })
      .catch(() => {
        setLoading(false)
      })
  }

  //data table methods
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

  const editButtonTemplate = (rowData) => (
    <Link to={`/users/${rowData.id}`} className="btn-edit">
      Edit
    </Link>
  );

  const viewButtonTemplate = (rowData) => (
    <Link to={`/user-contributions/${rowData.id}`} className="btn-add">
      View
    </Link>
  );

  const deleteButtonTemplate = (rowData) => (
    <Button
      label="Delete"
      icon="pi pi-trash"
      className="btn-delete"
    />
  );

  const header = renderHeader();


  return (
    <div>
    <div style={{display: 'flex', justifyContent: "space-between", alignItems: "center"}}>
    <h1>Members</h1>
      <Link className="btn-add" to="/users/new">Add new</Link>
    </div>
    <div className="card animated fadeInDown">
      <DataTable value={users} dataKey="id" filterDisplay="row" filters={filters} globalFilterFields={['name','email']} header={header} loading={loading} emptyMessage="No members found.">
        <Column field="name" header="Name" filter filterPlaceholder="Search by name" style={{ minWidth: '12rem' }} />
        <Column field="email" header="Email" filter filterPlaceholder="Search by email" style={{ minWidth: '12rem' }} />
        <Column field="created_at" header="Date Created" filter filterPlaceholder="Search by date" style={{ minWidth: '12rem' }} />
        <Column body={viewButtonTemplate} style={{ textAlign: 'center', width: '8rem' }} />
        <Column body={editButtonTemplate} style={{ textAlign: 'center', width: '8rem' }} />
        <Column body={deleteButtonTemplate} style={{ textAlign: 'center', width: '8rem' }} />
      </DataTable>
    </div>
    </div>
  )
}
