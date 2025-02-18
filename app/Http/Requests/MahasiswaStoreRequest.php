<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class MahasiswaStoreRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        $additional_rules = [];
        $rules = [
            'tfull_name'    => 'required',
            'tgenre'        => 'required',
            'taddress'      => 'required'
        ];
        
        //if it's a create method, there is additional validation
        if ($this->isMethod('POST')) 
            $additional_rules = $this->store();
        
        $rules = array_merge($rules,$additional_rules);
        return $rules;
        
    }

    protected function store(){
        return [
            'tnim'          => 'required|unique:mahasiswa,nim|max:7',
        ];
    }

    protected function update(){
        return [];
    }

    /* this is to rename the fieldname to readable field*/
    public function attributes()
	{
		return [
            'tfull_name'    => "Full Name",
            'tnim'          => "NIM",
            'tgenre'        => "Gender",
            'taddress'      => "Address",
        ];
	}
}
