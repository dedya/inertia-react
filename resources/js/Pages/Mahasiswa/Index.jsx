import { Link } from '@inertiajs/inertia-react';
import React,{useState} from 'react';
import { usePage } from '@inertiajs/inertia-react';
import { Inertia } from '@inertiajs/inertia';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Index({mahasiswa, filters, current_page}) {
    //console.log(mahasiswa);
    const { flash } = usePage().props;

    //set search by Get parameter if exists
    const [search, setSearch] = useState(filters.search || '');
    
    const deleteData =  (id,full_name) =>  {
        if(confirm(`Are you sure to delete ${full_name}`)){
            Inertia.delete(`/mahasiswa/${id}`)
        }
    }

    const editData =  (id,full_name) =>  {
        Inertia.get(`mahasiswa/${id}/edit`)
    }

    const doSearchData =  (e) =>  {
        e.preventDefault();
        Inertia.get(`/mahasiswa`,{search},{preserveState:true})
    }

    const startNumber = (mahasiswa.current_page - 1) * mahasiswa.per_page;
    return (
        <div className='container container-fluid'>
            <h3>Data Mahasiswa</h3>
            <hr />
            <Link className='btn btn-sm btn-primary' as='button' type='button' href='mahasiswa/create' style={{marginBottom:10}}>Tambah data</Link>
            {
                flash && flash.message && <div style={{
                    fontWeight:'bold',
                    color:'green',
                    marginBottom:10
                }}>{flash.message}</div>
            }
            <form onSubmit={doSearchData}>
                <div className="input-group mb-3">
                    <input type="text" className="form-control" placeholder="NIM/Full Name" value={search} 
                    onChange={(e) => setSearch(e.target.value)}></input>
                    <button className="btn btn-outline-secondary" type="submit">Search</button>
                </div>
            </form> 

            {/* <div style={{
                marginBottom:10
            }}>Total data : {mahasiswa.data.length}</div> */}
            <table className='table table-bordered table-stripped'>
                <thead>
                    <tr>
                        <th>No.</th>
                        <th>NIM</th>
                        <th>Full Name</th>
                        <th>Gender</th>
                        <th>Address</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        mahasiswa.data && mahasiswa.data.length === 0 ? (
                            <tr>
                                <td colSpan={5}> No data ...</td>
                            </tr>
                        ) : (
                            mahasiswa.data.map((mhs,index) => (
                                <tr key={index}>
                                    <td>{startNumber + index + 1}</td>
                                    <td>{mhs.nim}</td>
                                    <td>{mhs.full_name}</td>
                                    <td>
                                        {mhs.genre == 'M' ? 'Male':'Female' }
                                    </td>
                                    <td>{mhs.address}</td>
                                    <td>
                                        
                                        <button className='btn btn-sm btn-info'
                                            onClick={() => editData(mhs.id,mhs.full_name)}                                        
                                        >Edit</button>
                                        <button className='btn btn-sm btn-danger' style={{
                                            marginLeft:6
                                        }}
                                        onClick={() => deleteData(mhs.id,mhs.full_name)}
                                        
                                        >Hapus</button>
                                    </td>
                                </tr>
                            ))
                        )
                    }
                </tbody>
            </table>
            <div style={{marginTop:10}}>
                <nav aria-label="Page navigation example">
                    <ul className="pagination">
                        {
                            ( 
                                mahasiswa.links.map((link,index) => {
                                    if(link.url === null){
                                        return null;
                                    }

                                    let isActive = link.active;
                                    let className = isActive ? "page-item active" : "page-item";
                                    let linkLabel = link.label.replace(/&laquo;/,'<<').replace(/&raquo;/,">>");

                                    return (
                                        <li className={className} key={index}>
                                            <button className="page-link" key={index} onClick={()=> Inertia.get(link.url)} disabled={isActive}>
                                                {linkLabel}
                                            </button>
                                        </li>
                                    )
                                })     
                            )                     
                        }
                    </ul>
                </nav>

                {/* {mahasiswa.links.map((link,index) => {
                    let linkLabel = link.label;
                    let isActive = link.active;
                    
                    const linkActive = isActive ? {fontWeight:'bold',textDecoration:'underline'} :{};

                    if(linkLabel.includes('raquo')){
                        linkLabel  = "Next >>";
                    }
                    if(linkLabel.includes('laquo')){
                        linkLabel = "<< Prev";
                    }

                    return (
                        <button key={index} onClick={()=> Inertia.get(link.url)} disabled={isActive} style={linkActive}>
                            {linkLabel}
                        </button>
                    )
                })} */}
            </div>
        </div>
    )
}