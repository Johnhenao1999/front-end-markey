import { responsiveFontSizes } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { json, useNavigate, useParams } from "react-router-dom";

const URI = 'http://localhost:8000/holamundo/'

const CompEditarUsuarios = () => {
    const [nombre, setNombre] = useState('')    
    const [apellido, setApellido] = useState('')    
    const [email, setEmail] = useState('')    
    const [telefono, setTelefono] = useState('')    
    const [total_horas, setHorasTrabajadas] = useState('') 
    const navigate = useNavigate()
    const {id} = useParams()

    //procedimiento para actualizar
    const actualizar = async (e) => {
        e.preventDefault()
        await axios.put(URI+id, {
            nombre: nombre,
            apellido: apellido,
            email:email,
            telefono:telefono,
            total_horas:total_horas
        })
        navigate('/')
    }

    useEffect( ()=>{
        
        getBlogById()
    },[])

    const getBlogById = async () => {
        const res = await axios.get(URI+id)
        setNombre(res.data[0].nombre)
        setApellido(res.data[0].apellido)
        setEmail(res.data[0].email)
        setTelefono(res.data[0].telefono)
        setHorasTrabajadas(res.data[0].total_horas)
    }

    return (
        <div>
        <h3>Edit POST</h3>
        <form onSubmit={actualizar}>
            <div className="mb-3">
                <label className="form-label">Nombre</label>
                <input
                    value={nombre}
                    onChange={ (e)=> setNombre(e.target.value)}
                    type="text"
                    className="form-control"                        
                />
            </div>
            <div className="mb-3">
                <label  className="form-label">Apellido</label>
                <textarea
                    value={apellido}
                    onChange={ (e)=> setApellido(e.target.value)}
                    type="text"
                    className="form-control"
                />
            </div>     
            <div className="mb-3">
                <label  className="form-label">Email</label>
                <textarea
                    value={email}
                    onChange={ (e)=> setEmail(e.target.value)}
                    type="text"
                    className="form-control"
                />
            </div>   
            <div className="mb-3">
                <label  className="form-label">Telefono</label>
                <textarea
                    value={telefono}
                    onChange={ (e)=> setTelefono(e.target.value)}
                    type="text"
                    className="form-control"
                />
            </div>          
            <div className="mb-3">
                <label  className="form-label">Horas trabajadas</label>
                <textarea
                    value={total_horas}
                    onChange={ (e)=> setHorasTrabajadas(e.target.value)}
                    type="text"
                    className="form-control"
                />
            </div>  
            <button type="submit" className="btn btn-primary">Actualizar</button>
        </form>
    </div>
    )

}

export default CompEditarUsuarios