<?php

namespace App\Http\Controllers;

use App\Http\Requests\MahasiswaStoreRequest;
use App\Models\Mahasiswa;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Symfony\Contracts\Service\Attribute\Required;

class MahasiswaController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = Mahasiswa::query();
        if($request->has('search') && $request->search != ""){
            $query->where("nim","like",'%'.$request->search.'%')
                    ->orWhere('full_name','like','%'.$request->search.'%');
        }
        $mahasiswa=$query->paginate(10);

        $current_page = 1;
        if($request->has('page') && $request->page != ""){
            $current_page = $request->current_page;
        }

        //$mahasiswa = Mahasiswa::orderBy('full_name','asc')->orderBy('genre','asc')->get() ;
        return Inertia::render('Mahasiswa/Index',[
            'mahasiswa' => $mahasiswa, 
            'filters' => $request->only(['search','page']),
            'current_page' => $current_page        
        ]);
    }


    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Mahasiswa/FormAdd',[
            'id'    => 0,
            'mhs'   => new Mahasiswa()
        ]);
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(MahasiswaStoreRequest $request)
    {
        /*$validateData = $request->validate([
            'tnim'          => 'required|unique:mahasiswa,nim|max:7',
            'tfull_name'    => 'required',
            'tgenre'        => 'required',
            'taddress'      => 'required'
        ],[],[
            'tnim'          => 'NIM'
            ,'tfull_name'   => 'Full Name'
            ,'tgenre'       => 'Genre'
            ,'taddress'     => 'Address'
        ]);*/

        $validateData = $request->validated();
        $mahasiswa = new Mahasiswa();
        $mahasiswa->nim         = $validateData['tnim'];
        $mahasiswa->full_name   = $validateData['tfull_name'];
        $mahasiswa->genre       = $validateData['tgenre'];
        $mahasiswa->address     = $validateData['taddress'];
        $mahasiswa->save();
        return redirect()->route('mahasiswa.index')->with('message','Data '.$request['tfull_name'].' is successfully created');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
       
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        $mahasiswa = Mahasiswa::find($id);
        if($mahasiswa){
            return Inertia::render('Mahasiswa/FormAdd',[
                'id'    => $id,
                'mhs'   => $mahasiswa
            ]);
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(MahasiswaStoreRequest $request, string $id)
    {
        $validateData = $request->validated();

        /*$validateData = $request->validate([
            'tfull_name'    => 'required',
            'tgenre'        => 'required',
            'taddress'      => 'required'
        ],[],[
            'tfull_name'   => 'Full Name'
            ,'tgenre'       => 'Genre'
            ,'taddress'     => 'Address'
        ]);*/

        $mahasiswa = Mahasiswa::find($id);
        $mahasiswa->full_name   = $validateData['tfull_name'];
        $mahasiswa->genre       = $validateData['tgenre'];
        $mahasiswa->address     = $validateData['taddress'];
        $mahasiswa->save();

        return redirect()->route('mahasiswa.index')->with('message','Data '.$mahasiswa->full_name.' is successfully updated');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $mahasiswa = Mahasiswa::findOrFail($id);
        $nim = $mahasiswa->nim;
        $mahasiswa->delete();
        return redirect()->route('mahasiswa.index')->with('message','NIM '.$nim." successfully deleted");
        
    }
}
