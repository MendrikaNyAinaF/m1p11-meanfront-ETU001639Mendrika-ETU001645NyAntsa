import {Injectable} from '@angular/core';
import {CrudService, SearchParams} from "../crud/crud.service";
import {BaseApiService} from "../base-api.service";
import {ImgurService} from "../imgur/imgur.service";

@Injectable({
    providedIn: 'root'
})
export class EmployeeService extends CrudService {

    constructor(api: BaseApiService, private imgurService: ImgurService) {
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
                        "$or": [
                            {
                                'type._id': {
                                    '$oid': "65c220963fe8b2bd4b8f7d78"
                                }
                            }, {
                                'type': {
                                    "$oid": "65c220963fe8b2bd4b8f7d78"
                                }
                            }
                        ]

                    }
                ]
            }
            params.search = search;
        }
        console.log(params);
        // encore params to base64 string
        return super.findAll(params);
    }


    override async create(body: any): Promise<any> {
        // remove _id from body
        delete body._id;
        this.setEmployeeBaseData(body)
        console.log("body", body);
        try {
            const response = await this.imgurService.uploadImage(body.photo?.split(',')[1] as string);
            console.log('Fetch response:', response);

            if (response.ok) {
                const res = await response.json();
                console.log(res);
                body.photo = res.data.link;
            }
        } catch (e) {
            //     do nothing
        }

        return super.create(body);


    }


    override update(id: string, body: any): any {
        delete body._id;
        this.setEmployeeBaseData(body)
        return super.update(id, body);
    }

    setEmployeeBaseData(employe: any): any {
        employe.date_creation = {
            "$date": new Date().toDateString()
        }
        employe.genre = {
            "$oid": employe.genre
        }
        employe.type = {
            "_id": {
                $oid: "65c220963fe8b2bd4b8f7d78"
            },
            "nom": "Personnel",
            "code": "EMP"
        }
    }
}
