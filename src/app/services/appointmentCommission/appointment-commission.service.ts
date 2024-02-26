import {Injectable} from '@angular/core';
import {CrudService, SearchParams} from "../crud/crud.service";
import {BaseApiService} from "../base-api.service";

@Injectable({
    providedIn: 'root'
})
export class AppointmentCommissionService extends CrudService {

    constructor(api: BaseApiService) {
        super(api, {name: 'detail_rendez_vous'});
    }


    override findAll(params?: SearchParams): Promise<unknown> {
        const dateMin = params?.search?.dateMin
        const dateMax = params?.search?.dateMax
        if (params) {
            params.search = {
                "$or": [
                    {
                        "$and": [
                            dateMin ? {
                                "date_heure_debut": {
                                    "$gte": {
                                        "$date": dateMin
                                    }
                                }
                            } : {},
                            dateMax ? {
                                "date_heure_debut": {
                                    "$lt": {
                                        "$date": dateMax
                                    }
                                }
                            } : {}
                        ]
                    }, {
                        "$and": [
                            dateMin ? {
                                "date_heure_fin": {
                                    "$gte": {
                                        "$date": dateMin
                                    }
                                }
                            } : {},
                            dateMax ? {
                                "date_heure_fin": {
                                    "$lt": {
                                        "$date": dateMax
                                    }
                                }
                            } : {}
                        ]
                    }
                ]
            }
            params.sort = {
                "date_heure_debut": -1,
                "date_heure_fin": -1
            }
        }
        console.log(params)
        return super.findAll(params);
    }
}
