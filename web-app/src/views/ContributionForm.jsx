import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import {useStateContext} from "../contexts/ContextProvider.jsx";
import axiosClient from "../axios-client.js";
import {Dropdown} from "primereact/dropdown";


export default function ContributionForm(){
  const navigate = useNavigate();
  const [users,setUsers] = useState([]);
  const [contribution,setContribution] = useState( {
    id:null,
    user_id:'',
    period: '',
    amount:'',
    type:""
  })
  const [errors, setErrors] = useState(null)
  const [loading, setLoading] = useState(false)
  const {setNotification} = useStateContext()


  useEffect(() => {
    getUsers()
  }, []);

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
  const onSubmit = ev => {
    ev.preventDefault()
    axiosClient.post('/contributions',contribution)
      .then(() => {
        setNotification('Contribution successfully added')
        navigate('/contributions')
      })
      .catch(err => {
        const response = err.response;
        if (response && response.status === 422) {
          setErrors(response.data.errors)
        }
      })
  }

  return (
    <>
      <h1>Add Contribution</h1>
      <div className="card animated fadeInDown">
        {loading && (
          <div className="text-center">
            Loading...
          </div>
        )}
        {errors &&
          <div className="alert">
            {Object.keys(errors).map(key => (
              <p key={key}>{errors[key][0]}</p>
            ))}
          </div>
        }
        {!loading && (
          <form onSubmit={onSubmit}>
            <div className="card flex justify-content-center">
            <Dropdown options={users.map(user => ({
              label: user.name,  // Displayed in the dropdown
              value: user.id,     // Value when selected

            }))}
                      placeholder="Select a user"
                      value={contribution.user_id}
                      style={{ width: '100%', marginBottom: '10px' ,backgroundColor: "lightblue"}}
                      onChange={(e) => setContribution({...contribution, user_id: e.value})}
                      className="w-full md:w-14rem bg-indigo-500"
                      />
                      </div>
            <input value={contribution.period}
                   onChange={ev => setContribution({...contribution, period: ev.target.value})} placeholder="Period"/>
            <input value={contribution.type}
                   onChange={ev => setContribution({...contribution, type: ev.target.value})} placeholder="Type"/>
            <input value={contribution.amount}
                   onChange={ev => setContribution({...contribution, amount: ev.target.value})} placeholder="Amount"/>
            <button className="btn">Save</button>
          </form>
        )}
      </div>
    </>
  )
}
