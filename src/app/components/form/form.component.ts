import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { SubmitProps } from '../interfaces';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AlertService } from '../alert.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit{
  constructor(
    private formBuilder: FormBuilder,
    private alertService: AlertService
  ) { }

  /* from Props de la forme {key: inputprops} */ 
  @Input() inputs!: any;

  @Input() action!: SubmitProps;


  /** css class for each inputs */
  @Input() inputClass: string = "col-md-6 mb-4";

  /* composant formulaire */
  form !: FormGroup;

  keys() {
    return Object.keys(this.inputs);
  }

  validate() {
    this.form.markAllAsTouched();
    if (this.form.valid) {
      this.action.submit(this.form.value)
        .then((res: any) =>{
          this.alertService.alertSuccess("La modification a été effectué avec succès");
          this.submit.emit(res);
        } )
        .catch((res: any) =>{
          this.alertService.alertError(res.message ||  "Une erreur s'est produite lors de la modification");
          this.submit.emit()
        } );
    }
  }

  /* émettre quand on fait un submit, si besoin est, de remplacer les valeurs par défaut par exemple */
  @Output() submit = new EventEmitter<any>();

  

  ngOnInit(): void {
    /* construit le formulaire */
    this.form = this.formBuilder.group({});
    console.log(this.inputs);
    console.log("hello");
    
    Object.keys(this.inputs).forEach(key => {
      let value = this.inputs[key];
        this.form.addControl(key, this.buildControl(value));
    });
  }

  private buildControl(input: any) {
    return this.formBuilder.control({value: input.default ?? '', disabled: input.disabled}, input.validators ?? []);
  }
}
