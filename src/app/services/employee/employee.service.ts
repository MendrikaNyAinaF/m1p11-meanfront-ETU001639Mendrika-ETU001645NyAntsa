import {Injectable} from '@angular/core';
import {CrudService, SearchParams} from "../crud/crud.service";
import {BaseApiService} from "../base-api.service";

@Injectable({
    providedIn: 'root'
})
export class EmployeeService extends CrudService {

    constructor(api: BaseApiService) {
        super(api, {name: 'personne'});
    }

    override findAll(params?: SearchParams) {
        let searchNom = (".*" + (params?.search?.nom || "") + ".*").replace(".*.*", ".*");
        let searchPrenom = (".*" + (params?.search?.prenom || "") + ".*").replace(".*.*", ".*");
        if (params) {
            let search: any = {
                //
                "$and": [
                    {
                        nom: {
                            $regex: searchNom
                        }
                    },
                    {
                        prenom: {
                            $regex: searchPrenom
                        }
                    },
                    {
                        'type._id': {
                            '$oid': "65c220963fe8b2bd4b8f7d78"
                        },
                    }
                ]
            }
            params.search = search;
        }
        console.log(params);
        // encore params to base64 string
        let paramsString = btoa(JSON.stringify(params));
        return super.findAll(paramsString);
    }


    override create(body: any): any {
        // remove _id from body
        delete body._id;
        this.setEmployeeBaseData(body)
        console.log("body", body);
        // console.log("body",body);
        return super.create(body);
    }


    override update(id: string, body: any): any {
        delete body._id;
        this.setEmployeeBaseData(body)
        return super.update(id, body);
    }

    setEmployeeBaseData(employe : any) : any {
        employe.date_creation ={
            "$date" : new Date().toDateString()
        }
        employe.genre ={
            "$oid" : employe.genre
        }
        employe.type ={
            "_id" : {
                $oid: "65c220963fe8b2bd4b8f7d78"
            },
            "nom" : "Personnel",
            "code" : "EMP"
        }
    }
}
