import { Inertia } from '@inertiajs/inertia';
import { Link } from '@inertiajs/inertia-react';
import React,{useState} from 'react';
import { usePage } from '@inertiajs/inertia-react';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function FormAdd({id,mhs}) {
    const [tid, setId]                   = mhs.id?useState(mhs.id) : useState('');
    const [tnim, setTnim]               = mhs.nim?useState(mhs.nim) : useState('');
    const [tfull_name, setTfull_name]   = mhs.full_name ?  useState(mhs.full_name) : useState('');
    const [tgenre, setTgenre]           =  mhs.genre ?  useState(mhs.genre) : useState('');
    const [taddress, setTaddress]       =  mhs.address ?  useState(mhs.address) : useState('');

    const [loading, setTLoading] = useState(false);

    const {errors} = usePage().props;

    const updateData = (e) => {
        e.preventDefault();
        setTLoading(true);

        if(tid) {
            const mahasiswa = {tfull_name,tgenre,taddress};
            Inertia.put(`../../mahasiswa/${id}`,mahasiswa,{
                onFinish:()=>setTLoading(false)
            })
        }else{
            const mahasiswa = {tnim,tfull_name,tgenre,taddress};
            Inertia.post('/mahasiswa',mahasiswa,{
                onFinish:()=>setTLoading(false)
            })

        }
    }
    return (
        <div className='container container-fluid'>
            <h2>
                {tid ? 'Edit':'Add' }
                &nbsp;Mahasiswa Form</h2>
            <hr/>
            <Link as='button' type='button' href='/mahasiswa' style={{marginBottom:10}} className='btn btn-small btn-warning'>
                Kembali
            </Link>
            <form onSubmit={updateData}>
                <div className="row mb-3">
                    <label className="col-sm-2 col-form-label">Input NIM </label>
                    <div className="col-sm-4">
                        <input type="text"  disabled={tid} className={`form-control ${errors.tnim && 'is-invalid'}`} value={tnim} onChange={(e) => setTnim(e.target.value)} placeholder='NIM' maxLength={9} />
                        { 
                            errors.tnim && 
                            <div className="invalid-feedback">
                                {errors.tnim}
                            </div>
                        }

                    </div>
                </div>
                <div className="row mb-3">
                    <label className="col-sm-2 col-form-label">Full Name </label>
                    <div className="col-sm-6">
                        <input type="text" className={`form-control ${errors.tfull_name && 'is-invalid'}`} value={tfull_name} onChange={(e) => setTfull_name(e.target.value)} placeholder='Full Name' maxLength={25} />
                        { 
                            errors.tfull_name && 
                            <div className="invalid-feedback">
                                {errors.tfull_name}
                            </div>
                        }

                    </div>
                </div>

                <div className="row mb-3">
                    <label className="col-sm-2 col-form-label">Gender </label>
                    <div className="col-sm-4">
                        <select className={`form-select ${errors.tgenre && 'is-invalid'}`} defaultValue={tgenre}  onChange={(e)=>setTgenre(e.target.value)} >
                                    <option value='' >- Please Select Gender - </option>
                                    <option value='F'>Female</option>
                                    <option value='M'>Male</option>
                                </select>
                        { 
                            errors.tgenre && 
                            <div className="invalid-feedback">
                                {errors.tgenre}
                            </div>
                        }

                    </div>
                </div>

                <div className="row mb-3">
                    <label className="col-sm-2 col-form-label">Address </label>
                    <div className="col-sm-6">
                        <textarea className={`form-control ${errors.taddress && 'is-invalid'}`} value={taddress} onChange={(e)=>setTaddress(e.target.value)} placeholder='Input Your Address' rows={5} cols={40}></textarea>
                        { 
                            errors.taddress && 
                            <div className="invalid-feedback">
                                {errors.taddress}
                            </div>
                        }
                    </div>
                </div>

                <div className="row mb-3">
                    <label className="col-sm-2 col-form-label"> </label>
                    <div className="col-sm-6">
                        <button type='submit' disabled={loading} className='btn btn-small btn-success'>
                            {loading ? 'Submitting..':'Submit'}
                        </button>
                    </div>
                </div>
            </form>
        </div>
    )
}